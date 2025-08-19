'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ReadingSettings } from '@/lib/types'

const SETTINGS_KEY = 'rss-reading-settings'

const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 16,
  fontFamily: 'system',
  lineHeight: 1.6,
  maxWidth: 800,
  theme: 'light',
}

function useReadingSettings() {
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY)
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
      } catch (error) {
        console.error('Error parsing reading settings:', error)
      }
    }
  }, [])

  const updateSettings = useCallback(
    (newSettings: Partial<ReadingSettings>) => {
      const updatedSettings = { ...settings, ...newSettings }
      setSettings(updatedSettings)
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings))
    },
    [settings]
  )

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS))
  }, [])

  return {
    settings,
    updateSettings,
    resetSettings,
  }
}

export default useReadingSettings
