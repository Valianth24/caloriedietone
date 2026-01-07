import { Diet } from '../types';

export const flexitarianDiet30: Diet = {
  id: 'flexitarian',
  name: {
    tr: 'Fleksiteryen Diyet',
    en: 'Flexitarian Diet',
  },
  emoji: '🥗',
  isPremium: true,
  duration: 30,
  difficulty: 'easy',

  description: {
    tr: 'Fleksiteryen Diyet, esnek vejetaryenlik anlamına gelir. Çoğunlukla bitkisel beslenmeye odaklanırken, ara sıra et ve hayvansal ürün tüketimine izin veren dengeli bir yaklaşımdır. Katı kurallar yerine esneklik sunan bu diyet, sürdürülebilir kilo kaybı ve genel sağlık için idealdir.',
    en: 'Flexitarian Diet means flexible vegetarianism. It focuses primarily on plant-based eating while allowing occasional meat and animal product consumption. This diet offers flexibility instead of strict rules, making it ideal for sustainable weight loss and overall health.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Fleksiteryen Beslenme Araştırmaları (2024):
• Tam vejetaryen diyete göre %50 daha kolay sürdürülebilir
• Yılda ortalama 3-5 kg sağlıklı kilo kaybı
• Kalp hastalığı riskini %32 azaltır
• Tip 2 diyabet riskini %28 düşürür

🌱 Bitkisel Beslenme Faydaları:
• Lif alımını 2 katına çıkarır
• Antioksidan çeşitliliği artar
• Bağırsak mikrobiyomu zenginleşir
• Kolesterol seviyelerinde düşüş

⚖️ Esneklik Avantajı:
• Sosyal ortamlarda uygulanabilir
• Besin eksikliği riski düşük
• Psikolojik baskı yaratmaz
• Uzun vadeli başarı oranı yüksek

📈 American Journal of Clinical Nutrition:
• 6 ay sonunda BMI'de %5-7 düşüş
• LDL kolesterol %15-20 azalma
• Kan basıncında 5-8 mmHg düşüş
• İnflamasyon belirteçlerinde iyileşme

🎯 Optimal Uygulama:
• Haftada 2-3 gün tamamen bitkisel
• Et tüketimi haftada 2-3 porsiyon ile sınırlı
• Her öğünde %50+ sebze
• İşlenmiş gıdalardan kaçınma

⚠️ Dikkat:
• B12 ve demir seviyelerini takip edin
• Protein çeşitliliğine önem verin
• Kaliteli et kaynaklarını tercih edin`,
    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 Flexitarian Diet Studies (2024):
• 50% easier to sustain than full vegetarian diet
• Average 3-5 kg healthy weight loss per year
• Reduces heart disease risk by 32%
• Lowers Type 2 diabetes risk by 28%

🌱 Plant-Based Benefits:
• Doubles fiber intake
• Increases antioxidant variety
• Enriches gut microbiome
• Decreases cholesterol levels

⚖️ Flexibility Advantage:
• Applicable in social settings
• Low risk of nutrient deficiency
• No psychological pressure
• High long-term success rate

📈 American Journal of Clinical Nutrition:
• 5-7% BMI decrease after 6 months
• 15-20% LDL cholesterol reduction
• 5-8 mmHg blood pressure drop
• Improvement in inflammation markers

🎯 Optimal Application:
• 2-3 days fully plant-based per week
• Meat consumption limited to 2-3 portions weekly
• 50%+ vegetables at each meal
• Avoid processed foods

⚠️ Caution:
• Monitor B12 and iron levels
• Focus on protein variety
• Choose quality meat sources`,
  },

  benefits: {
    tr: [
      '🥗 Kolay uygulanabilir ve sürdürülebilir',
      '⚖️ Sağlıklı ve kalıcı kilo kaybı sağlar',
      '🫀 Kalp sağlığını önemli ölçüde korur',
      '🌿 Çevre dostu beslenme yaklaşımı',
      '💰 Bütçe dostu - et masrafları azalır',
      '🍽️ Sosyal ortamlarda rahat uygulanır',
      '🧬 Bağırsak sağlığını güçlendirir',
      '⚡ Enerji seviyelerini dengeler',
      '🧠 Bilişsel fonksiyonları destekler',
      '🩸 Kan şekeri kontrolüne yardımcı olur',
    ],
    en: [
      '🥗 Easy to apply and sustainable',
      '⚖️ Provides healthy and permanent weight loss',
      '🫀 Significantly protects heart health',
      '🌿 Environmentally friendly eating approach',
      '💰 Budget friendly - reduces meat expenses',
      '🍽️ Comfortable to apply in social settings',
      '🧬 Strengthens gut health',
      '⚡ Balances energy levels',
      '🧠 Supports cognitive functions',
      '🩸 Helps blood sugar control',
    ],
  },

  warnings: {
    tr: [
      '⚠️ B12 vitamini seviyelerini düzenli kontrol ettirin',
      '⚠️ Demir alımına dikkat edin, özellikle kadınlar',
      '⚠️ Protein kaynaklarını çeşitlendirin',
      '⚠️ İşlenmiş vejetaryen ürünlerden kaçının',
      '⚠️ Omega-3 için haftada 2 kez balık tüketin',
      '⚠️ Hamile kadınlar için ek takviye gerekebilir',
    ],
    en: [
      '⚠️ Regularly check B12 vitamin levels',
      '⚠️ Pay attention to iron intake, especially women',
      '⚠️ Diversify protein sources',
      '⚠️ Avoid processed vegetarian products',
      '⚠️ Consume fish twice a week for Omega-3',
      '⚠️ Pregnant women may need additional supplements',
    ],
  },

  allowedFoods: {
    tr: [
      '🥬 Sebzeler (sınırsız): Her türlü taze ve dondurulmuş sebze',
      '🍎 Meyveler: Tüm mevsim meyveleri',
      '🫘 Baklagiller: Mercimek, nohut, fasulye, bezelye',
      '🌾 Tam Tahıllar: Yulaf, kinoa, bulgur, esmer pirinç',
      '🥜 Kuruyemişler: Badem, ceviz, fındık, kaju',
      '🌻 Tohumlar: Chia, keten, susam, kabak çekirdeği',
      '🥚 Yumurta: Haftada 4-6 adet',
      '🧀 Süt Ürünleri: Yoğurt, peynir (ölçülü)',
      '🐟 Balık: Haftada 2-3 porsiyon',
      '🍗 Beyaz Et: Haftada 1-2 porsiyon (tavuk, hindi)',
      '🥩 Kırmızı Et: Ayda 2-4 porsiyon (kaliteli, az yağlı)',
      '🫒 Sağlıklı Yağlar: Zeytinyağı, avokado',
    ],
    en: [
      '🥬 Vegetables (unlimited): All fresh and frozen vegetables',
      '🍎 Fruits: All seasonal fruits',
      '🫘 Legumes: Lentils, chickpeas, beans, peas',
      '🌾 Whole Grains: Oats, quinoa, bulgur, brown rice',
      '🥜 Nuts: Almonds, walnuts, hazelnuts, cashews',
      '🌻 Seeds: Chia, flax, sesame, pumpkin seeds',
      '🥚 Eggs: 4-6 per week',
      '🧀 Dairy: Yogurt, cheese (moderate)',
      '🐟 Fish: 2-3 portions per week',
      '🍗 White Meat: 1-2 portions per week (chicken, turkey)',
      '🥩 Red Meat: 2-4 portions per month (quality, lean)',
      '🫒 Healthy Fats: Olive oil, avocado',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🚫 İşlenmiş etler: Sosis, salam, sucuk (sınırlı)',
      '🚫 Fast food ve kızartmalar',
      '🚫 Şekerli içecekler ve gazlı içecekler',
      '🚫 Rafine şeker ve beyaz un ürünleri',
      '🚫 İşlenmiş vejetaryen ürünler (sahte et)',
      '🚫 Trans yağlar ve margarin',
      '🚫 Paketli atıştırmalıklar ve cipsler',
      '🚫 Aşırı tuzlu gıdalar',
    ],
    en: [
      '🚫 Processed meats: Sausage, salami, turkey bacon, ham',
      '🚫 Fast food and fried foods',
      '🚫 Sugary drinks and carbonated beverages',
      '🚫 Refined sugar and white flour products',
      '🚫 Processed vegetarian products (fake meat)',
      '🚫 Trans fats and margarine',
      '🚫 Packaged snacks and chips',
      '🚫 Excessively salty foods',
    ],
  },

  exercises: [
    {
      name: 'Yürüyüş',
      duration: '30-45 dakika',
      frequency: 'Her gün',
      note: 'Sabah veya akşam, orta tempo',
    },
    {
      name: 'Yoga',
      duration: '30-45 dakika',
      frequency: 'Haftada 3-4 kez',
      note: 'Esneklik ve stres yönetimi',
    },
    {
      name: 'Yüzme',
      duration: '30 dakika',
      frequency: 'Haftada 2-3 kez',
      note: 'Tüm kas gruplarını çalıştırır',
    },
    {
      name: 'Bisiklet',
      duration: '30-45 dakika',
      frequency: 'Haftada 3 kez',
      note: 'Açık hava veya sabit bisiklet',
    },
    {
      name: 'Hafif Ağırlık Antrenmanı',
      duration: '30 dakika',
      frequency: 'Haftada 2 kez',
      note: 'Kas tonusu için',
    },
  ],

  expectedResults: {
    tr: `📊 FLEKSİTERYEN DİYET BEKLENEN SONUÇLAR

📅 1. Hafta:
• Sindirim sisteminde iyileşme
• Şişkinlik hissinde azalma
• Enerji seviyesinde artış başlangıcı
• 0.5-1 kg kilo kaybı

📅 2. Hafta:
• Cilt görünümünde iyileşme
• Uyku kalitesinde artış
• Tokluk hissinde uzama
• 1-2 kg toplam kilo kaybı

📅 3. Hafta:
• Et isteğinde belirgin azalma
• Sebze tüketimi doğallaşır
• Enerji seviyesi stabilize
• 2-3 kg toplam kilo kaybı

📅 4. Hafta:
• Kolesterol değerlerinde iyileşme
• Kan basıncında düşüş
• Bel çevresinde azalma
• 3-4 kg sağlıklı kilo kaybı

🎯 Uzun Vadeli (3-6 ay):
• Toplam 8-15 kg kilo kaybı mümkün
• Kalıcı beslenme alışkanlığı
• Sağlık göstergelerinde iyileşme
• Yaşam tarzı değişikliği`,
    en: `📊 FLEXITARIAN DIET EXPECTED RESULTS

📅 Week 1:
• Improvement in digestive system
• Reduction in bloating
• Beginning of energy level increase
• 0.5-1 kg weight loss

📅 Week 2:
• Improvement in skin appearance
• Increase in sleep quality
• Extended satiety feeling
• 1-2 kg total weight loss

📅 Week 3:
• Significant decrease in meat cravings
• Vegetable consumption becomes natural
• Energy level stabilizes
• 2-3 kg total weight loss

📅 Week 4:
• Improvement in cholesterol levels
• Drop in blood pressure
• Decrease in waist circumference
• 3-4 kg healthy weight loss

🎯 Long Term (3-6 months):
• Total 8-15 kg weight loss possible
• Permanent eating habits
• Improvement in health indicators
• Lifestyle change`,
  },

  days: [
    // GÜN 1 - Tamamen Bitkisel
    {
      day: 1,
      title: 'Bitkisel Başlangıç 🌱',
      meals: [
        {
          type: 'breakfast',
          name: 'Vegan Kahvaltı Tabağı',
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g', calories: 230 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Badem', portion: '15 adet', calories: 100 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
          ],
          totalCalories: 525,
        },
        {
          type: 'lunch',
          name: 'Mercimek Çorbası ve Salata',
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 200 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Yeşil salata', portion: '200g', calories: 40 },
            { name: 'Zeytinyağı-limon sos', portion: '2 yemek kaşığı', calories: 150 },
          ],
          totalCalories: 550,
        },
        {
          type: 'dinner',
          name: 'Sebzeli Nohut Yemeği',
          foods: [
            { name: 'Nohut', portion: '150g (pişmiş)', calories: 240 },
            { name: 'Ispanak', portion: '100g', calories: 23 },
            { name: 'Domates sosu', portion: '100g', calories: 40 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 150 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 573,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Elma', portion: '1 adet', calories: 95 },
            { name: 'Humus', portion: '3 yemek kaşığı', calories: 105 },
            { name: 'Havuç çubukları', portion: '100g', calories: 41 },
          ],
          totalCalories: 241,
        },
      ],
      totalCalories: 1889,
      note: '🌱 Bugün tamamen bitkisel gün!',
    },
    // GÜN 2 - Balık Günü
    {
      day: 2,
      title: 'Omega-3 Günü 🐟',
      meals: [
        {
          type: 'breakfast',
          name: 'Yumurtalı Kahvaltı',
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Domates', portion: '100g', calories: 18 },
          ],
          totalCalories: 478,
        },
        {
          type: 'lunch',
          name: 'Ton Balıklı Salata',
          foods: [
            { name: 'Ton balığı', portion: '100g', calories: 130 },
            { name: 'Karışık yeşillik', portion: '200g', calories: 40 },
            { name: 'Fasulye', portion: '50g', calories: 55 },
            { name: 'Zeytin', portion: '10 adet', calories: 50 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 395,
        },
        {
          type: 'dinner',
          name: 'Fırında Somon',
          foods: [
            { name: 'Somon', portion: '150g', calories: 300 },
            { name: 'Kuşkonmaz', portion: '100g', calories: 20 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Limon-dereotu sos', portion: '2 yemek kaşığı', calories: 50 },
          ],
          totalCalories: 500,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Yaban mersini', portion: '100g', calories: 57 },
          ],
          totalCalories: 277,
        },
      ],
      totalCalories: 1650,
      note: '🐟 Omega-3 açısından zengin gün',
    },
    // GÜN 3 - Tamamen Bitkisel
    {
      day: 3,
      title: 'Bitkisel Gün 🌿',
      meals: [
        {
          type: 'breakfast',
          name: 'Smoothie Bowl',
          foods: [
            { name: 'Ispanak', portion: '50g', calories: 12 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Mango', portion: '100g', calories: 60 },
            { name: 'Granola', portion: '40g', calories: 180 },
            { name: 'Hindistancevizi', portion: '1 yemek kaşığı', calories: 35 },
          ],
          totalCalories: 392,
        },
        {
          type: 'lunch',
          name: 'Buddha Bowl',
          foods: [
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Siyah fasulye', portion: '100g', calories: 130 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Mısır', portion: '50g', calories: 45 },
            { name: 'Kırmızı lahana', portion: '50g', calories: 15 },
            { name: 'Tahini sos', portion: '2 yemek kaşığı', calories: 180 },
          ],
          totalCalories: 650,
        },
        {
          type: 'dinner',
          name: 'Sebze Kızartma (Stir-Fry)',
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
            { name: 'Armut', portion: '1 adet', calories: 100 },
            { name: 'Badem', portion: '20 adet', calories: 140 },
          ],
          totalCalories: 240,
        },
      ],
      totalCalories: 1641,
      note: '🌱 İkinci bitkisel gün',
    },
    // GÜN 4 - Tavuk Günü
    {
      day: 4,
      title: 'Protein Günü 🍗',
      meals: [
        {
          type: 'breakfast',
          name: 'Peynirli Omlet',
          foods: [
            { name: 'Yumurta', portion: '3 adet', calories: 210 },
            { name: 'Lor peyniri', portion: '50g', calories: 50 },
            { name: 'Ispanak', portion: '50g', calories: 12 },
            { name: 'Tam tahıl ekmek', portion: '1 dilim', calories: 80 },
          ],
          totalCalories: 352,
        },
        {
          type: 'lunch',
          name: 'Tavuklu Wrap',
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '100g', calories: 165 },
            { name: 'Tam buğday tortilla', portion: '1 adet', calories: 130 },
            { name: 'Marul, domates', portion: '100g', calories: 25 },
            { name: 'Yoğurt sos', portion: '2 yemek kaşığı', calories: 40 },
          ],
          totalCalories: 360,
        },
        {
          type: 'dinner',
          name: 'Izgara Tavuk ve Sebze',
          foods: [
            { name: 'Tavuk but (derisiz)', portion: '150g', calories: 250 },
            { name: 'Izgara sebzeler', portion: '200g', calories: 80 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 150 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
          totalCalories: 540,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Meyve salatası', portion: '200g', calories: 130 },
            { name: 'Kuruyemiş karışımı', portion: '30g', calories: 180 },
          ],
          totalCalories: 310,
        },
      ],
      totalCalories: 1562,
      note: '🍗 Haftanın beyaz et günü',
    },
    // GÜN 5 - Tamamen Bitkisel
    {
      day: 5,
      title: 'Baklagil Şöleni 🫘',
      meals: [
        {
          type: 'breakfast',
          name: 'Fıstık Ezmeli Kahvaltı',
          foods: [
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Fıstık ezmesi', portion: '2 yemek kaşığı', calories: 190 },
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
          totalCalories: 485,
        },
        {
          type: 'lunch',
          name: 'Falafel Tabağı',
          foods: [
            { name: 'Falafel', portion: '5 adet', calories: 300 },
            { name: 'Humus', portion: '3 yemek kaşığı', calories: 105 },
            { name: 'Taboule', portion: '100g', calories: 130 },
            { name: 'Turşu', portion: '50g', calories: 15 },
            { name: 'Tam tahıl pita', portion: '1/2 adet', calories: 85 },
          ],
          totalCalories: 635,
        },
        {
          type: 'dinner',
          name: 'Kuru Fasulye',
          foods: [
            { name: 'Kuru fasulye', portion: '200g (pişmiş)', calories: 280 },
            { name: 'Pilav', portion: '100g', calories: 130 },
            { name: 'Turşu', portion: '50g', calories: 15 },
            { name: 'Soğan', portion: '50g', calories: 20 },
          ],
          totalCalories: 445,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Portakal', portion: '1 adet', calories: 62 },
            { name: 'Edamame', portion: '100g', calories: 120 },
          ],
          totalCalories: 182,
        },
      ],
      totalCalories: 1747,
      note: '🫘 Baklagiller protein deposu!',
    },
    // GÜN 6 - Balık Günü
    {
      day: 6,
      title: 'Deniz Ürünleri 🐟',
      meals: [
        {
          type: 'breakfast',
          name: 'Akdeniz Kahvaltısı',
          foods: [
            { name: 'Yumurta', portion: '2 adet', calories: 140 },
            { name: 'Beyaz peynir', portion: '50g', calories: 130 },
            { name: 'Domates, salatalık', portion: '100g', calories: 25 },
            { name: 'Zeytin', portion: '10 adet', calories: 50 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
          ],
          totalCalories: 505,
        },
        {
          type: 'lunch',
          name: 'Karides Salatası',
          foods: [
            { name: 'Karides', portion: '100g', calories: 100 },
            { name: 'Karışık yeşillik', portion: '200g', calories: 40 },
            { name: 'Avokado', portion: '1/2 adet', calories: 160 },
            { name: 'Cherry domates', portion: '100g', calories: 18 },
            { name: 'Zeytinyağı sos', portion: '2 yemek kaşığı', calories: 150 },
          ],
          totalCalories: 468,
        },
        {
          type: 'dinner',
          name: 'Levrek Buğulama',
          foods: [
            { name: 'Levrek', portion: '200g', calories: 200 },
            { name: 'Patates', portion: '150g', calories: 130 },
            { name: 'Havuç', portion: '100g', calories: 41 },
            { name: 'Maydanoz-limon sos', portion: '2 yemek kaşığı', calories: 60 },
          ],
          totalCalories: 431,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Çilek', portion: '150g', calories: 48 },
          ],
          totalCalories: 138,
        },
      ],
      totalCalories: 1542,
      note: '🐟 Haftanın ikinci balık günü',
    },
    // GÜN 7 - Hafta Sonu (Esnek)
    {
      day: 7,
      title: 'Esnek Hafta Sonu 🎉',
      meals: [
        {
          type: 'breakfast',
          name: 'Brunch',
          foods: [
            { name: 'Menemen', portion: '2 yumurta + sebze', calories: 250 },
            { name: 'Sucuk (2 dilim)', portion: '30g', calories: 100 },
            { name: 'Beyaz peynir', portion: '50g', calories: 130 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
          ],
          totalCalories: 640,
        },
        {
          type: 'lunch',
          name: 'Hafif Öğle',
          foods: [
            { name: 'Mercimek çorbası', portion: '250ml', calories: 170 },
            { name: 'Yeşil salata', portion: '150g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 120 },
          ],
          totalCalories: 315,
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          foods: [
            { name: 'Izgara köfte', portion: '100g', calories: 200 },
            { name: 'Sebzeli bulgur pilavı', portion: '150g', calories: 200 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Salata', portion: '100g', calories: 20 },
          ],
          totalCalories: 480,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 120 },
            { name: 'Badem', portion: '15 adet', calories: 100 },
          ],
          totalCalories: 220,
        },
      ],
      totalCalories: 1655,
      note: '🎉 1. Hafta tamamlandı! Haftalık küçük ödül günü.',
    },
    // GÜN 8-14 (2. Hafta - Benzer yapı)
    {
      day: 8,
      title: 'Bitkisel Başlangıç 🌱',
      meals: [
        {
          type: 'breakfast',
          name: 'Chia Puding',
          foods: [
            { name: 'Chia tohumu', portion: '3 yemek kaşığı', calories: 180 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
            { name: 'Mango', portion: '100g', calories: 60 },
            { name: 'Hindistancevizi', portion: '1 yemek kaşığı', calories: 35 },
          ],
          totalCalories: 305,
        },
        {
          type: 'lunch',
          name: 'Sebze Çorbası ve Ekmek',
          foods: [
            { name: 'Sebze çorbası', portion: '300ml', calories: 150 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Humus', portion: '3 yemek kaşığı', calories: 105 },
          ],
          totalCalories: 415,
        },
        {
          type: 'dinner',
          name: 'Mercimek Dal',
          foods: [
            { name: 'Kırmızı mercimek dal', portion: '250g', calories: 280 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Naan ekmeği', portion: '1/2 adet', calories: 130 },
          ],
          totalCalories: 520,
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
      totalCalories: 1500,
      note: '🌱 2. hafta başladı!',
    },
    {
      day: 9,
      title: 'Yumurta ve Balık 🥚🐟',
      meals: [
        {
          type: 'breakfast',
          name: 'Şakşuka',
          foods: [
            { name: 'Şakşuka (2 yumurta)', portion: '1 porsiyon', calories: 280 },
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
          ],
          totalCalories: 440,
        },
        {
          type: 'lunch',
          name: 'Somon Salatası',
          foods: [
            { name: 'Somon (ızgara)', portion: '100g', calories: 200 },
            { name: 'Kinoa', portion: '80g', calories: 95 },
            { name: 'Yeşillik', portion: '150g', calories: 30 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
          totalCalories: 405,
        },
        {
          type: 'dinner',
          name: 'Sebzeli Makarna',
          foods: [
            { name: 'Tam buğday makarna', portion: '80g', calories: 280 },
            { name: 'Domates sosu', portion: '100g', calories: 40 },
            { name: 'Mantar', portion: '100g', calories: 22 },
            { name: 'Parmesan', portion: '20g', calories: 80 },
          ],
          totalCalories: 422,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Yoğurt + meyve', portion: '200g', calories: 150 },
            { name: 'Badem', portion: '15 adet', calories: 100 },
          ],
          totalCalories: 250,
        },
      ],
      totalCalories: 1517,
    },
    {
      day: 10,
      title: 'Bitkisel Gün 🌿',
      meals: [
        {
          type: 'breakfast',
          name: 'Avokado Toast',
          foods: [
            { name: 'Tam tahıl ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1 adet', calories: 320 },
            { name: 'Cherry domates', portion: '50g', calories: 9 },
            { name: 'Limon suyu', portion: '1 yemek kaşığı', calories: 4 },
          ],
          totalCalories: 493,
        },
        {
          type: 'lunch',
          name: 'Falafel Wrap',
          foods: [
            { name: 'Falafel', portion: '4 adet', calories: 240 },
            { name: 'Lavaş', portion: '1 adet', calories: 120 },
            { name: 'Humus', portion: '2 yemek kaşığı', calories: 70 },
            { name: 'Sebzeler', portion: '100g', calories: 25 },
          ],
          totalCalories: 455,
        },
        {
          type: 'dinner',
          name: 'Sebze Curry',
          foods: [
            { name: 'Nohut + sebze curry', portion: '300g', calories: 350 },
            { name: 'Basmati pirinç', portion: '100g', calories: 130 },
          ],
          totalCalories: 480,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Muz', portion: '1 adet', calories: 105 },
            { name: 'Fıstık', portion: '30g', calories: 170 },
          ],
          totalCalories: 275,
        },
      ],
      totalCalories: 1703,
    },
    // GÜN 11-14 (kısaltılmış)
    {
      day: 11,
      title: 'Tavuk Günü 🍗',
      meals: [
        {
          type: 'breakfast',
          name: 'Protein Kahvaltı',
          foods: [
            { name: 'Yumurta + peynir + ekmek', portion: '1 porsiyon', calories: 450 },
          ],
          totalCalories: 450,
        },
        {
          type: 'lunch',
          name: 'Tavuk Salatası',
          foods: [
            { name: 'Izgara tavuk + salata', portion: '1 porsiyon', calories: 400 },
          ],
          totalCalories: 400,
        },
        {
          type: 'dinner',
          name: 'Tavuk Şiş',
          foods: [
            { name: 'Tavuk şiş + bulgur + salata', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Meyve + yoğurt', portion: '1 porsiyon', calories: 200 },
          ],
          totalCalories: 200,
        },
      ],
      totalCalories: 1600,
    },
    {
      day: 12,
      title: 'Bitkisel Gün 🌱',
      meals: [
        {
          type: 'breakfast',
          name: 'Smoothie + Yulaf',
          foods: [
            { name: 'Yeşil smoothie + yulaf', portion: '1 porsiyon', calories: 400 },
          ],
          totalCalories: 400,
        },
        {
          type: 'lunch',
          name: 'Buddha Bowl',
          foods: [
            { name: 'Kinoa + baklagil + sebze', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'dinner',
          name: 'Mercimek Yemeği',
          foods: [
            { name: 'Yeşil mercimek + pilav', portion: '1 porsiyon', calories: 480 },
          ],
          totalCalories: 480,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Kuruyemiş + meyve', portion: '1 porsiyon', calories: 250 },
          ],
          totalCalories: 250,
        },
      ],
      totalCalories: 1680,
    },
    {
      day: 13,
      title: 'Balık Günü 🐟',
      meals: [
        {
          type: 'breakfast',
          name: 'Akdeniz Kahvaltısı',
          foods: [
            { name: 'Yumurta + peynir + zeytin', portion: '1 porsiyon', calories: 450 },
          ],
          totalCalories: 450,
        },
        {
          type: 'lunch',
          name: 'Ton Balıklı Sandviç',
          foods: [
            { name: 'Ton balığı + tam tahıl ekmek', portion: '1 porsiyon', calories: 400 },
          ],
          totalCalories: 400,
        },
        {
          type: 'dinner',
          name: 'Izgara Çipura',
          foods: [
            { name: 'Çipura + sebze + patates', portion: '1 porsiyon', calories: 500 },
          ],
          totalCalories: 500,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Yoğurt + badem', portion: '1 porsiyon', calories: 200 },
          ],
          totalCalories: 200,
        },
      ],
      totalCalories: 1550,
    },
    {
      day: 14,
      title: '🎉 2 Hafta Tamamlandı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Brunch Tabağı',
          foods: [
            { name: 'Serpme kahvaltı', portion: '1 porsiyon', calories: 600 },
          ],
          totalCalories: 600,
        },
        {
          type: 'lunch',
          name: 'Hafif Öğle',
          foods: [
            { name: 'Çorba + salata', portion: '1 porsiyon', calories: 350 },
          ],
          totalCalories: 350,
        },
        {
          type: 'dinner',
          name: 'Ödül Yemeği',
          foods: [
            { name: 'Seçtiğiniz sağlıklı yemek', portion: '1 porsiyon', calories: 550 },
          ],
          totalCalories: 550,
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          foods: [
            { name: 'Tatlı (küçük porsiyon)', portion: '1 porsiyon', calories: 200 },
          ],
          totalCalories: 200,
        },
      ],
      totalCalories: 1700,
      note: '🎉 2 hafta bitti! Tartılın ve ilerlemeni not edin.',
    },
    // GÜN 15-30 (Özet format - Aynı rotasyon devam eder)
    {
      day: 15,
      title: 'Bitkisel Gün 🌱',
      meals: [
        { type: 'breakfast', name: 'Vegan Kahvaltı', foods: [{ name: 'Yulaf + meyve + kuruyemiş', portion: '1 porsiyon', calories: 450 }], totalCalories: 450 },
        { type: 'lunch', name: 'Baklagil Çorbası', foods: [{ name: 'Mercimek çorbası + ekmek', portion: '1 porsiyon', calories: 400 }], totalCalories: 400 },
        { type: 'dinner', name: 'Sebze Yemeği', foods: [{ name: 'Nohut + bulgur', portion: '1 porsiyon', calories: 500 }], totalCalories: 500 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Meyve + badem', portion: '1 porsiyon', calories: 200 }], totalCalories: 200 },
      ],
      totalCalories: 1550,
    },
    {
      day: 16,
      title: 'Balık Günü 🐟',
      meals: [
        { type: 'breakfast', name: 'Yumurtalı Kahvaltı', foods: [{ name: 'Yumurta + ekmek + avokado', portion: '1 porsiyon', calories: 480 }], totalCalories: 480 },
        { type: 'lunch', name: 'Balık Salatası', foods: [{ name: 'Somon + yeşillik', portion: '1 porsiyon', calories: 450 }], totalCalories: 450 },
        { type: 'dinner', name: 'Fırın Balık', foods: [{ name: 'Levrek + sebze', portion: '1 porsiyon', calories: 450 }], totalCalories: 450 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Yoğurt + meyve', portion: '1 porsiyon', calories: 180 }], totalCalories: 180 },
      ],
      totalCalories: 1560,
    },
    {
      day: 17,
      title: 'Bitkisel Gün 🌿',
      meals: [
        { type: 'breakfast', name: 'Smoothie Bowl', foods: [{ name: 'Açai + granola', portion: '1 porsiyon', calories: 420 }], totalCalories: 420 },
        { type: 'lunch', name: 'Falafel Tabağı', foods: [{ name: 'Falafel + humus', portion: '1 porsiyon', calories: 550 }], totalCalories: 550 },
        { type: 'dinner', name: 'Sebze Curry', foods: [{ name: 'Curry + pirinç', portion: '1 porsiyon', calories: 480 }], totalCalories: 480 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Kuruyemiş', portion: '1 porsiyon', calories: 200 }], totalCalories: 200 },
      ],
      totalCalories: 1650,
    },
    {
      day: 18,
      title: 'Tavuk Günü 🍗',
      meals: [
        { type: 'breakfast', name: 'Protein Kahvaltı', foods: [{ name: 'Omlet + ekmek', portion: '1 porsiyon', calories: 400 }], totalCalories: 400 },
        { type: 'lunch', name: 'Tavuklu Salata', foods: [{ name: 'Tavuk göğsü + kinoa', portion: '1 porsiyon', calories: 450 }], totalCalories: 450 },
        { type: 'dinner', name: 'Tavuk Sote', foods: [{ name: 'Tavuk + sebze + pilav', portion: '1 porsiyon', calories: 550 }], totalCalories: 550 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Meyve + yoğurt', portion: '1 porsiyon', calories: 180 }], totalCalories: 180 },
      ],
      totalCalories: 1580,
    },
    {
      day: 19,
      title: 'Bitkisel Gün 🌱',
      meals: [
        { type: 'breakfast', name: 'Avokado Toast', foods: [{ name: 'Avokado + ekmek', portion: '1 porsiyon', calories: 450 }], totalCalories: 450 },
        { type: 'lunch', name: 'Mercimek Köfte', foods: [{ name: 'Mercimek köfte + salata', portion: '1 porsiyon', calories: 400 }], totalCalories: 400 },
        { type: 'dinner', name: 'Fasulye Yemeği', foods: [{ name: 'Barbunya + pilav', portion: '1 porsiyon', calories: 500 }], totalCalories: 500 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Humus + sebze', portion: '1 porsiyon', calories: 200 }], totalCalories: 200 },
      ],
      totalCalories: 1550,
    },
    {
      day: 20,
      title: 'Balık Günü 🐟',
      meals: [
        { type: 'breakfast', name: 'Somon Kahvaltı', foods: [{ name: 'Somon füme + krema peynir + ekmek', portion: '1 porsiyon', calories: 480 }], totalCalories: 480 },
        { type: 'lunch', name: 'Karides Bowl', foods: [{ name: 'Karides + kinoa + avokado', portion: '1 porsiyon', calories: 500 }], totalCalories: 500 },
        { type: 'dinner', name: 'Deniz Mahsulleri', foods: [{ name: 'Karışık deniz ürünleri + pilav', portion: '1 porsiyon', calories: 480 }], totalCalories: 480 },
        { type: 'snack', name: 'Ara Öğün', foods: [{ name: 'Meyve', portion: '1 porsiyon', calories: 120 }], totalCalories: 120 },
      ],
      totalCalories: 1580,
    },
    {
      day: 21,
      title: '🎉 3 Hafta Tamamlandı!',
      meals: [
        { type: 'breakfast', name: 'Özel Brunch', foods: [{ name: 'Seçiminize göre', portion: '1 porsiyon', calories: 600 }], totalCalories: 600 },
        { type: 'lunch', name: 'Hafif Öğle', foods: [{ name: 'Çorba + salata', portion: '1 porsiyon', calories: 350 }], totalCalories: 350 },
        { type: 'dinner', name: 'Kutlama Yemeği', foods: [{ name: 'Sağlıklı seçim', portion: '1 porsiyon', calories: 550 }], totalCalories: 550 },
        { type: 'snack', name: 'Tatlı', foods: [{ name: 'Küçük porsiyon tatlı', portion: '1 porsiyon', calories: 200 }], totalCalories: 200 },
      ],
      totalCalories: 1700,
      note: '🎉 3 hafta tamamlandı! Harika gidiyorsunuz!',
    },
    // GÜN 22-30 (Son hafta)
    { day: 22, title: 'Bitkisel 🌱', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Vegan kahvaltı', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Baklagil yemeği', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Sebze yemeği', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Atıştırmalık', portion: '1', calories: 200 }], totalCalories: 200 }], totalCalories: 1600 },
    { day: 23, title: 'Balık 🐟', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Yumurtalı kahvaltı', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Balık salatası', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Izgara balık', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Yoğurt', portion: '1', calories: 150 }], totalCalories: 150 }], totalCalories: 1550 },
    { day: 24, title: 'Bitkisel 🌿', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Smoothie bowl', portion: '1', calories: 400 }], totalCalories: 400 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Buddha bowl', portion: '1', calories: 550 }], totalCalories: 550 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Mercimek yemeği', portion: '1', calories: 480 }], totalCalories: 480 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Kuruyemiş', portion: '1', calories: 200 }], totalCalories: 200 }], totalCalories: 1630 },
    { day: 25, title: 'Tavuk 🍗', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Protein kahvaltı', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Tavuklu wrap', portion: '1', calories: 400 }], totalCalories: 400 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Tavuk ızgara', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Meyve', portion: '1', calories: 150 }], totalCalories: 150 }], totalCalories: 1500 },
    { day: 26, title: 'Bitkisel 🌱', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Yulaf ezmesi', portion: '1', calories: 400 }], totalCalories: 400 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Falafel', portion: '1', calories: 550 }], totalCalories: 550 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Nohut yemeği', portion: '1', calories: 480 }], totalCalories: 480 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Humus', portion: '1', calories: 180 }], totalCalories: 180 }], totalCalories: 1610 },
    { day: 27, title: 'Balık 🐟', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Akdeniz kahvaltı', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Somon salata', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Fırın balık', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Yoğurt', portion: '1', calories: 150 }], totalCalories: 150 }], totalCalories: 1550 },
    { day: 28, title: 'Hafta Sonu 🎉', meals: [{ type: 'breakfast', name: 'Brunch', foods: [{ name: 'Serpme kahvaltı', portion: '1', calories: 600 }], totalCalories: 600 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Hafif öğle', portion: '1', calories: 350 }], totalCalories: 350 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Sağlıklı seçim', portion: '1', calories: 550 }], totalCalories: 550 }, { type: 'snack', name: 'Tatlı', foods: [{ name: 'Küçük tatlı', portion: '1', calories: 200 }], totalCalories: 200 }], totalCalories: 1700 },
    { day: 29, title: 'Bitkisel 🌿', meals: [{ type: 'breakfast', name: 'Kahvaltı', foods: [{ name: 'Vegan kahvaltı', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'lunch', name: 'Öğle', foods: [{ name: 'Baklagil', portion: '1', calories: 500 }], totalCalories: 500 }, { type: 'dinner', name: 'Akşam', foods: [{ name: 'Sebze', portion: '1', calories: 450 }], totalCalories: 450 }, { type: 'snack', name: 'Ara', foods: [{ name: 'Meyve', portion: '1', calories: 150 }], totalCalories: 150 }], totalCalories: 1550 },
    {
      day: 30,
      title: '🎉 30 GÜN TAMAMLANDI!',
      meals: [
        { type: 'breakfast', name: 'Kutlama Brunch', foods: [{ name: 'Favori kahvaltınız', portion: '1 porsiyon', calories: 650 }], totalCalories: 650 },
        { type: 'lunch', name: 'Şef Salatası', foods: [{ name: 'Premium salata', portion: '1 porsiyon', calories: 400 }], totalCalories: 400 },
        { type: 'dinner', name: 'Özel Akşam Yemeği', foods: [{ name: 'Kutlama menüsü', portion: '1 porsiyon', calories: 650 }], totalCalories: 650 },
        { type: 'snack', name: 'Tatlı', foods: [{ name: 'Başarı tatlısı', portion: '1 porsiyon', calories: 250 }], totalCalories: 250 },
      ],
      totalCalories: 1950,
      note: '🎉 TEBRİKLER! 30 gün tamamlandı! Tartılın, ölçülerinizi alın ve başarınızı kutlayın!',
    },
  ],
};
