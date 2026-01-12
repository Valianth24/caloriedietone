import { Diet } from './types';

export const paleoDiet: Diet = {
  id: 'paleo',
  name: {
    tr: 'Paleo Diyet',
    en: 'Paleo Diet',
  },
  emoji: '🍖',
  isPremium: true,
  duration: 30,
  difficulty: 'medium',

  description: {
    tr: 'Paleo diyet, paleolitik çağ (Taş Devri) atalarımızın beslenmesinden ilham alan, işlenmemiş doğal gıdalara odaklanan bir beslenme yaklaşımıdır. Tahıllar, baklagiller, süt ürünleri ve işlenmiş gıdaları hariç tutarak; et, balık, sebze, meyve, kuruyemiş ve tohumlara dayanır. "Avcı-toplayıcı diyeti" olarak da bilinir.',
    en: 'The paleo diet is a nutritional approach inspired by the eating habits of our Paleolithic (Stone Age) ancestors, focusing on unprocessed natural foods. Excluding grains, legumes, dairy, and processed foods, it is based on meat, fish, vegetables, fruits, nuts, and seeds. Also known as the "hunter-gatherer diet."',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Kısa Vadeli Çalışma Sonuçları:
• Tokluk hormonları (GLP-1, PYY) artışı → Daha az açlık
• Bel çevresi azalması
• Açlık glikozu ve trigliserit düşüşü
• İnsülin duyarlılığında iyileşme

💓 Kardiyovasküler Göstergeler:
• LDL ve toplam kolesterol azalması (bazı çalışmalarda)
• Trigliserit düşüşü
• Kan basıncı iyileşmesi
• İspanya kohort çalışması: Uzun vadeli kalp hastalığı riskinde azalma

🩺 Diyabet Yönetimi:
• Tip 2 diyabet hastalarında glisemik kontrol iyileşmesi
• İnsülin homeostazisinde düzelme
• NOT: 2020 meta-analizi standart sağlıklı diyetlerden üstünlük göstermedi

⚖️ Kilo Kaybı:
• Kısa vadede etkili (haftalar-aylar)
• Besin yoğunluğu yüksek, kalori yoğunluğu düşük yiyeceklerle doğal kalori kısıtlaması
• Potasyum:sodyum oranı artışı
• Nişastasız sebzelerden yüksek lif alımı

⚠️ 2024 Araştırma Uyarısı:
• Fare çalışmasında aşırı protein alımının amonyum üretimine yol açtığı gösterildi
• Uzun süreli yüksek proteinli diyetler karaciğer ve böbrek üzerinde yük oluşturabilir
• Dengeli yaklaşım önerilir

📊 Genel Değerlendirme:
• Faydalar çoğunlukla genel sağlıklı beslenme etkilerinden kaynaklanıyor olabilir
• Akdeniz diyetinden belirgin üstünlük gösterilmemiştir
• İşlenmiş gıdalardan uzaklaşma ana fayda mekanizması`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 Short-Term Study Results:
• Increase in satiety hormones (GLP-1, PYY) → Less hunger
• Waist circumference reduction
• Fasting glucose and triglyceride decrease
• Improvement in insulin sensitivity

💓 Cardiovascular Indicators:
• LDL and total cholesterol decrease (in some studies)
• Triglyceride decrease
• Blood pressure improvement
• Spanish cohort study: Reduced long-term heart disease risk

🩺 Diabetes Management:
• Improved glycemic control in Type 2 diabetes patients
• Improvement in insulin homeostasis
• NOTE: 2020 meta-analysis showed no superiority over standard healthy diets

⚖️ Weight Loss:
• Effective short-term (weeks-months)
• Natural calorie restriction with nutrient-dense, low-calorie-dense foods
• Increased potassium:sodium ratio
• High fiber intake from non-starchy vegetables

⚠️ 2024 Research Warning:
• Mouse study showed excess protein intake leads to ammonium production
• Long-term high-protein diets may burden liver and kidneys
• Balanced approach recommended

📊 Overall Assessment:
• Benefits may mostly stem from general healthy eating effects
• No clear superiority over Mediterranean diet demonstrated
• Moving away from processed foods is main benefit mechanism`,
  },

  benefits: {
    tr: [
      '⚖️ Doğal kalori kısıtlaması ile kilo kaybı',
      '📉 Kan şekeri ve insülin stabilitesi',
      '🍽️ Tokluk süresinin uzaması - protein ve yağ doyurucu',
      '🚫 İşlenmiş gıdalardan tamamen uzaklaşma',
      '💪 Yüksek protein ile kas koruması ve gelişimi',
      '🥬 Yüksek sebze tüketimi ile antioksidan alımı',
      '❤️ Trigliserit ve kan basıncında iyileşme',
      '🧠 Kan şekeri stabilitesi ile zihinsel netlik',
      '🔥 Metabolizma hızlanması',
      '🌿 Doğal, katkısız beslenme',
    ],
    en: [
      '⚖️ Weight loss through natural calorie restriction',
      '📉 Blood sugar and insulin stability',
      '🍽️ Extended satiety - protein and fat are satiating',
      '🚫 Complete elimination of processed foods',
      '💪 Muscle preservation and development with high protein',
      '🥬 Antioxidant intake with high vegetable consumption',
      '❤️ Improvement in triglycerides and blood pressure',
      '🧠 Mental clarity with blood sugar stability',
      '🔥 Metabolism boost',
      '🌿 Natural, additive-free nutrition',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Süt ürünleri hariç tutulduğu için kalsiyum eksikliği riski',
      '🦴 Kemik sağlığı için D vitamini ve kalsiyum takibi yapın',
      '💰 Organik ve kaliteli et pahalı olabilir',
      '🥜 Baklagiller hariç tutulduğu için lif eksikliği olabilir',
      '🏃 Yoğun sporcular için yeterli karbonhidrat sağlamayabilir',
      '🩺 Böbrek hastalığı olanlar protein alımına dikkat etmeli',
      '📅 Uzun vadeli etkileri yeterince araştırılmamıştır',
      '⚖️ Aşırı et tüketimi riskleri göz önünde bulundurulmalı',
    ],
    en: [
      '⚠️ Calcium deficiency risk as dairy is excluded',
      '🦴 Monitor vitamin D and calcium for bone health',
      '💰 Organic and quality meat can be expensive',
      '🥜 May lack fiber as legumes are excluded',
      '🏃 May not provide enough carbs for intense athletes',
      '🩺 Those with kidney disease should watch protein intake',
      '📅 Long-term effects not sufficiently researched',
      '⚖️ Excessive meat consumption risks should be considered',
    ],
  },

  allowedFoods: {
    tr: [
      '🥩 ET VE BALIK:',
      '🥩 Otla beslenen sığır eti',
      '🐑 Kuzu ve koyun eti',
      '🍗 Tavuk, hindi, ördek',
      '🐟 Yabani yakalanmış balık (somon, uskumru, sardalya)',
      '🦐 Deniz ürünleri',
      '',
      '🥚 DİĞER PROTEİN KAYNAKLARI:',
      '🥚 Serbest gezen tavuk yumurtası',
      '🦴 Organ etleri (karaciğer, kalp)',
      '',
      '🥬 SEBZELER (Nişastasız):',
      '🥬 Tüm yeşil yapraklılar',
      '🥦 Brokoli, karnabahar, lahana',
      '🥒 Salatalık, kabak, patlıcan, biber',
      '🧅 Soğan, sarımsak',
      '🍄 Mantar',
      '',
      '🍎 MEYVELER:',
      '🫐 Çilek, böğürtlen, yaban mersini',
      '🍎 Elma, armut, şeftali',
      '🍊 Narenciye (ölçülü)',
      '',
      '🥜 KURUYEMIŞ VE TOHUMLAR:',
      '🥜 Badem, ceviz, fındık',
      '🌰 Kaju (ölçülü)',
      '🌻 Bal kabağı, ayçekirdeği',
      '',
      '🫒 SAĞLIKLI YAĞLAR:',
      '🫒 Zeytinyağı, hindistan cevizi yağı',
      '🥑 Avokado yağı',
      '🐄 Çimende yetişmiş hayvan yağı (tallow)',
    ],
    en: [
      '🥩 MEAT AND FISH:',
      '🥩 Grass-fed beef',
      '🐑 Lamb and mutton',
      '🍗 Chicken, turkey, duck',
      '🐟 Wild-caught fish (salmon, mackerel, sardines)',
      '🦐 Seafood',
      '',
      '🥚 OTHER PROTEIN SOURCES:',
      '🥚 Free-range eggs',
      '🦴 Organ meats (liver, heart)',
      '',
      '🥬 VEGETABLES (Non-starchy):',
      '🥬 All leafy greens',
      '🥦 Broccoli, cauliflower, cabbage',
      '🥒 Cucumber, zucchini, eggplant, peppers',
      '🧅 Onion, garlic',
      '🍄 Mushrooms',
      '',
      '🍎 FRUITS:',
      '🫐 Strawberries, blackberries, blueberries',
      '🍎 Apples, pears, peaches',
      '🍊 Citrus (moderate)',
      '',
      '🥜 NUTS AND SEEDS:',
      '🥜 Almonds, walnuts, hazelnuts',
      '🌰 Cashews (moderate)',
      '🌻 Pumpkin, sunflower seeds',
      '',
      '🫒 HEALTHY FATS:',
      '🫒 Olive oil, coconut oil',
      '🥑 Avocado oil',
      '🐄 Grass-fed animal fat (tallow)',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🌾 TAHILLAR (HEPSİ):',
      '🌾 Buğday, arpa, yulaf, çavdar',
      '🍚 Pirinç, mısır, kinoa',
      '🍞 Ekmek, makarna, gevrekler',
      '',
      '🫘 BAKLAGİLLER:',
      '🫘 Fasulye, nohut, mercimek',
      '🥜 Yer fıstığı (aslında baklagil)',
      '🫛 Soya ve soya ürünleri',
      '',
      '🥛 SÜT ÜRÜNLERİ:',
      '🥛 Süt, yoğurt',
      '🧀 Peynir, tereyağı',
      '🍦 Dondurma, krema',
      '',
      '🍬 İŞLENMİŞ GIDALAR:',
      '🍬 Rafine şeker',
      '🍟 Kızartmalar, fast food',
      '🥫 Paketli, konserve gıdalar',
      '🧂 Sofra tuzu (fazla)',
      '🌻 Bitkisel sıvı yağlar (ayçiçek, mısır, soya)',
    ],
    en: [
      '🌾 GRAINS (ALL):',
      '🌾 Wheat, barley, oats, rye',
      '🍚 Rice, corn, quinoa',
      '🍞 Bread, pasta, cereals',
      '',
      '🫘 LEGUMES:',
      '🫘 Beans, chickpeas, lentils',
      '🥜 Peanuts (actually a legume)',
      '🫛 Soy and soy products',
      '',
      '🥛 DAIRY PRODUCTS:',
      '🥛 Milk, yogurt',
      '🧀 Cheese, butter',
      '🍦 Ice cream, cream',
      '',
      '🍬 PROCESSED FOODS:',
      '🍬 Refined sugar',
      '🍟 Fried foods, fast food',
      '🥫 Packaged, canned foods',
      '🧂 Table salt (excess)',
      '🌻 Vegetable oils (sunflower, corn, soy)',
    ],
  },

  exercises: [
    {
      name: 'Fonksiyonel Antrenman / Functional Training',
      duration: '30-45 dakika / 30-45 minutes',
      frequency: 'Haftada 3-4 kez / 3-4 times per week',
      note: 'Paleo felsefesiyle uyumlu: tırmanma, taşıma, kaldırma hareketleri.',
    },
    {
      name: 'Sprint / Sprinting',
      duration: '15-20 dakika / minutes',
      frequency: 'Haftada 2 kez / 2 times per week',
      note: 'Avcı-toplayıcı atalarımızın yaptığı gibi kısa yoğun koşular.',
    },
    {
      name: 'Yürüyüş / Walking',
      duration: '30-60 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Doğada yürüyüş, mümkünse engebeli arazide.',
    },
    {
      name: 'Ağırlık Kaldırma / Weight Lifting',
      duration: '40-50 dakika / minutes',
      frequency: 'Haftada 3 kez / 3 times per week',
      note: 'Compound hareketler: squat, deadlift, bench press.',
    },
    {
      name: 'Yüzme veya Kano',
      duration: '30 dakika / 30 minutes',
      frequency: 'Haftada 1-2 kez / 1-2 times per week',
      note: 'Doğal hareket paternleri.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Avcı-Toplayıcı Başlangıcı 🏹',
      totalCalories: 1900,
      note: 'Paleolitik yolculuğunuz başlıyor! İşlenmemiş, doğal gıdalara hoş geldiniz.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 520,
          foods: [
            { name: 'Sebzeli omlet (3 yumurta)', portion: '250g', calories: 350, note: 'Mantar, ıspanak, soğan' },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Taze meyveler', portion: '100g', calories: 50, note: 'Çilek, yaban mersini' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '200g', calories: 330 },
            { name: 'Karışık sebze salatası', portion: '200g', calories: 100, note: 'Roka, domates, salatalık' },
            { name: 'Zeytinyağı', portion: '2 yemek kaşığı', calories: 180 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Yabani somon (fırında)', portion: '180g', calories: 370 },
            { name: 'Kuşkonmaz (ızgara)', portion: '150g', calories: 60 },
            { name: 'Tatlı patates', portion: '100g', calories: 90, note: 'Paleo-dostu nişasta' },
            { name: 'Limonlu zeytinyağı sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'Badem', portion: '25g', calories: 145 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Av Günü',
      totalCalories: 1950,
      note: 'Bugün protein ağırlıklı. Atalarımız gibi güçlü olun!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '3 adet', calories: 210 },
            { name: 'Somon füme', portion: '60g', calories: 120 },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 700,
          foods: [
            { name: 'Dana bonfile (ızgara)', portion: '200g', calories: 500 },
            { name: 'Izgara sebze', portion: '200g', calories: 100, note: 'Kabak, patlıcan, biber' },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Yeşil salata', portion: '80g', calories: 30 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Tavuk but (fırında)', portion: '200g', calories: 400 },
            { name: 'Karnabahar püresi', portion: '150g', calories: 80, note: 'Patates yerine' },
            { name: 'Brokoli', portion: '100g', calories: 35 },
            { name: 'Sarımsak', portion: '2 diş', calories: 10 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Kavrulmuş fındık', portion: '30g', calories: 190 },
            { name: 'Çilek', portion: '50g', calories: 20 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Deniz Avı',
      totalCalories: 1850,
      note: 'Omega-3 zengin deniz ürünleri günü.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Ton balıklı omlet', portion: '3 yumurta + 60g ton', calories: 350 },
            { name: 'Ispanak', portion: '50g', calories: 15, note: 'Sote' },
            { name: 'Zeytin', portion: '8 adet', calories: 45 },
            { name: 'Kahve', portion: '1 fincan', calories: 5, note: 'Sade veya hindistan cevizi sütü ile' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Karides sote', portion: '200g', calories: 280, note: 'Sarımsaklı, zeytinyağlı' },
            { name: 'Kabak şeritleri', portion: '150g', calories: 50, note: 'Makarna yerine' },
            { name: 'Kiraz domates', portion: '100g', calories: 20 },
            { name: 'Zeytinyağı', portion: '2 yemek kaşığı', calories: 180 },
            { name: 'Taze fesleğen', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Levrek (ızgara)', portion: '200g', calories: 320 },
            { name: 'Ispanak salatası', portion: '150g', calories: 80, note: 'Avokado, ceviz ile' },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Ceviz', portion: '15g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Guacamole', portion: '80g', calories: 150 },
            { name: 'Havuç ve kereviz', portion: '80g', calories: 35 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Toplayıcı Günü',
      totalCalories: 1800,
      note: 'Bugün sebze ve meyve ağırlıklı - vitaminler ve antioksidanlar!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Meyve tabağı', portion: '200g', calories: 100, note: 'Mevsim meyveleri' },
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Karışık kuruyemiş', portion: '30g', calories: 180 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Tavuk salatası', portion: '300g', calories: 400, note: 'Tavuk, roka, domates, salatalık' },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Bal kabağı çekirdeği', portion: '15g', calories: 85 },
            { name: 'Limonlu zeytinyağı sos', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 580,
          foods: [
            { name: 'Kuzu pirzola', portion: '180g', calories: 450 },
            { name: 'Izgara sebze', portion: '200g', calories: 80, note: 'Kabak, patlıcan, biber' },
            { name: 'Roka', portion: '50g', calories: 15 },
            { name: 'Nar ekşisi', portion: '1 tatlı kaşığı', calories: 15 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Elmav', portion: '1 orta boy', calories: 80 },
            { name: 'Badem ezmesi', portion: '1 yemek kaşığı', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Enerji Günü',
      totalCalories: 1900,
      note: 'Tatlı patates ve meyve ile doğal karbonhidratlar.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 500,
          foods: [
            { name: 'Tatlı patatesli hash', portion: '200g', calories: 250, note: 'Yumurta ve sebze ile' },
            { name: 'Yumurta', portion: '2 adet', calories: 140 },
            { name: 'Pastırma (organik)', portion: '40g', calories: 100 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 650,
          foods: [
            { name: 'Etli sebze güveç', portion: '300g', calories: 450, note: 'Dana eti, kabak, biber, domates' },
            { name: 'Tatlı patates', portion: '150g', calories: 130 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Hindi göğsü', portion: '200g', calories: 320 },
            { name: 'Mantar sote', portion: '150g', calories: 80 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Muz', portion: '1 orta', calories: 100 },
            { name: 'Fındık', portion: '15g', calories: 95 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Kırmızı Et Ziyafeti',
      totalCalories: 1950,
      note: 'Demir ve B12 deposu kırmızı etler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 480,
          foods: [
            { name: 'Dana kıymalı omlet', portion: '200g', calories: 380, note: 'Soğan ve biber ile' },
            { name: 'Avokado', portion: '1/2 adet', calories: 120 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 700,
          foods: [
            { name: 'Kuzu şiş', portion: '200g', calories: 480 },
            { name: 'Izgara sebze', portion: '200g', calories: 100 },
            { name: 'Soğan salatası', portion: '80g', calories: 30 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 570,
          foods: [
            { name: 'Antrikot (ızgara)', portion: '180g', calories: 420 },
            { name: 'Brokoli', portion: '150g', calories: 55 },
            { name: 'Sarımsak', portion: '2 diş', calories: 10 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 200,
          foods: [
            { name: 'Macadamia fıstığı', portion: '25g', calories: 180 },
            { name: 'Çilek', portion: '50g', calories: 20 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - Ziyafet Günü! 🎉',
      totalCalories: 2000,
      note: 'İlk haftayı tamamladınız! Paleo yemeklerin en lezzetlileri ile kutlayın.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Özel)',
          totalCalories: 550,
          foods: [
            { name: 'Paleo pancake (muz-yumurta)', portion: '3 adet', calories: 280, note: 'Muz + yumurta + badem unu' },
            { name: 'Yaban mersini', portion: '80g', calories: 40 },
            { name: 'Bal', portion: '1 tatlı kaşığı', calories: 40, note: 'Ham bal (tartışmalı)' },
            { name: 'Pastırma', portion: '50g', calories: 130 },
            { name: 'Kahve', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 700,
          foods: [
            { name: 'T-bone steak', portion: '250g', calories: 550, note: 'Çimende yetişmiş sığır' },
            { name: 'Tatlı patates fırın', portion: '150g', calories: 130 },
            { name: 'Karışık salata', portion: '100g', calories: 50 },
            { name: 'Nar', portion: '50g', calories: 40 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Karides kokteyli', portion: '150g', calories: 150 },
            { name: 'Fırında somon', portion: '150g', calories: 310 },
            { name: 'Kuşkonmaz', portion: '100g', calories: 40 },
            { name: 'Limonlu zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Tatlı',
          totalCalories: 200,
          foods: [
            { name: 'Meyveli "nice cream"', portion: '150g', calories: 150, note: 'Dondurulmuş muz bazlı' },
            { name: 'Bitter çikolata', portion: '15g', calories: 80, note: '%85+ kakao, şekersiz' },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 BEKLENEN SONUÇLAR (30 Günde)

⚖️ Kilo Kaybı:
• İlk hafta: 2-3 kg
• 2-4. hafta: Haftada 0.5-1 kg
• Toplam: 4-6 kg kayıp beklenir

📏 Vücut Değişimleri:
• Bel çevresi: 4-8 cm azalma
• Kas tonusu: Korunur veya artar
• Şişkinlik: Belirgin azalma

🔬 Kan Değerleri:
• Trigliserit: %20-30 düşüş
• Açlık kan şekeri: %10-15 düşüş
• İnsülin: Belirgin düşüş
• HDL kolesterol: Artış

⚡ Enerji ve Performans:
• İlk 3-5 gün: Adaptasyon dönemi
• 1-2. hafta: Enerji artışı
• 3-4. hafta: Stabil, yüksek enerji

🧠 Zihinsel Değişimler:
• Kan şekeri stabilitesi ile zihinsel netlik
• Daha iyi odaklanma
• Uyku kalitesi iyileşmesi

🍽️ Yeme Alışkanlıkları:
• İşlenmiş gıda isteğinde azalma
• Gerçek yiyecek sevgisi
• Porsiyon farkındalığı

⚠️ Dikkat:
• Kalsiyum ve D vitamini takibi yapın
• Uzun vadede besin çeşitliliğine dikkat
• Aşırı protein alımından kaçının`,

    en: `📊 EXPECTED RESULTS (In 30 Days)

⚖️ Weight Loss:
• First week: 2-3 kg
• Weeks 2-4: 0.5-1 kg per week
• Total: 4-6 kg loss expected

📏 Body Changes:
• Waist circumference: 4-8 cm reduction
• Muscle tone: Preserved or increased
• Bloating: Significant reduction

🔬 Blood Values:
• Triglycerides: 20-30% decrease
• Fasting blood sugar: 10-15% decrease
• Insulin: Significant decrease
• HDL cholesterol: Increase

⚡ Energy and Performance:
• First 3-5 days: Adaptation period
• Weeks 1-2: Energy increase
• Weeks 3-4: Stable, high energy

🧠 Mental Changes:
• Mental clarity with blood sugar stability
• Better focus
• Improved sleep quality

🍽️ Eating Habits:
• Reduced processed food cravings
• Love for real food
• Portion awareness

⚠️ Attention:
• Monitor calcium and vitamin D
• Pay attention to food variety long-term
• Avoid excessive protein intake`,
  },
};
