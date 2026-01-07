import { Diet } from '../types';

export const japaneseDiet30: Diet = {
  id: 'japanese',
  name: {
    tr: 'Japon Stili Diyet',
    en: 'Japanese Style Diet',
  },
  emoji: '🍣',
  isPremium: true,
  duration: 30,
  difficulty: 'medium',

  description: {
    tr: 'Japon stili diyet, dünyanın en uzun yaşayan toplumlarından biri olan Japonya\'nın geleneksel beslenme alışkanlıklarından ilham alır. Okinawa ve geleneksel Japon mutfağının prensiplerini birleştiren bu diyet, dengeli porsiyon kontrolü, taze deniz ürünleri, fermente gıdalar ve minimal işlenmiş besinlere dayanır.',
    en: 'The Japanese style diet is inspired by the traditional eating habits of Japan, one of the world\'s longest-living populations. Combining principles from Okinawa and traditional Japanese cuisine, this diet is based on balanced portion control, fresh seafood, fermented foods, and minimally processed foods.',
  },

  scientificInfo: {
    tr: `🔬 BİLİMSEL ARAŞTIRMALAR VE KANITLAR

📊 Okinawa Araştırmaları:
• Okinawa, dünyanın "Mavi Bölgelerinden" biri
• 100 yaş üstü birey oranı dünya ortalamasının 5-6 katı
• Kalp hastalığı, inme ve kanser oranları dünya ortalamasının %50-75'i altında

🍽️ Hara Hachi Bu Prensibi:
• "%80 dolu" - aşırı yemekten kaçınma
• Doğal kalori kısıtlaması
• Uzun ömür ile doğrudan ilişkili

🔬 Besin Profili:
• Yüksek balık ve deniz ürünleri tüketimi (omega-3)
• Soya ürünleri (izoflovanlar)
• Yeşil çay (kateşinler)
• Fermente gıdalar (probiyotikler)
• Sebze ağırlıklı beslenme

💓 Sağlık Sonuçları:
• Kardiyovasküler hastalık riski: %30-50 azalma
• Tip 2 diyabet riski: Düşük
• Obezite oranı: Gelişmiş ülkeler arasında en düşük
• Yaşa bağlı hastalıklarda gecikme

⚠️ Önemli Not:
• Modern Japon diyeti batılılaşma eğiliminde
• Geleneksel prensiplere bağlı kalmak önemli`,

    en: `🔬 SCIENTIFIC RESEARCH AND EVIDENCE

📊 Okinawa Studies:
• Okinawa is one of the world's "Blue Zones"
• Centenarian rate 5-6 times the world average
• Heart disease, stroke, and cancer rates 50-75% below world average

🍽️ Hara Hachi Bu Principle:
• "80% full" - avoiding overeating
• Natural calorie restriction
• Directly linked to longevity

🔬 Nutritional Profile:
• High fish and seafood consumption (omega-3)
• Soy products (isoflavones)
• Green tea (catechins)
• Fermented foods (probiotics)
• Vegetable-heavy diet

💓 Health Outcomes:
• Cardiovascular disease risk: 30-50% reduction
• Type 2 diabetes risk: Low
• Obesity rate: Lowest among developed countries
• Delay in age-related diseases

⚠️ Important Note:
• Modern Japanese diet trending toward Westernization
• Important to stick to traditional principles`,
  },

  benefits: {
    tr: [
      '⏳ Uzun ömür ve yaşam kalitesi artışı',
      '❤️ Kalp hastalığı riskinde belirgin azalma',
      '🧠 Beyin sağlığı ve bilişsel fonksiyon koruması',
      '⚖️ Doğal kilo kontrolü',
      '🩺 Tip 2 diyabet riskinde azalma',
      '🦴 Kemik sağlığını destekler',
      '🌿 Sindirim sistemi sağlığı',
      '🔥 Anti-inflamatuar etki',
      '💪 Kas kütlesi koruması',
      '🧘 Yemek ile sağlıklı ilişki',
    ],
    en: [
      '⏳ Increased longevity and quality of life',
      '❤️ Significant reduction in heart disease risk',
      '🧠 Brain health and cognitive function protection',
      '⚖️ Natural weight control',
      '🩺 Reduced Type 2 diabetes risk',
      '🦴 Supports bone health',
      '🌿 Digestive system health',
      '🔥 Anti-inflammatory effect',
      '💪 Muscle mass preservation',
      '🧘 Healthy relationship with food',
    ],
  },

  warnings: {
    tr: [
      '⚠️ Soya alerjisi olanlar dikkatli olmalı',
      '🧂 Bazı Japon gıdalarda sodyum yüksek olabilir',
      '🐟 Çiğ balık tüketimi risk taşıyabilir',
      '🍚 Beyaz pirinç glisemik indeksi yüksek',
      '💊 Tiroid problemi olanlar deniz yosununa dikkat',
    ],
    en: [
      '⚠️ Those with soy allergies should be careful',
      '🧂 Some Japanese foods may be high in sodium',
      '🐟 Raw fish consumption may carry risks',
      '🍚 White rice has high glycemic index',
      '💊 Those with thyroid issues should watch seaweed intake',
    ],
  },

  allowedFoods: {
    tr: [
      '🐟 BALIK VE DENİZ ÜRÜNLERİ:',
      '🐟 Somon, uskumru, sardalya',
      '🦐 Karides, kalamar, ahtapot',
      '🐚 Midye, istiridye',
      '🍣 Çiğ balık (taze olmalı)',
      '',
      '🌾 TAHILLAR:',
      '🍚 Pirinç (tercihen esmer)',
      '🍜 Soba (karabuğday) eriştesi',
      '🍜 Udon eriştesi',
      '',
      '🫘 SOYA ÜRÜNLERİ:',
      '🫘 Tofu, edamame',
      '🫘 Miso, natto',
      '🫘 Soya sosu (az tuzlu)',
      '',
      '🥬 SEBZELER:',
      '🥬 Deniz yosunu (nori, wakame)',
      '🥦 Brokoli, lahana',
      '🥕 Havuç, turp (daikon)',
      '🍄 Shiitake, enoki mantarı',
      '',
      '🍵 İÇECEKLER:',
      '🍵 Yeşil çay (matcha dahil)',
      '🍵 Mugicha (arpa çayı)',
      '',
      '🥚 PROTEİN:',
      '🥚 Yumurta',
      '🍗 Tavuk (az miktarda)',
      '',
      '🍎 MEYVELER:',
      '🍎 Mevsimsel meyveler',
      '🍊 Turunçgiller',
      '🍇 Üzüm, erik',
    ],
    en: [
      '🐟 FISH AND SEAFOOD:',
      '🐟 Salmon, mackerel, sardines',
      '🦐 Shrimp, squid, octopus',
      '🐚 Mussels, oysters',
      '🍣 Raw fish (must be fresh)',
      '',
      '🌾 GRAINS:',
      '🍚 Rice (preferably brown)',
      '🍜 Soba (buckwheat) noodles',
      '🍜 Udon noodles',
      '',
      '🫘 SOY PRODUCTS:',
      '🫘 Tofu, edamame',
      '🫘 Miso, natto',
      '🫘 Soy sauce (low sodium)',
      '',
      '🥬 VEGETABLES:',
      '🥬 Seaweed (nori, wakame)',
      '🥦 Broccoli, cabbage',
      '🥕 Carrots, daikon radish',
      '🍄 Shiitake, enoki mushrooms',
      '',
      '🍵 BEVERAGES:',
      '🍵 Green tea (including matcha)',
      '🍵 Mugicha (barley tea)',
      '',
      '🥚 PROTEIN:',
      '🥚 Eggs',
      '🍗 Chicken (small amounts)',
      '',
      '🍎 FRUITS:',
      '🍎 Seasonal fruits',
      '🍊 Citrus fruits',
      '🍇 Grapes, plums',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🍟 İŞLENMİŞ GIDALAR:',
      '🍟 Fast food, kızartmalar',
      '🍪 Paketli atıştırmalıklar',
      '',
      '🍬 ŞEKER:',
      '🍬 Şekerli içecekler',
      '🍰 Batı tarzı tatlılar',
      '',
      '🥩 KIRMIZI ET (Sınırlı):',
      '🥩 Dana, kuzu (nadir)',
      '🌭 İşlenmiş etler',
      '',
      '🧈 YAĞLI GIDALAR:',
      '🧈 Tereyağı, margarin',
      '🧀 Yüksek yağlı süt ürünleri',
    ],
    en: [
      '🍟 PROCESSED FOODS:',
      '🍟 Fast food, fried foods',
      '🍪 Packaged snacks',
      '',
      '🍬 SUGAR:',
      '🍬 Sugary drinks',
      '🍰 Western-style desserts',
      '',
      '🥩 RED MEAT (Limited):',
      '🥩 Beef, lamb (rare)',
      '🌭 Processed meats',
      '',
      '🧈 FATTY FOODS:',
      '🧈 Butter, margarine',
      '🧀 High-fat dairy products',
    ],
  },

  exercises: [
    {
      name: 'Yürüyüş / Walking',
      duration: '30-60 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Japonya\'da günlük yaşamın parçası.',
    },
    {
      name: 'Radio Taiso (Japon Sabah Egzersizi)',
      duration: '10-15 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Geleneksel Japon sabah stretching.',
    },
    {
      name: 'Yüzme / Swimming',
      duration: '30-45 dakika / minutes',
      frequency: 'Haftada 2-3 kez / 2-3 times a week',
      note: 'Japonya\'da popüler aktivite.',
    },
    {
      name: 'Tai Chi / Qigong',
      duration: '20-30 dakika / minutes',
      frequency: 'Haftada 3-4 kez / 3-4 times a week',
      note: 'Denge ve esneklik için.',
    },
    {
      name: 'Bisiklet / Cycling',
      duration: '30-45 dakika / minutes',
      frequency: 'Her gün / Daily',
      note: 'Japonya\'da yaygın ulaşım.',
    },
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Japon Yolculuğu Başlıyor 🍣',
      totalCalories: 1800,
      note: 'Hara Hachi Bu - %80 doygunluk prensibi ile başlıyoruz!',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (朝食)',
          totalCalories: 400,
          foods: [
            { name: 'Miso çorbası', portion: '200ml', calories: 60, note: 'Wakame ve tofu ile' },
            { name: 'Pirinç (gohan)', portion: '150g', calories: 180 },
            { name: 'Izgara somon', portion: '60g', calories: 120, note: 'Shiozake' },
            { name: 'Turşu (tsukemono)', portion: '30g', calories: 15 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği (昼食)',
          totalCalories: 500,
          foods: [
            { name: 'Soba eriştesi', portion: '200g', calories: 250, note: 'Karabuğday' },
            { name: 'Tempura sebze', portion: '80g', calories: 150, note: 'Hafif kızartma' },
            { name: 'Dashi suyu', portion: '200ml', calories: 20 },
            { name: 'Edamame', portion: '50g', calories: 60 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği (夕食)',
          totalCalories: 550,
          foods: [
            { name: 'Sashimi (çiğ balık)', portion: '100g', calories: 150, note: 'Somon, ton' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Sebze ohitashi', portion: '100g', calories: 50, note: 'Haşlanmış ıspanak' },
            { name: 'Nori (deniz yosunu)', portion: '2 yaprak', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Onigiri (pirinç topu)', portion: '1 adet', calories: 180, note: 'Nori ile' },
            { name: 'Meyve', portion: '100g', calories: 60 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
            { name: 'Edamame', portion: '50g', calories: 60 },
          ],
        },
      ],
    },
    {
      day: 2,
      title: 'Gün 2 - Deniz Mahsulleri Günü 🐟',
      totalCalories: 1850,
      note: 'Omega-3 açısından zengin deniz ürünleri.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Tamago yaki (Japon omleti)', portion: '100g', calories: 150 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Turşu', portion: '30g', calories: 15 },
            { name: 'Natto', portion: '50g', calories: 100, note: 'Fermente soya' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Chirashi sushi', portion: '300g', calories: 400, note: 'Pirinç üstü çiğ balık' },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Salata', portion: '80g', calories: 30 },
            { name: 'Zencefil turşusu', portion: '20g', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 560,
          foods: [
            { name: 'Uskumru (shioyake)', portion: '150g', calories: 300, note: 'Tuzlu ızgara' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Yasai itame', portion: '100g', calories: 80, note: 'Sebze sote' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Mochi (pirinç keki)', portion: '2 adet', calories: 140, note: 'Geleneksel' },
            { name: 'Mandalina', portion: '2 adet', calories: 80 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
            { name: 'Kuri (kestane)', portion: '30g', calories: 65 },
          ],
        },
      ],
    },
    {
      day: 3,
      title: 'Gün 3 - Soya Gücü 🫘',
      totalCalories: 1800,
      note: 'Soya ürünleri ile bitkisel protein.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Tofu steak', portion: '150g', calories: 150 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Nori', portion: '2 yaprak', calories: 10 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Hiyayakko (soğuk tofu)', portion: '200g', calories: 150 },
            { name: 'Soba eriştesi', portion: '150g', calories: 190 },
            { name: 'Edamame', portion: '80g', calories: 95 },
            { name: 'Dashi suyu', portion: '200ml', calories: 20 },
            { name: 'Zencefil', portion: 'bir tutam', calories: 5 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Mapo tofu', portion: '200g', calories: 250, note: 'Hafif versiyonu' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Sunomono', portion: '80g', calories: 40, note: 'Salatalık sirkeli' },
            { name: 'Wakame salatası', portion: '60g', calories: 30 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Yudofu', portion: '100g', calories: 80, note: 'Sıcak tofu' },
            { name: 'Soya sütü', portion: '200ml', calories: 80 },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Natto senbei', portion: '30g', calories: 100 },
          ],
        },
      ],
    },
    {
      day: 4,
      title: 'Gün 4 - Fermente Gıdalar 🥢',
      totalCalories: 1820,
      note: 'Probiyotikler ile bağırsak sağlığı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Natto', portion: '50g', calories: 100, note: 'Fermente soya fasulyesi' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Yumurta (onsen)', portion: '1 adet', calories: 70 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Ramen', portion: '400ml', calories: 350, note: 'Miso bazlı, sebzeli' },
            { name: 'Kimchi', portion: '50g', calories: 20, note: 'Fermente lahana' },
            { name: 'Gyoza', portion: '4 adet', calories: 130, note: 'Sebzeli' },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Teriyaki somon', portion: '150g', calories: 280 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Nukazuke', portion: '50g', calories: 25, note: 'Kepek turşusu' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Amazake', portion: '150ml', calories: 120, note: 'Fermente pirinç içeceği' },
            { name: 'Umeboshi', portion: '2 adet', calories: 10, note: 'Turşu erik' },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 5,
      title: 'Gün 5 - Sebze Zenginliği 🥬',
      totalCalories: 1780,
      note: 'Çeşitli sebzeler ile vitamin ve mineral.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 380,
          foods: [
            { name: 'Tamagoyaki', portion: '80g', calories: 120 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Ohitashi (ıspanak)', portion: '80g', calories: 40 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Yasai itame', portion: '250g', calories: 200, note: 'Sebze stir-fry' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Tofu', portion: '100g', calories: 80 },
            { name: 'Miso çorbası', portion: '100ml', calories: 30 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Nabemono (sıcak tencere)', portion: '400g', calories: 350, note: 'Sebze, tofu, balık' },
            { name: 'Pirinç', portion: '100g', calories: 120 },
            { name: 'Ponzu sos', portion: '30ml', calories: 20 },
            { name: 'Nori', portion: '2 yaprak', calories: 10 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Edamame', portion: '80g', calories: 95 },
            { name: 'Daikon (turp) salatası', portion: '100g', calories: 20 },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
            { name: 'Shiitake (kuru)', portion: '20g', calories: 45 },
          ],
        },
      ],
    },
    {
      day: 6,
      title: 'Gün 6 - Yeşil Çay Günü 🍵',
      totalCalories: 1800,
      note: 'Antioksidanlar ve kateşinler ile sağlık.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Ochazuke', portion: '300g', calories: 220, note: 'Çay ile pirinç' },
            { name: 'Grilled salmon', portion: '60g', calories: 120 },
            { name: 'Turşu', portion: '30g', calories: 15 },
            { name: 'Matcha', portion: '1 fincan', calories: 5, note: 'Öğütülmüş yeşil çay' },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Bento kutusu', portion: '400g', calories: 450, note: 'Pirinç, balık, sebze' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Yakitori', portion: '150g', calories: 250, note: 'Izgara tavuk şiş' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Aemono', portion: '80g', calories: 60, note: 'Sebze karışımı' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Matcha latte', portion: '200ml', calories: 100, note: 'Soya sütü ile' },
            { name: 'Matcha mochi', portion: '2 adet', calories: 140 },
            { name: 'Meyve', portion: '100g', calories: 60 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 7,
      title: 'Gün 7 - Hafta Sonu Ziyafeti 🎌',
      totalCalories: 1900,
      note: 'İlk hafta tamamlandı! Geleneksel Japon yemekleri.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı (Özel)',
          totalCalories: 450,
          foods: [
            { name: 'Japon kahvaltı seti', portion: '400g', calories: 380, note: 'Pirinç, balık, miso, turşu' },
            { name: 'Natto', portion: '50g', calories: 100 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Sushi seti', portion: '10 adet', calories: 400 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Edamame', portion: '60g', calories: 70 },
            { name: 'Zencefil turşusu', portion: '20g', calories: 10 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'Sukiyaki', portion: '400g', calories: 450, note: 'Et, tofu, sebze hot pot' },
            { name: 'Pirinç', portion: '100g', calories: 120 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 300,
          foods: [
            { name: 'Dorayaki', portion: '1 adet', calories: 150, note: 'Japon pankek' },
            { name: 'Meyve', portion: '100g', calories: 60 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
            { name: 'Senbei', portion: '30g', calories: 90, note: 'Pirinç krakerı' },
          ],
        },
      ],
    },
    // Gün 8-30 için benzer detaylı planlar devam eder...
    {
      day: 8,
      title: 'Gün 8 - Yeni Hafta Enerjisi 💪',
      totalCalories: 1800,
      note: 'İkinci hafta başlıyor - denge ve ölçülülük.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Pirinç lapası (okayu)', portion: '250g', calories: 150 },
            { name: 'Grilled salmon', portion: '60g', calories: 120 },
            { name: 'Umeboshi', portion: '1 adet', calories: 5 },
            { name: 'Nori', portion: '2 yaprak', calories: 10 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Udon', portion: '300g', calories: 350 },
            { name: 'Tempura', portion: '60g', calories: 100, note: 'Sebze' },
            { name: 'Yeşil soğan', portion: 'bir tutam', calories: 5 },
            { name: 'Dashi', portion: '200ml', calories: 20 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Chicken katsu (tavuk)', portion: '150g', calories: 280 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Lahana salatası', portion: '80g', calories: 25 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Onigiri', portion: '1 adet', calories: 180 },
            { name: 'Meyve', portion: '120g', calories: 70 },
            { name: 'Edamame', portion: '50g', calories: 60 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 9,
      title: 'Gün 9 - Deniz Yosunu Gücü 🥬',
      totalCalories: 1780,
      note: 'Deniz yosunları ile mineral desteği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Nori omlet', portion: '100g', calories: 140 },
            { name: 'Wakame salatası', portion: '60g', calories: 30 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Kaiso salatası', portion: '200g', calories: 100, note: 'Deniz yosunu salatası' },
            { name: 'Sashimi', portion: '100g', calories: 150 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Kombu dashi balık', portion: '150g', calories: 200, note: 'Kelp ile pişmiş' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Hijiki salatası', portion: '80g', calories: 60, note: 'Siyah deniz yosunu' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Nori chips', portion: '20g', calories: 40 },
            { name: 'Edamame', portion: '80g', calories: 95 },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 10,
      title: 'Gün 10 - Washoku (和食) 🍱',
      totalCalories: 1800,
      note: 'Geleneksel Japon mutfağı - UNESCO mirası.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Ichiju-sansai', portion: '400g', calories: 350, note: '1 çorba + 3 yan' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Donburi (pirinç bowl)', portion: '350g', calories: 420, note: 'Tavuk ve sebze' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
            { name: 'Turşu', portion: '30g', calories: 15 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Grilled sanma', portion: '150g', calories: 280, note: 'Pasifik uskumrusu' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Ohitashi', portion: '80g', calories: 40 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Mochi', portion: '2 adet', calories: 140 },
            { name: 'Meyve', portion: '120g', calories: 70 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
            { name: 'Senbei', portion: '30g', calories: 90 },
          ],
        },
      ],
    },
    // Günler 11-30 için benzer yapıda devam...
    {
      day: 11,
      title: 'Gün 11 - Tofu Master 🧊',
      totalCalories: 1780,
      note: 'Tofu çeşitleri ile protein çeşitliliği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Agedashi tofu', portion: '150g', calories: 180 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tofu steak', portion: '200g', calories: 200 },
            { name: 'Soba', portion: '150g', calories: 190 },
            { name: 'Sebze', portion: '100g', calories: 50 },
            { name: 'Dashi', portion: '150ml', calories: 15 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Yudofu', portion: '250g', calories: 200, note: 'Sıcak tofu güveç' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Sebze', portion: '100g', calories: 50 },
            { name: 'Ponzu', portion: '30ml', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Edamame', portion: '100g', calories: 120 },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Soya sütü', portion: '200ml', calories: 80 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 12,
      title: 'Gün 12 - Ramen Günü 🍜',
      totalCalories: 1820,
      note: 'Sağlıklı ramen versiyonları.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Tamago gohan', portion: '250g', calories: 280, note: 'Yumurtalı pirinç' },
            { name: 'Natto', portion: '50g', calories: 100 },
            { name: 'Turşu', portion: '20g', calories: 10 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 520,
          foods: [
            { name: 'Shoyu ramen', portion: '400ml', calories: 400, note: 'Sebzeli, tavuklu' },
            { name: 'Gyoza', portion: '4 adet', calories: 120 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Grilled somon', portion: '150g', calories: 280 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Salata', portion: '80g', calories: 30 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Onigiri', portion: '1 adet', calories: 180 },
            { name: 'Meyve', portion: '120g', calories: 70 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 13,
      title: 'Gün 13 - Mevsimsel Yemekler 🍂',
      totalCalories: 1800,
      note: 'Shun (旬) - mevsiminde yemek.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Grilled aji (istavrit)', portion: '80g', calories: 130 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Turşu', portion: '30g', calories: 15 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Seasonal bento', portion: '400g', calories: 450 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Shabu-shabu', portion: '350g', calories: 400, note: 'Et ve sebze hot pot' },
            { name: 'Pirinç', portion: '100g', calories: 120 },
            { name: 'Ponzu sos', portion: '30ml', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Mevsim meyvesi', portion: '200g', calories: 120 },
            { name: 'Edamame', portion: '60g', calories: 70 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
            { name: 'Kuri', portion: '30g', calories: 65 },
          ],
        },
      ],
    },
    {
      day: 14,
      title: 'Gün 14 - İki Hafta Tamamlandı! 🎉',
      totalCalories: 1850,
      note: 'Yarı yola geldik! Japon beslenme alışkanlıkları yerleşiyor.',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Teishoku set', portion: '450g', calories: 400, note: 'Komple Japon kahvaltı' },
            { name: 'Matcha', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Omakase sushi', portion: '12 adet', calories: 480 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Kaiseki (hafif)', portion: '500g', calories: 450, note: 'Çoklu kurs' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler + Kutlama',
          totalCalories: 300,
          foods: [
            { name: 'Wagashi', portion: '2 adet', calories: 120, note: 'Japon tatlısı' },
            { name: 'Meyve', portion: '100g', calories: 60 },
            { name: 'Matcha', portion: '1 fincan', calories: 5 },
          ],
        },
      ],
    },
    // Günler 15-29 benzer detaylı planlarla devam eder...
    {
      day: 15,
      title: 'Gün 15 - Üçüncü Hafta 🌸',
      totalCalories: 1800,
      note: 'Japon yaşam tarzı artık alışkanlık.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Grilled sake (somon)', portion: '80g', calories: 150 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
            { name: 'Natto', portion: '30g', calories: 60 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Oyakodon', portion: '350g', calories: 450, note: 'Tavuk ve yumurta pirinç' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Saba shioyake', portion: '150g', calories: 280, note: 'Tuzlu uskumru' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Ohitashi', portion: '80g', calories: 40 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Onigiri', portion: '1 adet', calories: 180 },
            { name: 'Meyve', portion: '120g', calories: 70 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 16,
      title: 'Gün 16 - Enerji Dengesi ⚡',
      totalCalories: 1820,
      note: 'Hara Hachi Bu ile enerji optimizasyonu.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Tamago kake gohan', portion: '250g', calories: 280 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Nori', portion: '3 yaprak', calories: 15 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Katsu curry', portion: '350g', calories: 450, note: 'Hafif versiyon' },
            { name: 'Salata', portion: '80g', calories: 30 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Nabe', portion: '400g', calories: 380, note: 'Sebze ve balık güveç' },
            { name: 'Pirinç', portion: '100g', calories: 120 },
            { name: 'Ponzu', portion: '30ml', calories: 20 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Edamame', portion: '100g', calories: 120 },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
            { name: 'Senbei', portion: '30g', calories: 90 },
          ],
        },
      ],
    },
    {
      day: 17,
      title: 'Gün 17 - Çeşitlilik Günü 🌈',
      totalCalories: 1800,
      note: 'Japon mutfağının zenginliği.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Japanese set', portion: '380g', calories: 350 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Tendon', portion: '350g', calories: 450, note: 'Tempura pirinç bowl' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Teriyaki tavuk', portion: '150g', calories: 280 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Sebze', portion: '100g', calories: 50 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Mochi', portion: '2 adet', calories: 140 },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 18,
      title: 'Gün 18 - Balık Zenginliği 🐠',
      totalCalories: 1850,
      note: 'Farklı balık türleri ile omega-3.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Sake (somon) flakes', portion: '40g', calories: 80 },
            { name: 'Nori', portion: '2 yaprak', calories: 10 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Turşu', portion: '30g', calories: 15 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Tekkadon', portion: '300g', calories: 400, note: 'Ton balıklı pirinç' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
            { name: 'Seaweed salad', portion: '60g', calories: 30 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Buri teriyaki', portion: '150g', calories: 280, note: 'Yellowtail' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Daikon oroshi', portion: '50g', calories: 10 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Onigiri (salmon)', portion: '1 adet', calories: 200 },
            { name: 'Meyve', portion: '100g', calories: 60 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 19,
      title: 'Gün 19 - Bitkisel Gün 🌿',
      totalCalories: 1750,
      note: 'Shojin ryori (vejetaryen Budist mutfak) ilhamı.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 380,
          foods: [
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Tofu', portion: '100g', calories: 80 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Turşu', portion: '30g', calories: 15 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Yasai tempura', portion: '150g', calories: 250 },
            { name: 'Soba', portion: '150g', calories: 190 },
            { name: 'Dashi', portion: '150ml', calories: 15 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 540,
          foods: [
            { name: 'Nasu dengaku', portion: '200g', calories: 180, note: 'Miso patlıcan' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Kinpira gobo', portion: '80g', calories: 80, note: 'Burdock root' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Edamame', portion: '100g', calories: 120 },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Soya sütü', portion: '150ml', calories: 60 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 20,
      title: 'Gün 20 - Umami Keşfi 😋',
      totalCalories: 1800,
      note: 'Beşinci tat: umami.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Natto', portion: '50g', calories: 100, note: 'Umami kaynağı' },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Yumurta', portion: '1 adet', calories: 70 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Ramen (tonkotsu)', portion: '400ml', calories: 380, note: 'Umami zengin' },
            { name: 'Ajitama', portion: '1 adet', calories: 70, note: 'Marineli yumurta' },
            { name: 'Nori', portion: '1 yaprak', calories: 5 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Dashi poached balık', portion: '150g', calories: 200 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Shiitake nimono', portion: '80g', calories: 60, note: 'Pişmiş mantar' },
            { name: 'Kombu dashi çorbası', portion: '150ml', calories: 30 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Umeboshi onigiri', portion: '1 adet', calories: 180 },
            { name: 'Meyve', portion: '120g', calories: 70 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 21,
      title: 'Gün 21 - Üç Hafta Başarısı! 🏆',
      totalCalories: 1850,
      note: 'Üç haftayı geçtik! Japon beslenme ustası.',
      meals: [
        {
          type: 'breakfast',
          name: 'Özel Kahvaltı',
          totalCalories: 450,
          foods: [
            { name: 'Ryokan tarzı kahvaltı', portion: '450g', calories: 400 },
            { name: 'Matcha', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Premium sushi set', portion: '12 adet', calories: 480 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Unagi don', portion: '300g', calories: 450, note: 'Yılan balığı pirinç' },
            { name: 'Sunomono', portion: '80g', calories: 40 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler + Kutlama',
          totalCalories: 300,
          foods: [
            { name: 'Wagashi', portion: '2 adet', calories: 120 },
            { name: 'Matcha', portion: '1 fincan', calories: 5 },
            { name: 'Meyve', portion: '100g', calories: 60 },
          ],
        },
      ],
    },
    // Günler 22-29...
    {
      day: 22,
      title: 'Gün 22 - Son Hafta Başlıyor 🚀',
      totalCalories: 1800,
      note: 'Son hafta - Japon yaşam tarzı artık sizin.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Grilled saba', portion: '80g', calories: 150 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Turşu', portion: '20g', calories: 10 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Yakisoba', portion: '300g', calories: 400 },
            { name: 'Edamame', portion: '60g', calories: 70 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Tonkatsu (chicken)', portion: '150g', calories: 280 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Lahana salatası', portion: '80g', calories: 25 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Onigiri', portion: '1 adet', calories: 180 },
            { name: 'Meyve', portion: '120g', calories: 70 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 23,
      title: 'Gün 23 - Denge Günü ⚖️',
      totalCalories: 1780,
      note: 'Yin ve yang dengesi.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 380,
          foods: [
            { name: 'Okayu', portion: '250g', calories: 150 },
            { name: 'Salmon flake', portion: '40g', calories: 80 },
            { name: 'Umeboshi', portion: '1 adet', calories: 5 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Zaru soba', portion: '250g', calories: 300, note: 'Soğuk soba' },
            { name: 'Tempura', portion: '80g', calories: 150 },
            { name: 'Dipping sauce', portion: '50ml', calories: 20 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Yaki zakana', portion: '150g', calories: 250, note: 'Izgara balık' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Ohitashi', portion: '80g', calories: 40 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Mochi', portion: '2 adet', calories: 140 },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 24,
      title: 'Gün 24 - Antioksidan Gücü 🍵',
      totalCalories: 1800,
      note: 'Yeşil çay ve renkli sebzeler.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Tamagoyaki', portion: '80g', calories: 120 },
            { name: 'Spinach ohitashi', portion: '80g', calories: 40 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
            { name: 'Matcha', portion: '1 fincan', calories: 5 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Chirashi sushi', portion: '300g', calories: 400 },
            { name: 'Seaweed salad', portion: '80g', calories: 40 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Somon teriyaki', portion: '150g', calories: 280 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Yasai nimono', portion: '100g', calories: 60, note: 'Sebze güveç' },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Matcha latte', portion: '200ml', calories: 100 },
            { name: 'Edamame', portion: '80g', calories: 95 },
            { name: 'Meyve', portion: '100g', calories: 60 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 25,
      title: 'Gün 25 - Hafif Gün 🌸',
      totalCalories: 1750,
      note: 'Detoks ve hafiflik.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 380,
          foods: [
            { name: 'Okayu', portion: '200g', calories: 120 },
            { name: 'Natto', portion: '30g', calories: 60 },
            { name: 'Miso çorbası', portion: '200ml', calories: 60 },
            { name: 'Turşu', portion: '30g', calories: 15 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 480,
          foods: [
            { name: 'Udon (kitsune)', portion: '350g', calories: 380, note: 'Tofu ile' },
            { name: 'Salata', portion: '80g', calories: 30 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 540,
          foods: [
            { name: 'Chawan mushi', portion: '200g', calories: 150, note: 'Buğu yumurta' },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Grilled balık', portion: '80g', calories: 120 },
            { name: 'Sunomono', portion: '60g', calories: 30 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Meyve', portion: '200g', calories: 120 },
            { name: 'Edamame', portion: '60g', calories: 70 },
            { name: 'Yeşil çay', portion: '3 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 26,
      title: 'Gün 26 - Protein Günü 💪',
      totalCalories: 1850,
      note: 'Balık ve soya ile yağsız protein.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Grilled somon', portion: '80g', calories: 150 },
            { name: 'Natto', portion: '30g', calories: 60 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Sashimi teishoku', portion: '400g', calories: 450 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Tofu steak', portion: '200g', calories: 200 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Yasai itame', portion: '100g', calories: 80 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Edamame', portion: '120g', calories: 145 },
            { name: 'Soya sütü', portion: '200ml', calories: 80 },
            { name: 'Meyve', portion: '100g', calories: 60 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 27,
      title: 'Gün 27 - Lif Zenginliği 🌾',
      totalCalories: 1800,
      note: 'Sebzeler ve tam tahıllar ile lif.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Genmai (esmer pirinç)', portion: '150g', calories: 170 },
            { name: 'Tamagoyaki', portion: '80g', calories: 120 },
            { name: 'Kinpira gobo', portion: '60g', calories: 60 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Soba', portion: '200g', calories: 250 },
            { name: 'Tempura yasai', portion: '100g', calories: 180 },
            { name: 'Dashi', portion: '150ml', calories: 15 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Grilled saba', portion: '150g', calories: 280 },
            { name: 'Genmai', portion: '150g', calories: 170 },
            { name: 'Hijiki nimono', portion: '80g', calories: 60 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Edamame', portion: '80g', calories: 95 },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Genmaicha', portion: '2 fincan', calories: 0, note: 'Esmer pirinç çayı' },
          ],
        },
      ],
    },
    {
      day: 28,
      title: 'Gün 28 - Son Düzlük Başlıyor 🎊',
      totalCalories: 1850,
      note: 'Son üç gün! Harika bir yolculuk.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 420,
          foods: [
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Grilled aji', portion: '80g', calories: 130 },
            { name: 'Natto', portion: '40g', calories: 80 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 530,
          foods: [
            { name: 'Kaisendon', portion: '350g', calories: 450, note: 'Deniz ürünleri pirinç' },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Sukiyaki', portion: '350g', calories: 400 },
            { name: 'Pirinç', portion: '100g', calories: 120 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Mochi', portion: '2 adet', calories: 140 },
            { name: 'Meyve', portion: '150g', calories: 90 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 29,
      title: 'Gün 29 - Yarın Son Gün! 🌅',
      totalCalories: 1800,
      note: 'Son iki gün! Japon beslenme ustası oldunuz.',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 400,
          foods: [
            { name: 'Ochazuke', portion: '300g', calories: 220 },
            { name: 'Salmon', portion: '60g', calories: 120 },
            { name: 'Nori', portion: '2 yaprak', calories: 10 },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 500,
          foods: [
            { name: 'Bento', portion: '400g', calories: 450 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'Teriyaki salmon', portion: '150g', calories: 280 },
            { name: 'Pirinç', portion: '150g', calories: 180 },
            { name: 'Ohitashi', portion: '80g', calories: 40 },
            { name: 'Miso çorbası', portion: '150ml', calories: 45 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğünler',
          totalCalories: 350,
          foods: [
            { name: 'Onigiri', portion: '1 adet', calories: 180 },
            { name: 'Meyve', portion: '120g', calories: 70 },
            { name: 'Yeşil çay', portion: '2 fincan', calories: 0 },
          ],
        },
      ],
    },
    {
      day: 30,
      title: 'Gün 30 - TAMAMLANDI! 🎌🏆🎉',
      totalCalories: 1900,
      note: '30 günü başarıyla tamamladınız! Omedetou gozaimasu! (Tebrikler!)',
      meals: [
        {
          type: 'breakfast',
          name: 'Şampiyon Kahvaltısı (朝食)',
          totalCalories: 480,
          foods: [
            { name: 'Premium Japon kahvaltı seti', portion: '500g', calories: 420, note: 'Tüm klasikler' },
            { name: 'Matcha', portion: '1 fincan', calories: 5, note: 'Özel' },
          ],
        },
        {
          type: 'lunch',
          name: 'Zafer Öğle Yemeği (昼食)',
          totalCalories: 570,
          foods: [
            { name: 'Omakase sushi', portion: '15 adet', calories: 550 },
            { name: 'Miso çorbası', portion: '100ml', calories: 30 },
          ],
        },
        {
          type: 'dinner',
          name: 'Kutlama Akşam Yemeği (夕食)',
          totalCalories: 600,
          foods: [
            { name: 'Kaiseki tarzı yemek', portion: '600g', calories: 500, note: '8 kurs' },
            { name: 'Yeşil çay', portion: '1 fincan', calories: 0 },
          ],
        },
        {
          type: 'snack',
          name: 'Kutlama Tatlısı',
          totalCalories: 250,
          foods: [
            { name: 'Premium wagashi', portion: '3 adet', calories: 180, note: 'Japon tatlı sanatı' },
            { name: 'Matcha', portion: '1 fincan', calories: 5 },
            { name: 'Mevsim meyvesi', portion: '80g', calories: 50 },
          ],
        },
      ],
    },
  ],

  expectedResults: {
    tr: `📊 BEKLENEN SONUÇLAR (30 Günde)

⏳ Uzun Ömür Potansiyeli:
• Japon beslenme alışkanlıkları ile yaşam kalitesi artışı
• Yaşa bağlı hastalıklarda gecikme potansiyeli
• Hücresel yaşlanmayı yavaşlatma

❤️ Kardiyovasküler Sağlık:
• Kalp hastalığı riski: %20-30 azalma potansiyeli
• Kolesterol: İyileşme
• Kan basıncı: Dengeli

⚖️ Kilo Kontrolü:
• Toplam: 2-4 kg kayıp (Hara Hachi Bu ile)
• Bel çevresi: 3-5 cm azalma
• Doğal porsiyon kontrolü gelişimi

🧠 Bilişsel Sağlık:
• Mental netlik: Artış
• Hafıza: İyileşme
• Ruh hali: Denge

🌿 Sindirim Sağlığı:
• Bağırsak florası: İyileşme (fermente gıdalar)
• Sindirim: Düzenlilik
• Şişkinlik: Azalma

⚡ Enerji:
• Gün boyu stabil enerji
• Öğle yorgunluğu: Azalma
• Uyku kalitesi: İyileşme

🍽️ Yemek Alışkanlıkları:
• Yavaş yemek alışkanlığı
• Bilinçli beslenme (mindful eating)
• Porsiyon farkındalığı

⚠️ Önemli:
• Sonuçlar kişiye göre değişir
• Geleneksel prensiplere bağlı kalın
• Egzersiz ile kombine edin`,

    en: `📊 EXPECTED RESULTS (In 30 Days)

⏳ Longevity Potential:
• Increased quality of life with Japanese eating habits
• Potential delay in age-related diseases
• Slowing of cellular aging

❤️ Cardiovascular Health:
• Heart disease risk: 20-30% reduction potential
• Cholesterol: Improvement
• Blood pressure: Balanced

⚖️ Weight Control:
• Total: 2-4 kg loss (with Hara Hachi Bu)
• Waist circumference: 3-5 cm reduction
• Development of natural portion control

🧠 Cognitive Health:
• Mental clarity: Increase
• Memory: Improvement
• Mood: Balance

🌿 Digestive Health:
• Gut flora: Improvement (fermented foods)
• Digestion: Regularity
• Bloating: Decrease

⚡ Energy:
• Stable energy throughout the day
• Afternoon fatigue: Decrease
• Sleep quality: Improvement

🍽️ Eating Habits:
• Slow eating habit
• Mindful eating
• Portion awareness

⚠️ Important:
• Results vary by individual
• Stick to traditional principles
• Combine with exercise`,
  },
};
