import { splitUserAnswer, VALID_ROMANJI_SYLLABLES } from '@/lib/syllableMatching';
import type { HiraganaChar } from '@/lib/hiragana';

// Mock HiraganaChar objects for testing
const createMockHiragana = (char: string, romanji: string[]): HiraganaChar => ({
  hiragana: char,
  romanji,
  type: 'basic',
});

describe('syllableMatching', () => {
  describe('VALID_ROMANJI_SYLLABLES', () => {
    it('should contain all basic vowels', () => {
      expect(VALID_ROMANJI_SYLLABLES.has('a')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('i')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('u')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('e')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('o')).toBe(true);
    });

    it('should contain basic consonant-vowel combinations', () => {
      expect(VALID_ROMANJI_SYLLABLES.has('ka')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('ta')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('na')).toBe(true);
    });

    it('should contain variant spellings', () => {
      expect(VALID_ROMANJI_SYLLABLES.has('shi')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('si')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('chi')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('ti')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('tsu')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('tu')).toBe(true);
    });

    it('should contain dakuten syllables', () => {
      expect(VALID_ROMANJI_SYLLABLES.has('ga')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('ba')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('pa')).toBe(true);
    });

    it('should contain combo syllables', () => {
      expect(VALID_ROMANJI_SYLLABLES.has('kya')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('sha')).toBe(true);
      expect(VALID_ROMANJI_SYLLABLES.has('cha')).toBe(true);
    });
  });

  describe('splitUserAnswer - 1-character tests', () => {
    it('should correctly split a single correct character', () => {
      const hiragana = [createMockHiragana('あ', ['a'])];
      const result = splitUserAnswer('a', hiragana);
      expect(result).toEqual(['a']);
    });

    it('should correctly split a single incorrect character', () => {
      const hiragana = [createMockHiragana('か', ['ka'])];
      const result = splitUserAnswer('ta', hiragana);
      expect(result).toEqual(['ta']);
    });

    it('should handle variant spellings (shi/si)', () => {
      const hiragana = [createMockHiragana('し', ['shi', 'si'])];

      const result1 = splitUserAnswer('shi', hiragana);
      expect(result1).toEqual(['shi']);

      const result2 = splitUserAnswer('si', hiragana);
      expect(result2).toEqual(['si']);
    });

    it('should handle variant spellings (chi/ti)', () => {
      const hiragana = [createMockHiragana('ち', ['chi', 'ti'])];

      const result1 = splitUserAnswer('chi', hiragana);
      expect(result1).toEqual(['chi']);

      const result2 = splitUserAnswer('ti', hiragana);
      expect(result2).toEqual(['ti']);
    });

    it('should handle variant spellings (tsu/tu)', () => {
      const hiragana = [createMockHiragana('つ', ['tsu', 'tu'])];

      const result1 = splitUserAnswer('tsu', hiragana);
      expect(result1).toEqual(['tsu']);

      const result2 = splitUserAnswer('tu', hiragana);
      expect(result2).toEqual(['tu']);
    });

    it('should handle case insensitivity', () => {
      const hiragana = [createMockHiragana('か', ['ka'])];

      const result1 = splitUserAnswer('KA', hiragana);
      expect(result1).toEqual(['ka']);

      const result2 = splitUserAnswer('Ka', hiragana);
      expect(result2).toEqual(['ka']);
    });

    it('should handle invalid single character input', () => {
      const hiragana = [createMockHiragana('か', ['ka'])];
      const result = splitUserAnswer('x', hiragana);
      expect(result).toEqual(['x']);
    });
  });

  describe('splitUserAnswer - 3-character tests', () => {
    it('should correctly split all correct characters (katana)', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        createMockHiragana('た', ['ta']),
        createMockHiragana('な', ['na']),
      ];
      const result = splitUserAnswer('katana', hiragana);
      expect(result).toEqual(['ka', 'ta', 'na']);
    });

    it('should handle banana example - only last character correct', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        createMockHiragana('た', ['ta']),
        createMockHiragana('な', ['na']),
      ];
      const result = splitUserAnswer('banana', hiragana);
      expect(result).toEqual(['ba', 'na', 'na']);

      // Verify correctness: か should get 'ba' (wrong), た should get 'na' (wrong), な should get 'na' (correct)
      expect(result[0]).toBe('ba'); // Wrong for か
      expect(result[1]).toBe('na'); // Wrong for た
      expect(result[2]).toBe('na'); // Correct for な
    });

    it('should handle batana example - last two characters correct', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        createMockHiragana('た', ['ta']),
        createMockHiragana('な', ['na']),
      ];
      const result = splitUserAnswer('batana', hiragana);
      expect(result).toEqual(['ba', 'ta', 'na']);

      // Verify correctness: か should get 'ba' (wrong), た should get 'ta' (correct), な should get 'na' (correct)
      expect(result[0]).toBe('ba'); // Wrong for か
      expect(result[1]).toBe('ta'); // Correct for た
      expect(result[2]).toBe('na'); // Correct for な
    });

    it('should handle all wrong characters', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        createMockHiragana('た', ['ta']),
        createMockHiragana('な', ['na']),
      ];
      const result = splitUserAnswer('gagugu', hiragana);
      expect(result).toEqual(['ga', 'gu', 'gu']);
    });

    it('should use greedy matching (longest syllable first)', () => {
      const hiragana = [
        createMockHiragana('きゃ', ['kya']),
        createMockHiragana('た', ['ta']),
      ];
      const result = splitUserAnswer('kyata', hiragana);
      expect(result).toEqual(['kya', 'ta']);
    });

    it('should handle combo syllables correctly', () => {
      const hiragana = [
        createMockHiragana('しゃ', ['sha', 'sya']),
        createMockHiragana('ちゅ', ['chu', 'cyu', 'tyu']),
        createMockHiragana('きょ', ['kyo']),
      ];

      const result1 = splitUserAnswer('shachukyo', hiragana);
      expect(result1).toEqual(['sha', 'chu', 'kyo']);

      const result2 = splitUserAnswer('syacyukyo', hiragana);
      expect(result2).toEqual(['sya', 'cyu', 'kyo']);
    });

    it('should handle mixed correct and incorrect answers', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        createMockHiragana('た', ['ta']),
        createMockHiragana('な', ['na']),
      ];
      const result = splitUserAnswer('kitana', hiragana);
      expect(result).toEqual(['ki', 'ta', 'na']);

      // Verify: か gets 'ki' (wrong), た gets 'ta' (correct), な gets 'na' (correct)
      expect(result[0]).toBe('ki'); // Wrong for か
      expect(result[1]).toBe('ta'); // Correct for た
      expect(result[2]).toBe('na'); // Correct for な
    });

    it('should handle empty/undefined characters gracefully', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        undefined,
        createMockHiragana('な', ['na']),
      ];
      const result = splitUserAnswer('kana', hiragana);
      expect(result).toEqual(['ka', '', 'na']);
    });
  });

  describe('splitUserAnswer - edge cases', () => {
    it('should handle empty input', () => {
      const hiragana = [createMockHiragana('か', ['ka'])];
      const result = splitUserAnswer('', hiragana);
      expect(result).toEqual(['']);
    });

    it('should handle whitespace in input', () => {
      const hiragana = [createMockHiragana('か', ['ka'])];
      const result = splitUserAnswer('  ka  ', hiragana);
      expect(result).toEqual(['ka']);
    });

    it('should handle input shorter than expected', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        createMockHiragana('た', ['ta']),
        createMockHiragana('な', ['na']),
      ];
      const result = splitUserAnswer('ka', hiragana);
      expect(result).toEqual(['ka', '', '']);
    });

    it('should handle input longer than expected', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        createMockHiragana('た', ['ta']),
      ];
      const result = splitUserAnswer('katanaki', hiragana);
      expect(result).toEqual(['ka', 'ta']);
      // Remaining 'naki' is ignored since we only have 2 characters
    });

    it('should handle invalid characters as fallback', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        createMockHiragana('た', ['ta']),
      ];
      const result = splitUserAnswer('xyta', hiragana);
      expect(result).toEqual(['xy', 'ta']); // Resync finds 'ta' ahead, groups 'xy' as wrong input for か
    });

    it('should handle numbers and special characters', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        createMockHiragana('た', ['ta']),
      ];
      const result = splitUserAnswer('1ta', hiragana);
      expect(result).toEqual(['1', 'ta']);
    });
  });

  describe('splitUserAnswer - real-world scenarios', () => {
    it('should correctly analyze sakana (さかな - fish)', () => {
      const hiragana = [
        createMockHiragana('さ', ['sa']),
        createMockHiragana('か', ['ka']),
        createMockHiragana('な', ['na']),
      ];
      const result = splitUserAnswer('sakana', hiragana);
      expect(result).toEqual(['sa', 'ka', 'na']);
    });

    it('should identify typo in sakana -> sakama', () => {
      const hiragana = [
        createMockHiragana('さ', ['sa']),
        createMockHiragana('か', ['ka']),
        createMockHiragana('な', ['na']),
      ];
      const result = splitUserAnswer('sakama', hiragana);
      expect(result).toEqual(['sa', 'ka', 'ma']);
      // な is wrong (should be 'na', user typed 'ma')
    });

    it('should handle hiragana with dakuten (がっこう - school)', () => {
      const hiragana = [
        createMockHiragana('が', ['ga']),
        createMockHiragana('こ', ['ko']),
        createMockHiragana('う', ['u', 'o']),
      ];
      const result = splitUserAnswer('gakou', hiragana);
      expect(result).toEqual(['ga', 'ko', 'u']);
    });

    it('should handle combo characters (きょう - today)', () => {
      const hiragana = [
        createMockHiragana('きょ', ['kyo']),
        createMockHiragana('う', ['u', 'o']),
      ];
      const result = splitUserAnswer('kyou', hiragana);
      expect(result).toEqual(['kyo', 'u']);
    });

    it('should identify partial confusion in combo (きょう typed as kiyu)', () => {
      const hiragana = [
        createMockHiragana('きょ', ['kyo']),
        createMockHiragana('う', ['u', 'o']),
      ];
      const result = splitUserAnswer('kiyu', hiragana);
      expect(result).toEqual(['kiy', 'u']);
      // Resync finds 'u' ahead (correct for う), so きょ gets 'kiy' (wrong, should be 'kyo')
    });

    it('should handle kalude for かろで (user-reported bug)', () => {
      const hiragana = [
        createMockHiragana('か', ['ka']),
        createMockHiragana('ろ', ['ro']),
        createMockHiragana('で', ['de']),
      ];
      const result = splitUserAnswer('kalude', hiragana);
      expect(result).toEqual(['ka', 'lu', 'de']);
      // か gets 'ka' (correct), ろ gets 'lu' (wrong, should be 'ro'), で gets 'de' (correct via resync)
    });

    it('should handle wogebo for わぱぼ (user-reported bug #2)', () => {
      const hiragana = [
        createMockHiragana('わ', ['wa']),
        createMockHiragana('ぱ', ['pa']),
        createMockHiragana('ぼ', ['bo']),
      ];
      const result = splitUserAnswer('wogebo', hiragana);
      expect(result).toEqual(['woge', '', 'bo']);
      // わ gets 'woge' (wrong, should be 'wa'), ぱ gets '' (skipped), ぼ gets 'bo' (correct via resync at pos 0)
    });

    it('should handle gearya for ばありゃ (combo character bug)', () => {
      const hiragana = [
        createMockHiragana('ば', ['ba']),
        createMockHiragana('あ', ['a']),
        createMockHiragana('りゃ', ['rya']),
      ];
      const result = splitUserAnswer('gearya', hiragana);
      expect(result).toEqual(['ge', 'a', 'rya']);
      // ば gets 'ge' (wrong, should be 'ba'), あ gets 'a' (correct via resync), りゃ gets 'rya' (correct)
    });
  });
});
