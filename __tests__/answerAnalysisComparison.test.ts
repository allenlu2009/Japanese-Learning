/**
 * Compare current syllable-matching approach vs WanaKana approach
 * Uses real user test cases to validate both implementations
 */

import { analyzeMultiCharAnswerWithSyllableMatching } from '@/lib/answerAnalysis';
import { analyzeMultiCharAnswerWithWanaKana, getWanaKanaDiagnostics } from '@/lib/answerAnalysisWanaKana';

describe('Answer Analysis Comparison: Current vs WanaKana', () => {
  describe('User-reported bug cases', () => {
    it('Case 1: かろで with "kalude"', () => {
      const hiragana = 'かろで';
      const userAnswer = 'kalude';

      // Current approach
      const currentResult = analyzeMultiCharAnswerWithSyllableMatching(hiragana, userAnswer);

      // WanaKana approach
      const wanaKanaResult = analyzeMultiCharAnswerWithWanaKana(hiragana, userAnswer);
      const diagnostics = getWanaKanaDiagnostics(userAnswer);

      console.log('\n=== Case 1: かろで with "kalude" ===');
      console.log('User input:', userAnswer);
      console.log('WanaKana converts to:', diagnostics.converted);
      console.log('Has unconverted chars:', diagnostics.hasUnconverted, diagnostics.unconvertedChars);

      console.log('\nCurrent approach:');
      console.log('  Syllables:', currentResult.map(r => r.userSyllable));
      console.log('  Correct?:', currentResult.map(r => r.isCorrect));
      console.log('  Visual:', formatVisual(currentResult));

      console.log('\nWanaKana approach:');
      console.log('  Chars:', wanaKanaResult.map(r => r.userSyllable));
      console.log('  Correct?:', wanaKanaResult.map(r => r.isCorrect));
      console.log('  Visual:', formatVisual(wanaKanaResult));

      // Both should identify middle character as wrong
      expect(currentResult[1].isCorrect).toBe(false); // ろ
      expect(wanaKanaResult[1].isCorrect).toBe(false); // ろ
    });

    it('Case 2: ばありゃ with "gearya"', () => {
      const hiragana = 'ばありゃ';
      const userAnswer = 'gearya';

      const currentResult = analyzeMultiCharAnswerWithSyllableMatching(hiragana, userAnswer);
      const wanaKanaResult = analyzeMultiCharAnswerWithWanaKana(hiragana, userAnswer);
      const diagnostics = getWanaKanaDiagnostics(userAnswer);

      console.log('\n=== Case 2: ばありゃ with "gearya" ===');
      console.log('User input:', userAnswer);
      console.log('WanaKana converts to:', diagnostics.converted);

      console.log('\nCurrent approach:');
      console.log('  Syllables:', currentResult.map(r => r.userSyllable));
      console.log('  Correct?:', currentResult.map(r => r.isCorrect));
      console.log('  Visual:', formatVisual(currentResult));

      console.log('\nWanaKana approach:');
      console.log('  Chars:', wanaKanaResult.map(r => r.userSyllable));
      console.log('  Correct?:', wanaKanaResult.map(r => r.isCorrect));
      console.log('  Visual:', formatVisual(wanaKanaResult));

      // First character should be wrong (ば vs げ)
      expect(currentResult[0].isCorrect).toBe(false);
      expect(wanaKanaResult[0].isCorrect).toBe(false);

      // Last character (りゃ) should be correct
      expect(currentResult[2].isCorrect).toBe(true);
      expect(wanaKanaResult[2].isCorrect).toBe(true);
    });

    it('Case 3: じゅごを with "jyogowo" (CRITICAL TEST)', () => {
      const hiragana = 'じゅごを';
      const userAnswer = 'jyogowo';

      const currentResult = analyzeMultiCharAnswerWithSyllableMatching(hiragana, userAnswer);
      const wanaKanaResult = analyzeMultiCharAnswerWithWanaKana(hiragana, userAnswer);
      const diagnostics = getWanaKanaDiagnostics(userAnswer);

      console.log('\n=== Case 3: じゅごを with "jyogowo" (CRITICAL) ===');
      console.log('User input:', userAnswer);
      console.log('WanaKana converts to:', diagnostics.converted);
      console.log('Expected hiragana:', hiragana);

      console.log('\nCurrent approach:');
      console.log('  Syllables:', currentResult.map(r => r.userSyllable));
      console.log('  Correct?:', currentResult.map(r => r.isCorrect));
      console.log('  Visual:', formatVisual(currentResult));

      console.log('\nWanaKana approach:');
      console.log('  Chars:', wanaKanaResult.map(r => r.userSyllable));
      console.log('  Correct?:', wanaKanaResult.map(r => r.isCorrect));
      console.log('  Visual:', formatVisual(wanaKanaResult));

      // Current approach: 'jyo' is wrong for じゅ (expects ju/jyu/zyu)
      expect(currentResult[0].isCorrect).toBe(false);

      // WanaKana approach: じょ ≠ じゅ (literal conversion shows real mistake)
      expect(wanaKanaResult[0].isCorrect).toBe(false);

      // This is interesting: both mark it wrong, but for different reasons
      // Current: "jyo" is not in ['ju', 'jyu', 'zyu']
      // WanaKana: じょ ≠ じゅ (user actually typed wrong sound)
    });
  });

  describe('Valid input cases', () => {
    it('Case 4: かたな with "katana" (all correct)', () => {
      const hiragana = 'かたな';
      const userAnswer = 'katana';

      const currentResult = analyzeMultiCharAnswerWithSyllableMatching(hiragana, userAnswer);
      const wanaKanaResult = analyzeMultiCharAnswerWithWanaKana(hiragana, userAnswer);

      console.log('\n=== Case 4: かたな with "katana" ===');
      console.log('Current:', formatVisual(currentResult));
      console.log('WanaKana:', formatVisual(wanaKanaResult));

      // Both should mark all correct
      expect(currentResult.every(r => r.isCorrect)).toBe(true);
      expect(wanaKanaResult.every(r => r.isCorrect)).toBe(true);
    });

    it('Case 5: Variant spellings (shi vs si)', () => {
      const hiragana = 'しかた';

      const result1 = analyzeMultiCharAnswerWithSyllableMatching(hiragana, 'shikata');
      const result2 = analyzeMultiCharAnswerWithSyllableMatching(hiragana, 'sikata');
      const wanaKana1 = analyzeMultiCharAnswerWithWanaKana(hiragana, 'shikata');
      const wanaKana2 = analyzeMultiCharAnswerWithWanaKana(hiragana, 'sikata');

      console.log('\n=== Case 5: Variant spellings ===');
      console.log('Current: shikata', result1.every(r => r.isCorrect));
      console.log('Current: sikata', result2.every(r => r.isCorrect));
      console.log('WanaKana: shikata', wanaKana1.every(r => r.isCorrect));
      console.log('WanaKana: sikata', wanaKana2.every(r => r.isCorrect));

      // Both approaches should accept variants
      expect(result1.every(r => r.isCorrect)).toBe(true);
      expect(result2.every(r => r.isCorrect)).toBe(true);
      expect(wanaKana1.every(r => r.isCorrect)).toBe(true);
      expect(wanaKana2.every(r => r.isCorrect)).toBe(true);
    });
  });

  describe('Malformed input', () => {
    it('Case 6: Completely invalid input "xyz"', () => {
      const hiragana = 'かたな';
      const userAnswer = 'xyz';

      const currentResult = analyzeMultiCharAnswerWithSyllableMatching(hiragana, userAnswer);
      const wanaKanaResult = analyzeMultiCharAnswerWithWanaKana(hiragana, userAnswer);
      const diagnostics = getWanaKanaDiagnostics(userAnswer);

      console.log('\n=== Case 6: Malformed "xyz" ===');
      console.log('WanaKana converts to:', diagnostics.converted);
      console.log('Current:', formatVisual(currentResult));
      console.log('WanaKana:', formatVisual(wanaKanaResult));

      // Both should mark all as wrong
      expect(currentResult.every(r => !r.isCorrect)).toBe(true);
      expect(wanaKanaResult.every(r => !r.isCorrect)).toBe(true);
    });

    it('Case 7: Partial valid "bannzkawa" (length mismatch)', () => {
      const hiragana = 'ばなかわ';
      const userAnswer = 'bannzkawa';

      const currentResult = analyzeMultiCharAnswerWithSyllableMatching(hiragana, userAnswer);
      const wanaKanaResult = analyzeMultiCharAnswerWithWanaKana(hiragana, userAnswer);
      const diagnostics = getWanaKanaDiagnostics(userAnswer);

      console.log('\n=== Case 7: Partial valid "bannzkawa" ===');
      console.log('Expected hiragana:', hiragana);
      console.log('WanaKana converts to:', diagnostics.converted);
      console.log('Expected char count:', hiragana.length, 'vs User char count:', diagnostics.converted.length);
      console.log('Has unconverted:', diagnostics.hasUnconverted, diagnostics.unconvertedChars);
      console.log('Current:', formatVisual(currentResult));
      console.log('WanaKana:', formatVisual(wanaKanaResult));

      // WanaKana will have unconverted chars
      expect(diagnostics.hasUnconverted).toBe(true);
      expect(diagnostics.unconvertedChars).toContain('z');

      // UPDATED: Alignment now preserves correct characters instead of marking all wrong
      // Before: [ba][na][ka][wa] (all wrong)
      // After: ba[na]kawa (only 2nd character wrong, matches syllable-matching)
      console.log('WanaKana alignment: Preserves correct characters ✓');
      expect(wanaKanaResult[0].isCorrect).toBe(true);  // ば correct
      expect(wanaKanaResult[1].isCorrect).toBe(false); // な wrong (got んん)
      expect(wanaKanaResult[2].isCorrect).toBe(true);  // か correct
      expect(wanaKanaResult[3].isCorrect).toBe(true);  // わ correct
    });
  });
});

// Helper to format visual output like [ka]ta[na]
function formatVisual(analysis: any[]): string {
  return analysis
    .map((a, i) => a.isCorrect ? a.correctSyllables[0] : `[${a.correctSyllables[0]}]`)
    .join('');
}
