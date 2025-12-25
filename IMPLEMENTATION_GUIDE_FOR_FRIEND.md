# Implementation Guide: Character Analytics & Enhanced UX

This guide shows how to add character-level analytics and improved UX features to your Japanese learning tracker while **preserving your excellent architecture**.

## Overview

Your implementation has **superior architecture** with versioned datasets, unified storage, and extensibility. This guide adds:

1. **Character-level breakdown** for 3-character tests
2. **Visual indicators** showing which characters are wrong
3. **Optional review mode** for incorrect answers
4. **Analytics dashboard** to track weak characters

---

## Part 1: Syllable-Aware Matching Algorithm

### Why You Need This

**Current Problem:**
```typescript
// User answers "banana" for かたな (katana)
// Current: Whole answer marked wrong
// Better: Identify か wrong, た wrong, な correct
```

**Educational Benefit:** Users learn exactly which character they confused.

### Step 1.1: Create `src/lib/syllableMatching.ts`

```typescript
// All valid romanji syllables
export const VALID_ROMANJI_SYLLABLES = new Set([
  // Vowels
  'a', 'i', 'u', 'e', 'o',
  // Basic consonants
  'ka', 'ki', 'ku', 'ke', 'ko',
  'sa', 'si', 'shi', 'su', 'se', 'so',
  'ta', 'ti', 'chi', 'tsu', 'tu', 'te', 'to',
  'na', 'ni', 'nu', 'ne', 'no',
  'ha', 'hi', 'fu', 'hu', 'he', 'ho',
  'ma', 'mi', 'mu', 'me', 'mo',
  'ya', 'yu', 'yo',
  'ra', 'ri', 'ru', 're', 'ro',
  'wa', 'wo', 'n',
  // Dakuten
  'ga', 'gi', 'gu', 'ge', 'go',
  'za', 'zi', 'ji', 'zu', 'ze', 'zo',
  'da', 'di', 'du', 'de', 'do',
  'ba', 'bi', 'bu', 'be', 'bo',
  'pa', 'pi', 'pu', 'pe', 'po',
  // Combos
  'kya', 'kyu', 'kyo',
  'sha', 'sya', 'shu', 'syu', 'sho', 'syo',
  'cha', 'cya', 'tya', 'chu', 'cyu', 'tyu', 'cho', 'cyo', 'tyo',
  'nya', 'nyu', 'nyo',
  'hya', 'hyu', 'hyo',
  'mya', 'myu', 'myo',
  'rya', 'ryu', 'ryo',
  'gya', 'gyu', 'gyo',
  'ja', 'zya', 'ju', 'zyu', 'jo', 'zyo',
  'bya', 'byu', 'byo',
  'pya', 'pyu', 'pyo',
]);

export interface HiraganaChar {
  id: string;
  prompt: string;
  answers: string[];
}

/**
 * Split user answer into syllables using syllable-aware matching
 *
 * @param userAnswer - User's romanji input (e.g., "banana")
 * @param hiraganaChars - Array of expected hiragana items
 * @returns Array of syllables matched to each character
 */
export function splitUserAnswer(
  userAnswer: string,
  hiraganaChars: HiraganaChar[]
): string[] {
  const parts: string[] = [];
  let remaining = userAnswer.toLowerCase().trim();

  hiraganaChars.forEach((hiraganaChar) => {
    if (!hiraganaChar) {
      parts.push('');
      return;
    }

    // FIRST: Try to match the correct romanji for this character
    const correctMatch = hiraganaChar.answers.find(answer =>
      remaining.startsWith(answer.toLowerCase())
    );

    if (correctMatch) {
      // Perfect match - user got it right
      parts.push(correctMatch);
      remaining = remaining.slice(correctMatch.length);
      return;
    }

    // SECOND: Syllable-aware extraction (greedy - longest first)
    let extracted: string | null = null;

    // Try syllables from longest (3 chars) to shortest (1 char)
    for (let len = Math.min(3, remaining.length); len >= 1; len--) {
      const candidate = remaining.slice(0, len);
      if (VALID_ROMANJI_SYLLABLES.has(candidate)) {
        extracted = candidate;
        break;
      }
    }

    if (extracted) {
      // Found a valid syllable (even though wrong for this character)
      parts.push(extracted);
      remaining = remaining.slice(extracted.length);
    } else {
      // No valid syllable - extract single char as fallback
      const fallback = remaining.slice(0, 1);
      parts.push(fallback);
      remaining = remaining.slice(fallback.length);
    }
  });

  return parts;
}
```

