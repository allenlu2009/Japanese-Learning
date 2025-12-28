# Recommendations for Friend's Implementation

## Priority Findings

1. **Character analytics data loss on import/export (High)**
   - Current export/import handles only tests, not character attempts.
   - This wipes analytics on restore or leaves them inconsistent.

2. **Orphaned character attempts on delete (High)**
   - Deleting a test does not delete its associated character attempts.
   - Analytics will reference deleted tests.

3. **3-char tests exclude combo characters (Medium)**
   - `generateQuestions` omits `combo` type in 3-char mode.
   - Coverage does not match the full 104 set unless explicitly intended.

## Recommended Fixes

1. **Unify export/import payload**
   - Export a single JSON bundle containing:
     - `tests`
     - `characterAttempts`
     - `version`
     - `exportedAt`
   - Restore both datasets together to keep analytics consistent.

2. **Cleanup character attempts on delete/import**
   - On test delete: call `deleteAttemptsByTestId` for the deleted test.
   - On import: either wipe current attempts before restore or reconcile by test IDs.

3. **Add combo option to 3-char tests**
   - Include `combo` in the 3-char generator, or expose a difficulty toggle.
   - This aligns the dataset coverage with the 104-character requirement.

## Optional Enhancements

- **Romaji normalization utility** to keep matching consistent across the app.
- **Analytics filters/sorting** (by type, recent performance, mistakes).
- **Import schema validation** with version checking to support future migrations.

## If You Want a Patch

I can provide a patch that:
- Adds combined export/import format
- Cleans up orphaned attempts on delete
- Adds combo characters to 3-char mode
