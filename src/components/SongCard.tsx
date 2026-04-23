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
  <div className={cn('flex items-center gap-4 px-6 py-4 border-b border-dark-border', isEven ? 'bg-dark-bg' : 'bg-black')}>
    <img
      src={song.images}
      alt={song.title}
      className="w-16 h-16 object-cover flex-shrink-0"
    />
    <div className="flex-1 min-w-0">
      <h3 className="text-white font-semibold truncate">{song.title}</h3>
      <p className="text-dark-text text-sm truncate">{song.artist}</p>
    </div>
    <LevelBadge level={song.level} size="large" />
    <FavoriteButton isFavorite={isFavorite} isLoading={isFavoritesLoading} onToggle={onToggleFavorite} />
  </div>
)
