'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, CheckCircle, XCircle, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Question } from '@/lib/katakanaTestGenerator';
import { analyzeMultiCharAnswer, formatCorrectAnswerWithIndicators, countJapaneseCharacters } from '@/lib/answerAnalysis';
import { playCharacterAudio } from '@/lib/audioPlayer';
import { useAudioSettings } from '@/hooks/useAudioSettings';

interface KatakanaTestProps {
  currentQuestion: Question | null;
  questionNumber: number;
  totalQuestions: number;
  isAnswered: boolean;
  onSubmitAnswer: (answer: string) => void;
  onNextQuestion: () => void;
  onFinish: () => void;
}

export function KatakanaTest({
  currentQuestion,
  questionNumber,
  totalQuestions,
  isAnswered,
  onSubmitAnswer,
  onNextQuestion,
  onFinish,
}: KatakanaTestProps) {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isLastQuestion = questionNumber === totalQuestions;
  const { settings, toggleAudio } = useAudioSettings();

  // Reset answer and play audio when question changes
  useEffect(() => {
    if (currentQuestion) {
      setAnswer(currentQuestion.userAnswer || '');
      // Focus input on new question
      setTimeout(() => inputRef.current?.focus(), 100);

      // Play audio for the character if audio is enabled
      if (settings.enabled && !isAnswered) {
        playCharacterAudio(currentQuestion.characters, {
          rate: settings.rate,
          volume: settings.volume,
        }).catch(error => {
          console.error('Error playing audio:', error);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion?.id]);

  if (!currentQuestion) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-gray-600">No question available.</p>
        </div>
      </Card>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If already answered, Enter should go to next question
    if (isAnswered) {
      handleNext();
      return;
    }

    // Otherwise, submit the answer
    if (!answer.trim()) return;
    onSubmitAnswer(answer);
  };

  const handleNext = () => {
    // Clear the answer field before moving to next question
    setAnswer('');

    if (isLastQuestion) {
      onFinish();
    } else {
      onNextQuestion();
    }
  };

  const progress = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <Card>
      <div className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {questionNumber} of {totalQuestions}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAudio}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title={settings.enabled ? 'Mute audio' : 'Unmute audio'}
                type="button"
              >
                {settings.enabled ? (
                  <Volume2 className="h-5 w-5 text-red-600" />
                ) : (
                  <VolumeX className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Katakana Display */}
        <div className="text-center py-12 bg-gradient-to-br from-red-50 to-white rounded-lg border-2 border-red-100">
          <div className="text-8xl md:text-9xl font-bold text-gray-900 mb-4 select-none">
            {currentQuestion.characters}
          </div>
          <p className="text-gray-600 text-lg">
            Type the romanji for this katakana
          </p>
        </div>

        {/* Answer Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              ref={inputRef}
              label="Your Answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type romanji here..."
              readOnly={isAnswered}
              className="text-lg text-center"
              autoComplete="off"
              autoFocus
            />

            {isAnswered && currentQuestion.isCorrect !== undefined && (
              <div className="absolute right-3 top-10 flex items-center">
                {currentQuestion.isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
              </div>
            )}
          </div>

          {/* Feedback */}
          {isAnswered && currentQuestion.isCorrect !== undefined && (
            <div
              className={cn(
                'p-4 rounded-lg border-2',
                currentQuestion.isCorrect
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              )}
            >
              <div className="flex items-start gap-3">
                {currentQuestion.isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p
                    className={cn(
                      'font-semibold',
                      currentQuestion.isCorrect ? 'text-green-800' : 'text-red-800'
                    )}
                  >
                    {currentQuestion.isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  {!currentQuestion.isCorrect && (
                    <div className="text-sm text-red-700 mt-1">
                      <div className="mb-1">Correct answer:</div>
                      {countJapaneseCharacters(currentQuestion.characters) === 3 && currentQuestion.userAnswer ? (
                        // 3-character test: Show visual indicators for which syllables are wrong
                        <div className="font-semibold text-base">
                          {(() => {
                            try {
                              const analysis = analyzeMultiCharAnswer(
                                currentQuestion.characters,
                                currentQuestion.userAnswer
                              );
                              const formatted = formatCorrectAnswerWithIndicators(analysis);

                              return formatted.map((part, idx) => (
                                <span key={idx}>
                                  {part.isWrong ? (
                                    // Wrong syllable: Red background with brackets
                                    <span style={{
                                      backgroundColor: '#fecaca',
                                      color: '#b91c1c',
                                      padding: '2px 6px',
                                      margin: '0 2px',
                                      fontWeight: 'bold',
                                      borderRadius: '4px',
                                      border: '2px solid #991b1b'
                                    }}>
                                      [{part.syllable}]
                                    </span>
                                  ) : (
                                    // Correct syllable: Green text
                                    <span style={{
                                      color: '#15803d',
                                      padding: '2px 4px',
                                      fontWeight: 'bold'
                                    }}>
                                      {part.syllable}
                                    </span>
                                  )}
                                </span>
                              ));
                            } catch (error) {
                              console.error('Error analyzing answer:', error);
                              return <span className="font-semibold">{currentQuestion.correctAnswers[0]}</span>;
                            }
                          })()}
                        </div>
                      ) : (
                        // 1-character test or no analysis: Show simple correct answer
                        <span className="font-semibold">{currentQuestion.correctAnswers[0]}</span>
                      )}
                      {currentQuestion.correctAnswers.length > 1 && (
                        <div className="text-xs text-red-600 mt-1">
                          Also accepted: {currentQuestion.correctAnswers.slice(1).join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isAnswered ? (
              <Button type="submit" className="flex-1" size="lg" disabled={!answer.trim()}>
                Submit Answer
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1"
                size="lg"
              >
                {isLastQuestion ? 'Finish Test' : 'Next Question'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </div>
        </form>

        {/* Keyboard Hint */}
        <div className="text-center text-sm text-gray-500">
          Press <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono">Enter</kbd> to {isAnswered ? 'continue' : 'submit'}
        </div>
      </div>
    </Card>
  );
}
