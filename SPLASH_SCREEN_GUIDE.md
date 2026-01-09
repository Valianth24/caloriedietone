# 🎬 CalorieDiet Splash Screen Görseli

## 📱 Splash Screen İçin Gerekli Dosya

### **splash.png** (Tam Ekran Splash Image)

```
Dosya Adı: splash.png
Boyut: 1284x2778 piksel (iPhone 14 Pro Max boyutu)
      veya 1242x2688 piksel (evrensel)
Format: PNG
Arka Plan: CalorieDiet temalı (yeşil #4CAF50 veya gradient)
İçerik: CalorieDiet logosu + branding
Konum: /app/frontend/assets/images/splash.png
```

---

## 🎨 Tasarım Önerileri

### **Düzen:**
```
┌─────────────────────┐
│                     │
│                     │ ← Üst boşluk (status bar için)
│                     │
│                     │
│    [LOGO/ICON]      │ ← CalorieDiet logosu merkezi
│                     │
│   CalorieDiet       │ ← Uygulama adı (opsiyonel)
│                     │
│                     │
│                     │ ← Alt boşluk
└─────────────────────┘
```

### **Renk Şeması:**
- Arka plan: Yeşil (#4CAF50) veya gradient
- Logo: Beyaz veya kontrast renk
- Text: Beyaz (eğer varsa)

### **Güvenli Alan (Safe Area):**
```
Üst: 200px boşluk (status bar)
Alt: 200px boşluk (home indicator)
Yanlar: 100px boşluk (kenar boşluğu)
```

---

## 📤 Dosyayı Yükledikten Sonra

### 1. **app.json'u güncelleyin:**

```json
{
  "splash": {
    "image": "./assets/images/splash.png",
    "resizeMode": "cover",
    "backgroundColor": "#4CAF50"
  }
}
```

**resizeMode seçenekleri:**
- `"contain"`: Logo ortalı, arka plan yeşil
- `"cover"`: Tam ekran görsel (önerilen)

---

## 🔄 İki Farklı Yaklaşım:

### **Yaklaşım 1: Basit Logo (Mevcut)**
```
✅ Küçük logo ortada
✅ Yeşil arka plan
✅ Minimalist
```
**Kullanım:** splash-icon.png (512x512) + contain mode

### **Yaklaşım 2: Tam Ekran Görsel (Yeni)**
```
✅ Tam ekran custom tasarım
✅ Gradient arka plan
✅ Marka odaklı
```
**Kullanım:** splash.png (1284x2778) + cover mode

---

## ⚙️ Hangi Yaklaşımı Seçmeliyim?

### **Basit Logo (splash-icon.png) kullanın:**
- ✅ Minimalist tasarım istiyorsanız
- ✅ Hızlı açılış istiyorsanız (küçük dosya)
- ✅ Modern görünüm istiyorsanız

### **Tam Ekran (splash.png) kullanın:**
- ✅ Marka bilinirliği oluşturmak istiyorsanız
- ✅ Premium görünüm istiyorsanız
- ✅ Özel tasarım istiyorsanız

---

## 📋 Önerilen Splash Screen:

Ben size **basit logo yaklaşımını** öneriyorum:

**Neden?**
- Modern ve minimalist
- Hızlı yükleme
- Dosya boyutu küçük
- iOS/Android standartlarına uygun

**Nasıl Görünecek:**
```
┌─────────────────────┐
│                     │
│                     │
│                     │
│       🥗            │ ← CalorieDiet ikonu
│   [512x512]         │    (beyaz veya yeşil logo)
│                     │
│                     │
│                     │
│                     │
└─────────────────────┘
    Yeşil Arka Plan
      (#4CAF50)
```

---

## ✅ Yapmanız Gerekenler:

### **Seçenek A: Basit Logo (Önerilen)**

1. **splash-icon.png hazırlayın:**
   - Boyut: 512x512 veya 1024x1024
   - Format: PNG, şeffaf arka plan
   - İçerik: CalorieDiet logosu

2. **Yükleyin:**
   - `/app/frontend/assets/images/splash-icon.png`

3. **app.json zaten ayarlı (hiçbir değişiklik gerekmez):**
   ```json
   "splash": {
     "image": "./assets/images/splash-icon.png",
     "resizeMode": "contain",
     "backgroundColor": "#4CAF50"
   }
   ```

### **Seçenek B: Tam Ekran Görsel**

1. **splash.png hazırlayın:**
   - Boyut: 1242x2688 piksel
   - Format: PNG
   - İçerik: Tam ekran CalorieDiet tasarımı

2. **Yükleyin:**
   - `/app/frontend/assets/images/splash.png`

3. **app.json değiştirin:**
   ```json
   "splash": {
     "image": "./assets/images/splash.png",
     "resizeMode": "cover",
     "backgroundColor": "#4CAF50"
   }
   ```

---

## 🎯 Hızlı Çözüm:

Eğer hemen test etmek istiyorsanız:

**Şu an splash-icon.png kullanılıyor:**
- Bu dosyayı kendi CalorieDiet logonuzla değiştirin
- 512x512 veya 1024x1024 piksel
- Şeffaf arka plan PNG
- Basit logo, detaysız

**app.json değişikliğine gerek yok!** ✅

---

**Hangi yaklaşımı tercih ediyorsunuz? Ben yardımcı olayım!**
