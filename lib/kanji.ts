/**
 * Kanji Database
 *
 * JLPT-based kanji organized by difficulty level (N5 and N4).
 * Each kanji includes meanings, onyomi (Chinese readings), and kunyomi (Japanese readings).
 *
 * Data source: Common JLPT study materials and authentic Japanese language resources
 */

export interface KanjiChar {
  character: string;           // The kanji character
  meanings: string[];          // English meanings
  onyomi: string[];           // Chinese-derived readings (katakana → romanji)
  kunyomi: string[];          // Native Japanese readings (hiragana → romanji)
  jlptLevel: 'N5' | 'N4';    // JLPT difficulty level
}

// N5 Kanji (Basic - ~100 kanji in full JLPT N5, this is a curated sample of 30)
export const KANJI_N5: KanjiChar[] = [
  // Numbers and time
  { character: '一', meanings: ['one'], onyomi: ['ichi'], kunyomi: ['hito', 'hitotsu'], jlptLevel: 'N5' },
  { character: '二', meanings: ['two'], onyomi: ['ni'], kunyomi: ['futa', 'futatsu'], jlptLevel: 'N5' },
  { character: '三', meanings: ['three'], onyomi: ['san'], kunyomi: ['mi', 'mittsu'], jlptLevel: 'N5' },
  { character: '四', meanings: ['four'], onyomi: ['shi'], kunyomi: ['yo', 'yottsu', 'yon'], jlptLevel: 'N5' },
  { character: '五', meanings: ['five'], onyomi: ['go'], kunyomi: ['itsu', 'itsutsu'], jlptLevel: 'N5' },
  { character: '六', meanings: ['six'], onyomi: ['roku'], kunyomi: ['mu', 'muttsu'], jlptLevel: 'N5' },
  { character: '七', meanings: ['seven'], onyomi: ['shichi'], kunyomi: ['nana', 'nanatsu'], jlptLevel: 'N5' },
  { character: '八', meanings: ['eight'], onyomi: ['hachi'], kunyomi: ['ya', 'yattsu'], jlptLevel: 'N5' },
  { character: '九', meanings: ['nine'], onyomi: ['ku', 'kyū'], kunyomi: ['kokono', 'kokonotsu'], jlptLevel: 'N5' },
  { character: '十', meanings: ['ten'], onyomi: ['jū'], kunyomi: ['tō'], jlptLevel: 'N5' },
  { character: '百', meanings: ['hundred'], onyomi: ['hyaku'], kunyomi: [], jlptLevel: 'N5' },
  { character: '千', meanings: ['thousand'], onyomi: ['sen'], kunyomi: ['chi'], jlptLevel: 'N5' },
  { character: '万', meanings: ['ten thousand'], onyomi: ['man'], kunyomi: [], jlptLevel: 'N5' },

  // Time and calendar
  { character: '日', meanings: ['sun', 'day'], onyomi: ['nichi', 'jitsu'], kunyomi: ['hi', 'ka'], jlptLevel: 'N5' },
  { character: '月', meanings: ['moon', 'month'], onyomi: ['getsu', 'gatsu'], kunyomi: ['tsuki'], jlptLevel: 'N5' },
  { character: '火', meanings: ['fire', 'Tuesday'], onyomi: ['ka'], kunyomi: ['hi'], jlptLevel: 'N5' },
  { character: '水', meanings: ['water', 'Wednesday'], onyomi: ['sui'], kunyomi: ['mizu'], jlptLevel: 'N5' },
  { character: '木', meanings: ['tree', 'wood', 'Thursday'], onyomi: ['moku', 'boku'], kunyomi: ['ki'], jlptLevel: 'N5' },
  { character: '金', meanings: ['gold', 'money', 'Friday'], onyomi: ['kin'], kunyomi: ['kane'], jlptLevel: 'N5' },
  { character: '土', meanings: ['soil', 'earth', 'Saturday'], onyomi: ['do', 'to'], kunyomi: ['tsuchi'], jlptLevel: 'N5' },
  { character: '年', meanings: ['year'], onyomi: ['nen'], kunyomi: ['toshi'], jlptLevel: 'N5' },
  { character: '時', meanings: ['time', 'hour'], onyomi: ['ji'], kunyomi: ['toki'], jlptLevel: 'N5' },

  // People and body
  { character: '人', meanings: ['person', 'people'], onyomi: ['jin', 'nin'], kunyomi: ['hito'], jlptLevel: 'N5' },
  { character: '男', meanings: ['male', 'man'], onyomi: ['dan', 'nan'], kunyomi: ['otoko'], jlptLevel: 'N5' },
  { character: '女', meanings: ['female', 'woman'], onyomi: ['jo', 'nyo'], kunyomi: ['onna'], jlptLevel: 'N5' },
  { character: '子', meanings: ['child'], onyomi: ['shi', 'su'], kunyomi: ['ko'], jlptLevel: 'N5' },
  { character: '目', meanings: ['eye'], onyomi: ['moku', 'boku'], kunyomi: ['me'], jlptLevel: 'N5' },
  { character: '耳', meanings: ['ear'], onyomi: ['ji'], kunyomi: ['mimi'], jlptLevel: 'N5' },
  { character: '手', meanings: ['hand'], onyomi: ['shu'], kunyomi: ['te'], jlptLevel: 'N5' },
  { character: '足', meanings: ['foot', 'leg'], onyomi: ['soku'], kunyomi: ['ashi', 'ta'], jlptLevel: 'N5' },
];

