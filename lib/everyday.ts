import type { L } from "./kb/types";

export type Meal = "breakfast" | "lunch" | "dinner" | "snack";

export type IngredientGroup =
  | "grain" | "millet" | "pulse" | "veg" | "leafy" | "fruit" | "dairy" | "fat" | "egg" | "fish" | "meat"
  | "nut_seed" | "sweet" | "spice" | "other";

export type Ingredient = {
  id: string;
  name: L;
  group: IngredientGroup;
  /** Salt, oil, water, basic spices — assumed to be in every kitchen. */
  pantry?: boolean;
  /** ESTIMATE of protein for one typical serving (prototype data, "IFCT 2017 based"). Not measured. */
  serving?: { label: L; proteinG: number };
  /** Lowercase synonyms for typed input: English, romanised Marathi/Hindi and Devanagari. */
  match: string[];
};

/** Life stages a recipe suits (same ids as the prototype's poshan stages). */
export type Stage =
  | "family" | "woman" | "pregnant_t1" | "pregnant_t2" | "pregnant_t3" | "lactating"
  | "child_6_12m" | "child_1_3y" | "child_3_6y" | "child_6_10y" | "girl_10_18" | "elder";

export type Nutrient = "protein" | "iron" | "calcium" | "fibre" | "vit_a" | "vit_c" | "folate" | "energy" | "healthy_fat" | "b12";

/**
 * Per-serving ESTIMATES carried over from the prototype. Guidance only — never shown without an
 * "approx." label, and never as medical advice.
 */
export type RecipeEstimate = { proteinG: number; kcal: number; costRs: number; serves: number };

export type RecipeTag = "quick" | "lowOil" | "kids" | "leftover" | "guests" | "healthy" | "fasting" | "budget" | "onePot" | "noCook" | "konkan";

export type Recipe = {
  id: string;
  name: L;
  minutes: number;
  meals: Meal[];
  /** ids from `ingredients` — the main things needed. Salt, oil, water, basic spices are assumed. */
  needs: string[];
  /** Nice to have; not counted in matching or the shopping list. */
  optional?: string[];
  tags: RecipeTag[];
  steps: L[];
  estimate?: RecipeEstimate;
  highlights?: Nutrient[];
  goodFor?: Stage[];
  /** Youngest age (months) the family version suits, with the child note applied. */
  minChildMonths?: number;
  why?: L;
  childNote?: L;
  pregnancyNote?: L;
  swaps?: { from: string; to: string; note: L }[];
};

/** Child-food / pregnancy safety rules (prototype data; not stated as medically reviewed). */
export type FoodCaution = { id: string; ingredients: string[]; underMonths?: number; pregnancy?: true; text: L };

export type Tip = { title: L; points: L[] };
export type Outing = { id: string; name: L; kind: "beach" | "temple" | "fort" | "nature" | "food"; desc: L };

/* ------------------------------------------------------------------ */
/* Ingredients (ours + the prototype's 94, synonyms for typed input)    */
/* ------------------------------------------------------------------ */

export const ingredients: Ingredient[] = [
  { id: "rice", name: { mr: "तांदूळ", en: "Rice", hi: "चावल" }, group: "grain", serving: { label: { mr: "1 वाटी शिजलेला भात", en: "1 katori cooked rice", hi: "1 कटोरी पका चावल" }, proteinG: 3 }, match: ["rice", "chawal", "chaval", "tandul", "bhat", "bhaat", "तांदूळ", "तांदुळ", "चावल", "भात"] },
  { id: "leftover_rice", name: { mr: "उरलेला भात", en: "Leftover rice", hi: "बचा हुआ चावल" }, group: "grain", match: ["leftover rice", "shila bhat", "shila bhaat", "basi chawal", "उरलेला भात", "शिळा भात", "बचा हुआ चावल", "बचे चावल", "बासी चावल"] },
  { id: "wheat_flour", name: { mr: "गव्हाचं पीठ (कणीक)", en: "Wheat flour (atta)", hi: "गेहूँ का आटा" }, group: "grain", serving: { label: { mr: "1 चपाती", en: "1 chapati", hi: "1 रोटी" }, proteinG: 3 }, match: ["atta", "wheat", "gehu", "kanik", "कणीक", "कणिक", "गव्हाचं पीठ", "गव्हाचे पीठ", "गहू", "आटा", "wheat flour", "gehu ka atta", "गेहूं का आटा", "गेहूँ का आटा"] },
  { id: "leftover_chapati", name: { mr: "उरलेल्या चपात्या", en: "Leftover chapati", hi: "बची हुई रोटी" }, group: "grain", match: ["leftover chapati", "leftover chapatis", "leftover roti", "chapati", "chapatis", "roti", "poli", "polya", "उरलेल्या चपात्या", "उरलेली पोळी", "शिळी पोळी", "चपाती", "चपात्या", "पोळी", "पोळ्या", "बची हुई रोटी", "बची रोटी", "बासी रोटी", "रोटी"] },
  { id: "rava", name: { mr: "रवा", en: "Rava (semolina)", hi: "सूजी (रवा)" }, group: "grain", match: ["rava", "rawa", "sooji", "suji", "semolina", "रवा", "सूजी", "सुजी"] },
  { id: "poha", name: { mr: "पोहे", en: "Poha (flattened rice)", hi: "पोहा" }, group: "grain", match: ["poha", "pohe", "powa", "पोहे", "पोहा", "पोह्या", "flattened rice", "rice flakes"] },
  { id: "dalia", name: { mr: "दलिया (गव्हाचा रवा)", en: "Dalia (broken wheat)", hi: "दलिया" }, group: "grain", serving: { label: { mr: "1 वाटी शिजलेला दलिया", en: "1 katori cooked dalia", hi: "1 कटोरी पका दलिया" }, proteinG: 3 }, match: ["dalia", "daliya", "दलिया", "broken wheat", "lapsi", "lapshi", "लापशी", "गव्हाचा रवा"] },
  { id: "bread", name: { mr: "ब्रेड (पाव)", en: "Bread (pav)", hi: "ब्रेड (पाव)" }, group: "grain", match: ["bread", "ब्रेड", "double roti", "डबल रोटी", "ladi pav", "लादी पाव", "pav bread"] },
  { id: "ragi", name: { mr: "नाचणी", en: "Ragi (nachni)", hi: "रागी (नाचनी)" }, group: "millet", match: ["ragi", "nachni", "nachani", "नाचणी", "नाचनी", "रागी", "finger millet", "मंडुआ"] },
  { id: "jowar_flour", name: { mr: "ज्वारी / भाकरीचं पीठ", en: "Jowar / bhakri flour", hi: "ज्वार का आटा" }, group: "millet", serving: { label: { mr: "1 ज्वारीची भाकरी", en: "1 jowar bhakri", hi: "1 ज्वार की भाकरी" }, proteinG: 3 }, match: ["jowar", "jwari", "jowari", "jondhla", "ज्वारी", "ज्वार", "जोंधळा", "sorghum", "jowar flour", "bhakri", "भाकरी", "भाकरीचं पीठ", "ज्वारीचं पीठ", "ज्वार का आटा"] },
  { id: "bajra", name: { mr: "बाजरी", en: "Bajra (pearl millet)", hi: "बाजरा" }, group: "millet", serving: { label: { mr: "1 बाजरीची भाकरी", en: "1 bajra bhakri", hi: "1 बाजरे की रोटी" }, proteinG: 3 }, match: ["bajra", "bajri", "बाजरी", "बाजरा", "pearl millet"] },
  { id: "rajgira", name: { mr: "राजगिरा", en: "Rajgira (amaranth seeds)", hi: "राजगिरा (रामदाना)" }, group: "millet", match: ["rajgira", "राजगिरा", "राजगीरा", "ramdana", "रामदाना", "amaranth seed"] },
  { id: "sabudana", name: { mr: "साबुदाणा", en: "Sabudana", hi: "साबूदाना" }, group: "grain", match: ["sabudana", "sabudaana", "saboodana", "sago", "tapioca pearls", "साबुदाणा", "साबूदाणा", "साबूदाना", "साबुदाना"] },
  { id: "dal", name: { mr: "डाळ (कोणतीही)", en: "Dal (any kind)", hi: "दाल (कोई भी)" }, group: "pulse", serving: { label: { mr: "1 वाटी शिजलेली डाळ", en: "1 katori cooked dal", hi: "1 कटोरी पकी दाल" }, proteinG: 7 }, match: ["dal", "daal", "dhal", "डाळ", "दाल", "lentils", "pulses"] },
  { id: "toor_dal", name: { mr: "तूर डाळ", en: "Toor dal", hi: "अरहर (तुअर) दाल" }, group: "pulse", serving: { label: { mr: "1 वाटी शिजलेली डाळ", en: "1 katori cooked dal", hi: "1 कटोरी पकी दाल" }, proteinG: 6.5 }, match: ["toor", "tur", "tuvar", "arhar", "तूर", "तुर", "तुवर", "तुअर", "अरहर", "pigeon pea", "toor dal", "tur dal", "tuvar dal", "arhar dal", "तूर डाळ", "तुरीची डाळ", "तुअर दाल", "अरहर दाल", "अरहर की दाल"] },
  { id: "moong_dal", name: { mr: "मूग डाळ", en: "Moong dal", hi: "मूंग दाल" }, group: "pulse", serving: { label: { mr: "1 वाटी शिजलेली डाळ", en: "1 katori cooked dal", hi: "1 कटोरी पकी दाल" }, proteinG: 7 }, match: ["moong", "mung", "moog", "मूग", "मूंग", "मूँग", "मुग", "मूगडाळ", "green gram dal", "moong dal", "mung dal", "moog dal", "मूग डाळ", "मुगाची डाळ", "मूंग दाल", "मूँग दाल"] },
  { id: "moong_whole", name: { mr: "अख्खे मूग", en: "Whole moong", hi: "साबुत मूंग" }, group: "pulse", serving: { label: { mr: "1 वाटी मोड आलेले मूग", en: "1 katori sprouts", hi: "1 कटोरी अंकुरित मूंग" }, proteinG: 7 }, match: ["whole moong", "sabut moong", "hirve moog", "हिरवे मूग", "अख्खे मूग", "साबुत मूंग", "साबुत मूँग", "sprouts", "मोड आलेले मूग", "अंकुरित"] },
  { id: "masoor_dal", name: { mr: "मसूर डाळ", en: "Masoor dal", hi: "मसूर दाल" }, group: "pulse", serving: { label: { mr: "1 वाटी शिजलेली डाळ", en: "1 katori cooked dal", hi: "1 कटोरी पकी दाल" }, proteinG: 7 }, match: ["masoor", "masur", "मसूर", "red lentil", "lal dal", "लाल दाल", "masoor dal", "masur dal", "मसूर डाळ", "मसूर दाल"] },
  { id: "chana_dal", name: { mr: "चणा डाळ", en: "Chana dal", hi: "चना दाल" }, group: "pulse", serving: { label: { mr: "1 वाटी शिजलेली डाळ", en: "1 katori cooked dal", hi: "1 कटोरी पकी दाल" }, proteinG: 6.5 }, match: ["chana dal", "chanadal", "chane ki dal", "चणा डाळ", "चणाडाळ", "चण्याची डाळ", "हरभरा डाळ", "चना दाल", "चने की दाल", "bengal gram dal"] },
  { id: "kala_chana", name: { mr: "काळे चणे", en: "Kala chana (black chickpeas)", hi: "काला चना" }, group: "pulse", serving: { label: { mr: "1 वाटी शिजलेले चणे", en: "1 katori cooked chana", hi: "1 कटोरी पके चने" }, proteinG: 8 }, match: ["chana", "chane", "चना", "चने", "चणे", "हरभरे", "harbhare", "काळे चणे", "chickpeas", "black chana"] },
  { id: "matki", name: { mr: "मटकी", en: "Matki (moth beans)", hi: "मटकी (मोठ)" }, group: "pulse", serving: { label: { mr: "1 वाटी उसळ", en: "1 katori usal", hi: "1 कटोरी उसल" }, proteinG: 7 }, match: ["matki", "mataki", "मटकी", "moth beans", "moth bean"] },
  { id: "chawli", name: { mr: "चवळी", en: "Chawli (cowpea)", hi: "लोबिया" }, group: "pulse", serving: { label: { mr: "1 वाटी उसळ", en: "1 katori usal", hi: "1 कटोरी उसल" }, proteinG: 7 }, match: ["chawli", "chavli", "चवळी", "lobia", "lobiya", "लोबिया", "cowpea", "black eyed peas"] },
  { id: "rajma", name: { mr: "राजमा", en: "Rajma (kidney beans)", hi: "राजमा" }, group: "pulse", serving: { label: { mr: "1 वाटी शिजलेला राजमा", en: "1 katori cooked rajma", hi: "1 कटोरी पका राजमा" }, proteinG: 7 }, match: ["rajma", "rajmah", "राजमा", "kidney beans", "kidney bean"] },
  { id: "udid_dal", name: { mr: "उडीद डाळ", en: "Udid (urad) dal", hi: "उड़द दाल" }, group: "pulse", serving: { label: { mr: "1 वाटी शिजलेली डाळ", en: "1 katori cooked dal", hi: "1 कटोरी पकी दाल" }, proteinG: 7 }, match: ["udid", "urad", "udad", "उडीद", "उडद", "उड़द", "black gram", "udid dal", "urad dal", "udad dal", "उडीद डाळ", "उडदाची डाळ", "उड़द दाल", "उड़द की दाल"] },
  { id: "besan", name: { mr: "बेसन (डाळीचं पीठ)", en: "Besan (gram flour)", hi: "बेसन" }, group: "pulse", match: ["besan", "बेसन", "gram flour", "chickpea flour", "chana flour", "डाळीचं पीठ", "डाळीचे पीठ"] },
  { id: "soya_chunks", name: { mr: "सोयाबीन वडी", en: "Soya chunks", hi: "सोया बड़ी" }, group: "pulse", serving: { label: { mr: "30 ग्रॅम सुकी सोयाबीन वडी", en: "30 g dry soya chunks", hi: "30 ग्राम सूखी सोया बड़ी" }, proteinG: 15 }, match: ["soya chunks", "soya chunk", "soyabean", "soya bean", "soya badi", "soya vadi", "सोयाबीन", "सोया बड़ी", "सोया चंक्स"] },
  { id: "onion", name: { mr: "कांदा", en: "Onion", hi: "प्याज़" }, group: "veg", match: ["onion", "onions", "kanda", "kande", "pyaz", "pyaaz", "piyaz", "कांदा", "कांदे", "प्याज", "प्याज़"] },
  { id: "mixed_veg", name: { mr: "मिक्स भाज्या", en: "Mixed vegetables", hi: "मिक्स सब्ज़ियाँ" }, group: "veg", match: ["mixed veg", "mixed vegetables", "vegetables", "veggies", "sabzi", "sabji", "bhajya", "भाज्या", "मिक्स भाज्या", "सब्ज़ियाँ", "सब्जियां", "सब्ज़ी", "सब्जी"] },
  { id: "tomato", name: { mr: "टोमॅटो", en: "Tomato", hi: "टमाटर" }, group: "veg", match: ["tomato", "tomatoes", "tamatar", "tamaatar", "टोमॅटो", "टोमाटो", "टमाटर"] },
  { id: "potato", name: { mr: "बटाटा", en: "Potato", hi: "आलू" }, group: "veg", match: ["potato", "potatoes", "batata", "batate", "aloo", "बटाटा", "बटाटे", "आलू", "alu", "aalu", "aaloo"] },
  { id: "brinjal", name: { mr: "वांगी", en: "Brinjal", hi: "बैंगन" }, group: "veg", match: ["brinjal", "eggplant", "vangi", "vange", "baingan", "वांगी", "वांगे", "वांगं", "बैंगन"] },
  { id: "pumpkin", name: { mr: "लाल भोपळा", en: "Red pumpkin", hi: "कद्दू" }, group: "veg", match: ["pumpkin", "bhopla", "lal bhopla", "kaddu", "भोपळा", "लाल भोपळा", "कद्दू", "काशीफल"] },
  { id: "dudhi", name: { mr: "दुधी भोपळा", en: "Dudhi (bottle gourd)", hi: "लौकी" }, group: "veg", match: ["dudhi", "doodhi", "dudhi bhopla", "दुधी", "दुधी भोपळा", "lauki", "लौकी", "ghiya", "घीया", "bottle gourd"] },
  { id: "carrot", name: { mr: "गाजर", en: "Carrot", hi: "गाजर" }, group: "veg", match: ["carrot", "carrots", "gajar", "gaajar", "गाजर"] },
  { id: "beetroot", name: { mr: "बीट", en: "Beetroot", hi: "चुकंदर" }, group: "veg", match: ["beetroot", "beet", "बीट", "बीटरूट", "chukandar", "चुकंदर"] },
  { id: "cabbage", name: { mr: "कोबी", en: "Cabbage", hi: "पत्ता गोभी" }, group: "veg", match: ["cabbage", "kobi", "कोबी", "पत्ता कोबी", "patta gobhi", "पत्ता गोभी", "पत्तागोभी", "band gobhi", "बंद गोभी"] },
  { id: "cauliflower", name: { mr: "फ्लॉवर (फुलकोबी)", en: "Cauliflower", hi: "फूल गोभी" }, group: "veg", match: ["cauliflower", "phool gobhi", "phoolgobi", "gobi", "gobhi", "फुलकोबी", "फ्लॉवर", "फूलगोभी", "फूल गोभी", "गोभी"] },
  { id: "peas", name: { mr: "मटार", en: "Green peas", hi: "मटर" }, group: "veg", match: ["peas", "green peas", "matar", "mutter", "मटार", "मटर", "vatana", "वाटाणा", "वाटाणे"] },
  { id: "drumstick", name: { mr: "शेवग्याच्या शेंगा", en: "Drumstick", hi: "सहजन की फली" }, group: "veg", match: ["drumstick", "drumsticks", "shevga", "shevaga", "शेवगा", "शेवग्याच्या शेंगा", "sahjan", "सहजन", "सहजन की फली"] },
  { id: "bhendi", name: { mr: "भेंडी", en: "Bhendi (okra)", hi: "भिंडी" }, group: "veg", match: ["bhendi", "bhindi", "भेंडी", "भिंडी", "okra", "ladyfinger", "lady finger", "ladies finger"] },
  { id: "cucumber", name: { mr: "काकडी", en: "Cucumber", hi: "खीरा" }, group: "veg", match: ["cucumber", "kakdi", "kakadi", "काकडी", "kheera", "khira", "खीरा", "ककड़ी"] },
  { id: "green_chilli", name: { mr: "हिरवी मिरची", en: "Green chilli", hi: "हरी मिर्च" }, group: "spice", pantry: true, match: ["green chilli", "green chili", "mirchi", "mirch", "मिरची", "मिरच्या", "हिरवी मिरची", "हरी मिर्च", "मिर्च"] },
  { id: "ginger", name: { mr: "आलं", en: "Ginger", hi: "अदरक" }, group: "spice", match: ["ginger", "adrak", "adrakh", "अदरक", "अद्रक", "आलं", "आले"] },
  { id: "garlic", name: { mr: "लसूण", en: "Garlic", hi: "लहसुन" }, group: "spice", match: ["garlic", "lasun", "lasoon", "लसूण", "लसुण", "lehsun", "lahsun", "लहसुन"] },
  { id: "lemon", name: { mr: "लिंबू", en: "Lemon", hi: "नींबू" }, group: "fruit", match: ["lemon", "lime", "limbu", "nimbu", "लिंबू", "लिंबु", "नींबू", "निंबू", "lemon juice"] },
  { id: "coriander", name: { mr: "कोथिंबीर", en: "Coriander leaves", hi: "हरा धनिया" }, group: "leafy", match: ["coriander", "kothimbir", "कोथिंबीर", "कोथिंबिर", "dhaniya", "dhania", "धनिया", "cilantro"] },
  { id: "curry_leaves", name: { mr: "कढीपत्ता", en: "Curry leaves", hi: "करी पत्ता" }, group: "spice", match: ["curry leaves", "curry leaf", "kadipatta", "kadhipatta", "kadi patta", "कढीपत्ता", "कडीपत्ता", "करी पत्ता", "करीपत्ता", "meetha neem"] },
  { id: "palak", name: { mr: "पालक", en: "Palak (spinach)", hi: "पालक" }, group: "leafy", match: ["palak", "paalak", "palakh", "पालक", "spinach"] },
  { id: "methi", name: { mr: "मेथी", en: "Methi (fenugreek leaves)", hi: "मेथी" }, group: "leafy", match: ["methi", "meethi", "मेथी", "fenugreek", "methi leaves", "मेथीची भाजी", "मेथी की पत्तियाँ"] },
  { id: "drumstick_leaves", name: { mr: "शेवग्याची पानं", en: "Drumstick leaves", hi: "सहजन के पत्ते" }, group: "leafy", match: ["drumstick leaves", "moringa", "moringa leaves", "शेवग्याची पानं", "शेवग्याची पाने", "शेवग्याचा पाला", "shevga pane", "shevgyachi pane", "सहजन के पत्ते", "मोरिंगा"] },
  { id: "lal_math", name: { mr: "लाल माठ", en: "Lal math (red amaranth)", hi: "लाल चौलाई" }, group: "leafy", match: ["lal math", "lal maath", "laal maath", "लाल माठ", "माठ", "red amaranth", "amaranth leaves", "चौलाई", "chaulai"] },
  { id: "chakvat", name: { mr: "चाकवत", en: "Chakvat (bathua)", hi: "बथुआ" }, group: "leafy", match: ["chakvat", "chakwat", "चाकवत", "bathua", "बथुआ"] },
  { id: "shepu", name: { mr: "शेपू", en: "Shepu (dill leaves)", hi: "सोआ (सुवा)" }, group: "leafy", match: ["shepu", "शेपू", "शेपु", "suva", "सुवा", "dill", "सोआ"] },
  { id: "banana", name: { mr: "केळं", en: "Banana", hi: "केला" }, group: "fruit", match: ["banana", "bananas", "kela", "kele", "केळं", "केळी", "केळ", "केला", "केले"] },
  { id: "guava", name: { mr: "पेरू", en: "Guava", hi: "अमरूद" }, group: "fruit", match: ["guava", "peru", "पेरू", "amrood", "amrud", "अमरूद"] },
  { id: "papaya", name: { mr: "पपई", en: "Papaya", hi: "पपीता" }, group: "fruit", match: ["papaya", "papai", "पपई", "papita", "पपीता"] },
  { id: "orange", name: { mr: "संत्रं", en: "Orange", hi: "संतरा" }, group: "fruit", match: ["orange", "oranges", "santra", "संत्रं", "संत्रा", "संत्री", "संतरा"] },
  { id: "amla", name: { mr: "आवळा", en: "Amla (Indian gooseberry)", hi: "आंवला" }, group: "fruit", match: ["amla", "avla", "awla", "आवळा", "आवळे", "आंवला", "आँवला", "gooseberry"] },
  { id: "mango", name: { mr: "आंबा", en: "Mango", hi: "आम" }, group: "fruit", match: ["mango", "mangoes", "amba", "aamba", "आंबा", "आंबे", "hapus", "हापूस"] },
  { id: "apple", name: { mr: "सफरचंद", en: "Apple", hi: "सेब" }, group: "fruit", match: ["apple", "apples", "safarchand", "सफरचंद", "सेब", "seb"] },
  { id: "chikoo", name: { mr: "चिकू", en: "Chikoo (sapota)", hi: "चीकू" }, group: "fruit", match: ["chikoo", "chiku", "चिकू", "चीकू", "sapota"] },
  { id: "dates", name: { mr: "खजूर", en: "Dates", hi: "खजूर" }, group: "fruit", match: ["dates", "khajur", "khajoor", "खजूर", "kharik", "खारीक", "छुहारा"] },
  { id: "milk", name: { mr: "दूध", en: "Milk", hi: "दूध" }, group: "dairy", serving: { label: { mr: "1 ग्लास दूध (200 मिली)", en: "1 glass milk (200 ml)", hi: "1 गिलास दूध (200 मिली)" }, proteinG: 6.5 }, match: ["milk", "doodh", "dudh", "दूध", "दुध"] },
  { id: "curd", name: { mr: "दही", en: "Curd", hi: "दही" }, group: "dairy", serving: { label: { mr: "1 वाटी दही", en: "1 katori curd", hi: "1 कटोरी दही" }, proteinG: 4.5 }, match: ["curd", "curds", "dahi", "दही", "दह्या", "yogurt", "yoghurt"] },
  { id: "buttermilk", name: { mr: "ताक", en: "Buttermilk (taak)", hi: "छाछ" }, group: "dairy", match: ["buttermilk", "taak", "chaas", "chhaas", "chhachh", "ताक", "छाछ", "मठ्ठा", "mattha"] },
  { id: "paneer", name: { mr: "पनीर", en: "Paneer", hi: "पनीर" }, group: "dairy", serving: { label: { mr: "50 ग्रॅम पनीर", en: "50 g paneer", hi: "50 ग्राम पनीर" }, proteinG: 9 }, match: ["paneer", "panir", "पनीर", "cottage cheese"] },
  { id: "ghee", name: { mr: "तूप", en: "Ghee", hi: "घी" }, group: "fat", match: ["ghee", "tup", "toop", "तूप", "तुप", "desi ghee", "देसी घी"] },
  { id: "egg", name: { mr: "अंडी", en: "Egg", hi: "अंडा" }, group: "egg", serving: { label: { mr: "1 अंडं", en: "1 egg", hi: "1 अंडा" }, proteinG: 6 }, match: ["egg", "eggs", "anda", "ande", "andaa", "अंडा", "अंडे", "अंडी", "अंडं"] },
  { id: "bangda", name: { mr: "बांगडा", en: "Bangda (mackerel)", hi: "बांगड़ा (मैकेरल)" }, group: "fish", serving: { label: { mr: "100 ग्रॅम मासा", en: "100 g fish", hi: "100 ग्राम मछली" }, proteinG: 20 }, match: ["bangda", "बांगडा", "बांगडे", "बांगड़ा", "mackerel"] },
  { id: "bombil", name: { mr: "बोंबील", en: "Bombil (Bombay duck)", hi: "बोंबिल (बॉम्बे डक)" }, group: "fish", serving: { label: { mr: "100 ग्रॅम मासा", en: "100 g fish", hi: "100 ग्राम मछली" }, proteinG: 13 }, match: ["bombil", "bombla", "बोंबील", "बोंबिल", "बोंबला", "bombay duck"] },
  { id: "dried_fish", name: { mr: "सुकी मासळी", en: "Dried fish", hi: "सूखी मछली" }, group: "fish", match: ["dried fish", "dry fish", "sukat", "सुकट", "सुकी मासळी", "सुके मासे", "सुका बोंबील", "सूखी मछली", "sukhi machhi", "sukka bombil"] },
  { id: "prawns", name: { mr: "कोळंबी", en: "Prawns", hi: "झींगा" }, group: "fish", serving: { label: { mr: "100 ग्रॅम साफ केलेली कोळंबी", en: "100 g cleaned prawns", hi: "100 ग्राम साफ़ किए झींगे" }, proteinG: 13 }, match: ["prawns", "prawn", "shrimp", "kolambi", "कोळंबी", "कोलंबी", "jhinga", "झींगा", "झिंगा"] },
  { id: "chicken", name: { mr: "चिकन", en: "Chicken", hi: "चिकन" }, group: "meat", serving: { label: { mr: "100 ग्रॅम चिकन (हाडांशिवाय)", en: "100 g chicken (without bone)", hi: "100 ग्राम चिकन (बिना हड्डी)" }, proteinG: 18 }, match: ["chicken", "चिकन", "kombdi", "कोंबडी", "murgi", "murga", "मुर्गी", "मुर्गा"] },
  { id: "fish", name: { mr: "मासे", en: "Fish", hi: "मछली" }, group: "fish", match: ["fish", "mase", "masa", "masali", "machhi", "machli", "machhli", "surmai", "pomfret", "paplet", "मासे", "मासा", "मासळी", "मछली", "सुरमई", "पापलेट"] },
  { id: "peanuts", name: { mr: "शेंगदाणे", en: "Peanuts", hi: "मूंगफली" }, group: "nut_seed", serving: { label: { mr: "30 ग्रॅम शेंगदाणे (मूठभर)", en: "30 g peanuts (a handful)", hi: "30 ग्राम मूंगफली (मुट्ठी भर)" }, proteinG: 7 }, match: ["peanut", "shengdana", "shengdane", "moongphali", "mungfali", "शेंगदाणे", "शेंगदाणा", "मूंगफली", "मूँगफली", "दाण्याचं कूट", "peanuts", "groundnut", "groundnuts", "शेंगदाण्याचं कूट", "दाणे"] },
  { id: "til", name: { mr: "तीळ", en: "Til (sesame)", hi: "तिल" }, group: "nut_seed", match: ["til", "teel", "sesame", "तीळ", "तिळ", "तिल", "gingelly"] },
  { id: "flaxseed", name: { mr: "जवस", en: "Flaxseed (javas)", hi: "अलसी" }, group: "nut_seed", match: ["flaxseed", "flax", "linseed", "javas", "जवस", "alsi", "अलसी"] },
  { id: "coconut", name: { mr: "नारळ (खोबरं)", en: "Coconut", hi: "नारियल" }, group: "nut_seed", match: ["coconut", "naral", "नारळ", "khobra", "khobre", "खोबरं", "खोबरे", "nariyal", "नारियल", "kopra"] },
  { id: "aliv", name: { mr: "अळीव", en: "Aliv (garden cress seeds)", hi: "हलीम (चंद्रशूर)" }, group: "nut_seed", match: ["aliv", "अळीव", "halim", "हलीम", "chandrashoor", "चंद्रशूर", "garden cress"] },
  { id: "oil", name: { mr: "तेल", en: "Oil", hi: "तेल" }, group: "fat", pantry: true, match: ["oil", "tel", "तेल", "sunflower oil", "groundnut oil", "शेंगदाणा तेल", "soyabean oil", "mustard oil"] },
  { id: "jaggery", name: { mr: "गूळ", en: "Jaggery", hi: "गुड़" }, group: "sweet", match: ["jaggery", "gul", "gool", "gud", "gur", "गूळ", "गुळ", "गुड़", "गुड"] },
  { id: "sugar", name: { mr: "साखर", en: "Sugar", hi: "चीनी" }, group: "sweet", match: ["sugar", "sakhar", "साखर", "cheeni", "chini", "चीनी", "shakkar", "शक्कर"] },
  { id: "honey", name: { mr: "मध", en: "Honey", hi: "शहद" }, group: "sweet", match: ["honey", "shahad", "शहद", "मधाचं", "मधाचा", "मध"] },
  { id: "sweets", name: { mr: "मिठाई, चॉकलेट", en: "Sweets and chocolates", hi: "मिठाई, चॉकलेट" }, group: "sweet", match: ["sweets", "mithai", "मिठाई", "chocolate", "चॉकलेट", "toffee", "टॉफी", "candy"] },
  { id: "biscuits", name: { mr: "बिस्किटं", en: "Biscuits", hi: "बिस्कुट" }, group: "other", match: ["biscuit", "biskit", "बिस्किट", "बिस्कीट", "बिस्कुट", "cookies"] },
  { id: "packaged_juice", name: { mr: "पाकिटातला ज्यूस, कोल्ड ड्रिंक", en: "Packaged juice or cold drink", hi: "पैकेट वाला जूस, कोल्ड ड्रिंक" }, group: "other", match: ["juice", "packaged juice", "ज्यूस", "जूस", "cold drink", "soft drink", "कोल्ड ड्रिंक", "tetra pack"] },
  { id: "tea", name: { mr: "चहा", en: "Tea", hi: "चाय" }, group: "other", match: ["tea", "chai", "chaha", "चहा", "चाय"] },
  { id: "coffee", name: { mr: "कॉफी", en: "Coffee", hi: "कॉफ़ी" }, group: "other", match: ["coffee", "kofi", "कॉफी", "कॉफ़ी"] },
  { id: "salt", name: { mr: "मीठ", en: "Salt", hi: "नमक" }, group: "other", pantry: true, match: ["salt", "meeth", "mith", "मीठ", "namak", "नमक"] },
  { id: "turmeric", name: { mr: "हळद", en: "Turmeric", hi: "हल्दी" }, group: "spice", pantry: true, match: ["turmeric", "halad", "haldi", "हळद", "हल्दी"] },
  { id: "mustard_seeds", name: { mr: "मोहरी", en: "Mustard seeds", hi: "राई" }, group: "spice", pantry: true, match: ["mustard", "mohari", "mohri", "मोहरी", "rai", "raai", "राई"] },
  { id: "cumin", name: { mr: "जिरं", en: "Cumin (jeera)", hi: "जीरा" }, group: "spice", pantry: true, match: ["cumin", "jeera", "jira", "jeere", "जिरं", "जिरे", "जीरा"] },
  { id: "chilli_powder", name: { mr: "लाल तिखट", en: "Red chilli powder", hi: "लाल मिर्च पाउडर" }, group: "spice", pantry: true, match: ["chilli powder", "chili powder", "red chilli", "lal mirchi", "mirchi powder", "tikhat", "तिखट", "लाल तिखट", "लाल मिरची", "लाल मिर्च"] },
  { id: "hing", name: { mr: "हिंग", en: "Hing (asafoetida)", hi: "हींग" }, group: "spice", pantry: true, match: ["hing", "heeng", "हिंग", "हींग", "asafoetida"] },
  { id: "goda_masala", name: { mr: "गोडा मसाला", en: "Goda masala", hi: "गोडा मसाला" }, group: "spice", match: ["goda masala", "goda masale", "गोडा मसाला", "गोडा मसाले"] },
  { id: "garam_masala", name: { mr: "गरम मसाला", en: "Garam masala", hi: "गरम मसाला" }, group: "spice", match: ["garam masala", "garam masale", "गरम मसाला", "गरम मसाले"] },
  { id: "kokum", name: { mr: "कोकम (आमसूल)", en: "Kokum", hi: "कोकम" }, group: "spice", match: ["kokum", "कोकम", "amsul", "aamsul", "आमसूल", "आमसुल", "आमसुलं", "ratamba", "रातांबा"] },
  { id: "tamarind", name: { mr: "चिंच", en: "Tamarind", hi: "इमली" }, group: "spice", match: ["tamarind", "chinch", "चिंच", "imli", "इमली"] },
  { id: "water", name: { mr: "पाणी", en: "Water", hi: "पानी" }, group: "other", pantry: true, match: ["water", "pani", "paani", "पाणी", "पानी"] },
];

