# CalorieDiet - Çok Dilli Kalori Takip Uygulaması

## Problem Statement
GitHub repo'sundan alınan CalorieDiet Android uygulamasında Türkçe-İngilizce dil geçişlerinin tüm sayfalarda sorunsuz çalıştığından emin olunması istendi. Uygulama Play Store'da yayında.

## Architecture
- **Platform**: React Native / Expo (Android App)
- **Localization**: react-i18next + expo-localization
- **Languages**: 7 dil desteği (EN, TR, ES, DE, FR, PT, AR)

## What Was Implemented
### Date: Jan 2026

**Dil Geçiş Düzeltmeleri:**

1. **auth.tsx** - Hardcoded Türkçe metinler i18n'e çevrildi:
   - "Giriş yapılıyor..." → `t('loggingIn')`
   - "Lütfen bekleyin" → `t('pleaseWait')`

2. **recipes.tsx** - Alert mesajı düzeltildi:
   - Hardcoded "Hata" → `t('error')`
   - Reklam yükleme hatası → `t('adLoadFailed')`

3. **profile.tsx** - Alert butonları düzeltildi:
   - "Tamam" → `t('ok')`
   - "Language change failed" → `t('languageChangeFailed')`

4. **meals.tsx** - Sepet butonları düzeltildi:
   - "Sepete Ekle" / "Add to Cart" → `t('addToCart')`
   - "Hemen Ekle" / "Add Now" → `t('addNow')`
   - "Hepsini Ekle" → `t('addAllItems')`

5. **vitamins.tsx** - Modal içerikleri düzeltildi:
   - Placeholder "Vitamin Adı" → `t('vitaminName')`
   - "Zaman (örn: Her Sabah)" → `t('vitaminTimePlaceholder')`
   - "Hatırlatıcı Ayarları" → `t('reminderSettings')`
   - "Hatırlatıcıları Aç" → `t('enableReminder')`
   - "Hatırlatma Saatleri" → `t('reminderTimes')`
   - "Alarm Tarzı Bildirim" → `t('alarmStyle')`
   - İptal/Kaydet butonları → `t('cancel')`, `t('save')`

6. **AdvancedDietForm.tsx** - Tüm form etiketleri düzeltildi:
   - "Kişisel Diyet Oluştur" → `t('createPersonalDiet')`
   - Cinsiyet, Boy, Kilo, Yaş etiketleri
   - Hedef seçenekleri (Kilo Ver, Kas Yap, vb.)
   - Aktivite seviyeleri
   - Diyet tercihleri
   - Makro dağılımı, BMR, TDEE etiketleri

7. **water-detail.tsx** - Buton metinleri düzeltildi:
   - "Kaydet" → `t('save')`
   - "Test Bildirimi Gönder" → `t('testNotification')`

8. **diet-program.tsx** - Çeşitli metinler düzeltildi:
   - "Günü Tamamla" → `t('completeDay')`
   - "Bu gün tamamlandı!" → `t('dayCompleted')`
   - "Tamamlandı" / "Kilitli" legend etiketleri
   - "30 Günlük Programa Başla" → `t('startDietProgram')`
   - "7 Günlük Önizleme" → `t('sevenDayPreview')`

9. **index.tsx** - Devam Et butonu düzeltildi:
   - Hardcoded dil kontrolü → `t('continue')`

**i18n.ts'ye Eklenen Yeni Çeviriler:**
- pleaseWait (EN/TR)
- adLoadFailed (EN/TR)
- languageChangeFailed (EN/TR)
- lowCarb, highProtein, vegan, veganDesc, keto (EN/TR)
- dietPreference (EN/TR)
- mealsPerDay (EN/TR)
- restrictionsPlaceholder (EN/TR)
- calculatedValues (EN/TR)
- basalMetabolism (EN/TR)
- dailyExpenditure (EN/TR)
- macroDistribution (EN/TR)
- vitaminTimePlaceholder (EN/TR)
- addToCart, addNow, addAllItems (EN/TR)
- testNotification (EN/TR)
- dayCompleted (EN/TR)
- startDietProgram (EN/TR)
- sevenDayPreview (EN/TR)

## Core Requirements (Static)
- Tüm UI metinleri i18n ile çevrilmeli
- Dil değişikliği anında tüm ekranlara yansımalı
- Hardcoded string kullanılmamalı

## User Personas
- Türkçe konuşan kullanıcılar
- İngilizce konuşan kullanıcılar
- Diğer dil kullanıcıları (ES, DE, FR, PT, AR)

## Next Tasks / Backlog
- [ ] İspanyolca (ES) ve diğer dillere yeni eklenen çevirilerin eklenmesi
- [ ] Tarif isimlerinin dinamik çevirisi (JSON dosyalarından)
- [ ] Hata mesajlarının tamamının kontrol edilmesi
- [ ] Tarih/saat formatlarının locale'e göre düzenlenmesi

## P0 Features (Kritik)
✅ TR/EN dil geçişleri sorunsuz çalışıyor

## P1 Features (Önemli)  
- Diğer dillere çeviri desteği genişletme

## P2 Features (İyileştirme)
- RTL dil desteği (Arapça) iyileştirmeleri
