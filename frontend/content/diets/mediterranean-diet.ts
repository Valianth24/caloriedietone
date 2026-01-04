import { Diet } from './types';

export const mediterraneanDiet: Diet = {
  id: 'mediterranean',
  name: {
    tr: 'Akdeniz Diyeti',
    en: 'Mediterranean Diet',
  },
  emoji: '🫒',
  isPremium: true,
  duration: 30,
  difficulty: 'easy',

  description: {
    tr: 'Akdeniz diyeti, İtalya, Yunanistan, İspanya ve Türkiye gibi Akdeniz ülkelerinin geleneksel beslenme alışkanlıklarından ilham alan, dünyada en çok araştırılan ve kanıtlanmış sağlıklı beslenme yaklaşımıdır. Zeytinyağı, balık, sebze-meyve, tam tahıllar ve baklagiller temelinde oluşan bu diyet, sadece kilo kontrolü değil, genel sağlık ve uzun ömür için de altın standarttır.',
    en: 'The Mediterranean diet is the most researched and proven healthy eating approach in the world, inspired by the traditional eating habits of Mediterranean countries like Italy, Greece, Spain, and Turkey. Based on olive oil, fish, vegetables-fruits, whole grains, and legumes, this diet is the gold standard not only for weight control but also for overall health and longevity.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 PREDIMED Çalışması (En Büyük Akdeniz Diyeti Araştırması):
• 7.447 katılımcı, 5 yıl takip
• Kardiyovasküler hastalık riskinde %30 azalma
• İnme riskinde %39 düşüş
• Kalp krizi riskinde belirgin azalma

🧠 Beyin Sağlığı ve Bilişsel Fonksiyon:
• Demans riskini azaltır
• Bilişsel gerilemeyi yavaşlatır
• BDNF (Beyin Kaynaklı Nörotrofik Faktör) artışı sağlar
• Anti-inflamatuar ve antioksidan özellikleri sayesinde nöroprotektif etki

💓 Kalp-Damar Sağlığı:
• LDL (kötü) kolesterol düşüşü
• Kan basıncı regülasyonu
• Damar esnekliğinde iyileşme
• Ateroskleroz gelişiminin yavaşlaması

🩺 Diyabet Önleme:
• Tip 2 diyabet riskinde %30-52 azalma
• HbA1c seviyelerinde iyileşme
• İnsülin duyarlılığında artış

📈 New England Journal of Medicine Bulguları:
• 9 besin grubundan en az 7'sini tüketen kişilerde
• Tüm nedenlerden ölüm riskinde %25 azalma

🔄 Epigenetik Mekanizma (2024 Araştırması):
• Polifenoller ve omega-3 yağ asitleri gen ekspresyonunu değiştirir
• DNA metilasyonu ve histon modifikasyonları yoluyla anti-aging etki
• İltihaplanma genlerinin baskılanması`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 PREDIMED Study (Largest Mediterranean Diet Research):
• 7,447 participants, 5-year follow-up
• 30% reduction in cardiovascular disease risk
• 39% decrease in stroke risk
• Significant reduction in heart attack risk

🧠 Brain Health and Cognitive Function:
• Reduces dementia risk
• Slows cognitive decline
• Increases BDNF (Brain-Derived Neurotrophic Factor)
• Neuroprotective effect through anti-inflammatory and antioxidant properties

💓 Cardiovascular Health:
• LDL (bad) cholesterol decrease
• Blood pressure regulation
• Improvement in vascular flexibility
• Slowing of atherosclerosis development

🩺 Diabetes Prevention:
• 30-52% reduction in Type 2 diabetes risk
• Improvement in HbA1c levels
• Increase in insulin sensitivity

📈 New England Journal of Medicine Findings:
• In people consuming at least 7 of 9 food groups
• 25% reduction in all-cause mortality risk

🔄 Epigenetic Mechanism (2024 Research):
• Polyphenols and omega-3 fatty acids modify gene expression
• Anti-aging effect through DNA methylation and histone modifications
• Suppression of inflammation genes`,
  },

  benefits: {
    tr: [
      '❤️ Kalp hastalığı riskini %30 azaltır - PREDIMED çalışmasıyla kanıtlanmıştır',
      '🧠 Beyin sağlığını korur, demans riskini düşürür',
      '📉 Kötü kolesterol (LDL) ve trigliserit seviyelerini düşürür',
      '🩺 Tip 2 diyabet riskini %30-52 oranında azaltır',
      '🦴 Kemik sağlığını destekler - kalsiyum ve D vitamini kaynaklarıyla',
      '😊 Ruh halini iyileştirir - omega-3 ve polifenoller sayesinde',
      '🌙 Uyku kalitesini artırır',
      '⚖️ Sürdürülebilir kilo kontrolü sağlar - aşırı kısıtlama yok',
      '🔬 Anti-aging etkileri - hücresel yaşlanmayı yavaşlatır',
      '🍽️ Uygulaması kolay ve lezzetli - yaşam boyu sürdürülebilir',
    ],
    en: [
      '❤️ Reduces heart disease risk by 30% - proven by PREDIMED study',
      '🧠 Protects brain health, reduces dementia risk',
      '📉 Lowers bad cholesterol (LDL) and triglyceride levels',
      '🩺 Reduces Type 2 diabetes risk by 30-52%',
      '🦴 Supports bone health - with calcium and vitamin D sources',
      '😊 Improves mood - thanks to omega-3 and polyphenols',
      '🌙 Increases sleep quality',
      '⚖️ Provides sustainable weight control - no extreme restrictions',
      '🔬 Anti-aging effects - slows cellular aging',
      '🍽️ Easy to apply and delicious - sustainable for life',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Şarap tüketimi opsiyoneldir - alkol kullanmıyorsanız başlamayın',
      '🥜 Fıstık alerjisi olanlar kuruyemiş seçiminde dikkatli olmalı',
      '🐟 Hamilelikte yüksek cıvalı balıklardan (ton, kılıç balığı) kaçının',
      '💊 Kan sulandırıcı kullananlar omega-3 takviyesi için doktora danışmalı',
      '🧈 Kalori hesabına dikkat - zeytinyağı sağlıklı ama kalorilidir',
      '📏 Porsiyon kontrolü önemlidir - sınırsız yemek değildir',
    ],
    en: [
      '⚠️ Wine consumption is optional - don\'t start if you don\'t drink alcohol',
      '🥜 Those with nut allergies should be careful with nut selection',
      '🐟 Avoid high-mercury fish (tuna, swordfish) during pregnancy',
      '💊 Those on blood thinners should consult doctor for omega-3 supplements',
      '🧈 Watch calorie count - olive oil is healthy but caloric',
      '📏 Portion control is important - not unlimited eating',
    ],
  },

  allowedFoods: {
    tr: [
      '🫒 Sızma zeytinyağı (ana yağ kaynağı)',
      '🐟 Balık ve deniz ürünleri (haftada 2-3 kez)',
      '🥬 Bol miktarda sebze (günde 4-5 porsiyon)',
      '🍎 Taze meyveler (günde 2-3 porsiyon)',
      '🌾 Tam tahıllar (tam buğday ekmeği, bulgur, yulaf)',
      '🫘 Baklagiller (nohut, mercimek, fasulye)',
      '🥜 Kuruyemişler (badem, ceviz, fındık)',
      '🧀 Az yağlı süt ürünleri ve peynir',
      '🍗 Kümes hayvanları (orta düzeyde)',
      '🥚 Yumurta (haftada 4-6 adet)',
      '🧄 Sarımsak, soğan, domates',
      '🌿 Taze otlar (kekik, fesleğen, biberiye)',
      '🍷 Kırmızı şarap (opsiyonel, günde 1 kadeh)',
      '🍯 Bal (az miktarda)',
    ],
    en: [
      '🫒 Extra virgin olive oil (main fat source)',
      '🐟 Fish and seafood (2-3 times per week)',
      '🥬 Plenty of vegetables (4-5 servings daily)',
      '🍎 Fresh fruits (2-3 servings daily)',
      '🌾 Whole grains (whole wheat bread, bulgur, oats)',
      '🫘 Legumes (chickpeas, lentils, beans)',
      '🥜 Nuts (almonds, walnuts, hazelnuts)',
      '🧀 Low-fat dairy products and cheese',
      '🍗 Poultry (moderate amounts)',
      '🥚 Eggs (4-6 per week)',
      '🧄 Garlic, onion, tomatoes',
      '🌿 Fresh herbs (thyme, basil, rosemary)',
      '🍷 Red wine (optional, 1 glass daily)',
      '🍯 Honey (small amounts)',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🍬 Rafine şeker ve şekerli gıdalar',
      '🥤 Şekerli içecekler ve gazlı içecekler',
      '🍟 Kızartmalar ve fast food',
      '🥓 İşlenmiş et ürünleri (sosis, salam, pastırma)',
      '🍞 Beyaz ekmek ve rafine tahıllar',
      '🧈 Margarin ve trans yağlar',
      '🍪 Paketli atıştırmalıklar ve bisküviler',
      '🥫 Ultra işlenmiş gıdalar',
      '🍰 Hazır pasta ve tatlılar',
    ],
    en: [
      '🍬 Refined sugar and sugary foods',
      '🥤 Sugary drinks and sodas',
      '🍟 Fried foods and fast food',
      '🥓 Processed meat products (sausage, salami, bacon)',
      '🍞 White bread and refined grains',
      '🧈 Margarine and trans fats',
      '🍪 Packaged snacks and biscuits',
      '🥫 Ultra-processed foods',
      '🍰 Ready-made cakes and desserts',
    ],
  },

  exercises: [
    {
      name: 'Yürüyüş / Walking',
      duration: '30-45 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Akdeniz yaşam tarzının önemli parçası. Yemeklerden sonra kısa yürüyüşler ideal.',
    },
    {
      name: 'Yüzme / Swimming',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Akdeniz kültürünün vazgeçilmezi. Tüm vücut için mükemmel.',
    },
    {
      name: 'Bisiklet / Cycling',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 3-4 kez / 3-4 times a week',
      note: 'Düşük etkili kardiyo, eklemlere nazik.',
    },
    {
      name: 'Yoga / Pilates',
      duration: '20-30 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Esneklik ve zihinsel sağlık için.',
    },
    {
      name: 'Bahçe İşleri / Gardening',
      duration: '30-60 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Geleneksel Akdeniz aktivitesi, doğayla bağlantı.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Akdeniz\'e Hoş Geldiniz',
      totalCalories: 1850,
      note: 'Bugün Akdeniz yolculuğunuza başlıyorsunuz. Taze, renkli ve lezzetli bir gün!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Tam buğday ekmeği', portion: '2 dilim (60g)', calories: 140 },
            { name: 'Sızma zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Beyaz peynir', portion: '40g', calories: 100 },
            { name: 'Domates', portion: '1 orta boy', calories: 25 },
            { name: 'Salatalık', portion: '1/2 adet', calories: 10 },
            { name: 'Zeytin', portion: '8 adet', calories: 45 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 40 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'Izgara levrek', portion: '180g', calories: 280, note: 'Limonlu, zeytinyağlı' },
            { name: 'Bulgur pilavı', portion: '150g (pişmiş)', calories: 180 },
            { name: 'Mevsim salatası', portion: '200g', calories: 100, note: 'Zeytinyağı-limon sos' },
            { name: 'Zeytinyağı (salata için)', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Zeytinyağlı taze fasulye', portion: '250g', calories: 220, note: 'Soğanlı, domatesli' },
            { name: 'Cacık', portion: '150g', calories: 80 },
            { name: 'Tam buğday ekmeği', portion: '1 dilim', calories: 70 },
            { name: 'Karpuz', portion: '200g', calories: 60 },
            { name: 'Lor peyniri', portion: '50g', calories: 60 },
            { name: 'Nane limon', portion: '1 bardak', calories: 0 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Badem', portion: '15 adet (20g)', calories: 115 },
            { name: 'Kuru kayısı', portion: '3 adet', calories: 50 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Deniz Ürünleri Günü',
      totalCalories: 1900,
      note: 'Omega-3 açısından zengin bir gün. Balık ve deniz ürünleri Akdeniz diyetinin temel taşıdır.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yulaf ezmesi', portion: '50g (kuru)', calories: 190, note: 'Süt ile' },
            { name: 'Yaban mersini', portion: '50g', calories: 30 },
            { name: 'Ceviz', portion: '5 adet', calories: 130 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 40 },
            { name: 'Süt (yarım yağlı)', portion: '150ml', calories: 70 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 620,
          foods: [
            { name: 'Karides güveç', portion: '200g', calories: 280, note: 'Domatesli, sarımsaklı' },
            { name: 'Pirinç pilavı', portion: '100g', calories: 150 },
            { name: 'Roka salatası', portion: '100g', calories: 50 },
            { name: 'Parmesan', portion: '20g', calories: 80 },
            { name: 'Limonata (şekersiz)', portion: '200ml', calories: 20 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 200, note: 'Limon ve kırmızı biber ile' },
            { name: 'Humus', portion: '80g', calories: 180, note: 'Zeytinyağı ile' },
            { name: 'Havuç ve kereviz çubukları', portion: '100g', calories: 40 },
            { name: 'Tam buğday pide', portion: '1/4 adet', calories: 100 },
            { name: 'Portakal', portion: '1 orta boy', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 220,
          foods: [
            { name: 'Yunan yoğurdu', portion: '150g', calories: 130, note: 'Yağsız' },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Chia tohumu', portion: '1 tatlı kaşığı', calories: 55 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Baklagiller Günü',
      totalCalories: 1820,
      note: 'Bitkisel protein ve lif kaynağı baklagiller! Akdeniz mutfağının vazgeçilmezi.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Menemen', portion: '200g', calories: 220, note: '2 yumurta, domates, biber' },
            { name: 'Tam buğday ekmeği', portion: '1 dilim', calories: 70 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
            { name: 'Taze nane çayı', portion: '1 fincan', calories: 0 },
            { name: 'Beyaz peynir', portion: '30g', calories: 85 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 680,
          foods: [
            { name: 'Nohutlu tavuk sote', portion: '250g', calories: 380, note: 'Zeytinyağlı, baharatlı' },
            { name: 'Bulgur pilavı', portion: '120g', calories: 150 },
            { name: 'Çoban salatası', portion: '150g', calories: 80 },
            { name: 'Ayran', portion: '200ml', calories: 70 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Kuru fasulye (zeytinyağlı)', portion: '250g', calories: 320, note: 'Soğanlı, domatesli' },
            { name: 'Turşu', portion: '50g', calories: 15 },
            { name: 'Tam buğday ekmeği', portion: '1 dilim', calories: 70 },
            { name: 'Kavun', portion: '150g', calories: 50 },
            { name: 'Dereotlu yoğurt', portion: '100g', calories: 65 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Hummus', portion: '60g', calories: 130 },
            { name: 'Havuç çubukları', portion: '80g', calories: 35 },
            { name: 'Tam buğday kraker', portion: '2 adet', calories: 35 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Sebze Festivali',
      totalCalories: 1750,
      note: 'Bugün sebzeler başrolde! Antioksidanlar ve lif deposu bir gün.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Avokado tost', portion: '1 porsiyon', calories: 280, note: 'Tam buğday ekmek üzerine' },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Kiraz domates', portion: '5 adet', calories: 15 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
            { name: 'Zeytin', portion: '5 adet', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Zeytinyağlı enginar', portion: '2 adet', calories: 200, note: 'Havuç ve bezelye ile' },
            { name: 'Feta salatası', portion: '200g', calories: 250, note: 'Zeytin, domates, salatalık' },
            { name: 'Tam buğday ekmeği', portion: '1 dilim', calories: 70 },
            { name: 'Limonlu su', portion: '300ml', calories: 5 },
            { name: 'İncir', portion: '2 adet', calories: 75 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Sebze güveç', portion: '300g', calories: 250, note: 'Patlıcan, biber, kabak, domates' },
            { name: 'Tavuk şiş', portion: '100g', calories: 180 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Erik', portion: '3 adet', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Karışık kuruyemiş', portion: '25g', calories: 150, note: 'Badem, ceviz, fındık' },
            { name: 'Kuru üzüm', portion: '15g', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Tam Tahıl Günü',
      totalCalories: 1880,
      note: 'Tam tahılların gücü! Lif, B vitaminleri ve mineraller için önemli.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Tam tahıllı müsli', portion: '60g', calories: 220 },
            { name: 'Yoğurt', portion: '150g', calories: 100 },
            { name: 'Muz', portion: '1/2 adet', calories: 50 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 40 },
            { name: 'Ceviz', portion: '3 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 680,
          foods: [
            { name: 'Kinoa salatası', portion: '200g', calories: 280, note: 'Domates, salatalık, nane' },
            { name: 'Izgara somon', portion: '150g', calories: 300 },
            { name: 'Zeytinyağı-limon sos', portion: '1 yemek kaşığı', calories: 100 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Bulgur köftesi', portion: '6 adet', calories: 300, note: 'Mercimekli, soğanlı' },
            { name: 'Yoğurtlu semizotu', portion: '200g', calories: 120 },
            { name: 'Ayran', portion: '200ml', calories: 70 },
            { name: 'Şeftali', portion: '1 orta boy', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Fındık', portion: '15g', calories: 95 },
            { name: 'Elma', portion: '1 küçük', calories: 55 },
            { name: 'Lor peyniri', portion: '30g', calories: 35 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Akdeniz Klasikleri',
      totalCalories: 1820,
      note: 'Geleneksel Akdeniz yemekleriyle dolu bir gün. Lezzetli ve sağlıklı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Peynirli gözleme', portion: '1 adet', calories: 280, note: 'Tam buğday unu ile' },
            { name: 'Domates', portion: '1 adet', calories: 25 },
            { name: 'Salatalık', portion: '1/2 adet', calories: 10 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 40 },
            { name: 'Çay', portion: '2 fincan', calories: 0 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
            { name: 'Zeytin', portion: '6 adet', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'Musakka', portion: '250g', calories: 350, note: 'Patlıcan, kıyma, beşamel' },
            { name: 'Pilav', portion: '100g', calories: 150 },
            { name: 'Çoban salatası', portion: '150g', calories: 80 },
            { name: 'Ayran', portion: '200ml', calories: 70 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Balık çorbası', portion: '300ml', calories: 200, note: 'Sebzeli' },
            { name: 'Deniz börülcesi salatası', portion: '150g', calories: 120, note: 'Zeytinyağlı, limonlu' },
            { name: 'Tam buğday ekmeği', portion: '1 dilim', calories: 70 },
            { name: 'Üzüm', portion: '100g', calories: 70 },
            { name: 'Beyaz peynir', portion: '30g', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Yunan yoğurdu', portion: '100g', calories: 100 },
            { name: 'Ceviz', portion: '4 adet', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - Hafta Sonu Şöleni 🎉',
      totalCalories: 1950,
      note: 'İlk haftayı tamamladınız! Bugün biraz daha zengin bir menü ile kutlayalım.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Brunch)',
          totalCalories: 550,
          foods: [
            { name: 'Serpme kahvaltı', portion: '1 porsiyon', calories: 350, note: 'Peynir, zeytin, domates, salatalık' },
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday ekmeği', portion: '1 dilim', calories: 70 },
            { name: 'Taze sıkılmış portakal suyu', portion: '200ml', calories: 90 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 700,
          foods: [
            { name: 'Fırında kuzu incik', portion: '200g', calories: 400, note: 'Sebzeli' },
            { name: 'Fırın patates', portion: '100g', calories: 130 },
            { name: 'Akdeniz salatası', portion: '150g', calories: 120 },
            { name: 'Kırmızı şarap', portion: '1 kadeh (125ml)', calories: 100, note: 'Opsiyonel' },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Ahtapot salatası', portion: '150g', calories: 200, note: 'Zeytinyağlı' },
            { name: 'Piyaz', portion: '200g', calories: 180, note: 'Kuru fasulye, soğan' },
            { name: 'Meyve tabağı', portion: '150g', calories: 80 },
            { name: 'Bitki çayı', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Baklava', portion: '1 küçük dilim', calories: 150, note: 'Hafta sonu ödülü!' },
            { name: 'Türk kahvesi', portion: '1 fincan', calories: 10 },
            { name: 'Lokum', portion: '1 adet', calories: 40 },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 BEKLENEN SONUÇLAR (30 Günde)

⚖️ Kilo Kontrolü:
• Yavaş ve sürdürülebilir kilo kaybı: 2-4 kg
• Ödem azalması ve genel hafiflik hissi
• Vücut kompozisyonunda iyileşme

💓 Kardiyovasküler Sağlık:
• LDL kolesterol: %5-15 düşüş
• Trigliserit: %10-20 düşüş
• Kan basıncı: Hafif iyileşme
• HDL (iyi) kolesterol: Artış

🔬 Metabolik İyileşmeler:
• Açlık kan şekeri: Stabilizasyon
• İnsülin duyarlılığı: Artış
• İltihap belirteçleri (CRP): Azalma

⚡ Enerji ve Yaşam Kalitesi:
• Gün boyu stabil enerji
• Daha iyi uyku kalitesi
• Zihinsel netlik artışı
• Genel iyi oluş hali

🍽️ Beslenme Alışkanlıkları:
• Sağlıklı yağları sevmeye başlama
• Sebze tüketiminde artış
• İşlenmiş gıdalardan uzaklaşma
• Porsiyon bilinci gelişimi

⏳ Uzun Vadeli Faydalar:
• Kalp hastalığı riskinde %30 azalma
• Tip 2 diyabet riskinde %30-52 azalma
• Demans riskinde azalma
• Yaşam süresinde uzama

⚠️ Not: Akdeniz diyeti yaşam boyu sürdürülebilir bir beslenme şeklidir. Sonuçlar zaman içinde artar ve kalıcı olur.`,

    en: `📊 EXPECTED RESULTS (In 30 Days)

⚖️ Weight Control:
• Slow and sustainable weight loss: 2-4 kg
• Reduced bloating and general feeling of lightness
• Improvement in body composition

💓 Cardiovascular Health:
• LDL cholesterol: 5-15% decrease
• Triglycerides: 10-20% decrease
• Blood pressure: Slight improvement
• HDL (good) cholesterol: Increase

🔬 Metabolic Improvements:
• Fasting blood sugar: Stabilization
• Insulin sensitivity: Increase
• Inflammation markers (CRP): Decrease

⚡ Energy and Quality of Life:
• Stable energy throughout the day
• Better sleep quality
• Increased mental clarity
• Overall sense of well-being

🍽️ Eating Habits:
• Learning to love healthy fats
• Increased vegetable consumption
• Moving away from processed foods
• Development of portion awareness

⏳ Long-Term Benefits:
• 30% reduction in heart disease risk
• 30-52% reduction in Type 2 diabetes risk
• Reduced dementia risk
• Extended lifespan

⚠️ Note: The Mediterranean diet is a lifelong sustainable eating pattern. Results increase over time and become permanent.`,
  },
};
