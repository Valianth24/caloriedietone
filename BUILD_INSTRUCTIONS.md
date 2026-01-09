# 🏗️ CalorieDiet - Build Talimatları

## 📱 Icon ve Splash Screen Sorunu Çözümü

### ⚠️ Sorun:
Build aldıktan sonra bile Emergent icon ve splash ekranı görünüyor.

### ✅ Çözüm Adımları:

#### 1. **App.json Güncellemesi Yapıldı**

Aşağıdaki değişiklikler uygulandı:

```json
{
  "expo": {
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#4CAF50"
    },
    "icon": "./assets/images/icon.png",
    "android": {
      "icon": "./assets/images/icon.png",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#4CAF50"
      }
    }
  }
}
```

#### 2. **Yeni Build Almadan Önce:**

```bash
# 1. Node modules ve cache'i temizle
cd /app/frontend
rm -rf node_modules
rm -rf .expo
yarn cache clean

# 2. Yeniden yükle
yarn install

# 3. EAS Build önbelleğini temizle
eas build:configure
```

#### 3. **EAS Build Profili (eas.json)**

Eğer `eas.json` yoksa oluşturun:

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

#### 4. **Yeni Build Komutu:**

```bash
# Cache'siz production build
eas build --platform android --profile production --clear-cache
```

#### 5. **Icon Asset Gereksinimleri:**

Aşağıdaki dosyaların doğru boyutlarda olduğundan emin olun:

```
/app/frontend/assets/images/
├── icon.png              (1024x1024px, PNG)
├── adaptive-icon.png     (1024x1024px, PNG, şeffaf arka plan)
├── splash-icon.png       (400x400px minimum, PNG)
└── favicon.png           (48x48px veya 96x96px, PNG)
```

---

## 🎨 Kendi Icon ve Splash'ınızı Eklemek İçin:

### Adım 1: Icon Dosyalarını Hazırlayın

#### **Ana Icon (icon.png):**
- Boyut: 1024x1024 piksel
- Format: PNG
- Arka plan: Opak (şeffaf olmamalı)
- Tasarım: CalorieDiet logosu merkezde

#### **Adaptive Icon (adaptive-icon.png):**
- Boyut: 1024x1024 piksel
- Format: PNG
- Arka plan: Şeffaf
- Safe Zone: Ortadaki 768x768px alan (kenarlar kesilecek)
- İçerik: Logo, kenarlardan 128px içeride

#### **Splash Icon (splash-icon.png):**
- Boyut: En az 400x400 piksel (önerilen: 512x512)
- Format: PNG
- Arka plan: Şeffaf (yeşil arka plan app.json'da)
- İçerik: CalorieDiet logosu

### Adım 2: Dosyaları Değiştirin

```bash
# Mevcut dosyaları yedekle
cd /app/frontend/assets/images
cp icon.png icon.png.backup
cp adaptive-icon.png adaptive-icon.png.backup
cp splash-icon.png splash-icon.png.backup

# Yeni dosyalarınızı kopyalayın
# (Bilgisayarınızdan yükleyin veya URL'den indirin)
```

### Adım 3: Rebuild

```bash
cd /app/frontend
eas build --platform android --clear-cache
```

---

## 🔍 Build Sonrası Kontrol:

APK'yı indirdikten sonra kontrol edin:

### Android:
```
✅ Ana ekranda CalorieDiet ikonu görünmeli
✅ Uygulama açılırken yeşil arka planlı CalorieDiet splash
✅ Emergent veya Expo logosu GÖRÜNMEMELİ
```

---

## ⚙️ Troubleshooting:

### Problem: Hala Emergent ikonu görünüyor

**Çözüm 1: Cache temizle**
```bash
cd /app/frontend
rm -rf node_modules .expo
yarn install
eas build --clear-cache
```

**Çözüm 2: Version code artır**
```json
// app.json
{
  "android": {
    "versionCode": 2  // 1'den 2'ye çıkar
  }
}
```

**Çözüm 3: Eski build'i sil**
```bash
# Telefonda:
1. Uygulamayı tamamen kaldırın
2. Cache'i temizleyin
3. Yeni APK'yı yükleyin
```

### Problem: Splash ekranı yanlış görünüyor

**Kontrol edin:**
- `splash-icon.png` doğru boyutta mı? (min 400x400)
- `app.json` → `splash.backgroundColor` yeşil mi? (#4CAF50)
- Build cache temizlenmiş mi?

---

## 📋 Build Checklist:

Yeni build almadan önce:

- [ ] `app.json` splash ve icon ayarları doğru
- [ ] Asset dosyaları doğru boyutlarda
- [ ] `node_modules` ve `.expo` temizlendi
- [ ] `versionCode` artırıldı (her build için)
- [ ] `--clear-cache` flag'i kullanıldı
- [ ] Eski APK telefondan kaldırıldı

---

## 🚀 Hızlı Build Komutu:

```bash
#!/bin/bash
# quick-build.sh

cd /app/frontend

echo "🧹 Temizlik yapılıyor..."
rm -rf node_modules .expo
yarn cache clean

echo "📦 Paketler yükleniyor..."
yarn install

echo "🏗️ Build başlatılıyor..."
eas build --platform android --profile production --clear-cache

echo "✅ Build başlatıldı! EAS Dashboard'da takip edin."
```

---

## 📞 Destek:

Build ile ilgili sorun yaşarsanız:

1. Bu dosyadaki adımları sırayla takip edin
2. Cache temizlemeyi deneyin
3. Version code'u artırın
4. Telefondaki eski build'i tamamen kaldırın

**Son Güncelleme:** 2025-01-09
**Durum:** ✅ app.json güncellendi, yeni build gerekli
