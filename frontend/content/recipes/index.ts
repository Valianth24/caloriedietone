/**
 * Recipe Content Loader
 * Loads and manages recipe content with locale fallback support
 */

import { RecipeContent, RecipeCategory, RECIPE_CATEGORIES, CATEGORY_LABELS, DIFFICULTY_LABELS, TAG_LABELS } from '../../types/recipe';
import { recipeMetadata, RECIPE_IDS, RecipeId, getRecipeMetadata, getAllRecipeMetadata, getRecipesByCategory, getFeaturedRecipes, getRecipesByTag } from './metadata';
import { athleteRecipeMetadata, ATHLETE_RECIPE_IDS, AthleteRecipeId, getAllAthleteRecipeMetadata, ATHLETE_RECIPE_NAMES, ATHLETE_RECIPE_NUTRITION, getAthleteRecipeMetadata } from './athleteRecipes';

// Lazy load recipe content to avoid bundling all recipes
const recipeContentLoaders: Record<string, Record<RecipeId, () => Promise<RecipeContent>>> = {
  tr: {
    avocado_toast: () => import('../locales/tr/recipes/avocado_toast.json').then(m => m.default as RecipeContent),
    protein_pancakes: () => import('../locales/tr/recipes/protein_pancakes.json').then(m => m.default as RecipeContent),
    overnight_oats: () => import('../locales/tr/recipes/overnight_oats.json').then(m => m.default as RecipeContent),
    veggie_omelette: () => import('../locales/tr/recipes/veggie_omelette.json').then(m => m.default as RecipeContent),
    chia_pudding: () => import('../locales/tr/recipes/chia_pudding.json').then(m => m.default as RecipeContent),
    shakshuka: () => import('../locales/tr/recipes/shakshuka.json').then(m => m.default as RecipeContent),
    acai_bowl: () => import('../locales/tr/recipes/acai_bowl.json').then(m => m.default as RecipeContent),
    turkish_menemen: () => import('../locales/tr/recipes/turkish_menemen.json').then(m => m.default as RecipeContent),
    grilled_chicken_salad: () => import('../locales/tr/recipes/grilled_chicken_salad.json').then(m => m.default as RecipeContent),
    salmon_vegetables: () => import('../locales/tr/recipes/salmon_vegetables.json').then(m => m.default as RecipeContent),
    turkey_meatballs: () => import('../locales/tr/recipes/turkey_meatballs.json').then(m => m.default as RecipeContent),
    stuffed_peppers: () => import('../locales/tr/recipes/stuffed_peppers.json').then(m => m.default as RecipeContent),
    lentil_curry: () => import('../locales/tr/recipes/lentil_curry.json').then(m => m.default as RecipeContent),
    quinoa_bowl: () => import('../locales/tr/recipes/quinoa_bowl.json').then(m => m.default as RecipeContent),
    baked_cod: () => import('../locales/tr/recipes/baked_cod.json').then(m => m.default as RecipeContent),
    chicken_stir_fry: () => import('../locales/tr/recipes/chicken_stir_fry.json').then(m => m.default as RecipeContent),
    butter_chicken: () => import('../locales/tr/recipes/butter_chicken.json').then(m => m.default as RecipeContent),
    lamb_kofta: () => import('../locales/tr/recipes/lamb_kofta.json').then(m => m.default as RecipeContent),
    shrimp_garlic_pasta: () => import('../locales/tr/recipes/shrimp_garlic_pasta.json').then(m => m.default as RecipeContent),
    beef_bulgogi: () => import('../locales/tr/recipes/beef_bulgogi.json').then(m => m.default as RecipeContent),
    chicken_biryani: () => import('../locales/tr/recipes/chicken_biryani.json').then(m => m.default as RecipeContent),
    falafel_wrap: () => import('../locales/tr/recipes/falafel_wrap.json').then(m => m.default as RecipeContent),
    lentil_soup: () => import('../locales/tr/recipes/lentil_soup.json').then(m => m.default as RecipeContent),
    chicken_vegetable_soup: () => import('../locales/tr/recipes/chicken_vegetable_soup.json').then(m => m.default as RecipeContent),
    tomato_basil_soup: () => import('../locales/tr/recipes/tomato_basil_soup.json').then(m => m.default as RecipeContent),
    broccoli_soup: () => import('../locales/tr/recipes/broccoli_soup.json').then(m => m.default as RecipeContent),
    mushroom_soup: () => import('../locales/tr/recipes/mushroom_soup.json').then(m => m.default as RecipeContent),
    pumpkin_soup: () => import('../locales/tr/recipes/pumpkin_soup.json').then(m => m.default as RecipeContent),
    greek_salad: () => import('../locales/tr/recipes/greek_salad.json').then(m => m.default as RecipeContent),
    caesar_salad: () => import('../locales/tr/recipes/caesar_salad.json').then(m => m.default as RecipeContent),
    quinoa_salad: () => import('../locales/tr/recipes/quinoa_salad.json').then(m => m.default as RecipeContent),
    tuna_salad: () => import('../locales/tr/recipes/tuna_salad.json').then(m => m.default as RecipeContent),
    fattoush_salad: () => import('../locales/tr/recipes/fattoush_salad.json').then(m => m.default as RecipeContent),
    avocado_chickpea_salad: () => import('../locales/tr/recipes/avocado_chickpea_salad.json').then(m => m.default as RecipeContent),
    hummus: () => import('../locales/tr/recipes/hummus.json').then(m => m.default as RecipeContent),
    energy_balls: () => import('../locales/tr/recipes/energy_balls.json').then(m => m.default as RecipeContent),
    greek_yogurt_parfait: () => import('../locales/tr/recipes/greek_yogurt_parfait.json').then(m => m.default as RecipeContent),
    veggie_sticks: () => import('../locales/tr/recipes/veggie_sticks.json').then(m => m.default as RecipeContent),
    baba_ganoush: () => import('../locales/tr/recipes/baba_ganoush.json').then(m => m.default as RecipeContent),
    stuffed_dates: () => import('../locales/tr/recipes/stuffed_dates.json').then(m => m.default as RecipeContent),
    green_smoothie: () => import('../locales/tr/recipes/green_smoothie.json').then(m => m.default as RecipeContent),
    berry_smoothie: () => import('../locales/tr/recipes/berry_smoothie.json').then(m => m.default as RecipeContent),
    protein_smoothie: () => import('../locales/tr/recipes/protein_smoothie.json').then(m => m.default as RecipeContent),
    tropical_smoothie: () => import('../locales/tr/recipes/tropical_smoothie.json').then(m => m.default as RecipeContent),
    mango_lassi: () => import('../locales/tr/recipes/mango_lassi.json').then(m => m.default as RecipeContent),
    peanut_butter_banana_smoothie: () => import('../locales/tr/recipes/peanut_butter_banana_smoothie.json').then(m => m.default as RecipeContent),
    banana_nice_cream: () => import('../locales/tr/recipes/banana_nice_cream.json').then(m => m.default as RecipeContent),
    dark_chocolate_mousse: () => import('../locales/tr/recipes/dark_chocolate_mousse.json').then(m => m.default as RecipeContent),
    fruit_salad: () => import('../locales/tr/recipes/fruit_salad.json').then(m => m.default as RecipeContent),
    rice_pudding: () => import('../locales/tr/recipes/rice_pudding.json').then(m => m.default as RecipeContent),
    baklava_oatmeal: () => import('../locales/tr/recipes/baklava_oatmeal.json').then(m => m.default as RecipeContent),
    chicken_wrap: () => import('../locales/tr/recipes/chicken_wrap.json').then(m => m.default as RecipeContent),
    taco_bowl: () => import('../locales/tr/recipes/taco_bowl.json').then(m => m.default as RecipeContent),
    veggie_burger: () => import('../locales/tr/recipes/veggie_burger.json').then(m => m.default as RecipeContent),
    chicken_quesadilla: () => import('../locales/tr/recipes/chicken_quesadilla.json').then(m => m.default as RecipeContent),
    egg_fried_rice: () => import('../locales/tr/recipes/egg_fried_rice.json').then(m => m.default as RecipeContent),
    teriyaki_chicken: () => import('../locales/tr/recipes/teriyaki_chicken.json').then(m => m.default as RecipeContent),
    mediterranean_pasta: () => import('../locales/tr/recipes/mediterranean_pasta.json').then(m => m.default as RecipeContent),
    chicken_curry: () => import('../locales/tr/recipes/chicken_curry.json').then(m => m.default as RecipeContent),
    beef_stir_fry: () => import('../locales/tr/recipes/beef_stir_fry.json').then(m => m.default as RecipeContent),
    fish_tacos: () => import('../locales/tr/recipes/fish_tacos.json').then(m => m.default as RecipeContent),
  },
  en: {
    avocado_toast: () => import('../locales/en/recipes/avocado_toast.json').then(m => m.default as RecipeContent),
    protein_pancakes: () => import('../locales/en/recipes/protein_pancakes.json').then(m => m.default as RecipeContent),
    overnight_oats: () => import('../locales/en/recipes/overnight_oats.json').then(m => m.default as RecipeContent),
    veggie_omelette: () => import('../locales/en/recipes/veggie_omelette.json').then(m => m.default as RecipeContent),
    chia_pudding: () => import('../locales/en/recipes/chia_pudding.json').then(m => m.default as RecipeContent),
    shakshuka: () => import('../locales/en/recipes/shakshuka.json').then(m => m.default as RecipeContent),
    acai_bowl: () => import('../locales/en/recipes/acai_bowl.json').then(m => m.default as RecipeContent),
    turkish_menemen: () => import('../locales/en/recipes/turkish_menemen.json').then(m => m.default as RecipeContent),
    grilled_chicken_salad: () => import('../locales/en/recipes/grilled_chicken_salad.json').then(m => m.default as RecipeContent),
    salmon_vegetables: () => import('../locales/en/recipes/salmon_vegetables.json').then(m => m.default as RecipeContent),
    turkey_meatballs: () => import('../locales/en/recipes/turkey_meatballs.json').then(m => m.default as RecipeContent),
    stuffed_peppers: () => import('../locales/en/recipes/stuffed_peppers.json').then(m => m.default as RecipeContent),
    lentil_curry: () => import('../locales/en/recipes/lentil_curry.json').then(m => m.default as RecipeContent),
    quinoa_bowl: () => import('../locales/en/recipes/quinoa_bowl.json').then(m => m.default as RecipeContent),
    baked_cod: () => import('../locales/en/recipes/baked_cod.json').then(m => m.default as RecipeContent),
    chicken_stir_fry: () => import('../locales/en/recipes/chicken_stir_fry.json').then(m => m.default as RecipeContent),
    butter_chicken: () => import('../locales/en/recipes/butter_chicken.json').then(m => m.default as RecipeContent),
    lamb_kofta: () => import('../locales/en/recipes/lamb_kofta.json').then(m => m.default as RecipeContent),
    shrimp_garlic_pasta: () => import('../locales/en/recipes/shrimp_garlic_pasta.json').then(m => m.default as RecipeContent),
    beef_bulgogi: () => import('../locales/en/recipes/beef_bulgogi.json').then(m => m.default as RecipeContent),
    chicken_biryani: () => import('../locales/en/recipes/chicken_biryani.json').then(m => m.default as RecipeContent),
    falafel_wrap: () => import('../locales/en/recipes/falafel_wrap.json').then(m => m.default as RecipeContent),
    lentil_soup: () => import('../locales/en/recipes/lentil_soup.json').then(m => m.default as RecipeContent),
    chicken_vegetable_soup: () => import('../locales/en/recipes/chicken_vegetable_soup.json').then(m => m.default as RecipeContent),
    tomato_basil_soup: () => import('../locales/en/recipes/tomato_basil_soup.json').then(m => m.default as RecipeContent),
    broccoli_soup: () => import('../locales/en/recipes/broccoli_soup.json').then(m => m.default as RecipeContent),
    mushroom_soup: () => import('../locales/en/recipes/mushroom_soup.json').then(m => m.default as RecipeContent),
    pumpkin_soup: () => import('../locales/en/recipes/pumpkin_soup.json').then(m => m.default as RecipeContent),
    greek_salad: () => import('../locales/en/recipes/greek_salad.json').then(m => m.default as RecipeContent),
    caesar_salad: () => import('../locales/en/recipes/caesar_salad.json').then(m => m.default as RecipeContent),
    quinoa_salad: () => import('../locales/en/recipes/quinoa_salad.json').then(m => m.default as RecipeContent),
    tuna_salad: () => import('../locales/en/recipes/tuna_salad.json').then(m => m.default as RecipeContent),
    fattoush_salad: () => import('../locales/en/recipes/fattoush_salad.json').then(m => m.default as RecipeContent),
    avocado_chickpea_salad: () => import('../locales/en/recipes/avocado_chickpea_salad.json').then(m => m.default as RecipeContent),
    hummus: () => import('../locales/en/recipes/hummus.json').then(m => m.default as RecipeContent),
    energy_balls: () => import('../locales/en/recipes/energy_balls.json').then(m => m.default as RecipeContent),
    greek_yogurt_parfait: () => import('../locales/en/recipes/greek_yogurt_parfait.json').then(m => m.default as RecipeContent),
    veggie_sticks: () => import('../locales/en/recipes/veggie_sticks.json').then(m => m.default as RecipeContent),
    baba_ganoush: () => import('../locales/en/recipes/baba_ganoush.json').then(m => m.default as RecipeContent),
    stuffed_dates: () => import('../locales/en/recipes/stuffed_dates.json').then(m => m.default as RecipeContent),
    green_smoothie: () => import('../locales/en/recipes/green_smoothie.json').then(m => m.default as RecipeContent),
    berry_smoothie: () => import('../locales/en/recipes/berry_smoothie.json').then(m => m.default as RecipeContent),
    protein_smoothie: () => import('../locales/en/recipes/protein_smoothie.json').then(m => m.default as RecipeContent),
    tropical_smoothie: () => import('../locales/en/recipes/tropical_smoothie.json').then(m => m.default as RecipeContent),
    mango_lassi: () => import('../locales/en/recipes/mango_lassi.json').then(m => m.default as RecipeContent),
    peanut_butter_banana_smoothie: () => import('../locales/en/recipes/peanut_butter_banana_smoothie.json').then(m => m.default as RecipeContent),
    banana_nice_cream: () => import('../locales/en/recipes/banana_nice_cream.json').then(m => m.default as RecipeContent),
    dark_chocolate_mousse: () => import('../locales/en/recipes/dark_chocolate_mousse.json').then(m => m.default as RecipeContent),
    fruit_salad: () => import('../locales/en/recipes/fruit_salad.json').then(m => m.default as RecipeContent),
    rice_pudding: () => import('../locales/en/recipes/rice_pudding.json').then(m => m.default as RecipeContent),
    baklava_oatmeal: () => import('../locales/en/recipes/baklava_oatmeal.json').then(m => m.default as RecipeContent),
  },
};

