# 🔐 Production Deployment Güvenlik Kılavuzu

## ✅ Güvenlik Kontrolleri Tamamlandı

### 1. ✅ OpenAI API Key Güvenli Hale Getirildi
- API key'ler `.env` dosyasından kaldırıldı
- `.env.example` template dosyası oluşturuldu
- Kod environment variable'dan key alıyor

### 2. ✅ .gitignore Kontrolü
- `.env` dosyaları zaten ignore ediliyor
- Hassas bilgiler GitHub'a gitmeyecek

---

## 🚀 Production'a Deploy Etme Adımları

### Adım 1: Environment Variables Ayarlama

Production platformunuzda (Render, Heroku, AWS, vs.) aşağıdaki environment variable'ları ekleyin:

#### **Zorunlu (Required):**
```bash
# MongoDB (Production database)
MONGO_URL="mongodb+srv://user:password@cluster.mongodb.net/dbname"
DB_NAME="caloriediet_production"

# OpenAI (Food image analysis için)
OPENAI_KEY="sk-proj-YOUR-ACTUAL-OPENAI-KEY"
OPENAI_API_KEY="sk-proj-YOUR-ACTUAL-OPENAI-KEY"
```

#### **Opsiyonel (Optional):**
```bash
# Google OAuth (Google login için)
GOOGLE_OAUTH_CLIENT_ID="your-google-client-id"
GOOGLE_OAUTH_CLIENT_SECRET="your-google-client-secret"
OAUTH_CALLBACK_URL="https://your-backend.com/auth/callback"
BACKEND_PUBLIC_URL="https://your-backend.com"
```

---

### Adım 2: CORS Ayarları (İsteğe Bağlı)

Production güvenliği için `/app/backend/server.py` dosyasında CORS ayarlarını güncelleyin:

```python
# Mevcut (Development):
allow_origins=["*"]

# Önerilen (Production):
allow_origins=[
    "https://your-production-domain.com",
    "https://www.your-production-domain.com",
    "caloriediet://*",  # Mobile app için
    "exp://*"           # Expo development için
]
```

---

### Adım 3: Frontend Environment Variables

Frontend `.env` dosyasını production için güncelleyin:

```bash
EXPO_PUBLIC_BACKEND_URL=https://your-production-backend.com
```

---

## 🧪 Test Etme

Deployment sonrası aşağıdaki endpoint'leri test edin:

```bash
# Health check
curl https://your-backend.com/health

# Storage status
curl https://your-backend.com/api/debug/storage-status

# OpenAI status
curl https://your-backend.com/api/debug/openai-status
```

---

## ⚠️ Önemli Notlar

### OpenAI API Key Olmadan Çalışan Özellikler:
✅ Kullanıcı kaydı ve girişi
✅ Manuel kalori girişi
✅ Su takibi
✅ Adım sayacı
✅ Vitamin takibi
✅ Tarifler
✅ Diyet programları

### OpenAI API Key Gerektiren Özellik:
❌ Fotoğrafla kalori analizi (Food image analysis)

**Çözüm:** Production'da mutlaka `OPENAI_KEY` environment variable'ını ekleyin.

---

## 📋 Deployment Checklist

- [x] ✅ `.env` dosyasından hassas bilgiler temizlendi
- [x] ✅ `.env.example` dosyası oluşturuldu
- [x] ✅ `.gitignore` kontrolü yapıldı
- [ ] ⏳ Production MongoDB URL'i eklendi
- [ ] ⏳ OpenAI API key production'a eklendi
- [ ] ⏳ Frontend backend URL'i güncellendi
- [ ] ⏳ CORS ayarları güncellendi (opsiyonel)
- [ ] ⏳ Production test edildi

---

## 🔗 Faydalı Linkler

- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render Environment Variables](https://render.com/docs/environment-variables)

---

## 💡 İpuçları

1. **API Key Güvenliği:** API key'lerinizi asla GitHub'a commit etmeyin
2. **MongoDB:** Production'da MongoDB Atlas kullanın (ücretsiz tier mevcut)
3. **CORS:** Development'ta `allow_origins=["*"]` kullanabilirsiniz, production'da spesifik domain'ler ekleyin
4. **Monitoring:** Production'da log monitoring ekleyin (Sentry, LogRocket, vs.)

---

**Son Güncelleme:** {{ date }}
**Durum:** ✅ Production-Ready (Environment variables eklendiğinde)
