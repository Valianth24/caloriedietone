import { Diet } from './types';

export const paleoDiet: Diet = {
  id: 'paleo',
  name: {
    tr: 'Paleo Diyet',
    en: 'Paleo Diet',
  },
  emoji: '🦴',
  isPremium: true,
  duration: 30, // 30 gün
  difficulty: 'medium',

  description: {
    tr: 'BURAYA TÜRKÇE AÇIKLAMA YAZIN - Taş devri diyeti...',
    en: 'WRITE ENGLISH DESCRIPTION HERE - Stone age diet...',
  },

  scientificInfo: {
    tr: `BURAYA BİLİMSEL BİLGİ YAZIN...`,
    en: `WRITE SCIENTIFIC INFO HERE...`,
  },

  benefits: {
    tr: [
      'FAYDA 1 - Ekleyin...',
      'FAYDA 2 - Ekleyin...',
    ],
    en: [
      'BENEFIT 1 - Add...',
      'BENEFIT 2 - Add...',
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
      '🥩 Et',
      '🐟 Balık',
      '🥬 Sebzeler',
      '🍎 Meyveler',
      '🥜 Kuruyemişler',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🥩 Meat',
      '🐟 Fish',
      '🥬 Vegetables',
      '🍎 Fruits',
      '🥜 Nuts',
      '// ADD MORE...',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🌾 Tahıllar',
      '🥛 Süt ürünleri',
      '🫘 Baklagiller',
      '🍬 İşlenmiş gıdalar',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🌾 Grains',
      '🥛 Dairy',
      '🫘 Legumes',
      '🍬 Processed foods',
      '// ADD MORE...',
    ],
  },

  exercises: [
    {
      name: 'EGZERSIZ ADI',
      duration: 'SÜRE',
      frequency: 'SIKLIK',
    },
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
    // DAHA FAZLA GÜN EKLEYIN...
  ],

  expectedResults: {
    tr: 'BEKLENEN SONUÇLAR...',
    en: 'EXPECTED RESULTS...',
  },
};
