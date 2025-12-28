/**
 * Tests for katakana character analysis
 * These tests verify that all analysis functions work correctly with katakana
 */

import {
  countJapaneseCharacters,
  splitJapaneseIntoCharacters,
  analyzeMultiCharAnswer,
  formatCorrectAnswerWithIndicators,
} from '../lib/answerAnalysis';

describe('Katakana Character Analysis', () => {
  describe('countJapaneseCharacters', () => {
    it('should count single katakana characters', () => {
      expect(countJapaneseCharacters('フ')).toBe(1);
      expect(countJapaneseCharacters('ム')).toBe(1);
      expect(countJapaneseCharacters('ブ')).toBe(1);
    });

    it('should count 3 katakana characters', () => {
      expect(countJapaneseCharacters('フツビョ')).toBe(3); // fu-tsu-byo
      expect(countJapaneseCharacters('ムヨズ')).toBe(3); // mu-yo-zu
      expect(countJapaneseCharacters('ブヌサ')).toBe(3); // bu-nu-sa
    });

    it('should count katakana combo characters as single units', () => {
      expect(countJapaneseCharacters('キャ')).toBe(1); // kya
      expect(countJapaneseCharacters('シャ')).toBe(1); // sha
      expect(countJapaneseCharacters('ニャ')).toBe(1); // nya
    });

    it('should work with mixed hiragana and katakana', () => {
      expect(countJapaneseCharacters('かタナ')).toBe(3);
      expect(countJapaneseCharacters('カたな')).toBe(3);
    });
  });

  describe('splitJapaneseIntoCharacters', () => {
    it('should split katakana into individual characters', () => {
      expect(splitJapaneseIntoCharacters('フツビョ')).toEqual(['フ', 'ツ', 'ビョ']);
      expect(splitJapaneseIntoCharacters('ムヨズ')).toEqual(['ム', 'ヨ', 'ズ']);
      expect(splitJapaneseIntoCharacters('ブヌサ')).toEqual(['ブ', 'ヌ', 'サ']);
    });

    it('should handle katakana combo characters', () => {
      expect(splitJapaneseIntoCharacters('キャタナ')).toEqual(['キャ', 'タ', 'ナ']);
      expect(splitJapaneseIntoCharacters('シャギョ')).toEqual(['シャ', 'ギョ']);
    });

    it('should work with mixed scripts', () => {
      expect(splitJapaneseIntoCharacters('かタナ')).toEqual(['か', 'タ', 'ナ']);
      expect(splitJapaneseIntoCharacters('カたな')).toEqual(['カ', 'た', 'な']);
    });
  });

  describe('analyzeMultiCharAnswer - Katakana', () => {
    // User-reported bugs from actual usage
    it('BUG FIX: フツビョ with rashibyo should show [fu][tsu]byo', () => {
      const analysis = analyzeMultiCharAnswer('フツビョ', 'rashibyo');

      expect(analysis).toHaveLength(3);
      expect(analysis[0].character).toBe('フ');
      expect(analysis[0].isCorrect).toBe(false); // user typed 'ra' not 'fu'

      expect(analysis[1].character).toBe('ツ');
      expect(analysis[1].isCorrect).toBe(false); // user typed 'shi' not 'tsu'

      expect(analysis[2].character).toBe('ビョ');
      expect(analysis[2].isCorrect).toBe(true); // user typed 'byo' correctly
    });

    it('BUG FIX: ムヨズ with moyozu should show [mu]yozu', () => {
      const analysis = analyzeMultiCharAnswer('ムヨズ', 'moyozu');

      expect(analysis).toHaveLength(3);
      expect(analysis[0].character).toBe('ム');
      expect(analysis[0].isCorrect).toBe(false); // user typed 'mo' not 'mu'

      expect(analysis[1].character).toBe('ヨ');
      expect(analysis[1].isCorrect).toBe(true); // user typed 'yo' correctly

      expect(analysis[2].character).toBe('ズ');
      expect(analysis[2].isCorrect).toBe(true); // user typed 'zu' correctly
    });

    it('BUG FIX: ブヌサ with huyosa should show [bu][nu]sa', () => {
      const analysis = analyzeMultiCharAnswer('ブヌサ', 'huyosa');

      expect(analysis).toHaveLength(3);
      expect(analysis[0].character).toBe('ブ');
      expect(analysis[0].isCorrect).toBe(false); // user typed 'hu' not 'bu'

      expect(analysis[1].character).toBe('ヌ');
      expect(analysis[1].isCorrect).toBe(false); // user typed 'yo' not 'nu'

      expect(analysis[2].character).toBe('サ');
      expect(analysis[2].isCorrect).toBe(true); // user typed 'sa' correctly
    });

    it('should work with correct katakana answers', () => {
      const analysis = analyzeMultiCharAnswer('カタナ', 'katana');

      expect(analysis).toHaveLength(3);
      expect(analysis[0].isCorrect).toBe(true);
      expect(analysis[1].isCorrect).toBe(true);
      expect(analysis[2].isCorrect).toBe(true);
    });

    it('should handle katakana combo characters', () => {
      const analysis = analyzeMultiCharAnswer('キャタ', 'kyata');

      expect(analysis).toHaveLength(2);
      expect(analysis[0].character).toBe('キャ');
      expect(analysis[0].isCorrect).toBe(true);
      expect(analysis[1].character).toBe('タ');
      expect(analysis[1].isCorrect).toBe(true);
    });

    it('should handle variant romanizations for katakana', () => {
      // shi/si variant
      const shiAnalysis = analyzeMultiCharAnswer('シ', 'shi');
      expect(shiAnalysis[0].isCorrect).toBe(true);

      const siAnalysis = analyzeMultiCharAnswer('シ', 'si');
      expect(siAnalysis[0].isCorrect).toBe(true);

      // tsu/tu variant
      const tsuAnalysis = analyzeMultiCharAnswer('ツ', 'tsu');
      expect(tsuAnalysis[0].isCorrect).toBe(true);

      const tuAnalysis = analyzeMultiCharAnswer('ツ', 'tu');
      expect(tuAnalysis[0].isCorrect).toBe(true);
    });
  });

  describe('formatCorrectAnswerWithIndicators - Katakana', () => {
    it('should format katakana analysis with brackets around wrong syllables', () => {
      const analysis = analyzeMultiCharAnswer('フツビョ', 'rashibyo');
      const formatted = formatCorrectAnswerWithIndicators(analysis);

      expect(formatted).toHaveLength(3);
      expect(formatted[0]).toEqual({ syllable: 'fu', isWrong: true });
      expect(formatted[1]).toEqual({ syllable: 'tsu', isWrong: true });
      expect(formatted[2]).toEqual({ syllable: 'byo', isWrong: false });
    });

    it('should format ムヨズ with moyozu correctly', () => {
      const analysis = analyzeMultiCharAnswer('ムヨズ', 'moyozu');
      const formatted = formatCorrectAnswerWithIndicators(analysis);

      expect(formatted).toHaveLength(3);
      expect(formatted[0]).toEqual({ syllable: 'mu', isWrong: true });
      expect(formatted[1]).toEqual({ syllable: 'yo', isWrong: false });
      expect(formatted[2]).toEqual({ syllable: 'zu', isWrong: false });
    });

    it('should format ブヌサ with huyosa correctly', () => {
      const analysis = analyzeMultiCharAnswer('ブヌサ', 'huyosa');
      const formatted = formatCorrectAnswerWithIndicators(analysis);

      expect(formatted).toHaveLength(3);
      expect(formatted[0]).toEqual({ syllable: 'bu', isWrong: true });
      expect(formatted[1]).toEqual({ syllable: 'nu', isWrong: true });
      expect(formatted[2]).toEqual({ syllable: 'sa', isWrong: false });
    });
  });
});
