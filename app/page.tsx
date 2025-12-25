'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useTests } from '@/hooks/useTests';
import { calculateOverallStats } from '@/lib/analytics';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { RecentTests } from '@/components/dashboard/RecentTests';
import { DataManagement } from '@/components/dashboard/DataManagement';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { CATEGORY_LABELS } from '@/lib/constants';
import { Award, BookOpen, Headphones, PenTool, Mic, PlusCircle } from 'lucide-react';

const categoryIcons = {
  read: BookOpen,
  listen: Headphones,
  write: PenTool,
  speak: Mic,
};

const categoryColors = {
  read: 'text-read',
  listen: 'text-listen',
  write: 'text-write',
  speak: 'text-speak',
};

export default function DashboardPage() {
  const { tests, loading } = useTests();

  const stats = useMemo(() => calculateOverallStats(tests), [tests]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="space-y-8">
        <EmptyState
          title="Welcome to Japanese Learning Tracker"
          description="Start tracking your Japanese language learning progress by adding your first test. Monitor your performance across reading, listening, writing, and speaking skills."
          icon={<Award className="h-16 w-16" />}
          action={
            <Link href="/tests/new">
              <Button size="lg">
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Your First Test
              </Button>
            </Link>
          }
        />

        {/* Allow importing data even when no tests exist */}
        <DataManagement />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track your Japanese language learning progress
          </p>
        </div>
        <Link href="/tests/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Test
          </Button>
        </Link>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total Tests"
          value={stats.totalTests}
          icon={Award}
          subtitle={`Average: ${stats.averageScore}%`}
        />

        {stats.categoryStats.map((categoryStat) => {
          const Icon = categoryIcons[categoryStat.category];
          const color = categoryColors[categoryStat.category];

          return (
            <StatsCard
              key={categoryStat.category}
              title={CATEGORY_LABELS[categoryStat.category]}
              value={categoryStat.count > 0 ? `${categoryStat.averageScore}%` : 'N/A'}
              subtitle={`${categoryStat.count} tests`}
              trend={categoryStat.trend}
              icon={Icon}
              color={color}
            />
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart stats={stats.categoryStats} />
        <ProgressChart data={stats.scoresByMonth} />
      </div>

      {/* Recent Tests */}
      <RecentTests tests={stats.recentTests} />

      {/* Data Management */}
      <DataManagement />
    </div>
  );
}
