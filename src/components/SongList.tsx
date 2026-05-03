import { useMemo } from 'react'
import { SongCard } from '@/components/SongCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { InfiniteScrollSentinel } from '@/components/InfiniteScrollSentinel'
import { type TSong } from '@/types/song'
import { type TFavorite } from '@/types/favorite'

type TProps = {
  songs: TSong[]
  favorites: TFavorite[]
  isLoading: boolean
  hasNextPage: boolean
  isError: boolean
  isFavoritesLoading: boolean
  hasActiveFilters: boolean
  onLoadMore: () => void
  onRetry: () => void
  onToggleFavorite: (songId: string, isFavorite: boolean) => void
  onClearFilters: () => void
}

export const SongList = ({
  songs,
  favorites,
  isLoading,
  hasNextPage,
  isError,
  isFavoritesLoading,
  hasActiveFilters,
  onLoadMore,
  onRetry,
  onToggleFavorite,
  onClearFilters,
}: TProps) => {
  const favoritesMap = useMemo(() => new Map(favorites.map((favorite) => [favorite.songId, favorite.id])), [favorites])
const shouldShowError = isError && songs.length === 0

  if (shouldShowError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <h2 className="text-white text-lg font-semibold mb-2">Failed to load songs</h2>
        <p className="text-dark-text text-sm mb-6">Please try again</p>
        <button
          onClick={onRetry}
          className="bg-brand text-black font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    )
  }

  const isEmpty = !isLoading && !isError && songs.length === 0

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <h2 className="text-white text-lg font-semibold mb-2">No songs found</h2>
        <p className="text-dark-text text-sm mb-6">Try a different search or level</p>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="bg-brand text-black font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div>
      {songs.map((song, index) => (
        <SongCard
          key={song.id}
          song={song}
          isFavorite={favoritesMap.has(song.id)}
          onToggleFavorite={() => onToggleFavorite(song.id, !favoritesMap.has(song.id))}
          isEven={index % 2 === 0}
          isFavoritesLoading={isFavoritesLoading}
        />
      ))}

      {isLoading && <LoadingSpinner />}

      {hasNextPage && !isLoading && <InfiniteScrollSentinel onIntersect={onLoadMore} />}
    </div>
  )
}
