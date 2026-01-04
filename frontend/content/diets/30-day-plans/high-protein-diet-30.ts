import { Diet } from '../types';

export const highProteinDiet30: Diet = {
  id: 'high-protein',
  name: {
    tr: 'Yüksek Proteinli Diyet',
    en: 'High Protein Diet',
  },
  emoji: '💪',
  isPremium: true,
  duration: 30,
  difficulty: 'medium',

  description: {
    tr: 'Yüksek Proteinli Diyet, kas kütlesini korurken yağ yakımını maksimize eden bilimsel bir beslenme programıdır. Günlük kalorilerin %30-35\'i proteinden gelir. Bu diyet özellikle sporcular, fitness tutkunları ve sağlıklı kilo vermek isteyenler için idealdir. Protein, tokluk hissini artırarak aşırı yemeyi önler ve metabolizmayı hızlandırır.',
    en: 'High Protein Diet is a scientifically-backed nutrition program that maximizes fat burning while preserving muscle mass. 30-35% of daily calories come from protein. This diet is ideal for athletes, fitness enthusiasts, and those seeking healthy weight loss. Protein increases satiety, prevents overeating, and boosts metabolism.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Protein ve Kilo Kaybı Araştırmaları (2024):
• Yüksek protein diyeti metabolizmayı %20-30 hızlandırır
• Günde 1.6-2.2g/kg protein kas kaybını önler
• Termal etki: Protein sindirimi kalorilerin %25-30'unu yakar
• Tokluk hormonu (GLP-1) salgısını artırır

💪 Kas ve Performans:
• Kas protein sentezini optimize eder
• Egzersiz sonrası toparlanmayı hızlandırır
• Yağsız kütle kaybını %50 azaltır
• Kemik mineral yoğunluğunu destekler

⚡ Metabolik Faydalar:
• İnsülin duyarlılığını artırır
• Kan şekeri dalgalanmalarını azaltır
• Yağ oksidasyonunu hızlandırır
• Leptin duyarlılığını iyileştirir

📈 Journal of Nutrition Bulguları:
• 12 haftalık çalışmada %35 daha fazla yağ kaybı
• Kas kütlesi korunurken 2-3 kat fazla yağ kaybı
• Açlık hormonu (ghrelin) seviyesi düşer
• Uzun vadeli kilo kontrolünde daha başarılı

⚠️ Önemli:
• Böbrek hastalığı olanlar dikkatli olmalı
• Bol su tüketimi şart (günde 2.5-3L)
• Kaliteli protein kaynaklarını tercih edin`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 Protein and Weight Loss Research (2024):
• High protein diet increases metabolism by 20-30%
• 1.6-2.2g/kg protein daily prevents muscle loss
• Thermic effect: Protein digestion burns 25-30% of calories
• Increases satiety hormone (GLP-1) release

💪 Muscle and Performance:
• Optimizes muscle protein synthesis
• Speeds post-exercise recovery
• Reduces lean mass loss by 50%
• Supports bone mineral density

⚡ Metabolic Benefits:
• Increases insulin sensitivity
• Reduces blood sugar fluctuations
• Accelerates fat oxidation
• Improves leptin sensitivity

📈 Journal of Nutrition Findings:
• 35% more fat loss in 12-week study
• 2-3x more fat loss while preserving muscle
• Hunger hormone (ghrelin) levels decrease
• More successful long-term weight maintenance

⚠️ Important:
• Those with kidney disease should be careful
• Adequate water intake essential (2.5-3L/day)
• Choose quality protein sources`,
  },

  benefits: {
    tr: [
      '💪 Kas kütlesini korur ve geliştirir',
      '🔥 Metabolizmayı %20-30 hızlandırır',
      '😋 Tokluk hissini uzun süre devam ettirir',
      '⚖️ Yağ yakımını maksimize eder',
      '🦴 Kemik sağlığını destekler',
      '🧠 Beyin fonksiyonlarını optimize eder',
      '💤 Uyku kalitesini artırır (triptofan)',
      '🩺 Kan şekeri dengesini sağlar',
      '❤️ Kardiyovasküler sağlığı destekler',
      '⚡ Egzersiz performansını artırır',
    ],
    en: [
      '💪 Preserves and builds muscle mass',
      '🔥 Boosts metabolism by 20-30%',
      '😋 Maintains satiety for longer periods',
      '⚖️ Maximizes fat burning',
      '🦴 Supports bone health',
      '🧠 Optimizes brain function',
      '💤 Improves sleep quality (tryptophan)',
      '🩺 Maintains blood sugar balance',
      '❤️ Supports cardiovascular health',
      '⚡ Enhances exercise performance',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Böbrek hastalığı olanlar doktora danışmalı',
      '💧 Günde en az 2.5-3 litre su içilmeli',
      '🥗 Lif alımını ihmal etmeyin',
      '⏰ İlk hafta adaptasyon dönemi yaşanabilir',
      '💊 Gut hastalığı olanlar dikkatli olmalı',
      '🥩 Kırmızı eti haftada 2-3 kez ile sınırlayın',
    ],
    en: [
      '⚠️ Those with kidney disease should consult a doctor',
      '💧 Drink at least 2.5-3 liters of water daily',
      '🥗 Don\'t neglect fiber intake',
      '⏰ Adaptation period may occur in the first week',
      '💊 Those with gout should be careful',
      '🥩 Limit red meat to 2-3 times per week',
    ],
  },

  allowedFoods: {
    tr: [
      '🍗 YAĞSIZ PROTEİNLER (Her öğünde):',
      '🍗 Tavuk göğsü (derisiz)',
      '🦃 Hindi göğsü',
      '🥩 Yağsız dana eti (biftek, kıyma)',
      '🐟 Balık (somon, ton, levrek, çipura)',
      '🥚 Yumurta (tam ve beyaz)',
      '🧀 Az yağlı süt ürünleri',
      '',
      '🥛 SÜT ÜRÜNLERİ:',
      '🥛 Protein tozu (whey, casein)',
      '🧀 Lor peyniri',
      '🧀 Cottage cheese',
      '🥛 Yoğurt (yüksek proteinli)',
      '🧀 Az yağlı beyaz peynir',
      '',
      '🌿 BİTKİSEL PROTEİNLER:',
      '🫘 Mercimek, nohut, fasulye',
      '🥜 Tofu, tempeh',
      '🌰 Badem, ceviz, fıstık (ölçülü)',
      '🌱 Edamame, bezelye',
      '',
      '🥬 SEBZELER (Serbest):',
      '🥬 Brokoli, ıspanak, lahana',
      '🥒 Salatalık, kabak, biber',
      '🥕 Havuç, domates, patlıcan',
      '',
      '🌾 KOMPLEKS KARBONHİDRATLAR (Ölçülü):',
      '🌾 Yulaf, kinoa, bulgur',
      '🍠 Tatlı patates',
      '🍚 Esmer pirinç',
    ],
    en: [
      '🍗 LEAN PROTEINS (Every meal):',
      '🍗 Chicken breast (skinless)',
      '🦃 Turkey breast',
      '🥩 Lean beef (steak, ground)',
      '🐟 Fish (salmon, tuna, sea bass, bream)',
      '🥚 Eggs (whole and whites)',
      '🧀 Low-fat dairy products',
      '',
      '🥛 DAIRY PRODUCTS:',
      '🥛 Protein powder (whey, casein)',
      '🧀 Cottage cheese',
      '🧀 Quark cheese',
      '🥛 High-protein yogurt',
      '🧀 Low-fat feta cheese',
      '',
      '🌿 PLANT PROTEINS:',
      '🫘 Lentils, chickpeas, beans',
      '🥜 Tofu, tempeh',
      '🌰 Almonds, walnuts, peanuts (moderate)',
      '🌱 Edamame, peas',
      '',
      '🥬 VEGETABLES (Unlimited):',
      '🥬 Broccoli, spinach, cabbage',
      '🥒 Cucumber, zucchini, peppers',
      '🥕 Carrots, tomatoes, eggplant',
      '',
      '🌾 COMPLEX CARBOHYDRATES (Moderate):',
      '🌾 Oats, quinoa, bulgur',
      '🍠 Sweet potato',
      '🍚 Brown rice',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🍬 ŞEKER VE TATLILAR:',
      '🍬 Şekerli içecekler, gazlı içecekler',
      '🍰 Pastalar, tatlılar, bisküviler',
      '🍫 Şekerli çikolatalar',
      '',
      '🍟 İŞLENMİŞ GIDALAR:',
      '🍟 Fast food',
      '🌭 İşlenmiş etler (sucuk, sosis)',
      '🍕 Pizza, hamburger (hazır)',
      '',
      '🥖 RAFİNE KARBONHİDRATLAR:',
      '🥖 Beyaz ekmek, beyaz makarna',
      '🍚 Beyaz pirinç',
      '🥐 Börek, poğaça',
      '',
      '🍺 DİĞER:',
      '🍺 Alkol',
      '🧈 Trans yağlar, margarin',
      '🍿 Paketli atıştırmalıklar',
    ],
    en: [
      '🍬 SUGAR AND SWEETS:',
      '🍬 Sugary drinks, sodas',
      '🍰 Cakes, desserts, cookies',
      '🍫 Sugary chocolates',
      '',
      '🍟 PROCESSED FOODS:',
      '🍟 Fast food',
      '🌭 Processed meats (sausage, salami)',
      '🍕 Pizza, burgers (ready-made)',
      '',
      '🥖 REFINED CARBOHYDRATES:',
      '🥖 White bread, white pasta',
      '🍚 White rice',
      '🥐 Pastries',
      '',
      '🍺 OTHER:',
      '🍺 Alcohol',
      '🧈 Trans fats, margarine',
      '🍿 Packaged snacks',
    ],
  },

  exercises: [
    {
      name: 'Ağırlık Antrenmanı / Weight Training',
      duration: '45-60 dakika / minutes',
      frequency: 'Haftada 4-5 kez / 4-5 times a week',
      note: 'Kas gelişimi için zorunlu. Split program önerilir.',
    },
    {
      name: 'HIIT Kardio / HIIT Cardio',
      duration: '20-30 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Yağ yakımını hızlandırır.',
    },
    {
      name: 'Yürüyüş / Walking',
      duration: '30-45 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Aktif toparlanma ve yağ yakımı için.',
    },
    {
      name: 'Esneme / Stretching',
      duration: '15-20 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Kas toparlanmasını hızlandırır.',
    },
    {
      name: 'Core Egzersizleri / Core Exercises',
      duration: '15-20 dakika / minutes',
      frequency: 'Haftada 3 kez / 3 times a week',
      note: 'Karın ve sırt kasları için.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Protein Yolculuğu Başlıyor 💪',
      totalCalories: 1800,
      note: 'Hedef: 150g protein. Bol su için!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yumurta beyazı omlet', portion: '5 beyaz + 1 sarı', calories: 150, note: 'Ispanaklı' },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '200g', calories: 330 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Karışık yeşil salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon sos', portion: '1 yemek kaşığı', calories: 50 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 350 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Haşlanmış patates', portion: '100g', calories: 80 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Protein shake', portion: '1 servis', calories: 120, note: 'Whey protein' },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Yoğurt (yüksek proteinli)', portion: '150g', calories: 75 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Kas Yapı Günü 🏋️',
      totalCalories: 1850,
      note: 'Antrenman günü - protein ve karbonhidrat dengesi.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 220 },
            { name: 'Protein tozu', portion: '30g', calories: 120, note: 'Yulafa ekle' },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Dana biftek (ızgara)', portion: '180g', calories: 380 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Ispanak salatası', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Tavuk göğsü (fırın)', portion: '180g', calories: 300 },
            { name: 'Kinoa salatası', portion: '150g', calories: 150 },
            { name: 'Buharda sebze', portion: '150g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '3 adet', calories: 210 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Lor peyniri', portion: '50g', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Deniz Ürünleri Günü 🐟',
      totalCalories: 1780,
      note: 'Omega-3 zengin deniz ürünleri.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Scrambled eggs', portion: '3 yumurta', calories: 210 },
            { name: 'Füme somon', portion: '50g', calories: 100 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Ton balıklı salata', portion: '250g', calories: 350, note: 'Ton, yeşillik, zeytinyağı' },
            { name: 'Nohut', portion: '80g', calories: 120 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 540,
          foods: [
            { name: 'Izgara levrek', portion: '200g', calories: 280 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Cottage cheese', portion: '150g', calories: 150 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Salatalık çubukları', portion: '100g', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Bitkisel Protein Günü 🌿',
      totalCalories: 1800,
      note: 'Bitkisel ve hayvansal protein karışımı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Tofu scramble', portion: '150g', calories: 180 },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Ispanak', portion: '50g', calories: 15 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Mercimek çorbası', portion: '250ml', calories: 180 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Nohutlu tavuk sote', portion: '250g', calories: 350 },
            { name: 'Bulgur pilavı', portion: '80g', calories: 100 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Edamame', portion: '100g', calories: 120 },
            { name: 'Protein bar', portion: '1 adet', calories: 150, note: 'Düşük şekerli' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Yağ Yakım Günü 🔥',
      totalCalories: 1750,
      note: 'Düşük karbonhidrat, yüksek protein.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Yumurta beyazı omlet', portion: '6 beyaz', calories: 100 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Izgara hindi göğsü', portion: '200g', calories: 340 },
            { name: 'Karışık yeşil salata', portion: '250g', calories: 60 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 350 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Ispanak', portion: '150g', calories: 40 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Protein shake', portion: '1 servis', calories: 120 },
            { name: 'Badem', portion: '20 adet', calories: 140 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Toparlanma Günü 🧘',
      totalCalories: 1800,
      note: 'Hafif antrenman ve dengeli beslenme.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Yulaf lapası', portion: '60g', calories: 220 },
            { name: 'Yoğurt (yüksek proteinli)', portion: '150g', calories: 120 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Tavuk şiş', portion: '180g', calories: 300 },
            { name: 'Bulgur pilavı', portion: '120g', calories: 150 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Yeşil biber', portion: '2 adet', calories: 20 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Izgara köfte', portion: '150g', calories: 300, note: 'Yağsız kıyma' },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Maydanoz', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Cottage cheese', portion: '150g', calories: 150 },
            { name: 'Muz', portion: '1 küçük', calories: 90 },
            { name: 'Ceviz', portion: '4 adet', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - Hafta Sonu Protein Şöleni 🎉',
      totalCalories: 1900,
      note: 'İlk haftayı başarıyla tamamladınız!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 520,
          foods: [
            { name: 'Omlet (sebzeli)', portion: '3 yumurta', calories: 280 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara kuzu pirzola', portion: '150g', calories: 350, note: 'Yağsız' },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Fırında tavuk göğsü', portion: '200g', calories: 330 },
            { name: 'Ispanak sote', portion: '150g', calories: 50 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Protein bar', portion: '1 adet', calories: 180, note: 'Düşük şekerli' },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
            { name: 'Çilek', portion: '100g', calories: 35 },
          ],
        },
      ],
    },
    {
      day: 8,
      title: 'Gün 8 - Yeni Hafta Enerjisi ⚡',
      totalCalories: 1820,
      note: 'İkinci hafta başladı. Kas yapımı hızlanıyor!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Protein pancake', portion: '2 adet', calories: 250, note: 'Yulaf + protein tozu' },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Tavuk göğsü bowl', portion: '300g', calories: 400, note: 'Tavuk, pirinç, sebze' },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Soya sosu', portion: '1 tatlı kaşığı', calories: 10, note: 'Düşük sodyumlu' },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara ton balığı', portion: '180g', calories: 300 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Tatlı patates', portion: '100g', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Lor peyniri', portion: '80g', calories: 80 },
            { name: 'Havuç çubukları', portion: '100g', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 9,
      title: 'Gün 9 - Kas Geliştirme Günü 💪',
      totalCalories: 1850,
      note: 'Ağır antrenman günü - ekstra protein.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yumurta (tam)', portion: '3 adet', calories: 210 },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Lor peyniri', portion: '50g', calories: 50 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Dana eti sote', portion: '180g', calories: 360 },
            { name: 'Esmer pirinç', portion: '120g', calories: 135 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '200g', calories: 330 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Protein shake', portion: '1 servis', calories: 120 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
      ],
    },
    {
      day: 10,
      title: 'Gün 10 - Omega-3 Takviyesi 🐟',
      totalCalories: 1800,
      note: 'Balık ve sağlıklı yağlar.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Füme somon', portion: '80g', calories: 150 },
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 350 },
            { name: 'Kinoa salatası', portion: '150g', calories: 150 },
            { name: 'Yeşil yapraklar', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında çipura', portion: '200g', calories: 280 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Bulgur', portion: '80g', calories: 100 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Yoğurt', portion: '200g', calories: 120 },
            { name: 'Ceviz', portion: '8 adet', calories: 160 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 11,
      title: 'Gün 11 - Süper Protein Günü 🦸',
      totalCalories: 1850,
      note: 'Çeşitli protein kaynakları.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf + protein tozu', portion: '60g + 30g', calories: 340 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Hindi göğsü (ızgara)', portion: '200g', calories: 340 },
            { name: 'Mercimek salatası', portion: '150g', calories: 180 },
            { name: 'Marul', portion: '80g', calories: 15 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Ton balığı biftek', portion: '180g', calories: 300 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Tatlı patates', portion: '100g', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Cottage cheese', portion: '150g', calories: 150 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Fındık', portion: '10 adet', calories: 65 },
          ],
        },
      ],
    },
    {
      day: 12,
      title: 'Gün 12 - Baklagil Gücü 🫘',
      totalCalories: 1800,
      note: 'Bitkisel protein boost.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 440,
          foods: [
            { name: 'Menemen (yumurta)', portion: '3 yumurta', calories: 280 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Lor peyniri', portion: '50g', calories: 50 },
            { name: 'Biber', portion: '1 adet', calories: 20 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Tavuk + nohut yemeği', portion: '300g', calories: 400 },
            { name: 'Bulgur', portion: '80g', calories: 100 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Mercimek köftesi', portion: '6 adet', calories: 250 },
            { name: 'Cacık', portion: '150g', calories: 80 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Izgara tavuk', portion: '80g', calories: 130 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Edamame', portion: '100g', calories: 120 },
            { name: 'Protein shake', portion: '1 servis', calories: 120 },
            { name: 'Havuç', portion: '100g', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 13,
      title: 'Gün 13 - Kırmızı Et Günü 🥩',
      totalCalories: 1850,
      note: 'Demir ve B12 takviyesi.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '3 adet', calories: 210 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Ispanak', portion: '50g', calories: 15 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 590,
          foods: [
            { name: 'Dana biftek (ızgara)', portion: '180g', calories: 380 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı-limon', portion: '1 tatlı kaşığı', calories: 55 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk göğsü', portion: '180g', calories: 300 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa', portion: '80g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Yoğurt', portion: '200g', calories: 120 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Muz', portion: '1 küçük', calories: 90 },
          ],
        },
      ],
    },
    {
      day: 14,
      title: 'Gün 14 - İki Hafta Başarısı! 🏆',
      totalCalories: 1900,
      note: 'Yarı yoldayız! Kas kütleniz artıyor.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 500,
          foods: [
            { name: 'Protein smoothie', portion: '400ml', calories: 300, note: 'Protein, muz, yulaf, süt' },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Fıstık ezmesi', portion: '1 yemek kaşığı', calories: 95 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara kuzu pirzola', portion: '150g', calories: 350 },
            { name: 'Bulgur pilavı', portion: '150g', calories: 180 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 350 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Cottage cheese', portion: '150g', calories: 150 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Çilek', portion: '50g', calories: 20 },
          ],
        },
      ],
    },
    {
      day: 15,
      title: 'Gün 15 - Üçüncü Hafta Başlangıcı 🚀',
      totalCalories: 1820,
      note: 'Yağ yakımı hızlanıyor!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Yumurta beyazı omlet', portion: '5 beyaz + 1 sarı', calories: 150 },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '200g', calories: 330 },
            { name: 'Mercimek çorbası', portion: '200ml', calories: 140 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara balık', portion: '200g', calories: 280 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Protein shake', portion: '1 servis', calories: 120 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Elma', portion: '1 küçük', calories: 75 },
          ],
        },
      ],
    },
    {
      day: 16,
      title: 'Gün 16 - Enerji Patlaması ⚡',
      totalCalories: 1850,
      note: 'Yoğun antrenman için karbonhidrat dengesi.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 220 },
            { name: 'Protein tozu', portion: '30g', calories: 120 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Badem', portion: '5 adet', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Hindi göğsü', portion: '180g', calories: 300 },
            { name: 'Esmer pirinç', portion: '150g', calories: 170 },
            { name: 'Karışık sebze', portion: '150g', calories: 60 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 350 },
            { name: 'Ispanak', portion: '150g', calories: 40 },
            { name: 'Patates (haşlanmış)', portion: '80g', calories: 65 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Fındık', portion: '10 adet', calories: 65 },
          ],
        },
      ],
    },
    {
      day: 17,
      title: 'Gün 17 - Yağsız Kas Günü 💪',
      totalCalories: 1800,
      note: 'Düşük yağ, yüksek protein.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Yumurta beyazı', portion: '6 adet', calories: 100 },
            { name: 'Yulaf ezmesi', portion: '40g', calories: 150 },
            { name: 'Lor peyniri', portion: '80g', calories: 80 },
            { name: 'Çilek', portion: '100g', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '200g', calories: 330 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 tatlı kaşığı', calories: 55 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Fırında hindi göğsü', portion: '200g', calories: 340 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Maydanoz', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Cottage cheese', portion: '150g', calories: 150 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Badem', portion: '8 adet', calories: 55 },
          ],
        },
      ],
    },
    {
      day: 18,
      title: 'Gün 18 - Deniz Mahsulleri Şöleni 🦐',
      totalCalories: 1780,
      note: 'Yüksek kaliteli protein ve omega-3.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 440,
          foods: [
            { name: 'Füme somon', portion: '60g', calories: 120 },
            { name: 'Scrambled eggs', portion: '2 yumurta', calories: 140 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 540,
          foods: [
            { name: 'Karides ızgara', portion: '180g', calories: 200 },
            { name: 'Kinoa salatası', portion: '200g', calories: 250 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında levrek', portion: '200g', calories: 280 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Esmer pirinç', portion: '80g', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Yoğurt', portion: '200g', calories: 120 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 19,
      title: 'Gün 19 - Mix Protein Günü 🌈',
      totalCalories: 1850,
      note: 'Farklı protein kaynaklarının kombinasyonu.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Protein pancake', portion: '2 adet', calories: 250 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Nohut salatası', portion: '150g', calories: 200 },
            { name: 'Yeşil yapraklar', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Dana eti (ızgara)', portion: '150g', calories: 320 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Tatlı patates', portion: '80g', calories: 70 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Lor peyniri', portion: '80g', calories: 80 },
            { name: 'Havuç çubukları', portion: '100g', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 20,
      title: 'Gün 20 - Süper Yiyecekler 🦸',
      totalCalories: 1800,
      note: 'Besin değeri yüksek süper gıdalar.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Açai bowl + protein', portion: '300g', calories: 320, note: 'Protein tozu eklenmiş' },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Somon bowl', portion: '300g', calories: 400, note: 'Somon, kinoa, edamame' },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Susam', portion: '1 tatlı kaşığı', calories: 30 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk göğsü', portion: '180g', calories: 300 },
            { name: 'Kale salatası', portion: '150g', calories: 80 },
            { name: 'Kinoa', portion: '80g', calories: 100 },
            { name: 'Nar taneleri', portion: '50g', calories: 40 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Protein shake', portion: '1 servis', calories: 120 },
            { name: 'Goji berry', portion: '20g', calories: 70 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 21,
      title: 'Gün 21 - Üç Hafta Şampiyonu! 🏆',
      totalCalories: 1900,
      note: 'Üç haftayı tamamladınız! Sonuçlar görünür.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 500,
          foods: [
            { name: 'Omlet (sebzeli)', portion: '3 yumurta', calories: 280 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara biftek', portion: '180g', calories: 380 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında tavuk göğsü', portion: '200g', calories: 330 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler + Kutlama',
          totalCalories: 300,
          foods: [
            { name: 'Protein bar', portion: '1 adet', calories: 180 },
            { name: 'Muz', portion: '1 küçük', calories: 90 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 22,
      title: 'Gün 22 - Son Hafta Başlangıcı 🎯',
      totalCalories: 1820,
      note: 'Son hafta! Hedefe doğru ilerliyorsunuz.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Yulaf + protein', portion: '60g + 30g', calories: 340 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
            { name: 'Tarçın', portion: 'bir tutam', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Tavuk şiş', portion: '180g', calories: 300 },
            { name: 'Bulgur pilavı', portion: '120g', calories: 150 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Yeşil biber', portion: '2 adet', calories: 20 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 350 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Cottage cheese', portion: '150g', calories: 150 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 23,
      title: 'Gün 23 - Yağ Yakım Hızlandırma 🔥',
      totalCalories: 1750,
      note: 'Son hafta yağ yakımı boost.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Yumurta beyazı omlet', portion: '6 beyaz', calories: 100 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Lor peyniri', portion: '80g', calories: 80 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Hindi göğsü (ızgara)', portion: '200g', calories: 340 },
            { name: 'Karışık salata', portion: '250g', calories: 60 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Fırında balık', portion: '200g', calories: 280 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Ispanak', portion: '150g', calories: 40 },
            { name: 'Kinoa', portion: '60g', calories: 70 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Protein shake', portion: '1 servis', calories: 120 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Havuç', portion: '100g', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 24,
      title: 'Gün 24 - Güç Günü 💪',
      totalCalories: 1850,
      note: 'Kas koruma ve güç artırma.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '3 adet', calories: 210 },
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Lor peyniri', portion: '50g', calories: 50 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Dana biftek', portion: '180g', calories: 380 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Tavuk göğsü', portion: '200g', calories: 330 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Protein bar', portion: '1 adet', calories: 180 },
            { name: 'Muz', portion: '1 küçük', calories: 90 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 25,
      title: 'Gün 25 - Lif ve Protein Dengesi 🌾',
      totalCalories: 1800,
      note: 'Sindirim sağlığı için lif takviyesi.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Kepekli müsli', portion: '50g', calories: 180 },
            { name: 'Protein tozu', portion: '30g', calories: 120 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Çilek', portion: '100g', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Tavuk göğsü', portion: '180g', calories: 300 },
            { name: 'Mercimek çorbası', portion: '200ml', calories: 140 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 350 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa', portion: '50g', calories: 60 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Cottage cheese', portion: '150g', calories: 150 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Badem', portion: '8 adet', calories: 55 },
          ],
        },
      ],
    },
    {
      day: 26,
      title: 'Gün 26 - Antioksidan Boost 🫐',
      totalCalories: 1820,
      note: 'Renkli meyveler ve sebzelerle antioksidan.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Smoothie bowl', portion: '350g', calories: 280, note: 'Protein, meyve, yoğurt' },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Granola', portion: '30g', calories: 120, note: 'Şekersiz' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Hindi göğsü', portion: '180g', calories: 300 },
            { name: 'Kale salatası', portion: '150g', calories: 80 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Nar taneleri', portion: '50g', calories: 40 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Fırında balık', portion: '200g', calories: 280 },
            { name: 'Pancar salatası', portion: '100g', calories: 50 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
      ],
    },
    {
      day: 27,
      title: 'Gün 27 - Son Sprint 🏃',
      totalCalories: 1780,
      note: 'Son günlere doğru final hazırlığı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 440,
          foods: [
            { name: 'Yumurta beyazı omlet', portion: '5 beyaz + 1 sarı', calories: 150 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Lor peyniri', portion: '80g', calories: 80 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '200g', calories: 330 },
            { name: 'Bulgur', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı-limon', portion: '1 tatlı kaşığı', calories: 55 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Izgara balık', portion: '200g', calories: 280 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Protein shake', portion: '1 servis', calories: 120 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Elma', portion: '1 küçük', calories: 75 },
          ],
        },
      ],
    },
    {
      day: 28,
      title: 'Gün 28 - Dengeleme Günü ⚖️',
      totalCalories: 1800,
      note: 'Vücut adaptasyonu tamamlanıyor.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf lapası', portion: '50g', calories: 180 },
            { name: 'Protein tozu', portion: '30g', calories: 120 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
            { name: 'Tarçın', portion: 'bir tutam', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Tavuk şiş', portion: '180g', calories: 300 },
            { name: 'Mercimek çorbası', portion: '200ml', calories: 140 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 350 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Havuç', portion: '100g', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 29,
      title: 'Gün 29 - Son Adımlar 👣',
      totalCalories: 1820,
      note: 'Yarın son gün! Başarıya çok yakınsınız.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Omlet (sebzeli)', portion: '3 yumurta', calories: 280 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Lor peyniri', portion: '50g', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Hindi göğsü (ızgara)', portion: '200g', calories: 340 },
            { name: 'Kinoa', portion: '120g', calories: 140 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Fırında tavuk göğsü', portion: '200g', calories: 330 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Protein shake', portion: '1 servis', calories: 120 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Çilek', portion: '80g', calories: 30 },
          ],
        },
      ],
    },
    {
      day: 30,
      title: 'Gün 30 - ZAFER GÜNÜ! 🏆🎉',
      totalCalories: 1900,
      note: '30 günü başarıyla tamamladınız! Kas kütleniz arttı, yağ oranınız düştü!',
      meals: [
        {
          type: 'breakfast',
          name: 'Zafer Kahvaltısı',
          totalCalories: 520,
          foods: [
            { name: 'Protein pancake', portion: '2 adet', calories: 250 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Izgara biftek', portion: '180g', calories: 380 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Kutlama Akşam Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 350 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Kutlama Ara Öğünleri',
          totalCalories: 300,
          foods: [
            { name: 'Protein bar', portion: '1 adet', calories: 180, note: 'Kutlama için!' },
            { name: 'Muz', portion: '1 küçük', calories: 90 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 30 GÜNLÜK BEKLENEN SONUÇLAR

💪 KAS VE GÜÇ:
• Kas kütlesinde %3-5 artış
• Kuvvet performansında %10-15 gelişme
• Egzersiz dayanıklılığında artış

⚖️ VÜCUT KOMPOZİSYONU:
• 2-4 kg yağ kaybı
• Bel çevresinde 3-5 cm azalma
• Daha tanımlı kas görünümü

⚡ ENERJİ VE PERFORMANS:
• Daha stabil enerji seviyeleri
• Tokluk hissinde artış
• Daha iyi uyku kalitesi

🧠 GENEL SAĞLIK:
• Kan şekeri dengesinde iyileşme
• Metabolizma hızlanması
• Daha iyi odaklanma

⚠️ Bireysel sonuçlar egzersiz programına ve başlangıç durumuna göre değişebilir.`,

    en: `📊 30-DAY EXPECTED RESULTS

💪 MUSCLE AND STRENGTH:
• 3-5% increase in muscle mass
• 10-15% improvement in strength performance
• Increased exercise endurance

⚖️ BODY COMPOSITION:
• 2-4 kg fat loss
• 3-5 cm reduction in waist circumference
• More defined muscle appearance

⚡ ENERGY AND PERFORMANCE:
• More stable energy levels
• Increased satiety
• Better sleep quality

🧠 GENERAL HEALTH:
• Improved blood sugar balance
• Accelerated metabolism
• Better focus

⚠️ Individual results may vary based on exercise program and starting condition.`,
  },
};
