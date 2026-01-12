/**
 * Az Bulunan veya Pahalı Malzemeler için Alternatif Önerileri
 */

export interface FoodAlternative {
  original: string;
  alternatives: string[];
  note?: string;
}

export const foodAlternatives: { [key: string]: FoodAlternative } = {
  // Kinoa alternatifleri
  'Kinoa': {
    original: 'Kinoa',
    alternatives: ['Bulgur', 'Esmer pirinç', 'Karabuğday', 'Yulaf'],
    note: 'Benzer besin değeri için protein açısından zengin tam tahıllar',
  },
  'Quinoa': {
    original: 'Quinoa',
    alternatives: ['Bulgur', 'Brown rice', 'Buckwheat', 'Oats'],
    note: 'Protein-rich whole grains for similar nutritional value',
  },

  // Avokado alternatifleri
  'Avokado': {
    original: 'Avokado',
    alternatives: ['Zeytin', 'Fındık', 'Ceviz', 'Fıstık ezmesi'],
    note: 'Sağlıklı yağlar için. Zeytinyağı da eklenebilir',
  },
  'Avocado': {
    original: 'Avocado',
    alternatives: ['Olives', 'Hazelnuts', 'Walnuts', 'Peanut butter'],
    note: 'For healthy fats. Olive oil can also be added',
  },

  // Chia tohumu alternatifleri
  'Chia tohumu': {
    original: 'Chia tohumu',
    alternatives: ['Keten tohumu', 'Susam', 'Kabak çekirdeği', 'Ayçekirdeği'],
    note: 'Omega-3 ve lif için benzer faydalar',
  },
  'Chia seeds': {
    original: 'Chia seeds',
    alternatives: ['Flax seeds', 'Sesame', 'Pumpkin seeds', 'Sunflower seeds'],
    note: 'Similar benefits for omega-3 and fiber',
  },

  // Somon alternatifleri
  'Somon': {
    original: 'Somon',
    alternatives: ['İstavrit', 'Uskumru', 'Hamsi', 'Mezgit', 'Sardalya'],
    note: 'Omega-3 açısından zengin ve daha uygun fiyatlı balıklar',
  },
  'Salmon': {
    original: 'Salmon',
    alternatives: ['Mackerel', 'Sardines', 'Herring', 'Anchovies'],
    note: 'Rich in omega-3 and more affordable fish options',
  },

  // Badem sütü alternatifleri
  'Badem sütü': {
    original: 'Badem sütü',
    alternatives: ['Yulaf sütü', 'Soya sütü', 'Süt', 'Pirinç sütü'],
    note: 'Benzer kullanım için bitki bazlı veya normal süt',
  },
  'Almond milk': {
    original: 'Almond milk',
    alternatives: ['Oat milk', 'Soy milk', 'Regular milk', 'Rice milk'],
    note: 'Plant-based or regular milk for similar use',
  },

  // Hindistan cevizi yağı alternatifleri
  'Hindistan cevizi yağı': {
    original: 'Hindistan cevizi yağı',
    alternatives: ['Zeytinyağı', 'Tereyağı', 'Ayçiçek yağı'],
    note: 'Pişirme için alternatif sağlıklı yağlar',
  },
  'Coconut oil': {
    original: 'Coconut oil',
    alternatives: ['Olive oil', 'Butter', 'Sunflower oil'],
    note: 'Alternative healthy fats for cooking',
  },

  // Kale alternatifleri
  'Kale': {
    original: 'Kale',
    alternatives: ['Ispanak', 'Roka', 'Pazı', 'Semizotu'],
    note: 'Yeşil yapraklı sebzeler, vitamin ve mineral açısından zengin',
  },

  // Keçi peyniri alternatifleri
  'Keçi peyniri': {
    original: 'Keçi peyniri',
    alternatives: ['Beyaz peynir', 'Lor peyniri', 'Tulum peyniri'],
    note: 'Benzer protein ve kalsiyum içeriği',
  },
  'Goat cheese': {
    original: 'Goat cheese',
    alternatives: ['Feta cheese', 'Cottage cheese', 'Ricotta'],
    note: 'Similar protein and calcium content',
  },

  // Acai bowl alternatifleri
  'Acai': {
    original: 'Acai',
    alternatives: ['Böğürtlen', 'Yaban mersini', 'Çilek', 'Nar'],
    note: 'Antioksidan açısından zengin yerel meyveler',
  },

  // Protein tozu alternatifleri
  'Protein tozu': {
    original: 'Protein tozu',
    alternatives: ['Yumurta', 'Süzme yoğurt', 'Peynir', 'Tavuk göğsü'],
    note: 'Doğal protein kaynakları',
  },
  'Protein powder': {
    original: 'Protein powder',
    alternatives: ['Eggs', 'Greek yogurt', 'Cheese', 'Chicken breast'],
    note: 'Natural protein sources',
  },

  // Kimchi alternatifleri
  'Kimchi': {
    original: 'Kimchi',
    alternatives: ['Lahana turşusu', 'Kornişon', 'Karışık turşu'],
    note: 'Probiyotik için fermente sebzeler',
  },

  // Kombucha alternatifleri
  'Kombucha': {
    original: 'Kombucha',
    alternatives: ['Kefir', 'Ayran', 'Ev yapımı yoğurt'],
    note: 'Probiyotik içecekler',
  },

  // Quinoa flour alternatifleri
  'Kinoa unu': {
    original: 'Kinoa unu',
    alternatives: ['Kepek', 'Tam buğday unu', 'Yulaf unu', 'Çavdar unu'],
    note: 'Tam tahıl unları',
  },

  // Spirulina alternatifleri
  'Spirulina': {
    original: 'Spirulina',
    alternatives: ['Ispanak', 'Maydanoz', 'Roka', 'Semizotu'],
    note: 'Yeşil yapraklı sebzeler protein ve mineral için',
  },

  // Acı kakao alternatifleri
  'Kakao nibs': {
    original: 'Kakao nibs',
    alternatives: ['Bitter çikolata (%70+)', 'Kakao tozu', 'Fındık'],
    note: 'Antioksidan ve magnezyum kaynağı',
  },

  // Edamame alternatifleri
  'Edamame': {
    original: 'Edamame',
    alternatives: ['Bezelye', 'Nohut', 'Barbunya', 'Yeşil fasulye'],
    note: 'Protein ve lif için baklagiller',
  },
};

/**
 * Malzeme adından alternatif önerileri al
 */
export const getFoodAlternatives = (foodName: string): FoodAlternative | null => {
  // Direkt eşleşme
  if (foodAlternatives[foodName]) {
    return foodAlternatives[foodName];
  }

  // Kısmi eşleşme (ör: "Kinoa (pişmiş)" → "Kinoa")
  for (const [key, value] of Object.entries(foodAlternatives)) {
    if (foodName.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  return null;
};

/**
 * Tüm az bulunan malzemelerin listesi
 */
export const rareIngredients = Object.keys(foodAlternatives);

/**
 * Malzemenin az bulunan/pahalı olup olmadığını kontrol et
 */
export const isRareIngredient = (foodName: string): boolean => {
  return rareIngredients.some(rare => 
    foodName.toLowerCase().includes(rare.toLowerCase())
  );
};
