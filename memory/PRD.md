# CalorieDiet App - PRD

## Proje Bilgisi
- **Uygulama**: CalorieDiet - Kalori Takip ve Diyet Uygulaması
- **Platform**: React Native / Expo (Play Store)
- **Son Güncelleme**: 31 Ocak 2026

## Tamamlanan Görevler

### ✅ 1. Reklam Sistemi - 2 Tıklama = 2 Reklam (31 Ocak 2026)
**recipes.tsx:**
- `adsWatchedForRecipe` state eklendi
- `handleWatchAd` güncellendi: Her tıklamada 1 reklam, 2 reklam izlenince tarif açılır
- Modal 1. reklamdan sonra kapanmıyor, kullanıcı 2. reklamı da izliyor

**camera.tsx:**
- `adsWatchedForCalorie` state eklendi  
- `handleWatchAdForCalorie` güncellendi: 2 reklam izlenince kalori analizi başlıyor
- Aynı 2 tıklama sistemi kalori hesaplama için uygulandı

**WatchAdModal.tsx:**
- `adsWatched` ve `loading` props eklendi (dışarıdan kontrol)
- Progress göstergesi (0/2 → 1/2 → 2/2) düzgün çalışıyor

### ✅ 2. Ekran Görüntüsü/Kayıt Engelleme (31 Ocak 2026)
**_layout.tsx:**
- `expo-screen-capture` entegre edildi
- Uygulama genelinde ekran görüntüsü ve kayıt engelleme aktif
- Android'de FLAG_SECURE otomatik aktif

**package.json:**
- `expo-screen-capture: ^7.0.9` eklendi

### ✅ 3. Önceki Hata Düzeltmeleri
- PremiumPaywall kaldırıldı
- watchedAdRecipes hatası düzeltildi
- showSingleRewardedAd tek reklam yapıldı

## Reklam Akışı (Hedef - TAMAMLANDI)
```
Kullanıcı Tıklar → Modal Açılır (0/2)
→ "Reklam İzle" Tıklar → 1 Ödüllü Reklam → (1/2)
→ "Reklam İzle" Tıklar → 1 Ödüllü Reklam → (2/2)
→ İçerik Açılır
```

## Dosya Konumları
- `/app/frontend/app/(tabs)/recipes.tsx` - handleWatchAd (satır 312)
- `/app/frontend/app/(tabs)/camera.tsx` - handleWatchAdForCalorie (satır 295)
- `/app/frontend/components/WatchAdModal.tsx` - Modal bileşeni
- `/app/frontend/app/_layout.tsx` - Ekran koruma
- `/app/frontend/utils/admobService.ts` - AdMob servisi

## Sonraki Görevler (Backlog)
- P1: Test on real device
- P2: iOS screenshot limitation handling (OS limitation)
- P2: Analytics integration for ad performance

## Teknik Notlar
- AdMob Rewarded ID: ca-app-pub-6980942787991808/1382918054
- AdMob Rewarded Interstitial ID: ca-app-pub-6980942787991808/3429358823
- expo-screen-capture Android'de tam destek, iOS'ta sınırlı
