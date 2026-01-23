# CalorieDiet App - PRD

## Orijinal İstek
Play Store'da yayınlanan CalorieDiet uygulamasında reklam sistemi değişikliği:
- Yeşil/turuncu badge'ler kaldırılsın
- Reklamlı tariflerde sadece yıldız ikonu olsun
- Ücretsiz tariflerde hiçbir işaret olmasın
- Çeviriler tüm dillerde çalışsın

## Tamamlanan İşler (23 Ocak 2026)

### 1. UI Güncellemesi
- ✅ Yeşil/turuncu badge'ler KALDIRILDI
- ✅ Reklamlı tarifler: Sarı yıldız (⭐) ikonu
- ✅ Ücretsiz tarifler: Hiçbir işaret yok (temiz görünüm)

### 2. Reklam Sistemi
- ✅ Her kategoride ilk 3 tarif reklamsız
- ✅ 4. tariften sonrası reklamlı (yıldız ikonu ile)
- ✅ Reklam izlenmeden tarif açılmıyor
- ✅ MOCK reklam (uygulama çökmesin)

### 3. Çeviriler (7 Dil)
- ✅ Türkçe (tr)
- ✅ İngilizce (en)
- ✅ İspanyolca (es)
- ✅ Portekizce (pt)
- ✅ Almanca (de)
- ✅ Fransızca (fr)
- ✅ Arapça (ar)

### Dosyalar
- `frontend/utils/adSystem.ts` - Reklam mantığı
- `frontend/app/(tabs)/recipes.tsx` - UI (yıldız badge)
- `frontend/utils/i18n.ts` - 7 dilde çeviriler

## AdMob (Beklemede)
```
google.com, pub-6980942787991808, DIRECT, f08c47fec0942fa0
```

## Sonraki Adımlar
1. Kodu test et (expo start)
2. Build al (eas build)
3. Play Store'a yükle
