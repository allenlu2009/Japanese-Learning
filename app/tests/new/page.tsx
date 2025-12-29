'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { PencilLine, Gamepad2 } from 'lucide-react';

export default function TestSelectionPage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Test</h1>
        <p className="mt-2 text-gray-600">
          Choose how you want to add a test to your learning tracker.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {/* Manual Entry */}
        <Card className="p-6 hover:shadow-lg transition-all">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-4">
                <PencilLine className="h-6 w-6 text-gray-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Manual Entry</h2>
              <p className="text-sm text-gray-600">
                Manually record a test result with date, score, category, and description.
              </p>
            </div>
            <Button
              onClick={() => router.push('/tests/new/manual')}
              className="w-full mt-auto"
              variant="secondary"
            >
              Create Manual Entry
            </Button>
          </div>
        </Card>

        {/* Interactive Hiragana Test */}
        <Card className="p-6 hover:shadow-lg transition-all border-2 border-green-200">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-4">
                <Gamepad2 className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-green-800 mb-2">Hiragana (平仮名)</h2>
              <p className="text-sm text-gray-600">
                Take a real-time hiragana reading test with automatic scoring.
              </p>
            </div>
            <Button
              onClick={() => router.push('/tests/hiragana')}
              className="w-full mt-auto bg-green-600 hover:bg-green-700"
            >
              Start Hiragana Test
            </Button>
          </div>
        </Card>

        {/* Interactive Katakana Test */}
        <Card className="p-6 hover:shadow-lg transition-all border-2 border-red-200">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 mb-4">
                <Gamepad2 className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-red-800 mb-2">Katakana (片仮名)</h2>
              <p className="text-sm text-gray-600">
                Take a real-time katakana reading test with automatic scoring.
              </p>
            </div>
            <Button
              onClick={() => router.push('/tests/katakana')}
              className="w-full mt-auto bg-red-600 hover:bg-red-700"
            >
              Start Katakana Test
            </Button>
          </div>
        </Card>

        {/* Interactive Mixed Test */}
        <Card className="p-6 hover:shadow-lg transition-all border-2 border-purple-200">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 mb-4">
                <Gamepad2 className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-purple-800 mb-2">Mixed (混合)</h2>
              <p className="text-sm text-gray-600">
                Mixed hiragana and katakana reading test with automatic scoring.
              </p>
            </div>
            <Button
              onClick={() => router.push('/tests/mixed')}
              className="w-full mt-auto bg-purple-600 hover:bg-purple-700"
            >
              Start Mixed Test
            </Button>
          </div>
        </Card>

        {/* Interactive Kanji Test */}
        <Card className="p-6 hover:shadow-lg transition-all border-2 border-blue-200">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mb-4">
                <Gamepad2 className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-blue-800 mb-2">Kanji (漢字)</h2>
              <p className="text-sm text-gray-600">
                JLPT N5/N4 kanji reading test with onyomi and kunyomi modes.
              </p>
            </div>
            <Button
              onClick={() => router.push('/tests/kanji')}
              className="w-full mt-auto bg-blue-600 hover:bg-blue-700"
            >
              Start Kanji Test
            </Button>
          </div>
        </Card>

        {/* Interactive Vocabulary Test */}
        <Card className="p-6 hover:shadow-lg transition-all border-2 border-orange-200">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 mb-4">
                <Gamepad2 className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-orange-800 mb-2">Vocabulary (語彙)</h2>
              <p className="text-sm text-gray-600">
                JLPT N5/N4 vocabulary reading test with kanji compounds.
              </p>
            </div>
            <Button
              onClick={() => router.push('/tests/vocabulary')}
              className="w-full mt-auto bg-orange-600 hover:bg-orange-700"
            >
              Start Vocabulary Test
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
