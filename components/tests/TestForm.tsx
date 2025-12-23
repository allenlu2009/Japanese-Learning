'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { testSchema, type TestFormSchema } from '@/lib/validation';
import { useTests } from '@/hooks/useTests';
import { CATEGORIES, CATEGORY_LABELS } from '@/lib/constants';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TestModeSelector } from './TestModeSelector';
import { InteractiveTestContainer } from './InteractiveTestContainer';
import { CheckCircle } from 'lucide-react';
import type { TestMode } from '@/lib/types';

export function TestForm() {
  const router = useRouter();
  const { addTest } = useTests();
  const [testMode, setTestMode] = useState<TestMode>('manual');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TestFormSchema>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      score: 0,
      category: undefined,
      description: '',
    },
  });

  const onSubmit = async (data: TestFormSchema) => {
    try {
      const result = addTest({
        date: data.date,
        score: data.score,
        category: data.category,
        description: data.description,
      });

      if (result) {
        setSuccess(true);
        reset();

        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  const categoryOptions = CATEGORIES.map((cat) => ({
    value: cat,
    label: CATEGORY_LABELS[cat],
  }));

  // Handle back from interactive mode
  const handleBackToModeSelection = () => {
    setTestMode('manual');
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector - only show if not in interactive mode */}
      {testMode === 'manual' && (
        <TestModeSelector
          selectedMode={testMode}
          onModeChange={setTestMode}
        />
      )}

      {/* Conditional Rendering based on mode */}
      {testMode === 'manual' ? (
        <Card>
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <p className="font-medium">Test added successfully! Redirecting to dashboard...</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Test Date"
                type="date"
                error={errors.date?.message}
                {...register('date')}
              />

              <Input
                label="Score (0-100)"
                type="number"
                min="0"
                max="100"
                placeholder="Enter your score"
                error={errors.score?.message}
                {...register('score')}
              />
            </div>

            <Select
              label="Category"
              options={categoryOptions}
              placeholder="Select a category"
              error={errors.category?.message}
              {...register('category')}
            />

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe what you practiced, how you felt, areas for improvement, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                {...register('description')}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting || success}
                className="flex-1"
              >
                {isSubmitting ? 'Adding Test...' : 'Add Test'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.push('/')}
                disabled={isSubmitting || success}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <InteractiveTestContainer onBack={handleBackToModeSelection} />
      )}
    </div>
  );
}
