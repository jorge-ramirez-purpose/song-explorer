import { create } from 'zustand'

type TFilterStore = {
  selectedLevels: number[]
  searchQuery: string
  debouncedSearch: string
  isFilterOpen: boolean
  searchKey: number
  toggleLevel: (level: number) => void
  setSearchQuery: (query: string) => void
  setDebouncedSearch: (query: string) => void
  toggleFilterPanel: () => void
  clearFilters: () => void
}

export const useFilterStore = create<TFilterStore>((set) => ({
  selectedLevels: [],
  searchQuery: '',
  debouncedSearch: '',
  isFilterOpen: false,
  searchKey: 0,

  toggleLevel: (level) =>
    set((state) => ({
      selectedLevels: state.selectedLevels.includes(level)
        ? state.selectedLevels.filter((l) => l !== level)
        : [...state.selectedLevels, level].sort((a, b) => a - b),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setDebouncedSearch: (query) => set({ debouncedSearch: query }),

  toggleFilterPanel: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),

  clearFilters: () =>
    set((state) => ({
      selectedLevels: [],
      debouncedSearch: '',
      isFilterOpen: false,
      searchKey: state.searchKey + 1,
    })),
}))
