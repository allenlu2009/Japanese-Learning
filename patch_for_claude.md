# Patch Proposal for Claude's Repo

Below are focused diffs to implement combined export/import, delete cleanup, and full 3-char coverage.

## 1) Combined Export/Import (tests + character attempts)

### Update `lib/storage.ts`
```diff
diff --git a/lib/storage.ts b/lib/storage.ts
index 0000000..1111111 100644
--- a/lib/storage.ts
+++ b/lib/storage.ts
@@
-import { Test, StorageData } from './types';
+import { Test, StorageData } from './types';
 import { STORAGE_KEY, STORAGE_VERSION } from './constants';
+import { getCharacterAttempts, replaceCharacterAttempts } from './characterStorage';
@@
 // Save all tests to localStorage
-function saveTests(tests: Test[]): boolean {
+export function saveTests(tests: Test[]): boolean {
@@
 }
@@
 // Export tests as JSON
 export function exportTests(): string {
   const tests = getTests();
   return JSON.stringify(tests, null, 2);
 }
@@
 export function importTests(jsonData: string): boolean {
@@
 }
+
+// Export full app data (tests + character attempts)
+export function exportAppData(): string {
+  const payload = {
+    version: STORAGE_VERSION,
+    exportedAt: new Date().toISOString(),
+    tests: getTests(),
+    characterAttempts: getCharacterAttempts(),
+  };
+
+  return JSON.stringify(payload, null, 2);
+}
+
+// Import full app data (tests + character attempts)
+export function importAppData(jsonData: string): boolean {
+  try {
+    const parsed = JSON.parse(jsonData);
+
+    if (!parsed || !Array.isArray(parsed.tests) || !Array.isArray(parsed.characterAttempts)) {
+      throw new Error('Invalid import payload');
+    }
+
+    const testsValid = parsed.tests.every((test: any) =>
+      test.id && test.date && typeof test.score === 'number' && test.category && test.description
+    );
+
+    const attemptsValid = parsed.characterAttempts.every((attempt: any) =>
+      attempt.id && attempt.testId && attempt.timestamp && attempt.character && attempt.characterType
+    );
+
+    if (!testsValid || !attemptsValid) {
+      throw new Error('Invalid import payload data');
+    }
+
+    const savedTests = saveTests(parsed.tests);
+    const savedAttempts = replaceCharacterAttempts(parsed.characterAttempts);
+
+    return savedTests && savedAttempts;
+  } catch (error) {
+    console.error('Error importing app data:', error);
+    return false;
+  }
+}
```

### Update `lib/characterStorage.ts`
```diff
diff --git a/lib/characterStorage.ts b/lib/characterStorage.ts
index 0000000..2222222 100644
--- a/lib/characterStorage.ts
+++ b/lib/characterStorage.ts
@@
-// Save all character attempts to localStorage (private helper)
-function saveCharacterAttempts(attempts: CharacterAttempt[]): boolean {
+// Save all character attempts to localStorage (private helper)
+function saveCharacterAttempts(attempts: CharacterAttempt[]): boolean {
@@
 }
@@
 export function addCharacterAttempts(newAttempts: CharacterAttempt[]): boolean {
   const existingAttempts = getCharacterAttempts();
   const allAttempts = [...existingAttempts, ...newAttempts];
   return saveCharacterAttempts(allAttempts);
 }
+
+// Replace all character attempts (used by import)
+export function replaceCharacterAttempts(attempts: CharacterAttempt[]): boolean {
+  return saveCharacterAttempts(attempts);
+}
```

### Update `components/dashboard/DataManagement.tsx`
```diff
diff --git a/components/dashboard/DataManagement.tsx b/components/dashboard/DataManagement.tsx
index 0000000..3333333 100644
--- a/components/dashboard/DataManagement.tsx
+++ b/components/dashboard/DataManagement.tsx
@@
-import { exportTests, importTests } from '@/lib/storage';
+import { exportAppData, importAppData } from '@/lib/storage';
@@
-      const jsonData = exportTests();
+      const jsonData = exportAppData();
@@
-        const success = importTests(jsonData);
+        const success = importAppData(jsonData);
```

## 2) Cleanup Character Attempts on Delete

### Update `hooks/useTests.ts`
```diff
diff --git a/hooks/useTests.ts b/hooks/useTests.ts
index 0000000..4444444 100644
--- a/hooks/useTests.ts
+++ b/hooks/useTests.ts
@@
-import {
+import {
   getTests,
   addTest as addTestToStorage,
   updateTest as updateTestInStorage,
   deleteTest as deleteTestFromStorage,
 } from '@/lib/storage';
+import { deleteAttemptsByTestId } from '@/lib/characterStorage';
@@
   const deleteTest = useCallback((id: string): boolean => {
     try {
       const success = deleteTestFromStorage(id);
       if (success) {
+        deleteAttemptsByTestId(id);
         setTests(prev => prev.filter(test => test.id !== id));
         setError(null);
         return true;
       }
```

## 3) Include Combo Characters in 3-Char Mode

### Update `lib/testGenerator.ts`
```diff
diff --git a/lib/testGenerator.ts b/lib/testGenerator.ts
index 0000000..5555555 100644
--- a/lib/testGenerator.ts
+++ b/lib/testGenerator.ts
@@
-    const includeTypes = difficulty === 'basic'
-      ? ['basic' as const]
-      : ['basic' as const, 'dakuten' as const];  // Exclude combos for 3-char sequences
+    const includeTypes = difficulty === 'basic'
+      ? ['basic' as const]
+      : ['basic' as const, 'dakuten' as const, 'combo' as const];
```

---

If you want, I can also add a small schema/version guard to auto-migrate older exports.
