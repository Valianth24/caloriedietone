import { Diet } from '../types';

export const intermittentFasting52Diet30: Diet = {
  id: 'intermittent-fasting-5-2',
  name: {
    tr: 'Aralıklı Oruç 5:2 Diyeti',
    en: 'Intermittent Fasting 5:2 Diet',
  },
  emoji: '⏰',
  isPremium: true,
  duration: 30,
  difficulty: 'medium',

  description: {
    tr: 'Aralıklı Oruç 5:2 Diyeti, haftada 5 gün normal yemek yiyip 2 gün çok düşük kalorili (500-600 kcal) beslenmeyi içeren bilimsel bir yağ yakım yöntemidir. Dr. Michael Mosley tarafından popülerleştirilen bu yöntem, metabolizmayı hızlandırır, insülin direncini azaltır ve hücresel yenilenmeyi (otofaji) tetikler.',
    en: 'The 5:2 Intermittent Fasting Diet is a scientific fat burning method that involves eating normally 5 days a week and consuming very low calories (500-600 kcal) for 2 days. Popularized by Dr. Michael Mosley, this method accelerates metabolism, reduces insulin resistance, and triggers cellular renewal (autophagy).',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 5:2 Konsepti:
• Haftada 5 gün normal beslenme (kalori kısıtlaması yok)
• Haftada 2 gün çok düşük kalori (500-600 kcal)
• Oruç günleri ardı ardına olmamalı
• Pazartesi ve Perşembe en çok tercih edilen günler

🔬 Bilimsel Kanıtlar:
• Yağ yakımında %3-8 artış (12 haftalık çalışma)
• İnsülin direncinde %30 azalma
• HbA1c seviyelerinde düşüş
• Kolesterol profilinde iyileşme

🧠 Otofaji (Hücresel Yenilenme):
• Oruç sırasında vücut hasarlı hücreleri temizler
• Yaşlanma sürecini yavaşlatır
• Beyin sağlığını destekler
• 2016 Nobel Tıp Ödülü konusu

💪 Metabolik Faydalar:
• HGH (büyüme hormonu) %300 artış
• Norepinefrin artışı - yağ yakımı
• Metabolizma %3-14 hızlanır
• Kas kütlesi korunur

⚠️ Kimler Uygulamamalı:
• Hamileler ve emzirenler
• Yeme bozukluğu geçmişi olanlar
• Tip 1 diyabet hastaları
• 18 yaş altı`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 5:2 Concept:
• 5 days normal eating (no calorie restriction)
• 2 days very low calories (500-600 kcal)
• Fasting days should not be consecutive
• Monday and Thursday most preferred days

🔬 Scientific Evidence:
• 3-8% increase in fat burning (12-week study)
• 30% reduction in insulin resistance
• Decrease in HbA1c levels
• Improved cholesterol profile

🧠 Autophagy (Cellular Renewal):
• Body clears damaged cells during fasting
• Slows aging process
• Supports brain health
• 2016 Nobel Prize in Medicine topic

💪 Metabolic Benefits:
• 300% increase in HGH (growth hormone)
• Norepinephrine increase - fat burning
• Metabolism speeds up 3-14%
• Muscle mass preserved

⚠️ Who Should Not Apply:
• Pregnant and breastfeeding women
• Those with eating disorder history
• Type 1 diabetics
• Under 18`,
  },

  benefits: {
    tr: [
      '🔥 Etkili yağ yakımı (haftada 0.5-1 kg)',
      '🧠 Otofaji ile hücresel yenilenme',
      '🩺 İnsülin duyarlılığı artışı',
      '💪 Kas kütlesi korunur',
      '❤️ Kalp sağlığını destekler',
      '🧠 Bilişsel fonksiyonları geliştirir',
      '🔄 Metabolizmayı hızlandırır',
      '💰 Ekonomik - özel ürün gerektirmez',
      '⏰ Esnek - yaşam tarzına uyarlanabilir',
      '🌟 Uzun ömür desteği',
    ],
    en: [
      '🔥 Effective fat burning (0.5-1 kg per week)',
      '🧠 Cellular renewal through autophagy',
      '🩺 Increased insulin sensitivity',
      '💪 Muscle mass preserved',
      '❤️ Supports heart health',
      '🧠 Improves cognitive functions',
      '🔄 Accelerates metabolism',
      '💰 Economical - no special products needed',
      '⏰ Flexible - adaptable to lifestyle',
      '🌟 Longevity support',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Hamileler ve emzirenler uygulamamalı',
      '📊 Yeme bozukluğu geçmişi olanlar dikkatli olmalı',
      '💊 Diyabet hastaları doktora danışmalı',
      '💧 Oruç günlerinde bol su için',
      '⏰ İlk hafta baş ağrısı ve yorgunluk olabilir',
      '🏃 Oruç günlerinde ağır egzersizden kaçının',
    ],
    en: [
      '⚠️ Pregnant and breastfeeding women should not apply',
      '📊 Those with eating disorder history should be careful',
      '💊 Diabetics should consult a doctor',
      '💧 Drink plenty of water on fasting days',
      '⏰ Headache and fatigue may occur in the first week',
      '🏃 Avoid heavy exercise on fasting days',
    ],
  },

  allowedFoods: {
    tr: [
      '🍗 NORMAL GÜNLER (5 gün):',
      '🍗 Her türlü protein (tavuk, balık, et)',
      '🥬 Bol sebze ve meyve',
      '🌾 Tam tahıllar',
      '🥛 Süt ürünleri',
      '🥜 Sağlıklı yağlar',
      '',
      '⏰ ORUÇ GÜNLERİ (500-600 kcal):',
      '🥬 Düşük kalorili sebzeler',
      '🐟 Yağsız protein (tavuk, balık, yumurta)',
      '🍜 Sebze çorbaları',
      '🥗 Büyük salatalar',
      '🍎 Düşük kalorili meyveler',
      '',
      '💧 HER ZAMAN SERBEST:',
      '💧 Su, maden suyu',
      '☕ Siyah kahve (şekersiz)',
      '🍵 Yeşil/bitki çayları',
    ],
    en: [
      '🍗 NORMAL DAYS (5 days):',
      '🍗 All types of protein (chicken, fish, meat)',
      '🥬 Plenty of vegetables and fruits',
      '🌾 Whole grains',
      '🥛 Dairy products',
      '🥜 Healthy fats',
      '',
      '⏰ FASTING DAYS (500-600 kcal):',
      '🥬 Low-calorie vegetables',
      '🐟 Lean protein (chicken, fish, eggs)',
      '🍜 Vegetable soups',
      '🥗 Large salads',
      '🍎 Low-calorie fruits',
      '',
      '💧 ALWAYS FREE:',
      '💧 Water, mineral water',
      '☕ Black coffee (no sugar)',
      '🍵 Green/herbal teas',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🚫 ORUÇ GÜNLERİNDE KAÇININ:',
      '🍟 Kızartmalar, yağlı yiyecekler',
      '🍬 Şekerli gıdalar',
      '🍺 Alkol',
      '🍰 Pasta, tatlı',
      '🥖 Beyaz ekmek, makarna',
      '',
      '🚨 TAMAMEN KAÇININ:',
      '🥤 Şekerli içecekler',
      '🍟 Fast food',
      '🍿 Paketli atıştırmalıklar',
      '🥤 Meyve suları (kalori yoğunluğu yüksek)',
    ],
    en: [
      '🚫 AVOID ON FASTING DAYS:',
      '🍟 Fried, fatty foods',
      '🍬 Sugary foods',
      '🍺 Alcohol',
      '🍰 Cakes, desserts',
      '🥖 White bread, pasta',
      '',
      '🚨 COMPLETELY AVOID:',
      '🥤 Sugary drinks',
      '🍟 Fast food',
      '🍿 Packaged snacks',
      '🥤 Fruit juices (high calorie density)',
    ],
  },

  exercises: [
    {
      name: 'Hafif Yürüyüş / Light Walking',
      duration: '30-45 dakika / minutes',
      frequency: 'Her gün (oruç dahil) / Daily (including fasting)',
      note: 'Oruç günlerinde hafif tempo.',
    },
    {
      name: 'Ağırlık Antrenmanı / Weight Training',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 3 kez (normal günlerde) / 3 times a week (normal days)',
      note: 'Sadece normal günlerde yapın.',
    },
    {
      name: 'Yoga / Yoga',
      duration: '20-30 dakika / minutes',
      frequency: 'Haftada 3 kez / 3 times a week',
      note: 'Oruç günlerinde de yapılabilir.',
    },
    {
      name: 'Yüzme / Swimming',
      duration: '30 dakika / minutes',
      frequency: 'Haftada 2 kez (normal günlerde) / 2 times a week (normal days)',
      note: 'Düşük etkili kardio.',
    },
    {
      name: 'Esneme / Stretching',
      duration: '15 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Oruç günlerinde rahatlatmak için.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Normal Gün 🍽️',
      totalCalories: 1800,
      note: 'Normal beslenme günü. Dengeli ve sağlıklı yiyin.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 220 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
            { name: 'Yağsız süt', portion: '150ml', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Bulgur pilavı', portion: '120g', calories: 150 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa', portion: '80g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - ✨ ORUÇ GÜNÜ ✨',
      totalCalories: 500,
      note: 'İLK ORUÇ GÜNÜ! Sadece 500 kalori. Bol su için!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Siyah kahve/çay', portion: '1 fincan', calories: 0 },
            { name: 'Ispanak', portion: '50g', calories: 15 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Sebze çorbası (kremalı değil)', portion: '300ml', calories: 80 },
            { name: 'Büyük yeşil salata', portion: '250g', calories: 60 },
            { name: 'Limon suyu', portion: '2 yemek kaşığı', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (Hafif)',
          totalCalories: 200,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '100g', calories: 165 },
            { name: 'Buharda brokoli', portion: '150g', calories: 50 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 0,
          foods: [
            { name: 'Su', portion: '2+ litre', calories: 0, note: 'Bol su için!' },
            { name: 'Yeşil çay', portion: '2-3 fincan', calories: 0 },
            { name: 'Siyah kahve', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Normal Gün 🍽️',
      totalCalories: 1800,
      note: 'Normal beslenme. Dünü atlattınız!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara balık', portion: '180g', calories: 250 },
            { name: 'Esmer pirinç', portion: '120g', calories: 135 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 120 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Yeşil biber', portion: '2 adet', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut', portion: '1 orta', calories: 100 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Normal Gün 🍽️',
      totalCalories: 1850,
      note: 'Normal beslenme günü.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yulaf ezmesi', portion: '50g', calories: 180 },
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Izgara köfte', portion: '150g', calories: 300 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '200g', calories: 50 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında levrek', portion: '180g', calories: 250 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Kinoa', portion: '80g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Fındık', portion: '15 adet', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - ✨ ORUÇ GÜNÜ ✨',
      totalCalories: 500,
      note: 'İKİNCİ ORUÇ GÜNÜ! Haftada 2 oruç tamamlandı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Ispanak', portion: '80g', calories: 20 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Mercimek çorbası (suık)', portion: '250ml', calories: 100 },
            { name: 'Büyük yeşil salata', portion: '200g', calories: 50 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (Hafif)',
          totalCalories: 200,
          foods: [
            { name: 'Izgara balık', portion: '120g', calories: 160 },
            { name: 'Buharda brokoli', portion: '100g', calories: 35 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Sıvı Tüketimi',
          totalCalories: 0,
          foods: [
            { name: 'Su', portion: '2+ litre', calories: 0 },
            { name: 'Bitki çayı', portion: '2-3 fincan', calories: 0 },
            { name: 'Siyah kahve', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Normal Gün 🍽️',
      totalCalories: 1800,
      note: 'Normal beslenme - oruç sonrası dinlenme.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Menemen', portion: '2 yumurta', calories: 220 },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '180g', calories: 300 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Esmer pirinç', portion: '80g', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - Normal Gün (Hafta Sonu) 🎉',
      totalCalories: 1900,
      note: 'İLK HAFTA TAMAMLANDI! Tebrikler!',
      meals: [
        {
          type: 'breakfast',
          name: 'Hafta Sonu Kahvaltısı',
          totalCalories: 500,
          foods: [
            { name: 'Sebzeli omlet', portion: '3 yumurta', calories: 280 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara kuzu pirzola', portion: '150g', calories: 350 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara çipura', portion: '200g', calories: 280 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa', portion: '80g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 120 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 8,
      title: 'Gün 8 - Normal Gün 🚀',
      totalCalories: 1800,
      note: 'İkinci hafta başladı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf ezmesi', portion: '50g', calories: 180 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara tavuk', portion: '180g', calories: 300 },
            { name: 'Kinoa salatası', portion: '150g', calories: 180 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında balık', portion: '180g', calories: 250 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 9,
      title: 'Gün 9 - ✨ ORUÇ GÜNÜ ✨',
      totalCalories: 500,
      note: 'ÜÇÜNCÜ ORUÇ! Artık alışıyorsunuz.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Tavuk çorbası (yağsız)', portion: '250ml', calories: 100 },
            { name: 'Büyük yeşil salata', portion: '200g', calories: 50 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (Hafif)',
          totalCalories: 200,
          foods: [
            { name: 'Izgara hindi göğsü', portion: '120g', calories: 200 },
            { name: 'Buharda brokoli', portion: '100g', calories: 35 },
          ],
        },
        {
          type: 'snack',
          name: 'Sıvı Tüketimi',
          totalCalories: 0,
          foods: [
            { name: 'Su', portion: '2+ litre', calories: 0 },
            { name: 'Bitki çayı', portion: '2-3 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 10,
      title: 'Gün 10 - Normal Gün 🌟',
      totalCalories: 1800,
      note: '10 gün tamamlandı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Menemen', portion: '2 yumurta', calories: 220 },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 350 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı-limon', portion: '1 tatlı kaşığı', calories: 55 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Yeşil biber', portion: '2 adet', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut', portion: '1 orta', calories: 100 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 11,
      title: 'Gün 11 - Normal Gün 🍽️',
      totalCalories: 1850,
      note: 'Normal beslenme devam.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yulaf + meyve', portion: '50g + 100g', calories: 260 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Dana biftek (ızgara)', portion: '150g', calories: 320 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında çipura', portion: '200g', calories: 280 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa', portion: '80g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Fındık', portion: '20 adet', calories: 130 },
          ],
        },
      ],
    },
    {
      day: 12,
      title: 'Gün 12 - ✨ ORUÇ GÜNÜ ✨',
      totalCalories: 500,
      note: 'DÖRDÜNCÜ ORUÇ! Yağ yakımı artıyor.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Siyah kahve', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Yeşil salata', portion: '200g', calories: 50 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (Hafif)',
          totalCalories: 200,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '100g', calories: 165 },
            { name: 'Buharda sebze', portion: '150g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Sıvı Tüketimi',
          totalCalories: 0,
          foods: [
            { name: 'Su', portion: '2+ litre', calories: 0 },
            { name: 'Yeşil çay', portion: '2-3 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 13,
      title: 'Gün 13 - Normal Gün 🍽️',
      totalCalories: 1800,
      note: 'Normal beslenme.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara balık', portion: '180g', calories: 250 },
            { name: 'Bulgur', portion: '120g', calories: 150 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk göğsü (fırın)', portion: '180g', calories: 300 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Kinoa', portion: '70g', calories: 85 },
            { name: 'Yoğurt', portion: '50g', calories: 30 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 14,
      title: 'Gün 14 - Normal Gün (Hafta Sonu) 🏆',
      totalCalories: 1900,
      note: '2 HAFTA TAMAMLANDI! Yarı yoldayız!',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 500,
          foods: [
            { name: 'Pancake (tam buğday)', portion: '2 adet', calories: 200 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara kuzu pirzola', portion: '150g', calories: 350 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Fırında sebze', portion: '150g', calories: 80 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 350 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Esmer pirinç', portion: '60g', calories: 70 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 120 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '12 adet', calories: 85 },
          ],
        },
      ],
    },
    {
      day: 15,
      title: 'Gün 15 - Normal Gün 🚀',
      totalCalories: 1800,
      note: 'Üçüncü hafta başlıyor!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf ezmesi', portion: '50g', calories: 180 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '180g', calories: 300 },
            { name: 'Kinoa salatası', portion: '150g', calories: 180 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında çipura', portion: '200g', calories: 280 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Bulgur', portion: '80g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut', portion: '1 orta', calories: 100 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 16,
      title: 'Gün 16 - ✨ ORUÇ GÜNÜ ✨',
      totalCalories: 500,
      note: 'BEŞİNCİ ORUÇ! Artık ustalaştınız.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Ispanak', portion: '80g', calories: 20 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Büyük salata', portion: '200g', calories: 50 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (Hafif)',
          totalCalories: 200,
          foods: [
            { name: 'Izgara balık', portion: '120g', calories: 160 },
            { name: 'Buharda brokoli', portion: '100g', calories: 35 },
          ],
        },
        {
          type: 'snack',
          name: 'Sıvılar',
          totalCalories: 0,
          foods: [
            { name: 'Su', portion: '2+ litre', calories: 0 },
            { name: 'Yeşil çay', portion: '2-3 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 17,
      title: 'Gün 17 - Normal Gün 🍽️',
      totalCalories: 1800,
      note: 'Normal beslenme.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Menemen', portion: '2 yumurta', calories: 220 },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 350 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Yeşil biber', portion: '2 adet', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 18,
      title: 'Gün 18 - Normal Gün 🍽️',
      totalCalories: 1850,
      note: 'Normal beslenme devam.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yulaf + yoğurt', portion: '50g + 150g', calories: 270 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Izgara köfte', portion: '150g', calories: 300 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '200g', calories: 50 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında levrek', portion: '200g', calories: 280 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Kinoa', portion: '70g', calories: 85 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Portakal', portion: '1 orta', calories: 60 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Fındık', portion: '20 adet', calories: 130 },
          ],
        },
      ],
    },
    {
      day: 19,
      title: 'Gün 19 - ✨ ORUÇ GÜNÜ ✨',
      totalCalories: 500,
      note: 'ALTINCI ORUÇ! Artık profesyonelsiniz.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Tavuk çorbası (yağsız)', portion: '250ml', calories: 100 },
            { name: 'Yeşil salata', portion: '200g', calories: 50 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (Hafif)',
          totalCalories: 200,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '100g', calories: 165 },
            { name: 'Buharda sebze', portion: '150g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Sıvılar',
          totalCalories: 0,
          foods: [
            { name: 'Su', portion: '2+ litre', calories: 0 },
            { name: 'Bitki çayı', portion: '2-3 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 20,
      title: 'Gün 20 - Normal Gün 🌟',
      totalCalories: 1800,
      note: '20 gün tamamlandı! 2-3 kg kaybettiniz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara balık', portion: '180g', calories: 250 },
            { name: 'Bulgur', portion: '120g', calories: 150 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk göğsü (fırın)', portion: '180g', calories: 300 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Kinoa', portion: '70g', calories: 85 },
            { name: 'Yoğurt', portion: '50g', calories: 30 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 21,
      title: 'Gün 21 - Normal Gün (Hafta Sonu) 🏆',
      totalCalories: 1900,
      note: '3 HAFTA TAMAMLANDI! Harika gidiyorsunuz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 500,
          foods: [
            { name: 'French toast (tam buğday)', portion: '2 dilim', calories: 280 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara biftek', portion: '150g', calories: 320 },
            { name: 'Fırında patates', portion: '100g', calories: 100 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 350 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Esmer pirinç', portion: '60g', calories: 70 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 120 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '12 adet', calories: 85 },
          ],
        },
      ],
    },
    {
      day: 22,
      title: 'Gün 22 - Normal Gün 🎯',
      totalCalories: 1800,
      note: 'Son hafta başlıyor!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf ezmesi', portion: '50g', calories: 180 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
            { name: 'Çilek', portion: '80g', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '180g', calories: 300 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında çipura', portion: '200g', calories: 280 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Kinoa', portion: '80g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut', portion: '1 orta', calories: 100 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 23,
      title: 'Gün 23 - ✨ ORUÇ GÜNÜ ✨',
      totalCalories: 500,
      note: 'YEDİNCİ ORUÇ! Son hafta oruçları.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Siyah kahve', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Yeşil salata', portion: '200g', calories: 50 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (Hafif)',
          totalCalories: 200,
          foods: [
            { name: 'Izgara hindi göğsü', portion: '120g', calories: 200 },
            { name: 'Buharda brokoli', portion: '100g', calories: 35 },
          ],
        },
        {
          type: 'snack',
          name: 'Sıvılar',
          totalCalories: 0,
          foods: [
            { name: 'Su', portion: '2+ litre', calories: 0 },
            { name: 'Yeşil çay', portion: '2-3 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 24,
      title: 'Gün 24 - Normal Gün 🍽️',
      totalCalories: 1800,
      note: 'Normal beslenme.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Menemen', portion: '2 yumurta', calories: 220 },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 350 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Yeşil biber', portion: '2 adet', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 25,
      title: 'Gün 25 - Normal Gün 🍽️',
      totalCalories: 1850,
      note: 'Son 5 gün!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yulaf + yoğurt', portion: '50g + 150g', calories: 270 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Izgara köfte', portion: '150g', calories: 300 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Yeşil salata', portion: '200g', calories: 50 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında levrek', portion: '200g', calories: 280 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Bulgur', portion: '70g', calories: 85 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Portakal', portion: '1 orta', calories: 60 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Fındık', portion: '20 adet', calories: 130 },
          ],
        },
      ],
    },
    {
      day: 26,
      title: 'Gün 26 - ✨ SON ORUÇ GÜNÜ ✨',
      totalCalories: 500,
      note: 'SEKİZİNCİ VE SON ORUÇ! Muhteşemsiniz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (Hafif)',
          totalCalories: 150,
          foods: [
            { name: 'Tavuk çorbası (yağsız)', portion: '250ml', calories: 100 },
            { name: 'Yeşil salata', portion: '200g', calories: 50 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (Hafif)',
          totalCalories: 200,
          foods: [
            { name: 'Izgara balık', portion: '120g', calories: 160 },
            { name: 'Buharda sebze', portion: '150g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Sıvılar',
          totalCalories: 0,
          foods: [
            { name: 'Su', portion: '2+ litre', calories: 0 },
            { name: 'Bitki çayı', portion: '2-3 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 27,
      title: 'Gün 27 - Normal Gün 🍽️',
      totalCalories: 1800,
      note: 'Son 3 gün!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara balık', portion: '180g', calories: 250 },
            { name: 'Bulgur', portion: '120g', calories: 150 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk göğsü (fırın)', portion: '180g', calories: 300 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Kinoa', portion: '70g', calories: 85 },
            { name: 'Yoğurt', portion: '50g', calories: 30 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 28,
      title: 'Gün 28 - Normal Gün ✨',
      totalCalories: 1850,
      note: 'Son 2 gün!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yulaf + yoğurt', portion: '50g + 150g', calories: 270 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 350 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Yeşil biber', portion: '2 adet', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut', portion: '1 orta', calories: 100 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Fındık', portion: '15 adet', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 29,
      title: 'Gün 29 - Normal Gün 🎉',
      totalCalories: 1800,
      note: 'Yarın son gün!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Menemen', portion: '2 yumurta', calories: 220 },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '180g', calories: 300 },
            { name: 'Kinoa salatası', portion: '150g', calories: 180 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında çipura', portion: '200g', calories: 280 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Bulgur', portion: '80g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 30,
      title: 'Gün 30 - ZAFER GÜNÜ! 🏆🎉',
      totalCalories: 1900,
      note: '30 GÜN TAMAMLANDI! 8 oruç, 3-5 kg yağ kaybı! MÜTHİŞ!',
      meals: [
        {
          type: 'breakfast',
          name: 'Zafer Kahvaltısı',
          totalCalories: 500,
          foods: [
            { name: 'Sebzeli omlet', portion: '3 yumurta', calories: 280 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara kuzu pirzola', portion: '150g', calories: 350 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'dinner',
          name: 'Kutlama Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında somon', portion: '200g', calories: 380 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa', portion: '50g', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Kutlama Ara Öğünleri',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 120, note: 'Kutlama!' },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 30 GÜNLÜK BEKLENEN SONUÇLAR

🔥 YAĞ KAYBI:
• 3-5 kg toplam yağ kaybı
• Bel çevresinde 4-7 cm azalma
• Vücut yağ oranında %2-4 düşüş

🧠 OTOFAJİ FAYDALARI:
• Hücresel yenilenme ve temizlik
• Beyin fonksiyonlarında iyileşme
• Enerji ve odaklanma artışı

🩺 METABOLİK İYİLEŞME:
• İnsülin duyarlılığında %30 artış
• Açlık kan şekeri dengelenmesi
• Kolesterol profilinde iyileşme

💪 FİZİKSEL DEĞİŞİM:
• Kas kütlesi korunmuş
• Daha tanımlı vücut
• Enerji seviyelerinde artış

⚠️ Bu yöntem sürdürülebilir bir yaşam tarzıdır, 30 gün sonra da devam edebilirsiniz.`,

    en: `📊 30-DAY EXPECTED RESULTS

🔥 FAT LOSS:
• 3-5 kg total fat loss
• 4-7 cm reduction in waist circumference
• 2-4% decrease in body fat percentage

🧠 AUTOPHAGY BENEFITS:
• Cellular renewal and cleansing
• Improved brain function
• Increased energy and focus

🩺 METABOLIC IMPROVEMENT:
• 30% increase in insulin sensitivity
• Fasting blood sugar balance
• Improved cholesterol profile

💪 PHYSICAL TRANSFORMATION:
• Muscle mass preserved
• More defined body
• Increased energy levels

⚠️ This method is a sustainable lifestyle, you can continue after 30 days.`,
  },
};
