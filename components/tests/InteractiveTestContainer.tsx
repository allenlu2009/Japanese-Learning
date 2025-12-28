'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useTests } from '@/hooks/useTests';
import { useTestSession } from '@/hooks/useTestSession';
import { InteractiveTestConfig } from './InteractiveTestConfig';
import { HiraganaTest } from './HiraganaTest';
import { TestResults } from './TestResults';
import type { TestType, QuestionCount, TestSession, CharacterAttempt } from '@/lib/types';
import { addCharacterAttempts } from '@/lib/characterStorage';
import { findHiragana, type HiraganaChar } from '@/lib/hiragana';
import { splitUserAnswer } from '@/lib/syllableMatching';

type TestState = 'config' | 'testing' | 'results';

interface InteractiveTestContainerProps {
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
      const hiraganaChar = findHiragana(question.characters);
      if (!hiraganaChar) return;

      attempts.push({
        id: uuidv4(),
        testId,
        timestamp,
        character: question.characters,
        scriptType: 'hiragana',
        characterType: hiraganaChar.type,
        userAnswer: question.userAnswer || '',
        correctAnswers: question.correctAnswers,
        isCorrect: question.isCorrect || false,
        questionType: '1-char',
      });
    } else if (session.config.testType === '3-char') {
      // Break into individual characters
      const chars = question.characters.split('');
      const hiraganaChars = chars.map(c => findHiragana(c));
      const userAnswerParts = splitUserAnswer(question.userAnswer || '', hiraganaChars);

      chars.forEach((char, index) => {
        const hiraganaChar = hiraganaChars[index];
        if (!hiraganaChar) return;

        const userAnswerPart = userAnswerParts[index] || '';
        const isCorrect = hiraganaChar.romanji.some(
          valid => valid.toLowerCase() === userAnswerPart.toLowerCase()
        );

        attempts.push({
          id: uuidv4(),
          testId,
          timestamp,
          character: char,
          scriptType: 'hiragana',
          characterType: hiraganaChar.type,
          userAnswer: userAnswerPart,
          correctAnswers: hiraganaChar.romanji,
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

export function InteractiveTestContainer({ onBack }: InteractiveTestContainerProps) {
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
    startTest(testType, questionCount);
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
    const description = `Interactive Hiragana ${testType} test (${questionCount} questions). ` +
      `Score: ${score}%. Correct: ${session.questions.filter(q => q.isCorrect).length}/${session.questions.length}`;

    // Save the test
    const result = addTest({
      date: new Date().toISOString().split('T')[0],
      score,
      category: 'read',
      description,
    });

    if (result) {
      // NEW: Extract and save character attempts
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
      <InteractiveTestConfig
        onStartTest={handleStartTest}
        onBack={handleBackToModeSelection}
      />
    );
  }

  if (testState === 'testing' && session) {
    const currentQuestion = getCurrentQuestion();
    const progress = getProgress();

    return (
      <HiraganaTest
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
        onSave={handleSaveTest}
        onRetry={handleRetry}
        onReview={incorrectCount > 0 ? handleStartReview : undefined}
      />
    );
  }

  return null;
}
