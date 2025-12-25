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
