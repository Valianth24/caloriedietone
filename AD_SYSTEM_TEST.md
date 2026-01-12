# 🎬 Reklam Sistemi Test Dokümanı

## ✅ Düzeltildi: 1 Ücretsiz, 1 Reklamlı Döngüsü

---

## 📋 Doğru Sistem Akışı:

### **Tarifler İçin:**
```
1️⃣ 1. Tarif → ✅ REKLAMSIZ (direkt açılır)
2️⃣ 2. Tarif → 🎬 REKLAMLI (reklam modal gösterilir)
3️⃣ 3. Tarif → ✅ REKLAMSIZ (direkt açılır)
4️⃣ 4. Tarif → 🎬 REKLAMLI (reklam modal gösterilir)
5️⃣ 5. Tarif → ✅ REKLAMSIZ (direkt açılır)
...
```

**Döngü:** 1 bedava, 1 reklamlı, tekrar ediyor ✅

---

## 🔧 Yapılan Düzeltmeler:

### **1. FREE_LIMITS Güncellendi**

**Dosya:** `/app/frontend/utils/adSystem.ts`

**ÖNCE (Yanlış):**
```typescript
export const FREE_LIMITS = {
  RECIPES_PER_AD: 2, // Her 2 tariften sonra ❌
  CALORIES_PER_AD: 3, // Her 3 kalori taramadan sonra
};
```

**SONRA (Doğru):**
```typescript
export const FREE_LIMITS = {
  RECIPES_PER_AD: 1, // Her 1 tariften sonra ✅
  CALORIES_PER_AD: 1, // Her 1 kalori taramadan sonra ✅
};
```

**Sonuç:** Artık 1 ücretsiz, 1 reklamlı döngüsü

---

### **2. i18n Metinleri Düzeltildi**

**Dosya:** `/app/frontend/utils/i18n.ts`

#### **İngilizce (EN):**
```typescript
// ÖNCE (Yanlış)
watchAdRecipeDesc: 'You\'ve viewed 2 free recipes...' ❌
after2RecipesFree: 'Short ad after every 2 recipes' ❌

// SONRA (Doğru)
watchAdRecipeDesc: 'Watch a short ad to view this recipe. Completely free!' ✅
after2RecipesFree: 'Free with ads (1 free, 1 ad)' ✅
everyOtherRecipe: 'Ad after every recipe' ✅
nextFree: 'Next one is free' ✅
nextAd: 'Next one requires ad' ✅
```

#### **Türkçe (TR):**
```typescript
// ÖNCE (Yanlış)
watchAdRecipeDesc: '2 ücretsiz tarif görüntülediniz...' ❌
after2RecipesFree: 'Her 2 tariften sonra kısa reklam' ❌

// SONRA (Doğru)
watchAdRecipeDesc: 'Bu tarifi görmek için kısa bir reklam izleyin. Tamamen ücretsiz!' ✅
after2RecipesFree: 'Reklamla ücretsiz (1 bedava, 1 reklamlı)' ✅
everyOtherRecipe: 'Her tariften sonra reklam' ✅
nextFree: 'Sonraki ücretsiz' ✅
nextAd: 'Sonraki reklamlı' ✅
```

---

### **3. remainingFree Hesaplaması Düzeltildi**

**Dosya:** `/app/frontend/app/(tabs)/recipes.tsx`

**ÖNCE:**
```typescript
remainingFree={Math.max(0, 2 - recipeViewCount)} ❌
// 2 ücretsiz tarif kaldı
```

**SONRA:**
```typescript
remainingFree={Math.max(0, 1 - recipeViewCount)} ✅
// 1 ücretsiz tarif kaldı
```

---

### **4. Footer Note Güncellendi**

**Dosya:** `/app/frontend/components/WatchAdModal.tsx`

**ÖNCE:**
```typescript
'Her 2 tariften sonra kısa reklam' ❌
```

**SONRA:**
```typescript
'Reklamla ücretsiz (1 bedava, 1 reklamlı)' ✅
```

---

## 🧪 Test Senaryoları:

### **Test 1: Tarif Döngüsü (Türkçe)**
```
Adım 1: Tariflere git
Adım 2: 1. tarife tıkla
Beklenen: ✅ Direkt açılır (reklam yok)
Gerçek: [TEST EDİLECEK]

Adım 3: Geri dön, 2. tarife tıkla
Beklenen: 🎬 Reklam modal'ı görünür
Modal Mesajı: "Bu tarifi görmek için kısa bir reklam izleyin"
Gerçek: [TEST EDİLECEK]

Adım 4: Reklam izle (2 saniye simülasyon)
Beklenen: ✅ Tarif açılır
Gerçek: [TEST EDİLECEK]

Adım 5: Geri dön, 3. tarife tıkla
Beklenen: ✅ Direkt açılır (sayaç sıfırlandı)
Gerçek: [TEST EDİLECEK]

Adım 6: Geri dön, 4. tarife tıkla
Beklenen: 🎬 Tekrar reklam modal'ı
Gerçek: [TEST EDİLECEK]
```

### **Test 2: Tarif Döngüsü (İngilizce)**
```
Adım 1: Ayarlar → Dil → English
Adım 2: Tariflere git
Adım 3: 1. tarife tıkla
Beklenen: ✅ Direkt açılır
Modal Footer: "Free with ads (1 free, 1 ad)"

Adım 4: 2. tarife tıkla
Beklenen: 🎬 Reklam modal'ı
Modal Başlık: "Watch Ad to Continue"
Modal Açıklama: "Watch a short ad to view this recipe. Completely free!"
Buton: "Watch Ad (15s)"

Adım 5: Reklam izle ve tarife git
Adım 6: 3. tarife tıkla
Beklenen: ✅ Direkt açılır

Test İngilizce metinlerin doğru göründüğünü
```

