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
  onLoadMore: () => void
  onRetry: () => void
  onToggleFavorite: (songId: string, isFavorite: boolean) => void
}

export const SongList = ({
  songs,
  favorites,
  isLoading,
  hasNextPage,
  isError,
  onLoadMore,
  onRetry,
  onToggleFavorite,
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

  return (
    <div className="divide-y divide-dark-border">
      {songs.map((song, index) => (
        <SongCard
          key={song.id}
          song={song}
          isFavorite={favoritesMap.has(song.id)}
          onToggleFavorite={() => onToggleFavorite(song.id, !favoritesMap.has(song.id))}
          isEven={index % 2 === 0}
        />
      ))}

      {isLoading && <LoadingSpinner />}

      {hasNextPage && !isLoading && <InfiniteScrollSentinel onIntersect={onLoadMore} />}
    </div>
  )
}
