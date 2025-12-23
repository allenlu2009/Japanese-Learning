'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Award, CheckCircle, XCircle, RotateCcw, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Question } from '@/lib/testGenerator';

interface TestResultsProps {
  questions: Question[];
  score: number;
  testType: '1-char' | '3-char';
  onSave: () => void;
  onRetry: () => void;
}

export function TestResults({ questions, score, testType, onSave, onRetry }: TestResultsProps) {
  const correctCount = questions.filter(q => q.isCorrect).length;
  const incorrectCount = questions.filter(q => !q.isCorrect).length;
  const totalCount = questions.length;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score === 100) return 'Perfect score! Excellent work!';
    if (score >= 90) return 'Outstanding! Great job!';
    if (score >= 80) return 'Very good! Keep it up!';
    if (score >= 70) return 'Good work! You\'re making progress!';
    if (score >= 60) return 'Not bad! Keep practicing!';
    return 'Keep studying! Practice makes perfect!';
  };

  return (
    <div className="space-y-6">
      {/* Score Summary Card */}
      <Card>
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-4">
            <Award className="h-10 w-10 text-primary-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h2>

          <div className={cn('text-6xl font-bold mb-4', getScoreColor(score))}>
            {score}%
          </div>

          <p className="text-lg text-gray-700 mb-6">{getScoreMessage(score)}</p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalCount}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{correctCount}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={onSave} size="lg">
              <Save className="h-5 w-5 mr-2" />
              Save Test
            </Button>
            <Button onClick={onRetry} variant="ghost" size="lg">
              <RotateCcw className="h-5 w-5 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </Card>

      {/* Detailed Results */}
      <Card>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Review Your Answers</h3>

        <div className="space-y-3">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={cn(
                'p-4 rounded-lg border-2',
                question.isCorrect
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {question.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-sm font-medium text-gray-600">Q{index + 1}:</span>
                    <span className="text-4xl font-bold text-gray-900">{question.characters}</span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Your answer: </span>
                      <span className={cn(
                        'font-semibold',
                        question.isCorrect ? 'text-green-700' : 'text-red-700'
                      )}>
                        {question.userAnswer || '(no answer)'}
                      </span>
                    </div>

                    {!question.isCorrect && (
                      <div>
                        <span className="font-medium text-gray-700">Correct answer: </span>
                        <span className="font-semibold text-green-700">
                          {question.correctAnswers[0]}
                        </span>
                        {question.correctAnswers.length > 1 && (
                          <span className="text-gray-600 ml-2">
                            (also: {question.correctAnswers.slice(1).join(', ')})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
