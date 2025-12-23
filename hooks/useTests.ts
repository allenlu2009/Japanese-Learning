'use client';

import { useState, useEffect, useCallback } from 'react';
import { Test } from '@/lib/types';
import {
  getTests,
  addTest as addTestToStorage,
  updateTest as updateTestInStorage,
  deleteTest as deleteTestFromStorage,
} from '@/lib/storage';

export function useTests() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tests from localStorage on mount
  useEffect(() => {
    try {
      const loadedTests = getTests();
      setTests(loadedTests);
      setError(null);
    } catch (err) {
      console.error('Error loading tests:', err);
      setError('Failed to load tests');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new test
  const addTest = useCallback(
    (testData: Omit<Test, 'id' | 'createdAt' | 'updatedAt'>): Test | null => {
      try {
        const newTest = addTestToStorage(testData);
        if (newTest) {
          setTests(prev => [...prev, newTest]);
          setError(null);
          return newTest;
        }
        setError('Failed to add test');
        return null;
      } catch (err) {
        console.error('Error adding test:', err);
        setError('Failed to add test');
        return null;
      }
    },
    []
  );

  // Update an existing test
  const updateTest = useCallback(
    (id: string, updates: Partial<Omit<Test, 'id' | 'createdAt'>>): boolean => {
      try {
        const updatedTest = updateTestInStorage(id, updates);
        if (updatedTest) {
          setTests(prev => prev.map(test => (test.id === id ? updatedTest : test)));
          setError(null);
          return true;
        }
        setError('Failed to update test');
        return false;
      } catch (err) {
        console.error('Error updating test:', err);
        setError('Failed to update test');
        return false;
      }
    },
    []
  );

  // Delete a test
  const deleteTest = useCallback((id: string): boolean => {
    try {
      const success = deleteTestFromStorage(id);
      if (success) {
        setTests(prev => prev.filter(test => test.id !== id));
        setError(null);
        return true;
      }
      setError('Failed to delete test');
      return false;
    } catch (err) {
      console.error('Error deleting test:', err);
      setError('Failed to delete test');
      return false;
    }
  }, []);

  // Refresh tests from storage
  const refreshTests = useCallback(() => {
    try {
      const loadedTests = getTests();
      setTests(loadedTests);
      setError(null);
    } catch (err) {
      console.error('Error refreshing tests:', err);
      setError('Failed to refresh tests');
    }
  }, []);

  return {
    tests,
    loading,
    error,
    addTest,
    updateTest,
    deleteTest,
    refreshTests,
  };
}
