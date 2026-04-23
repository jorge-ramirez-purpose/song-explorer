import { useSongsQuery } from '@/queries/useSongsQuery'
import { useFavoritesQuery } from '@/queries/useFavoritesQuery'
import { useAddFavorite, useRemoveFavorite } from '@/queries/useFavoriteMutations'
import { useFilterStore } from '@/store/useFilterStore'
import { AppLayout } from '@/components/AppLayout'
import { HeroSection } from '@/components/HeroSection'
import { FilterBar } from '@/components/FilterBar'
import { SongList } from '@/components/SongList'

const App = () => {
  const { selectedLevels, debouncedSearch, isFilterOpen, toggleLevel, toggleFilterPanel } = useFilterStore()

  const { data, hasNextPage, fetchNextPage, isLoading, isError, refetch } = useSongsQuery({
    levels: selectedLevels.length > 0 ? selectedLevels : undefined,
    search: debouncedSearch,
  })

  const { data: favorites = [] } = useFavoritesQuery()
  const addFavorite = useAddFavorite()
  const removeFavorite = useRemoveFavorite()

  const isFavoritesLoading = addFavorite.isPending || removeFavorite.isPending

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
    <AppLayout
      hero={<HeroSection />}
      filter={
        <FilterBar
          isOpen={isFilterOpen}
          selectedLevels={selectedLevels}
          onTogglePanel={toggleFilterPanel}
          onToggleLevel={toggleLevel}
        />
      }
      songList={
        <SongList
          songs={songs}
          favorites={favorites}
          isLoading={isLoading}
          hasNextPage={hasNextPage ?? false}
          isError={isError}
          isFavoritesLoading={isFavoritesLoading}
          onLoadMore={() => fetchNextPage()}
          onRetry={() => refetch()}
          onToggleFavorite={handleToggleFavorite}
        />
      }
    />
  )
}

export default App
