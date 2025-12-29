import { useState, useEffect } from 'react';

const AUDIO_SETTINGS_KEY = 'japanese-learning-audio-settings';

interface AudioSettings {
  enabled: boolean;
  rate: number;
  volume: number;
}

const DEFAULT_SETTINGS: AudioSettings = {
  enabled: true,  // Audio enabled by default
  rate: 0.8,      // Slightly slower for learning
  volume: 1.0,
};

export function useAudioSettings() {
  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUDIO_SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (error) {
      console.error('Error loading audio settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(settings));
      } catch (error) {
        console.error('Error saving audio settings:', error);
      }
    }
  }, [settings, isLoading]);

  const toggleAudio = () => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const setRate = (rate: number) => {
    setSettings(prev => ({ ...prev, rate }));
  };

  const setVolume = (volume: number) => {
    setSettings(prev => ({ ...prev, volume }));
  };

  return {
    settings,
    isLoading,
    toggleAudio,
    setRate,
    setVolume,
  };
}
