import { Diet } from '../types';

export const lowGiDiet30: Diet = {
  id: 'low-gi',
  name: {
    tr: 'Düşük Glisemik İndeks Diyeti',
    en: 'Low Glycemic Index Diet',
  },
  emoji: '📊',
  isPremium: true,
  duration: 30,
  difficulty: 'medium',

  description: {
    tr: 'Düşük Glisemik İndeks (GI) Diyeti, kan şekerini yavaş yükselten besinleri tercih ederek sürdürülebilir kilo kaybı ve enerji dengesini hedefler. Bu bilimsel yaklaşım, insülin direncini azaltır, yağ depolanmasını önler ve uzun süreli tokluk sağlar. Diyabet riski olanlar ve kararlı enerji isteyenler için idealdir.',
    en: 'The Low Glycemic Index (GI) Diet targets sustainable weight loss and energy balance by choosing foods that raise blood sugar slowly. This scientific approach reduces insulin resistance, prevents fat storage, and provides long-lasting satiety. Ideal for those at risk of diabetes and those wanting stable energy.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Glisemik İndeks Nedir?
• GI ≤55: Düşük (tercih edilmeli)
• GI 56-69: Orta (ölçülü tüketim)
• GI ≥70: Yüksek (kaçınılmalı)
• Glisemik Yük (GL) = GI x Karbonhidrat miktarı / 100

🔬 Bilimsel Kanıtlar:
• Cochrane meta-analizi: Düşük GI ile %20 daha fazla kilo kaybı
• İnsülin duyarlılığında %25 artış
• Açlık hormonu ghrelin seviyesinde düşüş
• Tokluk hormonu GLP-1 artışı

💪 Metabolik Faydalar:
• Yağ depolanması azalır (düşük insülin)
• Kas kütlesi korunur
• Enerji seviyeleri stabilize olur
• Karbonhidrat isteği azalır

📈 Harvard & Sydney Üniversitesi Bulguları:
• Tip 2 diyabet riskinde %30 azalma
• Kardiyovasküler hastalık riskinde düşüş
• Daha iyi kolesterol profili
• Uzun vadede sürdürülebilir sonuçlar

⚠️ Önemli:
• GI tek başına yeterli değil, GL'ye de bakın
• Porsiyon kontrolü hala önemli`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 What is Glycemic Index?
• GI ≤55: Low (preferred)
• GI 56-69: Medium (moderate consumption)
• GI ≥70: High (should be avoided)
• Glycemic Load (GL) = GI x Carbohydrate amount / 100

🔬 Scientific Evidence:
• Cochrane meta-analysis: 20% more weight loss with low GI
• 25% increase in insulin sensitivity
• Decrease in hunger hormone ghrelin levels
• Increase in satiety hormone GLP-1

💪 Metabolic Benefits:
• Reduced fat storage (low insulin)
• Muscle mass preserved
• Energy levels stabilized
• Reduced carbohydrate cravings

📈 Harvard & Sydney University Findings:
• 30% reduction in Type 2 diabetes risk
• Reduced cardiovascular disease risk
• Better cholesterol profile
• Sustainable long-term results

⚠️ Important:
• GI alone is not enough, also check GL
• Portion control is still important`,
  },

  benefits: {
    tr: [
      '📊 Kan şekeri dengesini sağlar',
      '⚖️ Sürdürülebilir kilo kaybı',
      '💪 Kas kütlesini korur',
      '🔋 Stabil enerji seviyeleri',
      '🧠 Daha iyi odaklanma ve konsantrasyon',
      '😋 Uzun süreli tokluk hissi',
      '❤️ Kalp sağlığını destekler',
      '🩺 Diyabet riskini azaltır',
      '😴 Uyku kalitesini iyileştirir',
      '🍬 Şeker isteğini azaltır',
    ],
    en: [
      '📊 Maintains blood sugar balance',
      '⚖️ Sustainable weight loss',
      '💪 Preserves muscle mass',
      '🔋 Stable energy levels',
      '🧠 Better focus and concentration',
      '😋 Long-lasting satiety',
      '❤️ Supports heart health',
      '🩺 Reduces diabetes risk',
      '😴 Improves sleep quality',
      '🍬 Reduces sugar cravings',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Diyabet hastaları doktora danışmalı',
      '📏 GI tek başına kalori değildir, porsiyon önemli',
      '🥜 Bazı düşük GI besinler yüksek kalorili olabilir',
      '🍌 Olgun meyveler daha yüksek GI\'ye sahip',
      '🍳 Pişirme yöntemi GI\'yi değiştirebilir',
      '⏰ İlk hafta enerji düşüklüğü yaşanabilir',
    ],
    en: [
      '⚠️ Diabetics should consult a doctor',
      '📏 GI alone is not calories, portions matter',
      '🥜 Some low GI foods may be high in calories',
      '🍌 Ripe fruits have higher GI',
      '🍳 Cooking method can change GI',
      '⏰ Energy drop may occur in the first week',
    ],
  },

  allowedFoods: {
    tr: [
      '🥬 DÜŞÜK GI SEBZELER (GI <15):',
      '🥬 Ispanak, marul, roka, lahana',
      '🥦 Brokoli, karnabahar, kuşkonmaz',
      '🥒 Salatalık, kabak, patlıcan',
      '🍅 Domates, biber, mantar',
      '',
      '🍎 DÜŞÜK GI MEYVELER (GI 20-50):',
      '🍎 Elma (GI: 36)',
      '🍐 Armut (GI: 38)',
      '🍊 Portakal (GI: 43)',
      '🫐 Yaban mersini, çilek (GI: 25-40)',
      '🍒 Kiraz, erik (GI: 22-39)',
      '',
      '🌾 DÜŞÜK GI TAHİLLAR (GI 40-55):',
      '🌾 Yulaf (GI: 55)',
      '🌾 Bulgur (GI: 48)',
      '🍚 Esmer pirinç (GI: 50)',
      '🌾 Kinoa (GI: 53)',
      '🍞 Tam buğday ekmeği (GI: 51)',
      '',
      '🥛 PROTEİNLER (GI: 0):',
      '🐟 Balık, tavuk, hindi',
      '🥚 Yumurta',
      '🥛 Süt ürünleri',
      '🫘 Mercimek (GI: 32), nohut (GI: 28)',
    ],
    en: [
      '🥬 LOW GI VEGETABLES (GI <15):',
      '🥬 Spinach, lettuce, arugula, cabbage',
      '🥦 Broccoli, cauliflower, asparagus',
      '🥒 Cucumber, zucchini, eggplant',
      '🍅 Tomatoes, peppers, mushrooms',
      '',
      '🍎 LOW GI FRUITS (GI 20-50):',
      '🍎 Apple (GI: 36)',
      '🍐 Pear (GI: 38)',
      '🍊 Orange (GI: 43)',
      '🫐 Blueberries, strawberries (GI: 25-40)',
      '🍒 Cherries, plums (GI: 22-39)',
      '',
      '🌾 LOW GI GRAINS (GI 40-55):',
      '🌾 Oats (GI: 55)',
      '🌾 Bulgur (GI: 48)',
      '🍚 Brown rice (GI: 50)',
      '🌾 Quinoa (GI: 53)',
      '🍞 Whole wheat bread (GI: 51)',
      '',
      '🥛 PROTEINS (GI: 0):',
      '🐟 Fish, chicken, turkey',
      '🥚 Eggs',
      '🥛 Dairy products',
      '🫘 Lentils (GI: 32), chickpeas (GI: 28)',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🚫 YÜKSEK GI BESİNLER (GI >70):',
      '🍞 Beyaz ekmek (GI: 75)',
      '🍚 Beyaz pirinç (GI: 73)',
      '🥔 Haşlanmış patates (GI: 78)',
      '🥣 Mısır gevreği (GI: 81)',
      '',
      '🍬 ŞEKER VE TATLILAR:',
      '🍬 Şeker, bal, reçel',
      '🍰 Pasta, kek, bisküvi',
      '🍫 Şekerli çikolata',
      '🥤 Gazlı içecekler, meyve suları',
      '',
      '🍟 İŞLENMİŞ GIDALAR:',
      '🍟 Cips, kraker',
      '🌭 Fast food',
      '🥐 Beyaz un ürünleri',
      '🍩 Hamur işleri',
    ],
    en: [
      '🚫 HIGH GI FOODS (GI >70):',
      '🍞 White bread (GI: 75)',
      '🍚 White rice (GI: 73)',
      '🥔 Boiled potato (GI: 78)',
      '🥣 Corn flakes (GI: 81)',
      '',
      '🍬 SUGAR AND SWEETS:',
      '🍬 Sugar, honey, jam',
      '🍰 Cake, pastry, cookies',
      '🍫 Sugary chocolate',
      '🥤 Sodas, fruit juices',
      '',
      '🍟 PROCESSED FOODS:',
      '🍟 Chips, crackers',
      '🌭 Fast food',
      '🥐 White flour products',
      '🍩 Pastries',
    ],
  },

  exercises: [
    {
      name: 'Yürüyüş / Walking',
      duration: '30-45 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Kan şekeri dengesini destekler.',
    },
    {
      name: 'Direnç Antrenmanı / Resistance Training',
      duration: '30-40 dakika / minutes',
      frequency: 'Haftada 3 kez / 3 times a week',
      note: 'İnsülin duyarlılığını artırır.',
    },
    {
      name: 'Yüzme / Swimming',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Düşük etkili kardio.',
    },
    {
      name: 'Yoga / Yoga',
      duration: '30 dakika / minutes',
      frequency: 'Haftada 3 kez / 3 times a week',
      note: 'Stres hormonu kortizolü düşürür.',
    },
    {
      name: 'Bisiklet / Cycling',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 3 kez / 3 times a week',
      note: 'Metabolizmayı hızlandırır.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Düşük GI Yolculuğu Başlıyor 📊',
      totalCalories: 1650,
      note: 'Hedef: GI 55 altında tutmak!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Yulaf ezmesi (GI:55)', portion: '50g', calories: 180 },
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
            { name: 'Yağsız süt', portion: '150ml', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Bulgur pilavı (GI:48)', portion: '100g', calories: 120 },
            { name: 'Karışık yeşil salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa (GI:53)', portion: '60g', calories: 70 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut (GI:38)', portion: '1 orta', calories: 100 },
            { name: 'Yoğurt (az yağlı)', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Havuç çubukları', portion: '100g', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Baklagil Günü 🫘',
      totalCalories: 1600,
      note: 'Düşük GI baklagiller ile protein ve lif.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 380,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday ekmeği (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Mercimek çorbası (GI:32)', portion: '300ml', calories: 200 },
            { name: 'Izgara tavuk', portion: '100g', calories: 165 },
            { name: 'Yeşil salata', portion: '200g', calories: 50 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Nohut yemeği (GI:28)', portion: '200g', calories: 280 },
            { name: 'Esmer pirinç (GI:50)', portion: '80g', calories: 90 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Yeşil biber', portion: '2 adet', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Portakal (GI:43)', portion: '1 orta', calories: 60 },
            { name: 'Lor peyniri', portion: '80g', calories: 80 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Çilek (GI:40)', portion: '100g', calories: 35 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Deniz Ürünleri Günü 🐟',
      totalCalories: 1650,
      note: 'Protein GI:0 - en düşük glisemik etki!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Yulaf lapası (GI:55)', portion: '50g', calories: 180 },
            { name: 'Yaban mersini (GI:25)', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Ton balıklı salata', portion: '250g', calories: 300, note: 'Suda ton, yeşillik' },
            { name: 'Bulgur (GI:48)', portion: '80g', calories: 100 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Izgara levrek', portion: '180g', calories: 250 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Kinoa (GI:53)', portion: '50g', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Havuç', portion: '100g', calories: 40 },
            { name: 'Fındık', portion: '10 adet', calories: 65 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Lif Zenginliği 🌾',
      totalCalories: 1620,
      note: 'Lif kan şekeri emilimini yavaşlatır.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 390,
          foods: [
            { name: 'Kepekli müsli (GI:50)', portion: '50g', calories: 180 },
            { name: 'Yağsız süt', portion: '200ml', calories: 75 },
            { name: 'Çilek (GI:40)', portion: '100g', calories: 35 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '150g', calories: 250 },
            { name: 'Mercimek salatası (GI:32)', portion: '150g', calories: 180 },
            { name: 'Marul', portion: '100g', calories: 15 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 430,
          foods: [
            { name: 'Fırında hindi göğsü', portion: '150g', calories: 250 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Haşlanmış fasulye (GI:29)', portion: '100g', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut (GI:38)', portion: '1 orta', calories: 100 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Enerji Dengeleme ⚖️',
      totalCalories: 1650,
      note: 'Stabil kan şekeri = stabil enerji.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara somon', portion: '150g', calories: 280 },
            { name: 'Kinoa salatası (GI:53)', portion: '150g', calories: 180 },
            { name: 'Yeşil yapraklar', portion: '80g', calories: 20 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Bulgur pilavı (GI:48)', portion: '100g', calories: 120 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Yeşil biber', portion: '2 adet', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Portakal (GI:43)', portion: '1 orta', calories: 60 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Bitkisel Protein 🌿',
      totalCalories: 1600,
      note: 'Baklagiller ile düşük GI protein.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 380,
          foods: [
            { name: 'Yulaf ezmesi (GI:55)', portion: '50g', calories: 180 },
            { name: 'Elma (GI:36)', portion: '1 küçük', calories: 75 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 490,
          foods: [
            { name: 'Nohutlu tavuk', portion: '250g', calories: 350, note: 'Nohut GI:28' },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Bulgur (GI:48)', portion: '80g', calories: 100 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 430,
          foods: [
            { name: 'Mercimek köftesi (GI:32)', portion: '6 adet', calories: 250 },
            { name: 'Cacık', portion: '150g', calories: 80 },
            { name: 'Marul', portion: '100g', calories: 15 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kiraz (GI:22)', portion: '150g', calories: 75 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Havuç', portion: '100g', calories: 40 },
            { name: 'Fındık', portion: '12 adet', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - İlk Hafta Başarısı! 🎉',
      totalCalories: 1700,
      note: 'Bir haftayı başarıyla tamamladınız!',
      meals: [
        {
          type: 'breakfast',
          name: 'Hafta Sonu Kahvaltısı',
          totalCalories: 420,
          foods: [
            { name: 'Menemen', portion: '2 yumurta', calories: 220 },
            { name: 'Tam buğday ekmek (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Izgara kuzu pirzola', portion: '120g', calories: 280 },
            { name: 'Bulgur pilavı (GI:48)', portion: '120g', calories: 150 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında çipura', portion: '180g', calories: 250 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Kinoa (GI:53)', portion: '50g', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı (düşük GI)', portion: '200g', calories: 100 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 8,
      title: 'Gün 8 - Yeni Hafta Enerjisi 🚀',
      totalCalories: 1650,
      note: 'İkinci hafta başladı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Yulaf ezmesi (GI:55)', portion: '50g', calories: 180 },
            { name: 'Çilek (GI:40)', portion: '100g', calories: 35 },
            { name: 'Muz (GI:51) - yarım', portion: '1/2 adet', calories: 50 },
            { name: 'Yağsız süt', portion: '200ml', calories: 75 },
            { name: 'Badem', portion: '8 adet', calories: 55 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '150g', calories: 250 },
            { name: 'Mercimek çorbası (GI:32)', portion: '200ml', calories: 140 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Esmer pirinç (GI:50)', portion: '70g', calories: 80 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut (GI:38)', portion: '1 orta', calories: 100 },
            { name: 'Lor peyniri', portion: '80g', calories: 80 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Havuç', portion: '100g', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 9,
      title: 'Gün 9 - Protein Günü 💪',
      totalCalories: 1680,
      note: 'Protein GI:0 - kan şekerine etkisi minimum.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '3 adet', calories: 210 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 510,
          foods: [
            { name: 'Izgara dana biftek', portion: '150g', calories: 320 },
            { name: 'Bulgur (GI:48)', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı', portion: '1/2 yemek kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Tavuk göğsü (fırın)', portion: '180g', calories: 300 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 10,
      title: 'Gün 10 - 10 Gün Başarısı! 🌟',
      totalCalories: 1650,
      note: '10 günü tamamladınız! Enerji seviyeniz stabilize oluyor.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Yulaf + yoğurt bowl', portion: '250g', calories: 250 },
            { name: 'Yaban mersini (GI:25)', portion: '100g', calories: 60 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Ton balıklı wrap', portion: '1 adet', calories: 350, note: 'Tam buğday lavaş' },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında levrek', portion: '180g', calories: 250 },
            { name: 'Kinoa (GI:53)', portion: '80g', calories: 100 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Buharda havuç', portion: '100g', calories: 40 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Portakal (GI:43)', portion: '1 orta', calories: 60 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 11,
      title: 'Gün 11 - Akdeniz Esintisi 🌊',
      totalCalories: 1650,
      note: 'Akdeniz mutfağı düşük GI ile uyumlu.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Beyaz peynir (az yağlı)', portion: '50g', calories: 80 },
            { name: 'Zeytin', portion: '8 adet', calories: 40 },
            { name: 'Tam buğday ekmek (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara çipura', portion: '180g', calories: 250 },
            { name: 'Bulgur pilavı (GI:48)', portion: '100g', calories: 120 },
            { name: 'Çoban salata', portion: '150g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Nohut salatası (GI:28)', portion: '150g', calories: 150 },
            { name: 'Roka', portion: '80g', calories: 20 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 12,
      title: 'Gün 12 - Omega-3 Takviyesi 🐟',
      totalCalories: 1680,
      note: 'Omega-3 insülin duyarlılığını artırır.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Füme somon', portion: '60g', calories: 120 },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 510,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 350 },
            { name: 'Kinoa salatası (GI:53)', portion: '120g', calories: 140 },
            { name: 'Yeşil yapraklar', portion: '80g', calories: 20 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Uskumru (fırın)', portion: '150g', calories: 280 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Esmer pirinç (GI:50)', portion: '70g', calories: 80 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut (GI:38)', portion: '1 orta', calories: 100 },
            { name: 'Ceviz', portion: '8 adet', calories: 160 },
            { name: 'Havuç', portion: '100g', calories: 40 },
          ],
        },
      ],
    },
    {
      day: 13,
      title: 'Gün 13 - Antioksidan Günü 🫐',
      totalCalories: 1620,
      note: 'Düşük GI meyveler ile antioksidan.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 380,
          foods: [
            { name: 'Smoothie bowl', portion: '300g', calories: 220, note: 'Yaban mersini, çilek, yoğurt' },
            { name: 'Yulaf', portion: '30g', calories: 110 },
            { name: 'Badem', portion: '7 adet', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '150g', calories: 250 },
            { name: 'Bulgur (GI:48)', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Fırında balık', portion: '160g', calories: 220 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Ispanak', portion: '100g', calories: 25 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Kiraz (GI:22)', portion: '150g', calories: 75 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Fındık', portion: '15 adet', calories: 100 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 14,
      title: 'Gün 14 - 2 Hafta Başarısı! 🏆',
      totalCalories: 1700,
      note: 'Yarı yoldayız! Kan şekeriniz stabil!',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Izgara kuzu pirzola', portion: '120g', calories: 280 },
            { name: 'Nohut salatası (GI:28)', portion: '150g', calories: 150 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Zeytinyağı-limon', portion: '1 tatlı kaşığı', calories: 55 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Kinoa (GI:53)', portion: '80g', calories: 100 },
            { name: 'Brokoli', portion: '150g', calories: 50 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı (düşük GI)', portion: '200g', calories: 100 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
          ],
        },
      ],
    },
    {
      day: 15,
      title: 'Gün 15 - Üçüncü Hafta Başlangıcı 🚀',
      totalCalories: 1650,
      note: 'Yarıyı geçtiniz! Şeker isteği azalıyor.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Yulaf ezmesi (GI:55)', portion: '50g', calories: 180 },
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Bulgur pilavı (GI:48)', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında levrek', portion: '180g', calories: 250 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Esmer pirinç (GI:50)', portion: '80g', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut (GI:38)', portion: '1 orta', calories: 100 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Havuç', portion: '50g', calories: 20 },
          ],
        },
      ],
    },
    {
      day: 16,
      title: 'Gün 16 - Dengeli Gün ⚖️',
      totalCalories: 1650,
      note: 'Makro besinler dengede.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Lor peyniri', portion: '50g', calories: 50 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Ton balıklı salata', portion: '250g', calories: 300 },
            { name: 'Mercimek çorbası (GI:32)', portion: '200ml', calories: 140 },
            { name: 'Tam buğday ekmek', portion: '1/2 dilim', calories: 40 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Tavuk göğsü (fırın)', portion: '180g', calories: 300 },
            { name: 'Nohut haşlama (GI:28)', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Portakal (GI:43)', portion: '1 orta', calories: 60 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 17,
      title: 'Gün 17 - Lif Zenginliği 🌾',
      totalCalories: 1620,
      note: 'Lif GI\'yi düşürür.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 380,
          foods: [
            { name: 'Kepekli müsli (GI:50)', portion: '50g', calories: 180 },
            { name: 'Yağsız süt', portion: '200ml', calories: 75 },
            { name: 'Çilek (GI:40)', portion: '100g', calories: 35 },
            { name: 'Chia tohumu', portion: '1 yemek kaşığı', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara hindi göğsü', portion: '150g', calories: 250 },
            { name: 'Fasulye yemeği (GI:29)', portion: '150g', calories: 180 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 440,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa (GI:53)', portion: '60g', calories: 70 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Havuç', portion: '50g', calories: 20 },
          ],
        },
      ],
    },
    {
      day: 18,
      title: 'Gün 18 - Bitkisel Güç 🌿',
      totalCalories: 1650,
      note: 'Baklagiller = düşük GI + yüksek protein.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Humus', portion: '60g', calories: 120, note: 'Nohut bazlı, GI düşük' },
            { name: 'Tam buğday pide (GI:51)', portion: '1/2 adet', calories: 130 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Mercimek köftesi (GI:32)', portion: '8 adet', calories: 330 },
            { name: 'Cacık', portion: '150g', calories: 80 },
            { name: 'Marul', portion: '100g', calories: 15 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '150g', calories: 250 },
            { name: 'Nohut salatası (GI:28)', portion: '150g', calories: 150 },
            { name: 'Yeşil yapraklar', portion: '80g', calories: 20 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut (GI:38)', portion: '1 orta', calories: 100 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 19,
      title: 'Gün 19 - Deniz Günü 🐟',
      totalCalories: 1680,
      note: 'Balık = 0 GI + Omega-3.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Yulaf ezmesi (GI:55)', portion: '50g', calories: 180 },
            { name: 'Yaban mersini (GI:25)', portion: '100g', calories: 60 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 510,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 350 },
            { name: 'Bulgur pilavı (GI:48)', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında çipura', portion: '200g', calories: 280 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Esmer pirinç (GI:50)', portion: '60g', calories: 70 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Portakal (GI:43)', portion: '1 orta', calories: 60 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Havuç', portion: '100g', calories: 40 },
            { name: 'Badem', portion: '14 adet', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 20,
      title: 'Gün 20 - 20 Gün Başarısı! 🌟',
      totalCalories: 1650,
      note: '20 gün tamamlandı! İnsülin duyarlılığınız arttı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Kinoa salatası (GI:53)', portion: '150g', calories: 180 },
            { name: 'Yeşil yapraklar', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında levrek', portion: '180g', calories: 250 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Mercimek çorbası (GI:32)', portion: '150ml', calories: 100 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 21,
      title: 'Gün 21 - 3 Hafta Şampiyonu! 🏆',
      totalCalories: 1700,
      note: 'Üç haftayı tamamladınız! Harika gidiyorsunuz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Menemen', portion: '2 yumurta', calories: 220 },
            { name: 'Tam buğday ekmek (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Izgara biftek', portion: '150g', calories: 320 },
            { name: 'Bulgur (GI:48)', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
            { name: 'Kinoa (GI:53)', portion: '50g', calories: 60 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı (düşük GI)', portion: '200g', calories: 100 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 22,
      title: 'Gün 22 - Son Hafta Başlangıcı 🎯',
      totalCalories: 1650,
      note: 'Son hafta! Hedefe çok yakınsınız.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Yulaf ezmesi (GI:55)', portion: '50g', calories: 180 },
            { name: 'Çilek (GI:40)', portion: '100g', calories: 35 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
            { name: 'Muz (yarım)', portion: '1/2 adet', calories: 50 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Mercimek çorbası (GI:32)', portion: '200ml', calories: 140 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında balık', portion: '180g', calories: 250 },
            { name: 'Buharda brokoli', portion: '200g', calories: 70 },
            { name: 'Esmer pirinç (GI:50)', portion: '80g', calories: 90 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut (GI:38)', portion: '1 orta', calories: 100 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Havuç', portion: '50g', calories: 20 },
          ],
        },
      ],
    },
    {
      day: 23,
      title: 'Gün 23 - Optimal Gün 🌟',
      totalCalories: 1650,
      note: 'Kan şekeri kontrolü optimize edildi.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday ekmek (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Beyaz peynir (az yağlı)', portion: '30g', calories: 50 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '150g', calories: 250 },
            { name: 'Bulgur pilavı (GI:48)', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa (GI:53)', portion: '60g', calories: 70 },
            { name: 'Ispanak', portion: '50g', calories: 15 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
    {
      day: 24,
      title: 'Gün 24 - Protein Takviyesi 💪',
      totalCalories: 1680,
      note: 'Protein = GI 0, kas koruma.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Scrambled eggs', portion: '3 yumurta', calories: 210 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 510,
          foods: [
            { name: 'Izgara dana biftek', portion: '150g', calories: 320 },
            { name: 'Nohut salatası (GI:28)', portion: '120g', calories: 120 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Tavuk göğsü (fırın)', portion: '180g', calories: 300 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Portakal (GI:43)', portion: '1 orta', calories: 60 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 25,
      title: 'Gün 25 - Son 5 Gün! 🎯',
      totalCalories: 1650,
      note: 'Son 5 gün kaldı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Yulaf ezmesi (GI:55)', portion: '50g', calories: 180 },
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Badem', portion: '10 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Bulgur pilavı (GI:48)', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında levrek', portion: '180g', calories: 250 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Esmer pirinç (GI:50)', portion: '80g', calories: 90 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut (GI:38)', portion: '1 orta', calories: 100 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Havuç', portion: '50g', calories: 20 },
          ],
        },
      ],
    },
    {
      day: 26,
      title: 'Gün 26 - Omega-3 Günü 🐟',
      totalCalories: 1680,
      note: 'Balık ile insülin duyarlılığı artışı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Füme somon', portion: '60g', calories: 120 },
            { name: 'Haşlanmış yumurta', portion: '1 adet', calories: 70 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 510,
          foods: [
            { name: 'Izgara somon', portion: '180g', calories: 350 },
            { name: 'Kinoa (GI:53)', portion: '100g', calories: 120 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında çipura', portion: '200g', calories: 280 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Bulgur (GI:48)', portion: '60g', calories: 75 },
            { name: 'Dereotu', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 27,
      title: 'Gün 27 - Son 3 Gün! 🏃',
      totalCalories: 1650,
      note: 'Son 3 güne girdik!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk şiş', portion: '150g', calories: 250 },
            { name: 'Bulgur pilavı (GI:48)', portion: '100g', calories: 120 },
            { name: 'Cacık', portion: '100g', calories: 50 },
            { name: 'Yeşil salata', portion: '100g', calories: 25 },
            { name: 'Zeytinyağı', portion: '1 tatlı kaşığı', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa (GI:53)', portion: '60g', calories: 70 },
            { name: 'Ispanak', portion: '50g', calories: 15 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Portakal (GI:43)', portion: '1 orta', calories: 60 },
            { name: 'Cottage cheese', portion: '100g', calories: 100 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
            { name: 'Havuç', portion: '50g', calories: 20 },
          ],
        },
      ],
    },
    {
      day: 28,
      title: 'Gün 28 - Son 2 Gün! ⭐',
      totalCalories: 1650,
      note: 'Son 2 gün! Harika gidiyorsunuz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Yulaf ezmesi (GI:55)', portion: '50g', calories: 180 },
            { name: 'Çilek (GI:40)', portion: '100g', calories: 35 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
            { name: 'Ceviz', portion: '6 adet', calories: 120 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Izgara tavuk göğsü', portion: '150g', calories: 250 },
            { name: 'Mercimek çorbası (GI:32)', portion: '200ml', calories: 140 },
            { name: 'Yeşil salata', portion: '150g', calories: 40 },
            { name: 'Tam buğday ekmek', portion: '1 dilim', calories: 80 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında balık', portion: '180g', calories: 250 },
            { name: 'Buharda sebze', portion: '200g', calories: 80 },
            { name: 'Esmer pirinç (GI:50)', portion: '80g', calories: 90 },
            { name: 'Yoğurt', portion: '50g', calories: 30 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Armut (GI:38)', portion: '1 orta', calories: 100 },
            { name: 'Lor peyniri', portion: '100g', calories: 100 },
            { name: 'Badem', portion: '14 adet', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 29,
      title: 'Gün 29 - Yarın Son Gün! 🎉',
      totalCalories: 1650,
      note: 'Yarın 30 günü tamamlıyorsunuz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Haşlanmış yumurta', portion: '2 adet', calories: 140 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Beyaz peynir', portion: '30g', calories: 50 },
            { name: 'Domates', portion: '1 orta', calories: 25 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tavuk göğsü (ızgara)', portion: '150g', calories: 250 },
            { name: 'Bulgur pilavı (GI:48)', portion: '100g', calories: 120 },
            { name: 'Karışık salata', portion: '200g', calories: 50 },
            { name: 'Zeytinyağı-limon', portion: '1 yemek kaşığı', calories: 90 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında somon', portion: '150g', calories: 280 },
            { name: 'Brokoli', portion: '200g', calories: 70 },
            { name: 'Kinoa (GI:53)', portion: '60g', calories: 70 },
            { name: 'Limon', portion: '1/2 adet', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Elma (GI:36)', portion: '1 orta', calories: 95 },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Ceviz', portion: '5 adet', calories: 80 },
            { name: 'Salatalık', portion: '1 orta', calories: 15 },
          ],
        },
      ],
    },
    {
      day: 30,
      title: 'Gün 30 - ZAFER GÜNÜ! 🏆🎉',
      totalCalories: 1700,
      note: '30 günü başarıyla tamamladınız! Kan şekeriniz dengeli, insülin duyarlılığınız arttı!',
      meals: [
        {
          type: 'breakfast',
          name: 'Zafer Kahvaltısı',
          totalCalories: 420,
          foods: [
            { name: 'Sebzeli omlet', portion: '2 yumurta', calories: 200 },
            { name: 'Tam buğday tost (GI:51)', portion: '2 dilim', calories: 160 },
            { name: 'Avokado', portion: '1/4 adet', calories: 80 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Izgara kuzu pirzola', portion: '120g', calories: 280 },
            { name: 'Bulgur pilavı (GI:48)', portion: '120g', calories: 150 },
            { name: 'Karışık salata', portion: '150g', calories: 40 },
            { name: 'Yoğurt', portion: '100g', calories: 60 },
          ],
        },
        {
          type: 'dinner',
          name: 'Kutlama Akşam Yemeği',
          totalCalories: 450,
          foods: [
            { name: 'Fırında somon', portion: '180g', calories: 350 },
            { name: 'Fırında sebze', portion: '200g', calories: 100 },
          ],
        },
        {
          type: 'snack',
          name: 'Kutlama Ara Öğünleri',
          totalCalories: 300,
          foods: [
            { name: 'Meyve tabağı (düşük GI)', portion: '200g', calories: 100, note: 'Kutlama!' },
            { name: 'Yoğurt', portion: '150g', calories: 90 },
            { name: 'Badem', portion: '15 adet', calories: 105 },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 30 GÜNLÜK BEKLENEN SONUÇLAR

⚖️ KİLO KAYBI:
• 3-5 kg sağlıklı kilo kaybı
• Bel çevresinde 3-5 cm azalma
• Yağ oranında düşüş

🩺 KAN ŞEKERİ DENGESİ:
• Açlık kan şekerinde düşüş
• HbA1c seviyesinde iyileşme
• İnsülin duyarlılığında %25 artış
• Şeker isteğinde belirgin azalma

⚡ ENERJİ VE PERFORMANS:
• Stabil enerji seviyeleri
• Daha iyi odaklanma
• Gün içi yorgunluk azalması
• Daha iyi uyku kalitesi

❤️ GENEL SAĞLIK:
• Kolesterol profilinde iyileşme
• Kalp sağlığı desteği
• İltihap belirteçlerinde azalma

⚠️ Bu diyet sürdürülebilir bir yaşam tarzıdır, 30 gün sonra da devam edebilirsiniz.`,

    en: `📊 30-DAY EXPECTED RESULTS

⚖️ WEIGHT LOSS:
• 3-5 kg healthy weight loss
• 3-5 cm reduction in waist circumference
• Decrease in fat percentage

🩺 BLOOD SUGAR BALANCE:
• Decrease in fasting blood sugar
• Improvement in HbA1c levels
• 25% increase in insulin sensitivity
• Significant reduction in sugar cravings

⚡ ENERGY AND PERFORMANCE:
• Stable energy levels
• Better focus
• Reduced daytime fatigue
• Better sleep quality

❤️ GENERAL HEALTH:
• Improved cholesterol profile
• Heart health support
• Reduced inflammatory markers

⚠️ This diet is a sustainable lifestyle, you can continue after 30 days.`,
  },
};
