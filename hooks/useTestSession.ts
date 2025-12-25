'use client';

import { useState, useCallback } from 'react';
import { TestConfig, TestSession, TestType, QuestionCount } from '@/lib/types';
import { generateQuestions, answerQuestion, calculateScore, type Question } from '@/lib/testGenerator';

export function useTestSession() {
  const [session, setSession] = useState<TestSession | null>(null);

  // Start a new test session
  const startTest = useCallback((testType: TestType, questionCount: QuestionCount) => {
    const questions = generateQuestions(testType, questionCount);

    const newSession: TestSession = {
      config: {
        mode: 'interactive',
        testType,
        questionCount,
      },
      questions,
      currentQuestionIndex: 0,
      startTime: new Date(),
    };

    setSession(newSession);
  }, []);

  // Submit an answer for the current question
  const submitAnswer = useCallback((answer: string) => {
    if (!session) return;

    const currentQuestion = session.questions[session.currentQuestionIndex];
    if (!currentQuestion) return;

    // Process the answer
    const updatedQuestion = answerQuestion(currentQuestion, answer);

    // Update the questions array
    const updatedQuestions = [...session.questions];
    updatedQuestions[session.currentQuestionIndex] = updatedQuestion;

    setSession({
      ...session,
      questions: updatedQuestions,
    });
  }, [session]);

  // Move to the next question
  const nextQuestion = useCallback(() => {
    if (!session) return;

    const nextIndex = session.currentQuestionIndex + 1;

    if (nextIndex < session.questions.length) {
      setSession({
        ...session,
        currentQuestionIndex: nextIndex,
      });
    }
  }, [session]);

  // Move to the previous question
  const previousQuestion = useCallback(() => {
    if (!session) return;

    const prevIndex = session.currentQuestionIndex - 1;

    if (prevIndex >= 0) {
      setSession({
        ...session,
        currentQuestionIndex: prevIndex,
      });
    }
  }, [session]);

  // Finish the test
  const finishTest = useCallback(() => {
    if (!session) return;

    setSession({
      ...session,
      endTime: new Date(),
    });
  }, [session]);

  // Reset the test session
  const resetTest = useCallback(() => {
    setSession(null);
  }, []);

  // Get current question
  const getCurrentQuestion = useCallback(() => {
    if (!session) return null;
    return session.questions[session.currentQuestionIndex];
  }, [session]);

  // Check if test is finished
  const isFinished = useCallback(() => {
    if (!session) return false;
    return session.endTime !== undefined;
  }, [session]);

  // Check if all questions are answered
  const areAllQuestionsAnswered = useCallback(() => {
    if (!session) return false;
    return session.questions.every(q => q.userAnswer !== undefined);
  }, [session]);

  // Calculate current score
  const getScore = useCallback(() => {
    if (!session) return 0;
    return calculateScore(session.questions);
  }, [session]);

  // Get test progress
  const getProgress = useCallback(() => {
    if (!session) return { current: 0, total: 0, percentage: 0 };

    const current = session.currentQuestionIndex + 1;
    const total = session.questions.length;
    const percentage = Math.round((current / total) * 100);

    return { current, total, percentage };
  }, [session]);

  // Check if current question has been answered
  const isCurrentQuestionAnswered = useCallback(() => {
    const currentQuestion = getCurrentQuestion();
    return currentQuestion?.userAnswer !== undefined;
  }, [getCurrentQuestion]);

  // Start a review session with only incorrect questions
  const startReviewSession = useCallback(() => {
    if (!session) return;

    // Filter for incorrect questions and reset their answers
    const incorrectQuestions = session.questions
      .filter(q => !q.isCorrect)
      .map(q => ({
        ...q,
        userAnswer: undefined,
        isCorrect: undefined,
      }));

    if (incorrectQuestions.length === 0) return;

    const reviewSession: TestSession = {
      config: session.config,
      questions: incorrectQuestions,
      currentQuestionIndex: 0,
      startTime: new Date(),
    };

    setSession(reviewSession);
  }, [session]);

  return {
    session,
    startTest,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    finishTest,
    resetTest,
    getCurrentQuestion,
    isFinished,
    areAllQuestionsAnswered,
    getScore,
    getProgress,
    isCurrentQuestionAnswered,
    startReviewSession,
  };
}
