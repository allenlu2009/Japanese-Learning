'use client';

import React, { useState } from 'react';
import { QuestionCount } from '@/lib/types';
import type { JLPTLevel } from '@/lib/kanjiTestGenerator';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVocabularyCount } from '@/lib/vocabulary';

interface VocabularyTestConfigProps {
  onStartTest: (level: JLPTLevel, count: QuestionCount) => void;
  onBack: () => void;
}

export function VocabularyTestConfig({ onStartTest, onBack }: VocabularyTestConfigProps) {
  const [jlptLevel, setJlptLevel] = useState<JLPTLevel>('N5');
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);

  const handleStart = () => {
    onStartTest(jlptLevel, questionCount);
  };

  const jlptLevelOptions: Array<{ value: JLPTLevel; label: string; description: string }> = [
    {
      value: 'N5',
      label: 'JLPT N5',
      description: `Basic (${getVocabularyCount('N5')} words)`,
    },
    {
      value: 'N4',
      label: 'JLPT N4',
      description: `Intermediate (${getVocabularyCount('N4')} words, includes N5)`,
    },
  ];

  const questionCountOptions: QuestionCount[] = [5, 10, 20];

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Configure Your Vocabulary Test</h3>
          <p className="mt-2 text-gray-600">
            Customize your JLPT vocabulary test before you begin.
          </p>
        </div>

        {/* JLPT Level Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            JLPT Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {jlptLevelOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setJlptLevel(option.value)}
                className={cn(
                  'p-4 rounded-lg border-2 text-left transition-all',
                  jlptLevel === option.value
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="font-semibold text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600 mt-1">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Question Count Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Number of Questions
          </label>
          <div className="grid grid-cols-3 gap-3">
            {questionCountOptions.map((count) => (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className={cn(
                  'p-4 rounded-lg border-2 text-center font-semibold transition-all',
                  questionCount === count
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                )}
              >
                {count}
                {count === 10 && (
                  <span className="block text-xs text-gray-500 font-normal mt-1">
                    Recommended
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-sm text-gray-700">
            <span className="font-semibold">Test Summary:</span> You&apos;ll be shown{' '}
            <span className="font-semibold text-orange-700">{questionCount} random vocabulary words</span>
            {' '}from{' '}
            <span className="font-semibold text-orange-700">{jlptLevel}</span>
            {' '}level. Type the romanji reading for each word.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleStart}
            className="flex-1 bg-orange-600 hover:bg-orange-700"
            size="lg"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Vocabulary Test
          </Button>
          <Button
            variant="ghost"
            onClick={onBack}
            size="lg"
          >
            Back
          </Button>
        </div>
      </div>
    </Card>
  );
}