const DEFAULT_LOCALE = 'en';

// Athlete Recipe Content Loaders
const athleteRecipeContentLoaders: Record<string, Record<AthleteRecipeId, () => Promise<RecipeContent>>> = {
  tr: {
    grilled_chicken_breast_quinoa: () => import('../locales/tr/recipes/athlete/grilled_chicken_breast_quinoa.json').then(m => m.default as RecipeContent),
    chicken_teriyaki_bowl: () => import('../locales/tr/recipes/athlete/chicken_teriyaki_bowl.json').then(m => m.default as RecipeContent),
    mediterranean_chicken_wrap: () => import('../locales/tr/recipes/athlete/mediterranean_chicken_wrap.json').then(m => m.default as RecipeContent),
    chicken_avocado_salad: () => import('../locales/tr/recipes/athlete/chicken_avocado_salad.json').then(m => m.default as RecipeContent),
    honey_garlic_chicken_rice: () => import('../locales/tr/recipes/athlete/honey_garlic_chicken_rice.json').then(m => m.default as RecipeContent),
    chicken_fajita_bowl: () => import('../locales/tr/recipes/athlete/chicken_fajita_bowl.json').then(m => m.default as RecipeContent),
    lemon_herb_chicken_vegetables: () => import('../locales/tr/recipes/athlete/lemon_herb_chicken_vegetables.json').then(m => m.default as RecipeContent),
    chicken_tikka_masala: () => import('../locales/tr/recipes/athlete/chicken_tikka_masala.json').then(m => m.default as RecipeContent),
    bbq_chicken_sweet_potato: () => import('../locales/tr/recipes/athlete/bbq_chicken_sweet_potato.json').then(m => m.default as RecipeContent),
    greek_chicken_power_bowl: () => import('../locales/tr/recipes/athlete/greek_chicken_power_bowl.json').then(m => m.default as RecipeContent),
    chicken_broccoli_stir_fry: () => import('../locales/tr/recipes/athlete/chicken_broccoli_stir_fry.json').then(m => m.default as RecipeContent),
    cajun_chicken_pasta: () => import('../locales/tr/recipes/athlete/cajun_chicken_pasta.json').then(m => m.default as RecipeContent),
    chicken_quinoa_stuffed_peppers: () => import('../locales/tr/recipes/athlete/chicken_quinoa_stuffed_peppers.json').then(m => m.default as RecipeContent),
    asian_sesame_chicken_bowl: () => import('../locales/tr/recipes/athlete/asian_sesame_chicken_bowl.json').then(m => m.default as RecipeContent),
    chicken_shawarma_plate: () => import('../locales/tr/recipes/athlete/chicken_shawarma_plate.json').then(m => m.default as RecipeContent),
    beef_stir_fry_brown_rice: () => import('../locales/tr/recipes/athlete/beef_stir_fry_brown_rice.json').then(m => m.default as RecipeContent),
    lean_beef_burrito_bowl: () => import('../locales/tr/recipes/athlete/lean_beef_burrito_bowl.json').then(m => m.default as RecipeContent),
    beef_vegetable_kebabs: () => import('../locales/tr/recipes/athlete/beef_vegetable_kebabs.json').then(m => m.default as RecipeContent),
    korean_beef_bowl: () => import('../locales/tr/recipes/athlete/korean_beef_bowl.json').then(m => m.default as RecipeContent),
    beef_quinoa_meatballs: () => import('../locales/tr/recipes/athlete/beef_quinoa_meatballs.json').then(m => m.default as RecipeContent),
    steak_sweet_potato_meal: () => import('../locales/tr/recipes/athlete/steak_sweet_potato_meal.json').then(m => m.default as RecipeContent),
    beef_broccoli_garlic: () => import('../locales/tr/recipes/athlete/beef_broccoli_garlic.json').then(m => m.default as RecipeContent),
    mediterranean_beef_rice: () => import('../locales/tr/recipes/athlete/mediterranean_beef_rice.json').then(m => m.default as RecipeContent),
    beef_mushroom_stroganoff: () => import('../locales/tr/recipes/athlete/beef_mushroom_stroganoff.json').then(m => m.default as RecipeContent),
    tex_mex_beef_skillet: () => import('../locales/tr/recipes/athlete/tex_mex_beef_skillet.json').then(m => m.default as RecipeContent),
    grilled_salmon_asparagus: () => import('../locales/tr/recipes/athlete/grilled_salmon_asparagus.json').then(m => m.default as RecipeContent),
    tuna_quinoa_salad: () => import('../locales/tr/recipes/athlete/tuna_quinoa_salad.json').then(m => m.default as RecipeContent),
    cod_lemon_vegetables: () => import('../locales/tr/recipes/athlete/cod_lemon_vegetables.json').then(m => m.default as RecipeContent),
    shrimp_garlic_zucchini: () => import('../locales/tr/recipes/athlete/shrimp_garlic_zucchini.json').then(m => m.default as RecipeContent),
    salmon_teriyaki_bowl: () => import('../locales/tr/recipes/athlete/salmon_teriyaki_bowl.json').then(m => m.default as RecipeContent),
    mediterranean_sea_bass: () => import('../locales/tr/recipes/athlete/mediterranean_sea_bass.json').then(m => m.default as RecipeContent),
    tuna_steak_sweet_potato: () => import('../locales/tr/recipes/athlete/tuna_steak_sweet_potato.json').then(m => m.default as RecipeContent),
    garlic_butter_shrimp_rice: () => import('../locales/tr/recipes/athlete/garlic_butter_shrimp_rice.json').then(m => m.default as RecipeContent),
    baked_tilapia_vegetables: () => import('../locales/tr/recipes/athlete/baked_tilapia_vegetables.json').then(m => m.default as RecipeContent),
    salmon_avocado_bowl: () => import('../locales/tr/recipes/athlete/salmon_avocado_bowl.json').then(m => m.default as RecipeContent),
    turkey_quinoa_power_bowl: () => import('../locales/tr/recipes/athlete/turkey_quinoa_power_bowl.json').then(m => m.default as RecipeContent),
    turkey_vegetable_meatballs: () => import('../locales/tr/recipes/athlete/turkey_vegetable_meatballs.json').then(m => m.default as RecipeContent),
    turkey_taco_lettuce_wraps: () => import('../locales/tr/recipes/athlete/turkey_taco_lettuce_wraps.json').then(m => m.default as RecipeContent),
    herb_roasted_turkey_breast: () => import('../locales/tr/recipes/athlete/herb_roasted_turkey_breast.json').then(m => m.default as RecipeContent),
    turkey_spinach_pasta: () => import('../locales/tr/recipes/athlete/turkey_spinach_pasta.json').then(m => m.default as RecipeContent),
    protein_omelette_vegetables: () => import('../locales/tr/recipes/athlete/protein_omelette_vegetables.json').then(m => m.default as RecipeContent),
    greek_yogurt_power_parfait: () => import('../locales/tr/recipes/athlete/greek_yogurt_power_parfait.json').then(m => m.default as RecipeContent),
    cottage_cheese_protein_bowl: () => import('../locales/tr/recipes/athlete/cottage_cheese_protein_bowl.json').then(m => m.default as RecipeContent),
    egg_white_vegetable_scramble: () => import('../locales/tr/recipes/athlete/egg_white_vegetable_scramble.json').then(m => m.default as RecipeContent),
    high_protein_breakfast_wrap: () => import('../locales/tr/recipes/athlete/high_protein_breakfast_wrap.json').then(m => m.default as RecipeContent),
    chickpea_quinoa_power_bowl: () => import('../locales/tr/recipes/athlete/chickpea_quinoa_power_bowl.json').then(m => m.default as RecipeContent),
    lentil_vegetable_curry: () => import('../locales/tr/recipes/athlete/lentil_vegetable_curry.json').then(m => m.default as RecipeContent),
    black_bean_rice_bowl: () => import('../locales/tr/recipes/athlete/black_bean_rice_bowl.json').then(m => m.default as RecipeContent),
    tofu_stir_fry_vegetables: () => import('../locales/tr/recipes/athlete/tofu_stir_fry_vegetables.json').then(m => m.default as RecipeContent),
    edamame_quinoa_salad: () => import('../locales/tr/recipes/athlete/edamame_quinoa_salad.json').then(m => m.default as RecipeContent),
  },
  en: {
    grilled_chicken_breast_quinoa: () => import('../locales/en/recipes/athlete/grilled_chicken_breast_quinoa.json').then(m => m.default as RecipeContent),
    chicken_teriyaki_bowl: () => import('../locales/en/recipes/athlete/chicken_teriyaki_bowl.json').then(m => m.default as RecipeContent),
    mediterranean_chicken_wrap: () => import('../locales/en/recipes/athlete/mediterranean_chicken_wrap.json').then(m => m.default as RecipeContent),
    chicken_avocado_salad: () => import('../locales/en/recipes/athlete/chicken_avocado_salad.json').then(m => m.default as RecipeContent),
    honey_garlic_chicken_rice: () => import('../locales/en/recipes/athlete/honey_garlic_chicken_rice.json').then(m => m.default as RecipeContent),
    chicken_fajita_bowl: () => import('../locales/en/recipes/athlete/chicken_fajita_bowl.json').then(m => m.default as RecipeContent),
    lemon_herb_chicken_vegetables: () => import('../locales/en/recipes/athlete/lemon_herb_chicken_vegetables.json').then(m => m.default as RecipeContent),
    chicken_tikka_masala: () => import('../locales/en/recipes/athlete/chicken_tikka_masala.json').then(m => m.default as RecipeContent),
    bbq_chicken_sweet_potato: () => import('../locales/en/recipes/athlete/bbq_chicken_sweet_potato.json').then(m => m.default as RecipeContent),
    greek_chicken_power_bowl: () => import('../locales/en/recipes/athlete/greek_chicken_power_bowl.json').then(m => m.default as RecipeContent),
    chicken_broccoli_stir_fry: () => import('../locales/en/recipes/athlete/chicken_broccoli_stir_fry.json').then(m => m.default as RecipeContent),
    cajun_chicken_pasta: () => import('../locales/en/recipes/athlete/cajun_chicken_pasta.json').then(m => m.default as RecipeContent),
    chicken_quinoa_stuffed_peppers: () => import('../locales/en/recipes/athlete/chicken_quinoa_stuffed_peppers.json').then(m => m.default as RecipeContent),
    asian_sesame_chicken_bowl: () => import('../locales/en/recipes/athlete/asian_sesame_chicken_bowl.json').then(m => m.default as RecipeContent),
    chicken_shawarma_plate: () => import('../locales/en/recipes/athlete/chicken_shawarma_plate.json').then(m => m.default as RecipeContent),
    beef_stir_fry_brown_rice: () => import('../locales/en/recipes/athlete/beef_stir_fry_brown_rice.json').then(m => m.default as RecipeContent),
    lean_beef_burrito_bowl: () => import('../locales/en/recipes/athlete/lean_beef_burrito_bowl.json').then(m => m.default as RecipeContent),
    beef_vegetable_kebabs: () => import('../locales/en/recipes/athlete/beef_vegetable_kebabs.json').then(m => m.default as RecipeContent),
    korean_beef_bowl: () => import('../locales/en/recipes/athlete/korean_beef_bowl.json').then(m => m.default as RecipeContent),
    beef_quinoa_meatballs: () => import('../locales/en/recipes/athlete/beef_quinoa_meatballs.json').then(m => m.default as RecipeContent),
    steak_sweet_potato_meal: () => import('../locales/en/recipes/athlete/steak_sweet_potato_meal.json').then(m => m.default as RecipeContent),
    beef_broccoli_garlic: () => import('../locales/en/recipes/athlete/beef_broccoli_garlic.json').then(m => m.default as RecipeContent),
    mediterranean_beef_rice: () => import('../locales/en/recipes/athlete/mediterranean_beef_rice.json').then(m => m.default as RecipeContent),
    beef_mushroom_stroganoff: () => import('../locales/en/recipes/athlete/beef_mushroom_stroganoff.json').then(m => m.default as RecipeContent),
    tex_mex_beef_skillet: () => import('../locales/en/recipes/athlete/tex_mex_beef_skillet.json').then(m => m.default as RecipeContent),
    grilled_salmon_asparagus: () => import('../locales/en/recipes/athlete/grilled_salmon_asparagus.json').then(m => m.default as RecipeContent),
    tuna_quinoa_salad: () => import('../locales/en/recipes/athlete/tuna_quinoa_salad.json').then(m => m.default as RecipeContent),
    cod_lemon_vegetables: () => import('../locales/en/recipes/athlete/cod_lemon_vegetables.json').then(m => m.default as RecipeContent),
    shrimp_garlic_zucchini: () => import('../locales/en/recipes/athlete/shrimp_garlic_zucchini.json').then(m => m.default as RecipeContent),
    salmon_teriyaki_bowl: () => import('../locales/en/recipes/athlete/salmon_teriyaki_bowl.json').then(m => m.default as RecipeContent),
    mediterranean_sea_bass: () => import('../locales/en/recipes/athlete/mediterranean_sea_bass.json').then(m => m.default as RecipeContent),
    tuna_steak_sweet_potato: () => import('../locales/en/recipes/athlete/tuna_steak_sweet_potato.json').then(m => m.default as RecipeContent),
    garlic_butter_shrimp_rice: () => import('../locales/en/recipes/athlete/garlic_butter_shrimp_rice.json').then(m => m.default as RecipeContent),
    baked_tilapia_vegetables: () => import('../locales/en/recipes/athlete/baked_tilapia_vegetables.json').then(m => m.default as RecipeContent),
    salmon_avocado_bowl: () => import('../locales/en/recipes/athlete/salmon_avocado_bowl.json').then(m => m.default as RecipeContent),
    turkey_quinoa_power_bowl: () => import('../locales/en/recipes/athlete/turkey_quinoa_power_bowl.json').then(m => m.default as RecipeContent),
    turkey_vegetable_meatballs: () => import('../locales/en/recipes/athlete/turkey_vegetable_meatballs.json').then(m => m.default as RecipeContent),
    turkey_taco_lettuce_wraps: () => import('../locales/en/recipes/athlete/turkey_taco_lettuce_wraps.json').then(m => m.default as RecipeContent),
    herb_roasted_turkey_breast: () => import('../locales/en/recipes/athlete/herb_roasted_turkey_breast.json').then(m => m.default as RecipeContent),
    turkey_spinach_pasta: () => import('../locales/en/recipes/athlete/turkey_spinach_pasta.json').then(m => m.default as RecipeContent),
    protein_omelette_vegetables: () => import('../locales/en/recipes/athlete/protein_omelette_vegetables.json').then(m => m.default as RecipeContent),
    greek_yogurt_power_parfait: () => import('../locales/en/recipes/athlete/greek_yogurt_power_parfait.json').then(m => m.default as RecipeContent),
    cottage_cheese_protein_bowl: () => import('../locales/en/recipes/athlete/cottage_cheese_protein_bowl.json').then(m => m.default as RecipeContent),
    egg_white_vegetable_scramble: () => import('../locales/en/recipes/athlete/egg_white_vegetable_scramble.json').then(m => m.default as RecipeContent),
    high_protein_breakfast_wrap: () => import('../locales/en/recipes/athlete/high_protein_breakfast_wrap.json').then(m => m.default as RecipeContent),
    chickpea_quinoa_power_bowl: () => import('../locales/en/recipes/athlete/chickpea_quinoa_power_bowl.json').then(m => m.default as RecipeContent),
    lentil_vegetable_curry: () => import('../locales/en/recipes/athlete/lentil_vegetable_curry.json').then(m => m.default as RecipeContent),
    black_bean_rice_bowl: () => import('../locales/en/recipes/athlete/black_bean_rice_bowl.json').then(m => m.default as RecipeContent),
    tofu_stir_fry_vegetables: () => import('../locales/en/recipes/athlete/tofu_stir_fry_vegetables.json').then(m => m.default as RecipeContent),
    edamame_quinoa_salad: () => import('../locales/en/recipes/athlete/edamame_quinoa_salad.json').then(m => m.default as RecipeContent),
  },
};