### Step 1.2: Update `src/lib/score.ts`

Add a function to use syllable-aware matching:

```typescript
import { splitUserAnswer } from './syllableMatching';

/**
 * Analyze which characters in a combo are correct/incorrect
 */
export function analyzeComboAnswer(
  comboItem: DatasetItem,
  userResponse: string
): Array<{ character: string; userSyllable: string; isCorrect: boolean }> {
  // Extract individual characters from the combo prompt
  const chars = comboItem.prompt.split('');

  // Find corresponding items from hiragana dataset
  const hiraganaChars = chars.map(char => {
    return hiraganaDataset.items.find(item => item.prompt === char);
  }).filter(Boolean) as DatasetItem[];

  // Split user answer syllable-aware
  const userSyllables = splitUserAnswer(userResponse, hiraganaChars);

  // Analyze each character
  return hiraganaChars.map((item, index) => {
    const userSyllable = userSyllables[index] || '';
    const isCorrect = item.answers.some(
      answer => answer.toLowerCase() === userSyllable.toLowerCase()
    );

    return {
      character: item.prompt,
      userSyllable,
      isCorrect,
    };
  });
}
```

---

## Part 2: Enhanced AnswerLog Storage

### Why Enhance AnswerLog

Your `AnswerLog` already exists - just add character-level breakdown for combos!

### Step 2.1: Update `src/lib/types.ts`

Add optional field for character breakdown:

```typescript
export type AnswerLog = {
  id: string;
  testId: string;
  itemId: string;
  prompt: string;
  expected: string[];
  response: string;
  correct: boolean;
  answeredAt: string;
  meta?: Record<string, unknown>;

  // NEW: Character-level breakdown for combo questions
  characterBreakdown?: Array<{
    character: string;
    userSyllable: string;
    correctSyllables: string[];
    isCorrect: boolean;
    position: number;
  }>;
};
```

### Step 2.2: Update `src/app/hiragana/page.tsx`

When saving answer logs for triple mode, add breakdown:

```typescript
import { analyzeComboAnswer } from '@/lib/score';

// In handleSubmit, when saving to pendingLogs:
setPendingLogs((prev) => {
  const baseLog: AnswerLog = {
    id: makeId(),
    testId: "pending",
    itemId: currentQuestion.id,
    prompt: currentQuestion.prompt,
    expected: currentQuestion.answers,
    response,
    correct,
    answeredAt: new Date().toISOString(),
    meta: { mode }
  };

  // Add character breakdown for triple mode
  if (mode === "triple") {
    const breakdown = analyzeComboAnswer(currentQuestion, response);
    baseLog.characterBreakdown = breakdown.map((item, position) => ({
      character: item.character,
      userSyllable: item.userSyllable,
      correctSyllables: hiraganaDataset.items.find(i => i.prompt === item.character)?.answers || [],
      isCorrect: item.isCorrect,
      position,
    }));
  }

  return [baseLog, ...prev];
});
```

---

## Part 3: Visual Indicators for Wrong Characters

### Step 3.1: Update Test Results Display

In your results view (wherever you show correct answers), add visual indicators:

