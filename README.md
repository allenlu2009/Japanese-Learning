# Japanese Learning Tracker

A modern, professional web application for tracking Japanese language learning progress across four key skills: Reading, Listening, Writing, and Speaking.

## Features

### Core Functionality
- **Manual Test Entry**: Record test results with date, score (0-100), category, and description
- **Interactive Hiragana Tests**: Real-time interactive tests for Hiragana reading practice
  - 1-character and 3-character test modes
  - Configurable question counts (5, 10, or 20)
  - Auto-scoring with multiple romanji variant support
  - 104 hiragana characters (basic, dakuten, combinations)
- **View All Tests**: Browse all tests with filtering and sorting capabilities
- **Dashboard Analytics**: Visualize progress with interactive charts and statistics
- **Data Management**: Export and import test data for backup and portability
- **Data Persistence**: All data stored locally using localStorage (no backend required)

### Dashboard
- Overall statistics with total tests and average score
- Category-specific stats (Reading, Listening, Writing, Speaking)
- Progress trends (up, down, or stable)
- Bar chart showing average scores by category
- Line chart displaying progress over time
- Recent tests widget

### Interactive Hiragana Testing
- **Test Modes**:
  - 1-character: Single hiragana character recognition
  - 3-character: Three-character combinations
- **Configurable Settings**: Choose 5, 10, or 20 questions (default: 10)
- **Smart Answer Validation**: Accepts multiple romanji variants (shi/si, tsu/tu, chi/ti, fu/hu)
- **Real-time Feedback**: Instant visual feedback on correct/incorrect answers
- **Progress Tracking**: Progress bar and question counter during test
- **Results Summary**: Detailed score and answer review after completion
- **Auto-save**: Completed tests automatically saved to your test history
- **Keyboard Navigation**: Use Enter key to submit answers and advance

### Test Management
- **Two Test Entry Modes**: Manual entry or interactive Hiragana tests
- Filter tests by category (Read, Listen, Write, Speak)
- Sort by date or score (ascending/descending)
- Delete tests with confirmation
- Responsive design for mobile and desktop

### Data Management
- **Export**: Download all test data as timestamped JSON file
- **Import**: Restore test data from previously exported JSON files
- **Backup Warning**: System alerts before data replacement
- **Cross-browser**: Transfer data between different browsers or devices

### Design
- Clean, modern interface with professional color scheme
- Category-specific colors:
  - Reading: Green
  - Listening: Amber
  - Writing: Purple
  - Speaking: Red
- Mobile-responsive layout
- Intuitive navigation
- Loading states and error handling

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: localStorage
- **Utilities**: date-fns, uuid

## Installation & Setup

### Important: File System Location (WSL Users)

For **optimal performance** on WSL (Windows Subsystem for Linux), ensure the project is located on the **native Linux filesystem**, not on Windows/Google Drive mounts:

✅ **Recommended**: `/home/allen/projects/japanese`
❌ **Avoid**: `/mnt/c/Users/.../japanese` (Windows mount)

**Performance Impact**:
- Native WSL: ~1.2s startup, ~4s compilation
- Windows mount: ~19s startup, ~17s compilation (often times out)

**To move project to native filesystem**:
```bash
# Copy project to native WSL location
rsync -av --exclude 'node_modules' --exclude '.next' \
  /path/to/old/location/ /home/allen/projects/japanese/

# Reinstall dependencies
cd /home/allen/projects/japanese
npm install
```

## Getting Started

### Prerequisites
- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd japanese
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Usage Guide

### Adding a Test

#### Option 1: Manual Test Entry
1. Click "Add Test" in the navigation or dashboard
2. Select "Manual Entry" mode
3. Fill in the form:
   - **Test Date**: Select the date you took the test (cannot be in future)
   - **Score**: Enter a score between 0-100
   - **Category**: Choose Reading, Listening, Writing, or Speaking
   - **Description**: Add notes about what you practiced (1-500 characters)
4. Click "Add Test" to save

#### Option 2: Interactive Hiragana Test
1. Click "Add Test" in the navigation or dashboard
2. Select "Interactive Hiragana Test" mode
3. Configure your test:
   - **Test Type**: Choose 1-character or 3-character mode
   - **Question Count**: Select 5, 10, or 20 questions (default: 10)
4. Click "Start Test"
5. For each question:
   - Type the romanji for the displayed hiragana
   - Press Enter or click "Submit Answer"
   - View instant feedback (correct/incorrect)
   - Press Enter or click "Next Question" to continue
