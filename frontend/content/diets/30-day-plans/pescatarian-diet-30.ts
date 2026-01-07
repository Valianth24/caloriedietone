import { Diet } from '../types';

export const pescatarianDiet30: Diet = {
  id: 'pescatarian',
  name: {
    tr: 'Pesketaryen Diyet',
    en: 'Pescatarian Diet',
  },
  emoji: '🐟',
  isPremium: true,
  duration: 30,
  difficulty: 'easy',

  description: {
    tr: 'Pesketaryen Diyet, vejetaryen beslenmeye balık ve deniz ürünlerini ekleyen sağlıklı bir beslenme yaklaşımıdır. Kırmızı et ve beyaz et tüketmeden, deniz ürünlerinden yüksek kaliteli protein ve Omega-3 yağ asitleri alınır. Bu diyet kalp sağlığı, beyin fonksiyonları ve sağlıklı kilo kaybı için idealdir.',
    en: 'Pescatarian Diet is a healthy eating approach that adds fish and seafood to vegetarian nutrition. Without consuming red or white meat, high-quality protein and Omega-3 fatty acids are obtained from seafood. This diet is ideal for heart health, brain function, and healthy weight loss.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Pesketaryen Beslenme Araştırmaları (2024):
• Kalp hastalığı riskini %34 azaltır
• İnme riskini %21 düşürür
• Tip 2 diyabet riskini %25 azaltır
• Kolorektal kanser riskini %43 düşürür

🐟 Omega-3 Yağ Asitlerinin Faydaları:
• EPA ve DHA - beyin ve göz sağlığı için kritik
• Anti-inflamatuar özellikler
• Trigliserit seviyelerini düşürür
• Depresyon semptomlarını azaltır

🧠 Bilişsel Sağlık:
• Hafıza ve öğrenme kapasitesini artırır
• Yaşa bağlı bilişsel gerilemeyi yavaşlatır
• Alzheimer riskini azaltır
• Konsantrasyon ve odaklanmayı iyileştirir

📈 Harvard Health Araştırması:
• 12 haftalık çalışmada %5-8 kilo kaybı
• LDL kolesterol %18 azalma
• HDL kolesterol %12 artış
• Kan basıncında 8-10 mmHg düşüş

💪 Protein Kalitesi:
• Balık proteini %85-95 sindirilebilirlik
• Tüm esansiyel amino asitler
• Et proteininden daha az doymuş yağ
• Kolay sindirim

⚠️ Dikkat:
• Cıva seviyesi yüksek balıklardan kaçının
• Haftada en az 2-3 porsiyon balık tüketin
• Çeşitlilik önemli - farklı balık türleri
• Sürdürülebilir kaynaklı balık tercih edin`,
    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 Pescatarian Diet Studies (2024):
• Reduces heart disease risk by 34%
• Lowers stroke risk by 21%
• Decreases Type 2 diabetes risk by 25%
• Reduces colorectal cancer risk by 43%

🐟 Omega-3 Fatty Acid Benefits:
• EPA and DHA - critical for brain and eye health
• Anti-inflammatory properties
• Lowers triglyceride levels
• Reduces depression symptoms

🧠 Cognitive Health:
• Increases memory and learning capacity
• Slows age-related cognitive decline
• Reduces Alzheimer's risk
• Improves concentration and focus

📈 Harvard Health Study:
• 5-8% weight loss in 12-week study
• 18% LDL cholesterol reduction
• 12% HDL cholesterol increase
• 8-10 mmHg blood pressure drop

💪 Protein Quality:
• Fish protein 85-95% digestible
• All essential amino acids
• Less saturated fat than meat protein
• Easy digestion

⚠️ Caution:
• Avoid fish high in mercury
• Consume at least 2-3 portions of fish weekly
• Variety is important - different fish types
• Prefer sustainably sourced fish`,
  },

  benefits: {
    tr: [
      '🫀 Kalp sağlığını önemli ölçüde korur',
      '🧠 Beyin fonksiyonlarını ve hafızayı güçlendirir',
      '⚖️ Sağlıklı ve sürdürülebilir kilo kaybı sağlar',
      '👁️ Göz sağlığını destekler (DHA)',
      '💪 Kas kütlesini koruyarak yağ yakımı sağlar',
      '🩸 Kolesterol seviyelerini dengeler',
      '⚡ Enerji seviyelerini artırır',
      '🦴 Kemik sağlığını destekler (D vitamini)',
      '😊 Ruh halini iyileştirir (Omega-3)',
      '🌍 Çevre dostu protein kaynağı',
    ],
    en: [
      '🫀 Significantly protects heart health',
      '🧠 Strengthens brain functions and memory',
      '⚖️ Provides healthy and sustainable weight loss',
      '👁️ Supports eye health (DHA)',
      '💪 Burns fat while preserving muscle mass',
      '🩸 Balances cholesterol levels',
      '⚡ Increases energy levels',
      '🦴 Supports bone health (Vitamin D)',
      '😊 Improves mood (Omega-3)',
      '🌍 Environmentally friendly protein source',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Cıva içeriği yüksek balıkları sınırlayın (kılıç balığı, köpek balığı)',
      '⚠️ Hamile kadınlar balık seçiminde dikkatli olmalı',
      '⚠️ Deniz ürünleri alerjisi olanlar için uygun değil',
      '⚠️ Sürdürülebilir kaynaklı balık tercih edin',
      '⚠️ Çiğ balık tüketiminde dikkatli olun',
      '⚠️ B12 ve demir takviyeleri gerekebilir',
    ],
    en: [
      '⚠️ Limit fish high in mercury (swordfish, shark)',
      '⚠️ Pregnant women should be careful with fish selection',
      '⚠️ Not suitable for those with seafood allergies',
      '⚠️ Prefer sustainably sourced fish',
      '⚠️ Be careful with raw fish consumption',
      '⚠️ B12 and iron supplements may be needed',
    ],
  },

  allowedFoods: {
    tr: [
      '🐟 Yağlı Balıklar: Somon, uskumru, sardalya, hamsi, ton',
      '🐟 Beyaz Balıklar: Levrek, çipura, mezgit, dil balığı',
      '🦐 Deniz Ürünleri: Karides, kalamar, midye, ahtapot',
      '🥬 Sebzeler: Tüm taze ve dondurulmuş sebzeler',
      '🍎 Meyveler: Tüm mevsim meyveleri',
      '🫘 Baklagiller: Mercimek, nohut, fasulye, soya',
      '🌾 Tam Tahıllar: Kinoa, bulgur, yulaf, esmer pirinç',
      '🥚 Yumurta: Günde 1-2 adet',
      '🧀 Süt Ürünleri: Yoğurt, peynir, süt (ölçülü)',
      '🥜 Kuruyemişler: Ceviz (Omega-3), badem, fındık',
      '🌻 Tohumlar: Keten, chia, susam',
      '🫒 Sağlıklı Yağlar: Zeytinyağı, avokado',
    ],
    en: [
      '🐟 Fatty Fish: Salmon, mackerel, sardines, anchovies, tuna',
      '🐟 White Fish: Sea bass, sea bream, whiting, sole',
      '🦐 Seafood: Shrimp, calamari, mussels, octopus',
      '🥬 Vegetables: All fresh and frozen vegetables',
      '🍎 Fruits: All seasonal fruits',
      '🫘 Legumes: Lentils, chickpeas, beans, soy',
      '🌾 Whole Grains: Quinoa, bulgur, oats, brown rice',
      '🥚 Eggs: 1-2 per day',
      '🧀 Dairy: Yogurt, cheese, milk (moderate)',
      '🥜 Nuts: Walnuts (Omega-3), almonds, hazelnuts',
      '🌻 Seeds: Flax, chia, sesame',
      '🫒 Healthy Fats: Olive oil, avocado',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🚫 Kırmızı et: Dana, kuzu (sınırlı)',
      '🚫 Beyaz et: Tavuk, hindi, ördek',
      '🚫 İşlenmiş etler: Sosis, salam, sucuk, jambon',
      '🚫 Fast food ve kızartmalar',
      '🚫 Şekerli içecekler',
      '🚫 Rafine şeker ve beyaz un',
      '🚫 Cıva yüksek balıklar: Kılıç balığı, köpek balığı, kral uskumru',
      '🚫 Trans yağlar ve margarin',
    ],
    en: [
      '🚫 Red meat: Beef, lamb, chicken',
      '🚫 White meat: Chicken, turkey, duck',
      '🚫 Processed meats: Sausage, salami, turkey bacon, ham',
      '🚫 Fast food and fried foods',
      '🚫 Sugary drinks',
      '🚫 Refined sugar and white flour',
      '🚫 High-mercury fish: Swordfish, shark, king mackerel',
      '🚫 Trans fats and margarine',
    ],
  },

  exercises: [
    {
      name: 'Yüzme',
      duration: '30-45 dakika',
      frequency: 'Haftada 3-4 kez',
      note: 'Pesketaryen temaya uygun - su sporları',
    },
    {
      name: 'Yürüyüş',
      duration: '30-45 dakika',
      frequency: 'Her gün',
      note: 'Sahil yürüyüşü idealdir',
    },
    {
      name: 'Yoga',
      duration: '30 dakika',
      frequency: 'Haftada 3 kez',
      note: 'Esneklik ve zihinsel denge',
    },
    {
      name: 'Bisiklet',
      duration: '30-45 dakika',
      frequency: 'Haftada 3 kez',
      note: 'Kardiyo ve bacak güçlendirme',
    },
    {
      name: 'Pilates',
      duration: '30 dakika',
      frequency: 'Haftada 2-3 kez',
      note: 'Core güçlendirme',
    },
  ],

  expectedResults: {
    tr: `📊 PESKETARYEN DİYET BEKLENEN SONUÇLAR

📅 1. Hafta:
• Omega-3 etkisiyle enerji artışı
• Sindirim sisteminde iyileşme
• Cilt görünümünde parlaklık
• 0.5-1 kg kilo kaybı

📅 2. Hafta:
• Zihinsel netlik ve odaklanma artışı
• Uyku kalitesinde iyileşme
• Şişkinlik hissinde azalma
• 1-2 kg toplam kilo kaybı

📅 3. Hafta:
• Kas tonusunda iyileşme
• Eklem ağrılarında azalma (anti-inflamatuar etki)
• Tokluk hissinde uzama
• 2-3 kg toplam kilo kaybı

📅 4. Hafta:
• Kolesterol değerlerinde belirgin iyileşme
• Kan basıncında düşüş
• Bel çevresinde azalma
• 3-4 kg sağlıklı kilo kaybı

🎯 Uzun Vadeli (3 ay):
• Toplam 8-12 kg kilo kaybı mümkün
• Kalp sağlığı göstergelerinde iyileşme
• Bilişsel fonksiyonlarda artış
• Kalıcı beslenme alışkanlığı`,
    en: `📊 PESCATARIAN DIET EXPECTED RESULTS

📅 Week 1:
• Energy increase with Omega-3 effect
• Improvement in digestive system
• Skin brightness
• 0.5-1 kg weight loss

📅 Week 2:
• Increased mental clarity and focus
• Improvement in sleep quality
• Reduction in bloating
• 1-2 kg total weight loss

📅 Week 3:
• Improvement in muscle tone
• Reduction in joint pain (anti-inflammatory effect)
• Extended satiety feeling
• 2-3 kg total weight loss

📅 Week 4:
• Significant improvement in cholesterol levels
• Drop in blood pressure
• Decrease in waist circumference
• 3-4 kg healthy weight loss

🎯 Long Term (3 months):
• Total 8-12 kg weight loss possible
• Improvement in heart health indicators
• Increase in cognitive functions
• Permanent eating habits`,
  },

  days: [
    // GÜN 1
    {
      day: 1,
      title: 'Omega-3 Başlangıcı 🐟',
      meals: [
        {
          type: 'breakfast',
          name: 'Somon Füme Kahvaltı',
          foods: [
            { name: 'Somon füme', portion: '60g', calories: 120 },
            { name: 'Krema peynir', portion: '30g', calories: 100 },
            { name: 'Tam tahıl bagel', portion: '1 adet', calories: 250 },
            { name: 'Kapari ve dereotu', portion: '1 yemek kaşığı', calories: 10 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
          totalCalories: 560,
        },
        {
          type: 'lunch',
          name: 'Ton Balıklı Salata',
          foods: [
            { name: 'Ton balığı (su)', portion: '120g', calories: 140 },
            { name: 'Karışık yeşillik', portion: '200g', calories: 40 },
            { name: 'Fasulye', portion: '50g', calories: 55 },
            { name: 'Cherry domates', portion: '100g', calories: 18 },
            { name: 'Zeytinyağı-limon sos', portion: '2 yemek kaşığı', calories: 150 },
            { name: 'Zeytin', portion: '8 adet', calories: 40 },
          ],
          totalCalories: 443,
        },
        {
          type: 'dinner',
          name: 'Fırında Somon',
          foods: [
            { name: 'Somon fileto', portion: '150g', calories: 300 },
            { name: 'Kuşkonmaz', portion: '150g', calories: 30 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Limon-dereotu sos', portion: '2 yemek kaşığı', calories: 60 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 640,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Ceviz', portion: '30g', calories: 200 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
          totalCalories: 290,
        },
      ],
      totalCalories: 1933,
      note: '🐟 Pesketaryen yolculuğa hoş geldiniz!',
    },
    // GÜN 2
    {
      day: 2,
      title: 'Deniz Ürünleri 🦐',
      meals: [
        {
          type: 'breakfast',
          name: 'Yumurtalı Kahvaltı',
          foods: [
            { name: 'Omlet (2 yumurta)', portion: '1 porsiyon', calories: 180 },
            { name: 'Ispanak', portion: '50g', calories: 12 },
            { name: 'Beyaz peynir', portion: '50g', calories: 130 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
          ],
          totalCalories: 482,
        },
        {
          type: 'lunch',
          name: 'Karides Pad Thai',
          foods: [
            { name: 'Karides', portion: '120g', calories: 120 },
            { name: 'Pirinç noodle', portion: '80g', calories: 150 },
            { name: 'Sebzeler', portion: '100g', calories: 40 },
            { name: 'Fıstık', portion: '20g', calories: 115 },
            { name: 'Pad thai sosu', portion: '2 yemek kaşığı', calories: 80 },
          ],
          totalCalories: 505,
        },
        {
          type: 'dinner',
          name: 'Akdeniz Balık Tabağı',
          foods: [
            { name: 'Levrek (ızgara)', portion: '200g', calories: 200 },
            { name: 'Roka salatası', portion: '100g', calories: 25 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Zeytinyağı', portion: '2 yemek kaşığı', calories: 240 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
          totalCalories: 493,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Elma', portion: '1 adet', calories: 95 },
            { name: 'Badem', portion: '20 adet', calories: 140 },
          ],
          totalCalories: 235,
        },
      ],
      totalCalories: 1715,
      note: '🦐 Deniz ürünleri çeşitliliği',
    },
    // GÜN 3
    {
      day: 3,
      title: 'Bitkisel + Balık Günü 🥗🐟',
      meals: [
        {
          type: 'breakfast',
          name: 'Smoothie Bowl',
          foods: [
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Yaban mersini', portion: '100g', calories: 57 },
            { name: 'Ispanak', portion: '50g', calories: 12 },
            { name: 'Granola', portion: '40g', calories: 180 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
          totalCalories: 414,
        },
        {
          type: 'lunch',
          name: 'Mercimek Çorbası',
          foods: [
            { name: 'Kırmızı mercimek çorbası', portion: '300ml', calories: 200 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
          totalCalories: 370,
        },
        {
          type: 'dinner',
          name: 'Izgara Hamsi',
          foods: [
            { name: 'Hamsi (ızgara)', portion: '200g', calories: 250 },
            { name: 'Roka-maydanoz salatası', portion: '150g', calories: 30 },
            { name: 'Limon', portion: '1 adet', calories: 20 },
            { name: 'Mısır ekmeği', portion: '1 dilim', calories: 100 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 520,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Humus', portion: '3 yemek kaşığı', calories: 105 },
            { name: 'Havuç çubukları', portion: '100g', calories: 41 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
          ],
          totalCalories: 276,
        },
      ],
      totalCalories: 1580,
      note: '🥗 Bitkisel öğünler + balık akşam yemeği',
    },
    // GÜN 4
    {
      day: 4,
      title: 'Sushi Günü 🍣',
      meals: [
        {
          type: 'breakfast',
          name: 'Japon Tarzı Kahvaltı',
          foods: [
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Yumurta (haşlanmış)', portion: '2 adet', calories: 140 },
            { name: 'Turşu sebze', portion: '50g', calories: 15 },
          ],
          totalCalories: 325,
        },
        {
          type: 'lunch',
          name: 'Sashimi ve Salata',
          foods: [
            { name: 'Somon sashimi', portion: '100g', calories: 180 },
            { name: 'Ton balığı sashimi', portion: '80g', calories: 100 },
            { name: 'Yosun salatası', portion: '100g', calories: 45 },
            { name: 'Zencefil', portion: '20g', calories: 15 },
            { name: 'Soya sosu', portion: '1 yemek kaşığı', calories: 9 },
          ],
          totalCalories: 349,
        },
        {
          type: 'dinner',
          name: 'Sushi Tabağı',
          foods: [
            { name: 'Somon nigiri', portion: '4 adet', calories: 200 },
            { name: 'Ton maki', portion: '6 adet', calories: 180 },
            { name: 'Avokado roll', portion: '4 adet', calories: 140 },
            { name: 'Edamame', portion: '100g', calories: 120 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
          totalCalories: 685,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Yeşil çay', portion: '2 fincan', calories: 5 },
            { name: 'Mandalina', portion: '2 adet', calories: 80 },
          ],
          totalCalories: 85,
        },
      ],
      totalCalories: 1444,
      note: '🍣 Japon mutfağı - Omega-3 zengini',
    },
    // GÜN 5
    {
      day: 5,
      title: 'Akdeniz Günü 🌊',
      meals: [
        {
          type: 'breakfast',
          name: 'Akdeniz Kahvaltısı',
          foods: [
            { name: 'Yumurta', portion: '2 adet', calories: 140 },
            { name: 'Beyaz peynir', portion: '50g', calories: 130 },
            { name: 'Domates-salatalık', portion: '100g', calories: 25 },
            { name: 'Zeytin', portion: '10 adet', calories: 50 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 625,
        },
        {
          type: 'lunch',
          name: 'Balıklı Buddha Bowl',
          foods: [
            { name: 'Uskumru (konserve)', portion: '100g', calories: 180 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Ispanak', portion: '50g', calories: 12 },
            { name: 'Nohut', portion: '50g', calories: 80 },
            { name: 'Tahin sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
          totalCalories: 642,
        },
        {
          type: 'dinner',
          name: 'Çipura Buğulama',
          foods: [
            { name: 'Çipura', portion: '200g', calories: 200 },
            { name: 'Patates', portion: '150g', calories: 130 },
            { name: 'Havuç', portion: '100g', calories: 41 },
            { name: 'Kereviz', portion: '50g', calories: 8 },
            { name: 'Limon-maydanoz sos', portion: '2 yemek kaşığı', calories: 50 },
          ],
          totalCalories: 429,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'İncir', portion: '3 adet', calories: 110 },
          ],
          totalCalories: 200,
        },
      ],
      totalCalories: 1896,
      note: '🌊 Akdeniz lezzetleri',
    },
    // GÜN 6
    {
      day: 6,
      title: 'Baklagil ve Balık 🫘🐟',
      meals: [
        {
          type: 'breakfast',
          name: 'Fıstık Ezmeli Yulaf',
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 230 },
            { name: 'Fıstık ezmesi', portion: '1 yemek kaşığı', calories: 95 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
          ],
          totalCalories: 460,
        },
        {
          type: 'lunch',
          name: 'Nohutlu Salata',
          foods: [
            { name: 'Nohut', portion: '150g', calories: 240 },
            { name: 'Domates', portion: '100g', calories: 18 },
            { name: 'Salatalık', portion: '100g', calories: 16 },
            { name: 'Kırmızı soğan', portion: '50g', calories: 20 },
            { name: 'Zeytinyağı', portion: '2 yemek kaşığı', calories: 240 },
            { name: 'Limon suyu', portion: '1 yemek kaşığı', calories: 4 },
          ],
          totalCalories: 538,
        },
        {
          type: 'dinner',
          name: 'Sardalya Izgara',
          foods: [
            { name: 'Sardalya', portion: '200g', calories: 350 },
            { name: 'Yeşil salata', portion: '150g', calories: 25 },
            { name: 'Limon', portion: '1 adet', calories: 20 },
            { name: 'Tam tahıl ekmek', portion: '1 dilim', calories: 80 },
          ],
          totalCalories: 475,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Portakal', portion: '1 adet', calories: 62 },
            { name: 'Badem', portion: '20 adet', calories: 140 },
          ],
          totalCalories: 202,
        },
      ],
      totalCalories: 1675,
      note: '🫘 Bitkisel protein + balık kombinasyonu',
    },
    // GÜN 7
    {
      day: 7,
      title: '🎉 1 Hafta Tamamlandı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kutlama Brunch',
          foods: [
            { name: 'Eggs Benedict (somon ile)', portion: '1 porsiyon', calories: 450 },
            { name: 'Taze meyve', portion: '150g', calories: 90 },
            { name: 'Portakal suyu', portion: '200ml', calories: 90 },
          ],
          totalCalories: 630,
        },
        {
          type: 'lunch',
          name: 'Deniz Mahsulleri Salatası',
          foods: [
            { name: 'Karides + kalamar', portion: '150g', calories: 150 },
            { name: 'Karışık yeşillik', portion: '200g', calories: 40 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Zeytinyağı sos', portion: '2 yemek kaşığı', calories: 150 },
          ],
          totalCalories: 500,
        },
        {
          type: 'dinner',
          name: 'Izgara Balık Şöleni',
          foods: [
            { name: 'Karışık ızgara balık (levrek + çipura)', portion: '250g', calories: 300 },
            { name: 'Izgara sebzeler', portion: '200g', calories: 80 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 150 },
            { name: 'Cacık', portion: '100g', calories: 50 },
          ],
          totalCalories: 580,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 120 },
          ],
          totalCalories: 120,
        },
      ],
      totalCalories: 1830,
      note: '🎉 1. hafta başarıyla tamamlandı!',
    },
    // GÜN 8-14 (2. Hafta)
    {
      day: 8,
      title: 'Yeni Hafta 🐟',
      meals: [
        { type: 'breakfast', name: 'Yumurtalı Kahvaltı', foods: [{ name: 'Omlet + ekmek + peynir', portion: '1 porsiyon', calories: 480 }], totalCalories: 480 },
        { type: 'lunch', name: 'Somon Salatası', foods: [{ name: 'Somon + yeşillik + kinoa', portion: '1 porsiyon', calories: 520 }], totalCalories: 520 },
        { type: 'dinner', name: 'Sebzeli Balık', foods: [{ name: 'Levrek + sebze', portion: '1 porsiyon', calories: 450 }], totalCalories: 450 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Yoğurt + meyve', portion: '1 porsiyon', calories: 180 }], totalCalories: 180 },
      ],
      totalCalories: 1630,
    },
    {
      day: 9,
      title: 'Omega-3 Yükleme 🐟',
      meals: [
        { type: 'breakfast', name: 'Chia Puding', foods: [{ name: 'Chia + badem sütü + meyve', portion: '1 porsiyon', calories: 350 }], totalCalories: 350 },
        { type: 'lunch', name: 'Ton Balıklı Sandviç', foods: [{ name: 'Ton + tam tahıl ekmek + sebze', portion: '1 porsiyon', calories: 450 }], totalCalories: 450 },
        { type: 'dinner', name: 'Uskumru Izgara', foods: [{ name: 'Uskumru + salata + patates', portion: '1 porsiyon', calories: 550 }], totalCalories: 550 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Ceviz + elma', portion: '1 porsiyon', calories: 250 }], totalCalories: 250 },
      ],
      totalCalories: 1600,
    },
    {
      day: 10,
      title: 'Bitkisel Gün 🌱',
      meals: [
        { type: 'breakfast', name: 'Smoothie Bowl', foods: [{ name: 'Meyve + yeşillik + granola', portion: '1 porsiyon', calories: 400 }], totalCalories: 400 },
        { type: 'lunch', name: 'Mercimek Çorbası', foods: [{ name: 'Çorba + ekmek + salata', portion: '1 porsiyon', calories: 450 }], totalCalories: 450 },
        { type: 'dinner', name: 'Falafel + Humus', foods: [{ name: 'Falafel tabağı', portion: '1 porsiyon', calories: 550 }], totalCalories: 550 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Badem + meyve', portion: '1 porsiyon', calories: 200 }], totalCalories: 200 },
      ],
      totalCalories: 1600,
      note: '🌱 Haftada 1-2 gün tamamen bitkisel',
    },
    {
      day: 11,
      title: 'Karides Günü 🦐',
      meals: [
        { type: 'breakfast', name: 'Akdeniz Kahvaltısı', foods: [{ name: 'Yumurta + peynir + zeytin', portion: '1 porsiyon', calories: 500 }], totalCalories: 500 },
        { type: 'lunch', name: 'Karides Wrap', foods: [{ name: 'Karides + tortilla + sebze', portion: '1 porsiyon', calories: 450 }], totalCalories: 450 },
        { type: 'dinner', name: 'Karides Makarna', foods: [{ name: 'Karides + spagetti + domates sosu', portion: '1 porsiyon', calories: 550 }], totalCalories: 550 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Yoğurt + ceviz', portion: '1 porsiyon', calories: 200 }], totalCalories: 200 },
      ],
      totalCalories: 1700,
    },
    {
      day: 12,
      title: 'Sushi Tekrar 🍣',
      meals: [
        { type: 'breakfast', name: 'Japon Kahvaltısı', foods: [{ name: 'Miso çorbası + pirinç + yumurta', portion: '1 porsiyon', calories: 350 }], totalCalories: 350 },
        { type: 'lunch', name: 'Poke Bowl', foods: [{ name: 'Somon + pirinç + avokado + edamame', portion: '1 porsiyon', calories: 550 }], totalCalories: 550 },
        { type: 'dinner', name: 'Sushi Çeşitleri', foods: [{ name: 'Karışık sushi tabağı', portion: '1 porsiyon', calories: 600 }], totalCalories: 600 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Yeşil çay + meyve', portion: '1 porsiyon', calories: 100 }], totalCalories: 100 },
      ],
      totalCalories: 1600,
    },
    {
      day: 13,
      title: 'Akdeniz Balık 🌊',
      meals: [
        { type: 'breakfast', name: 'Avokado Toast', foods: [{ name: 'Avokado + ekmek + yumurta', portion: '1 porsiyon', calories: 500 }], totalCalories: 500 },
        { type: 'lunch', name: 'Yunan Salatası + Balık', foods: [{ name: 'Salata + ton balığı', portion: '1 porsiyon', calories: 450 }], totalCalories: 450 },
        { type: 'dinner', name: 'Fırın Çipura', foods: [{ name: 'Çipura + patates + salata', portion: '1 porsiyon', calories: 500 }], totalCalories: 500 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'İncir + badem', portion: '1 porsiyon', calories: 200 }], totalCalories: 200 },
      ],
      totalCalories: 1650,
    },
    {
      day: 14,
      title: '🎉 2 Hafta Tamamlandı!',
      meals: [
        { type: 'breakfast', name: 'Brunch Tabağı', foods: [{ name: 'Somon + yumurta + ekmek', portion: '1 porsiyon', calories: 600 }], totalCalories: 600 },
        { type: 'lunch', name: 'Deniz Mahsulleri', foods: [{ name: 'Karışık deniz ürünleri salatası', portion: '1 porsiyon', calories: 480 }], totalCalories: 480 },
        { type: 'dinner', name: 'Özel Akşam Yemeği', foods: [{ name: 'Premium balık tabağı', portion: '1 porsiyon', calories: 600 }], totalCalories: 600 },
        { type: 'snack', name: 'Tatlı', foods: [{ name: 'Meyve tatlısı', portion: '1 porsiyon', calories: 150 }], totalCalories: 150 },
      ],
      totalCalories: 1830,
      note: '🎉 2 hafta bitti! Tartılın ve sonuçları not edin.',
    },
    // GÜN 15-21 (3. Hafta - Özet)
    { day: 15, title: 'Balık Günü 🐟', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Protein kahvaltı', portion: '1', calories: 480 }], totalCalories: 480 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Balık salatası', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Izgara balık', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Atıştırmalık', portion: '1', calories: 180 }], totalCalories: 180 }], totalCalories: 1660 },
    { day: 16, title: 'Deniz Ürünleri 🦐', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Yumurtalı kahvaltı', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Karides bowl', portion: '1', calories: 520 }], totalCalories: 520 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Midye dolma', portion: '1', calories: 480 }], totalCalories: 480 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Meyve', portion: '1', calories: 150 }], totalCalories: 150 }], totalCalories: 1600 },
    { day: 17, title: 'Bitkisel 🌱', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Smoothie bowl', portion: '1', calories: 400 }], totalCalories: 400 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Buddha bowl', portion: '1', calories: 550 }], totalCalories: 550 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Sebze yemeği', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Kuruyemiş', portion: '1', calories: 200 }], totalCalories: 200 }], totalCalories: 1600 },
    { day: 18, title: 'Somon Günü 🐟', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Somon füme kahvaltı', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Somon salatası', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Fırın somon', portion: '1', calories: 550 }], totalCalories: 550 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Yoğurt', portion: '1', calories: 150 }], totalCalories: 150 }], totalCalories: 1700 },
    { day: 19, title: 'Akdeniz 🌊', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Akdeniz kahvaltısı', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Mezze tabağı', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Levrek ızgara', portion: '1', calories: 480 }], totalCalories: 480 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Zeytin + peynir', portion: '1', calories: 180 }], totalCalories: 180 }], totalCalories: 1610 },
    { day: 20, title: 'Asya Esintisi 🍣', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Miso çorbası + pirinç', portion: '1', calories: 350 }], totalCalories: 350 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Poke bowl', portion: '1', calories: 550 }], totalCalories: 550 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Teriyaki balık', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Edamame', portion: '1', calories: 120 }], totalCalories: 120 }], totalCalories: 1520 },
    { day: 21, title: '🎉 3 Hafta!', meals: [{ type: 'breakfast', name: 'Brunch', foods: [{ name: 'Özel brunch', portion: '1', calories: 600 }], totalCalories: 600 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Hafif öğle', portion: '1', calories: 400 }], totalCalories: 400 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Kutlama yemeği', portion: '1', calories: 600 }], totalCalories: 600 }, { type: 'snack', name: 'Tatlı', foods: [{ name: 'Meyve tatlısı', portion: '1', calories: 150 }], totalCalories: 150 }], totalCalories: 1750, note: '🎉 3 hafta tamamlandı!' },
    // GÜN 22-30 (Son hafta)
    { day: 22, title: 'Balık 🐟', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Protein kahvaltı', portion: '1', calories: 480 }], totalCalories: 480 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Balık öğle', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Balık akşam', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Atıştırmalık', portion: '1', calories: 170 }], totalCalories: 170 }], totalCalories: 1650 },
    { day: 23, title: 'Karides 🦐', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Yumurta kahvaltı', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Karides öğle', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Deniz ürünleri', portion: '1', calories: 520 }], totalCalories: 520 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Meyve', portion: '1', calories: 130 }], totalCalories: 130 }], totalCalories: 1600 },
    { day: 24, title: 'Bitkisel 🌱', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Vegan kahvaltı', portion: '1', calories: 400 }], totalCalories: 400 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Baklagil', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Sebze', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Kuruyemiş', portion: '1', calories: 200 }], totalCalories: 200 }], totalCalories: 1550 },
    { day: 25, title: 'Omega-3 🐟', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Somon kahvaltı', portion: '1', calories: 520 }], totalCalories: 520 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Uskumru salatası', portion: '1', calories: 480 }], totalCalories: 480 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Sardalya', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Ceviz', portion: '1', calories: 200 }], totalCalories: 200 }], totalCalories: 1650 },
    { day: 26, title: 'Sushi 🍣', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Japon kahvaltı', portion: '1', calories: 350 }], totalCalories: 350 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Sashimi', portion: '1', calories: 400 }], totalCalories: 400 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Sushi tabağı', portion: '1', calories: 650 }], totalCalories: 650 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Edamame', portion: '1', calories: 120 }], totalCalories: 120 }], totalCalories: 1520 },
    { day: 27, title: 'Akdeniz 🌊', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Akdeniz kahvaltı', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Balık mezze', portion: '1', calories: 480 }], totalCalories: 480 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Fırın balık', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Meyve', portion: '1', calories: 120 }], totalCalories: 120 }], totalCalories: 1600 },
    { day: 28, title: 'Hafta Sonu 🎉', meals: [{ type: 'breakfast', name: 'Brunch', foods: [{ name: 'Deniz brunch', portion: '1', calories: 600 }], totalCalories: 600 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Hafif öğle', portion: '1', calories: 350 }], totalCalories: 350 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Özel yemek', portion: '1', calories: 600 }], totalCalories: 600 }, { type: 'snack', name: 'Tatlı', foods: [{ name: 'Tatlı', portion: '1', calories: 200 }], totalCalories: 200 }], totalCalories: 1750 },
    { day: 29, title: 'Son Hazırlık 🐟', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Favori kahvaltı', portion: '1', calories: 480 }], totalCalories: 480 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Sağlıklı öğle', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Dengeli akşam', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Meyve', portion: '1', calories: 150 }], totalCalories: 150 }], totalCalories: 1630 },
    {
      day: 30,
      title: '🎉 30 GÜN TAMAMLANDI!',
      meals: [
        { type: 'breakfast', name: 'Kutlama Brunch', foods: [{ name: 'Premium balıklı brunch', portion: '1 porsiyon', calories: 650 }], totalCalories: 650 },
        { type: 'lunch', name: 'Şef Salatası', foods: [{ name: 'Deniz mahsulleri salatası', portion: '1 porsiyon', calories: 500 }], totalCalories: 500 },
        { type: 'dinner', name: 'Gala Yemeği', foods: [{ name: 'Premium balık tabağı', portion: '1 porsiyon', calories: 750 }], totalCalories: 750 },
        { type: 'snack', name: 'Tatlı', foods: [{ name: 'Kutlama tatlısı', portion: '1 porsiyon', calories: 250 }], totalCalories: 250 },
      ],
      totalCalories: 2150,
      note: '🎉 TEBRİKLER! 30 gün tamamlandı! Sağlık kontrolü yaptırın ve sonuçları kutlayın!',
    },
  ],
};
