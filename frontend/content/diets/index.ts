// Tüm diyetleri buradan export ediyoruz
// Popülerlik sırasına göre dizilmiş (en popüler üstte)
import { Diet } from './types';
import { ketoDiet } from './keto-diet';
import { mediterraneanDiet } from './mediterranean-diet';
import { intermittentFasting } from './intermittent-fasting';
import { lowCarbDiet } from './low-carb-diet';
import { veganDiet } from './vegan-diet';
import { paleoDiet } from './paleo-diet';

// Tüm diyetlerin listesi - Popülerlik sırasına göre
export const allDiets: Diet[] = [
  ketoDiet,           // 1. Keto - En popüler
  mediterraneanDiet,  // 2. Akdeniz - Sağlıklı yaşam klasiği
  intermittentFasting,// 3. Aralıklı Oruç - Çok popüler
  lowCarbDiet,        // 4. Düşük Karbonhidrat
  veganDiet,          // 5. Vegan
  paleoDiet,          // 6. Paleo
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

// Tek tek diyetleri export et
export {
  ketoDiet,
  mediterraneanDiet,
  intermittentFasting,
  lowCarbDiet,
  veganDiet,
  paleoDiet,
};
