# Japanese Learning Tracker

A modern, professional web application for tracking Japanese language learning progress across four key skills: Reading, Listening, Writing, and Speaking.

## Features

### Core Functionality
- **Add Tests**: Record test results with date, score (0-100), category, and description
- **View All Tests**: Browse all tests with filtering and sorting capabilities
- **Dashboard Analytics**: Visualize progress with interactive charts and statistics
- **Data Persistence**: All data stored locally using localStorage (no backend required)

### Dashboard
- Overall statistics with total tests and average score
- Category-specific stats (Reading, Listening, Writing, Speaking)
- Progress trends (up, down, or stable)
- Bar chart showing average scores by category
- Line chart displaying progress over time
- Recent tests widget

### Test Management
- Filter tests by category (Read, Listen, Write, Speak)
- Sort by date or score (ascending/descending)
- Delete tests with confirmation
- Responsive design for mobile and desktop

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

1. Click "Add Test" in the navigation or dashboard
2. Fill in the form:
   - **Test Date**: Select the date you took the test (cannot be in future)
   - **Score**: Enter a score between 0-100
   - **Category**: Choose Reading, Listening, Writing, or Speaking
   - **Description**: Add notes about what you practiced (1-500 characters)
3. Click "Add Test" to save

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
│   ├── dashboard/           # Dashboard components
│   ├── tests/               # Test-related components
│   └── common/              # Common components
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── storage.ts           # localStorage utilities
│   ├── validation.ts        # Form validation schemas
│   ├── analytics.ts         # Statistics calculations
│   ├── constants.ts         # App constants
│   └── utils.ts             # Utility functions
├── hooks/
│   └── useTests.ts          # Custom hook for test data
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

**Note**: Data is stored locally and will persist across sessions. To backup your data, you can export it from the browser's developer tools (localStorage).

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
2. **lib/storage.ts** - localStorage CRUD operations
3. **hooks/useTests.ts** - State management for tests
4. **lib/analytics.ts** - Statistics and analytics calculations
5. **components/tests/TestForm.tsx** - Main form component

## Future Enhancements

Potential features for future versions:
- Cloud sync with backend API
- Export/import data as JSON or CSV
- More detailed analytics (monthly reports, comparisons)
- Study reminders and goal setting
- Notes and study materials per category
- Dark mode toggle
- Multi-language support

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