### **Test 3: Dil Geçişi (Critical)**
```
Adım 1: Uygulama Türkçe'de
Adım 2: 2. tarife tıkla
Beklenen: 🎬 Modal Türkçe
  "Reklam İzleyerek Devam Et"
  "Bu tarifi görmek için kısa bir reklam izleyin"
  "Reklam İzle (15s)"

Adım 3: Modal'ı kapat
Adım 4: Ayarlar → Dil → English
Adım 5: Tariflere geri dön
Adım 6: Aynı tarife tekrar tıkla
Beklenen: 🎬 Modal İngilizce
  "Watch Ad to Continue"
  "Watch a short ad to view this recipe"
  "Watch Ad (15s)"

ÖNEMLI: Dil değişiminde tüm metinler değişmeli
```

### **Test 4: Sayaç Doğrulama**
```
Adım 1: AsyncStorage temizle (ilk kullanım)
Adım 2: 1. tarif → viewCount = 0 → Reklamsız ✅
Adım 3: 2. tarif → viewCount = 1 → Reklamlı 🎬
Adım 4: Reklam izle → viewCount = 0 (reset)
Adım 5: 3. tarif → viewCount = 0 → Reklamsız ✅
Adım 6: 4. tarif → viewCount = 1 → Reklamlı 🎬

Sayaç mantığı doğru çalışmalı
```

---

## ✅ Kontrol Listesi:

### **Türkçe Metinler:**
- [ ] "Reklam İzleyerek Devam Et" (modal başlık)
- [ ] "Bu tarifi görmek için kısa bir reklam izleyin. Tamamen ücretsiz!" (açıklama)
- [ ] "%100 Ücretsiz" (info box başlık)
- [ ] "Reklamları izleyerek bizi destekleyin" (info box açıklama)
- [ ] "Reklam İzle (15s)" (buton)
- [ ] "İptal" (iptal butonu)
- [ ] "Reklamla ücretsiz (1 bedava, 1 reklamlı)" (footer)

### **İngilizce Metinler:**
- [ ] "Watch Ad to Continue" (modal başlık)
- [ ] "Watch a short ad to view this recipe. Completely free!" (açıklama)
- [ ] "100% Free" (info box başlık)
- [ ] "Support us by watching ads" (info box açıklama)
- [ ] "Watch Ad (15s)" (buton)
- [ ] "Cancel" (iptal butonu)
- [ ] "Free with ads (1 free, 1 ad)" (footer)

### **Akış Kontrolü:**
- [ ] 1. tarif reklamsız
- [ ] 2. tarif reklamlı
- [ ] 3. tarif reklamsız (reset sonrası)
- [ ] 4. tarif reklamlı
- [ ] Döngü devam ediyor

### **Dil Geçişi:**
- [ ] Türkçe'den İngilizce'ye geçiş sorunsuz
- [ ] İngilizce'den Türkçe'ye geçiş sorunsuz
- [ ] Modal metinleri anında güncelleniyor
- [ ] Footer metinleri doğru
- [ ] Buton metinleri doğru

---

## 🐛 Olası Sorunlar ve Çözümleri:

### **Sorun 1: İkinci tarif hala ücretsiz açılıyor**
```
Neden: AsyncStorage'da eski data
Çözüm: 
AsyncStorage.removeItem('free_recipe_views')
Uygulamayı yeniden başlat
```

### **Sorun 2: Modal İngilizce'de Türkçe gösteriyor**
```
Neden: Fallback metinler kullanılıyor
Kontrol:
1. i18n.ts'de key'ler doğru mu?
2. useTranslation() hook'u var mı?
3. t() fonksiyonu çalışıyor mu?
```

### **Sorun 3: 3. tarif hala reklamlı**
```
Neden: Reset çalışmıyor
Kontrol:
1. resetAfterAd() çağrılıyor mu?
2. AsyncStorage.setItem('free_recipe_views', '0') çalışıyor mu?
```

### **Sorun 4: Dil değiştirince modal bozuluyor**
```
Neden: Component re-render olmuyor
Çözüm:
Modal'ı kapat ve tekrar aç
useTranslation() hook'u her component'te olmalı
```

---

## 📊 Beklenen Sonuçlar:

### **Kullanıcı Deneyimi:**
```
✅ 1 tarif ücretsiz izle
🎬 1 kısa reklam izle (15 saniye)
✅ 1 tarif daha ücretsiz
🎬 1 reklam daha
...

Kullanıcı: "Reklamlar çok sık değil, kabul edilebilir"
```

### **Metinler:**
```
Türkçe:
✓ Tüm metinler doğal Türkçe
✓ "1 bedava, 1 reklamlı" net
✓ "Tamamen ücretsiz!" motivasyonel

İngilizce:
✓ Tüm metinler doğal İngilizce
✓ "1 free, 1 ad" açık
✓ "Completely free!" net mesaj
```

---

## ✅ Özet:

**Düzeltmeler:**
- ✅ RECIPES_PER_AD: 2 → 1
- ✅ Türkçe metinler güncellendi
- ✅ İngilizce metinler güncellendi
- ✅ remainingFree: 2 → 1
- ✅ Footer note güncellendi

**Test Edilmesi Gerekenler:**
- 🧪 1-2-3-4 tarif döngüsü
- 🧪 Türkçe metinler
- 🧪 İngilizce metinler
- 🧪 Dil geçişi (TR ↔ EN)
- 🧪 Sayaç reset

**Durum:**
- ✅ Kod değişiklikleri tamamlandı
- ✅ Servis yeniden başlatıldı
- ⏳ Test edilecek

---

**Artık sistem doğru: 1 ücretsiz, 1 reklamlı!** ✅
