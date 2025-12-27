// Bilimsel Beslenme Hesaplama Modülü
// Kaynak: NASEM, Mifflin-St Jeor, ISSN Guidelines

export interface UserData {
  weight: number;      // kg
  height: number;      // cm
  age: number;         // yaş
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extreme';
  goal: 'lose_weight' | 'maintain' | 'gain_weight' | 'build_muscle';
}

export interface NutritionResults {
  bmr: number;           // Bazal Metabolizma Hızı
  tdee: number;          // Günlük Toplam Enerji Harcaması
  targetCalories: number; // Hedefe göre kalori
  waterGoal: number;     // ml cinsinden su hedefi
  macros: {
    protein: { grams: number; calories: number; percentage: number };
    carbs: { grams: number; calories: number; percentage: number };
    fat: { grams: number; calories: number; percentage: number };
  };
  fiber: number;         // gram
  sugar: number;         // maksimum gram
}

// Aktivite çarpanları
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,      // Masa başı iş, egzersiz yok
  light: 1.375,        // Hafif egzersiz (haftada 1-3 gün)
  moderate: 1.55,      // Orta egzersiz (haftada 3-5 gün)
  very_active: 1.725,  // Yoğun egzersiz (haftada 6-7 gün)
  extreme: 1.9,        // Çok yoğun (günde 2 kez veya fiziksel iş)
};

// Hedef çarpanları (TDEE'ye göre)
const GOAL_MULTIPLIERS = {
  lose_weight: 0.80,    // %20 kalori açığı
  maintain: 1.0,        // TDEE ile aynı
  gain_weight: 1.15,    // %15 kalori fazlası
  build_muscle: 1.10,   // %10 kalori fazlası (yavaş hacim)
};

// Makro oranları (hedefe göre)
const MACRO_RATIOS = {
  lose_weight: { protein: 0.35, carbs: 0.40, fat: 0.25 },      // Yüksek protein, düşük yağ
  maintain: { protein: 0.25, carbs: 0.50, fat: 0.25 },         // Dengeli
  gain_weight: { protein: 0.25, carbs: 0.55, fat: 0.20 },      // Yüksek karbonhidrat
  build_muscle: { protein: 0.30, carbs: 0.45, fat: 0.25 },     // Yüksek protein
};

/**
 * Mifflin-St Jeor Denklemi ile BMR Hesaplama
 * En güncel ve doğru kabul edilen formül
 */
export function calculateBMR(data: UserData): number {
  const { weight, height, age, gender } = data;
  
  // Mifflin-St Jeor Formula
  // Erkek: (10 × kg) + (6.25 × cm) − (5 × yaş) + 5
  // Kadın: (10 × kg) + (6.25 × cm) − (5 × yaş) − 161
  
  const baseBMR = (10 * weight) + (6.25 * height) - (5 * age);
  return Math.round(gender === 'male' ? baseBMR + 5 : baseBMR - 161);
}

/**
 * TDEE (Günlük Toplam Enerji Harcaması) Hesaplama
 */
export function calculateTDEE(bmr: number, activityLevel: UserData['activityLevel']): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}

/**
 * Bilimsel Su İhtiyacı Hesaplama
 * Kaynak: NASEM, Western Kentucky University
 * 
 * Formül: 
 * - Baz: Vücut ağırlığı (kg) × 35ml
 * - Aktivite eklentisi: 350ml per 30 dakika egzersiz
 * - Cinsiyet farkı: Erkekler %5 fazla
 */
export function calculateWaterGoal(data: UserData): number {
  const { weight, gender, activityLevel } = data;
  
  // Temel su ihtiyacı: 30-35ml per kg
  let baseWater = weight * 33; // Ortalama 33ml/kg
  
  // Cinsiyet farkı
  if (gender === 'male') {
    baseWater *= 1.05; // Erkekler %5 daha fazla
  }
  
  // Aktivite seviyesine göre ekleme
  const activityAddition = {
    sedentary: 0,
    light: 300,      // +300ml
    moderate: 500,   // +500ml
    very_active: 750, // +750ml
    extreme: 1000,   // +1000ml
  };
  
  const totalWater = baseWater + activityAddition[activityLevel];
  
  // 250ml'nin katlarına yuvarla
  return Math.round(totalWater / 250) * 250;
}

/**
 * Makro Besin Değerlerini Hesapla
 */
export function calculateMacros(targetCalories: number, goal: UserData['goal'], weight: number) {
  const ratios = MACRO_RATIOS[goal];
  
  // Protein: Minimum 1.6g/kg (kilo kaybı için 2g/kg önerilir)
  const minProteinGrams = goal === 'lose_weight' ? weight * 2 : weight * 1.6;
  
  // Kalori bazlı protein
  const calorieBasedProtein = (targetCalories * ratios.protein) / 4;
  
  // Daha yüksek olanı al
  const proteinGrams = Math.max(minProteinGrams, calorieBasedProtein);
  const proteinCalories = proteinGrams * 4;
  
  // Kalan kaloriyi karbonhidrat ve yağ için böl
  const remainingCalories = targetCalories - proteinCalories;
  
  // Oranları yeniden hesapla
  const carbFatRatio = ratios.carbs / (ratios.carbs + ratios.fat);
  
  const carbsCalories = remainingCalories * carbFatRatio;
  const fatCalories = remainingCalories * (1 - carbFatRatio);
  
  const carbsGrams = carbsCalories / 4;
  const fatGrams = fatCalories / 9;
  
  return {
    protein: {
      grams: Math.round(proteinGrams),
      calories: Math.round(proteinCalories),
      percentage: Math.round((proteinCalories / targetCalories) * 100),
    },
    carbs: {
      grams: Math.round(carbsGrams),
      calories: Math.round(carbsCalories),
      percentage: Math.round((carbsCalories / targetCalories) * 100),
    },
    fat: {
      grams: Math.round(fatGrams),
      calories: Math.round(fatCalories),
      percentage: Math.round((fatCalories / targetCalories) * 100),
    },
  };
}

