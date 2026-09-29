import type { L } from "./kb/types";

export type Meal = "breakfast" | "lunch" | "dinner" | "snack";
export type Ingredient = { id: string; name: L };
export type Recipe = {
  id: string;
  name: L;
  minutes: number;
  meals: Meal[];
  /** ids from `ingredients` — the main things needed (5 max). Salt, oil, water, basic spices are assumed. */
  needs: string[];
  tags: ("quick" | "lowOil" | "kids" | "leftover" | "guests" | "healthy" | "fasting")[];
  steps: L[]; // 3–4 short steps
};
export type Tip = { title: L; points: L[] };
export type Outing = { id: string; name: L; kind: "beach" | "temple" | "fort" | "nature" | "food"; desc: L };

/* ------------------------------------------------------------------ */
/* Ingredients                                                         */
/* ------------------------------------------------------------------ */

export const ingredients: Ingredient[] = [
  { id: "poha", name: { mr: "पोहे", en: "Poha (flattened rice)", hi: "पोहा" } },
  { id: "onion", name: { mr: "कांदा", en: "Onion", hi: "प्याज़" } },
  { id: "potato", name: { mr: "बटाटा", en: "Potato", hi: "आलू" } },
  { id: "tomato", name: { mr: "टोमॅटो", en: "Tomato", hi: "टमाटर" } },
  { id: "rice", name: { mr: "तांदूळ", en: "Rice", hi: "चावल" } },
  { id: "toor_dal", name: { mr: "तूर डाळ", en: "Toor dal", hi: "अरहर / तुअर दाल" } },
  { id: "moong_dal", name: { mr: "मूग डाळ", en: "Moong dal", hi: "मूंग दाल" } },
  { id: "besan", name: { mr: "बेसन", en: "Besan (gram flour)", hi: "बेसन" } },
  { id: "rava", name: { mr: "रवा", en: "Rava (sooji)", hi: "सूजी / रवा" } },
  { id: "wheat_flour", name: { mr: "गव्हाचं पीठ", en: "Wheat flour", hi: "गेहूं का आटा" } },
  { id: "jowar_flour", name: { mr: "ज्वारी / भाकरीचं पीठ", en: "Jowar / bhakri flour", hi: "ज्वार का आटा" } },
  { id: "egg", name: { mr: "अंडी", en: "Eggs", hi: "अंडे" } },
  { id: "fish", name: { mr: "मासे", en: "Fish", hi: "मछली" } },
  { id: "coconut", name: { mr: "नारळ", en: "Coconut", hi: "नारियल" } },
  { id: "kokum", name: { mr: "कोकम / आमसूल", en: "Kokum", hi: "कोकम" } },
  { id: "methi", name: { mr: "मेथीची भाजी", en: "Methi (fenugreek leaves)", hi: "मेथी की पत्तियाँ" } },
  { id: "mixed_veg", name: { mr: "मिक्स भाज्या", en: "Mixed vegetables", hi: "मिक्स सब्ज़ियाँ" } },
  { id: "peanuts", name: { mr: "शेंगदाणे", en: "Peanuts", hi: "मूंगफली" } },
  { id: "sabudana", name: { mr: "साबुदाणा", en: "Sabudana", hi: "साबूदाना" } },
  { id: "curd", name: { mr: "दही", en: "Curd", hi: "दही" } },
  { id: "leftover_rice", name: { mr: "उरलेला भात", en: "Leftover rice", hi: "बचा हुआ चावल" } },
  { id: "leftover_chapati", name: { mr: "उरलेल्या चपात्या", en: "Leftover chapati", hi: "बची हुई रोटी" } },
];

/* ------------------------------------------------------------------ */
/* Recipes                                                             */
/* ------------------------------------------------------------------ */

