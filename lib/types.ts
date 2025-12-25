// Core category type
export type TestCategory = 'read' | 'listen' | 'write' | 'speak';

// Main test interface
export interface Test {
  id: string;                    // UUID
  date: string;                  // ISO date string
  score: number;                 // 0-100 scale
  category: TestCategory;
  description: string;
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
}

// Form input interface (before validation)
export interface TestFormData {
  date: string;
  score: string | number;
  category: TestCategory | '';
  description: string;
}

// Validation error interface
export interface ValidationErrors {
  date?: string;
  score?: string;
  category?: string;
  description?: string;
}

// Analytics interfaces
export interface CategoryStats {
  category: TestCategory;
  count: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  trend: 'up' | 'down' | 'stable';
}

export interface OverallStats {
  totalTests: number;
  averageScore: number;
  categoryStats: CategoryStats[];
  recentTests: Test[];
  scoresByMonth: MonthlyScore[];
}

export interface MonthlyScore {
  month: string;              // e.g., "2024-01"
  averageScore: number;
  testCount: number;
}

// UI State interfaces
export interface FilterOptions {
  category?: TestCategory;
  dateFrom?: string;
  dateTo?: string;
  sortBy: 'date' | 'score' | 'category';
  sortOrder: 'asc' | 'desc';
}

// localStorage data structure
export interface StorageData {
  tests: Test[];
  version: string;
  lastUpdated: string;
}

// Interactive Test types
export type TestMode = 'manual' | 'interactive';
export type TestType = '1-char' | '3-char';
export type QuestionCount = 5 | 10 | 20;

export interface TestConfig {
  mode: TestMode;
  testType?: TestType;
  questionCount?: QuestionCount;
}

export interface TestSession {
  config: TestConfig;
  questions: Array<{
    id: string;
    characters: string;
    correctAnswers: string[];
    userAnswer?: string;
    isCorrect?: boolean;
  }>;
  currentQuestionIndex: number;
  startTime: Date;
  endTime?: Date;
}

// Character Analytics types
export interface CharacterAttempt {
  id: string;                    // UUID for the attempt
  testId: string;                // Foreign key to Test.id
  timestamp: string;             // ISO timestamp when answered
  character: string;             // Single hiragana character (e.g., 'あ')
  characterType: 'basic' | 'dakuten' | 'combo';
  userAnswer: string;            // What user typed
  correctAnswers: string[];      // Valid romanji options
  isCorrect: boolean;            // Was the answer correct?
  questionType: '1-char' | '3-char';
  sequencePosition?: number;     // For 3-char: position (0, 1, 2)
  originalSequence?: string;     // For 3-char: full sequence
}

export interface CharacterStats {
  character: string;
  characterType: 'basic' | 'dakuten' | 'combo';
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  successRate: number;           // 0-100
  firstAttemptDate: string;
  lastAttemptDate: string;
  trend: 'improving' | 'declining' | 'stable';
  commonMistakes: Array<{
    answer: string;
    count: number;
  }>;
  recentSuccessRate: number;     // Last 10 attempts
  allTimeSuccessRate: number;    // Same as successRate (for clarity)
}

export interface CharacterStorageData {
  attempts: CharacterAttempt[];
  version: string;
  lastUpdated: string;
}

export interface CharacterAnalyticsFilter {
  characterType?: 'basic' | 'dakuten' | 'combo';
  minAttempts?: number;
  sortBy: 'character' | 'successRate' | 'totalAttempts' | 'recentPerformance';
  sortOrder: 'asc' | 'desc';
}