/**
 * Load recipe content for a specific recipe and locale
 */
export const loadRecipeContent = async (recipeId: RecipeId, locale: string = 'tr'): Promise<RecipeContent | null> => {
  try {
    // Try requested locale
    if (recipeContentLoaders[locale]?.[recipeId]) {
      return await recipeContentLoaders[locale][recipeId]();
    }
    
    // Fallback to default
    if (recipeContentLoaders[DEFAULT_LOCALE]?.[recipeId]) {
      console.warn(`[RecipeLoader] Locale '${locale}' not found for ${recipeId}, falling back to ${DEFAULT_LOCALE}`);
      return await recipeContentLoaders[DEFAULT_LOCALE][recipeId]();
    }
    
    return null;
  } catch (error) {
    console.error(`[RecipeLoader] Error loading recipe ${recipeId}:`, error);
    return null;
  }
};

/**
 * Load athlete recipe content for a specific recipe and locale
 */
export const loadAthleteRecipeContent = async (recipeId: AthleteRecipeId, locale: string = 'tr'): Promise<RecipeContent | null> => {
  try {
    // Try requested locale
    if (athleteRecipeContentLoaders[locale]?.[recipeId]) {
      return await athleteRecipeContentLoaders[locale][recipeId]();
    }
    
    // Fallback to default
    if (athleteRecipeContentLoaders[DEFAULT_LOCALE]?.[recipeId]) {
      console.warn(`[AthleteRecipeLoader] Locale '${locale}' not found for ${recipeId}, falling back to ${DEFAULT_LOCALE}`);
      return await athleteRecipeContentLoaders[DEFAULT_LOCALE][recipeId]();
    }
    
    return null;
  } catch (error) {
    console.error(`[AthleteRecipeLoader] Error loading recipe ${recipeId}:`, error);
    return null;
  }
};

