import { create } from 'zustand'
import type { ReadingSettings } from '@/lib/types'

const initialSettings: ReadingSettings = {
  fontSize: 16,
  fontFamily: 'sans',
  lineHeight: 1.5,
  letterSpacing: 0,
  maxWidth: 800,
  theme: 'light',
}

interface Store {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  settings: ReadingSettings
  onUpdateSettings: (settings: Partial<ReadingSettings>) => void
  onResetSettings: () => void
}

export const useStore = create<Store>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  settings: initialSettings,
  onUpdateSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),
  onResetSettings: () => set({ settings: initialSettings }),
}))
