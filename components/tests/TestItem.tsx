'use client';

import React, { useState } from 'react';
import { Test } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatDisplayDate, formatScore } from '@/lib/utils';
import { Trash2, Calendar, Award } from 'lucide-react';

interface TestItemProps {
  test: Test;
  onDelete: (id: string) => void;
}

export function TestItem({ test, onDelete }: TestItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(test.id);
    setShowDeleteConfirm(false);
  };

  return (
    <Card padding="md" className="hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge category={test.category} />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDisplayDate(test.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary-600">
              <Award className="h-4 w-4" />
              <span>{formatScore(test.score)}</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{test.description}</p>
        </div>

        <div className="flex sm:flex-col gap-2">
          {!showDeleteConfirm ? (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="whitespace-nowrap"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
              >
                Confirm
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
