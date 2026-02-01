from __future__ import annotations

import os
import uuid
import hashlib
import logging
import secrets
import base64
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Optional, Dict, Any, List
from urllib.parse import urlencode, quote, unquote

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Form, Query
from fastapi.responses import JSONResponse, HTMLResponse, RedirectResponse, Response
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
import re
import json

# Load .env FIRST before reading any env vars
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Configure logging early
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB Configuration (REQUIRED - no memory fallback)
MONGO_URL = os.getenv("MONGO_URL", "").strip()
DB_NAME = os.getenv("DB_NAME", "caloriediet").strip()

# Parse MongoDB host for debug info
def parse_mongo_host(url: str) -> str:
    """Extract host from MongoDB URL for debug purposes."""
    if not url:
        return "not_configured"
    try:
        # Remove protocol
        if "://" in url:
            url = url.split("://")[1]
        # Remove credentials
        if "@" in url:
            url = url.split("@")[1]
        # Get host part
        if "/" in url:
            url = url.split("/")[0]
        if "?" in url:
            url = url.split("?")[0]
        return url
    except:
        return "parse_error"

MONGO_HOST = parse_mongo_host(MONGO_URL)

# Google OAuth Configuration
GOOGLE_OAUTH_CLIENT_ID = os.getenv("GOOGLE_OAUTH_CLIENT_ID", "").strip()
GOOGLE_OAUTH_CLIENT_SECRET = os.getenv("GOOGLE_OAUTH_CLIENT_SECRET", "").strip()
# Callback URL should be your backend's /auth/callback endpoint
OAUTH_CALLBACK_URL = os.getenv("OAUTH_CALLBACK_URL", "").strip()

# Fallback: Auto-construct callback URL from backend URL
BACKEND_PUBLIC_URL = os.getenv("BACKEND_PUBLIC_URL", "https://caloriediet-backend.onrender.com").strip()
if not OAUTH_CALLBACK_URL:
    OAUTH_CALLBACK_URL = f"{BACKEND_PUBLIC_URL}/auth/callback"

# In-memory storage for OAuth sessions only (short-lived, 5 min TTL)
_oauth_sessions: Dict[str, Dict[str, Any]] = {}

# MongoDB connection (REQUIRED)
mongo_client = None
mongo_db = None
mongo_connected = False

# Collections used in this app
MONGO_COLLECTIONS = ["users", "user_sessions", "meals", "water", "steps", "vitamins"]

if MONGO_URL:
    try:
        from motor.motor_asyncio import AsyncIOMotorClient  # type: ignore
        
        mongo_client = AsyncIOMotorClient(MONGO_URL)
        mongo_db = mongo_client[DB_NAME]
        mongo_connected = True
        logger.info(f"✅ MongoDB configured: {DB_NAME} @ {MONGO_HOST}")
    except Exception as e:
        logger.error(f"❌ MongoDB connection failed: {e}")
        mongo_client = None
        mongo_db = None
        mongo_connected = False
else:
    logger.warning("⚠️ MONGO_URL not set - API write operations will fail!")
    logger.warning("⚠️ Set MONGO_URL environment variable to enable data persistence")

# Optional Emergent integrations (shim exists in repo; still safe-guard)
try:
    from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent  # type: ignore
except Exception:
    LlmChat = None
    UserMessage = None
    ImageContent = None

EMERGENT_LLM_KEY = os.getenv("EMERGENT_LLM_KEY", "").strip()

app = FastAPI()
api_router = APIRouter(prefix="/api")

# -------------------------
# STARTUP EVENT - Run cleanup on server start
# -------------------------
@app.on_event("startup")
async def startup_event():
  """Run cleanup tasks on server startup."""
  logger.info("Starting server...")
  
  # Log storage type
  if mongo_db is not None:
    logger.info(f"Using MongoDB: {DB_NAME}")
  else:
    logger.warning("Using in-memory storage - data will be lost on restart!")
  
  # Run cleanup for expired users (in background)
  try:
    deleted = await cleanup_expired_users()
    if deleted > 0:
      logger.info(f"Startup cleanup: deleted {deleted} expired user accounts")
  except Exception as e:
    logger.error(f"Startup cleanup error: {e}")

# -------------------------
# HEALTH (Render)
# -------------------------
@app.get("/health")
def health():
  return {"ok": True}

@api_router.get("/debug/storage-status")
async def storage_status():
    """Check MongoDB connection status and configuration."""
    # Test actual connection
    actual_connected = False
    if mongo_db is not None:
        try:
            # Ping the database to verify connection
            await mongo_db.command("ping")
            actual_connected = True
        except Exception as e:
            logger.error(f"MongoDB ping failed: {e}")
            actual_connected = False
    
    return {
        "mongoConfigured": bool(MONGO_URL),
        "mongoConnected": actual_connected,
        "dbName": DB_NAME if MONGO_URL else None,
        "mongoHost": MONGO_HOST,
        "collectionsUsed": MONGO_COLLECTIONS,
        "dataRetentionDays": DATA_RETENTION_DAYS if 'DATA_RETENTION_DAYS' in globals() else 35,
        "status": "ready" if actual_connected else "not_connected",
    }


# -------------------------
# GOOGLE OAUTH ENDPOINTS
# -------------------------

def generate_state(redirect_url: str) -> str:
  """Generate a signed state parameter containing the redirect URL."""
  # Simple encoding - in production, use proper signing/encryption
  state_data = f"{redirect_url}|{secrets.token_urlsafe(16)}"
  return base64.urlsafe_b64encode(state_data.encode()).decode()

def decode_state(state: str) -> Optional[str]:
  """Decode state parameter and extract redirect URL."""
  try:
    decoded = base64.urlsafe_b64decode(state.encode()).decode()
    parts = decoded.split("|")
    if len(parts) >= 1:
      return parts[0]
  except Exception as e:
    logger.error(f"Failed to decode state: {e}")
  return None

def validate_redirect_url(redirect_url: str) -> bool:
  """Validate that redirect URL uses allowed schemes."""
  allowed_schemes = ['exp', 'caloriediet', 'http', 'https']
  try:
    # Simple scheme extraction
    scheme = redirect_url.split("://")[0].lower()
    return scheme in allowed_schemes
  except:
    return False

def create_oauth_session(user_data: Dict[str, Any]) -> str:
  """Create a short-lived OAuth session and return session_id."""
  session_id = f"oauth_{secrets.token_urlsafe(32)}"
  _oauth_sessions[session_id] = {
    "user_data": user_data,
    "created_at": datetime.now(timezone.utc),
    "expires_at": datetime.now(timezone.utc) + timedelta(minutes=5)
  }
  # Clean up expired sessions
  cleanup_expired_oauth_sessions()
  return session_id

def get_oauth_session(session_id: str) -> Optional[Dict[str, Any]]:
  """Get OAuth session data if valid and not expired."""
  session = _oauth_sessions.get(session_id)
  if not session:
    return None
  if datetime.now(timezone.utc) > session["expires_at"]:
    del _oauth_sessions[session_id]
    return None
  return session["user_data"]

def cleanup_expired_oauth_sessions():
  """Remove expired OAuth sessions."""
  now = datetime.now(timezone.utc)
  expired = [k for k, v in _oauth_sessions.items() if now > v["expires_at"]]
  for k in expired:
    del _oauth_sessions[k]


@app.get("/auth/v1/env/oauth/redirect")
async def oauth_redirect(redirect_url: str = Query(..., description="URL to redirect after OAuth")):
  """
  Start Google OAuth flow.
  Validates redirect_url and redirects to Google OAuth authorize endpoint.
  """
  # Validate redirect URL scheme
  if not validate_redirect_url(redirect_url):
    raise HTTPException(status_code=400, detail="Invalid redirect URL scheme. Must be exp://, caloriediet://, http://, or https://")
  
  # Check if Google OAuth is configured
  if not GOOGLE_OAUTH_CLIENT_ID:
    logger.error("GOOGLE_OAUTH_CLIENT_ID not configured")
    raise HTTPException(status_code=500, detail="Google OAuth not configured. Please set GOOGLE_OAUTH_CLIENT_ID environment variable.")
  
  # Generate state with redirect URL embedded
  state = generate_state(redirect_url)
  
  # Build Google OAuth authorize URL
  params = {
    "client_id": GOOGLE_OAUTH_CLIENT_ID,
    "redirect_uri": OAUTH_CALLBACK_URL,
    "response_type": "code",
    "scope": "openid email profile",
    "state": state,
    "access_type": "offline",
    "prompt": "select_account"
  }
  
  google_auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
  
  logger.info(f"Redirecting to Google OAuth. Callback: {OAUTH_CALLBACK_URL}")
  
  return RedirectResponse(url=google_auth_url, status_code=302)


@app.get("/auth/callback")
async def oauth_callback(
  code: str = Query(None),
  state: str = Query(None),
  error: str = Query(None)
):
  """
  Handle Google OAuth callback.
  Exchanges code for tokens, fetches user info, creates session.
  """
  # Handle OAuth errors
  if error:
    logger.error(f"OAuth error: {error}")
    return HTMLResponse(
      content=f"<html><body><h1>Login Error</h1><p>{error}</p></body></html>",
      status_code=400
    )
  
  if not code or not state:
    raise HTTPException(status_code=400, detail="Missing code or state parameter")
  
  # Decode redirect URL from state
  redirect_url = decode_state(state)
  if not redirect_url:
    raise HTTPException(status_code=400, detail="Invalid state parameter")
  
  # Check if Google OAuth is configured
  if not GOOGLE_OAUTH_CLIENT_ID or not GOOGLE_OAUTH_CLIENT_SECRET:
    raise HTTPException(status_code=500, detail="Google OAuth not fully configured")
  
  try:
    async with httpx.AsyncClient(timeout=30.0) as client:
      # Exchange code for tokens
      token_response = await client.post(
        "https://oauth2.googleapis.com/token",
        data={
          "code": code,
          "client_id": GOOGLE_OAUTH_CLIENT_ID,
          "client_secret": GOOGLE_OAUTH_CLIENT_SECRET,
          "redirect_uri": OAUTH_CALLBACK_URL,
          "grant_type": "authorization_code"
        }
      )
      
      if token_response.status_code != 200:
        logger.error(f"Token exchange failed: {token_response.text}")
        raise HTTPException(status_code=400, detail="Failed to exchange authorization code")
      
      tokens = token_response.json()
      access_token = tokens.get("access_token")
      
      if not access_token:
        raise HTTPException(status_code=400, detail="No access token received")
      
      # Fetch user info from Google
      userinfo_response = await client.get(
        "https://openidconnect.googleapis.com/v1/userinfo",
        headers={"Authorization": f"Bearer {access_token}"}
      )
      
      if userinfo_response.status_code != 200:
        logger.error(f"Userinfo fetch failed: {userinfo_response.text}")
        raise HTTPException(status_code=400, detail="Failed to fetch user info")
      
      userinfo = userinfo_response.json()
      
      logger.info(f"Google OAuth successful for: {userinfo.get('email')}")
      
      # Create short-lived OAuth session
      session_id = create_oauth_session({
        "email": userinfo.get("email"),
        "name": userinfo.get("name"),
        "picture": userinfo.get("picture"),
        "google_id": userinfo.get("sub")
      })
      
      # Redirect back to app with session_id in hash
      # Using hash (#) so it's not logged in server access logs
      final_redirect = f"{redirect_url}#session_id={session_id}"
      
      logger.info(f"Redirecting to: {redirect_url} with session_id")
      
      return RedirectResponse(url=final_redirect, status_code=302)
      
  except httpx.RequestError as e:
    logger.error(f"HTTP request error during OAuth: {e}")
    raise HTTPException(status_code=500, detail="Failed to complete OAuth flow")


@app.get("/auth/v1/env/oauth/session-data")
async def get_session_data(request: Request):
  """
  Exchange OAuth session_id for user data and create a permanent session.
  This is called by the frontend after OAuth redirect.
  Returns: { session_token: string }
  """
  # Get session_id from header (X-Session-ID) or query param
  session_id = request.headers.get("X-Session-ID") or request.query_params.get("session_id")
  
  if not session_id:
    raise HTTPException(status_code=400, detail="Missing session_id")
  
  # Get user data from OAuth session
  user_data = get_oauth_session(session_id)
  
  if not user_data:
    raise HTTPException(status_code=401, detail="Invalid or expired session_id")
  
  # Remove the OAuth session (one-time use)
  if session_id in _oauth_sessions:
    del _oauth_sessions[session_id]
  
  email = user_data.get("email")
  name = user_data.get("name", "")
  picture = user_data.get("picture")
  google_id = user_data.get("google_id")
  
  if not email:
    raise HTTPException(status_code=400, detail="No email in OAuth data")
  
  # Check if user exists, create if not
  user_id = f"google_{hashlib.sha256(email.encode()).hexdigest()[:12]}"
  
  existing_user = await store_get_user(user_id)
  
  if not existing_user:
    # Create new user
    existing_user = {
      "user_id": user_id,
      "email": email,
      "name": name,
      "picture": picture,
      "google_id": google_id,
      "height": None,
      "weight": None,
      "target_weight": None,
      "age": None,
      "gender": None,
      "activity_level": "moderate",
      "goal": "maintain",
      "daily_calorie_goal": 2000,
      "water_goal": 2500,
      "step_goal": 10000,
      "bmr": None,
      "tdee": None,
      "is_premium": False,
      "premium_expires_at": None,
      "ads_watched": 0,
      "created_at": now_utc().isoformat()
    }
    await store_create_user(existing_user)
    logger.info(f"Created new Google user: {user_id}")
  else:
    # Update name and picture if changed
    if name and existing_user.get("name") != name:
      existing_user["name"] = name
    if picture and existing_user.get("picture") != picture:
      existing_user["picture"] = picture
    await store_update_user(user_id, existing_user)
  
  # Create session token
  session_token = f"sess_{secrets.token_hex(16)}"
  session_doc = {
    "session_token": session_token,
    "user_id": user_id,
    "created_at": now_utc().isoformat(),
    "expires_at": (now_utc() + timedelta(days=30)).isoformat()
  }
  
  # Store session
  if mongo_db is not None:
    await mongo_db.user_sessions.insert_one(session_doc)
  else:
    memory_sessions[session_token] = session_doc
  
  logger.info(f"Created session for Google user: {email}")
  
  return {"session_token": session_token}


# -------------------------
# CORS
# -------------------------
app.add_middleware(
  CORSMiddleware,
  allow_credentials=True,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

# -------------------------
# MODELS
# -------------------------
class User(BaseModel):
  user_id: str
  email: str
  name: str
  picture: Optional[str] = None
  created_at: datetime

  height: Optional[float] = None
  weight: Optional[float] = None
  target_weight: Optional[float] = None
  age: Optional[int] = None
  gender: Optional[str] = None
  activity_level: Optional[str] = None
  goal: Optional[str] = None  # lose, loseFast, maintain, gain, gainFast

  daily_calorie_goal: Optional[int] = None
  bmr: Optional[int] = None  # Basal Metabolic Rate
  tdee: Optional[int] = None  # Total Daily Energy Expenditure
  water_goal: int = 2500
  step_goal: int = 10000

  is_premium: bool = False
  premium_expires_at: Optional[datetime] = None
  ads_watched: int = 0
  
  # Gamification System
  level: int = 1
  xp: int = 0
  total_points: int = 0
  daily_streak: int = 0
  goal_streak: int = 0
  max_daily_streak: int = 0
  max_goal_streak: int = 0
  last_login: Optional[datetime] = None
  last_goal_completion: Optional[datetime] = None
  achievements: List[str] = []
  league: str = "bronze"  # bronze, silver, gold, platinum, diamond, legend


class SessionDataResponse(BaseModel):
  user_id: str
  email: str
  name: str
  picture: Optional[str] = None
  session_token: str


class RegisterRequest(BaseModel):
  email: str
  password: str
  name: str


class LoginRequest(BaseModel):
  email: str
  password: str


class ProfileData(BaseModel):
  height: Optional[float] = None
  weight: Optional[float] = None
  target_weight: Optional[float] = None
  age: Optional[int] = None
  gender: Optional[str] = None
  activity_level: Optional[str] = None
  goal: Optional[str] = None
  daily_calorie_goal: Optional[int] = None
  bmr: Optional[int] = None
  tdee: Optional[int] = None


class UpdateGoals(BaseModel):
  daily_calorie_goal: Optional[int] = None
  water_goal: Optional[int] = None
  step_goal: Optional[int] = None


# -------------------------
# SIMPLE UTIL
# -------------------------
def hash_password(password: str) -> str:
  return hashlib.sha256(password.encode("utf-8")).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
  return hash_password(password) == hashed

def now_utc() -> datetime:
  return datetime.now(timezone.utc)

def today_str() -> str:
  return now_utc().strftime("%Y-%m-%d")

def calculate_calorie_goal(height: float, weight: float, age: int, gender: str, activity_level: str) -> int:
  if gender == "male":
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
  else:
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)

  factors = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very_active": 1.9,
  }
  return int(bmr * factors.get(activity_level, 1.2))

