/**
 * Vocabulary Database
 *
 * JLPT-based vocabulary organized by difficulty level (N5 and N4).
 * Each word includes kanji form, kana reading, romanji variants, and English meaning.
 *
 * Data source: Common JLPT study materials and authentic Japanese language resources
 */

export interface VocabularyWord {
  word: string;               // Kanji form (may include kana)
  kana: string;              // Full hiragana reading
  romanji: string[];         // Romanji variants (accepts multiple spellings)
  meaning: string;           // English meaning
  jlptLevel: 'N5' | 'N4';   // JLPT difficulty level
}

// N5 Vocabulary (Basic - ~800 words in full JLPT N5, this is a curated sample of 40)
export const VOCABULARY_N5: VocabularyWord[] = [
  // Countries and places
  { word: '日本', kana: 'にほん', romanji: ['nihon', 'nippon'], meaning: 'Japan', jlptLevel: 'N5' },
  { word: 'アメリカ', kana: 'あめりか', romanji: ['amerika'], meaning: 'America', jlptLevel: 'N5' },
  { word: '中国', kana: 'ちゅうごく', romanji: ['chūgoku', 'chuugoku'], meaning: 'China', jlptLevel: 'N5' },
  { word: '韓国', kana: 'かんこく', romanji: ['kankoku'], meaning: 'Korea', jlptLevel: 'N5' },
  { word: '東京', kana: 'とうきょう', romanji: ['tōkyō', 'toukyou', 'tokyo'], meaning: 'Tokyo', jlptLevel: 'N5' },

  // School and learning
  { word: '学校', kana: 'がっこう', romanji: ['gakkō', 'gakkou'], meaning: 'school', jlptLevel: 'N5' },
  { word: '大学', kana: 'だいがく', romanji: ['daigaku'], meaning: 'university', jlptLevel: 'N5' },
  { word: '先生', kana: 'せんせい', romanji: ['sensei'], meaning: 'teacher', jlptLevel: 'N5' },
  { word: '学生', kana: 'がくせい', romanji: ['gakusei'], meaning: 'student', jlptLevel: 'N5' },
  { word: '勉強', kana: 'べんきょう', romanji: ['benkyō', 'benkyou'], meaning: 'study', jlptLevel: 'N5' },

  // Time expressions
  { word: '今日', kana: 'きょう', romanji: ['kyō', 'kyou'], meaning: 'today', jlptLevel: 'N5' },
  { word: '明日', kana: 'あした', romanji: ['ashita'], meaning: 'tomorrow', jlptLevel: 'N5' },
  { word: '昨日', kana: 'きのう', romanji: ['kinō', 'kinou'], meaning: 'yesterday', jlptLevel: 'N5' },
  { word: '毎日', kana: 'まいにち', romanji: ['mainichi'], meaning: 'every day', jlptLevel: 'N5' },
  { word: '今年', kana: 'ことし', romanji: ['kotoshi'], meaning: 'this year', jlptLevel: 'N5' },
  { word: '去年', kana: 'きょねん', romanji: ['kyonen'], meaning: 'last year', jlptLevel: 'N5' },

  // Family
  { word: '家族', kana: 'かぞく', romanji: ['kazoku'], meaning: 'family', jlptLevel: 'N5' },
  { word: '父', kana: 'ちち', romanji: ['chichi'], meaning: 'father', jlptLevel: 'N5' },
  { word: '母', kana: 'はは', romanji: ['haha'], meaning: 'mother', jlptLevel: 'N5' },
  { word: '兄', kana: 'あに', romanji: ['ani'], meaning: 'older brother', jlptLevel: 'N5' },
  { word: '姉', kana: 'あね', romanji: ['ane'], meaning: 'older sister', jlptLevel: 'N5' },
  { word: '弟', kana: 'おとうと', romanji: ['otōto', 'otouto'], meaning: 'younger brother', jlptLevel: 'N5' },
  { word: '妹', kana: 'いもうと', romanji: ['imōto', 'imouto'], meaning: 'younger sister', jlptLevel: 'N5' },

  // Food and dining
  { word: '食べ物', kana: 'たべもの', romanji: ['tabemono'], meaning: 'food', jlptLevel: 'N5' },
  { word: '飲み物', kana: 'のみもの', romanji: ['nomimono'], meaning: 'beverage', jlptLevel: 'N5' },
  { word: 'ご飯', kana: 'ごはん', romanji: ['gohan'], meaning: 'rice/meal', jlptLevel: 'N5' },
  { word: '水', kana: 'みず', romanji: ['mizu'], meaning: 'water', jlptLevel: 'N5' },
  { word: 'お茶', kana: 'おちゃ', romanji: ['ocha'], meaning: 'tea', jlptLevel: 'N5' },
  { word: '料理', kana: 'りょうり', romanji: ['ryōri', 'ryouri'], meaning: 'cooking/cuisine', jlptLevel: 'N5' },

  // Daily life
  { word: '時間', kana: 'じかん', romanji: ['jikan'], meaning: 'time', jlptLevel: 'N5' },
  { word: '天気', kana: 'てんき', romanji: ['tenki'], meaning: 'weather', jlptLevel: 'N5' },
  { word: '電話', kana: 'でんわ', romanji: ['denwa'], meaning: 'telephone', jlptLevel: 'N5' },
  { word: '写真', kana: 'しゃしん', romanji: ['shashin'], meaning: 'photograph', jlptLevel: 'N5' },
  { word: '映画', kana: 'えいが', romanji: ['eiga'], meaning: 'movie', jlptLevel: 'N5' },
  { word: '音楽', kana: 'おんがく', romanji: ['ongaku'], meaning: 'music', jlptLevel: 'N5' },

  // Actions and verbs (in noun form)
  { word: '仕事', kana: 'しごと', romanji: ['shigoto'], meaning: 'work/job', jlptLevel: 'N5' },
  { word: '買い物', kana: 'かいもの', romanji: ['kaimono'], meaning: 'shopping', jlptLevel: 'N5' },
  { word: '散歩', kana: 'さんぽ', romanji: ['sanpo'], meaning: 'walk', jlptLevel: 'N5' },
  { word: '旅行', kana: 'りょこう', romanji: ['ryokō', 'ryokou'], meaning: 'travel', jlptLevel: 'N5' },
  { word: '生活', kana: 'せいかつ', romanji: ['seikatsu'], meaning: 'life/living', jlptLevel: 'N5' },
];

