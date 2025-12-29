'use client';

import { KanjiTestContainer } from '@/components/tests/KanjiTestContainer';

export default function KanjiTestPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            JLPT Kanji (漢字) Reading Test
          </h1>
          <p className="text-lg text-gray-600">
            Test your kanji reading skills with onyomi and kunyomi readings
          </p>
        </div>

        <KanjiTestContainer />
      </div>
    </div>
  );
}