```typescript
// Example component for showing answer with indicators
function AnswerDisplay({ answerLog }: { answerLog: AnswerLog }) {
  if (!answerLog.correct && answerLog.characterBreakdown) {
    // Show character-by-character breakdown with visual indicators
    return (
      <div>
        <span className="font-medium">Your answer: </span>
        <span className="font-semibold text-red-600">
          {answerLog.response}
        </span>

        <div className="mt-2">
          <span className="font-medium">Correct answer: </span>
          {answerLog.characterBreakdown.map((char, idx) => (
            <span
              key={idx}
              className={
                char.isCorrect
                  ? "font-semibold text-green-600"
                  : "font-semibold text-red-600 underline decoration-2 underline-offset-4"
              }
            >
              {char.correctSyllables[0]}
            </span>
          ))}
        </div>

        {/* Show which chars were wrong */}
        <div className="text-sm text-gray-600 mt-1">
          {answerLog.characterBreakdown.filter(c => !c.isCorrect).length > 0 && (
            <span>
              Wrong characters: {
                answerLog.characterBreakdown
                  .filter(c => !c.isCorrect)
                  .map(c => c.character)
                  .join(', ')
              }
            </span>
          )}
        </div>
      </div>
    );
  }

  // Regular display for correct or single-char answers
  return (
    <div>
      <span className="font-medium">Your answer: </span>
      <span className={answerLog.correct ? "text-green-600" : "text-red-600"}>
        {answerLog.response}
      </span>
      {!answerLog.correct && (
        <>
          <br />
          <span className="font-medium">Correct: </span>
          <span className="text-green-600">{answerLog.expected[0]}</span>
        </>
      )}
    </div>
  );
}
```

---

## Part 4: Review Mode

### Step 4.1: Add Review State to Test Page

```typescript
// In src/app/hiragana/page.tsx

const [reviewMode, setReviewMode] = useState(false);

// After showing results, offer review
const startReviewMode = () => {
  const incorrectItems = questions.filter((q, idx) => {
    const response = responses[q.id] ?? "";
    return !isCorrectAnswer(q, response);
  });

  if (incorrectItems.length === 0) return;

  // Reset for review
  setQuestions(incorrectItems);
  setCurrentIndex(0);
  setResponses({});
  setCurrentAnswer("");
  setFeedback(null);
  setPendingLogs([]);
  setStatus("active");
  setReviewMode(true);
};

// In results view, add review button:
{status === "done" && !reviewMode && incorrectCount > 0 && (
  <button
    onClick={startReviewMode}
    className="btn-secondary"
  >
    Review Wrong Answers ({incorrectCount})
  </button>
)}
```

---

## Part 5: Character Analytics Dashboard

### Step 5.1: Create Analytics Helper `src/lib/characterAnalytics.ts`

