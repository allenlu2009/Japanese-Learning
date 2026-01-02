'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useTests } from '@/hooks/useTests';
import { VocabularyTestConfig } from './VocabularyTestConfig';
import { VocabularyTest } from './VocabularyTest';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { QuestionCount, CharacterAttempt, QuestionType } from '@/lib/types';
import type { JLPTLevel } from '@/lib/kanjiTestGenerator';
import type { VocabularyQuestion } from '@/lib/vocabularyTestGenerator';
import { generateVocabularyQuestions, validateVocabularyAnswer, calculateVocabularyScore } from '@/lib/vocabularyTestGenerator';
import { addCharacterAttempts } from '@/lib/characterStorage';
import { findVocabulary } from '@/lib/vocabulary';

type TestState = 'config' | 'testing' | 'results';

interface VocabularyTestSession {
  questions: VocabularyQuestion[];
  currentIndex: number;
  level: JLPTLevel;
  questionCount: QuestionCount;
  includeN5: boolean;
}

/**
 * Helper: Extract vocabulary attempts for analytics
 */
function extractVocabularyAttempts(
  session: VocabularyTestSession,
  testId: string
): CharacterAttempt[] {
  const attempts: CharacterAttempt[] = [];
  const timestamp = new Date().toISOString();

  session.questions.forEach((question) => {
    const vocabWord = findVocabulary(question.word);
    if (!vocabWord) return;

    attempts.push({
      id: uuidv4(),
      testId,
      timestamp,
      character: question.word,
      scriptType: 'vocabulary',
      characterType: 'basic', // Vocabulary doesn't use basic/dakuten/combo system
      userAnswer: question.userAnswer || '',
      correctAnswers: question.correctAnswers,
      isCorrect: question.isCorrect || false,
      questionType: 'vocabulary' as QuestionType,

      // Vocabulary-specific fields
      jlptLevel: session.level,
      meanings: [question.meaning],
    });
  });

  return attempts;
}

export function VocabularyTestContainer() {
  const router = useRouter();
  const { addTest } = useTests();

  const [testState, setTestState] = useState<TestState>('config');
  const [session, setSession] = useState<VocabularyTestSession | null>(null);

  // Start the test
  const handleStartTest = (level: JLPTLevel, count: QuestionCount, includeN5: boolean) => {
    try {
      const questions = generateVocabularyQuestions(count, level, includeN5);
      setSession({
        questions,
        currentIndex: 0,
        level,
        questionCount: count,
        includeN5,
      });
      setTestState('testing');
    } catch (error) {
      console.error('Failed to generate vocabulary test:', error);
      alert('Failed to generate test. Please try again.');
    }
  };

  // Submit an answer for the current question
  const handleSubmitAnswer = (answer: string) => {
    if (!session) return;

    const currentQuestion = session.questions[session.currentIndex];
    const isCorrect = validateVocabularyAnswer(answer, currentQuestion.correctAnswers);

    // Update the question with the user's answer
    const updatedQuestions = [...session.questions];
    updatedQuestions[session.currentIndex] = {
      ...currentQuestion,
      userAnswer: answer,
      isCorrect,
    };

    setSession({
      ...session,
      questions: updatedQuestions,
    });
  };

  // Move to next question
  const handleNextQuestion = () => {
    if (!session) return;

    setSession({
      ...session,
      currentIndex: session.currentIndex + 1,
    });
  };

  // Finish the test and show results
  const handleFinishTest = () => {
    setTestState('results');
  };

  // Save the test to localStorage
  const handleSaveTest = () => {
    if (!session) return;

    const score = calculateVocabularyScore(session.questions);
    const correctCount = session.questions.filter(q => q.isCorrect).length;

    // Create a description for the test
    const description = `Vocabulary Test (${session.level}, ${session.questionCount} questions). ` +
      `Score: ${score}%. Correct: ${correctCount}/${session.questions.length}`;

    // Save the test
    const result = addTest({
      date: new Date().toISOString(),
      score,
      category: 'read', // Vocabulary reading falls under "read" category
      description,
    });

    if (result) {
      // Extract and save character attempts for analytics
      const attempts = extractVocabularyAttempts(session, result.id);
      addCharacterAttempts(attempts);

      // Navigate to all tests page
      router.push('/tests');
    } else {
      alert('Failed to save test. Please try again.');
    }
  };

  // Retry the test (start over with same config)
  const handleRetryTest = () => {
    if (!session) return;

    handleStartTest(session.level, session.questionCount, session.includeN5);
  };

  // Go back to config
  const handleBackToConfig = () => {
    setSession(null);
    setTestState('config');
  };

  // Get current question
  const currentQuestion = session ? session.questions[session.currentIndex] : null;
  const isAnswered = currentQuestion ? currentQuestion.isCorrect !== undefined : false;
  const questionNumber = session ? session.currentIndex + 1 : 0;
  const totalQuestions = session ? session.questions.length : 0;

  // Get wrong answers for review mode
  const wrongAnswers = session?.questions.filter(q => q.isCorrect === false) || [];

  // Render based on test state
  if (testState === 'config') {
    return (
      <VocabularyTestConfig
        onStartTest={handleStartTest}
        onBack={() => router.push('/tests/new')}
      />
    );
  }

  if (testState === 'testing' && session) {
    return (
      <VocabularyTest
        currentQuestion={currentQuestion}
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        isAnswered={isAnswered}
        onSubmitAnswer={handleSubmitAnswer}
        onNextQuestion={handleNextQuestion}
        onFinish={handleFinishTest}
      />
    );
  }

  if (testState === 'results' && session) {
    const score = calculateVocabularyScore(session.questions);
    const correctCount = session.questions.filter(q => q.isCorrect).length;

    return (
      <Card>
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h2>
            <div className="text-6xl font-bold text-orange-600 mb-2">{score}%</div>
            <p className="text-lg text-gray-600">
              {correctCount} out of {session.questions.length} correct
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSaveTest} className="flex-1 bg-orange-600 hover:bg-orange-700" size="lg">
              Save Test
            </Button>
            <Button onClick={handleRetryTest} variant="secondary" size="lg">
              Retry
            </Button>
            <Button onClick={handleBackToConfig} variant="ghost" size="lg">
              Back
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Fallback
  return (
    <div className="text-center py-12">
      <p className="text-gray-600">Loading...</p>
    </div>
  );
}
