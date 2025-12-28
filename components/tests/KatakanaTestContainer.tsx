'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useTests } from '@/hooks/useTests';
import { useTestSession } from '@/hooks/useTestSession';
import { KatakanaTestConfig } from './KatakanaTestConfig';
import { KatakanaTest } from './KatakanaTest';
import { TestResults } from './TestResults';
import type { TestType, QuestionCount, TestSession, CharacterAttempt } from '@/lib/types';
import { addCharacterAttempts } from '@/lib/characterStorage';
import { findKatakana, type KatakanaChar } from '@/lib/katakana';
import { splitUserAnswer } from '@/lib/syllableMatching';

type TestState = 'config' | 'testing' | 'results';

interface KatakanaTestContainerProps {
  onBack: () => void;
}

/**
 * Helper: Extract character attempts from test session
 * Handles both 1-char and 3-char questions
 */
function extractCharacterAttempts(
  session: TestSession,
  testId: string
): CharacterAttempt[] {
  const attempts: CharacterAttempt[] = [];
  const timestamp = new Date().toISOString();

  session.questions.forEach((question) => {
    if (session.config.testType === '1-char') {
      // Single character - straightforward
      const katakanaChar = findKatakana(question.characters);
      if (!katakanaChar) return;

      attempts.push({
        id: uuidv4(),
        testId,
        timestamp,
        character: question.characters,
        scriptType: 'katakana',
        characterType: katakanaChar.type,
        userAnswer: question.userAnswer || '',
        correctAnswers: question.correctAnswers,
        isCorrect: question.isCorrect || false,
        questionType: '1-char',
      });
    } else if (session.config.testType === '3-char') {
      // Break into individual characters
      const chars = question.characters.split('');
      const katakanaChars = chars.map(c => findKatakana(c));
      const userAnswerParts = splitUserAnswer(question.userAnswer || '', katakanaChars);

      chars.forEach((char, index) => {
        const katakanaChar = katakanaChars[index];
        if (!katakanaChar) return;

        const userAnswerPart = userAnswerParts[index] || '';
        const isCorrect = katakanaChar.romanji.some(
          valid => valid.toLowerCase() === userAnswerPart.toLowerCase()
        );

        attempts.push({
          id: uuidv4(),
          testId,
          timestamp,
          character: char,
          scriptType: 'katakana',
          characterType: katakanaChar.type,
          userAnswer: userAnswerPart,
          correctAnswers: katakanaChar.romanji,
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

export function KatakanaTestContainer({ onBack }: KatakanaTestContainerProps) {
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
    startTest(testType, questionCount, 'katakana');
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
    const description = `Interactive Katakana ${testType} test (${questionCount} questions). ` +
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
      <KatakanaTestConfig
        onStartTest={handleStartTest}
        onBack={handleBackToModeSelection}
      />
    );
  }

  if (testState === 'testing' && session) {
    const currentQuestion = getCurrentQuestion();
    const progress = getProgress();

    return (
      <KatakanaTest
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
        scriptType="katakana"
        onSave={handleSaveTest}
        onRetry={handleRetry}
        onReview={incorrectCount > 0 ? handleStartReview : undefined}
      />
    );
  }

  return null;
}
