# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

This is a modern NextJS Japanese language learning tracker application. The project helps users track their learning progress across four skills (Reading, Listening, Writing, Speaking) and provides interactive Hiragana reading tests.

**Current Status**: Production-ready with all core features implemented and deployed to GitHub.

## Project Context from INITIAL.md

**Tech Stack:**
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for modern, clean styling
- React hooks for state management
- localStorage for data persistence
- React Hook Form + Zod for validation
- Recharts for data visualization

**Implemented Features:**

1. **Manual Test Entry**
   - Add tests with date, score, category, description
   - Form validation with React Hook Form + Zod
   - All four categories: Read, Listen, Write, Speak

2. **Interactive Hiragana Reading Tests** (Major Feature)
   - Real-time test generation with 104 hiragana characters
   - Two modes: 1-character and 3-character tests
   - Configurable question counts: 5, 10, 20 (default: 10)
   - Smart answer validation supporting multiple romanji variants
   - Instant feedback with visual indicators
   - Progress tracking and results summary
   - Auto-save to test history

3. **Data Management**
   - Export test data as timestamped JSON files
   - Import test data from JSON for backup/restore
   - Cross-browser/device data portability
   - Warning system to prevent data loss

4. **Dashboard Analytics**
   - Overall and category-specific statistics
   - Trend indicators (up/down/stable)
   - Interactive charts (bar and line)
   - Recent tests widget

5. **Data Persistence**
   - localStorage-based client-side storage
   - Export/import for backup and portability

## Architecture Guidelines

### File Organization
- **app/**: Next.js App Router pages (dashboard, tests list, new test)
- **components/ui/**: Reusable UI components (Button, Card, Input, etc.)
- **components/tests/**: Test-related components including HiraganaTest
- **components/dashboard/**: Dashboard components including DataManagement
- **lib/**: Core logic (types, storage, validation, analytics, hiragana data, test generation)
- **hooks/**: Custom hooks (useTests, useTestSession)

### Key Implementation Details

**Hiragana System** (lib/hiragana.ts):
- 104 total characters: 46 basic, 25 dakuten, 33 combinations
- Each character has multiple valid romanji variants
- Examples: し = [shi, si], つ = [tsu, tu], ち = [chi, ti]

**Test Generation** (lib/testGenerator.ts):
- Generates random questions without duplicates
- For 3-char tests, concatenates multiple characters
- Answer validation checks all valid romanji variants

**State Management**:
- useTests: Manages all test data from localStorage
- useTestSession: Manages interactive test session state
- React Hook Form for form state

**Storage** (lib/storage.ts):
- Uses localStorage with key: 'japanese-learning-tests'
- Export creates JSON with timestamp
- Import validates structure before restoring

### Bug Fixes Applied

**Enter Key Navigation Issue** (Fixed Dec 23, 2025):
- Problem: Enter key didn't work to advance after answer was graded
- Root cause: Input field was `disabled`, blocking keyboard events
- Solution: Changed to `readOnly` which allows form submission
- Files: components/tests/HiraganaTest.tsx, components/ui/Input.tsx

**Answer Field Not Clearing** (Fixed Dec 22, 2025):
- Problem: Previous answer persisted when moving to next question
- Solution: Added `setAnswer('')` in handleNext() function
- File: components/tests/HiraganaTest.tsx

### Performance Considerations

**CRITICAL: WSL File System Location**

For optimal performance on WSL (Windows Subsystem for Linux):
- ✅ **Use native Linux filesystem**: `/home/allen/projects/japanese`
- ❌ **Avoid Windows mounts**: `/mnt/c/...` (Google Drive synced folders)

**Performance Impact:**
- Native WSL: 1.2s startup, 4s compilation
- Windows mount: 19s startup, 17s compilation (causes timeout errors)

**Why:** Cross-filesystem operations (WSL ↔ Windows ↔ Google Drive) have ~10ms overhead per file access. With 1,684 modules, this adds 16+ seconds of overhead.

**Note:** Small projects (<300 modules) can tolerate Windows mounts, but larger projects like this one require native filesystem.

## Development Workflow

### Running the Application
```bash
cd /home/allen/projects/japanese
npm run dev
```
Server starts at http://localhost:3000

### Git Repository
- **GitHub**: https://github.com/allenlu2009/Japanese-Learning
- **Branch**: master
- **Git User**: Allen Lu <allenlu2007@gmail.com>

### Data Files Excluded (.gitignore)
- `*.json.backup`
- `*-backup.json`
- `japanese-learning-tests-*.json`
- `/data/`
- `/backups/`

## Testing Notes

### Interactive Hiragana Tests
- Keyboard navigation critical: Enter key must work throughout
- Answer validation must be case-insensitive
- Multiple romanji variants must be accepted
- Progress bar must update correctly
- Results summary must show all questions with answers

### Data Management
- Export creates valid JSON with timestamp
- Import validates data before replacing
- Warning message must appear before data replacement
- Page reload after import to show updated data

## Common Tasks

### Adding New Hiragana Characters
Edit `lib/hiragana.ts` and add to appropriate array (BASIC, DAKUTEN, or COMBO)

### Adding New Test Modes
1. Update TestType in lib/types.ts
2. Modify testGenerator.ts to handle new mode
3. Update InteractiveTestConfig component
4. Update HiraganaTest if needed

### Modifying Analytics
Update lib/analytics.ts functions and dashboard components

## Known Limitations

- Data stored in localStorage (browser-specific)
- No cloud sync (use export/import for cross-device)
- Interactive tests only support Hiragana (not Katakana or Kanji)
- No time limits on tests
- No spaced repetition algorithm

## Future Enhancement Ideas

See README.md "Future Enhancements" section for planned features like:
- Katakana/Kanji tests
- Cloud sync
- Study reminders
- More detailed analytics
- Dark mode
- CSV export

## Troubleshooting

### Slow Loading / ChunkLoadError
- Check file system location (must be on native WSL, not /mnt/c/)
- Delete .next folder and rebuild
- Check if Google Drive is syncing (pause it)

### Tests Not Saving
- Check localStorage is enabled
- Check browser console for errors
- Try export/import to verify data integrity

### Enter Key Not Working
- Ensure input uses `readOnly` not `disabled` when answered
- Check handleSubmit detects isAnswered state
- Verify form onSubmit is properly wired

## Contact & Context

**User**: Allen Lu
**Email**: allenlu2007@gmail.com
**Environment**: WSL (Windows Subsystem for Linux)
**Working Directory**: /home/allen/projects/japanese
