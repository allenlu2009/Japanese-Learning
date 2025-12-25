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
   - Export test data as JSON file with timestamp
   - Import test data from previously exported JSON files
   - Data backup and restore across browsers/devices
   - Warning system to prevent accidental data loss

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
   - **Syllable-Aware Matching Algorithm**:
     * Intelligently splits user answers into Japanese romanji syllables
     * Uses greedy matching (longest syllable first) for accurate character-by-character evaluation
     * Provides precise feedback on which specific characters are wrong vs correct
     * Example: "banana" for かたな correctly identifies か wrong, た wrong, な correct
     * Supports all ~80+ valid romanji syllables including variants (shi/si, chi/ti, etc.)
   - Comprehensive analytics dashboard showing:
     * Per-character success rates (all-time and recent performance)
     * Trend detection (improving/declining/stable based on temporal analysis)
     * Common mistakes tracking (top 3 incorrect answers per character)
     * Character type filtering (basic, dakuten, combo)
     * Sorting and filtering capabilities
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
   - Comprehensive test suite for syllable-aware matching algorithm (31 tests)
   - Test coverage includes:
     * 1-character and 3-character test scenarios
     * Variant spelling support (shi/si, chi/ti, tsu/tu, fu/hu)
     * Edge cases (empty input, invalid characters, whitespace)
     * Real-world hiragana words (sakana, gakkou, kyou)
     * Greedy matching validation
   - Modular architecture with testable utility functions
   - Test scripts:
     * `npm test` - Run all tests
     * `npm test:watch` - Watch mode for development
   - All tests passing with TypeScript compilation verification

DEVELOPMENT NOTES:
- Project works best on native WSL filesystem (/home/allen/projects/) for optimal performance
- Avoid running from Windows/Google Drive mounts (/mnt/c/) to prevent slow compilation times
- All features are production-ready and fully tested

Please create this as a complete, production-ready application. Set up the project structure, implement all features, and make sure everything works together seamlessly. Focus on creating something that looks professional and that I could actually use to track my learning status.

When you're done, provide instructions on how to run the application and test all features.