def require_mongo():
    """Raise HTTPException if MongoDB is not configured."""
    if mongo_db is None:
        raise HTTPException(
            status_code=500,
            detail="Database not configured. Please set MONGO_URL environment variable."
        )

# -------------------------
# MEMORY STORE (for OAuth sessions ONLY - short-lived)
# -------------------------
MEM_SESSIONS: Dict[str, Dict[str, Any]] = {}
memory_sessions = MEM_SESSIONS  # Alias for OAuth endpoint

# Data retention policy
DATA_RETENTION_DAYS = 35  # Days to keep data after logout

async def store_create_user(user_doc: Dict[str, Any]):
    """Create a new user in MongoDB."""
    require_mongo()
    await mongo_db.users.insert_one(user_doc)

async def store_get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    """Get user by ID from MongoDB."""
    if mongo_db is None:
        return None
    return await mongo_db.users.find_one({"user_id": user_id}, {"_id": 0})

async def store_get_user(user_id: str) -> Optional[Dict[str, Any]]:
    """Backward-compatible alias used by older OAuth code paths."""
    return await store_get_user_by_id(user_id)

async def store_get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    """Get user by email from MongoDB."""
    if mongo_db is None:
        return None
    return await mongo_db.users.find_one({"email": email}, {"_id": 0})

async def store_update_user(user_id: str, update: Dict[str, Any]):
    """Update user in MongoDB."""
    require_mongo()
    await mongo_db.users.update_one({"user_id": user_id}, {"$set": update})

async def store_mark_user_for_deletion(user_id: str):
    """Mark user for deletion after DATA_RETENTION_DAYS days."""
    require_mongo()
    deletion_date = now_utc() + timedelta(days=DATA_RETENTION_DAYS)
    update = {
        "scheduled_deletion_at": deletion_date.isoformat(),
        "logout_at": now_utc().isoformat(),
    }
    await store_update_user(user_id, update)
    logger.info(f"User {user_id} marked for deletion at {deletion_date.isoformat()}")

async def store_cancel_user_deletion(user_id: str):
    """Cancel scheduled deletion when user logs back in."""
    require_mongo()
    await mongo_db.users.update_one(
        {"user_id": user_id}, 
        {"$unset": {"scheduled_deletion_at": "", "logout_at": ""}}
    )
    logger.info(f"Deletion cancelled for user {user_id}")

async def store_delete_user_data(user_id: str):
    """Permanently delete all user data from MongoDB."""
    require_mongo()
    # Delete all user data
    await mongo_db.meals.delete_many({"user_id": user_id})
    await mongo_db.water.delete_many({"user_id": user_id})
    await mongo_db.steps.delete_many({"user_id": user_id})
    await mongo_db.vitamins.delete_many({"user_id": user_id})
    await mongo_db.user_sessions.delete_many({"user_id": user_id})
    # Delete user
    await mongo_db.users.delete_one({"user_id": user_id})
    logger.info(f"Permanently deleted all data for user {user_id}")

async def cleanup_expired_users():
    """Delete users whose scheduled_deletion_at has passed (non-premium or expired premium).
    
    SAFETY CHECKS:
    1. Only deletes users with scheduled_deletion_at set (from logout)
    2. Checks last_active - if user was active recently, don't delete
    3. Checks premium status and expiry
    4. Logs all deletions for audit
    """
    if mongo_db is None:
        logger.warning("Cleanup skipped - MongoDB not configured")
        return 0
    
    now = now_utc()
    deleted_count = 0
    skipped_active = 0
    
    # Find users scheduled for deletion
    cursor = mongo_db.users.find({
        "scheduled_deletion_at": {"$exists": True}
    })
    
    async for user in cursor:
        user_id = user.get("user_id", "unknown")
        deletion_str = user.get("scheduled_deletion_at")
        if not deletion_str:
            continue
        
        try:
            deletion_date = datetime.fromisoformat(deletion_str.replace('Z', '+00:00'))
            if deletion_date.tzinfo is None:
                deletion_date = deletion_date.replace(tzinfo=timezone.utc)
        except:
            continue
        
        # Check if deletion date has passed
        if deletion_date < now:
            # SAFETY CHECK 1: Check last_active - if user was active in last 35 days, don't delete
            last_active_str = user.get("last_active")
            if last_active_str:
                try:
                    last_active = datetime.fromisoformat(last_active_str.replace('Z', '+00:00'))
                    if last_active.tzinfo is None:
                        last_active = last_active.replace(tzinfo=timezone.utc)
                    
                    days_since_active = (now - last_active).days
                    if days_since_active < DATA_RETENTION_DAYS:
                        # User was active recently, cancel deletion
                        await store_cancel_user_deletion(user_id)
                        skipped_active += 1
                        logger.info(f"Skipped deletion for recently active user {user_id} (active {days_since_active} days ago)")
                        continue
                except Exception as e:
                    logger.debug(f"Could not parse last_active for {user_id}: {e}")
            
            # SAFETY CHECK 2: Check if user has active sessions
            active_sessions = await mongo_db.user_sessions.count_documents({
                "user_id": user_id,
                "expires_at": {"$gt": now}
            })
            if active_sessions > 0:
                # User has active sessions, cancel deletion
                await store_cancel_user_deletion(user_id)
                skipped_active += 1
                logger.info(f"Skipped deletion for user {user_id} with {active_sessions} active sessions")
                continue
            
            # SAFETY CHECK 3: Check if premium user with active subscription
            is_premium = user.get("is_premium", False)
            premium_expires = user.get("premium_expires_at")
            
            if is_premium and premium_expires:
                try:
                    exp_date = datetime.fromisoformat(str(premium_expires).replace('Z', '+00:00'))
                    if exp_date.tzinfo is None:
                        exp_date = exp_date.replace(tzinfo=timezone.utc)
                    # If premium is still active, don't delete
                    if exp_date > now:
                        logger.info(f"Skipped deletion for premium user {user_id}")
                        continue
                except:
                    pass
            
            # All safety checks passed - delete user data
            logger.warning(f"DELETING user {user_id} - scheduled at {deletion_str}, last_active: {last_active_str}")
            await store_delete_user_data(user_id)
            deleted_count += 1
    
    if deleted_count > 0 or skipped_active > 0:
        logger.info(f"Cleanup complete: deleted {deleted_count} users, skipped {skipped_active} active users")
    
    return deleted_count

async def store_create_session(user_id: str, session_token: str, days: int = 30):
    """Create a new session in MongoDB."""
    require_mongo()
    session_doc = {
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": now_utc() + timedelta(days=days),
        "created_at": now_utc(),
    }
    await mongo_db.user_sessions.insert_one(session_doc)
    
    # Cancel any scheduled deletion when user logs in
    try:
        await store_cancel_user_deletion(user_id)
    except:
        pass  # User might not exist yet
    logger.info(f"Session created for user {user_id}, expires in {days} days")

async def store_get_session(session_token: str) -> Optional[Dict[str, Any]]:
    """Get session from MongoDB."""
    if mongo_db is None:
        return None
    return await mongo_db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})

async def store_delete_session(session_token: str):
    """Delete session from MongoDB."""
    if mongo_db is not None:
        await mongo_db.user_sessions.delete_one({"session_token": session_token})
    MEM_SESSIONS.pop(session_token, None)


# -------------------------
# AUTH DEPENDENCY
# -------------------------
async def get_current_user(request: Request) -> Optional[User]:
  session_token = request.cookies.get("session_token")

  if not session_token:
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
      session_token = auth_header.split(" ", 1)[1].strip()

  if not session_token:
    return None

  session = await store_get_session(session_token)
  if not session:
    logger.debug(f"Session not found: {session_token[:20]}...")
    return None

  # Check session expiry
  expires_at = session.get("expires_at")
  if expires_at:
    # Handle both datetime and string formats
    if isinstance(expires_at, str):
      try:
        expires_at = datetime.fromisoformat(expires_at.replace('Z', '+00:00'))
      except:
        expires_at = None
    
    if isinstance(expires_at, datetime):
      if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
      if expires_at < now_utc():
        logger.info(f"Session expired for token: {session_token[:20]}...")
        await store_delete_session(session_token)
        return None

  user_doc = await store_get_user_by_id(session["user_id"])
  if not user_doc:
    logger.warning(f"User not found for session: {session['user_id']}")
    return None

  # Update last_active and cancel any scheduled deletion
  # This ensures active users are never deleted
  try:
    user_id = session["user_id"]
    await store_update_user(user_id, {"last_active": now_utc().isoformat()})
    
    # If user was scheduled for deletion, cancel it (they're actively using the app)
    if user_doc.get("scheduled_deletion_at"):
      await store_cancel_user_deletion(user_id)
      logger.info(f"Auto-cancelled deletion for active user: {user_id}")
  except Exception as e:
    logger.debug(f"Could not update last_active: {e}")

  return User(**user_doc)


def set_session_cookie(resp: JSONResponse, request: Request, token: str, max_age_seconds: int):
  # Render is https, local dev might be http. This avoids "cookie never set" locally.
  secure = request.url.scheme == "https"
  resp.set_cookie(
    key="session_token",
    value=token,
    httponly=True,
    secure=secure,
    samesite="none" if secure else "lax",
    max_age=max_age_seconds,
    path="/",
  )


# -------------------------
# AUTH ENDPOINTS
# -------------------------
@api_router.post("/auth/session", response_model=SessionDataResponse)
async def exchange_session(request: Request):
  """
  Exchange session_id for session_token.
  Supports both internal OAuth sessions (oauth_*) and Emergent Auth.
  Requires X-Session-ID header.
  """
  session_id = request.headers.get("X-Session-ID")
  if not session_id:
    raise HTTPException(status_code=400, detail="X-Session-ID header required")

  # Check if this is an internal OAuth session
  if session_id.startswith("oauth_"):
    # Use internal OAuth session
    user_data = get_oauth_session(session_id)
    if not user_data:
      raise HTTPException(status_code=401, detail="Invalid or expired session_id")
    
    # Remove the OAuth session (one-time use)
    if session_id in _oauth_sessions:
      del _oauth_sessions[session_id]
    
    email = user_data.get("email")
    name = user_data.get("name", "User")
    picture = user_data.get("picture")
    google_id = user_data.get("google_id")
    
    if not email:
      raise HTTPException(status_code=400, detail="No email in OAuth data")
    
    # Check if user exists, create if not
    user_id = f"google_{hashlib.sha256(email.encode()).hexdigest()[:12]}"
    existing = await store_get_user(user_id)
    
    if not existing:
      await store_create_user({
        "user_id": user_id,
        "email": email,
        "name": name,
        "picture": picture,
        "google_id": google_id,
        "created_at": now_utc(),
        "water_goal": 2500,
        "step_goal": 10000,
        "is_premium": False,
        "ads_watched": 0,
      })
    
    session_token = f"sess_{secrets.token_hex(16)}"
    await store_create_session(user_id, session_token, days=30)
    
    resp = JSONResponse(content={
      "user_id": user_id,
      "email": email,
      "name": name,
      "picture": picture,
      "session_token": session_token,
    })
    set_session_cookie(resp, request, session_token, max_age_seconds=30 * 24 * 60 * 60)
    return resp
  
  # Fallback to Emergent OAuth (legacy support)
  try:
    async with httpx.AsyncClient(timeout=20.0) as client:
      r = await client.get(
        "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
        headers={"X-Session-ID": session_id},
      )
      r.raise_for_status()
      user_data = r.json()
  except Exception as e:
    logger.error(f"exchange_session failed: {e}")
    raise HTTPException(status_code=400, detail="Invalid session ID")

  email = user_data.get("email")
  name = user_data.get("name") or "User"
  picture = user_data.get("picture")
  session_token = user_data.get("session_token") or f"sess_{uuid.uuid4().hex}"

  if not email:
    raise HTTPException(status_code=400, detail="Auth provider returned no email")

  existing = await store_get_user_by_email(email)
  if existing:
    user_id = existing["user_id"]
  else:
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    await store_create_user({
      "user_id": user_id,
      "email": email,
      "name": name,
      "picture": picture,
      "created_at": now_utc(),
      "water_goal": 2500,
      "step_goal": 10000,
      "is_premium": False,
      "ads_watched": 0,
    })

  await store_create_session(user_id, session_token, days=7)

  resp = JSONResponse(content={
    "user_id": user_id,
    "email": email,
    "name": name,
    "picture": picture,
    "session_token": session_token,
  })
  set_session_cookie(resp, request, session_token, max_age_seconds=30 * 24 * 60 * 60)
  return resp


