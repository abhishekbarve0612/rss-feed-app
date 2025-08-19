import { create } from 'zustand'

interface Store {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export const useStore = create<Store>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
