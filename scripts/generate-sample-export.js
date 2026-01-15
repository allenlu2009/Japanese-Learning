/**
 * Generate a sample v1.0 export file for testing
 */

const fs = require('fs');

// Sample export data matching v1.0 schema
const sampleExport = {
  version: "1.0",
  exportedAt: new Date().toISOString(),
  tests: [
    {
      id: "test-123-sample",
      timestamp: "2026-01-12T10:00:00.000Z",
      testType: "hiragana",
      score: 67,
      totalQuestions: 3,
      correctAnswers: 2,
      difficulty: "1-char"
    }
  ],
  attempts: [
    {
      id: "attempt-1",
      testId: "test-123-sample",
      timestamp: "2026-01-12T10:00:00.000Z",
      prompt: "あ",
      expected: ["a"],
      response: "a",
      correct: true,
      scriptType: "hiragana",
      characterType: "basic"
    },
    {
      id: "attempt-2",
      testId: "test-123-sample",
      timestamp: "2026-01-12T10:00:01.000Z",
      prompt: "い",
      expected: ["i"],
      response: "i",
      correct: true,
      scriptType: "hiragana",
      characterType: "basic"
    },
    {
      id: "attempt-3",
      testId: "test-123-sample",
      timestamp: "2026-01-12T10:00:02.000Z",
      prompt: "う",
      expected: ["u"],
      response: "o",
      correct: false,
      scriptType: "hiragana",
      characterType: "basic"
    }
  ],
  settings: {
    romajiSystem: "hepburn"
  },
  meta: {
    exportedBy: "claude",
    platform: "web"
  }
};

// Write to file
const filename = `japanese-tests-sample-v1.0-${Date.now()}.json`;
fs.writeFileSync(filename, JSON.stringify(sampleExport, null, 2));

console.log(`✅ Generated sample v1.0 export: ${filename}`);
console.log('\nContents:');
console.log(JSON.stringify(sampleExport, null, 2));
