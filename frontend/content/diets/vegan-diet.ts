import { Diet } from './types';

export const veganDiet: Diet = {
  id: 'vegan',
  name: {
    tr: 'Vegan Diyet',
    en: 'Vegan Diet',
  },
  emoji: '🌱',
  isPremium: true,
  duration: 30,
  difficulty: 'medium',

  description: {
    tr: 'Vegan diyet, tüm hayvansal ürünleri (et, balık, süt, yumurta, bal) hariç tutan, tamamen bitkisel kaynaklara dayanan bir beslenme şeklidir. Sağlık, çevre ve etik kaygılarla tercih edilen bu diyet, doğru planlandığında tüm besin ihtiyaçlarını karşılayabilir ve kardiyovasküler sağlık başta olmak üzere birçok fayda sağlar.',
    en: 'The vegan diet is a plant-based eating pattern that excludes all animal products (meat, fish, dairy, eggs, honey). Chosen for health, environmental, and ethical reasons, this diet can meet all nutritional needs when properly planned and provides many benefits, especially for cardiovascular health.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Stanford İkiz Çalışması (2023):
• 22 özdeş ikiz üzerinde 8 haftalık randomize kontrollü çalışma
• Vegan grup sonuçları:
  - LDL kolesterol: 110.7 mg/dL → 95.5 mg/dL (~%14 düşüş)
  - Açlık insülini: ~%20 düşüş
  - Vücut ağırlığı: 4.2 pound (1.9 kg) daha fazla kayıp

💓 UC Irvine Meta-Analizi (2024):
• 21 sistematik derlemenin kapsamlı analizi
• Kardiyovasküler hastalık insidansında %15 azalma
• KVH mortalitesinde %8 azalma
• Kan basıncı, BMI ve inflamasyon markerlarında iyileşme

🔬 PLOS ONE Analizi (2024):
• 20 yıllık verileri kapsayan 49 makale analizi
• Tüm nedenlere bağlı mortalitede azalma
• Kanser mortalitesinde azalma
• İskemik kalp hastalığı, gastrointestinal ve prostat kanseri riskinde düşüş

📈 Mekanizmalar:
• Doymuş yağ alımının azalması
• Lif alımının artması (ortalama 2-3 kat)
• Antioksidan ve fitokimyasal alımının artması
• Kronik inflamasyonun azalması
• Bağırsak mikrobiyomu çeşitliliğinin artması

⚠️ Dikkat Edilmesi Gerekenler:
• B12 vitamini takviyesi ŞART
• Demir, çinko, omega-3 ve D vitamini takibi
• Protein çeşitliliğine dikkat (tam aminoasit profili için)`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 Stanford Twin Study (2023):
• 8-week randomized controlled study on 22 identical twins
• Vegan group results:
  - LDL cholesterol: 110.7 mg/dL → 95.5 mg/dL (~14% decrease)
  - Fasting insulin: ~20% decrease
  - Body weight: 4.2 pounds (1.9 kg) more loss

💓 UC Irvine Meta-Analysis (2024):
• Comprehensive analysis of 21 systematic reviews
• 15% reduction in cardiovascular disease incidence
• 8% reduction in CVD mortality
• Improvement in blood pressure, BMI and inflammation markers

🔬 PLOS ONE Analysis (2024):
• Analysis of 49 articles covering 20 years of data
• Reduction in all-cause mortality
• Reduction in cancer mortality
• Reduced risk of ischemic heart disease, gastrointestinal and prostate cancer

📈 Mechanisms:
• Reduced saturated fat intake
• Increased fiber intake (average 2-3 times)
• Increased antioxidant and phytochemical intake
• Reduced chronic inflammation
• Increased gut microbiome diversity

⚠️ Important Considerations:
• B12 vitamin supplementation is ESSENTIAL
• Monitor iron, zinc, omega-3 and vitamin D
• Pay attention to protein variety (for complete amino acid profile)`,
  },

  benefits: {
    tr: [
      '❤️ Kardiyovasküler hastalık riskinde %15 azalma',
      '📉 LDL kolesterol ve trigliseritlerde belirgin düşüş',
      '⚖️ Sürdürülebilir kilo kontrolü ve yağ kaybı',
      '🩺 Tip 2 diyabet riskinde azalma ve yönetimde iyileşme',
      '🌍 Çevresel sürdürülebilirlik - düşük karbon ayak izi',
      '🦠 Bağırsak sağlığı ve mikrobiyom çeşitliliği',
      '🔬 Kanser riskinde azalma (özellikle kolorektal)',
      '💪 Antioksidan ve fitokimyasal zenginliği',
      '🍃 Düşük inflamasyon - kronik hastalık riski azalır',
      '🐾 Etik tatmin - hayvan refahına katkı',
    ],
    en: [
      '❤️ 15% reduction in cardiovascular disease risk',
      '📉 Significant decrease in LDL cholesterol and triglycerides',
      '⚖️ Sustainable weight control and fat loss',
      '🩺 Reduced Type 2 diabetes risk and improved management',
      '🌍 Environmental sustainability - low carbon footprint',
      '🦠 Gut health and microbiome diversity',
      '🔬 Reduced cancer risk (especially colorectal)',
      '💪 Rich in antioxidants and phytochemicals',
      '🍃 Low inflammation - reduced chronic disease risk',
      '🐾 Ethical satisfaction - contribution to animal welfare',
    ],
  },

  warnings: {
    tr: [
      '💊 B12 vitamini takviyesi ZORUNLUDUR - eksikliği sinir hasarına yol açabilir',
      '🩸 Demir eksikliği riski - bitkisel demir emilimi düşük, C vitamini ile artırın',
      '🦴 Kalsiyum ve D vitamini takibi yapın',
      '🧠 Omega-3 (DHA/EPA) için yosun bazlı takviye düşünün',
      '💪 Protein çeşitliliğine dikkat - baklagil + tahıl kombinasyonları',
      '🚫 Hamileler ve çocuklar için mutlaka diyetisyen kontrolü',
      '⚠️ Ani geçiş yapmayın - kademeli olarak başlayın',
      '📊 Düzenli kan testi ile besin durumunuzu takip edin',
    ],
    en: [
      '💊 B12 vitamin supplementation is MANDATORY - deficiency can cause nerve damage',
      '🩸 Iron deficiency risk - plant iron absorption is low, increase with vitamin C',
      '🦴 Monitor calcium and vitamin D',
      '🧠 Consider algae-based supplement for omega-3 (DHA/EPA)',
      '💪 Pay attention to protein variety - legume + grain combinations',
      '🚫 Pregnant women and children must have dietitian supervision',
      '⚠️ Don\'t make sudden transitions - start gradually',
      '📊 Monitor your nutrient status with regular blood tests',
    ],
  },

  allowedFoods: {
    tr: [
      '🫘 PROTEİN KAYNAKLARI:',
      '🫘 Baklagiller (mercimek, nohut, fasulye, börülce)',
      '🫛 Soya ürünleri (tofu, tempeh, soya sütü)',
      '🥜 Kuruyemişler (badem, ceviz, fındık, fıstık)',
      '🌰 Tohumlar (chia, keten, kenevir, ayçekirdeği)',
      '🌾 Seitan (buğday gluteni)',
      '',
      '🌾 TAM TAHILLAR:',
      '🌾 Kinoa, bulgur, yulaf, esmer pirinç',
      '🍞 Tam buğday ürünleri',
      '🌽 Mısır, darı, karabuğday',
      '',
      '🥬 SEBZELER (sınırsız):',
      '🥬 Tüm yeşil yapraklılar',
      '🥦 Brokoli, karnabahar, lahana',
      '🥕 Kök sebzeler',
      '🍅 Domates, biber, patlıcan',
      '',
      '🍎 MEYVELER:',
      '🍎 Tüm taze meyveler',
      '🫐 Çilek, böğürtlen, yaban mersini',
      '🍌 Muz, elma, portakal',
      '',
      '🥛 BİTKİSEL SÜT ÜRÜNLERİ:',
      '🥛 Badem, yulaf, soya, hindistan cevizi sütü',
      '🧀 Vegan peynirler',
      '🍦 Vegan yoğurt',
    ],
    en: [
      '🫘 PROTEIN SOURCES:',
      '🫘 Legumes (lentils, chickpeas, beans, black-eyed peas)',
      '🫛 Soy products (tofu, tempeh, soy milk)',
      '🥜 Nuts (almonds, walnuts, hazelnuts, peanuts)',
      '🌰 Seeds (chia, flax, hemp, sunflower)',
      '🌾 Seitan (wheat gluten)',
      '',
      '🌾 WHOLE GRAINS:',
      '🌾 Quinoa, bulgur, oats, brown rice',
      '🍞 Whole wheat products',
      '🌽 Corn, millet, buckwheat',
      '',
      '🥬 VEGETABLES (unlimited):',
      '🥬 All leafy greens',
      '🥦 Broccoli, cauliflower, cabbage',
      '🥕 Root vegetables',
      '🍅 Tomatoes, peppers, eggplant',
      '',
      '🍎 FRUITS:',
      '🍎 All fresh fruits',
      '🫐 Strawberries, blackberries, blueberries',
      '🍌 Bananas, apples, oranges',
      '',
      '🥛 PLANT-BASED DAIRY:',
      '🥛 Almond, oat, soy, coconut milk',
      '🧀 Vegan cheeses',
      '🍦 Vegan yogurt',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🥩 TÜM HAYVANSAL ÜRÜNLER:',
      '🥩 Kırmızı et (dana, kuzu, domuz)',
      '🍗 Kümes hayvanları (tavuk, hindi)',
      '🐟 Balık ve deniz ürünleri',
      '🥚 Yumurta (her türlü)',
      '🥛 Süt ve süt ürünleri',
      '🧀 Peynir, yoğurt, tereyağı',
      '🍯 Bal',
      '🦪 Deniz kabukluları',
      '',
      '⚠️ GİZLİ HAYVANSAL İÇERİKLER:',
      '🍮 Jelatin (şekerleme, jöle)',
      '🧈 Peynir altı suyu (bazı ürünlerde)',
      '🔴 Karmin (böcek bazlı kırmızı boya)',
      '🥚 Albümin (bazı ürünlerde)',
    ],
    en: [
      '🥩 ALL ANIMAL PRODUCTS:',
      '🥩 Red meat (beef, lamb)',
      '🍗 Poultry (chicken, turkey)',
      '🐟 Fish and seafood',
      '🥚 Eggs (all types)',
      '🥛 Milk and dairy products',
      '🧀 Cheese, yogurt, butter',
      '🍯 Honey',
      '🦪 Shellfish',
      '',
      '⚠️ HIDDEN ANIMAL INGREDIENTS:',
      '🍮 Gelatin (in candies, jelly)',
      '🧈 Whey (in some products)',
      '🔴 Carmine (insect-based red dye)',
      '🥚 Albumin (in some products)',
    ],
  },

  exercises: [
    {
      name: 'Kardiyo / Cardio',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 4-5 kez / 4-5 times a week',
      note: 'Koşu, bisiklet, yüzme. Vegan diyetle enerji seviyeleri yüksek olur.',
    },
    {
      name: 'Güç Antrenmanı / Strength Training',
      duration: '40-50 dakika / minutes',
      frequency: 'Haftada 3 kez / 3 times a week',
      note: 'Kas geliştirmek mümkün! Yeterli protein aldığınızdan emin olun.',
    },
    {
      name: 'Yoga',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Vegan felsefesiyle uyumlu, zihinsel ve fiziksel denge.',
    },
    {
      name: 'Yürüyüş / Walking',
      duration: '30 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Doğada yürüyüş, çevreyle bağlantı.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Vegan Yolculuğunuz Başlıyor 🌱',
      totalCalories: 1800,
      note: 'İlk gün! Renkli ve lezzetli bitkisel yiyeceklerle tanışın. B12 takviyenizi almayı unutmayın.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf ezmesi', portion: '60g (kuru)', calories: 230, note: 'Badem sütü ile' },
            { name: 'Muz', portion: '1 orta', calories: 100 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Tarçın', portion: 'serpme', calories: 0 },
            { name: 'Badem sütü', portion: '200ml', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 620,
          foods: [
            { name: 'Nohutlu Buddha bowl', portion: '400g', calories: 480, note: 'Kinoa, nohut, avokado, sebzeler' },
            { name: 'Tahin sos', portion: '2 yemek kaşığı', calories: 100 },
            { name: 'Limonlu su', portion: '300ml', calories: 5 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 200 },
            { name: 'Sebzeli tofu sote', portion: '200g', calories: 250, note: 'Soya sosu ile' },
            { name: 'Esmer pirinç', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '100g', calories: 30 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 180,
          foods: [
            { name: 'Humus', portion: '60g', calories: 130 },
            { name: 'Havuç ve kereviz', portion: '100g', calories: 40 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Protein Kaynakları',
      totalCalories: 1850,
      note: 'Bugün bitkisel protein kaynaklarına odaklanıyoruz. Baklagil + tahıl = tam protein!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Tofu scramble', portion: '200g', calories: 250, note: 'Zerdeçal, soğan, biber ile' },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 140 },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Domates', portion: '1 küçük', calories: 15 },
            { name: 'Kahve', portion: '1 fincan', calories: 5, note: 'Yulaf sütü ile' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'Falafel wrap', portion: '2 adet', calories: 450, note: 'Tam buğday lavaş' },
            { name: 'Humus', portion: '50g', calories: 100 },
            { name: 'Turşu', portion: '50g', calories: 15 },
            { name: 'Taze nane limon', portion: '300ml', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Tempeh stir-fry', portion: '200g', calories: 320, note: 'Sebzeli, teriyaki sos' },
            { name: 'Yasemin pirinci', portion: '120g', calories: 170 },
            { name: 'Miso çorbası', portion: '200ml', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Edamame', portion: '100g', calories: 120 },
            { name: 'Badem', portion: '15g', calories: 90 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Lezzetli Baklagiller',
      totalCalories: 1780,
      note: 'Baklagiller protein, lif ve minerallerin kralıdır!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Smoothie bowl', portion: '350ml', calories: 350, note: 'Muz, yaban mersini, ıspanak, protein tozu' },
            { name: 'Granola (vegan)', portion: '30g', calories: 120 },
            { name: 'Çilek', portion: '50g', calories: 20 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Kuru fasulye pilakı', portion: '250g', calories: 300 },
            { name: 'Bulgur pilavı', portion: '150g', calories: 180 },
            { name: 'Cacık (vegan yoğurt)', portion: '100g', calories: 60 },
            { name: 'Turşu', portion: '50g', calories: 15 },
            { name: 'Yeşil biber', portion: '1 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Mercimek köftesi', portion: '6 adet', calories: 280 },
            { name: 'Roka salatası', portion: '100g', calories: 50 },
            { name: 'Nar ekşili sos', portion: '1 yemek kaşığı', calories: 30 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 70 },
            { name: 'Havuç-portakal suyu', portion: '200ml', calories: 80 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Fıstık ezmesi', portion: '2 yemek kaşığı', calories: 180 },
            { name: 'Elma dilimleri', portion: '1/2 elma', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Sebze Cenneti',
      totalCalories: 1700,
      note: 'Gökkuşağı renklerinde sebzelerle antioksidan bombardımanı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Avokado tost', portion: '2 dilim', calories: 320, note: 'Tam buğday ekmek, kiraz domates' },
            { name: 'Yeşil smoothie', portion: '250ml', calories: 80, note: 'Ispanak, muz, badem sütü' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Zeytinyağlı taze fasulye', portion: '250g', calories: 200 },
            { name: 'Pirinç pilavı', portion: '120g', calories: 170 },
            { name: 'Çoban salatası', portion: '150g', calories: 80, note: 'Vegan versiyonu' },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 70 },
            { name: 'Limonata', portion: '200ml', calories: 40 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Sebze güveç', portion: '300g', calories: 220, note: 'Patlıcan, kabak, biber, domates' },
            { name: 'Nohut', portion: '100g', calories: 180 },
            { name: 'Vegan yoğurt', portion: '100g', calories: 80 },
            { name: 'Karpuz', portion: '150g', calories: 50 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Karışık kuruyemiş', portion: '30g', calories: 180 },
            { name: 'Kuru kayısı', portion: '2 adet', calories: 35 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Uluslararası Lezzetler',
      totalCalories: 1820,
      note: 'Dünya mutfaklarından vegan tarifler!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Pancake (vegan)', portion: '3 adet', calories: 280, note: 'Muz ve yulaf unu ile' },
            { name: 'Akçaağaç şurubu', portion: '1 yemek kaşığı', calories: 50 },
            { name: 'Yaban mersini', portion: '50g', calories: 30 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
            { name: 'Badem sütü', portion: '100ml', calories: 15 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (Hint Mutfağı)',
          totalCalories: 620,
          foods: [
            { name: 'Dal (mercimek curry)', portion: '200g', calories: 250 },
            { name: 'Basmati pirinci', portion: '150g', calories: 200 },
            { name: 'Samosa (fırında)', portion: '2 adet', calories: 180 },
            { name: 'Mango lassi (vegan)', portion: '200ml', calories: 100 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (Meksika Mutfağı)',
          totalCalories: 550,
          foods: [
            { name: 'Burrito bowl', portion: '400g', calories: 450, note: 'Fasulye, pirinç, guacamole, salsa' },
            { name: 'Tortilla chips', portion: '30g', calories: 140 },
            { name: 'Limonlu su', portion: '300ml', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Energy balls', portion: '3 adet', calories: 180, note: 'Hurma, fındık, kakao' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Tam Tahıl Gücü',
      totalCalories: 1750,
      note: 'Tam tahıllarla enerji ve lif desteği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Kinoa lapası', portion: '200g', calories: 250, note: 'Tarçın, elma, ceviz ile' },
            { name: 'Badem sütü', portion: '150ml', calories: 25 },
            { name: 'Bal kabağı tohumu', portion: '15g', calories: 85 },
            { name: 'Kuru üzüm', portion: '15g', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Tabbule salatası', portion: '250g', calories: 280, note: 'Bulgur, maydanoz, domates' },
            { name: 'Falafel', portion: '4 adet', calories: 200 },
            { name: 'Humus', portion: '60g', calories: 130 },
            { name: 'Tam buğday pide', portion: '1/4 adet', calories: 100 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Sebzeli makarna', portion: '250g', calories: 350, note: 'Tam buğday makarna, domates sosu' },
            { name: 'Vegan parmesan', portion: '20g', calories: 60 },
            { name: 'Roka salatası', portion: '80g', calories: 20 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Vegan yoğurt', portion: '150g', calories: 120 },
            { name: 'Granola', portion: '30g', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - Kutlama Günü! 🎉',
      totalCalories: 1900,
      note: 'İlk haftayı tamamladınız! Vegan yaşam tarzına harika bir başlangıç.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Brunch)',
          totalCalories: 550,
          foods: [
            { name: 'Vegan waffle', portion: '2 adet', calories: 320 },
            { name: 'Taze meyve tabağı', portion: '150g', calories: 80 },
            { name: 'Hindistan cevizi kreması', portion: '30g', calories: 100 },
            { name: 'Akçaağaç şurubu', portion: '1 yemek kaşığı', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'BBQ jackfruit burger', portion: '1 adet', calories: 400, note: 'Tam buğday çörek' },
            { name: 'Tatlı patates kızartması (fırında)', portion: '150g', calories: 180 },
            { name: 'Coleslaw (vegan)', portion: '100g', calories: 100 },
            { name: 'Limonata', portion: '250ml', calories: 50 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Thai yeşil körili tofu', portion: '250g', calories: 350 },
            { name: 'Yasemin pirinci', portion: '100g', calories: 140 },
            { name: 'Taze kişniş', portion: 'serpme', calories: 5 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'snack',
          name: 'Tatlı (Ödül)',
          totalCalories: 200,
          foods: [
            { name: 'Vegan çikolatalı brownie', portion: '1 dilim', calories: 180, note: 'Siyah fasulye bazlı' },
            { name: 'Badem sütü', portion: '100ml', calories: 15 },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 BEKLENEN SONUÇLAR (30 Günde)

⚖️ Kilo Değişimi:
• Genellikle 2-4 kg kayıp
• Ödem azalması ile hafiflik hissi
• Sindirim düzenlenmesi

💓 Kardiyovasküler:
• LDL kolesterol: %10-15 düşüş beklenir
• Trigliserit: Düşüş
• Kan basıncı: Hafif iyileşme

🔬 Kan Değerleri:
• Açlık kan şekeri: Stabilizasyon
• İnsülin duyarlılığı: Artış
• İnflamasyon markerları: Azalma

⚡ Enerji ve Sindirim:
• İlk hafta: Adaptasyon, olası şişkinlik
• 2. hafta: Enerji artışı başlar
• 3-4. hafta: Stabil enerji, düzenli sindirim

🌿 Fiziksel Değişimler:
• Cilt kalitesinde iyileşme
• Daha iyi uyku
• Sindirim düzenliliği
• Genel iyi oluş hali

⚠️ TAKVİYE HATIRLATMASI:
• B12 vitamini: GÜNLÜK ŞART
• D vitamini: Özellikle kış aylarında
• Omega-3: Yosun bazlı takviye düşünün

🔄 Uzun Vadeli:
• 30 gün sonunda alışkanlık oluşur
• Yaşam boyu sürdürülebilir
• Zamanla daha da belirgin sağlık faydaları`,

    en: `📊 EXPECTED RESULTS (In 30 Days)

⚖️ Weight Change:
• Usually 2-4 kg loss
• Lightness feeling with reduced bloating
• Digestion regulation

💓 Cardiovascular:
• LDL cholesterol: 10-15% decrease expected
• Triglycerides: Decrease
• Blood pressure: Slight improvement

🔬 Blood Values:
• Fasting blood sugar: Stabilization
• Insulin sensitivity: Increase
• Inflammation markers: Decrease

⚡ Energy and Digestion:
• First week: Adaptation, possible bloating
• Week 2: Energy increase begins
• Weeks 3-4: Stable energy, regular digestion

🌿 Physical Changes:
• Improved skin quality
• Better sleep
• Digestive regularity
• General sense of well-being

⚠️ SUPPLEMENT REMINDER:
• B12 vitamin: DAILY ESSENTIAL
• Vitamin D: Especially in winter months
• Omega-3: Consider algae-based supplement

🔄 Long Term:
• Habit forms after 30 days
• Sustainable for life
• Even more pronounced health benefits over time`,
  },
};
