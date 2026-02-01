# Reklam Sistemi Değişiklikleri - Ocak 2025

## Yapılan Değişiklikler

### 1. Her Tarif İçin Tek Reklam Sistemi ✅

**Önceki Durum:**
- Kullanıcı bir tarife tıkladığında 2 reklam izlemesi gerekiyordu
- İlk reklamdan sonra modal açık kalıyor, ikinci reklamı da izlemesi gerekiyordu

**Yeni Durum:**
- Kullanıcı bir tarife tıkladığında sadece 1 reklam izliyor
- Reklam başarıyla izlendikten sonra tarif direkt açılıyor

### 2. WatchAdModal Güncellemesi ✅

**Eklenen Özellikler:**
- `singleAd` prop'u eklendi (tek vs çoklu reklam modu)
- Tek reklam modunda progress bar gösterilmiyor
- Buton metni dinamik olarak güncelleniyor
  - Tek reklam modu: "Reklam İzle" 
  - Çoklu reklam modu: "Reklam İzle (X kaldı)"

### 3. Free Pass Sistemi Korundu ✅

- "2 Reklam = 1 Saat Bedava" sistemi aynen çalışmaya devam ediyor
- Bu sistem için hala 2 reklam gerekiyor
- Progress bar bu sistemde gösteriliyor

## Değiştirilen Dosyalar

1. `/app/frontend/app/(tabs)/recipes.tsx`
   - `handleWatchAd` fonksiyonu güncellendi
   - Artık sadece 1 reklam gerekiyor (2 yerine)
   - Reklam başarılı olunca direkt tarif açılıyor
   - WatchAdModal'a `singleAd={true}` prop'u eklendi

2. `/app/frontend/components/WatchAdModal.tsx`
   - `singleAd` prop'u eklendi
   - Progress bar sadece çoklu reklam modunda gösteriliyor
   - Açıklamalar tek/çoklu moda göre dinamik
   - Buton metni dinamik olarak güncelleniyor

3. `/app/frontend/utils/admobService.ts`
   - Kontrol edildi, zaten tek reklam gösteriyor ✅

## Test Edilmesi Gereken Senaryolar

1. ✅ Free Pass reddedildiğinde tek tarif açma
   - Bir tarife tıkla
   - 1 reklam izle
   - Tarif açılmalı

2. ✅ Free Pass sistemi
   - Free Pass modal'ını aç
   - 2 reklam izle
   - Tüm tarifler 1 saat boyunca açık olmalı

3. ✅ Free Pass aktifken tarifler
   - Free Pass aktifse tarifler direkt açılmalı (reklam yok)

## Notlar

- Reklam sayısını azaltarak kullanıcı deneyimi iyileştirildi
- Free Pass sistemi tercih edildiğinde hala aynı avantajlar geçerli
- Her tarif için sadece 1 reklam = daha hızlı erişim
