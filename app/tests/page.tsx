'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTests } from '@/hooks/useTests';
import { TestList } from '@/components/tests/TestList';
import { TestFilters } from '@/components/tests/TestFilters';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Button } from '@/components/ui/Button';
import { TestCategory } from '@/lib/types';
import { PlusCircle, FileText } from 'lucide-react';

export default function TestsPage() {
  const { tests, loading, error, deleteTest } = useTests();
  const [category, setCategory] = useState<TestCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter and sort tests
  const filteredAndSortedTests = useMemo(() => {
    let result = [...tests];

    // Filter by category
    if (category !== 'all') {
      result = result.filter((test) => test.category === category);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        comparison = a.score - b.score;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [tests, category, sortBy, sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Tests</h1>
          <p className="mt-2 text-gray-600">
            View and manage all your Japanese language test results.
          </p>
        </div>
        <Link href="/tests/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Test
          </Button>
        </Link>
      </div>

      {error && <ErrorMessage message={error} className="mb-6" />}

      {tests.length === 0 ? (
        <EmptyState
          title="No tests yet"
          description="Start tracking your Japanese language learning progress by adding your first test."
          icon={<FileText className="h-16 w-16" />}
          action={
            <Link href="/tests/new">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Your First Test
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          <TestFilters
            category={category}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onCategoryChange={setCategory}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />

          {filteredAndSortedTests.length === 0 ? (
            <EmptyState
              title="No tests match your filters"
              description="Try adjusting your filters to see more results."
              icon={<FileText className="h-16 w-16" />}
            />
          ) : (
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredAndSortedTests.length} of {tests.length} tests
            </div>
          )}

          <TestList tests={filteredAndSortedTests} onDelete={deleteTest} />
        </>
      )}
    </div>
  );
}
