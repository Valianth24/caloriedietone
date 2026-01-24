# CalorieDiet App - PRD

## AdMob Entegrasyonu Tamamlandı ✅

### AdMob Bilgileri
- **App ID:** ca-app-pub-6980942787991808~8398068336
- **Ödüllü Geçiş Reklamı (Tarif 1):** ca-app-pub-6980942787991808/2514158595
- **Ödüllü Reklam (Tarif 2):** ca-app-pub-6980942787991808/8616532511

### Reklam Mantığı
**Tarifler için:**
- İlk 3 tarif reklamsız
- 4+ tarifler için ÇİFT REKLAM (arka arkaya, tek reklam gibi)
  1. Rewarded Interstitial
  2. Rewarded Ad

**Temalar için:**
- 3 tek reklam = 24 saat kullanım

### Eklenen Dosyalar
- `utils/admobService.ts` - AdMob servisi
- `app.json` - AdMob config plugin

### Güncellemeler
- `utils/adSystem.ts` - MOCK yerine gerçek AdMob
- `app/_layout.tsx` - Uygulama başlangıcında reklam preload

## Uygulama İkonu
- Elma + çatal + mezura
- Koyu arka plan (#1a1a2e)

## Build Komutları
```bash
# Local build
eas build --platform android --local

# Cloud build
eas build --platform android
```
