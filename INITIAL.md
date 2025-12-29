I want you to create a modern, professional NextJS Japanese lanugage learning application. Here's my vision:

APPLICATION OVERVIEW:
Build a complete Japanse tracking web app that helps users manage their personal learning status. The app should feel modern, intuitive, and professional.

CORE FEATURES:
- Add tests with date, score, category (read, listen, write, speak), and description
- View statistics in a clean, organized list
- Dashboard with learning summaries and basic analytics
- Categories: Read, Listen, Write, Speak
- Data persistence using localStorage for this demo

TECHNICAL REQUIREMENTS:
- NextJS 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling with a modern, clean design
- Responsive design that works on desktop and mobile
- Use React hooks for state management
- Form validation for test inputs
- Date picker for test dates

DESIGN REQUIREMENTS:
- Clean, modern interface with a professional color scheme
- Intuitive navigation and user experience
- Visual feedback for user actions
- Loading states and error handling
- Mobile-responsive design

SPECIFIC FUNCTIONALITY IMPLEMENTED:

1. **Manual Test Entry**
   - Add tests with date, score, category, and description
   - Form validation with React Hook Form + Zod
   - Support for all four categories: Read, Listen, Write, Speak

2. **Interactive Hiragana Reading Tests**
   - Real-time interactive test generation for Hiragana reading practice
   - Two test modes:
     * 1-character tests: Single hiragana character
     * 3-character tests: Three-character combinations
   - Configurable question counts: 5, 10, or 20 questions (default: 10)
   - Auto-scoring with support for multiple romanji variants (e.g., shi/si, tsu/tu, chi/ti, fu/hu)
   - Complete hiragana database: 104 characters (basic, dakuten, combinations)
   - Instant feedback on answers with visual indicators
   - Progress tracking during test
   - Test results summary with score and detailed review
   - Automatic storage of completed interactive tests

3. **Data Management**
   - Export test data as JSON file with full timestamp (date + time)
   - Import test data from previously exported JSON files
   - **Dedicated `data/` folder** for organizing exports/imports
   - **Enhanced filename format**: `japanese-learning-tests-YYYY-MM-DD-HH-MM-SS.json`
   - Multiple exports per day without filename conflicts
   - Data backup and restore across browsers/devices
   - **Data Management visible on empty state** - import on first launch
   - Warning system to prevent accidental data loss
   - Files automatically excluded from git (.gitignore)

4. **Dashboard Analytics**
   - Overall statistics with total tests and average score
   - Category-specific statistics and trends
   - Interactive charts (bar chart for categories, line chart for progress over time)
   - Recent tests widget showing last 5 tests

5. **Data Persistence**
   - localStorage for client-side data storage
   - Automatic backup on export
   - Import/restore functionality for data portability

6. **Character-Level Analytics**
   - Automatic tracking of individual character performance across all interactive tests
   - Tracks both correct and incorrect answers for each hiragana character
   - 3-character test sequences automatically broken down into individual character attempts
   - **Dual Answer Analysis Strategy** (Configurable):
     * **WanaKana Strategy (DEFAULT)**: Progressive approach using battle-tested WanaKana library
       - Converts romaji→hiragana, then compares character-by-character
       - Simpler code (~180 lines), auto-handles all variants and combo characters
       - **Greedy alignment algorithm** for length mismatches: preserves correct syllables
       - Example: "niyupebe" for にゅぺべ → [nyu]pebe (only first wrong, not all wrong)
       - Visual: Partial error `ka[ro]de`, Alignment `[nyu]pebe` (preserves correct)
     * **Syllable-Matching Strategy (ALTERNATIVE)**: Original custom algorithm
       - Intelligently splits user answers into Japanese romanji syllables
       - Uses greedy matching (longest syllable first) for accurate character-by-character evaluation
       - **Resynchronization algorithm** prevents cascading errors from typos
       - Look-ahead sync points preserve correct syllables after mistakes
       - Example 1: "kalude" for かろで → ka[lu]de (shows exact typo 'lu')
       - Example 2: "wogebo" for わぱぼ → [woge]bo (skips middle char, preserves 'bo')
       - Supports all ~80+ valid romanji syllables including variants (shi/si, chi/ti, etc.)
     * **Easy switching**: Change single constant in `lib/constants.ts`
     * **Both strategies tested**: 65 comprehensive tests ensure reliability
     * See `ANSWER_ANALYSIS_STRATEGY.md` for detailed comparison and switching guide
   - **Immediate Visual Feedback** (ENHANCED):
     * Wrong syllables highlighted with red background and brackets: [syllable]
     * Correct syllables shown in green text
     * Feedback appears **immediately after each answer** during the test
     * Also displayed in final test results for review
     * Users see exactly which syllables they confused in real-time
     * Example: For "banana" → [ba][na]na shows which syllables need practice
   - **Optional Review Mode** (NEW):
     * After completing a test, review only incorrect answers
     * Button shows count of wrong answers: "Review Wrong Answers (3)"
     * Preserves original test results while practicing mistakes
     * Can review multiple times until mastered
   - Comprehensive analytics dashboard showing:
     * Per-character success rates (all-time and recent performance)
     * Trend detection (improving/declining/stable based on temporal analysis)
     * Common mistakes tracking (top 3 incorrect answers per character)
     * **Script type filtering** (hiragana, katakana, or all) - NEW
     * Character type filtering (basic, dakuten, combo)
     * Sorting and filtering capabilities
     * **Automatic data migration** for existing users (adds scriptType to legacy data)
   - Real-time insights in test results view:
     * Historical performance context for each character tested
     * Trend indicators with visual icons
     * Success rate percentages
   - Weak character identification (<60% success rate)
   - Storage-efficient design (~150 bytes per attempt, supports 10,000+ attempts)
   - Dedicated Character Analytics page accessible from navigation
   - All-time history analysis for long-term progress tracking

