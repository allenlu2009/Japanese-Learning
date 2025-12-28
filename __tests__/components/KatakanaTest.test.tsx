/**
 * Component tests for KatakanaTest
 * These tests verify the visual feedback display that wasn't caught by unit tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KatakanaTest } from '../../components/tests/KatakanaTest';
import type { Question } from '../../lib/katakanaTestGenerator';

describe('KatakanaTest Component', () => {
  const mockOnSubmitAnswer = jest.fn();
  const mockOnNextQuestion = jest.fn();
  const mockOnFinish = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Visual Feedback for Wrong Answers', () => {
    it('should show brackets around wrong syllables for フツビョ with rashibyo', () => {
      const question: Question = {
        id: 'q1',
        characters: 'フツビョ',
        correctAnswers: ['futsubyo', 'hutsybyo'],
        userAnswer: 'rashibyo',
        isCorrect: false,
      };

      render(
        <KatakanaTest
          currentQuestion={question}
          questionNumber={1}
          totalQuestions={3}
          isAnswered={true}
          onSubmitAnswer={mockOnSubmitAnswer}
          onNextQuestion={mockOnNextQuestion}
          onFinish={mockOnFinish}
        />
      );

      // Should show "Incorrect"
      expect(screen.getByText('Incorrect')).toBeInTheDocument();

      // Should show "Correct answer:"
      expect(screen.getByText(/Correct answer:/)).toBeInTheDocument();

      // The critical test: Should show brackets in the HTML
      // This is what the bug prevented - no brackets were shown
      const container = screen.getByText(/Correct answer:/).parentElement;
      expect(container?.textContent).toContain('[');
      expect(container?.textContent).toContain(']');
    });

    it('should show brackets around wrong syllables for ムヨズ with moyozu', () => {
      const question: Question = {
        id: 'q1',
        characters: 'ムヨズ',
        correctAnswers: ['muyozu'],
        userAnswer: 'moyozu',
        isCorrect: false,
      };

      render(
        <KatakanaTest
          currentQuestion={question}
          questionNumber={1}
          totalQuestions={3}
          isAnswered={true}
          onSubmitAnswer={mockOnSubmitAnswer}
          onNextQuestion={mockOnNextQuestion}
          onFinish={mockOnFinish}
        />
      );

      const container = screen.getByText(/Correct answer:/).parentElement;

      // Should have brackets for wrong syllable [mu]
      expect(container?.textContent).toContain('[');
      expect(container?.textContent).toContain('mu');
    });

    it('should show brackets around wrong syllables for ブヌサ with huyosa', () => {
      const question: Question = {
        id: 'q1',
        characters: 'ブヌサ',
        correctAnswers: ['bunusa'],
        userAnswer: 'huyosa',
        isCorrect: false,
      };

      render(
        <KatakanaTest
          currentQuestion={question}
          questionNumber={1}
          totalQuestions={3}
          isAnswered={true}
          onSubmitAnswer={mockOnSubmitAnswer}
          onNextQuestion={mockOnNextQuestion}
          onFinish={mockOnFinish}
        />
      );

      const container = screen.getByText(/Correct answer:/).parentElement;

      // Should have brackets for wrong syllables [bu][nu]
      expect(container?.textContent).toContain('[bu]');
      expect(container?.textContent).toContain('[nu]');
      expect(container?.textContent).toContain('sa');
    });

    it('should NOT show brackets for correct answers', () => {
      const question: Question = {
        id: 'q1',
        characters: 'カタナ',
        correctAnswers: ['katana'],
        userAnswer: 'katana',
        isCorrect: true,
      };

      render(
        <KatakanaTest
          currentQuestion={question}
          questionNumber={1}
          totalQuestions={3}
          isAnswered={true}
          onSubmitAnswer={mockOnSubmitAnswer}
          onNextQuestion={mockOnNextQuestion}
          onFinish={mockOnFinish}
        />
      );

      // Should show "Correct!"
      expect(screen.getByText('Correct!')).toBeInTheDocument();

      // Should NOT show "Correct answer:" section
      expect(screen.queryByText(/Correct answer:/)).not.toBeInTheDocument();
    });

    it('should show plain text for 1-character tests (no syllable breakdown)', () => {
      const question: Question = {
        id: 'q1',
        characters: 'フ', // Single character
        correctAnswers: ['fu', 'hu'],
        userAnswer: 'ra',
        isCorrect: false,
      };

      render(
        <KatakanaTest
          currentQuestion={question}
          questionNumber={1}
          totalQuestions={10}
          isAnswered={true}
          onSubmitAnswer={mockOnSubmitAnswer}
          onNextQuestion={mockOnNextQuestion}
          onFinish={mockOnFinish}
        />
      );

      // Should show correct answer but NOT with brackets (only 1 char)
      expect(screen.getByText(/Correct answer:/)).toBeInTheDocument();

      // The answer should be plain text, not analyzed
      const container = screen.getByText(/Correct answer:/).parentElement;
      expect(container?.textContent).toContain('fu');
    });
  });

  describe('User Interaction', () => {
    it('should call onSubmitAnswer when user submits an answer', () => {
      const question: Question = {
        id: 'q1',
        characters: 'カ',
        correctAnswers: ['ka'],
      };

      render(
        <KatakanaTest
          currentQuestion={question}
          questionNumber={1}
          totalQuestions={5}
          isAnswered={false}
          onSubmitAnswer={mockOnSubmitAnswer}
          onNextQuestion={mockOnNextQuestion}
          onFinish={mockOnFinish}
        />
      );

      const input = screen.getByPlaceholderText(/type romanji here/i);
      const submitButton = screen.getByText(/submit answer/i);

      fireEvent.change(input, { target: { value: 'ka' } });
      fireEvent.click(submitButton);

      expect(mockOnSubmitAnswer).toHaveBeenCalledWith('ka');
    });

    it('should call onNextQuestion when Next button is clicked', () => {
      const question: Question = {
        id: 'q1',
        characters: 'カ',
        correctAnswers: ['ka'],
        userAnswer: 'ka',
        isCorrect: true,
      };

      render(
        <KatakanaTest
          currentQuestion={question}
          questionNumber={1}
          totalQuestions={5}
          isAnswered={true}
          onSubmitAnswer={mockOnSubmitAnswer}
          onNextQuestion={mockOnNextQuestion}
          onFinish={mockOnFinish}
        />
      );

      const nextButton = screen.getByText(/next question/i);
      fireEvent.click(nextButton);

      expect(mockOnNextQuestion).toHaveBeenCalled();
    });

    it('should call onFinish when Finish button is clicked on last question', () => {
      const question: Question = {
        id: 'q5',
        characters: 'カ',
        correctAnswers: ['ka'],
        userAnswer: 'ka',
        isCorrect: true,
      };

      render(
        <KatakanaTest
          currentQuestion={question}
          questionNumber={5}
          totalQuestions={5}
          isAnswered={true}
          onSubmitAnswer={mockOnSubmitAnswer}
          onNextQuestion={mockOnNextQuestion}
          onFinish={mockOnFinish}
        />
      );

      const finishButton = screen.getByText(/finish test/i);
      fireEvent.click(finishButton);

      expect(mockOnFinish).toHaveBeenCalled();
    });
  });
});
