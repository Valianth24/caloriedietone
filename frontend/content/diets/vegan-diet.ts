import { Diet } from './types';

export const veganDiet: Diet = {
  id: 'vegan',
  name: {
    tr: 'Vegan Diyet',
    en: 'Vegan Diet',
  },
  emoji: '🌱',
  isPremium: true,
  duration: 30, // 30 gün
  difficulty: 'medium',

  description: {
    tr: 'BURAYA TÜRKÇE AÇIKLAMA YAZIN...',
    en: 'WRITE ENGLISH DESCRIPTION HERE...',
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
      'UYARI 1 - B12 takviyesi gerekli',
      'UYARI 2 - Ekleyin...',
    ],
    en: [
      'WARNING 1 - B12 supplement needed',
      'WARNING 2 - Add...',
    ],
  },

  allowedFoods: {
    tr: [
      '🥬 Sebzeler',
      '🍎 Meyveler',
      '🌾 Tahıllar',
      '🥜 Baklagiller',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🥬 Vegetables',
      '🍎 Fruits',
      '🌾 Grains',
      '🥜 Legumes',
      '// ADD MORE...',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🥩 Et ürünleri',
      '🥛 Süt ürünleri',
      '🥚 Yumurta',
      '🍯 Bal',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🥩 Meat products',
      '🥛 Dairy products',
      '🥚 Eggs',
      '🍯 Honey',
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
      totalCalories: 1800,
      meals: [
        { type: 'breakfast', name: 'Kahvaltı', totalCalories: 450, foods: [] },
        { type: 'lunch', name: 'Öğle', totalCalories: 600, foods: [] },
        { type: 'dinner', name: 'Akşam', totalCalories: 550, foods: [] },
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
