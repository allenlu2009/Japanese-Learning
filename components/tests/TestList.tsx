'use client';

import React from 'react';
import { Test } from '@/lib/types';
import { TestItem } from './TestItem';

interface TestListProps {
  tests: Test[];
  onDelete: (id: string) => void;
}

export function TestList({ tests, onDelete }: TestListProps) {
  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <TestItem key={test.id} test={test} onDelete={onDelete} />
      ))}
    </div>
  );
}