7. **Unit Testing Infrastructure**
   - Jest testing framework with React Testing Library integration
   - TypeScript support for all tests
   - Comprehensive test suite for answer analysis (**104 tests, all passing**)
   - Test coverage includes:
     * **Syllable-Matching Strategy** (35 tests):
       - 1-character and 3-character test scenarios
       - Variant spelling support (shi/si, chi/ti, tsu/tu, fu/hu)
       - Edge cases (empty input, invalid characters, whitespace)
       - Real-world hiragana words (sakana, gakkou, kyou)
       - Greedy matching validation
       - **Resynchronization algorithm** (kalude, wogebo edge cases)
       - **Multiple occurrence handling** (banana - duplicate syllables)
       - **Combo character handling** (ばありゃ, じゅごを edge cases)
     * **WanaKana Strategy** (19 robustness + alignment tests):
       - Valid input, variants, combo characters
       - Typos and malformed input handling
       - Edge cases and boundary conditions
       - **Alignment algorithm** (にゅぺべ / niyupebe issue)
     * **Strategy Comparison** (7 tests):
       - Side-by-side validation of both strategies
       - User-reported bug cases
       - Malformed input scenarios
     * **Strategy Configuration** (4 tests):
       - Verifies default strategy (WanaKana)
       - Validates switching mechanism
     * **Katakana Analysis** (16 tests):
       - Character counting and splitting for katakana
       - Multi-character answer analysis (フツビョ, ムヨズ, ブヌサ)
       - Combo character handling (キャタ, シャギョ)
       - Variant romanization support
       - Format indicators with brackets
     * **Katakana Lookup** (4 tests):
       - Character lookup for basic and combo katakana
       - Character splitting for multi-character strings (ヒャピョザ)
       - Database completeness verification
     * **User-Reported Bug Regression Tests** (3 tests):
       - るまほ with "lomaho" - WanaKana small kana handling
       - ヒャピョザ with "zzz" - Katakana correctSyllables population
       - Direct WanaKana strategy validation
     * **Component Tests** (8 tests):
       - Visual feedback rendering in KatakanaTest component
       - Bracket display for wrong syllables
       - User interaction and navigation flows
     * **Character Storage Migration Tests** (8 tests):
       - Automatic migration of legacy data without scriptType field
       - Hiragana, katakana, and mixed character migration
       - Combo character migration support
       - Data persistence after migration
       - Import/export with migration support
       - Backward compatibility verification
   - **Bug Fixes Verified by Tests**:
     * Fixed katakana empty brackets issue ([][][] → [hya][pyo][za])
     * Fixed hiragana alignment with WanaKana small kana (ぉ preservation)
     * Character splitting now preserves unknown characters for proper alignment
     * Alignment function supports both hiragana and katakana
   - Modular architecture with testable utility functions
   - Test scripts:
     * `npm test` - Run all tests
     * `npm test:watch` - Watch mode for development
   - All tests passing with TypeScript compilation verification
   - Continuous refinement based on real user feedback

8. **Interactive Katakana Reading Tests** (NEW)
   - Identical functionality to Hiragana tests with full feature parity
   - Two test modes:
     * 1-character tests: Single katakana character
     * 3-character tests: Three-character combinations
   - Configurable question counts: 5, 10, or 20 questions (default: 10)
   - Complete katakana database: 104 characters (basic, dakuten, combinations)
   - Same dual answer analysis strategies (WanaKana and syllable-matching)
   - Same immediate visual feedback with wrong syllables highlighted
   - Same review mode for practicing incorrect answers
   - Character-level analytics for katakana (same infrastructure as hiragana)
   - Shared test infrastructure with minimal code duplication (~40%)
   - All existing answer validation works with katakana characters
   - Red color theme for visual distinction from hiragana tests

9. **Interactive Mixed Reading Tests** (NEW)
   - Combined Hiragana and Katakana practice in a single test
   - Two test modes:
     * 1-character mode: Each question randomly selects Hiragana OR Katakana
     * 3-character mode: Each question uses all Hiragana OR all Katakana (randomly per question)
   - Simplified approach for better readability (no mixed scripts within a single word)
   - Same configurable question counts: 5, 10, or 20 questions
   - Same sophisticated answer analysis and visual feedback
   - Character-level tracking works with both scripts transparently
   - Perfect for reinforcing recognition across both character sets
   - Purple color theme for visual distinction
   - Helps transition between hiragana and katakana fluently

DEVELOPMENT NOTES:
- Project works best on native WSL filesystem (/home/allen/projects/) for optimal performance
- Avoid running from Windows/Google Drive mounts (/mnt/c/) to prevent slow compilation times
- All features are production-ready and fully tested

Please create this as a complete, production-ready application. Set up the project structure, implement all features, and make sure everything works together seamlessly. Focus on creating something that looks professional and that I could actually use to track my learning status.

When you're done, provide instructions on how to run the application and test all features.