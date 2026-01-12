import { Diet } from './types';

export const lowCarbDiet: Diet = {
  id: 'low-carb',
  name: {
    tr: 'Düşük Karbonhidrat Diyeti',
    en: 'Low Carb Diet',
  },
  emoji: '🥗',
  isPremium: true,
  duration: 30,
  difficulty: 'medium',

  description: {
    tr: 'Düşük karbonhidrat diyeti, günlük karbonhidrat alımını %10-40 arasına (yaklaşık 50-150g) düşürerek vücudu yağ yakımına teşvik eden bir beslenme yaklaşımıdır. Ketojenik diyetten daha esnek olan bu yöntem, sürdürülebilir kilo kaybı ve kan şekeri kontrolü için idealdir. Protein ve sağlıklı yağlar ön plandadır.',
    en: 'The low carb diet is a nutritional approach that encourages the body to burn fat by reducing daily carbohydrate intake to 10-40% (approximately 50-150g). More flexible than the ketogenic diet, this method is ideal for sustainable weight loss and blood sugar control. Protein and healthy fats are prioritized.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Harvard Araştırması (2024):
• 3 büyük kohort çalışması (Nurses' Health Study I, II ve Health Professionals)
• Sağlıklı düşük karbonhidrat diyeti (HLCD) uzun vadede daha az kilo alımıyla ilişkili
• Bitkisel protein ve yağ kaynaklarına odaklanan versiyonlar en etkili

📈 Tip 2 Diyabet Yönetimi:
• Meta-analiz sonuçları: HbA1c'de anlamlı düşüş
• İnsülin direncinde iyileşme
• Diyabet remisyonunda etkili olabilir
• Düşük yağlı diyetlerden daha iyi glisemik kontrol

⚖️ Kilo Kaybı Etkinliği:
• 12 ayda ortalama 7.25 kg kayıp
• 24 ayda ortalama 4.7 kg kayıp (uzun vadeli sürdürülebilirlik)
• Düşük yağlı ve Akdeniz diyetlerinden daha etkili kısa vadede
• Toplam kalori alımı, zamanlama kadar önemli

💓 Kardiyovasküler Göstergeler:
• LDL kolesterol: Değişken (diyet kalitesine bağlı)
• HDL kolesterol: Genellikle artar
• Trigliserit: Belirgin düşüş
• Kan basıncı: Hafif iyileşme

🔬 Metabolik Mekanizma:
• Düşük karbonhidrat → Düşük insülin → Yağ yakımı kolaylaşır
• Glukoneogenez aktive olur (proteinlerden glikoz üretimi)
• Yağ asitleri enerji için kullanılır
• Hafif ketoz durumu oluşabilir`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 Harvard Research (2024):
• 3 large cohort studies (Nurses' Health Study I, II and Health Professionals)
• Healthy low carb diet (HLCD) associated with less weight gain long-term
• Versions focusing on plant protein and fat sources most effective

📈 Type 2 Diabetes Management:
• Meta-analysis results: Significant decrease in HbA1c
• Improvement in insulin resistance
• Can be effective in diabetes remission
• Better glycemic control than low-fat diets

⚖️ Weight Loss Effectiveness:
• Average 7.25 kg loss at 12 months
• Average 4.7 kg loss at 24 months (long-term sustainability)
• More effective than low-fat and Mediterranean diets short-term
• Total calorie intake as important as timing

💓 Cardiovascular Indicators:
• LDL cholesterol: Variable (depends on diet quality)
• HDL cholesterol: Generally increases
• Triglycerides: Significant decrease
• Blood pressure: Slight improvement

🔬 Metabolic Mechanism:
• Low carbs → Low insulin → Fat burning facilitated
• Gluconeogenesis activated (glucose production from proteins)
• Fatty acids used for energy
• Mild ketosis state may occur`,
  },

  benefits: {
    tr: [
      '⚖️ Etkili ve sürdürülebilir kilo kaybı',
      '📉 Kan şekeri kontrolü - diyabet yönetiminde etkili',
      '🍽️ Açlık hissinde azalma - protein ve yağ doyurucu',
      '⚡ Stabil enerji seviyeleri - kan şekeri dalgalanmaları azalır',
      '❤️ Trigliserit ve HDL kolesterol iyileşmesi',
      '🧠 Zihinsel netlik - kan şekeri stabilitesi sayesinde',
      '💪 Kas kütlesinin korunması - yüksek protein alımı ile',
      '🔄 Ketojenik diyetten daha esnek ve uygulanabilir',
      '🥗 Çeşitli yiyecek seçenekleri - kısıtlama daha az',
      '📊 Uzun vadede sürdürülebilir yaşam tarzı değişikliği',
    ],
    en: [
      '⚖️ Effective and sustainable weight loss',
      '📉 Blood sugar control - effective in diabetes management',
      '🍽️ Reduced hunger - protein and fat are satiating',
      '⚡ Stable energy levels - reduced blood sugar fluctuations',
      '❤️ Improved triglycerides and HDL cholesterol',
      '🧠 Mental clarity - thanks to blood sugar stability',
      '💪 Muscle mass preservation - with high protein intake',
      '🔄 More flexible and applicable than ketogenic diet',
      '🥗 Various food options - less restriction',
      '📊 Sustainable lifestyle change long-term',
    ],
  },

  warnings: {
    tr: [
      '⚠️ İlk hafta halsizlik ve baş ağrısı olabilir',
      '🚫 Böbrek hastalığı olanlar protein alımına dikkat etmeli',
      '💊 Diyabet ilaçları kullananlar doktora danışmalı',
      '🚫 Hamileler ve emziren anneler için uygun değil',
      '💧 Bol su tüketimi önemli - dehidratasyon riski',
      '🥬 Lif alımına dikkat - kabızlık olabilir',
      '📅 Uzun vadeli uygulamada vitamin-mineral takviyesi gerekebilir',
      '🏃 Yoğun sporcular performans düşüşü yaşayabilir başlangıçta',
    ],
    en: [
      '⚠️ Fatigue and headache may occur in the first week',
      '🚫 Those with kidney disease should watch protein intake',
      '💊 Those on diabetes medications should consult doctor',
      '🚫 Not suitable for pregnant or breastfeeding women',
      '💧 Adequate water intake important - dehydration risk',
      '🥬 Watch fiber intake - constipation may occur',
      '📅 Vitamin-mineral supplementation may be needed long-term',
      '🏃 Intense athletes may experience performance drop initially',
    ],
  },

  allowedFoods: {
    tr: [
      '🥩 YÜKSEK PROTEİN KAYNAKLARI:',
      '🥩 Kırmızı et (dana, kuzu)',
      '🍗 Kümes hayvanları (tavuk, hindi)',
      '🐟 Her türlü balık ve deniz ürünleri',
      '🥚 Yumurta (sınırsız)',
      '',
      '🥬 DÜŞÜK KARBONHIDRATLI SEBZELER:',
      '🥦 Brokoli, karnabahar, brüksel lahanası',
      '🥬 Ispanak, pazı, roka, marul',
      '🥒 Salatalık, kabak, patlıcan',
      '🫑 Biber (tüm çeşitler)',
      '🍄 Mantar',
      '🧅 Soğan, sarımsak (orta düzey)',
      '',
      '🧀 SÜT ÜRÜNLERİ:',
      '🧀 Peynirler (her çeşit)',
      '🥛 Tam yağlı yoğurt',
      '🧈 Tereyağı, krema',
      '',
      '🫒 SAĞLIKLI YAĞLAR:',
      '🫒 Zeytinyağı, hindistan cevizi yağı',
      '🥑 Avokado',
      '🥜 Kuruyemişler (badem, ceviz, fındık)',
      '',
      '🍎 DÜŞÜK ŞEKERLİ MEYVELER (sınırlı):',
      '🫐 Çilek, ahududu, böğürtlen, yaban mersini',
    ],
    en: [
      '🥩 HIGH PROTEIN SOURCES:',
      '🥩 Red meat (beef, lamb)',
      '🍗 Poultry (chicken, turkey)',
      '🐟 All fish and seafood',
      '🥚 Eggs (unlimited)',
      '',
      '🥬 LOW-CARB VEGETABLES:',
      '🥦 Broccoli, cauliflower, Brussels sprouts',
      '🥬 Spinach, chard, arugula, lettuce',
      '🥒 Cucumber, zucchini, eggplant',
      '🫑 Peppers (all varieties)',
      '🍄 Mushrooms',
      '🧅 Onion, garlic (moderate)',
      '',
      '🧀 DAIRY PRODUCTS:',
      '🧀 Cheeses (all types)',
      '🥛 Full-fat yogurt',
      '🧈 Butter, cream',
      '',
      '🫒 HEALTHY FATS:',
      '🫒 Olive oil, coconut oil',
      '🥑 Avocado',
      '🥜 Nuts (almonds, walnuts, hazelnuts)',
      '',
      '🍎 LOW-SUGAR FRUITS (limited):',
      '🫐 Strawberries, raspberries, blackberries, blueberries',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🍞 NİŞASTA VE TAHILLAR:',
      '🍞 Ekmek, pide, lavaş',
      '🍚 Pirinç, bulgur, makarna',
      '🥣 Tahıllar ve gevrekler',
      '🌽 Mısır ve mısır ürünleri',
      '',
      '🍬 ŞEKERLER:',
      '🍬 Rafine şeker, bal, pekmez',
      '🍰 Pasta, kek, bisküvi',
      '🍫 Çikolata ve şekerlemeler',
      '🥤 Şekerli içecekler, meyve suları',
      '',
      '🥔 NİŞASTALI SEBZELER:',
      '🥔 Patates, tatlı patates',
      '🥕 Havuç, pancar (yüksek miktarda)',
      '🫘 Baklagiller (sınırlı izin verilebilir)',
      '',
      '🍎 YÜKSEK ŞEKERLİ MEYVELER:',
      '🍌 Muz, üzüm, mango, ananas',
      '🍎 Elma, armut (sınırlı)',
    ],
    en: [
      '🍞 STARCHES AND GRAINS:',
      '🍞 Bread, pita, flatbread',
      '🍚 Rice, bulgur, pasta',
      '🥣 Cereals and grains',
      '🌽 Corn and corn products',
      '',
      '🍬 SUGARS:',
      '🍬 Refined sugar, honey, molasses',
      '🍰 Cake, pastries, cookies',
      '🍫 Chocolate and candies',
      '🥤 Sugary drinks, fruit juices',
      '',
      '🥔 STARCHY VEGETABLES:',
      '🥔 Potato, sweet potato',
      '🥕 Carrots, beets (high amounts)',
      '🫘 Legumes (can be limited allowed)',
      '',
      '🍎 HIGH-SUGAR FRUITS:',
      '🍌 Banana, grapes, mango, pineapple',
      '🍎 Apple, pear (limited)',
    ],
  },

  exercises: [
    {
      name: 'Ağırlık Antrenmanı / Weight Training',
      duration: '40-50 dakika / minutes',
      frequency: 'Haftada 3-4 kez / 3-4 times per week',
      note: 'Kas kütlesini korumak ve metabolizmayı hızlandırmak için önemli.',
    },
    {
      name: 'Yürüyüş / Walking',
      duration: '30-45 dakika / 30-45 minutes',
      frequency: 'Her gün / Daily',
      note: 'Düşük yoğunluklu kardiyo yağ yakımı için ideal.',
    },
    {
      name: 'HIIT',
      duration: '20-25 dakika / minutes',
      frequency: 'Haftada 2 kez / 2 times per week',
      note: 'Kısa süreli yoğun antrenman. Adaptasyon dönemi sonrası başlayın.',
    },
    {
      name: 'Yüzme veya Bisiklet',
      duration: '30-45 dakika / 30-45 minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times per week',
      note: 'Eklem dostu kardiyo seçenekleri.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Düşük Karbonhidrat Başlangıcı',
      totalCalories: 1700,
      note: 'Bugün yaklaşık 80g karbonhidrat alacaksınız. Bu geçiş aşamasıdır.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Scrambled eggs', portion: '3 yumurta', calories: 220 },
            { name: 'Pastırma', portion: '40g', calories: 100 },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Domates', portion: '1 küçük', calories: 15 },
            { name: 'Kahve', portion: '1 fincan', calories: 5, note: 'Şekersiz' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '180g', calories: 300 },
            { name: 'Karışık yeşil salata', portion: '200g', calories: 80 },
            { name: 'Zeytinyağı', portion: '2 yemek kaşığı', calories: 180 },
            { name: 'Feta peyniri', portion: '30g', calories: 75 },
            { name: 'Limonlu su', portion: '300ml', calories: 5 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Somon fırında', portion: '180g', calories: 370 },
            { name: 'Buharda brokoli', portion: '150g', calories: 55 },
            { name: 'Tereyağı', portion: '15g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Badem', portion: '20g', calories: 115 },
            { name: 'Çedar peyniri', portion: '20g', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Adaptasyon',
      totalCalories: 1750,
      note: 'Hafif yorgunluk hissedebilirsiniz. Bu normal! Bol su için.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Peynirli omlet', portion: '3 yumurta + 30g peynir', calories: 320 },
            { name: 'Ispanak (sote)', portion: '100g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
            { name: 'Zeytin', portion: '6 adet', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Dana biftek', portion: '180g', calories: 400 },
            { name: 'Mantar sote', portion: '100g', calories: 80 },
            { name: 'Karnabahar püresi', portion: '150g', calories: 120, note: 'Tereyağı ile' },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Karides sote', portion: '200g', calories: 280, note: 'Sarımsaklı tereyağı' },
            { name: 'Kabak şeritleri', portion: '150g', calories: 50 },
            { name: 'Parmesan', portion: '20g', calories: 80 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Yunan yoğurdu', portion: '100g', calories: 100 },
            { name: 'Çilek', portion: '50g', calories: 20 },
            { name: 'Chia tohumu', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Protein Günü',
      totalCalories: 1800,
      note: 'Bugün protein ağırlıklı bir gün. Kas koruması için önemli.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 500,
          foods: [
            { name: 'Lor peyniri', portion: '150g', calories: 150 },
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 620,
          foods: [
            { name: 'Izgara köfte', portion: '200g', calories: 450, note: 'Dana kıyma' },
            { name: 'Cacık', portion: '150g', calories: 80 },
            { name: 'Yeşil salata', portion: '100g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Fırında tavuk but', portion: '200g', calories: 400 },
            { name: 'Fırın sebze', portion: '150g', calories: 80, note: 'Kabak, biber' },
            { name: 'Ayran', portion: '200ml', calories: 70 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Protein shake', portion: '200ml', calories: 120, note: 'Su ile' },
            { name: 'Badem', portion: '5 adet', calories: 35 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Deniz Ürünleri',
      totalCalories: 1700,
      note: 'Omega-3 ve protein açısından zengin bir gün.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Somon füme', portion: '80g', calories: 160 },
            { name: 'Krem peynir', portion: '30g', calories: 100 },
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Salatalık', portion: '1/2 adet', calories: 10 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
            { name: 'Kapari', portion: '1 tatlı kaşığı', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Ton balıklı salata', portion: '300g', calories: 350, note: 'Zeytinyağlı' },
            { name: 'Zeytin', portion: '10 adet', calories: 50 },
            { name: 'Feta peyniri', portion: '40g', calories: 100 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Izgara levrek', portion: '200g', calories: 320 },
            { name: 'Ispanak (sarımsaklı)', portion: '150g', calories: 80 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Ceviz', portion: '25g', calories: 160 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Sebze Festivali',
      totalCalories: 1650,
      note: 'Düşük karbonhidratlı sebzelerle lif alımını artırıyoruz.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Sebzeli omlet', portion: '3 yumurta', calories: 280, note: 'Mantar, biber, soğan' },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Tavuk şiş', portion: '180g', calories: 350 },
            { name: 'Izgara sebze', portion: '200g', calories: 100, note: 'Kabak, patlıcan, biber' },
            { name: 'Humus', portion: '50g', calories: 100, note: 'Sınırlı' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Zeytinyağlı enginar', portion: '2 adet', calories: 200 },
            { name: 'Tavuk göğsü', portion: '120g', calories: 200 },
            { name: 'Roka salatası', portion: '100g', calories: 50 },
            { name: 'Parmesan', portion: '20g', calories: 80 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Kereviz sapı', portion: '100g', calories: 20 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 100 },
            { name: 'Havuç (az)', portion: '30g', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Et Günü',
      totalCalories: 1800,
      note: 'Kaliteli protein ve demir kaynakları.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Sucuklu yumurta', portion: '3 yumurta + 40g sucuk', calories: 380 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Biber', portion: '1/2 adet', calories: 15 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
            { name: 'Zeytin', portion: '5 adet', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'Kuzu pirzola', portion: '200g', calories: 500 },
            { name: 'Közlenmiş patlıcan', portion: '150g', calories: 80, note: 'Sarımsaklı yoğurtlu' },
            { name: 'Yeşil salata', portion: '100g', calories: 40 },
            { name: 'Ayran', portion: '200ml', calories: 70 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Dana antrikot', portion: '180g', calories: 420 },
            { name: 'Mantar', portion: '100g', calories: 30 },
            { name: 'Tereyağı', portion: '15g', calories: 100 },
            { name: 'Roka', portion: '50g', calories: 15 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Peynir tabağı', portion: '50g', calories: 150, note: 'Çeşitli peynirler' },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - Hafta Sonu Dengesi 🎉',
      totalCalories: 1750,
      note: 'İlk haftayı tamamladınız! Kendinizi tartın ve ölçümlerinizi alın.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Brunch)',
          totalCalories: 520,
          foods: [
            { name: 'Eggs Benedict (modifiye)', portion: '2 yumurta', calories: 300, note: 'Ekmeksiz, avokado üzerine' },
            { name: 'Avokado', portion: '1 adet', calories: 240 },
            { name: 'Somon füme', portion: '50g', calories: 100 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Burger köftesi', portion: '180g', calories: 400, note: 'Ekmeğsiz, marul sarmalı' },
            { name: 'Cheddar peyniri', portion: '30g', calories: 120 },
            { name: 'Turşu', portion: '50g', calories: 10 },
            { name: 'Domates', portion: '50g', calories: 10 },
            { name: 'Hardal', portion: '1 yemek kaşığı', calories: 10 },
            { name: 'Soğan halkaları', portion: '30g', calories: 15 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Karidesli kabak makarna', portion: '300g', calories: 350, note: 'Kabak şeritlerinden' },
            { name: 'Parmesan', portion: '30g', calories: 120 },
            { name: 'Limonlu su', portion: '300ml', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Şekersiz krem şanti', portion: '30g', calories: 100 },
            { name: 'Bitter çikolata', portion: '10g', calories: 55, note: '%85+ kakao' },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 BEKLENEN SONUÇLAR (30 Günde)

⚖️ Kilo Kaybı:
• İlk hafta: 2-3 kg (su kaybı dahil)
• 2-4. hafta: Haftada 0.5-1 kg
• Toplam: 4-7 kg arasında kayıp beklenir

📏 Vücut Değişimleri:
• Bel çevresi: 4-8 cm azalma
• Yağ kütlesi: Özellikle karın ve kalça bölgesinde azalma
• Kas kütlesi: Korunur veya hafif artar

🔬 Kan Değerleri:
• Açlık kan şekeri: %10-15 düşüş
• Trigliserit: %20-40 düşüş
• HDL kolesterol: %5-10 artış
• HbA1c (diyabetiklerde): Anlamlı düşüş

⚡ Enerji ve Performans:
• İlk 5-7 gün: Adaptasyon, hafif yorgunluk
• 2. hafta: Enerji stabilizasyonu
• 3-4. hafta: Yüksek ve stabil enerji

🧠 Zihinsel Değişimler:
• Kan şekeri stabilitesi ile daha net düşünce
• Öğünler arası odaklanma artışı
• Daha az "beyin sisi"

🍽️ Beslenme Alışkanlıkları:
• Şeker bağımlılığında azalma
• Daha bilinçli besin seçimi
• Porsiyon kontrolünde gelişme
• Daha az atıştırma ihtiyacı

⚠️ Not: 30 gün sonunda yaşam tarzı olarak sürdürebilirsiniz. Karbonhidratları yavaşça artırabilir veya bu seviyede kalabilirsiniz.`,

    en: `📊 EXPECTED RESULTS (In 30 Days)

⚖️ Weight Loss:
• First week: 2-3 kg (including water loss)
• Weeks 2-4: 0.5-1 kg per week
• Total: 4-7 kg loss expected

📏 Body Changes:
• Waist circumference: 4-8 cm reduction
• Fat mass: Especially reduced in belly and hip area
• Muscle mass: Preserved or slightly increased

🔬 Blood Values:
• Fasting blood sugar: 10-15% decrease
• Triglycerides: 20-40% decrease
• HDL cholesterol: 5-10% increase
• HbA1c (in diabetics): Significant decrease

⚡ Energy and Performance:
• First 5-7 days: Adaptation, mild fatigue
• Week 2: Energy stabilization
• Weeks 3-4: High and stable energy

🧠 Mental Changes:
• Clearer thinking with blood sugar stability
• Increased focus between meals
• Less "brain fog"

🍽️ Eating Habits:
• Reduced sugar addiction
• More conscious food choices
• Improved portion control
• Less snacking need

⚠️ Note: After 30 days, you can continue as a lifestyle. You can slowly increase carbs or stay at this level.`,
  },
};
