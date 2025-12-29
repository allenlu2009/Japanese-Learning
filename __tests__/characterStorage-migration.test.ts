import type { CharacterAttempt } from '@/lib/types';
import { CHARACTER_STORAGE_KEY } from '@/lib/constants';

// Mock localStorage before importing characterStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

// Import after localStorage is mocked
import {
  getCharacterAttempts,
  addCharacterAttempts,
  replaceCharacterAttempts,
  clearAllCharacterAttempts,
  importCharacterAttempts,
  exportCharacterAttempts,
} from '@/lib/characterStorage';

describe('CharacterStorage Migration Tests', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    localStorageMock.clear();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  describe('scriptType field migration', () => {
    it('should auto-migrate hiragana attempts without scriptType field', () => {
      // Create legacy data without scriptType
      const legacyAttempts = [
        {
          id: 'test-1',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:00.000Z',
          character: 'あ',
          characterType: 'basic' as const,
          userAnswer: 'a',
          correctAnswers: ['a'],
          isCorrect: true,
          questionType: '1-char' as const,
          // scriptType is missing
        },
        {
          id: 'test-2',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:01.000Z',
          character: 'い',
          characterType: 'basic' as const,
          userAnswer: 'i',
          correctAnswers: ['i'],
          isCorrect: true,
          questionType: '1-char' as const,
          // scriptType is missing
        },
      ];

      // Save legacy data directly to localStorage
      const legacyData = {
        attempts: legacyAttempts,
        version: '1.0',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      };
      localStorageMock.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(legacyData));

      // Load attempts - should trigger migration
      const attempts = getCharacterAttempts();

      // Verify migration occurred
      expect(attempts).toHaveLength(2);
      expect(attempts[0].scriptType).toBe('hiragana');
      expect(attempts[1].scriptType).toBe('hiragana');
      expect(attempts[0].character).toBe('あ');
      expect(attempts[1].character).toBe('い');
    });

    it('should auto-migrate katakana attempts without scriptType field', () => {
      // Create legacy data without scriptType
      const legacyAttempts = [
        {
          id: 'test-1',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:00.000Z',
          character: 'ア',
          characterType: 'basic' as const,
          userAnswer: 'a',
          correctAnswers: ['a'],
          isCorrect: true,
          questionType: '1-char' as const,
          // scriptType is missing
        },
        {
          id: 'test-2',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:01.000Z',
          character: 'イ',
          characterType: 'basic' as const,
          userAnswer: 'i',
          correctAnswers: ['i'],
          isCorrect: true,
          questionType: '1-char' as const,
          // scriptType is missing
        },
      ];

      // Save legacy data directly to localStorage
      const legacyData = {
        attempts: legacyAttempts,
        version: '1.0',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      };
      localStorageMock.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(legacyData));

      // Load attempts - should trigger migration
      const attempts = getCharacterAttempts();

      // Verify migration occurred
      expect(attempts).toHaveLength(2);
      expect(attempts[0].scriptType).toBe('katakana');
      expect(attempts[1].scriptType).toBe('katakana');
      expect(attempts[0].character).toBe('ア');
      expect(attempts[1].character).toBe('イ');
    });

    it('should handle mixed hiragana and katakana in legacy data', () => {
      // Create legacy data without scriptType
      const legacyAttempts = [
        {
          id: 'test-1',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:00.000Z',
          character: 'あ',
          characterType: 'basic' as const,
          userAnswer: 'a',
          correctAnswers: ['a'],
          isCorrect: true,
          questionType: '1-char' as const,
        },
        {
          id: 'test-2',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:01.000Z',
          character: 'ア',
          characterType: 'basic' as const,
          userAnswer: 'a',
          correctAnswers: ['a'],
          isCorrect: true,
          questionType: '1-char' as const,
        },
        {
          id: 'test-3',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:02.000Z',
          character: 'き',
          characterType: 'basic' as const,
          userAnswer: 'ki',
          correctAnswers: ['ki'],
          isCorrect: true,
          questionType: '1-char' as const,
        },
        {
          id: 'test-4',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:03.000Z',
          character: 'キ',
          characterType: 'basic' as const,
          userAnswer: 'ki',
          correctAnswers: ['ki'],
          isCorrect: true,
          questionType: '1-char' as const,
        },
      ];

      // Save legacy data
      const legacyData = {
        attempts: legacyAttempts,
        version: '1.0',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      };
      localStorageMock.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(legacyData));

      // Load attempts - should trigger migration
      const attempts = getCharacterAttempts();

      // Verify migration occurred correctly
      expect(attempts).toHaveLength(4);
      expect(attempts[0].scriptType).toBe('hiragana');
      expect(attempts[1].scriptType).toBe('katakana');
      expect(attempts[2].scriptType).toBe('hiragana');
      expect(attempts[3].scriptType).toBe('katakana');
    });

    it('should not modify attempts that already have scriptType field', () => {
      // Create data with scriptType already present
      const currentAttempts: CharacterAttempt[] = [
        {
          id: 'test-1',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:00.000Z',
          character: 'あ',
          scriptType: 'hiragana',
          characterType: 'basic',
          userAnswer: 'a',
          correctAnswers: ['a'],
          isCorrect: true,
          questionType: '1-char',
        },
        {
          id: 'test-2',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:01.000Z',
          character: 'ア',
          scriptType: 'katakana',
          characterType: 'basic',
          userAnswer: 'a',
          correctAnswers: ['a'],
          isCorrect: true,
          questionType: '1-char',
        },
      ];

      // Save current data
      const currentData = {
        attempts: currentAttempts,
        version: '1.0',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      };
      localStorageMock.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(currentData));

      // Load attempts - should not modify
      const attempts = getCharacterAttempts();

      // Verify no changes
      expect(attempts).toHaveLength(2);
      expect(attempts[0].scriptType).toBe('hiragana');
      expect(attempts[1].scriptType).toBe('katakana');
      expect(attempts[0].id).toBe('test-1');
      expect(attempts[1].id).toBe('test-2');
    });

    it('should migrate combo characters correctly', () => {
      // Create legacy data with combo characters
      const legacyAttempts = [
        {
          id: 'test-1',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:00.000Z',
          character: 'きゃ',
          characterType: 'combo' as const,
          userAnswer: 'kya',
          correctAnswers: ['kya'],
          isCorrect: true,
          questionType: '1-char' as const,
        },
        {
          id: 'test-2',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:01.000Z',
          character: 'キャ',
          characterType: 'combo' as const,
          userAnswer: 'kya',
          correctAnswers: ['kya'],
          isCorrect: true,
          questionType: '1-char' as const,
        },
      ];

      // Save legacy data
      const legacyData = {
        attempts: legacyAttempts,
        version: '1.0',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      };
      localStorageMock.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(legacyData));

      // Load attempts
      const attempts = getCharacterAttempts();

      // Verify combo characters migrated correctly
      expect(attempts).toHaveLength(2);
      expect(attempts[0].scriptType).toBe('hiragana');
      expect(attempts[0].character).toBe('きゃ');
      expect(attempts[0].characterType).toBe('combo');
      expect(attempts[1].scriptType).toBe('katakana');
      expect(attempts[1].character).toBe('キャ');
      expect(attempts[1].characterType).toBe('combo');
    });

    it('should persist migrated data to localStorage', () => {
      // Create legacy data
      const legacyAttempts = [
        {
          id: 'test-1',
          testId: 'test-session-1',
          timestamp: '2024-01-01T00:00:00.000Z',
          character: 'あ',
          characterType: 'basic' as const,
          userAnswer: 'a',
          correctAnswers: ['a'],
          isCorrect: true,
          questionType: '1-char' as const,
        },
      ];

      const legacyData = {
        attempts: legacyAttempts,
        version: '1.0',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      };
      localStorageMock.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(legacyData));

      // Load attempts - triggers migration
      const attempts = getCharacterAttempts();

      // Verify scriptType was added
      expect(attempts[0].scriptType).toBe('hiragana');

      // Read directly from localStorage to verify persistence
      const storedData = localStorageMock.getItem(CHARACTER_STORAGE_KEY);
      expect(storedData).not.toBeNull();

      const parsed = JSON.parse(storedData!);
      expect(parsed.attempts).toHaveLength(1);
      expect(parsed.attempts[0].scriptType).toBe('hiragana');
    });
  });

  describe('importCharacterAttempts with migration', () => {
    it('should migrate imported legacy data without scriptType', () => {
      // Create legacy export data without scriptType
      const legacyExportData = {
        attempts: [
          {
            id: 'test-1',
            testId: 'test-session-1',
            timestamp: '2024-01-01T00:00:00.000Z',
            character: 'あ',
            characterType: 'basic',
            userAnswer: 'a',
            correctAnswers: ['a'],
            isCorrect: true,
            questionType: '1-char',
          },
          {
            id: 'test-2',
            testId: 'test-session-1',
            timestamp: '2024-01-01T00:00:01.000Z',
            character: 'ア',
            characterType: 'basic',
            userAnswer: 'a',
            correctAnswers: ['a'],
            isCorrect: true,
            questionType: '1-char',
          },
        ],
        version: '1.0',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      };

      // Import legacy data
      const success = importCharacterAttempts(JSON.stringify(legacyExportData));
      expect(success).toBe(true);

      // Verify migration occurred during import
      const attempts = getCharacterAttempts();
      expect(attempts).toHaveLength(2);
      expect(attempts[0].scriptType).toBe('hiragana');
      expect(attempts[1].scriptType).toBe('katakana');
    });

    it('should accept imported data with scriptType field', () => {
      // Create current export data with scriptType
      const currentExportData = {
        attempts: [
          {
            id: 'test-1',
            testId: 'test-session-1',
            timestamp: '2024-01-01T00:00:00.000Z',
            character: 'あ',
            scriptType: 'hiragana',
            characterType: 'basic',
            userAnswer: 'a',
            correctAnswers: ['a'],
            isCorrect: true,
            questionType: '1-char',
          },
        ],
        version: '1.0',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      };

      // Import current data
      const success = importCharacterAttempts(JSON.stringify(currentExportData));
      expect(success).toBe(true);

      // Verify data preserved
      const attempts = getCharacterAttempts();
      expect(attempts).toHaveLength(1);
      expect(attempts[0].scriptType).toBe('hiragana');
    });
  });
});
