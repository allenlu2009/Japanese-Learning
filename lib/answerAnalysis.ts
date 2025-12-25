import { findHiragana, ALL_HIRAGANA, type HiraganaChar } from './hiragana';
import { splitUserAnswer } from './syllableMatching';

export interface CharacterAnalysis {
  character: string;
  userSyllable: string;
  correctSyllables: string[];
  isCorrect: boolean;
  position: number;
}

/**
 * Count the number of hiragana characters in a string, treating combo characters as single units
 * For example: "ばありゃ" = 3 characters (ば, あ, りゃ) not 4
 */
export function countHiraganaCharacters(text: string): number {
  let count = 0;
  let i = 0;

  while (i < text.length) {
    // Try to match longest combo first (2 chars), then single char
    let matched = false;

    // Try 2-character combo
    if (i + 1 < text.length) {
      const twoChar = text.slice(i, i + 2);
      if (ALL_HIRAGANA.some((h: HiraganaChar) => h.hiragana === twoChar)) {
        count++;
        i += 2;
        matched = true;
      }
    }

    // Try single character
    if (!matched) {
      const oneChar = text[i];
      if (ALL_HIRAGANA.some((h: HiraganaChar) => h.hiragana === oneChar)) {
        count++;
        i += 1;
      } else {
        // Not a valid hiragana, skip
        i += 1;
      }
    }
  }

  return count;
}

/**
 * Analyzes a multi-character answer to determine which characters are correct/incorrect
 *
 * @param hiraganaSequence - The hiragana characters shown (e.g., "かたな")
 * @param userAnswer - The user's romanji answer (e.g., "banana")
 * @returns Array of analysis for each character
 */
export function analyzeMultiCharAnswer(
  hiraganaSequence: string,
  userAnswer: string
): CharacterAnalysis[] {
  const chars = hiraganaSequence.split('');
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
