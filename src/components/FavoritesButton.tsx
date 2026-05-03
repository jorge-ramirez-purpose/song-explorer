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
    className="flex items-center transition-opacity hover:opacity-70 border-2 border-white rounded-full overflow-hidden"
  >
    {count > 0 && (
      <span className="pl-4 pr-3 text-sm font-semibold">{count}</span>
    )}
    <span className={cn('p-2 rounded-full', isActive ? 'bg-white' : '')}>
      {isActive ? (
        <HeartIcon className="size-4 fill-black" />
      ) : (
        <HeartOutlineIcon className="size-4 fill-white" />
      )}
    </span>
  </button>
)
