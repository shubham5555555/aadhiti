import type { L } from './kb/types';
export type AgeBand = 'child' | 'teen' | 'young' | 'adult' | 'senior';
export const AGE_BANDS: {id:AgeBand;label:L}[] = [
 {id:'child',label:{en:'0–9 years',mr:'०–९ वर्षे',hi:'०–९ वर्ष'}},
 {id:'teen',label:{en:'10–17 years',mr:'१०–१७ वर्षे',hi:'१०–१७ वर्ष'}},
 {id:'young',label:{en:'18–25 years',mr:'१८–२५ वर्षे',hi:'१८–२५ वर्ष'}},
 {id:'adult',label:{en:'26–64 years',mr:'२६–६४ वर्षे',hi:'२६–६४ वर्ष'}},
 {id:'senior',label:{en:'65+ years',mr:'६५+ वर्षे',hi:'६५+ वर्ष'}},
];
// Discovery relevance only, never an eligibility decision. Full criteria live in SCHEMES.
export const SCHEME_AGES: Record<string,AgeBand[]> = {
 lekladki:['child','teen','young'],sukanya:['child'],icds:['child','teen','young','adult'],
 pmposhan:['child','teen'],uip:['child','teen','young','adult'],amb:['child','teen','young','adult'],
 pmmvy:['young','adult'],jssk:['child','teen','young','adult'],freeedu:['young','adult'],
 pmkvy:['teen','young','adult'],eshram:['teen','young','adult'],
 'ladki-bahin':['young','adult','senior'],sgnay:['child','teen','young','adult'],shravanbal:['senior'],
 mavim:['young','adult','senior'],umed:['young','adult','senior'],mudra:['young','adult','senior'],
 pmegp:['young','adult','senior'],standup:['young','adult','senior'],vishwakarma:['young','adult','senior'],
 pmfme:['young','adult','senior'],aai:['young','adult','senior'],ahilya:['young','adult','senior'],
 'single-women':['young','adult','senior'],adishakti:['child','teen','young','adult','senior'],
 'child-marriage':['child','teen'],
};
const l=(mr:string,hi:string,en:string):L=>({mr,hi,en});
export const JOURNEYS = [
 {slug:'shailputri',name:l('शैलपुत्री','शैलपुत्री','Shailputri'),theme:l('बालिका आणि मातृशक्ती','बालिका और मातृशक्ति','Girls and mothers'),schemes:['lekladki','sukanya','icds','pmmvy','jssk']},
 {slug:'brahmacharini',name:l('ब्रह्मचारिणी','ब्रह्मचारिणी','Brahmacharini'),theme:l('शिक्षण आणि ज्ञान','शिक्षा और ज्ञान','Education and knowledge'),schemes:['lekladki','sukanya','pmposhan','freeedu','pmkvy']},
 {slug:'chandraghanta',name:l('चंद्रघंटा','चंद्रघंटा','Chandraghanta'),theme:l('धैर्य आणि स्वसंरक्षण','साहस और आत्मरक्षा','Courage and self-defence'),schemes:['child-marriage','adishakti']},
 {slug:'kushmanda',name:l('कुष्मांडा','कुष्मांडा','Kushmanda'),theme:l('आरोग्य आणि ऊर्जा','स्वास्थ्य और ऊर्जा','Health and energy'),schemes:['icds','jssk','uip','amb','pmposhan','pmmvy']},
 {slug:'skandamata',name:l('स्कंदमाता','स्कंदमाता','Skandamata'),theme:l('संगोपन आणि काळजी','पालन-पोषण और देखभाल','Nurturing and care'),schemes:['pmmvy','jssk','icds','uip','lekladki']},
 {slug:'katyayani',name:l('कात्यायनी','कात्यायनी','Katyayani'),theme:l('न्याय आणि हक्क','न्याय और अधिकार','Justice and rights'),schemes:['child-marriage','adishakti','single-women','sgnay']},
 {slug:'kalaratri',name:l('कालरात्री','कालरात्री','Kalaratri'),theme:l('संरक्षण आणि सुरक्षित जागा','सुरक्षा और सुरक्षित स्थान','Protection and safe spaces'),schemes:['child-marriage','adishakti','single-women']},
 {slug:'mahagauri',name:l('महागौरी','महागौरी','Mahagauri'),theme:l('नवचेतना आणि स्वतःसाठी वेळ','नई ऊर्जा और अपने लिए समय','Renewal and wellbeing'),schemes:['amb','icds','pmmvy','sgnay','shravanbal','single-women']},
 {slug:'siddhidatri',name:l('सिद्धिदात्री','सिद्धिदात्री','Siddhidatri'),theme:l('आर्थिक स्वावलंबन आणि संधी','आर्थिक स्वतंत्रता और अवसर','Financial independence and opportunity'),schemes:['sukanya','lekladki','pmkvy','freeedu','ladki-bahin','mavim','umed','mudra','pmegp','standup','vishwakarma','pmfme','aai','ahilya','eshram','shravanbal']},
];
