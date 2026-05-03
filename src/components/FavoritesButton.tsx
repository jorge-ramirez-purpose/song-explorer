import { cn } from '@/utils/cn'
import { HeartIcon } from '@/components/icons/HeartIcon'
import { HeartOutlineIcon } from '@/components/icons/HeartOutlineIcon'

type TProps = {
  count: number
  isActive: boolean
  onToggle: () => void
}

export const FavoritesButton = ({ count, isActive, onToggle }: TProps) => (
  <button
    onClick={onToggle}
    aria-pressed={isActive}
    className={cn(
      'flex items-center transition-opacity hover:opacity-70 border-2 border-white rounded-full',
      isActive ? 'gap-2 pl-4 pr-1' : 'p-1',
    )}
  >
    {isActive && (
      <span className="text-sm font-semibold">
        Favorites ({count})
      </span>
    )}
    <span className={cn('p-1.5 rounded-full', isActive ? 'bg-white m-0.5' : '')}>
      {isActive ? (
        <HeartIcon className="size-4 fill-black" />
      ) : (
        <HeartOutlineIcon className="size-4 fill-white" />
      )}
    </span>
  </button>
)
