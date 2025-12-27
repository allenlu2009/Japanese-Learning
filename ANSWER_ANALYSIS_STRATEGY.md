# Answer Analysis Strategy Configuration

The app supports **two different algorithms** for analyzing multi-character hiragana answers. You can switch between them by changing a single constant.

## Available Strategies

### 1. WanaKana (DEFAULT)

**File:** `lib/answerAnalysisWanaKana.ts`

**How it works:**
1. Converts user's romaji input to hiragana using WanaKana library
2. Compares hiragana character-by-character
3. On length mismatch (malformed input), marks entire answer as wrong

**Pros:**
- ✅ Simpler code (~80 lines vs ~200 lines)
- ✅ Leverages battle-tested WanaKana library
- ✅ Auto-handles all variant spellings (shi/si, chi/ti, tsu/tu, etc.)
- ✅ Auto-handles combo characters (きゃ, じゅ, りょ, etc.)
- ✅ Graceful degradation on malformed input

**Cons:**
- ❌ Shows correct answer only (not exact user typo)
- ❌ External library dependency

**Visual feedback:**
- Partial error: `ka[ro]de` (shows which syllables are wrong)
- Major error: `[banakawa]` (entire answer wrong = way off)

---

### 2. Syllable Matching (ALTERNATIVE)

**File:** `lib/answerAnalysis.ts` (function: `analyzeMultiCharAnswerWithSyllableMatching`)

**How it works:**
1. Custom greedy matching algorithm (longest syllable first)
2. Look-ahead resynchronization to preserve correct syllables after errors
3. Manual variant handling via database

**Pros:**
- ✅ Shows exact user typo (e.g., `ka[lu]de` shows user typed "lu")
- ✅ Precise syllable-by-syllable feedback
- ✅ No external dependencies

**Cons:**
- ❌ More complex code
- ❌ Manual variant management
- ❌ Requires maintaining syllable database

**Visual feedback:**
- Error with exact typo: `ka[lu]de` (shows user typed "lu" not "ro")

---

## How to Switch Strategies

**Edit:** `lib/constants.ts`

```typescript
// Current (WanaKana)
export const ANSWER_ANALYSIS_STRATEGY: AnswerAnalysisStrategy = 'wanakana';

// Change to Syllable Matching
export const ANSWER_ANALYSIS_STRATEGY: AnswerAnalysisStrategy = 'syllable-matching';
```

That's it! The entire app will automatically use the new strategy.

---

## Test Coverage

**Total:** 62 tests passing

### WanaKana Strategy Tests:
- `__tests__/wanakana-robustness.test.ts` (16 tests)
  - Valid input, variants, combo characters
  - Typos and malformed input
  - Edge cases

### Syllable Matching Tests:
- `__tests__/syllableMatching.test.ts` (35 tests)
  - Greedy matching, resynchronization
  - User-reported bugs
  - Edge cases

### Comparison Tests:
- `__tests__/answerAnalysisComparison.test.ts` (7 tests)
  - Side-by-side comparison of both strategies
  - Validates they produce equivalent results

### Strategy Configuration Tests:
- `__tests__/answerAnalysisStrategy.test.ts` (4 tests)
  - Verifies default strategy works
  - Validates switching mechanism

---

## Comparison Examples

### Example 1: Typo in middle character

**Question:** かろで
**User input:** "kalude"

| Strategy | Analysis | Visual Output |
|----------|----------|---------------|
| WanaKana | "kalude" → "かぅで" (length mismatch) | `[ka][ro][de]` (all wrong) |
| Syllable | Split: ['ka', 'lu', 'de'] | `ka[lu][de]` (shows 'lu' typo) |

### Example 2: Completely correct

**Question:** かたな
**User input:** "katana"

| Strategy | Analysis | Visual Output |
|----------|----------|---------------|
| WanaKana | "katana" → "かたな" ✓ | `katana` (all correct) |
| Syllable | Split: ['ka', 'ta', 'na'] ✓ | `katana` (all correct) |

### Example 3: Variant spelling

**Question:** しかた
**User input:** "sikata" (using 'si' instead of 'shi')

| Strategy | Analysis | Visual Output |
|----------|----------|---------------|
| WanaKana | "sikata" → "しかた" ✓ | `sikata` (all correct) |
| Syllable | 'si' in variants ✓ | `sikata` (all correct) |

### Example 4: Combo character

**Question:** きゃた
**User input:** "kyata"

| Strategy | Analysis | Visual Output |
|----------|----------|---------------|
| WanaKana | "kyata" → "きゃた" ✓ | `kyata` (all correct) |
| Syllable | Split: ['kya', 'ta'] ✓ | `kyata` (all correct) |

---

## Recommendation

**Default (WanaKana)** is recommended for most users because:
- Simpler codebase (easier to maintain)
- Better variant handling (no manual database updates)
- Well-tested library (thousands of users)

**Use Syllable Matching** if you need:
- Exact typo feedback (educational debugging)
- No external dependencies
- Complete control over matching logic

---

## Implementation Details

The strategy dispatch happens in `lib/answerAnalysis.ts`:

```typescript
export function analyzeMultiCharAnswer(
  hiraganaSequence: string,
  userAnswer: string
): CharacterAnalysis[] {
  if (ANSWER_ANALYSIS_STRATEGY === 'wanakana') {
    const { analyzeMultiCharAnswerWithWanaKana } = require('./answerAnalysisWanaKana');
    return analyzeMultiCharAnswerWithWanaKana(hiraganaSequence, userAnswer);
  }

  return analyzeMultiCharAnswerWithSyllableMatching(hiraganaSequence, userAnswer);
}
```

Both implementations return the same `CharacterAnalysis[]` interface, ensuring compatibility with all UI components.
