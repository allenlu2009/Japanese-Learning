# Data Export/Import Folder

This folder is for storing exported test data files from the Japanese Learning Tracker application.

## File Naming Convention

Exported files are automatically named with a timestamp:

```
japanese-learning-tests-YYYY-MM-DD-HH-MM-SS.json
```

Example: `japanese-learning-tests-2025-12-25-14-30-45.json`

This format allows you to export multiple times per day without filename conflicts.

## Usage

### Export Data
1. Go to the Dashboard in the app
2. Scroll to the "Data Management" card
3. Click "Export Data"
4. Save the downloaded file to this `data/` folder

### Import Data
1. Go to the Dashboard in the app
2. Scroll to the "Data Management" card
3. Click "Import Data"
4. Select a JSON file from this folder

## Important Notes

- **Backup regularly**: Export your data frequently to avoid data loss
- **Multiple exports**: The timestamp in filenames prevents overwriting previous exports
- **Git ignored**: This folder is in `.gitignore`, so your personal test data won't be committed to git
- **Import overwrites**: Importing will replace ALL current data in localStorage

## File Structure

```
data/
├── README.md (this file)
└── japanese-learning-tests-YYYY-MM-DD-HH-MM-SS.json (your exports)
```
