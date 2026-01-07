import { Diet } from '../types';

export const dashDiet30: Diet = {
  id: 'dash',
  name: {
    tr: 'DASH Diyeti',
    en: 'DASH Diet',
  },
  emoji: '❤️',
  isPremium: true,
  duration: 30,
  difficulty: 'easy',

  description: {
    tr: 'DASH (Dietary Approaches to Stop Hypertension - Hipertansiyonu Durdurmak İçin Beslenme Yaklaşımları), kan basıncını düşürmek için bilimsel olarak kanıtlanmış en etkili beslenme programıdır. Sebze, meyve, tam tahıllar, az yağlı süt ürünleri ve yağsız proteinlere dayanan bu diyet, sodyum alımını sınırlandırarak kalp sağlığını korur.',
    en: 'DASH (Dietary Approaches to Stop Hypertension) is the most scientifically proven diet to lower blood pressure. Based on vegetables, fruits, whole grains, low-fat dairy, and lean proteins, this diet protects heart health by limiting sodium intake.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 NIH Klinik Araştırmaları:
• DASH diyeti sistolik kan basıncını 5-11 mmHg düşürür
• Hipertansiyon hastalarında 30 gün içinde belirgin düşüş
• Düşük sodyumlu DASH ile 11 mmHg'ye kadar düşüş mümkün

💓 Kardiyovasküler Faydalar:
• LDL kolesterol düşüşü
• Trigliserit seviyelerinde azalma
• Damar esnekliğinde iyileşme
• Kalp krizi ve inme riskinde %20-25 azalma

🧠 Ek Sağlık Etkileri:
• Diyabet riskinde azalma
• Kemik sağlığını destekler
• Böbrek taşı riskini azaltır
• Bilişsel fonksiyonları korur

📈 Mayo Clinic & Mount Sinai Bulguları:
• Günde 2.300mg altı sodyum hedefi
• İdeal: 1.500mg/gün
• Potasyum, magnezyum, kalsiyum artışı
• Lifli besinlerle bağırsak sağlığı

⚠️ Önemli Not:
• İlaç kullanıyorsanız doktorunuza danışın
• Potasyum yüksekliği olan hastalar dikkatli olmalı`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 NIH Clinical Studies:
• DASH diet lowers systolic blood pressure by 5-11 mmHg
• Significant reduction in hypertensive patients within 30 days
• Up to 11 mmHg reduction possible with low-sodium DASH

💓 Cardiovascular Benefits:
• LDL cholesterol reduction
• Decrease in triglyceride levels
• Improved vascular flexibility
• 20-25% reduction in heart attack and stroke risk

🧠 Additional Health Effects:
• Reduced diabetes risk
• Supports bone health
• Reduces kidney stone risk
• Protects cognitive functions

📈 Mayo Clinic & Mount Sinai Findings:
• Daily sodium target under 2,300mg
• Ideal: 1,500mg/day
• Increased potassium, magnesium, calcium
• Gut health with fiber-rich foods

⚠️ Important Note:
• Consult your doctor if taking medications
• Patients with high potassium should be careful`,
  },

  benefits: {
    tr: [
      '❤️ Kan basıncını 5-11 mmHg düşürür',
      '🫀 Kalp hastalığı riskini %20-25 azaltır',
      '📉 Kötü kolesterol (LDL) seviyelerini düşürür',
      '🩺 Tip 2 diyabet riskini azaltır',
      '🦴 Kemik sağlığını destekler - kalsiyum zengin',
      '⚖️ Sağlıklı kilo kontrolü sağlar',
      '🧠 Bilişsel fonksiyonları korur',
      '💪 Kas sağlığını destekler - potasyum zengin',
      '🌿 Bağırsak sağlığını iyileştirir',
      '😴 Uyku kalitesini artırır',
    ],
    en: [
      '❤️ Lowers blood pressure by 5-11 mmHg',
      '🫀 Reduces heart disease risk by 20-25%',
      '📉 Lowers bad cholesterol (LDL) levels',
      '🩺 Reduces Type 2 diabetes risk',
      '🦴 Supports bone health - calcium rich',
      '⚖️ Provides healthy weight control',
      '🧠 Protects cognitive functions',
      '💪 Supports muscle health - potassium rich',
      '🌿 Improves gut health',
      '😴 Improves sleep quality',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Böbrek hastalığı olanlar potasyum alımına dikkat etmeli',
      '💊 Tansiyon ilacı kullananlar doktora danışmalı',
      '🧂 Ani sodyum kısıtlaması baş dönmesi yapabilir',
      '💰 Taze meyve-sebze maliyeti yüksek olabilir',
      '🥛 Laktoz intoleransı olanlar süt ürünlerine dikkat',
      '⏰ İlk hafta adaptasyon dönemi yaşanabilir',
    ],
    en: [
      '⚠️ Those with kidney disease should watch potassium intake',
      '💊 Those on blood pressure medication should consult a doctor',
      '🧂 Sudden sodium restriction may cause dizziness',
      '💰 Fresh fruit and vegetable costs may be high',
      '🥛 Those with lactose intolerance should be careful with dairy',
      '⏰ Adaptation period may be experienced in the first week',
    ],
  },

  allowedFoods: {
    tr: [
      '🥬 SEBZELER (Günde 4-5 porsiyon):',
      '🥬 Yeşil yapraklılar: Ispanak, marul, roka',
      '🥦 Brokoli, karnabahar, lahana',
      '🥕 Havuç, pancar, kabak',
      '🍅 Domates, biber, patlıcan',
      '',
      '🍎 MEYVELER (Günde 4-5 porsiyon):',
      '🍌 Muz (potasyum deposu)',
      '🍊 Portakal, greyfurt',
      '🍎 Elma, armut',
      '🫐 Çilek, yaban mersini',
      '',
      '🌾 TAM TAHILLAR (Günde 6-8 porsiyon):',
      '🌾 Tam buğday ekmeği',
      '🥣 Yulaf ezmesi',
      '🍚 Esmer pirinç',
      '🌾 Bulgur, kinoa',
      '',
      '🥛 AZ YAĞLI SÜT ÜRÜNLERİ (Günde 2-3 porsiyon):',
      '🥛 Yağsız süt',
      '🥛 Az yağlı yoğurt',
      '🧀 Az yağlı peynir',
      '',
      '🍗 YAĞSIZ PROTEİNLER (Günde ≤170g):',
      '🐟 Balık (somon, uskumru)',
      '🍗 Tavuk göğsü (derisiz)',
      '🥩 Yağsız kırmızı et',
      '🥚 Yumurta',
      '',
      '🥜 KURUYEMIŞ VE BAKLAGİLLER (Haftada 4-5 porsiyon):',
      '🥜 Badem, ceviz, fındık',
      '🫘 Fasulye, mercimek, nohut',
    ],
    en: [
      '🥬 VEGETABLES (4-5 servings/day):',
      '🥬 Leafy greens: Spinach, lettuce, arugula',
      '🥦 Broccoli, cauliflower, cabbage',
      '🥕 Carrots, beets, zucchini',
      '🍅 Tomatoes, peppers, eggplant',
      '',
      '🍎 FRUITS (4-5 servings/day):',
      '🍌 Banana (potassium powerhouse)',
      '🍊 Orange, grapefruit',
      '🍎 Apple, pear',
      '🫐 Strawberries, blueberries',
      '',
      '🌾 WHOLE GRAINS (6-8 servings/day):',
      '🌾 Whole wheat bread',
      '🥣 Oatmeal',
      '🍚 Brown rice',
      '🌾 Bulgur, quinoa',
      '',
      '🥛 LOW-FAT DAIRY (2-3 servings/day):',
      '🥛 Skim milk',
      '🥛 Low-fat yogurt',
      '🧀 Low-fat cheese',
      '',
      '🍗 LEAN PROTEINS (≤6oz/day):',
      '🐟 Fish (salmon, mackerel)',
      '🍗 Chicken breast (skinless)',
      '🥩 Lean red meat',
      '🥚 Eggs',
      '',
      '🥜 NUTS AND LEGUMES (4-5 servings/week):',
      '🥜 Almonds, walnuts, hazelnuts',
      '🫘 Beans, lentils, chickpeas',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🧂 YÜKSEK SODYUMLU GIDALAR:',
      '🧂 Tuzlu atıştırmalıklar (cips, kraker)',
      '🥫 Konserve gıdalar',
      '🌭 İşlenmiş etler (sucuk, sosis, salam)',
      '🍟 Fast food',
      '',
      '🍬 ŞEKER VE TATLILAR (Haftada ≤5):',
      '🍬 Şekerli içecekler',
      '🍰 Pastalar, kekler',
      '🍪 Bisküviler',
      '',
      '🧈 DOYMUŞ YAĞLAR:',
      '🧈 Tereyağı',
      '🥓 Yağlı etler',
      '🧀 Tam yağlı peynirler',
      '',
      '🚫 DİĞER KISITLAMALAR:',
      '🍺 Alkol (sınırlı)',
      '☕ Aşırı kafein',
    ],
    en: [
      '🧂 HIGH SODIUM FOODS:',
      '🧂 Salty snacks (chips, crackers)',
      '🥫 Canned foods',
      '🌭 Processed meats (turkey bacon, sausage, salami)',
      '🍟 Fast food',
      '',
      '🍬 SUGAR AND SWEETS (≤5/week):',
      '🍬 Sugary drinks',
      '🍰 Cakes, pastries',
      '🍪 Cookies',
      '',
      '🧈 SATURATED FATS:',
      '🧈 Butter',
      '🥓 Fatty meats',
      '🧀 Full-fat cheeses',
      '',
      '🚫 OTHER RESTRICTIONS:',
      '🍺 Alcohol (limited)',
      '☕ Excessive caffeine',
    ],
  },

  exercises: [
    {
      name: 'Tempolu Yürüyüş / Brisk Walking',
      duration: '30-45 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Kalp sağlığı için ideal, kan basıncını düşürür.',
    },
    {
      name: 'Yüzme / Swimming',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 3-4 kez / 3-4 times a week',
      note: 'Düşük etkili kardiyovasküler egzersiz.',
    },
    {
      name: 'Bisiklet / Cycling',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 3-4 kez / 3-4 times a week',
      note: 'Açık havada veya sabit bisiklet.',
    },
    {
      name: 'Yoga / Yoga',
      duration: '20-30 dakika / minutes',
      frequency: 'Haftada 3-4 kez / 3-4 times a week',
      note: 'Stresi azaltır, kan basıncını dengeler.',
    },
    {
      name: 'Hafif Ağırlık Antrenmanı / Light Weight Training',
      duration: '20-30 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Kas kütlesini korur, metabolizmayı hızlandırır.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - DASH Yolculuğu Başlıyor 💓',
      totalCalories: 2000,
      note: 'Sodyum hedefi: 2300mg altı. Bol su için!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf ezmesi (süt ile)', portion: '1 kase (200g)', calories: 180, note: 'Yağsız süt ile' },
            { name: 'Muz', portion: '1 orta boy', calories: 105, note: 'Potasyum kaynağı' },
            { name: 'Kuru üzüm', portion: '2 yemek kaşığı', calories: 60 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
            { name: 'Portakal suyu (taze)', portion: '1 bardak', calories: 110 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '120g', calories: 200 },
            { name: 'Bulgur pilavı', portion: '150g', calories: 180 },
            { name: 'Karışık yeşil salata', portion: '200g', calories: 50, note: 'Marul, domates, salatalık' },
            { name: 'Zeytinyağı-limon sos', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Tam buğday ekmeği', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280, note: 'Omega-3 kaynağı' },
            { name: 'Fırında patates', portion: '1 orta boy', calories: 160 },
            { name: 'Buharda brokoli', portion: '150g', calories: 55 },
            { name: 'Az yağlı yoğurt', portion: '150g', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 400,
          foods: [
            { name: 'Elma', portion: '1 orta boy', calories: 95 },
            { name: 'Havuç çubukları + humus', portion: '100g + 30g', calories: 120 },
            { name: 'Az yağlı süt', portion: '1 bardak', calories: 100 },
            { name: 'Ceviz', portion: '5 adet', calories: 85 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Potasyum Günü 🍌',
      totalCalories: 1950,
      note: 'Potasyum açısından zengin besinler - tansiyon dostu!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Fıstık ezmesi', portion: '2 yemek kaşığı', calories: 190, note: 'Tuzsuz' },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Yağsız süt', portion: '1 bardak', calories: 90 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Mercimek çorbası', portion: '1 kase (300ml)', calories: 180, note: 'Tuzsuz ev yapımı' },
            { name: 'Ton balıklı salata', portion: '200g', calories: 250, note: 'Suda ton, bol yeşillik' },
            { name: 'Tam buğday kraker', portion: '6 adet', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 620,
          foods: [
            { name: 'Fırında hindi göğsü', portion: '150g', calories: 250 },
            { name: 'Tatlı patates püresi', portion: '150g', calories: 130, note: 'Potasyum deposu' },
            { name: 'Kuşkonmaz (buhar)', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 330,
          foods: [
            { name: 'Yoğurt (az yağlı)', portion: '200g', calories: 120 },
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Portakal', portion: '1 adet', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Lif Zenginliği 🌾',
      totalCalories: 2000,
      note: 'Tam tahıllar ve baklagiller ile lif alımı artırılıyor.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Kepekli gevrek', portion: '1 kase (45g)', calories: 160, note: 'Şekersiz' },
            { name: 'Yağsız süt', portion: '200ml', calories: 70 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Nohut salatası', portion: '200g', calories: 280, note: 'Nohut, domates, salatalık, soğan' },
            { name: 'Izgara tavuk şerit', portion: '100g', calories: 165 },
            { name: 'Tam buğday pide', portion: '1/2 adet', calories: 85 },
            { name: 'Limon-zeytinyağı sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında levrek', portion: '150g', calories: 200 },
            { name: 'Kinoa pilavı', portion: '150g', calories: 180, note: 'Sebzeli' },
            { name: 'Izgara kabak ve biber', portion: '150g', calories: 60 },
            { name: 'Roka salatası', portion: '80g', calories: 20 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 380,
          foods: [
            { name: 'Armut', portion: '1 orta boy', calories: 100 },
            { name: 'Az yağlı lor peyniri', portion: '100g', calories: 100 },
            { name: 'Havuç', portion: '2 orta boy', calories: 50 },
            { name: 'Ceviz', portion: '6 adet', calories: 130 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Magnezyum Desteği 🥬',
      totalCalories: 1980,
      note: 'Yeşil yapraklı sebzeler ve kuruyemişler ile magnezyum.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Ispanaklı omlet', portion: '2 yumurta + 50g ıspanak', calories: 220 },
            { name: 'Tam buğday ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta boy', calories: 25 },
            { name: 'Az yağlı beyaz peynir', portion: '30g', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Tavuklu sebze çorbası', portion: '300ml', calories: 180, note: 'Ev yapımı, tuzsuz' },
            { name: 'Kuru fasulye', portion: '150g', calories: 220, note: 'Zeytinyağlı' },
            { name: 'Esmer pirinç', portion: '80g', calories: 90 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara dana biftek', portion: '120g', calories: 280, note: 'Yağsız kesim' },
            { name: 'Fırında karışık sebze', portion: '200g', calories: 120, note: 'Kabak, biber, patlıcan' },
            { name: 'Haşlanmış patates', portion: '1 orta boy', calories: 130 },
            { name: 'Ispanak salatası', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 370,
          foods: [
            { name: 'Yoğurt + granola', portion: '150g + 30g', calories: 200, note: 'Az yağlı yoğurt' },
            { name: 'Muz', portion: '1 küçük', calories: 90 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Omega-3 Festivali 🐟',
      totalCalories: 2000,
      note: 'Kalp sağlığı için yağlı balık ve sağlıklı yağlar.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaflı smoothie bowl', portion: '300g', calories: 280, note: 'Yulaf, muz, yoğurt, meyve' },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30, note: 'Opsiyonel' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Somon burger (ızgara)', portion: '150g', calories: 300, note: 'Tam buğday ekmekte' },
            { name: 'Tam buğday sandviç ekmeği', portion: '1 adet', calories: 150 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Uskumru (fırın)', portion: '150g', calories: 300, note: 'Omega-3 deposu' },
            { name: 'Bulgur pilavı', portion: '150g', calories: 180 },
            { name: 'Buharda brokoli', portion: '150g', calories: 55 },
            { name: 'Havuç salatası', portion: '100g', calories: 45 },
            { name: 'Zeytinyağı', portion: '1/2 yemek kaşığı', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 370,
          foods: [
            { name: 'Elma', portion: '1 orta boy', calories: 95 },
            { name: 'Az yağlı lor peyniri', portion: '80g', calories: 80 },
            { name: 'Tam buğday kraker', portion: '4 adet', calories: 70 },
            { name: 'Portakal', portion: '1 adet', calories: 60 },
            { name: 'Fındık', portion: '10 adet', calories: 65 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Kalsiyum Günü 🥛',
      totalCalories: 1950,
      note: 'Kemik sağlığı için az yağlı süt ürünleri.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 430,
          foods: [
            { name: 'Yulaf lapası (süt ile)', portion: '200g', calories: 200 },
            { name: 'Yağsız süt', portion: '200ml', calories: 70 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Tarçın', portion: 'bir tutam', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Peynirli sandviç', portion: '1 adet', calories: 350, note: 'Az yağlı peynir, tam buğday ekmek' },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Domates çorbası', portion: '200ml', calories: 100, note: 'Ev yapımı, kremasız' },
            { name: 'Ayran (az yağlı)', portion: '200ml', calories: 70 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 620,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Yoğurtlu kabak', portion: '200g', calories: 120 },
            { name: 'Bulgur pilavı', portion: '150g', calories: 180 },
            { name: 'Yeşil biber', portion: '2 adet', calories: 20 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 340,
          foods: [
            { name: 'Yoğurt', portion: '200g', calories: 120, note: 'Az yağlı' },
            { name: 'Muz', portion: '1 küçük', calories: 90 },
            { name: 'Kuru kayısı', portion: '4 adet', calories: 50 },
            { name: 'Ceviz', portion: '4 adet', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - Hafta Sonu Şöleni 🎉',
      totalCalories: 2050,
      note: 'İlk haftayı başarıyla tamamladınız! Sağlıklı ama lezzetli.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Brunch)',
          totalCalories: 520,
          foods: [
            { name: 'Sebzeli frittata', portion: '200g', calories: 280, note: '2 yumurta, mantar, ıspanak' },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Portakal suyu', portion: '200ml', calories: 90 },
            { name: 'Kavun', portion: '150g', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara balık (çipura)', portion: '180g', calories: 250 },
            { name: 'Sebzeli pilav', portion: '150g', calories: 200 },
            { name: 'Akdeniz salatası', portion: '200g', calories: 100, note: 'Domates, salatalık, zeytin' },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında tavuk but', portion: '150g', calories: 280, note: 'Derisiz' },
            { name: 'Fırında karışık sebze', portion: '200g', calories: 100 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Az yağlı cacık', portion: '100g', calories: 60 },
            { name: 'Maydanoz', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler + Tatlı',
          totalCalories: 350,
          foods: [
            { name: 'Meyve salatası', portion: '200g', calories: 120, note: 'Mevsim meyveleri' },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Graham kraker', portion: '2 adet', calories: 60 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
      ],
    },
    {
      day: 8,
      title: 'Gün 8 - Yeni Hafta, Yeni Enerji 💪',
      totalCalories: 2000,
      note: 'İkinci hafta başladı. Kan basıncınız düşmeye başlıyor!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Fındık', portion: '15 adet', calories: 100 },
            { name: 'Yağsız süt', portion: '200ml', calories: 70 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Mercimek köftesi', portion: '6 adet', calories: 250, note: 'Zeytinyağlı, soğanlı' },
            { name: 'Bulgur salatası', portion: '150g', calories: 180 },
            { name: 'Ayran', portion: '200ml', calories: 70 },
            { name: 'Marul', portion: '100g', calories: 15 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 610,
          foods: [
            { name: 'Fırında alabalık', portion: '180g', calories: 280 },
            { name: 'Haşlanmış patates', portion: '150g', calories: 130 },
            { name: 'Buharda fasulye', portion: '150g', calories: 45 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Elma', portion: '1 orta boy', calories: 95 },
            { name: 'Lor peyniri', portion: '80g', calories: 80 },
            { name: 'Havuç çubukları', portion: '100g', calories: 40 },
            { name: 'Ceviz', portion: '6 adet', calories: 130 },
          ],
        },
      ],
    },
    {
      day: 9,
      title: 'Gün 9 - Baklagil Gücü 🫘',
      totalCalories: 1980,
      note: 'Baklagiller ile protein ve lif desteği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 440,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday ekmeği', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Zeytin', portion: '8 adet', calories: 45, note: 'Tuzsuz veya az tuzlu' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Barbunya pilaki', portion: '200g', calories: 280, note: 'Zeytinyağlı' },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Roka salatası', portion: '100g', calories: 25 },
            { name: 'Tam buğday ekmeği', portion: '1 dilim', calories: 80 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 590,
          foods: [
            { name: 'Tavuk sote', portion: '150g', calories: 280, note: 'Sebzeli' },
            { name: 'Nohut haşlama', portion: '100g', calories: 160 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 370,
          foods: [
            { name: 'Yoğurt', portion: '200g', calories: 120 },
            { name: 'Muz', portion: '1 orta', calories: 105 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Taze sıkılmış portakal suyu', portion: '100ml', calories: 45 },
          ],
        },
      ],
    },
    {
      day: 10,
      title: 'Gün 10 - Antioksidan Patlaması 🫐',
      totalCalories: 2000,
      note: 'Renkli sebze ve meyveler ile antioksidan desteği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Smoothie', portion: '400ml', calories: 280, note: 'Ispanak, muz, yaban mersini, yoğurt' },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Kinoa salatası', portion: '250g', calories: 300, note: 'Kinoa, domates, salatalık, nane' },
            { name: 'Izgara tavuk', portion: '100g', calories: 165 },
            { name: 'Nar', portion: '1/2 adet', calories: 70 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara somon', portion: '150g', calories: 280 },
            { name: 'Pancar salatası', portion: '150g', calories: 80, note: 'Yoğurtlu' },
            { name: 'Bulgur pilavı', portion: '150g', calories: 180 },
            { name: 'Marul', portion: '80g', calories: 15 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 360,
          foods: [
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Fındık', portion: '15 adet', calories: 100 },
            { name: 'Kivi', portion: '2 adet', calories: 90 },
          ],
        },
      ],
    },
    {
      day: 11,
      title: 'Gün 11 - Sodyum Bilinçli Gün 🧂',
      totalCalories: 1950,
      note: 'Ekstra düşük sodyum hedefi: 1500mg altı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180, note: 'Tuzsuz, su ile' },
            { name: 'Taze meyve', portion: '150g', calories: 80, note: 'Çilek, muz dilim' },
            { name: 'Yağsız süt', portion: '200ml', calories: 70 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 540,
          foods: [
            { name: 'Ev yapımı sebze çorbası', portion: '300ml', calories: 120, note: 'Tuzsuz' },
            { name: 'Tavuklu salata', portion: '250g', calories: 280 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Limon-zeytinyağı sos', portion: '1 yemek kaşığı', calories: 60, note: 'Tuzsuz' },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında tavuk göğsü', portion: '150g', calories: 250, note: 'Baharatlı, tuzsuz' },
            { name: 'Fırında tatlı patates', portion: '200g', calories: 180 },
            { name: 'Buharda brokoli', portion: '150g', calories: 55 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 360,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Fıstık ezmesi (tuzsuz)', portion: '1 yemek kaşığı', calories: 95 },
            { name: 'Havuç', portion: '2 orta', calories: 50 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
        },
      ],
    },
    {
      day: 12,
      title: 'Gün 12 - Demir ve Protein 💪',
      totalCalories: 2000,
      note: 'Yağsız kırmızı et ile demir takviyesi.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Poşe yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Ispanak (sote)', portion: '80g', calories: 30 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Dana biftek (ızgara)', portion: '120g', calories: 280, note: 'Yağsız kesim' },
            { name: 'Esmer pirinç', portion: '150g', calories: 170 },
            { name: 'Karışık salata', portion: '150g', calories: 50 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 180 },
            { name: 'Izgara sebze', portion: '200g', calories: 100 },
            { name: 'Yoğurt', portion: '200g', calories: 120 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Nane-limon', portion: 'sos', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 380,
          foods: [
            { name: 'Muz', portion: '1 orta', calories: 105 },
            { name: 'Badem', portion: '20 adet', calories: 140 },
            { name: 'Kefir', portion: '200ml', calories: 100 },
            { name: 'Kuru incir', portion: '2 adet', calories: 45 },
          ],
        },
      ],
    },
    {
      day: 13,
      title: 'Gün 13 - Akdeniz Esintisi 🌊',
      totalCalories: 1980,
      note: 'DASH ve Akdeniz diyetinin en iyi kombinasyonu.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Beyaz peynir (az yağlı)', portion: '50g', calories: 80 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Zeytin', portion: '6 adet', calories: 35 },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Fırında levrek', portion: '150g', calories: 200 },
            { name: 'Bulgur pilavı', portion: '150g', calories: 180 },
            { name: 'Coban salata', portion: '150g', calories: 60, note: 'Az tuzlu' },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Marul', portion: '50g', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Yoğurtlu patlıcan', portion: '200g', calories: 150 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Roka salatası', portion: '80g', calories: 20 },
            { name: 'Nar ekşisi', portion: '1 tatlı kaşığı', calories: 15 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 360,
          foods: [
            { name: 'Yoğurt', portion: '200g', calories: 120 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Ceviz', portion: '6 adet', calories: 130 },
            { name: 'Armut', portion: '1 küçük', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 14,
      title: 'Gün 14 - İki Hafta Tamamlandı! 🎊',
      totalCalories: 2050,
      note: 'Yarı yola geldik! Kan basıncınızda fark etmelisiniz.',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 500,
          foods: [
            { name: 'Pancake (tam buğday)', portion: '2 adet', calories: 200, note: 'Şekersiz, muz püreli' },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Kahve/çay', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 340 },
            { name: 'Patates salatası', portion: '150g', calories: 150, note: 'Yoğurtlu, az mayonezli' },
            { name: 'Ispanak salatası', portion: '100g', calories: 30 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında hindi but', portion: '150g', calories: 280 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Bulgur pilavı', portion: '120g', calories: 145 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Nane', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler + Kutlama',
          totalCalories: 370,
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 120 },
            { name: 'Az yağlı dondurma', portion: '1 top', calories: 100, note: 'Haftada 1 kez izin!' },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 15,
      title: 'Gün 15 - Yeni Başlangıç 🌟',
      totalCalories: 2000,
      note: 'Üçüncü hafta! Vücudunuz artık adapte oldu.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Müsli', portion: '60g', calories: 220, note: 'Şekersiz, tam tahıllı' },
            { name: 'Yağsız süt', portion: '200ml', calories: 70 },
            { name: 'Muz dilim', portion: '1/2 adet', calories: 50 },
            { name: 'Çilek', portion: '80g', calories: 30 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Ton balıklı wrap', portion: '1 adet', calories: 350, note: 'Tam buğday lavaş, sebzeler' },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Havuç çorbası', portion: '200ml', calories: 100, note: 'Kremasız' },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara köfte', portion: '120g', calories: 280, note: 'Yağsız dana kıyma' },
            { name: 'Patates püresi', portion: '150g', calories: 150, note: 'Az yağlı süt ile' },
            { name: 'Buharda sebze', portion: '150g', calories: 55 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Maydanoz', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 370,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Tam buğday kraker', portion: '4 adet', calories: 70 },
            { name: 'Portakal', portion: '1 adet', calories: 60 },
            { name: 'Fındık', portion: '8 adet', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 16,
      title: 'Gün 16 - Enerji Günü ⚡',
      totalCalories: 1980,
      note: 'Kompleks karbonhidratlar ile gün boyu enerji.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180 },
            { name: 'Kuru kayısı', portion: '4 adet', calories: 50 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Yağsız süt', portion: '200ml', calories: 70 },
            { name: 'Tarçın', portion: 'bir tutam', calories: 0 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Pirinçli tavuk', portion: '250g', calories: 380, note: 'Esmer pirinç, sebzeli' },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı-limon sos', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Ayran', portion: '200ml', calories: 70 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 590,
          foods: [
            { name: 'Fırında balık', portion: '150g', calories: 200 },
            { name: 'Tatlı patates', portion: '200g', calories: 180 },
            { name: 'Brokoli', portion: '150g', calories: 55 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 360,
          foods: [
            { name: 'Muz', portion: '1 orta', calories: 105 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Kuru incir', portion: '2 adet', calories: 45 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 17,
      title: 'Gün 17 - Bitkisel Protein 🌿',
      totalCalories: 2000,
      note: 'Baklagiller ve kuruyemişler ile bitkisel protein.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Humus', portion: '60g', calories: 120 },
            { name: 'Tam buğday pide', portion: '1/2 adet', calories: 130 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Nohutlu pilav', portion: '250g', calories: 320 },
            { name: 'Tavuk göğsü', portion: '80g', calories: 130 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Salata', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fasulye yemeği', portion: '250g', calories: 280, note: 'Zeytinyağlı' },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Cacık', portion: '150g', calories: 80 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Maydanoz', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 360,
          foods: [
            { name: 'Armut', portion: '1 orta', calories: 100 },
            { name: 'Badem', portion: '20 adet', calories: 140 },
            { name: 'Kefir', portion: '200ml', calories: 100 },
            { name: 'Tarçın', portion: 'bir tutam', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 18,
      title: 'Gün 18 - Deniz Mahsulleri 🦐',
      totalCalories: 1980,
      note: 'Düşük yağlı, yüksek proteinli deniz ürünleri.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 440,
          foods: [
            { name: 'Scrambled eggs', portion: '2 yumurta', calories: 180, note: 'Az yağ ile' },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Ispanak', portion: '50g', calories: 15 },
            { name: 'Kahve', portion: '1 fincan', calories: 5, note: 'Şekersiz' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Karides salatası', portion: '200g', calories: 250, note: 'Izgara karides, bol yeşillik' },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Limon-zeytinyağı sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında çipura', portion: '200g', calories: 280 },
            { name: 'Haşlanmış patates', portion: '150g', calories: 130 },
            { name: 'Havuç', portion: '100g', calories: 40 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 370,
          foods: [
            { name: 'Yoğurt', portion: '200g', calories: 120 },
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Fındık', portion: '15 adet', calories: 100 },
            { name: 'Portakal', portion: '1 adet', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 19,
      title: 'Gün 19 - Sebze Cenneti 🥗',
      totalCalories: 2000,
      note: 'Sebze ağırlıklı gün - lif deposu!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta + sebze', calories: 220, note: 'Mantar, biber, domates' },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Sebze güveç', portion: '300g', calories: 250, note: 'Kabak, patlıcan, biber, domates' },
            { name: 'Izgara tavuk', portion: '100g', calories: 165 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 120 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 590,
          foods: [
            { name: 'Sebzeli makarna', portion: '250g', calories: 350, note: 'Tam buğday makarna, bol sebze' },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Parmesan rendesi', portion: '20g', calories: 80 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
            { name: 'Fesleğen', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 380,
          foods: [
            { name: 'Havuç çubukları', portion: '100g', calories: 40 },
            { name: 'Humus', portion: '50g', calories: 100 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 20,
      title: 'Gün 20 - Süper Gıdalar 🦸',
      totalCalories: 1980,
      note: 'Besin değeri yüksek süper gıdalar.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Açai bowl', portion: '300g', calories: 300, note: 'Açai, muz, granola, meyve' },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Somon bowl', portion: '300g', calories: 400, note: 'Somon, kinoa, avokado, edamame' },
            { name: 'Miso çorbası', portion: '200ml', calories: 60, note: 'Düşük sodyumlu' },
            { name: 'Susam', portion: '1 tatlı kaşığı', calories: 30 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Kale salatası', portion: '150g', calories: 80, note: 'Kale, nar, ceviz' },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Nar taneleri', portion: '50g', calories: 40 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 360,
          foods: [
            { name: 'Smoothie', portion: '300ml', calories: 180, note: 'Ispanak, muz, yoğurt' },
            { name: 'Goji berry', portion: '20g', calories: 70, note: 'Süper gıda' },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 21,
      title: 'Gün 21 - Üç Hafta Başarısı! 🏆',
      totalCalories: 2050,
      note: 'Üç haftayı tamamladınız! Kan basıncınız kesinlikle düştü.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Özel)',
          totalCalories: 520,
          foods: [
            { name: 'French toast (tam buğday)', portion: '2 dilim', calories: 280, note: 'Yumurta ve tarçın ile' },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Akçaağaç şurubu', portion: '1 tatlı kaşığı', calories: 50, note: 'Az miktarda' },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara kuzu pirzola', portion: '120g', calories: 280, note: 'Yağsız' },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Bulgur pilavı', portion: '150g', calories: 180 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Patates salatası', portion: '150g', calories: 150 },
            { name: 'Brokoli', portion: '100g', calories: 35 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler + Kutlama',
          totalCalories: 350,
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 120 },
            { name: 'Dark çikolata', portion: '20g', calories: 110, note: '%70+ kakao, haftada 1 kez' },
            { name: 'Badem', portion: '10 adet', calories: 70 },
            { name: 'Bitki çayı', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 22,
      title: 'Gün 22 - Son Hafta Başlangıcı 🚀',
      totalCalories: 2000,
      note: 'Son hafta! Sağlıklı alışkanlıklar artık yaşam tarzı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Yağsız süt', portion: '200ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Buddha bowl', portion: '350g', calories: 400, note: 'Kinoa, nohut, sebzeler, avokado' },
            { name: 'Limon-tahini sos', portion: '2 yemek kaşığı', calories: 100 },
            { name: 'Yeşil yapraklar', portion: '80g', calories: 20 },
            { name: 'Susam', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Mercimek çorbası', portion: '250ml', calories: 150 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Maydanoz', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 360,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Fıstık ezmesi', portion: '1 yemek kaşığı', calories: 95 },
            { name: 'Havuç', portion: '2 orta', calories: 50 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
        },
      ],
    },
    {
      day: 23,
      title: 'Gün 23 - Kalp Dostu Günü ❤️',
      totalCalories: 1980,
      note: 'Kalp sağlığı için özel tasarlanmış menü.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Kepekli ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Somon salatası', portion: '250g', calories: 350, note: 'Izgara somon, yeşillik, zeytinyağı' },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Zeytinyağı-limon sos', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında hindi', portion: '150g', calories: 250 },
            { name: 'Fırında tatlı patates', portion: '200g', calories: 180 },
            { name: 'Buharda fasulye', portion: '150g', calories: 45 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Biberiye', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 370,
          foods: [
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '200g', calories: 120 },
            { name: 'Ceviz', portion: '8 adet', calories: 160 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 24,
      title: 'Gün 24 - Global Tatlar 🌍',
      totalCalories: 2000,
      note: 'Dünya mutfağından DASH-uyumlu tarifler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Japon Stili)',
          totalCalories: 460,
          foods: [
            { name: 'Miso çorbası', portion: '200ml', calories: 60, note: 'Düşük sodyumlu' },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Izgara somon', portion: '60g', calories: 120 },
            { name: 'Turşu sebze', portion: '50g', calories: 20, note: 'Fermente, az tuzlu' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (Meksika Stili)',
          totalCalories: 570,
          foods: [
            { name: 'Burrito bowl', portion: '350g', calories: 400, note: 'Fasulye, tavuk, sebze, salsa' },
            { name: 'Guacamole', portion: '50g', calories: 80 },
            { name: 'Marul', portion: '80g', calories: 15 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (İtalyan Stili)',
          totalCalories: 600,
          foods: [
            { name: 'Minestrone çorbası', portion: '300ml', calories: 180, note: 'Sebzeli, tuzsuz' },
            { name: 'Izgara balık', portion: '120g', calories: 180 },
            { name: 'Caprese salatası', portion: '150g', calories: 180, note: 'Az yağlı mozzarella' },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 370,
          foods: [
            { name: 'Humus + sebze', portion: '80g + 100g', calories: 180 },
            { name: 'Mango', portion: '100g', calories: 60 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 25,
      title: 'Gün 25 - Detoks Günü 🌱',
      totalCalories: 1900,
      note: 'Hafif ve temizleyici besinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Yeşil smoothie', portion: '400ml', calories: 220, note: 'Ispanak, salatalık, elma, zencefil' },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Limon suyu', portion: '1 yemek kaşığı', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 120 },
            { name: 'Kinoa salatası', portion: '200g', calories: 250 },
            { name: 'Izgara tavuk', portion: '80g', calories: 130 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Buharda balık', portion: '150g', calories: 200 },
            { name: 'Buharda sebze', portion: '250g', calories: 100 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Taze otlar', portion: 'karışık', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 380,
          foods: [
            { name: 'Salatalık + havuç', portion: '150g', calories: 50 },
            { name: 'Humus', portion: '40g', calories: 80 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Zencefilli çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 26,
      title: 'Gün 26 - Protein Günü 💪',
      totalCalories: 2000,
      note: 'Yağsız protein kaynakları ile kas desteği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yumurta beyazı omlet', portion: '4 beyaz', calories: 70 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
            { name: 'Ispanak', portion: '50g', calories: 15 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '180g', calories: 300 },
            { name: 'Mercimek salatası', portion: '150g', calories: 180 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında hindi göğsü', portion: '150g', calories: 250 },
            { name: 'Nohut haşlaması', portion: '150g', calories: 200 },
            { name: 'Brokoli', portion: '150g', calories: 55 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Maydanoz', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 360,
          foods: [
            { name: 'Yoğurt (az yağlı)', portion: '200g', calories: 120 },
            { name: 'Badem', portion: '20 adet', calories: 140 },
            { name: 'Muz', portion: '1 küçük', calories: 90 },
          ],
        },
      ],
    },
    {
      day: 27,
      title: 'Gün 27 - Lif Festivali 🌾',
      totalCalories: 1980,
      note: 'Tam tahıllar ve sebzeler ile maksimum lif.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Kepekli müsli', portion: '60g', calories: 200 },
            { name: 'Yağsız süt', portion: '200ml', calories: 70 },
            { name: 'Ahududu', portion: '100g', calories: 50, note: 'Lif deposu' },
            { name: 'Keten tohumu', portion: '1 yemek kaşığı', calories: 55 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Kuru fasulye yemeği', portion: '200g', calories: 250 },
            { name: 'Bulgur pilavı', portion: '150g', calories: 180 },
            { name: 'Turp salatası', portion: '100g', calories: 20 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Ayran', portion: '200ml', calories: 70 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 590,
          foods: [
            { name: 'Izgara balık', portion: '150g', calories: 200 },
            { name: 'Enginar (zeytinyağlı)', portion: '2 adet', calories: 150, note: 'Lif kaynağı' },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 370,
          foods: [
            { name: 'Armut', portion: '1 orta', calories: 100, note: 'Kabuklu - lif kaynağı' },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Kuru incir', portion: '2 adet', calories: 45 },
          ],
        },
      ],
    },
    {
      day: 28,
      title: 'Gün 28 - Dördüncü Hafta Sonu 🎊',
      totalCalories: 2050,
      note: 'Dört haftayı neredeyse tamamladınız! Muhteşem iş.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Özel)',
          totalCalories: 520,
          foods: [
            { name: 'Waffle (tam buğday)', portion: '2 adet', calories: 280, note: 'Ev yapımı, şekersiz' },
            { name: 'Taze meyve', portion: '150g', calories: 80 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara biftek', portion: '120g', calories: 280 },
            { name: 'Fırında patates', portion: '150g', calories: 130 },
            { name: 'Karışık salata', portion: '200g', calories: 80 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında levrek', portion: '180g', calories: 240 },
            { name: 'Sebzeli pilav', portion: '150g', calories: 200 },
            { name: 'Ispanak salatası', portion: '100g', calories: 30 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 120 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 29,
      title: 'Gün 29 - Son Düzlük 🏁',
      totalCalories: 2000,
      note: 'Yarın son gün! Harika bir performans.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Fındık', portion: '15 adet', calories: 100 },
            { name: 'Yağsız süt', portion: '200ml', calories: 70 },
            { name: 'Tarçın + bal', portion: 'az miktar', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Tavuklu salata wrap', portion: '1 adet', calories: 380, note: 'Tam buğday lavaş' },
            { name: 'Sebze çorbası', portion: '200ml', calories: 100 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara somon', portion: '150g', calories: 280 },
            { name: 'Kinoa pilavı', portion: '150g', calories: 180 },
            { name: 'Kuşkonmaz', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 360,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Lor peyniri', portion: '80g', calories: 80 },
            { name: 'Havuç', portion: '100g', calories: 40 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
      ],
    },
    {
      day: 30,
      title: 'Gün 30 - TAMAMLANDI! 🏆🎉',
      totalCalories: 2100,
      note: '30 günü başarıyla tamamladınız! Kan basıncınız düştü, kalbiniz sağlıklı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Şampiyon Kahvaltısı',
          totalCalories: 550,
          foods: [
            { name: 'Sebzeli omlet', portion: '3 yumurta', calories: 280, note: 'Mantar, ıspanak, biber' },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Portakal suyu', portion: '200ml', calories: 90 },
            { name: 'Kahve/çay', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Zafer Öğle Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 340 },
            { name: 'Akdeniz salatası', portion: '200g', calories: 120 },
            { name: 'Kinoa tabbule', portion: '150g', calories: 180 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Kutlama Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında kuzu pirzola', portion: '120g', calories: 280, note: 'Yağsız' },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Bulgur pilavı', portion: '120g', calories: 145 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Taze otlar', portion: 'karışık', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Kutlama Tatlısı',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 120, note: 'Mevsim meyveleri' },
            { name: 'Dark çikolata', portion: '25g', calories: 140, note: '%70+ kakao - kutlamaya layık!' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 BEKLENEN SONUÇLAR (30 Günde)

❤️ Kan Basıncı Değişimleri:
• İlk hafta: 2-3 mmHg düşüş
• 2. hafta: 4-6 mmHg düşüş
• 30 gün sonunda: 5-11 mmHg düşüş (sistolik)
• Hipertansiyon hastalarında daha belirgin etkiler

⚖️ Kilo Kontrolü:
• Toplam: 2-4 kg kayıp (kalori dengesine bağlı)
• Bel çevresi: 2-5 cm azalma
• Yağ kaybı ağırlıklı (su kaybı değil)

🔬 Kan Değerleri:
• LDL kolesterol: %5-10 düşüş
• Trigliserit: %10-15 düşüş
• Kan şekeri: Daha stabil
• HDL kolesterol: Hafif artış

💪 Enerji ve Yaşam Kalitesi:
• İlk 3-5 gün: Sodyum azalması adaptasyonu
• 1. hafta sonunda: Enerji artışı
• 2-4. hafta: Stabil, yüksek enerji seviyesi

🧠 Zihinsel Değişimler:
• Daha net düşünce
• Daha iyi konsantrasyon
• İyileşmiş uyku kalitesi
• Azalmış kaygı

🍽️ Beslenme Alışkanlıkları:
• Tuz isteğinde belirgin azalma
• Taze gıda tercihinde artış
• Porsiyon kontrolü gelişimi

⚠️ Önemli Notlar:
• İlaç kullananlar doktor kontrolünde devam etmeli
• Sonuçlar kişiye göre değişebilir
• Egzersiz ile kombine edildiğinde etkiler artar`,

    en: `📊 EXPECTED RESULTS (In 30 Days)

❤️ Blood Pressure Changes:
• First week: 2-3 mmHg reduction
• Week 2: 4-6 mmHg reduction
• After 30 days: 5-11 mmHg reduction (systolic)
• More pronounced effects in hypertensive patients

⚖️ Weight Control:
• Total: 2-4 kg loss (depending on calorie balance)
• Waist circumference: 2-5 cm reduction
• Fat loss focused (not water loss)

🔬 Blood Values:
• LDL cholesterol: 5-10% decrease
• Triglycerides: 10-15% decrease
• Blood sugar: More stable
• HDL cholesterol: Slight increase

💪 Energy and Quality of Life:
• First 3-5 days: Sodium reduction adaptation
• End of week 1: Energy increase
• Weeks 2-4: Stable, high energy levels

🧠 Mental Changes:
• Clearer thinking
• Better concentration
• Improved sleep quality
• Reduced anxiety

🍽️ Eating Habits:
• Significant reduction in salt cravings
• Increased fresh food preference
• Improved portion control

⚠️ Important Notes:
• Those on medication should continue under doctor supervision
• Results may vary by individual
• Effects increase when combined with exercise`,
  },
};