/**
 * Lif İhtiyacı Hesaplama
 * Öneri: 14g per 1000 kalori veya 25-38g/gün
 */
export function calculateFiber(targetCalories: number, gender: 'male' | 'female'): number {
  const calorieBasedFiber = (targetCalories / 1000) * 14;
  const minimumFiber = gender === 'male' ? 38 : 25;
  return Math.round(Math.max(calorieBasedFiber, minimumFiber * 0.8));
}

/**
 * Maksimum Şeker Miktarı
 * WHO önerisi: Günlük kalorinin %10'undan az
 */
export function calculateMaxSugar(targetCalories: number): number {
  return Math.round((targetCalories * 0.10) / 4); // 4 kalori per gram şeker
}

/**
 * Tam Beslenme Hesaplaması
 */
export function calculateNutrition(data: UserData): NutritionResults {
  const bmr = calculateBMR(data);
  const tdee = calculateTDEE(bmr, data.activityLevel);
  const targetCalories = Math.round(tdee * GOAL_MULTIPLIERS[data.goal]);
  const waterGoal = calculateWaterGoal(data);
  const macros = calculateMacros(targetCalories, data.goal, data.weight);
  const fiber = calculateFiber(targetCalories, data.gender);
  const sugar = calculateMaxSugar(targetCalories);
  
  return {
    bmr,
    tdee,
    targetCalories,
    waterGoal,
    macros,
    fiber,
    sugar,
  };
}

/**
 * İdeal Kilo Hesaplama (BMI bazlı)
 */
export function calculateIdealWeight(height: number, gender: 'male' | 'female'): { min: number; max: number; ideal: number } {
  const heightM = height / 100;
  
  // Sağlıklı BMI aralığı: 18.5 - 24.9
  const minWeight = Math.round(18.5 * heightM * heightM);
  const maxWeight = Math.round(24.9 * heightM * heightM);
  
  // Hamwi formülü ile ideal kilo
  // Erkek: 48kg ilk 152cm için + her 2.5cm için 2.7kg
  // Kadın: 45kg ilk 152cm için + her 2.5cm için 2.2kg
  let ideal: number;
  const baseHeight = 152;
  const extraHeight = Math.max(0, height - baseHeight);
  
  if (gender === 'male') {
    ideal = 48 + (extraHeight / 2.5) * 2.7;
  } else {
    ideal = 45 + (extraHeight / 2.5) * 2.2;
  }
  
  return {
    min: minWeight,
    max: maxWeight,
    ideal: Math.round(ideal),
  };
}

/**
 * Hedef Kiloya Ulaşma Süresi Tahmini
 */
export function estimateTimeToGoal(currentWeight: number, targetWeight: number, weeklyChange: number = 0.5): number {
  const weightDiff = Math.abs(currentWeight - targetWeight);
  const weeksNeeded = weightDiff / weeklyChange;
  return Math.ceil(weeksNeeded);
}

/**
 * Aktivite seviyesi açıklamaları
 */
export const ACTIVITY_DESCRIPTIONS = {
  tr: {
    sedentary: 'Hareketsiz (masa başı iş, egzersiz yok)',
    light: 'Hafif aktif (haftada 1-3 gün hafif egzersiz)',
    moderate: 'Orta aktif (haftada 3-5 gün orta yoğunlukta egzersiz)',
    very_active: 'Çok aktif (haftada 6-7 gün yoğun egzersiz)',
    extreme: 'Ekstra aktif (günde 2 kez veya fiziksel iş)',
  },
  en: {
    sedentary: 'Sedentary (desk job, no exercise)',
    light: 'Lightly active (light exercise 1-3 days/week)',
    moderate: 'Moderately active (moderate exercise 3-5 days/week)',
    very_active: 'Very active (intense exercise 6-7 days/week)',
    extreme: 'Extremely active (twice daily or physical job)',
  },
};

/**
 * Hedef açıklamaları
 */
export const GOAL_DESCRIPTIONS = {
  tr: {
    lose_weight: 'Kilo vermek (%20 kalori açığı)',
    maintain: 'Kiloyu korumak',
    gain_weight: 'Kilo almak (%15 kalori fazlası)',
    build_muscle: 'Kas yapmak (%10 kalori fazlası, yüksek protein)',
  },
  en: {
    lose_weight: 'Lose weight (20% calorie deficit)',
    maintain: 'Maintain weight',
    gain_weight: 'Gain weight (15% calorie surplus)',
    build_muscle: 'Build muscle (10% surplus, high protein)',
  },
};
