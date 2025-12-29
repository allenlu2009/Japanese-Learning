'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { InteractiveTestContainer } from '@/components/tests/InteractiveTestContainer';

export default function HiraganaTestPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/tests/new');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hiragana (平仮名) Reading Test</h1>
        <p className="mt-2 text-gray-600">
          Test your hiragana reading skills with interactive questions.
        </p>
      </div>

      <InteractiveTestContainer onBack={handleBack} />
    </div>
  );
}
