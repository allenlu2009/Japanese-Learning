/**
 * Adapter for converting between Claude's internal format and Universal Export v1.0
 * UPDATED to match finalized flat schema spec
 */

import { CharacterAttempt } from './types';
import { v4 as uuidv4 } from 'uuid';

// Universal Export Schema v1.0 Types (FLAT STRUCTURE)
export type TestType = 'hiragana' | 'katakana' | 'kanji' | 'vocabulary' | 'mixed';

export interface TestRecord {
  id: string;
  timestamp: string;
  testType: TestType;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  jlptLevel?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  difficulty?: string;
}

export interface CharacterAttemptRecord {
  id: string;
  testId: string;
  timestamp: string;
  prompt: string;
  expected: string[];
  response: string;
  correct: boolean;
  scriptType?: 'hiragana' | 'katakana' | 'kanji' | 'vocabulary';
  jlptLevel?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  characterType?: 'basic' | 'dakuten' | 'combo';
}

export interface UniversalExport {
  version: "1.0";
  exportedAt: string;
  tests: TestRecord[];
  attempts: CharacterAttemptRecord[];
  settings: {
    romajiSystem?: 'hepburn' | 'kunrei' | 'nihon';
    audioSettings?: {
      enabled: boolean;
      rate?: number;
      volume?: number;
    };
    [key: string]: unknown;
  };
  meta: {
    exportedBy: 'claude' | 'gemini' | 'codex';
    platform: 'web' | 'mobile';
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

/**
 * Export Claude's character attempts to Universal v1.0 format
 * FLAT STRUCTURE: tests and attempts are separate arrays
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

  const tests: TestRecord[] = [];
  const attemptRecords: CharacterAttemptRecord[] = [];

  sessionMap.forEach((sessionAttempts, testId) => {
    const correctCount = sessionAttempts.filter(a => a.isCorrect).length;
    const firstAttempt = sessionAttempts[0];
    const score = Math.round((correctCount / sessionAttempts.length) * 100);

    // Create test record
    tests.push({
      id: testId,
      timestamp: TimestampUtils.toISO(firstAttempt.timestamp),
      testType: mapToTestType(firstAttempt.scriptType),
      score,
      totalQuestions: sessionAttempts.length,
      correctAnswers: correctCount,
      jlptLevel: firstAttempt.jlptLevel,
      difficulty: firstAttempt.questionType
    });

    // Create flat attempt records
    sessionAttempts.forEach(attempt => {
      attemptRecords.push({
        id: attempt.id,
        testId: testId,
        timestamp: TimestampUtils.toISO(attempt.timestamp),
        prompt: attempt.character,
        expected: attempt.correctAnswers,
        response: attempt.userAnswer,
        correct: attempt.isCorrect,
        scriptType: attempt.scriptType,
        jlptLevel: attempt.jlptLevel,
        characterType: attempt.characterType
      });
    });
  });

  return {
    version: "1.0",
    exportedAt: TimestampUtils.now(),
    tests,
    attempts: attemptRecords,
    settings: {
      romajiSystem: 'hepburn'
    },
    meta: {
      exportedBy: 'claude',
      platform: 'web'
    }
  };
}

/**
 * Import Universal v1.0 format into Claude's character attempts
 */
export function importFromUniversal(data: UniversalExport): CharacterAttempt[] {
  const allAttempts: CharacterAttempt[] = [];

  // Convert flat attempts back to Claude's format
  data.attempts.forEach(attempt => {
    const claudeAttempt: CharacterAttempt = {
      id: attempt.id,
      testId: attempt.testId,
      timestamp: attempt.timestamp,
      character: attempt.prompt,
      scriptType: (attempt.scriptType || 'hiragana') as 'hiragana' | 'katakana' | 'kanji' | 'vocabulary',
      characterType: attempt.characterType || 'basic',
      userAnswer: attempt.response,
      correctAnswers: attempt.expected,
      isCorrect: attempt.correct,
      questionType: '1-char', // Default, could be enhanced
      jlptLevel: attempt.jlptLevel
    };
    allAttempts.push(claudeAttempt);
  });

  return allAttempts;
}

/**
 * Validate import data structure (v1.0)
 */
export function validateImport(data: unknown): data is UniversalExport {
  if (typeof data !== 'object' || data === null) return false;

  const obj = data as Record<string, unknown>;

  return (
    obj.version === '1.0' &&
    typeof obj.exportedAt === 'string' &&
    Array.isArray(obj.tests) &&
    Array.isArray(obj.attempts) &&
    typeof obj.settings === 'object' &&
    typeof obj.meta === 'object' &&
    (obj.meta as any).exportedBy !== undefined &&
    (obj.meta as any).platform !== undefined
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
