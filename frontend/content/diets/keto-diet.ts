import { Diet } from './types';

export const ketoDiet: Diet = {
  id: 'keto',
  name: {
    tr: 'Ketojenik Diyet',
    en: 'Ketogenic Diet',
  },
  emoji: '🥑',
  isPremium: true,
  duration: 28, // 28 gün
  difficulty: 'hard',

  description: {
    tr: 'BURAYA TÜRKÇE AÇIKLAMA YAZIN - Ketojenik diyet nedir, nasıl çalışır...',
    en: 'WRITE ENGLISH DESCRIPTION HERE - What is ketogenic diet, how it works...',
  },

  scientificInfo: {
    tr: `BURAYA BİLİMSEL BİLGİ YAZIN
    
    Örnek:
    - Keton cisimlerinin oluşumu
    - Yağ yakımı mekanizması
    - İnsülin direnci üzerine etkileri
    - Araştırma sonuçları`,
    en: `WRITE SCIENTIFIC INFO HERE
    
    Example:
    - Ketone body formation
    - Fat burning mechanism
    - Effects on insulin resistance
    - Research results`,
  },

  benefits: {
    tr: [
      'FAYDA 1 - Örn: Hızlı kilo kaybı',
      'FAYDA 2 - Örn: Kan şekeri kontrolü',
      'FAYDA 3 - Örn: Zihinsel netlik',
      'FAYDA 4 - Örn: Enerji artışı',
      'FAYDA 5 - Ekleyin...',
    ],
    en: [
      'BENEFIT 1 - E.g.: Rapid weight loss',
      'BENEFIT 2 - E.g.: Blood sugar control',
      'BENEFIT 3 - E.g.: Mental clarity',
      'BENEFIT 4 - E.g.: Increased energy',
      'BENEFIT 5 - Add more...',
    ],
  },

  warnings: {
    tr: [
      'UYARI 1 - Örn: Böbrek hastalarına uygun değil',
      'UYARI 2 - Örn: Keto gribi yaşanabilir',
      'UYARI 3 - Örn: Doktor kontrolünde yapılmalı',
      'UYARI 4 - Ekleyin...',
    ],
    en: [
      'WARNING 1 - E.g.: Not suitable for kidney patients',
      'WARNING 2 - E.g.: Keto flu may occur',
      'WARNING 3 - E.g.: Should be done under doctor supervision',
      'WARNING 4 - Add more...',
    ],
  },

  allowedFoods: {
    tr: [
      '🥩 YIYECEK 1 - Örn: Kırmızı et',
      '🐟 YIYECEK 2 - Örn: Balık ve deniz ürünleri',
      '🥚 YIYECEK 3 - Örn: Yumurta',
      '🧀 YIYECEK 4 - Örn: Peynir çeşitleri',
      '🥑 YIYECEK 5 - Örn: Avokado',
      '🥬 YIYECEK 6 - Örn: Yeşil yapraklı sebzeler',
      '🫒 YIYECEK 7 - Örn: Zeytinyağı',
      '🥜 YIYECEK 8 - Örn: Fındık, badem',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🥩 FOOD 1 - E.g.: Red meat',
      '🐟 FOOD 2 - E.g.: Fish and seafood',
      '🥚 FOOD 3 - E.g.: Eggs',
      '🧀 FOOD 4 - E.g.: Cheese varieties',
      '🥑 FOOD 5 - E.g.: Avocado',
      '🥬 FOOD 6 - E.g.: Green leafy vegetables',
      '🫒 FOOD 7 - E.g.: Olive oil',
      '🥜 FOOD 8 - E.g.: Almonds, hazelnuts',
      '// ADD MORE...',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🍞 YASAK 1 - Örn: Ekmek ve tahıllar',
      '🍚 YASAK 2 - Örn: Pirinç ve makarna',
      '🍬 YASAK 3 - Örn: Şeker ve tatlılar',
      '🍎 YASAK 4 - Örn: Yüksek şekerli meyveler',
      '🥔 YASAK 5 - Örn: Patates',
      '🥤 YASAK 6 - Örn: Şekerli içecekler',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🍞 FORBIDDEN 1 - E.g.: Bread and grains',
      '🍚 FORBIDDEN 2 - E.g.: Rice and pasta',
      '🍬 FORBIDDEN 3 - E.g.: Sugar and sweets',
      '🍎 FORBIDDEN 4 - E.g.: High-sugar fruits',
      '🥔 FORBIDDEN 5 - E.g.: Potatoes',
      '🥤 FORBIDDEN 6 - E.g.: Sugary drinks',
      '// ADD MORE...',
    ],
  },

  exercises: [
    {
      name: 'EGZERSIZ 1 - Örn: Yürüyüş',
      duration: '30 dakika',
      frequency: 'Her gün',
      note: 'Sabah aç karnına tercih edilebilir',
    },
    {
      name: 'EGZERSIZ 2 - Örn: Ağırlık antrenmanı',
      duration: '45 dakika',
      frequency: 'Haftada 3 kez',
      note: 'Kas kaybını önlemek için',
    },
    {
      name: 'EGZERSIZ 3 - Örn: Yoga',
      duration: '20 dakika',
      frequency: 'Haftada 2 kez',
      note: 'Esneklik ve rahatlama için',
    },
    // DAHA FAZLA EGZERSİZ EKLEYIN...
  ],

  // 28 GÜNLÜK PLAN - HER GÜNÜ DOLDURUN
  days: [
    {
      day: 1,
      title: 'Gün 1 - Başlangıç',
      totalCalories: 1800,
      note: 'İlk gün notları...',
      meals: [
        {
          type: 'breakfast',
          name: 'Kahvaltı',
          totalCalories: 500,
          foods: [
            { name: 'YIYECEK ADI', portion: 'PORSIYON', calories: 200, note: 'Not' },
            { name: 'YIYECEK ADI', portion: 'PORSIYON', calories: 150 },
            { name: 'YIYECEK ADI', portion: 'PORSIYON', calories: 150 },
          ],
        },
        {
          type: 'lunch',
          name: 'Öğle Yemeği',
          totalCalories: 600,
          foods: [
            { name: 'YIYECEK ADI', portion: 'PORSIYON', calories: 300 },
            { name: 'YIYECEK ADI', portion: 'PORSIYON', calories: 200 },
            { name: 'YIYECEK ADI', portion: 'PORSIYON', calories: 100 },
          ],
        },
        {
          type: 'dinner',
          name: 'Akşam Yemeği',
          totalCalories: 550,
          foods: [
            { name: 'YIYECEK ADI', portion: 'PORSIYON', calories: 350 },
            { name: 'YIYECEK ADI', portion: 'PORSIYON', calories: 200 },
          ],
        },
        {
          type: 'snack',
          name: 'Ara Öğün',
          totalCalories: 150,
          foods: [
            { name: 'YIYECEK ADI', portion: 'PORSIYON', calories: 150 },
          ],
        },
      ],
    },
    // GÜN 2-28 İÇİN KOPYALAYIN VE DOLDURUN...
    {
      day: 2,
      title: 'Gün 2',
      totalCalories: 1800,
      meals: [
        { type: 'breakfast', name: 'Kahvaltı', totalCalories: 500, foods: [] },
        { type: 'lunch', name: 'Öğle', totalCalories: 600, foods: [] },
        { type: 'dinner', name: 'Akşam', totalCalories: 550, foods: [] },
        { type: 'snack', name: 'Ara Öğün', totalCalories: 150, foods: [] },
      ],
    },
    // ... 3-28 arası günleri ekleyin
  ],

  expectedResults: {
    tr: 'BEKLENEN SONUÇLAR - Örn: 28 günde 4-8 kg kayıp beklenir...',
    en: 'EXPECTED RESULTS - E.g.: 4-8 kg loss expected in 28 days...',
  },
};
