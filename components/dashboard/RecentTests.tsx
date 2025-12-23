import React from 'react';
import Link from 'next/link';
import { Test } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDisplayDate, formatScore, truncate } from '@/lib/utils';
import { Clock, Award, ArrowRight } from 'lucide-react';

interface RecentTestsProps {
  tests: Test[];
}

export function RecentTests({ tests }: RecentTestsProps) {
  if (tests.length === 0) {
    return null;
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Tests
        </h2>
        <Link href="/tests">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {tests.slice(0, 5).map((test) => (
          <div
            key={test.id}
            className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge category={test.category} />
                <span className="text-sm text-gray-500">
                  {formatDisplayDate(test.date)}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {truncate(test.description, 100)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-primary-600 font-semibold whitespace-nowrap">
              <Award className="h-4 w-4" />
              <span>{formatScore(test.score)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