```typescript
import { AnswerLog } from "./types";

export interface CharacterStats {
  character: string;
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  successRate: number;
  lastAttemptDate: string;
  commonMistakes: Array<{ answer: string; count: number }>;
}

/**
 * Calculate per-character statistics from answer logs
 */
export function calculateCharacterStats(
  answerLogs: AnswerLog[]
): CharacterStats[] {
  const characterMap = new Map<string, {
    correct: number;
    incorrect: number;
    lastDate: string;
    mistakes: Map<string, number>;
  }>();

  // Process all answer logs
  answerLogs.forEach(log => {
    if (log.characterBreakdown) {
      // Process combo questions (character-level)
      log.characterBreakdown.forEach(char => {
        if (!characterMap.has(char.character)) {
          characterMap.set(char.character, {
            correct: 0,
            incorrect: 0,
            lastDate: log.answeredAt,
            mistakes: new Map(),
          });
        }

        const stats = characterMap.get(char.character)!;

        if (char.isCorrect) {
          stats.correct++;
        } else {
          stats.incorrect++;
          const count = stats.mistakes.get(char.userSyllable) || 0;
          stats.mistakes.set(char.userSyllable, count + 1);
        }

        // Update last attempt date
        if (new Date(log.answeredAt) > new Date(stats.lastDate)) {
          stats.lastDate = log.answeredAt;
        }
      });
    } else if (log.prompt.length === 1) {
      // Process single-character questions
      if (!characterMap.has(log.prompt)) {
        characterMap.set(log.prompt, {
          correct: 0,
          incorrect: 0,
          lastDate: log.answeredAt,
          mistakes: new Map(),
        });
      }

      const stats = characterMap.get(log.prompt)!;

      if (log.correct) {
        stats.correct++;
      } else {
        stats.incorrect++;
        const count = stats.mistakes.get(log.response) || 0;
        stats.mistakes.set(log.response, count + 1);
      }

      if (new Date(log.answeredAt) > new Date(stats.lastDate)) {
        stats.lastDate = log.answeredAt;
      }
    }
  });

  // Convert to array and calculate rates
  return Array.from(characterMap.entries()).map(([character, stats]) => {
    const totalAttempts = stats.correct + stats.incorrect;
    const successRate = totalAttempts === 0 ? 0
      : Math.round((stats.correct / totalAttempts) * 100);

    // Get top 3 mistakes
    const commonMistakes = Array.from(stats.mistakes.entries())
      .map(([answer, count]) => ({ answer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return {
      character,
      totalAttempts,
      correctAttempts: stats.correct,
      incorrectAttempts: stats.incorrect,
      successRate,
      lastAttemptDate: stats.lastDate,
      commonMistakes,
    };
  }).sort((a, b) => a.successRate - b.successRate); // Sort by weak to strong
}

/**
 * Identify weak characters (<60% success rate)
 */
export function getWeakCharacters(stats: CharacterStats[]): CharacterStats[] {
  return stats.filter(s => s.successRate < 60 && s.totalAttempts >= 3);
}
```

### Step 5.2: Create Analytics Page `src/app/analytics/page.tsx`

```typescript
"use client";

import { useMemo } from "react";
import useAppData from "@/hooks/useAppData";
import { calculateCharacterStats, getWeakCharacters } from "@/lib/characterAnalytics";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AnalyticsPage() {
  const { data } = useAppData();

  const stats = useMemo(() => {
    return calculateCharacterStats(data.answerLog);
  }, [data.answerLog]);

  const weakChars = useMemo(() => {
    return getWeakCharacters(stats);
  }, [stats]);

  if (stats.length === 0) {
    return (
      <div className="p-6">
        <SectionHeader
          title="Character Analytics"
          subtitle="Complete some interactive tests to see character-level performance"
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <SectionHeader
        title="Character Analytics"
        subtitle="Track your performance on individual hiragana characters"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold">{stats.length}</div>
            <div className="text-sm text-gray-600">Characters Practiced</div>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-red-600">{weakChars.length}</div>
            <div className="text-sm text-gray-600">Weak Characters (&lt;60%)</div>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold">
              {stats.length > 0
                ? Math.round(stats.reduce((sum, s) => sum + s.successRate, 0) / stats.length)
                : 0}%
            </div>
            <div className="text-sm text-gray-600">Average Success Rate</div>
          </div>
        </Card>
      </div>

      {/* Weak Characters Highlight */}
      {weakChars.length > 0 && (
        <Card>
          <h3 className="text-lg font-bold mb-4">🎯 Focus On These Characters</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {weakChars.map(char => (
              <div key={char.character} className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold">{char.character}</div>
                <div className="text-sm text-red-600 font-medium mt-1">
                  {char.successRate}%
                </div>
                <div className="text-xs text-gray-500">
                  {char.correctAttempts}/{char.totalAttempts}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* All Characters Table */}
      <Card>
        <h3 className="text-lg font-bold mb-4">All Characters</h3>
        <div className="space-y-2">
          {stats.map(char => (
            <div
              key={char.character}
              className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">{char.character}</span>
                <div className="text-sm">
                  <div className="font-medium">
                    {char.correctAttempts}/{char.totalAttempts} correct
                  </div>
                  {char.commonMistakes.length > 0 && (
                    <div className="text-gray-500">
                      Common mistakes: {char.commonMistakes.map(m => m.answer).join(', ')}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-2xl font-bold ${
                    char.successRate >= 80
                      ? 'text-green-600'
                      : char.successRate >= 60
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {char.successRate}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
```

