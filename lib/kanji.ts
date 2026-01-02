/**
 * Kanji Database - EXPANDED
 *
 * Complete JLPT-based kanji organized by difficulty level (N5 and N4).
 * Each kanji includes meanings, onyomi (Chinese readings), and kunyomi (Japanese readings).
 *
 * Data source: JLPTsensei.com (January 2026)
 * N5: 80 kanji
 * N4: 167 additional kanji (total 247 for N4 level)
 */

export interface KanjiChar {
  character: string;           // The kanji character
  meanings: string[];          // English meanings
  onyomi: string[];           // Chinese-derived readings (romanji)
  kunyomi: string[];          // Native Japanese readings (romanji)
  jlptLevel: 'N5' | 'N4';    // JLPT difficulty level
}

// N5 Kanji (Basic - 80 kanji for JLPT N5)
export const KANJI_N5: KanjiChar[] = [
  { character: '日', meanings: ['day', 'sun', 'Japan'], onyomi: ['nichi', 'jitsu'], kunyomi: ['hi', 'bi', 'ka'], jlptLevel: 'N5' },
  { character: '一', meanings: ['one'], onyomi: ['ichi'], kunyomi: ['hitotsu'], jlptLevel: 'N5' },
  { character: '国', meanings: ['country'], onyomi: ['koku'], kunyomi: ['kuni'], jlptLevel: 'N5' },
  { character: '人', meanings: ['person'], onyomi: ['jin', 'nin'], kunyomi: ['hito'], jlptLevel: 'N5' },
  { character: '年', meanings: ['year'], onyomi: ['nen'], kunyomi: ['toshi'], jlptLevel: 'N5' },
  { character: '大', meanings: ['large', 'big'], onyomi: ['dai', 'tai'], kunyomi: ['ookii'], jlptLevel: 'N5' },
  { character: '十', meanings: ['ten'], onyomi: ['juu'], kunyomi: ['tou', 'to'], jlptLevel: 'N5' },
  { character: '二', meanings: ['two'], onyomi: ['ni', 'ji'], kunyomi: ['futatsu'], jlptLevel: 'N5' },
  { character: '本', meanings: ['book', 'true'], onyomi: ['hon'], kunyomi: ['moto'], jlptLevel: 'N5' },
  { character: '中', meanings: ['in', 'inside', 'middle'], onyomi: ['chuu'], kunyomi: ['naka', 'uchi', 'ataru'], jlptLevel: 'N5' },
  { character: '長', meanings: ['long', 'leader'], onyomi: ['chou'], kunyomi: ['nagai', 'osa'], jlptLevel: 'N5' },
  { character: '出', meanings: ['exit', 'leave'], onyomi: ['shutsu', 'sui'], kunyomi: ['deru', 'dasu'], jlptLevel: 'N5' },
  { character: '三', meanings: ['three'], onyomi: ['san'], kunyomi: ['mittsu'], jlptLevel: 'N5' },
  { character: '時', meanings: ['time', 'hour'], onyomi: ['ji'], kunyomi: ['toki', 'doki'], jlptLevel: 'N5' },
  { character: '行', meanings: ['going', 'journey'], onyomi: ['kou', 'gyou', 'an'], kunyomi: ['iku', 'yuku'], jlptLevel: 'N5' },
  { character: '見', meanings: ['see', 'look at'], onyomi: ['ken'], kunyomi: ['miru', 'miseru'], jlptLevel: 'N5' },
  { character: '月', meanings: ['month', 'moon'], onyomi: ['getsu', 'gatsu'], kunyomi: ['tsuki'], jlptLevel: 'N5' },
  { character: '分', meanings: ['part', 'minute'], onyomi: ['bun', 'fun', 'bu'], kunyomi: ['wakeru'], jlptLevel: 'N5' },
  { character: '後', meanings: ['behind', 'later'], onyomi: ['go', 'kou'], kunyomi: ['nochi', 'ushiro'], jlptLevel: 'N5' },
  { character: '前', meanings: ['in front', 'before'], onyomi: ['zen'], kunyomi: ['mae'], jlptLevel: 'N5' },
  { character: '生', meanings: ['life', 'birth'], onyomi: ['sei', 'shou'], kunyomi: ['ikiru', 'umu'], jlptLevel: 'N5' },
  { character: '五', meanings: ['five'], onyomi: ['go'], kunyomi: ['itsutsu'], jlptLevel: 'N5' },
  { character: '間', meanings: ['interval', 'space'], onyomi: ['kan', 'ken'], kunyomi: ['aida', 'ma'], jlptLevel: 'N5' },
  { character: '上', meanings: ['above', 'up'], onyomi: ['jou', 'shou'], kunyomi: ['ue', 'kami'], jlptLevel: 'N5' },
  { character: '東', meanings: ['east'], onyomi: ['tou'], kunyomi: ['higashi'], jlptLevel: 'N5' },
  { character: '四', meanings: ['four'], onyomi: ['shi'], kunyomi: ['yotsu', 'yon'], jlptLevel: 'N5' },
  { character: '今', meanings: ['now'], onyomi: ['kon', 'kin'], kunyomi: ['ima'], jlptLevel: 'N5' },
  { character: '金', meanings: ['gold'], onyomi: ['kin', 'kon', 'gon'], kunyomi: ['kane', 'kana'], jlptLevel: 'N5' },
  { character: '九', meanings: ['nine'], onyomi: ['kyuu', 'ku'], kunyomi: ['kokonotsu'], jlptLevel: 'N5' },
  { character: '入', meanings: ['enter', 'insert'], onyomi: ['nyuu'], kunyomi: ['iru', 'hairu'], jlptLevel: 'N5' },
  { character: '学', meanings: ['study', 'learning'], onyomi: ['gaku'], kunyomi: ['manabu'], jlptLevel: 'N5' },
  { character: '高', meanings: ['tall', 'high'], onyomi: ['kou'], kunyomi: ['takai'], jlptLevel: 'N5' },
  { character: '円', meanings: ['circle', 'yen'], onyomi: ['en'], kunyomi: ['marui'], jlptLevel: 'N5' },
  { character: '子', meanings: ['child'], onyomi: ['shi', 'su', 'tsu'], kunyomi: ['ko', 'ne'], jlptLevel: 'N5' },
  { character: '外', meanings: ['outside'], onyomi: ['gai', 'ge'], kunyomi: ['soto', 'hoka'], jlptLevel: 'N5' },
  { character: '八', meanings: ['eight'], onyomi: ['hachi'], kunyomi: ['yatsu', 'you'], jlptLevel: 'N5' },
  { character: '六', meanings: ['six'], onyomi: ['roku'], kunyomi: ['mutsu', 'mui'], jlptLevel: 'N5' },
  { character: '下', meanings: ['below', 'down'], onyomi: ['ka', 'ge'], kunyomi: ['shita', 'shimo'], jlptLevel: 'N5' },
  { character: '来', meanings: ['come'], onyomi: ['rai', 'tai'], kunyomi: ['kuru', 'kitaru'], jlptLevel: 'N5' },
  { character: '気', meanings: ['spirit', 'mind', 'air'], onyomi: ['ki', 'ke'], kunyomi: ['iki'], jlptLevel: 'N5' },
  { character: '小', meanings: ['little', 'small'], onyomi: ['shou'], kunyomi: ['chiisai', 'ko', 'o'], jlptLevel: 'N5' },
  { character: '七', meanings: ['seven'], onyomi: ['shichi'], kunyomi: ['nanatsu', 'nano'], jlptLevel: 'N5' },
  { character: '山', meanings: ['mountain'], onyomi: ['san', 'sen'], kunyomi: ['yama'], jlptLevel: 'N5' },
  { character: '話', meanings: ['tale', 'talk'], onyomi: ['wa'], kunyomi: ['hanasu', 'hanashi'], jlptLevel: 'N5' },
  { character: '女', meanings: ['woman', 'female'], onyomi: ['jo'], kunyomi: ['onna', 'me'], jlptLevel: 'N5' },
  { character: '北', meanings: ['north'], onyomi: ['hoku'], kunyomi: ['kita'], jlptLevel: 'N5' },
  { character: '午', meanings: ['noon'], onyomi: ['go'], kunyomi: ['uma'], jlptLevel: 'N5' },
  { character: '百', meanings: ['hundred'], onyomi: ['hyaku', 'byaku'], kunyomi: ['momo'], jlptLevel: 'N5' },
  { character: '書', meanings: ['write'], onyomi: ['sho'], kunyomi: ['kaku'], jlptLevel: 'N5' },
  { character: '先', meanings: ['before', 'ahead'], onyomi: ['sen'], kunyomi: ['saki', 'mazu'], jlptLevel: 'N5' },
  { character: '名', meanings: ['name'], onyomi: ['mei', 'myou'], kunyomi: ['na'], jlptLevel: 'N5' },
  { character: '川', meanings: ['river', 'stream'], onyomi: ['sen'], kunyomi: ['kawa'], jlptLevel: 'N5' },
  { character: '千', meanings: ['thousand'], onyomi: ['sen'], kunyomi: ['chi'], jlptLevel: 'N5' },
  { character: '水', meanings: ['water'], onyomi: ['sui'], kunyomi: ['mizu'], jlptLevel: 'N5' },
  { character: '半', meanings: ['half'], onyomi: ['han'], kunyomi: ['nakaba'], jlptLevel: 'N5' },
  { character: '男', meanings: ['male', 'man'], onyomi: ['dan', 'nan'], kunyomi: ['otoko', 'o'], jlptLevel: 'N5' },
  { character: '西', meanings: ['west'], onyomi: ['sei', 'sai'], kunyomi: ['nishi'], jlptLevel: 'N5' },
  { character: '電', meanings: ['electricity'], onyomi: ['den'], kunyomi: [], jlptLevel: 'N5' },
  { character: '校', meanings: ['school', 'exam'], onyomi: ['kou'], kunyomi: [], jlptLevel: 'N5' },
  { character: '語', meanings: ['word', 'language'], onyomi: ['go'], kunyomi: ['kataru'], jlptLevel: 'N5' },
  { character: '土', meanings: ['soil', 'earth'], onyomi: ['do', 'to'], kunyomi: ['tsuchi'], jlptLevel: 'N5' },
  { character: '木', meanings: ['tree', 'wood'], onyomi: ['boku', 'moku'], kunyomi: ['ki', 'ko'], jlptLevel: 'N5' },
  { character: '聞', meanings: ['to hear', 'listen'], onyomi: ['bun', 'mon'], kunyomi: ['kiku'], jlptLevel: 'N5' },
  { character: '食', meanings: ['eat', 'food'], onyomi: ['shoku', 'jiki'], kunyomi: ['ku', 'taberu'], jlptLevel: 'N5' },
  { character: '車', meanings: ['car', 'wheel'], onyomi: ['sha'], kunyomi: ['kuruma'], jlptLevel: 'N5' },
  { character: '何', meanings: ['what'], onyomi: ['ka'], kunyomi: ['nani', 'nan'], jlptLevel: 'N5' },
  { character: '南', meanings: ['south'], onyomi: ['nan', 'na'], kunyomi: ['minami'], jlptLevel: 'N5' },
  { character: '万', meanings: ['ten thousand'], onyomi: ['man', 'ban'], kunyomi: [], jlptLevel: 'N5' },
  { character: '毎', meanings: ['every'], onyomi: ['mai'], kunyomi: ['gotoni'], jlptLevel: 'N5' },
  { character: '白', meanings: ['white'], onyomi: ['haku', 'byaku'], kunyomi: ['shiroi'], jlptLevel: 'N5' },
  { character: '天', meanings: ['heavens', 'sky'], onyomi: ['ten'], kunyomi: ['amatsu'], jlptLevel: 'N5' },
  { character: '母', meanings: ['mother'], onyomi: ['bo'], kunyomi: ['haha', 'kaa'], jlptLevel: 'N5' },
  { character: '火', meanings: ['fire'], onyomi: ['ka'], kunyomi: ['hi', 'bi', 'ho'], jlptLevel: 'N5' },
  { character: '右', meanings: ['right'], onyomi: ['u', 'yuu'], kunyomi: ['migi'], jlptLevel: 'N5' },
  { character: '読', meanings: ['to read'], onyomi: ['doku', 'toku', 'tou'], kunyomi: ['yomu'], jlptLevel: 'N5' },
  { character: '友', meanings: ['friend'], onyomi: ['yuu'], kunyomi: ['tomo'], jlptLevel: 'N5' },
  { character: '左', meanings: ['left'], onyomi: ['sa', 'sha'], kunyomi: ['hidari'], jlptLevel: 'N5' },
  { character: '休', meanings: ['rest', 'day off'], onyomi: ['kyuu'], kunyomi: ['yasumu'], jlptLevel: 'N5' },
  { character: '父', meanings: ['father'], onyomi: ['fu'], kunyomi: ['chichi', 'tou'], jlptLevel: 'N5' },
  { character: '雨', meanings: ['rain'], onyomi: ['u'], kunyomi: ['ame', 'ama'], jlptLevel: 'N5' },
];

