import { useState, useEffect, useCallback, useMemo } from 'react';
import type { CharacterAttempt, CharacterStats, CharacterAnalyticsFilter } from '@/lib/types';
import { getCharacterAttempts } from '@/lib/characterStorage';
import {
  calculateAllCharacterStats,
  identifyWeakCharacters,
} from '@/lib/characterAnalytics';

export function useCharacterStats() {
  const [attempts, setAttempts] = useState<CharacterAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  // Load attempts on mount
  useEffect(() => {
    const loadedAttempts = getCharacterAttempts();
    setAttempts(loadedAttempts);
    setLoading(false);
  }, []);

  // Calculate stats from attempts (memoized)
  const stats = useMemo(() => {
    return calculateAllCharacterStats(attempts);
  }, [attempts]);

  // Get stats for a specific character
  const getStatsForCharacter = useCallback(
    (character: string) => {
      return stats.find(s => s.character === character);
    },
    [stats]
  );

  // Get weak characters
  const getWeakCharacters = useCallback(
    (threshold?: number) => {
      return identifyWeakCharacters(stats, threshold);
    },
    [stats]
  );

  // Filter and sort stats
  const filterStats = useCallback(
    (filter: CharacterAnalyticsFilter) => {
      let filtered = [...stats];

      // Filter by script type (hiragana/katakana)
      if (filter.scriptType) {
        filtered = filtered.filter(s => s.scriptType === filter.scriptType);
      }

      // Filter by character type
      if (filter.characterType) {
        filtered = filtered.filter(s => s.characterType === filter.characterType);
      }

      // Filter by minimum attempts
      if (filter.minAttempts !== undefined) {
        const minAttempts = filter.minAttempts;
        filtered = filtered.filter(s => s.totalAttempts >= minAttempts);
      }

      // Apply sorting
      filtered.sort((a, b) => {
        const multiplier = filter.sortOrder === 'asc' ? 1 : -1;

        switch (filter.sortBy) {
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
    },
    [stats]
  );

  // Refresh data
  const refresh = useCallback(() => {
    const loadedAttempts = getCharacterAttempts();
    setAttempts(loadedAttempts);
  }, []);

  return {
    attempts,
    stats,
    loading,
    getStatsForCharacter,
    getWeakCharacters,
    filterStats,
    refresh,
  };
}
