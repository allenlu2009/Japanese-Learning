'use client';

import React, { useMemo, useState } from 'react';
import { useCharacterStats } from '@/hooks/useCharacterStats';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { BarChart, TrendingUp, TrendingDown, Minus, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { JLPTLevel } from '@/lib/kanjiTestGenerator';

type ScriptFilter = 'kanji' | 'vocabulary' | 'both';
type ReadingTypeFilter = 'onyomi' | 'kunyomi' | 'all';

export default function KanjiVocabAnalyticsPage() {
  const { stats, loading, filterStats } = useCharacterStats();

  // JLPT-specific filters
  const [scriptFilter, setScriptFilter] = useState<ScriptFilter>('both');
  const [jlptLevel, setJlptLevel] = useState<JLPTLevel | 'all'>('all');
  const [readingTypeFilter, setReadingTypeFilter] = useState<ReadingTypeFilter>('all');
  const [showAllResults, setShowAllResults] = useState(false);
  const [sortBy, setSortBy] = useState<'successRate' | 'totalAttempts' | 'recentPerformance' | 'character'>('successRate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter for kanji and vocabulary only
  const jlptStats = useMemo(() => {
    return stats.filter(s => s.scriptType === 'kanji' || s.scriptType === 'vocabulary');
  }, [stats]);

  const filteredStats = useMemo(() => {
    let filtered = [...jlptStats];

    // Filter by script type (kanji/vocabulary/both)
    if (scriptFilter === 'kanji') {
      filtered = filtered.filter(s => s.scriptType === 'kanji');
    } else if (scriptFilter === 'vocabulary') {
      filtered = filtered.filter(s => s.scriptType === 'vocabulary');
    }

    // Filter by JLPT level
    if (jlptLevel !== 'all') {
      filtered = filtered.filter(s => s.jlptLevel === jlptLevel);
    }

    // Filter by reading type (kanji only)
    if (readingTypeFilter !== 'all') {
      filtered = filtered.filter(s =>
        s.scriptType === 'kanji' && s.readingType === readingTypeFilter
      );
    }

    // Apply weak character filter if showAllResults is false
    if (!showAllResults) {
      filtered = filtered.filter(s => s.successRate <= 60);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;

      switch (sortBy) {
        case 'character':
          return multiplier * a.character.localeCompare(b.character);
        case 'successRate':
          return multiplier * (a.successRate - b.successRate);
        case 'totalAttempts':
          return multiplier * (a.totalAttempts - b.totalAttempts);
        case 'recentPerformance':
          return multiplier * (a.recentSuccessRate - b.recentSuccessRate);
        default:
          return 0;
      }
    });

    return filtered;
  }, [jlptStats, scriptFilter, jlptLevel, readingTypeFilter, showAllResults, sortBy, sortOrder]);

  const weakCharacters = useMemo(() => {
    return filteredStats.filter(s => s.successRate < 60);
  }, [filteredStats]);

  const strongCharacters = useMemo(() => {
    return filteredStats.filter(s => s.successRate >= 80);
  }, [filteredStats]);

  const averageSuccessRate = useMemo(() => {
    if (jlptStats.length === 0) return 0;
    return Math.round(jlptStats.reduce((sum, s) => sum + s.successRate, 0) / jlptStats.length);
  }, [jlptStats]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (jlptStats.length === 0) {
    return (
      <EmptyState
        title="No Kanji/Vocabulary Data Yet"
        description="Complete some Kanji or Vocabulary tests to start tracking your JLPT-level performance."
        icon={<BarChart className="h-16 w-16" />}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kanji & Vocabulary Analytics</h1>
        <p className="mt-2 text-gray-600">
          Track your performance on JLPT kanji and vocabulary across all tests
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-gray-900">{jlptStats.length}</div>
            <div className="text-sm text-gray-600 mt-1">Items Practiced</div>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-green-600">{strongCharacters.length}</div>
            <div className="text-sm text-gray-600 mt-1">Strong Items (&gt;80%)</div>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-red-600">{weakCharacters.length}</div>
            <div className="text-sm text-gray-600 mt-1">Weak Items (&lt;60%)</div>
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
          {/* Script Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Type:</span>
          </div>

          <Button
            variant={scriptFilter === 'both' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setScriptFilter('both')}
          >
            Both
          </Button>

          <Button
            variant={scriptFilter === 'kanji' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setScriptFilter('kanji')}
          >
            Kanji
          </Button>

          <Button
            variant={scriptFilter === 'vocabulary' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setScriptFilter('vocabulary')}
          >
            Vocabulary
          </Button>

          {/* JLPT Level Filter */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-300">
            <span className="text-sm font-medium text-gray-700">JLPT:</span>
          </div>

          <Button
            variant={jlptLevel === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setJlptLevel('all')}
          >
            All
          </Button>

          <Button
            variant={jlptLevel === 'N5' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setJlptLevel('N5')}
          >
            N5
          </Button>

          <Button
            variant={jlptLevel === 'N4' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setJlptLevel('N4')}
          >
            N4
          </Button>

          {/* Reading Type Filter (Kanji only) */}
          {scriptFilter === 'kanji' && (
            <>
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-300">
                <span className="text-sm font-medium text-gray-700">Reading:</span>
              </div>

              <Button
                variant={readingTypeFilter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setReadingTypeFilter('all')}
              >
                All
              </Button>

              <Button
                variant={readingTypeFilter === 'onyomi' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setReadingTypeFilter('onyomi')}
              >
                Onyomi
              </Button>

              <Button
                variant={readingTypeFilter === 'kunyomi' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setReadingTypeFilter('kunyomi')}
              >
                Kunyomi
              </Button>
            </>
          )}

          {/* Show All Results Checkbox */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-300">
            <input
              type="checkbox"
              id="showAllResults"
              checked={showAllResults}
              onChange={(e) => setShowAllResults(e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            />
            <label
              htmlFor="showAllResults"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Show all results
            </label>
            <span className="text-xs text-gray-500">
              (default: ≤60%)
            </span>
          </div>

          {/* Sort Controls */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
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
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Character/Word List */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {showAllResults ? 'All Items' : 'Weak Items (≤60%)'}
          </h3>
          <span className="text-sm text-gray-600">
            Showing {filteredStats.length} of {jlptStats.length} items
          </span>
        </div>

        {filteredStats.length === 0 && !showAllResults ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-2">🎉 No weak items found!</p>
            <p className="text-sm text-gray-500">
              All items have &gt;60% success rate. Check &quot;Show all results&quot; to view all.
            </p>
          </div>
        ) : filteredStats.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No items match the current filters.</p>
          </div>
        ) : (
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
                {/* Character/Word & Info */}
                <div className="flex items-center gap-4 flex-1">
                  <span className={cn(
                    "text-4xl font-bold w-20 text-center",
                    stat.scriptType === 'kanji' ? 'text-blue-600' : 'text-orange-600'
                  )}>
                    {stat.character}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs font-medium uppercase px-2 py-1 rounded",
                        stat.scriptType === 'kanji'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-orange-100 text-orange-700'
                      )}>
                        {stat.scriptType}
                      </span>

                      {stat.jlptLevel && (
                        <span className="text-xs font-medium text-gray-500 uppercase px-2 py-1 rounded bg-gray-100">
                          {stat.jlptLevel}
                        </span>
                      )}

                      {stat.readingType && (
                        <span className="text-xs font-medium text-gray-500 uppercase px-2 py-1 rounded bg-gray-100">
                          {stat.readingType}
                        </span>
                      )}

                      <TrendIcon className={cn('h-4 w-4', trendColor)} />
                      <span className={cn('text-xs font-medium', trendColor)}>
                        {stat.trend}
                      </span>
                    </div>

                    {/* Meanings */}
                    {stat.meanings && stat.meanings.length > 0 && (
                      <div className="text-sm text-gray-700 mt-1">
                        {stat.meanings.join(', ')}
                      </div>
                    )}

                    {/* Common Mistakes */}
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
        )}
      </Card>
    </div>
  );
}
