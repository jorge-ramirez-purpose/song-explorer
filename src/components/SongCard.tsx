import { LevelBadge } from '@/components/LevelBadge'
import { FavoriteButton } from '@/components/FavoriteButton'
import { cn } from '@/utils/cn'
import { type TSong } from '@/types/song'

type TProps = {
  song: TSong
  isFavorite: boolean
  onToggleFavorite: () => void
  isEven: boolean
  isFavoritesLoading: boolean
}

export const SongCard = ({ song, isFavorite, onToggleFavorite, isEven, isFavoritesLoading }: TProps) => (
  <div className={cn('flex items-center gap-8 p-3', isEven ? 'bg-dark-bg' : 'bg-black')}>
    <img
      src={song.images}
      alt={song.title}
      className="size-16 object-cover flex-shrink-0"
      onError={(event) => { event.currentTarget.src = '/favicon.svg' }}
    />
    <div className="flex-1 min-w-0">
      <h3 className="text-white font-semibold truncate">{song.title}</h3>
      <p className="text-dark-text text-sm truncate">{song.artist}</p>
    </div>
    <LevelBadge level={song.level} />
    <FavoriteButton isFavorite={isFavorite} isLoading={isFavoritesLoading} onToggle={onToggleFavorite} />
  </div>
)
