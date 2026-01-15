/**
 * Test script to verify export format matches v1.0 schema
 */

const fs = require('fs');
const path = require('path');

// Mock data similar to what Claude stores
const mockAttempts = [
  {
    id: 'attempt-1',
    testId: 'test-123',
    timestamp: '2026-01-12T10:00:00.000Z',
    character: 'あ',
    scriptType: 'hiragana',
    characterType: 'basic',
    userAnswer: 'a',
    correctAnswers: ['a'],
    isCorrect: true,
    questionType: '1-char'
  },
  {
    id: 'attempt-2',
    testId: 'test-123',
    timestamp: '2026-01-12T10:00:01.000Z',
    character: 'い',
    scriptType: 'hiragana',
    characterType: 'basic',
    userAnswer: 'i',
    correctAnswers: ['i'],
    isCorrect: true,
    questionType: '1-char'
  },
  {
    id: 'attempt-3',
    testId: 'test-123',
    timestamp: '2026-01-12T10:00:02.000Z',
    character: 'う',
    scriptType: 'hiragana',
    characterType: 'basic',
    userAnswer: 'o',
    correctAnswers: ['u'],
    isCorrect: false,
    questionType: '1-char'
  }
];

// Load the adapter
const exportAdapter = require('../lib/exportAdapter.ts');

// Test export
console.log('Testing export functionality...\n');

try {
  const result = exportAdapter.exportToUniversal(mockAttempts);

  console.log('✅ Export successful!\n');
  console.log('Validating v1.0 schema...\n');

  // Validate structure
  const checks = [
    { name: 'version is "1.0"', pass: result.version === '1.0' },
    { name: 'exportedAt exists', pass: typeof result.exportedAt === 'string' },
    { name: 'tests array exists', pass: Array.isArray(result.tests) },
    { name: 'attempts array exists', pass: Array.isArray(result.attempts) },
    { name: 'settings object exists', pass: typeof result.settings === 'object' },
    { name: 'meta object exists', pass: typeof result.meta === 'object' },
    { name: 'meta.exportedBy exists', pass: result.meta.exportedBy === 'claude' },
    { name: 'meta.platform exists', pass: result.meta.platform === 'web' },
  ];

  if (result.tests.length > 0) {
    const test = result.tests[0];
    checks.push(
      { name: 'test has id', pass: typeof test.id === 'string' },
      { name: 'test has timestamp', pass: typeof test.timestamp === 'string' },
      { name: 'test has testType', pass: typeof test.testType === 'string' },
      { name: 'test has score', pass: typeof test.score === 'number' },
      { name: 'test has totalQuestions', pass: typeof test.totalQuestions === 'number' },
      { name: 'test has correctAnswers', pass: typeof test.correctAnswers === 'number' }
    );
  }

  if (result.attempts.length > 0) {
    const attempt = result.attempts[0];
    checks.push(
      { name: 'attempt has id', pass: typeof attempt.id === 'string' },
      { name: 'attempt has testId', pass: typeof attempt.testId === 'string' },
      { name: 'attempt has timestamp', pass: typeof attempt.timestamp === 'string' },
      { name: 'attempt has prompt', pass: typeof attempt.prompt === 'string' },
      { name: 'attempt has expected array', pass: Array.isArray(attempt.expected) },
      { name: 'attempt has response', pass: typeof attempt.response === 'string' },
      { name: 'attempt has correct', pass: typeof attempt.correct === 'boolean' }
    );
  }

  const passed = checks.filter(c => c.pass).length;
  const total = checks.length;

  console.log('Validation Results:');
  checks.forEach(check => {
    console.log(`  ${check.pass ? '✅' : '❌'} ${check.name}`);
  });

  console.log(`\n${passed}/${total} checks passed\n`);

  if (passed === total) {
    console.log('🎉 All validations passed! Export format is correct.\n');
    console.log('Sample export:');
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log('❌ Some validations failed. Export format needs fixing.\n');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Export failed:', error.message);
  process.exit(1);
}
