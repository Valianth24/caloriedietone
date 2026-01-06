# =============================================================================
# FOOD DATABASE - Besin Veritabanı
# =============================================================================
# Bu dosyayı ChatGPT'ye atıp genişletebilirsiniz
# Format: {"food_id": "food_XXX", "name": "Türkçe Ad", "calories": X, "protein": X, "carbs": X, "fat": X, "name_en": "English Name"}
# Son food_id: food_082 - Yeni eklerken food_083'ten devam edin
# =============================================================================

FOOD_DATABASE = [
  # =====================
  # PROTEIN KAYNAKLARI
  # =====================
  {"food_id": "food_001", "name": "Tavuk Göğsü (100g)", "calories": 165, "protein": 31, "carbs": 0, "fat": 3.6, "name_en": "Chicken Breast (100g)"},
  {"food_id": "food_002", "name": "Tavuk But (100g)", "calories": 209, "protein": 26, "carbs": 0, "fat": 11, "name_en": "Chicken Thigh (100g)"},
  {"food_id": "food_003", "name": "Dana Biftek (100g)", "calories": 271, "protein": 26, "carbs": 0, "fat": 18, "name_en": "Beef Steak (100g)"},
  {"food_id": "food_004", "name": "Kıyma (100g)", "calories": 250, "protein": 26, "carbs": 0, "fat": 17, "name_en": "Ground Beef (100g)"},
  {"food_id": "food_005", "name": "Somon (100g)", "calories": 208, "protein": 20, "carbs": 0, "fat": 13, "name_en": "Salmon (100g)"},
  {"food_id": "food_006", "name": "Levrek (100g)", "calories": 97, "protein": 18, "carbs": 0, "fat": 2, "name_en": "Sea Bass (100g)"},
  {"food_id": "food_007", "name": "Ton Balığı (100g)", "calories": 132, "protein": 28, "carbs": 0, "fat": 1, "name_en": "Tuna (100g)"},
  {"food_id": "food_008", "name": "Yumurta (1 Adet)", "calories": 78, "protein": 6.3, "carbs": 0.6, "fat": 5.3, "name_en": "Egg (1 Piece)"},
  {"food_id": "food_009", "name": "Yumurta Beyazı (1 Adet)", "calories": 17, "protein": 3.6, "carbs": 0.2, "fat": 0.1, "name_en": "Egg White (1 Piece)"},

  # =====================
  # KARBONHİDRAT KAYNAKLARI
  # =====================
  {"food_id": "food_010", "name": "Pirinç Pilavı (1 Porsiyon)", "calories": 206, "protein": 4.3, "carbs": 45, "fat": 0.4, "name_en": "Rice Pilaf (1 Serving)"},
  {"food_id": "food_011", "name": "Bulgur Pilavı (1 Porsiyon)", "calories": 151, "protein": 5.6, "carbs": 34, "fat": 0.4, "name_en": "Bulgur Pilaf (1 Serving)"},
  {"food_id": "food_012", "name": "Makarna (1 Porsiyon)", "calories": 221, "protein": 8, "carbs": 43, "fat": 1.3, "name_en": "Pasta (1 Serving)"},
  {"food_id": "food_013", "name": "Ekmek (1 Dilim)", "calories": 79, "protein": 2.7, "carbs": 15, "fat": 1, "name_en": "Bread (1 Slice)"},
  {"food_id": "food_014", "name": "Tam Buğday Ekmeği (1 Dilim)", "calories": 81, "protein": 4, "carbs": 14, "fat": 1.1, "name_en": "Whole Wheat Bread (1 Slice)"},
  {"food_id": "food_015", "name": "Patates (100g)", "calories": 77, "protein": 2, "carbs": 17, "fat": 0.1, "name_en": "Potato (100g)"},
  {"food_id": "food_016", "name": "Patates Kızartması (100g)", "calories": 312, "protein": 3.4, "carbs": 41, "fat": 15, "name_en": "French Fries (100g)"},
  {"food_id": "food_017", "name": "Tost (1 Adet)", "calories": 350, "protein": 15, "carbs": 30, "fat": 18, "name_en": "Toast Sandwich (1 Piece)"},

  # =====================
  # SÜT ÜRÜNLERİ
  # =====================
  {"food_id": "food_018", "name": "Süt (1 Bardak)", "calories": 149, "protein": 8, "carbs": 12, "fat": 8, "name_en": "Milk (1 Glass)"},
  {"food_id": "food_019", "name": "Yoğurt (1 Kase)", "calories": 100, "protein": 17, "carbs": 6, "fat": 0.7, "name_en": "Yogurt (1 Bowl)"},
  {"food_id": "food_020", "name": "Ayran (1 Bardak)", "calories": 66, "protein": 3.2, "carbs": 4.8, "fat": 3.6, "name_en": "Ayran (1 Glass)"},
  {"food_id": "food_021", "name": "Beyaz Peynir (30g)", "calories": 80, "protein": 5.5, "carbs": 0.5, "fat": 6.5, "name_en": "White Cheese (30g)"},
  {"food_id": "food_022", "name": "Kaşar Peyniri (30g)", "calories": 120, "protein": 7, "carbs": 0.4, "fat": 10, "name_en": "Cheddar Cheese (30g)"},
  {"food_id": "food_023", "name": "Lor Peyniri (100g)", "calories": 98, "protein": 11, "carbs": 3.4, "fat": 4.3, "name_en": "Cottage Cheese (100g)"},

  # =====================
  # SEBZELER
  # =====================
  {"food_id": "food_024", "name": "Domates (1 Adet)", "calories": 22, "protein": 1.1, "carbs": 4.8, "fat": 0.2, "name_en": "Tomato (1 Piece)"},
  {"food_id": "food_025", "name": "Salatalık (1 Adet)", "calories": 16, "protein": 0.7, "carbs": 3.6, "fat": 0.1, "name_en": "Cucumber (1 Piece)"},
  {"food_id": "food_026", "name": "Salata (1 Porsiyon)", "calories": 35, "protein": 2, "carbs": 7, "fat": 0.3, "name_en": "Salad (1 Serving)"},
  {"food_id": "food_027", "name": "Brokoli (100g)", "calories": 34, "protein": 2.8, "carbs": 7, "fat": 0.4, "name_en": "Broccoli (100g)"},
  {"food_id": "food_028", "name": "Ispanak (100g)", "calories": 23, "protein": 2.9, "carbs": 3.6, "fat": 0.4, "name_en": "Spinach (100g)"},
  {"food_id": "food_029", "name": "Havuç (1 Adet)", "calories": 25, "protein": 0.6, "carbs": 6, "fat": 0.1, "name_en": "Carrot (1 Piece)"},
  {"food_id": "food_030", "name": "Biber (1 Adet)", "calories": 20, "protein": 0.9, "carbs": 4.6, "fat": 0.2, "name_en": "Pepper (1 Piece)"},

  # =====================
  # MEYVELER
  # =====================
  {"food_id": "food_031", "name": "Elma (1 Adet)", "calories": 95, "protein": 0.5, "carbs": 25, "fat": 0.3, "name_en": "Apple (1 Piece)"},
  {"food_id": "food_032", "name": "Muz (1 Adet)", "calories": 105, "protein": 1.3, "carbs": 27, "fat": 0.4, "name_en": "Banana (1 Piece)"},
  {"food_id": "food_033", "name": "Portakal (1 Adet)", "calories": 62, "protein": 1.2, "carbs": 15, "fat": 0.2, "name_en": "Orange (1 Piece)"},
  {"food_id": "food_034", "name": "Çilek (100g)", "calories": 32, "protein": 0.7, "carbs": 7.7, "fat": 0.3, "name_en": "Strawberry (100g)"},
  {"food_id": "food_035", "name": "Üzüm (100g)", "calories": 69, "protein": 0.7, "carbs": 18, "fat": 0.2, "name_en": "Grapes (100g)"},
  {"food_id": "food_036", "name": "Karpuz (100g)", "calories": 30, "protein": 0.6, "carbs": 7.6, "fat": 0.2, "name_en": "Watermelon (100g)"},
  {"food_id": "food_037", "name": "Kavun (100g)", "calories": 34, "protein": 0.8, "carbs": 8.2, "fat": 0.2, "name_en": "Melon (100g)"},

  # =====================
  # ÇORBALAR
  # =====================
  {"food_id": "food_038", "name": "Mercimek Çorbası (1 Kase)", "calories": 180, "protein": 9, "carbs": 30, "fat": 4, "name_en": "Lentil Soup (1 Bowl)"},
  {"food_id": "food_039", "name": "Domates Çorbası (1 Kase)", "calories": 90, "protein": 2, "carbs": 15, "fat": 3, "name_en": "Tomato Soup (1 Bowl)"},
  {"food_id": "food_040", "name": "Tavuk Çorbası (1 Kase)", "calories": 120, "protein": 8, "carbs": 12, "fat": 4, "name_en": "Chicken Soup (1 Bowl)"},
  {"food_id": "food_041", "name": "Yayla Çorbası (1 Kase)", "calories": 110, "protein": 4, "carbs": 12, "fat": 5, "name_en": "Yogurt Soup (1 Bowl)"},
  {"food_id": "food_042", "name": "Ezogelin Çorbası (1 Kase)", "calories": 150, "protein": 6, "carbs": 25, "fat": 3, "name_en": "Ezogelin Soup (1 Bowl)"},

  # =====================
  # ANA YEMEKLER
  # =====================
  {"food_id": "food_043", "name": "Döner (1 Porsiyon)", "calories": 450, "protein": 25, "carbs": 35, "fat": 22, "name_en": "Doner Kebab (1 Serving)"},
  {"food_id": "food_044", "name": "Lahmacun (1 Adet)", "calories": 270, "protein": 12, "carbs": 35, "fat": 9, "name_en": "Lahmacun (1 Piece)"},
  {"food_id": "food_045", "name": "Pide (1 Dilim)", "calories": 280, "protein": 10, "carbs": 38, "fat": 10, "name_en": "Pide (1 Slice)"},
  {"food_id": "food_046", "name": "Köfte (4 Adet)", "calories": 320, "protein": 24, "carbs": 8, "fat": 22, "name_en": "Meatballs (4 Pieces)"},
  {"food_id": "food_047", "name": "İmam Bayıldı (1 Porsiyon)", "calories": 220, "protein": 3, "carbs": 18, "fat": 16, "name_en": "Imam Bayildi (1 Serving)"},
  {"food_id": "food_048", "name": "Karnıyarık (1 Porsiyon)", "calories": 350, "protein": 15, "carbs": 20, "fat": 24, "name_en": "Karniyarik (1 Serving)"},
  {"food_id": "food_049", "name": "Mantı (1 Porsiyon)", "calories": 380, "protein": 14, "carbs": 45, "fat": 16, "name_en": "Turkish Ravioli (1 Serving)"},
  {"food_id": "food_050", "name": "Pizza (1 Dilim)", "calories": 285, "protein": 12, "carbs": 36, "fat": 10, "name_en": "Pizza (1 Slice)"},
  {"food_id": "food_051", "name": "Hamburger (1 Adet)", "calories": 540, "protein": 25, "carbs": 40, "fat": 29, "name_en": "Hamburger (1 Piece)"},

  # =====================
  # KAHVALTILIK
  # =====================
  {"food_id": "food_052", "name": "Zeytin (10 Adet)", "calories": 40, "protein": 0.3, "carbs": 1, "fat": 4, "name_en": "Olives (10 Pieces)"},
  {"food_id": "food_053", "name": "Bal (1 Yemek Kaşığı)", "calories": 64, "protein": 0.1, "carbs": 17, "fat": 0, "name_en": "Honey (1 Tbsp)"},
  {"food_id": "food_054", "name": "Reçel (1 Yemek Kaşığı)", "calories": 56, "protein": 0.1, "carbs": 14, "fat": 0, "name_en": "Jam (1 Tbsp)"},
  {"food_id": "food_055", "name": "Tereyağı (10g)", "calories": 72, "protein": 0.1, "carbs": 0, "fat": 8, "name_en": "Butter (10g)"},
  {"food_id": "food_056", "name": "Sucuk (2 Dilim)", "calories": 180, "protein": 8, "carbs": 1, "fat": 16, "name_en": "Sucuk (2 Slices)"},
  {"food_id": "food_057", "name": "Simit (1 Adet)", "calories": 280, "protein": 9, "carbs": 50, "fat": 5, "name_en": "Simit (1 Piece)"},
  {"food_id": "food_058", "name": "Poğaça (1 Adet)", "calories": 250, "protein": 5, "carbs": 30, "fat": 12, "name_en": "Pogaca (1 Piece)"},
  {"food_id": "food_059", "name": "Börek (1 Dilim)", "calories": 300, "protein": 8, "carbs": 25, "fat": 18, "name_en": "Borek (1 Slice)"},

  # =====================
  # İÇECEKLER
  # =====================
  {"food_id": "food_060", "name": "Kahve (Sade)", "calories": 5, "protein": 0.3, "carbs": 0, "fat": 0, "name_en": "Coffee (Black)"},
  {"food_id": "food_061", "name": "Çay (Şekersiz)", "calories": 2, "protein": 0, "carbs": 0.5, "fat": 0, "name_en": "Tea (No Sugar)"},
  {"food_id": "food_062", "name": "Türk Kahvesi", "calories": 15, "protein": 0.3, "carbs": 2, "fat": 0.5, "name_en": "Turkish Coffee"},
  {"food_id": "food_063", "name": "Latte (1 Bardak)", "calories": 190, "protein": 10, "carbs": 18, "fat": 7, "name_en": "Latte (1 Cup)"},
  {"food_id": "food_064", "name": "Meyve Suyu (1 Bardak)", "calories": 110, "protein": 1, "carbs": 26, "fat": 0, "name_en": "Fruit Juice (1 Glass)"},
  {"food_id": "food_065", "name": "Kola (330ml)", "calories": 139, "protein": 0, "carbs": 35, "fat": 0, "name_en": "Cola (330ml)"},
  {"food_id": "food_066", "name": "Limonata (1 Bardak)", "calories": 99, "protein": 0, "carbs": 26, "fat": 0, "name_en": "Lemonade (1 Glass)"},

  # =====================
  # ATIŞTIRMALIKLAR
  # =====================
  {"food_id": "food_067", "name": "Ceviz (30g)", "calories": 196, "protein": 4.6, "carbs": 4.1, "fat": 19.5, "name_en": "Walnuts (30g)"},
  {"food_id": "food_068", "name": "Badem (30g)", "calories": 173, "protein": 6.4, "carbs": 6.5, "fat": 15, "name_en": "Almonds (30g)"},
  {"food_id": "food_069", "name": "Fındık (30g)", "calories": 188, "protein": 4.5, "carbs": 5, "fat": 18, "name_en": "Hazelnuts (30g)"},
  {"food_id": "food_070", "name": "Çikolata (30g)", "calories": 160, "protein": 2, "carbs": 17, "fat": 9, "name_en": "Chocolate (30g)"},
  {"food_id": "food_071", "name": "Cips (30g)", "calories": 160, "protein": 2, "carbs": 15, "fat": 10, "name_en": "Chips (30g)"},
  {"food_id": "food_072", "name": "Bisküvi (3 Adet)", "calories": 140, "protein": 2, "carbs": 20, "fat": 6, "name_en": "Biscuits (3 Pieces)"},
  {"food_id": "food_073", "name": "Kraker (5 Adet)", "calories": 85, "protein": 2, "carbs": 14, "fat": 2.5, "name_en": "Crackers (5 Pieces)"},

  # =====================
  # TATLILAR
  # =====================
  {"food_id": "food_074", "name": "Baklava (1 Dilim)", "calories": 334, "protein": 5, "carbs": 40, "fat": 18, "name_en": "Baklava (1 Piece)"},
  {"food_id": "food_075", "name": "Sütlaç (1 Porsiyon)", "calories": 220, "protein": 6, "carbs": 35, "fat": 6, "name_en": "Rice Pudding (1 Serving)"},
  {"food_id": "food_076", "name": "Dondurma (1 Top)", "calories": 137, "protein": 2.4, "carbs": 16, "fat": 7, "name_en": "Ice Cream (1 Scoop)"},
  {"food_id": "food_077", "name": "Kek (1 Dilim)", "calories": 290, "protein": 4, "carbs": 40, "fat": 13, "name_en": "Cake (1 Slice)"},
  {"food_id": "food_078", "name": "Kurabiye (2 Adet)", "calories": 140, "protein": 2, "carbs": 20, "fat": 6, "name_en": "Cookies (2 Pieces)"},

  # =====================
  # BAKLAGİLLER
  # =====================
  {"food_id": "food_079", "name": "Kuru Fasulye (1 Porsiyon)", "calories": 225, "protein": 15, "carbs": 40, "fat": 1, "name_en": "White Beans (1 Serving)"},
  {"food_id": "food_080", "name": "Nohut (1 Porsiyon)", "calories": 269, "protein": 14.5, "carbs": 45, "fat": 4.2, "name_en": "Chickpeas (1 Serving)"},
  {"food_id": "food_081", "name": "Barbunya (1 Porsiyon)", "calories": 225, "protein": 14, "carbs": 41, "fat": 0.8, "name_en": "Kidney Beans (1 Serving)"},
  {"food_id": "food_082", "name": "Yeşil Mercimek (1 Porsiyon)", "calories": 230, "protein": 18, "carbs": 40, "fat": 0.8, "name_en": "Green Lentils (1 Serving)"},

  # =====================
  # YENİ YEMEKLER BURAYA EKLENECEK (food_083'ten devam)
  # =====================
  # ChatGPT'den gelen yeni yemekleri buraya yapıştırın
  
]
