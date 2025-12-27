import { Diet } from './types';

export const lowCarbDiet: Diet = {
  id: 'low-carb',
  name: {
    tr: 'Düşük Karbonhidrat Diyeti',
    en: 'Low Carb Diet',
  },
  emoji: '🥗',
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
      'FAYDA 3 - Ekleyin...',
    ],
    en: [
      'BENEFIT 1 - Add...',
      'BENEFIT 2 - Add...',
      'BENEFIT 3 - Add...',
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
      '🥩 Protein kaynakları',
      '🥬 Düşük karbonhidratlı sebzeler',
      '🥜 Sağlıklı yağlar',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🥩 Protein sources',
      '🥬 Low-carb vegetables',
      '🥜 Healthy fats',
      '// ADD MORE...',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🍞 Ekmek',
      '🍚 Pirinç',
      '🍝 Makarna',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🍞 Bread',
      '🍚 Rice',
      '🍝 Pasta',
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