// N4 Kanji (Intermediate - ~300 additional kanji in full JLPT N4, this is a curated sample of 30)
export const KANJI_N4: KanjiChar[] = [
  // Nature and environment
  { character: '春', meanings: ['spring'], onyomi: ['shun'], kunyomi: ['haru'], jlptLevel: 'N4' },
  { character: '夏', meanings: ['summer'], onyomi: ['ka', 'ge'], kunyomi: ['natsu'], jlptLevel: 'N4' },
  { character: '秋', meanings: ['autumn', 'fall'], onyomi: ['shū'], kunyomi: ['aki'], jlptLevel: 'N4' },
  { character: '冬', meanings: ['winter'], onyomi: ['tō'], kunyomi: ['fuyu'], jlptLevel: 'N4' },
  { character: '雨', meanings: ['rain'], onyomi: ['u'], kunyomi: ['ame'], jlptLevel: 'N4' },
  { character: '雪', meanings: ['snow'], onyomi: ['setsu'], kunyomi: ['yuki'], jlptLevel: 'N4' },
  { character: '風', meanings: ['wind'], onyomi: ['fū'], kunyomi: ['kaze'], jlptLevel: 'N4' },
  { character: '雲', meanings: ['cloud'], onyomi: ['un'], kunyomi: ['kumo'], jlptLevel: 'N4' },
  { character: '空', meanings: ['sky', 'empty'], onyomi: ['kū'], kunyomi: ['sora', 'kara'], jlptLevel: 'N4' },
  { character: '海', meanings: ['sea', 'ocean'], onyomi: ['kai'], kunyomi: ['umi'], jlptLevel: 'N4' },
  { character: '山', meanings: ['mountain'], onyomi: ['san', 'zan'], kunyomi: ['yama'], jlptLevel: 'N4' },
  { character: '川', meanings: ['river'], onyomi: ['sen'], kunyomi: ['kawa'], jlptLevel: 'N4' },

  // Learning and work
  { character: '勉', meanings: ['exertion', 'study'], onyomi: ['ben'], kunyomi: [], jlptLevel: 'N4' },
  { character: '強', meanings: ['strong'], onyomi: ['kyō', 'gō'], kunyomi: ['tsuyoi', 'shiiru'], jlptLevel: 'N4' },
  { character: '図', meanings: ['diagram', 'map'], onyomi: ['zu', 'to'], kunyomi: ['hakaru'], jlptLevel: 'N4' },
  { character: '書', meanings: ['write'], onyomi: ['sho'], kunyomi: ['kaku'], jlptLevel: 'N4' },
  { character: '読', meanings: ['read'], onyomi: ['doku', 'toku'], kunyomi: ['yomu'], jlptLevel: 'N4' },
  { character: '話', meanings: ['talk', 'speak'], onyomi: ['wa'], kunyomi: ['hanasu', 'hanashi'], jlptLevel: 'N4' },
  { character: '聞', meanings: ['hear', 'listen', 'ask'], onyomi: ['bun', 'mon'], kunyomi: ['kiku'], jlptLevel: 'N4' },
  { character: '考', meanings: ['think', 'consider'], onyomi: ['kō'], kunyomi: ['kangaeru'], jlptLevel: 'N4' },
  { character: '教', meanings: ['teach'], onyomi: ['kyō'], kunyomi: ['oshieru'], jlptLevel: 'N4' },

  // Daily life
  { character: '朝', meanings: ['morning'], onyomi: ['chō'], kunyomi: ['asa'], jlptLevel: 'N4' },
  { character: '昼', meanings: ['noon', 'daytime'], onyomi: ['chū'], kunyomi: ['hiru'], jlptLevel: 'N4' },
  { character: '夜', meanings: ['night', 'evening'], onyomi: ['ya'], kunyomi: ['yoru'], jlptLevel: 'N4' },
  { character: '家', meanings: ['house', 'home', 'family'], onyomi: ['ka', 'ke'], kunyomi: ['ie', 'ya'], jlptLevel: 'N4' },
  { character: '部', meanings: ['part', 'section', 'department'], onyomi: ['bu'], kunyomi: [], jlptLevel: 'N4' },
  { character: '屋', meanings: ['shop', 'store', 'roof'], onyomi: ['oku'], kunyomi: ['ya'], jlptLevel: 'N4' },
  { character: '室', meanings: ['room'], onyomi: ['shitsu'], kunyomi: ['muro'], jlptLevel: 'N4' },
  { character: '門', meanings: ['gate'], onyomi: ['mon'], kunyomi: ['kado'], jlptLevel: 'N4' },
  { character: '駅', meanings: ['station'], onyomi: ['eki'], kunyomi: [], jlptLevel: 'N4' },
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
