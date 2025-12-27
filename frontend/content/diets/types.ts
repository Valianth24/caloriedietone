// Diyet veri tipleri
export interface DietFood {
  name: string;        // Besin adı
  portion: string;     // Porsiyon
  calories: number;    // Kalori
  note?: string;       // Ek not
}

export interface DietExercise {
  name: string;        // Egzersiz adı
  duration: string;    // Süre (örn: "30 dakika")
  frequency: string;   // Sıklık (örn: "Haftada 3 kez")
  note?: string;       // Ek not
}

export interface DietMeal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';  // Öğün tipi
  name: string;        // Öğün adı
  foods: DietFood[];   // Yiyecekler
  totalCalories: number;
}

export interface DietDay {
  day: number;         // Gün numarası (1, 2, 3...)
  title: string;       // Gün başlığı
  meals: DietMeal[];   // Öğünler
  totalCalories: number;
  note?: string;       // Gün için özel not
}

export interface Diet {
  id: string;                    // Benzersiz ID
  name: {
    tr: string;                  // Türkçe isim
    en: string;                  // İngilizce isim
  };
  emoji: string;                 // Diyet emojisi
  isPremium: boolean;            // Premium mi?
  duration: number;              // Önerilen süre (gün)
  difficulty: 'easy' | 'medium' | 'hard';  // Zorluk seviyesi
  
  // Bilimsel Açıklama
  description: {
    tr: string;                  // Türkçe açıklama
    en: string;                  // İngilizce açıklama
  };
  
  // Bilimsel Bilgi
  scientificInfo: {
    tr: string;                  // Türkçe bilimsel bilgi
    en: string;                  // İngilizce bilimsel bilgi
  };
  
  // Faydaları
  benefits: {
    tr: string[];                // Türkçe faydalar
    en: string[];                // İngilizce faydalar
  };
  
  // Dikkat Edilmesi Gerekenler
  warnings: {
    tr: string[];                // Türkçe uyarılar
    en: string[];                // İngilizce uyarılar
  };
  
  // Kullanılacak Besinler
  allowedFoods: {
    tr: string[];                // Türkçe yiyecek listesi
    en: string[];                // İngilizce yiyecek listesi
  };
  
  // Yasak Besinler
  forbiddenFoods: {
    tr: string[];                // Türkçe yasak yiyecekler
    en: string[];                // İngilizce yasak yiyecekler
  };
  
  // Önerilen Sporlar
  exercises: DietExercise[];
  
  // Günlük Planlar
  days: DietDay[];
  
  // Tahmini Sonuçlar
  expectedResults: {
    tr: string;                  // Türkçe beklenen sonuçlar
    en: string;                  // İngilizce beklenen sonuçlar
  };
}
