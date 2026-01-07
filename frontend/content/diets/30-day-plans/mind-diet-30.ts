import { Diet } from '../types';

export const mindDiet30: Diet = {
  id: 'mind',
  name: {
    tr: 'MIND Diyeti',
    en: 'MIND Diet',
  },
  emoji: '🧠',
  isPremium: true,
  duration: 30,
  difficulty: 'medium',

  description: {
    tr: 'MIND (Mediterranean-DASH Intervention for Neurodegenerative Delay - Nörodejeneratif Gecikme için Akdeniz-DASH Müdahalesi), beyin sağlığını korumak ve Alzheimer riskini azaltmak için özel olarak tasarlanmış bir beslenme programıdır. Akdeniz ve DASH diyetlerinin en iyi özelliklerini birleştirir.',
    en: 'MIND (Mediterranean-DASH Intervention for Neurodegenerative Delay) is a diet specifically designed to protect brain health and reduce Alzheimer\'s risk. It combines the best features of the Mediterranean and DASH diets.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 2024 Araştırma Bulguları:
• 5.200+ katılımcı, 8 yıl takip
• Yüksek uyum gösterenlerde demans riski %9 daha düşük
• Beyaz, Latino ve Afrika kökenli Amerikalılarda %13 daha düşük risk
• "Beyin sağlığı için asla geç değil" sonucu

🧠 Beyin Sağlığı Mekanizması:
• Polifenoller ve antioksidanlar nöroprotektif etki sağlar
• Omega-3 yağ asitleri beyin hücre zarlarını korur
• BDNF (Beyin Kaynaklı Nörotrofik Faktör) artışı
• Amiloid plaklar ve tau proteinlerinde azalma

🔬 Otopsi Bazlı Araştırmalar:
• MIND diyetine uyum gösteren bireylerde Alzheimer patolojisi azalmış
• Beyin iltihabı belirteçlerinde düşüş
• Hipokampüs hacminde korunma

📈 Bilişsel Fonksiyon:
• Bilişsel gerileme hızında yavaşlama
• Hafıza ve dikkat testlerinde iyileşme
• Yaşa bağlı beyin küçülmesinde azalma

⚠️ Önemli Not:
• En güçlü etkiler yüksek uyum ile görülür
• Genetik faktörler (ApoE4) etkiyi değiştirebilir
• Egzersiz ile kombine edildiğinde etkiler artar`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 2024 Research Findings:
• 5,200+ participants, 8-year follow-up
• 9% lower dementia risk in high adherents
• 13% lower risk in White, Latino, and African American groups
• "It's never too late for brain health" conclusion

🧠 Brain Health Mechanism:
• Polyphenols and antioxidants provide neuroprotective effects
• Omega-3 fatty acids protect brain cell membranes
• BDNF (Brain-Derived Neurotrophic Factor) increase
• Reduction in amyloid plaques and tau proteins

🔬 Autopsy-Based Research:
• Reduced Alzheimer's pathology in MIND diet adherents
• Decrease in brain inflammation markers
• Hippocampus volume preservation

📈 Cognitive Function:
• Slowing of cognitive decline rate
• Improvement in memory and attention tests
• Reduction in age-related brain shrinkage

⚠️ Important Note:
• Strongest effects seen with high adherence
• Genetic factors (ApoE4) may modify effects
• Effects increase when combined with exercise`,
  },

  benefits: {
    tr: [
      '🧠 Alzheimer ve demans riskini %35-53 azaltır',
      '🎯 Bilişsel fonksiyonları korur ve güçlendirir',
      '💡 Hafıza ve öğrenme kapasitesini artırır',
      '⚡ Mental enerji ve odaklanmayı geliştirir',
      '❤️ Kalp sağlığını destekler',
      '🌙 Uyku kalitesini iyileştirir',
      '😊 Ruh halini düzenler - depresyon riskini azaltır',
      '🔥 Anti-inflamatuar etki sağlar',
      '🛡️ Hücresel yaşlanmayı yavaşlatır',
      '⚖️ Sağlıklı kilo kontrolü destekler',
    ],
    en: [
      '🧠 Reduces Alzheimer\'s and dementia risk by 35-53%',
      '🎯 Protects and strengthens cognitive functions',
      '💡 Increases memory and learning capacity',
      '⚡ Improves mental energy and focus',
      '❤️ Supports heart health',
      '🌙 Improves sleep quality',
      '😊 Regulates mood - reduces depression risk',
      '🔥 Provides anti-inflammatory effect',
      '🛡️ Slows cellular aging',
      '⚖️ Supports healthy weight control',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Kan sulandırıcı kullananlar yeşil yapraklı sebzelere dikkat',
      '🥜 Fındık alerjisi olanlar dikkatli olmalı',
      '💊 İlaç kullananlar doktora danışmalı',
      '🫐 Yüksek miktarda meyve diyabetiklerde dikkat gerektirir',
    ],
    en: [
      '⚠️ Those on blood thinners should watch leafy greens',
      '🥜 Those with nut allergies should be careful',
      '💊 Those on medication should consult doctor',
      '🫐 High fruit amounts require caution in diabetics',
    ],
  },

  allowedFoods: {
    tr: [
      '🥬 YEŞİL YAPRAKLI SEBZELER (Haftada ≥6 porsiyon):',
      '🥬 Ispanak, kale, roka',
      '🥬 Marul, pazı, karalahana',
      '',
      '🥦 DİĞER SEBZELER (Günde ≥1 porsiyon):',
      '🥦 Brokoli, karnabahar',
      '🥕 Havuç, biber, kabak',
      '🍅 Domates, patlıcan',
      '',
      '🫐 ÇİLEK VE YABAN MERSİNİ (Haftada ≥2 porsiyon):',
      '🫐 Yaban mersini (beyin için #1 meyve)',
      '🍓 Çilek, ahududu, böğürtlen',
      '',
      '🥜 KURUYEMIŞ (Haftada ≥5 porsiyon):',
      '🥜 Ceviz (omega-3 deposu)',
      '🥜 Badem, fındık',
      '',
      '🫘 BAKLAGİLLER (Haftada ≥3 porsiyon):',
      '🫘 Mercimek, nohut, fasulye',
      '',
      '🌾 TAM TAHILLAR (Günde ≥3 porsiyon):',
      '🌾 Yulaf, kinoa, bulgur',
      '🌾 Tam buğday ekmeği',
      '',
      '🐟 BALIK (Haftada ≥1 porsiyon):',
      '🐟 Somon, uskumru, sardalya',
      '',
      '🍗 KÜMES HAYVANLARI (Haftada ≥2 porsiyon):',
      '🍗 Tavuk, hindi',
      '',
      '🫒 ZEYTİNYAĞI (Ana yağ kaynağı):',
      '🫒 Sızma zeytinyağı',
      '',
      '🍵 SAĞLIKLI İÇECEKLER:',
      '🍵 Yeşil çay, bitki çayları',
    ],
    en: [
      '🥬 GREEN LEAFY VEGETABLES (≥6 servings/week):',
      '🥬 Spinach, kale, arugula',
      '🥬 Lettuce, chard, collard greens',
      '',
      '🥦 OTHER VEGETABLES (≥1 serving/day):',
      '🥦 Broccoli, cauliflower',
      '🥕 Carrots, peppers, zucchini',
      '🍅 Tomatoes, eggplant',
      '',
      '🫐 BERRIES (≥2 servings/week):',
      '🫐 Blueberries (#1 fruit for brain)',
      '🍓 Strawberries, raspberries, blackberries',
      '',
      '🥜 NUTS (≥5 servings/week):',
      '🥜 Walnuts (omega-3 powerhouse)',
      '🥜 Almonds, hazelnuts',
      '',
      '🫘 LEGUMES (≥3 servings/week):',
      '🫘 Lentils, chickpeas, beans',
      '',
      '🌾 WHOLE GRAINS (≥3 servings/day):',
      '🌾 Oats, quinoa, bulgur',
      '🌾 Whole wheat bread',
      '',
      '🐟 FISH (≥1 serving/week):',
      '🐟 Salmon, mackerel, sardines',
      '',
      '🍗 POULTRY (≥2 servings/week):',
      '🍗 Chicken, turkey',
      '',
      '🫒 OLIVE OIL (Primary oil):',
      '🫒 Extra virgin olive oil',
      '',
      '🍷 WINE (Optional - ≤1 glass/day):',
      '🍷 Red wine (resveratrol)',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🥩 KIRMIZI ET (Haftada <4 porsiyon):',
      '🥩 Dana, kuzu, domuz eti',
      '',
      '🧈 TEREYAĞI VE MARGARİN (Günde <1 yemek kaşığı):',
      '🧈 Tereyağı, margarin',
      '',
      '🧀 PEYNİR (Haftada <1 porsiyon):',
      '🧀 Yüksek yağlı peynirler',
      '',
      '🍰 PASTA VE TATLILAR (Haftada <5):',
      '🍰 Pastalar, kekler',
      '🍪 Bisküviler, şekerlemeler',
      '',
      '🍟 KIZARTMA VE FAST FOOD (Haftada <1):',
      '🍟 Kızartmalar',
      '🍔 Fast food',
    ],
    en: [
      '🥩 RED MEAT (<4 servings/week):',
      '🥩 Beef, lamb, chicken',
      '',
      '🧈 BUTTER AND MARGARINE (<1 tbsp/day):',
      '🧈 Butter, margarine',
      '',
      '🧀 CHEESE (<1 serving/week):',
      '🧀 High-fat cheeses',
      '',
      '🍰 PASTRIES AND SWEETS (<5/week):',
      '🍰 Cakes, pastries',
      '🍪 Cookies, candies',
      '',
      '🍟 FRIED AND FAST FOOD (<1/week):',
      '🍟 Fried foods',
      '🍔 Fast food',
    ],
  },

  exercises: [
    {
      name: 'Yürüyüş / Walking',
      duration: '30-45 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Beyin kan akışını artırır, BDNF üretimini destekler.',
    },
    {
      name: 'Dans / Dancing',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Koordinasyon ve hafıza için mükemmel - müzik + hareket.',
    },
    {
      name: 'Yoga / Meditation',
      duration: '20-30 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Stres azaltma, kortizol düşürme.',
    },
    {
      name: 'Beyin Egzersizleri / Brain Games',
      duration: '15-20 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Bulmaca, sudoku, hafıza oyunları.',
    },
    {
      name: 'Yüzme / Swimming',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Tüm vücut egzersizi, düşük etki.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Beyin Sağlığı Yolculuğu Başlıyor 🧠',
      totalCalories: 1900,
      note: 'Yeşil yapraklılar ve yaban mersini ile başlıyoruz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase (200g)', calories: 180 },
            { name: 'Yaban mersini', portion: '100g', calories: 60, note: 'Beyin süper gıdası' },
            { name: 'Ceviz', portion: '30g (6-7 adet)', calories: 130, note: 'Omega-3 deposu' },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Yağsız süt', portion: '100ml', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Kale salatası', portion: '150g', calories: 80, note: 'Yeşil yapraklı süper gıda' },
            { name: 'Izgara tavuk göğsü', portion: '120g', calories: 200 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Zeytinyağı', portion: '2 yemek kaşığı', calories: 180 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280, note: 'Omega-3 kaynağı' },
            { name: 'Ispanak (sote)', portion: '150g', calories: 70 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Brokoli', portion: '100g', calories: 35 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Badem', portion: '25g', calories: 145 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0, note: 'Antioksidan' },
            { name: 'Havuç çubukları', portion: '100g', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Antioksidan Patlaması 🫐',
      totalCalories: 1950,
      note: 'Meyve ve sebzelerden maksimum antioksidan.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Berry smoothie', portion: '400ml', calories: 280, note: 'Ispanak, yaban mersini, muz, yoğurt' },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 100 },
            { name: 'Keten tohumu', portion: '1 yemek kaşığı', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 180 },
            { name: 'Yeşil salata', portion: '200g', calories: 60, note: 'Marul, ıspanak, roka' },
            { name: 'Izgara tavuk', portion: '100g', calories: 165 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında levrek', portion: '150g', calories: 200 },
            { name: 'Tatlı patates', portion: '200g', calories: 180 },
            { name: 'Brüksel lahanası', portion: '150g', calories: 65 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Sarımsak', portion: '2 diş', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Omega-3 Günü 🐟',
      totalCalories: 1920,
      note: 'Beyin için omega-3 yağ asitleri.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Yumurta (omega-3 zengin)', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80, note: 'Sağlıklı yağlar' },
            { name: 'Ispanak', portion: '50g', calories: 15 },
            { name: 'Domates', portion: '1 küçük', calories: 15 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Ton balıklı salata', portion: '250g', calories: 300, note: 'Yeşillik, fasulye, zeytin' },
            { name: 'Kinoa', portion: '80g', calories: 95 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 590,
          foods: [
            { name: 'Uskumru (ızgara)', portion: '150g', calories: 300, note: 'DHA ve EPA deposu' },
            { name: 'Kale salatası', portion: '150g', calories: 80 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 120 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Ceviz', portion: '30g', calories: 200, note: 'ALA omega-3' },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Yeşil Yaprak Festivali 🥬',
      totalCalories: 1900,
      note: 'Her öğünde yeşil yapraklı sebze!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Ispanaklı omlet', portion: '2 yumurta + 80g ıspanak', calories: 220 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Kale + ıspanak salatası', portion: '200g', calories: 100, note: 'Yeşil yaprak bomba' },
            { name: 'Nohut', portion: '150g', calories: 240 },
            { name: 'Izgara tavuk', portion: '80g', calories: 130 },
            { name: 'Zeytinyağı-limon sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Fırında hindi göğsü', portion: '150g', calories: 250 },
            { name: 'Pazı (sote)', portion: '150g', calories: 60, note: 'Yeşil yapraklı' },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Brokoli', portion: '100g', calories: 35 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Yeşil smoothie', portion: '250ml', calories: 150, note: 'Ispanak, muz, yoğurt' },
            { name: 'Badem', portion: '20g', calories: 115 },
            { name: 'Havuç', portion: '80g', calories: 35 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Baklagil Gücü 🫘',
      totalCalories: 1950,
      note: 'Baklagillerden bitkisel protein ve lif.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
            { name: 'Yağsız süt', portion: '150ml', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Mercimek köftesi', portion: '6 adet', calories: 250 },
            { name: 'Roka salatası', portion: '150g', calories: 40 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 120 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fasulye yemeği', portion: '200g', calories: 250, note: 'Zeytinyağlı' },
            { name: 'Izgara tavuk', portion: '100g', calories: 165 },
            { name: 'Ispanak salatası', portion: '100g', calories: 30 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Humus + sebze', portion: '60g + 100g', calories: 160 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Fındık', portion: '10 adet', calories: 65 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Tam Tahıl Zenginliği 🌾',
      totalCalories: 1920,
      note: 'Kompleks karbonhidratlar ile beyin enerjisi.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Müsli (tam tahıllı)', portion: '60g', calories: 220 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15g', calories: 85 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Kinoa bowl', portion: '300g', calories: 350, note: 'Kinoa, nohut, sebzeler' },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında balık', portion: '150g', calories: 200 },
            { name: 'Bulgur pilavı', portion: '150g', calories: 180 },
            { name: 'Kale (sote)', portion: '150g', calories: 80 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Sarımsak', portion: '2 diş', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Tam buğday kraker', portion: '6 adet', calories: 120 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - İlk Hafta Tamamlandı! 🎉',
      totalCalories: 2000,
      note: 'Harika bir hafta! Beyin sağlığı için önemli bir adım.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Özel)',
          totalCalories: 520,
          foods: [
            { name: 'Berry parfait', portion: '350g', calories: 320, note: 'Yoğurt, granola, yaban mersini' },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Somon burger', portion: '150g', calories: 300 },
            { name: 'Tam buğday ekmek', portion: '1 adet', calories: 150 },
            { name: 'Ispanak salatası', portion: '150g', calories: 50 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Sebzeli pilav', portion: '150g', calories: 200 },
            { name: 'Yeşil salata', portion: '150g', calories: 50 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Dark çikolata', portion: '20g', calories: 110, note: '%70+ kakao - beyin dostu' },
            { name: 'Badem', portion: '20g', calories: 115 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 8,
      title: 'Gün 8 - Polifenol Gücü 🍇',
      totalCalories: 1920,
      note: 'Polifenoller ile beyin koruması.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Acai bowl', portion: '300g', calories: 280, note: 'Acai, muz, granola' },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Kale salatası', portion: '200g', calories: 100, note: 'Nar, ceviz ile' },
            { name: 'Izgara tavuk', portion: '120g', calories: 200 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Nar ekşisi sos', portion: '1 yemek kaşığı', calories: 30 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Mor lahana salatası', portion: '150g', calories: 50, note: 'Antosiyanin kaynağı' },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Üzüm', portion: '150g', calories: 100, note: 'Resveratrol' },
            { name: 'Badem', portion: '25g', calories: 145 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 9,
      title: 'Gün 9 - Hafıza Desteği 💡',
      totalCalories: 1950,
      note: 'Hafıza ve öğrenme için özel besinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Omega-3 yumurta', portion: '2 adet', calories: 140 },
            { name: 'Somon füme', portion: '50g', calories: 100 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Ispanak', portion: '50g', calories: 15 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Nohut salatası', portion: '200g', calories: 280, note: 'Yeşillik ile' },
            { name: 'Fırında tavuk', portion: '100g', calories: 165 },
            { name: 'Bulgur', portion: '80g', calories: 95 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 590,
          foods: [
            { name: 'Sardalya (ızgara)', portion: '150g', calories: 280, note: 'Omega-3 deposu' },
            { name: 'Ispanak (sote)', portion: '150g', calories: 70 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Ceviz', portion: '30g', calories: 200, note: 'Beyin şekli - hafıza için' },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 10,
      title: 'Gün 10 - Kümes Hayvanları Günü 🍗',
      totalCalories: 1900,
      note: 'Yağsız protein kaynağı olarak kümes hayvanları.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180 },
            { name: 'Ahududu', portion: '100g', calories: 55 },
            { name: 'Fındık', portion: '20g', calories: 130 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Tarçın', portion: 'bir tutam', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Kinoa salatası', portion: '150g', calories: 180 },
            { name: 'Yeşil yapraklar', portion: '100g', calories: 30 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Fırında hindi but', portion: '150g', calories: 280 },
            { name: 'Brokoli', portion: '150g', calories: 55 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Biberiye', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 100 },
            { name: 'Çilek', portion: '80g', calories: 30 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 11,
      title: 'Gün 11 - Zeytinyağı Günü 🫒',
      totalCalories: 1920,
      note: 'MIND diyetinin ana yağ kaynağı: zeytinyağı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Tam buğday ekmek', portion: '2 dilim', calories: 160 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90, note: 'Ekmek üzerine' },
            { name: 'Domates', portion: '2 küçük', calories: 30 },
            { name: 'Beyaz peynir (az yağlı)', portion: '30g', calories: 55 },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Akdeniz salatası', portion: '250g', calories: 200, note: 'Bol zeytinyağı ile' },
            { name: 'Izgara balık', portion: '120g', calories: 180 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 120 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Zeytinyağlı enginar', portion: '2 adet', calories: 180 },
            { name: 'Tavuk göğsü', portion: '120g', calories: 200 },
            { name: 'Ispanak salatası', portion: '100g', calories: 30 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Zeytin', portion: '10 adet', calories: 50 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 12,
      title: 'Gün 12 - Antiinflamatuar Gün 🔥',
      totalCalories: 1950,
      note: 'İltihabı azaltan besinler ile beyin koruması.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Smoothie', portion: '400ml', calories: 280, note: 'Zerdeçal, zencefil, muz, yoğurt' },
            { name: 'Tam buğday tost', portion: '1 dilim', calories: 80 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 100 },
            { name: 'Tarçın', portion: 'bir tutam', calories: 0, note: 'Antiinflamatuar' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Mercimek çorbası', portion: '300ml', calories: 180, note: 'Zerdeçallı' },
            { name: 'Kale salatası', portion: '150g', calories: 80 },
            { name: 'Izgara somon', portion: '100g', calories: 190 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Tavuk köri', portion: '200g', calories: 320, note: 'Zerdeçal ile' },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Brokoli', portion: '100g', calories: 35 },
            { name: 'Ispanak', portion: '80g', calories: 20 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Zencefilli çay', portion: '2 fincan', calories: 10 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Dark çikolata', portion: '15g', calories: 85 },
          ],
        },
      ],
    },
    {
      day: 13,
      title: 'Gün 13 - B Vitamini Gücü 💊',
      totalCalories: 1920,
      note: 'B vitaminleri ile beyin fonksiyonu desteği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Yumurta', portion: '2 adet', calories: 140, note: 'B12 kaynağı' },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160, note: 'B vitamini' },
            { name: 'Ispanak', portion: '80g', calories: 20, note: 'Folat' },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Portakal suyu', portion: '100ml', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Tavuk ciğer sote', portion: '100g', calories: 200, note: 'B12 deposu (opsiyonel)' },
            { name: 'Yeşil salata', portion: '150g', calories: 50 },
            { name: 'Kinoa', portion: '150g', calories: 180 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında levrek', portion: '150g', calories: 200 },
            { name: 'Mercimek haşlaması', portion: '150g', calories: 170, note: 'Folat kaynağı' },
            { name: 'Ispanak salatası', portion: '100g', calories: 30 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Badem', portion: '25g', calories: 145 },
            { name: 'Muz', portion: '1 küçük', calories: 90, note: 'B6 vitamini' },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 14,
      title: 'Gün 14 - İki Hafta Tamamlandı! 🏆',
      totalCalories: 2000,
      note: 'Yarı yola geldik! Beyin sağlığınız için harika adımlar.',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 520,
          foods: [
            { name: 'Pancake (tam buğday)', portion: '2 adet', calories: 200 },
            { name: 'Berry karışımı', portion: '150g', calories: 80, note: 'Yaban mersini, çilek' },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Somon bowl', portion: '350g', calories: 400, note: 'Somon, kinoa, avokado, yeşillik' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Kuzu pirzola (yağsız)', portion: '100g', calories: 230, note: 'Haftada 1 kez kırmızı et' },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Bulgur pilavı', portion: '120g', calories: 145 },
            { name: 'Kale salatası', portion: '100g', calories: 50 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler + Kutlama',
          totalCalories: 300,
          foods: [
            { name: 'Dark çikolata', portion: '25g', calories: 140, note: 'Kutlama!' },
            { name: 'Badem', portion: '15g', calories: 85 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 15,
      title: 'Gün 15 - Yeni Başlangıç 🌟',
      totalCalories: 1920,
      note: 'Üçüncü hafta! Beyin sağlığı alışkanlıkları güçleniyor.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Overnight oats', portion: '300g', calories: 280, note: 'Yulaf, süt, chia, meyve' },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Buddha bowl', portion: '350g', calories: 380, note: 'Kinoa, nohut, sebze, tahini' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Roka', portion: '80g', calories: 20 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında alabalık', portion: '150g', calories: 200 },
            { name: 'Ispanak (sote)', portion: '150g', calories: 70 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Badem', portion: '25g', calories: 145 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 16,
      title: 'Gün 16 - Enerji Günü ⚡',
      totalCalories: 1950,
      note: 'Mental ve fiziksel enerji için besinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Ispanak', portion: '50g', calories: 15 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Tavuklu wrap', portion: '1 adet', calories: 380, note: 'Tam buğday lavaş, sebzeler' },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Kinoa pilavı', portion: '150g', calories: 180 },
            { name: 'Brokoli', portion: '100g', calories: 35 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Muz', portion: '1 orta', calories: 105, note: 'Doğal enerji' },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 17,
      title: 'Gün 17 - Görsel Koruma 👁️',
      totalCalories: 1900,
      note: 'Göz ve beyin sağlığı için lutein ve zeaksantin.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 460,
          foods: [
            { name: 'Ispanaklı omlet', portion: '2 yumurta + ıspanak', calories: 220, note: 'Lutein kaynağı' },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Portakal', portion: '1 adet', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Kale salatası', portion: '200g', calories: 100, note: 'Zeaksantin deposu' },
            { name: 'Izgara tavuk', portion: '120g', calories: 200 },
            { name: 'Mısır', portion: '100g', calories: 90, note: 'Lutein kaynağı' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Fırında balık', portion: '150g', calories: 200 },
            { name: 'Pazı (sote)', portion: '150g', calories: 60 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Havuç', portion: '100g', calories: 40, note: 'Beta-karoten' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Yumurta sarısı çıkarılmış yum.', portion: '1 adet', calories: 55, note: 'Lutein en yüksek' },
            { name: 'Badem', portion: '20g', calories: 115 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 18,
      title: 'Gün 18 - Deniz Mahsulleri 🦐',
      totalCalories: 1920,
      note: 'Deniz ürünlerinden DHA ve EPA.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180 },
            { name: 'Çilek', portion: '100g', calories: 35 },
            { name: 'Ceviz', portion: '30g', calories: 200 },
            { name: 'Yağsız süt', portion: '100ml', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Karides salatası', portion: '200g', calories: 250 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 340 },
            { name: 'Brokoli', portion: '150g', calories: 55 },
            { name: 'Tatlı patates', portion: '120g', calories: 105 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Badem', portion: '20g', calories: 115 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 19,
      title: 'Gün 19 - Bitki Çeşitliliği 🌿',
      totalCalories: 1900,
      note: 'Çeşitli bitkisel gıdalar ile besin zenginliği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Smoothie bowl', portion: '350g', calories: 280, note: '5+ farklı meyve/sebze' },
            { name: 'Granola', portion: '30g', calories: 120 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Rainbow salata', portion: '250g', calories: 150, note: '7 farklı renk sebze' },
            { name: 'Nohut', portion: '100g', calories: 160 },
            { name: 'Izgara tavuk', portion: '80g', calories: 130 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Sebze güveç', portion: '250g', calories: 200 },
            { name: 'Fırında balık', portion: '120g', calories: 180 },
            { name: 'Bulgur pilavı', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '80g', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Karışık meyve', portion: '150g', calories: 80 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 20,
      title: 'Gün 20 - Mikrobiyom Desteği 🦠',
      totalCalories: 1950,
      note: 'Bağırsak-beyin aksı için fermente gıdalar.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Kefir', portion: '200ml', calories: 100, note: 'Probiyotik' },
            { name: 'Yulaf ezmesi', portion: '150g', calories: 150 },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Badem', portion: '20g', calories: 115 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Tavuk salatası', portion: '250g', calories: 300 },
            { name: 'Turşu sebze', portion: '50g', calories: 15, note: 'Fermente' },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 590,
          foods: [
            { name: 'Miso çorbası', portion: '200ml', calories: 60, note: 'Fermente soya' },
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Yoğurt', portion: '150g', calories: 90, note: 'Probiyotik' },
            { name: 'Çilek', portion: '100g', calories: 35, note: 'Prebiyotik lif' },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Kombucha', portion: '100ml', calories: 30, note: 'Opsiyonel' },
          ],
        },
      ],
    },
    {
      day: 21,
      title: 'Gün 21 - Üç Hafta Başarısı! 🎉',
      totalCalories: 2000,
      note: 'Üç haftayı geçtik! Beyin sağlığı alışkanlıkları yerleşti.',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 520,
          foods: [
            { name: 'French toast (tam buğday)', portion: '2 dilim', calories: 280 },
            { name: 'Berry karışımı', portion: '150g', calories: 80 },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Mediterranean bowl', portion: '350g', calories: 400 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında tavuk', portion: '150g', calories: 280 },
            { name: 'Kinoa pilavı', portion: '150g', calories: 180 },
            { name: 'Kale salatası', portion: '100g', calories: 50 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler + Kutlama',
          totalCalories: 300,
          foods: [
            { name: 'Dark çikolata', portion: '25g', calories: 140 },
            { name: 'Badem', portion: '15g', calories: 85 },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 22,
      title: 'Gün 22 - Son Hafta Başlıyor 🚀',
      totalCalories: 1920,
      note: 'Son hafta! MIND diyeti artık yaşam tarzınız.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180 },
            { name: 'Ahududu', portion: '100g', calories: 55 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Yağsız süt', portion: '150ml', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Somon salatası', portion: '250g', calories: 350 },
            { name: 'Bulgur', portion: '80g', calories: 95 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Sebzeli kinoa', portion: '150g', calories: 180 },
            { name: 'Ispanak salatası', portion: '100g', calories: 30 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 100 },
            { name: 'Çilek', portion: '80g', calories: 30 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 23,
      title: 'Gün 23 - Kognitif Performans 🎯',
      totalCalories: 1950,
      note: 'Maksimum bilişsel performans için optimize edilmiş menü.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Omega-3 yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Ispanak', portion: '50g', calories: 15 },
            { name: 'Portakal suyu', portion: '150ml', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Beyin gücü bowl', portion: '350g', calories: 400, note: 'Somon, kale, yaban mersini, ceviz' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında uskumru', portion: '150g', calories: 300 },
            { name: 'Ispanak (sote)', portion: '150g', calories: 70 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Ceviz', portion: '30g', calories: 200 },
            { name: 'Yaban mersini', portion: '100g', calories: 60 },
            { name: 'Dark çikolata', portion: '10g', calories: 55 },
          ],
        },
      ],
    },
    {
      day: 24,
      title: 'Gün 24 - Stres Azaltma 😌',
      totalCalories: 1900,
      note: 'Kortizol düşüren ve rahatlatıcı besinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Yulaf lapası', portion: '200g', calories: 180, note: 'Serotonin desteği' },
            { name: 'Muz', portion: '1 adet', calories: 105, note: 'Triptofan' },
            { name: 'Badem', portion: '20g', calories: 115 },
            { name: 'Papatya çayı', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Tavuk salatası', portion: '250g', calories: 300 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280, note: 'Omega-3 - stres azaltıcı' },
            { name: 'Brokoli', portion: '150g', calories: 55 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Dark çikolata', portion: '20g', calories: 110, note: 'Magnezyum' },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Çilek', portion: '80g', calories: 30 },
            { name: 'Lavanta çayı', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 25,
      title: 'Gün 25 - Uyku Kalitesi 🌙',
      totalCalories: 1920,
      note: 'İyi uyku = sağlıklı beyin. Uyku destekleyen besinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180 },
            { name: 'Kiraz', portion: '100g', calories: 50, note: 'Doğal melatonin' },
            { name: 'Badem', portion: '25g', calories: 145 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Hindi göğsü', portion: '150g', calories: 250, note: 'Triptofan kaynağı' },
            { name: 'Kinoa salatası', portion: '150g', calories: 180 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (Erken)',
          totalCalories: 570,
          foods: [
            { name: 'Fırında balık', portion: '150g', calories: 200 },
            { name: 'Esmer pirinç', portion: '100g', calories: 110, note: 'Kompleks karbonhidrat' },
            { name: 'Marul salatası', portion: '150g', calories: 30, note: 'Doğal sakinleştirici' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Kivi', portion: '2 adet', calories: 90, note: 'Uyku kalitesi için' },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Ceviz', portion: '25g', calories: 165, note: 'Melatonin içerir' },
            { name: 'Muz', portion: '1 küçük', calories: 90 },
            { name: 'Papatya çayı', portion: '1 fincan', calories: 0 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 30, note: 'Yatmadan önce' },
          ],
        },
      ],
    },
    {
      day: 26,
      title: 'Gün 26 - Antioksidan Zenginliği 🫐',
      totalCalories: 1950,
      note: 'Maksimum antioksidan ile hücre koruması.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Berry bowl', portion: '350g', calories: 300, note: 'Yaban mersini, çilek, ahududu' },
            { name: 'Granola', portion: '30g', calories: 120 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Kale salatası', portion: '200g', calories: 100, note: 'Antioksidan deposu' },
            { name: 'Izgara somon', portion: '120g', calories: 230 },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
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
            { name: 'Pancar', portion: '80g', calories: 35, note: 'Betalain antioksidanı' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 320,
          foods: [
            { name: 'Dark çikolata', portion: '20g', calories: 110, note: 'Flavanoid' },
            { name: 'Ceviz', portion: '20g', calories: 130 },
            { name: 'Yeşil çay', portion: '3 fincan', calories: 0, note: 'EGCG antioksidanı' },
          ],
        },
      ],
    },
    {
      day: 27,
      title: 'Gün 27 - Hafıza Şampiyonu 🏆',
      totalCalories: 1920,
      note: 'Hafıza ve öğrenme için en iyi besinler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yumurta', portion: '2 adet', calories: 140, note: 'Kolin - hafıza için kritik' },
            { name: 'Tam buğday tost', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
            { name: 'Yaban mersini', portion: '80g', calories: 50, note: 'Hafıza güçlendirici' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Somon bowl', portion: '300g', calories: 380, note: 'DHA - beyin yapı taşı' },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında hindi', portion: '150g', calories: 250 },
            { name: 'Brokoli', portion: '150g', calories: 55, note: 'K vitamini - beyin için' },
            { name: 'Kinoa', portion: '150g', calories: 180 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Ceviz', portion: '30g', calories: 200, note: 'Beyin şekli - hafıza için' },
            { name: 'Çilek', portion: '80g', calories: 30 },
            { name: 'Kahve', portion: '1 fincan', calories: 5, note: 'Kısa vadeli hafıza desteği' },
          ],
        },
      ],
    },
    {
      day: 28,
      title: 'Gün 28 - Dördüncü Hafta Tamamlandı! 🎊',
      totalCalories: 2000,
      note: 'Son iki gün! MIND diyeti ustası oldunuz.',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 520,
          foods: [
            { name: 'Açai smoothie bowl', portion: '350g', calories: 320 },
            { name: 'Granola', portion: '30g', calories: 120 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Mediterranean salata', portion: '300g', calories: 300 },
            { name: 'Izgara tavuk', portion: '120g', calories: 200 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 340 },
            { name: 'Ispanak salatası', portion: '150g', calories: 50 },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Dark çikolata', portion: '25g', calories: 140 },
            { name: 'Badem', portion: '15g', calories: 85 },
            { name: 'Yaban mersini', portion: '80g', calories: 50 },
          ],
        },
      ],
    },
    {
      day: 29,
      title: 'Gün 29 - Son Düzlük 🏁',
      totalCalories: 1920,
      note: 'Yarın son gün! 30 günlük başarınızı kutlamaya hazır olun.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 470,
          foods: [
            { name: 'Yulaf ezmesi', portion: '1 kase', calories: 180 },
            { name: 'Berry karışımı', portion: '120g', calories: 70 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Yağsız süt', portion: '100ml', calories: 35 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Kale caesar salatası', portion: '250g', calories: 280, note: 'Tavuk ile' },
            { name: 'Kinoa', portion: '100g', calories: 120 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Fırında balık', portion: '150g', calories: 200 },
            { name: 'Sebzeli bulgur', portion: '150g', calories: 180 },
            { name: 'Ispanak (sote)', portion: '150g', calories: 70 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 310,
          foods: [
            { name: 'Badem', portion: '25g', calories: 145 },
            { name: 'Elma', portion: '1 orta', calories: 95 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 30,
      title: 'Gün 30 - TAMAMLANDI! 🧠🏆🎉',
      totalCalories: 2100,
      note: '30 günü başarıyla tamamladınız! Beyin sağlığınız için müthiş bir adım attınız!',
      meals: [
        {
          type: 'breakfast',
          name: 'Şampiyon Kahvaltısı',
          totalCalories: 550,
          foods: [
            { name: 'Berry pancake', portion: '3 adet', calories: 300, note: 'Tam buğday, yaban mersini' },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '25g', calories: 165 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Zafer Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Somon niçoise salatası', portion: '350g', calories: 420, note: 'Somon, yumurta, fasulye, zeytin' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Kutlama Akşam Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'Fırında somon', portion: '200g', calories: 380 },
            { name: 'Kale salatası', portion: '150g', calories: 80 },
            { name: 'Kinoa pilavı', portion: '150g', calories: 180 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Kutlama Tatlısı',
          totalCalories: 300,
          foods: [
            { name: 'Berry parfait', portion: '200g', calories: 150, note: 'Yoğurt, berry, granola' },
            { name: 'Dark çikolata', portion: '30g', calories: 165, note: '%85+ kakao - kutlamayı hak ettiniz!' },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 BEKLENEN SONUÇLAR (30 Günde)

🧠 Bilişsel Fonksiyonlar:
• Hafıza ve dikkat: Belirgin iyileşme
• Mental netlik: Artış
• Öğrenme kapasitesi: Gelişme
• Beyin sisi: Azalma

❤️ Kardiyovasküler Sağlık:
• Kan basıncı: 3-6 mmHg düşüş
• LDL kolesterol: %5-10 düşüş
• İltihap belirteçleri: Azalma

⚖️ Kilo Kontrolü:
• Toplam: 2-3 kg kayıp (kalori dengesine bağlı)
• Bel çevresi: 2-4 cm azalma

⚡ Enerji ve Ruh Hali:
• Mental enerji: Artış
• Ruh hali: İyileşme
• Uyku kalitesi: Daha iyi

🔬 Uzun Vadeli Faydalar:
• Alzheimer riski: %35-53 azalma (yüksek uyumda)
• Bilişsel gerileme: Yavaşlama
• Beyin yaşlanması: Gecikme

📅 Zaman Çizelgesi:
• 1-2 hafta: Enerji ve ruh hali iyileşmesi
• 2-4 hafta: Bilişsel netlik artışı
• 30 gün sonrası: Kalıcı alışkanlık oluşumu

⚠️ Önemli:
• MIND diyetine %50 uyum bile fayda sağlar
• Tam uyum en iyi sonuçları verir
• Egzersiz ile birlikte etkiler güçlenir`,

    en: `📊 EXPECTED RESULTS (In 30 Days)

🧠 Cognitive Functions:
• Memory and attention: Notable improvement
• Mental clarity: Increase
• Learning capacity: Development
• Brain fog: Reduction

❤️ Cardiovascular Health:
• Blood pressure: 3-6 mmHg reduction
• LDL cholesterol: 5-10% decrease
• Inflammation markers: Reduction

⚖️ Weight Control:
• Total: 2-3 kg loss (depending on calorie balance)
• Waist circumference: 2-4 cm reduction

⚡ Energy and Mood:
• Mental energy: Increase
• Mood: Improvement
• Sleep quality: Better

🔬 Long-Term Benefits:
• Alzheimer's risk: 35-53% reduction (with high adherence)
• Cognitive decline: Slowing
• Brain aging: Delay

📅 Timeline:
• Weeks 1-2: Energy and mood improvement
• Weeks 2-4: Cognitive clarity increase
• After 30 days: Lasting habit formation

⚠️ Important:
• Even 50% MIND diet adherence provides benefits
• Full adherence yields best results
• Effects strengthen with exercise`,
  },
};
