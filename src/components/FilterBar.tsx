import { FilterIcon } from '@/components/icons/FilterIcon'
import { FavoritesButton } from '@/components/FavoritesButton'
import { LevelBadgeGrid } from '@/components/LevelBadgeGrid'
import { cn } from '@/utils/cn'
import { getRangeText } from '@/utils/getRangeText'

type TProps = {
  isOpen: boolean
  selectedLevels: number[]
  favoritesCount: number
  showFavoritesOnly: boolean
  onTogglePanel: () => void
  onToggleLevel: (level: number) => void
  onToggleFavoritesOnly: () => void
}

export const FilterBar = ({
  isOpen,
  selectedLevels,
  favoritesCount,
  showFavoritesOnly,
  onTogglePanel,
  onToggleLevel,
  onToggleFavoritesOnly,
}: TProps) => {
  const hasActiveFilter = !isOpen && selectedLevels.length > 0

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-2">
        <div className='flex justify-between items-center gap-4'>
        
        <FavoritesButton
          count={favoritesCount}
          isActive={showFavoritesOnly}
          onToggle={onToggleFavoritesOnly}
        />
        </div>
        <div className="flex items-center gap-4">
        <div className="text-sm font-semibold uppercase tracking-wide">
          {isOpen ? 'Hide Filter' : 'Filter by Level'}
        </div>
        <button
          onClick={onTogglePanel}
          aria-label={isOpen ? 'Hide filter' : 'Show filter'}
          className={cn('flex items-center transition-opacity hover:opacity-70 border-2 border-white rounded-full overflow-hidden')}
        >
          {hasActiveFilter && (
            <span className="pl-4 pr-3 text-sm font-semibold">{getRangeText(selectedLevels)}</span>
          )}
          <span className={cn('p-2 rounded-full', hasActiveFilter ? 'bg-white' : '')}>
            <FilterIcon className={cn('size-4', hasActiveFilter ? 'fill-black' : 'fill-white')} />
          </span>
        </button>
        </div>
      </div>
      {isOpen && <LevelBadgeGrid selectedLevels={selectedLevels} onToggleLevel={onToggleLevel} />}
    </div>
  )
}