// N4 Kanji (Intermediate - 167 additional kanji for JLPT N4)
export const KANJI_N4: KanjiChar[] = [
  { character: '会', meanings: ['meeting', 'meet'], onyomi: ['kai'], kunyomi: ['au'], jlptLevel: 'N4' },
  { character: '同', meanings: ['same', 'agree', 'equal'], onyomi: ['dou'], kunyomi: ['onaji'], jlptLevel: 'N4' },
  { character: '事', meanings: ['matter', 'thing', 'fact'], onyomi: ['ji'], kunyomi: ['koto'], jlptLevel: 'N4' },
  { character: '自', meanings: ['oneself'], onyomi: ['ji', 'shi'], kunyomi: ['mizukara'], jlptLevel: 'N4' },
  { character: '社', meanings: ['company', 'firm'], onyomi: ['sha'], kunyomi: ['yashiro'], jlptLevel: 'N4' },
  { character: '発', meanings: ['departure', 'discharge'], onyomi: ['hatsu', 'hotsu'], kunyomi: [], jlptLevel: 'N4' },
  { character: '者', meanings: ['someone', 'person'], onyomi: ['sha'], kunyomi: ['mono'], jlptLevel: 'N4' },
  { character: '地', meanings: ['ground', 'earth'], onyomi: ['chi', 'ji'], kunyomi: [], jlptLevel: 'N4' },
  { character: '業', meanings: ['business', 'vocation'], onyomi: ['gyou'], kunyomi: ['waza'], jlptLevel: 'N4' },
  { character: '方', meanings: ['direction', 'person'], onyomi: ['hou'], kunyomi: ['kata'], jlptLevel: 'N4' },
  { character: '新', meanings: ['new'], onyomi: ['shin'], kunyomi: ['atarashii', 'arata', 'nii'], jlptLevel: 'N4' },
  { character: '場', meanings: ['location', 'place'], onyomi: ['jou'], kunyomi: ['ba'], jlptLevel: 'N4' },
  { character: '員', meanings: ['employee', 'member'], onyomi: ['in'], kunyomi: [], jlptLevel: 'N4' },
  { character: '立', meanings: ['stand', 'rise'], onyomi: ['ritsu', 'ryuu'], kunyomi: ['tatsu', 'tateru'], jlptLevel: 'N4' },
  { character: '開', meanings: ['open', 'begin'], onyomi: ['kai'], kunyomi: ['hiraku', 'akeru'], jlptLevel: 'N4' },
  { character: '手', meanings: ['hand'], onyomi: ['shu'], kunyomi: ['te'], jlptLevel: 'N4' },
  { character: '力', meanings: ['power', 'strength'], onyomi: ['ryoku', 'riki'], kunyomi: ['chikara'], jlptLevel: 'N4' },
  { character: '問', meanings: ['question'], onyomi: ['mon'], kunyomi: ['tou'], jlptLevel: 'N4' },
  { character: '代', meanings: ['substitute', 'generation'], onyomi: ['dai', 'tai'], kunyomi: ['kawaru', 'yo', 'shiro'], jlptLevel: 'N4' },
  { character: '明', meanings: ['bright', 'light'], onyomi: ['mei', 'myou'], kunyomi: ['akarui', 'akeru'], jlptLevel: 'N4' },
  { character: '動', meanings: ['move', 'motion'], onyomi: ['dou'], kunyomi: ['ugoku', 'ugokasu'], jlptLevel: 'N4' },
  { character: '京', meanings: ['capital'], onyomi: ['kyou', 'kei'], kunyomi: [], jlptLevel: 'N4' },
  { character: '目', meanings: ['eye', 'class'], onyomi: ['moku', 'boku'], kunyomi: ['me'], jlptLevel: 'N4' },
  { character: '通', meanings: ['pass through', 'commute'], onyomi: ['tsuu', 'tsu'], kunyomi: ['tooru', 'kayou'], jlptLevel: 'N4' },
  { character: '言', meanings: ['say', 'word'], onyomi: ['gen', 'gon'], kunyomi: ['iu', 'koto'], jlptLevel: 'N4' },
  { character: '理', meanings: ['reason', 'logic'], onyomi: ['ri'], kunyomi: [], jlptLevel: 'N4' },
  { character: '体', meanings: ['body'], onyomi: ['tai', 'tei'], kunyomi: ['karada'], jlptLevel: 'N4' },
  { character: '田', meanings: ['rice field'], onyomi: ['den'], kunyomi: ['ta'], jlptLevel: 'N4' },
  { character: '主', meanings: ['main', 'master'], onyomi: ['shu', 'su'], kunyomi: ['nushi', 'omo'], jlptLevel: 'N4' },
  { character: '題', meanings: ['topic', 'title'], onyomi: ['dai'], kunyomi: [], jlptLevel: 'N4' },
  { character: '意', meanings: ['idea', 'mind'], onyomi: ['i'], kunyomi: [], jlptLevel: 'N4' },
  { character: '不', meanings: ['not', 'negative'], onyomi: ['fu', 'bu'], kunyomi: [], jlptLevel: 'N4' },
  { character: '作', meanings: ['make', 'create'], onyomi: ['saku', 'sa'], kunyomi: ['tsukuru'], jlptLevel: 'N4' },
  { character: '用', meanings: ['use', 'business'], onyomi: ['you'], kunyomi: ['mochiru'], jlptLevel: 'N4' },
  { character: '度', meanings: ['degree', 'times'], onyomi: ['do', 'to'], kunyomi: ['tabi'], jlptLevel: 'N4' },
  { character: '強', meanings: ['strong'], onyomi: ['kyou', 'gou'], kunyomi: ['tsuyoi', 'tsuyomaru', 'shiiru'], jlptLevel: 'N4' },
  { character: '公', meanings: ['public', 'prince'], onyomi: ['kou'], kunyomi: ['ooyake'], jlptLevel: 'N4' },
  { character: '持', meanings: ['hold', 'possess'], onyomi: ['ji'], kunyomi: ['motsu'], jlptLevel: 'N4' },
  { character: '野', meanings: ['field', 'plain'], onyomi: ['ya'], kunyomi: ['no'], jlptLevel: 'N4' },
  { character: '以', meanings: ['by means of', 'compared with'], onyomi: ['i'], kunyomi: [], jlptLevel: 'N4' },
  { character: '思', meanings: ['think'], onyomi: ['shi'], kunyomi: ['omou'], jlptLevel: 'N4' },
  { character: '家', meanings: ['house', 'home'], onyomi: ['ka', 'ke'], kunyomi: ['ie', 'ya'], jlptLevel: 'N4' },
  { character: '世', meanings: ['world', 'generation'], onyomi: ['sei', 'se', 'sou'], kunyomi: ['yo'], jlptLevel: 'N4' },
  { character: '多', meanings: ['many', 'frequent'], onyomi: ['ta'], kunyomi: ['ooi'], jlptLevel: 'N4' },
  { character: '正', meanings: ['correct', 'justice'], onyomi: ['sei', 'shou'], kunyomi: ['tadashii', 'tadasu'], jlptLevel: 'N4' },
  { character: '安', meanings: ['cheap', 'peaceful'], onyomi: ['an'], kunyomi: ['yasui'], jlptLevel: 'N4' },
  { character: '院', meanings: ['institution'], onyomi: ['in'], kunyomi: [], jlptLevel: 'N4' },
  { character: '心', meanings: ['heart', 'mind'], onyomi: ['shin'], kunyomi: ['kokoro'], jlptLevel: 'N4' },
  { character: '界', meanings: ['world', 'boundary'], onyomi: ['kai'], kunyomi: [], jlptLevel: 'N4' },
  { character: '教', meanings: ['teach'], onyomi: ['kyou'], kunyomi: ['oshieru'], jlptLevel: 'N4' },
  { character: '文', meanings: ['sentence', 'writing'], onyomi: ['bun', 'mon'], kunyomi: ['fumi'], jlptLevel: 'N4' },
  { character: '元', meanings: ['origin', 'former'], onyomi: ['gen', 'gan'], kunyomi: ['moto'], jlptLevel: 'N4' },
  { character: '重', meanings: ['heavy', 'important'], onyomi: ['juu', 'chou'], kunyomi: ['omoi', 'kasaneru'], jlptLevel: 'N4' },
  { character: '近', meanings: ['near', 'early'], onyomi: ['kin', 'kon'], kunyomi: ['chikai'], jlptLevel: 'N4' },
  { character: '考', meanings: ['think', 'consider'], onyomi: ['kou'], kunyomi: ['kangaeru'], jlptLevel: 'N4' },
  { character: '画', meanings: ['picture', 'drawing'], onyomi: ['ga', 'kaku'], kunyomi: [], jlptLevel: 'N4' },
  { character: '海', meanings: ['sea', 'ocean'], onyomi: ['kai'], kunyomi: ['umi'], jlptLevel: 'N4' },
  { character: '売', meanings: ['sell'], onyomi: ['bai'], kunyomi: ['uru'], jlptLevel: 'N4' },
  { character: '知', meanings: ['know', 'wisdom'], onyomi: ['chi'], kunyomi: ['shiru'], jlptLevel: 'N4' },
  { character: '道', meanings: ['road', 'way'], onyomi: ['dou', 'tou'], kunyomi: ['michi'], jlptLevel: 'N4' },
  { character: '集', meanings: ['gather', 'collect'], onyomi: ['shuu'], kunyomi: ['atsumaru', 'atsumeru', 'tsudou'], jlptLevel: 'N4' },
  { character: '別', meanings: ['separate', 'another'], onyomi: ['betsu'], kunyomi: ['wakareru'], jlptLevel: 'N4' },
  { character: '物', meanings: ['thing', 'object'], onyomi: ['butsu', 'motsu'], kunyomi: ['mono'], jlptLevel: 'N4' },
  { character: '使', meanings: ['use'], onyomi: ['shi'], kunyomi: ['tsukau'], jlptLevel: 'N4' },
  { character: '品', meanings: ['goods', 'article'], onyomi: ['hin'], kunyomi: ['shina'], jlptLevel: 'N4' },
  { character: '計', meanings: ['measure', 'plan'], onyomi: ['kei'], kunyomi: ['hakaru', 'hakarai'], jlptLevel: 'N4' },
  { character: '死', meanings: ['death'], onyomi: ['shi'], kunyomi: ['shinu'], jlptLevel: 'N4' },
  { character: '特', meanings: ['special'], onyomi: ['toku'], kunyomi: [], jlptLevel: 'N4' },
  { character: '私', meanings: ['private', 'I'], onyomi: ['shi'], kunyomi: ['watakushi', 'watashi'], jlptLevel: 'N4' },
  { character: '始', meanings: ['begin', 'start'], onyomi: ['shi'], kunyomi: ['hajimeru', 'hajimaru'], jlptLevel: 'N4' },
  { character: '朝', meanings: ['morning'], onyomi: ['chou'], kunyomi: ['asa'], jlptLevel: 'N4' },
  { character: '運', meanings: ['carry', 'luck'], onyomi: ['un'], kunyomi: ['hakobu'], jlptLevel: 'N4' },
  { character: '終', meanings: ['end', 'finish'], onyomi: ['shuu'], kunyomi: ['owaru', 'oeru'], jlptLevel: 'N4' },
  { character: '台', meanings: ['pedestal', 'a counter for machines'], onyomi: ['dai', 'tai'], kunyomi: [], jlptLevel: 'N4' },
  { character: '広', meanings: ['wide', 'broad'], onyomi: ['kou'], kunyomi: ['hiroi', 'hirogeru', 'hiromaru'], jlptLevel: 'N4' },
  { character: '住', meanings: ['dwell', 'live'], onyomi: ['juu'], kunyomi: ['sumu'], jlptLevel: 'N4' },
  { character: '真', meanings: ['true', 'reality'], onyomi: ['shin'], kunyomi: ['ma'], jlptLevel: 'N4' },
  { character: '有', meanings: ['exist', 'have'], onyomi: ['yuu', 'u'], kunyomi: ['aru'], jlptLevel: 'N4' },
  { character: '口', meanings: ['mouth'], onyomi: ['kou', 'ku'], kunyomi: ['kuchi'], jlptLevel: 'N4' },
  { character: '少', meanings: ['few', 'little'], onyomi: ['shou'], kunyomi: ['sukunai', 'sukoshi'], jlptLevel: 'N4' },
  { character: '町', meanings: ['town', 'street'], onyomi: ['chou'], kunyomi: ['machi'], jlptLevel: 'N4' },
  { character: '料', meanings: ['fee', 'materials'], onyomi: ['ryou'], kunyomi: [], jlptLevel: 'N4' },
  { character: '工', meanings: ['craft', 'construction'], onyomi: ['kou', 'ku'], kunyomi: [], jlptLevel: 'N4' },
  { character: '建', meanings: ['build'], onyomi: ['ken', 'kon'], kunyomi: ['tateru', 'tatsu'], jlptLevel: 'N4' },
  { character: '空', meanings: ['sky', 'empty'], onyomi: ['kuu'], kunyomi: ['sora', 'akeru', 'kara'], jlptLevel: 'N4' },
  { character: '急', meanings: ['hurry', 'emergency'], onyomi: ['kyuu'], kunyomi: ['isogu'], jlptLevel: 'N4' },
  { character: '止', meanings: ['stop'], onyomi: ['shi'], kunyomi: ['tomaru', 'tomeru'], jlptLevel: 'N4' },
  { character: '送', meanings: ['send', 'escort'], onyomi: ['sou'], kunyomi: ['okuru'], jlptLevel: 'N4' },
  { character: '切', meanings: ['cut'], onyomi: ['setsu', 'sai'], kunyomi: ['kiru', 'kireru'], jlptLevel: 'N4' },
  { character: '転', meanings: ['revolve', 'turn'], onyomi: ['ten'], kunyomi: ['korogaru', 'korogeru'], jlptLevel: 'N4' },
  { character: '研', meanings: ['polish', 'study'], onyomi: ['ken'], kunyomi: ['togu'], jlptLevel: 'N4' },
  { character: '足', meanings: ['foot', 'leg'], onyomi: ['soku'], kunyomi: ['ashi', 'tariru', 'tasu'], jlptLevel: 'N4' },
  { character: '究', meanings: ['research'], onyomi: ['kyuu', 'ku'], kunyomi: ['kiwameru'], jlptLevel: 'N4' },
  { character: '楽', meanings: ['music', 'comfort'], onyomi: ['gaku', 'raku'], kunyomi: ['tanoshii', 'tanoshimu'], jlptLevel: 'N4' },
  { character: '起', meanings: ['wake up', 'rouse'], onyomi: ['ki'], kunyomi: ['okiru', 'okosu', 'okoru'], jlptLevel: 'N4' },
  { character: '着', meanings: ['arrive', 'wear'], onyomi: ['chaku', 'jaku'], kunyomi: ['kiru', 'tsuku'], jlptLevel: 'N4' },
  { character: '店', meanings: ['store', 'shop'], onyomi: ['ten'], kunyomi: ['mise'], jlptLevel: 'N4' },
  { character: '病', meanings: ['ill', 'sick'], onyomi: ['byou', 'hei'], kunyomi: ['yamai'], jlptLevel: 'N4' },
  { character: '質', meanings: ['quality', 'nature'], onyomi: ['shitsu', 'shichi'], kunyomi: [], jlptLevel: 'N4' },
  { character: '待', meanings: ['wait', 'depend on'], onyomi: ['tai'], kunyomi: ['matsu'], jlptLevel: 'N4' },
  { character: '試', meanings: ['test', 'try', 'attempt'], onyomi: ['shi'], kunyomi: ['kokoromiru', 'tamesu'], jlptLevel: 'N4' },
  { character: '族', meanings: ['tribe', 'family'], onyomi: ['zoku'], kunyomi: [], jlptLevel: 'N4' },
  { character: '銀', meanings: ['silver'], onyomi: ['gin'], kunyomi: [], jlptLevel: 'N4' },
  { character: '早', meanings: ['early', 'fast'], onyomi: ['sou', 'sa'], kunyomi: ['hayai'], jlptLevel: 'N4' },
  { character: '映', meanings: ['reflect', 'projection'], onyomi: ['ei'], kunyomi: ['utsuru', 'haeru'], jlptLevel: 'N4' },
  { character: '親', meanings: ['parent', 'intimacy'], onyomi: ['shin'], kunyomi: ['oya', 'shitashii'], jlptLevel: 'N4' },
  { character: '験', meanings: ['verification', 'effect'], onyomi: ['ken'], kunyomi: [], jlptLevel: 'N4' },
  { character: '英', meanings: ['England', 'English', 'hero'], onyomi: ['ei'], kunyomi: [], jlptLevel: 'N4' },
  { character: '医', meanings: ['doctor', 'medicine'], onyomi: ['i'], kunyomi: [], jlptLevel: 'N4' },
  { character: '仕', meanings: ['attend', 'serve', 'official'], onyomi: ['shi'], kunyomi: [], jlptLevel: 'N4' },
  { character: '去', meanings: ['gone', 'past', 'quit'], onyomi: ['kyo', 'ko'], kunyomi: ['saru'], jlptLevel: 'N4' },
  { character: '味', meanings: ['flavor', 'taste'], onyomi: ['mi'], kunyomi: ['aji'], jlptLevel: 'N4' },
  { character: '写', meanings: ['copy', 'describe'], onyomi: ['sha'], kunyomi: ['utsusu', 'utsuru'], jlptLevel: 'N4' },
  { character: '字', meanings: ['character', 'letter', 'word'], onyomi: ['ji'], kunyomi: [], jlptLevel: 'N4' },
  { character: '答', meanings: ['solution', 'answer'], onyomi: ['tou'], kunyomi: ['kotaeru'], jlptLevel: 'N4' },
  { character: '夜', meanings: ['night', 'evening'], onyomi: ['ya'], kunyomi: ['yo', 'yoru'], jlptLevel: 'N4' },
  { character: '音', meanings: ['sound', 'noise'], onyomi: ['on'], kunyomi: ['oto', 'ne'], jlptLevel: 'N4' },
  { character: '注', meanings: ['pour', 'concentrate on'], onyomi: ['chuu'], kunyomi: ['sosogu', 'sasu'], jlptLevel: 'N4' },
  { character: '帰', meanings: ['homecoming', 'arrive'], onyomi: ['ki'], kunyomi: ['kaeru', 'kaesu'], jlptLevel: 'N4' },
  { character: '古', meanings: ['old'], onyomi: ['ko'], kunyomi: ['furui'], jlptLevel: 'N4' },
  { character: '歌', meanings: ['song', 'sing'], onyomi: ['ka'], kunyomi: ['uta', 'utau'], jlptLevel: 'N4' },
  { character: '買', meanings: ['buy'], onyomi: ['bai'], kunyomi: ['kau'], jlptLevel: 'N4' },
  { character: '悪', meanings: ['bad', 'evil', 'wrong'], onyomi: ['aku'], kunyomi: ['warui'], jlptLevel: 'N4' },
  { character: '図', meanings: ['map', 'drawing', 'plan'], onyomi: ['zu', 'to'], kunyomi: ['hakaru'], jlptLevel: 'N4' },
  { character: '週', meanings: ['week'], onyomi: ['shuu'], kunyomi: [], jlptLevel: 'N4' },
  { character: '室', meanings: ['room', 'chamber'], onyomi: ['shitsu'], kunyomi: ['muro'], jlptLevel: 'N4' },
  { character: '歩', meanings: ['walk', 'counter for steps'], onyomi: ['ho', 'bu'], kunyomi: ['aruku', 'ayumu'], jlptLevel: 'N4' },
  { character: '風', meanings: ['wind', 'style', 'manner'], onyomi: ['fuu', 'fu'], kunyomi: ['kaze', 'kaza'], jlptLevel: 'N4' },
  { character: '紙', meanings: ['paper'], onyomi: ['shi'], kunyomi: ['kami'], jlptLevel: 'N4' },
  { character: '黒', meanings: ['black'], onyomi: ['koku'], kunyomi: ['kuro'], jlptLevel: 'N4' },
  { character: '花', meanings: ['flower'], onyomi: ['ka', 'ke'], kunyomi: ['hana'], jlptLevel: 'N4' },
  { character: '春', meanings: ['spring'], onyomi: ['shun'], kunyomi: ['haru'], jlptLevel: 'N4' },
  { character: '赤', meanings: ['red'], onyomi: ['seki', 'shaku'], kunyomi: ['akai'], jlptLevel: 'N4' },
  { character: '青', meanings: ['blue'], onyomi: ['sei', 'shou'], kunyomi: ['aoi'], jlptLevel: 'N4' },
  { character: '館', meanings: ['building', 'mansion'], onyomi: ['kan'], kunyomi: ['yakata'], jlptLevel: 'N4' },
  { character: '屋', meanings: ['roof', 'house', 'shop'], onyomi: ['oku'], kunyomi: ['ya'], jlptLevel: 'N4' },
  { character: '色', meanings: ['color'], onyomi: ['shoku', 'shiki'], kunyomi: ['iro'], jlptLevel: 'N4' },
  { character: '走', meanings: ['run'], onyomi: ['sou'], kunyomi: ['hashiru'], jlptLevel: 'N4' },
  { character: '秋', meanings: ['autumn', 'fall'], onyomi: ['shuu'], kunyomi: ['aki'], jlptLevel: 'N4' },
  { character: '夏', meanings: ['summer'], onyomi: ['ka', 'ge'], kunyomi: ['natsu'], jlptLevel: 'N4' },
  { character: '習', meanings: ['learn'], onyomi: ['shuu'], kunyomi: ['narau'], jlptLevel: 'N4' },
  { character: '駅', meanings: ['station'], onyomi: ['eki'], kunyomi: [], jlptLevel: 'N4' },
  { character: '洋', meanings: ['ocean', 'foreign'], onyomi: ['you'], kunyomi: [], jlptLevel: 'N4' },
  { character: '旅', meanings: ['trip', 'travel'], onyomi: ['ryo'], kunyomi: ['tabi'], jlptLevel: 'N4' },
  { character: '服', meanings: ['clothing', 'obey'], onyomi: ['fuku'], kunyomi: [], jlptLevel: 'N4' },
  { character: '夕', meanings: ['evening'], onyomi: [], kunyomi: ['yuu'], jlptLevel: 'N4' },
  { character: '借', meanings: ['borrow', 'rent'], onyomi: ['shaku'], kunyomi: ['kariru'], jlptLevel: 'N4' },
  { character: '曜', meanings: ['weekday'], onyomi: ['you'], kunyomi: [], jlptLevel: 'N4' },
  { character: '飲', meanings: ['drink'], onyomi: ['in'], kunyomi: ['nomu'], jlptLevel: 'N4' },
  { character: '肉', meanings: ['meat'], onyomi: ['niku'], kunyomi: [], jlptLevel: 'N4' },
  { character: '貸', meanings: ['lend'], onyomi: ['tai'], kunyomi: ['kasu', 'kashi'], jlptLevel: 'N4' },
  { character: '堂', meanings: ['hall', 'public chamber'], onyomi: ['dou'], kunyomi: [], jlptLevel: 'N4' },
  { character: '鳥', meanings: ['bird', 'chicken'], onyomi: ['chou'], kunyomi: ['tori'], jlptLevel: 'N4' },
  { character: '飯', meanings: ['meal', 'rice'], onyomi: ['han'], kunyomi: ['meshi'], jlptLevel: 'N4' },
  { character: '勉', meanings: ['effort', 'endeavor'], onyomi: ['ben'], kunyomi: ['tsutomeru'], jlptLevel: 'N4' },
  { character: '冬', meanings: ['winter'], onyomi: ['tou'], kunyomi: ['fuyu'], jlptLevel: 'N4' },
  { character: '昼', meanings: ['daytime', 'noon'], onyomi: ['chuu'], kunyomi: ['hiru'], jlptLevel: 'N4' },
  { character: '茶', meanings: ['tea'], onyomi: ['cha', 'sa'], kunyomi: [], jlptLevel: 'N4' },
  { character: '弟', meanings: ['younger brother'], onyomi: ['tei', 'dai', 'de'], kunyomi: ['otouto'], jlptLevel: 'N4' },
  { character: '牛', meanings: ['cow'], onyomi: ['gyuu'], kunyomi: ['ushi'], jlptLevel: 'N4' },
  { character: '魚', meanings: ['fish'], onyomi: ['gyo'], kunyomi: ['uo', 'sakana'], jlptLevel: 'N4' },
  { character: '兄', meanings: ['elder brother'], onyomi: ['kyou', 'kei'], kunyomi: ['ani'], jlptLevel: 'N4' },
  { character: '犬', meanings: ['dog'], onyomi: ['ken'], kunyomi: ['inu'], jlptLevel: 'N4' },
  { character: '妹', meanings: ['younger sister'], onyomi: ['mai'], kunyomi: ['imouto'], jlptLevel: 'N4' },
  { character: '姉', meanings: ['elder sister'], onyomi: ['shi'], kunyomi: ['ane'], jlptLevel: 'N4' },
  { character: '漢', meanings: ['China'], onyomi: ['kan'], kunyomi: [], jlptLevel: 'N4' },
];

