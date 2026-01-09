# 🎨 CalorieDiet - Icon ve Splash Dosyaları

## 📁 Gerekli Dosyalar

Bu klasöre (`/app/frontend/assets/images/`) aşağıdaki 4 dosyayı yüklemeniz gerekiyor:

### 1. **icon.png** (Ana Uygulama İkonu)
```
Dosya Adı: icon.png
Boyut: 1024x1024 piksel
Format: PNG
Arka Plan: Opak (şeffaf olmamalı)
İçerik: CalorieDiet logosu/ikonu
Önerilen: Yeşil temalı (#4CAF50), merkezde logo
```

### 2. **adaptive-icon.png** (Android Adaptive Icon)
```
Dosya Adı: adaptive-icon.png
Boyut: 1024x1024 piksel
Format: PNG
Arka Plan: Şeffaf (transparent)
Safe Zone: Ortadaki 768x768px (kenarlar kesilir)
İçerik: CalorieDiet logosu, kenarlardan 128px içeride
Not: Android 8+ cihazlarda yuvarlak/squircle şekillerde görünür
```

### 3. **splash-icon.png** (Splash Screen Logosu)
```
Dosya Adı: splash-icon.png
Boyut: 512x512 piksel (minimum 400x400)
Format: PNG
Arka Plan: Şeffaf (yeşil arka plan app.json'da tanımlı)
İçerik: CalorieDiet logosu, basit ve net
Not: Uygulama açılırken yeşil arka plan üzerinde gösterilir
```

### 4. **favicon.png** (Web Favicon - Opsiyonel)
```
Dosya Adı: favicon.png
Boyut: 96x96 piksel (veya 48x48)
Format: PNG
İçerik: CalorieDiet mini logosu
Not: Web versiyonu için (opsiyonel)
```

---

## 📤 Dosyaları Nasıl Yüklerim?

### **Yöntem 1: Emergent Platform Üzerinden**

1. **File Browser'ı Açın**
   - Sol menüden "Files" veya "Dosyalar" sekmesine gidin
   
2. **Klasöre Gidin**
   - `/app/frontend/assets/images/` klasörüne gidin
   
3. **Dosyaları Yükleyin**
   - "Upload" butonuna tıklayın
   - 4 dosyayı seçin (icon.png, adaptive-icon.png, splash-icon.png, favicon.png)
   - Yükleyin

4. **İsimlendirmeye Dikkat**
   - Dosya isimleri TAM olarak yukarıdaki gibi olmalı
   - Küçük harf kullanın
   - Tire (-) yerine underscore (_) kullanmayın

---

### **Yöntem 2: Base64 ile Terminal Üzerinden** (Teknik)

Eğer dosyalarınız base64 formatındaysa:

```bash
# icon.png için
echo "BASE64_STRING_HERE" | base64 -d > /app/frontend/assets/images/icon.png

# adaptive-icon.png için
echo "BASE64_STRING_HERE" | base64 -d > /app/frontend/assets/images/adaptive-icon.png

# splash-icon.png için
echo "BASE64_STRING_HERE" | base64 -d > /app/frontend/assets/images/splash-icon.png

# favicon.png için
echo "BASE64_STRING_HERE" | base64 -d > /app/frontend/assets/images/favicon.png
```

---

## ✅ Dosyaları Yükledikten Sonra

### 1. **Dosyaları Kontrol Edin**
```bash
cd /app/frontend/assets/images
ls -lh icon.png adaptive-icon.png splash-icon.png favicon.png
```

**Beklenen Çıktı:**
```
-rw-r--r-- 1 root root  XXK icon.png
-rw-r--r-- 1 root root  XXK adaptive-icon.png
-rw-r--r-- 1 root root  XXK splash-icon.png
-rw-r--r-- 1 root root  XXK favicon.png
```

### 2. **App.json Zaten Hazır**
app.json dosyası bu dosyaları kullanacak şekilde yapılandırıldı ✅

### 3. **Yeni Build Alın**
```bash
cd /app/frontend

# Cache temizle
rm -rf node_modules .expo
yarn cache clean
yarn install

# Version code artır (app.json'da versionCode: 2)
# Sonra build al
eas build --platform android --profile production --clear-cache
```

---

## 🎨 Tasarım Önerileri

### **Icon.png ve Adaptive-icon.png:**
- Yeşil tema (#4CAF50) kullanın
- Basit ve net logo/ikon
- Kalori veya diyet konseptini yansıtacak tasarım
- Küçük boyutlarda okunabilir olmalı

### **Splash-icon.png:**
- Minimalist logo
- Detaylardan kaçının (hızlı görünüp kaybolacak)
- Merkezde, etrafta boşluk bırakın

### **Favicon.png:**
- Çok küçük boyutta bile tanınabilir
- Basit şekiller kullanın

---

## 📊 Mevcut Durum

### ✅ Silinen (Eski Dosyalar)
```
❌ react-logo.png
❌ react-logo@2x.png
❌ react-logo@3x.png
❌ partial-react-logo.png
❌ app-image.png
❌ splash-image.png
```

### ⏳ Bekleniyor (Yüklenecek)
```
⏳ icon.png (1024x1024)
⏳ adaptive-icon.png (1024x1024)
⏳ splash-icon.png (512x512)
⏳ favicon.png (96x96)
```

### ✅ Yapılandırma
```
✅ app.json yapılandırıldı
✅ Splash screen ayarları hazır
✅ Android icon ayarları hazır
```

---

## 🚨 Önemli Notlar

1. **Dosya İsimleri:**
   - TAM olarak şu şekilde olmalı: `icon.png`, `adaptive-icon.png`, `splash-icon.png`, `favicon.png`
   - Büyük/küçük harf duyarlı!

2. **Boyutlar:**
   - İcon'lar: 1024x1024px
   - Splash: 512x512px
   - Favicon: 96x96px

3. **Format:**
   - Sadece PNG
   - JPG kullanmayın

4. **Şeffaflık:**
   - `adaptive-icon.png`: Şeffaf arka plan ✅
   - `splash-icon.png`: Şeffaf arka plan ✅
   - `icon.png`: Opak arka plan ✅

---

## ✅ Checklist

Dosyaları yüklemeden önce:

- [ ] 4 dosya hazır (icon, adaptive-icon, splash-icon, favicon)
- [ ] Dosya isimleri doğru
- [ ] Boyutlar uygun
- [ ] Format PNG
- [ ] Şeffaflık gereksinimlerine uygun

Dosyaları yükledikten sonra:

- [ ] Dosyaları kontrol ettim (`ls -lh`)
- [ ] app.json güncel (zaten hazır ✅)
- [ ] Version code artırdım (1 → 2)
- [ ] Cache temizledim
- [ ] Yeni build aldım (`--clear-cache`)

---

## 📞 Yardım

Dosyaları yüklerken sorun yaşarsanız:

1. Dosya isimlerini tekrar kontrol edin
2. Boyutları kontrol edin
3. Format PNG olmalı
4. Emergent File Browser'ı kullanın

**Dosyalar yüklendikten sonra yeni build alın!**

---

**Son Güncelleme:** 2025-01-09
**Durum:** ⏳ Dosyalar bekleniyor
**Sonraki Adım:** 4 PNG dosyasını `/app/frontend/assets/images/` klasörüne yükleyin
