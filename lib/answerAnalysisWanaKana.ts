/**
 * Alternative answer analysis using WanaKana library
 * This is the ChatGPT-proposed approach: romaji → hiragana → compare
 */

import { toHiragana } from 'wanakana';
import { splitHiraganaIntoCharacters } from './answerAnalysis';
import type { CharacterAnalysis } from './answerAnalysis';
import { findHiragana } from './hiragana';

/**
 * Analyze multi-character answer using WanaKana conversion approach
 *
 * Strategy:
 * 1. Convert user's romaji input to hiragana using WanaKana
 * 2. Split both hiragana sequences into character tokens
 * 3. Compare character-by-character
 *
 * Advantages:
 * - Leverages battle-tested WanaKana library
 * - Handles variants automatically (shi/si, chi/ti, etc.)
 * - Simpler implementation
 *
 * Tradeoffs:
 * - Loses exact mapping of wrong romaji syllable
 * - Malformed input might partially convert
 * - User sees correct answer with brackets, but not their exact typo
 *
 * @param hiraganaSequence - The correct hiragana characters (e.g., "かたな")
 * @param userAnswer - User's romaji input (e.g., "banana")
 * @returns Array of analysis for each character
 */
export function analyzeMultiCharAnswerWithWanaKana(
  hiraganaSequence: string,
  userAnswer: string
): CharacterAnalysis[] {
  // Step 1: Convert user's romaji to hiragana
  const userHiragana = toHiragana(userAnswer.toLowerCase().trim());

  // Step 2: Split both into character tokens (handles combo chars)
  const correctChars = splitHiraganaIntoCharacters(hiraganaSequence);
  const userChars = splitHiraganaIntoCharacters(userHiragana);

  // Step 3: Check for length mismatch (malformed input fallback)
  const lengthMismatch = correctChars.length !== userChars.length;

  if (lengthMismatch) {
    // Graceful degradation: Mark ALL as wrong (show entire answer in brackets)
    // UX signal: [entire answer] = "way off, here's the correct answer"
    return correctChars.map((correctChar, index) => {
      const hiraganaChar = findHiragana(correctChar);

      return {
        character: correctChar,
        userSyllable: userChars[index] || '', // May be out of bounds
        correctSyllables: hiraganaChar?.romanji || [],
        isCorrect: false, // All marked wrong due to mismatch
        position: index,
      };
    });
  }

  // Step 4: Normal path - Compare character-by-character
  return correctChars.map((correctChar, index) => {
    const hiraganaChar = findHiragana(correctChar);
    const userChar = userChars[index] || '';

    if (!hiraganaChar) {
      return {
        character: correctChar,
        userSyllable: userChar,
        correctSyllables: [],
        isCorrect: false,
        position: index,
      };
    }

    // Direct character comparison
    const isCorrect = correctChar === userChar;

    return {
      character: correctChar,
      userSyllable: userChar, // This is the hiragana, not romaji!
      correctSyllables: hiraganaChar.romanji,
      isCorrect,
      position: index,
    };
  });
}

/**
 * Get conversion diagnostics for debugging
 * Shows what WanaKana does with the input
 */
export function getWanaKanaDiagnostics(userAnswer: string): {
  original: string;
  converted: string;
  hasUnconverted: boolean;
  unconvertedChars: string[];
} {
  const converted = toHiragana(userAnswer.toLowerCase().trim());

  // Check if any ASCII characters remain (indicates partial conversion)
  const unconvertedChars: string[] = [];
  for (const char of converted) {
    if (char.charCodeAt(0) < 128) { // ASCII range
      unconvertedChars.push(char);
    }
  }

  return {
    original: userAnswer,
    converted,
    hasUnconverted: unconvertedChars.length > 0,
    unconvertedChars,
  };
}
