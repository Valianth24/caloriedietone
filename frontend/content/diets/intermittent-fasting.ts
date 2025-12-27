import { Diet } from './types';

export const intermittentFasting: Diet = {
  id: 'intermittent-fasting',
  name: {
    tr: 'Aralıklı Oruç (16:8)',
    en: 'Intermittent Fasting (16:8)',
  },
  emoji: '⏰',
  isPremium: true,
  duration: 21, // 21 gün
  difficulty: 'medium',

  description: {
    tr: 'BURAYA TÜRKÇE AÇIKLAMA YAZIN - 16 saat oruç, 8 saat yeme penceresi...',
    en: 'WRITE ENGLISH DESCRIPTION HERE - 16 hours fasting, 8 hours eating window...',
  },

  scientificInfo: {
    tr: `BURAYA BİLİMSEL BİLGİ YAZIN
    
    - Otofaji süreci
    - Hücre yenilenmesi
    - Metabolizma hızlanması`,
    en: `WRITE SCIENTIFIC INFO HERE
    
    - Autophagy process
    - Cell renewal
    - Metabolism boost`,
  },

  benefits: {
    tr: [
      'FAYDA 1 - Örn: Yağ yakımını artırır',
      'FAYDA 2 - Örn: İnsülin duyarlılığını artırır',
      'FAYDA 3 - Örn: Otofajiyi tetikler',
      'FAYDA 4 - Ekleyin...',
    ],
    en: [
      'BENEFIT 1 - E.g.: Increases fat burning',
      'BENEFIT 2 - E.g.: Improves insulin sensitivity',
      'BENEFIT 3 - E.g.: Triggers autophagy',
      'BENEFIT 4 - Add more...',
    ],
  },

  warnings: {
    tr: [
      'UYARI 1 - Örn: Hamilelere uygun değil',
      'UYARI 2 - Örn: Diyabet hastalarına dikkat',
      'UYARI 3 - Ekleyin...',
    ],
    en: [
      'WARNING 1 - E.g.: Not suitable for pregnant women',
      'WARNING 2 - E.g.: Caution for diabetics',
      'WARNING 3 - Add more...',
    ],
  },

  allowedFoods: {
    tr: [
      '💧 Su (oruç saatlerinde)',
      '☕ Şekersiz kahve/çay (oruç saatlerinde)',
      '🥗 Yeme penceresinde: Dengeli besinler',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '💧 Water (during fasting)',
      '☕ Unsweetened coffee/tea (during fasting)',
      '🥗 During eating window: Balanced foods',
      '// ADD MORE...',
    ],
  },

  forbiddenFoods: {
    tr: [
      '🍬 Oruç saatlerinde: Kalorili her şey',
      '🥤 Şekerli içecekler',
      '// DAHA FAZLA EKLEYIN...',
    ],
    en: [
      '🍬 During fasting: Anything with calories',
      '🥤 Sugary drinks',
      '// ADD MORE...',
    ],
  },

  exercises: [
    {
      name: 'EGZERSIZ 1 - Örn: Hafif kardiyo',
      duration: '20 dakika',
      frequency: 'Oruç sonunda',
      note: 'Yeme penceresine yakın tercih edin',
    },
    // DAHA FAZLA EKLEYIN...
  ],

  days: [
    {
      day: 1,
      title: 'Gün 1 - Başlangıç',
      totalCalories: 1600,
      note: 'Yeme penceresi: 12:00 - 20:00',
      meals: [
        { type: 'lunch', name: 'İlk Öğün (12:00)', totalCalories: 600, foods: [] },
        { type: 'snack', name: 'Ara Öğün (15:00)', totalCalories: 300, foods: [] },
        { type: 'dinner', name: 'Son Öğün (19:30)', totalCalories: 700, foods: [] },
      ],
    },
    // 2-21 GÜNÜ EKLEYIN...
  ],

  expectedResults: {
    tr: 'BEKLENEN SONUÇLAR YAZIN...',
    en: 'WRITE EXPECTED RESULTS...',
  },
};
