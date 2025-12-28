'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MixedTestContainer } from '@/components/tests/MixedTestContainer';

export default function MixedTestPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/tests/new');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mixed Reading Test</h1>
        <p className="mt-2 text-gray-600">
          Test your reading skills with mixed hiragana and katakana characters.
        </p>
      </div>

      <MixedTestContainer onBack={handleBack} />
    </div>
  );
}
