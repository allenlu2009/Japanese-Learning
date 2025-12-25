'use client';

import React, { useMemo, useState } from 'react';
import { useCharacterStats } from '@/hooks/useCharacterStats';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { BarChart, TrendingUp, TrendingDown, Minus, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CharacterAnalyticsFilter } from '@/lib/types';

export default function CharacterAnalyticsPage() {
  const { stats, loading, filterStats } = useCharacterStats();

  const [filter, setFilter] = useState<CharacterAnalyticsFilter>({
    sortBy: 'successRate',
    sortOrder: 'asc',
  });

  const filteredStats = useMemo(() => {
    return filterStats(filter);
  }, [stats, filter, filterStats]);

  const weakCharacters = useMemo(() => {
    return filteredStats.filter(s => s.successRate < 60);
  }, [filteredStats]);

  const strongCharacters = useMemo(() => {
    return filteredStats.filter(s => s.successRate >= 80);
  }, [filteredStats]);

  const averageSuccessRate = useMemo(() => {
    if (stats.length === 0) return 0;
    return Math.round(stats.reduce((sum, s) => sum + s.successRate, 0) / stats.length);
  }, [stats]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (stats.length === 0) {
    return (
      <EmptyState
        title="No Character Data Yet"
        description="Complete some interactive Hiragana tests to start tracking your character-level performance."
        icon={<BarChart className="h-16 w-16" />}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Character Analytics</h1>
        <p className="mt-2 text-gray-600">
          Track your performance on individual hiragana characters across all tests
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-gray-900">{stats.length}</div>
            <div className="text-sm text-gray-600 mt-1">Characters Practiced</div>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-green-600">{strongCharacters.length}</div>
            <div className="text-sm text-gray-600 mt-1">Strong Characters (&gt;80%)</div>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-red-600">{weakCharacters.length}</div>
            <div className="text-sm text-gray-600 mt-1">Weak Characters (&lt;60%)</div>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-gray-900">{averageSuccessRate}%</div>
            <div className="text-sm text-gray-600 mt-1">Average Success Rate</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter by type:</span>
          </div>

          <Button
            variant={!filter.characterType ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter({ ...filter, characterType: undefined })}
          >
            All
          </Button>

          <Button
            variant={filter.characterType === 'basic' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter({ ...filter, characterType: 'basic' })}
          >
            Basic
          </Button>

          <Button
            variant={filter.characterType === 'dakuten' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter({ ...filter, characterType: 'dakuten' })}
          >
            Dakuten
          </Button>

          <Button
            variant={filter.characterType === 'combo' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter({ ...filter, characterType: 'combo' })}
          >
            Combo
          </Button>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={filter.sortBy}
              onChange={(e) => setFilter({
                ...filter,
                sortBy: e.target.value as CharacterAnalyticsFilter['sortBy']
              })}
              className="text-sm border-gray-300 rounded-lg"
            >
              <option value="successRate">Success Rate</option>
              <option value="totalAttempts">Total Attempts</option>
              <option value="recentPerformance">Recent Performance</option>
              <option value="character">Character</option>
            </select>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilter({
                ...filter,
                sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc'
              })}
            >
              {filter.sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Character List */}
      <Card>
        <h3 className="text-xl font-bold text-gray-900 mb-4">All Characters</h3>

        <div className="space-y-2">
          {filteredStats.map((stat) => {
            const TrendIcon = stat.trend === 'improving' ? TrendingUp :
                             stat.trend === 'declining' ? TrendingDown : Minus;
            const trendColor = stat.trend === 'improving' ? 'text-green-600' :
                              stat.trend === 'declining' ? 'text-red-600' : 'text-gray-600';

            return (
              <div
                key={stat.character}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Character & Type */}
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-gray-900 w-16 text-center">
                    {stat.character}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500 uppercase">
                        {stat.characterType}
                      </span>
                      <TrendIcon className={cn('h-4 w-4', trendColor)} />
                      <span className={cn('text-xs font-medium', trendColor)}>
                        {stat.trend}
                      </span>
                    </div>

                    {stat.commonMistakes.length > 0 && (
                      <div className="text-xs text-gray-600 mt-1">
                        Common mistakes: {stat.commonMistakes.map(m => m.answer).join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {stat.correctAttempts}/{stat.totalAttempts}
                    </div>
                    <div className="text-xs text-gray-500">attempts</div>
                  </div>

                  <div className="text-right">
                    <div className={cn(
                      'text-2xl font-bold',
                      stat.successRate >= 80 ? 'text-green-600' :
                      stat.successRate >= 60 ? 'text-yellow-600' : 'text-red-600'
                    )}>
                      {stat.successRate}%
                    </div>
                    <div className="text-xs text-gray-500">all-time</div>
                  </div>

                  <div className="text-right">
                    <div className={cn(
                      'text-xl font-bold',
                      stat.recentSuccessRate >= 80 ? 'text-green-600' :
                      stat.recentSuccessRate >= 60 ? 'text-yellow-600' : 'text-red-600'
                    )}>
                      {stat.recentSuccessRate}%
                    </div>
                    <div className="text-xs text-gray-500">recent</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
