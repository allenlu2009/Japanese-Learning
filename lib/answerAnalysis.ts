import { findHiragana, ALL_HIRAGANA, type HiraganaChar } from './hiragana';
import { splitUserAnswer } from './syllableMatching';
import { ANSWER_ANALYSIS_STRATEGY } from './constants';

export interface CharacterAnalysis {
  character: string;
  userSyllable: string;
  correctSyllables: string[];
  isCorrect: boolean;
  position: number;
}

/**
 * Split hiragana text into individual hiragana character units (treating combos as single units)
 * For example: "じゅごを" → ['じゅ', 'ご', 'を'] not ['じ', 'ゅ', 'ご', 'を']
 */
export function splitHiraganaIntoCharacters(text: string): string[] {
  const chars: string[] = [];
  let i = 0;

  while (i < text.length) {
    let matched = false;

    // Try 2-character combo first
    if (i + 1 < text.length) {
      const twoChar = text.slice(i, i + 2);
      if (ALL_HIRAGANA.some((h: HiraganaChar) => h.hiragana === twoChar)) {
        chars.push(twoChar);
        i += 2;
        matched = true;
      }
    }

    // Try single character
    if (!matched) {
      const oneChar = text[i];
      if (ALL_HIRAGANA.some((h: HiraganaChar) => h.hiragana === oneChar)) {
        chars.push(oneChar);
        i += 1;
      } else {
        // Not a valid hiragana, skip
        i += 1;
      }
    }
  }

  return chars;
}

/**
 * Count the number of hiragana characters in a string, treating combo characters as single units
 * For example: "ばありゃ" = 3 characters (ば, あ, りゃ) not 4
 */
export function countHiraganaCharacters(text: string): number {
  return splitHiraganaIntoCharacters(text).length;
}

/**
 * Analyzes a multi-character answer using syllable-matching strategy
 * (Custom greedy matching + resynchronization algorithm)
 *
 * @param hiraganaSequence - The hiragana characters shown (e.g., "かたな")
 * @param userAnswer - The user's romanji answer (e.g., "banana")
 * @returns Array of analysis for each character
 */
export function analyzeMultiCharAnswerWithSyllableMatching(
  hiraganaSequence: string,
  userAnswer: string
): CharacterAnalysis[] {
  const chars = splitHiraganaIntoCharacters(hiraganaSequence);
  const hiraganaChars = chars.map(c => findHiragana(c));
  const userSyllables = splitUserAnswer(userAnswer, hiraganaChars);

  return chars.map((char, index) => {
    const hiraganaChar = hiraganaChars[index];
    const userSyllable = userSyllables[index] || '';

    if (!hiraganaChar) {
      return {
        character: char,
        userSyllable,
        correctSyllables: [],
        isCorrect: false,
        position: index,
      };
    }

    const isCorrect = hiraganaChar.romanji.some(
      valid => valid.toLowerCase() === userSyllable.toLowerCase()
    );

    return {
      character: char,
      userSyllable,
      correctSyllables: hiraganaChar.romanji,
      isCorrect,
      position: index,
    };
  });
}

/**
 * Analyzes a multi-character answer using the configured strategy
 * This is the main public API - dispatches to the appropriate implementation
 *
 * @param hiraganaSequence - The hiragana characters shown (e.g., "かたな")
 * @param userAnswer - The user's romanji answer (e.g., "banana")
 * @returns Array of analysis for each character
 */
export function analyzeMultiCharAnswer(
  hiraganaSequence: string,
  userAnswer: string
): CharacterAnalysis[] {
  if (ANSWER_ANALYSIS_STRATEGY === 'wanakana') {
    // Import dynamically to avoid loading WanaKana if using syllable-matching
    const { analyzeMultiCharAnswerWithWanaKana } = require('./answerAnalysisWanaKana');
    return analyzeMultiCharAnswerWithWanaKana(hiraganaSequence, userAnswer);
  }

  // Default to syllable-matching strategy
  return analyzeMultiCharAnswerWithSyllableMatching(hiraganaSequence, userAnswer);
}

/**
 * Formats a correct answer with visual indicators for wrong characters
 *
 * @param analysis - Character analysis array
 * @returns Formatted string with markers for wrong characters
 */
export function formatCorrectAnswerWithIndicators(
  analysis: CharacterAnalysis[]
): Array<{ syllable: string; isWrong: boolean }> {
  return analysis.map(a => ({
    syllable: a.correctSyllables[0] || '',
    isWrong: !a.isCorrect,
  }));
}
