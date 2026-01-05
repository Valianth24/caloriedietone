import { Diet } from '../types';

export const timeRestrictedEating30: Diet = {
  id: 'time-restricted-eating',
  name: {
    tr: 'Zaman Kısıtlı Beslenme (16:8)',
    en: 'Time Restricted Eating (16:8)',
  },
  emoji: '⏰',
  isPremium: true,
  duration: 30,
  difficulty: 'medium',

  description: {
    tr: 'Zaman Kısıtlı Beslenme (16:8), günün 8 saatlik bir penceresinde yemek yiyip kalan 16 saatte oruç tutmaya dayanan popüler bir beslenme yaklaşımıdır. Bu yöntem vücudun doğal sirkadiyen ritmiyle uyumlu çalışarak metabolizmayı optimize eder, yağ yakımını artırır ve hücresel yenilenmeyi (otofaji) tetikler.',
    en: 'Time Restricted Eating (16:8) is a popular eating approach that involves eating within an 8-hour window and fasting for the remaining 16 hours. This method works in harmony with the body\'s natural circadian rhythm to optimize metabolism, increase fat burning, and trigger cellular renewal (autophagy).',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 16:8 Oruç Araştırmaları (2024):
• Vücut yağ oranını %3-8 azaltır (8-12 hafta)
• İnsülin duyarlılığını %20-30 artırır
• Otofaji sürecini 14-16 saat sonra başlatır
• Büyüme hormonu seviyesini %500'e kadar artırır (oruç sırasında)

🧬 Sirkadiyen Ritim ve Metabolizma:
• Sabah metabolizması %25 daha hızlı çalışır
• Akşam geç saatte yemek insülin direncini artırır
• Melatonin ve insülin çakışması yağ depolamayı artırır
• Gece orucu karaciğer glikojen depolarını boşaltır

⚡ Hücresel Faydalar:
• Otofaji: Hasarlı hücrelerin temizlenmesi
• Mitokondri biyogenezi (enerji üretimi artışı)
• BDNF artışı (beyin sağlığı için)
• İnflamasyon belirteçlerinde %30 azalma

📈 New England Journal of Medicine Bulguları:
• Kardiyovasküler risk faktörlerinde iyileşme
• Kan basıncında 5-10 mmHg düşüş
• Trigliserit seviyelerinde %20-30 azalma
• Bilişsel fonksiyonlarda iyileşme

🎯 Optimal Yeme Penceresi:
• En etkili: 10:00 - 18:00 (güneş ışığıyla uyumlu)
• Alternatif: 12:00 - 20:00 (sosyal yaşama uygun)
• Kaçınılmalı: Gece geç saatlerde yemek

⚠️ Önemli Notlar:
• İlk 1-2 hafta adaptasyon süreci
• Kafein açlık hissini azaltabilir
• Bol su tüketimi kritik öneme sahip`,
    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 16:8 Fasting Studies (2024):
• Reduces body fat percentage by 3-8% (8-12 weeks)
• Increases insulin sensitivity by 20-30%
• Initiates autophagy process after 14-16 hours
• Increases growth hormone levels up to 500% (during fasting)

🧬 Circadian Rhythm and Metabolism:
• Morning metabolism works 25% faster
• Late evening eating increases insulin resistance
• Melatonin and insulin overlap increases fat storage
• Overnight fasting depletes liver glycogen stores

⚡ Cellular Benefits:
• Autophagy: Clearing damaged cells
• Mitochondrial biogenesis (increased energy production)
• Increased BDNF (for brain health)
• 30% reduction in inflammation markers

📈 New England Journal of Medicine Findings:
• Improvement in cardiovascular risk factors
• 5-10 mmHg drop in blood pressure
• 20-30% reduction in triglyceride levels
• Improvement in cognitive functions

🎯 Optimal Eating Window:
• Most effective: 10:00 AM - 6:00 PM (aligned with daylight)
• Alternative: 12:00 PM - 8:00 PM (socially convenient)
• Avoid: Late night eating

⚠️ Important Notes:
• First 1-2 weeks adaptation period
• Caffeine can reduce hunger sensation
• Adequate water intake is critical`,
  },

  benefits: {
    tr: [
      '🔥 Yağ yakımını ve kilo kaybını hızlandırır',
      '⚡ İnsülin duyarlılığını artırır',
      '🧬 Otofaji ile hücresel yenilenme sağlar',
      '🧠 Zihinsel netlik ve odaklanmayı artırır',
      '💪 Büyüme hormonu salgısını yükseltir',
      '🫀 Kalp sağlığı göstergelerini iyileştirir',
      '🕐 Sirkadiyen ritmi düzenler',
      '💰 Yemek hazırlama süresinden tasarruf',
      '🍽️ Kalori saymayı gerektirmez',
      '🔄 Metabolik esnekliği artırır',
    ],
    en: [
      '🔥 Accelerates fat burning and weight loss',
      '⚡ Improves insulin sensitivity',
      '🧬 Provides cellular renewal through autophagy',
      '🧠 Increases mental clarity and focus',
      '💪 Boosts growth hormone secretion',
      '🫀 Improves heart health markers',
      '🕐 Regulates circadian rhythm',
      '💰 Saves meal preparation time',
      '🍽️ No calorie counting required',
      '🔄 Increases metabolic flexibility',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Diyabet hastaları doktor kontrolünde uygulamalı',
      '⚠️ Hamile ve emziren kadınlar için uygun değil',
      '⚠️ Yeme bozukluğu geçmişi olanlar dikkatli olmalı',
      '⚠️ Düşük tansiyon sorunu olanlar dikkatli başlamalı',
      '⚠️ İlk hafta baş ağrısı ve yorgunluk normal',
      '⚠️ 18 yaş altı için önerilmez',
      '⚠️ Yoğun fiziksel iş yapanlar öğün zamanlamasına dikkat etmeli',
      '⚠️ İlaç kullananlar doktora danışmalı',
    ],
    en: [
      '⚠️ Diabetics should apply under doctor supervision',
      '⚠️ Not suitable for pregnant and nursing women',
      '⚠️ Those with eating disorder history should be careful',
      '⚠️ People with low blood pressure should start carefully',
      '⚠️ Headaches and fatigue are normal in the first week',
      '⚠️ Not recommended for those under 18',
      '⚠️ Those with intense physical jobs should watch meal timing',
      '⚠️ Those on medication should consult a doctor',
    ],
  },

  allowedFoods: {
    tr: [
      '🥗 Oruç Döneminde (16 saat):',
      '• Su (sınırsız, en az 2L)',
      '• Sade siyah kahve (şekersiz)',
      '• Yeşil çay, bitki çayları',
      '• Elma sirkesi (1 yemek kaşığı + su)',
      '',
      '🍽️ Yeme Penceresi (8 saat):',
      '• Kaliteli protein: Tavuk, balık, yumurta, baklagil',
      '• Sağlıklı yağlar: Zeytinyağı, avokado, kuruyemiş',
      '• Kompleks karbonhidrat: Yulaf, kinoa, tatlı patates',
      '• Bol sebze: Yeşil yapraklılar, brokoli, kabak',
      '• Meyveler: Yaban mersini, elma, portakal',
      '• Lif kaynakları: Chia, keten tohumu',
    ],
    en: [
      '🥗 During Fasting Period (16 hours):',
      '• Water (unlimited, at least 2L)',
      '• Plain black coffee (no sugar)',
      '• Green tea, herbal teas',
      '• Apple cider vinegar (1 tbsp + water)',
      '',
      '🍽️ Eating Window (8 hours):',
      '• Quality protein: Chicken, fish, eggs, legumes',
      '• Healthy fats: Olive oil, avocado, nuts',
      '• Complex carbs: Oats, quinoa, sweet potato',
      '• Plenty of vegetables: Leafy greens, broccoli, zucchini',
      '• Fruits: Blueberries, apples, oranges',
      '• Fiber sources: Chia, flax seeds',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🚫 Oruç Döneminde Kesinlikle Yasak:',
      '• Kalori içeren tüm yiyecekler',
      '• Şekerli içecekler (meyve suyu dahil)',
      '• Sütlü kahve veya çay',
      '• Sakız (şekerli veya şekersiz)',
      '• Diyet içecekler (yapay tatlandırıcılı)',
      '',
      '🚫 Yeme Penceresinde Sınırlandırılacak:',
      '• İşlenmiş gıdalar ve fast food',
      '• Rafine şeker ve unlu mamuller',
      '• Trans yağlar ve kızartmalar',
      '• Gazlı içecekler',
      '• Aşırı tuz içeren yiyecekler',
    ],
    en: [
      '🚫 Strictly Forbidden During Fasting:',
      '• All calorie-containing foods',
      '• Sugary drinks (including fruit juice)',
      '• Coffee or tea with milk',
      '• Gum (with or without sugar)',
      '• Diet drinks (with artificial sweeteners)',
      '',
      '🚫 Limited During Eating Window:',
      '• Processed foods and fast food',
      '• Refined sugar and pastries',
      '• Trans fats and fried foods',
      '• Carbonated drinks',
      '• High-salt foods',
    ],
  },

  exercises: [
    {
      name: 'Oruç Döneminde Hafif Kardiyo',
      duration: '20-30 dakika',
      frequency: 'Her gün (sabah)',
      note: 'Yürüyüş veya hafif tempolu koşu - yağ yakımını maksimize eder',
    },
    {
      name: 'Ağırlık Antrenmanı',
      duration: '45-60 dakika',
      frequency: 'Haftada 3-4 kez',
      note: 'Yeme penceresi içinde, öğünden 1-2 saat sonra',
    },
    {
      name: 'HIIT (Yüksek Yoğunluklu)',
      duration: '15-20 dakika',
      frequency: 'Haftada 2 kez',
      note: 'Yeme penceresinin başında, kahvaltıdan sonra',
    },
    {
      name: 'Yoga / Esneme',
      duration: '20-30 dakika',
      frequency: 'Her gün',
      note: 'Oruç döneminde veya akşam - stresi azaltır',
    },
    {
      name: 'Yüzme veya Bisiklet',
      duration: '30-45 dakika',
      frequency: 'Haftada 2-3 kez',
      note: 'Düşük etkili kardiyo alternatifleri',
    },
  ],

  expectedResults: {
    tr: `📊 ZAMAN KISITLI BESLENME BEKLENEN SONUÇLAR

📅 1. Hafta (Adaptasyon):
• İlk 2-3 gün açlık hissi yoğun olabilir
• Hafif baş ağrısı ve yorgunluk normal
• Su tüketimini artırın (2.5-3L)
• Kafein açlık döneminde yardımcı olabilir

📅 2. Hafta (Geçiş):
• Açlık hissi azalmaya başlar
• Enerji seviyesi dengelenir
• Sabah netliği hissedilir
• 1-2 kg kilo kaybı başlayabilir

📅 3. Hafta (Adaptasyon Tamamlanıyor):
• Oruç rahatlaşır
• Zihinsel netlik belirginleşir
• Yeme penceresi doğal gelir
• 2-3 kg toplam kilo kaybı

📅 4. Hafta (Sonuçlar):
• Vücut ölçülerinde azalma
• Karın bölgesi yağlanmasında azalma
• Enerji ve odaklanma artışı
• 3-4 kg sağlıklı kilo kaybı
• İnsülin duyarlılığında iyileşme

🎯 Uzun Vadeli (2-3 ay):
• Toplam %5-10 vücut ağırlığı kaybı
• Metabolik esneklik artışı
• Yeme alışkanlıklarında kalıcı değişim
• Kan değerlerinde iyileşme
• Sürdürülebilir yaşam tarzı`,
    en: `📊 TIME RESTRICTED EATING EXPECTED RESULTS

📅 Week 1 (Adaptation):
• First 2-3 days hunger may be intense
• Mild headaches and fatigue are normal
• Increase water intake (2.5-3L)
• Caffeine can help during fasting

📅 Week 2 (Transition):
• Hunger sensation begins to decrease
• Energy levels stabilize
• Morning clarity is felt
• 1-2 kg weight loss may begin

📅 Week 3 (Adaptation Completing):
• Fasting becomes easier
• Mental clarity becomes evident
• Eating window feels natural
• 2-3 kg total weight loss

📅 Week 4 (Results):
• Decrease in body measurements
• Reduction in abdominal fat
• Increased energy and focus
• 3-4 kg healthy weight loss
• Improved insulin sensitivity

🎯 Long Term (2-3 months):
• Total 5-10% body weight loss
• Increased metabolic flexibility
• Permanent change in eating habits
• Improvement in blood values
• Sustainable lifestyle`,
  },

  days: [
    // GÜN 1
    {
      day: 1,
      title: 'Başlangıç - 16:8\'e Hoş Geldiniz',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00) - Oruç Bozma',
          foods: [
            { name: 'Yumurta omlet', portion: '3 yumurta', calories: 210 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Domates-salatalık', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 675,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:00)',
          foods: [
            { name: 'Yunan yoğurdu', portion: '200g', calories: 130 },
            { name: 'Yaban mersini', portion: '100g', calories: 57 },
            { name: 'Badem', portion: '15 adet', calories: 100 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
          totalCalories: 317,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30) - Pencere Kapanışı',
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 230 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Brokoli', portion: '150g', calories: 51 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
            { name: 'Limon-sarımsak sos', portion: '2 yemek kaşığı', calories: 30 },
          ],
          totalCalories: 551,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi İçecekleri',
          foods: [
            { name: 'Siyah kahve (sabah)', portion: '2 fincan', calories: 5 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 5 },
            { name: 'Su', portion: '2.5L+', calories: 0 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1553,
      note: '⏰ Yeme penceresi: 12:00-20:00 | Oruç: 20:00-12:00',
    },
    // GÜN 2
    {
      day: 2,
      title: 'Adaptasyon Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 230 },
            { name: 'Protein tozu', portion: '25g', calories: 100 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Yer fıstığı ezmesi', portion: '1 yemek kaşığı', calories: 95 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
          ],
          totalCalories: 560,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Ton balığı', portion: '100g', calories: 130 },
            { name: 'Karışık yeşil salata', portion: '200g', calories: 40 },
            { name: 'Zeytinyağı-limon sos', portion: '2 yemek kaşığı', calories: 150 },
            { name: 'Tam tahıl kraker', portion: '4 adet', calories: 80 },
          ],
          totalCalories: 400,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Somon', portion: '150g', calories: 300 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Kuşkonmaz', portion: '100g', calories: 20 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 570,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Siyah kahve', portion: '2 fincan', calories: 5 },
            { name: 'Su + Limon', portion: '3L', calories: 5 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1540,
      note: 'Açlık hissederseniz ılık su veya çay için.',
    },
    // GÜN 3
    {
      day: 3,
      title: 'Yağ Yakım Moduna Giriş',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Yumurtalı menemen', portion: '2 yumurta + sebze', calories: 250 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Beyaz peynir', portion: '50g', calories: 130 },
            { name: 'Zeytin', portion: '10 adet', calories: 50 },
          ],
          totalCalories: 590,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:00)',
          foods: [
            { name: 'Smoothie bowl', portion: '300ml', calories: 280 },
            { name: 'Granola', portion: '30g', calories: 135 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
          ],
          totalCalories: 545,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30)',
          foods: [
            { name: 'Köfte', portion: '150g', calories: 280 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 150 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Yeşil salata', portion: '150g', calories: 25 },
          ],
          totalCalories: 515,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Kahve + Yeşil çay', portion: '4 fincan', calories: 10 },
            { name: 'Su', portion: '2.5L', calories: 0 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1660,
      note: '72 saatte vücut yağ yakım moduna geçiyor.',
    },
    // GÜN 4
    {
      day: 4,
      title: 'Enerji Artışı Başlıyor',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Akdeniz kahvaltı tabağı', portion: '1 porsiyon', calories: 450 },
            { name: '(Yumurta, peynir, domates, zeytin, ekmek)', portion: '', calories: 0 },
          ],
          totalCalories: 450,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Tavuklu wrap', portion: '1 adet', calories: 380 },
            { name: 'Ayran', portion: '200ml', calories: 80 },
            { name: 'Havuç çubukları', portion: '100g', calories: 41 },
          ],
          totalCalories: 501,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Fırında levrek', portion: '200g', calories: 200 },
            { name: 'Kuskus salatası', portion: '150g', calories: 200 },
            { name: 'Izgara sebzeler', portion: '150g', calories: 75 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 595,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Siyah kahve + Su', portion: 'İstediğiniz kadar', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1556,
      note: 'Sabah enerjisi artmaya başlıyor.',
    },
    // GÜN 5
    {
      day: 5,
      title: 'Protein Odaklı Gün',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Protein smoothie', portion: '400ml', calories: 350 },
            { name: 'Yulaf ezmesi', portion: '40g', calories: 150 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
          ],
          totalCalories: 605,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:00)',
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 230 },
            { name: 'Kinoa salatası', portion: '150g', calories: 180 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
          ],
          totalCalories: 570,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30)',
          foods: [
            { name: 'Biftek', portion: '150g', calories: 350 },
            { name: 'Fırın patates', portion: '150g', calories: 130 },
            { name: 'Mantar sote', portion: '100g', calories: 50 },
            { name: 'Yeşil salata', portion: '100g', calories: 15 },
          ],
          totalCalories: 545,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Kahve + Çay + Su', portion: 'Sınırsız', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1730,
      note: 'Protein kas kaybını önler, tokluk sağlar.',
    },
    // GÜN 6
    {
      day: 6,
      title: 'Hafif Kardiyo Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00) - Egzersiz Sonrası',
          foods: [
            { name: 'Omlet (3 yumurta + sebze)', portion: '1 porsiyon', calories: 280 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Portakal suyu', portion: '200ml', calories: 90 },
          ],
          totalCalories: 690,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 200 },
            { name: 'Tam tahıl ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
          totalCalories: 370,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Izgara tavuk şiş', portion: '150g', calories: 200 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 150 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Közlenmiş sebze', portion: '150g', calories: 75 },
          ],
          totalCalories: 475,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi (Sabah Kardiyo)',
          foods: [
            { name: 'Sabah 30dk yürüyüş (aç)', portion: '—', calories: 0 },
            { name: 'Siyah kahve (egzersiz öncesi)', portion: '1 fincan', calories: 3 },
            { name: 'Su', portion: '3L', calories: 0 },
          ],
          totalCalories: 3,
        },
      ],
      totalCalories: 1538,
      note: 'Aç kardiyo yağ yakımını %20 artırır.',
    },
    // GÜN 7 - 1 HAFTA TAMAMLANDI
    {
      day: 7,
      title: '🎉 1 Hafta Tamamlandı!',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00) - Kutlama Brunch',
          foods: [
            { name: 'Eggs Benedict (poşe yumurta)', portion: '2 adet', calories: 280 },
            { name: 'Somon', portion: '50g', calories: 100 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Tam tahıl ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Taze meyve', portion: '100g', calories: 60 },
          ],
          totalCalories: 680,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (16:00)',
          foods: [
            { name: 'Yunan salatası', portion: '250g', calories: 300 },
            { name: 'Pide', portion: '1/2 adet', calories: 200 },
          ],
          totalCalories: 500,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30)',
          foods: [
            { name: 'Mantarlı risotto', portion: '250g', calories: 400 },
            { name: 'Yeşil salata', portion: '100g', calories: 15 },
            { name: 'Parmesan', portion: '20g', calories: 80 },
          ],
          totalCalories: 495,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Kahve + Çay + Su', portion: 'Sınırsız', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1685,
      note: '1 hafta tamamlandı! İlk sonuçları not edin.',
    },
    // GÜN 8-14 (2. Hafta)
    {
      day: 8,
      title: '2. Hafta - Yeni Normal',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Shakshuka', portion: '1 porsiyon', calories: 320 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Labneh', portion: '50g', calories: 80 },
          ],
          totalCalories: 560,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Tavuklu sezar salata', portion: '300g', calories: 450 },
            { name: 'Su', portion: '500ml', calories: 0 },
          ],
          totalCalories: 450,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Izgara köfte', portion: '150g', calories: 280 },
            { name: 'Pilav', portion: '100g', calories: 130 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Salata', portion: '150g', calories: 30 },
          ],
          totalCalories: 500,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Siyah kahve + Su', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1520,
    },
    {
      day: 9,
      title: 'Detoks Desteği',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Green smoothie', portion: '400ml', calories: 250 },
            { name: 'Avokado toast', portion: '2 dilim', calories: 400 },
          ],
          totalCalories: 650,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:00)',
          foods: [
            { name: 'Kinoa Buddha bowl', portion: '350g', calories: 480 },
          ],
          totalCalories: 480,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 150 },
            { name: 'Izgara balık', portion: '150g', calories: 200 },
            { name: 'Yeşil salata', portion: '150g', calories: 30 },
          ],
          totalCalories: 380,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Detoks suyu (limon+nane+salatalık)', portion: '2L', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1520,
    },
    {
      day: 10,
      title: 'Kas Koruma Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Protein pancake', portion: '3 adet', calories: 350 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 98 },
          ],
          totalCalories: 553,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Ton balıklı salata', portion: '300g', calories: 400 },
            { name: 'Yulaf ezmeli ekmek', portion: '2 dilim', calories: 160 },
          ],
          totalCalories: 560,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30)',
          foods: [
            { name: 'Tavuk but', portion: '200g', calories: 350 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Brokoli', portion: '150g', calories: 51 },
          ],
          totalCalories: 531,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'BCAA (isteğe bağlı)', portion: '5g', calories: 0 },
            { name: 'Kahve + Su', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1654,
      note: 'Antrenman günü - protein alımına dikkat edin.',
    },
    {
      day: 11,
      title: 'Dinlenme Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Peynirli omlet', portion: '3 yumurta', calories: 300 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
          ],
          totalCalories: 478,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:00)',
          foods: [
            { name: 'Humus', portion: '4 yemek kaşığı', calories: 140 },
            { name: 'Sebze çubukları', portion: '150g', calories: 50 },
            { name: 'Pita ekmeği', portion: '1 adet', calories: 165 },
          ],
          totalCalories: 355,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Karnıyarık', portion: '1 porsiyon', calories: 400 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Pilav', portion: '100g', calories: 130 },
          ],
          totalCalories: 590,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Bitki çayı + Su', portion: '—', calories: 5 },
          ],
          totalCalories: 5,
        },
      ],
      totalCalories: 1428,
      note: 'Hafif kalori açığı ile yağ yakımı devam eder.',
    },
    {
      day: 12,
      title: 'Omega-3 Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Somon füme', portion: '100g', calories: 180 },
            { name: 'Krema peynir', portion: '30g', calories: 100 },
            { name: 'Tam tahıl bagel', portion: '1 adet', calories: 250 },
            { name: 'Kapari', portion: '1 yemek kaşığı', calories: 5 },
          ],
          totalCalories: 535,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Cevizli salata', portion: '250g', calories: 350 },
            { name: 'Tam tahıl ekmek', portion: '1 dilim', calories: 80 },
          ],
          totalCalories: 430,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Fırında uskumru', portion: '200g', calories: 350 },
            { name: 'Sebzeli bulgur', portion: '150g', calories: 200 },
            { name: 'Yeşil salata', portion: '100g', calories: 15 },
          ],
          totalCalories: 565,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Omega-3 takviyesi (isteğe bağlı)', portion: '1 kapsül', calories: 10 },
            { name: 'Su + Yeşil çay', portion: '—', calories: 5 },
          ],
          totalCalories: 15,
        },
      ],
      totalCalories: 1545,
      note: 'Omega-3 beyin sağlığını ve yağ yakımını destekler.',
    },
    {
      day: 13,
      title: 'Lif Yükleme',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 230 },
            { name: 'Chia tohumu', portion: '2 yemek kaşığı', calories: 120 },
            { name: 'Yaban mersini', portion: '100g', calories: 57 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
          ],
          totalCalories: 437,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:00)',
          foods: [
            { name: 'Mercimek köftesi', portion: '150g', calories: 210 },
            { name: 'Marul sarması', portion: '100g', calories: 20 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
          totalCalories: 290,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30)',
          foods: [
            { name: 'Sebzeli nohut yemeği', portion: '250g', calories: 350 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 150 },
            { name: 'Turşu', portion: '50g', calories: 15 },
          ],
          totalCalories: 515,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Kahve', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1252,
      note: 'Yüksek lif tokluk sağlar, bağırsak sağlığını destekler.',
    },
    {
      day: 14,
      title: '🎉 2 Hafta Tamamlandı!',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00) - Ödül Brunch',
          foods: [
            { name: 'Waffle', portion: '2 adet', calories: 400 },
            { name: 'Mevsim meyveleri', portion: '150g', calories: 90 },
            { name: 'Akçaağaç şurubu', portion: '2 yemek kaşığı', calories: 100 },
            { name: 'Yumurta', portion: '2 adet', calories: 140 },
          ],
          totalCalories: 730,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (16:00)',
          foods: [
            { name: 'Hamburger (ev yapımı)', portion: '1 adet', calories: 500 },
            { name: 'Taze salata', portion: '100g', calories: 30 },
          ],
          totalCalories: 530,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30)',
          foods: [
            { name: 'Pizza (ince hamurlu)', portion: '2 dilim', calories: 400 },
            { name: 'Salata', portion: '150g', calories: 50 },
          ],
          totalCalories: 450,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Kahve', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1720,
      note: '2 hafta bitti! Tartılın ve ölçülerinizi alın.',
    },
    // GÜN 15-21 (3. Hafta - Özet)
    {
      day: 15,
      title: '3. Hafta Başlıyor',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Kahvaltı bowl', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Tavuklu wrap', portion: '1 adet', calories: 450 },
          ],
          totalCalories: 450,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Izgara et + sebze', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Kahve + Çay', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1510,
    },
    {
      day: 16,
      title: 'Balık Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Smoothie + Yulaf', portion: '1 porsiyon', calories: 480 },
          ],
          totalCalories: 480,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Somon salatası', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Deniz ürünleri tabağı', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Yeşil çay', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1540,
    },
    {
      day: 17,
      title: 'Vejetaryen Gün',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Sebzeli omlet + ekmek', portion: '1 porsiyon', calories: 450 },
          ],
          totalCalories: 450,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Falafel tabağı', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Mercimek yemeği + bulgur', portion: '1 porsiyon', calories: 480 },
          ],
          totalCalories: 480,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Bitki çayı', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1490,
    },
    {
      day: 18,
      title: 'Antrenman Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00) - Antrenman sonrası',
          foods: [
            { name: 'Protein yüklü kahvaltı', portion: '1 porsiyon', calories: 650 },
          ],
          totalCalories: 650,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Tavuk + Kinoa bowl', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30)',
          foods: [
            { name: 'Biftek + patates + sebze', portion: '1 porsiyon', calories: 600 },
          ],
          totalCalories: 600,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi (Sabah antrenman)',
          foods: [
            { name: 'Kahve (pre-workout) + Su', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1810,
      note: 'Antrenman günleri kaloriyi %10-15 artırın.',
    },
    {
      day: 19,
      title: 'Hafif Gün',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Avokado toast + yumurta', portion: '1 porsiyon', calories: 480 },
          ],
          totalCalories: 480,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Çorba + salata', portion: '1 porsiyon', calories: 350 },
          ],
          totalCalories: 350,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Izgara balık + sebze', portion: '1 porsiyon', calories: 400 },
          ],
          totalCalories: 400,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Detoks suyu', portion: '3L', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1240,
      note: 'Haftada 1-2 gün hafif yemek metabolizmayı canlandırır.',
    },
    {
      day: 20,
      title: 'Enerji Geri Yükleme',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Power breakfast', portion: '1 porsiyon', calories: 600 },
          ],
          totalCalories: 600,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Protein bowl', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30)',
          foods: [
            { name: 'Ev yemeği tabağı', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Kahve + Su', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1660,
    },
    {
      day: 21,
      title: '🎉 3 Hafta Tamamlandı!',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Şef\'in özel kahvaltısı', portion: '1 porsiyon', calories: 650 },
          ],
          totalCalories: 650,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (16:00)',
          foods: [
            { name: 'Gourmet salata', portion: '1 porsiyon', calories: 450 },
          ],
          totalCalories: 450,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30)',
          foods: [
            { name: 'Özel akşam yemeği', portion: '1 porsiyon', calories: 600 },
          ],
          totalCalories: 600,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Çay', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1710,
      note: '3 hafta bitti! Enerji seviyenizi ve uyku kalitenizi değerlendirin.',
    },
    // GÜN 22-30 (Son Hafta - Özet)
    {
      day: 22,
      title: 'Son Hafta Başlıyor',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Standart kahvaltı', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Öğle yemeği', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Akşam yemeği', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Kahve', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1560,
    },
    {
      day: 23,
      title: 'Rutin Devam',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Favori kahvaltınız', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Sağlıklı öğle yemeği', portion: '1 porsiyon', calories: 480 },
          ],
          totalCalories: 480,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Dengeli akşam yemeği', portion: '1 porsiyon', calories: 520 },
          ],
          totalCalories: 520,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Çay', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1560,
    },
    {
      day: 24,
      title: 'Kardiyo + Oruç',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00) - Post Workout',
          foods: [
            { name: 'Yüksek protein kahvaltı', portion: '1 porsiyon', calories: 600 },
          ],
          totalCalories: 600,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Dengeli öğle', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Hafif akşam yemeği', portion: '1 porsiyon', calories: 450 },
          ],
          totalCalories: 450,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi (Sabah kardiyo)',
          foods: [
            { name: '30dk yürüyüş + Kahve + Su', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1560,
    },
    {
      day: 25,
      title: 'Akdeniz Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Akdeniz kahvaltısı', portion: '1 porsiyon', calories: 520 },
          ],
          totalCalories: 520,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Yunan salatası + pita', portion: '1 porsiyon', calories: 480 },
          ],
          totalCalories: 480,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Izgara balık + sebze', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Nane çayı', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1510,
    },
    {
      day: 26,
      title: 'Asya Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Japon tarzı kahvaltı', portion: '1 porsiyon', calories: 450 },
          ],
          totalCalories: 450,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Teriyaki bowl', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Stir-fry + pirinç', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Yeşil çay', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1510,
    },
    {
      day: 27,
      title: 'Türk Mutfağı',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Serpme kahvaltı', portion: '1 porsiyon', calories: 600 },
          ],
          totalCalories: 600,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Çorba + pide', portion: '1 porsiyon', calories: 450 },
          ],
          totalCalories: 450,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Kebap tabağı', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Türk kahvesi (öğleden sonra)', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1610,
    },
    {
      day: 28,
      title: 'Hafta Sonu Keyfi',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Brunch tabağı', portion: '1 porsiyon', calories: 650 },
          ],
          totalCalories: 650,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (16:00)',
          foods: [
            { name: 'Hafif atıştırmalık', portion: '1 porsiyon', calories: 300 },
          ],
          totalCalories: 300,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30)',
          foods: [
            { name: 'Özel akşam yemeği', portion: '1 porsiyon', calories: 600 },
          ],
          totalCalories: 600,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Kahve', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1560,
    },
    {
      day: 29,
      title: 'Son Gün Öncesi',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00)',
          foods: [
            { name: 'Favori kahvaltınız', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (15:30)',
          foods: [
            { name: 'Sağlıklı öğle', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:00)',
          foods: [
            { name: 'Dengeli akşam yemeği', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Su + Çay', portion: '—', calories: 10 },
          ],
          totalCalories: 10,
        },
      ],
      totalCalories: 1560,
    },
    {
      day: 30,
      title: '🎉 30 GÜN TAMAMLANDI!',
      meals: [
        {
          type: 'breakfast',
          name: 'İLK ÖĞÜN (12:00) - Kutlama!',
          foods: [
            { name: 'Şampanya brunch', portion: '1 porsiyon', calories: 700 },
          ],
          totalCalories: 700,
        },
        {
          type: 'lunch',
          name: 'ARA ÖĞÜN (16:00)',
          foods: [
            { name: 'Favori atıştırmalığınız', portion: '1 porsiyon', calories: 350 },
          ],
          totalCalories: 350,
        },
        {
          type: 'dinner',
          name: 'SON ÖĞÜN (19:30) - Kutlama Yemeği',
          foods: [
            { name: 'Özel kutlama menüsü', portion: '1 porsiyon', calories: 700 },
          ],
          totalCalories: 700,
        },
        {
          type: 'snack',
          name: 'Oruç Dönemi',
          foods: [
            { name: 'Bugün serbest!', portion: '—', calories: 0 },
          ],
          totalCalories: 0,
        },
      ],
      totalCalories: 1750,
      note: '🎉 TEBRİKLER! 30 gün tamamlandı. Tartılın, ölçülerinizi alın ve sağlık kontrolü yaptırın!',
    },
  ],
};
