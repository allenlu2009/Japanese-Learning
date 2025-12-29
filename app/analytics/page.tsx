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
import { findHiragana } from '@/lib/hiragana';
import { findKatakana } from '@/lib/katakana';

function getCharacterReading(character: string, scriptType: 'hiragana' | 'katakana'): string {
  if (scriptType === 'hiragana') {
    const hiraganaChar = findHiragana(character);
    return hiraganaChar?.romanji[0].toLowerCase() || '?';
  } else {
    const katakanaChar = findKatakana(character);
    return katakanaChar?.romanji[0].toLowerCase() || '?';
  }
}

export default function CharacterAnalyticsPage() {
  const { stats, loading, filterStats } = useCharacterStats();

  const [filter, setFilter] = useState<CharacterAnalyticsFilter>({
    sortBy: 'successRate',
    sortOrder: 'asc',
  });

  // State for showing all results vs. weak characters only (default: weak only)
  const [showAllResults, setShowAllResults] = useState(false);

  // Filter for kana only (exclude kanji and vocabulary)
  const kanaStats = useMemo(() => {
    return stats.filter(s => s.scriptType === 'hiragana' || s.scriptType === 'katakana');
  }, [stats]);

  const filteredStats = useMemo(() => {
    const baseFiltered = filterStats(filter);

    // Filter out kanji and vocabulary (only show kana)
    const kanaOnly = baseFiltered.filter(s => s.scriptType === 'hiragana' || s.scriptType === 'katakana');

    // Apply weak character filter if showAllResults is false
    if (!showAllResults) {
      return kanaOnly.filter(s => s.successRate <= 60);
    }

    return kanaOnly;
  }, [filter, filterStats, showAllResults]);

  const weakCharacters = useMemo(() => {
    return filteredStats.filter(s => s.successRate < 60);
  }, [filteredStats]);

  const strongCharacters = useMemo(() => {
    return filteredStats.filter(s => s.successRate >= 80);
  }, [filteredStats]);

  const averageSuccessRate = useMemo(() => {
    if (kanaStats.length === 0) return 0;
    return Math.round(kanaStats.reduce((sum, s) => sum + s.successRate, 0) / kanaStats.length);
  }, [kanaStats]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (kanaStats.length === 0) {
    return (
      <EmptyState
        title="No Kana Data Yet"
        description="Complete some interactive Hiragana, Katakana, or Mixed tests to start tracking your character-level performance."
        icon={<BarChart className="h-16 w-16" />}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kana Analytics</h1>
        <p className="mt-2 text-gray-600">
          Track your performance on individual hiragana and katakana characters across all tests
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-gray-900">{kanaStats.length}</div>
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
            <span className="text-sm font-medium text-gray-700">Script:</span>
          </div>

          <Button
            variant={!filter.scriptType ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter({ ...filter, scriptType: undefined })}
          >
            All
          </Button>

          <Button
            variant={filter.scriptType === 'hiragana' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter({ ...filter, scriptType: 'hiragana' })}
          >
            Hiragana
          </Button>

          <Button
            variant={filter.scriptType === 'katakana' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter({ ...filter, scriptType: 'katakana' })}
          >
            Katakana
          </Button>

          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-300">
            <span className="text-sm font-medium text-gray-700">Type:</span>
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {showAllResults ? 'All Characters' : 'Weak Characters (≤60%)'}
          </h3>
          <span className="text-sm text-gray-600">
            Showing {filteredStats.length} of {kanaStats.length} characters
          </span>
        </div>

        {filteredStats.length === 0 && !showAllResults ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-2">🎉 No weak characters found!</p>
            <p className="text-sm text-gray-500">
              All characters have &gt;60% success rate. Check &quot;Show all results&quot; to view all.
            </p>
          </div>
        ) : filteredStats.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No characters match the current filters.</p>
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
                {/* Character & Type */}
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-gray-900 w-16 text-center">
                    {stat.character}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500 uppercase">
                        {stat.scriptType} - {getCharacterReading(stat.character, stat.scriptType as 'hiragana' | 'katakana')}
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
        )}
      </Card>
    </div>
  );
}
