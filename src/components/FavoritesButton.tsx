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
      'flex items-center transition-opacity hover:opacity-70 gap-2 rounded-full pr-3 border-2',
      isActive ? 'border-white' : 'border-transparent'
    )}
  >
     
    <span className={cn('p-2 rounded-full', isActive ? 'bg-white' : '')}>
      {isActive ? (
        <HeartIcon className="size-4 fill-black" />
      ) : (
        <HeartOutlineIcon className="size-4 fill-white" />
      )}
    </span>
    <span>{count}</span>
  </button>
)
