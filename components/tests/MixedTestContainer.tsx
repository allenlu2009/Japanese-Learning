'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useTests } from '@/hooks/useTests';
import { useTestSession } from '@/hooks/useTestSession';
import { MixedTestConfig } from './MixedTestConfig';
import { MixedTest } from './MixedTest';
import { TestResults } from './TestResults';
import type { TestType, QuestionCount, TestSession, CharacterAttempt } from '@/lib/types';
import { addCharacterAttempts } from '@/lib/characterStorage';
import { findHiragana } from '@/lib/hiragana';
import { findKatakana } from '@/lib/katakana';
import { splitUserAnswer } from '@/lib/syllableMatching';

type TestState = 'config' | 'testing' | 'results';

interface MixedTestContainerProps {
  onBack: () => void;
}

/**
 * Helper: Extract character attempts from test session
 * Handles both 1-char and 3-char questions, supporting both hiragana and katakana
 */
function extractCharacterAttempts(
  session: TestSession,
  testId: string
): CharacterAttempt[] {
  const attempts: CharacterAttempt[] = [];
  const timestamp = new Date().toISOString();

  session.questions.forEach((question) => {
    if (session.config.testType === '1-char') {
      // Single character - try hiragana first, then katakana
      const hiraganaChar = findHiragana(question.characters);
      const katakanaChar = findKatakana(question.characters);
      const char = hiraganaChar || katakanaChar;
      if (!char) return;

      const scriptType = hiraganaChar ? 'hiragana' : 'katakana';

      attempts.push({
        id: uuidv4(),
        testId,
        timestamp,
        character: question.characters,
        scriptType,
        characterType: char.type,
        userAnswer: question.userAnswer || '',
        correctAnswers: question.correctAnswers,
        isCorrect: question.isCorrect || false,
        questionType: '1-char',
      });
    } else if (session.config.testType === '3-char') {
      // Break into individual characters
      const chars = question.characters.split('');
      const japaneseChars = chars.map(c => findHiragana(c) || findKatakana(c));
      const userAnswerParts = splitUserAnswer(question.userAnswer || '', japaneseChars);

      chars.forEach((char, index) => {
        const japaneseChar = japaneseChars[index];
        if (!japaneseChar) return;

        // Detect script type by checking which lookup succeeded
        const isHiragana = findHiragana(char);
        const scriptType = isHiragana ? 'hiragana' : 'katakana';

        const userAnswerPart = userAnswerParts[index] || '';
        const isCorrect = japaneseChar.romanji.some(
          valid => valid.toLowerCase() === userAnswerPart.toLowerCase()
        );

        attempts.push({
          id: uuidv4(),
          testId,
          timestamp,
          character: char,
          scriptType,
          characterType: japaneseChar.type,
          userAnswer: userAnswerPart,
          correctAnswers: japaneseChar.romanji,
          isCorrect,
          questionType: '3-char',
          sequencePosition: index,
          originalSequence: question.characters,
        });
      });
    }
  });

  return attempts;
}

export function MixedTestContainer({ onBack }: MixedTestContainerProps) {
  const router = useRouter();
  const { addTest } = useTests();
  const {
    session,
    startTest,
    submitAnswer,
    nextQuestion,
    finishTest,
    resetTest,
    getCurrentQuestion,
    isCurrentQuestionAnswered,
    getProgress,
    getScore,
    startReviewSession,
  } = useTestSession();

  const [testState, setTestState] = useState<TestState>('config');
  const [completedSession, setCompletedSession] = useState<TestSession | null>(null);

  // Start the test
  const handleStartTest = (testType: TestType, questionCount: QuestionCount) => {
    startTest(testType, questionCount, 'mixed');
    setTestState('testing');
  };

  // Submit an answer
  const handleSubmitAnswer = (answer: string) => {
    submitAnswer(answer);
  };

  // Move to next question
  const handleNextQuestion = () => {
    nextQuestion();
  };

  // Finish the test and show results
  const handleFinishTest = () => {
    finishTest();
    if (session) {
      setCompletedSession(session);
    }
    setTestState('results');
  };

  // Start review mode with incorrect answers
  const handleStartReview = () => {
    startReviewSession();
    setTestState('testing');
  };

  // Save the test to localStorage
  const handleSaveTest = () => {
    if (!session) return;

    const score = getScore();
    const { testType, questionCount } = session.config;

    // Create a description for the test
    const description = `Interactive Mixed ${testType} test (${questionCount} questions). ` +
      `Score: ${score}%. Correct: ${session.questions.filter(q => q.isCorrect).length}/${session.questions.length}`;

    // Save the test
    const result = addTest({
      date: new Date().toISOString().split('T')[0],
      score,
      category: 'read',
      description,
    });

    if (result) {
      // Extract and save character attempts
      const characterAttempts = extractCharacterAttempts(session, result.id);
      const saveSuccess = addCharacterAttempts(characterAttempts);

      if (!saveSuccess) {
        console.error('Failed to save character attempts');
        // Note: Test is already saved, so we don't block navigation
      }

      // Redirect to dashboard
      router.push('/');
    }
  };

  // Retry the test (go back to config)
  const handleRetry = () => {
    resetTest();
    setCompletedSession(null);
    setTestState('config');
  };

  // Back to mode selection
  const handleBackToModeSelection = () => {
    resetTest();
    onBack();
  };

  // Render based on current state
  if (testState === 'config') {
    return (
      <MixedTestConfig
        onStartTest={handleStartTest}
        onBack={handleBackToModeSelection}
      />
    );
  }

  if (testState === 'testing' && session) {
    const currentQuestion = getCurrentQuestion();
    const progress = getProgress();

    return (
      <MixedTest
        currentQuestion={currentQuestion}
        questionNumber={progress.current}
        totalQuestions={progress.total}
        isAnswered={isCurrentQuestionAnswered()}
        onSubmitAnswer={handleSubmitAnswer}
        onNextQuestion={handleNextQuestion}
        onFinish={handleFinishTest}
      />
    );
  }

  if (testState === 'results' && completedSession) {
    const score = getScore();
    const incorrectCount = completedSession.questions.filter(q => !q.isCorrect).length;

    return (
      <TestResults
        questions={completedSession.questions}
        score={score}
        testType={completedSession.config.testType || '1-char'}
        scriptType="mixed"
        onSave={handleSaveTest}
        onRetry={handleRetry}
        onReview={incorrectCount > 0 ? handleStartReview : undefined}
      />
    );
  }

  return null;
}
