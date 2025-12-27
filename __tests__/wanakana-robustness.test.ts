/**
 * Test WanaKana's robustness with edge cases and malformed input
 * This validates whether we can use it as an alternative to our custom syllable matching
 */

import { toHiragana } from 'wanakana';

describe('WanaKana Robustness Tests', () => {
  describe('Valid input', () => {
    it('should convert standard romaji correctly', () => {
      expect(toHiragana('katana')).toBe('かたな');
      expect(toHiragana('sakana')).toBe('さかな');
      expect(toHiragana('arigatou')).toBe('ありがとう');
    });

    it('should handle variant spellings', () => {
      expect(toHiragana('shi')).toBe('し');
      expect(toHiragana('si')).toBe('し');
      expect(toHiragana('chi')).toBe('ち');
      expect(toHiragana('ti')).toBe('ち');
      expect(toHiragana('tsu')).toBe('つ');
      expect(toHiragana('tu')).toBe('つ');
    });

    it('should handle combo characters', () => {
      expect(toHiragana('kya')).toBe('きゃ');
      expect(toHiragana('sya')).toBe('しゃ');
      expect(toHiragana('sha')).toBe('しゃ');
      expect(toHiragana('ju')).toBe('じゅ');
      expect(toHiragana('jyu')).toBe('じゅ');
    });

    it('should handle ん (n)', () => {
      expect(toHiragana('n')).toBe('ん');
      expect(toHiragana('nn')).toBe('んん'); // WanaKana treats 'nn' as double ん
      expect(toHiragana('kanna')).toBe('かんな'); // But 'kanna' works correctly
      expect(toHiragana("kan'na")).toBe('かんな'); // explicit ん with apostrophe
    });
  });

  describe('Typos and malformed input', () => {
    it('should handle simple typos', () => {
      // か-た-な typed as ka-te-na (middle wrong)
      expect(toHiragana('katena')).toBe('かてな');

      // か-た-な typed as ba-ta-na (first wrong)
      expect(toHiragana('batana')).toBe('ばたな');

      // か-ろ-で typed as ka-lu-de (middle wrong with invalid syllable)
      const result = toHiragana('kalude');
      console.log('kalude →', result);
      // WanaKana might convert this to かぅで or leave 'lu' as-is
    });

    it('should handle completely invalid syllables', () => {
      // Test various invalid combinations
      const testCases = [
        'bannzkawa',  // User's example
        'xyz',        // No valid syllables
        'kxta',       // Invalid middle
        'qwerty',     // Keyboard mash
      ];

      testCases.forEach(input => {
        const result = toHiragana(input);
        console.log(`${input} → ${result}`);
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
      });
    });

    it('should handle mixed valid/invalid input', () => {
      // Some valid syllables + some invalid
      expect(toHiragana('kagugu')).toBe('かぐぐ');
      expect(toHiragana('taxyz')).toBeDefined(); // Partial conversion
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      expect(toHiragana('')).toBe('');
    });

    it('should handle single characters', () => {
      expect(toHiragana('a')).toBe('あ');
      expect(toHiragana('k')).toBe('k'); // Incomplete syllable
      expect(toHiragana('x')).toBe('x'); // Invalid character
    });

    it('should handle numbers and symbols', () => {
      expect(toHiragana('ka1ta')).toBeDefined();
      expect(toHiragana('ka-ta')).toBeDefined();
      expect(toHiragana('ka ta')).toBeDefined();
    });

    it('should handle case sensitivity', () => {
      expect(toHiragana('KATANA')).toBe('かたな');
      expect(toHiragana('KaTaNa')).toBe('かたな');
    });
  });

  describe('Real user mistakes from our tests', () => {
    it('should handle banana for かたな', () => {
      expect(toHiragana('banana')).toBe('ばなな');
    });

    it('should handle batana for かたな', () => {
      expect(toHiragana('batana')).toBe('ばたな');
    });

    it('should handle kalude for かろで', () => {
      const result = toHiragana('kalude');
      console.log('kalude (for かろで) →', result);
    });

    it('should handle gearya for ばありゃ', () => {
      const result = toHiragana('gearya');
      console.log('gearya (for ばありゃ) →', result);
      expect(result).toBeDefined();
    });

    it('should handle jyogowo for じゅごを', () => {
      const result = toHiragana('jyogowo');
      console.log('jyogowo (for じゅごを) →', result);
      expect(result).toBe('じょごを'); // jyo = じょ, not じゅ
      // This reveals a potential issue! jyo ≠ jyu
    });
  });
});
