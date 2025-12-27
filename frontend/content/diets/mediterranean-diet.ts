import { Diet } from './types';

export const mediterraneanDiet: Diet = {
  id: 'mediterranean',
  name: {
    tr: 'Akdeniz Diyeti',
    en: 'Mediterranean Diet',
  },
  emoji: '🫒',
  isPremium: true,
  duration: 30, // 30 gün
  difficulty: 'easy',

  description: {
    tr: 'BURAYA TÜRKÇE AÇIKLAMA YAZIN - Akdeniz diyeti nedir...',
    en: 'WRITE ENGLISH DESCRIPTION HERE - What is Mediterranean diet...',
  },

  scientificInfo: {
    tr: `BURAYA BİLİMSEL BİLGİ YAZIN
    
    - Kalp sağlığı üzerine etkileri
    - Uzun ömür araştırmaları
    - Antioksidan faydaları`,
    en: `WRITE SCIENTIFIC INFO HERE
    
    - Effects on heart health
    - Longevity research
    - Antioxidant benefits`,
  },

  benefits: {
    tr: [
      'FAYDA 1 - Örn: Kalp sağlığını korur',
      'FAYDA 2 - Örn: Beyin fonksiyonlarını destekler',
      'FAYDA 3 - Örn: İltihap azaltır',
      'FAYDA 4 - Ekleyin...',
    ],
    en: [
      'BENEFIT 1 - E.g.: Protects heart health',
      'BENEFIT 2 - E.g.: Supports brain function',
      'BENEFIT 3 - E.g.: Reduces inflammation',
      'BENEFIT 4 - Add more...',
    ],
  },

  warnings: {
    tr: [
      'UYARI 1 - Ekleyin...',
      'UYARI 2 - Ekleyin...',
    ],
    en: [
      'WARNING 1 - Add...',
      'WARNING 2 - Add...',
    ],
  },

  allowedFoods: {
    tr: [
      '🫒 Zeytinyağı',
      '🐟 Balık',
      '🥗 Sebzeler',
      '🍇 Meyveler',
      '🥜 Kuruyemişler',
      '🌾 Tam tahıllar',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🫒 Olive oil',
      '🐟 Fish',
      '🥗 Vegetables',
      '🍇 Fruits',
      '🥜 Nuts',
      '🌾 Whole grains',
      '// ADD MORE...',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🍬 İşlenmiş şekerler',
      '🥤 Şekerli içecekler',
      '🍟 Kızartmalar',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🍬 Processed sugars',
      '🥤 Sugary drinks',
      '🍟 Fried foods',
      '// ADD MORE...',
    ],
  },

  exercises: [
    {
      name: 'EGZERSIZ 1',
      duration: '30 dakika',
      frequency: 'Her gün',
    },
    // DAHA FAZLA EKLEYIN...
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1',
      totalCalories: 2000,
      meals: [
        { type: 'breakfast', name: 'Kahvaltı', totalCalories: 500, foods: [] },
        { type: 'lunch', name: 'Öğle', totalCalories: 700, foods: [] },
        { type: 'dinner', name: 'Akşam', totalCalories: 600, foods: [] },
        { type: 'snack', name: 'Ara Öğün', totalCalories: 200, foods: [] },
      ],
    },
    // 2-30 GÜNÜ EKLEYIN...
  ],

  expectedResults: {
    tr: 'BEKLENEN SONUÇLAR YAZIN...',
    en: 'WRITE EXPECTED RESULTS...',
  },
};
