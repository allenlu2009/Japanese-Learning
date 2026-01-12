/**
 * Adapter for converting between Claude's internal format and Universal Export format
 * Based on: data/datasets/schema/examples/claude-adapter.ts
 */

import { CharacterAttempt } from './types';

// Universal Export Schema Types
export type TestType = 'hiragana' | 'katakana' | 'kanji' | 'vocabulary' | 'mixed';

export interface UniversalCharacterAttempt {
  position: number;
  character: string;
  expected: string[];
  response: string;
  correct: boolean;
}

export interface TestRecord {
  testType: TestType;
  timestamp: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  jlptLevel?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  isPractice?: boolean;
  breakdown?: UniversalCharacterAttempt[];
}

export interface UniversalExport {
  version: string;
  exportedAt: string;
  source: 'claude' | 'gemini' | 'codex';
  platform: 'web' | 'mobile';
  tests: TestRecord[];
  preferences?: {
    romajiSystem?: 'hepburn' | 'kunrei' | 'nihon';
    audioSettings?: {
      enabled: boolean;
      rate?: number;
      volume?: number;
    };
    [key: string]: unknown;
  };
}

// Timestamp utilities
export const TimestampUtils = {
  toISO(timestamp: number | string | Date): string {
    if (typeof timestamp === 'string') {
      return new Date(timestamp).toISOString();
    }
    if (typeof timestamp === 'number') {
      return new Date(timestamp).toISOString();
    }
    return timestamp.toISOString();
  },

  now(): string {
    return new Date().toISOString();
  }
};

// Map Claude's ScriptType to canonical TestType
function mapToTestType(scriptType: string): TestType {
  const mapping: Record<string, TestType> = {
    'hiragana': 'hiragana',
    'katakana': 'katakana',
    'kanji': 'kanji',
    'vocabulary': 'vocabulary',
  };
  return mapping[scriptType] || 'mixed';
}

// Map canonical TestType to Claude's ScriptType
function mapToScriptType(testType: TestType): string {
  return testType; // Direct mapping for Claude
}

/**
 * Convert Claude's CharacterAttempts to universal breakdown format
 */
function convertBreakdownToUniversal(attempts: CharacterAttempt[]): UniversalCharacterAttempt[] {
  // Group by originalSequence to reconstruct the breakdown
  const sequenceMap = new Map<string, CharacterAttempt[]>();

  attempts.forEach(attempt => {
    if (attempt.originalSequence) {
      const key = attempt.originalSequence;
      if (!sequenceMap.has(key)) {
        sequenceMap.set(key, []);
      }
      sequenceMap.get(key)!.push(attempt);
    }
  });

  // Convert first sequence found (for now, handle one test at a time)
  const firstSequence = Array.from(sequenceMap.values())[0];
  if (!firstSequence) return [];

  // Sort by sequence position
  firstSequence.sort((a, b) => (a.sequencePosition || 0) - (b.sequencePosition || 0));

  return firstSequence.map(attempt => ({
    position: attempt.sequencePosition || 0,
    character: attempt.character,
    expected: attempt.correctAnswers,
    response: attempt.userAnswer,
    correct: attempt.isCorrect
  }));
}

/**
 * Convert universal breakdown to Claude's CharacterAttempt format
 */
function convertBreakdownFromUniversal(
  breakdown: UniversalCharacterAttempt[],
  testId: string,
  timestamp: string,
  scriptType: string,
  jlptLevel?: 'N5' | 'N4'
): CharacterAttempt[] {
  const originalSequence = breakdown.map(b => b.character).join('');

  return breakdown.map((item, index) => ({
    id: `${testId}-${index}`,
    testId,
    timestamp,
    character: item.character,
    scriptType: scriptType as 'hiragana' | 'katakana' | 'kanji' | 'vocabulary',
    characterType: 'combo' as 'basic' | 'dakuten' | 'combo',
    userAnswer: item.response,
    correctAnswers: item.expected,
    isCorrect: item.correct,
    questionType: '3-char' as '1-char' | '3-char' | 'kanji' | 'vocabulary',
    sequencePosition: item.position,
    originalSequence,
    jlptLevel
  }));
}

/**
 * Export Claude's character attempts to universal format
 */
export function exportToUniversal(attempts: CharacterAttempt[]): UniversalExport {
  // Group attempts by testId to create test sessions
  const sessionMap = new Map<string, CharacterAttempt[]>();

  attempts.forEach(attempt => {
    if (!sessionMap.has(attempt.testId)) {
      sessionMap.set(attempt.testId, []);
    }
    sessionMap.get(attempt.testId)!.push(attempt);
  });

  const tests: TestRecord[] = Array.from(sessionMap.entries()).map(([testId, sessionAttempts]) => {
    const correctCount = sessionAttempts.filter(a => a.isCorrect).length;
    const firstAttempt = sessionAttempts[0];

    // Create breakdown if this is a multi-character test
    let breakdown: UniversalCharacterAttempt[] | undefined;
    if (firstAttempt.originalSequence) {
      breakdown = convertBreakdownToUniversal(sessionAttempts);
    }

    return {
      testType: mapToTestType(firstAttempt.scriptType),
      timestamp: TimestampUtils.toISO(firstAttempt.timestamp),
      totalQuestions: sessionAttempts.length,
      correctAnswers: correctCount,
      scorePercentage: Math.round((correctCount / sessionAttempts.length) * 100),
      jlptLevel: firstAttempt.jlptLevel,
      breakdown
    };
  });

  return {
    version: '1.0.0',
    exportedAt: TimestampUtils.now(),
    source: 'claude',
    platform: 'web',
    tests
  };
}

/**
 * Import universal format into Claude's character attempts
 */
export function importFromUniversal(data: UniversalExport): CharacterAttempt[] {
  const allAttempts: CharacterAttempt[] = [];

  data.tests.forEach(test => {
    const testId = `imported-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const timestamp = test.timestamp;
    const scriptType = mapToScriptType(test.testType);

    if (test.breakdown) {
      // Has character breakdown - reconstruct individual attempts
      const attempts = convertBreakdownFromUniversal(
        test.breakdown,
        testId,
        timestamp,
        scriptType,
        test.jlptLevel
      );
      allAttempts.push(...attempts);
    } else {
      // No breakdown - create summary attempt
      // This is a simplified representation
      const summaryAttempt: CharacterAttempt = {
        id: testId,
        testId,
        timestamp,
        character: `${test.testType} test`,
        scriptType: scriptType as 'hiragana' | 'katakana' | 'kanji' | 'vocabulary',
        characterType: 'basic',
        userAnswer: `${test.correctAnswers}/${test.totalQuestions}`,
        correctAnswers: [`${test.scorePercentage}%`],
        isCorrect: test.scorePercentage >= 70,
        questionType: test.testType === 'kanji' ? 'kanji' : test.testType === 'vocabulary' ? 'vocabulary' : '1-char',
        jlptLevel: test.jlptLevel
      };
      allAttempts.push(summaryAttempt);
    }
  });

  return allAttempts;
}

/**
 * Validate import data structure
 */
export function validateImport(data: unknown): data is UniversalExport {
  if (typeof data !== 'object' || data === null) return false;

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.version === 'string' &&
    typeof obj.exportedAt === 'string' &&
    ['claude', 'gemini', 'codex'].includes(obj.source as string) &&
    ['web', 'mobile'].includes(obj.platform as string) &&
    Array.isArray(obj.tests)
  );
}

/**
 * Download JSON file
 */
export function downloadJSON(data: UniversalExport, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