// Cumulative arrays (N4 includes all N5 kanji)
export const ALL_KANJI_N5 = KANJI_N5;
export const ALL_KANJI_N4 = [...KANJI_N5, ...KANJI_N4];

/**
 * Find a kanji by its character
 *
 * @param character - The kanji character to find
 * @returns The kanji object if found, undefined otherwise
 */
export function findKanji(character: string): KanjiChar | undefined {
  return ALL_KANJI_N4.find(k => k.character === character);
}

/**
 * Get all kanji for a specific JLPT level
 *
 * @param level - The JLPT level ('N5' or 'N4')
 * @param includeN5 - For N4: include N5 kanji (true, default) or N4-only (false). Ignored for N5.
 * @returns Array of kanji for that level
 */
export function getKanjiByLevel(level: 'N5' | 'N4', includeN5: boolean = true): KanjiChar[] {
  if (level === 'N5') {
    return ALL_KANJI_N5;
  } else {
    // N4: return combined or N4-only based on includeN5 flag
    return includeN5 ? ALL_KANJI_N4 : KANJI_N4;
  }
}

/**
 * Get random kanji from a specific JLPT level
 *
 * @param level - The JLPT level ('N5' or 'N4')
 * @param count - Number of random kanji to select
 * @returns Array of randomly selected kanji (may contain duplicates for small pools)
 */
export function getRandomKanji(level: 'N5' | 'N4', count: number): KanjiChar[] {
  const pool = getKanjiByLevel(level);
  const results: KanjiChar[] = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    results.push(pool[randomIndex]);
  }

  return results;
}

/**
 * Get total count of kanji for a level
 *
 * @param level - The JLPT level ('N5' or 'N4')
 * @param includeN5 - For N4: include N5 kanji (true, default) or N4-only (false)
 */
export function getKanjiCount(level: 'N5' | 'N4', includeN5: boolean = true): number {
  return getKanjiByLevel(level, includeN5).length;
}

/**
 * Check if a string is a kanji character (basic check)
 */
export function isKanji(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  // Common CJK Unified Ideographs range
  return (code >= 0x4E00 && code <= 0x9FFF);
}
