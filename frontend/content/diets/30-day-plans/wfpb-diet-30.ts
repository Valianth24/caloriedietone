import { Diet } from '../types';

export const wfpbDiet30: Diet = {
  id: 'wfpb',
  name: {
    tr: 'WFPB - Tam Gıda Bitkisel Beslenme',
    en: 'WFPB - Whole Food Plant Based Diet',
  },
  emoji: '🌱',
  isPremium: true,
  duration: 30,
  difficulty: 'medium',

  description: {
    tr: 'WFPB (Whole Food Plant Based) Diyeti, işlenmemiş tam gıdalardan oluşan %100 bitkisel bir beslenme programıdır. Rafine şeker, beyaz un ve işlenmiş yağlar yerine sebze, meyve, baklagil, tam tahıl ve kuruyemiş tüketimine dayanır. Bu diyet kalp hastalıkları, diyabet ve bazı kanser türlerinin riskini azaltırken, vitamin ve mineral ihtiyacını doğal yollarla karşılar.',
    en: 'WFPB (Whole Food Plant Based) Diet is a 100% plant-based nutrition program consisting of unprocessed whole foods. Instead of refined sugar, white flour, and processed oils, it focuses on vegetables, fruits, legumes, whole grains, and nuts. This diet reduces the risk of heart disease, diabetes, and certain cancers while meeting vitamin and mineral needs naturally.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Bitkisel Beslenme Araştırmaları (2024):
• Kalp hastalığı riskini %40 azaltır (JAMA Cardiology)
• Tip 2 diyabet riskini %34 düşürür
• LDL kolesterol seviyesini 4 haftada %20-30 düşürür
• Kronik iltihabı azaltır (CRP seviyesi %30 düşüş)

🌿 Vitamin ve Mineral Yoğunluğu:
• Doğal C vitamini: Turunçgiller, kivi, biber
• Demir: Koyu yeşil yapraklılar, baklagiller, kuru üzüm
• Kalsiyum: Brokoli, badem, susam, yeşil yapraklılar
• Çinko: Kabak çekirdeği, nohut, mercimek
• Folat: Ispanak, kuşkonmaz, avokado

⚡ Antioksidan Gücü:
• Polifenoller: Yaban mersini, üzüm, yeşil çay
• Beta-karoten: Havuç, tatlı patates, kabak
• Likopen: Domates, karpuz, pembe greyfurt
• Lutein: Ispanak, lahana, yumurta sarısı (bitkisel kaynak)

📈 Blue Zone Çalışmaları:
• En uzun yaşayan topluluklar %95 bitkisel besleniyor
• Okinawa, Sardinya, Loma Linda verileri
• Yaşam kalitesi ve enerji seviyesi artışı
• Bağırsak mikrobiyomu çeşitliliği

💊 B12 Vitamini Önemli Not:
• WFPB diyetinde B12 takviyesi şart
• Günde 250mcg veya haftada 2500mcg
• Fermente gıdalar (tempeh, natto) kısmen B12 içerir

⚠️ Dikkat Edilmesi Gerekenler:
• B12, D vitamini ve Omega-3 takviyeleri önerilir
• Protein kombinasyonu: Baklagil + tahıl
• Demir emilimi için C vitamini ile birlikte tüketin`,
    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 Plant-Based Nutrition Studies (2024):
• Reduces heart disease risk by 40% (JAMA Cardiology)
• Lowers Type 2 diabetes risk by 34%
• Decreases LDL cholesterol by 20-30% in 4 weeks
• Reduces chronic inflammation (CRP levels down 30%)

🌿 Vitamin and Mineral Density:
• Natural Vitamin C: Citrus fruits, kiwi, peppers
• Iron: Dark leafy greens, legumes, raisins
• Calcium: Broccoli, almonds, sesame, leafy greens
• Zinc: Pumpkin seeds, chickpeas, lentils
• Folate: Spinach, asparagus, avocado

⚡ Antioxidant Power:
• Polyphenols: Blueberries, grapes, green tea
• Beta-carotene: Carrots, sweet potatoes, squash
• Lycopene: Tomatoes, watermelon, pink grapefruit
• Lutein: Spinach, kale, egg yolk (plant sources)

📈 Blue Zone Studies:
• Longest-living communities eat 95% plant-based
• Data from Okinawa, Sardinia, Loma Linda
• Improved quality of life and energy levels
• Increased gut microbiome diversity

💊 Important B12 Note:
• B12 supplementation is essential on WFPB diet
• 250mcg daily or 2500mcg weekly
• Fermented foods (tempeh, natto) contain some B12

⚠️ Important Considerations:
• B12, Vitamin D, and Omega-3 supplements recommended
• Protein combining: Legumes + grains
• Consume iron with Vitamin C for better absorption`,
  },

  benefits: {
    tr: [
      '🫀 Kalp hastalığı riskini %40 azaltır',
      '🩸 Kan şekeri ve insülin seviyelerini dengeler',
      '💪 Doğal antioksidanlarla bağışıklığı güçlendirir',
      '🧠 Beyin sağlığını ve bilişsel fonksiyonları destekler',
      '⚡ Enerji seviyelerini doğal olarak yükseltir',
      '🌿 Kronik iltihabı azaltır',
      '🎯 Sağlıklı kilo kaybı sağlar',
      '💊 İlaç ihtiyacını azaltabilir (doktor kontrolünde)',
      '🌍 Çevre dostu ve sürdürülebilir beslenme',
      '🧬 Hücre yenilenmesini ve onarımını destekler',
    ],
    en: [
      '🫀 Reduces heart disease risk by 40%',
      '🩸 Balances blood sugar and insulin levels',
      '💪 Strengthens immunity with natural antioxidants',
      '🧠 Supports brain health and cognitive function',
      '⚡ Naturally boosts energy levels',
      '🌿 Reduces chronic inflammation',
      '🎯 Promotes healthy weight loss',
      '💊 May reduce medication needs (under doctor supervision)',
      '🌍 Eco-friendly and sustainable eating',
      '🧬 Supports cell renewal and repair',
    ],
  },

  warnings: {
    tr: [
      '⚠️ B12 vitamini takviyesi mutlaka alınmalı',
      '⚠️ D vitamini takviyesi önerilir (özellikle kış aylarında)',
      '⚠️ Omega-3 için yosun bazlı takviye düşünülebilir',
      '⚠️ Protein kombinasyonlarına dikkat edin (baklagil + tahıl)',
      '⚠️ Demir emilimi için C vitamini ile birlikte tüketin',
      '⚠️ Hamile ve emziren kadınlar için özel dikkat gerekir',
      '⚠️ Çocuklar için ek takviyeler gerekebilir',
      '⚠️ Kronik hastalığı olanlar doktora danışmalı',
    ],
    en: [
      '⚠️ B12 supplementation is mandatory',
      '⚠️ Vitamin D supplement recommended (especially in winter)',
      '⚠️ Consider algae-based Omega-3 supplement',
      '⚠️ Pay attention to protein combinations (legumes + grains)',
      '⚠️ Consume iron with Vitamin C for absorption',
      '⚠️ Special care needed for pregnant and nursing women',
      '⚠️ Children may need additional supplements',
      '⚠️ Those with chronic conditions should consult a doctor',
    ],
  },

  allowedFoods: {
    tr: [
      '🥬 Koyu Yeşil Yapraklılar: Ispanak, pazı, karalahana, roka',
      '🥦 Cruciferous Sebzeler: Brokoli, karnabahar, brüksel lahanası',
      '🥕 Kök Sebzeler: Havuç, pancar, tatlı patates, turp',
      '🍅 Domates ve Biber Ailesi: Domates, biber, patlıcan',
      '🫘 Baklagiller: Mercimek, nohut, fasulye, bezelye, soya',
      '🌾 Tam Tahıllar: Yulaf, bulgur, kinoa, esmer pirinç, karabuğday',
      '🥜 Kuruyemişler: Badem, ceviz, fındık, kaju, fıstık',
      '🌻 Tohumlar: Chia, keten, susam, kabak çekirdeği, ayçekirdeği',
      '🍎 Meyveler: Elma, armut, portakal, muz, yaban mersini, çilek',
      '🥑 Sağlıklı Yağlar: Avokado, zeytinyağı, hindistancevizi',
      '🧄 Baharatlar: Zerdeçal, zencefil, tarçın, sarımsak, soğan',
      '🍵 İçecekler: Yeşil çay, bitki çayları, taze sıkılmış meyve suyu',
    ],
    en: [
      '🥬 Dark Leafy Greens: Spinach, chard, kale, arugula',
      '🥦 Cruciferous Vegetables: Broccoli, cauliflower, Brussels sprouts',
      '🥕 Root Vegetables: Carrots, beets, sweet potatoes, radish',
      '🍅 Tomato and Pepper Family: Tomatoes, peppers, eggplant',
      '🫘 Legumes: Lentils, chickpeas, beans, peas, soy',
      '🌾 Whole Grains: Oats, bulgur, quinoa, brown rice, buckwheat',
      '🥜 Nuts: Almonds, walnuts, hazelnuts, cashews, peanuts',
      '🌻 Seeds: Chia, flax, sesame, pumpkin seeds, sunflower seeds',
      '🍎 Fruits: Apples, pears, oranges, bananas, blueberries, strawberries',
      '🥑 Healthy Fats: Avocado, olive oil, coconut',
      '🧄 Spices: Turmeric, ginger, cinnamon, garlic, onion',
      '🍵 Beverages: Green tea, herbal teas, fresh-squeezed juice',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🚫 Tüm hayvansal ürünler: Et, tavuk, balık',
      '🚫 Süt ürünleri: Süt, peynir, yoğurt, tereyağı',
      '🚫 Yumurta ve yumurtalı ürünler',
      '🚫 Rafine şeker ve şekerli içecekler',
      '🚫 Beyaz un ve işlenmiş tahıllar',
      '🚫 İşlenmiş bitkisel yağlar (margarin)',
      '🚫 Fast food ve kızartmalar',
      '🚫 Paketli atıştırmalıklar ve cipssler',
      '🚫 Yapay tatlandırıcılar ve katkı maddeleri',
      '🚫 Alkol (sınırlı miktarda bile)',
    ],
    en: [
      '🚫 All animal products: Meat, poultry, fish',
      '🚫 Dairy products: Milk, cheese, yogurt, butter',
      '🚫 Eggs and egg-containing products',
      '🚫 Refined sugar and sugary drinks',
      '🚫 White flour and processed grains',
      '🚫 Processed vegetable oils (margarine)',
      '🚫 Fast food and fried foods',
      '🚫 Packaged snacks and chips',
      '🚫 Artificial sweeteners and additives',
      '🚫 Alcohol (even in limited amounts)',
    ],
  },

  exercises: [
    {
      name: 'Yürüyüş',
      duration: '30-45 dakika',
      frequency: 'Her gün',
      note: 'Doğada yürüyüş özellikle faydalı',
    },
    {
      name: 'Yoga',
      duration: '30 dakika',
      frequency: 'Haftada 4-5 kez',
      note: 'Esneklik ve zihinsel rahatlama',
    },
    {
      name: 'Yüzme',
      duration: '30 dakika',
      frequency: 'Haftada 2-3 kez',
      note: 'Tüm vücut için düşük etkili egzersiz',
    },
    {
      name: 'Bisiklet',
      duration: '30-45 dakika',
      frequency: 'Haftada 3-4 kez',
      note: 'Kardiyovasküler sağlık için ideal',
    },
    {
      name: 'Pilates',
      duration: '30 dakika',
      frequency: 'Haftada 2-3 kez',
      note: 'Core güçlendirme ve postür düzeltme',
    },
  ],

  expectedResults: {
    tr: `📊 WFPB DİYETİ BEKLENEN SONUÇLAR

📅 1. Hafta (1-7 Gün):
• Enerji seviyesinde artış hissedilir
• Sindirim düzelmeye başlar
• Şeker isteği azalmaya başlar
• İlk detoks belirtileri olabilir

📅 2. Hafta (8-14 Gün):
• Cilt sağlığında iyileşme
• Uyku kalitesinde artış
• Zihinsel netlik artar
• 1-2 kg kilo kaybı olabilir

📅 3. Hafta (15-21 Gün):
• Kolesterol değerlerinde düşüş başlar
• Kan basıncı normalleşmeye başlar
• Eklem ağrılarında azalma
• 2-3 kg toplam kilo kaybı

📅 4. Hafta (22-30 Gün):
• Kalp sağlığı belirteçlerinde iyileşme
• LDL kolesterol %15-20 düşüş
• Kan şekeri stabilizasyonu
• 3-4 kg sağlıklı kilo kaybı
• Bağırsak florasında çeşitlilik artışı

🎯 Uzun Vadeli (3-6 ay):
• Kronik hastalık riskinde önemli azalma
• Enerji ve yaşam kalitesinde kalıcı artış
• İlaç dozlarında azaltma imkanı
• Sağlıklı kiloya ulaşma`,
    en: `📊 WFPB DIET EXPECTED RESULTS

📅 Week 1 (Days 1-7):
• Increased energy levels noticed
• Digestion starts to improve
• Sugar cravings begin to decrease
• Initial detox symptoms may occur

📅 Week 2 (Days 8-14):
• Improvement in skin health
• Better sleep quality
• Mental clarity increases
• 1-2 kg weight loss possible

📅 Week 3 (Days 15-21):
• Cholesterol levels start dropping
• Blood pressure begins normalizing
• Reduced joint pain
• 2-3 kg total weight loss

📅 Week 4 (Days 22-30):
• Improved heart health markers
• LDL cholesterol down 15-20%
• Blood sugar stabilization
• 3-4 kg healthy weight loss
• Increased gut flora diversity

🎯 Long Term (3-6 months):
• Significant reduction in chronic disease risk
• Permanent increase in energy and quality of life
• Possibility of reducing medication doses
• Achieving healthy weight`,
  },

  days: [
    // GÜN 1
    {
      day: 1,
      title: 'Bitkisel Beslenmeye Hoş Geldiniz',
      meals: [
        {
          type: 'breakfast',
          name: 'Yulaf Ezmesi ve Meyve Tabağı',
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 230 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Yaban mersini', portion: '100g', calories: 57 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
          ],
          totalCalories: 482,
        },
        {
          type: 'lunch',
          name: 'Mercimek Çorbası ve Tam Tahıl Ekmek',
          foods: [
            { name: 'Kırmızı mercimek çorbası', portion: '300ml', calories: 200 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Yeşil salata', portion: '150g', calories: 25 },
            { name: 'Zeytinyağı-limon sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
          totalCalories: 475,
        },
        {
          type: 'dinner',
          name: 'Sebzeli Nohut Yemeği',
          foods: [
            { name: 'Nohut', portion: '150g (pişmiş)', calories: 240 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Ispanak', portion: '100g', calories: 23 },
            { name: 'Soğan ve sarımsak', portion: '50g', calories: 25 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 150 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 576,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Elma', portion: '1 adet', calories: 95 },
            { name: 'Badem', portion: '15 adet', calories: 100 },
            { name: 'Havuç çubukları', portion: '100g', calories: 41 },
            { name: 'Humus', portion: '2 yemek kaşığı', calories: 70 },
          ],
          totalCalories: 306,
        },
      ],
      totalCalories: 1839,
      note: 'B12 takviyenizi almayı unutmayın!',
    },
    // GÜN 2
    {
      day: 2,
      title: 'Protein Gücü',
      meals: [
        {
          type: 'breakfast',
          name: 'Tofu Scramble',
          foods: [
            { name: 'Tofu (sıkılmış)', portion: '150g', calories: 120 },
            { name: 'Ispanak', portion: '50g', calories: 12 },
            { name: 'Domates', portion: '1 adet', calories: 22 },
            { name: 'Zerdeçal', portion: '1/2 çay kaşığı', calories: 4 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
          ],
          totalCalories: 318,
        },
        {
          type: 'lunch',
          name: 'Buddha Bowl',
          foods: [
            { name: 'Kinoa', portion: '100g (pişmiş)', calories: 120 },
            { name: 'Siyah fasulye', portion: '100g', calories: 130 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Kırmızı lahana', portion: '50g', calories: 15 },
            { name: 'Mısır', portion: '50g', calories: 45 },
            { name: 'Tahini sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
          totalCalories: 560,
        },
        {
          type: 'dinner',
          name: 'Sebzeli Mercimek Köfte',
          foods: [
            { name: 'Kırmızı mercimek köfte', portion: '200g', calories: 280 },
            { name: 'Marul', portion: '100g', calories: 15 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Nar ekşisi', portion: '1 yemek kaşığı', calories: 30 },
            { name: 'Tam buğday lavaş', portion: '1 adet', calories: 120 },
          ],
          totalCalories: 463,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Yeşil smoothie (ıspanak, muz, elma)', portion: '300ml', calories: 180 },
            { name: 'Ceviz', portion: '30g', calories: 200 },
          ],
          totalCalories: 380,
        },
      ],
      totalCalories: 1721,
      note: 'Protein kombinasyonu: Mercimek + Bulgur = Tam protein',
    },
    // GÜN 3
    {
      day: 3,
      title: 'Antioksidan Zenginliği',
      meals: [
        {
          type: 'breakfast',
          name: 'Açai Bowl',
          foods: [
            { name: 'Açai püresi', portion: '100g', calories: 70 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Granola (şekersiz)', portion: '40g', calories: 180 },
            { name: 'Çilek', portion: '100g', calories: 32 },
            { name: 'Hindistancevizi rendesi', portion: '1 yemek kaşığı', calories: 35 },
          ],
          totalCalories: 422,
        },
        {
          type: 'lunch',
          name: 'Falafel Wrap',
          foods: [
            { name: 'Falafel', portion: '4 adet', calories: 240 },
            { name: 'Tam buğday tortilla', portion: '1 adet', calories: 130 },
            { name: 'Humus', portion: '3 yemek kaşığı', calories: 105 },
            { name: 'Domates, salatalık, marul', portion: '100g', calories: 25 },
            { name: 'Tahin sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
          totalCalories: 590,
        },
        {
          type: 'dinner',
          name: 'Sebze Curry',
          foods: [
            { name: 'Karışık sebze (brokoli, havuç, biber)', portion: '200g', calories: 80 },
            { name: 'Nohut', portion: '100g', calories: 160 },
            { name: 'Hindistancevizi sütü', portion: '100ml', calories: 150 },
            { name: 'Esmer pirinç', portion: '100g (pişmiş)', calories: 110 },
            { name: 'Curry baharatları', portion: '1 yemek kaşığı', calories: 10 },
          ],
          totalCalories: 510,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Armut', portion: '1 adet', calories: 100 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 98 },
            { name: 'Kereviz çubukları', portion: '100g', calories: 16 },
          ],
          totalCalories: 214,
        },
      ],
      totalCalories: 1736,
      note: 'Curry baharatları antioksidan bombası!',
    },
    // GÜN 4
    {
      day: 4,
      title: 'Demir ve C Vitamini',
      meals: [
        {
          type: 'breakfast',
          name: 'Ispanaklı Smoothie Bowl',
          foods: [
            { name: 'Ispanak', portion: '100g', calories: 23 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Portakal suyu', portion: '100ml', calories: 45 },
            { name: 'Keten tohumu', portion: '1 yemek kaşığı', calories: 55 },
            { name: 'Yulaf ezmesi', portion: '30g', calories: 115 },
          ],
          totalCalories: 343,
        },
        {
          type: 'lunch',
          name: 'Yeşil Mercimek Salatası',
          foods: [
            { name: 'Yeşil mercimek (pişmiş)', portion: '150g', calories: 170 },
            { name: 'Roka', portion: '50g', calories: 12 },
            { name: 'Kırmızı biber', portion: '100g', calories: 31 },
            { name: 'Nar taneleri', portion: '50g', calories: 42 },
            { name: 'Limon-zeytinyağı sos', portion: '2 yemek kaşığı', calories: 150 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
          ],
          totalCalories: 535,
        },
        {
          type: 'dinner',
          name: 'Kuru Fasulye Pilakisi',
          foods: [
            { name: 'Kuru fasulye', portion: '200g (pişmiş)', calories: 280 },
            { name: 'Domates sosu', portion: '100g', calories: 40 },
            { name: 'Havuç', portion: '50g', calories: 20 },
            { name: 'Soğan', portion: '50g', calories: 20 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 150 },
            { name: 'Turşu', portion: '50g', calories: 15 },
          ],
          totalCalories: 525,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Portakal', portion: '1 adet', calories: 62 },
            { name: 'Kuru incir', portion: '3 adet', calories: 90 },
            { name: 'Kabak çekirdeği', portion: '30g', calories: 160 },
          ],
          totalCalories: 312,
        },
      ],
      totalCalories: 1715,
      note: 'Demir + C vitamini = Mükemmel emilim!',
    },
    // GÜN 5
    {
      day: 5,
      title: 'Omega-3 Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'Chia Puding',
          foods: [
            { name: 'Chia tohumu', portion: '3 yemek kaşığı', calories: 180 },
            { name: 'Badem sütü', portion: '250ml', calories: 37 },
            { name: 'Mango', portion: '100g', calories: 60 },
            { name: 'Kivi', portion: '1 adet', calories: 42 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
          ],
          totalCalories: 419,
        },
        {
          type: 'lunch',
          name: 'Kabak Çorbası ve Keten Tohumlu Ekmek',
          foods: [
            { name: 'Kabak çorbası', portion: '300ml', calories: 120 },
            { name: 'Keten tohumlu tam tahıl ekmek', portion: '2 dilim', calories: 180 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Limon suyu', portion: '1 yemek kaşığı', calories: 4 },
          ],
          totalCalories: 464,
        },
        {
          type: 'dinner',
          name: 'Tempeh Stir-Fry',
          foods: [
            { name: 'Tempeh', portion: '150g', calories: 280 },
            { name: 'Brokoli', portion: '100g', calories: 34 },
            { name: 'Havuç', portion: '50g', calories: 20 },
            { name: 'Soya sosu', portion: '1 yemek kaşığı', calories: 9 },
            { name: 'Susam yağı', portion: '1 tatlı kaşığı', calories: 40 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Susam tohumu', portion: '1 yemek kaşığı', calories: 50 },
          ],
          totalCalories: 543,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Ceviz', portion: '30g', calories: 200 },
            { name: 'Elma', portion: '1 adet', calories: 95 },
            { name: 'Yosun atıştırmalığı (nori)', portion: '5g', calories: 15 },
          ],
          totalCalories: 310,
        },
      ],
      totalCalories: 1736,
      note: 'Chia, ceviz ve keten: Bitkisel Omega-3 kaynakları',
    },
    // GÜN 6
    {
      day: 6,
      title: 'Bağırsak Sağlığı',
      meals: [
        {
          type: 'breakfast',
          name: 'Probiyotik Kahvaltı',
          foods: [
            { name: 'Hindistancevizi yoğurdu', portion: '150g', calories: 180 },
            { name: 'Granola (şekersiz)', portion: '40g', calories: 180 },
            { name: 'Yaban mersini', portion: '100g', calories: 57 },
            { name: 'Bal kabağı çekirdeği', portion: '1 yemek kaşığı', calories: 50 },
          ],
          totalCalories: 467,
        },
        {
          type: 'lunch',
          name: 'Kimchi Bowl',
          foods: [
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Kimchi', portion: '100g', calories: 23 },
            { name: 'Tofu (marine edilmiş)', portion: '100g', calories: 80 },
            { name: 'Edamame', portion: '50g', calories: 60 },
            { name: 'Havuç (rendelenmiş)', portion: '50g', calories: 20 },
            { name: 'Susam yağı', portion: '1 tatlı kaşığı', calories: 40 },
          ],
          totalCalories: 343,
        },
        {
          type: 'dinner',
          name: 'Fasulye ve Sebze Güveç',
          foods: [
            { name: 'Barbunya fasulye', portion: '150g', calories: 200 },
            { name: 'Patlıcan', portion: '100g', calories: 25 },
            { name: 'Kabak', portion: '100g', calories: 17 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
          ],
          totalCalories: 540,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Kombu çayı', portion: '250ml', calories: 30 },
            { name: 'Kefir (hindistancevizi)', portion: '150ml', calories: 90 },
            { name: 'Badem', portion: '20 adet', calories: 140 },
          ],
          totalCalories: 260,
        },
      ],
      totalCalories: 1610,
      note: 'Fermente gıdalar bağırsak florasını güçlendirir',
    },
    // GÜN 7
    {
      day: 7,
      title: 'Detoks Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'Yeşil Detoks Smoothie',
          foods: [
            { name: 'Ispanak', portion: '100g', calories: 23 },
            { name: 'Salatalık', portion: '100g', calories: 16 },
            { name: 'Yeşil elma', portion: '1 adet', calories: 95 },
            { name: 'Kereviz', portion: '50g', calories: 8 },
            { name: 'Zencefil', portion: '1 tatlı kaşığı', calories: 5 },
            { name: 'Limon suyu', portion: '1 yemek kaşığı', calories: 4 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
          totalCalories: 211,
        },
        {
          type: 'lunch',
          name: 'Gökkuşağı Salatası',
          foods: [
            { name: 'Karışık yeşillikler', portion: '150g', calories: 30 },
            { name: 'Pancar', portion: '50g', calories: 22 },
            { name: 'Havuç', portion: '50g', calories: 20 },
            { name: 'Kırmızı lahana', portion: '50g', calories: 15 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Nohut', portion: '100g', calories: 160 },
            { name: 'Tahini sos', portion: '2 yemek kaşığı', calories: 180 },
          ],
          totalCalories: 587,
        },
        {
          type: 'dinner',
          name: 'Sebze Çorbası ve Taze Salata',
          foods: [
            { name: 'Karışık sebze çorbası', portion: '400ml', calories: 150 },
            { name: 'Marul-domates salatası', portion: '150g', calories: 30 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
            { name: 'Tam tahıl ekmek', portion: '1 dilim', calories: 80 },
          ],
          totalCalories: 380,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Yeşil çay', portion: '2 fincan', calories: 5 },
            { name: 'Salatalık dilimi', portion: '100g', calories: 16 },
            { name: 'Humus', portion: '2 yemek kaşığı', calories: 70 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
          ],
          totalCalories: 191,
        },
      ],
      totalCalories: 1369,
      note: 'Hafif detoks günü - bol su için (2.5-3L)',
    },
    // GÜN 8
    {
      day: 8,
      title: 'Enerji Patlaması',
      meals: [
        {
          type: 'breakfast',
          name: 'Power Yulaf',
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 230 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Yer fıstığı ezmesi', portion: '1 yemek kaşığı', calories: 95 },
            { name: 'Tarçın', portion: '1/2 tatlı kaşığı', calories: 3 },
          ],
          totalCalories: 463,
        },
        {
          type: 'lunch',
          name: 'Kinoa Tabulesi',
          foods: [
            { name: 'Kinoa (pişmiş)', portion: '150g', calories: 180 },
            { name: 'Maydanoz', portion: '50g', calories: 18 },
            { name: 'Nane', portion: '20g', calories: 5 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Salatalık', portion: '100g', calories: 16 },
            { name: 'Zeytinyağı-limon sos', portion: '2 yemek kaşığı', calories: 150 },
          ],
          totalCalories: 387,
        },
        {
          type: 'dinner',
          name: 'Mercimekli Dolma Biber',
          foods: [
            { name: 'Dolma biber (mercimekli)', portion: '3 adet', calories: 350 },
            { name: 'Yoğurt (bitkisel)', portion: '100g', calories: 60 },
            { name: 'Yeşil salata', portion: '100g', calories: 15 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 545,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Energy ball (hurma+badem)', portion: '2 adet', calories: 150 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 3 },
            { name: 'Elma', portion: '1 adet', calories: 95 },
          ],
          totalCalories: 248,
        },
      ],
      totalCalories: 1643,
      note: 'Kompleks karbonhidratlar = Uzun süreli enerji',
    },
    // GÜN 9
    {
      day: 9,
      title: 'Akdeniz Bitkisel',
      meals: [
        {
          type: 'breakfast',
          name: 'Akdeniz Kahvaltı Tabağı',
          foods: [
            { name: 'Humus', portion: '4 yemek kaşığı', calories: 140 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Salatalık', portion: '100g', calories: 16 },
            { name: 'Zeytin', portion: '10 adet', calories: 50 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 40 },
          ],
          totalCalories: 424,
        },
        {
          type: 'lunch',
          name: 'Fatoush Salatası',
          foods: [
            { name: 'Marul', portion: '100g', calories: 15 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Salatalık', portion: '100g', calories: 16 },
            { name: 'Taze nane ve maydanoz', portion: '30g', calories: 10 },
            { name: 'Pita ekmeği (kızarmış)', portion: '1/2 adet', calories: 85 },
            { name: 'Sumak-limon sos', portion: '2 yemek kaşığı', calories: 100 },
            { name: 'Nohut', portion: '100g', calories: 160 },
          ],
          totalCalories: 404,
        },
        {
          type: 'dinner',
          name: 'Zeytinyağlı Enginar',
          foods: [
            { name: 'Enginar (zeytinyağlı)', portion: '3 adet', calories: 250 },
            { name: 'Patates', portion: '100g', calories: 80 },
            { name: 'Havuç', portion: '50g', calories: 20 },
            { name: 'Bezelye', portion: '50g', calories: 40 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 150 },
          ],
          totalCalories: 540,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'İncir', portion: '3 adet', calories: 110 },
            { name: 'Badem', portion: '15 adet', calories: 100 },
            { name: 'Nane çayı', portion: '1 fincan', calories: 2 },
          ],
          totalCalories: 212,
        },
      ],
      totalCalories: 1580,
      note: 'Akdeniz mutfağının bitkisel versiyonu',
    },
    // GÜN 10
    {
      day: 10,
      title: 'Asya Esintisi',
      meals: [
        {
          type: 'breakfast',
          name: 'Japon Tarzı Kahvaltı',
          foods: [
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Natto', portion: '50g', calories: 100 },
            { name: 'Turşu sebze', portion: '50g', calories: 15 },
          ],
          totalCalories: 285,
        },
        {
          type: 'lunch',
          name: 'Teriyaki Tofu Bowl',
          foods: [
            { name: 'Tofu (teriyaki soslu)', portion: '150g', calories: 180 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Brokoli', portion: '100g', calories: 34 },
            { name: 'Edamame', portion: '50g', calories: 60 },
            { name: 'Susam', portion: '1 yemek kaşığı', calories: 50 },
          ],
          totalCalories: 434,
        },
        {
          type: 'dinner',
          name: 'Pad Thai (Vegan)',
          foods: [
            { name: 'Pirinç noodle', portion: '100g', calories: 190 },
            { name: 'Tofu', portion: '100g', calories: 80 },
            { name: 'Fasulye filizi', portion: '100g', calories: 31 },
            { name: 'Fıstık', portion: '20g', calories: 115 },
            { name: 'Yeşil soğan', portion: '30g', calories: 10 },
            { name: 'Lime ve pad thai sosu', portion: '2 yemek kaşığı', calories: 60 },
          ],
          totalCalories: 486,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Edamame', portion: '100g', calories: 120 },
            { name: 'Mandalina', portion: '2 adet', calories: 80 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 5 },
          ],
          totalCalories: 205,
        },
      ],
      totalCalories: 1410,
      note: 'Asya mutfağı fermente gıda cenneti!',
    },
    // GÜN 11-30 devam ediyor...
    {
      day: 11,
      title: 'Lif Şampiyonu',
      meals: [
        {
          type: 'breakfast',
          name: 'Yüksek Lifli Smoothie',
          foods: [
            { name: 'Ispanak', portion: '100g', calories: 23 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Yaban mersini', portion: '100g', calories: 57 },
            { name: 'Keten tohumu', portion: '2 yemek kaşığı', calories: 110 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
          ],
          totalCalories: 325,
        },
        {
          type: 'lunch',
          name: 'Bezelye Çorbası ve Salata',
          foods: [
            { name: 'Bezelye çorbası', portion: '300ml', calories: 180 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Karışık yeşil salata', portion: '150g', calories: 30 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 490,
        },
        {
          type: 'dinner',
          name: 'Siyah Fasulye Tacos',
          foods: [
            { name: 'Siyah fasulye', portion: '150g', calories: 200 },
            { name: 'Mısır tortilla', portion: '2 adet', calories: 140 },
            { name: 'Guacamole', portion: '3 yemek kaşığı', calories: 150 },
            { name: 'Salsa', portion: '2 yemek kaşığı', calories: 20 },
            { name: 'Marul', portion: '50g', calories: 8 },
          ],
          totalCalories: 518,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Armut', portion: '1 adet', calories: 100 },
            { name: 'Badem', portion: '20 adet', calories: 140 },
            { name: 'Havuç çubukları', portion: '100g', calories: 41 },
          ],
          totalCalories: 281,
        },
      ],
      totalCalories: 1614,
      note: 'Günlük 35g+ lif hedefi',
    },
    {
      day: 12,
      title: 'Kalsiyum Odaklı',
      meals: [
        {
          type: 'breakfast',
          name: 'Tofu ve Yeşillikli Kahvaltı',
          foods: [
            { name: 'Tofu (kalsiyum zengin)', portion: '150g', calories: 120 },
            { name: 'Karalahana', portion: '100g', calories: 50 },
            { name: 'Portakal suyu (kalsiyum takviyeli)', portion: '200ml', calories: 90 },
            { name: 'Susam', portion: '1 yemek kaşığı', calories: 50 },
          ],
          totalCalories: 310,
        },
        {
          type: 'lunch',
          name: 'Tahini Soslu Buddha Bowl',
          foods: [
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Brokoli', portion: '150g', calories: 51 },
            { name: 'Edamame', portion: '100g', calories: 120 },
            { name: 'Badem', portion: '20g', calories: 120 },
            { name: 'Tahini sos', portion: '2 yemek kaşığı', calories: 180 },
          ],
          totalCalories: 591,
        },
        {
          type: 'dinner',
          name: 'Zeytinyağlı Bakla',
          foods: [
            { name: 'Bakla (zeytinyağlı)', portion: '200g', calories: 200 },
            { name: 'Dereotu', portion: '20g', calories: 8 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Yeşil salata', portion: '100g', calories: 15 },
          ],
          totalCalories: 503,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Badem sütü (kalsiyum takviyeli)', portion: '200ml', calories: 30 },
            { name: 'İncir', portion: '3 adet', calories: 110 },
            { name: 'Susam helvası (1 dilim)', portion: '20g', calories: 100 },
          ],
          totalCalories: 240,
        },
      ],
      totalCalories: 1644,
      note: 'Bitkisel kalsiyum kaynakları: Tofu, susam, brokoli',
    },
    {
      day: 13,
      title: 'Çinko Boost',
      meals: [
        {
          type: 'breakfast',
          name: 'Kabak Çekirdekli Kahvaltı',
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 230 },
            { name: 'Kabak çekirdeği', portion: '30g', calories: 160 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Kakao tozu', portion: '1 yemek kaşığı', calories: 12 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
          ],
          totalCalories: 537,
        },
        {
          type: 'lunch',
          name: 'Nohutlu Wrap',
          foods: [
            { name: 'Nohut', portion: '150g', calories: 240 },
            { name: 'Tam buğday tortilla', portion: '1 adet', calories: 130 },
            { name: 'Humus', portion: '2 yemek kaşığı', calories: 70 },
            { name: 'Marul ve domates', portion: '100g', calories: 25 },
            { name: 'Tahin', portion: '1 yemek kaşığı', calories: 90 },
          ],
          totalCalories: 555,
        },
        {
          type: 'dinner',
          name: 'Mercimek Dal',
          foods: [
            { name: 'Kırmızı mercimek dal', portion: '250g', calories: 280 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Ispanak (soteli)', portion: '100g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 550,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Kaju', portion: '30g', calories: 160 },
            { name: 'Kivi', portion: '2 adet', calories: 84 },
          ],
          totalCalories: 244,
        },
      ],
      totalCalories: 1886,
      note: 'Çinko kaynakları: Kabak çekirdeği, nohut, mercimek',
    },
    {
      day: 14,
      title: 'Hafta Sonu Şöleni',
      meals: [
        {
          type: 'breakfast',
          name: 'Vegan Pancake',
          foods: [
            { name: 'Vegan pancake', portion: '3 adet', calories: 280 },
            { name: 'Akçaağaç şurubu', portion: '2 yemek kaşığı', calories: 100 },
            { name: 'Çilek', portion: '100g', calories: 32 },
            { name: 'Muz', portion: '1/2 adet', calories: 52 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
          ],
          totalCalories: 564,
        },
        {
          type: 'lunch',
          name: 'Vegan Burger',
          foods: [
            { name: 'Siyah fasulye patty', portion: '1 adet', calories: 200 },
            { name: 'Tam buğday hamburger ekmeği', portion: '1 adet', calories: 150 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Domates, marul, soğan', portion: '80g', calories: 20 },
            { name: 'Vegan mayo', portion: '1 yemek kaşığı', calories: 60 },
          ],
          totalCalories: 510,
        },
        {
          type: 'dinner',
          name: 'Mantar Risotto',
          foods: [
            { name: 'Arborio pirinci', portion: '100g', calories: 360 },
            { name: 'Mantar', portion: '150g', calories: 30 },
            { name: 'Bitkisel krema', portion: '50ml', calories: 80 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
            { name: 'Maydanoz', portion: '10g', calories: 4 },
          ],
          totalCalories: 594,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Vegan brownie', portion: '1 dilim', calories: 180 },
            { name: 'Bitki çayı', portion: '1 fincan', calories: 3 },
          ],
          totalCalories: 183,
        },
      ],
      totalCalories: 1851,
      note: '2 hafta tamamlandı! 🎉',
    },
    // GÜN 15-30 (Kısa formatta devam)
    {
      day: 15,
      title: 'Yeni Hafta Başlangıcı',
      meals: [
        {
          type: 'breakfast',
          name: 'Protein Smoothie',
          foods: [
            { name: 'Bezelye proteini', portion: '30g', calories: 120 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Ispanak', portion: '50g', calories: 12 },
            { name: 'Badem sütü', portion: '250ml', calories: 37 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
          totalCalories: 334,
        },
        {
          type: 'lunch',
          name: 'Falafel Tabağı',
          foods: [
            { name: 'Falafel', portion: '5 adet', calories: 300 },
            { name: 'Humus', portion: '3 yemek kaşığı', calories: 105 },
            { name: 'Taboule', portion: '100g', calories: 130 },
            { name: 'Turşu', portion: '50g', calories: 15 },
          ],
          totalCalories: 550,
        },
        {
          type: 'dinner',
          name: 'Sebzeli Makarna',
          foods: [
            { name: 'Tam buğday makarna', portion: '100g', calories: 350 },
            { name: 'Domates sosu', portion: '150g', calories: 60 },
            { name: 'Kabak', portion: '100g', calories: 17 },
            { name: 'Mantar', portion: '100g', calories: 22 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 569,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Elma', portion: '1 adet', calories: 95 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 98 },
            { name: 'Havuç', portion: '100g', calories: 41 },
          ],
          totalCalories: 234,
        },
      ],
      totalCalories: 1687,
    },
    {
      day: 16,
      title: 'Hindistan Lezzetleri',
      meals: [
        {
          type: 'breakfast',
          name: 'Masala Dosa',
          foods: [
            { name: 'Dosa', portion: '1 adet', calories: 150 },
            { name: 'Patates masala', portion: '100g', calories: 120 },
            { name: 'Hindistancevizi çatnisi', portion: '2 yemek kaşığı', calories: 60 },
          ],
          totalCalories: 330,
        },
        {
          type: 'lunch',
          name: 'Chana Masala',
          foods: [
            { name: 'Nohut masala', portion: '200g', calories: 280 },
            { name: 'Basmati pirinç', portion: '100g', calories: 120 },
            { name: 'Naan (tam buğday)', portion: '1 adet', calories: 150 },
          ],
          totalCalories: 550,
        },
        {
          type: 'dinner',
          name: 'Dal Makhani (Vegan)',
          foods: [
            { name: 'Dal makhani', portion: '200g', calories: 280 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Salata', portion: '100g', calories: 20 },
          ],
          totalCalories: 410,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Mango lassi (bitkisel)', portion: '200ml', calories: 150 },
            { name: 'Badem', portion: '15 adet', calories: 100 },
          ],
          totalCalories: 250,
        },
      ],
      totalCalories: 1540,
    },
    {
      day: 17,
      title: 'Meksika Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'Burrito Bowl',
          foods: [
            { name: 'Siyah fasulye', portion: '100g', calories: 130 },
            { name: 'Esmer pirinç', portion: '80g', calories: 90 },
            { name: 'Salsa', portion: '3 yemek kaşığı', calories: 30 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
          ],
          totalCalories: 410,
        },
        {
          type: 'lunch',
          name: 'Enchiladas (Vegan)',
          foods: [
            { name: 'Mısır tortilla', portion: '2 adet', calories: 140 },
            { name: 'Fasulye püresi', portion: '150g', calories: 200 },
            { name: 'Enchilada sosu', portion: '100ml', calories: 60 },
            { name: 'Vegan peynir', portion: '30g', calories: 80 },
          ],
          totalCalories: 480,
        },
        {
          type: 'dinner',
          name: 'Pozole Verde (Vegan)',
          foods: [
            { name: 'Pozole çorbası', portion: '400ml', calories: 280 },
            { name: 'Marul', portion: '50g', calories: 8 },
            { name: 'Turp', portion: '50g', calories: 8 },
            { name: 'Tostada', portion: '1 adet', calories: 100 },
          ],
          totalCalories: 396,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Guacamole', portion: '3 yemek kaşığı', calories: 150 },
            { name: 'Sebze çubukları', portion: '100g', calories: 30 },
          ],
          totalCalories: 180,
        },
      ],
      totalCalories: 1466,
    },
    {
      day: 18,
      title: 'Süper Gıdalar',
      meals: [
        {
          type: 'breakfast',
          name: 'Spirulina Smoothie',
          foods: [
            { name: 'Spirulina', portion: '1 tatlı kaşığı', calories: 20 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Ananas', portion: '100g', calories: 50 },
            { name: 'Hindistancevizi suyu', portion: '200ml', calories: 45 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
          totalCalories: 280,
        },
        {
          type: 'lunch',
          name: 'Quinoa Süper Bowl',
          foods: [
            { name: 'Kinoa', portion: '150g', calories: 180 },
            { name: 'Karalahana', portion: '100g', calories: 50 },
            { name: 'Yaban mersini', portion: '50g', calories: 28 },
            { name: 'Goji berry', portion: '20g', calories: 60 },
            { name: 'Hemp tohumu', portion: '2 yemek kaşığı', calories: 110 },
            { name: 'Tahini', portion: '1 yemek kaşığı', calories: 90 },
          ],
          totalCalories: 518,
        },
        {
          type: 'dinner',
          name: 'Acai Bowl (Akşam)',
          foods: [
            { name: 'Açai püresi', portion: '200g', calories: 140 },
            { name: 'Granola', portion: '40g', calories: 180 },
            { name: 'Muz', portion: '1/2 adet', calories: 52 },
            { name: 'Kakao nibs', portion: '1 yemek kaşığı', calories: 50 },
            { name: 'Hindistancevizi', portion: '1 yemek kaşığı', calories: 35 },
          ],
          totalCalories: 457,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Matcha latte', portion: '200ml', calories: 70 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
          ],
          totalCalories: 200,
        },
      ],
      totalCalories: 1455,
      note: 'Süper gıda günü! Antioksidan bombası',
    },
    {
      day: 19,
      title: 'Basit ve Sade',
      meals: [
        {
          type: 'breakfast',
          name: 'Avokado Toast',
          foods: [
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1 adet', calories: 320 },
            { name: 'Limon suyu', portion: '1 yemek kaşığı', calories: 4 },
            { name: 'Kırmızı biber pulu', portion: '1/2 tatlı kaşığı', calories: 3 },
          ],
          totalCalories: 487,
        },
        {
          type: 'lunch',
          name: 'Domates Çorbası',
          foods: [
            { name: 'Domates çorbası', portion: '300ml', calories: 150 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Yeşil salata', portion: '150g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 455,
        },
        {
          type: 'dinner',
          name: 'Patates Püresi ve Sebze',
          foods: [
            { name: 'Patates püresi (bitkisel)', portion: '200g', calories: 200 },
            { name: 'Buharda brokoli', portion: '150g', calories: 51 },
            { name: 'Havuç', portion: '100g', calories: 41 },
            { name: 'Mantar sote', portion: '100g', calories: 50 },
          ],
          totalCalories: 342,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Elma', portion: '1 adet', calories: 95 },
            { name: 'Fıstık ezmesi', portion: '1 yemek kaşığı', calories: 95 },
          ],
          totalCalories: 190,
        },
      ],
      totalCalories: 1474,
    },
    {
      day: 20,
      title: 'Protein Patlaması',
      meals: [
        {
          type: 'breakfast',
          name: 'Tempeh Kahvaltısı',
          foods: [
            { name: 'Tempeh (ızgara)', portion: '100g', calories: 190 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
          totalCalories: 448,
        },
        {
          type: 'lunch',
          name: 'Protein Buddha Bowl',
          foods: [
            { name: 'Tofu', portion: '150g', calories: 120 },
            { name: 'Edamame', portion: '100g', calories: 120 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Brokoli', portion: '100g', calories: 34 },
            { name: 'Tahini sos', portion: '2 yemek kaşığı', calories: 180 },
          ],
          totalCalories: 574,
        },
        {
          type: 'dinner',
          name: 'Mercimek Köftesi Tabağı',
          foods: [
            { name: 'Mercimek köftesi', portion: '150g', calories: 210 },
            { name: 'Marul', portion: '100g', calories: 15 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Soğan', portion: '50g', calories: 20 },
            { name: 'Nar ekşisi', portion: '1 yemek kaşığı', calories: 30 },
          ],
          totalCalories: 293,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Protein shake (bitkisel)', portion: '300ml', calories: 200 },
            { name: 'Badem', portion: '20 adet', calories: 140 },
          ],
          totalCalories: 340,
        },
      ],
      totalCalories: 1655,
      note: 'Günlük protein hedefi: 60g+',
    },
    {
      day: 21,
      title: '3 Hafta Tamamlandı! 🎉',
      meals: [
        {
          type: 'breakfast',
          name: 'Kutlama Kahvaltısı',
          foods: [
            { name: 'Vegan waffle', portion: '2 adet', calories: 300 },
            { name: 'Taze çilek', portion: '100g', calories: 32 },
            { name: 'Akçaağaç şurubu', portion: '2 yemek kaşığı', calories: 100 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 98 },
          ],
          totalCalories: 530,
        },
        {
          type: 'lunch',
          name: 'Sebze Pizza',
          foods: [
            { name: 'Tam buğday pizza hamuru', portion: '1/2 adet', calories: 280 },
            { name: 'Domates sosu', portion: '50g', calories: 20 },
            { name: 'Vegan peynir', portion: '50g', calories: 130 },
            { name: 'Karışık sebzeler', portion: '100g', calories: 40 },
          ],
          totalCalories: 470,
        },
        {
          type: 'dinner',
          name: 'Vegan Sushi',
          foods: [
            { name: 'Avokado maki', portion: '6 adet', calories: 200 },
            { name: 'Sebzeli maki', portion: '6 adet', calories: 180 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Edamame', portion: '50g', calories: 60 },
          ],
          totalCalories: 500,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Meyve salatası', portion: '200g', calories: 130 },
            { name: 'Hindistancevizi kreması', portion: '2 yemek kaşığı', calories: 100 },
          ],
          totalCalories: 230,
        },
      ],
      totalCalories: 1730,
      note: '3 hafta başarıyla tamamlandı! Enerji seviyenizi not edin.',
    },
    // GÜN 22-30 (Son hafta)
    {
      day: 22,
      title: 'Son Hafta Başlangıcı',
      meals: [
        {
          type: 'breakfast',
          name: 'Overnight Oats',
          foods: [
            { name: 'Yulaf', portion: '60g', calories: 230 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Kakao tozu', portion: '1 yemek kaşığı', calories: 12 },
          ],
          totalCalories: 437,
        },
        {
          type: 'lunch',
          name: 'Rainbow Bowl',
          foods: [
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Pancar', portion: '50g', calories: 22 },
            { name: 'Havuç', portion: '50g', calories: 20 },
            { name: 'Mor lahana', portion: '50g', calories: 15 },
            { name: 'Nohut', portion: '100g', calories: 160 },
            { name: 'Tahin-limon sos', portion: '2 yemek kaşığı', calories: 150 },
          ],
          totalCalories: 487,
        },
        {
          type: 'dinner',
          name: 'Sebze Wok',
          foods: [
            { name: 'Tofu', portion: '150g', calories: 120 },
            { name: 'Karışık sebze', portion: '200g', calories: 80 },
            { name: 'Soya sosu', portion: '1 yemek kaşığı', calories: 9 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Susam yağı', portion: '1 tatlı kaşığı', calories: 40 },
          ],
          totalCalories: 359,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Elma', portion: '1 adet', calories: 95 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
          ],
          totalCalories: 260,
        },
      ],
      totalCalories: 1543,
    },
    {
      day: 23,
      title: 'Comfort Food',
      meals: [
        {
          type: 'breakfast',
          name: 'Sıcak Yulaf Lapası',
          foods: [
            { name: 'Yulaf', portion: '60g', calories: 230 },
            { name: 'Tarçın', portion: '1/2 tatlı kaşığı', calories: 3 },
            { name: 'Elma (doğranmış)', portion: '1 adet', calories: 95 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
            { name: 'Akçaağaç şurubu', portion: '1 yemek kaşığı', calories: 50 },
          ],
          totalCalories: 478,
        },
        {
          type: 'lunch',
          name: 'Mantar Çorbası',
          foods: [
            { name: 'Kremalı mantar çorbası', portion: '300ml', calories: 180 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Yeşil salata', portion: '100g', calories: 15 },
          ],
          totalCalories: 355,
        },
        {
          type: 'dinner',
          name: 'Vegan Mac and Cheese',
          foods: [
            { name: 'Makarna', portion: '100g', calories: 350 },
            { name: 'Vegan peynir sosu', portion: '100ml', calories: 150 },
            { name: 'Brokoli', portion: '100g', calories: 34 },
          ],
          totalCalories: 534,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Sıcak çikolata (bitkisel)', portion: '200ml', calories: 150 },
            { name: 'Hurma', portion: '3 adet', calories: 100 },
          ],
          totalCalories: 250,
        },
      ],
      totalCalories: 1617,
    },
    {
      day: 24,
      title: 'Detoks Tekrar',
      meals: [
        {
          type: 'breakfast',
          name: 'Green Juice',
          foods: [
            { name: 'Kereviz', portion: '2 dal', calories: 12 },
            { name: 'Salatalık', portion: '1 adet', calories: 16 },
            { name: 'Elma', portion: '1 adet', calories: 95 },
            { name: 'Zencefil', portion: '1 tatlı kaşığı', calories: 5 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
          totalCalories: 138,
        },
        {
          type: 'lunch',
          name: 'Çiğ Sebze Salatası',
          foods: [
            { name: 'Karışık yeşillik', portion: '200g', calories: 40 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Salatalık', portion: '100g', calories: 16 },
            { name: 'Ayçekirdeği', portion: '30g', calories: 170 },
            { name: 'Elma sirkesi sos', portion: '2 yemek kaşığı', calories: 50 },
          ],
          totalCalories: 454,
        },
        {
          type: 'dinner',
          name: 'Hafif Sebze Çorbası',
          foods: [
            { name: 'Sebze çorbası', portion: '400ml', calories: 150 },
            { name: 'Tam tahıl ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Humus', portion: '2 yemek kaşığı', calories: 70 },
          ],
          totalCalories: 300,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Yeşil çay', portion: '3 fincan', calories: 8 },
            { name: 'Salatalık çubukları', portion: '100g', calories: 16 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
          ],
          totalCalories: 154,
        },
      ],
      totalCalories: 1046,
      note: 'Hafif detoks günü - 3L su için',
    },
    {
      day: 25,
      title: 'Enerji Yükleme',
      meals: [
        {
          type: 'breakfast',
          name: 'Power Breakfast',
          foods: [
            { name: 'Yulaf', portion: '80g', calories: 300 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Yer fıstığı ezmesi', portion: '2 yemek kaşığı', calories: 190 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
          ],
          totalCalories: 625,
        },
        {
          type: 'lunch',
          name: 'Nohut Curry',
          foods: [
            { name: 'Nohut curry', portion: '250g', calories: 350 },
            { name: 'Esmer pirinç', portion: '150g', calories: 165 },
            { name: 'Salata', portion: '100g', calories: 20 },
          ],
          totalCalories: 535,
        },
        {
          type: 'dinner',
          name: 'Mercimek Burger',
          foods: [
            { name: 'Mercimek patty', portion: '2 adet', calories: 280 },
            { name: 'Tam buğday ekmeği', portion: '1 adet', calories: 150 },
            { name: 'Domates-marul', portion: '80g', calories: 20 },
            { name: 'Hardal', portion: '1 yemek kaşığı', calories: 10 },
          ],
          totalCalories: 460,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Energy ball', portion: '3 adet', calories: 225 },
            { name: 'Meyve', portion: '100g', calories: 60 },
          ],
          totalCalories: 285,
        },
      ],
      totalCalories: 1905,
    },
    {
      day: 26,
      title: 'Akdeniz Esintisi',
      meals: [
        {
          type: 'breakfast',
          name: 'Akdeniz Tabağı',
          foods: [
            { name: 'Humus', portion: '4 yemek kaşığı', calories: 140 },
            { name: 'Falafel', portion: '3 adet', calories: 180 },
            { name: 'Domates-salatalık', portion: '100g', calories: 25 },
            { name: 'Zeytin', portion: '10 adet', calories: 50 },
            { name: 'Tam tahıl pita', portion: '1 adet', calories: 130 },
          ],
          totalCalories: 525,
        },
        {
          type: 'lunch',
          name: 'Şakşuka',
          foods: [
            { name: 'Şakşuka (yumurtasız)', portion: '250g', calories: 180 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
          ],
          totalCalories: 500,
        },
        {
          type: 'dinner',
          name: 'Dolma',
          foods: [
            { name: 'Yaprak sarma', portion: '8 adet', calories: 280 },
            { name: 'Cacık (bitkisel)', portion: '100g', calories: 60 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 150 },
          ],
          totalCalories: 490,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'İncir', portion: '3 adet', calories: 110 },
            { name: 'Badem', portion: '15 adet', calories: 100 },
          ],
          totalCalories: 210,
        },
      ],
      totalCalories: 1725,
    },
    {
      day: 27,
      title: 'Thai Günü',
      meals: [
        {
          type: 'breakfast',
          name: 'Tropical Smoothie Bowl',
          foods: [
            { name: 'Mango', portion: '150g', calories: 90 },
            { name: 'Ananas', portion: '100g', calories: 50 },
            { name: 'Hindistancevizi yoğurdu', portion: '100g', calories: 120 },
            { name: 'Granola', portion: '30g', calories: 135 },
          ],
          totalCalories: 395,
        },
        {
          type: 'lunch',
          name: 'Tom Yum Çorbası (Vegan)',
          foods: [
            { name: 'Tom yum çorbası', portion: '300ml', calories: 100 },
            { name: 'Tofu', portion: '100g', calories: 80 },
            { name: 'Jasmine pirinç', portion: '100g', calories: 130 },
          ],
          totalCalories: 310,
        },
        {
          type: 'dinner',
          name: 'Green Curry (Vegan)',
          foods: [
            { name: 'Yeşil curry', portion: '250g', calories: 300 },
            { name: 'Tofu', portion: '100g', calories: 80 },
            { name: 'Jasmine pirinç', portion: '100g', calories: 130 },
            { name: 'Thai fesleğeni', portion: '10g', calories: 3 },
          ],
          totalCalories: 513,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Mango sticky rice', portion: '150g', calories: 250 },
          ],
          totalCalories: 250,
        },
      ],
      totalCalories: 1468,
    },
    {
      day: 28,
      title: 'Son Hafta Sonu',
      meals: [
        {
          type: 'breakfast',
          name: 'Brunch Tabağı',
          foods: [
            { name: 'Tofu scramble', portion: '150g', calories: 150 },
            { name: 'Avokado toast', portion: '2 dilim', calories: 400 },
            { name: 'Mantar sote', portion: '100g', calories: 50 },
            { name: 'Cherry domates', portion: '100g', calories: 18 },
          ],
          totalCalories: 618,
        },
        {
          type: 'lunch',
          name: 'Vegan Poke Bowl',
          foods: [
            { name: 'Sushi pirinci', portion: '100g', calories: 130 },
            { name: 'Tofu (marine)', portion: '100g', calories: 100 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Edamame', portion: '50g', calories: 60 },
            { name: 'Salatalık', portion: '50g', calories: 8 },
            { name: 'Soya-susam sos', portion: '2 yemek kaşığı', calories: 60 },
          ],
          totalCalories: 518,
        },
        {
          type: 'dinner',
          name: 'Fırın Sebze',
          foods: [
            { name: 'Karışık fırın sebze', portion: '300g', calories: 150 },
            { name: 'Nohut', portion: '100g', calories: 160 },
            { name: 'Tahin sos', portion: '2 yemek kaşığı', calories: 180 },
            { name: 'Tam tahıl ekmek', portion: '1 dilim', calories: 80 },
          ],
          totalCalories: 570,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Vegan cheesecake', portion: '1 dilim', calories: 250 },
          ],
          totalCalories: 250,
        },
      ],
      totalCalories: 1956,
      note: 'Hafta sonu keyfi - yarın son 2 gün!',
    },
    {
      day: 29,
      title: 'Son Sprint',
      meals: [
        {
          type: 'breakfast',
          name: 'Champion Breakfast',
          foods: [
            { name: 'Bezelye proteini smoothie', portion: '300ml', calories: 200 },
            { name: 'Yulaf', portion: '40g', calories: 150 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Badem', portion: '15 adet', calories: 100 },
          ],
          totalCalories: 555,
        },
        {
          type: 'lunch',
          name: 'Power Bowl',
          foods: [
            { name: 'Kinoa', portion: '150g', calories: 180 },
            { name: 'Siyah fasulye', portion: '100g', calories: 130 },
            { name: 'Mısır', portion: '50g', calories: 45 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Salsa', portion: '3 yemek kaşığı', calories: 30 },
          ],
          totalCalories: 545,
        },
        {
          type: 'dinner',
          name: 'Celebratory Dinner',
          foods: [
            { name: 'Portobello mantar (ızgara)', portion: '2 adet', calories: 60 },
            { name: 'Patates püresi', portion: '150g', calories: 150 },
            { name: 'Kuşkonmaz', portion: '100g', calories: 20 },
            { name: 'Gravy (bitkisel)', portion: '50ml', calories: 40 },
            { name: 'Şarap (isteğe bağlı)', portion: '1 bardak', calories: 125 },
          ],
          totalCalories: 395,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Meyveli yoğurt', portion: '200g', calories: 180 },
          ],
          totalCalories: 180,
        },
      ],
      totalCalories: 1675,
    },
    {
      day: 30,
      title: '🎉 TAMAMLANDI!',
      meals: [
        {
          type: 'breakfast',
          name: 'Final Kahvaltı',
          foods: [
            { name: 'Açai bowl', portion: '300g', calories: 350 },
            { name: 'Granola', portion: '40g', calories: 180 },
            { name: 'Taze meyve', portion: '100g', calories: 60 },
          ],
          totalCalories: 590,
        },
        {
          type: 'lunch',
          name: 'Favori Yemeğinizi Seçin',
          foods: [
            { name: 'Bu ay en sevdiğiniz öğünü tekrarlayın', portion: 'Orta porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'dinner',
          name: 'Kutlama Yemeği',
          foods: [
            { name: 'Vegan fine dining seçimi', portion: 'Orta porsiyon', calories: 600 },
            { name: 'Tatlı', portion: '1 porsiyon', calories: 200 },
          ],
          totalCalories: 800,
        },
        {
          type: 'snack',
          name: 'Kutlama',
          foods: [
            { name: 'Meyve ve kuruyemiş tabağı', portion: '200g', calories: 300 },
          ],
          totalCalories: 300,
        },
      ],
      totalCalories: 2190,
      note: '🎉 30 GÜN TAMAMLANDI! Tebrikler! Sağlık değerlerinizi kontrol ettirin.',
    },
  ],
};