### Step 5.3: Add Navigation Link

Update your `Nav` component:

```typescript
const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/hiragana", label: "Practice" },
  { href: "/tests", label: "Tests" },
  { href: "/analytics", label: "Analytics" }, // NEW
  { href: "/data", label: "Data" },
];
```

---

## Part 6: Testing

### Step 6.1: Add Tests for Syllable Matching

Create `src/lib/syllableMatching.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { splitUserAnswer, VALID_ROMANJI_SYLLABLES } from "./syllableMatching";

const createMockHiragana = (char: string, answers: string[]) => ({
  id: char,
  prompt: char,
  answers,
});

describe("syllableMatching", () => {
  it("should split correct answer correctly", () => {
    const hiragana = [
      createMockHiragana('か', ['ka']),
      createMockHiragana('た', ['ta']),
      createMockHiragana('な', ['na']),
    ];
    const result = splitUserAnswer('katana', hiragana);
    expect(result).toEqual(['ka', 'ta', 'na']);
  });

  it("should handle banana example - only last correct", () => {
    const hiragana = [
      createMockHiragana('か', ['ka']),
      createMockHiragana('た', ['ta']),
      createMockHiragana('な', ['na']),
    ];
    const result = splitUserAnswer('banana', hiragana);
    expect(result).toEqual(['ba', 'na', 'na']);
  });

  it("should handle batana example - last two correct", () => {
    const hiragana = [
      createMockHiragana('か', ['ka']),
      createMockHiragana('た', ['ta']),
      createMockHiragana('な', ['na']),
    ];
    const result = splitUserAnswer('batana', hiragana);
    expect(result).toEqual(['ba', 'ta', 'na']);
  });

  it("should use greedy matching for combos", () => {
    const hiragana = [
      createMockHiragana('きゃ', ['kya']),
      createMockHiragana('た', ['ta']),
    ];
    const result = splitUserAnswer('kyata', hiragana);
    expect(result).toEqual(['kya', 'ta']);
  });
});
```

Run tests:
```bash
npm test
```

---

## Summary of Changes

### Files to Create:
1. ✅ `src/lib/syllableMatching.ts` - Syllable-aware matching logic
2. ✅ `src/lib/characterAnalytics.ts` - Analytics calculations
3. ✅ `src/app/analytics/page.tsx` - Analytics dashboard
4. ✅ `src/lib/syllableMatching.test.ts` - Tests

### Files to Modify:
1. ✅ `src/lib/types.ts` - Add `characterBreakdown` field
2. ✅ `src/lib/score.ts` - Add `analyzeComboAnswer`
3. ✅ `src/app/hiragana/page.tsx` - Add breakdown to logs, review mode
4. ✅ `src/components/Nav.tsx` - Add analytics link
5. ✅ Results view component - Add visual indicators

### Key Benefits:

**For Users:**
- ✅ See exactly which characters they got wrong
- ✅ Review only incorrect answers
- ✅ Track weak characters over time
- ✅ Get targeted practice recommendations

**For Your Codebase:**
- ✅ Leverages existing `AnswerLog` system
- ✅ Maintains versioned architecture
- ✅ Backward compatible (characterBreakdown is optional)
- ✅ No breaking changes to existing tests

---

## Next Steps

1. Implement syllable matching first (most critical)
2. Add character breakdown to answer logs
3. Update results display with visual indicators
4. Add review mode
5. Create analytics dashboard
6. Add tests

**Estimated Effort:** 4-6 hours of focused work

**Impact:** Transforms your app from "good" to "pedagogically excellent" while keeping your superior architecture intact!

Let me know if you need clarification on any step! 🚀
