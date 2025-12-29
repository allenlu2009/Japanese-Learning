'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useTests } from '@/hooks/useTests';
import { KanjiTestConfig } from './KanjiTestConfig';
import { KanjiTest } from './KanjiTest';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { QuestionCount, CharacterAttempt, QuestionType } from '@/lib/types';
import type { JLPTLevel, KanjiReadingMode, KanjiQuestion } from '@/lib/kanjiTestGenerator';
import { generateKanjiQuestions, validateKanjiAnswer, calculateKanjiScore } from '@/lib/kanjiTestGenerator';
import { addCharacterAttempts } from '@/lib/characterStorage';
import { findKanji } from '@/lib/kanji';

type TestState = 'config' | 'testing' | 'results';

interface KanjiTestSession {
  questions: KanjiQuestion[];
  currentIndex: number;
  level: JLPTLevel;
  readingMode: KanjiReadingMode;
  questionCount: QuestionCount;
}

/**
 * Helper: Extract kanji character attempts for analytics
 */
function extractKanjiAttempts(
  session: KanjiTestSession,
  testId: string
): CharacterAttempt[] {
  const attempts: CharacterAttempt[] = [];
  const timestamp = new Date().toISOString();

  session.questions.forEach((question) => {
    const kanjiChar = findKanji(question.kanji);
    if (!kanjiChar) return;

    attempts.push({
      id: uuidv4(),
      testId,
      timestamp,
      character: question.kanji,
      scriptType: 'kanji',
      characterType: 'basic', // Kanji doesn't use basic/dakuten/combo system
      userAnswer: question.userAnswer || '',
      correctAnswers: question.correctAnswers,
      isCorrect: question.isCorrect || false,
      questionType: 'kanji' as QuestionType,

      // Kanji-specific fields
      readingType: question.readingType,
      jlptLevel: session.level,
      meanings: question.meanings,
    });
  });

  return attempts;
}

export function KanjiTestContainer() {
  const router = useRouter();
  const { addTest } = useTests();

  const [testState, setTestState] = useState<TestState>('config');
  const [session, setSession] = useState<KanjiTestSession | null>(null);

  // Start the test
  const handleStartTest = (level: JLPTLevel, readingMode: KanjiReadingMode, count: QuestionCount) => {
    try {
      const questions = generateKanjiQuestions(count, level, readingMode);
      setSession({
        questions,
        currentIndex: 0,
        level,
        readingMode,
        questionCount: count,
      });
      setTestState('testing');
    } catch (error) {
      console.error('Failed to generate kanji test:', error);
      alert('Failed to generate test. Please try again.');
    }
  };

  // Submit an answer for the current question
  const handleSubmitAnswer = (answer: string) => {
    if (!session) return;

    const currentQuestion = session.questions[session.currentIndex];
    const isCorrect = validateKanjiAnswer(answer, currentQuestion.correctAnswers);

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

    const score = calculateKanjiScore(session.questions);
    const correctCount = session.questions.filter(q => q.isCorrect).length;

    // Create a description for the test
    const readingModeLabel =
      session.readingMode === 'onyomi' ? 'Onyomi' :
      session.readingMode === 'kunyomi' ? 'Kunyomi' :
      'Mixed';

    const description = `Kanji ${readingModeLabel} Test (${session.level}, ${session.questionCount} questions). ` +
      `Score: ${score}%. Correct: ${correctCount}/${session.questions.length}`;

    // Save the test
    const result = addTest({
      date: new Date().toISOString(),
      score,
      category: 'read', // Kanji reading falls under "read" category
      description,
    });

    if (result) {
      // Extract and save character attempts for analytics
      const attempts = extractKanjiAttempts(session, result.id);
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

    handleStartTest(session.level, session.readingMode, session.questionCount);
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
      <KanjiTestConfig
        onStartTest={handleStartTest}
        onBack={() => router.push('/tests/new')}
      />
    );
  }

  if (testState === 'testing' && session) {
    return (
      <KanjiTest
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
    const score = calculateKanjiScore(session.questions);
    const correctCount = session.questions.filter(q => q.isCorrect).length;

    return (
      <Card>
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h2>
            <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
            <p className="text-lg text-gray-600">
              {correctCount} out of {session.questions.length} correct
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSaveTest} className="flex-1 bg-blue-600 hover:bg-blue-700" size="lg">
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
