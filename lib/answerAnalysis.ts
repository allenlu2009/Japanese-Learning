import { findHiragana } from './hiragana';
import { splitUserAnswer } from './syllableMatching';

export interface CharacterAnalysis {
  character: string;
  userSyllable: string;
  correctSyllables: string[];
  isCorrect: boolean;
  position: number;
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
