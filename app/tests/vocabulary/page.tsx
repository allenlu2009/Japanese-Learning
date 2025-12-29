'use client';

import { VocabularyTestContainer } from '@/components/tests/VocabularyTestContainer';

export default function VocabularyTestPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            JLPT Vocabulary Test
          </h1>
          <p className="text-lg text-gray-600">
            Test your vocabulary knowledge with JLPT N5 and N4 words
          </p>
        </div>

        <VocabularyTestContainer />
      </div>
    </div>
  );
}