/**
 * Get full recipe (metadata + content)
 */
export const loadRecipe = async (recipeId: RecipeId | AthleteRecipeId, locale: string = 'tr') => {
  // First check if it's an athlete recipe
  const athleteMetadata = getAthleteRecipeMetadata(recipeId as AthleteRecipeId);
  if (athleteMetadata) {
    const content = await loadAthleteRecipeContent(recipeId as AthleteRecipeId, locale);
    if (!content) {
      return null;
    }
    return { metadata: athleteMetadata, content };
  }
  
  // Otherwise check regular recipes
  const metadata = getRecipeMetadata(recipeId as RecipeId);
  const content = await loadRecipeContent(recipeId as RecipeId, locale);
  
  if (!metadata || !content) {
    return null;
  }
  
  return { metadata, content };
};

/**
 * Get category label based on locale
 */
export const getCategoryLabel = (category: RecipeCategory, locale: string = 'tr'): string => {
  return CATEGORY_LABELS[category]?.[locale as 'tr' | 'en'] || category;
};

/**
 * Get all categories with labels
 * Includes both regular and athlete recipes in count
 */
export const getAllCategories = (locale: string = 'tr') => {
  const athleteRecipes = getAllAthleteRecipeMetadata();
  
  return RECIPE_CATEGORIES.map(cat => {
    const regularCount = getRecipesByCategory(cat).length;
    const athleteCount = athleteRecipes.filter(r => r.category === cat).length;
    
    return {
      id: cat,
      label: getCategoryLabel(cat, locale),
      icon: CATEGORY_LABELS[cat].icon,
      color: CATEGORY_LABELS[cat].color,
      count: regularCount + athleteCount,
    };
  });
};