/* ------------------------------------------------------------------ */
/* Recipes                                                             */
/* ------------------------------------------------------------------ */

export const recipes: Recipe[] = [
  {
    id: "kanda_pohe",
    minutes: 20,
    meals: ["breakfast", "snack"],
    needs: ["poha", "onion", "peanuts"],
    optional: ["potato", "lemon", "coriander", "curry_leaves", "peas", "coconut"],
    tags: ["quick", "kids", "guests", "budget"],
    name: { mr: "कांदे पोहे", en: "Kanda pohe", hi: "कांदा पोहा (प्याज़ पोहा)" },
    estimate: { proteinG: 7.5, kcal: 300, costRs: 9, serves: 3 },
    highlights: ["protein"],
    goodFor: ["family", "woman", "pregnant_t1", "child_3_6y", "child_6_10y", "girl_10_18"],
    minChildMonths: 12,
    why: { mr: "शेंगदाण्यांतून प्रथिनं मिळतात, आणि पोह्यांतून ताकद आणि थोडं लोह.", en: "Peanuts add protein, and pohe give energy and some iron.", hi: "मूंगफली से प्रोटीन मिलता है, और पोहे से ताक़त और थोड़ा आयरन।" },
    childNote: { mr: "5 वर्षांखालील मुलांना अख्खे शेंगदाणे देऊ नका. त्याऐवजी 1 चमचा दाण्याचं कूट मिसळा. मिरची कमी ठेवा आणि पोहे मऊ ठेवा.", en: "For children under 5: do not give whole peanuts. Mix in 1 spoon of peanut powder instead. Keep it mild and soft.", hi: "5 साल से छोटे बच्चों को साबुत मूंगफली न दें। इसकी जगह 1 चम्मच मूंगफली का पाउडर मिलाएँ। मिर्च कम रखें और पोहा नरम रखें।" },
    pregnancyNote: { mr: "मूठभर मटार किंवा किसलेलं गाजर घाला. वरून लिंबू पिळा: व्हिटॅमिन C मुळे पोह्यांतलं लोह शरीराला नीट मिळतं.", en: "Add a handful of green peas or grated carrot. Squeeze lemon on top: vitamin C helps the body take in the iron in pohe.", hi: "मुट्ठी भर हरे मटर या कद्दूकस की हुई गाजर डालें। ऊपर से नींबू निचोड़ें: विटामिन C से पोहे का आयरन शरीर को अच्छे से मिलता है।" },
    swaps: [
      { from: "onion", to: "potato", note: { mr: "बटाटे पोहे करायचे असतील तर कांद्याऐवजी बटाट्याच्या बारीक फोडी घ्या.", en: "For batata pohe, use small potato cubes instead of onion.", hi: "बटाटा पोहा बनाना हो तो प्याज़ की जगह आलू के छोटे टुकड़े लें।" } },
      { from: "peanuts", to: "peas", note: { mr: "हंगामात मिळणारे मटारही थोडी प्रथिनं देतात.", en: "Green peas in season also add some protein.", hi: "मौसम में मिलने वाले हरे मटर से भी थोड़ा प्रोटीन मिलता है।" } },
    ],
    steps: [
      { mr: "3 वाट्या जाड पोहे चाळणीत घेऊन पाण्याखाली धुवा. 5 मिनिटं मऊ होऊ द्या. मीठ आणि चिमूटभर हळद घालून हलक्या हाताने मिसळा.", en: "Put 3 katori thick pohe in a sieve and rinse under water. Leave for 5 minutes to soften. Add salt and a pinch of turmeric and mix gently.", hi: "3 कटोरी मोटा पोहा छलनी में लेकर पानी में धोएँ। 5 मिनट नरम होने दें। नमक और चुटकी भर हल्दी डालकर हल्के हाथ से मिलाएँ।" },
      { mr: "1 मोठा चमचा तेल गरम करून अर्धी वाटी शेंगदाणे कुरकुरीत तळा आणि बाजूला काढा.", en: "Heat 1 big spoon oil and fry half a katori peanuts until crisp. Take them out.", hi: "1 बड़ा चम्मच तेल गरम करके आधी कटोरी मूंगफली कुरकुरी भूनें और अलग निकाल लें।" },
      { mr: "त्याच तेलात मोहरी, कढीपत्ता आणि 1-2 हिरव्या मिरच्या घाला. 1 मोठा चिरलेला कांदा घालून मऊ होईपर्यंत परता.", en: "In the same oil, add mustard seeds, curry leaves and 1 to 2 green chillies. Add 1 big chopped onion and fry until soft.", hi: "उसी तेल में राई, करी पत्ता और 1-2 हरी मिर्च डालें। 1 बड़ा कटा प्याज़ डालकर नरम होने तक भूनें।" },
      { mr: "पोहे आणि शेंगदाणे घालून हलक्या हाताने मिसळा. झाकण ठेवून मंद आचेवर 2-3 मिनिटं वाफ येऊ द्या.", en: "Add the pohe and peanuts and mix gently. Cover and cook on low heat for 2 to 3 minutes.", hi: "पोहा और मूंगफली डालकर हल्के हाथ से मिलाएँ। ढककर धीमी आँच पर 2-3 मिनट भाप आने दें।" },
      { mr: "वरून लिंबू पिळा आणि कोथिंबीर घालून वाढा.", en: "Squeeze lemon on top, add coriander and serve.", hi: "ऊपर से नींबू निचोड़ें और हरा धनिया डालकर परोसें।" },
    ],
  },
  {
    id: "upma",
    minutes: 20,
    meals: ["breakfast", "snack"],
    needs: ["rava", "onion", "carrot"],
    optional: ["peas", "tomato", "ginger", "curry_leaves", "lemon", "coriander"],
    tags: ["quick", "lowOil", "kids", "budget"],
    name: { mr: "भाज्यांचा उपमा", en: "Vegetable upma", hi: "सब्ज़ी वाला उपमा" },
    estimate: { proteinG: 6, kcal: 230, costRs: 8, serves: 3 },
    highlights: ["vit_a"],
    goodFor: ["family", "pregnant_t1", "child_1_3y", "child_3_6y", "child_6_10y", "elder"],
    minChildMonths: 12,
    why: { mr: "रव्यातून ताकद मिळते, आणि गाजरातून व्हिटॅमिन A.", en: "Rava gives energy, and carrot adds vitamin A.", hi: "सूजी से ताक़त मिलती है, और गाजर से विटामिन A।" },
    childNote: { mr: "1 वर्षानंतर: थोडं जास्त पाणी घालून उपमा मऊ करा. मिरची घालू नका आणि भाज्या कुस्करून द्या.", en: "From 1 year: add a little more water so the upma is soft. Leave out the chilli and mash the vegetables.", hi: "1 साल के बाद: थोड़ा ज़्यादा पानी डालकर उपमा नरम बनाएँ। मिर्च न डालें और सब्ज़ियाँ मसलकर दें।" },
    pregnancyNote: { mr: "भाज्या जास्त घाला आणि मूठभर भाजलेले शेंगदाणे घाला. सोबत 1 ग्लास दूध किंवा 1 वाटी दही घ्या.", en: "Add more vegetables and a handful of roasted peanuts. Have a glass of milk or a katori of curd with it.", hi: "सब्ज़ियाँ ज़्यादा डालें और मुट्ठी भर भुनी मूंगफली डालें। साथ में 1 गिलास दूध या 1 कटोरी दही लें।" },
    swaps: [
      { from: "rava", to: "dalia", note: { mr: "दलियाही असाच वापरता येतो. पाणी थोडं जास्त घ्या आणि काही मिनिटं जास्त शिजवा.", en: "Dalia can be used the same way. Use a little more water and cook a few minutes longer.", hi: "दलिया भी ऐसे ही इस्तेमाल कर सकते हैं। पानी थोड़ा ज़्यादा लें और कुछ मिनट ज़्यादा पकाएँ।" } },
      { from: "carrot", to: "cabbage", note: { mr: "घरात असेल ती भाजी वापरा, जसं कोबी किंवा दुधी.", en: "Use any vegetable you have, like cabbage or dudhi.", hi: "घर में जो सब्ज़ी हो वह डालें, जैसे पत्ता गोभी या लौकी।" } },
    ],
    steps: [
      { mr: "दीड वाटी रवा मंद आचेवर 5 मिनिटं खमंग भाजून बाजूला ठेवा.", en: "Dry roast 1 and a half katori rava on low heat for 5 minutes until it smells nice. Keep it aside.", hi: "डेढ़ कटोरी सूजी धीमी आँच पर 5 मिनट खुशबू आने तक भूनकर अलग रखें।" },
      { mr: "1 मोठा चमचा तेल गरम करून मोहरी, कढीपत्ता, हिरवी मिरची आणि किसलेलं आलं घाला.", en: "Heat 1 big spoon oil. Add mustard seeds, curry leaves, green chilli and grated ginger.", hi: "1 बड़ा चम्मच तेल गरम करके राई, करी पत्ता, हरी मिर्च और कद्दूकस किया अदरक डालें।" },
      { mr: "1 चिरलेला कांदा आणि 1 किसलेलं गाजर घाला. मटार (असल्यास) घाला. 3-4 मिनिटं परता.", en: "Add 1 chopped onion and 1 grated carrot. Add peas (if you have). Fry for 3 to 4 minutes.", hi: "1 कटा प्याज़ और 1 कद्दूकस की हुई गाजर डालें। मटर (हो तो) डालें। 3-4 मिनट भूनें।" },
      { mr: "3 वाट्या पाणी आणि मीठ घालून उकळी आणा.", en: "Add 3 katori water and salt, and bring to a boil.", hi: "3 कटोरी पानी और नमक डालकर उबाल आने दें।" },
      { mr: "आच कमी करा. रवा हळूहळू घालत सतत हलवा, म्हणजे गुठळ्या होणार नाहीत. झाकण ठेवून 3 मिनिटं शिजवा.", en: "Lower the heat. Add the rava slowly, stirring all the time so no lumps form. Cover and cook for 3 minutes.", hi: "आँच धीमी करें। सूजी धीरे-धीरे डालते हुए लगातार चलाएँ, ताकि गुठली न पड़े। ढककर 3 मिनट पकाएँ।" },
      { mr: "लिंबू पिळून, कोथिंबीर घालून गरम वाढा.", en: "Squeeze lemon, add coriander and serve hot.", hi: "नींबू निचोड़कर, हरा धनिया डालकर गरम परोसें।" },
    ],
  },
  {
    id: "thalipeeth",
    minutes: 35,
    meals: ["breakfast", "dinner", "snack"],
    needs: ["jowar_flour", "besan", "onion"],
    optional: ["bajra", "wheat_flour", "coriander", "curd", "til"],
    tags: ["healthy", "lowOil", "kids", "budget"],
    name: { mr: "थालीपीठ", en: "Thalipeeth (mixed flour flatbread)", hi: "थालीपीठ" },
    estimate: { proteinG: 9, kcal: 300, costRs: 8, serves: 4 },
    highlights: ["protein", "fibre", "iron"],
    goodFor: ["family", "woman", "lactating", "girl_10_18", "child_6_10y"],
    minChildMonths: 12,
    why: { mr: "ज्वारी आणि बेसनातून प्रथिनं, फायबर आणि लोह मिळतं.", en: "Jowar and besan give protein, fibre and iron.", hi: "ज्वार और बेसन से प्रोटीन, फ़ाइबर और आयरन मिलता है।" },
    childNote: { mr: "1 वर्षानंतर: तिखट न घालता छोटं, मऊ थालीपीठ करा. छोटे तुकडे करून दह्यासोबत द्या.", en: "From 1 year: make a small, soft thalipeeth without chilli. Cut it into small pieces and give with curd.", hi: "1 साल के बाद: बिना मिर्च का छोटा, नरम थालीपीठ बनाएँ। छोटे टुकड़े करके दही के साथ दें।" },
    pregnancyNote: { mr: "पिठात मूठभर चिरलेली मेथी किंवा पालक घाला. सोबत 1 वाटी दही घ्या.", en: "Add a handful of chopped methi or palak to the dough. Have a katori of curd with it.", hi: "आटे में मुट्ठी भर कटी मेथी या पालक डालें। साथ में 1 कटोरी दही लें।" },
    swaps: [
      { from: "jowar_flour", to: "bajra", note: { mr: "बाजरीचं पीठही चालतं, त्यात लोह जास्त असतं.", en: "Bajra flour also works and has more iron.", hi: "बाजरे का आटा भी चलेगा, उसमें आयरन ज़्यादा होता है।" } },
      { from: "besan", to: "wheat_flour", note: { mr: "बेसन नसेल तर गव्हाचं पीठ वापरा. प्रथिनं थोडी कमी मिळतील.", en: "If you have no besan, use wheat flour. It will have a little less protein.", hi: "बेसन न हो तो गेहूँ का आटा लें। प्रोटीन थोड़ा कम मिलेगा।" } },
    ],
    steps: [
      { mr: "मोठ्या ताटात अडीच वाट्या ज्वारीचं पीठ आणि 1 वाटी बेसन एकत्र करा.", en: "In a big plate, mix 2 and a half katori jowar flour and 1 katori besan.", hi: "बड़ी थाली में ढाई कटोरी ज्वार का आटा और 1 कटोरी बेसन मिलाएँ।" },
      { mr: "2 बारीक चिरलेले कांदे, कोथिंबीर, हळद, तिखट, जिरं, मीठ आणि 1 चमचा तेल घालून नीट मिसळा.", en: "Add 2 finely chopped onions, coriander, turmeric, chilli powder, cumin, salt and 1 spoon oil. Mix well.", hi: "2 बारीक कटे प्याज़, हरा धनिया, हल्दी, लाल मिर्च पाउडर, जीरा, नमक और 1 चम्मच तेल डालकर अच्छे से मिलाएँ।" },
      { mr: "थोडं थोडं पाणी घालून मऊ पीठ मळा.", en: "Add water little by little and knead a soft dough.", hi: "थोड़ा-थोड़ा पानी डालकर नरम आटा गूँधें।" },
      { mr: "तव्यावर किंवा प्लास्टिकच्या कागदावर तेलाचे काही थेंब लावा. पिठाचा गोळा ओल्या बोटांनी पातळ थापा आणि मध्ये 3-4 छिद्रं करा.", en: "Put a few drops of oil on the tawa or on a plastic sheet. Pat a ball of dough thin with wet fingers and make 3 to 4 holes in it.", hi: "तवे या प्लास्टिक की शीट पर तेल की कुछ बूँदें लगाएँ। आटे की लोई गीली उँगलियों से पतली थपथपाएँ और बीच में 3-4 छेद करें।" },
      { mr: "मध्यम आचेवर भाजा. छिद्रांमध्ये आणि कडेने तेलाचे काही थेंब सोडा. खालची बाजू कुरकुरीत झाली की उलटा.", en: "Cook on medium heat, with a few drops of oil in the holes and around the edge. Turn it when the bottom is crisp.", hi: "मध्यम आँच पर सेंकें। छेदों में और किनारों पर तेल की कुछ बूँदें डालें। नीचे की तरफ़ कुरकुरी हो जाए तो पलटें।" },
      { mr: "दुसरी बाजूही भाजून दह्यासोबत गरम वाढा.", en: "Cook the other side and serve hot with curd.", hi: "दूसरी तरफ़ भी सेंककर दही के साथ गरम परोसें।" },
    ],
  },
  {
    id: "varan_bhaat",
    minutes: 35,
    meals: ["lunch", "dinner"],
    needs: ["rice", "dal", "ghee"],
    optional: ["lemon"],
    tags: ["kids", "lowOil", "healthy", "onePot", "budget"],
    name: { mr: "वरण भात", en: "Varan bhaat (dal rice)", hi: "वरण भात (दाल-चावल)" },
    estimate: { proteinG: 10, kcal: 310, costRs: 13, serves: 4 },
    highlights: ["protein"],
    goodFor: ["family", "pregnant_t1", "lactating", "child_6_12m", "child_1_3y", "child_3_6y", "elder"],
    minChildMonths: 6,
    why: { mr: "वरण आणि भात मिळून चांगली प्रथिनं मिळतात, आणि तुपातून ताकद मिळते.", en: "Dal and rice together give good protein, and ghee adds energy.", hi: "दाल और चावल मिलकर अच्छा प्रोटीन देते हैं, और घी से ताक़त मिलती है।" },
    childNote: { mr: "6 ते 12 महिने: मीठ घालण्याआधी थोडं वरण बाजूला काढा. ते मऊ भातात कुस्करून, तुपाचे 2-3 थेंब घालून द्या. 1 वर्षानंतर: कमी मीठ घालून वरण भात द्या.", en: "6 to 12 months: take out some dal before adding salt. Mash it with soft rice and add 2 to 3 drops of ghee. From 1 year: give varan bhaat with less salt.", hi: "6 से 12 महीने: नमक डालने से पहले थोड़ी दाल अलग निकाल लें। उसे नरम चावल में मसलकर, घी की 2-3 बूँदें डालकर दें। 1 साल के बाद: कम नमक वाला दाल-चावल दें।" },
    pregnancyNote: { mr: "जास्त प्रथिनांसाठी 1 ऐवजी 2 वाट्या वरण घ्या. जेवणात एक पालेभाजी घ्या. बाळाला दूध पाजत असाल तर प्रत्येक जेवणासोबत 1 ग्लास पाणी प्या.", en: "Take 2 katori varan instead of 1 for more protein. Add a green leafy vegetable to the meal. When breastfeeding, drink a glass of water with each meal.", hi: "ज़्यादा प्रोटीन के लिए 1 की जगह 2 कटोरी दाल लें। खाने में एक हरी पत्तेदार सब्ज़ी लें। बच्चे को दूध पिलाती हैं तो हर खाने के साथ 1 गिलास पानी पिएँ।" },
    swaps: [
      { from: "dal", to: "masoor_dal", note: { mr: "मसूर डाळ बहुतेक वेळा स्वस्त असते आणि लवकर शिजते.", en: "Masoor dal is often cheaper and cooks faster.", hi: "मसूर दाल अक्सर सस्ती होती है और जल्दी पकती है।" } },
      { from: "ghee", to: "oil", note: { mr: "तूप महाग वाटत असेल तर वरणाला 1 चमचा तेलात जिरं आणि लसणाची फोडणी द्या.", en: "If ghee is costly, give the varan a tadka of cumin and garlic in 1 spoon oil.", hi: "घी महँगा लगे तो दाल में 1 चम्मच तेल में जीरा और लहसुन का तड़का लगाएँ।" } },
    ],
    steps: [
      { mr: "1 वाटी तूर डाळ (किंवा मूग डाळ) धुवा. कुकरच्या डब्यात अडीच वाट्या पाणी, अर्धा चमचा हळद आणि चिमूटभर हिंग घालून ठेवा.", en: "Wash 1 katori toor dal (or moong dal). Put it in a cooker vessel with 2 and a half katori water, half a spoon of turmeric and a pinch of hing.", hi: "1 कटोरी अरहर दाल (या मूंग दाल) धोएँ। कुकर के डिब्बे में ढाई कटोरी पानी, आधा चम्मच हल्दी और चुटकी भर हींग डालकर रखें।" },
      { mr: "दीड वाटी तांदूळ धुवा आणि दुसऱ्या डब्यात 3 वाट्या पाणी घालून ठेवा.", en: "Wash 1 and a half katori rice and put it in a second vessel with 3 katori water.", hi: "डेढ़ कटोरी चावल धोएँ और दूसरे डिब्बे में 3 कटोरी पानी डालकर रखें।" },
      { mr: "दोन्ही डबे कुकरमध्ये ठेवून 3-4 शिट्ट्या होऊ द्या.", en: "Put both vessels in the cooker and cook for 3 to 4 whistles.", hi: "दोनों डिब्बे कुकर में रखकर 3-4 सीटी आने दें।" },
      { mr: "डाळ डावाने चांगली घोटा. मीठ आणि थोडं पाणी घालून एक उकळी काढा.", en: "Mash the dal well with a ladle. Add salt and a little water, and bring it to one boil.", hi: "दाल को कलछी से अच्छे से घोटें। नमक और थोड़ा पानी डालकर एक उबाल आने दें।" },
      { mr: "भातावर वरण, 1 चमचा तूप घाला आणि लिंबू पिळून वाढा.", en: "Serve the rice with varan on top, 1 spoon ghee and a squeeze of lemon.", hi: "चावल पर दाल, 1 चम्मच घी डालें और नींबू निचोड़कर परोसें।" },
    ],
  },
  {
    id: "pithla_bhakri",
    minutes: 45,
    meals: ["lunch", "dinner"],
    needs: ["besan", "jowar_flour", "onion"],
    optional: ["garlic", "coriander", "curd"],
    tags: ["healthy", "lowOil", "budget"],
    name: { mr: "पिठलं भाकरी", en: "Pithla bhakri (besan curry with jowar roti)", hi: "पिठला भाकरी" },
    estimate: { proteinG: 12, kcal: 370, costRs: 9, serves: 4 },
    highlights: ["protein", "iron", "fibre"],
    goodFor: ["family", "woman", "pregnant_t2", "pregnant_t3", "lactating", "girl_10_18", "child_6_10y"],
    minChildMonths: 12,
    why: { mr: "बेसन आणि ज्वारीतून प्रथिनं, लोह आणि फायबर मिळतं.", en: "Besan and jowar give protein, iron and fibre.", hi: "बेसन और ज्वार से प्रोटीन, आयरन और फ़ाइबर मिलता है।" },
    childNote: { mr: "1 वर्षानंतर: पिठलं मिरचीशिवाय सौम्य करा. भाकरीचे छोटे तुकडे पिठल्यात मऊ होईपर्यंत भिजवून द्या.", en: "From 1 year: make the pithla mild, without chilli. Soak small pieces of bhakri in the pithla until soft.", hi: "1 साल के बाद: पिठला बिना मिर्च के हल्का बनाएँ। भाकरी के छोटे टुकड़े पिठले में नरम होने तक भिगोकर दें।" },
    pregnancyNote: { mr: "पिठल्यात मूठभर चिरलेली मेथी किंवा पालक घाला. जेवणासोबत 1 वाटी दही किंवा 1 ग्लास ताक घ्या.", en: "Add a handful of chopped methi or palak to the pithla. Have a katori of curd or a glass of buttermilk with the meal.", hi: "पिठले में मुट्ठी भर कटी मेथी या पालक डालें। खाने के साथ 1 कटोरी दही या 1 गिलास छाछ लें।" },
    swaps: [
      { from: "jowar_flour", to: "bajra", note: { mr: "बाजरीची भाकरीही अशीच करता येते, त्यात लोह जास्त असतं.", en: "Bajra bhakri is made the same way and has more iron.", hi: "बाजरे की भाकरी भी ऐसे ही बनती है, उसमें आयरन ज़्यादा होता है।" } },
      { from: "jowar_flour", to: "ragi", note: { mr: "नाचणीची भाकरीही चालते, त्यात कॅल्शियम खूप जास्त असतं.", en: "Nachni bhakri also works and has much more calcium.", hi: "रागी (नाचनी) की भाकरी भी चलेगी, उसमें कैल्शियम बहुत ज़्यादा होता है।" } },
    ],
    steps: [
      { mr: "1 वाटी बेसन 3 वाट्या पाण्यात गुठळ्या न होता कालवा.", en: "Mix 1 katori besan into 3 katori water with no lumps.", hi: "1 कटोरी बेसन को 3 कटोरी पानी में बिना गुठली के घोलें।" },
      { mr: "1 मोठा चमचा तेल गरम करून मोहरी, जिरं, हिंग, ठेचलेला लसूण, 1 चिरलेला कांदा आणि मिरची घाला. कांदा मऊ होईपर्यंत परता.", en: "Heat 1 big spoon oil. Add mustard seeds, cumin, hing, crushed garlic, 1 chopped onion and green chilli. Fry until the onion is soft.", hi: "1 बड़ा चम्मच तेल गरम करके राई, जीरा, हींग, कुचला लहसुन, 1 कटा प्याज़ और हरी मिर्च डालें। प्याज़ नरम होने तक भूनें।" },
      { mr: "हळद आणि मीठ घाला. बेसनाचं पाणी सतत हलवत ओता, म्हणजे गुठळ्या होणार नाहीत.", en: "Add turmeric and salt. Pour in the besan water, stirring all the time so no lumps form.", hi: "हल्दी और नमक डालें। बेसन का घोल लगातार चलाते हुए डालें, ताकि गुठली न पड़े।" },
      { mr: "मंद आचेवर 8-10 मिनिटं हलवत शिजवा. घट्ट झाल्यावर कोथिंबीर घाला.", en: "Cook on low heat for 8 to 10 minutes, stirring, until it thickens. Add coriander.", hi: "धीमी आँच पर 8-10 मिनट चलाते हुए पकाएँ। गाढ़ा होने पर हरा धनिया डालें।" },
      { mr: "भाकरीसाठी: 4 वाट्या ज्वारीचं पीठ कोमट पाणी आणि चिमूटभर मीठ घालून मळा. गोळा घेऊन हाताने थापून भाकरी करा.", en: "For bhakri: knead 4 katori jowar flour with warm water and a pinch of salt. Take a ball and pat it by hand into a round bhakri.", hi: "भाकरी के लिए: 4 कटोरी ज्वार का आटा गुनगुने पानी और चुटकी भर नमक के साथ गूँधें। लोई लेकर हाथ से थपथपाकर गोल भाकरी बनाएँ।" },
      { mr: "गरम तव्यावर टाकून वरून पाणी फिरवा, उलटून दोन्ही बाजूंनी भाजा. गरम पिठल्यासोबत वाढा.", en: "Put it on a hot tawa and spread a little water on top. Turn it and cook both sides. Serve hot with the pithla.", hi: "गरम तवे पर डालकर ऊपर पानी लगाएँ, पलटकर दोनों तरफ़ सेंकें। गरम पिठले के साथ परोसें।" },
    ],
  },
  {
    id: "solkadhi",
    minutes: 10,
    meals: ["lunch", "dinner"],
    needs: ["coconut", "kokum"],
    tags: ["quick", "healthy", "guests", "konkan"],
    name: { mr: "सोलकढी", en: "Solkadhi", hi: "सोलकढ़ी" },
    steps: [
      { mr: "कोकम १५ मिनिटं कोमट पाण्यात भिजवा.", en: "Soak kokum in warm water for 15 minutes.", hi: "कोकम को 15 मिनट गुनगुने पानी में भिगोएँ।" },
      { mr: "खोवलेला नारळ पाणी घालून वाटा आणि दूध गाळून घ्या.", en: "Grind grated coconut with water and strain out the milk.", hi: "कसा नारियल पानी के साथ पीसकर दूध छान लें।" },
      { mr: "नारळाच्या दुधात कोकमाचं पाणी, लसूण, मिरची, मीठ घाला.", en: "Add kokum water, crushed garlic, green chilli and salt to it.", hi: "नारियल दूध में कोकम पानी, लहसुन, मिर्च, नमक डालें।" },
      { mr: "कोथिंबीर घालून थंड करून जेवणानंतर प्या.", en: "Add coriander, chill, and serve after the meal.", hi: "धनिया डालें, ठंडा करके खाने के बाद पिएँ।" },
    ],
  },
  {
    id: "konkani_fish_curry",
    minutes: 35,
    meals: ["lunch", "dinner"],
    needs: ["fish", "coconut", "kokum", "onion"],
    tags: ["guests", "konkan"],
    name: { mr: "कोकणी माशाचं कालवण", en: "Konkani Fish Curry", hi: "कोंकणी मछली करी" },
    steps: [
      { mr: "मासे स्वच्छ धुवून हळद-मीठ लावून ठेवा.", en: "Clean the fish; rub with turmeric and salt.", hi: "मछली साफ़ धोकर हल्दी-नमक लगाकर रखें।" },
      { mr: "नारळ, कांदा, लाल मिरची, धणे एकत्र बारीक वाटा.", en: "Grind coconut, onion, red chillies and coriander seeds to a paste.", hi: "नारियल, प्याज़, लाल मिर्च, धनिया पीसकर पेस्ट बनाएँ।" },
      { mr: "वाटण पाण्यात उकळा, त्यात कोकम घाला.", en: "Boil the paste with water and add kokum.", hi: "पेस्ट को पानी में उबालें और कोकम डालें।" },
      { mr: "मासे घालून ५–७ मिनिटं मंद आचेवर शिजवा, जास्त ढवळू नका.", en: "Add fish, simmer 5–7 minutes on low; don't stir too much.", hi: "मछली डालकर 5–7 मिनट धीमी आँच पर पकाएँ, ज़्यादा न चलाएँ।" },
    ],
  },
  {
    id: "rava_fish_fry",
    minutes: 25,
    meals: ["lunch", "dinner"],
    needs: ["fish", "rava"],
    tags: ["guests", "kids", "konkan"],
    name: { mr: "रवा फिश फ्राय", en: "Rava Fish Fry", hi: "रवा फिश फ्राई" },
    steps: [
      { mr: "माशाच्या तुकड्यांना हळद, तिखट, मीठ, लिंबू लावा.", en: "Coat fish pieces with turmeric, chilli powder, salt and lemon.", hi: "मछली पर हल्दी, मिर्च, नमक, नींबू लगाएँ।" },
      { mr: "१५ मिनिटं मुरू द्या.", en: "Let it rest for 15 minutes.", hi: "15 मिनट रखें।" },
      { mr: "रव्यात घोळवून तव्यावर थोड्या तेलात दोन्ही बाजूंनी कुरकुरीत तळा.", en: "Roll in rava and shallow-fry both sides till crisp.", hi: "सूजी में लपेटकर तवे पर थोड़े तेल में दोनों ओर कुरकुरा सेकें।" },
      { mr: "मुलांसाठी काटे नसलेले मासे (सुरमई, पापलेट) निवडा.", en: "For kids, choose low-bone fish like surmai or pomfret.", hi: "बच्चों के लिए कम काँटे वाली मछली (सुरमई, पापलेट) लें।" },
    ],
  },
  {
    id: "methi_paratha",
    minutes: 40,
    meals: ["breakfast", "lunch", "dinner", "snack"],
    needs: ["wheat_flour", "methi"],
    optional: ["curd", "coriander"],
    tags: ["healthy", "kids", "budget"],
    name: { mr: "मेथीचे थेपले", en: "Methi thepla", hi: "मेथी थेपला" },
    estimate: { proteinG: 6, kcal: 210, costRs: 6, serves: 4 },
    highlights: ["iron", "vit_a", "fibre"],
    goodFor: ["family", "woman", "lactating", "girl_10_18", "child_6_10y"],
    minChildMonths: 12,
    why: { mr: "मेथीतून लोह आणि व्हिटॅमिन A मिळतं, आणि गव्हाच्या पिठातून फायबर.", en: "Methi adds iron and vitamin A, and whole wheat flour gives fibre.", hi: "मेथी से आयरन और विटामिन A मिलता है, और गेहूँ के आटे से फ़ाइबर।" },
    childNote: { mr: "1 वर्षानंतर: तिखट न घालता लहान, मऊ थेपले करा. छोटे तुकडे करून दह्यासोबत द्या.", en: "From 1 year: make small, soft theplas without chilli. Tear them into small pieces and give with curd.", hi: "1 साल के बाद: बिना मिर्च के छोटे, नरम थेपले बनाएँ। छोटे टुकड़े करके दही के साथ दें।" },
    pregnancyNote: { mr: "1 वाटी दह्यासोबत 2 थेपले खा. मेथी चिरण्याआधी नीट धुवा.", en: "Eat 2 theplas with a katori of curd. Wash the methi well before chopping.", hi: "1 कटोरी दही के साथ 2 थेपले खाएँ। मेथी काटने से पहले अच्छे से धोएँ।" },
    swaps: [
      { from: "methi", to: "palak", note: { mr: "पालक किंवा कोणतीही पालेभाजी अशीच वापरता येते.", en: "Palak or any leafy vegetable works the same way.", hi: "पालक या कोई भी हरी पत्तेदार सब्ज़ी ऐसे ही डाल सकते हैं।" } },
      { from: "methi", to: "drumstick_leaves", note: { mr: "शेवग्याची कोवळी पानंही वापरता येतात. फक्त पानं घ्या, काड्या नको.", en: "Fresh drumstick leaves can also be used. Take only the leaves, not the stems.", hi: "सहजन की ताज़ी पत्तियाँ भी डाल सकते हैं। सिर्फ़ पत्तियाँ लें, डंठल नहीं।" } },
    ],
    steps: [
      { mr: "मेथीची 1 जुडी नीट धुवून पानं बारीक चिरा.", en: "Wash 1 bunch of methi well and chop the leaves fine.", hi: "मेथी की 1 गड्डी अच्छे से धोकर पत्ते बारीक काटें।" },
      { mr: "ताटात अडीच वाट्या गव्हाचं पीठ, मेथी, अर्धा चमचा हळद, तिखट, जिरं, मीठ आणि 1 चमचा तेल एकत्र करा.", en: "In a plate, mix 2 and a half katori wheat flour, the methi, half a spoon of turmeric, chilli powder, cumin, salt and 1 spoon oil.", hi: "थाली में ढाई कटोरी गेहूँ का आटा, मेथी, आधा चम्मच हल्दी, लाल मिर्च पाउडर, जीरा, नमक और 1 चम्मच तेल मिलाएँ।" },
      { mr: "थोडं थोडं पाणी (किंवा थोडं दही) घालून मऊ पीठ मळा. 10 मिनिटं झाकून ठेवा.", en: "Add water little by little (or a little curd) and knead a soft dough. Cover and rest for 10 minutes.", hi: "थोड़ा-थोड़ा पानी (या थोड़ा दही) डालकर नरम आटा गूँधें। 10 मिनट ढककर रखें।" },
      { mr: "8 गोळे करून प्रत्येक पातळ लाटा.", en: "Make 8 balls and roll each one thin.", hi: "8 लोइयाँ बनाकर हर एक को पतला बेलें।" },
      { mr: "गरम तव्यावर दोन्ही बाजूंनी तेलाचे काही थेंब सोडून तपकिरी ठिपके येईपर्यंत भाजा.", en: "Cook on a hot tawa with a few drops of oil on both sides, until brown spots appear.", hi: "गरम तवे पर दोनों तरफ़ तेल की कुछ बूँदें डालकर भूरे चित्ते आने तक सेंकें।" },
      { mr: "दह्यासोबत वाढा. थेपले दिवसभर टिकतात, म्हणून डब्यासाठी आणि प्रवासासाठी चांगले.", en: "Serve with curd. Theplas keep well for a day, so they are good for tiffin and travel.", hi: "दही के साथ परोसें। थेपले दिन भर ठीक रहते हैं, इसलिए टिफ़िन और सफ़र के लिए अच्छे हैं।" },
    ],
  },
  {
    id: "egg_bhurji",
    minutes: 15,
    meals: ["breakfast", "dinner"],
    needs: ["egg", "onion"],
    optional: ["tomato", "coriander", "palak", "bread"],
    tags: ["quick", "kids"],
    name: { mr: "अंडा भुर्जी", en: "Egg bhurji", hi: "अंडा भुर्जी" },
    estimate: { proteinG: 13.5, kcal: 190, costRs: 18, serves: 2 },
    highlights: ["protein", "b12", "vit_a"],
    goodFor: ["family", "woman", "pregnant_t2", "pregnant_t3", "lactating", "child_1_3y", "child_3_6y", "child_6_10y", "girl_10_18"],
    minChildMonths: 12,
    why: { mr: "अंड्यांतून प्रथिनं, व्हिटॅमिन B12 आणि व्हिटॅमिन A मिळतं.", en: "Eggs give protein, vitamin B12 and vitamin A.", hi: "अंडे से प्रोटीन, विटामिन B12 और विटामिन A मिलता है।" },
    childNote: { mr: "1 वर्षानंतर: मिरची घालू नका आणि मीठ कमी घाला. अंडं पूर्ण शिजलं आहे याची खात्री करा. मऊ चपातीसोबत द्या.", en: "From 1 year: leave out the chilli and use less salt. Make sure the egg is fully cooked. Give it with soft chapati.", hi: "1 साल के बाद: मिर्च न डालें और नमक कम डालें। अंडा पूरी तरह पका हो, यह ध्यान रखें। नरम रोटी के साथ दें।" },
    pregnancyNote: { mr: "अंडं पूर्ण घट्ट आणि कोरडं होईपर्यंत शिजवा, कुठेही पातळ भाग राहू नये. कांद्यासोबत मूठभर चिरलेला पालक किंवा मेथी घाला.", en: "Cook until the egg is fully set and dry, with no runny part. Add a handful of chopped palak or methi with the onion.", hi: "अंडा पूरी तरह जमकर सूखा होने तक पकाएँ, कोई भी हिस्सा पतला न रहे। प्याज़ के साथ मुट्ठी भर कटा पालक या मेथी डालें।" },
    swaps: [
      { from: "egg", to: "soya_chunks", note: { mr: "शाकाहारी करायचं असेल तर: सोयाबीन वडी गरम पाण्यात 10 मिनिटं भिजवा, पिळून बारीक चिरा आणि अशीच भुर्जी करा.", en: "For a vegetarian version: soak soya chunks in hot water for 10 minutes, squeeze, chop fine and cook the same way.", hi: "शाकाहारी बनाना हो तो: सोया बड़ी गरम पानी में 10 मिनट भिगोएँ, निचोड़कर बारीक काटें और ऐसे ही भुर्जी बनाएँ।" } },
    ],
    steps: [
      { mr: "4 अंडी वाडग्यात फोडा. मीठ आणि चिमूटभर हळद घालून चांगली फेटा.", en: "Break 4 eggs into a bowl. Add salt and a pinch of turmeric and beat well.", hi: "4 अंडे कटोरे में तोड़ें। नमक और चुटकी भर हल्दी डालकर अच्छे से फेंटें।" },
      { mr: "2 चमचे तेल गरम करून 1 चिरलेला कांदा आणि 1 हिरवी मिरची घाला. मऊ होईपर्यंत परता.", en: "Heat 2 spoons oil. Add 1 chopped onion and 1 green chilli, and fry until soft.", hi: "2 चम्मच तेल गरम करके 1 कटा प्याज़ और 1 हरी मिर्च डालें। नरम होने तक भूनें।" },
      { mr: "चिरलेला टोमॅटो (असल्यास) घालून 2 मिनिटं परता.", en: "Add a chopped tomato (if you have) and fry for 2 minutes.", hi: "कटा टमाटर (हो तो) डालकर 2 मिनट भूनें।" },
      { mr: "फेटलेली अंडी घाला. मध्यम आचेवर 3-4 मिनिटं सतत हलवा, अंडं पूर्ण शिजेपर्यंत आणि कुठेही ओलसरपणा राहणार नाही तोपर्यंत.", en: "Pour in the eggs. Keep stirring on medium heat for 3 to 4 minutes, until the egg is fully cooked and no wet part is left.", hi: "फेंटे हुए अंडे डालें। मध्यम आँच पर 3-4 मिनट लगातार चलाएँ, जब तक अंडा पूरी तरह पक न जाए और कहीं गीलापन न रहे।" },
      { mr: "कोथिंबीर घालून चपाती किंवा पावासोबत गरम वाढा.", en: "Add coriander and serve hot with chapati or pav.", hi: "हरा धनिया डालकर रोटी या ब्रेड के साथ गरम परोसें।" },
    ],
  },
  {
    id: "phodnicha_bhaat",
    minutes: 10,
    meals: ["breakfast", "lunch"],
    needs: ["leftover_rice", "onion", "peanuts"],
    tags: ["quick", "leftover", "kids"],
    name: { mr: "फोडणीचा भात", en: "Phodnicha Bhaat (tempered leftover rice)", hi: "फोडणी वाला चावल (बचे चावल से)" },
    steps: [
      { mr: "उरलेला भात हाताने मोकळा करा.", en: "Loosen the leftover rice with your fingers.", hi: "बचे चावल को हाथ से खिला-खिला कर लें।" },
      { mr: "फोडणीत मोहरी, कढीपत्ता, शेंगदाणे, कांदा परता.", en: "Fry mustard, curry leaves, peanuts and onion.", hi: "राई, करी पत्ता, मूंगफली, प्याज़ भूनें।" },
      { mr: "हळद, मीठ घालून भात मिसळा, झाकून २ मिनिटं वाफ द्या.", en: "Add turmeric, salt and rice; cover and steam 2 minutes.", hi: "हल्दी, नमक और चावल मिलाएँ, 2 मिनट ढककर भाप दें।" },
      { mr: "लिंबू आणि कोथिंबीर घालून गरम वाढा.", en: "Finish with lemon and coriander; serve hot.", hi: "नींबू और धनिया डालकर गरम परोसें।" },
    ],
  },
  {
    id: "chapati_chivda",
    minutes: 15,
    meals: ["breakfast", "snack"],
    needs: ["leftover_chapati", "onion", "peanuts"],
    tags: ["quick", "leftover", "kids"],
    name: { mr: "पोळीचा चिवडा / कुस्करा", en: "Chapati Chivda", hi: "रोटी का चिवड़ा" },
    steps: [
      { mr: "उरलेल्या चपात्या बारीक कुस्करा किंवा मिक्सरमध्ये फिरवा.", en: "Crumble leftover chapatis by hand or pulse in a mixer.", hi: "बची रोटियाँ हाथ से मसलें या मिक्सर में दरदरा करें।" },
      { mr: "फोडणीत मोहरी, कढीपत्ता, शेंगदाणे, कांदा परता.", en: "Fry mustard, curry leaves, peanuts and onion.", hi: "राई, करी पत्ता, मूंगफली, प्याज़ भूनें।" },
      { mr: "हळद, तिखट, मीठ, चिमूटभर साखर घालून चपाती मिसळा.", en: "Add turmeric, chilli, salt, a pinch of sugar and the chapati.", hi: "हल्दी, मिर्च, नमक, चुटकी चीनी और रोटी मिलाएँ।" },
      { mr: "पाण्याचा हबका मारून २ मिनिटं वाफ द्या, लिंबू पिळा.", en: "Sprinkle a little water, steam 2 minutes, squeeze lemon.", hi: "थोड़ा पानी छिड़कें, 2 मिनट भाप दें, नींबू निचोड़ें।" },
    ],
  },
  {
    id: "poli_ladoo",
    minutes: 15,
    meals: ["snack"],
    needs: ["leftover_chapati", "peanuts", "coconut"],
    tags: ["leftover", "kids", "quick"],
    name: { mr: "पोळीचे लाडू", en: "Poli Ladoo (chapati ladoo)", hi: "रोटी के लड्डू" },
    steps: [
      { mr: "उरलेल्या चपात्यांचा मिक्सरमध्ये बारीक चुरा करा.", en: "Grind leftover chapatis to fine crumbs.", hi: "बची रोटियों को मिक्सर में बारीक पीसें।" },
      { mr: "भाजलेले शेंगदाणे आणि किसलेला गूळ जाडसर वाटा.", en: "Coarsely grind roasted peanuts with grated jaggery.", hi: "भुनी मूंगफली और कसा गुड़ दरदरा पीसें।" },
      { mr: "सगळं एकत्र करून खोबरं आणि थोडं तूप घाला.", en: "Mix everything with grated coconut and a little ghee.", hi: "सब मिलाकर नारियल और थोड़ा घी डालें।" },
      { mr: "छोटे लाडू वळा; ३ दिवसांत संपवा.", en: "Shape small ladoos; finish within 3 days.", hi: "छोटे लड्डू बाँधें; 3 दिन में खत्म करें।" },
    ],
  },
  {
    id: "moong_dal_chilla",
    minutes: 30,
    meals: ["breakfast", "snack"],
    needs: ["moong_dal", "ginger"],
    optional: ["onion", "coriander", "curd", "palak", "methi"],
    tags: ["kids", "lowOil", "healthy", "budget"],
    name: { mr: "मुगाचे धिरडे", en: "Moong dal dhirde (cheela)", hi: "मूंग दाल चीला" },
    estimate: { proteinG: 9.5, kcal: 160, costRs: 8, serves: 3 },
    highlights: ["protein"],
    goodFor: ["family", "woman", "pregnant_t2", "pregnant_t3", "child_1_3y", "child_3_6y", "child_6_10y", "girl_10_18", "elder"],
    minChildMonths: 12,
    why: { mr: "मूग डाळीतून प्रथिनं मिळतात, आणि धिरड्यांना तेल अगदी कमी लागतं.", en: "Moong dal gives protein, and dhirde need very little oil.", hi: "मूंग दाल से प्रोटीन मिलता है, और चीले में तेल बहुत कम लगता है।" },
    childNote: { mr: "1 वर्षानंतर: मिरची घालू नका. लहान, मऊ धिरडे करून छोटे तुकडे करा आणि दह्यासोबत द्या.", en: "From 1 year: leave out the chilli. Make small, soft dhirde, tear them into small pieces and give with curd.", hi: "1 साल के बाद: मिर्च न डालें। छोटे, नरम चीले बनाकर छोटे टुकड़े करें और दही के साथ दें।" },
    pregnancyNote: { mr: "पिठात मूठभर चिरलेला पालक किंवा मेथी घाला. जास्त प्रथिनं आणि कॅल्शियमसाठी सोबत 1 वाटी दही घ्या.", en: "Add a handful of chopped palak or methi to the batter. Have a katori of curd with it for more protein and calcium.", hi: "घोल में मुट्ठी भर कटा पालक या मेथी डालें। ज़्यादा प्रोटीन और कैल्शियम के लिए साथ में 1 कटोरी दही लें।" },
    swaps: [
      { from: "moong_dal", to: "moong_whole", note: { mr: "हिरवे अख्खे मूगही चालतात. रात्रभर भिजवून सालासकट वाटा.", en: "Whole green moong also works. Soak it overnight and grind it with the skin.", hi: "साबुत हरी मूंग भी चलेगी। रात भर भिगोकर छिलके समेत पीसें।" } },
      { from: "moong_dal", to: "besan", note: { mr: "भिजवायला वेळ नसेल तर बेसन पाण्यात कालवून लगेच धिरडे करा.", en: "If there is no time to soak, mix besan with water and make them at once.", hi: "भिगोने का समय न हो तो बेसन को पानी में घोलकर तुरंत चीला बनाएँ।" } },
    ],
    steps: [
      { mr: "1 वाटी मूग डाळ धुवून 3-4 तास पाण्यात भिजत ठेवा.", en: "Wash 1 katori moong dal and soak it in water for 3 to 4 hours.", hi: "1 कटोरी मूंग दाल धोकर 3-4 घंटे पानी में भिगो दें।" },
      { mr: "पाणी काढून टाका. डाळ, आल्याचा छोटा तुकडा, 1 हिरवी मिरची, जिरं आणि थोडं पाणी घालून जाडसर पीठ वाटा.", en: "Drain it. Grind the dal with a small piece of ginger, 1 green chilli, cumin and a little water to a thick batter.", hi: "पानी निकाल दें। दाल, अदरक का छोटा टुकड़ा, 1 हरी मिर्च, जीरा और थोड़ा पानी डालकर गाढ़ा घोल पीस लें।" },
      { mr: "त्यात मीठ, चिमूटभर हळद, चिरलेली कोथिंबीर आणि बारीक चिरलेला कांदा (असल्यास) घालून नीट मिसळा.", en: "Add salt, a pinch of turmeric, chopped coriander and finely chopped onion (if you have). Mix well.", hi: "इसमें नमक, चुटकी भर हल्दी, कटा हरा धनिया और बारीक कटा प्याज़ (हो तो) डालकर अच्छे से मिलाएँ।" },
      { mr: "तवा गरम करून तेलाचे काही थेंब पसरा. 1 डाव पीठ घालून पातळ गोल पसरा.", en: "Heat a tawa and spread a few drops of oil on it. Pour 1 ladle of batter and spread it into a thin round.", hi: "तवा गरम करके तेल की कुछ बूँदें फैलाएँ। 1 कलछी घोल डालकर पतला गोल फैलाएँ।" },
      { mr: "मध्यम आचेवर 2 मिनिटं भाजा. कडेने थोडं तेल सोडा, उलटून आणखी 1 मिनिट भाजा.", en: "Cook on medium heat for 2 minutes. Add a little oil around the edge, turn it over and cook 1 more minute.", hi: "मध्यम आँच पर 2 मिनट सेंकें। किनारों पर थोड़ा तेल डालें, पलटकर 1 मिनट और सेंकें।" },
      { mr: "बाकीचे धिरडे असेच करा. दही किंवा चटणीसोबत गरम वाढा.", en: "Make the rest the same way. Serve hot with curd or chutney.", hi: "बाकी चीले भी ऐसे ही बनाएँ। दही या चटनी के साथ गरम परोसें।" },
    ],
  },
  {
    id: "sabudana_khichdi",
    minutes: 20,
    meals: ["breakfast", "snack"],
    needs: ["sabudana", "peanuts", "potato"],
    tags: ["fasting"],
    name: { mr: "साबुदाणा खिचडी", en: "Sabudana Khichdi", hi: "साबूदाना खिचड़ी" },
    steps: [
      { mr: "साबुदाणा धुवून थोड्या पाण्यात रात्रभर भिजवा.", en: "Rinse sabudana and soak overnight in a little water.", hi: "साबूदाना धोकर थोड़े पानी में रात भर भिगोएँ।" },
      { mr: "त्यात दाण्याचं कूट, मीठ, साखर मिसळा.", en: "Mix in crushed roasted peanuts, salt and a little sugar.", hi: "उसमें भुनी मूंगफली का चूरा, नमक, थोड़ी चीनी मिलाएँ।" },
      { mr: "तुपात जिरं, मिरची, बटाट्याच्या फोडी परता.", en: "In ghee, fry cumin, green chilli and potato cubes.", hi: "घी में जीरा, हरी मिर्च, आलू के टुकड़े भूनें।" },
      { mr: "साबुदाणा घालून पारदर्शक होईपर्यंत मंद आचेवर परता.", en: "Add sabudana and stir on low till it turns translucent.", hi: "साबूदाना डालकर धीमी आँच पर पारदर्शी होने तक चलाएँ।" },
    ],
  },
  {
    id: "veg_pulao",
    minutes: 30,
    meals: ["lunch", "dinner"],
    needs: ["rice", "mixed_veg", "onion", "curd"],
    tags: ["guests", "kids"],
    name: { mr: "व्हेज पुलाव", en: "Vegetable Pulao", hi: "वेज पुलाव" },
    steps: [
      { mr: "तांदूळ धुवून २० मिनिटं भिजवा.", en: "Wash rice and soak for 20 minutes.", hi: "चावल धोकर 20 मिनट भिगोएँ।" },
      { mr: "तूप-तेलात खडा मसाला, कांदा आणि भाज्या परता.", en: "Fry whole spices, onion and vegetables in ghee or oil.", hi: "घी-तेल में खड़े मसाले, प्याज़ और सब्ज़ियाँ भूनें।" },
      { mr: "तांदूळ, मीठ आणि दुप्पट पाणी घालून कुकरला २ शिट्ट्या काढा.", en: "Add rice, salt and double water; pressure-cook 2 whistles.", hi: "चावल, नमक और दुगना पानी डालें, कुकर में 2 सीटी लगाएँ।" },
      { mr: "दह्याच्या रायत्याबरोबर वाढा.", en: "Serve with curd raita.", hi: "दही के रायते के साथ परोसें।" },
    ],
  },
  {
    id: "palak_dal_khichdi",
    minutes: 40,
    meals: ["lunch", "dinner"],
    needs: ["rice", "dal", "palak"],
    optional: ["onion", "garlic", "ghee", "lemon"],
    tags: ["onePot", "lowOil", "healthy"],
    name: { mr: "पालक डाळ खिचडी", en: "Palak dal khichdi", hi: "पालक दाल खिचड़ी" },
    estimate: { proteinG: 8.5, kcal: 260, costRs: 15, serves: 3 },
    highlights: ["protein", "iron", "vit_a", "folate"],
    goodFor: ["family", "woman", "pregnant_t1", "pregnant_t2", "pregnant_t3", "lactating", "child_6_12m", "child_1_3y", "child_3_6y", "girl_10_18", "elder"],
    minChildMonths: 6,
    why: { mr: "डाळीतून प्रथिनं मिळतात, आणि पालकातून लोह, व्हिटॅमिन A आणि फोलेट मिळतं.", en: "Dal gives protein, and palak adds iron, vitamin A and folate.", hi: "दाल से प्रोटीन मिलता है, और पालक से आयरन, विटामिन A और फ़ोलेट मिलता है।" },
    childNote: { mr: "6 ते 12 महिने: मीठ घालण्याआधी बाळासाठी थोडी खिचडी काढा. ती मऊ कुस्करून त्यात तुपाचे 2-3 थेंब घाला. 1 वर्षानंतर: घरची खिचडी कमी मीठ घालून, थोडी कुस्करून द्या.", en: "6 to 12 months: take out a little khichdi for the baby before adding salt. Mash it soft and add 2 to 3 drops of ghee. From 1 year: give the family khichdi with less salt, lightly mashed.", hi: "6 से 12 महीने: नमक डालने से पहले बच्चे के लिए थोड़ी खिचड़ी निकाल लें। उसे अच्छे से मसलकर घी की 2-3 बूँदें डालें। 1 साल के बाद: घर की खिचड़ी कम नमक के साथ, थोड़ी मसलकर दें।" },
    pregnancyNote: { mr: "जास्त प्रथिनांसाठी सोबत 1 वाटी वरण किंवा दही घ्या. वरून लिंबू पिळा, किंवा जेवणानंतर पेरू किंवा आवळा खा: व्हिटॅमिन C मुळे शरीराला लोह नीट मिळतं.", en: "Have 1 extra katori of dal or curd with it for more protein. Squeeze lemon on top, or eat a guava or amla after the meal: vitamin C helps the body take in iron.", hi: "ज़्यादा प्रोटीन के लिए साथ में 1 कटोरी दाल या दही लें। ऊपर से नींबू निचोड़ें, या खाने के बाद अमरूद या आंवला खाएँ: विटामिन C से शरीर को आयरन अच्छे से मिलता है।" },
    swaps: [
      { from: "palak", to: "lal_math", note: { mr: "लाल माठही असाच वापरता येतो, त्यात लोह आणखी जास्त असतं.", en: "Lal math (red amaranth) works the same way and has even more iron.", hi: "लाल चौलाई भी ऐसे ही डाल सकते हैं, उसमें आयरन और भी ज़्यादा होता है।" } },
      { from: "palak", to: "methi", note: { mr: "मेथीही चालते. ती थोडी कडू असते, म्हणून थोडी कमी घ्या.", en: "Methi also works. It is a little bitter, so use a little less.", hi: "मेथी भी चलेगी। वह थोड़ी कड़वी होती है, इसलिए थोड़ी कम डालें।" } },
      { from: "rice", to: "dalia", note: { mr: "तांदळाऐवजी दलिया वापरता येतो. पाणी 1 वाटी जास्त घाला.", en: "Dalia can replace rice. Add 1 more katori of water.", hi: "चावल की जगह दलिया ले सकते हैं। पानी 1 कटोरी ज़्यादा डालें।" } },
    ],
    steps: [
      { mr: "1 वाटी तांदूळ आणि अर्धी वाटी डाळ एकत्र धुवा. 15 मिनिटं भिजत ठेवा.", en: "Wash 1 katori rice and half a katori dal together. Soak for 15 minutes.", hi: "1 कटोरी चावल और आधी कटोरी दाल एक साथ धोएँ। 15 मिनट भिगोकर रखें।" },
      { mr: "पालकाची 1 मोठी जुडी 2-3 वेळा पाण्यात नीट धुवा आणि बारीक चिरा.", en: "Wash 1 big bunch of palak well in 2 to 3 changes of water. Chop it fine.", hi: "पालक की 1 बड़ी गड्डी को 2-3 बार पानी में अच्छे से धोएँ और बारीक काटें।" },
      { mr: "कुकरमध्ये 1 चमचा तेल गरम करा. जिरं, चिमूटभर हिंग, ठेचलेला लसूण आणि चिरलेला कांदा (असल्यास) घालून 2 मिनिटं परता.", en: "Heat 1 spoon oil in a pressure cooker. Add cumin, a pinch of hing, crushed garlic and a chopped onion (if you have). Fry for 2 minutes.", hi: "कुकर में 1 चम्मच तेल गरम करें। जीरा, चुटकी भर हींग, कुचला लहसुन और कटा प्याज़ (हो तो) डालकर 2 मिनट भूनें।" },
      { mr: "पालक आणि अर्धा चमचा हळद घालून 1 मिनिट हलवा.", en: "Add the palak and half a spoon of turmeric. Stir for 1 minute.", hi: "पालक और आधा चम्मच हल्दी डालकर 1 मिनट चलाएँ।" },
      { mr: "तांदूळ, डाळ आणि 5 वाट्या पाणी घाला. 3-4 शिट्ट्या होऊ द्या.", en: "Add the rice, dal and 5 katori water. Cook for 3 to 4 whistles.", hi: "चावल, दाल और 5 कटोरी पानी डालें। 3-4 सीटी आने दें।" },
      { mr: "कुकर थंड झाल्यावर मीठ घालून नीट हलवा. वरून 1 चमचा तूप घाला आणि लिंबू पिळून गरम वाढा.", en: "When the pressure drops, add salt and mix well. Add 1 spoon ghee and a squeeze of lemon, and serve hot.", hi: "कुकर ठंडा होने पर नमक डालकर अच्छे से मिलाएँ। ऊपर से 1 चम्मच घी डालें और नींबू निचोड़कर गरम परोसें।" },
    ],
  },
  {
    id: "nachni_satva",
    minutes: 15,
    meals: ["breakfast", "snack"],
    needs: ["ragi", "milk", "jaggery"],
    optional: ["banana"],
    tags: ["quick", "budget", "lowOil", "healthy", "kids"],
    name: { mr: "नाचणी सत्त्व", en: "Nachni satva (ragi porridge)", hi: "नाचनी सत्व (रागी)" },
    estimate: { proteinG: 6.5, kcal: 210, costRs: 12, serves: 2 },
    highlights: ["calcium", "protein"],
    goodFor: ["child_6_12m", "child_1_3y", "child_3_6y", "pregnant_t2", "pregnant_t3", "lactating", "girl_10_18", "elder"],
    minChildMonths: 6,
    why: { mr: "नाचणी आणि दुधातून कॅल्शियम आणि प्रथिनं मिळतात.", en: "Nachni and milk give calcium and protein.", hi: "रागी और दूध से कैल्शियम और प्रोटीन मिलता है।" },
    childNote: { mr: "6 ते 12 महिने: पीठ फक्त पाण्यात शिजवा. दूध, गूळ किंवा साखर घालू नका. सत्त्व चमच्यावर टिकेल इतकं घट्ट करा. गोडीसाठी थोडं पिकलेलं केळं कुस्करून घालू शकता. 1 वर्षानंतर दुधात करू शकता.", en: "6 to 12 months: cook the flour in water only, with no milk, jaggery or sugar. Make it thick enough to stay on the spoon. You can mash in a little ripe banana for sweetness. From 1 year you can make it with milk.", hi: "6 से 12 महीने: आटा सिर्फ़ पानी में पकाएँ। दूध, गुड़ या चीनी न डालें। सत्व इतना गाढ़ा बनाएँ कि चम्मच पर टिका रहे। मिठास के लिए थोड़ा पका केला मसलकर डाल सकती हैं। 1 साल के बाद दूध में बना सकती हैं।" },
    pregnancyNote: { mr: "दुधात केलेलं 1 ग्लास सत्त्व रोज घेतल्यास कॅल्शियम मिळतं. तुमची शुगर जास्त आहे असं डॉक्टरांनी सांगितलं असेल तर गूळ घालू नका.", en: "A glass a day, made with milk, gives calcium. If the doctor has said your sugar is high, leave out the jaggery.", hi: "दूध में बना 1 गिलास सत्व रोज़ लेने से कैल्शियम मिलता है। अगर डॉक्टर ने आपकी शुगर ज़्यादा बताई है तो गुड़ न डालें।" },
    swaps: [
      { from: "jaggery", to: "banana", note: { mr: "गुळाऐवजी पिकलेलं केळं कुस्करून गोडी आणता येते.", en: "A mashed ripe banana can sweeten it instead of jaggery.", hi: "गुड़ की जगह पका केला मसलकर मिठास ला सकते हैं।" } },
    ],
    steps: [
      { mr: "4 मोठे चमचे नाचणीचं पीठ अर्धा ग्लास पाण्यात गुठळ्या न होता कालवा.", en: "Mix 4 big spoons of nachni flour into half a glass of water with no lumps.", hi: "4 बड़े चम्मच रागी का आटा आधे गिलास पानी में बिना गुठली के घोलें।" },
      { mr: "पातेल्यात दीड ग्लास दूध गरम करा. कोमट झाल्यावर नाचणीचं पाणी सतत हलवत ओता.", en: "Heat 1 and a half glass of milk in a pan. When it is warm, pour in the nachni water, stirring all the time.", hi: "पतीले में डेढ़ गिलास दूध गरम करें। गुनगुना होने पर रागी का घोल लगातार चलाते हुए डालें।" },
      { mr: "मंद आचेवर 5-7 मिनिटं हलवत शिजवा. घट्टसर होऊन कच्चा वास गेला की झालं.", en: "Cook on low heat for 5 to 7 minutes, stirring, until it thickens and no longer smells raw.", hi: "धीमी आँच पर 5-7 मिनट चलाते हुए पकाएँ। गाढ़ा होकर कच्ची महक चली जाए तो तैयार है।" },
      { mr: "आचेवरून उतरवून 2 मिनिटं थांबा. मग 2 मोठे चमचे किसलेला गूळ आणि चिमूटभर वेलची पूड (असल्यास) घालून हलवा.", en: "Take it off the heat and wait 2 minutes. Then stir in 2 big spoons of grated jaggery and a pinch of cardamom powder (if you have).", hi: "आँच से उतारकर 2 मिनट रुकें। फिर 2 बड़े चम्मच कद्दूकस किया गुड़ और चुटकी भर इलायची पाउडर (हो तो) डालकर मिलाएँ।" },
      { mr: "कोमट असतानाच प्यायला द्या.", en: "Serve it warm.", hi: "गुनगुना ही पीने को दें।" },
    ],
  },
  {
    id: "matki_usal",
    minutes: 30,
    meals: ["lunch", "dinner"],
    needs: ["matki", "onion"],
    optional: ["tomato", "garlic", "goda_masala", "curry_leaves", "lemon", "coriander", "coconut"],
    tags: ["budget", "healthy"],
    name: { mr: "मटकीची उसळ", en: "Matki usal (sprouted moth beans)", hi: "मटकी की उसल" },
    estimate: { proteinG: 9, kcal: 190, costRs: 10, serves: 4 },
    highlights: ["protein", "iron", "fibre", "folate"],
    goodFor: ["family", "woman", "pregnant_t1", "pregnant_t2", "pregnant_t3", "lactating", "girl_10_18"],
    minChildMonths: 12,
    why: { mr: "मोड आलेल्या मटकीतून प्रथिनं, लोह, फायबर आणि फोलेट मिळतं.", en: "Sprouted matki gives protein, iron, fibre and folate.", hi: "अंकुरित मटकी से प्रोटीन, आयरन, फ़ाइबर और फ़ोलेट मिलता है।" },
    childNote: { mr: "1 वर्षानंतर: तिखट अगदी कमी घाला. मटकी खूप मऊ शिजवून थोडी कुस्करा आणि मऊ चपातीसोबत द्या.", en: "From 1 year: use very little chilli. Cook the matki very soft, mash it lightly and give it with soft chapati.", hi: "1 साल के बाद: मिर्च बहुत कम डालें। मटकी बहुत नरम पकाकर हल्का मसलें और नरम रोटी के साथ दें।" },
    pregnancyNote: { mr: "भाकरीसोबत 1 पूर्ण वाटी उसळ खा. लोह नीट मिळावं म्हणून वरून लिंबू पिळा. मोड नीट शिजवून खा.", en: "Eat a full katori with bhakri. Squeeze lemon on top to help the body take in iron. Cook the sprouts well.", hi: "भाकरी के साथ 1 पूरी कटोरी उसल खाएँ। आयरन अच्छे से मिले, इसलिए ऊपर से नींबू निचोड़ें। अंकुरित दाने अच्छे से पकाकर खाएँ।" },
    swaps: [
      { from: "matki", to: "moong_whole", note: { mr: "मोड आलेले मूगही असेच वापरता येतात.", en: "Sprouted whole moong can be used the same way.", hi: "अंकुरित साबुत मूंग भी ऐसे ही इस्तेमाल कर सकते हैं।" } },
      { from: "matki", to: "chawli", note: { mr: "चवळीही चालते. रात्रभर भिजवा, मोड आणायची गरज नाही.", en: "Chawli also works. Soak it overnight; it does not need to sprout.", hi: "लोबिया भी चलेगा। रात भर भिगोएँ, अंकुरित करने की ज़रूरत नहीं।" } },
    ],
    steps: [
      { mr: "दीड वाटी मटकी 8 तास भिजवा. पाणी काढून ओल्या कपड्यात बांधा आणि 1 दिवस मोड येऊ द्या.", en: "Soak 1 and a half katori matki for 8 hours. Drain, tie it in a wet cloth and leave for 1 day to sprout.", hi: "डेढ़ कटोरी मटकी 8 घंटे भिगोएँ। पानी निकालकर गीले कपड़े में बाँधें और 1 दिन अंकुर आने दें।" },
      { mr: "1 मोठा चमचा तेल गरम करून मोहरी, हिंग, कढीपत्ता आणि ठेचलेला लसूण घाला. 1 चिरलेला कांदा घालून मऊ होईपर्यंत परता.", en: "Heat 1 big spoon oil. Add mustard seeds, hing, curry leaves and crushed garlic. Add 1 chopped onion and fry until soft.", hi: "1 बड़ा चम्मच तेल गरम करके राई, हींग, करी पत्ता और कुचला लहसुन डालें। 1 कटा प्याज़ डालकर नरम होने तक भूनें।" },
      { mr: "हळद, तिखट, 1 चमचा गोडा मसाला आणि चिरलेला टोमॅटो (असल्यास) घालून 2 मिनिटं परता.", en: "Add turmeric, chilli powder, 1 spoon goda masala and a chopped tomato (if you have). Fry for 2 minutes.", hi: "हल्दी, लाल मिर्च पाउडर, 1 चम्मच गोडा मसाला और कटा टमाटर (हो तो) डालकर 2 मिनट भूनें।" },
      { mr: "मोड आलेली मटकी, मीठ आणि 1 वाटी पाणी घाला. झाकण ठेवून मंद आचेवर 10-12 मिनिटं मऊ होईपर्यंत शिजवा.", en: "Add the sprouts, salt and 1 katori water. Cover and cook on low heat for 10 to 12 minutes, until soft.", hi: "अंकुरित मटकी, नमक और 1 कटोरी पानी डालें। ढककर धीमी आँच पर 10-12 मिनट नरम होने तक पकाएँ।" },
      { mr: "वरून लिंबू आणि कोथिंबीर घालून भाकरी किंवा चपातीसोबत वाढा.", en: "Add lemon juice and coriander on top, and serve with bhakri or chapati.", hi: "ऊपर से नींबू और हरा धनिया डालकर भाकरी या रोटी के साथ परोसें।" },
    ],
  },
  {
    id: "chana_usal",
    minutes: 40,
    meals: ["lunch", "dinner"],
    needs: ["kala_chana", "onion"],
    optional: ["tomato", "ginger", "garlic", "goda_masala", "garam_masala", "lemon", "coriander"],
    tags: ["budget", "healthy"],
    name: { mr: "काळ्या चण्याची उसळ", en: "Kala chana usal", hi: "काले चने की उसल" },
    estimate: { proteinG: 8.5, kcal: 180, costRs: 8, serves: 4 },
    highlights: ["protein", "fibre", "iron", "folate"],
    goodFor: ["family", "woman", "pregnant_t2", "pregnant_t3", "lactating", "girl_10_18", "child_6_10y"],
    minChildMonths: 24,
    why: { mr: "काळ्या चण्यांतून प्रथिनं, फायबर, लोह आणि फोलेट मिळतं.", en: "Kala chana gives protein, fibre, iron and folate.", hi: "काले चने से प्रोटीन, फ़ाइबर, आयरन और फ़ोलेट मिलता है।" },
    childNote: { mr: "2 वर्षांनंतर: चणे खूप मऊ शिजवून थोडे कुस्करा. तिखट अगदी कमी घाला.", en: "From 2 years: cook the chana very soft and mash it lightly. Use very little chilli.", hi: "2 साल के बाद: चने बहुत नरम पकाकर हल्का मसलें। मिर्च बहुत कम डालें।" },
    pregnancyNote: { mr: "भाकरी किंवा चपातीसोबत 1 वाटी उसळ खा. लोह नीट मिळावं म्हणून वरून लिंबू पिळा. चणे खूप मऊ शिजवा.", en: "Eat 1 katori with bhakri or chapati. Squeeze lemon on top to help the body take in iron. Cook the chana very soft.", hi: "भाकरी या रोटी के साथ 1 कटोरी उसल खाएँ। आयरन अच्छे से मिले, इसलिए ऊपर से नींबू निचोड़ें। चने बहुत नरम पकाएँ।" },
    swaps: [
      { from: "kala_chana", to: "chawli", note: { mr: "चवळीही चालते, आणि ती लवकर शिजते.", en: "Chawli also works, and it cooks faster.", hi: "लोबिया भी चलेगा, और वह जल्दी पकता है।" } },
      { from: "kala_chana", to: "matki", note: { mr: "मोड आलेली मटकीही अशीच वापरता येते.", en: "Sprouted matki can be used the same way.", hi: "अंकुरित मटकी भी ऐसे ही इस्तेमाल कर सकते हैं।" } },
    ],
    steps: [
      { mr: "दीड वाटी काळे चणे भरपूर पाण्यात रात्रभर भिजवा.", en: "Soak 1 and a half katori kala chana overnight in plenty of water.", hi: "डेढ़ कटोरी काले चने भरपूर पानी में रात भर भिगोएँ।" },
      { mr: "पाणी काढून नवं पाणी आणि मीठ घाला. कुकरमध्ये 5-6 शिट्ट्या होईपर्यंत मऊ शिजवा.", en: "Drain, add fresh water and salt, and pressure cook for 5 to 6 whistles until soft.", hi: "पानी निकालकर नया पानी और नमक डालें। कुकर में 5-6 सीटी आने तक नरम पकाएँ।" },
      { mr: "1 मोठा चमचा तेल गरम करून मोहरी, हिंग आणि ठेचलेलं आलं-लसूण घाला. 1 चिरलेला कांदा घालून गुलाबी होईपर्यंत परता.", en: "Heat 1 big spoon oil. Add mustard seeds, hing and crushed ginger and garlic. Add 1 chopped onion and fry until golden.", hi: "1 बड़ा चम्मच तेल गरम करके राई, हींग और कुचला अदरक-लहसुन डालें। 1 कटा प्याज़ डालकर सुनहरा होने तक भूनें।" },
      { mr: "हळद, तिखट, 1 चमचा गोडा मसाला किंवा गरम मसाला आणि चिरलेला टोमॅटो (असल्यास) घालून 2 मिनिटं परता.", en: "Add turmeric, chilli powder, 1 spoon goda masala or garam masala and a chopped tomato (if you have). Fry for 2 minutes.", hi: "हल्दी, लाल मिर्च पाउडर, 1 चम्मच गोडा मसाला या गरम मसाला और कटा टमाटर (हो तो) डालकर 2 मिनट भूनें।" },
      { mr: "शिजलेले चणे थोड्या पाण्यासकट घाला. 5 मिनिटं उकळू द्या.", en: "Add the cooked chana with a little of its water. Let it boil for 5 minutes.", hi: "पके चने थोड़े पानी के साथ डालें। 5 मिनट उबलने दें।" },
      { mr: "लिंबू पिळून, कोथिंबीर घालून भाकरी किंवा चपातीसोबत वाढा.", en: "Squeeze lemon, add coriander and serve with bhakri or chapati.", hi: "नींबू निचोड़कर, हरा धनिया डालकर भाकरी या रोटी के साथ परोसें।" },
    ],
  },
  {
    id: "anda_curry",
    minutes: 30,
    meals: ["lunch", "dinner"],
    needs: ["egg", "onion", "tomato"],
    optional: ["ginger", "garlic", "goda_masala", "garam_masala", "coriander"],
    tags: ["budget", "guests"],
    name: { mr: "अंडा करी", en: "Anda curry (egg curry)", hi: "अंडा करी" },
    estimate: { proteinG: 7, kcal: 120, costRs: 10, serves: 4 },
    highlights: ["protein", "b12"],
    goodFor: ["family", "woman", "pregnant_t2", "pregnant_t3", "lactating", "girl_10_18"],
    minChildMonths: 12,
    why: { mr: "अंड्यांतून प्रथिनं आणि व्हिटॅमिन B12 मिळतं.", en: "Eggs give protein and vitamin B12.", hi: "अंडे से प्रोटीन और विटामिन B12 मिलता है।" },
    childNote: { mr: "1 वर्षानंतर: मुलासाठी करताना तिखट अगदी कमी घाला. उकडलेलं अंडं भातात थोड्या रश्शासोबत कुस्करून द्या.", en: "From 1 year: use very little chilli when cooking for a child. Mash the boiled egg with rice and a little gravy.", hi: "1 साल के बाद: बच्चे के लिए बनाते समय मिर्च बहुत कम डालें। उबले अंडे को चावल और थोड़ी ग्रेवी के साथ मसलकर दें।" },
    pregnancyNote: { mr: "अंडी किमान 10 मिनिटं उकडा, म्हणजे बलक पूर्ण घट्ट होईल. सोबत पालेभाजी किंवा कोशिंबीर खा.", en: "Boil the eggs for at least 10 minutes so the yolk is firm. Eat with a green vegetable or salad.", hi: "अंडे कम से कम 10 मिनट उबालें, ताकि ज़र्दी पूरी तरह सख़्त हो जाए। साथ में हरी सब्ज़ी या सलाद खाएँ।" },
    swaps: [
      { from: "egg", to: "kala_chana", note: { mr: "शाकाहारी दिवशी उकडलेले काळे चणे याच रश्शात शिजवा.", en: "On a vegetarian day, cook boiled kala chana in the same gravy.", hi: "शाकाहारी दिन पर उबले काले चने इसी ग्रेवी में पकाएँ।" } },
      { from: "tomato", to: "kokum", note: { mr: "टोमॅटो महाग असतील तर आंबटपणासाठी 2-3 आमसुलं घाला.", en: "If tomatoes are costly, 2 to 3 kokum pieces give the sour taste.", hi: "टमाटर महँगे हों तो खटास के लिए 2-3 कोकम डालें।" } },
    ],
    steps: [
      { mr: "4 अंडी 10-12 मिनिटं उकडा. पाण्यात थंड करून सोला आणि प्रत्येकावर 2-3 छोट्या चिरा द्या.", en: "Boil 4 eggs for 10 to 12 minutes. Cool them in water, peel, and make 2 to 3 small cuts on each.", hi: "4 अंडे 10-12 मिनट उबालें। पानी में ठंडा करके छीलें और हर अंडे पर 2-3 छोटे चीरे लगाएँ।" },
      { mr: "1 मोठा चमचा तेल गरम करून 2 चिरलेले कांदे गुलाबी होईपर्यंत परता.", en: "Heat 1 big spoon oil and fry 2 chopped onions until golden.", hi: "1 बड़ा चम्मच तेल गरम करके 2 कटे प्याज़ सुनहरे होने तक भूनें।" },
      { mr: "1 चमचा ठेचलेलं आलं-लसूण आणि 2 चिरलेले टोमॅटो घालून मऊ होईपर्यंत शिजवा.", en: "Add 1 spoon crushed ginger and garlic and 2 chopped tomatoes. Cook until soft.", hi: "1 चम्मच कुचला अदरक-लहसुन और 2 कटे टमाटर डालकर नरम होने तक पकाएँ।" },
      { mr: "हळद, तिखट, 1 चमचा गोडा मसाला किंवा गरम मसाला आणि मीठ घालून 2 मिनिटं परता.", en: "Add turmeric, chilli powder, 1 spoon goda masala or garam masala, and salt. Fry for 2 minutes.", hi: "हल्दी, लाल मिर्च पाउडर, 1 चम्मच गोडा मसाला या गरम मसाला और नमक डालकर 2 मिनट भूनें।" },
      { mr: "दीड वाटी पाणी घालून उकळी आणा. अंडी घालून मंद आचेवर 5 मिनिटं शिजवा.", en: "Add 1 and a half katori water and bring to a boil. Add the eggs and simmer for 5 minutes.", hi: "डेढ़ कटोरी पानी डालकर उबाल आने दें। अंडे डालकर धीमी आँच पर 5 मिनट पकाएँ।" },
      { mr: "कोथिंबीर घालून भात किंवा चपातीसोबत वाढा.", en: "Add coriander and serve with rice or chapati.", hi: "हरा धनिया डालकर चावल या रोटी के साथ परोसें।" },
    ],
  },
  {
    id: "bangda_curry",
    minutes: 35,
    meals: ["lunch", "dinner"],
    needs: ["bangda", "coconut"],
    optional: ["kokum", "tamarind", "onion", "garlic"],
    tags: ["konkan", "guests", "healthy"],
    name: { mr: "बांगड्याचं कालवण", en: "Bangda curry (Konkani mackerel curry)", hi: "बांगड़ा करी (कोंकणी मछली करी)" },
    estimate: { proteinG: 17, kcal: 200, costRs: 30, serves: 4 },
    highlights: ["protein", "b12", "healthy_fat"],
    goodFor: ["family", "woman", "pregnant_t2", "pregnant_t3", "lactating", "girl_10_18"],
    minChildMonths: 24,
    why: { mr: "बांगड्यातून प्रथिनं, व्हिटॅमिन B12 आणि ओमेगा-3 फॅट्स मिळतात.", en: "Bangda gives protein, vitamin B12 and omega-3 fats.", hi: "बांगड़ा से प्रोटीन, विटामिन B12 और ओमेगा-3 फ़ैट मिलते हैं।" },
    childNote: { mr: "2 वर्षांनंतर: सगळे काटे काळजीपूर्वक काढा. मासा भातात थोड्या रश्शासोबत कुस्करून द्या. मुलासाठी करताना तिखट कमी घाला.", en: "From 2 years: take out every bone carefully. Mash the fish with rice and a little gravy. Use less chilli when cooking for a child.", hi: "2 साल के बाद: सारे काँटे ध्यान से निकालें। मछली को चावल और थोड़ी ग्रेवी के साथ मसलकर दें। बच्चे के लिए बनाते समय मिर्च कम डालें।" },
    pregnancyNote: { mr: "मासा पूर्ण शिजवा: आतून पांढरा आणि काट्यापासून सहज सुटणारा हवा. पित्त होत असेल तर तिखट कमी घाला.", en: "Cook the fish fully: it should be white inside and come off the bone easily. Use less chilli if you get acidity.", hi: "मछली पूरी तरह पकाएँ: अंदर से सफ़ेद हो और काँटे से आसानी से अलग हो। एसिडिटी होती हो तो मिर्च कम डालें।" },
    swaps: [
      { from: "bangda", to: "bombil", note: { mr: "बोंबलाचं कालवणही असंच करतात. बोंबील मऊ असतात आणि लवकर शिजतात, म्हणून आतून पांढरे होईपर्यंतच शिजवा.", en: "Bombil curry is made the same way. Bombil is soft and cooks fast, so cook it only until it is white inside.", hi: "बोंबिल की करी भी ऐसे ही बनती है। बोंबिल नरम होती है और जल्दी पकती है, इसलिए अंदर से सफ़ेद होने तक ही पकाएँ।" } },
      { from: "kokum", to: "tamarind", note: { mr: "आमसुलाऐवजी थोडी चिंच घालूनही आंबटपणा येतो.", en: "A little tamarind can give the sour taste instead of kokum.", hi: "कोकम की जगह थोड़ी इमली से भी खटास आती है।" } },
      { from: "bangda", to: "dried_fish", note: { mr: "पावसाळ्यात सुकी मासळी वापरतात. ती भिजवून नीट धुवा आणि मीठ अगदी कमी घाला, कारण ती बहुतेक वेळा आधीच खारट असते.", en: "In the monsoon, dried fish is often used. Soak and wash it well, and add very little salt, as it is often already salty.", hi: "बारिश में सूखी मछली इस्तेमाल होती है। उसे भिगोकर अच्छे से धोएँ और नमक बहुत कम डालें, क्योंकि वह अक्सर पहले से नमकीन होती है।" } },
    ],
    steps: [
      { mr: "4 मध्यम बांगडे साफ करून प्रत्येकाचे 2-3 तुकडे करा आणि नीट धुवा. मीठ आणि हळद लावून 10 मिनिटं ठेवा.", en: "Clean 4 medium bangda, cut each into 2 to 3 pieces and wash well. Rub with salt and turmeric and keep for 10 minutes.", hi: "4 मध्यम बांगड़ा साफ़ करके हर एक के 2-3 टुकड़े करें और अच्छे से धोएँ। नमक और हल्दी लगाकर 10 मिनट रखें।" },
      { mr: "अर्ध्या नारळाचं खोबरं, 1-2 चमचे तिखट, 4-5 लसूण पाकळ्या आणि थोडं पाणी घालून बारीक वाटण करा.", en: "Grind half a coconut (grated) with 1 to 2 spoons chilli powder, 4 to 5 garlic cloves and a little water into a smooth paste.", hi: "आधे नारियल का कसा हुआ खोपरा, 1-2 चम्मच लाल मिर्च पाउडर, 4-5 लहसुन की कलियाँ और थोड़ा पानी डालकर बारीक मसाला पीसें।" },
      { mr: "2 चमचे तेल गरम करून चिरलेला कांदा (असल्यास) मऊ होईपर्यंत परता. वाटण घालून 3-4 मिनिटं परता.", en: "Heat 2 spoons oil and fry a chopped onion (if you have) until soft. Add the paste and fry for 3 to 4 minutes.", hi: "2 चम्मच तेल गरम करके कटा प्याज़ (हो तो) नरम होने तक भूनें। मसाला डालकर 3-4 मिनट भूनें।" },
      { mr: "2 वाट्या पाणी, मीठ आणि 4-5 आमसुलं किंवा थोडी चिंच घालून उकळी आणा.", en: "Add 2 katori water, salt, and 4 to 5 kokum pieces or a little tamarind. Bring to a boil.", hi: "2 कटोरी पानी, नमक और 4-5 कोकम या थोड़ी इमली डालकर उबाल आने दें।" },
      { mr: "माशाचे तुकडे घाला. मध्यम आचेवर 8-10 मिनिटं शिजवा, मासा आतून पांढरा होऊन काट्यापासून सहज सुटेपर्यंत. जोरात हलवू नका, नाहीतर मासा तुटतो.", en: "Add the fish. Cook on medium heat for 8 to 10 minutes, until the fish is white inside and comes off the bone easily. Do not stir hard, or the fish will break.", hi: "मछली के टुकड़े डालें। मध्यम आँच पर 8-10 मिनट पकाएँ, जब तक मछली अंदर से सफ़ेद होकर काँटे से आसानी से अलग न होने लगे। ज़ोर से न चलाएँ, वरना मछली टूट जाएगी।" },
      { mr: "भात किंवा भाकरीसोबत गरम वाढा.", en: "Serve hot with rice or bhakri.", hi: "चावल या भाकरी के साथ गरम परोसें।" },
    ],
  },
  {
    id: "dalia_khichdi",
    minutes: 30,
    meals: ["lunch", "dinner"],
    needs: ["dalia", "dal"],
    optional: ["carrot", "peas", "dudhi", "ghee", "curd"],
    tags: ["onePot", "budget", "lowOil", "healthy"],
    name: { mr: "दलिया खिचडी", en: "Dalia khichdi", hi: "दलिया खिचड़ी" },
    estimate: { proteinG: 8, kcal: 220, costRs: 8, serves: 3 },
    highlights: ["protein", "fibre"],
    goodFor: ["family", "woman", "pregnant_t1", "child_6_12m", "child_1_3y", "child_3_6y", "elder"],
    minChildMonths: 6,
    why: { mr: "दलिया आणि डाळीतून प्रथिनं आणि फायबर मिळतं.", en: "Dalia and dal give protein and fibre.", hi: "दलिया और दाल से प्रोटीन और फ़ाइबर मिलता है।" },
    childNote: { mr: "6 ते 12 महिने: मीठ घालण्याआधी बाळासाठी थोडी खिचडी काढा. मऊ कुस्करून तुपाचे 2-3 थेंब घाला.", en: "6 to 12 months: take out a little khichdi for the baby before adding salt. Mash it soft and add 2 to 3 drops of ghee.", hi: "6 से 12 महीने: नमक डालने से पहले बच्चे के लिए थोड़ी खिचड़ी निकाल लें। अच्छे से मसलकर घी की 2-3 बूँदें डालें।" },
    pregnancyNote: { mr: "1 वाटी चिरलेल्या भाज्या आणि मूठभर पालक घाला. सोबत 1 वाटी दही घ्या.", en: "Add a katori of chopped vegetables and a handful of palak. Have a katori of curd with it.", hi: "1 कटोरी कटी सब्ज़ियाँ और मुट्ठी भर पालक डालें। साथ में 1 कटोरी दही लें।" },
    swaps: [
      { from: "dal", to: "masoor_dal", note: { mr: "मसूर डाळही चालते, ती लवकर शिजते.", en: "Masoor dal also works and cooks fast.", hi: "मसूर दाल भी चलेगी, वह जल्दी पकती है।" } },
      { from: "dalia", to: "rice", note: { mr: "दलिया नसेल तर तांदूळ वापरा. पाणी 1 वाटी कमी घ्या.", en: "If you have no dalia, use rice. Use 1 katori less water.", hi: "दलिया न हो तो चावल लें। पानी 1 कटोरी कम डालें।" } },
    ],
    steps: [
      { mr: "1 वाटी दलिया आणि अर्धी वाटी मूग डाळ (किंवा कोणतीही डाळ) धुवा.", en: "Wash 1 katori dalia and half a katori moong dal (or any dal).", hi: "1 कटोरी दलिया और आधी कटोरी मूंग दाल (या कोई भी दाल) धोएँ।" },
      { mr: "कुकरमध्ये 1 चमचा तेल गरम करून जिरं आणि चिमूटभर हिंग घाला.", en: "Heat 1 spoon oil in a pressure cooker. Add cumin and a pinch of hing.", hi: "कुकर में 1 चम्मच तेल गरम करके जीरा और चुटकी भर हींग डालें।" },
      { mr: "घरात असतील त्या भाज्या (गाजर, मटार, दुधी) चिरून घाला आणि 2 मिनिटं परता.", en: "Add any chopped vegetables you have, like carrot, peas or dudhi. Fry for 2 minutes.", hi: "घर में जो सब्ज़ियाँ हों (गाजर, मटर, लौकी) काटकर डालें और 2 मिनट भूनें।" },
      { mr: "दलिया, डाळ, अर्धा चमचा हळद आणि 5 वाट्या पाणी घाला.", en: "Add the dalia, dal, half a spoon of turmeric and 5 katori water.", hi: "दलिया, दाल, आधा चम्मच हल्दी और 5 कटोरी पानी डालें।" },
      { mr: "4-5 शिट्ट्या होऊ द्या. खिचडी खूप मऊ शिजली पाहिजे.", en: "Cook for 4 to 5 whistles. The khichdi should be very soft.", hi: "4-5 सीटी आने दें। खिचड़ी बहुत नरम पकनी चाहिए।" },
      { mr: "मीठ घालून नीट हलवा. वरून 1 चमचा तूप घालून दह्यासोबत गरम वाढा.", en: "Add salt and mix well. Add 1 spoon ghee on top and serve hot with curd.", hi: "नमक डालकर अच्छे से मिलाएँ। ऊपर से 1 चम्मच घी डालकर दही के साथ गरम परोसें।" },
    ],
  },
  {
    id: "shevga_amti",
    minutes: 35,
    meals: ["lunch", "dinner"],
    needs: ["dal", "drumstick"],
    optional: ["kokum", "tamarind", "jaggery", "goda_masala", "curry_leaves", "coriander"],
    tags: ["budget", "lowOil", "healthy"],
    name: { mr: "शेवग्याच्या शेंगांची आमटी", en: "Shevga amti (drumstick dal)", hi: "सहजन की दाल (शेवगा आमटी)" },
    estimate: { proteinG: 6.5, kcal: 130, costRs: 9, serves: 4 },
    highlights: ["protein"],
    goodFor: ["family", "woman", "pregnant_t2", "pregnant_t3", "lactating", "elder"],
    minChildMonths: 12,
    why: { mr: "डाळीतून प्रथिनं मिळतात, आणि शेवग्याच्या शेंगांमुळे आमटीला छान चव येते.", en: "Dal gives protein, and drumstick gives the amti a good taste.", hi: "दाल से प्रोटीन मिलता है, और सहजन से दाल का स्वाद अच्छा होता है।" },
    childNote: { mr: "1 वर्षानंतर: शेंगांचे तुकडे न देता फक्त आमटी द्या. भातात कुस्करून द्या. तिखट अगदी कमी घाला.", en: "From 1 year: give only the dal, not the drumstick pieces. Mash it with rice. Use very little chilli.", hi: "1 साल के बाद: फलियों के टुकड़े न दें, सिर्फ़ दाल दें। चावल में मसलकर दें। मिर्च बहुत कम डालें।" },
    pregnancyNote: { mr: "जास्त प्रथिनांसाठी जेवणात 2 वाट्या आमटी घ्या. उकळताना मूठभर पालक किंवा मेथी घाला.", en: "Take 2 katori amti with the meal for more protein. Add a handful of palak or methi while it boils.", hi: "ज़्यादा प्रोटीन के लिए खाने में 2 कटोरी आमटी लें। उबालते समय मुट्ठी भर पालक या मेथी डालें।" },
    swaps: [
      { from: "drumstick", to: "dudhi", note: { mr: "शेवग्याऐवजी दुधीच्या फोडी घालता येतात.", en: "Dudhi pieces can be used instead of drumstick.", hi: "सहजन की जगह लौकी के टुकड़े डाल सकते हैं।" } },
      { from: "dal", to: "masoor_dal", note: { mr: "मसूर डाळही चालते आणि बहुतेक वेळा स्वस्त असते.", en: "Masoor dal also works and is often cheaper.", hi: "मसूर दाल भी चलेगी और अक्सर सस्ती होती है।" } },
    ],
    steps: [
      { mr: "1 वाटी तूर डाळ 3 वाट्या पाणी आणि चिमूटभर हळद घालून कुकरमध्ये 3-4 शिट्ट्या होईपर्यंत शिजवा. नीट घोटा.", en: "Cook 1 katori toor dal with 3 katori water and a pinch of turmeric for 3 to 4 whistles. Mash well.", hi: "1 कटोरी अरहर दाल 3 कटोरी पानी और चुटकी भर हल्दी के साथ कुकर में 3-4 सीटी आने तक पकाएँ। अच्छे से घोटें।" },
      { mr: "2 शेवग्याच्या शेंगांचे बोटाएवढे तुकडे करा. थोड्या पाण्यात मीठ घालून 8-10 मिनिटं मऊ होईपर्यंत उकडा.", en: "Cut 2 drumsticks into finger-length pieces. Boil them in a little salted water for 8 to 10 minutes until soft.", hi: "2 सहजन की फलियों के उँगली जितने टुकड़े करें। थोड़े पानी में नमक डालकर 8-10 मिनट नरम होने तक उबालें।" },
      { mr: "2 चमचे तेल गरम करून मोहरी, जिरं, हिंग आणि कढीपत्ता घाला. हळद आणि तिखट घाला.", en: "Heat 2 spoons oil. Add mustard seeds, cumin, hing and curry leaves. Add turmeric and chilli powder.", hi: "2 चम्मच तेल गरम करके राई, जीरा, हींग और करी पत्ता डालें। हल्दी और लाल मिर्च पाउडर डालें।" },
      { mr: "डाळ, शेंगा पाण्यासकट, 1 चमचा गोडा मसाला, 3-4 आमसुलं (किंवा थोडी चिंच), गुळाचा छोटा खडा (हवा तर) आणि मीठ घाला.", en: "Add the dal, the drumsticks with their water, 1 spoon goda masala, 3 to 4 kokum pieces (or a little tamarind), a small piece of jaggery (if you like) and salt.", hi: "दाल, फलियाँ पानी समेत, 1 चम्मच गोडा मसाला, 3-4 कोकम (या थोड़ी इमली), गुड़ का छोटा टुकड़ा (चाहें तो) और नमक डालें।" },
      { mr: "आमटी पातळ होईल इतकं पाणी घालून 5 मिनिटं उकळा.", en: "Add water to make it thin like amti, and boil for 5 minutes.", hi: "आमटी पतली हो जाए इतना पानी डालकर 5 मिनट उबालें।" },
      { mr: "कोथिंबीर घालून भात किंवा भाकरीसोबत वाढा.", en: "Add coriander and serve with rice or bhakri.", hi: "हरा धनिया डालकर चावल या भाकरी के साथ परोसें।" },
    ],
  },
  {
    id: "bhopla_bhaji",
    minutes: 25,
    meals: ["lunch", "dinner"],
    needs: ["pumpkin", "peanuts"],
    optional: ["jaggery", "coriander", "coconut"],
    tags: ["budget", "lowOil"],
    name: { mr: "लाल भोपळ्याची भाजी", en: "Bhopla bhaji (red pumpkin)", hi: "कद्दू की सब्ज़ी" },
    estimate: { proteinG: 3.5, kcal: 140, costRs: 9, serves: 3 },
    highlights: ["fibre"],
    goodFor: ["family", "child_1_3y", "elder"],
    minChildMonths: 12,
    why: { mr: "मऊ आणि स्वस्त भाजी, यातून फायबर मिळतं.", en: "A soft, low-cost vegetable that gives fibre.", hi: "नरम और सस्ती सब्ज़ी, इससे फ़ाइबर मिलता है।" },
    childNote: { mr: "1 वर्षानंतर: मिरची घालू नका. मऊ भोपळा कुस्करून भातात किंवा मऊ चपातीसोबत द्या.", en: "From 1 year: leave out the chilli. Mash the soft pumpkin and give it with rice or soft chapati.", hi: "1 साल के बाद: मिर्च न डालें। नरम कद्दू मसलकर चावल या नरम रोटी के साथ दें।" },
    pregnancyNote: { mr: "जेवणात पुरेशी प्रथिनं मिळावीत म्हणून ही भाजी वरण किंवा उसळ आणि भाकरीसोबत खा.", en: "Eat it with dal or usal and bhakri, so the meal has enough protein.", hi: "खाने में पूरा प्रोटीन मिले, इसलिए यह सब्ज़ी दाल या उसल और भाकरी के साथ खाएँ।" },
    swaps: [
      { from: "pumpkin", to: "dudhi", note: { mr: "दुधीची भाजीही अशीच करतात. त्यात गूळ घालू नका.", en: "Dudhi bhaji is made the same way. Leave out the jaggery.", hi: "लौकी की सब्ज़ी भी ऐसे ही बनती है। उसमें गुड़ न डालें।" } },
      { from: "peanuts", to: "coconut", note: { mr: "दाण्याच्या कुटाऐवजी ओलं खोबरं घालता येतं.", en: "Grated coconut can be used instead of peanut powder.", hi: "मूंगफली के पाउडर की जगह कसा हुआ नारियल डाल सकते हैं।" } },
    ],
    steps: [
      { mr: "अर्धा किलो लाल भोपळा सोलून, बिया काढून बारीक फोडी करा.", en: "Peel half a kilo of red pumpkin, remove the seeds and cut it into small cubes.", hi: "आधा किलो लाल कद्दू छीलकर, बीज निकालकर छोटे टुकड़े करें।" },
      { mr: "1 मोठा चमचा तेल गरम करून मोहरी, जिरं, हिंग आणि 1-2 हिरव्या मिरच्या घाला.", en: "Heat 1 big spoon oil. Add mustard seeds, cumin, hing and 1 to 2 green chillies.", hi: "1 बड़ा चम्मच तेल गरम करके राई, जीरा, हींग और 1-2 हरी मिर्च डालें।" },
      { mr: "भोपळ्याच्या फोडी, हळद आणि मीठ घालून हलवा. झाकण ठेवून मंद आचेवर 10-12 मिनिटं मऊ होईपर्यंत शिजवा. भोपळ्याला स्वतःचं पाणी सुटतं.", en: "Add the pumpkin, turmeric and salt, and mix. Cover and cook on low heat for 10 to 12 minutes until soft. The pumpkin gives out its own water.", hi: "कद्दू के टुकड़े, हल्दी और नमक डालकर मिलाएँ। ढककर धीमी आँच पर 10-12 मिनट नरम होने तक पकाएँ। कद्दू अपना पानी छोड़ता है।" },
      { mr: "3 मोठे चमचे दाण्याचं कूट आणि गुळाचा छोटा खडा (हवा तर) घालून हलक्या हाताने मिसळा.", en: "Add 3 big spoons of peanut powder and a small piece of jaggery (if you like). Mix gently.", hi: "3 बड़े चम्मच मूंगफली का पाउडर और गुड़ का छोटा टुकड़ा (चाहें तो) डालकर हल्के हाथ से मिलाएँ।" },
      { mr: "आणखी 2 मिनिटं शिजवा. कोथिंबीर घालून चपाती किंवा भाकरीसोबत वाढा.", en: "Cook for 2 more minutes. Add coriander and serve with chapati or bhakri.", hi: "2 मिनट और पकाएँ। हरा धनिया डालकर रोटी या भाकरी के साथ परोसें।" },
    ],
  },
  {
    id: "shengdana_til_ladoo",
    minutes: 30,
    meals: ["snack"],
    needs: ["peanuts", "til", "jaggery"],
    optional: ["ghee"],
    tags: ["kids", "budget"],
    name: { mr: "शेंगदाणा-तीळ लाडू", en: "Peanut and til ladoo", hi: "मूंगफली तिल के लड्डू" },
    estimate: { proteinG: 3.5, kcal: 110, costRs: 3, serves: 10 },
    highlights: ["energy", "healthy_fat"],
    goodFor: ["woman", "lactating", "girl_10_18", "child_6_10y"],
    minChildMonths: 24,
    why: { mr: "शेंगदाणे आणि तिळातून ताकद आणि चांगले फॅट्स मिळतात.", en: "Peanuts and til give energy and healthy fats.", hi: "मूंगफली और तिल से ताक़त और अच्छा फ़ैट मिलता है।" },
    childNote: { mr: "5 वर्षांखालील मुलांना अख्खे किंवा जाडसर शेंगदाणे देऊ नका. सगळं बारीक पूड करून 1-2 चमचे सत्त्वात किंवा दुधात मिसळून द्या.", en: "Under 5 years, do not give whole or coarse peanut pieces. Grind everything to a fine powder and mix 1 to 2 spoons into porridge or milk.", hi: "5 साल से छोटे बच्चों को साबुत या दरदरी मूंगफली न दें। सब कुछ बारीक पाउडर बनाकर 1-2 चम्मच दलिया या दूध में मिलाकर दें।" },
    pregnancyNote: { mr: "यात ताकद जास्त असते, म्हणून रोज 1 लाडू पुरे. तुमची शुगर जास्त आहे असं सांगितलं असेल तर गोड खाण्याआधी ANM किंवा डॉक्टरांना विचारा. बाळाला दूध पाजताना हा दोन जेवणांमधला चांगला खाऊ आहे.", en: "It has a lot of energy, so 1 ladoo a day is enough. If you have been told your sugar is high, ask the ANM or doctor before eating sweets. When breastfeeding, it is a good snack between meals.", hi: "इसमें ताक़त ज़्यादा होती है, इसलिए रोज़ 1 लड्डू काफ़ी है। अगर आपको शुगर ज़्यादा बताई गई है तो मीठा खाने से पहले ANM या डॉक्टर से पूछें। बच्चे को दूध पिलाने के दिनों में यह दो खानों के बीच अच्छा नाश्ता है।" },
    swaps: [
      { from: "til", to: "flaxseed", note: { mr: "तिळाऐवजी थोडे भाजलेले जवस घालता येतात.", en: "Some roasted flaxseed (javas) can be used in place of til.", hi: "तिल की जगह थोड़ी भुनी अलसी डाल सकते हैं।" } },
    ],
    steps: [
      { mr: "1 वाटी शेंगदाणे मंद आचेवर कुरकुरीत भाजा. थंड झाल्यावर साली काढा.", en: "Dry roast 1 katori peanuts on low heat until crisp. Let them cool and rub off the skins.", hi: "1 कटोरी मूंगफली धीमी आँच पर कुरकुरी भूनें। ठंडी होने पर छिलके निकालें।" },
      { mr: "अर्धी वाटी तीळ मंद आचेवर तडतडेपर्यंत भाजा. करपू देऊ नका.", en: "Dry roast half a katori til on low heat until it starts to pop. Do not let it burn.", hi: "आधी कटोरी तिल धीमी आँच पर चटकने तक भूनें। जलने न दें।" },
      { mr: "शेंगदाणे मिक्सरमध्ये जाडसर वाटा.", en: "Grind the peanuts coarsely in a mixer.", hi: "मूंगफली को मिक्सर में दरदरा पीसें।" },
      { mr: "त्यात तीळ आणि 1 वाटी किसलेला गूळ घालून काही सेकंद फिरवा, मिश्रण एकत्र चिकटेपर्यंत.", en: "Add the til and 1 katori grated jaggery, and run the mixer for a few seconds until it sticks together.", hi: "इसमें तिल और 1 कटोरी कद्दूकस किया गुड़ डालकर कुछ सेकंड चलाएँ, जब तक मिश्रण आपस में चिपकने न लगे।" },
      { mr: "हाताला थोडं तूप लावून 10 छोटे लाडू वळा.", en: "Rub a little ghee on your palms and shape 10 small ladoos.", hi: "हाथों पर थोड़ा घी लगाकर 10 छोटे लड्डू बाँधें।" },
      { mr: "स्वच्छ, कोरड्या डब्यात ठेवा. खाऊ म्हणून रोज 1 लाडू द्या.", en: "Keep them in a clean, dry box. Give 1 ladoo a day as a snack.", hi: "साफ़, सूखे डिब्बे में रखें। नाश्ते में रोज़ 1 लड्डू दें।" },
    ],
  },
  {
    id: "dahi_bhaat",
    minutes: 30,
    meals: ["lunch", "dinner"],
    needs: ["rice", "curd"],
    optional: ["cucumber", "carrot", "ginger", "curry_leaves", "coriander", "milk"],
    tags: ["budget", "lowOil", "kids"],
    name: { mr: "दहीभात", en: "Dahi bhaat (curd rice)", hi: "दही चावल" },
    estimate: { proteinG: 7.5, kcal: 250, costRs: 13, serves: 3 },
    highlights: ["calcium", "protein"],
    goodFor: ["family", "pregnant_t1", "lactating", "child_6_12m", "child_1_3y", "elder"],
    minChildMonths: 6,
    why: { mr: "दह्यातून कॅल्शियम आणि प्रथिनं मिळतात.", en: "Curd gives calcium and protein.", hi: "दही से कैल्शियम और प्रोटीन मिलता है।" },
    childNote: { mr: "6 ते 12 महिने: मऊ भात ताज्या साध्या दह्यात कुस्करून द्या. मीठ आणि फोडणी नको.", en: "6 to 12 months: mash soft rice with fresh plain curd. No salt and no tadka.", hi: "6 से 12 महीने: नरम चावल को ताज़े सादे दही में मसलकर दें। नमक और तड़का नहीं।" },
    pregnancyNote: { mr: "ताजं, जास्त आंबट नसलेलं दही वापरा. किसलेलं गाजर किंवा काकडी घाला. बाळाला दूध पाजत असाल तर सोबत 1 ग्लास पाणी प्या.", en: "Use fresh curd that is not very sour. Add grated carrot or cucumber. When breastfeeding, drink a glass of water with it.", hi: "ताज़ा, ज़्यादा खट्टा न हो ऐसा दही लें। कद्दूकस की हुई गाजर या खीरा डालें। बच्चे को दूध पिलाती हैं तो साथ में 1 गिलास पानी पिएँ।" },
    swaps: [
      { from: "rice", to: "poha", note: { mr: "पटकन दही पोहे करायचे असतील तर पातळ पोहे 2 मिनिटं भिजवून दह्यात मिसळा. शिजवायची गरज नाही.", en: "For quick dahi pohe, soak thin pohe for 2 minutes and mix with curd. No cooking is needed.", hi: "झटपट दही पोहा बनाना हो तो पतला पोहा 2 मिनट भिगोकर दही में मिलाएँ। पकाने की ज़रूरत नहीं।" } },
    ],
    steps: [
      { mr: "1 वाटी तांदूळ 3 वाट्या पाण्यात मऊ शिजवा. थंड होऊ द्या.", en: "Cook 1 katori rice soft in 3 katori water. Let it cool.", hi: "1 कटोरी चावल 3 कटोरी पानी में नरम पकाएँ। ठंडा होने दें।" },
      { mr: "भात हलकासा कुस्करा. 3 वाट्या ताजं दही आणि मीठ घालून मिसळा. खूप घट्ट वाटलं तर थोडं दूध किंवा पाणी घाला.", en: "Mash the rice lightly. Mix in 3 katori fresh curd and salt. If it is too thick, add a little milk or water.", hi: "चावल को हल्का मसलें। 3 कटोरी ताज़ा दही और नमक डालकर मिलाएँ। बहुत गाढ़ा लगे तो थोड़ा दूध या पानी डालें।" },
      { mr: "1 चमचा तेल गरम करून मोहरी, जिरं, कढीपत्ता, थोडं किसलेलं आलं आणि 1 हिरवी मिरची घाला.", en: "Heat 1 spoon oil. Add mustard seeds, cumin, curry leaves, a little grated ginger and 1 green chilli.", hi: "1 चम्मच तेल गरम करके राई, जीरा, करी पत्ता, थोड़ा कद्दूकस किया अदरक और 1 हरी मिर्च डालें।" },
      { mr: "ही फोडणी दहीभातावर ओतून मिसळा.", en: "Pour this tadka over the curd rice and mix.", hi: "यह तड़का दही-चावल पर डालकर मिलाएँ।" },
      { mr: "कोथिंबीर घाला, आणि असल्यास किसलेली काकडी किंवा गाजर घाला. त्याच दिवशी ताजा खा.", en: "Add coriander, and grated cucumber or carrot if you have. Eat it fresh, the same day.", hi: "हरा धनिया डालें, और हो तो कद्दूकस किया खीरा या गाजर डालें। उसी दिन ताज़ा खाएँ।" },
    ],
  },
  {
    id: "banana_ragi_porridge",
    minutes: 10,
    meals: ["breakfast", "snack"],
    needs: ["ragi", "banana"],
    optional: ["ghee"],
    tags: ["quick", "budget", "lowOil", "kids"],
    name: { mr: "केळं-नाचणी पेज (बाळासाठी)", en: "Banana ragi porridge (for babies)", hi: "केला रागी दलिया (बच्चे के लिए)" },
    estimate: { proteinG: 1, kcal: 110, costRs: 5, serves: 1 },
    highlights: ["energy"],
    goodFor: ["child_6_12m", "child_1_3y"],
    minChildMonths: 6,
    why: { mr: "बाळासाठी मऊ पहिला आहार: केळं आणि तुपातून ताकद मिळते, आणि नाचणीतून थोडं कॅल्शियम.", en: "A soft first food: banana and ghee give energy, and nachni adds some calcium.", hi: "बच्चे के लिए नरम पहला आहार: केले और घी से ताक़त मिलती है, और रागी से थोड़ा कैल्शियम।" },
    childNote: { mr: "पेज गुळगुळीत आणि चमच्यावर टिकेल इतकी घट्ट करा, पाण्यासारखी पातळ नको. बाळ मोठं होईल तसं केळं कमी कुस्करा. साखर, मीठ किंवा मध घालू नका.", en: "Make it smooth and thick enough to stay on the spoon, not watery. As the baby grows, mash the banana less. Do not add sugar, salt or honey.", hi: "दलिया चिकना और इतना गाढ़ा बनाएँ कि चम्मच पर टिका रहे, पानी जैसा पतला नहीं। बच्चा बड़ा हो तो केला कम मसलें। चीनी, नमक या शहद न डालें।" },
    pregnancyNote: { mr: "स्वतःसाठी पाण्याऐवजी दुधात मोठी वाटी करून घ्या. त्यातून कॅल्शियम मिळतं.", en: "Make a bigger bowl for yourself with milk instead of water. It gives calcium.", hi: "अपने लिए पानी की जगह दूध में बड़ी कटोरी बनाकर लें। इससे कैल्शियम मिलता है।" },
    swaps: [
      { from: "banana", to: "chikoo", note: { mr: "केळ्याऐवजी पिकलेला चिकू कुस्करून घालता येतो.", en: "Mashed ripe chikoo can be used instead of banana.", hi: "केले की जगह पका चीकू मसलकर डाल सकते हैं।" } },
      { from: "banana", to: "papaya", note: { mr: "पिकलेली पपईही कुस्करून घालता येते.", en: "Mashed ripe papaya also works.", hi: "पका पपीता भी मसलकर डाल सकते हैं।" } },
    ],
    steps: [
      { mr: "1 मोठा चमचा नाचणीचं पीठ अर्धी वाटी पाण्यात गुठळ्या न होता कालवा.", en: "Mix 1 big spoon of nachni flour into half a katori of water with no lumps.", hi: "1 बड़ा चम्मच रागी का आटा आधी कटोरी पानी में बिना गुठली के घोलें।" },
      { mr: "मंद आचेवर 5-7 मिनिटं सतत हलवत शिजवा, घट्ट होऊन पूर्ण शिजेपर्यंत.", en: "Cook on low heat for 5 to 7 minutes, stirring all the time, until thick and fully cooked.", hi: "धीमी आँच पर 5-7 मिनट लगातार चलाते हुए पकाएँ, जब तक गाढ़ा होकर पूरा पक न जाए।" },
      { mr: "अर्धं पिकलेलं केळं चांगलं कुस्करा.", en: "Mash half a ripe banana very well.", hi: "आधा पका केला अच्छे से मसलें।" },
      { mr: "केळं पेजेत मिसळा. अर्धा चमचा तूप घाला.", en: "Mix the banana into the porridge. Add half a spoon of ghee.", hi: "केला दलिया में मिलाएँ। आधा चम्मच घी डालें।" },
      { mr: "फक्त कोमट आहे ना ते तपासा, आणि स्वच्छ चमच्याने भरवा.", en: "Check that it is only warm, then feed with a clean spoon.", hi: "देख लें कि सिर्फ़ गुनगुना हो, फिर साफ़ चम्मच से खिलाएँ।" },
    ],
  },
  {
    id: "mashed_dal_rice",
    minutes: 25,
    meals: ["lunch", "dinner"],
    needs: ["rice", "dal", "ghee"],
    optional: ["pumpkin", "carrot"],
    tags: ["onePot", "budget", "lowOil", "kids"],
    name: { mr: "बाळासाठी मऊ वरण-भात", en: "Mashed dal rice (for babies)", hi: "मसला दाल-चावल (बच्चे के लिए)" },
    estimate: { proteinG: 2, kcal: 90, costRs: 3, serves: 2 },
    highlights: ["energy", "protein"],
    goodFor: ["child_6_12m", "child_1_3y"],
    minChildMonths: 6,
    why: { mr: "बाळासाठी मऊ आहार: डाळीतून प्रथिनं आणि तुपातून ताकद मिळते.", en: "A soft first food: dal gives protein and ghee adds energy.", hi: "बच्चे के लिए नरम आहार: दाल से प्रोटीन और घी से ताक़त मिलती है।" },
    childNote: { mr: "6 ते 8 महिने: गुळगुळीत कुस्करा. 9 ते 12 महिने: हलकंसं कुस्करा, छोटे मऊ गोळे राहू द्या. 1 वर्षानंतर: घरचा वरण-भात कमी मीठ घालून द्या.", en: "6 to 8 months: mash it smooth. 9 to 12 months: mash lightly and leave small soft lumps. After 1 year: give family dal-rice with less salt.", hi: "6 से 8 महीने: चिकना मसलें। 9 से 12 महीने: हल्का मसलें, छोटे नरम टुकड़े रहने दें। 1 साल के बाद: घर का दाल-चावल कम नमक के साथ दें।" },
    pregnancyNote: { mr: "स्वतःसाठी हाच वरण-भात मीठ आणि फोडणी घालून करा, आणि 1 वाटी वरण जास्त घ्या.", en: "Make the same dal-rice for yourself with salt and tadka, and eat 1 extra katori of dal.", hi: "अपने लिए यही दाल-चावल नमक और तड़के के साथ बनाएँ, और 1 कटोरी दाल ज़्यादा लें।" },
    swaps: [
      { from: "dal", to: "masoor_dal", note: { mr: "मसूर डाळही मऊ शिजते, तीही चालते.", en: "Masoor dal also cooks soft and works well.", hi: "मसूर दाल भी नरम पकती है, वह भी चलेगी।" } },
      { from: "rice", to: "dalia", note: { mr: "तांदळाऐवजी खूप मऊ शिजवलेला दलिया वापरता येतो.", en: "Dalia cooked very soft can be used instead of rice.", hi: "चावल की जगह बहुत नरम पका दलिया ले सकते हैं।" } },
    ],
    steps: [
      { mr: "2 मोठे चमचे तांदूळ आणि 1 मोठा चमचा मूग डाळ (किंवा तूर, मसूर डाळ) धुवा.", en: "Wash 2 big spoons of rice and 1 big spoon of moong dal (or toor or masoor dal).", hi: "2 बड़े चम्मच चावल और 1 बड़ा चम्मच मूंग दाल (या अरहर, मसूर दाल) धोएँ।" },
      { mr: "1 वाटी पाणी आणि चिमूटभर हळद घालून कुकरमध्ये 3-4 शिट्ट्या होईपर्यंत खूप मऊ शिजवा. असल्यास लाल भोपळ्याच्या किंवा गाजराच्या 2-3 फोडीही सोबत शिजवा.", en: "Cook with 1 katori water and a pinch of turmeric for 3 to 4 whistles, until very soft. If you have pumpkin or carrot, cook 2 to 3 pieces along with it.", hi: "1 कटोरी पानी और चुटकी भर हल्दी के साथ कुकर में 3-4 सीटी आने तक बहुत नरम पकाएँ। हो तो कद्दू या गाजर के 2-3 टुकड़े भी साथ में पकाएँ।" },
      { mr: "चमच्याने चांगलं कुस्करा. ते मऊ पण चमच्यावर टिकेल इतकं घट्ट हवं.", en: "Mash well with a spoon. It should be soft, but thick enough to stay on the spoon.", hi: "चम्मच से अच्छे से मसलें। यह नरम हो, पर इतना गाढ़ा कि चम्मच पर टिका रहे।" },
      { mr: "1 चमचा तूप घालून मिसळा. 1 वर्षाखालील बाळासाठी मीठ किंवा साखर घालू नका.", en: "Add 1 spoon ghee and mix. Do not add salt or sugar for a baby under 1 year.", hi: "1 चम्मच घी डालकर मिलाएँ। 1 साल से छोटे बच्चे के लिए नमक या चीनी न डालें।" },
      { mr: "फक्त कोमट आहे ना ते तपासा, आणि स्वच्छ चमच्याने भरवा.", en: "Check that it is only warm, then feed with a clean spoon.", hi: "देख लें कि सिर्फ़ गुनगुना हो, फिर साफ़ चम्मच से खिलाएँ।" },
    ],
  },
  {
    id: "sprout_salad",
    minutes: 10,
    meals: ["breakfast", "snack"],
    needs: ["moong_whole", "onion", "tomato", "lemon"],
    optional: ["cucumber", "carrot", "coriander"],
    tags: ["noCook", "quick", "budget", "lowOil", "healthy"],
    name: { mr: "मोड आलेल्या मुगाची कोशिंबीर", en: "Moong sprout salad", hi: "अंकुरित मूंग सलाद" },
    estimate: { proteinG: 7.5, kcal: 120, costRs: 10, serves: 2 },
    highlights: ["protein", "fibre", "folate", "vit_c"],
    goodFor: ["family", "woman", "pregnant_t1", "pregnant_t2", "girl_10_18"],
    minChildMonths: 24,
    why: { mr: "मोड आलेल्या मुगातून प्रथिनं, फायबर आणि फोलेट मिळतं, आणि लिंबू-टोमॅटोतून व्हिटॅमिन C.", en: "Sprouts give protein, fibre and folate, and lemon and tomato add vitamin C.", hi: "अंकुरित मूंग से प्रोटीन, फ़ाइबर और फ़ोलेट मिलता है, और नींबू-टमाटर से विटामिन C।" },
    childNote: { mr: "2 वर्षांनंतर: मोड 5 मिनिटं वाफवून मऊ करा आणि थोडे कुस्करा. कच्चा कांदा, मिरची आणि अख्खे शेंगदाणे घालू नका.", en: "From 2 years: steam the sprouts for 5 minutes until soft and mash lightly. Leave out raw onion, chilli and whole peanuts.", hi: "2 साल के बाद: अंकुरित मूंग 5 मिनट भाप में नरम करें और हल्का मसलें। कच्चा प्याज़, मिर्च और साबुत मूंगफली न डालें।" },
    pregnancyNote: { mr: "कच्च्या मोडांमध्ये जंतू असू शकतात. मोड साधारण 5 मिनिटं उकडून किंवा वाफवून मग मिसळा. भाज्या नीट धुवा.", en: "Raw sprouts can carry germs. Boil or steam the sprouts for about 5 minutes, then mix. Wash the vegetables well.", hi: "कच्चे अंकुरित दानों में कीटाणु हो सकते हैं। इन्हें लगभग 5 मिनट उबालकर या भाप में पकाकर फिर मिलाएँ। सब्ज़ियाँ अच्छे से धोएँ।" },
    swaps: [
      { from: "moong_whole", to: "matki", note: { mr: "मोड आलेली मटकीही अशीच वापरता येते.", en: "Matki sprouts work the same way.", hi: "अंकुरित मटकी भी ऐसे ही चलेगी।" } },
      { from: "lemon", to: "amla", note: { mr: "हंगामात किसलेला आवळा घातल्यास आंबटपणा आणि भरपूर व्हिटॅमिन C मिळतं.", en: "In season, a grated amla gives the sour taste and plenty of vitamin C.", hi: "मौसम में कद्दूकस किया आंवला डालने से खटास और भरपूर विटामिन C मिलता है।" } },
      { from: "tomato", to: "carrot", note: { mr: "टोमॅटो महाग असतील तर किसलेलं गाजर घाला.", en: "Use grated carrot if tomatoes are costly.", hi: "टमाटर महँगे हों तो कद्दूकस की हुई गाजर डालें।" } },
    ],
    steps: [
      { mr: "अर्धी वाटी अख्खे मूग 8 तास भिजवा. पाणी काढून ओल्या कपड्यात बांधा आणि 1 दिवस मोड येऊ द्या.", en: "Soak half a katori whole moong for 8 hours. Drain, tie it in a wet cloth and leave for 1 day to sprout.", hi: "आधी कटोरी साबुत मूंग 8 घंटे भिगोएँ। पानी निकालकर गीले कपड़े में बाँधें और 1 दिन अंकुर आने दें।" },
      { mr: "मोड आलेले मूग स्वच्छ पाण्यात नीट धुवा.", en: "Wash the sprouts well in clean water.", hi: "अंकुरित मूंग साफ़ पानी में अच्छे से धोएँ।" },
      { mr: "1 छोटा कांदा, 1 टोमॅटो आणि काकडी (असल्यास) बारीक चिरा.", en: "Chop 1 small onion, 1 tomato and a cucumber (if you have) into small pieces.", hi: "1 छोटा प्याज़, 1 टमाटर और खीरा (हो तो) बारीक काटें।" },
      { mr: "मूग आणि भाज्या एकत्र करून मीठ, 1 लिंबाचा रस आणि कोथिंबीर घालून मिसळा.", en: "Mix the sprouts and vegetables with salt, the juice of 1 lemon and chopped coriander.", hi: "मूंग और सब्ज़ियाँ मिलाकर नमक, 1 नींबू का रस और हरा धनिया डालें।" },
      { mr: "ताजी कोशिंबीर लगेच खा.", en: "Eat it fresh, soon after mixing.", hi: "ताज़ा सलाद तुरंत खाएँ।" },
    ],
  },
  {
    id: "masala_taak",
    minutes: 10,
    meals: ["snack"],
    needs: ["curd", "ginger", "coriander"],
    optional: ["curry_leaves"],
    tags: ["noCook", "quick", "budget", "lowOil", "healthy"],
    name: { mr: "मसाला ताक", en: "Masala taak (spiced buttermilk)", hi: "मसाला छाछ" },
    estimate: { proteinG: 4.5, kcal: 90, costRs: 11, serves: 2 },
    highlights: ["calcium"],
    goodFor: ["family", "woman", "lactating", "elder"],
    minChildMonths: 12,
    why: { mr: "ताकातून कॅल्शियम मिळतं, आणि उन्हाळ्यात हे चांगलं पेय आहे.", en: "Taak gives calcium, and it is a good drink in hot weather.", hi: "छाछ से कैल्शियम मिलता है, और गर्मी में यह अच्छा पेय है।" },
    childNote: { mr: "1 वर्षानंतर: मिरची न घालता, चिमूटभर जिरेपूड आणि अगदी थोडं मीठ घालून साधं ताक द्या.", en: "From 1 year: give plain taak with a pinch of cumin powder, no chilli and very little salt.", hi: "1 साल के बाद: बिना मिर्च, चुटकी भर जीरा पाउडर और बहुत थोड़े नमक वाली सादी छाछ दें।" },
    pregnancyNote: { mr: "ताजं दही आणि कमी मीठ वापरा. बाळाला दूध पाजत असाल तर जेवणासोबत 1 ग्लास ताक घेतल्याने शरीराला जास्त पाणी मिळतं.", en: "Use fresh curd and less salt. When breastfeeding, a glass of taak with lunch adds fluids.", hi: "ताज़ा दही और कम नमक इस्तेमाल करें। बच्चे को दूध पिलाती हैं तो खाने के साथ 1 गिलास छाछ से शरीर को ज़्यादा पानी मिलता है।" },
    swaps: [
      { from: "curd", to: "buttermilk", note: { mr: "घरी लोणी काढल्यावर उरलेलं ताक असेल तर त्यातच मसाला घाला.", en: "If you already have taak from making butter at home, just add the spices to it.", hi: "घर पर मक्खन निकालने के बाद बची छाछ हो तो उसी में मसाला डालें।" } },
    ],
    steps: [
      { mr: "2 वाट्या ताजं दही आणि 1 ग्लास पाणी भांड्यात घेऊन रवीने किंवा चमच्याने चांगलं घुसळा.", en: "Put 2 katori fresh curd and 1 glass water in a vessel. Whisk well until smooth.", hi: "2 कटोरी ताज़ा दही और 1 गिलास पानी बर्तन में लेकर मथनी या चम्मच से अच्छे से मथें।" },
      { mr: "आल्याचा छोटा तुकडा आणि थोडी कोथिंबीर (हवी तर अर्धी हिरवी मिरची) ठेचून ताकात घाला.", en: "Crush a small piece of ginger with a little coriander (and half a green chilli if you like). Add it to the taak.", hi: "अदरक का छोटा टुकड़ा और थोड़ा हरा धनिया (चाहें तो आधी हरी मिर्च) कूटकर छाछ में डालें।" },
      { mr: "मीठ आणि अर्धा चमचा भाजलेल्या जिऱ्याची पूड घालून मिसळा.", en: "Add salt and half a spoon of roasted cumin powder. Mix well.", hi: "नमक और आधा चम्मच भुने जीरे का पाउडर डालकर मिलाएँ।" },
      { mr: "ताजं ताक जेवणासोबत द्या.", en: "Serve fresh, with lunch.", hi: "ताज़ी छाछ खाने के साथ दें।" },
    ],
  },
  {
    id: "chawli_usal",
    minutes: 40,
    meals: ["lunch", "dinner"],
    needs: ["chawli", "onion", "coconut"],
    optional: ["kokum", "goda_masala", "coriander"],
    tags: ["konkan", "budget", "healthy", "guests"],
    name: { mr: "चवळीची उसळ", en: "Chawli usal (cowpea curry)", hi: "लोबिया की उसल" },
    estimate: { proteinG: 9.5, kcal: 230, costRs: 10, serves: 4 },
    highlights: ["protein", "fibre", "folate"],
    goodFor: ["family", "woman", "pregnant_t2", "pregnant_t3", "lactating", "girl_10_18"],
    minChildMonths: 12,
    why: { mr: "चवळीतून प्रथिनं, फायबर आणि फोलेट मिळतं.", en: "Chawli gives protein, fibre and folate.", hi: "लोबिया से प्रोटीन, फ़ाइबर और फ़ोलेट मिलता है।" },
    childNote: { mr: "1 वर्षानंतर: चवळी खूप मऊ शिजवून थोडी कुस्करा. तिखट अगदी कमी घाला.", en: "From 1 year: cook the chawli very soft and mash it lightly. Use very little chilli.", hi: "1 साल के बाद: लोबिया बहुत नरम पकाकर हल्का मसलें। मिर्च बहुत कम डालें।" },
    pregnancyNote: { mr: "भाकरी किंवा भातासोबत 1 वाटी उसळ खा. लोह नीट मिळावं म्हणून वरून लिंबू पिळा.", en: "Eat 1 katori with bhakri or rice. Squeeze lemon on top to help the body take in iron.", hi: "भाकरी या चावल के साथ 1 कटोरी उसल खाएँ। आयरन अच्छे से मिले, इसलिए ऊपर से नींबू निचोड़ें।" },
    swaps: [
      { from: "chawli", to: "matki", note: { mr: "मोड आलेली मटकीही अशीच वापरता येते.", en: "Sprouted matki can be used the same way.", hi: "अंकुरित मटकी भी ऐसे ही इस्तेमाल कर सकते हैं।" } },
      { from: "coconut", to: "peanuts", note: { mr: "खोबऱ्याऐवजी दाण्याचं कूट वापरता येतं.", en: "Peanut powder can be used instead of coconut.", hi: "नारियल की जगह मूंगफली का पाउडर ले सकते हैं।" } },
    ],
    steps: [
      { mr: "दीड वाटी चवळी रात्रभर भिजवा. मीठ आणि पाणी घालून कुकरमध्ये 3-4 शिट्ट्या होईपर्यंत मऊ शिजवा.", en: "Soak 1 and a half katori chawli overnight. Pressure cook with salt and water for 3 to 4 whistles until soft.", hi: "डेढ़ कटोरी लोबिया रात भर भिगोएँ। नमक और पानी डालकर कुकर में 3-4 सीटी आने तक नरम पकाएँ।" },
      { mr: "1 चमचा तेलात 1 मोठा चिरलेला कांदा आणि अर्धी वाटी ओलं खोबरं तपकिरी होईपर्यंत भाजा. थोडं पाणी घालून बारीक वाटा.", en: "In 1 spoon oil, roast 1 big chopped onion and half a katori grated coconut until brown. Grind to a fine paste with a little water.", hi: "1 चम्मच तेल में 1 बड़ा कटा प्याज़ और आधी कटोरी कसा हुआ नारियल भूरा होने तक भूनें। थोड़ा पानी डालकर बारीक पीसें।" },
      { mr: "2 चमचे तेल गरम करून मोहरी, हिंग, हळद आणि तिखट घाला.", en: "Heat 2 spoons oil. Add mustard seeds, hing, turmeric and chilli powder.", hi: "2 चम्मच तेल गरम करके राई, हींग, हल्दी और लाल मिर्च पाउडर डालें।" },
      { mr: "वाटण आणि 1 चमचा गोडा मसाला घालून 2-3 मिनिटं परता.", en: "Add the paste and 1 spoon goda masala. Fry for 2 to 3 minutes.", hi: "पिसा मसाला और 1 चम्मच गोडा मसाला डालकर 2-3 मिनट भूनें।" },
      { mr: "शिजलेली चवळी पाण्यासकट, लागल्यास मीठ आणि 2-3 आमसुलं (असल्यास) घालून 5-7 मिनिटं उकळा.", en: "Add the cooked chawli with its water, salt if needed, and 2 to 3 kokum pieces (if you have). Boil for 5 to 7 minutes.", hi: "पका लोबिया पानी समेत, ज़रूरत हो तो नमक और 2-3 कोकम (हो तो) डालकर 5-7 मिनट उबालें।" },
      { mr: "कोथिंबीर घालून भात, भाकरी किंवा चपातीसोबत वाढा.", en: "Add coriander and serve with rice, bhakri or chapati.", hi: "हरा धनिया डालकर चावल, भाकरी या रोटी के साथ परोसें।" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Food cautions                                                       */
/* ------------------------------------------------------------------ */

export const foodCautions: FoodCaution[] = [
  { id: "honey_under_1y", ingredients: ["honey"], underMonths: 12, text: { mr: "1 वर्षाखालील बाळाला मध देऊ नका, जिभेवर थोडासाही नको. त्याने बाळ गंभीर आजारी पडू शकतं.", en: "Do not give honey to a baby under 1 year, not even a little on the tongue. It can make the baby very ill.", hi: "1 साल से छोटे बच्चे को शहद न दें, जीभ पर थोड़ा सा भी नहीं। इससे बच्चा गंभीर रूप से बीमार हो सकता है।" } },
  { id: "no_salt_sugar_under_1y", ingredients: ["salt", "sugar", "jaggery"], underMonths: 12, text: { mr: "1 वर्षाखालील बाळाच्या जेवणात मीठ, साखर किंवा गूळ घालू नका. आधी बाळासाठी काढून ठेवा, मग घरच्यांसाठी मीठ घाला.", en: "Do not add salt, sugar or jaggery to food for a baby under 1 year. Take out the baby portion first, then add salt for the family.", hi: "1 साल से छोटे बच्चे के खाने में नमक, चीनी या गुड़ न डालें। पहले बच्चे का हिस्सा निकाल लें, फिर घर वालों के लिए नमक डालें।" } },
  { id: "animal_milk_under_1y", ingredients: ["milk"], underMonths: 12, text: { mr: "1 वर्षापर्यंत बाळासाठी आईचं दूध हेच मुख्य दूध. आईच्या दुधाऐवजी गाईचं किंवा म्हशीचं दूध पिण्यासाठी देऊ नका.", en: "Until 1 year, breast milk is the main milk for the baby. Do not give cow or buffalo milk as a drink in place of breast milk.", hi: "1 साल तक बच्चे के लिए माँ का दूध ही मुख्य दूध है। माँ के दूध की जगह गाय या भैंस का दूध पीने को न दें।" } },
  { id: "choking_under_5y", ingredients: ["peanuts"], underMonths: 60, text: { mr: "5 वर्षांखालील मुलांच्या घशात अख्खे शेंगदाणे, सुका मेवा किंवा कडक गोल तुकडे अडकू शकतात. दाणे पूड करून द्या, आणि कडक पदार्थ बारीक चिरून किंवा कुस्करून द्या.", en: "Children under 5 can choke on whole peanuts, nuts or hard round pieces. Grind nuts to a powder, and cut or mash hard foods.", hi: "5 साल से छोटे बच्चों के गले में साबुत मूंगफली, सूखे मेवे या सख़्त गोल टुकड़े फँस सकते हैं। मेवे पीसकर पाउडर बनाकर दें, और सख़्त चीज़ें बारीक काटकर या मसलकर दें।" } },
  { id: "tea_coffee_children", ingredients: ["tea", "coffee"], underMonths: 120, text: { mr: "मुलांना चहा किंवा कॉफी देऊ नका. 1 वर्षानंतर त्याऐवजी दूध किंवा ताक द्या. जेवणासोबत चहा घेतल्याने अन्नातलं लोह शरीराला कमी मिळतं.", en: "Do not give tea or coffee to children. After 1 year, give milk or buttermilk instead. Tea with meals also lowers the iron the body takes from food.", hi: "बच्चों को चाय या कॉफ़ी न दें। 1 साल के बाद इसकी जगह दूध या छाछ दें। खाने के साथ चाय पीने से खाने का आयरन शरीर को कम मिलता है।" } },
  { id: "cook_fully_pregnancy", ingredients: ["egg", "bangda", "bombil", "prawns", "chicken"], pregnancy: true, text: { mr: "गरोदरपणात अंडी, मासे, कोळंबी आणि चिकन पूर्ण शिजवूनच खा. अंड्याचा बलक घट्ट हवा, आणि माशाचा किंवा मांसाचा कोणताही भाग कच्चा दिसू नये.", en: "In pregnancy, eat eggs, fish, prawns and chicken only when fully cooked. The egg yolk should be firm, and no part of the fish or meat should look raw.", hi: "गर्भावस्था में अंडे, मछली, झींगे और चिकन पूरी तरह पकाकर ही खाएँ। अंडे की ज़र्दी सख़्त हो, और मछली या मांस का कोई हिस्सा कच्चा न दिखे।" } },
  { id: "packaged_food_children", ingredients: ["biscuits", "packaged_juice", "sweets"], underMonths: 60, text: { mr: "पाकिटातला ज्यूस, बिस्किटं आणि मिठाई हे लहान मुलांचं रोजचं अन्न नाही. त्यात बहुतेक वेळा साखर, मीठ किंवा तेल जास्त आणि पोषण कमी असतं. त्याऐवजी फळं, घरचा खाऊ आणि पाणी द्या.", en: "Packaged juice, biscuits and sweets are not everyday food for small children. They often have a lot of sugar, salt or oil, and little nutrition. Give fruit, home-made snacks and water instead.", hi: "पैकेट वाला जूस, बिस्कुट और मिठाई छोटे बच्चों का रोज़ का खाना नहीं है। इनमें अक्सर चीनी, नमक या तेल ज़्यादा और पोषण कम होता है। इसकी जगह फल, घर का बना नाश्ता और पानी दें।" } },
];

/* ------------------------------------------------------------------ */
/* Self-care                                                           */
/* ------------------------------------------------------------------ */

export const selfCare: Tip[] = [
  {
    title: { mr: "१० मिनिटांचं स्वतःसाठी रुटीन", en: "10-minute self-care routine", hi: "10 मिनट का सेल्फ़-केयर रूटीन" },
    points: [
      { mr: "सकाळी उठल्यावर एक ग्लास कोमट पाणी प्या.", en: "Drink a glass of warm water after waking up.", hi: "सुबह उठकर एक गिलास गुनगुना पानी पिएँ।" },
      { mr: "३ मिनिटं हात-पाय, मान, खांदे मोकळे करा.", en: "Stretch arms, legs, neck and shoulders for 3 minutes.", hi: "3 मिनट हाथ-पैर, गर्दन, कंधे स्ट्रेच करें।" },
      { mr: "२ मिनिटं डोळे मिटून हळू श्वास घ्या-सोडा.", en: "Close your eyes and breathe slowly for 2 minutes.", hi: "2 मिनट आँखें बंद कर धीरे साँस लें-छोड़ें।" },
      { mr: "चेहरा धुवून मॉइश्चरायझर लावा.", en: "Wash your face and apply moisturiser.", hi: "चेहरा धोकर मॉइश्चराइज़र लगाएँ।" },
      { mr: "आजची एक छोटी गोष्ट फक्त स्वतःसाठी ठरवा.", en: "Plan one small thing just for yourself today.", hi: "आज एक छोटी चीज़ सिर्फ़ अपने लिए तय करें।" },
    ],
  },
  {
    title: { mr: "साधा ऑफिस मेकअप", en: "Simple office makeup", hi: "सिंपल ऑफ़िस मेकअप" },
    points: [
      { mr: "मॉइश्चरायझर आणि सनस्क्रीनने सुरुवात करा.", en: "Start with moisturiser and sunscreen.", hi: "मॉइश्चराइज़र और सनस्क्रीन से शुरू करें।" },
      { mr: "हलकी कॉम्पॅक्ट पावडर किंवा BB क्रीम पुरेशी.", en: "A light compact powder or BB cream is enough.", hi: "हल्का कॉम्पैक्ट पाउडर या BB क्रीम काफ़ी है।" },
      { mr: "काजळ किंवा पातळ आयलायनर लावा.", en: "Add kajal or a thin eyeliner.", hi: "काजल या पतला आईलाइनर लगाएँ।" },
      { mr: "न्यूड किंवा हलक्या गुलाबी रंगाची लिपस्टिक निवडा.", en: "Choose a nude or soft pink lipstick.", hi: "न्यूड या हल्की गुलाबी लिपस्टिक चुनें।" },
      { mr: "छोटी टिकली आणि पर्समध्ये एक टिशू-कॉम्पॅक्ट ठेवा.", en: "Small bindi; keep tissues and compact in your bag.", hi: "छोटी बिंदी; बैग में टिश्यू और कॉम्पैक्ट रखें।" },
    ],
  },
  {
    title: { mr: "साडीवर केशरचना", en: "Hairstyles with a saree", hi: "साड़ी के साथ हेयरस्टाइल" },
    points: [
      { mr: "साधा अंबाडा आणि त्यावर गजरा — पारंपरिक आणि नीटनेटका.", en: "A simple bun with a gajra — traditional and neat.", hi: "सिंपल जूड़ा और गजरा — पारंपरिक और साफ़-सुथरा।" },
      { mr: "लांब वेणी — दिवसभर टिकते, कामाला सोयीची.", en: "A long braid lasts all day and suits busy work.", hi: "लंबी चोटी — दिन भर टिकती है, काम में आसान।" },
      { mr: "मागे अर्धे केस क्लिप करून बाकी मोकळे — कार्यक्रमासाठी.", en: "Half-up with a clip, rest open — nice for functions.", hi: "आधे बाल क्लिप कर बाकी खुले — फ़ंक्शन के लिए।" },
      { mr: "लो पोनीटेल — ऑफिससाठी पटकन तयार.", en: "A low ponytail is quick for office days.", hi: "लो पोनीटेल — ऑफ़िस के लिए जल्दी तैयार।" },
    ],
  },
  {
    title: { mr: "रोजची त्वचा आणि केसांची काळजी", en: "Daily skin & hair basics", hi: "रोज़ की त्वचा और बालों की देखभाल" },
    points: [
      { mr: "दिवसातून दोनदा सौम्य फेसवॉशने चेहरा धुवा.", en: "Wash your face twice a day with a mild face wash.", hi: "दिन में दो बार हल्के फ़ेसवॉश से चेहरा धोएँ।" },
      { mr: "कोकणातल्या उन्हात बाहेर पडताना सनस्क्रीन आणि स्कार्फ वापरा.", en: "Use sunscreen and a scarf in the strong Konkan sun.", hi: "कोंकण की तेज़ धूप में सनस्क्रीन और स्कार्फ़ लगाएँ।" },
      { mr: "भरपूर पाणी प्या, फळं आणि पालेभाज्या खा.", en: "Drink plenty of water; eat fruits and leafy greens.", hi: "खूब पानी पिएँ, फल और हरी सब्ज़ियाँ खाएँ।" },
      { mr: "आठवड्यातून एकदा खोबरेल तेलाने केसांना मालिश करा.", en: "Oil your hair with coconut oil once a week.", hi: "हफ़्ते में एक बार नारियल तेल से बालों की मालिश करें।" },
      { mr: "रात्री झोपण्याआधी मेकअप काढा, उशीचा अभ्रा स्वच्छ ठेवा.", en: "Remove makeup before bed; keep pillow covers clean.", hi: "सोने से पहले मेकअप हटाएँ, तकिये का कवर साफ़ रखें।" },
      { mr: "त्वचा किंवा केसांचा त्रास असेल तर डॉक्टरांना दाखवा.", en: "For any skin or hair problem, please see a doctor.", hi: "त्वचा या बालों की कोई समस्या हो तो डॉक्टर को दिखाएँ।" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Kids                                                                */
/* ------------------------------------------------------------------ */

export const kids: Tip[] = [
  {
    title: { mr: "डब्यासाठी कल्पना", en: "Lunchbox ideas", hi: "टिफ़िन के आइडिया" },
    points: [
      { mr: "मेथी पराठा किंवा मूग डाळ चिला आणि चटणी.", en: "Methi paratha or moong dal chilla with chutney.", hi: "मेथी पराठा या मूंग दाल चीला और चटनी।" },
      { mr: "पोहे, उपमा किंवा फोडणीचा भात — पटकन होणारे.", en: "Poha, upma or phodnicha bhaat — quick to make.", hi: "पोहा, उपमा या फोडणी वाला चावल — जल्दी बनता है।" },
      { mr: "पोळीचा रोल: चपातीत भाजी गुंडाळा.", en: "Chapati roll: wrap leftover sabzi in a chapati.", hi: "रोटी रोल: रोटी में सब्ज़ी लपेटें।" },
      { mr: "सोबत एक फळ, काकडी किंवा गाजराच्या काड्या.", en: "Add a fruit or cucumber and carrot sticks.", hi: "साथ में एक फल या खीरा-गाजर की स्टिक।" },
      { mr: "पाण्याची बाटली भरलेली आहे ना, ते तपासा.", en: "Check the water bottle is filled.", hi: "पानी की बोतल भरी है, यह जाँचें।" },
    ],
  },
  {
    title: { mr: "स्क्रीन-टाइमचं रुटीन", en: "Screen-time routine", hi: "स्क्रीन-टाइम रूटीन" },
    points: [
      { mr: "शाळेच्या दिवशी रोज साधारण १ तास स्क्रीन ठरवा.", en: "Fix about 1 hour of screen time on school days.", hi: "स्कूल के दिनों में लगभग 1 घंटा स्क्रीन तय करें।" },
      { mr: "आधी गृहपाठ आणि खेळ, मग स्क्रीन.", en: "Homework and outdoor play first, screen after.", hi: "पहले होमवर्क और खेल, फिर स्क्रीन।" },
      { mr: "जेवताना आणि झोपण्याआधी १ तास फोन नको.", en: "No phones at meals or 1 hour before bed.", hi: "खाते समय और सोने से 1 घंटा पहले फ़ोन नहीं।" },
      { mr: "मुलं काय बघतात ते अधूनमधून सोबत बघा.", en: "Watch with them sometimes to know what they see.", hi: "कभी-कभी साथ बैठकर देखें कि बच्चे क्या देखते हैं।" },
      { mr: "मोबाईल घरात सगळ्यांना दिसेल अशा जागी वापरू द्या.", en: "Let them use devices in a shared room, not alone.", hi: "मोबाइल ऐसी जगह इस्तेमाल करने दें जहाँ सब दिखें।" },
    ],
  },
  {
    title: { mr: "गृहपाठ / अभ्यासाची सवय", en: "Homework routine / study habit", hi: "होमवर्क रूटीन / पढ़ाई की आदत" },
    points: [
      { mr: "रोज एकाच वेळी आणि एकाच जागी अभ्यास.", en: "Study at the same time and place every day.", hi: "रोज़ एक ही समय और एक ही जगह पढ़ाई।" },
      { mr: "आधी नाश्ता, मग २५ मिनिटं अभ्यास, ५ मिनिटं ब्रेक.", en: "Snack first, then 25 minutes study, 5 minutes break.", hi: "पहले नाश्ता, फिर 25 मिनट पढ़ाई, 5 मिनट ब्रेक।" },
      { mr: "अवघड विषय आधी, सोपा नंतर.", en: "Do the hard subject first, easy one later.", hi: "मुश्किल विषय पहले, आसान बाद में।" },
      { mr: "रात्री दप्तर भरून वेळापत्रक तपासा.", en: "Pack the school bag at night and check the timetable.", hi: "रात में बस्ता भरें और टाइमटेबल जाँचें।" },
      { mr: "मार्कांपेक्षा प्रयत्नांचं कौतुक करा.", en: "Praise effort more than marks.", hi: "नंबर से ज़्यादा मेहनत की तारीफ़ करें।" },
    ],
  },
  {
    title: { mr: "१० वर्षांच्या मुलासाठी वीकेंड उपक्रम", en: "Weekend activities for a 10-year-old", hi: "10 साल के बच्चे के लिए वीकेंड गतिविधियाँ" },
    points: [
      { mr: "संध्याकाळी किनाऱ्यावर फिरायला जा, शंख-शिंपले गोळा करा.", en: "Evening beach walk; collect shells together.", hi: "शाम को बीच पर घूमें, साथ में सीपियाँ इकट्ठा करें।" },
      { mr: "सोपी रेसिपी एकत्र बनवा — पोळीचे लाडू, भेळ.", en: "Cook something simple together — poli ladoo or bhel.", hi: "साथ में कुछ आसान बनाएँ — रोटी लड्डू या भेल।" },
      { mr: "वाचनालयातून एक गोष्टीचं पुस्तक आणा.", en: "Borrow a storybook from the library.", hi: "लाइब्रेरी से एक कहानी की किताब लाएँ।" },
      { mr: "कुंडीत रोप लावा आणि रोज पाणी घालायला सांगा.", en: "Plant a seed in a pot and let them water it daily.", hi: "गमले में पौधा लगाएँ, रोज़ पानी देने को कहें।" },
      { mr: "कॅरम, सापशिडी किंवा पत्ते — कुटुंबासोबत खेळ.", en: "Carrom, snakes & ladders or cards with family.", hi: "कैरम, साँप-सीढ़ी या ताश — परिवार के साथ।" },
    ],
  },
  {
    title: { mr: "कमी खर्चात वाढदिवस", en: "Low-budget birthday ideas", hi: "कम बजट में जन्मदिन" },
    points: [
      { mr: "घरीच केक किंवा शिरा बनवा, मुलालाही सजवू द्या.", en: "Make a cake or sheera at home; let the child decorate.", hi: "घर पर केक या हलवा बनाएँ, बच्चे को सजाने दें।" },
      { mr: "जुन्या कागदांपासून पताका आणि फुगे.", en: "Paper buntings from old paper, plus a few balloons.", hi: "पुराने कागज़ की झंडियाँ और कुछ गुब्बारे।" },
      { mr: "५–६ मित्रांना बोलवा, संगीत-खुर्ची, पासिंग द पार्सल खेळा.", en: "Invite 5–6 friends; play musical chairs, passing the parcel.", hi: "5–6 दोस्त बुलाएँ; म्यूज़िकल चेयर, पासिंग द पार्सल खेलें।" },
      { mr: "रिटर्न गिफ्ट म्हणून पेन्सिल, स्टिकर किंवा घरचे लाडू.", en: "Return gifts: pencils, stickers or homemade ladoos.", hi: "रिटर्न गिफ़्ट: पेंसिल, स्टिकर या घर के लड्डू।" },
      { mr: "किनाऱ्यावर संध्याकाळची छोटी पिकनिकही छान.", en: "A small evening picnic on the beach also works.", hi: "शाम को बीच पर छोटी पिकनिक भी अच्छी रहती है।" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Outings around Shrivardhan                                          */
/* ------------------------------------------------------------------ */

export const outings: Outing[] = [
  {
    id: "shrivardhan_beach",
    kind: "beach",
    name: { mr: "श्रीवर्धन किनारा", en: "Shrivardhan Beach", hi: "श्रीवर्धन बीच" },
    desc: {
      mr: "गावाजवळचा लांब, स्वच्छ किनारा — संध्याकाळी फिरायला छान. अंधार पडल्यावर गर्दीच्या भागातच थांबा.",
      en: "A long, clean beach close to town, lovely for evening walks. After dark, stay near busier stretches.",
      hi: "शहर के पास लंबा, साफ़ बीच — शाम की सैर के लिए बढ़िया। अंधेरे के बाद भीड़ वाले हिस्से में ही रहें।",
    },
  },
  {
    id: "harihareshwar",
    kind: "temple",
    name: { mr: "हरिहरेश्वर (मंदिर व किनारा)", en: "Harihareshwar (temple & beach)", hi: "हरिहरेश्वर (मंदिर और बीच)" },
    desc: {
      mr: "प्राचीन शिवमंदिर आणि त्यामागे खडकाळ किनारा व प्रदक्षिणा मार्ग. खडकांवर लाटांपासून लांब राहा, भरतीची वेळ तपासा.",
      en: "An old Shiva temple with a rocky shore and pradakshina path behind it. Keep off wave-hit rocks; check tide times.",
      hi: "प्राचीन शिव मंदिर और पीछे चट्टानी किनारा व परिक्रमा मार्ग। लहरों वाली चट्टानों से दूर रहें, ज्वार का समय देखें।",
    },
  },
  {
    id: "diveagar",
    kind: "beach",
    name: { mr: "दिवेआगर किनारा", en: "Diveagar Beach", hi: "दिवेआगर बीच" },
    desc: {
      mr: "सुपारी-नारळाच्या बागांमधलं शांत गाव आणि मऊ वाळूचा किनारा. पोहायचं असल्यास फक्त सुरक्षित भागातच उतरा.",
      en: "A quiet village among areca and coconut groves with a soft sandy beach. Swim only in marked safe areas.",
      hi: "सुपारी-नारियल के बागों वाला शांत गाँव और नरम रेत का बीच। तैरना हो तो सिर्फ़ सुरक्षित हिस्से में ही उतरें।",
    },
  },
  {
    id: "aravi_beach",
    kind: "beach",
    name: { mr: "आरावी किनारा", en: "Aravi Beach", hi: "आरावी बीच" },
    desc: {
      mr: "श्रीवर्धनजवळचा शांत, कमी गर्दीचा किनारा. एकटीने जाण्यापेक्षा कुटुंब किंवा मैत्रिणींसोबत दिवसा जा.",
      en: "A calm, less crowded beach near Shrivardhan. Go in daylight with family or friends rather than alone.",
      hi: "श्रीवर्धन के पास शांत, कम भीड़ वाला बीच। अकेले की बजाय परिवार या सहेलियों के साथ दिन में जाएँ।",
    },
  },
  {
    id: "bagmandla_jetty",
    kind: "nature",
    name: { mr: "बागमांडला जेट्टी (फेरी)", en: "Bagmandla Jetty (creek ferry)", hi: "बागमांडला जेट्टी (फ़ेरी)" },
    desc: {
      mr: "खाडी पार करणारी फेरी — मुलांना बोटीचा छोटा प्रवास आवडतो. परतीच्या शेवटच्या फेरीची वेळ आधी विचारून घ्या.",
      en: "A ferry across the creek — kids enjoy the short boat ride. Ask the last return ferry time beforehand.",
      hi: "खाड़ी पार कराने वाली फ़ेरी — बच्चों को छोटी नाव-यात्रा पसंद आती है। वापसी की आख़िरी फ़ेरी का समय पहले पूछ लें।",
    },
  },
  {
    id: "murud_janjira",
    kind: "fort",
    name: { mr: "मुरुड-जंजिरा किल्ला", en: "Murud-Janjira Fort", hi: "मुरुड-जंजीरा किला" },
    desc: {
      mr: "समुद्रातला प्रसिद्ध जलदुर्ग, शिडाच्या बोटीने जावं लागतं. आरामदायक चप्पल घाला आणि गटासोबतच फिरा.",
      en: "A famous sea fort reached by sailboat. Wear comfortable footwear and stay with your group inside.",
      hi: "समुद्र के बीच मशहूर किला, पाल वाली नाव से जाते हैं। आरामदायक चप्पल पहनें और समूह के साथ ही घूमें।",
    },
  },
  {
    id: "kuda_caves",
    kind: "nature",
    name: { mr: "कुडा लेणी (मांदाड)", en: "Kuda Caves (Mandad)", hi: "कुडा गुफ़ाएँ (मांदाड)" },
    desc: {
      mr: "खाडीकडे पाहणारी प्राचीन बौद्ध लेणी, थोडी चढण आहे. पाणी सोबत ठेवा आणि संध्याकाळ व्हायच्या आधी खाली या.",
      en: "Ancient Buddhist caves overlooking the creek, with a short climb. Carry water and come down before dusk.",
      hi: "खाड़ी की ओर देखती प्राचीन बौद्ध गुफ़ाएँ, थोड़ी चढ़ाई है। पानी साथ रखें और शाम से पहले नीचे आ जाएँ।",
    },
  },
  {
    id: "konkani_thali",
    kind: "food",
    name: { mr: "कोकणी जेवणाचा अनुभव", en: "Konkani food experience", hi: "कोंकणी खाने का अनुभव" },
    desc: {
      mr: "घरगुती खानावळीत माशांची थाळी, सोलकढी आणि मोसमात उकडीचे मोदक चाखा. कुटुंबासाठी ओळखीच्या, गर्दीच्या जागा निवडा.",
      en: "Try a fish thali, solkadhi and, in season, ukadiche modak at a homestyle khanaval. Pick busy, family-friendly places.",
      hi: "घरेलू खानावल में मछली थाली, सोलकढ़ी और मौसम में उकडीचे मोदक चखें। भीड़ वाली, परिवार-अनुकूल जगह चुनें।",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Outing tips                                                         */
/* ------------------------------------------------------------------ */

export const outingTips: Tip[] = [
  {
    title: { mr: "महिलांसाठी सुरक्षित एकदिवसीय सहल", en: "Women-friendly day trip plan", hi: "महिलाओं के लिए सुरक्षित एक-दिन की सैर" },
    points: [
      { mr: "सकाळी ८: निघण्याआधी घरी कुणाला ठिकाण आणि परतीची वेळ सांगा.", en: "8 am: Tell someone at home where you're going and when you'll return.", hi: "सुबह 8: निकलने से पहले घर पर जगह और लौटने का समय बताएँ।" },
      { mr: "सकाळी ९–१२: मंदिर किंवा किल्ला — ऊन कमी असताना.", en: "9 am–12: Temple or fort visit while the sun is mild.", hi: "सुबह 9–12: मंदिर या किला — धूप कम रहते।" },
      { mr: "दुपारी १: गर्दीच्या, ओळखीच्या खानावळीत जेवण.", en: "1 pm: Lunch at a busy, well-known eatery.", hi: "दोपहर 1: भीड़ वाले, जाने-माने खानावल में खाना।" },
      { mr: "दुपारी ३–५: किनारा किंवा आराम; लाइव्ह लोकेशन शेअर ठेवा.", en: "3–5 pm: Beach or rest; keep live location shared.", hi: "दोपहर 3–5: बीच या आराम; लाइव लोकेशन शेयर रखें।" },
      { mr: "संध्याकाळी ६: अंधार पडायच्या आधी परतीचा प्रवास सुरू करा.", en: "6 pm: Start heading back before it gets dark.", hi: "शाम 6: अंधेरा होने से पहले वापसी शुरू करें।" },
    ],
  },
  {
    title: { mr: "किनाऱ्यावर जाताना काय घ्यावं", en: "Beach day packing list", hi: "बीच पर जाने की पैकिंग लिस्ट" },
    points: [
      { mr: "पाण्याच्या बाटल्या आणि घरचा थोडा खाऊ.", en: "Water bottles and some home-made snacks.", hi: "पानी की बोतलें और थोड़ा घर का नाश्ता।" },
      { mr: "सनस्क्रीन, टोपी, गॉगल आणि स्कार्फ.", en: "Sunscreen, hat, sunglasses and a scarf.", hi: "सनस्क्रीन, टोपी, धूप का चश्मा और स्कार्फ़।" },
      { mr: "एक जादा कपड्यांचा जोड, टॉवेल आणि ओल्या कपड्यांसाठी पिशवी.", en: "Spare clothes, a towel and a bag for wet clothes.", hi: "एक जोड़ी अतिरिक्त कपड़े, तौलिया और गीले कपड़ों के लिए थैली।" },
      { mr: "फोन पूर्ण चार्ज आणि पॉवर बँक.", en: "Fully charged phone and a power bank.", hi: "पूरा चार्ज फ़ोन और पावर बैंक।" },
      { mr: "छोटं फर्स्ट-एड, थोडी रोकड आणि कचऱ्यासाठी पिशवी.", en: "Small first-aid kit, some cash and a bag for litter.", hi: "छोटी फ़र्स्ट-एड किट, थोड़ी नकदी और कचरे की थैली।" },
    ],
  },
  {
    title: { mr: "श्रीवर्धन परिसरात २ दिवसांची कौटुंबिक सहल", en: "2-day family itinerary around Shrivardhan", hi: "श्रीवर्धन के आसपास 2 दिन की पारिवारिक यात्रा" },
    points: [
      { mr: "दिवस १ सकाळ: हरिहरेश्वर मंदिर दर्शन आणि प्रदक्षिणा.", en: "Day 1 morning: Harihareshwar temple darshan and pradakshina.", hi: "दिन 1 सुबह: हरिहरेश्वर मंदिर दर्शन और परिक्रमा।" },
      { mr: "दिवस १ दुपार: कोकणी थाळी, मग आराम.", en: "Day 1 afternoon: Konkani thali lunch, then rest.", hi: "दिन 1 दोपहर: कोंकणी थाली, फिर आराम।" },
      { mr: "दिवस १ संध्याकाळ: श्रीवर्धन किनाऱ्यावर सूर्यास्त.", en: "Day 1 evening: Sunset at Shrivardhan beach.", hi: "दिन 1 शाम: श्रीवर्धन बीच पर सूर्यास्त।" },
      { mr: "दिवस २ सकाळ: दिवेआगर किनारा आणि गावात फेरफटका.", en: "Day 2 morning: Diveagar beach and a village walk.", hi: "दिन 2 सुबह: दिवेआगर बीच और गाँव की सैर।" },
      { mr: "दिवस २ दुपार: आरावी किनारा किंवा बागमांडला फेरी, अंधाराआधी घरी.", en: "Day 2 afternoon: Aravi beach or Bagmandla ferry; home before dark.", hi: "दिन 2 दोपहर: आरावी बीच या बागमांडला फ़ेरी; अंधेरे से पहले घर।" },
    ],
  },
];
