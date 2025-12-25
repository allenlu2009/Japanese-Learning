import type { CharacterAttempt, CharacterStorageData } from './types';
import { CHARACTER_STORAGE_KEY, CHARACTER_STORAGE_VERSION } from './constants';

// Check if localStorage is available
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// Get all character attempts from localStorage
export function getCharacterAttempts(): CharacterAttempt[] {
  if (!isLocalStorageAvailable()) {
    console.error('localStorage is not available');
    return [];
  }

  try {
    const data = localStorage.getItem(CHARACTER_STORAGE_KEY);
    if (!data) {
      return [];
    }

    const parsed: CharacterStorageData = JSON.parse(data);

    // Validate structure
    if (!parsed.attempts || !Array.isArray(parsed.attempts)) {
      console.error('Invalid character storage data structure');
      return [];
    }

    return parsed.attempts;
  } catch (error) {
    console.error('Error reading character attempts from localStorage:', error);
    return [];
  }
}

// Get attempts for a specific test
export function getAttemptsByTestId(testId: string): CharacterAttempt[] {
  const attempts = getCharacterAttempts();
  return attempts.filter(attempt => attempt.testId === testId);
}

// Get attempts for a specific character
export function getAttemptsByCharacter(character: string): CharacterAttempt[] {
  const attempts = getCharacterAttempts();
  return attempts.filter(attempt => attempt.character === character);
}

// Save all character attempts to localStorage (private helper)
function saveCharacterAttempts(attempts: CharacterAttempt[]): boolean {
  if (!isLocalStorageAvailable()) {
    console.error('localStorage is not available');
    return false;
  }

  try {
    const data: CharacterStorageData = {
      attempts,
      version: CHARACTER_STORAGE_VERSION,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
      alert('Storage limit exceeded. Character attempt data could not be saved.');
    } else {
      console.error('Error saving character attempts to localStorage:', error);
    }
    return false;
  }
}

// Add new character attempts (append to existing)
export function addCharacterAttempts(newAttempts: CharacterAttempt[]): boolean {
  const existingAttempts = getCharacterAttempts();
  const allAttempts = [...existingAttempts, ...newAttempts];
  return saveCharacterAttempts(allAttempts);
}

// Delete attempts associated with a test (for cleanup)
export function deleteAttemptsByTestId(testId: string): boolean {
  const attempts = getCharacterAttempts();
  const filteredAttempts = attempts.filter(attempt => attempt.testId !== testId);
  return saveCharacterAttempts(filteredAttempts);
}

// Export character attempts as JSON string
export function exportCharacterAttempts(): string {
  const attempts = getCharacterAttempts();
  const exportData: CharacterStorageData = {
    attempts,
    version: CHARACTER_STORAGE_VERSION,
    lastUpdated: new Date().toISOString(),
  };
  return JSON.stringify(exportData, null, 2);
}

// Import character attempts from JSON string
export function importCharacterAttempts(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);

    // Validate structure
    if (!data.attempts || !Array.isArray(data.attempts)) {
      console.error('Invalid import data structure');
      return false;
    }

    // Validate each attempt has required fields
    const isValid = data.attempts.every((attempt: any) =>
      attempt.id &&
      attempt.testId &&
      attempt.timestamp &&
      attempt.character &&
      attempt.characterType &&
      typeof attempt.userAnswer === 'string' &&
      Array.isArray(attempt.correctAnswers) &&
      typeof attempt.isCorrect === 'boolean' &&
      attempt.questionType
    );

    if (!isValid) {
      console.error('Invalid character attempt data in import');
      return false;
    }

    return saveCharacterAttempts(data.attempts);
  } catch (error) {
    console.error('Error importing character attempts:', error);
    return false;
  }
}

// Clear all character attempts (utility function)
export function clearAllCharacterAttempts(): boolean {
  return saveCharacterAttempts([]);
}
