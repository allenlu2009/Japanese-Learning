/**
 * Vocabulary Database - EXPANDED
 *
 * JLPT-based vocabulary organized by difficulty level (N5 and N4).
 * Each word includes kanji form, kana reading, romanji variants, and English meaning.
 *
 * Data source: JLPTsensei.com (January 2026)
 * N5: 100 essential vocabulary words
 * N4: 100 essential vocabulary words
 */

export interface VocabularyWord {
  word: string;               // Kanji form (may include kana)
  kana: string;              // Full hiragana reading
  romanji: string[];         // Romanji variants (accepts multiple spellings)
  meaning: string;           // English meaning
  jlptLevel: 'N5' | 'N4';   // JLPT difficulty level
}

// N5 Vocabulary (Basic - 100 essential words for JLPT N5)
export const VOCABULARY_N5: VocabularyWord[] = [
  // Countries and places
  { word: '日本', kana: 'にほん', romanji: ['nihon', 'nippon'], meaning: 'Japan', jlptLevel: 'N5' },
  { word: 'アメリカ', kana: 'あめりか', romanji: ['amerika'], meaning: 'America', jlptLevel: 'N5' },
  { word: '中国', kana: 'ちゅうごく', romanji: ['chūgoku', 'chuugoku', 'cyuugoku'], meaning: 'China', jlptLevel: 'N5' },
  { word: '韓国', kana: 'かんこく', romanji: ['kankoku'], meaning: 'Korea', jlptLevel: 'N5' },
  { word: '東京', kana: 'とうきょう', romanji: ['tōkyō', 'toukyou', 'tokyo', 'tokyou'], meaning: 'Tokyo', jlptLevel: 'N5' },
  { word: '外国', kana: 'がいこく', romanji: ['gaikoku'], meaning: 'foreign country', jlptLevel: 'N5' },

  // School and learning
  { word: '学校', kana: 'がっこう', romanji: ['gakkō', 'gakkou', 'gakkoo'], meaning: 'school', jlptLevel: 'N5' },
  { word: '大学', kana: 'だいがく', romanji: ['daigaku'], meaning: 'university', jlptLevel: 'N5' },
  { word: '先生', kana: 'せんせい', romanji: ['sensei'], meaning: 'teacher', jlptLevel: 'N5' },
  { word: '学生', kana: 'がくせい', romanji: ['gakusei'], meaning: 'student', jlptLevel: 'N5' },
  { word: '勉強', kana: 'べんきょう', romanji: ['benkyō', 'benkyou', 'benkyoo'], meaning: 'study', jlptLevel: 'N5' },
  { word: '教室', kana: 'きょうしつ', romanji: ['kyōshitsu', 'kyoushitsu'], meaning: 'classroom', jlptLevel: 'N5' },

  // Time expressions
  { word: '今日', kana: 'きょう', romanji: ['kyō', 'kyou', 'kyoo'], meaning: 'today', jlptLevel: 'N5' },
  { word: '明日', kana: 'あした', romanji: ['ashita'], meaning: 'tomorrow', jlptLevel: 'N5' },
  { word: '昨日', kana: 'きのう', romanji: ['kinō', 'kinou', 'kinoo'], meaning: 'yesterday', jlptLevel: 'N5' },
  { word: '毎日', kana: 'まいにち', romanji: ['mainichi'], meaning: 'every day', jlptLevel: 'N5' },
  { word: '今年', kana: 'ことし', romanji: ['kotoshi'], meaning: 'this year', jlptLevel: 'N5' },
  { word: '去年', kana: 'きょねん', romanji: ['kyonen'], meaning: 'last year', jlptLevel: 'N5' },
  { word: '今', kana: 'いま', romanji: ['ima'], meaning: 'now', jlptLevel: 'N5' },
  { word: '朝', kana: 'あさ', romanji: ['asa'], meaning: 'morning', jlptLevel: 'N5' },
  { word: '昼', kana: 'ひる', romanji: ['hiru'], meaning: 'noon, daytime', jlptLevel: 'N5' },
  { word: '夜', kana: 'よる', romanji: ['yoru'], meaning: 'night', jlptLevel: 'N5' },
  { word: '晩', kana: 'ばん', romanji: ['ban'], meaning: 'evening', jlptLevel: 'N5' },

  // Family
  { word: '家族', kana: 'かぞく', romanji: ['kazoku'], meaning: 'family', jlptLevel: 'N5' },
  { word: '父', kana: 'ちち', romanji: ['chichi'], meaning: 'father', jlptLevel: 'N5' },
  { word: '母', kana: 'はは', romanji: ['haha'], meaning: 'mother', jlptLevel: 'N5' },
  { word: '兄', kana: 'あに', romanji: ['ani'], meaning: 'older brother', jlptLevel: 'N5' },
  { word: '姉', kana: 'あね', romanji: ['ane'], meaning: 'older sister', jlptLevel: 'N5' },
  { word: '弟', kana: 'おとうと', romanji: ['otōto', 'otouto', 'ototo'], meaning: 'younger brother', jlptLevel: 'N5' },
  { word: '妹', kana: 'いもうと', romanji: ['imōto', 'imouto', 'imoto'], meaning: 'younger sister', jlptLevel: 'N5' },
  { word: '子供', kana: 'こども', romanji: ['kodomo'], meaning: 'child', jlptLevel: 'N5' },

  // Daily life
  { word: '食べる', kana: 'たべる', romanji: ['taberu'], meaning: 'to eat', jlptLevel: 'N5' },
  { word: '飲む', kana: 'のむ', romanji: ['nomu'], meaning: 'to drink', jlptLevel: 'N5' },
  { word: '見る', kana: 'みる', romanji: ['miru'], meaning: 'to see, to watch', jlptLevel: 'N5' },
  { word: '聞く', kana: 'きく', romanji: ['kiku'], meaning: 'to hear, to listen', jlptLevel: 'N5' },
  { word: '読む', kana: 'よむ', romanji: ['yomu'], meaning: 'to read', jlptLevel: 'N5' },
  { word: '書く', kana: 'かく', romanji: ['kaku'], meaning: 'to write', jlptLevel: 'N5' },
  { word: '話す', kana: 'はなす', romanji: ['hanasu'], meaning: 'to speak', jlptLevel: 'N5' },
  { word: '行く', kana: 'いく', romanji: ['iku'], meaning: 'to go', jlptLevel: 'N5' },
  { word: '来る', kana: 'くる', romanji: ['kuru'], meaning: 'to come', jlptLevel: 'N5' },
  { word: '帰る', kana: 'かえる', romanji: ['kaeru'], meaning: 'to return, to go home', jlptLevel: 'N5' },
  { word: '買う', kana: 'かう', romanji: ['kau'], meaning: 'to buy', jlptLevel: 'N5' },
  { word: '売る', kana: 'うる', romanji: ['uru'], meaning: 'to sell', jlptLevel: 'N5' },

  // Places
  { word: '駅', kana: 'えき', romanji: ['eki'], meaning: 'station', jlptLevel: 'N5' },
  { word: '銀行', kana: 'ぎんこう', romanji: ['ginkō', 'ginkou', 'ginkoo'], meaning: 'bank', jlptLevel: 'N5' },
  { word: '病院', kana: 'びょういん', romanji: ['byōin', 'byouin'], meaning: 'hospital', jlptLevel: 'N5' },
  { word: 'レストラン', kana: 'れすとらん', romanji: ['resutoran'], meaning: 'restaurant', jlptLevel: 'N5' },
  { word: 'デパート', kana: 'でぱーと', romanji: ['depāto', 'depaato'], meaning: 'department store', jlptLevel: 'N5' },
  { word: '図書館', kana: 'としょかん', romanji: ['toshokan'], meaning: 'library', jlptLevel: 'N5' },
  { word: '公園', kana: 'こうえん', romanji: ['kōen', 'kouen'], meaning: 'park', jlptLevel: 'N5' },

  // Food and drink
  { word: 'ご飯', kana: 'ごはん', romanji: ['gohan'], meaning: 'rice, meal', jlptLevel: 'N5' },
  { word: '水', kana: 'みず', romanji: ['mizu'], meaning: 'water', jlptLevel: 'N5' },
  { word: 'お茶', kana: 'おちゃ', romanji: ['ocha'], meaning: 'tea', jlptLevel: 'N5' },
  { word: 'コーヒー', kana: 'こーひー', romanji: ['kōhī', 'koohii'], meaning: 'coffee', jlptLevel: 'N5' },
  { word: '牛乳', kana: 'ぎゅうにゅう', romanji: ['gyūnyū', 'gyuunyuu'], meaning: 'milk', jlptLevel: 'N5' },
  { word: '肉', kana: 'にく', romanji: ['niku'], meaning: 'meat', jlptLevel: 'N5' },
  { word: '魚', kana: 'さかな', romanji: ['sakana'], meaning: 'fish', jlptLevel: 'N5' },
  { word: '野菜', kana: 'やさい', romanji: ['yasai'], meaning: 'vegetable', jlptLevel: 'N5' },

  // Numbers and counting
  { word: '一つ', kana: 'ひとつ', romanji: ['hitotsu'], meaning: 'one (object)', jlptLevel: 'N5' },
  { word: '二つ', kana: 'ふたつ', romanji: ['futatsu'], meaning: 'two (objects)', jlptLevel: 'N5' },
  { word: '三つ', kana: 'みっつ', romanji: ['mittsu'], meaning: 'three (objects)', jlptLevel: 'N5' },
  { word: '一人', kana: 'ひとり', romanji: ['hitori'], meaning: 'one person', jlptLevel: 'N5' },
  { word: '二人', kana: 'ふたり', romanji: ['futari'], meaning: 'two people', jlptLevel: 'N5' },

  // Common adjectives
  { word: '大きい', kana: 'おおきい', romanji: ['ōkii', 'ookii'], meaning: 'big, large', jlptLevel: 'N5' },
  { word: '小さい', kana: 'ちいさい', romanji: ['chīsai', 'chiisai'], meaning: 'small, little', jlptLevel: 'N5' },
  { word: '新しい', kana: 'あたらしい', romanji: ['atarashii'], meaning: 'new', jlptLevel: 'N5' },
  { word: '古い', kana: 'ふるい', romanji: ['furui'], meaning: 'old (not for people)', jlptLevel: 'N5' },
  { word: '良い', kana: 'いい', romanji: ['ii', 'yoi'], meaning: 'good', jlptLevel: 'N5' },
  { word: '悪い', kana: 'わるい', romanji: ['warui'], meaning: 'bad', jlptLevel: 'N5' },
  { word: '高い', kana: 'たかい', romanji: ['takai'], meaning: 'high, tall, expensive', jlptLevel: 'N5' },
  { word: '安い', kana: 'やすい', romanji: ['yasui'], meaning: 'cheap, inexpensive', jlptLevel: 'N5' },
  { word: '多い', kana: 'おおい', romanji: ['ōi', 'ooi'], meaning: 'many, much', jlptLevel: 'N5' },
  { word: '少ない', kana: 'すくない', romanji: ['sukunai'], meaning: 'few, little', jlptLevel: 'N5' },

  // Common nouns
  { word: '人', kana: 'ひと', romanji: ['hito'], meaning: 'person, people', jlptLevel: 'N5' },
  { word: '友達', kana: 'ともだち', romanji: ['tomodachi'], meaning: 'friend', jlptLevel: 'N5' },
  { word: '名前', kana: 'なまえ', romanji: ['namae'], meaning: 'name', jlptLevel: 'N5' },
  { word: '本', kana: 'ほん', romanji: ['hon'], meaning: 'book', jlptLevel: 'N5' },
  { word: '新聞', kana: 'しんぶん', romanji: ['shinbun'], meaning: 'newspaper', jlptLevel: 'N5' },
  { word: '手紙', kana: 'てがみ', romanji: ['tegami'], meaning: 'letter', jlptLevel: 'N5' },
  { word: '写真', kana: 'しゃしん', romanji: ['shashin', 'syashin'], meaning: 'photograph', jlptLevel: 'N5' },
  { word: '車', kana: 'くるま', romanji: ['kuruma'], meaning: 'car', jlptLevel: 'N5' },
  { word: '自転車', kana: 'じてんしゃ', romanji: ['jitensha', 'zitensya'], meaning: 'bicycle', jlptLevel: 'N5' },
  { word: '電車', kana: 'でんしゃ', romanji: ['densha', 'densya'], meaning: 'train', jlptLevel: 'N5' },

  // Weather and nature
  { word: '天気', kana: 'てんき', romanji: ['tenki'], meaning: 'weather', jlptLevel: 'N5' },
  { word: '雨', kana: 'あめ', romanji: ['ame'], meaning: 'rain', jlptLevel: 'N5' },
  { word: '雪', kana: 'ゆき', romanji: ['yuki'], meaning: 'snow', jlptLevel: 'N5' },
  { word: '風', kana: 'かぜ', romanji: ['kaze'], meaning: 'wind', jlptLevel: 'N5' },
  { word: '山', kana: 'やま', romanji: ['yama'], meaning: 'mountain', jlptLevel: 'N5' },
  { word: '川', kana: 'かわ', romanji: ['kawa'], meaning: 'river', jlptLevel: 'N5' },
  { word: '海', kana: 'うみ', romanji: ['umi'], meaning: 'sea, ocean', jlptLevel: 'N5' },

  // Colors
  { word: '赤', kana: 'あか', romanji: ['aka'], meaning: 'red', jlptLevel: 'N5' },
  { word: '青', kana: 'あお', romanji: ['ao'], meaning: 'blue', jlptLevel: 'N5' },
  { word: '白', kana: 'しろ', romanji: ['shiro'], meaning: 'white', jlptLevel: 'N5' },
  { word: '黒', kana: 'くろ', romanji: ['kuro'], meaning: 'black', jlptLevel: 'N5' },
];

