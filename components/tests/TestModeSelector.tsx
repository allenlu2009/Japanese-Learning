'use client';

import React from 'react';
import { TestMode } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Gamepad2, PencilLine } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestModeSelectorProps {
  selectedMode: TestMode;
  onModeChange: (mode: TestMode) => void;
}

export function TestModeSelector({ selectedMode, onModeChange }: TestModeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Test Mode</h3>
        <p className="text-sm text-gray-600">
          Select how you want to add a test to your learning tracker.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Manual Entry Mode */}
        <button
          onClick={() => onModeChange('manual')}
          className={cn(
            'text-left p-6 rounded-lg border-2 transition-all hover:shadow-lg',
            selectedMode === 'manual'
              ? 'border-primary-500 bg-primary-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300'
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'p-3 rounded-lg',
                selectedMode === 'manual'
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-600'
              )}
            >
              <PencilLine className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Manual Entry</h4>
              <p className="text-sm text-gray-600">
                Manually enter test results from external tests or practice sessions.
                Best for Listening, Writing, and Speaking tests.
              </p>
            </div>
          </div>
        </button>

        {/* Interactive Test Mode */}
        <button
          onClick={() => onModeChange('interactive')}
          className={cn(
            'text-left p-6 rounded-lg border-2 transition-all hover:shadow-lg',
            selectedMode === 'interactive'
              ? 'border-primary-500 bg-primary-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300'
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'p-3 rounded-lg',
                selectedMode === 'interactive'
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-600'
              )}
            >
              <Gamepad2 className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Interactive Test</h4>
              <p className="text-sm text-gray-600">
                Take a real-time Hiragana reading test. The system will generate random questions and automatically calculate your score.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
