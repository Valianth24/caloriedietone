import { Diet } from './types';

export const ketoDiet: Diet = {
  id: 'keto',
  name: {
    tr: 'Ketojenik Diyet',
    en: 'Ketogenic Diet',
  },
  emoji: '🥑',
  isPremium: true,
  duration: 28,
  difficulty: 'hard',

  description: {
    tr: 'Ketojenik diyet, vücudu yağ yakımını birincil enerji kaynağı olarak kullanmaya teşvik eden, çok düşük karbonhidrat (%5-10), yüksek yağ (%60-80) ve orta düzey protein (%15-30) içeren bir beslenme yaklaşımıdır. Bu diyet, vücudu "ketoz" adı verilen metabolik bir duruma sokar ve karaciğerin yağlardan keton cisimcikleri üretmesini sağlar.',
    en: 'The ketogenic diet is a nutritional approach that encourages the body to use fat burning as its primary energy source, consisting of very low carbohydrates (5-10%), high fat (60-80%), and moderate protein (15-30%). This diet puts the body into a metabolic state called "ketosis" and enables the liver to produce ketone bodies from fats.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Stanford Üniversitesi 2024 Araştırması:
• 21 yetişkin üzerinde yapılan pilot çalışmada, 4 aylık ketojenik diyet sonucunda:
  - Ortalama %10 vücut ağırlığı kaybı
  - %11 bel çevresi azalması
  - Kan basıncı, trigliserit ve kan şekerinde iyileşme
  - Psikiyatrik değerlendirmelerde %31 iyileşme

📈 Metabolik Mekanizma:
• Karbonhidrat alımı günlük 20-50g'ın altına düşürüldüğünde, vücut glikoz yerine yağları yakıt olarak kullanmaya başlar
• Karaciğer yağ asitlerini beta-hidroksibütirat (BHB), asetoasetat ve aseton gibi keton cisimlerine dönüştürür
• Bu ketonlar beyin dahil tüm organlar tarafından enerji kaynağı olarak kullanılabilir
• İnsülin seviyeleri düşer, yağ yakımı hızlanır

🧠 Beyin Sağlığı:
• Ketonlar, beyin için alternatif ve verimli bir yakıt kaynağıdır
• Nöroprotektif etkileri olan BDNF (Beyin Kaynaklı Nörotrofik Faktör) artışı sağlar
• Epilepsi tedavisinde 100 yılı aşkın klinik kullanım geçmişi vardır

⚠️ 2024 Araştırma Uyarısı:
• 32 haftalık fare çalışmasında uzun süreli ketojenik diyetin hiperlipidemi ve karaciğer fonksiyon bozukluğuna yol açabileceği görülmüştür
• Bu nedenle doktor kontrolünde ve belirli sürelerle uygulanması önerilmektedir`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 Stanford University 2024 Study:
• In a pilot study of 21 adults, after 4 months of ketogenic diet:
  - Average 10% body weight loss
  - 11% waist circumference reduction
  - Improvements in blood pressure, triglycerides, and blood sugar
  - 31% improvement in psychiatric assessments

📈 Metabolic Mechanism:
• When carbohydrate intake drops below 20-50g daily, the body starts using fats as fuel instead of glucose
• The liver converts fatty acids into ketone bodies like beta-hydroxybutyrate (BHB), acetoacetate, and acetone
• These ketones can be used as an energy source by all organs including the brain
• Insulin levels decrease, fat burning accelerates

🧠 Brain Health:
• Ketones are an alternative and efficient fuel source for the brain
• Increases BDNF (Brain-Derived Neurotrophic Factor) which has neuroprotective effects
• Has over 100 years of clinical use in epilepsy treatment

⚠️ 2024 Research Warning:
• A 32-week mouse study showed long-term ketogenic diet may lead to hyperlipidemia and liver dysfunction
• Therefore, it's recommended to be applied under doctor supervision for specific periods`,
  },

  benefits: {
    tr: [
      '🔥 Hızlı ve etkili yağ yakımı - vücut yağları birincil enerji kaynağı olarak kullanır',
      '📉 Kan şekeri ve insülin seviyelerinde belirgin düşüş',
      '🧠 Zihinsel netlik ve odaklanma artışı - ketonlar beyin için verimli yakıttır',
      '⚡ Gün boyu stabil enerji seviyesi - kan şekeri dalgalanmaları azalır',
      '🍽️ Açlık hissinde azalma - yağ ve protein daha uzun süre tok tutar',
      '💪 Kas kütlesinin korunması - yeterli protein alımı ile',
      '❤️ Trigliserit ve LDL kolesterol seviyelerinde iyileşme',
      '🩺 Tip 2 diyabet yönetiminde etkili - insülin direncini azaltır',
    ],
    en: [
      '🔥 Rapid and effective fat burning - body uses fat as primary energy source',
      '📉 Significant decrease in blood sugar and insulin levels',
      '🧠 Increased mental clarity and focus - ketones are efficient brain fuel',
      '⚡ Stable energy levels throughout the day - reduced blood sugar fluctuations',
      '🍽️ Reduced hunger - fat and protein keep you fuller longer',
      '💪 Muscle mass preservation - with adequate protein intake',
      '❤️ Improvement in triglyceride and LDL cholesterol levels',
      '🩺 Effective in Type 2 diabetes management - reduces insulin resistance',
    ],
  },

  warnings: {
    tr: [
      '⚠️ İlk 1-2 hafta "keto gribi" yaşanabilir: baş ağrısı, yorgunluk, bulantı',
      '🚫 Böbrek hastalığı olanlar için uygun değildir',
      '🚫 Tip 1 diyabet hastaları doktor kontrolü olmadan başlamamalıdır',
      '🚫 Hamileler ve emziren anneler için önerilmez',
      '💊 Safra kesesi problemi olanlar dikkatli olmalıdır',
      '🩺 Başlamadan önce mutlaka doktor kontrolü yaptırın',
      '💧 Elektrolit dengesini korumak için bol su ve mineraller alın',
      '📅 28 günden uzun süreler için doktor takibi şarttır',
    ],
    en: [
      '⚠️ "Keto flu" may occur in first 1-2 weeks: headache, fatigue, nausea',
      '🚫 Not suitable for those with kidney disease',
      '🚫 Type 1 diabetics should not start without doctor supervision',
      '🚫 Not recommended for pregnant or breastfeeding women',
      '💊 Those with gallbladder problems should be careful',
      '🩺 Always get medical checkup before starting',
      '💧 Drink plenty of water and minerals to maintain electrolyte balance',
      '📅 Doctor follow-up is mandatory for periods longer than 28 days',
    ],
  },

  allowedFoods: {
    tr: [
      '🥩 Kırmızı et (dana, kuzu, sığır)',
      '🍗 Kümes hayvanları (tavuk, hindi, ördek)',
      '🐟 Yağlı balıklar (somon, uskumru, sardalya, ton)',
      '🥚 Yumurta (tüm pişirme şekilleri)',
      '🧈 Tereyağı ve ghee',
      '🧀 Tam yağlı peynirler (cheddar, brie, parmesan, keçi peyniri)',
      '🥑 Avokado',
      '🫒 Zeytinyağı, hindistan cevizi yağı, MCT yağı',
      '🥬 Yeşil yapraklı sebzeler (ıspanak, pazı, roka, marul)',
      '🥦 Düşük karbonhidratlı sebzeler (brokoli, karnabahar, kuşkonmaz)',
      '🥒 Salatalık, kabak, biber, domates (az miktarda)',
      '🥜 Kuruyemişler (badem, ceviz, fındık, makadamya)',
      '🫐 Az şekerli meyveler (çilek, ahududu, böğürtlen - az miktarda)',
      '🍵 Şekersiz çay ve kahve',
      '🧂 Himalaya tuzu, deniz tuzu',
    ],
    en: [
      '🥩 Red meat (beef, lamb, veal)',
      '🍗 Poultry (chicken, turkey, duck)',
      '🐟 Fatty fish (salmon, mackerel, sardines, tuna)',
      '🥚 Eggs (all cooking methods)',
      '🧈 Butter and ghee',
      '🧀 Full-fat cheeses (cheddar, brie, parmesan, goat cheese)',
      '🥑 Avocado',
      '🫒 Olive oil, coconut oil, MCT oil',
      '🥬 Green leafy vegetables (spinach, chard, arugula, lettuce)',
      '🥦 Low-carb vegetables (broccoli, cauliflower, asparagus)',
      '🥒 Cucumber, zucchini, peppers, tomatoes (small amounts)',
      '🥜 Nuts (almonds, walnuts, hazelnuts, macadamia)',
      '🫐 Low-sugar berries (strawberries, raspberries, blackberries - small amounts)',
      '🍵 Unsweetened tea and coffee',
      '🧂 Himalayan salt, sea salt',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🍞 Ekmek, pide, lavaş ve tüm unlu mamuller',
      '🍚 Pirinç, bulgur, makarna, kuskus',
      '🥣 Tahıllar ve gevrekler',
      '🍬 Şeker, bal, pekmez, reçel',
      '🍰 Pasta, kek, bisküvi, kurabiye',
      '🍎 Yüksek şekerli meyveler (muz, üzüm, mango, ananas)',
      '🥔 Patates, tatlı patates, havuç, pancar',
      '🫘 Baklagiller (nohut, fasulye, mercimek)',
      '🥛 Düşük yağlı süt ürünleri',
      '🥤 Şekerli içecekler, meyve suları, gazlı içecekler',
      '🥤 Gazlı ve şekerli içecekler',
      '🍟 Kızartmalar ve fast food',
      '🌽 Mısır ve mısır ürünleri',
      '🍯 Agave şurubu ve yapay tatlandırıcıların çoğu',
    ],
    en: [
      '🍞 Bread, pita, flatbread and all flour products',
      '🍚 Rice, bulgur, pasta, couscous',
      '🥣 Grains and cereals',
      '🍬 Sugar, honey, molasses, jam',
      '🍰 Cake, pastries, cookies, biscuits',
      '🍎 High-sugar fruits (banana, grapes, mango, pineapple)',
      '🥔 Potato, sweet potato, carrots, beets',
      '🫘 Legumes (chickpeas, beans, lentils)',
      '🥛 Low-fat dairy products',
      '🥤 Sugary drinks, fruit juices, sodas',
      '🥤 Soda and sugary drinks',
      '🍟 Fried foods and fast food',
      '🌽 Corn and corn products',
      '🍯 Agave syrup and most artificial sweeteners',
    ],
  },

  exercises: [
    {
      name: 'Yürüyüş / Walking',
      duration: '30-45 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Özellikle ilk haftalarda yoğun egzersizden kaçının. Keto adaptasyonu sırasında hafif kardiyo idealdir.',
    },
    {
      name: 'Ağırlık Antrenmanı / Weight Training',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 3 kez / 3 times a week',
      note: 'Kas kaybını önlemek için önemlidir. Orta yoğunlukta başlayın.',
    },
    {
      name: 'HIIT (Yüksek Yoğunluklu Aralıklı Antrenman)',
      duration: '15-20 dakika / minutes',
      frequency: 'Haftada 2 kez / 2 times a week',
      note: 'Sadece keto adaptasyonu tamamlandıktan sonra (2-3 hafta). Yağ yakımını hızlandırır.',
    },
    {
      name: 'Yoga veya Pilates',
      duration: '20-30 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Esneklik, denge ve stres yönetimi için mükemmeldir.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Ketoza Giriş',
      totalCalories: 1800,
      note: 'İlk gün! Karbonhidratları kesmeye başlıyoruz. Bol su için (en az 2.5 litre).',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 520,
          foods: [
            { name: 'Sahanda yumurta (3 adet)', portion: '180g', calories: 270, note: 'Tereyağında pişirin' },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Tam yağlı beyaz peynir', portion: '30g', calories: 100 },
            { name: 'Zeytin', portion: '5 adet', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'Izgara tavuk but', portion: '200g', calories: 400 },
            { name: 'Yeşil salata (zeytinyağlı)', portion: '150g', calories: 120, note: 'Roka, marul, maydanoz' },
            { name: 'Haşlanmış brokoli', portion: '100g', calories: 35 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 95 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 310, note: 'Limonlu ve sarımsaklı' },
            { name: 'Kuşkonmaz (tereyağlı)', portion: '100g', calories: 80 },
            { name: 'Karnabahar püresi', portion: '100g', calories: 90, note: 'Tereyağı ve krema ile' },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Badem', portion: '20g (15 adet)', calories: 115 },
            { name: 'Çedar peyniri', portion: '15g', calories: 35 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Adaptasyon Başlıyor',
      totalCalories: 1750,
      note: 'Hafif yorgunluk hissedebilirsiniz. Elektrolit alımına dikkat edin (tuz, magnezyum).',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Omlet (2 yumurta + peynir)', portion: '200g', calories: 320, note: 'İçine ıspanak ekleyin' },
            { name: 'Pastırma', portion: '40g', calories: 100 },
            { name: 'Bulletproof kahve', portion: '1 fincan', calories: 60, note: 'Kahve + 1 çk tereyağı' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Dana antrikot (ızgara)', portion: '180g', calories: 420 },
            { name: 'Mantar sote', portion: '100g', calories: 80, note: 'Tereyağında' },
            { name: 'Taze salata', portion: '100g', calories: 100, note: 'Zeytinyağlı' },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Fırında tavuk kanat', portion: '200g', calories: 380, note: 'Baharatlı' },
            { name: 'Kabak kızartması', portion: '100g', calories: 90, note: 'Zeytinyağında' },
            { name: 'Ayran', portion: '200ml', calories: 50, note: 'Ev yapımı, şekersiz' },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Salatalık', portion: '50g', calories: 20 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Keto Gribi Dönemi',
      totalCalories: 1800,
      note: 'Baş ağrısı veya halsizlik normal. Kemik suyu içmek elektrolit dengesine yardımcı olur.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 500,
          foods: [
            { name: 'Kaşarlı yumurta (3 adet)', portion: '220g', calories: 380 },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 620,
          foods: [
            { name: 'Ton balıklı salata', portion: '250g', calories: 350, note: 'Zeytinyağı ve limon ile' },
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Lor peyniri', portion: '50g', calories: 60 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 70 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Kuzu pirzola (ızgara)', portion: '180g', calories: 400 },
            { name: 'Ispanak (sarımsaklı sote)', portion: '150g', calories: 80, note: 'Zeytinyağında' },
            { name: 'Limonlu su', portion: '300ml', calories: 5 },
            { name: 'Kemik suyu', portion: '200ml', calories: 45, note: 'Elektrolit desteği için' },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Makadamya fıstığı', portion: '15g', calories: 110 },
            { name: 'Keçi peyniri', portion: '20g', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Dengeleme',
      totalCalories: 1780,
      note: 'Vücudunuz yavaş yavaş adapte oluyor. Enerji seviyeleri düzelmeye başlayacak.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 490,
          foods: [
            { name: 'Menemen (yağlı)', portion: '200g', calories: 300, note: '3 yumurta, domates, biber' },
            { name: 'Sucuk', portion: '40g', calories: 140, note: 'Az yağda kızartın' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
            { name: 'Zeytin', portion: '8 adet', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Izgara köfte', portion: '150g', calories: 350, note: 'Dana kıyma, soğansız' },
            { name: 'Cacık', portion: '150g', calories: 80, note: 'Tam yağlı yoğurt ile' },
            { name: 'Közlenmiş biber', portion: '100g', calories: 50 },
            { name: 'Tereyağı', portion: '10g', calories: 100, note: 'Köftenin üzerine' },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Levrek (fırında)', portion: '200g', calories: 320, note: 'Zeytinyağı ve kekikle' },
            { name: 'Karnabahar graten', portion: '150g', calories: 180, note: 'Peynirli' },
            { name: 'Roka salatası', portion: '50g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 160,
          foods: [
            { name: 'Brie peyniri', portion: '30g', calories: 100 },
            { name: 'Kereviz sapı', portion: '50g', calories: 10 },
            { name: 'Fındık', portion: '10g', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Enerji Artışı',
      totalCalories: 1820,
      note: 'Ketoz başlıyor olabilir. İdrar keton testleri yapabilirsiniz. Enerji artışı hissedeceksiniz.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 530,
          foods: [
            { name: 'Yumurtalı avokado (2 yumurta)', portion: '250g', calories: 350, note: 'Avokado içine pişirin' },
            { name: 'Pastırma', portion: '50g', calories: 130 },
            { name: 'Kahve (kremalı)', portion: '1 fincan', calories: 50, note: 'Şekersiz, 1 çk krema' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Tavuk şiş', portion: '200g', calories: 380, note: 'Yoğurtlu marine' },
            { name: 'Semizotu salatası', portion: '150g', calories: 120, note: 'Yoğurtlu, sarımsaklı' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 100 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Biftek (orta pişmiş)', portion: '180g', calories: 380, note: 'Tereyağı ile' },
            { name: 'Haşlanmış brokoli', portion: '100g', calories: 35 },
            { name: 'Mantar sote', portion: '100g', calories: 105, note: 'Tereyağı ve sarımsak' },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 170,
          foods: [
            { name: 'Çilek', portion: '50g (5 adet)', calories: 20, note: 'Az miktarda' },
            { name: 'Krem şanti (şekersiz)', portion: '30g', calories: 100 },
            { name: 'Badem', portion: '10g', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Ketoz Derinleşiyor',
      totalCalories: 1790,
      note: 'Açlık hissi belirgin şekilde azalmış olmalı. Zihinsel netlik artıyor.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 510,
          foods: [
            { name: 'Ispanaklı omlet (3 yumurta)', portion: '220g', calories: 350 },
            { name: 'Somon füme', portion: '50g', calories: 100 },
            { name: 'Krem peynir', portion: '30g', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 590,
          foods: [
            { name: 'Sezar salata (tavuklu)', portion: '300g', calories: 450, note: 'Kruton olmadan, bol parmesan' },
            { name: 'Zeytinyağı sos', portion: '2 yemek kaşığı', calories: 140 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 540,
          foods: [
            { name: 'Hindi but (fırında)', portion: '200g', calories: 360 },
            { name: 'Kabak çorbası (kremalı)', portion: '200ml', calories: 120, note: 'Tereyağı ve krema ile' },
            { name: 'Yeşil salata', portion: '80g', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Peynir tabağı', portion: '40g', calories: 120, note: 'Çeşitli peynirler' },
            { name: 'Salatalık', portion: '50g', calories: 10 },
            { name: 'Zeytin', portion: '4 adet', calories: 20 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - İlk Hafta Tamamlandı! 🎉',
      totalCalories: 1850,
      note: 'Tebrikler! İlk haftayı tamamladınız. Vücudunuz artık ketoza alışıyor. Kendinizi tartın ve ölçümlerinizi alın.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Özel Gün)',
          totalCalories: 550,
          foods: [
            { name: 'Keto pankek (badem unlu)', portion: '2 adet', calories: 250, note: 'Badem unu, yumurta, krem peynir' },
            { name: 'Yaban mersini', portion: '30g', calories: 20 },
            { name: 'Şekersiz çırpılmış krema', portion: '30g', calories: 100 },
            { name: 'Pastırma', portion: '50g', calories: 130 },
            { name: 'Kahve', portion: '1 fincan', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 620,
          foods: [
            { name: 'Bonfile (ızgara)', portion: '200g', calories: 440 },
            { name: 'Karışık ızgara sebze', portion: '150g', calories: 100, note: 'Kabak, biber, patlıcan' },
            { name: 'Tereyağı', portion: '10g', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Karidesli kabak makarna', portion: '300g', calories: 350, note: 'Kabak şeritlerinden' },
            { name: 'Sarımsaklı tereyağı sosu', portion: '30g', calories: 130 },
            { name: 'Parmesan', portion: '20g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Keto fat bomb', portion: '2 adet', calories: 150, note: 'Hindistan cevizi yağı + kakao' },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 BEKLENEN SONUÇLAR (28 Günde)

⚖️ Kilo Kaybı:
• İlk hafta: 2-4 kg (büyük kısmı su kaybı)
• 2-4. hafta: Haftada 0.5-1 kg yağ kaybı
• Toplam: 4-8 kg arasında kayıp beklenir

📏 Vücut Ölçüleri:
• Bel çevresi: 5-10 cm azalma
• Karın bölgesinde belirgin incelme
• Ödem azalması nedeniyle genel sıkılaşma

🔬 Kan Değerleri:
• Açlık kan şekeri: %10-20 düşüş
• Trigliserit: %20-40 düşüş
• HDL kolesterol: Artış
• İnsülin: Belirgin düşüş

⚡ Enerji ve Zihinsel Durum:
• İlk 1-2 hafta: Keto gribi nedeniyle düşük enerji
• 3-4. hafta: Stabil, yüksek enerji seviyesi
• Zihinsel netlik ve odaklanma artışı
• Daha iyi uyku kalitesi

⚠️ Not: Sonuçlar kişiden kişiye değişebilir. Düzenli egzersiz ve su tüketimi sonuçları olumlu etkiler.`,

    en: `📊 EXPECTED RESULTS (In 28 Days)

⚖️ Weight Loss:
• First week: 2-4 kg (mostly water weight)
• Weeks 2-4: 0.5-1 kg fat loss per week
• Total: 4-8 kg loss expected

📏 Body Measurements:
• Waist circumference: 5-10 cm reduction
• Noticeable slimming in abdominal area
• General tightening due to reduced edema

🔬 Blood Values:
• Fasting blood sugar: 10-20% decrease
• Triglycerides: 20-40% decrease
• HDL cholesterol: Increase
• Insulin: Significant decrease

⚡ Energy and Mental State:
• First 1-2 weeks: Low energy due to keto flu
• Weeks 3-4: Stable, high energy level
• Increased mental clarity and focus
• Better sleep quality

⚠️ Note: Results may vary from person to person. Regular exercise and water intake positively affect results.`,
  },
};
