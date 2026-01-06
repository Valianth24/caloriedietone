/**
 * Food Database - Besin Veritabanı
 * 6082 yemek içerir (Türkçe ve İngilizce)
 * 
 * Bu dosya Play Store uygulaması için optimize edilmiştir.
 * Tüm yemek verileri frontend'de statik olarak tutulur.
 * Network isteği gerektirmez, offline çalışır.
 */

import foodData from './foodDatabase.json';

// Type definitions
export interface FoodItem {
  food_id: string;
  name: string;        // Türkçe ad
  name_en: string;     // İngilizce ad
  calories: number;    // kcal
  protein: number;     // gram
  carbs: number;       // gram
  fat: number;         // gram
}

// Export the food database
export const FOOD_DATABASE: FoodItem[] = foodData as FoodItem[];

// Total count
export const FOOD_COUNT = FOOD_DATABASE.length;

/**
 * Yemek ara (Türkçe veya İngilizce)
 * @param query - Arama sorgusu
 * @param locale - Dil (tr veya en)
 * @param limit - Maksimum sonuç sayısı
 */
export function searchFoods(query: string, locale: string = 'tr', limit: number = 50): FoodItem[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const searchField = locale === 'en' ? 'name_en' : 'name';
  
  const results = FOOD_DATABASE.filter(food => {
    const name = (food[searchField as keyof FoodItem] as string).toLowerCase();
    return name.includes(normalizedQuery);
  });
  
  // Sort by relevance (exact match first, then starts with, then contains)
  results.sort((a, b) => {
    const nameA = (a[searchField as keyof FoodItem] as string).toLowerCase();
    const nameB = (b[searchField as keyof FoodItem] as string).toLowerCase();
    
    // Exact match priority
    if (nameA === normalizedQuery) return -1;
    if (nameB === normalizedQuery) return 1;
    
    // Starts with priority
    const startsWithA = nameA.startsWith(normalizedQuery);
    const startsWithB = nameB.startsWith(normalizedQuery);
    if (startsWithA && !startsWithB) return -1;
    if (!startsWithA && startsWithB) return 1;
    
    // Alphabetical
    return nameA.localeCompare(nameB, locale);
  });
  
  return results.slice(0, limit);
}

/**
 * ID'ye göre yemek bul
 * @param foodId - Yemek ID'si (ör: food_001)
 */
export function getFoodById(foodId: string): FoodItem | undefined {
  return FOOD_DATABASE.find(food => food.food_id === foodId);
}

/**
 * Rastgele yemek önerileri
 * @param count - Öneri sayısı
 */
export function getRandomFoods(count: number = 10): FoodItem[] {
  const shuffled = [...FOOD_DATABASE].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Kalori aralığına göre yemek filtrele
 * @param minCal - Minimum kalori
 * @param maxCal - Maksimum kalori
 */
export function filterByCalories(minCal: number, maxCal: number): FoodItem[] {
  return FOOD_DATABASE.filter(food => 
    food.calories >= minCal && food.calories <= maxCal
  );
}

/**
 * Yüksek proteinli yemekler
 * @param minProtein - Minimum protein (gram)
 * @param limit - Maksimum sonuç
 */
export function getHighProteinFoods(minProtein: number = 20, limit: number = 50): FoodItem[] {
  return FOOD_DATABASE
    .filter(food => food.protein >= minProtein)
    .sort((a, b) => b.protein - a.protein)
    .slice(0, limit);
}

/**
 * Düşük kalorili yemekler
 * @param maxCalories - Maksimum kalori
 * @param limit - Maksimum sonuç
 */
export function getLowCalorieFoods(maxCalories: number = 100, limit: number = 50): FoodItem[] {
  return FOOD_DATABASE
    .filter(food => food.calories <= maxCalories)
    .sort((a, b) => a.calories - b.calories)
    .slice(0, limit);
}

/**
 * Düşük karbonhidratlı yemekler (keto-friendly)
 * @param maxCarbs - Maksimum karbonhidrat (gram)
 * @param limit - Maksimum sonuç
 */
export function getLowCarbFoods(maxCarbs: number = 10, limit: number = 50): FoodItem[] {
  return FOOD_DATABASE
    .filter(food => food.carbs <= maxCarbs)
    .sort((a, b) => a.carbs - b.carbs)
    .slice(0, limit);
}

// Default export
export default {
  FOOD_DATABASE,
  FOOD_COUNT,
  searchFoods,
  getFoodById,
  getRandomFoods,
  filterByCalories,
  getHighProteinFoods,
  getLowCalorieFoods,
  getLowCarbFoods,
};
