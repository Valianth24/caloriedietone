import { Diet } from '../types';

export const nordicDiet30: Diet = {
  id: 'nordic',
  name: {
    tr: 'Nordic Diyeti',
    en: 'Nordic Diet',
  },
  emoji: '❄️',
  isPremium: true,
  duration: 30,
  difficulty: 'easy',

  description: {
    tr: 'Nordic (İskandinav) diyeti, Danimarka, Norveç, İsveç, Finlandiya ve İzlanda\'nın geleneksel beslenme alışkanlıklarından ilham alır. Tam tahıllar, yağlı balık, kök sebzeler, mevsimsel meyveler ve kanola yağına dayanan bu diyet, sürdürülebilirlik ve yerel gıdalara odaklanır.',
    en: 'The Nordic diet is inspired by the traditional eating habits of Denmark, Norway, Sweden, Finland, and Iceland. Based on whole grains, fatty fish, root vegetables, seasonal fruits, and canola oil, this diet focuses on sustainability and local foods.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 2025 Yaşam Beklentisi Araştırması:
• Nordic Nutrition Recommendations 2023 (NNR2023) takip edildiğinde:
• 40 yaşında başlayanlar için 1.8-4.1 yıl ek yaşam süresi
• Tam potansiyel ile 4.4-7.3 yıl kazanım mümkün
• En büyük katkı: Baklagiller (%18), kuruyemişler (%17), tam tahıllar (%12)

💓 Kardiyovasküler ve Metabolik Sağlık:
• 2010 randomize kontrollü çalışma:
  - Kolesterol seviyelerinde iyileşme
  - İnsülin direnci belirteçlerinde düzelme
  - Kan basıncında düşüş
  - Orta düzeyde kilo kaybı

📈 2025 Meta-Analiz Sonuçları:
• Tüm nedenlerden ölüm riskinde azalma
• Kanser ve kardiyovasküler hastalıktan ölüm riskinde düşüş
• Tip 2 diyabet, koroner kalp hastalığı, inme ve kanser insidansında azalma

🧠 Nörolojik ve Mental Sağlık:
• 2023 sistematik derleme:
  - Nörolojik fonksiyon desteği
  - Beyin sağlığı korunması
  - Depresyon semptomlarında azalma
• COVID-19 sonrası: Anksiyete, depresyon ve stres belirtilerinde düşüş`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 2025 Life Expectancy Research:
• When following Nordic Nutrition Recommendations 2023 (NNR2023):
• 1.8-4.1 additional years of life for those starting at age 40
• 4.4-7.3 years gain possible with full potential
• Largest contributions: Legumes (18%), nuts (17%), whole grains (12%)

💓 Cardiovascular and Metabolic Health:
• 2010 randomized controlled trial:
  - Improvement in cholesterol levels
  - Improvement in insulin resistance markers
  - Decrease in blood pressure
  - Moderate weight loss

📈 2025 Meta-Analysis Results:
• Reduced all-cause mortality risk
• Lower cancer and cardiovascular death risk
• Reduced incidence of type 2 diabetes, coronary heart disease, stroke, and cancer

🧠 Neurological and Mental Health:
• 2023 systematic review:
  - Neurological function support
  - Brain health preservation
  - Reduction in depression symptoms
• Post-COVID-19: Reduced anxiety, depression, and stress symptoms`,
  },

  benefits: {
    tr: [
      '❤️ Kardiyovasküler hastalık riskini azaltır',
      '📉 Kolesterol ve kan basıncını düşürür',
      '🩺 Tip 2 diyabet riskini azaltır',
      '⚖️ Sürdürülebilir kilo kontrolü sağlar',
      '🧠 Beyin sağlığını ve ruh halini destekler',
      '🌍 Çevre dostu ve sürdürülebilir beslenme',
      '🔥 Anti-inflamatuar özellikler',
      '💪 Enerji seviyelerini artırır',
      '🦴 Kemik sağlığını destekler',
      '🌿 Yerel ve mevsimsel beslenme alışkanlığı',
    ],
    en: [
      '❤️ Reduces cardiovascular disease risk',
      '📉 Lowers cholesterol and blood pressure',
      '🩺 Reduces Type 2 diabetes risk',
      '⚖️ Provides sustainable weight control',
      '🧠 Supports brain health and mood',
      '🌍 Environmentally friendly and sustainable nutrition',
      '🔥 Anti-inflammatory properties',
      '💪 Increases energy levels',
      '🦴 Supports bone health',
      '🌿 Local and seasonal eating habits',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Bazı İskandinav malzemeleri bulmak zor olabilir',
      '🐟 Yüksek balık tüketimi cıva maruziyetine dikkat gerektirir',
      '🌾 Çölyak hastaları tam tahıllara dikkat etmeli',
      '💰 Organik ve yerel ürünler pahalı olabilir',
      '🥛 Fermente süt ürünleri laktoz hassasiyetinde dikkat',
    ],
    en: [
      '⚠️ Some Nordic ingredients may be hard to find',
      '🐟 High fish consumption requires attention to mercury exposure',
      '🌾 Celiac patients should be careful with whole grains',
      '💰 Organic and local products may be expensive',
      '🥛 Fermented dairy requires caution with lactose sensitivity',
    ],
  },

  allowedFoods: {
    tr: [
      '🌾 TAM TAHILLAR:',
      '🌾 Yulaf, arpa, çavdar',
      '🌾 Tam buğday, kinoa',
      '🍞 Çavdar ekmeği (rugbrød)',
      '',
      '🐟 YAĞLI BALIK (Haftada 2-3 kez):',
      '🐟 Somon, uskumru, ringa',
      '🐟 Sardalya, alabalık',
      '',
      '🥕 KÖK SEBZELER:',
      '🥕 Havuç, pancar, şalgam',
      '🥔 Patates, kereviz kökü',
      '🧅 Soğan, sarımsak',
      '',
      '🫐 ORMAN MEYVELERİ:',
      '🫐 Yaban mersini, ahududu, böğürtlen',
      '🍎 Elma, armut',
      '🍒 Kiraz, erik',
      '',
      '🥬 YEŞİL SEBZELER:',
      '🥬 Lahana, Brüksel lahanası',
      '🥦 Brokoli, karnabahar',
      '🥬 Ispanak, pazı',
      '',
      '🫘 BAKLAGİLLER:',
      '🫘 Mercimek, bezelye, fasulye',
      '',
      '🥜 KURUYEMIŞ VE TOHUMLAR:',
      '🥜 Badem, fındık, ceviz',
      '🌻 Keten tohumu, ayçekirdeği',
      '',
      '🫒 SAĞLIKLI YAĞLAR:',
      '🫒 Kanola (kolza) yağı - ana yağ',
      '🫒 Zeytinyağı',
      '',
      '🥛 FERMENTE SÜT ÜRÜNLERİ:',
      '🥛 Skyr (İzlanda yoğurdu)',
      '🥛 Kefir, ayran',
    ],
    en: [
      '🌾 WHOLE GRAINS:',
      '🌾 Oats, barley, rye',
      '🌾 Whole wheat, quinoa',
      '🍞 Rye bread (rugbrød)',
      '',
      '🐟 FATTY FISH (2-3 times/week):',
      '🐟 Salmon, mackerel, herring',
      '🐟 Sardines, trout',
      '',
      '🥕 ROOT VEGETABLES:',
      '🥕 Carrots, beets, turnips',
      '🥔 Potatoes, celeriac',
      '🧅 Onions, garlic',
      '',
      '🫐 FOREST BERRIES:',
      '🫐 Blueberries, raspberries, blackberries',
      '🍎 Apples, pears',
      '🍒 Cherries, plums',
      '',
      '🥬 GREEN VEGETABLES:',
      '🥬 Cabbage, Brussels sprouts',
      '🥦 Broccoli, cauliflower',
      '🥬 Spinach, chard',
      '',
      '🫘 LEGUMES:',
      '🫘 Lentils, peas, beans',
      '',
      '🥜 NUTS AND SEEDS:',
      '🥜 Almonds, hazelnuts, walnuts',
      '🌻 Flaxseeds, sunflower seeds',
      '',
      '🫒 HEALTHY OILS:',
      '🫒 Canola (rapeseed) oil - main oil',
      '🫒 Olive oil',
      '',
      '🥛 FERMENTED DAIRY:',
      '🥛 Skyr (Icelandic yogurt)',
      '🥛 Kefir, buttermilk',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🍬 İŞLENMİŞ ŞEKER:',
      '🍬 Şekerli içecekler, tatlılar',
      '🍪 Paketli atıştırmalıklar',
      '',
      '🍟 İŞLENMİŞ GIDALAR:',
      '🍟 Fast food, kızartmalar',
      '🥫 Hazır yemekler',
      '',
      '🥩 KIRMIZI ET (Sınırlı):',
      '🥩 Haftada 1-2 kezden fazla değil',
      '🌭 İşlenmiş etler (sosis, sucuk)',
      '',
      '🧈 DOYMUŞ YAĞLAR:',
      '🧈 Tereyağı (az miktarda izin)',
      '🥥 Hindistan cevizi yağı',
    ],
    en: [
      '🍬 PROCESSED SUGAR:',
      '🍬 Sugary drinks, sweets',
      '🍪 Packaged snacks',
      '',
      '🍟 PROCESSED FOODS:',
      '🍟 Fast food, fried foods',
      '🥫 Ready meals',
      '',
      '🥩 RED MEAT (Limited):',
      '🥩 Not more than 1-2 times per week',
      '🌭 Processed meats (sausage, bacon)',
      '',
      '🧈 SATURATED FATS:',
      '🧈 Butter (small amounts allowed)',
      '🥥 Coconut oil',
    ],
  },

  exercises: [
    {
      name: 'Doğa Yürüyüşü / Nature Walking',
      duration: '45-60 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'İskandinav geleneği - friluftsliv (açık hava yaşamı).',
    },
    {
      name: 'Nordic Walking',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 4-5 kez / 4-5 times a week',
      note: 'Bastonlarla yürüyüş - tüm vücut egzersizi.',
    },
    {
      name: 'Yüzme / Swimming',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Soğuk su yüzme (kış yüzüşü) geleneksel.',
    },
    {
      name: 'Bisiklet / Cycling',
      duration: '30-45 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'İskandinav ülkelerinde yaygın ulaşım.',
    },
    {
      name: 'Kayak / Skiing',
      duration: '60+ dakika / minutes',
      frequency: 'Mevsimsel / Seasonal',
      note: 'Kros kayağı mükemmel kardio.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Nordic Yolculuğu Başlıyor ❄️',
      totalCalories: 1900,
      note: 'Hygge (rahatlık) ile sağlıklı beslenme!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf lapası', portion: '200g', calories: 180, note: 'Tam tahıl bazı' },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Badem', portion: '20g', calories: 115 },
            { name: 'Keten tohumu', portion: '1 yemek kaşığı', calories: 55 },
            { name: 'Skyr/yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Somon (fırın)', portion: '150g', calories: 280, note: 'Omega-3 deposu' },
            { name: 'Patates (haşlama)', portion: '150g', calories: 130 },
            { name: 'Lahana salatası', portion: '150g', calories: 50 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Kök sebze güveç', portion: '200g', calories: 150, note: 'Havuç, pancar, şalgam' },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Bitki çayı', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Balık Günü 🐟',
      totalCalories: 1920,
      note: 'Yağlı balık ile omega-3 deposu.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Füme somon', portion: '60g', calories: 120 },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Ringa balığı', portion: '150g', calories: 250, note: 'Geleneksel Nordic' },
            { name: 'Patates salatası', portion: '150g', calories: 150 },
            { name: 'Pancar turşusu', portion: '50g', calories: 25 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Uskumru (ızgara)', portion: '150g', calories: 300 },
            { name: 'Haşlanmış patates', portion: '150g', calories: 130 },
            { name: 'Brokoli', portion: '150g', calories: 55 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Skyr', portion: '150g', calories: 100, note: 'İzlanda yoğurdu' },
            { name: 'Ahududu', portion: '100g', calories: 55 },
            { name: 'Fındık', portion: '20g', calories: 130 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Kök Sebze Festivali 🥕',
      totalCalories: 1900,
      note: 'Mevsimsel kök sebzeler ile beslenme.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf ezmesi', portion: '200g', calories: 180 },
            { name: 'Elma (dilim)', portion: '1 adet', calories: 95 },
            { name: 'Tarçın', portion: 'bir tutam', calories: 0 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Kök sebze çorbası', portion: '300ml', calories: 180, note: 'Havuç, pancar, patates' },
            { name: 'Izgara tavuk', portion: '120g', calories: 200 },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Dana güveç', portion: '200g', calories: 300, note: 'Kök sebzeli' },
            { name: 'Haşlanmış patates', portion: '150g', calories: 130 },
            { name: 'Lahana salatası', portion: '100g', calories: 35 },
            { name: 'Kanola yağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Havuç çubukları', portion: '100g', calories: 40 },
            { name: 'Humus', portion: '50g', calories: 100 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Badem', portion: '15g', calories: 85 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Tam Tahıl Zenginliği 🌾',
      totalCalories: 1920,
      note: 'Çavdar, arpa ve yulaf ile lif deposu.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Arpa lapası', portion: '200g', calories: 190, note: 'Nordic geleneksel' },
            { name: 'Böğürtlen', portion: '100g', calories: 45 },
            { name: 'Fındık', portion: '20g', calories: 130 },
            { name: 'Süt', portion: '100ml', calories: 50 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Smørrebrød', portion: '2 adet', calories: 350, note: 'Açık yüzlü sandviç - çavdar ekmek' },
            { name: 'Roka salatası', portion: '100g', calories: 25 },
            { name: 'Turşu', portion: '50g', calories: 15 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Arpa pilavı', portion: '150g', calories: 180 },
            { name: 'Buharda brokoli', portion: '100g', calories: 35 },
            { name: 'Limon-dereotu sos', portion: '30ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Çavdar kraker', portion: '4 adet', calories: 80 },
            { name: 'Skyr', portion: '100g', calories: 70 },
            { name: 'Armut', portion: '1 orta', calories: 100 },
            { name: 'Keten tohumu', portion: '1 yemek kaşığı', calories: 55 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Berry Patlaması 🫐',
      totalCalories: 1900,
      note: 'Nordic orman meyveleri ile antioksidan.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Berry smoothie bowl', portion: '350g', calories: 300, note: 'Yaban mersini, ahududu, böğürtlen' },
            { name: 'Granola', portion: '30g', calories: 120 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 540,
          foods: [
            { name: 'Tavuk salatası', portion: '250g', calories: 300 },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Yaban mersini', portion: '50g', calories: 30, note: 'Salata üzerine' },
            { name: 'Kanola yağı sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Alabalık (fırın)', portion: '150g', calories: 200 },
            { name: 'Patates püresi', portion: '150g', calories: 150 },
            { name: 'Lahana (sote)', portion: '150g', calories: 60 },
            { name: 'Lingonberry sos', portion: '30g', calories: 50, note: 'Kızılcık benzeri' },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Ahududu', portion: '150g', calories: 80 },
            { name: 'Skyr', portion: '100g', calories: 70 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Baklagil Günü 🫘',
      totalCalories: 1920,
      note: 'Yaşam beklentisi için en etkili grup: baklagiller.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Yulaf ezmesi', portion: '200g', calories: 180 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Badem', portion: '20g', calories: 115 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 180 },
            { name: 'Bezelye püre', portion: '150g', calories: 150, note: 'Nordic klasik' },
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Tavuk but', portion: '150g', calories: 280 },
            { name: 'Fasulye haşlama', portion: '150g', calories: 150 },
            { name: 'Lahana salatası', portion: '100g', calories: 35 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Humus', portion: '60g', calories: 120 },
            { name: 'Havuç + kereviz', portion: '100g', calories: 40 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Fındık', portion: '15g', calories: 95 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - Hafta Sonu Hygge 🎉',
      totalCalories: 2000,
      note: 'İlk hafta tamamlandı! Hygge ruhu ile kutlayın.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Brunch)',
          totalCalories: 520,
          foods: [
            { name: 'Yumurta (pişmiş)', portion: '2 adet', calories: 140 },
            { name: 'Füme somon', portion: '60g', calories: 120 },
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında tavuk', portion: '150g', calories: 280 },
            { name: 'Kök sebze fırın', portion: '200g', calories: 150 },
            { name: 'Lingonberry sos', portion: '30g', calories: 50 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Somon (ızgara)', portion: '180g', calories: 340 },
            { name: 'Patates (fırın)', portion: '150g', calories: 130 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Berry parfait', portion: '200g', calories: 180, note: 'Skyr, granola, berry' },
            { name: 'Ceviz', portion: '15g', calories: 100 },
            { name: 'Bitki çayı', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 8,
      title: 'Gün 8 - Yeni Hafta Enerjisi 💪',
      totalCalories: 1900,
      note: 'İkinci hafta başlıyor - momentum devam!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Müsli (Nordic)', portion: '60g', calories: 220 },
            { name: 'Skyr', portion: '150g', calories: 100 },
            { name: 'Ahududu', portion: '80g', calories: 45 },
            { name: 'Keten tohumu', portion: '1 yemek kaşığı', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Uskumru salatası', portion: '200g', calories: 300 },
            { name: 'Patates', portion: '100g', calories: 90 },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Hindi göğsü', portion: '150g', calories: 250 },
            { name: 'Pancar salatası', portion: '150g', calories: 80 },
            { name: 'Arpa pilavı', portion: '150g', calories: 180 },
            { name: 'Kanola yağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 100 },
            { name: 'Böğürtlen', portion: '80g', calories: 35 },
            { name: 'Fındık', portion: '10g', calories: 65 },
          ],
        },
      ],
    },
    {
      day: 9,
      title: 'Gün 9 - Deniz Mahsulleri 🦐',
      totalCalories: 1920,
      note: 'İskandinav denizlerinin zenginliği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Yulaf lapası', portion: '200g', calories: 180 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Karides salatası', portion: '200g', calories: 250 },
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Limon sos', portion: '30ml', calories: 30 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında levrek', portion: '150g', calories: 200 },
            { name: 'Patates püresi', portion: '150g', calories: 150 },
            { name: 'Lahana (sote)', portion: '150g', calories: 60 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Skyr', portion: '150g', calories: 100 },
            { name: 'Ahududu', portion: '100g', calories: 55 },
            { name: 'Badem', portion: '20g', calories: 115 },
          ],
        },
      ],
    },
    {
      day: 10,
      title: 'Gün 10 - Sürdürülebilirlik 🌍',
      totalCalories: 1900,
      note: 'Yerel ve mevsimsel gıdalar ile çevre dostu beslenme.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Yumurta', portion: '2 adet', calories: 140 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 150, note: 'Mevsimsel sebzeler' },
            { name: 'Izgara tavuk', portion: '120g', calories: 200 },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Somon (fırın)', portion: '150g', calories: 280 },
            { name: 'Kök sebze fırın', portion: '200g', calories: 150 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Armut', portion: '1 orta', calories: 100 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Fındık', portion: '20g', calories: 130 },
          ],
        },
      ],
    },
    {
      day: 11,
      title: 'Gün 11 - Fermente Gıdalar 🥛',
      totalCalories: 1920,
      note: 'Probiyotikler ile bağırsak sağlığı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Kefir', portion: '200ml', calories: 100, note: 'Probiyotik' },
            { name: 'Yulaf ezmesi', portion: '150g', calories: 150 },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Ringa balığı', portion: '150g', calories: 250 },
            { name: 'Lahana turşusu', portion: '80g', calories: 30, note: 'Fermente' },
            { name: 'Patates', portion: '150g', calories: 130 },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Kanola yağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Pancar turşusu', portion: '80g', calories: 35 },
            { name: 'Arpa pilavı', portion: '150g', calories: 180 },
            { name: 'Yeşil salata', portion: '80g', calories: 20 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Skyr', portion: '150g', calories: 100 },
            { name: 'Ahududu', portion: '100g', calories: 55 },
            { name: 'Badem', portion: '20g', calories: 115 },
          ],
        },
      ],
    },
    {
      day: 12,
      title: 'Gün 12 - Antiinflamatuar 🔥',
      totalCalories: 1900,
      note: 'İltihabı azaltan Nordic besinleri.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf lapası', portion: '200g', calories: 180 },
            { name: 'Böğürtlen', portion: '100g', calories: 45 },
            { name: 'Keten tohumu', portion: '2 yemek kaşığı', calories: 110, note: 'Omega-3' },
            { name: 'Fındık', portion: '15g', calories: 95 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Somon salatası', portion: '250g', calories: 350 },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Uskumru (ızgara)', portion: '150g', calories: 300 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Brokoli', portion: '100g', calories: 35 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 13,
      title: 'Gün 13 - Protein Dengesi 💪',
      totalCalories: 1920,
      note: 'Balık ve kümes hayvanları ile yağsız protein.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Yumurta', portion: '2 adet', calories: 140 },
            { name: 'Füme somon', portion: '50g', calories: 100 },
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Bezelye püresi', portion: '150g', calories: 150 },
            { name: 'Lahana salatası', portion: '100g', calories: 35 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında alabalık', portion: '150g', calories: 200 },
            { name: 'Patates püresi', portion: '150g', calories: 150 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Skyr', portion: '150g', calories: 100 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Badem', portion: '20g', calories: 115 },
          ],
        },
      ],
    },
    {
      day: 14,
      title: 'Gün 14 - İki Hafta Başarısı! 🎊',
      totalCalories: 2000,
      note: 'Yarı yola geldik! Nordic yaşam tarzı benimsenmeye başladı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 520,
          foods: [
            { name: 'Nordic kahvaltı tabağı', portion: '350g', calories: 400, note: 'Yumurta, somon, çavdar, sebze' },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Somon burger', portion: '150g', calories: 300 },
            { name: 'Çavdar sandviç ekmeği', portion: '1 adet', calories: 150 },
            { name: 'Lahana salatası', portion: '100g', calories: 35 },
            { name: 'Kanola yağı sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında hindi but', portion: '150g', calories: 280 },
            { name: 'Kök sebze fırın', portion: '200g', calories: 150 },
            { name: 'Lingonberry sos', portion: '30g', calories: 50 },
            { name: 'Ispanak salatası', portion: '80g', calories: 20 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler + Kutlama',
          totalCalories: 300,
          foods: [
            { name: 'Berry parfait', portion: '200g', calories: 180 },
            { name: 'Badem', portion: '15g', calories: 85 },
            { name: 'Bitki çayı', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 15,
      title: 'Gün 15 - Üçüncü Hafta 🌟',
      totalCalories: 1900,
      note: 'Nordic alışkanlıklar artık doğal geliyor.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf ezmesi', portion: '200g', calories: 180 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Fındık', portion: '20g', calories: 130 },
            { name: 'Tarçın', portion: 'bir tutam', calories: 0 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Ringa turşusu', portion: '150g', calories: 250 },
            { name: 'Patates salatası', portion: '150g', calories: 150 },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Yeşil salata', portion: '80g', calories: 20 },
            { name: 'Kanola yağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Arpa pilavı', portion: '150g', calories: 180 },
            { name: 'Brokoli', portion: '100g', calories: 35 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Skyr', portion: '150g', calories: 100 },
            { name: 'Ahududu', portion: '100g', calories: 55 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
          ],
        },
      ],
    },
    {
      day: 16,
      title: 'Gün 16 - Lif Zenginliği 🌾',
      totalCalories: 1920,
      note: 'Tam tahıllar ve sebzeler ile sindirim desteği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Arpa lapası', portion: '200g', calories: 190 },
            { name: 'Böğürtlen', portion: '100g', calories: 45 },
            { name: 'Keten tohumu', portion: '2 yemek kaşığı', calories: 110 },
            { name: 'Badem', portion: '15g', calories: 85 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 180 },
            { name: 'Tavuk salatası', portion: '150g', calories: 200 },
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Somon (fırın)', portion: '150g', calories: 280 },
            { name: 'Kök sebze', portion: '200g', calories: 150 },
            { name: 'Ispanak', portion: '80g', calories: 20 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Humus', portion: '50g', calories: 100 },
            { name: 'Havuç', portion: '80g', calories: 35 },
            { name: 'Fındık', portion: '10g', calories: 65 },
          ],
        },
      ],
    },
    {
      day: 17,
      title: 'Gün 17 - Omega-3 Gücü 🐟',
      totalCalories: 1900,
      note: 'Yağlı balık ve keten tohumu ile omega-3 desteği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Füme uskumru', portion: '60g', calories: 120 },
            { name: 'Yumurta', portion: '1 adet', calories: 70 },
            { name: 'Domates', portion: '1 küçük', calories: 15 },
            { name: 'Keten tohumu', portion: '1 yemek kaşığı', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Somon bowl', portion: '300g', calories: 380 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Ringa balığı', portion: '150g', calories: 250 },
            { name: 'Patates (haşlama)', portion: '150g', calories: 130 },
            { name: 'Lahana salatası', portion: '100g', calories: 35 },
            { name: 'Pancar turşusu', portion: '50g', calories: 25 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Ceviz', portion: '30g', calories: 200, note: 'ALA omega-3' },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 18,
      title: 'Gün 18 - Bitkisel Protein 🌿',
      totalCalories: 1920,
      note: 'Baklagiller ve kuruyemişler ile protein desteği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf ezmesi', portion: '200g', calories: 180 },
            { name: 'Badem', portion: '25g', calories: 145 },
            { name: 'Elma', portion: '1 küçük', calories: 75 },
            { name: 'Skyr', portion: '100g', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Bezelye çorbası', portion: '300ml', calories: 180, note: 'Nordic klasik' },
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Tavuk göğsü', portion: '80g', calories: 130 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Mercimek güveç', portion: '200g', calories: 220 },
            { name: 'Kök sebze', portion: '150g', calories: 120 },
            { name: 'Arpa pilavı', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '80g', calories: 20 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Humus', portion: '60g', calories: 120 },
            { name: 'Havuç', portion: '100g', calories: 40 },
            { name: 'Ahududu', portion: '100g', calories: 55 },
            { name: 'Fındık', portion: '15g', calories: 95 },
          ],
        },
      ],
    },
    {
      day: 19,
      title: 'Gün 19 - Mutfak Çeşitliliği 🍽️',
      totalCalories: 1900,
      note: 'Nordic mutfağının farklı tatları.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Pannkakor (İsveç pankek)', portion: '2 adet', calories: 200, note: 'Tam buğday unu' },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Skyr', portion: '100g', calories: 70 },
            { name: 'Fındık', portion: '15g', calories: 95 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Smørrebrød', portion: '2 adet', calories: 350, note: 'Açık sandviç' },
            { name: 'Lahana turşusu', portion: '50g', calories: 20 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Köttbullar (İsveç köfte)', portion: '150g', calories: 280, note: 'Az yağlı' },
            { name: 'Patates püresi', portion: '150g', calories: 150 },
            { name: 'Lingonberry sos', portion: '30g', calories: 50 },
            { name: 'Brokoli', portion: '80g', calories: 30 },
            { name: 'Kanola yağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Armut', portion: '1 orta', calories: 100 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Böğürtlen', portion: '80g', calories: 35 },
          ],
        },
      ],
    },
    {
      day: 20,
      title: 'Gün 20 - Mental Sağlık 🧠',
      totalCalories: 1920,
      note: 'Ruh hali ve beyin sağlığı için besinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf lapası', portion: '200g', calories: 180 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Somon salatası', portion: '250g', calories: 350, note: 'Omega-3 - ruh hali için' },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Tatlı patates', portion: '150g', calories: 130, note: 'Kompleks karbonhidrat' },
            { name: 'Ispanak', portion: '100g', calories: 25, note: 'Folat' },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Skyr', portion: '150g', calories: 100 },
            { name: 'Ahududu', portion: '80g', calories: 45 },
            { name: 'Badem', portion: '20g', calories: 115 },
            { name: 'Bitki çayı', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 21,
      title: 'Gün 21 - Üç Hafta Başarısı! 🏆',
      totalCalories: 2000,
      note: 'Üç haftayı tamamladık! Nordic yaşam tarzı sizinle.',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 520,
          foods: [
            { name: 'İskandinav kahvaltı tabağı', portion: '350g', calories: 400 },
            { name: 'Berry karışımı', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 340 },
            { name: 'Patates salatası', portion: '150g', calories: 150 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Hindi but', portion: '150g', calories: 280 },
            { name: 'Kök sebze fırın', portion: '200g', calories: 150 },
            { name: 'Lingonberry sos', portion: '40g', calories: 65 },
            { name: 'Ispanak salatası', portion: '80g', calories: 20 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Berry parfait', portion: '200g', calories: 180 },
            { name: 'Badem', portion: '15g', calories: 85 },
            { name: 'Bitki çayı', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 22,
      title: 'Gün 22 - Son Hafta! 🚀',
      totalCalories: 1900,
      note: 'Son hafta başladı - harika ilerleme!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Müsli (Nordic)', portion: '60g', calories: 220 },
            { name: 'Kefir', portion: '150ml', calories: 75 },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Keten tohumu', portion: '1 yemek kaşığı', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Uskumru salatası', portion: '200g', calories: 300 },
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Arpa pilavı', portion: '150g', calories: 180 },
            { name: 'Brokoli', portion: '100g', calories: 35 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Skyr', portion: '100g', calories: 70 },
          ],
        },
      ],
    },
    {
      day: 23,
      title: 'Gün 23 - Enerji Günü ⚡',
      totalCalories: 1920,
      note: 'Kompleks karbonhidratlar ile gün boyu enerji.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf ezmesi', portion: '200g', calories: 180 },
            { name: 'Muz', portion: '1 orta', calories: 105 },
            { name: 'Fındık', portion: '20g', calories: 130 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Somon wrap', portion: '1 adet', calories: 380 },
            { name: 'Lahana salatası', portion: '100g', calories: 35 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Alabalık (fırın)', portion: '150g', calories: 200 },
            { name: 'Tatlı patates', portion: '200g', calories: 180 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Armut', portion: '1 orta', calories: 100 },
            { name: 'Badem', portion: '25g', calories: 145 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 24,
      title: 'Gün 24 - Kalp Sağlığı ❤️',
      totalCalories: 1900,
      note: 'Kardiyovasküler sağlık için optimize edilmiş menü.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yumurta', portion: '1 adet', calories: 70 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Somon salatası', portion: '250g', calories: 350 },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Hindi göğsü', portion: '150g', calories: 250 },
            { name: 'Kök sebze fırın', portion: '200g', calories: 150 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Skyr', portion: '100g', calories: 70 },
          ],
        },
      ],
    },
    {
      day: 25,
      title: 'Gün 25 - Detoks Günü 🌱',
      totalCalories: 1850,
      note: 'Hafif ve temizleyici besinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Yeşil smoothie', portion: '400ml', calories: 220, note: 'Ispanak, elma, zencefil' },
            { name: 'Çavdar tost', portion: '1 dilim', calories: 80 },
            { name: 'Badem', portion: '15g', calories: 85 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 540,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 150 },
            { name: 'Tavuk salatası', portion: '200g', calories: 250 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Buharda balık', portion: '150g', calories: 200 },
            { name: 'Buharda sebze', portion: '200g', calories: 100 },
            { name: 'Arpa pilavı', portion: '150g', calories: 180 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Salatalık + havuç', portion: '150g', calories: 50 },
            { name: 'Humus', portion: '50g', calories: 100 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Zencefilli çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 26,
      title: 'Gün 26 - Güç Günü 💪',
      totalCalories: 1920,
      note: 'Yağsız protein ile kas desteği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yumurta', portion: '2 adet', calories: 140 },
            { name: 'Füme somon', portion: '60g', calories: 120 },
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 küçük', calories: 15 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '180g', calories: 300 },
            { name: 'Bezelye püresi', portion: '150g', calories: 150 },
            { name: 'Yeşil salata', portion: '80g', calories: 20 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Uskumru (ızgara)', portion: '150g', calories: 300 },
            { name: 'Patates (haşlama)', portion: '150g', calories: 130 },
            { name: 'Brokoli', portion: '100g', calories: 35 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Skyr', portion: '150g', calories: 100 },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Badem', portion: '20g', calories: 115 },
          ],
        },
      ],
    },
    {
      day: 27,
      title: 'Gün 27 - Antioksidan Gücü 🫐',
      totalCalories: 1900,
      note: 'Berry ve sebzeler ile maksimum antioksidan.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Berry bowl', portion: '350g', calories: 280, note: 'Yulaf, berry, yoğurt' },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Somon bowl', portion: '300g', calories: 380 },
            { name: 'Pancar', portion: '80g', calories: 35 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Mor lahana salatası', portion: '150g', calories: 50 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Ahududu', portion: '100g', calories: 55 },
            { name: 'Skyr', portion: '100g', calories: 70 },
            { name: 'Fındık', portion: '20g', calories: 130 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 28,
      title: 'Gün 28 - Dördüncü Hafta Sonu 🎊',
      totalCalories: 2000,
      note: 'Son iki gün! Nordic yaşam tarzını benimsemeye çok yakınsınız.',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 520,
          foods: [
            { name: 'İskandinav brunch tabağı', portion: '400g', calories: 420 },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Ceviz', portion: '10g', calories: 65 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Ringa salatası', portion: '200g', calories: 280 },
            { name: 'Patates', portion: '150g', calories: 130 },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 340 },
            { name: 'Kök sebze', portion: '200g', calories: 150 },
            { name: 'Ispanak', portion: '80g', calories: 20 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Berry parfait', portion: '200g', calories: 180 },
            { name: 'Badem', portion: '15g', calories: 85 },
            { name: 'Bitki çayı', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 29,
      title: 'Gün 29 - Son Düzlük 🏁',
      totalCalories: 1920,
      note: 'Yarın son gün! Harika bir yolculuk.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf ezmesi', portion: '200g', calories: 180 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Fındık', portion: '20g', calories: 130 },
            { name: 'Skyr', portion: '100g', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Tavuklu salata', portion: '250g', calories: 300 },
            { name: 'Çavdar ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Uskumru (fırın)', portion: '150g', calories: 300 },
            { name: 'Arpa pilavı', portion: '150g', calories: 180 },
            { name: 'Lahana salatası', portion: '100g', calories: 35 },
            { name: 'Kanola yağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Böğürtlen', portion: '80g', calories: 35 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 30,
      title: 'Gün 30 - TAMAMLANDI! ❄️🏆🎉',
      totalCalories: 2100,
      note: '30 günü başarıyla tamamladınız! Nordic yaşam tarzı artık sizinle!',
      meals: [
        {
          type: 'breakfast',
          name: 'Şampiyon Kahvaltısı',
          totalCalories: 550,
          foods: [
            { name: 'İskandinav kahvaltı ziyafeti', portion: '400g', calories: 420, note: 'Somon, yumurta, çavdar, sebze' },
            { name: 'Berry karışımı', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Zafer Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Gravlax somon', portion: '150g', calories: 280, note: 'Geleneksel İskandinav' },
            { name: 'Patates salatası', portion: '150g', calories: 150 },
            { name: 'Lahana salatası', portion: '100g', calories: 35 },
            { name: 'Çavdar ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Dereotu sos', portion: '30ml', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Kutlama Akşam Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'Fırında somon', portion: '200g', calories: 380 },
            { name: 'Kök sebze fırın', portion: '200g', calories: 150 },
            { name: 'Ispanak', portion: '80g', calories: 20 },
            { name: 'Lingonberry sos', portion: '40g', calories: 65 },
            { name: 'Kanola yağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Kutlama Tatlısı',
          totalCalories: 300,
          foods: [
            { name: 'Berry parfait deluxe', portion: '250g', calories: 220, note: 'Skyr, granola, tüm berryler' },
            { name: 'Ceviz', portion: '15g', calories: 100 },
            { name: 'Bitki çayı', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 BEKLENEN SONUÇLAR (30 Günde)

⏳ Yaşam Beklentisi:
• Uzun vadede 1.8-4.1 yıl ek yaşam süresi potansiyeli
• Baklagil, kuruyemiş ve tam tahıl artışı ile maksimum fayda

❤️ Kardiyovasküler Sağlık:
• Kolesterol: %5-10 düşüş
• Kan basıncı: 3-5 mmHg azalma
• İnsülin direnci: İyileşme

⚖️ Kilo Kontrolü:
• Toplam: 2-4 kg kayıp
• Bel çevresi: 3-5 cm azalma
• Sürdürülebilir kilo kontrolü

🧠 Mental Sağlık:
• Ruh hali: İyileşme
• Enerji: Artış
• Stres: Azalma
• Depresyon belirtileri: Düşüş

🔬 Diğer Faydalar:
• Tip 2 diyabet riski: Azalma
• İltihap belirteçleri: Düşüş
• Bağırsak sağlığı: İyileşme

🌍 Yaşam Tarzı:
• Sürdürülebilir beslenme alışkanlığı
• Yerel ve mevsimsel gıda tercihi
• Açık hava aktivitesi artışı

⚠️ Önemli:
• Sonuçlar kişiye göre değişebilir
• Egzersiz ile kombine edildiğinde etkiler artar
• Nordic yaşam tarzı bütünsel yaklaşım gerektirir`,

    en: `📊 EXPECTED RESULTS (In 30 Days)

⏳ Life Expectancy:
• Long-term potential for 1.8-4.1 additional years of life
• Maximum benefit with increased legumes, nuts, and whole grains

❤️ Cardiovascular Health:
• Cholesterol: 5-10% decrease
• Blood pressure: 3-5 mmHg reduction
• Insulin resistance: Improvement

⚖️ Weight Control:
• Total: 2-4 kg loss
• Waist circumference: 3-5 cm reduction
• Sustainable weight control

🧠 Mental Health:
• Mood: Improvement
• Energy: Increase
• Stress: Decrease
• Depression symptoms: Reduction

🔬 Other Benefits:
• Type 2 diabetes risk: Decrease
• Inflammation markers: Reduction
• Gut health: Improvement

🌍 Lifestyle:
• Sustainable eating habits
• Local and seasonal food preference
• Increased outdoor activity

⚠️ Important:
• Results may vary by individual
• Effects increase when combined with exercise
• Nordic lifestyle requires holistic approach`,
  },
};
