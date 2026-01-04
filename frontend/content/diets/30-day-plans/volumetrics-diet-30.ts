import { Diet } from '../types';

export const volumetricsDiet30: Diet = {
  id: 'volumetrics',
  name: {
    tr: 'Volumetrics Diyeti',
    en: 'Volumetrics Diet',
  },
  emoji: '🥗',
  isPremium: true,
  duration: 30,
  difficulty: 'easy',

  description: {
    tr: 'Volumetrics Diyeti, Penn State Üniversitesi\' nden Dr. Barbara Rolls tarafından geliştirilen bilimsel bir zayıflama yöntemidir. Bu diyet, düşük kalori yoğunluğuna sahip yiyecekleri tercih ederek daha az kalori alırken doygunluk hissini maksimize etmeyi hedefler. Böylece açlık çekmeden sağlıklı kilo verirsiniz.',
    en: 'The Volumetrics Diet is a scientific weight loss method developed by Dr. Barbara Rolls from Penn State University. This diet aims to maximize satiety while consuming fewer calories by choosing foods with low calorie density. You lose weight healthily without feeling hungry.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR

📊 Kalori Yoğunluğu Konsepti:
• Düşük kalori yoğunluğu = Hacim başına düşük kalori
• Su ve lif içeriği yüksek besinler tercih edilir
• Aynı miktarda yemek yerken %25-30 daha az kalori

🍎 Dört Kategori:
• Kategori 1: Çok düşük yoğunluk (0-0.6 kcal/g) - Serbest
• Kategori 2: Düşük yoğunluk (0.6-1.5 kcal/g) - Ölçülü
• Kategori 3: Orta yoğunluk (1.5-4 kcal/g) - Kısıtlı
• Kategori 4: Yüksek yoğunluk (4+ kcal/g) - Minimum

📈 Araştırma Sonuçları:
• 6 aylık çalışmada ortalama 8 kg kilo kaybı
• Açlık hissi %50 azaldı
• Uzun vadede sürdürülebilir kilo kontrolü
• Yo-yo etkisi minimum

⚠️ Önemli:
• Hızlı yemek yemeyin, çiğneyin
• Her öğüne çorba veya salata ile başlayın`,

    en: `🔬 SCIENTIFIC RESEARCH

📊 Calorie Density Concept:
• Low calorie density = Low calories per volume
• Foods high in water and fiber are preferred
• 25-30% fewer calories while eating same amount

🍎 Four Categories:
• Category 1: Very low density (0-0.6 kcal/g) - Unlimited
• Category 2: Low density (0.6-1.5 kcal/g) - Moderate
• Category 3: Medium density (1.5-4 kcal/g) - Limited
• Category 4: High density (4+ kcal/g) - Minimum

📈 Research Results:
• Average 8 kg weight loss in 6-month study
• Hunger reduced by 50%
• Sustainable long-term weight control
• Minimal yo-yo effect

⚠️ Important:
• Don't eat fast, chew well
• Start each meal with soup or salad`,
  },

  benefits: {
    tr: [
      '⚖️ Açlık çekmeden kilo verme',
      '🥗 Bol miktarda yiyecek tüketme imkanı',
      '💰 Ekonomik - pahalı özel ürünler gerektirmez',
      '🌿 Doğal ve sağlıklı beslenme',
      '💧 Hidrasyon artışı (su içerikli besinler)',
      '🌾 Lif alımı artışı - sindirim sağlığı',
      '🔄 Sürdürülebilir yaşam tarzı',
      '❤️ Kalp sağlığını destekler',
      '🧠 Daha iyi ruh hali ve enerji',
      '📉 Uzun vadede yo-yo etkisi düşük',
    ],
    en: [
      '⚖️ Weight loss without hunger',
      '🥗 Ability to eat large amounts',
      '💰 Economical - no expensive special products',
      '🌿 Natural and healthy nutrition',
      '💧 Increased hydration (water-rich foods)',
      '🌾 Increased fiber intake - digestive health',
      '🔄 Sustainable lifestyle',
      '❤️ Supports heart health',
      '🧠 Better mood and energy',
      '📉 Low yo-yo effect long-term',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Ani lif artışı karın şişkinliği yapabilir',
      '💧 Bol su içmeyi ihmal etmeyin',
      '⏰ Yemekleri yavaş yiyin, iyice çiğneyin',
      '🥩 Protein alımını ihmal etmeyin',
      '🫘 Bazı besinler düşük kalori ama düşük besin değeri',
      '📊 Kalori takibi hala önemli',
    ],
    en: [
      '⚠️ Sudden fiber increase may cause bloating',
      '💧 Don\'t neglect drinking plenty of water',
      '⏰ Eat slowly, chew thoroughly',
      '🥩 Don\'t neglect protein intake',
      '🫘 Some foods are low calorie but low nutritional value',
      '📊 Calorie tracking is still important',
    ],
  },

  allowedFoods: {
    tr: [
      '🍎 KATEGORİ 1 - SERBEST (0-0.6 kcal/g):',
      '🥒 Salatalık, domates, marul',
      '🥬 Ispanak, lahana, brokoli',
      '🍅 Biber, patlıcan, kabak',
      '🍓 Çilek, karpuz, kavun',
      '🍜 Sebze çorbaları (kremasız)',
      '',
      '🍊 KATEGORİ 2 - ÖLÇÜLÜ (0.6-1.5 kcal/g):',
      '🍌 Muz, elma, portakal',
      '🌾 Yulaf, esmer pirinç',
      '🫘 Mercimek, fasulye, nohut',
      '🥛 Az yağlı süt ürünleri',
      '🐟 Yağsız balık, tavuk göğsü',
      '🥚 Haşlanmış yumurta',
      '',
      '⚖️ KATEGORİ 3 - KISITLI (1.5-4 kcal/g):',
      '🥖 Tam buğday ekmek',
      '🧀 Peynir (az yağlı)',
      '🥩 Yağsız kırmızı et',
    ],
    en: [
      '🍎 CATEGORY 1 - UNLIMITED (0-0.6 kcal/g):',
      '🥒 Cucumber, tomato, lettuce',
      '🥬 Spinach, cabbage, broccoli',
      '🍅 Peppers, eggplant, zucchini',
      '🍓 Strawberries, watermelon, melon',
      '🍜 Vegetable soups (no cream)',
      '',
      '🍊 CATEGORY 2 - MODERATE (0.6-1.5 kcal/g):',
      '🍌 Banana, apple, orange',
      '🌾 Oats, brown rice',
      '🫘 Lentils, beans, chickpeas',
      '🥛 Low-fat dairy',
      '🐟 Lean fish, chicken breast',
      '🥚 Boiled eggs',
      '',
      '⚖️ CATEGORY 3 - LIMITED (1.5-4 kcal/g):',
      '🥖 Whole wheat bread',
      '🧀 Cheese (low-fat)',
      '🥩 Lean red meat',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🚫 KATEGORİ 4 - MINİMUM (4+ kcal/g):',
      '🧈 Tereyağı, margarin',
      '🥜 Yağlı kuruyemişler (fazla)',
      '🍫 Çikolata, şekerlemeler',
      '🍪 Bisküvi, kraker',
      '🍟 Kızartmalar, cips',
      '',
      '🚫 KAÇINILACAKLAR:',
      '🥤 Şekerli içecekler',
      '🍟 Fast food',
      '🍰 Pasta, tatlılar',
      '🌭 İşlenmiş etler',
      '🥐 Börek, poğaça',
    ],
    en: [
      '🚫 CATEGORY 4 - MINIMUM (4+ kcal/g):',
      '🧈 Butter, margarine',
      '🥜 Fatty nuts (excessive)',
      '🍫 Chocolate, candies',
      '🍪 Cookies, crackers',
      '🍟 Fried foods, chips',
      '',
      '🚫 AVOID:',
      '🥤 Sugary drinks',
      '🍟 Fast food',
      '🍰 Cakes, desserts',
      '🌭 Processed meats',
      '🥐 Pastries',
    ],
  },

  exercises: [
    {
      name: 'Yürüyüş / Walking',
      duration: '30-45 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Düşük yoğunluklu, sürdürülebilir.',
    },
    {
      name: 'Yüzme / Swimming',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 3 kez / 3 times a week',
      note: 'Tüm vücut egzersizi.',
    },
    {
      name: 'Yoga / Yoga',
      duration: '30 dakika / minutes',
      frequency: 'Haftada 3-4 kez / 3-4 times a week',
      note: 'Esneklik ve stres azaltma.',
    },
    {
      name: 'Dans / Dancing',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Eğlenceli kardiyovasküler egzersiz.',
    },
    {
      name: 'Hafif Ağırlık / Light Weights',
      duration: '20-30 dakika / minutes',
      frequency: 'Haftada 2 kez / 2 times a week',
      note: 'Kas kütlesini korumak için.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Volumetrics\'e Hoş Geldiniz 🥗',
      totalCalories: 1500,
      note: 'Çok yiyin, az kalori alın!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Yulaf ezmesi (su ile)', portion: '60g', calories: 180 },
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
            { name: 'Yağsız süt', portion: '150ml', calories: 55 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Sebze çorbası (krem yok)', portion: '300ml', calories: 100 },
            { name: 'Dev yeşil salata', portion: '300g', calories: 80 },
            { name: 'Izgara tavuk göğsü', portion: '120g', calories: 200 },
            { name: 'Zeytinyağı-limon sos', portion: '1 tatlı kaşığı', calories: 45 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 400,
          foods: [
            { name: 'Fırında balık', portion: '150g', calories: 200 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Havuç', portion: '150g', calories: 60 },
            { name: 'Haşlanmış patates', portion: '100g', calories: 80 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '300g', calories: 90 },
            { name: 'Havuç çubukları', portion: '150g', calories: 60 },
            { name: 'Yoğurt (yağsız)', portion: '150g', calories: 75 },
            { name: 'Salatalık', portion: '200g', calories: 30 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Çorba Günü 🍜',
      totalCalories: 1450,
      note: 'Çorba ile doygunluk maksimize!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 320,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Domates', portion: '2 orta', calories: 50 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 430,
          foods: [
            { name: 'Mercimek çorbası', portion: '350ml', calories: 200 },
            { name: 'Bol yeşillikli salata', portion: '250g', calories: 60 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 400,
          foods: [
            { name: 'Tavuk sebze çorbası', portion: '400ml', calories: 200 },
            { name: 'Izgara kabak', portion: '200g', calories: 50 },
            { name: 'Esmer pirinç', portion: '80g', calories: 90 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kavun', portion: '300g', calories: 100 },
            { name: 'Çilek', portion: '200g', calories: 65 },
            { name: 'Havuç + salatalık', portion: '200g', calories: 55 },
            { name: 'Elma', portion: '1 küçük', calories: 75 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Salata Şöleni 🥗',
      totalCalories: 1480,
      note: 'Devasa salatalar ile tok kalın!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 340,
          foods: [
            { name: 'Smoothie', portion: '400ml', calories: 180, note: 'Meyve + yoğurt + ıspanak' },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Lor peyniri', portion: '50g', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Mega protein salatası', portion: '400g', calories: 350, note: 'Tavuk, yeşillik, nohut, domates' },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında levrek', portion: '150g', calories: 200 },
            { name: 'Karışık ızgara sebze', portion: '300g', calories: 100 },
            { name: 'Roka salatası', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '400g', calories: 120 },
            { name: 'Salatalık çubukları', portion: '200g', calories: 30 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Armut', portion: '1 küçük', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Su İçerikli Gün 💧',
      totalCalories: 1450,
      note: 'Su içeriği yüksek besinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 330,
          foods: [
            { name: 'Yulaf lapası', portion: '50g', calories: 150 },
            { name: 'Karpuz', portion: '200g', calories: 60 },
            { name: 'Yağsız süt', portion: '150ml', calories: 55 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 420,
          foods: [
            { name: 'Domates çorbası', portion: '300ml', calories: 100 },
            { name: 'Ton balıklı salata', portion: '300g', calories: 250, note: 'Suda ton, yeşillik' },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 400,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '140g', calories: 230 },
            { name: 'Kabak (buharda)', portion: '200g', calories: 35 },
            { name: 'Biber (ızgara)', portion: '150g', calories: 30 },
            { name: 'Bulgur', portion: '80g', calories: 100 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kavun', portion: '350g', calories: 120 },
            { name: 'Havuç', portion: '150g', calories: 60 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Domates', portion: '2 orta', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Lif Günü 🌾',
      totalCalories: 1500,
      note: 'Yüksek lif = uzun süreli tokluk.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 360,
          foods: [
            { name: 'Kepekli müsli', portion: '50g', calories: 180 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yağsız süt', portion: '200ml', calories: 75 },
            { name: 'Chia tohumu', portion: '1 tatlı kaşığı', calories: 40 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fasulye çorbası', portion: '300ml', calories: 180 },
            { name: 'Devasa yeşil salata', portion: '300g', calories: 80 },
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Brokoli (buharda)', portion: '250g', calories: 85 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Armut', portion: '1 küçük', calories: 60 },
            { name: 'Havuç', portion: '150g', calories: 60 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Renkli Gün 🌈',
      totalCalories: 1480,
      note: 'Gökkuşağı renginde sebze ve meyveler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Meyve salatası', portion: '250g', calories: 150 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Yulaf', portion: '30g', calories: 110 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Gökkuşağı salatası', portion: '350g', calories: 120, note: 'Domates, havuç, mısır, mor lahana' },
            { name: 'Izgara tavuk', portion: '130g', calories: 215 },
            { name: 'Bulgur', portion: '80g', calories: 100 },
            { name: 'Limon sos', portion: '1 tatlı kaşığı', calories: 5 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Sebze güveç', portion: '350g', calories: 180, note: 'Patlıcan, kabak, biber, domates' },
            { name: 'Balık (ızgara)', portion: '120g', calories: 160 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '300g', calories: 90 },
            { name: 'Kiraz', portion: '150g', calories: 75 },
            { name: 'Salatalık', portion: '200g', calories: 30 },
            { name: 'Portakal', portion: '1 orta', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - İlk Hafta Başarısı! 🎉',
      totalCalories: 1550,
      note: 'Bir haftayı başarıyla tamamladınız!',
      meals: [
        {
          type: 'breakfast',
          name: 'Hafta Sonu Kahvaltısı',
          totalCalories: 380,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta + sebze', calories: 200 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Meyve', portion: '150g', calories: 75 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Minestrone çorbası', portion: '350ml', calories: 180 },
            { name: 'Izgara balık', portion: '150g', calories: 200 },
            { name: 'Dev salata', portion: '250g', calories: 60 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Izgara sebze', portion: '300g', calories: 100 },
            { name: 'Cacık', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '300g', calories: 150 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Havuç çubukları', portion: '150g', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 8,
      title: 'Gün 8 - Yeni Hafta Enerjisi ⚡',
      totalCalories: 1480,
      note: 'İkinci hafta başladı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 340,
          foods: [
            { name: 'Yulaf ezmesi', portion: '50g', calories: 180 },
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Tavuklu salata', portion: '350g', calories: 280 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında çipura', portion: '180g', calories: 250 },
            { name: 'Buharda sebze', portion: '250g', calories: 80 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kavun', portion: '300g', calories: 100 },
            { name: 'Salatalık', portion: '200g', calories: 30 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 9,
      title: 'Gün 9 - Protein Takviyesi 🐟',
      totalCalories: 1500,
      note: 'Düşük kalorili proteinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Yumurta beyazı omlet', portion: '4 beyaz', calories: 70 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Ton balıklı wrap', portion: '1 adet', calories: 280, note: 'Tam buğday lavaş, sebze' },
            { name: 'Sebze çorbası', portion: '250ml', calories: 80 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 400,
          foods: [
            { name: 'Izgara hindi göğsü', portion: '150g', calories: 250 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Havuç', portion: '150g', calories: 60 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '350g', calories: 105 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Havuç çubukları', portion: '150g', calories: 60 },
            { name: 'Armut', portion: '1 küçük', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 10,
      title: 'Gün 10 - 10 Gün Başarısı! 🌟',
      totalCalories: 1480,
      note: '10 günü tamamladınız!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Smoothie bowl', portion: '350g', calories: 200, note: 'Meyve, yoğurt, ıspanak' },
            { name: 'Granola', portion: '20g', calories: 80, note: 'Şekersiz' },
            { name: 'Çilek', portion: '100g', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 180 },
            { name: 'Izgara tavuk', portion: '120g', calories: 200 },
            { name: 'Dev salata', portion: '250g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında balık', portion: '160g', calories: 220 },
            { name: 'Izgara sebze', portion: '300g', calories: 100 },
            { name: 'Ispanak salatası', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '250g', calories: 125 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Salatalık', portion: '200g', calories: 30 },
            { name: 'Kiraz', portion: '100g', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 11,
      title: 'Gün 11 - Hafif Gün 🍃',
      totalCalories: 1450,
      note: 'Ekstra hafif menü.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 320,
          foods: [
            { name: 'Yulaf lapası (su ile)', portion: '50g', calories: 180 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 430,
          foods: [
            { name: 'Sebze çorbası', portion: '350ml', calories: 120 },
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Mega salata', portion: '300g', calories: 80 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 400,
          foods: [
            { name: 'Tavuk göğsü (buharda)', portion: '140g', calories: 230 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Kabak (buharda)', portion: '200g', calories: 35 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '400g', calories: 120 },
            { name: 'Havuç', portion: '150g', calories: 60 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
          ],
        },
      ],
    },
    {
      day: 12,
      title: 'Gün 12 - Baklagil Günü 🫘',
      totalCalories: 1500,
      note: 'Düşük kalori yoğunluklu baklagiller.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Humus', portion: '60g', calories: 120 },
            { name: 'Tam buğday pide', portion: '1/2 adet', calories: 100 },
            { name: 'Domates', portion: '2 orta', calories: 50 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 460,
          foods: [
            { name: 'Nohut çorbası', portion: '300ml', calories: 200 },
            { name: 'Izgara tavuk', portion: '100g', calories: 165 },
            { name: 'Dev salata', portion: '250g', calories: 60 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Mercimek köftesi', portion: '6 adet', calories: 250 },
            { name: 'Cacık', portion: '150g', calories: 80 },
            { name: 'Yeşil salata', portion: '200g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kavun', portion: '300g', calories: 100 },
            { name: 'Havuç çubukları + humus', portion: '100g + 30g', calories: 100 },
            { name: 'Armut', portion: '1 orta', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 13,
      title: 'Gün 13 - Deniz Günü 🐟',
      totalCalories: 1480,
      note: 'Düşük kalorili deniz ürünleri.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 340,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Balık çorbası', portion: '300ml', calories: 150 },
            { name: 'Karides salatası', portion: '250g', calories: 200 },
            { name: 'Limon-zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
            { name: 'Yeşil yapraklar', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 400,
          foods: [
            { name: 'Fırında levrek', portion: '180g', calories: 250 },
            { name: 'Buharda sebze', portion: '250g', calories: 80 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '350g', calories: 105 },
            { name: 'Salatalık', portion: '200g', calories: 30 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Portakal', portion: '1 orta', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 14,
      title: 'Gün 14 - 2 Hafta Başarısı! 🏆',
      totalCalories: 1550,
      note: 'Yarı yoldayız! 1-2 kg kaybettiniz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 380,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Meyve salatası', portion: '200g', calories: 100 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Izgara tavuk', portion: '150g', calories: 250 },
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Dev salata', portion: '250g', calories: 60 },
            { name: 'Bulgur', portion: '60g', calories: 75 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Izgara sebze', portion: '250g', calories: 80 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '300g', calories: 150 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Havuç çubukları', portion: '150g', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 15,
      title: 'Gün 15 - Üçüncü Hafta Başlangıcı 🚀',
      totalCalories: 1480,
      note: 'Yarıyı geçtiniz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Yulaf ezmesi', portion: '50g', calories: 180 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yağsız süt', portion: '150ml', calories: 55 },
            { name: 'Çilek', portion: '100g', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 180 },
            { name: 'Tavuklu salata', portion: '300g', calories: 250 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Izgara balık', portion: '160g', calories: 220 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Kabak', portion: '200g', calories: 35 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kavun', portion: '300g', calories: 100 },
            { name: 'Salatalık', portion: '200g', calories: 30 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 16,
      title: 'Gün 16 - Su İçerikli Boost 💧',
      totalCalories: 1450,
      note: 'Ekstra hidrasyon günü.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 330,
          foods: [
            { name: 'Smoothie', portion: '400ml', calories: 180, note: 'Karpuz, çilek, yoğurt' },
            { name: 'Yulaf', portion: '30g', calories: 110 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 430,
          foods: [
            { name: 'Domates çorbası', portion: '300ml', calories: 100 },
            { name: 'Izgara tavuk', portion: '140g', calories: 230 },
            { name: 'Dev salata', portion: '300g', calories: 80 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında çipura', portion: '180g', calories: 250 },
            { name: 'Buharda sebze', portion: '250g', calories: 80 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '400g', calories: 120 },
            { name: 'Havuç çubukları', portion: '150g', calories: 60 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Salatalık', portion: '150g', calories: 25 },
          ],
        },
      ],
    },
    {
      day: 17,
      title: 'Gün 17 - Çorba Festivali 🍜',
      totalCalories: 1480,
      note: 'Her öğünde doyurucu çorba.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 340,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Domates', portion: '2 orta', calories: 50 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Sebze çorbası', portion: '350ml', calories: 120 },
            { name: 'Tavuklu salata', portion: '300g', calories: 250 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Balık çorbası', portion: '300ml', calories: 150 },
            { name: 'Izgara sebze', portion: '300g', calories: 100 },
            { name: 'Esmer pirinç', portion: '80g', calories: 90 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '300g', calories: 150 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Havuç', portion: '150g', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 18,
      title: 'Gün 18 - Sebze Cenneti 🥬',
      totalCalories: 1450,
      note: 'Serbest kategori besinleri ağırlıklı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 330,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200, note: '🥬 ıspanak, biber, domates' },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Meyve', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 430,
          foods: [
            { name: 'Sebze güveç', portion: '400g', calories: 200 },
            { name: 'Izgara tavuk', portion: '100g', calories: 165 },
            { name: 'Dev salata', portion: '200g', calories: 50 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında balık', portion: '150g', calories: 200 },
            { name: 'Izgara sebze', portion: '350g', calories: 120 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '350g', calories: 105 },
            { name: 'Salatalık çubukları', portion: '200g', calories: 30 },
            { name: 'Havuç', portion: '150g', calories: 60 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
          ],
        },
      ],
    },
    {
      day: 19,
      title: 'Gün 19 - Enerji Günü ⚡',
      totalCalories: 1500,
      note: 'Düşük kalori yoğunluğu, yüksek enerji.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 360,
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 220 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Yağsız süt', portion: '150ml', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Kinoa salatası', portion: '300g', calories: 300, note: 'Kinoa, sebze, tavuk' },
            { name: 'Sebze çorbası', portion: '200ml', calories: 70 },
            { name: 'Yeşil yapraklar', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Hindi göğsü (ızgara)', portion: '150g', calories: 250 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Havuç', portion: '150g', calories: 60 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kavun', portion: '300g', calories: 100 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Salatalık', portion: '100g', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 20,
      title: 'Gün 20 - 20 Gün Başarısı! 🌟',
      totalCalories: 1480,
      note: '20 gün tamamlandı! 2-3 kg gitmiş olmalı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Smoothie bowl', portion: '350g', calories: 200 },
            { name: 'Granola', portion: '20g', calories: 80, note: 'Şekersiz' },
            { name: 'Çilek', portion: '100g', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 180 },
            { name: 'Izgara tavuk', portion: '130g', calories: 215 },
            { name: 'Dev salata', portion: '250g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Izgara sebze', portion: '250g', calories: 80 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '300g', calories: 150 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Havuç çubukları', portion: '150g', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 21,
      title: 'Gün 21 - 3 Hafta Şampiyonu! 🏆',
      totalCalories: 1550,
      note: 'Üç haftayı tamamladınız! Harika gidiyorsunuz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 380,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Meyve salatası', portion: '150g', calories: 75 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Izgara balık', portion: '160g', calories: 220 },
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Dev salata', portion: '250g', calories: 60 },
            { name: 'Bulgur', portion: '80g', calories: 100 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Izgara sebze', portion: '300g', calories: 100 },
            { name: 'Cacık', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '350g', calories: 105 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
          ],
        },
      ],
    },
    {
      day: 22,
      title: 'Gün 22 - Son Hafta Başlangıcı 🎯',
      totalCalories: 1480,
      note: 'Son hafta! Hedefe çok yakınız.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Yulaf ezmesi', portion: '50g', calories: 180 },
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Tavuklu salata', portion: '350g', calories: 280 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında balık', portion: '160g', calories: 220 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Kabak', portion: '200g', calories: 35 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kavun', portion: '300g', calories: 100 },
            { name: 'Havuç çubukları', portion: '150g', calories: 60 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Salatalık', portion: '150g', calories: 25 },
          ],
        },
      ],
    },
    {
      day: 23,
      title: 'Gün 23 - Detoks Günü 🌿',
      totalCalories: 1450,
      note: 'Hafif ve arındırıcı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 320,
          foods: [
            { name: 'Yeşil smoothie', portion: '400ml', calories: 180, note: 'Ispanak, elma, salatalık' },
            { name: 'Yulaf', portion: '30g', calories: 110 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 430,
          foods: [
            { name: 'Sebze çorbası', portion: '350ml', calories: 120 },
            { name: 'Izgara tavuk', portion: '120g', calories: 200 },
            { name: 'Dev salata', portion: '300g', calories: 80 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 400,
          foods: [
            { name: 'Buharda balık', portion: '150g', calories: 200 },
            { name: 'Buharda sebze', portion: '300g', calories: 100 },
            { name: 'Ispanak', portion: '150g', calories: 40 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '400g', calories: 120 },
            { name: 'Salatalık', portion: '200g', calories: 30 },
            { name: 'Havuç', portion: '150g', calories: 60 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
          ],
        },
      ],
    },
    {
      day: 24,
      title: 'Gün 24 - Protein Boost 💪',
      totalCalories: 1500,
      note: 'Düşük kalorili proteinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Yumurta beyazı omlet', portion: '4 beyaz', calories: 70 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 460,
          foods: [
            { name: 'Izgara hindi göğsü', portion: '160g', calories: 270 },
            { name: 'Sebze çorbası', portion: '250ml', calories: 80 },
            { name: 'Dev salata', portion: '250g', calories: 60 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Havuç', portion: '100g', calories: 40 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Yoğurt', portion: '200g', calories: 100 },
            { name: 'Meyve tabağı', portion: '200g', calories: 100 },
            { name: 'Salatalık çubukları', portion: '200g', calories: 30 },
            { name: 'Havuç', portion: '150g', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 25,
      title: 'Gün 25 - Son 5 Gün! 🌟',
      totalCalories: 1480,
      note: 'Son 5 gün kaldı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Smoothie bowl', portion: '350g', calories: 200 },
            { name: 'Granola', portion: '20g', calories: 80, note: 'Şekersiz' },
            { name: 'Çilek', portion: '100g', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 180 },
            { name: 'Tavuklu salata', portion: '300g', calories: 250 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Izgara balık', portion: '160g', calories: 220 },
            { name: 'Izgara sebze', portion: '300g', calories: 100 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kavun', portion: '300g', calories: 100 },
            { name: 'Havuç', portion: '150g', calories: 60 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Salatalık', portion: '150g', calories: 25 },
          ],
        },
      ],
    },
    {
      day: 26,
      title: 'Gün 26 - Dengeli Gün ⚖️',
      totalCalories: 1500,
      note: 'Dengeli ve doyurucu.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 360,
          foods: [
            { name: 'Yulaf ezmesi', portion: '50g', calories: 180 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yağsız süt', portion: '150ml', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Izgara tavuk', portion: '140g', calories: 230 },
            { name: 'Dev salata', portion: '250g', calories: 60 },
            { name: 'Bulgur', portion: '50g', calories: 65 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında çipura', portion: '180g', calories: 250 },
            { name: 'Buharda sebze', portion: '250g', calories: 80 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '350g', calories: 105 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Havuç çubukları', portion: '150g', calories: 60 },
            { name: 'Armut', portion: '1 küçük', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 27,
      title: 'Gün 27 - Son 3 Gün! 🏃',
      totalCalories: 1480,
      note: 'Son 3 güne girdik!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Tavuklu salata', portion: '350g', calories: 280 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '300g', calories: 150 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Salatalık', portion: '200g', calories: 30 },
          ],
        },
      ],
    },
    {
      day: 28,
      title: 'Gün 28 - Son 2 Gün! ✨',
      totalCalories: 1500,
      note: 'Son 2 gün! Harika gidiyorsunuz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 360,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Meyve', portion: '150g', calories: 75 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 180 },
            { name: 'Izgara tavuk', portion: '130g', calories: 215 },
            { name: 'Dev salata', portion: '250g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Izgara balık', portion: '160g', calories: 220 },
            { name: 'Izgara sebze', portion: '300g', calories: 100 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kavun', portion: '300g', calories: 100 },
            { name: 'Havuç', portion: '150g', calories: 60 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Salatalık', portion: '150g', calories: 25 },
          ],
        },
      ],
    },
    {
      day: 29,
      title: 'Gün 29 - Yarın Son Gün! 🎉',
      totalCalories: 1480,
      note: 'Yarın 30 günü tamamlıyorsunuz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 350,
          foods: [
            { name: 'Yulaf ezmesi', portion: '50g', calories: 180 },
            { name: 'Çilek', portion: '150g', calories: 50 },
            { name: 'Yoğurt', portion: '100g', calories: 50 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Tavuklu salata', portion: '350g', calories: 280 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Fırında çipura', portion: '180g', calories: 250 },
            { name: 'Buharda sebze', portion: '250g', calories: 80 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Karpuz', portion: '350g', calories: 105 },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Havuç çubukları', portion: '150g', calories: 60 },
            { name: 'Armut', portion: '1 küçük', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 30,
      title: 'Gün 30 - ZAFER GÜNÜ! 🏆🎉',
      totalCalories: 1550,
      note: '30 günü başarıyla tamamladınız! 3-5 kg kaybettiniz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Zafer Kahvaltısı',
          totalCalories: 380,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Meyve salatası', portion: '150g', calories: 75 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Izgara somon', portion: '150g', calories: 280 },
            { name: 'Sebze çorbası', portion: '300ml', calories: 100 },
            { name: 'Dev salata', portion: '250g', calories: 60 },
            { name: 'Bulgur', portion: '50g', calories: 65 },
          ],
        },
        {
          type: 'dinner',
          name: 'Kutlama Akşam Yemeği',
          totalCalories: 390,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Izgara sebze', portion: '300g', calories: 100 },
            { name: 'Cacık', portion: '100g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Kutlama Ara Öğünleri',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı', portion: '300g', calories: 150, note: 'Kutlama!' },
            { name: 'Yoğurt', portion: '150g', calories: 75 },
            { name: 'Havuç çubukları', portion: '150g', calories: 60 },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 30 GÜNLÜK BEKLENEN SONUÇLAR

⚖️ KİLO KAYBI:
• 3-5 kg sağlıklı kilo kaybı
• Bel çevresinde 4-6 cm azalma
• Açlık hissi minimum
• Yo-yo etkisi düşük

🌿 SİNDİRİM SAĞLIĞI:
• Düzensiz bağırsak hareketi iyileşir
• Şişkinlik azalır
• Lif alımı optimize olur

💧 HİDRASYON:
• Cilt kalitesinde iyileşme
• Enerji seviyesi artışı
• Daha iyi odaklanma

❤️ GENEL SAĞLIK:
• Kolesterol düşüşü
• Kan basıncı dengelenmesi
• İltihap azalması

⚠️ Bu diyet sürdürülebilir bir yaşam tarzıdır, 30 gün sonra da devam edebilirsiniz.`,

    en: `📊 30-DAY EXPECTED RESULTS

⚖️ WEIGHT LOSS:
• 3-5 kg healthy weight loss
• 4-6 cm reduction in waist circumference
• Minimal hunger sensation
• Low yo-yo effect

🌿 DIGESTIVE HEALTH:
• Irregular bowel movements improve
• Bloating decreases
• Fiber intake optimized

💧 HYDRATION:
• Improved skin quality
• Increased energy levels
• Better focus

❤️ GENERAL HEALTH:
• Cholesterol reduction
• Blood pressure balance
• Inflammation reduction

⚠️ This diet is a sustainable lifestyle, you can continue after 30 days.`,
  },
};
