'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTests } from '@/hooks/useTests';
import { useTestSession } from '@/hooks/useTestSession';
import { InteractiveTestConfig } from './InteractiveTestConfig';
import { HiraganaTest } from './HiraganaTest';
import { TestResults } from './TestResults';
import type { TestType, QuestionCount } from '@/lib/types';

type TestState = 'config' | 'testing' | 'results';

interface InteractiveTestContainerProps {
  onBack: () => void;
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
  } = useTestSession();

  const [testState, setTestState] = useState<TestState>('config');

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
    setTestState('results');
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
      // Redirect to dashboard
      router.push('/');
    }
  };

  // Retry the test (go back to config)
  const handleRetry = () => {
    resetTest();
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

  if (testState === 'results' && session) {
    const score = getScore();

    return (
      <TestResults
        questions={session.questions}
        score={score}
        testType={session.config.testType || '1-char'}
        onSave={handleSaveTest}
        onRetry={handleRetry}
      />
    );
  }

  return null;
}