@api_router.get("/auth/me", response_model=User)
async def get_me(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  return current_user


@api_router.post("/auth/logout")
async def logout(request: Request, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")

  user_id = current_user.user_id
  is_premium = current_user.is_premium
  
  # Delete current session
  session_token = request.cookies.get("session_token")
  if not session_token:
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
      session_token = auth_header.split(" ", 1)[1].strip()
  
  if session_token:
    await store_delete_session(session_token)
  
  # Mark user for deletion after DATA_RETENTION_DAYS days (unless premium)
  deletion_date = now_utc() + timedelta(days=DATA_RETENTION_DAYS)
  await store_mark_user_for_deletion(user_id)
  
  # Prepare response message
  if is_premium:
    message = f"Çıkış yapıldı. Premium üyeliğiniz devam ettiği sürece verileriniz korunacaktır. Üyelik iptalinden {DATA_RETENTION_DAYS} gün sonra verileriniz silinecektir."
    message_en = f"Logged out. Your data will be preserved while your premium subscription is active. Data will be deleted {DATA_RETENTION_DAYS} days after subscription ends."
  else:
    message = f"Çıkış yapıldı. {DATA_RETENTION_DAYS} gün içinde tekrar giriş yapmazsanız verileriniz kalıcı olarak silinecektir."
    message_en = f"Logged out. If you don't log in again within {DATA_RETENTION_DAYS} days, your data will be permanently deleted."
  
  resp = JSONResponse(content={
    "message": message,
    "message_en": message_en,
    "data_retention_days": DATA_RETENTION_DAYS,
    "scheduled_deletion_date": deletion_date.isoformat(),
    "is_premium": is_premium,
  })
  resp.delete_cookie("session_token", path="/")
  return resp


@api_router.delete("/auth/account")
async def delete_account(request: Request, current_user: Optional[User] = Depends(get_current_user)):
  """
  Delete user account and all associated data immediately.
  This is a permanent action and cannot be undone.
  """
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")

  user_id = current_user.user_id
  
  try:
    # Delete all user data immediately
    await store_delete_user_data(user_id)
    
    logger.info(f"Account deleted immediately: {user_id}")
    
    resp = JSONResponse(content={"message": "Account deleted successfully"})
    resp.delete_cookie("session_token", path="/")
    return resp
    
  except Exception as e:
    logger.error(f"Error deleting account {user_id}: {e}")
    raise HTTPException(status_code=500, detail="Failed to delete account")


@api_router.post("/auth/register", response_model=SessionDataResponse)
async def register(request: Request, data: RegisterRequest):
  existing = await store_get_user_by_email(data.email)
  if existing:
    raise HTTPException(status_code=400, detail="Bu email zaten kayıtlı")

  user_id = f"user_{uuid.uuid4().hex[:12]}"
  session_token = f"sess_{uuid.uuid4().hex}"

  await store_create_user({
    "user_id": user_id,
    "email": data.email,
    "name": data.name,
    "picture": None,
    "created_at": now_utc(),
    "password_hash": hash_password(data.password),
    "auth_type": "email",
    "water_goal": 2500,
    "step_goal": 10000,
    "is_premium": False,
    "ads_watched": 0,
  })

  await store_create_session(user_id, session_token, days=30)

  resp = JSONResponse(content={
    "user_id": user_id,
    "email": data.email,
    "name": data.name,
    "picture": None,
    "session_token": session_token,
  })
  set_session_cookie(resp, request, session_token, max_age_seconds=30 * 24 * 60 * 60)
  return resp


@api_router.post("/auth/login", response_model=SessionDataResponse)
async def login(request: Request, data: LoginRequest):
  user = await store_get_user_by_email(data.email)
  if not user:
    raise HTTPException(status_code=401, detail="Email veya şifre hatalı")

  if user.get("auth_type") == "email":
    if not verify_password(data.password, user.get("password_hash", "")):
      raise HTTPException(status_code=401, detail="Email veya şifre hatalı")
  elif user.get("auth_type") == "guest":
    raise HTTPException(status_code=400, detail="Misafir hesapla şifreli giriş olmaz")
  else:
    raise HTTPException(status_code=400, detail="Bu hesap Google ile oluşturuldu. Google ile giriş yapın.")

  session_token = f"sess_{uuid.uuid4().hex}"
  await store_create_session(user["user_id"], session_token, days=30)

  resp = JSONResponse(content={
    "user_id": user["user_id"],
    "email": user["email"],
    "name": user["name"],
    "picture": user.get("picture"),
    "session_token": session_token,
  })
  set_session_cookie(resp, request, session_token, max_age_seconds=30 * 24 * 60 * 60)
  return resp


@api_router.post("/auth/guest", response_model=SessionDataResponse)
async def guest_login(request: Request):
  user_id = f"guest_{uuid.uuid4().hex[:12]}"
  session_token = f"sess_{uuid.uuid4().hex}"
  guest_name = f"Misafir_{uuid.uuid4().hex[:6]}"

  await store_create_user({
    "user_id": user_id,
    "email": f"{user_id}@guest.local",
    "name": guest_name,
    "picture": None,
    "created_at": now_utc(),
    "auth_type": "guest",
    "water_goal": 2500,
    "step_goal": 10000,
    "is_premium": False,
    "ads_watched": 0,
  })

  await store_create_session(user_id, session_token, days=7)

  resp = JSONResponse(content={
    "user_id": user_id,
    "email": f"{user_id}@guest.local",
    "name": guest_name,
    "picture": None,
    "session_token": session_token,
  })
  set_session_cookie(resp, request, session_token, max_age_seconds=30 * 24 * 60 * 60)
  return resp


@api_router.put("/auth/profile", response_model=User)
async def update_profile(profile: ProfileData, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")

  update = profile.model_dump(exclude_none=True)

  # Only calculate calorie goal if not provided from onboarding
  if not profile.daily_calorie_goal and all([profile.height, profile.weight, profile.age, profile.gender, profile.activity_level]):
    update["daily_calorie_goal"] = calculate_calorie_goal(
      profile.height, profile.weight, profile.age, profile.gender, profile.activity_level
    )

  await store_update_user(current_user.user_id, update)
  user_doc = await store_get_user_by_id(current_user.user_id)
  return User(**user_doc)


@api_router.put("/user/goals", response_model=User)
async def update_goals(goals: UpdateGoals, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")

  update = goals.model_dump(exclude_none=True)
  await store_update_user(current_user.user_id, update)
  user_doc = await store_get_user_by_id(current_user.user_id)
  return User(**user_doc)


@api_router.post("/auth/calculate-goals")
async def calculate_diet_goals(request: dict, current_user: Optional[User] = Depends(get_current_user)):
    """
    Advanced calorie and macro calculation with multi-goal support.
    
    Supports:
    - Single goals: weight_loss, muscle_gain, maintenance
    - Combined goals: recomp (lose_fat_build_muscle), lean_bulk (build_muscle_slow_gain)
    """
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Extract data
    weight = request.get("weight")  # kg
    height = request.get("height")  # cm
    age = request.get("age")
    gender = request.get("gender")  # "male" or "female"
    activity_level = request.get("activity_level", "moderate")
    goals = request.get("goals", [])  # List of goals
    target_weight = request.get("target_weight")  # Optional
    
    if not all([weight, height, age, gender]):
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    # Activity multipliers (TDEE calculation)
    activity_multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very_active": 1.9
    }
    
    # Calculate BMR using Mifflin-St Jeor equation (most accurate)
    if gender == "male":
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
    else:
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
    
    # Calculate TDEE
    tdee = bmr * activity_multipliers.get(activity_level, 1.55)
    
    # Determine goal combination and adjust calories/macros
    goal_set = set(goals) if isinstance(goals, list) else {goals}
    
    # Default values
    daily_calories = tdee
    protein_percent = 30
    carbs_percent = 40
    fat_percent = 30
    goal_description = "Maintenance"
    
    # Multi-goal logic
    if "lose_weight" in goal_set and "build_muscle" in goal_set:
        # Body Recomposition: Mild deficit + high protein
        goal_description = "Body Recomposition (Lose Fat & Build Muscle)"
        daily_calories = tdee * 0.85  # 15% deficit
        protein_percent = 40  # High protein for muscle preservation
        carbs_percent = 30
        fat_percent = 30
        
    elif "build_muscle" in goal_set and "gain_weight" in goal_set:
        # Lean Bulk: Moderate surplus + high protein
        goal_description = "Lean Bulk (Build Muscle & Gain Weight)"
        daily_calories = tdee * 1.15  # 15% surplus
        protein_percent = 30
        carbs_percent = 50  # Higher carbs for energy
        fat_percent = 20
        
    elif "lose_weight" in goal_set:
        # Weight Loss / Cut
        if "fast" in str(goals):
            goal_description = "Fast Weight Loss"
            daily_calories = tdee * 0.75  # 25% deficit
        else:
            goal_description = "Weight Loss"
            daily_calories = tdee * 0.80  # 20% deficit
        protein_percent = 40  # High protein to preserve muscle
        carbs_percent = 30
        fat_percent = 30
        
    elif "build_muscle" in goal_set:
        # Muscle Gain / Bulk
        goal_description = "Muscle Gain"
        daily_calories = tdee * 1.10  # 10% surplus (lean bulk)
        protein_percent = 30
        carbs_percent = 45
        fat_percent = 25
        
    elif "maintain" in goal_set or "maintenance" in goal_set:
        # Maintenance
        goal_description = "Maintenance"
        daily_calories = tdee
        protein_percent = 30
        carbs_percent = 40
        fat_percent = 30
    
    # Calculate macro grams
    protein_grams = (daily_calories * protein_percent / 100) / 4  # 4 kcal/g
    carbs_grams = (daily_calories * carbs_percent / 100) / 4
    fat_grams = (daily_calories * fat_percent / 100) / 9  # 9 kcal/g
    
    # Calculate recommended weight change rate
    weekly_weight_change = 0
    if "lose_weight" in goal_set:
        weekly_weight_change = -0.5  # kg per week (safe)
        if "fast" in str(goals):
            weekly_weight_change = -0.75
    elif "gain_weight" in goal_set or "build_muscle" in goal_set:
        weekly_weight_change = 0.25  # kg per week (lean bulk)
    
    # Estimate time to goal
    weeks_to_goal = None
    if target_weight and weekly_weight_change != 0:
        weight_diff = target_weight - weight
        weeks_to_goal = abs(weight_diff / weekly_weight_change)
    
    return {
        "bmr": round(bmr),
        "tdee": round(tdee),
        "daily_calorie_goal": round(daily_calories),
        "goal_description": goal_description,
        "macros": {
            "protein_grams": round(protein_grams),
            "protein_percent": protein_percent,
            "carbs_grams": round(carbs_grams),
            "carbs_percent": carbs_percent,
            "fat_grams": round(fat_grams),
            "fat_percent": fat_percent
        },
        "weekly_weight_change_kg": weekly_weight_change,
        "weeks_to_goal": round(weeks_to_goal) if weeks_to_goal else None,
        "recommendations": {
            "protein_per_kg": round(protein_grams / weight, 2),
            "water_ml": round(weight * 35),  # 35ml per kg body weight
            "steps_goal": 10000,
            "training_days_per_week": 3 if "build_muscle" in goal_set else 2,
            "cardio_minutes_per_week": 150 if "lose_weight" in goal_set else 90
        }
    }

# -------------------------
# FOOD DB (external file)
# -------------------------
from food_database import FOOD_DATABASE

@api_router.get("/food/database")
async def get_food_database(lang: str = "tr", current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  if lang == "en":
    return [{"food_id": f["food_id"], "name": f["name_en"], "calories": f["calories"], "protein": f["protein"], "carbs": f["carbs"], "fat": f["fat"]} for f in FOOD_DATABASE]
  return [{"food_id": f["food_id"], "name": f["name"], "calories": f["calories"], "protein": f["protein"], "carbs": f["carbs"], "fat": f["fat"]} for f in FOOD_DATABASE]


# -------------------------
# FOOD/MEAL ENDPOINTS
# -------------------------
class AddMealRequest(BaseModel):
  name: str
  calories: int
  protein: float
  carbs: float
  fat: float
  image_base64: Optional[str] = None
  meal_type: str = "snack"  # breakfast, lunch, dinner, snack


async def get_user_meals(user_id: str, date: Optional[str] = None) -> List[Dict[str, Any]]:
    """Get user meals from MongoDB."""
    if mongo_db is None:
        return []
    target_date = date or today_str()
    cursor = mongo_db.meals.find({"user_id": user_id, "date": target_date}, {"_id": 0})
    return await cursor.to_list(length=100)


async def add_user_meal(user_id: str, meal_data: Dict[str, Any]):
    """Add meal to MongoDB."""
    require_mongo()
    await mongo_db.meals.insert_one(meal_data)


@api_router.post("/food/add-meal")
async def add_meal(meal: AddMealRequest, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  meal_doc = {
    "meal_id": f"meal_{uuid.uuid4().hex[:12]}",
    "user_id": current_user.user_id,
    "name": meal.name,
    "calories": meal.calories,
    "protein": meal.protein,
    "carbs": meal.carbs,
    "fat": meal.fat,
    "image_base64": meal.image_base64 or "",
    "meal_type": meal.meal_type,
    "date": today_str(),
    "created_at": now_utc().isoformat(),
  }
  
  await add_user_meal(current_user.user_id, meal_doc)
  return {"message": "Meal added", "meal_id": meal_doc["meal_id"]}


@api_router.get("/food/today")
async def get_today_meals(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  meals = await get_user_meals(current_user.user_id)
  return meals


@api_router.get("/food/daily-summary")
async def get_daily_summary(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  meals = await get_user_meals(current_user.user_id)
  
  total_calories = sum(m.get("calories", 0) for m in meals)
  total_protein = sum(m.get("protein", 0) for m in meals)
  total_carbs = sum(m.get("carbs", 0) for m in meals)
  total_fat = sum(m.get("fat", 0) for m in meals)
  
  return {
    "total_calories": total_calories,
    "total_protein": round(total_protein, 1),
    "total_carbs": round(total_carbs, 1),
    "total_fat": round(total_fat, 1),
    "meal_count": len(meals),
    "date": today_str(),
  }


@api_router.delete("/food/meal/{meal_id}")
async def delete_meal(meal_id: str, current_user: Optional[User] = Depends(get_current_user)):
  """Delete a specific meal by ID."""
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  if mongo_db is not None:
    result = await mongo_db.meals.delete_one({
      "meal_id": meal_id,
      "user_id": current_user.user_id
    })
    if result.deleted_count == 0:
      raise HTTPException(status_code=404, detail="Meal not found")
  else:
    # In-memory fallback
    global memory_meals
    original_len = len(memory_meals)
    memory_meals = [m for m in memory_meals if not (m.get("meal_id") == meal_id and m.get("user_id") == current_user.user_id)]
    if len(memory_meals) == original_len:
      raise HTTPException(status_code=404, detail="Meal not found")
  
  return {"message": "Meal deleted", "meal_id": meal_id}
import openai
from PIL import Image
import io

def get_openai_api_key():
    """Get OpenAI API key from environment, checking multiple possible names."""
    key = os.getenv("OPENAI_KEY", "").strip()
    if not key:
        key = os.getenv("OPENAI_API_KEY", "").strip()
    # Remove any quotes that might be accidentally included
    key = key.strip('"').strip("'")
    return key if key else None

# Model configuration for diet app
# GPT-4.1 nano: Vision destekli, EN UCUZ model
# Input: $0.10/1M, Output: $0.40/1M
# GPT-5 nano output multiplier nedeniyle daha pahalı
VISION_MODEL_PRIMARY = os.getenv("OPENAI_MODEL", "gpt-4.1-nano")  # En ucuz vision model
VISION_MODEL_FALLBACK = os.getenv("OPENAI_MODEL_FALLBACK", "gpt-4o-mini")  # Fallback model

class FoodItem(BaseModel):
    name: str
    quantity_estimate: Dict[str, Any] = Field(default_factory=lambda: {"grams": 100, "range_grams": [80, 120]})
    calories_kcal: int
    macros: Dict[str, float] = Field(default_factory=lambda: {"protein_g": 0, "carbs_g": 0, "fat_g": 0})
    confidence: float = 0.7

class FoodAnalyzeRequest(BaseModel):
    image_base64: str
    locale: str = "tr-TR"

class FoodAnalyzeResponse(BaseModel):
    items: List[FoodItem] = []
    total: Dict[str, float] = Field(default_factory=lambda: {"calories_kcal": 0, "protein_g": 0, "carbs_g": 0, "fat_g": 0})
    questions: List[str] = []
    notes: str = ""

# Legacy response model for backward compatibility
class AnalyzeFoodRequest(BaseModel):
    image_base64: str
    locale: str = "tr-TR"
    context: str = ""  # User-provided food description for better accuracy

class AnalyzeFoodResponse(BaseModel):
    items: List[Dict[str, Any]] = []
    notes: List[str] = []
    needs_user_confirmation: bool = False
    total_calories: int = 0
    total_protein: float = 0
    total_carbs: float = 0
    total_fat: float = 0

def resize_image_base64(base64_str: str, max_size: int = 1280) -> str:
    """Resize image to reduce payload size for API calls."""
    try:
        # Remove data URL prefix if present
        if base64_str.startswith("data:"):
            base64_str = base64_str.split(",", 1)[1]
        
        # Decode base64
        image_data = base64.b64decode(base64_str)
        image = Image.open(io.BytesIO(image_data))
        
        # Calculate new size maintaining aspect ratio
        width, height = image.size
        if max(width, height) > max_size:
            if width > height:
                new_width = max_size
                new_height = int(height * (max_size / width))
            else:
                new_height = max_size
                new_width = int(width * (max_size / height))
            image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Convert to JPEG with quality reduction
        buffer = io.BytesIO()
        if image.mode in ('RGBA', 'P'):
            image = image.convert('RGB')
        image.save(buffer, format='JPEG', quality=75)
        
        return base64.b64encode(buffer.getvalue()).decode('utf-8')
    except Exception as e:
        logger.warning(f"Image resize failed: {e}, using original")
        return base64_str

async def call_openai_vision(image_base64: str, locale: str = "tr-TR", use_fallback: bool = False, context: str = "") -> Dict[str, Any]:
    """Call OpenAI Vision API to analyze food image using emergentintegrations."""
    
    api_key = get_openai_api_key()
    if not api_key:
        logger.error("OpenAI API key not found in environment variables (OPENAI_KEY or OPENAI_API_KEY)")
        raise HTTPException(status_code=503, detail="OpenAI API key not configured. Please set OPENAI_KEY environment variable.")
    
    # Log key presence (not the actual key!)
    logger.info(f"OpenAI API key found, length: {len(api_key)}, starts with: {api_key[:7]}...")
    
    # Choose model
    model = VISION_MODEL_FALLBACK if use_fallback else VISION_MODEL_PRIMARY
    logger.info(f"Using model: {model}")
    
    # Resize image to reduce costs
    resized_base64 = resize_image_base64(image_base64)
    
    # Remove data URL prefix if present
    if resized_base64.startswith("data:"):
        resized_base64 = resized_base64.split(",", 1)[1]
    
    # Language-specific prompts
    is_turkish = locale.startswith("tr")
    
    # System prompt for structured food analysis
    system_prompt = """Sen bir yemek ve besin analiz uzmanısın. Fotoğraftaki yiyecekleri analiz et ve JSON formatında yanıt ver.

KURALLAR:
1. Sadece JSON formatında yanıt ver, başka hiçbir metin ekleme
2. Yemek tespit edemezsen items: [] olarak boş döndür
3. Porsiyon tahmininde görsel ipuçlarını kullan (tabak boyutu, el referansı vb.)
4. Güven skoru 0.0-1.0 arasında olmalı
5. """ + ("Türkçe yemek isimleri kullan" if is_turkish else "Use English food names") + """

JSON ŞEMASI:
{
  "items": [
    {
      "name": "Yemek adı",
      "quantity_estimate": {
        "grams": 150,
        "range_grams": [120, 180]
      },
      "calories_kcal": 250,
      "macros": {
        "protein_g": 15.5,
        "carbs_g": 30.0,
        "fat_g": 8.5
      },
      "confidence": 0.85
    }
  ],
  "total": {
    "calories_kcal": 250,
    "protein_g": 15.5,
    "carbs_g": 30.0,
    "fat_g": 8.5
  },
  "questions": ["Soru varsa buraya"],
  "notes": "Önemli notlar"
}"""

    # Build user prompt with optional context
    context_text = ""
    if context and context.strip():
        context_text = f"\n\nKULLANICI BİLGİSİ: '{context}' - Bu bilgiyi yiyecekleri tanımlarken dikkate al."
    
    user_prompt = f"""Bu fotoğraftaki yiyecekleri analiz et. Locale: {locale}{context_text}

Her yiyeceği tespit et ve besin değerlerini tahmin et. Porsiyon büyüklüğünü görsel ipuçlarından belirle.
Kesin JSON formatında yanıt ver."""

    try:
        # Determine API endpoint based on key type
        base_url = None
        if api_key and api_key.startswith("sk-emergent"):
            # Emergent keys need to go through Emergent proxy
            base_url = "https://integrations.emergentagent.com/llm"
            logger.info(f"Using Emergent proxy: {base_url}")
        else:
            # Real OpenAI key - use default OpenAI endpoint
            logger.info("Using direct OpenAI API")
        
        client = openai.AsyncOpenAI(api_key=api_key, base_url=base_url)
        
        # Prepare image URL
        image_url = f"data:image/jpeg;base64,{resized_base64}"
        
        # Use Chat Completions API for all models (OpenAI SDK 1.x compatible)
        logger.info(f"Using Chat Completions API for model: {model}")
        
        request_params = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": user_prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_url,
                                "detail": "low"  # Cost optimization
                            }
                        }
                    ]
                }
            ],
            "response_format": {"type": "json_object"},
            "max_tokens": 1500
        }
        
        response = await client.chat.completions.create(**request_params)
        content = response.choices[0].message.content or ""
        
        logger.info(f"Got response, length: {len(content)}, content preview: {content[:200] if content else 'EMPTY'}")
        
        if not content or not content.strip():
            logger.error("Empty response from OpenAI")
            raise HTTPException(status_code=500, detail="Empty response from AI model")
        
        result = json.loads(content)
        logger.info(f"Vision analysis complete. Model: {model}, Items found: {len(result.get('items', []))}")
        return result
        
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}")
        raise HTTPException(status_code=500, detail="Failed to parse AI response")
        
    except openai.RateLimitError as e:
        logger.error(f"OpenAI rate limit: {e}")
        if not use_fallback:
            # Retry with fallback model
            logger.info("Retrying with fallback model...")
            return await call_openai_vision(image_base64, locale, use_fallback=True)
        raise HTTPException(status_code=429, detail="API rate limit exceeded. Please try again later.")
    
    except openai.NotFoundError as e:
        # Model not found - likely GPT-5 not available for this API key
        logger.error(f"OpenAI model not found: {e}")
        if not use_fallback:
            logger.info(f"Model {model} not available, trying fallback model...")
            return await call_openai_vision(image_base64, locale, use_fallback=True)
        raise HTTPException(status_code=502, detail="AI model not available")
    
    except openai.APIError as e:
        logger.error(f"OpenAI API error: {e}")
        if not use_fallback:
            logger.info("Retrying with fallback model...")
            return await call_openai_vision(image_base64, locale, use_fallback=True)
        raise HTTPException(status_code=502, detail="Food analysis service temporarily unavailable")
    
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}, content: {content[:200] if content else 'empty'}")
        raise HTTPException(status_code=500, detail="Failed to parse analysis results")
    
    except Exception as e:
        logger.error(f"Unexpected error in vision analysis: {e}")
        # Try fallback on any unexpected error
        if not use_fallback:
            logger.info(f"Unexpected error with {model}, trying fallback...")
            return await call_openai_vision(image_base64, locale, use_fallback=True)
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@api_router.post("/food/analyze", response_model=AnalyzeFoodResponse)
async def analyze_food(request_data: AnalyzeFoodRequest, current_user: Optional[User] = Depends(get_current_user)):
    """
    Analyze food image using OpenAI Vision API.
    Returns detected food items with calorie and macro estimates.
    """
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    api_key = get_openai_api_key()
    if not api_key:
        logger.error("OpenAI API key missing - check OPENAI_KEY environment variable")
        raise HTTPException(status_code=503, detail="OpenAI API key not configured. Set OPENAI_KEY environment variable.")
    
    try:
        # Call OpenAI Vision with optional context from user
        result = await call_openai_vision(
            image_base64=request_data.image_base64,
            locale=request_data.locale,
            context=request_data.context  # Pass user-provided context for better accuracy
        )
        
        # Transform to legacy response format for frontend compatibility
        items = result.get("items", [])
        questions = result.get("questions", [])
        notes = result.get("notes", "")
        
        # Calculate totals
        total_calories = sum(item.get("calories_kcal", 0) for item in items)
        total_protein = sum(item.get("macros", {}).get("protein_g", 0) for item in items)
        total_carbs = sum(item.get("macros", {}).get("carbs_g", 0) for item in items)
        total_fat = sum(item.get("macros", {}).get("fat_g", 0) for item in items)
        
        # Transform items to frontend expected format
        transformed_items = []
        for item in items:
            qty = item.get("quantity_estimate", {})
            macros = item.get("macros", {})
            
            transformed_items.append({
                "label": item.get("name", "Bilinmeyen yemek"),
                "aliases": [],
                "portion": {
                    "estimate_g": qty.get("grams", 100),
                    "range_g": qty.get("range_grams", [80, 120]),
                    "basis": "visual"
                },
                "confidence": item.get("confidence", 0.7),
                "food_id": None,  # Not from database
                "calories": item.get("calories_kcal", 0),
                "protein": macros.get("protein_g", 0),
                "carbs": macros.get("carbs_g", 0),
                "fat": macros.get("fat_g", 0)
            })
        
        # Build notes list
        notes_list = []
        if notes:
            notes_list.append(notes)
        if questions:
            notes_list.extend(questions)
        
        return AnalyzeFoodResponse(
            items=transformed_items,
            notes=notes_list,
            needs_user_confirmation=len(questions) > 0 or any(item.get("confidence", 0) < 0.7 for item in items),
            total_calories=int(total_calories),
            total_protein=round(total_protein, 1),
            total_carbs=round(total_carbs, 1),
            total_fat=round(total_fat, 1)
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Food analyze error: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

# New endpoint with cleaner response format
@api_router.post("/food/analyze/v2", response_model=FoodAnalyzeResponse)
async def analyze_food_v2(request_data: FoodAnalyzeRequest, current_user: Optional[User] = Depends(get_current_user)):
    """
    Analyze food image using OpenAI Vision API (v2 with cleaner response).
    Returns detected food items with calorie and macro estimates.
    """
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    api_key = get_openai_api_key()
    if not api_key:
        raise HTTPException(status_code=503, detail="OpenAI API key not configured")
    
    try:
        result = await call_openai_vision(
            image_base64=request_data.image_base64,
            locale=request_data.locale
        )
        
        return FoodAnalyzeResponse(
            items=[FoodItem(**item) for item in result.get("items", [])],
            total=result.get("total", {"calories_kcal": 0, "protein_g": 0, "carbs_g": 0, "fat_g": 0}),
            questions=result.get("questions", []),
            notes=result.get("notes", "")
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Food analyze v2 error: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


# Debug endpoint to check OpenAI key status
@api_router.get("/debug/openai-status")
async def check_openai_status():
    """Check if OpenAI API key is configured (for debugging)."""
    api_key = get_openai_api_key()
    if api_key:
        return {
            "configured": True,
            "key_length": len(api_key),
            "key_prefix": api_key[:7] + "..." if len(api_key) > 7 else "too_short",
            "model_primary": VISION_MODEL_PRIMARY,
            "model_fallback": VISION_MODEL_FALLBACK,
        }
    else:
        return {
            "configured": False,
            "error": "OPENAI_KEY or OPENAI_API_KEY environment variable not found",
            "hint": "Set OPENAI_KEY=sk-your-key in Render environment variables"
        }


# -------------------------
# WATER TRACKING
# -------------------------
class AddWaterRequest(BaseModel):
  amount: int  # ml


async def get_user_water(user_id: str, date: Optional[str] = None) -> List[Dict[str, Any]]:
    """Get user water entries from MongoDB."""
    if mongo_db is None:
        return []
    target_date = date or today_str()
    cursor = mongo_db.water.find({"user_id": user_id, "date": target_date}, {"_id": 0})
    return await cursor.to_list(length=100)


async def add_user_water(user_id: str, water_data: Dict[str, Any]):
    """Add water entry to MongoDB."""
    require_mongo()
    await mongo_db.water.insert_one(water_data)


@api_router.post("/water/add")
async def add_water(data: AddWaterRequest, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  water_doc = {
    "water_id": f"water_{uuid.uuid4().hex[:12]}",
    "user_id": current_user.user_id,
    "amount": data.amount,
    "date": today_str(),
    "created_at": now_utc().isoformat(),
  }
  
  await add_user_water(current_user.user_id, water_doc)
  
  # Return updated today total
  entries = await get_user_water(current_user.user_id)
  total = sum(e.get("amount", 0) for e in entries)
  
  return {"message": "Water added", "total_amount": total}


@api_router.get("/water/today")
async def get_today_water(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  entries = await get_user_water(current_user.user_id)
  total = sum(e.get("amount", 0) for e in entries)
  
  return {"total_amount": total, "entries": entries, "date": today_str()}


@api_router.get("/water/weekly")
async def get_weekly_water(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  weekly_data = []
  for i in range(7):
    date = (now_utc() - timedelta(days=i)).strftime("%Y-%m-%d")
    entries = await get_user_water(current_user.user_id, date)
    total = sum(e.get("amount", 0) for e in entries)
    weekly_data.append({"date": date, "total_amount": total})
  
  return {"weekly_data": weekly_data}


# -------------------------
# STEPS TRACKING
# -------------------------
class SyncStepsRequest(BaseModel):
  steps: int
  source: str = "manual"


class ManualStepsRequest(BaseModel):
  steps: int


async def get_user_steps(user_id: str, date: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """Get user steps from MongoDB."""
    if mongo_db is None:
        return None
    target_date = date or today_str()
    return await mongo_db.steps.find_one({"user_id": user_id, "date": target_date}, {"_id": 0})


async def upsert_user_steps(user_id: str, steps_data: Dict[str, Any]):
    """Upsert steps to MongoDB."""
    require_mongo()
    date = steps_data.get("date", today_str())
    await mongo_db.steps.update_one(
        {"user_id": user_id, "date": date},
        {"$set": steps_data},
        upsert=True
    )


@api_router.post("/steps/sync")
async def sync_steps(data: SyncStepsRequest, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  steps_doc = {
    "user_id": current_user.user_id,
    "steps": data.steps,
    "source": data.source,
    "date": today_str(),
    "updated_at": now_utc().isoformat(),
  }
  
  await upsert_user_steps(current_user.user_id, steps_doc)
  return {"message": "Steps synced", "steps": data.steps}


@api_router.post("/steps/manual")
async def add_manual_steps(data: ManualStepsRequest, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  existing = await get_user_steps(current_user.user_id)
  current_steps = existing.get("steps", 0) if existing else 0
  new_total = current_steps + data.steps
  
  steps_doc = {
    "user_id": current_user.user_id,
    "steps": new_total,
    "source": "manual",
    "date": today_str(),
    "updated_at": now_utc().isoformat(),
  }
  
  await upsert_user_steps(current_user.user_id, steps_doc)
  return {"message": "Steps added", "steps": new_total}


@api_router.get("/steps/today")
async def get_today_steps(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  steps_data = await get_user_steps(current_user.user_id)
  
  if steps_data:
    return {"steps": steps_data.get("steps", 0), "source": steps_data.get("source", "none"), "date": today_str()}
  
  return {"steps": 0, "source": "none", "date": today_str()}


# -------------------------
# VITAMINS TRACKING
# -------------------------
VITAMIN_TEMPLATES = [
  {"template_id": "vit_001", "name": "D Vitamini", "default_time": "Sabah"},
  {"template_id": "vit_002", "name": "B12 Vitamini", "default_time": "Öğlen"},
  {"template_id": "vit_003", "name": "C Vitamini", "default_time": "Akşam"},
  {"template_id": "vit_004", "name": "Omega 3", "default_time": "Sabah"},
  {"template_id": "vit_005", "name": "Demir", "default_time": "Öğlen"},
]


class AddVitaminRequest(BaseModel):
  name: str
  time: str


class ToggleVitaminRequest(BaseModel):
  vitamin_id: str


async def get_user_vitamins(user_id: str) -> List[Dict[str, Any]]:
    """Get user vitamins from MongoDB."""
    if mongo_db is None:
        return []
    today = today_str()
    cursor = mongo_db.vitamins.find({"user_id": user_id}, {"_id": 0})
    vitamins = await cursor.to_list(length=100)
    # Reset is_taken if date changed
    for v in vitamins:
        if v.get("last_taken_date") != today:
            v["is_taken"] = False
    return vitamins


async def add_user_vitamin(user_id: str, vitamin_data: Dict[str, Any]):
    """Add vitamin to MongoDB."""
    require_mongo()
    await mongo_db.vitamins.insert_one(vitamin_data)


async def update_vitamin(user_id: str, vitamin_id: str, update: Dict[str, Any]):
    """Update vitamin in MongoDB."""
    require_mongo()
    await mongo_db.vitamins.update_one(
        {"user_id": user_id, "vitamin_id": vitamin_id},
        {"$set": update}
    )


async def delete_user_vitamin(user_id: str, vitamin_id: str):
    """Delete vitamin from MongoDB."""
    require_mongo()
    await mongo_db.vitamins.delete_one({"user_id": user_id, "vitamin_id": vitamin_id})


@api_router.get("/vitamins/templates")
async def get_vitamin_templates(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  return VITAMIN_TEMPLATES


@api_router.get("/vitamins/user")
async def get_vitamins_user(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  vitamins = await get_user_vitamins(current_user.user_id)
  return vitamins


@api_router.post("/vitamins/add")
async def add_vitamin(data: AddVitaminRequest, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  vitamin_doc = {
    "vitamin_id": f"vit_{uuid.uuid4().hex[:12]}",
    "user_id": current_user.user_id,
    "name": data.name,
    "time": data.time,
    "is_taken": False,
    "last_taken_date": None,
    "created_at": now_utc().isoformat(),
  }
  
  await add_user_vitamin(current_user.user_id, vitamin_doc)
  return {"message": "Vitamin added", "vitamin_id": vitamin_doc["vitamin_id"]}


@api_router.put("/vitamins/toggle")
async def toggle_vitamin(data: ToggleVitaminRequest, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  vitamins = await get_user_vitamins(current_user.user_id)
  vitamin = next((v for v in vitamins if v["vitamin_id"] == data.vitamin_id), None)
  
  if not vitamin:
    raise HTTPException(status_code=404, detail="Vitamin not found")
  
  new_is_taken = not vitamin.get("is_taken", False)
  await update_vitamin(current_user.user_id, data.vitamin_id, {
    "is_taken": new_is_taken,
    "last_taken_date": today_str() if new_is_taken else vitamin.get("last_taken_date"),
  })
  
  return {"message": "Vitamin toggled", "is_taken": new_is_taken}


@api_router.delete("/vitamins/{vitamin_id}")
async def delete_vitamin(vitamin_id: str, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  await delete_user_vitamin(current_user.user_id, vitamin_id)
  return {"message": "Vitamin deleted"}


@api_router.get("/vitamins/today")
async def get_vitamins_today(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  vitamins = await get_user_vitamins(current_user.user_id)
  taken_count = sum(1 for v in vitamins if v.get("is_taken", False))
  
  return {
    "vitamins": vitamins,
    "taken_count": taken_count,
    "total_count": len(vitamins),
    "date": today_str(),
  }


# -------------------------
# PREMIUM & ADS
# -------------------------
@api_router.post("/premium/activate")
async def activate_premium(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  # NOTE: Guest users CAN activate premium for Play Store testing
  # In production, uncomment the check below:
  # if current_user.user_id.startswith("guest_"):
  #   raise HTTPException(status_code=403, detail="Guest users cannot activate premium. Please create an account.")
  
  # Free premium activation for 30 days
  expires_at = now_utc() + timedelta(days=30)
  
  await store_update_user(current_user.user_id, {
    "is_premium": True,
    "premium_expires_at": expires_at,
  })
  
  return {
    "message": "Premium activated",
    "is_premium": True,
    "premium_expires_at": expires_at.isoformat(),
  }


@api_router.get("/premium/status")
async def get_premium_status(current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  user_doc = await store_get_user_by_id(current_user.user_id)
  
  is_premium = user_doc.get("is_premium", False)
  expires_at = user_doc.get("premium_expires_at")
  
  # Check if premium expired
  if is_premium and expires_at:
    if isinstance(expires_at, str):
      expires_at = datetime.fromisoformat(expires_at.replace("Z", "+00:00"))
    if expires_at.tzinfo is None:
      expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < now_utc():
      is_premium = False
      await store_update_user(current_user.user_id, {"is_premium": False})
  
  return {
    "is_premium": is_premium,
    "premium_expires_at": expires_at.isoformat() if expires_at else None,
    "ads_watched": user_doc.get("ads_watched", 0),
  }


class WatchAdRequest(BaseModel):
  ad_count: int = 1


@api_router.post("/ads/watch")
async def watch_ad(data: WatchAdRequest, current_user: Optional[User] = Depends(get_current_user)):
  if not current_user:
    raise HTTPException(status_code=401, detail="Not authenticated")
  
  user_doc = await store_get_user_by_id(current_user.user_id)
  current_ads = user_doc.get("ads_watched", 0)
  new_ads = current_ads + data.ad_count
  
  update_data = {"ads_watched": new_ads}
  
  # Every 3 ads = 24h premium
  if new_ads >= 3:
    remaining = new_ads % 3
    premium_days = new_ads // 3
    
    expires_at = now_utc() + timedelta(hours=24 * premium_days)
    update_data["is_premium"] = True
    update_data["premium_expires_at"] = expires_at
    update_data["ads_watched"] = remaining
  
  await store_update_user(current_user.user_id, update_data)
  
  updated_user = await store_get_user_by_id(current_user.user_id)
  
  return {
    "message": "Ad watched",
    "ads_watched": updated_user.get("ads_watched", 0),
    "ads_until_premium": 3 - updated_user.get("ads_watched", 0),
    "is_premium": updated_user.get("is_premium", False),
  }


# -------------------------
# ACCOUNT DELETION (Google Play Console requirement)
# -------------------------

# Rate limiting storage (simple in-memory)
_deletion_request_times: Dict[str, List[datetime]] = {}
RATE_LIMIT_REQUESTS = 5  # max requests per IP
RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds

def check_rate_limit(ip: str) -> bool:
  """Check if IP is rate limited. Returns True if allowed, False if blocked."""
  now = datetime.now(timezone.utc)
  window_start = now - timedelta(seconds=RATE_LIMIT_WINDOW)
  
  if ip not in _deletion_request_times:
    _deletion_request_times[ip] = []
  
  # Clean old entries
  _deletion_request_times[ip] = [t for t in _deletion_request_times[ip] if t > window_start]
  
  if len(_deletion_request_times[ip]) >= RATE_LIMIT_REQUESTS:
    return False
  
  _deletion_request_times[ip].append(now)
  return True

def validate_email(email: str) -> bool:
  """Basic email validation."""
  pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
  return bool(re.match(pattern, email))

async def store_deletion_request(request_data: dict):
  """Store deletion request in MongoDB or fallback to file."""
  if mongo_db is not None:
    await mongo_db.deletion_requests.insert_one(request_data)
  else:
    # Fallback to JSONL file
    requests_file = ROOT_DIR / "deletion_requests.jsonl"
    with open(requests_file, "a", encoding="utf-8") as f:
      f.write(json.dumps(request_data, default=str) + "\n")

ACCOUNT_DELETION_PAGE_HTML = """
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hesap Silme - CalorieDiet</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 700px;
            margin: 0 auto;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 24px;
            margin-bottom: 8px;
        }
        .header p {
            opacity: 0.9;
            font-size: 14px;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section h2 {
            color: #4CAF50;
            font-size: 18px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .section h2::before {
            content: "•";
            color: #4CAF50;
        }
        .section p, .section li {
            color: #555;
            font-size: 14px;
        }
        .section ul {
            padding-left: 20px;
            margin-top: 8px;
        }
        .section li {
            margin-bottom: 6px;
        }
        .highlight-box {
            background: #f8f9fa;
            border-left: 4px solid #4CAF50;
            padding: 15px;
            border-radius: 0 8px 8px 0;
            margin: 15px 0;
        }
        .warning-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            border-radius: 0 8px 8px 0;
            margin: 15px 0;
        }
        .form-section {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 12px;
            margin-top: 20px;
        }
        .form-section h2 {
            margin-bottom: 15px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 6px;
            color: #333;
            font-size: 14px;
        }
        .form-group input, .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        .form-group input:focus, .form-group textarea:focus {
            outline: none;
            border-color: #4CAF50;
        }
        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }
        .honeypot {
            position: absolute;
            left: -9999px;
        }
        .submit-btn {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            border: none;
            padding: 14px 28px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            width: 100%;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
        }
        .footer {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-top: 1px solid #e0e0e0;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .emoji { font-size: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍎 CalorieDiet (Calorie & Diet Tracker)</h1>
            <p>Hesap Silme ve Veri Yönetimi</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Hesabınızı Nasıl Silebilirsiniz?</h2>
                <p>CalorieDiet hesabınızı aşağıdaki yöntemlerden biriyle silebilirsiniz:</p>
                
                <div class="highlight-box">
                    <strong>📱 Uygulama İçinden (Önerilen):</strong>
                    <ol style="margin-top: 8px; padding-left: 20px;">
                        <li>Uygulamayı açın</li>
                        <li>Profil sekmesine gidin</li>
                        <li>"Çıkış Yap" butonuna tıklayın</li>
                        <li>Hesabınız ve verileriniz silinecektir</li>
                    </ol>
                </div>
                
                <div class="highlight-box">
                    <strong>🌐 Web Üzerinden:</strong>
                    <p style="margin-top: 8px;">Uygulamaya erişemiyorsanız, aşağıdaki formu kullanarak hesap silme talebinde bulunabilirsiniz.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>Silinecek Veriler</h2>
                <p>Hesabınız silindiğinde aşağıdaki veriler kalıcı olarak kaldırılacaktır:</p>
                <ul>
                    <li><strong>Hesap Bilgileri:</strong> E-posta adresi, kullanıcı adı, profil bilgileri</li>
                    <li><strong>Sağlık Verileri:</strong> Boy, kilo, yaş, cinsiyet, aktivite seviyesi</li>
                    <li><strong>Öğün Kayıtları:</strong> Tüm yemek ve kalori kayıtları</li>
                    <li><strong>Su Tüketimi:</strong> Günlük su içme kayıtları</li>
                    <li><strong>Adım Verileri:</strong> Günlük adım sayısı kayıtları</li>
                    <li><strong>Vitamin Takibi:</strong> Vitamin ve takviye kayıtları</li>
                    <li><strong>Diyet Planları:</strong> Oluşturulan veya kaydedilen diyet planları</li>
                    <li><strong>Premium Üyelik:</strong> Premium abonelik durumu</li>
                </ul>
            </div>
            
            <div class="section">
                <h2>Saklanan Veriler</h2>
                <div class="warning-box">
                    <p>Yasal zorunluluklar ve güvenlik nedeniyle aşağıdaki veriler belirli bir süre saklanabilir:</p>
                    <ul style="margin-top: 8px;">
                        <li>Hesap silme talep kayıtları (1 yıl)</li>
                        <li>Güvenlik logları (90 gün)</li>
                    </ul>
                    <p style="margin-top: 8px;"><em>Not: Uygulamamızda ödeme/faturalama sistemi bulunmamaktadır.</em></p>
                </div>
            </div>
            
            <div class="section">
                <h2>İşlem Süresi</h2>
                <p>Hesap silme işlemi <strong>7-30 gün</strong> içinde tamamlanır. İşlem tamamlandığında size e-posta ile bilgi verilecektir.</p>
            </div>
            
            <div class="form-section">
                <h2>📝 Hesap Silme Talebi</h2>
                <p style="margin-bottom: 15px; color: #666;">Uygulamaya erişemiyorsanız, aşağıdaki formu doldurun:</p>
                
                <form action="/api/account-deletion-request" method="POST">
                    <div class="form-group">
                        <label for="email">E-posta Adresi *</label>
                        <input type="email" id="email" name="email" required 
                               placeholder="hesabiniz@email.com">
                    </div>
                    
                    <div class="form-group">
                        <label for="note">Ek Not (İsteğe bağlı)</label>
                        <textarea id="note" name="note" maxlength="500"
                                  placeholder="Varsa eklemek istediğiniz bilgiler..."></textarea>
                    </div>
                    
                    <!-- Honeypot field for spam protection -->
                    <div class="honeypot">
                        <input type="text" name="website" tabindex="-1" autocomplete="off">
                    </div>
                    
                    <button type="submit" class="submit-btn">Silme Talebi Gönder</button>
                </form>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Destek:</strong> <a href="mailto:eystudio.3d@gmail.com">eystudio.3d@gmail.com</a></p>
            <p style="margin-top: 8px; font-size: 12px; color: #888;">
                © 2024 CalorieDiet. Tüm hakları saklıdır.
            </p>
        </div>
    </div>
</body>
</html>
"""

DELETION_REQUEST_SUCCESS_HTML = """
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Talep Alındı - CalorieDiet</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            padding: 40px;
            text-align: center;
        }
        .icon {
            font-size: 64px;
            margin-bottom: 20px;
        }
        h1 {
            color: #4CAF50;
            margin-bottom: 15px;
            font-size: 24px;
        }
        p {
            color: #555;
            margin-bottom: 10px;
        }
        .request-id {
            background: #f8f9fa;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: monospace;
            margin: 20px 0;
            font-size: 14px;
        }
        .info-box {
            background: #e8f5e9;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            text-align: left;
        }
        .info-box ul {
            padding-left: 20px;
            margin-top: 8px;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #4CAF50;
            text-decoration: none;
            font-weight: 600;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">✅</div>
        <h1>Talebiniz Alındı!</h1>
        <p>Hesap silme talebiniz başarıyla kaydedildi.</p>
        
        <div class="request-id">
            <strong>Talep No:</strong> __REQUEST_ID__
        </div>
        
        <div class="info-box">
            <strong>📋 Sonraki Adımlar:</strong>
            <ul>
                <li>Talebiniz 7-30 gün içinde işleme alınacak</li>
                <li>İşlem tamamlandığında e-posta ile bilgilendirileceksiniz</li>
                <li>Sorularınız için: <a href="mailto:eystudio.3d@gmail.com">eystudio.3d@gmail.com</a></li>
            </ul>
        </div>
        
        <a href="/account-deletion" class="back-link">← Geri Dön</a>
    </div>
</body>
</html>
"""

DELETION_REQUEST_ERROR_HTML = """
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hata - CalorieDiet</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            padding: 40px;
            text-align: center;
        }
        .icon { font-size: 64px; margin-bottom: 20px; }
        h1 { color: #f44336; margin-bottom: 15px; font-size: 24px; }
        p { color: #555; margin-bottom: 10px; }
        .error-msg {
            background: #ffebee;
            color: #c62828;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #4CAF50;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">❌</div>
        <h1>Bir Hata Oluştu</h1>
        <div class="error-msg">__ERROR_MESSAGE__</div>
        <a href="/account-deletion" class="back-link">← Tekrar Dene</a>
    </div>
</body>
</html>
"""

@app.get("/account-deletion", response_class=HTMLResponse)
async def account_deletion_page():
  """
  Public page for Google Play Console account deletion requirement.
  Displays information about how to delete account and a request form.
  """
  return HTMLResponse(content=ACCOUNT_DELETION_PAGE_HTML, status_code=200)

@app.head("/account-deletion")
async def account_deletion_head():
  # Some validators (and curl -I) use HEAD requests.
  # Explicitly support HEAD so the endpoint never returns 405.
  return Response(status_code=200)

@app.get("/account-deletion/", response_class=HTMLResponse)
async def account_deletion_page_trailing_slash():
  # Serve the same content for trailing slash to avoid 404/redirect issues.
  return HTMLResponse(content=ACCOUNT_DELETION_PAGE_HTML, status_code=200)

@app.head("/account-deletion/")
async def account_deletion_head_trailing_slash():
  return Response(status_code=200)



@api_router.post("/account-deletion-request", response_class=HTMLResponse)
async def submit_deletion_request(
  request: Request,
  email: str = Form(...),
  note: str = Form(""),
  website: str = Form("")  # Honeypot field
):
  """
  Handle account deletion request form submission.
  Validates input, checks rate limit, and stores the request.
  """
  # Get client IP for rate limiting
  client_ip = request.client.host if request.client else "unknown"
  forwarded_for = request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
  if forwarded_for:
    client_ip = forwarded_for
  
  # Honeypot check - if filled, it's likely a bot
  if website:
    logger.warning(f"Honeypot triggered from IP: {client_ip}")
    return HTMLResponse(
      content=DELETION_REQUEST_ERROR_HTML.replace("__ERROR_MESSAGE__", "İstek işlenemedi. Lütfen daha sonra tekrar deneyin."),
      status_code=400
    )
  
  # Rate limit check
  if not check_rate_limit(client_ip):
    logger.warning(f"Rate limit exceeded for IP: {client_ip}")
    return HTMLResponse(
      content=DELETION_REQUEST_ERROR_HTML.replace("__ERROR_MESSAGE__", "Çok fazla istek gönderildi. Lütfen 1 saat sonra tekrar deneyin."),
      status_code=429
    )
  
  # Validate email
  email = email.strip().lower()
  if not email or not validate_email(email):
    return HTMLResponse(
      content=DELETION_REQUEST_ERROR_HTML.replace("__ERROR_MESSAGE__", "Geçerli bir e-posta adresi giriniz."),
      status_code=400
    )
  
  # Validate note length
  note = note.strip()[:500] if note else ""
  
  # Generate request ID
  request_id = f"DEL-{uuid.uuid4().hex[:8].upper()}"
  
  # Prepare request data
  request_data = {
    "request_id": request_id,
    "email": email,
    "note": note,
    "ip_address": client_ip,
    "user_agent": request.headers.get("User-Agent", ""),
    "created_at": datetime.now(timezone.utc).isoformat(),
    "status": "pending"
  }
  
  try:
    # Store the request
    await store_deletion_request(request_data)
    logger.info(f"Account deletion request stored: {request_id} for {email}")
    
    return HTMLResponse(
      content=DELETION_REQUEST_SUCCESS_HTML.replace("__REQUEST_ID__", request_id),
      status_code=200
    )
  except Exception as e:
    logger.error(f"Failed to store deletion request: {e}")
    return HTMLResponse(
      content=DELETION_REQUEST_ERROR_HTML.replace("__ERROR_MESSAGE__", "Talep kaydedilemedi. Lütfen daha sonra tekrar deneyin."),
      status_code=500
    )


# -------------------------
# GPT-5 NANO INTEGRATION & AI DIET GENERATION
# -------------------------

class GeneratePersonalDietRequest(BaseModel):
    name: str
    target_calories: int
    preferences: List[str] = []
    restrictions: List[str] = []
    goal: str = "balanced"
    duration_days: int = 30

class StartDietRequest(BaseModel):
    """Request model for starting a diet."""
    diet_id: str
    start_date: Optional[str] = None  # ISO format, defaults to today

@api_router.post("/diet/generate-weekly")
async def generate_weekly_diet(
    request: GeneratePersonalDietRequest,
    current_user: Optional[User] = Depends(get_current_user)
):
    """Generate detailed 7-day diet plan with full meal details (Premium feature)."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if not current_user.is_premium:
        raise HTTPException(status_code=403, detail="Premium subscription required")
    
    api_key = get_openai_api_key()
    if not api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")
    
    try:
        prompt = f"""Create a detailed 7-day diet plan in JSON format. Be very specific with ingredients and portions.

Name: {request.name}
Target Calories: {request.target_calories} kcal/day
Goal: {request.goal}
Preferences: {', '.join(request.preferences) if request.preferences else 'None'}
Restrictions: {', '.join(request.restrictions) if request.restrictions else 'None'}

Return ONLY valid JSON with this exact structure:
{{
  "name": "{request.name}",
  "description": "Brief description of the diet plan",
  "target_calories": {request.target_calories},
  "goal": "{request.goal}",
  "duration_days": 7,
  "macros": {{"protein": 30, "carbs": 40, "fat": 30}},
  "days": [
    {{
      "day": 1,
      "day_name": "Pazartesi",
      "total_calories": 1800,
      "breakfast": {{
        "name": "Meal name",
        "description": "Detailed description with ingredients",
        "calories": 400,
        "protein": 20,
        "carbs": 40,
        "fat": 15,
        "ingredients": ["2 yumurta", "1 dilim tam buğday ekmeği", "50g peynir"],
        "preparation": "Brief preparation instructions"
      }},
      "morning_snack": {{
        "name": "Snack name",
        "description": "Description",
        "calories": 150,
        "protein": 5,
        "carbs": 20,
        "fat": 5,
        "ingredients": ["1 elma", "10 badem"]
      }},
      "lunch": {{
        "name": "Meal name",
        "description": "Description with ingredients",
        "calories": 500,
        "protein": 30,
        "carbs": 50,
        "fat": 20,
        "ingredients": ["150g tavuk göğsü", "200g bulgur pilavı", "salata"],
        "preparation": "Preparation instructions"
      }},
      "afternoon_snack": {{
        "name": "Snack name",
        "description": "Description",
        "calories": 150,
        "protein": 10,
        "carbs": 15,
        "fat": 5,
        "ingredients": ["1 kase yoğurt", "1 yemek kaşığı bal"]
      }},
      "dinner": {{
        "name": "Meal name",
        "description": "Description with ingredients",
        "calories": 500,
        "protein": 25,
        "carbs": 45,
        "fat": 20,
        "ingredients": ["200g balık", "sebze", "zeytinyağı"],
        "preparation": "Preparation instructions"
      }},
      "evening_snack": {{
        "name": "Light snack",
        "description": "Description",
        "calories": 100,
        "protein": 5,
        "carbs": 10,
        "fat": 5,
        "ingredients": ["1 bardak süt"]
      }}
    }}
  ],
  "shopping_list": ["yumurta", "tam buğday ekmeği", "tavuk göğsü", "sebzeler"],
  "tips": ["Bol su için", "Öğün atlamayın", "Yavaş yiyin"]
}}

Create all 7 days with different, varied, and delicious meals. Use Turkish cuisine and ingredients available in Turkey."""

        # Check if using Emergent LLM key
        base_url = None
        if api_key and api_key.startswith("sk-emergent"):
            base_url = "https://emergent-api.onrender.com/v1"
        
        client = openai.OpenAI(api_key=api_key, base_url=base_url)
        response = client.chat.completions.create(
            model=VISION_MODEL_PRIMARY,
            messages=[{"role": "user", "content": prompt}],
            max_completion_tokens=8000,
            response_format={"type": "json_object"}
        )
        
        result_text = response.choices[0].message.content
        diet_plan = parse_llm_json_response(result_text)
        
        # Add metadata
        diet_plan["diet_id"] = f"weekly_{uuid.uuid4().hex[:12]}"
        diet_plan["user_id"] = current_user.user_id
        diet_plan["created_at"] = now_utc().isoformat()
        diet_plan["is_active"] = False
        diet_plan["type"] = "weekly"
        
        # Save to database
        await mongo_db.personal_diets.insert_one(diet_plan)
        
        return {"message": "Weekly diet plan created", "diet": diet_plan}
        
    except Exception as e:
        logger.error(f"Weekly diet generation error: {e}")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


@api_router.post("/diet/start")
async def start_diet(
    request: StartDietRequest,
    current_user: Optional[User] = Depends(get_current_user)
):
    """Start a 30-day diet program from a diet plan."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Find the diet plan
    diet = await mongo_db.personal_diets.find_one({
        "diet_id": request.diet_id,
        "user_id": current_user.user_id
    })
    
    if not diet:
        raise HTTPException(status_code=404, detail="Diet not found")
    
    # Calculate start date
    if request.start_date:
        start_date = datetime.fromisoformat(request.start_date.replace('Z', '+00:00'))
    else:
        start_date = now_utc()
    
    # Create 30-day program by cycling through 7-day plan
    days_in_plan = len(diet.get("days", []))
    if days_in_plan == 0:
        raise HTTPException(status_code=400, detail="Diet has no days")
    
    program_days = []
    for i in range(30):
        day_index = i % days_in_plan
        day_data = diet["days"][day_index].copy()
        day_data["program_day"] = i + 1
        day_data["date"] = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
        day_data["completed"] = False
        day_data["unlocked"] = i == 0  # Only first day is unlocked
        program_days.append(day_data)
    
    # Create active diet program
    active_diet = {
        "program_id": f"program_{uuid.uuid4().hex[:12]}",
        "diet_id": request.diet_id,
        "user_id": current_user.user_id,
        "name": diet.get("name", "Kişisel Diyet"),
        "description": diet.get("description", ""),
        "target_calories": diet.get("target_calories", 2000),
        "start_date": start_date.isoformat(),
        "end_date": (start_date + timedelta(days=29)).isoformat(),
        "current_day": 1,
        "total_days": 30,
        "days": program_days,
        "is_active": True,
        "created_at": now_utc().isoformat()
    }
    
    # Deactivate any existing active programs
    await mongo_db.active_diets.update_many(
        {"user_id": current_user.user_id, "is_active": True},
        {"$set": {"is_active": False}}
    )
    
    # Save new active diet
    await mongo_db.active_diets.insert_one(active_diet)
    
    return {"message": "Diet program started", "program": active_diet}


@api_router.get("/diet/active")
async def get_active_diet(current_user: Optional[User] = Depends(get_current_user)):
    """Get user's active diet program."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    program = await mongo_db.active_diets.find_one({
        "user_id": current_user.user_id,
        "is_active": True
    })
    
    if not program:
        return {"program": None}
    
    # Remove MongoDB _id
    if "_id" in program:
        del program["_id"]
    
    return {"program": program}


@api_router.get("/diet/program/{program_id}/day/{day_number}")
async def get_diet_day(
    program_id: str,
    day_number: int,
    current_user: Optional[User] = Depends(get_current_user)
):
    """Get specific day details from active diet program."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    program = await mongo_db.active_diets.find_one({
        "program_id": program_id,
        "user_id": current_user.user_id
    })
    
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    
    if day_number < 1 or day_number > len(program.get("days", [])):
        raise HTTPException(status_code=400, detail="Invalid day number")
    
    day_data = program["days"][day_number - 1]
    
    # Check if day is unlocked
    if not day_data.get("unlocked", False) and day_number > 1:
        # Check if previous day is completed
        prev_day = program["days"][day_number - 2]
        if not prev_day.get("completed", False):
            raise HTTPException(status_code=403, detail="Previous day must be completed first")
    
    return {"day": day_data, "program_name": program.get("name")}


@api_router.post("/diet/program/{program_id}/day/{day_number}/complete")
async def complete_diet_day(
    program_id: str,
    day_number: int,
    current_user: Optional[User] = Depends(get_current_user)
):
    """Mark a day as completed and unlock next day."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    program = await mongo_db.active_diets.find_one({
        "program_id": program_id,
        "user_id": current_user.user_id
    })
    
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    
    if day_number < 1 or day_number > len(program.get("days", [])):
        raise HTTPException(status_code=400, detail="Invalid day number")
    
    # Mark day as completed
    update_fields = {
        f"days.{day_number - 1}.completed": True,
        "current_day": day_number + 1 if day_number < 30 else 30
    }
    
    # Unlock next day if exists
    if day_number < 30:
        update_fields[f"days.{day_number}.unlocked"] = True
    
    await mongo_db.active_diets.update_one(
        {"program_id": program_id},
        {"$set": update_fields}
    )
    
    return {"message": f"Day {day_number} completed", "next_day": day_number + 1 if day_number < 30 else None}


@api_router.post("/diet/generate-personal")
async def generate_personal_diet(
    request: GeneratePersonalDietRequest,
    current_user: Optional[User] = Depends(get_current_user)
):
    """Generate personalized diet plan using GPT-5 nano (Premium feature)."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if not current_user.is_premium:
        raise HTTPException(status_code=403, detail="Premium subscription required")
    
    api_key = get_openai_api_key()
    if not api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")
    
    try:
        prompt = f"""Create a {request.duration_days}-day personalized diet plan in JSON format:

Name: {request.name}
Target Calories: {request.target_calories} kcal/day
Goal: {request.goal}
Preferences: {', '.join(request.preferences) if request.preferences else 'None'}
Restrictions: {', '.join(request.restrictions) if request.restrictions else 'None'}

Return ONLY valid JSON with this structure:
{{
  "diet_id": "unique_id",
  "name": "Diet Name",
  "description": "Brief description",
  "target_calories": {request.target_calories},
  "duration_days": {request.duration_days},
  "days": [
    {{
      "day": 1,
      "breakfast": {{"name": "Meal", "calories": 400, "protein": 20, "carbs": 40, "fat": 15}},
      "lunch": {{"name": "Meal", "calories": 500, "protein": 30, "carbs": 50, "fat": 20}},
      "dinner": {{"name": "Meal", "calories": 450, "protein": 25, "carbs": 45, "fat": 18}},
      "snacks": [{{"name": "Snack", "calories": 150, "protein": 5, "carbs": 20, "fat": 5}}]
    }}
  ]
}}

Make meals realistic, delicious, and balanced. Use Turkish cuisine."""

        # Check if using Emergent LLM key
        base_url = None
        if api_key and api_key.startswith("sk-emergent"):
            base_url = "https://emergent-api.onrender.com/v1"
        
        client = openai.OpenAI(api_key=api_key, base_url=base_url)
        response = client.chat.completions.create(
            model=VISION_MODEL_PRIMARY,
            messages=[{"role": "user", "content": prompt}],
            max_completion_tokens=4000,
            response_format={"type": "json_object"}
        )
        
        result_text = response.choices[0].message.content
        diet_plan = parse_llm_json_response(result_text)
        
        # Save to database
        diet_plan["diet_id"] = f"personal_{uuid.uuid4().hex[:12]}"
        diet_plan["user_id"] = current_user.user_id
        diet_plan["created_at"] = now_utc().isoformat()
        diet_plan["is_active"] = True
        
        await mongo_db.personal_diets.insert_one(diet_plan)
        
        return {"message": "Personal diet created", "diet": diet_plan}
        
    except Exception as e:
        logger.error(f"Diet generation error: {e}")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


@api_router.get("/diet/my-diets")
async def get_my_diets(current_user: Optional[User] = Depends(get_current_user)):
    """Get user's saved diet plans."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    cursor = mongo_db.personal_diets.find({
        "user_id": current_user.user_id,
        "is_active": True
    })
    
    diets = []
    async for doc in cursor:
        doc.pop("_id", None)
        diets.append(doc)
    
    return {"diets": diets}


# -------------------------
# WATER TRACKING (Extended)
# -------------------------

@api_router.post("/water/remove")
async def remove_water(data: AddWaterRequest, current_user: Optional[User] = Depends(get_current_user)):
    """Remove/subtract water amount from today's total."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    entries = await get_user_water(current_user.user_id)
    
    if not entries:
        raise HTTPException(status_code=400, detail="No water to remove")
    
    current_total = sum(e.get("amount", 0) for e in entries)
    amount_to_remove = min(data.amount, current_total)
    
    if amount_to_remove <= 0:
        raise HTTPException(status_code=400, detail="No water to remove")
    
    water_doc = {
        "water_id": f"water_{uuid.uuid4().hex[:12]}",
        "user_id": current_user.user_id,
        "amount": -amount_to_remove,
        "date": today_str(),
        "created_at": now_utc().isoformat(),
    }
    
    await add_user_water(current_user.user_id, water_doc)
    
    entries = await get_user_water(current_user.user_id)
    total = sum(e.get("amount", 0) for e in entries)
    
    return {"message": "Water removed", "total_amount": max(0, total)}


@api_router.delete("/water/{water_id}")
async def delete_water_entry(water_id: str, current_user: Optional[User] = Depends(get_current_user)):
    """Delete a specific water entry."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    result = await mongo_db.water.delete_one({
        "water_id": water_id,
        "user_id": current_user.user_id
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Water entry not found")
    
    entries = await get_user_water(current_user.user_id)
    total = sum(e.get("amount", 0) for e in entries)
    
    return {"message": "Water entry deleted", "total_amount": max(0, total)}


# -------------------------
# DIET TEMPLATES
# -------------------------

DIET_TEMPLATES = [
    {
        "diet_id": "keto_30",
        "name": "Keto Diyeti",
        "name_en": "Keto Diet",
        "description": "Düşük karbonhidratlı, yüksek yağlı diyet programı",
        "description_en": "Low carb, high fat diet program",
        "duration_days": 30,
        "category": "weight_loss",
        "target_calories": 1800,
        "macros": {"protein": 25, "carbs": 5, "fat": 70},
        "is_premium": True,
        "image_url": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400"
    },
    {
        "diet_id": "mediterranean_30",
        "name": "Akdeniz Diyeti",
        "name_en": "Mediterranean Diet",
        "description": "Dengeli ve sürdürülebilir beslenme programı",
        "description_en": "Balanced and sustainable nutrition program",
        "duration_days": 30,
        "category": "balanced",
        "target_calories": 2000,
        "macros": {"protein": 20, "carbs": 50, "fat": 30},
        "is_premium": True,
        "image_url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"
    },
    {
        "diet_id": "muscle_60",
        "name": "Kas Yapma Diyeti",
        "name_en": "Muscle Building Diet",
        "description": "Yüksek proteinli kas gelişimi programı",
        "description_en": "High protein muscle building program",
        "duration_days": 60,
        "category": "muscle_building",
        "target_calories": 2500,
        "macros": {"protein": 35, "carbs": 45, "fat": 20},
        "is_premium": True,
        "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
    },
    {
        "diet_id": "vegetarian_30",
        "name": "Vejetaryen Diyeti",
        "name_en": "Vegetarian Diet",
        "description": "Bitkisel beslenme programı",
        "description_en": "Plant-based nutrition program",
        "duration_days": 30,
        "category": "vegetarian",
        "target_calories": 1900,
        "macros": {"protein": 20, "carbs": 55, "fat": 25},
        "is_premium": True,
        "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400"
    }
]

@api_router.get("/diets/templates")
async def get_diet_templates(
    lang: str = "tr",
    current_user: Optional[User] = Depends(get_current_user)
):
    """Get all diet templates."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if lang == "en":
        return [{
            "diet_id": d["diet_id"],
            "name": d["name_en"],
            "description": d["description_en"],
            "duration_days": d["duration_days"],
            "category": d["category"],
            "target_calories": d["target_calories"],
            "macros": d["macros"],
            "is_premium": d["is_premium"],
            "image_url": d["image_url"]
        } for d in DIET_TEMPLATES]
    
    return DIET_TEMPLATES


# Genişletilmiş Diyet Şablonları
EXTENDED_DIET_TEMPLATES = [
    # Kilo Verme Diyetleri
    {
        "diet_id": "calorie_deficit_beginner",
        "name": "Başlangıç Kalori Açığı",
        "name_en": "Beginner Calorie Deficit",
        "description": "Yeni başlayanlar için hafif kalori açığı ile sağlıklı kilo verme",
        "description_en": "Healthy weight loss with mild calorie deficit for beginners",
        "duration_days": 30,
        "category": "weight_loss",
        "difficulty": "easy",
        "target_deficit": 300,
        "macros": {"protein": 30, "carbs": 40, "fat": 30},
        "suitable_for": ["lose_weight"],
        "bmi_range": [25, 35],
        "is_premium": False
    },
    {
        "diet_id": "keto_30",
        "name": "Ketojenik Diyet",
        "name_en": "Ketogenic Diet",
        "description": "Düşük karbonhidrat, yüksek yağ ile hızlı yağ yakımı",
        "description_en": "Fast fat burning with low carb, high fat approach",
        "duration_days": 30,
        "category": "weight_loss",
        "difficulty": "hard",
        "target_deficit": 500,
        "macros": {"protein": 25, "carbs": 5, "fat": 70},
        "suitable_for": ["lose_weight"],
        "bmi_range": [27, 40],
        "is_premium": True
    },
    {
        "diet_id": "intermittent_fasting",
        "name": "Aralıklı Oruç (16:8)",
        "name_en": "Intermittent Fasting (16:8)",
        "description": "16 saat oruç, 8 saat yeme penceresi ile metabolizma hızlandırma",
        "description_en": "Boost metabolism with 16 hour fast, 8 hour eating window",
        "duration_days": 30,
        "category": "weight_loss",
        "difficulty": "medium",
        "target_deficit": 400,
        "macros": {"protein": 30, "carbs": 35, "fat": 35},
        "suitable_for": ["lose_weight"],
        "bmi_range": [24, 35],
        "is_premium": False
    },
    {
        "diet_id": "low_carb",
        "name": "Düşük Karbonhidrat",
        "name_en": "Low Carb Diet",
        "description": "Karbonhidrat kısıtlaması ile dengeli kilo verme",
        "description_en": "Balanced weight loss with carbohydrate restriction",
        "duration_days": 30,
        "category": "weight_loss",
        "difficulty": "medium",
        "target_deficit": 400,
        "macros": {"protein": 35, "carbs": 20, "fat": 45},
        "suitable_for": ["lose_weight"],
        "bmi_range": [25, 35],
        "is_premium": False
    },
    # Kas Yapma Diyetleri
    {
        "diet_id": "muscle_building",
        "name": "Kas Yapma Programı",
        "name_en": "Muscle Building Program",
        "description": "Yüksek protein ile kas kütlesi artırma",
        "description_en": "Increase muscle mass with high protein intake",
        "duration_days": 60,
        "category": "muscle_building",
        "difficulty": "medium",
        "target_surplus": 300,
        "macros": {"protein": 35, "carbs": 45, "fat": 20},
        "suitable_for": ["build_muscle", "gain_weight"],
        "bmi_range": [18, 28],
        "is_premium": True
    },
    {
        "diet_id": "lean_bulk",
        "name": "Temiz Hacim",
        "name_en": "Lean Bulk",
        "description": "Minimum yağ artışı ile kas yapma",
        "description_en": "Build muscle with minimal fat gain",
        "duration_days": 60,
        "category": "muscle_building",
        "difficulty": "hard",
        "target_surplus": 200,
        "macros": {"protein": 35, "carbs": 40, "fat": 25},
        "suitable_for": ["build_muscle"],
        "bmi_range": [20, 26],
        "is_premium": True
    },
    # Dengeli Diyetler
    {
        "diet_id": "mediterranean",
        "name": "Akdeniz Diyeti",
        "name_en": "Mediterranean Diet",
        "description": "Sürdürülebilir, kalp sağlığını destekleyen beslenme",
        "description_en": "Sustainable nutrition supporting heart health",
        "duration_days": 30,
        "category": "balanced",
        "difficulty": "easy",
        "target_deficit": 0,
        "macros": {"protein": 20, "carbs": 50, "fat": 30},
        "suitable_for": ["maintain", "eat_healthy"],
        "bmi_range": [18, 30],
        "is_premium": False
    },
    {
        "diet_id": "balanced_nutrition",
        "name": "Dengeli Beslenme",
        "name_en": "Balanced Nutrition",
        "description": "Tüm besin gruplarından dengeli tüketim",
        "description_en": "Balanced consumption from all food groups",
        "duration_days": 30,
        "category": "balanced",
        "difficulty": "easy",
        "target_deficit": 0,
        "macros": {"protein": 25, "carbs": 45, "fat": 30},
        "suitable_for": ["maintain", "eat_healthy"],
        "bmi_range": [18, 30],
        "is_premium": False
    },
    # Özel Diyetler
    {
        "diet_id": "high_protein",
        "name": "Yüksek Protein",
        "name_en": "High Protein Diet",
        "description": "Protein ağırlıklı beslenme ile tokluk ve kas koruma",
        "description_en": "Protein-focused nutrition for satiety and muscle preservation",
        "duration_days": 30,
        "category": "special",
        "difficulty": "medium",
        "target_deficit": 300,
        "macros": {"protein": 40, "carbs": 30, "fat": 30},
        "suitable_for": ["lose_weight", "build_muscle"],
        "bmi_range": [22, 35],
        "is_premium": False
    },
    {
        "diet_id": "vegetarian",
        "name": "Vejetaryen",
        "name_en": "Vegetarian",
        "description": "Et içermeyen dengeli beslenme programı",
        "description_en": "Balanced meat-free nutrition program",
        "duration_days": 30,
        "category": "vegetarian",
        "difficulty": "medium",
        "target_deficit": 200,
        "macros": {"protein": 20, "carbs": 55, "fat": 25},
        "suitable_for": ["lose_weight", "maintain", "eat_healthy"],
        "bmi_range": [18, 35],
        "is_premium": False
    },
]


@api_router.get("/diets/recommend")
async def get_diet_recommendations(
    lang: str = "tr",
    current_user: Optional[User] = Depends(get_current_user)
):
    """Get personalized diet recommendations based on user profile."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Kullanıcı verilerini al
    user_doc = await store_get_user_by_id(current_user.user_id)
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    
    weight = user_doc.get("weight", 70)
    height = user_doc.get("height", 170)
    target_weight = user_doc.get("target_weight", weight)
    goal = user_doc.get("goal", "maintain")
    activity_level = user_doc.get("activity_level", "moderate")
    age = user_doc.get("age", 30)
    gender = user_doc.get("gender", "male")
    
    # BMI hesapla
    height_m = height / 100
    bmi = weight / (height_m * height_m) if height_m > 0 else 25
    
    # Kilo farkı
    weight_diff = weight - target_weight
    
    # Hedef belirleme
    if weight_diff > 5:
        user_goal = "lose_weight"
    elif weight_diff < -5:
        user_goal = "gain_weight"
    elif goal in ["build_muscle", "muscle"]:
        user_goal = "build_muscle"
    else:
        user_goal = "maintain"
    
    # Uygun diyetleri filtrele ve skorla
    recommendations = []
    
    for diet in EXTENDED_DIET_TEMPLATES:
        score = 0
        reasons = []
        
        # Hedef uyumu
        if user_goal in diet.get("suitable_for", []):
            score += 50
            if user_goal == "lose_weight":
                reasons.append("Kilo verme hedefinize uygun" if lang == "tr" else "Matches your weight loss goal")
            elif user_goal == "build_muscle":
                reasons.append("Kas yapma hedefinize uygun" if lang == "tr" else "Matches your muscle building goal")
            elif user_goal == "gain_weight":
                reasons.append("Kilo alma hedefinize uygun" if lang == "tr" else "Matches your weight gain goal")
            else:
                reasons.append("Kilo koruma hedefinize uygun" if lang == "tr" else "Matches your maintenance goal")
        
        # BMI uyumu
        bmi_range = diet.get("bmi_range", [18, 40])
        if bmi_range[0] <= bmi <= bmi_range[1]:
            score += 30
            if bmi > 30:
                reasons.append("Mevcut kilonuz için önerilen" if lang == "tr" else "Recommended for your current weight")
        
        # Zorluk seviyesi - yeni başlayanlar için kolay olanları öner
        difficulty = diet.get("difficulty", "medium")
        if difficulty == "easy":
            score += 15
            reasons.append("Başlaması kolay" if lang == "tr" else "Easy to start")
        elif difficulty == "medium":
            score += 10
        
        # Premium olmayan diyetlere bonus
        if not diet.get("is_premium", False):
            score += 10
            reasons.append("Ücretsiz erişim" if lang == "tr" else "Free access")
        
        # Aktivite seviyesine göre
        if activity_level in ["high", "very_high"] and diet["category"] == "muscle_building":
            score += 10
        
        if score >= 40:  # Minimum skor eşiği
            recommendations.append({
                "diet_id": diet["diet_id"],
                "name": diet["name_en"] if lang == "en" else diet["name"],
                "description": diet["description_en"] if lang == "en" else diet["description"],
                "duration_days": diet["duration_days"],
                "category": diet["category"],
                "difficulty": diet["difficulty"],
                "macros": diet["macros"],
                "is_premium": diet.get("is_premium", False),
                "score": score,
                "reasons": reasons[:2],  # En önemli 2 sebep
                "match_percentage": min(100, score)
            })
    
    # Skora göre sırala
    recommendations.sort(key=lambda x: x["score"], reverse=True)
    
    # Kullanıcı bilgisi ile birlikte döndür
    return {
        "user_profile": {
            "bmi": round(bmi, 1),
            "bmi_category": "obez" if bmi >= 30 else "fazla kilolu" if bmi >= 25 else "normal" if bmi >= 18.5 else "zayıf",
            "weight_goal": user_goal,
            "weight_to_lose": max(0, weight_diff) if weight_diff > 0 else 0,
            "weight_to_gain": abs(weight_diff) if weight_diff < 0 else 0,
        },
        "recommendations": recommendations[:5],  # En iyi 5 öneri
        "top_pick": recommendations[0] if recommendations else None
    }


@api_router.get("/diets/{diet_id}")
async def get_diet_detail(
    diet_id: str,
    lang: str = "tr",
    current_user: Optional[User] = Depends(get_current_user)
):
    """Get detailed diet plan."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    diet = next((d for d in DIET_TEMPLATES if d["diet_id"] == diet_id), None)
    
    if not diet:
        raise HTTPException(status_code=404, detail="Diet not found")
    
    if diet["is_premium"] and not current_user.is_premium:
        raise HTTPException(status_code=403, detail="Premium subscription required")
    
    if lang == "en":
        return {
            "diet_id": diet["diet_id"],
            "name": diet["name_en"],
            "description": diet["description_en"],
            "duration_days": diet["duration_days"],
            "category": diet["category"],
            "target_calories": diet["target_calories"],
            "macros": diet["macros"],
            "is_premium": diet["is_premium"],
            "image_url": diet["image_url"]
        }
    
    return diet


# -------------------------
# RECIPES
# -------------------------

RECIPES_DATABASE = [
    {
        "recipe_id": "recipe_001",
        "name": "Menemen",
        "name_en": "Turkish Scrambled Eggs",
        "category": "breakfast",
        "prep_time": 10,
        "cook_time": 15,
        "servings": 2,
        "difficulty": "easy",
        "calories_per_serving": 280,
        "protein": 18,
        "carbs": 12,
        "fat": 18,
        "ingredients": ["3 yumurta", "2 domates", "1 sivri biber", "2 yemek kaşığı zeytinyağı", "Tuz, karabiber"],
        "ingredients_en": ["3 eggs", "2 tomatoes", "1 green pepper", "2 tbsp olive oil", "Salt, pepper"],
        "instructions": ["Domatesleri ve biberleri doğrayın", "Tavada zeytinyağını ısıtın", "Sebzeleri soteleyin", "Yumurtaları ekleyin"],
        "instructions_en": ["Dice tomatoes and peppers", "Heat olive oil", "Sauté vegetables", "Add eggs"],
        "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400",
        "tags": ["kahvaltı", "breakfast", "eggs"]
    },
    {
        "recipe_id": "recipe_002",
        "name": "Tavuklu Salata",
        "name_en": "Chicken Salad",
        "category": "lunch",
        "prep_time": 15,
        "cook_time": 20,
        "servings": 2,
        "difficulty": "easy",
        "calories_per_serving": 320,
        "protein": 35,
        "carbs": 15,
        "fat": 12,
        "ingredients": ["200g tavuk göğsü", "Marul, domates, salatalık", "Zeytinyağı, limon"],
        "ingredients_en": ["200g chicken breast", "Lettuce, tomatoes, cucumber", "Olive oil, lemon"],
        "instructions": ["Tavuğu pişirin", "Sebzeleri doğrayın", "Karıştırın"],
        "instructions_en": ["Cook chicken", "Chop vegetables", "Mix together"],
        "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
        "tags": ["öğle", "lunch", "protein"]
    }
]

@api_router.get("/recipes/all")
async def get_all_recipes(
    lang: str = "tr",
    category: Optional[str] = None,
    current_user: Optional[User] = Depends(get_current_user)
):
    """Get all recipes."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    recipes = RECIPES_DATABASE
    
    if category:
        recipes = [r for r in recipes if r["category"] == category]
    
    if lang == "en":
        return [{
            "recipe_id": r["recipe_id"],
            "name": r["name_en"],
            "category": r["category"],
            "prep_time": r["prep_time"],
            "cook_time": r["cook_time"],
            "servings": r["servings"],
            "difficulty": r["difficulty"],
            "calories_per_serving": r["calories_per_serving"],
            "protein": r["protein"],
            "carbs": r["carbs"],
            "fat": r["fat"],
            "ingredients": r["ingredients_en"],
            "instructions": r["instructions_en"],
            "image_url": r["image_url"],
            "tags": r["tags"]
        } for r in recipes]
    
    return recipes


@api_router.get("/recipes/{recipe_id}")
async def get_recipe_detail(
    recipe_id: str,
    lang: str = "tr",
    current_user: Optional[User] = Depends(get_current_user)
):
    """Get detailed recipe by ID."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    recipe = next((r for r in RECIPES_DATABASE if r["recipe_id"] == recipe_id), None)
    
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    if lang == "en":
        return {
            "recipe_id": recipe["recipe_id"],
            "name": recipe["name_en"],
            "category": recipe["category"],
            "prep_time": recipe["prep_time"],
            "cook_time": recipe["cook_time"],
            "servings": recipe["servings"],
            "difficulty": recipe["difficulty"],
            "calories_per_serving": recipe["calories_per_serving"],
            "protein": recipe["protein"],
            "carbs": recipe["carbs"],
            "fat": recipe["fat"],
            "ingredients": recipe["ingredients_en"],
            "instructions": recipe["instructions_en"],
            "image_url": recipe["image_url"],
            "tags": recipe["tags"]
        }
    
    return recipe


@api_router.get("/recipes/categories/list")
async def get_recipe_categories(
    lang: str = "tr",
    current_user: Optional[User] = Depends(get_current_user)
):
    """Get list of recipe categories."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if lang == "en":
        return {
            "categories": [
                {"id": "breakfast", "name": "Breakfast", "icon": "☕"},
                {"id": "lunch", "name": "Lunch", "icon": "🍽️"},
                {"id": "dinner", "name": "Dinner", "icon": "🌙"},
            ]
        }
    
    return {
        "categories": [
            {"id": "breakfast", "name": "Kahvaltı", "icon": "☕"},
            {"id": "lunch", "name": "Öğle Yemeği", "icon": "🍽️"},
            {"id": "dinner", "name": "Akşam Yemeği", "icon": "🌙"},
        ]
    }


# -------------------------
# WEIGHT TRACKING
# -------------------------

class WeightEntry(BaseModel):
    weight: float
    note: Optional[str] = None

@api_router.post("/weight/log")
async def log_weight(data: WeightEntry, current_user: Optional[User] = Depends(get_current_user)):
    """Log a new weight entry."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    require_mongo()
    
    # Validate weight
    if data.weight < 20 or data.weight > 500:
        raise HTTPException(status_code=400, detail="Weight must be between 20 and 500 kg")
    
    weight_doc = {
        "user_id": current_user.user_id,
        "weight": data.weight,
        "note": data.note or "",
        "date": today_str(),
        "created_at": now_utc().isoformat(),
    }
    
    # Upsert - only one entry per day
    await mongo_db.weight_logs.update_one(
        {"user_id": current_user.user_id, "date": today_str()},
        {"$set": weight_doc},
        upsert=True
    )
    
    # Also update user's current weight
    await store_update_user(current_user.user_id, {"weight": data.weight})
    
    return {"message": "Weight logged", "weight": data.weight, "date": today_str()}

@api_router.get("/weight/history")
async def get_weight_history(
    days: int = 30,
    current_user: Optional[User] = Depends(get_current_user)
):
    """Get weight history for the specified number of days."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if mongo_db is None:
        return {"history": [], "stats": None}
    
    # Get user's profile data first
    user_doc = await store_get_user_by_id(current_user.user_id)
    profile_weight = user_doc.get("weight") if user_doc else None
    target_weight = user_doc.get("target_weight") if user_doc else None
    user_created_at = user_doc.get("created_at") if user_doc else None
    
    # Calculate date range
    end_date = now_utc()
    start_date = end_date - timedelta(days=days)
    start_date_str = start_date.strftime("%Y-%m-%d")
    
    # Get weight entries
    cursor = mongo_db.weight_logs.find(
        {
            "user_id": current_user.user_id,
            "date": {"$gte": start_date_str}
        },
        {"_id": 0}
    ).sort("date", 1)
    
    history = await cursor.to_list(length=days + 1)
    
    # If no weight logs but user has a profile weight, add it as the initial entry
    # This ensures the first weight entered during onboarding appears in the chart
    if len(history) == 0 and profile_weight:
        # Use user creation date or today as the initial entry date
        initial_date = today_str()
        if user_created_at:
            try:
                if isinstance(user_created_at, str):
                    created_dt = datetime.fromisoformat(user_created_at.replace('Z', '+00:00'))
                else:
                    created_dt = user_created_at
                initial_date = created_dt.strftime("%Y-%m-%d")
            except:
                pass
        
        history = [{
            "user_id": current_user.user_id,
            "weight": profile_weight,
            "note": "İlk kilo / Initial weight",
            "date": initial_date,
            "from_profile": True  # Mark this as from profile
        }]
    
    # Calculate stats - now works with 1 or more entries
    stats = None
    if len(history) >= 1:
        first_weight = history[0]["weight"]
        last_weight = history[-1]["weight"]
        change = last_weight - first_weight
        
        stats = {
            "start_weight": first_weight,
            "current_weight": last_weight,
            "change": round(change, 1),
            "change_percent": round((change / first_weight) * 100, 1) if first_weight > 0 else 0,
            "target_weight": target_weight,
            "remaining": round(last_weight - target_weight, 1) if target_weight else None,
            "entries_count": len(history),
            "period_days": days,
        }
    
    return {"history": history, "stats": stats}

@api_router.delete("/weight/entry/{date}")
async def delete_weight_entry(date: str, current_user: Optional[User] = Depends(get_current_user)):
    """Delete a weight entry for a specific date."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    require_mongo()
    
    result = await mongo_db.weight_logs.delete_one({
        "user_id": current_user.user_id,
        "date": date
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Weight entry not found")
    
    return {"message": "Weight entry deleted", "date": date}


# -------------------------
# GAMIFICATION SYSTEM
# -------------------------

# Lig sistemleri ve XP gereksinimleri
LEAGUES = {
    "bronze": {"name": "Bronze", "emoji": "🥉", "min_points": 0, "max_points": 499},
    "silver": {"name": "Silver", "emoji": "🥈", "min_points": 500, "max_points": 1499},
    "gold": {"name": "Gold", "emoji": "🥇", "min_points": 1500, "max_points": 2999},
    "platinum": {"name": "Platinum", "emoji": "💎", "min_points": 3000, "max_points": 4999},
    "diamond": {"name": "Diamond", "emoji": "👑", "min_points": 5000, "max_points": 9999},
    "legend": {"name": "Legend", "emoji": "🔥", "min_points": 10000, "max_points": 999999}
}

# Seviye başına gereken XP
def xp_for_level(level: int) -> int:
    """Her seviye için gereken XP - Exponential büyüme"""
    return 100 * level + (level - 1) * 50

def get_league_from_points(points: int) -> str:
    """Puana göre lig belirle"""
    for league_id, league_data in LEAGUES.items():
        if league_data["min_points"] <= points <= league_data["max_points"]:
            return league_id
    return "legend"  # Max puan aşıldıysa

# Rozetler
ACHIEVEMENTS = {
    "first_login": {"name_tr": "İlk Adım", "name_en": "First Step", "emoji": "👋", "xp": 10},
    "streak_7": {"name_tr": "Haftalık Şampiyon", "name_en": "Week Champion", "emoji": "⭐", "xp": 100},
    "streak_30": {"name_tr": "Aylık Efsane", "name_en": "Monthly Legend", "emoji": "💎", "xp": 500},
    "streak_100": {"name_tr": "Yüz Günlük Kral", "name_en": "100 Day King", "emoji": "👑", "xp": 1000},
    "goal_streak_7": {"name_tr": "Hedef Ustası", "name_en": "Goal Master", "emoji": "🎯", "xp": 150},
    "water_hero": {"name_tr": "Su Kahramanı", "name_en": "Water Hero", "emoji": "💧", "xp": 100},
    "calorie_master": {"name_tr": "Kalori Ustası", "name_en": "Calorie Master", "emoji": "🔥", "xp": 100},
    "photo_hunter": {"name_tr": "Fotoğraf Avcısı", "name_en": "Photo Hunter", "emoji": "📸", "xp": 200},
    "recipe_explorer": {"name_tr": "Tarif Kaşifi", "name_en": "Recipe Explorer", "emoji": "🍽️", "xp": 150},
    "diet_guru": {"name_tr": "Diyet Gurusu", "name_en": "Diet Guru", "emoji": "🥗", "xp": 300},
    "bronze_league": {"name_tr": "Bronz Ligi", "name_en": "Bronze League", "emoji": "🥉", "xp": 50},
    "silver_league": {"name_tr": "Gümüş Ligi", "name_en": "Silver League", "emoji": "🥈", "xp": 100},
    "gold_league": {"name_tr": "Altın Ligi", "name_en": "Gold League", "emoji": "🥇", "xp": 200},
    "platinum_league": {"name_tr": "Platin Ligi", "name_en": "Platinum League", "emoji": "💎", "xp": 400},
    "diamond_league": {"name_tr": "Elmas Ligi", "name_en": "Diamond League", "emoji": "👑", "xp": 800},
    "legend_league": {"name_tr": "Efsane Ligi", "name_en": "Legend League", "emoji": "🔥", "xp": 1500},
}

@api_router.get("/gamification/status")
async def get_gamification_status(current_user: Optional[User] = Depends(get_current_user)):
    """Kullanıcının gamification durumunu getir"""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user_id = current_user.user_id
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Mevcut seviye için gereken XP
    current_level_xp = xp_for_level(user.level)
    next_level_xp = xp_for_level(user.level + 1)
    level_progress = (user.xp / next_level_xp) * 100 if next_level_xp > 0 else 0
    
    # Lig bilgisi
    league_info = LEAGUES.get(user.league, LEAGUES["bronze"])
    
    return {
        "level": user.level,
        "xp": user.xp,
        "total_points": user.total_points,
        "daily_streak": user.daily_streak,
        "goal_streak": user.goal_streak,
        "max_daily_streak": user.max_daily_streak,
        "max_goal_streak": user.max_goal_streak,
        "achievements": user.achievements,
        "league": user.league,
        "league_info": league_info,
        "level_progress": round(level_progress, 1),
        "current_level_xp": current_level_xp,
        "next_level_xp": next_level_xp,
        "last_login": user.last_login.isoformat() if user.last_login else None,
    }


@api_router.post("/gamification/check-daily")
async def check_daily_login(current_user: Optional[User] = Depends(get_current_user)):
    """Günlük giriş kontrolü - Seri ve XP güncelle"""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user_id = current_user.user_id
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    now = datetime.now(timezone.utc)
    rewards = {
        "xp_gained": 0,
        "points_gained": 0,
        "streak_continued": False,
        "streak_broken": False,
        "new_achievements": [],
        "level_up": False,
        "old_level": user.level,
        "new_level": user.level,
    }
    
    # İlk giriş
    if not user.last_login:
        user.daily_streak = 1
        user.xp += 10
        user.total_points += 10
        rewards["xp_gained"] = 10
        rewards["points_gained"] = 10
        rewards["streak_continued"] = True
        
        # İlk giriş rozeti
        if "first_login" not in user.achievements:
            user.achievements.append("first_login")
            rewards["new_achievements"].append("first_login")
            user.xp += ACHIEVEMENTS["first_login"]["xp"]
            rewards["xp_gained"] += ACHIEVEMENTS["first_login"]["xp"]
    else:
        # Son girişten bu yana geçen süre
        last_login_date = user.last_login.replace(hour=0, minute=0, second=0, microsecond=0)
        today_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
        days_diff = (today_date - last_login_date).days
        
        if days_diff == 0:
            # Bugün zaten giriş yapılmış
            pass
        elif days_diff == 1:
            # Seri devam ediyor
            user.daily_streak += 1
            user.xp += 10
            user.total_points += 10
            rewards["xp_gained"] = 10
            rewards["points_gained"] = 10
            rewards["streak_continued"] = True
            
            # Max seriyi güncelle
            if user.daily_streak > user.max_daily_streak:
                user.max_daily_streak = user.daily_streak
            
            # Seri rozetleri kontrol et
            if user.daily_streak >= 7 and "streak_7" not in user.achievements:
                user.achievements.append("streak_7")
                rewards["new_achievements"].append("streak_7")
                user.xp += ACHIEVEMENTS["streak_7"]["xp"]
                user.total_points += 50
                rewards["xp_gained"] += ACHIEVEMENTS["streak_7"]["xp"]
                rewards["points_gained"] += 50
            
            if user.daily_streak >= 30 and "streak_30" not in user.achievements:
                user.achievements.append("streak_30")
                rewards["new_achievements"].append("streak_30")
                user.xp += ACHIEVEMENTS["streak_30"]["xp"]
                user.total_points += 200
                rewards["xp_gained"] += ACHIEVEMENTS["streak_30"]["xp"]
                rewards["points_gained"] += 200
            
            if user.daily_streak >= 100 and "streak_100" not in user.achievements:
                user.achievements.append("streak_100")
                rewards["new_achievements"].append("streak_100")
                user.xp += ACHIEVEMENTS["streak_100"]["xp"]
                user.total_points += 500
                rewards["xp_gained"] += ACHIEVEMENTS["streak_100"]["xp"]
                rewards["points_gained"] += 500
        else:
            # Seri kesildi
            user.daily_streak = 1
            user.xp += 10
            user.total_points += 10
            rewards["xp_gained"] = 10
            rewards["points_gained"] = 10
            rewards["streak_broken"] = True
    
    user.last_login = now
    
    # Seviye kontrolü
    next_level_xp = xp_for_level(user.level + 1)
    while user.xp >= next_level_xp:
        user.level += 1
        user.xp -= next_level_xp
        rewards["level_up"] = True
        rewards["new_level"] = user.level
        next_level_xp = xp_for_level(user.level + 1)
    
    # Lig kontrolü
    new_league = get_league_from_points(user.total_points)
    if new_league != user.league:
        old_league = user.league
        user.league = new_league
        
        # Lig rozeti ekle
        league_achievement = f"{new_league}_league"
        if league_achievement not in user.achievements:
            user.achievements.append(league_achievement)
            rewards["new_achievements"].append(league_achievement)
            user.xp += ACHIEVEMENTS.get(league_achievement, {}).get("xp", 0)
            rewards["xp_gained"] += ACHIEVEMENTS.get(league_achievement, {}).get("xp", 0)
    
    # Kullanıcıyı güncelle
    await update_user(user_id, user.model_dump())
    
    return {
        "success": True,
        "rewards": rewards,
        "current_streak": user.daily_streak,
        "level": user.level,
        "xp": user.xp,
        "total_points": user.total_points,
        "league": user.league,
    }


@api_router.post("/gamification/add-xp")
async def add_xp(
    action: str,
    amount: int,
    user_id: str = Depends(verify_session)
):
    """Belirli bir aksiyon için XP ekle"""
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    old_level = user.level
    user.xp += amount
    user.total_points += amount
    
    # Seviye kontrolü
    next_level_xp = xp_for_level(user.level + 1)
    level_up = False
    while user.xp >= next_level_xp:
        user.level += 1
        user.xp -= next_level_xp
        level_up = True
        next_level_xp = xp_for_level(user.level + 1)
    
    # Lig kontrolü
    new_league = get_league_from_points(user.total_points)
    if new_league != user.league:
        user.league = new_league
    
    await update_user(user_id, user.model_dump())
    
    return {
        "success": True,
        "xp_added": amount,
        "total_xp": user.xp,
        "total_points": user.total_points,
        "level": user.level,
        "level_up": level_up,
        "old_level": old_level,
        "league": user.league,
    }


@api_router.post("/gamification/complete-goal")
async def complete_daily_goal(
    goal_type: str,  # water, calorie, photo, diet
    user_id: str = Depends(verify_session)
):
    """Günlük hedef tamamlandığında XP ve seri güncelle"""
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    now = datetime.now(timezone.utc)
    rewards = {
        "xp_gained": 0,
        "points_gained": 0,
        "new_achievements": [],
        "level_up": False,
    }
    
    # Hedef tipine göre puan ver
    xp_rewards = {
        "water": 20,
        "calorie": 50,
        "photo": 15,
        "diet": 100,
    }
    
    xp_amount = xp_rewards.get(goal_type, 10)
    user.xp += xp_amount
    user.total_points += xp_amount
    rewards["xp_gained"] = xp_amount
    rewards["points_gained"] = xp_amount
    
    # Hedef tamamlama serisi
    if user.last_goal_completion:
        last_completion_date = user.last_goal_completion.replace(hour=0, minute=0, second=0, microsecond=0)
        today_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
        days_diff = (today_date - last_completion_date).days
        
        if days_diff == 1:
            user.goal_streak += 1
            if user.goal_streak > user.max_goal_streak:
                user.max_goal_streak = user.goal_streak
                
            # Goal streak rozetleri
            if user.goal_streak >= 7 and "goal_streak_7" not in user.achievements:
                user.achievements.append("goal_streak_7")
                rewards["new_achievements"].append("goal_streak_7")
                user.xp += ACHIEVEMENTS["goal_streak_7"]["xp"]
                rewards["xp_gained"] += ACHIEVEMENTS["goal_streak_7"]["xp"]
        elif days_diff > 1:
            user.goal_streak = 1
    else:
        user.goal_streak = 1
    
    user.last_goal_completion = now
    
    # Hedef-specific rozetler
    if goal_type == "water" and "water_hero" not in user.achievements:
        # 7 gün üst üste su hedefi (basitleştirilmiş versiyon)
        if user.goal_streak >= 7:
            user.achievements.append("water_hero")
            rewards["new_achievements"].append("water_hero")
            user.xp += ACHIEVEMENTS["water_hero"]["xp"]
            rewards["xp_gained"] += ACHIEVEMENTS["water_hero"]["xp"]
    
    # Seviye kontrolü
    next_level_xp = xp_for_level(user.level + 1)
    while user.xp >= next_level_xp:
        user.level += 1
        user.xp -= next_level_xp
        rewards["level_up"] = True
        next_level_xp = xp_for_level(user.level + 1)
    
    # Lig kontrolü
    new_league = get_league_from_points(user.total_points)
    if new_league != user.league:
        user.league = new_league
    
    await update_user(user_id, user.model_dump())
    
    return {
        "success": True,
        "rewards": rewards,
        "goal_streak": user.goal_streak,
        "level": user.level,
        "xp": user.xp,
        "total_points": user.total_points,
        "league": user.league,
    }


@api_router.get("/gamification/achievements")
async def get_achievements(user_id: str = Depends(verify_session)):
    """Kullanıcının rozetlerini getir"""
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Kullanıcının kazandığı rozetler
    earned = []
    for achievement_id in user.achievements:
        if achievement_id in ACHIEVEMENTS:
            achievement = ACHIEVEMENTS[achievement_id].copy()
            achievement["id"] = achievement_id
            earned.append(achievement)
    
    # Henüz kazanılmamış rozetler
    unearned = []
    for achievement_id, achievement_data in ACHIEVEMENTS.items():
        if achievement_id not in user.achievements:
            achievement = achievement_data.copy()
            achievement["id"] = achievement_id
            unearned.append(achievement)
    
    return {
        "earned": earned,
        "unearned": unearned,
        "total_earned": len(earned),
        "total_achievements": len(ACHIEVEMENTS),
    }


# -------------------------
# APP ROUTER
# -------------------------
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
  global mongo_client
  try:
    if mongo_client:
      mongo_client.close()
  except Exception:
    pass
