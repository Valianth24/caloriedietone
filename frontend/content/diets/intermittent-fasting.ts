import { Diet } from './types';

export const intermittentFasting: Diet = {
  id: 'intermittent-fasting',
  name: {
    tr: 'Aralıklı Oruç (16:8)',
    en: 'Intermittent Fasting (16:8)',
  },
  emoji: '⏰',
  isPremium: true,
  duration: 21,
  difficulty: 'medium',

  description: {
    tr: 'Aralıklı oruç 16:8 metodu, günde 16 saat oruç tutup 8 saatlik bir pencerede yemek yemeyi içerir. Bu yöntem, metabolizmayı hızlandırır, otofajiyi (hücresel temizlenme) tetikler ve yağ yakımını optimize eder. Ne yediğinizden çok, ne zaman yediğinize odaklanan bu yaklaşım, modern yaşam tarzına kolayca uyum sağlar.',
    en: 'The 16:8 intermittent fasting method involves fasting for 16 hours and eating within an 8-hour window. This method speeds up metabolism, triggers autophagy (cellular cleansing), and optimizes fat burning. Focusing on when you eat rather than what you eat, this approach easily adapts to modern lifestyles.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Meta-Analiz Sonuçları (2024):
• Yüksek kesinlikli kanıtlarla aralıklı oruç şunları azaltır:
  - Bel çevresi ve yağ kütlesi
  - LDL kolesterol, trigliserit, toplam kolesterol
  - Açlık insülini ve sistolik kan basıncı
• HDL (iyi) kolesterol ve yağsız kas kütlesini artırır

🔄 Otofaji Mekanizması:
• 12-16 saat açlık sonrası otofaji aktive olur
• Hasarlı hücre parçaları temizlenir
• Mitokondri fonksiyonu iyileşir
• Antioksidan kapasite artar
• 2016 Nobel Tıp Ödülü - Yoshinori Ohsumi'nin otofaji keşfi

⚡ Metabolik Adaptasyonlar:
• İnsülin seviyeleri düşer → yağ depolarına erişim kolaylaşır
• Büyüme hormonu (HGH) 5 kata kadar artabilir
• Norepinefrin salgılanması artar → metabolizma hızlanır
• Doğal kalori kısıtlaması: Günde 200-550 kcal azalma

🧠 Beyin Sağlığı:
• BDNF (Beyin Kaynaklı Nörotrofik Faktör) artışı
• Nöroprotektif etkiler
• Zihinsel netlik ve odaklanma iyileşmesi

⚠️ 2024 Araştırma Uyarısı:
• 20.000+ yetişkin üzerinde yapılan çalışmada, 8 saatlik yeme penceresi
• Kardiyovasküler ölüm riskinde %91 artışla ilişkilendirildi
• Bu nedenle kalp hastalarının dikkatli olması önerilir
• Uzmanlar, aşırı kısıtlayıcı olmamayı tavsiye ediyor`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 Meta-Analysis Results (2024):
• With high-certainty evidence, intermittent fasting reduces:
  - Waist circumference and fat mass
  - LDL cholesterol, triglycerides, total cholesterol
  - Fasting insulin and systolic blood pressure
• Increases HDL (good) cholesterol and lean muscle mass

🔄 Autophagy Mechanism:
• Autophagy activates after 12-16 hours of fasting
• Damaged cell components are cleared
• Mitochondrial function improves
• Antioxidant capacity increases
• 2016 Nobel Prize in Medicine - Yoshinori Ohsumi's autophagy discovery

⚡ Metabolic Adaptations:
• Insulin levels drop → easier access to fat stores
• Growth hormone (HGH) can increase up to 5 times
• Norepinephrine release increases → metabolism speeds up
• Natural calorie restriction: 200-550 kcal reduction per day

🧠 Brain Health:
• Increase in BDNF (Brain-Derived Neurotrophic Factor)
• Neuroprotective effects
• Improved mental clarity and focus

⚠️ 2024 Research Warning:
• In a study of 20,000+ adults, 8-hour eating window
• Was associated with 91% increase in cardiovascular death risk
• Therefore, heart patients are advised to be careful
• Experts recommend not being overly restrictive`,
  },

  benefits: {
    tr: [
      '🔥 Yağ yakımını optimize eder - 12+ saat açlık yağ depolarına erişimi kolaylaştırır',
      '🔄 Otofajiyi tetikler - hücresel temizlenme ve yenilenme',
      '📉 İnsülin duyarlılığını artırır - diyabet riski azalır',
      '🧠 Zihinsel netlik ve odaklanma - ketonlar beyin yakıtı olur',
      '⚡ Enerji seviyelerinde stabilite - kan şekeri dalgalanmaları azalır',
      '🍽️ Basit ve uygulaması kolay - kalori saymak gerekmez',
      '💪 Kas kütlesini korur - HGH artışı sayesinde',
      '❤️ Kardiyovasküler sağlık iyileşmesi - lipid profili düzelir',
      '😴 Uyku kalitesinde artış - sirkadiyen ritim düzenlenir',
      '💰 Zaman ve para tasarrufu - daha az öğün hazırlama',
    ],
    en: [
      '🔥 Optimizes fat burning - 12+ hours fasting facilitates access to fat stores',
      '🔄 Triggers autophagy - cellular cleansing and renewal',
      '📉 Improves insulin sensitivity - diabetes risk decreases',
      '🧠 Mental clarity and focus - ketones become brain fuel',
      '⚡ Stability in energy levels - reduced blood sugar fluctuations',
      '🍽️ Simple and easy to apply - no calorie counting needed',
      '💪 Preserves muscle mass - thanks to HGH increase',
      '❤️ Cardiovascular health improvement - lipid profile improves',
      '😴 Increased sleep quality - circadian rhythm regulates',
      '💰 Time and money savings - less meal preparation',
    ],
  },

  warnings: {
    tr: [
      '🚫 Hamileler ve emziren anneler için uygun değildir',
      '🚫 18 yaş altı için önerilmez',
      '⚠️ Diyabet hastaları doktor kontrolünde yapmalıdır',
      '⚠️ Yeme bozukluğu geçmişi olanlar dikkatli olmalıdır',
      '💊 İlaç kullananlar doktorlarına danışmalıdır',
      '🏃 Yoğun egzersiz yapanlar protein alımına dikkat etmeli',
      '💧 Oruç saatlerinde bol su içmek şarttır',
      '❤️ Kalp hastaları özellikle dikkatli olmalı - 2024 araştırması',
      '🌙 Başlangıçta baş ağrısı ve halsizlik normal olabilir',
    ],
    en: [
      '🚫 Not suitable for pregnant or breastfeeding women',
      '🚫 Not recommended for under 18 years old',
      '⚠️ Diabetics should do it under doctor supervision',
      '⚠️ Those with eating disorder history should be careful',
      '💊 Those on medication should consult their doctors',
      '🏃 Those doing intense exercise should watch protein intake',
      '💧 Drinking plenty of water during fasting hours is essential',
      '❤️ Heart patients should be especially careful - 2024 research',
      '🌙 Headache and fatigue may be normal initially',
    ],
  },

  allowedFoods: {
    tr: [
      '💧 ORUÇ SAATLERİNDE (16 saat):',
      '💧 Su (sınırsız)',
      '☕ Sade kahve (şekersiz, sütsüz)',
      '🍵 Bitki çayları (şekersiz)',
      '🫖 Yeşil çay',
      '🧂 Elma sirkesi suyu (1 yemek kaşığı + su)',
      '',
      '🍽️ YEME PENCERESİNDE (8 saat):',
      '🥩 Kaliteli protein kaynakları (et, balık, yumurta)',
      '🥬 Bol sebze ve yeşillikler',
      '🍎 Meyveler (ölçülü)',
      '🌾 Tam tahıllar',
      '🫘 Baklagiller',
      '🥜 Kuruyemişler ve tohumlar',
      '🧀 Süt ürünleri',
      '🫒 Sağlıklı yağlar',
    ],
    en: [
      '💧 DURING FASTING HOURS (16 hours):',
      '💧 Water (unlimited)',
      '☕ Black coffee (no sugar, no milk)',
      '🍵 Herbal teas (unsweetened)',
      '🫖 Green tea',
      '🧂 Apple cider vinegar water (1 tbsp + water)',
      '',
      '🍽️ DURING EATING WINDOW (8 hours):',
      '🥩 Quality protein sources (meat, fish, eggs)',
      '🥬 Plenty of vegetables and greens',
      '🍎 Fruits (in moderation)',
      '🌾 Whole grains',
      '🫘 Legumes',
      '🥜 Nuts and seeds',
      '🧀 Dairy products',
      '🫒 Healthy fats',
    ],
  },

  forbiddenFoods: {
    tr: [
      '❌ ORUÇ SAATLERİNDE YASAK (Orucu bozar):',
      '🍬 Her türlü kalorili yiyecek ve içecek',
      '🥛 Süt, krema',
      '🍯 Bal, şeker',
      '🥤 Meyve suları',
      '🍭 Şekersiz bile tatlandırıcılar (tartışmalı)',
      '',
      '⚠️ YEME PENCERESİNDE SINIRLANDIR:',
      '🍟 Kızartmalar ve fast food',
      '🍬 Rafine şeker ve tatlılar',
      '🥤 Şekerli içecekler',
      '🍞 Beyaz un ürünleri',
      '🥫 Ultra işlenmiş gıdalar',
    ],
    en: [
      '❌ FORBIDDEN DURING FASTING (Breaks the fast):',
      '🍬 All caloric foods and drinks',
      '🥛 Milk, cream',
      '🍯 Honey, sugar',
      '🥤 Fruit juices',
      '🍭 Even sugar-free sweeteners (controversial)',
      '',
      '⚠️ LIMIT DURING EATING WINDOW:',
      '🍟 Fried foods and fast food',
      '🍬 Refined sugar and sweets',
      '🥤 Sugary drinks',
      '🍞 White flour products',
      '🥫 Ultra-processed foods',
    ],
  },

  exercises: [
    {
      name: 'Hafif Kardiyo / Light Cardio',
      duration: '20-30 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Oruç saatlerinde hafif yürüyüş yapılabilir. Ağır kardiyo yeme penceresine bırakın.',
    },
    {
      name: 'Ağırlık Antrenmanı / Weight Training',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 3-4 kez / 3-4 times a week',
      note: 'İdeali yeme penceresinin ortasında yapmak. Sonrasında protein alımını unutmayın.',
    },
    {
      name: 'HIIT',
      duration: '15-20 dakika / minutes',
      frequency: 'Haftada 2 kez / 2 times a week',
      note: 'Sadece yeme penceresinde yapın. En az 1 saat önce hafif bir şeyler yiyin.',
    },
    {
      name: 'Yoga / Stretching',
      duration: '15-20 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Oruç saatlerinde yapılabilir. Stres yönetimi ve esneklik için ideal.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Başlangıç',
      totalCalories: 1600,
      note: 'Yeme penceresi: 12:00 - 20:00. İlk gün! 16 saat oruç zorlayıcı gelebilir. Bol su için.',
      meals: [
        {
          type: 'lunch',
          name: 'İlk Öğün (12:00)',
          totalCalories: 600,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Kinoa', portion: '100g (pişmiş)', calories: 120 },
            { name: 'Karışık salata', portion: '200g', calories: 80, note: 'Zeytinyağı ile' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Avokado', portion: '1/4 adet', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün (15:30)',
          totalCalories: 300,
          foods: [
            { name: 'Yunan yoğurdu', portion: '150g', calories: 130 },
            { name: 'Karışık kuruyemiş', portion: '25g', calories: 150 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'dinner',
          name: 'Son Öğün (19:30)',
          totalCalories: 700,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 370 },
            { name: 'Buharda brokoli', portion: '150g', calories: 55 },
            { name: 'Tatlı patates', portion: '150g', calories: 135 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limonlu su', portion: '300ml', calories: 5 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Adaptasyon',
      totalCalories: 1650,
      note: 'Yeme penceresi: 12:00 - 20:00. Açlık dalgaları normal. Su, çay ve kahve yardımcı olur.',
      meals: [
        {
          type: 'lunch',
          name: 'İlk Öğün (12:00)',
          totalCalories: 650,
          foods: [
            { name: 'Yumurtalı sebze kavurma', portion: '250g', calories: 350, note: '3 yumurta, mantar, biber' },
            { name: 'Tam buğday ekmeği', portion: '2 dilim', calories: 140 },
            { name: 'Beyaz peynir', portion: '50g', calories: 130 },
            { name: 'Domates', portion: '1 adet', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün (16:00)',
          totalCalories: 250,
          foods: [
            { name: 'Elma', portion: '1 orta boy', calories: 80 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 100 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
            { name: 'Bitter çikolata', portion: '10g', calories: 55, note: '%70+ kakao' },
          ],
        },
        {
          type: 'dinner',
          name: 'Son Öğün (19:00)',
          totalCalories: 750,
          foods: [
            { name: 'Dana biftek', portion: '180g', calories: 400 },
            { name: 'Fırın patates', portion: '150g', calories: 170 },
            { name: 'Ispanak salatası', portion: '100g', calories: 80, note: 'Limon ve zeytinyağı' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Ritim Oturuyor',
      totalCalories: 1600,
      note: 'Yeme penceresi: 12:00 - 20:00. Vücudunuz alışmaya başlıyor. Enerji artışı hissedebilirsiniz.',
      meals: [
        {
          type: 'lunch',
          name: 'İlk Öğün (12:00)',
          totalCalories: 580,
          foods: [
            { name: 'Ton balıklı salata', portion: '250g', calories: 350, note: 'Yeşillik, domates, mısır' },
            { name: 'Zeytinyağı-limon sos', portion: '2 yemek kaşığı', calories: 130 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 70 },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün (15:00)',
          totalCalories: 320,
          foods: [
            { name: 'Smoothie', portion: '300ml', calories: 250, note: 'Muz, yoğurt, yulaf, bal' },
            { name: 'Ceviz', portion: '4 adet', calories: 70 },
          ],
        },
        {
          type: 'dinner',
          name: 'Son Öğün (19:30)',
          totalCalories: 700,
          foods: [
            { name: 'Fırında tavuk but', portion: '200g', calories: 400 },
            { name: 'Sebze güveç', portion: '200g', calories: 150, note: 'Kabak, patlıcan, domates' },
            { name: 'Bulgur pilavı', portion: '100g', calories: 120 },
            { name: 'Ayran', portion: '200ml', calories: 70 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Otofaji Günü',
      totalCalories: 1550,
      note: 'Yeme penceresi: 12:00 - 20:00. Hücresel temizlenme tam gaz! Hafif hissedebilirsiniz.',
      meals: [
        {
          type: 'lunch',
          name: 'İlk Öğün (12:00)',
          totalCalories: 600,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 200 },
            { name: 'Izgara köfte', portion: '120g', calories: 280 },
            { name: 'Çoban salatası', portion: '150g', calories: 80 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 70 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün (16:00)',
          totalCalories: 250,
          foods: [
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 40 },
          ],
        },
        {
          type: 'dinner',
          name: 'Son Öğün (19:00)',
          totalCalories: 700,
          foods: [
            { name: 'Karidesli makarna', portion: '250g', calories: 450, note: 'Tam buğday makarna' },
            { name: 'Parmesan', portion: '20g', calories: 80 },
            { name: 'Roka salatası', portion: '80g', calories: 50 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Enerji Artışı',
      totalCalories: 1650,
      note: 'Yeme penceresi: 12:00 - 20:00. Açlık hissi azaldı mı? Zihinsel netlik artıyor olmalı.',
      meals: [
        {
          type: 'lunch',
          name: 'İlk Öğün (12:00)',
          totalCalories: 620,
          foods: [
            { name: 'Omlet', portion: '3 yumurta', calories: 270, note: 'Peynirli, mantarlı' },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 140 },
            { name: 'Domates', portion: '1 adet', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün (15:30)',
          totalCalories: 280,
          foods: [
            { name: 'Protein bar', portion: '1 adet', calories: 180, note: 'Doğal içerikli' },
            { name: 'Portakal', portion: '1 orta boy', calories: 60 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'dinner',
          name: 'Son Öğün (19:30)',
          totalCalories: 750,
          foods: [
            { name: 'Izgara levrek', portion: '200g', calories: 320 },
            { name: 'Zeytinyağlı enginar', portion: '2 adet', calories: 200 },
            { name: 'Pilav', portion: '100g', calories: 150 },
            { name: 'Limonlu su', portion: '300ml', calories: 5 },
            { name: 'Meyve', portion: '100g', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Rutin Yerleşiyor',
      totalCalories: 1600,
      note: 'Yeme penceresi: 12:00 - 20:00. Artık bu yaşam tarzı doğal geliyor olmalı.',
      meals: [
        {
          type: 'lunch',
          name: 'İlk Öğün (12:00)',
          totalCalories: 600,
          foods: [
            { name: 'Buddha bowl', portion: '400g', calories: 500, note: 'Kinoa, nohut, sebzeler, tahin sos' },
            { name: 'Avokado', portion: '1/4 adet', calories: 60 },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün (16:00)',
          totalCalories: 250,
          foods: [
            { name: 'Yunan yoğurdu', portion: '150g', calories: 130 },
            { name: 'Granola', portion: '30g', calories: 120, note: 'Şekersiz' },
          ],
        },
        {
          type: 'dinner',
          name: 'Son Öğün (19:00)',
          totalCalories: 750,
          foods: [
            { name: 'Kuzu pirzola', portion: '180g', calories: 420 },
            { name: 'Fırın sebze', portion: '200g', calories: 150, note: 'Kabak, biber, soğan' },
            { name: 'Humus', portion: '60g', calories: 130 },
            { name: 'Tam buğday pide', portion: '1/4 adet', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - İlk Hafta Tamamlandı! 🎉',
      totalCalories: 1700,
      note: 'Yeme penceresi: 12:00 - 20:00. Tebrikler! Bir hafta tamamladınız. Kendinizi tartın.',
      meals: [
        {
          type: 'lunch',
          name: 'İlk Öğün (12:00)',
          totalCalories: 650,
          foods: [
            { name: 'Somon avokado bowl', portion: '350g', calories: 500, note: 'Pirinç, somon, avokado, edamame' },
            { name: 'Soya sosu', portion: '1 yemek kaşığı', calories: 10 },
            { name: 'Susam', portion: '1 tatlı kaşığı', calories: 30 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün (16:00)',
          totalCalories: 300,
          foods: [
            { name: 'Smoothie bowl', portion: '300ml', calories: 280, note: 'Muz, mango, yoğurt, granola' },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'dinner',
          name: 'Son Öğün (19:30) - Ödül Yemeği',
          totalCalories: 750,
          foods: [
            { name: 'Bonfile', portion: '200g', calories: 450, note: 'Medium pişmiş' },
            { name: 'Mantar sos', portion: '50g', calories: 80 },
            { name: 'Karışık salata', portion: '150g', calories: 100 },
            { name: 'Ayran', portion: '1 bardak', calories: 70 },
            { name: 'Meyve', portion: '100g', calories: 50 },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 BEKLENEN SONUÇLAR (21 Günde)

⚖️ Kilo Kaybı:
• İlk hafta: 1-2 kg (su kaybı dahil)
• 2-3. hafta: Haftada 0.5-1 kg
• Toplam: 2-4 kg arasında kayıp beklenir

📏 Vücut Değişimleri:
• Bel çevresi: 2-5 cm azalma
• Yağ kütlesi: Özellikle karın bölgesinde azalma
• Şişkinlik hissinde belirgin azalma

🔬 Metabolik İyileşmeler:
• Açlık insülini: %20-30 düşüş
• Açlık kan şekeri: Stabilizasyon
• LDL kolesterol: Hafif düşüş
• Trigliserit: %10-20 düşüş

⚡ Enerji ve Performans:
• İlk 3-5 gün: Uyum süreci, hafif yorgunluk
• 5-7. gün: Enerji artışı başlar
• 2-3. hafta: Stabil, yüksek enerji

🧠 Zihinsel Değişimler:
• Odaklanma ve konsantrasyon artışı
• Zihinsel netlik
• Daha iyi uyku kalitesi
• Açlıkla daha sağlıklı ilişki

🍽️ Yeme Alışkanlıkları:
• Duygusal yeme azalır
• Porsiyon kontrolü gelişir
• Gerçek açlığı tanıma
• Daha bilinçli yeme

⚠️ Not: Sonuçlar kişiden kişiye değişir. 21 gün sonra sürdürmeye karar verebilirsiniz.`,

    en: `📊 EXPECTED RESULTS (In 21 Days)

⚖️ Weight Loss:
• First week: 1-2 kg (including water loss)
• Weeks 2-3: 0.5-1 kg per week
• Total: 2-4 kg loss expected

📏 Body Changes:
• Waist circumference: 2-5 cm reduction
• Fat mass: Especially reduced in abdominal area
• Noticeable reduction in bloating

🔬 Metabolic Improvements:
• Fasting insulin: 20-30% decrease
• Fasting blood sugar: Stabilization
• LDL cholesterol: Slight decrease
• Triglycerides: 10-20% decrease

⚡ Energy and Performance:
• First 3-5 days: Adaptation period, mild fatigue
• Days 5-7: Energy increase begins
• Weeks 2-3: Stable, high energy

🧠 Mental Changes:
• Increased focus and concentration
• Mental clarity
• Better sleep quality
• Healthier relationship with hunger

🍽️ Eating Habits:
• Emotional eating decreases
• Portion control improves
• Recognizing true hunger
• More mindful eating

⚠️ Note: Results vary from person to person. You can decide to continue after 21 days.`,
  },
};
