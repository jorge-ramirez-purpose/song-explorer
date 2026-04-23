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
  onLoadMore: () => void
  onToggleFavorite: (songId: string, isFavorite: boolean) => void
}

export const SongList = ({
  songs,
  favorites,
  isLoading,
  hasNextPage,
  onLoadMore,
  onToggleFavorite,
}: TProps) => {
  const favoritesMap = useMemo(() => new Map(favorites.map((favorite) => [favorite.songId, favorite.id])), [favorites])

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
