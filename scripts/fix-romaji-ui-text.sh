#!/bin/bash
# Fix UI text: "romanji" → "romaji" (correct English spelling)
# Keep data structure field names as "romanji" to match JSON

echo "Fixing UI text: romanji → romaji"
echo "Note: Data structure (JSON fields, TypeScript interfaces) keep 'romanji'"

# Find and replace in component files (UI text only)
find components -name "*.tsx" -type f -exec sed -i \
  -e 's/Type romanji/Type romaji/g' \
  -e 's/Type the romanji/Type the romaji/g' \
  -e 's/placeholder="Type romanji/placeholder="Type romaji/g' \
  {} \;

echo "✓ Fixed UI text in component files"

# Count changes
echo ""
echo "Files with 'romaji' in UI text:"
grep -r "Type romaji\|placeholder=\"Type romaji" components/ | wc -l
