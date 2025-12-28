/**
 * Tests for user-reported bugs
 * These are actual bugs found during usage that need to be fixed
 */

import {
  analyzeMultiCharAnswer,
  formatCorrectAnswerWithIndicators,
} from '../lib/answerAnalysis';
import { analyzeMultiCharAnswerWithWanaKana } from '../lib/answerAnalysisWanaKana';
import { ANSWER_ANALYSIS_STRATEGY } from '../lib/constants';

describe('User-Reported Bugs', () => {
  beforeAll(() => {
    console.log('Current ANSWER_ANALYSIS_STRATEGY:', ANSWER_ANALYSIS_STRATEGY);
  });

  describe('Issue 1: Hiragana るまほ with lomaho', () => {
    it('should show [ru]maho not [ru][ma][ho]', () => {
      const analysis = analyzeMultiCharAnswer('るまほ', 'lomaho');

      console.log('Issue 1 Analysis:', JSON.stringify(analysis, null, 2));

      // Expected behavior:
      // る expects "ru" → user typed "lo" → WRONG
      // ま expects "ma" → user typed "ma" → CORRECT
      // ほ expects "ho" → user typed "ho" → CORRECT

      expect(analysis).toHaveLength(3);
      expect(analysis[0].character).toBe('る');
      expect(analysis[0].isCorrect).toBe(false); // "lo" is wrong

      expect(analysis[1].character).toBe('ま');
      expect(analysis[1].isCorrect).toBe(true); // "ma" is correct

      expect(analysis[2].character).toBe('ほ');
      expect(analysis[2].isCorrect).toBe(true); // "ho" is correct

      const formatted = formatCorrectAnswerWithIndicators(analysis);
      console.log('Issue 1 Formatted:', JSON.stringify(formatted, null, 2));

      // Should be: [ru]maho
      expect(formatted[0].isWrong).toBe(true);
      expect(formatted[1].isWrong).toBe(false);
      expect(formatted[2].isWrong).toBe(false);
    });
  });

  describe('Issue 2: Katakana ヒャピョザ with zzz', () => {
    it('DIRECT TEST: WanaKana strategy with ヒャピョザ', () => {
      const analysis = analyzeMultiCharAnswerWithWanaKana('ヒャピョザ', 'zzz');
      console.log('Direct WanaKana Analysis:', JSON.stringify(analysis, null, 2));

      expect(analysis[0].correctSyllables).toContain('hya');
      expect(analysis[1].correctSyllables).toContain('pyo');
      expect(analysis[2].correctSyllables).toContain('za');
    });

    it('should show [hya][pyo][za] not [][][]', () => {
      const analysis = analyzeMultiCharAnswer('ヒャピョザ', 'zzz');

      console.log('Issue 2 Analysis:', JSON.stringify(analysis, null, 2));

      // When user types garbage, should still show correct answers
      expect(analysis).toHaveLength(3);
      expect(analysis[0].character).toBe('ヒャ');
      expect(analysis[0].correctSyllables).toContain('hya');
      expect(analysis[0].isCorrect).toBe(false);

      expect(analysis[1].character).toBe('ピョ');
      expect(analysis[1].correctSyllables).toContain('pyo');
      expect(analysis[1].isCorrect).toBe(false);

      expect(analysis[2].character).toBe('ザ');
      expect(analysis[2].correctSyllables).toContain('za');
      expect(analysis[2].isCorrect).toBe(false);

      const formatted = formatCorrectAnswerWithIndicators(analysis);
      console.log('Issue 2 Formatted:', JSON.stringify(formatted, null, 2));

      // Should show the correct romanji even when user is completely wrong
      expect(formatted[0].syllable).toBe('hya');
      expect(formatted[0].isWrong).toBe(true);

      expect(formatted[1].syllable).toBe('pyo');
      expect(formatted[1].isWrong).toBe(true);

      expect(formatted[2].syllable).toBe('za');
      expect(formatted[2].isWrong).toBe(true);
    });
  });
});
