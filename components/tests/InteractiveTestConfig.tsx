'use client';

import React, { useState } from 'react';
import { TestType, QuestionCount } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractiveTestConfigProps {
  onStartTest: (testType: TestType, questionCount: QuestionCount) => void;
  onBack: () => void;
}

export function InteractiveTestConfig({ onStartTest, onBack }: InteractiveTestConfigProps) {
  const [testType, setTestType] = useState<TestType>('1-char');
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);

  const handleStart = () => {
    onStartTest(testType, questionCount);
  };

  const testTypeOptions: Array<{ value: TestType; label: string; description: string }> = [
    {
      value: '1-char',
      label: '1 Character',
      description: 'Test single hiragana characters',
    },
    {
      value: '3-char',
      label: '3 Characters',
      description: 'Test sequences of three hiragana',
    },
  ];

  const questionCountOptions: QuestionCount[] = [5, 10, 20];

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Configure Your Test</h3>
          <p className="mt-2 text-gray-600">
            Customize your Hiragana reading test before you begin.
          </p>
        </div>

        {/* Test Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Test Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {testTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTestType(option.value)}
                className={cn(
                  'p-4 rounded-lg border-2 text-left transition-all',
                  testType === option.value
                    ? 'border-primary-500 bg-primary-50'
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
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
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
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-700">
            <span className="font-semibold">Test Summary:</span> You&apos;ll be shown{' '}
            <span className="font-semibold text-primary-600">{questionCount} random{' '}
            {testType === '1-char' ? 'single hiragana characters' : '3-character hiragana sequences'}</span>.
            Type the romanji for each character to answer.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleStart}
            className="flex-1"
            size="lg"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Test
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
