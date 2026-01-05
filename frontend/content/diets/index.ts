// Tüm diyetleri buradan export ediyoruz
// Popülerlik sırasına göre dizilmiş (en popüler üstte)
import { Diet } from './types';

// 7 günlük diyetler
import { ketoDiet } from './keto-diet';
import { mediterraneanDiet } from './mediterranean-diet';
import { intermittentFasting } from './intermittent-fasting';
import { lowCarbDiet } from './low-carb-diet';
import { veganDiet } from './vegan-diet';
import { paleoDiet } from './paleo-diet';

// 30 günlük diyetler
import { dashDiet30 } from './30-day-plans/dash-diet-30';
import { mindDiet30 } from './30-day-plans/mind-diet-30';
import { nordicDiet30 } from './30-day-plans/nordic-diet-30';
import { japaneseDiet30 } from './30-day-plans/japanese-diet-30';
import { highProteinDiet30 } from './30-day-plans/high-protein-diet-30';
import { volumetricsDiet30 } from './30-day-plans/volumetrics-diet-30';
import { lowGiDiet30 } from './30-day-plans/low-gi-diet-30';
import { intermittentFasting52Diet30 } from './30-day-plans/intermittent-fasting-5-2-30';
import { wfpbDiet30 } from './30-day-plans/wfpb-diet-30';
import { timeRestrictedEating30 } from './30-day-plans/time-restricted-eating-30';
import { flexitarianDiet30 } from './30-day-plans/flexitarian-diet-30';
import { pescatarianDiet30 } from './30-day-plans/pescatarian-diet-30';

// Tüm diyetlerin listesi - Popülerlik sırasına göre
export const allDiets: Diet[] = [
  // En popüler 7 günlük diyetler
  ketoDiet,                     // 1. Keto - En popüler
  mediterraneanDiet,            // 2. Akdeniz - Sağlıklı yaşam klasiği
  intermittentFasting,          // 3. Aralıklı Oruç 16:8
  lowCarbDiet,                  // 4. Düşük Karbonhidrat
  veganDiet,                    // 5. Vegan
  paleoDiet,                    // 6. Paleo
  // 30 günlük premium diyetler
  timeRestrictedEating30,       // 7. Zaman Kısıtlı Beslenme
  intermittentFasting52Diet30,  // 8. 5:2 Aralıklı Oruç
  highProteinDiet30,            // 9. Yüksek Protein
  dashDiet30,                   // 10. DASH - Tansiyon kontrolü
  mindDiet30,                   // 11. MIND - Beyin sağlığı
  nordicDiet30,                 // 12. Nordic
  japaneseDiet30,               // 13. Japon
  flexitarianDiet30,            // 14. Flexitarian
  pescatarianDiet30,            // 15. Pescatarian
  volumetricsDiet30,            // 16. Volumetrics
  lowGiDiet30,                  // 17. Düşük Glisemik
  wfpbDiet30,                   // 18. WFPB
];

// Premium diyetler
export const premiumDiets = allDiets.filter(d => d.isPremium);

// Ücretsiz diyetler
export const freeDiets = allDiets.filter(d => !d.isPremium);

// ID'ye göre diyet bul
export const getDietById = (id: string): Diet | undefined => {
  return allDiets.find(d => d.id === id);
};

// Tipleri export et
export * from './types';

// 7 günlük diyetleri export et
export {
  ketoDiet,
  mediterraneanDiet,
  intermittentFasting,
  lowCarbDiet,
  veganDiet,
  paleoDiet,
};

// 30 günlük diyetleri export et
export {
  dashDiet30,
  mindDiet30,
  nordicDiet30,
  japaneseDiet30,
  highProteinDiet30,
  volumetricsDiet30,
  lowGiDiet30,
  intermittentFasting52Diet30,
  wfpbDiet30,
  timeRestrictedEating30,
  flexitarianDiet30,
  pescatarianDiet30,
};
