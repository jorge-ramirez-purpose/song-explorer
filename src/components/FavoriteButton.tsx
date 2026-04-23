import { HeartIcon } from '@/components/icons/HeartIcon'
import { HeartOutlineIcon } from '@/components/icons/HeartOutlineIcon'

type TProps = {
  isFavorite: boolean
  onToggle: () => void
}

export const FavoriteButton = ({ isFavorite, onToggle }: TProps) => (
  <button
    onClick={onToggle}
    className="flex items-center justify-center p-2 transition-opacity hover:opacity-80"
    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
  >
    {isFavorite ? (
      <HeartIcon className="w-6 h-6 fill-red text-red" />
    ) : (
      <HeartOutlineIcon className="w-6 h-6 text-white" />
    )}
  </button>
)
