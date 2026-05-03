import { HeartIcon } from '@/components/icons/HeartIcon'
import { HeartOutlineIcon } from '@/components/icons/HeartOutlineIcon'

type TProps = {
  isFavorite: boolean
  isLoading: boolean
  onToggle: () => void
}

export const FavoriteButton = ({ isFavorite, isLoading, onToggle }: TProps) => (
  <button
    onClick={onToggle}
    disabled={isLoading}
    className="flex items-center justify-center p-2 transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
  >
    {isFavorite ? (
      <HeartIcon className="size-6 fill-red text-red" />
    ) : (
      <HeartOutlineIcon className="size-6 fill-white" />
    )}
  </button>
)