/**
 * Get difficulty label
 */
export const getDifficultyLabel = (difficulty: string, locale: string = 'tr'): string => {
  return DIFFICULTY_LABELS[difficulty as keyof typeof DIFFICULTY_LABELS]?.[locale as 'tr' | 'en'] || difficulty;
};

/**
 * Get tag label
 */
export const getTagLabel = (tag: string, locale: string = 'tr'): string => {
  return TAG_LABELS[tag as keyof typeof TAG_LABELS]?.[locale as 'tr' | 'en'] || tag;
};

// Re-exports
export { 
  recipeMetadata, 
  RECIPE_IDS, 
  getRecipeMetadata, 
  getAllRecipeMetadata, 
  getRecipesByCategory,
  getFeaturedRecipes,
  getRecipesByTag,
};

// Athlete Recipes exports - no duplicate exports
export {
  athleteRecipeMetadata,
  ATHLETE_RECIPE_IDS,
  getAllAthleteRecipeMetadata,
  ATHLETE_RECIPE_NAMES,
  ATHLETE_RECIPE_NUTRITION,
};

export type { RecipeId } from './metadata';
export type { AthleteRecipeId } from './athleteRecipes';
export type { RecipeContent, RecipeCategory, RecipeMetadata, Ingredient, InstructionStep, NutritionInfo } from '../../types/recipe';
export { RECIPE_CATEGORIES, CATEGORY_LABELS, DIFFICULTY_LABELS, TAG_LABELS } from '../../types/recipe';