// N4 Vocabulary (Intermediate - ~1500 additional words in full JLPT N4, this is a curated sample of 40)
export const VOCABULARY_N4: VocabularyWord[] = [
  // Nature and seasons
  { word: '自然', kana: 'しぜん', romanji: ['shizen'], meaning: 'nature', jlptLevel: 'N4' },
  { word: '季節', kana: 'きせつ', romanji: ['kisetsu'], meaning: 'season', jlptLevel: 'N4' },
  { word: '春', kana: 'はる', romanji: ['haru'], meaning: 'spring', jlptLevel: 'N4' },
  { word: '夏', kana: 'なつ', romanji: ['natsu'], meaning: 'summer', jlptLevel: 'N4' },
  { word: '秋', kana: 'あき', romanji: ['aki'], meaning: 'autumn', jlptLevel: 'N4' },
  { word: '冬', kana: 'ふゆ', romanji: ['fuyu'], meaning: 'winter', jlptLevel: 'N4' },
  { word: '空気', kana: 'くうき', romanji: ['kūki', 'kuuki'], meaning: 'air', jlptLevel: 'N4' },
  { word: '森', kana: 'もり', romanji: ['mori'], meaning: 'forest', jlptLevel: 'N4' },

  // Society and relationships
  { word: '社会', kana: 'しゃかい', romanji: ['shakai'], meaning: 'society', jlptLevel: 'N4' },
  { word: '会社', kana: 'かいしゃ', romanji: ['kaisha'], meaning: 'company', jlptLevel: 'N4' },
  { word: '友達', kana: 'ともだち', romanji: ['tomodachi'], meaning: 'friend', jlptLevel: 'N4' },
  { word: '恋人', kana: 'こいびと', romanji: ['koibito'], meaning: 'lover/boyfriend/girlfriend', jlptLevel: 'N4' },
  { word: '結婚', kana: 'けっこん', romanji: ['kekkon'], meaning: 'marriage', jlptLevel: 'N4' },
  { word: '離婚', kana: 'りこん', romanji: ['rikon'], meaning: 'divorce', jlptLevel: 'N4' },

  // Education and work
  { word: '教育', kana: 'きょういく', romanji: ['kyōiku', 'kyouiku'], meaning: 'education', jlptLevel: 'N4' },
  { word: '試験', kana: 'しけん', romanji: ['shiken'], meaning: 'exam/test', jlptLevel: 'N4' },
  { word: '成績', kana: 'せいせき', romanji: ['seiseki'], meaning: 'grade/results', jlptLevel: 'N4' },
  { word: '卒業', kana: 'そつぎょう', romanji: ['sotsugyō', 'sotsugyou'], meaning: 'graduation', jlptLevel: 'N4' },
  { word: '会議', kana: 'かいぎ', romanji: ['kaigi'], meaning: 'meeting/conference', jlptLevel: 'N4' },
  { word: '給料', kana: 'きゅうりょう', romanji: ['kyūryō', 'kyuuryou'], meaning: 'salary', jlptLevel: 'N4' },

  // Transportation
  { word: '交通', kana: 'こうつう', romanji: ['kōtsū', 'koutsuu'], meaning: 'traffic/transportation', jlptLevel: 'N4' },
  { word: '電車', kana: 'でんしゃ', romanji: ['densha'], meaning: 'train', jlptLevel: 'N4' },
  { word: '地下鉄', kana: 'ちかてつ', romanji: ['chikatetsu'], meaning: 'subway', jlptLevel: 'N4' },
  { word: '新幹線', kana: 'しんかんせん', romanji: ['shinkansen'], meaning: 'bullet train', jlptLevel: 'N4' },
  { word: '空港', kana: 'くうこう', romanji: ['kūkō', 'kuukou'], meaning: 'airport', jlptLevel: 'N4' },
  { word: '飛行機', kana: 'ひこうき', romanji: ['hikōki', 'hikouki'], meaning: 'airplane', jlptLevel: 'N4' },

  // Health and body
  { word: '健康', kana: 'けんこう', romanji: ['kenkō', 'kenkou'], meaning: 'health', jlptLevel: 'N4' },
  { word: '病気', kana: 'びょうき', romanji: ['byōki', 'byouki'], meaning: 'illness/disease', jlptLevel: 'N4' },
  { word: '医者', kana: 'いしゃ', romanji: ['isha'], meaning: 'doctor', jlptLevel: 'N4' },
  { word: '病院', kana: 'びょういん', romanji: ['byōin', 'byouin'], meaning: 'hospital', jlptLevel: 'N4' },
  { word: '薬', kana: 'くすり', romanji: ['kusuri'], meaning: 'medicine', jlptLevel: 'N4' },

  // Abstract concepts
  { word: '意味', kana: 'いみ', romanji: ['imi'], meaning: 'meaning', jlptLevel: 'N4' },
  { word: '理由', kana: 'りゆう', romanji: ['riyū', 'riyuu'], meaning: 'reason', jlptLevel: 'N4' },
  { word: '経験', kana: 'けいけん', romanji: ['keiken'], meaning: 'experience', jlptLevel: 'N4' },
  { word: '文化', kana: 'ぶんか', romanji: ['bunka'], meaning: 'culture', jlptLevel: 'N4' },
  { word: '歴史', kana: 'れきし', romanji: ['rekishi'], meaning: 'history', jlptLevel: 'N4' },
  { word: '将来', kana: 'しょうらい', romanji: ['shōrai', 'shourai'], meaning: 'future', jlptLevel: 'N4' },
  { word: '過去', kana: 'かこ', romanji: ['kako'], meaning: 'past', jlptLevel: 'N4' },
  { word: '現在', kana: 'げんざい', romanji: ['genzai'], meaning: 'present/current', jlptLevel: 'N4' },
  { word: '問題', kana: 'もんだい', romanji: ['mondai'], meaning: 'problem/question', jlptLevel: 'N4' },
];

