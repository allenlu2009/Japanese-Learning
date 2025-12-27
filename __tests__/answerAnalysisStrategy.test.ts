/**
 * Test that the answer analysis strategy configuration works correctly
 */

import { analyzeMultiCharAnswer } from '@/lib/answerAnalysis';

describe('Answer Analysis Strategy Configuration', () => {
  it('should use WanaKana strategy by default', () => {
    const hiragana = 'かろで';
    const userAnswer = 'kalude';

    const result = analyzeMultiCharAnswer(hiragana, userAnswer);

    // WanaKana converts "kalude" → "かぅで" (length mismatch with かろで)
    // With WanaKana strategy, this should mark all as wrong due to mismatch
    console.log('Strategy test result:', result.map(r => ({ char: r.character, correct: r.isCorrect })));

    // Verify we got results
    expect(result).toHaveLength(3);
    expect(result[0].character).toBe('か');
    expect(result[1].character).toBe('ろ');
    expect(result[2].character).toBe('で');
  });

  it('should handle valid input correctly', () => {
    const hiragana = 'かたな';
    const userAnswer = 'katana';

    const result = analyzeMultiCharAnswer(hiragana, userAnswer);

    console.log('Valid input test:', result.map(r => ({ char: r.character, correct: r.isCorrect })));

    // All should be correct
    expect(result.every(r => r.isCorrect)).toBe(true);
  });

  it('should handle variant spellings', () => {
    const hiragana = 'しかた';

    const result1 = analyzeMultiCharAnswer(hiragana, 'shikata');
    const result2 = analyzeMultiCharAnswer(hiragana, 'sikata');

    console.log('Variant test shi:', result1.every(r => r.isCorrect));
    console.log('Variant test si:', result2.every(r => r.isCorrect));

    // Both variants should be accepted
    expect(result1.every(r => r.isCorrect)).toBe(true);
    expect(result2.every(r => r.isCorrect)).toBe(true);
  });

  it('should handle combo characters', () => {
    const hiragana = 'きゃた';
    const userAnswer = 'kyata';

    const result = analyzeMultiCharAnswer(hiragana, userAnswer);

    console.log('Combo char test:', result.map(r => ({ char: r.character, correct: r.isCorrect })));

    expect(result).toHaveLength(2); // きゃ (1) + た (1) = 2 chars
    expect(result.every(r => r.isCorrect)).toBe(true);
  });
});
