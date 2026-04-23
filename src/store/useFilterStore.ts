import { create } from 'zustand'

type TFilterStore = {
  selectedLevels: number[]
  searchQuery: string
  debouncedSearch: string
  isFilterOpen: boolean
  toggleLevel: (level: number) => void
  setSearchQuery: (query: string) => void
  setDebouncedSearch: (query: string) => void
  toggleFilterPanel: () => void
}

export const useFilterStore = create<TFilterStore>((set) => ({
  selectedLevels: [],
  searchQuery: '',
  debouncedSearch: '',
  isFilterOpen: false,

  toggleLevel: (level) =>
    set((state) => ({
      selectedLevels: state.selectedLevels.includes(level)
        ? state.selectedLevels.filter((l) => l !== level)
        : [...state.selectedLevels, level].sort((a, b) => a - b),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setDebouncedSearch: (query) => set({ debouncedSearch: query }),

  toggleFilterPanel: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
}))
