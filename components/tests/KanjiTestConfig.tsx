'use client';

import React, { useState } from 'react';
import { QuestionCount } from '@/lib/types';
import type { JLPTLevel, KanjiReadingMode } from '@/lib/kanjiTestGenerator';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getKanjiCount } from '@/lib/kanji';

interface KanjiTestConfigProps {
  onStartTest: (level: JLPTLevel, readingMode: KanjiReadingMode, count: QuestionCount, includeN5: boolean) => void;
  onBack: () => void;
}

export function KanjiTestConfig({ onStartTest, onBack }: KanjiTestConfigProps) {
  const [jlptLevel, setJlptLevel] = useState<JLPTLevel>('N5');
  const [readingMode, setReadingMode] = useState<KanjiReadingMode>('mixed');
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);
  const [includeN5, setIncludeN5] = useState(true);

  const handleStart = () => {
    onStartTest(jlptLevel, readingMode, questionCount, includeN5);
  };

  // Dynamic description based on includeN5 setting
  const jlptLevelOptions: Array<{ value: JLPTLevel; label: string; description: string }> = [
    {
      value: 'N5',
      label: 'JLPT N5',
      description: `Basic (${getKanjiCount('N5')} kanji)`,
    },
    {
      value: 'N4',
      label: 'JLPT N4',
      description: includeN5
        ? `Intermediate (${getKanjiCount('N4', true)} kanji, includes N5)`
        : `Intermediate (${getKanjiCount('N4', false)} N4-only kanji)`,
    },
  ];

  const readingModeOptions: Array<{ value: KanjiReadingMode; label: string; description: string }> = [
    {
      value: 'mixed',
      label: 'Mixed',
      description: 'Accept both onyomi and kunyomi',
    },
    {
      value: 'onyomi',
      label: 'Onyomi Only',
      description: 'Chinese readings only',
    },
    {
      value: 'kunyomi',
      label: 'Kunyomi Only',
      description: 'Japanese readings only',
    },
  ];

  const questionCountOptions: QuestionCount[] = [5, 10, 20];

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Configure Your Kanji Test</h3>
          <p className="mt-2 text-gray-600">
            Customize your JLPT kanji reading test before you begin.
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
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="font-semibold text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600 mt-1">{option.description}</div>
              </button>
            ))}
          </div>

          {/* Include N5 Toggle (only show for N4) */}
          {jlptLevel === 'N4' && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeN5}
                  onChange={(e) => setIncludeN5(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Include N5 kanji
                </span>
                <span className="text-xs text-gray-500">
                  (recommended for comprehensive practice)
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Reading Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Reading Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {readingModeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setReadingMode(option.value)}
                className={cn(
                  'p-4 rounded-lg border-2 text-left transition-all',
                  readingMode === option.value
                    ? 'border-blue-500 bg-blue-50'
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
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
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
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-gray-700">
            <span className="font-semibold">Test Summary:</span> You&apos;ll be shown{' '}
            <span className="font-semibold text-blue-700">{questionCount} random kanji</span>
            {' '}from{' '}
            <span className="font-semibold text-blue-700">{jlptLevel}</span>
            {' '}level. Type the{' '}
            <span className="font-semibold text-blue-700">
              {readingMode === 'onyomi' ? 'onyomi (Chinese reading)' :
               readingMode === 'kunyomi' ? 'kunyomi (Japanese reading)' :
               'onyomi or kunyomi reading'}
            </span>
            {' '}in romanji for each kanji.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleStart}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Kanji Test
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
