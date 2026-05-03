import { FilterIcon } from '@/components/icons/FilterIcon'
import { LevelBadgeGrid } from '@/components/LevelBadgeGrid'
import { cn } from '@/utils/cn'
import { getRangeText } from '@/utils/getRangeText'

type TProps = {
  isOpen: boolean
  selectedLevels: number[]
  onTogglePanel: () => void
  onToggleLevel: (level: number) => void
}

export const FilterBar = ({ isOpen, selectedLevels, onTogglePanel, onToggleLevel }: TProps) => {
  const hasActiveFilter = !isOpen && selectedLevels.length > 0

  return (
    <div>
      <div className="flex items-center justify-end gap-4 px-6 py-2">
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
      {isOpen && <LevelBadgeGrid selectedLevels={selectedLevels} onToggleLevel={onToggleLevel} />}
    </div>
  )
}