export const recipes: Recipe[] = [
  {
    id: "kanda_pohe",
    minutes: 15,
    meals: ["breakfast", "snack"],
    needs: ["poha", "onion", "peanuts", "potato"],
    tags: ["quick", "kids", "guests"],
    name: { mr: "कांदे पोहे", en: "Kanda Pohe", hi: "कांदा पोहा" },
    steps: [
      { mr: "पोहे धुवून ५ मिनिटं निथळत ठेवा, त्यावर मीठ-हळद-साखर घाला.", en: "Rinse poha, drain for 5 minutes, mix in salt, turmeric and a pinch of sugar.", hi: "पोहा धोकर 5 मिनट छान लें, नमक-हल्दी-थोड़ी चीनी मिलाएँ।" },
      { mr: "फोडणीत मोहरी, कढीपत्ता, मिरची आणि शेंगदाणे परता.", en: "Heat oil; add mustard seeds, curry leaves, green chilli and peanuts.", hi: "तेल में राई, करी पत्ता, हरी मिर्च और मूंगफली भूनें।" },
      { mr: "कांदा आणि बटाट्याच्या बारीक फोडी घालून मऊ होईपर्यंत शिजवा.", en: "Add onion and small potato cubes; cook till soft.", hi: "प्याज़ और छोटे आलू के टुकड़े डालकर नरम होने तक पकाएँ।" },
      { mr: "पोहे घालून झाकण ठेवा, २ मिनिटांनी लिंबू-कोथिंबीर घाला.", en: "Add poha, cover 2 minutes, finish with lemon and coriander.", hi: "पोहा डालें, 2 मिनट ढकें, नींबू और धनिया डालें।" },
    ],
  },
  {
    id: "upma",
    minutes: 15,
    meals: ["breakfast", "snack"],
    needs: ["rava", "onion", "mixed_veg"],
    tags: ["quick", "lowOil", "kids"],
    name: { mr: "उपमा", en: "Upma", hi: "उपमा" },
    steps: [
      { mr: "रवा कोरडाच हलका गुलाबी होईपर्यंत भाजून घ्या.", en: "Dry-roast rava till lightly golden and set aside.", hi: "सूजी को सूखा हल्का सुनहरा भूनकर अलग रखें।" },
      { mr: "थोड्या तेलात मोहरी, कढीपत्ता, कांदा आणि भाज्या परता.", en: "In a little oil, fry mustard, curry leaves, onion and vegetables.", hi: "थोड़े तेल में राई, करी पत्ता, प्याज़ और सब्ज़ियाँ भूनें।" },
      { mr: "अडीच पट पाणी आणि मीठ घालून उकळी आणा.", en: "Add 2½ times water and salt; bring to a boil.", hi: "ढाई गुना पानी और नमक डालकर उबाल लाएँ।" },
      { mr: "रवा हळूहळू ढवळत घाला, झाकून २ मिनिटं वाफ द्या.", en: "Stir in rava slowly, cover and steam for 2 minutes.", hi: "सूजी धीरे-धीरे चलाते हुए डालें, ढककर 2 मिनट पकाएँ।" },
    ],
  },
  {
    id: "thalipeeth",
    minutes: 25,
    meals: ["breakfast", "dinner"],
    needs: ["jowar_flour", "besan", "wheat_flour", "onion"],
    tags: ["healthy", "lowOil"],
    name: { mr: "थालीपीठ", en: "Thalipeeth", hi: "थालीपीठ" },
    steps: [
      { mr: "ज्वारी, बेसन, गव्हाचं पीठ, कांदा, तिखट, मीठ एकत्र करा.", en: "Mix jowar flour, besan, wheat flour, chopped onion, chilli powder and salt.", hi: "ज्वार, बेसन, गेहूं का आटा, प्याज़, मिर्च, नमक मिलाएँ।" },
      { mr: "पाणी घालून मऊ गोळा मळा.", en: "Add water and knead a soft dough.", hi: "पानी डालकर नरम आटा गूंधें।" },
      { mr: "ओल्या हाताने तव्यावर थापा, मधे भोकं करा.", en: "Pat it thin on the tawa with wet hands; make a few holes.", hi: "गीले हाथ से तवे पर पतला थापें, बीच में छेद करें।" },
      { mr: "भोकांत थोडं तेल सोडून दोन्ही बाजूंनी भाजा. दह्याबरोबर द्या.", en: "Drop a little oil in the holes, cook both sides. Serve with curd.", hi: "छेदों में थोड़ा तेल डालें, दोनों ओर सेकें। दही के साथ परोसें।" },
    ],
  },
  {
    id: "varan_bhaat",
    minutes: 30,
    meals: ["lunch", "dinner"],
    needs: ["toor_dal", "rice"],
    tags: ["kids", "lowOil", "healthy"],
    name: { mr: "वरण भात", en: "Varan Bhaat", hi: "वरण भात (दाल-चावल)" },
    steps: [
      { mr: "तूर डाळ हळद घालून कुकरला ३ शिट्ट्या काढा.", en: "Pressure-cook toor dal with turmeric for 3 whistles.", hi: "तुअर दाल हल्दी डालकर कुकर में 3 सीटी लगाएँ।" },
      { mr: "तांदूळ धुवून वेगळा भात शिजवा.", en: "Wash rice and cook it separately.", hi: "चावल धोकर अलग पकाएँ।" },
      { mr: "डाळ घोटून मीठ, थोडा गूळ घालून उकळा.", en: "Mash the dal, add salt and a little jaggery, simmer.", hi: "दाल घोटें, नमक और थोड़ा गुड़ डालकर उबालें।" },
      { mr: "गरम भातावर वरण, साजूक तूप आणि लिंबू घालून वाढा.", en: "Serve dal over hot rice with a spoon of ghee and lemon.", hi: "गरम चावल पर दाल, घी और नींबू डालकर परोसें।" },
    ],
  },
  {
    id: "pithla_bhakri",
    minutes: 30,
    meals: ["lunch", "dinner"],
    needs: ["besan", "jowar_flour", "onion"],
    tags: ["healthy", "lowOil"],
    name: { mr: "पिठलं भाकरी", en: "Pithla Bhakri", hi: "पिठला भाकरी" },
    steps: [
      { mr: "बेसन पाण्यात गुठळ्या न राहता कालवून घ्या.", en: "Whisk besan in water with no lumps.", hi: "बेसन को पानी में बिना गांठ के घोलें।" },
      { mr: "फोडणीत लसूण, मिरची, कांदा परतून बेसनाचं पाणी घाला.", en: "Fry garlic, chilli and onion; pour in the besan mix.", hi: "लहसुन, मिर्च, प्याज़ भूनकर बेसन का घोल डालें।" },
      { mr: "सतत ढवळत घट्ट होईपर्यंत शिजवा, झाकून वाफ द्या.", en: "Stir till thick, then cover and steam for a minute.", hi: "गाढ़ा होने तक चलाते रहें, फिर ढककर भाप दें।" },
      { mr: "ज्वारीची भाकरी थापून तव्यावर भाजा, पिठल्याबरोबर वाढा.", en: "Pat jowar bhakri, roast on the tawa and serve with pithla.", hi: "ज्वार की भाकरी थापकर सेकें, पिठले के साथ परोसें।" },
    ],
  },
  {
    id: "solkadhi",
    minutes: 10,
    meals: ["lunch", "dinner"],
    needs: ["coconut", "kokum"],
    tags: ["quick", "healthy", "guests"],
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
    tags: ["guests"],
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
    tags: ["guests", "kids"],
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
    minutes: 30,
    meals: ["breakfast", "lunch", "dinner"],
    needs: ["wheat_flour", "methi", "curd"],
    tags: ["healthy", "kids"],
    name: { mr: "मेथीचा पराठा", en: "Methi Paratha", hi: "मेथी पराठा" },
    steps: [
      { mr: "मेथी बारीक चिरून धुवून घ्या.", en: "Wash and finely chop the methi leaves.", hi: "मेथी धोकर बारीक काटें।" },
      { mr: "गव्हाच्या पिठात मेथी, दही, ओवा, तिखट, मीठ घालून मळा.", en: "Knead wheat flour with methi, curd, ajwain, chilli and salt.", hi: "आटे में मेथी, दही, अजवाइन, मिर्च, नमक डालकर गूंधें।" },
      { mr: "पातळ लाटून तव्यावर थोडं तेल लावून भाजा.", en: "Roll thin and roast on the tawa with a little oil.", hi: "पतला बेलकर तवे पर थोड़ा तेल लगाकर सेकें।" },
      { mr: "दही किंवा लोणच्याबरोबर द्या; डब्यासाठीही छान.", en: "Serve with curd or pickle; good for tiffin too.", hi: "दही या अचार के साथ दें; टिफ़िन के लिए भी अच्छा।" },
    ],
  },
  {
    id: "egg_bhurji",
    minutes: 10,
    meals: ["breakfast", "dinner"],
    needs: ["egg", "onion", "tomato"],
    tags: ["quick", "kids"],
    name: { mr: "अंडा भुर्जी", en: "Egg Bhurji", hi: "अंडा भुर्जी" },
    steps: [
      { mr: "कांदा, मिरची परता, मग टोमॅटो घालून मऊ करा.", en: "Fry onion and chilli, then add tomato till soft.", hi: "प्याज़-मिर्च भूनें, फिर टमाटर डालकर नरम करें।" },
      { mr: "हळद, तिखट, मीठ घाला.", en: "Add turmeric, chilli powder and salt.", hi: "हल्दी, मिर्च, नमक डालें।" },
      { mr: "अंडी फोडून घाला आणि सतत ढवळत २–३ मिनिटं शिजवा.", en: "Crack in eggs and stir for 2–3 minutes till cooked.", hi: "अंडे फोड़कर डालें, 2–3 मिनट चलाते हुए पकाएँ।" },
      { mr: "कोथिंबीर घालून चपाती किंवा पावाबरोबर द्या.", en: "Add coriander; serve with chapati or pav.", hi: "धनिया डालकर रोटी या पाव के साथ दें।" },
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
    minutes: 20,
    meals: ["breakfast", "snack"],
    needs: ["moong_dal", "onion", "tomato"],
    tags: ["kids", "lowOil", "healthy"],
    name: { mr: "मूग डाळीचं धिरडं (चिला)", en: "Moong Dal Chilla", hi: "मूंग दाल चीला" },
    steps: [
      { mr: "मूग डाळ ४ तास किंवा रात्रभर भिजवा.", en: "Soak moong dal for 4 hours or overnight.", hi: "मूंग दाल 4 घंटे या रात भर भिगोएँ।" },
      { mr: "आलं, मिरची, मीठ घालून पातळसर वाटा.", en: "Grind with ginger, chilli and salt into a pouring batter.", hi: "अदरक, मिर्च, नमक के साथ पतला घोल पीसें।" },
      { mr: "बारीक कांदा-टोमॅटो घालून नॉन-स्टिक तव्यावर पसरा.", en: "Add chopped onion-tomato; spread on a non-stick tawa.", hi: "बारीक प्याज़-टमाटर डालें, नॉन-स्टिक तवे पर फैलाएँ।" },
      { mr: "काही थेंब तेल सोडून दोन्ही बाजू भाजा. डब्यात चटणीसोबत द्या.", en: "Few drops of oil, cook both sides. Pack with chutney for tiffin.", hi: "कुछ बूँद तेल डालकर दोनों ओर सेकें। टिफ़िन में चटनी के साथ दें।" },
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