6. Review your results summary showing score and all answers
7. Click "Save Test" to add to your test history

### Managing Your Data

#### Export Data
1. Scroll to "Data Management" section on the dashboard
2. Click "Export Data"
3. A JSON file with timestamp will download automatically
4. Save this file for backup purposes

#### Import Data
1. Scroll to "Data Management" section on the dashboard
2. Click "Import Data"
3. Select a previously exported JSON file
4. Confirm the import (⚠️ this will replace all current data)
5. Page will reload with imported data

### Viewing Tests

1. Navigate to "All Tests" from the navigation
2. Use filters to:
   - Filter by category
   - Sort by date or score
   - Change sort order (ascending/descending)
3. Click the delete button to remove a test (requires confirmation)

### Dashboard

The dashboard automatically displays:
- Total number of tests and overall average score
- Individual statistics for each category
- Trend indicators (up/down/stable)
- Visual charts showing performance by category and over time
- List of your 5 most recent tests

## Project Structure

```
japanese/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Dashboard page
│   ├── globals.css          # Global styles
│   └── tests/
│       ├── page.tsx         # All tests page
│       └── new/
│           └── page.tsx     # Add test page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Navigation component
│   ├── dashboard/           # Dashboard components (incl. DataManagement)
│   ├── tests/               # Test-related components (incl. HiraganaTest)
│   └── common/              # Common components
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── storage.ts           # localStorage utilities (incl. export/import)
│   ├── validation.ts        # Form validation schemas
│   ├── analytics.ts         # Statistics calculations
│   ├── constants.ts         # App constants
│   ├── hiragana.ts          # Hiragana character database (104 chars)
│   ├── testGenerator.ts     # Interactive test question generator
│   └── utils.ts             # Utility functions
├── hooks/
│   ├── useTests.ts          # Custom hook for test data
│   └── useTestSession.ts    # Custom hook for interactive test sessions
└── public/                  # Static assets
```

## Data Storage

All test data is stored in your browser's localStorage under the key `japanese-learning-tests`. The data structure includes:

```json
{
  "tests": [...],
  "version": "1.0",
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

**Note**: Data is stored locally and will persist across sessions. Use the Export/Import feature in the Data Management section to backup and restore your data.

## Form Validation

All test inputs are validated:
- **Date**: Required, valid format, not in future
- **Score**: Required, integer between 0-100
- **Category**: Required, must be one of the four categories
- **Description**: Required, 1-500 characters

## Browser Compatibility

The application works best on modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

localStorage must be enabled for the app to function.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Key Files to Understand

1. **lib/types.ts** - All TypeScript type definitions
2. **lib/storage.ts** - localStorage CRUD operations and export/import
3. **lib/hiragana.ts** - Complete hiragana character database
4. **lib/testGenerator.ts** - Question generation and answer validation
5. **hooks/useTests.ts** - State management for tests
6. **hooks/useTestSession.ts** - State management for interactive test sessions
7. **lib/analytics.ts** - Statistics and analytics calculations
8. **components/tests/TestForm.tsx** - Main form with dual mode support
9. **components/tests/HiraganaTest.tsx** - Interactive test component
10. **components/dashboard/DataManagement.tsx** - Export/import UI

## Completed Features

✅ Manual test entry with validation
✅ Interactive Hiragana reading tests (1-char and 3-char modes)
✅ Export/import data as JSON
✅ Dashboard with charts and analytics
✅ Category-specific statistics and trends
✅ Data persistence with localStorage

## Future Enhancements

Potential features for future versions:
- Cloud sync with backend API
- Katakana interactive tests
- Vocabulary and Kanji tests
- More detailed analytics (monthly reports, comparisons)
- Study reminders and goal setting
- Notes and study materials per category
- Dark mode toggle
- Multi-language support
- CSV export option
- Test history review mode

## Troubleshooting

### Data Not Persisting
- Check if localStorage is enabled in your browser
- Check browser privacy settings
- Try clearing cache and reloading

### Build Errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Check Node.js version (18+ required)

### Charts Not Displaying
- Ensure you have test data added
- Check browser console for errors
- Try refreshing the page

## License

This project is for personal use and learning purposes.

## Support

For issues or questions, please check:
1. The troubleshooting section above
2. Browser console for error messages
3. Ensure all dependencies are installed correctly
