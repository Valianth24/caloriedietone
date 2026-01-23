# CalorieDiet App - PRD

## Orijinal İstek
Play Store'da yayınlanan CalorieDiet uygulamasında reklam sistemi değişikliği:
- "Reklam izle" butonu kaldırılsın (bize destek olmak için reklam izleyin kısmı)
- Tarifler reklam izlenmeden görünmesin
- Her kategoride 3-4 basit reklamsız tarif olsun, gerisi reklamlı

## Tamamlanan İşler (23 Ocak 2026)

### 1. Reklam Sistemi Güncellemesi (`utils/adSystem.ts`)
- ✅ Her kategoride ilk 3 tarif reklamsız (`FREE_RECIPES_PER_CATEGORY = 3`)
- ✅ Geri kalan tarifler için reklam izlenmesi ZORUNLU
- ✅ Reklam izlenen tarifler AsyncStorage'da saklanıyor
- ✅ MOCK reklam sistemi - uygulama çökmesin (AdMob sonra entegre edilecek)

### 2. UI/UX Güncellemesi (`app/(tabs)/recipes.tsx`)
- ✅ Reklamsız tarifler için yeşil "Ücretsiz" badge
- ✅ Reklamlı tarifler için turuncu "Reklam" badge
- ✅ Tarif index'e göre reklam kontrolü
- ✅ Reklam modal'ı ile tarif kilitleme

### 3. Çeviriler (`utils/i18n.ts`)
- ✅ Türkçe: "Her kategoride ilk 3 tarif ücretsiz!"
- ✅ İngilizce: "First 3 recipes in each category are free!"

## AdMob Entegrasyonu (Beklemede)
```
google.com, pub-6980942787991808, DIRECT, f08c47fec0942fa0
```
- app-ads.txt dosyası geliştirici web sitesine eklenmeli
- Gerçek AdMob SDK entegrasyonu sonra yapılacak

## Teknoloji
- React Native / Expo
- AsyncStorage (reklam durumu)
- i18next (çoklu dil)

## Sonraki Adımlar
1. AdMob SDK entegrasyonu
2. app-ads.txt doğrulaması
3. Test ve yayın
