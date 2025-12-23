import React from 'react';
import { TestForm } from '@/components/tests/TestForm';

export default function NewTestPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Test</h1>
        <p className="mt-2 text-gray-600">
          Record your Japanese language test results to track your progress over time.
        </p>
      </div>

      <TestForm />
    </div>
  );
}
