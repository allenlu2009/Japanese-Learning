'use client';

import React from 'react';
import { TestCategory } from '@/lib/types';
import { Select } from '@/components/ui/Select';
import { CATEGORIES, CATEGORY_LABELS } from '@/lib/constants';

interface TestFiltersProps {
  category: TestCategory | 'all';
  sortBy: 'date' | 'score';
  sortOrder: 'asc' | 'desc';
  onCategoryChange: (category: TestCategory | 'all') => void;
  onSortByChange: (sortBy: 'date' | 'score') => void;
  onSortOrderChange: (sortOrder: 'asc' | 'desc') => void;
}

export function TestFilters({
  category,
  sortBy,
  sortOrder,
  onCategoryChange,
  onSortByChange,
  onSortOrderChange,
}: TestFiltersProps) {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...CATEGORIES.map((cat) => ({
      value: cat,
      label: CATEGORY_LABELS[cat],
    })),
  ];

  const sortByOptions = [
    { value: 'date', label: 'Date' },
    { value: 'score', label: 'Score' },
  ];

  const sortOrderOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <Select
        label="Filter by Category"
        options={categoryOptions}
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as TestCategory | 'all')}
      />

      <Select
        label="Sort By"
        options={sortByOptions}
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as 'date' | 'score')}
      />

      <Select
        label="Sort Order"
        options={sortOrderOptions}
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
      />
    </div>
  );
}