// Cumulative arrays (N4 includes all N5 vocabulary)
export const ALL_VOCABULARY_N5 = VOCABULARY_N5;
export const ALL_VOCABULARY_N4 = [...VOCABULARY_N5, ...VOCABULARY_N4];

/**
 * Find a vocabulary word by its kanji form
 *
 * @param word - The word to find (in kanji)
 * @returns The vocabulary object if found, undefined otherwise
 */
export function findVocabulary(word: string): VocabularyWord | undefined {
  return ALL_VOCABULARY_N4.find(v => v.word === word);
}

/**
 * Get all vocabulary for a specific JLPT level
 *
 * @param level - The JLPT level ('N5' or 'N4')
 * @param includeN5 - For N4: include N5 vocabulary (true, default) or N4-only (false). Ignored for N5.
 * @returns Array of vocabulary for that level
 */
export function getVocabularyByLevel(level: 'N5' | 'N4', includeN5: boolean = true): VocabularyWord[] {
  if (level === 'N5') {
    return ALL_VOCABULARY_N5;
  } else {
    // N4: return combined or N4-only based on includeN5 flag
    return includeN5 ? ALL_VOCABULARY_N4 : VOCABULARY_N4;
  }
}

/**
 * Get random vocabulary from a specific JLPT level
 *
 * @param level - The JLPT level ('N5' or 'N4')
 * @param count - Number of random vocabulary words to select
 * @returns Array of randomly selected vocabulary (may contain duplicates for small pools)
 */
export function getRandomVocabulary(level: 'N5' | 'N4', count: number): VocabularyWord[] {
  const pool = getVocabularyByLevel(level);
  const results: VocabularyWord[] = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    results.push(pool[randomIndex]);
  }

  return results;
}

/**
 * Get total count of vocabulary for a level
 *
 * @param level - The JLPT level ('N5' or 'N4')
 * @param includeN5 - For N4: include N5 vocabulary (true, default) or N4-only (false)
 */
export function getVocabularyCount(level: 'N5' | 'N4', includeN5: boolean = true): number {
  return getVocabularyByLevel(level, includeN5).length;
}

/**
 * Search vocabulary by meaning (case-insensitive, partial match)
 */
export function searchVocabularyByMeaning(query: string): VocabularyWord[] {
  const lowerQuery = query.toLowerCase();
  return ALL_VOCABULARY_N4.filter(v =>
    v.meaning.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Search vocabulary by romanji (case-insensitive, exact match)
 */
export function searchVocabularyByRomanji(query: string): VocabularyWord[] {
  const lowerQuery = query.toLowerCase();
  return ALL_VOCABULARY_N4.filter(v =>
    v.romanji.some(r => r.toLowerCase() === lowerQuery)
  );
}
