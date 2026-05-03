import { create } from 'zustand'
import { readParams } from '@/hooks/useUrlParams'

type TFilterStore = {
  selectedLevels: number[]
  debouncedSearch: string
  isFilterOpen: boolean
  searchKey: number
  showFavoritesOnly: boolean
  toggleLevel: (level: number) => void
  setDebouncedSearch: (query: string) => void
  toggleFilterPanel: () => void
  toggleFavoritesOnly: () => void
  clearFilters: () => void
}

const { search, levels, favorites } = readParams()

export const useFilterStore = create<TFilterStore>((set) => ({
  selectedLevels: levels,
  debouncedSearch: search,
  isFilterOpen: false,
  searchKey: 0,
  showFavoritesOnly: favorites,

  toggleLevel: (level) =>
    set((state) => ({
      selectedLevels: state.selectedLevels.includes(level)
        ? state.selectedLevels.filter((l) => l !== level)
        : [...state.selectedLevels, level].sort((a, b) => a - b),
    })),

  setDebouncedSearch: (query) => set({ debouncedSearch: query }),

  toggleFilterPanel: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),

  toggleFavoritesOnly: () =>
    set((state) => ({
      showFavoritesOnly: !state.showFavoritesOnly,
      isFilterOpen: false,
    })),

  clearFilters: () =>
    set((state) => ({
      selectedLevels: [],
      debouncedSearch: '',
      isFilterOpen: false,
      showFavoritesOnly: false,
      searchKey: state.searchKey + 1,
    })),
}))
