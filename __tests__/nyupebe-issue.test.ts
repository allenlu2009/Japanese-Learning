/**
 * Test case for user-reported issue: にゅぺべ with "niyupebe"
 * Expected: [nyu]pebe (only first wrong)
 * Current WanaKana: [nyu][pe][be] (all wrong due to length mismatch)
 */

import { analyzeMultiCharAnswerWithSyllableMatching } from '@/lib/answerAnalysis';
import { analyzeMultiCharAnswerWithWanaKana } from '@/lib/answerAnalysisWanaKana';
import { toHiragana } from 'wanakana';

describe('にゅぺべ Issue Analysis', () => {
  const hiragana = 'にゅぺべ';
  const userAnswer = 'niyupebe';

  it('WanaKana conversion diagnostic', () => {
    const converted = toHiragana(userAnswer);

    console.log('\n=== WanaKana Conversion ===');
    console.log('Question:', hiragana, '(3 chars)');
    console.log('User input:', userAnswer);
    console.log('Converts to:', converted, `(${converted.length} chars)`);
    console.log('Length mismatch:', converted.length !== hiragana.length);

    // WanaKana converts "niyupebe" → "にゆぺべ" (4 chars)
    expect(converted).toBe('にゆぺべ');
    expect(converted.length).toBe(4);
  });

  it('Syllable-matching strategy result', () => {
    const result = analyzeMultiCharAnswerWithSyllableMatching(hiragana, userAnswer);

    console.log('\n=== Syllable-Matching Strategy ===');
    result.forEach((r, i) => {
      console.log(`  [${i}] ${r.character}: "${r.userSyllable}" ${r.isCorrect ? '✓' : '✗'}`);
    });

    const visual = result.map(r =>
      r.isCorrect ? r.correctSyllables[0] : `[${r.correctSyllables[0]}]`
    ).join('');
    console.log('Visual output:', visual);

    // Should be: [nyu]pebe
    expect(result[0].isCorrect).toBe(false); // にゅ wrong
    expect(result[1].isCorrect).toBe(true);  // ぺ correct
    expect(result[2].isCorrect).toBe(true);  // べ correct
  });

  it('WanaKana strategy result (FIXED with alignment)', () => {
    const result = analyzeMultiCharAnswerWithWanaKana(hiragana, userAnswer);

    console.log('\n=== WanaKana Strategy (FIXED) ===');
    result.forEach((r, i) => {
      console.log(`  [${i}] ${r.character}: "${r.userSyllable}" ${r.isCorrect ? '✓' : '✗'}`);
    });

    const visual = result.map(r =>
      r.isCorrect ? r.correctSyllables[0] : `[${r.correctSyllables[0]}]`
    ).join('');
    console.log('Visual output:', visual);
    console.log('✅ Fixed: Uses alignment to preserve correct syllables');

    // FIXED: Only first wrong, last two correct
    expect(result[0].isCorrect).toBe(false); // にゅ wrong (got "にゆ")
    expect(result[1].isCorrect).toBe(true);  // ぺ correct
    expect(result[2].isCorrect).toBe(true);  // べ correct
    expect(visual).toBe('[nyu]pebe'); // Should match syllable-matching output
  });
});
