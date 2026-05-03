import { useSongsQuery } from '@/queries/useSongsQuery'
import { useFavoritesQuery } from '@/queries/useFavoritesQuery'
import { useAddFavorite, useRemoveFavorite } from '@/queries/useFavoriteMutations'
import { useFilterStore } from '@/store/useFilterStore'
import { AppLayout } from '@/components/AppLayout'
import { HeroSection } from '@/components/HeroSection'
import { FilterBar } from '@/components/FilterBar'
import { SongList } from '@/components/SongList'
import { ToastContainer } from '@/components/ToastContainer'
import { FlakeyToggle } from '@/components/FlakeyToggle'

const App = () => {
  const { selectedLevels, debouncedSearch, isFilterOpen, showFavoritesOnly, toggleLevel, toggleFilterPanel, toggleFavoritesOnly, clearFilters } = useFilterStore()

  const { data, hasNextPage, fetchNextPage, isLoading, isError, refetch } = useSongsQuery({
    levels: selectedLevels.length > 0 ? selectedLevels : undefined,
    search: debouncedSearch,
  })

  const { data: favorites = [] } = useFavoritesQuery()
  const addFavorite = useAddFavorite()
  const removeFavorite = useRemoveFavorite()

  const pendingSongIds = new Set<string>()
  if (addFavorite.isPending && addFavorite.variables) pendingSongIds.add(addFavorite.variables)
  if (removeFavorite.isPending && removeFavorite.variables) {
    const pending = favorites.find((f) => f.id === removeFavorite.variables)
    if (pending) pendingSongIds.add(pending.songId)
  }

  const hasActiveFilters = selectedLevels.length > 0 || !!debouncedSearch

  const songs = data?.pages.flatMap((page) => page.data) ?? []

  const handleToggleFavorite = (songId: string, shouldAdd: boolean) => {
    if (shouldAdd) {
      addFavorite.mutate(songId)
    } else {
      const favorite = favorites.find((f) => f.songId === songId)
      if (favorite) removeFavorite.mutate(favorite.id)
    }
  }

  return (
    <>
      <AppLayout
        hero={<HeroSection />}
        filter={
          <FilterBar
            isOpen={isFilterOpen}
            selectedLevels={selectedLevels}
            favoritesCount={favorites.length}
            showFavoritesOnly={showFavoritesOnly}
            onTogglePanel={toggleFilterPanel}
            onToggleLevel={toggleLevel}
            onToggleFavoritesOnly={toggleFavoritesOnly}
          />
        }
        songList={
          <SongList
            songs={songs}
            favorites={favorites}
            isLoading={isLoading}
            hasNextPage={hasNextPage ?? false}
            isError={isError}
            pendingSongIds={pendingSongIds}
            hasActiveFilters={hasActiveFilters}
            onLoadMore={() => fetchNextPage()}
            onRetry={() => refetch()}
            onToggleFavorite={handleToggleFavorite}
            onClearFilters={clearFilters}
          />
        }
      />
      <ToastContainer />
      {import.meta.env.DEV && <FlakeyToggle />}
    </>
  )
}

export default App