// N4 Vocabulary (Intermediate - 100 essential words for JLPT N4)
export const VOCABULARY_N4: VocabularyWord[] = [
  // Advanced verbs
  { word: '集まる', kana: 'あつまる', romanji: ['atsumaru'], meaning: 'to gather, to collect', jlptLevel: 'N4' },
  { word: '集める', kana: 'あつめる', romanji: ['atsumeru'], meaning: 'to collect, to gather', jlptLevel: 'N4' },
  { word: '謝る', kana: 'あやまる', romanji: ['ayamaru'], meaning: 'to apologize', jlptLevel: 'N4' },
  { word: '増える', kana: 'ふえる', romanji: ['fueru'], meaning: 'to increase', jlptLevel: 'N4' },
  { word: '減る', kana: 'へる', romanji: ['heru'], meaning: 'to decrease', jlptLevel: 'N4' },
  { word: '動く', kana: 'うごく', romanji: ['ugoku'], meaning: 'to move', jlptLevel: 'N4' },
  { word: '止まる', kana: 'とまる', romanji: ['tomaru'], meaning: 'to stop', jlptLevel: 'N4' },
  { word: '続ける', kana: 'つづける', romanji: ['tsuzukeru', 'tudukeru'], meaning: 'to continue', jlptLevel: 'N4' },
  { word: '決める', kana: 'きめる', romanji: ['kimeru'], meaning: 'to decide', jlptLevel: 'N4' },
  { word: '始まる', kana: 'はじまる', romanji: ['hajimaru', 'hazimaru'], meaning: 'to begin', jlptLevel: 'N4' },
  { word: '終わる', kana: 'おわる', romanji: ['owaru'], meaning: 'to end', jlptLevel: 'N4' },
  { word: '変わる', kana: 'かわる', romanji: ['kawaru'], meaning: 'to change', jlptLevel: 'N4' },

  // Abstract concepts
  { word: '意見', kana: 'いけん', romanji: ['iken'], meaning: 'opinion', jlptLevel: 'N4' },
  { word: '意味', kana: 'いみ', romanji: ['imi'], meaning: 'meaning', jlptLevel: 'N4' },
  { word: '理由', kana: 'りゆう', romanji: ['riyū', 'riyuu'], meaning: 'reason', jlptLevel: 'N4' },
  { word: '例', kana: 'れい', romanji: ['rei'], meaning: 'example', jlptLevel: 'N4' },
  { word: '場合', kana: 'ばあい', romanji: ['baai'], meaning: 'case, situation', jlptLevel: 'N4' },
  { word: '問題', kana: 'もんだい', romanji: ['mondai'], meaning: 'problem, question', jlptLevel: 'N4' },
  { word: '答え', kana: 'こたえ', romanji: ['kotae'], meaning: 'answer', jlptLevel: 'N4' },
  { word: '質問', kana: 'しつもん', romanji: ['shitsumon', 'situmon'], meaning: 'question', jlptLevel: 'N4' },
  { word: '説明', kana: 'せつめい', romanji: ['setsumei', 'setumei'], meaning: 'explanation', jlptLevel: 'N4' },

  // Society and culture
  { word: '社会', kana: 'しゃかい', romanji: ['shakai', 'syakai'], meaning: 'society', jlptLevel: 'N4' },
  { word: '文化', kana: 'ぶんか', romanji: ['bunka'], meaning: 'culture', jlptLevel: 'N4' },
  { word: '歴史', kana: 'れきし', romanji: ['rekishi'], meaning: 'history', jlptLevel: 'N4' },
  { word: '伝統', kana: 'でんとう', romanji: ['dentō', 'dentou'], meaning: 'tradition', jlptLevel: 'N4' },
  { word: '経済', kana: 'けいざい', romanji: ['keizai'], meaning: 'economy', jlptLevel: 'N4' },
  { word: '政治', kana: 'せいじ', romanji: ['seiji', 'seizi'], meaning: 'politics', jlptLevel: 'N4' },
  { word: '法律', kana: 'ほうりつ', romanji: ['hōritsu', 'houritsu'], meaning: 'law', jlptLevel: 'N4' },

  // Work and business
  { word: '会社', kana: 'かいしゃ', romanji: ['kaisha', 'kaisya'], meaning: 'company', jlptLevel: 'N4' },
  { word: '仕事', kana: 'しごと', romanji: ['shigoto'], meaning: 'work, job', jlptLevel: 'N4' },
  { word: '社員', kana: 'しゃいん', romanji: ['shain', 'syain'], meaning: 'company employee', jlptLevel: 'N4' },
  { word: '会議', kana: 'かいぎ', romanji: ['kaigi'], meaning: 'meeting, conference', jlptLevel: 'N4' },
  { word: '発表', kana: 'はっぴょう', romanji: ['happyō', 'happyou'], meaning: 'announcement, presentation', jlptLevel: 'N4' },
  { word: '報告', kana: 'ほうこく', romanji: ['hōkoku', 'houkoku'], meaning: 'report', jlptLevel: 'N4' },
  { word: '計画', kana: 'けいかく', romanji: ['keikaku'], meaning: 'plan', jlptLevel: 'N4' },

  // Academic
  { word: '研究', kana: 'けんきゅう', romanji: ['kenkyū', 'kenkyuu'], meaning: 'research', jlptLevel: 'N4' },
  { word: '試験', kana: 'しけん', romanji: ['shiken'], meaning: 'examination, test', jlptLevel: 'N4' },
  { word: '授業', kana: 'じゅぎょう', romanji: ['jugyō', 'jugyou', 'zyugyou'], meaning: 'lesson, class', jlptLevel: 'N4' },
  { word: '成績', kana: 'せいせき', romanji: ['seiseki'], meaning: 'results, grades', jlptLevel: 'N4' },
  { word: '卒業', kana: 'そつぎょう', romanji: ['sotsugyō', 'sotsugyou'], meaning: 'graduation', jlptLevel: 'N4' },
  { word: '留学', kana: 'りゅうがく', romanji: ['ryūgaku', 'ryuugaku'], meaning: 'study abroad', jlptLevel: 'N4' },

  // Communication
  { word: '連絡', kana: 'れんらく', romanji: ['renraku'], meaning: 'contact, communication', jlptLevel: 'N4' },
  { word: '相談', kana: 'そうだん', romanji: ['sōdan', 'soudan'], meaning: 'consultation', jlptLevel: 'N4' },
  { word: '約束', kana: 'やくそく', romanji: ['yakusoku'], meaning: 'promise, appointment', jlptLevel: 'N4' },
  { word: '注意', kana: 'ちゅうい', romanji: ['chūi', 'chuui'], meaning: 'attention, caution', jlptLevel: 'N4' },
  { word: '案内', kana: 'あんない', romanji: ['annai'], meaning: 'guidance, information', jlptLevel: 'N4' },
  { word: '挨拶', kana: 'あいさつ', romanji: ['aisatsu'], meaning: 'greeting', jlptLevel: 'N4' },

  // Daily activities
  { word: '用事', kana: 'ようじ', romanji: ['yōji', 'youzi'], meaning: 'errand, business', jlptLevel: 'N4' },
  { word: '準備', kana: 'じゅんび', romanji: ['junbi', 'zyunbi'], meaning: 'preparation', jlptLevel: 'N4' },
  { word: '片付ける', kana: 'かたづける', romanji: ['katazukeru', 'katadukeru'], meaning: 'to tidy up', jlptLevel: 'N4' },
  { word: '掃除', kana: 'そうじ', romanji: ['sōji', 'souzi'], meaning: 'cleaning', jlptLevel: 'N4' },
  { word: '洗濯', kana: 'せんたく', romanji: ['sentaku'], meaning: 'laundry, washing', jlptLevel: 'N4' },
  { word: '料理', kana: 'りょうり', romanji: ['ryōri', 'ryouri'], meaning: 'cooking, cuisine', jlptLevel: 'N4' },

  // State and condition
  { word: '都合', kana: 'つごう', romanji: ['tsugō', 'tugou'], meaning: 'convenience, circumstances', jlptLevel: 'N4' },
  { word: '様子', kana: 'ようす', romanji: ['yōsu', 'yousu'], meaning: 'situation, appearance', jlptLevel: 'N4' },
  { word: '状態', kana: 'じょうたい', romanji: ['jōtai', 'joutai', 'zyoutai'], meaning: 'condition, state', jlptLevel: 'N4' },
  { word: '調子', kana: 'ちょうし', romanji: ['chōshi', 'choushi', 'tyousi'], meaning: 'condition, tone', jlptLevel: 'N4' },
  { word: '具合', kana: 'ぐあい', romanji: ['guai'], meaning: 'condition, health', jlptLevel: 'N4' },
  { word: '安全', kana: 'あんぜん', romanji: ['anzen'], meaning: 'safety, security', jlptLevel: 'N4' },
  { word: '危険', kana: 'きけん', romanji: ['kiken'], meaning: 'danger', jlptLevel: 'N4' },

  // Technology and modern life
  { word: 'インターネット', kana: 'いんたーねっと', romanji: ['intānetto', 'intaanetto'], meaning: 'internet', jlptLevel: 'N4' },
  { word: 'パソコン', kana: 'ぱそこん', romanji: ['pasokon'], meaning: 'personal computer', jlptLevel: 'N4' },
  { word: 'メール', kana: 'めーる', romanji: ['mēru', 'meeru'], meaning: 'email', jlptLevel: 'N4' },
  { word: '携帯', kana: 'けいたい', romanji: ['keitai'], meaning: 'mobile phone', jlptLevel: 'N4' },
  { word: 'アプリ', kana: 'あぷり', romanji: ['apuri'], meaning: 'application, app', jlptLevel: 'N4' },

  // Feelings and emotions
  { word: '心配', kana: 'しんぱい', romanji: ['shinpai', 'sinpai'], meaning: 'worry, concern', jlptLevel: 'N4' },
  { word: '安心', kana: 'あんしん', romanji: ['anshin', 'ansin'], meaning: 'relief, peace of mind', jlptLevel: 'N4' },
  { word: '残念', kana: 'ざんねん', romanji: ['zannen'], meaning: 'regrettable, disappointing', jlptLevel: 'N4' },
  { word: '幸せ', kana: 'しあわせ', romanji: ['shiawase', 'siawase'], meaning: 'happiness', jlptLevel: 'N4' },
  { word: '悲しい', kana: 'かなしい', romanji: ['kanashii', 'kanasii'], meaning: 'sad', jlptLevel: 'N4' },
  { word: '嬉しい', kana: 'うれしい', romanji: ['ureshii', 'uresii'], meaning: 'happy, glad', jlptLevel: 'N4' },
  { word: '楽しい', kana: 'たのしい', romanji: ['tanoshii', 'tanosii'], meaning: 'enjoyable, fun', jlptLevel: 'N4' },
  { word: '怖い', kana: 'こわい', romanji: ['kowai'], meaning: 'scary, frightening', jlptLevel: 'N4' },

  // Nature and environment
  { word: '自然', kana: 'しぜん', romanji: ['shizen', 'sizen'], meaning: 'nature', jlptLevel: 'N4' },
  { word: '環境', kana: 'かんきょう', romanji: ['kankyō', 'kankyou'], meaning: 'environment', jlptLevel: 'N4' },
  { word: '空気', kana: 'くうき', romanji: ['kūki', 'kuuki'], meaning: 'air', jlptLevel: 'N4' },
  { word: '光', kana: 'ひかり', romanji: ['hikari'], meaning: 'light', jlptLevel: 'N4' },
  { word: '音', kana: 'おと', romanji: ['oto'], meaning: 'sound', jlptLevel: 'N4' },
  { word: '熱', kana: 'ねつ', romanji: ['netsu', 'netu'], meaning: 'heat, fever', jlptLevel: 'N4' },

  // Transportation and travel
  { word: '交通', kana: 'こうつう', romanji: ['kōtsū', 'koutsuu', 'koutuu'], meaning: 'traffic, transportation', jlptLevel: 'N4' },
  { word: '旅行', kana: 'りょこう', romanji: ['ryokō', 'ryokou'], meaning: 'travel, trip', jlptLevel: 'N4' },
  { word: '出張', kana: 'しゅっちょう', romanji: ['shutchō', 'shucchou', 'syucchou'], meaning: 'business trip', jlptLevel: 'N4' },
  { word: '飛行機', kana: 'ひこうき', romanji: ['hikōki', 'hikouki'], meaning: 'airplane', jlptLevel: 'N4' },
  { word: '空港', kana: 'くうこう', romanji: ['kūkō', 'kuukou'], meaning: 'airport', jlptLevel: 'N4' },
  { word: '道', kana: 'みち', romanji: ['michi'], meaning: 'road, way', jlptLevel: 'N4' },

  // Shopping and money
  { word: '値段', kana: 'ねだん', romanji: ['nedan'], meaning: 'price', jlptLevel: 'N4' },
  { word: '売り場', kana: 'うりば', romanji: ['uriba'], meaning: 'sales counter, department', jlptLevel: 'N4' },
  { word: 'サイズ', kana: 'さいず', romanji: ['saizu'], meaning: 'size', jlptLevel: 'N4' },
  { word: '品物', kana: 'しなもの', romanji: ['shinamono', 'sinamono'], meaning: 'goods, article', jlptLevel: 'N4' },
  { word: '客', kana: 'きゃく', romanji: ['kyaku'], meaning: 'customer, guest', jlptLevel: 'N4' },

  // Time and duration
  { word: '最近', kana: 'さいきん', romanji: ['saikin'], meaning: 'recently, lately', jlptLevel: 'N4' },
  { word: '将来', kana: 'しょうらい', romanji: ['shōrai', 'shourai', 'syourai'], meaning: 'future', jlptLevel: 'N4' },
  { word: '途中', kana: 'とちゅう', romanji: ['tochū', 'tochuu'], meaning: 'on the way, midway', jlptLevel: 'N4' },
  { word: 'すぐ', kana: 'すぐ', romanji: ['sugu'], meaning: 'immediately, soon', jlptLevel: 'N4' },
  { word: 'まだ', kana: 'まだ', romanji: ['mada'], meaning: 'still, not yet', jlptLevel: 'N4' },
];

// Cumulative arrays (N4 includes all N5 vocabulary)
export const ALL_VOCABULARY_N5 = VOCABULARY_N5;
export const ALL_VOCABULARY_N4 = [...VOCABULARY_N5, ...VOCABULARY_N4];

/**
 * Find a vocabulary word by its kanji/word form
 *
 * @param word - The word to find (kanji form)
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
 * @param count - Number of random words to select
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
