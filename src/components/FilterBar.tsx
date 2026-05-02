import { FilterIcon } from '@/components/icons/FilterIcon'
import { LevelBadgeGrid } from '@/components/LevelBadgeGrid'
import { getRangeText } from '@/utils/getRangeText'

type TProps = {
  isOpen: boolean
  selectedLevels: number[]
  onTogglePanel: () => void
  onToggleLevel: (level: number) => void
}

export const FilterBar = ({ isOpen, selectedLevels, onTogglePanel, onToggleLevel }: TProps) => (
  <div >
    <button
      onClick={onTogglePanel}
      className="group flex items-center justify-end gap-4 px-6 py-2 w-full transition-colors"
      aria-label={isOpen ? 'Hide filter' : 'Show filter'}
    >
      <div className="text-sm font-semibold uppercase tracking-wide group-hover:text-dark-text transition-colors">
        {isOpen ? 'Hide Filter' : 'Filter by Level'}
        {!isOpen && selectedLevels.length > 0 && (
          <span className="ml-2 text-dark-text">{getRangeText(selectedLevels)}</span>
        )}
      </div>
      <span className="p-2 rounded-full border-2 border-white group-hover:border-dark-text transition-colors">
        <FilterIcon className="w-4 h-4 fill-white group-hover:fill-dark-text transition-colors" />
      </span>
    </button>
    {isOpen && <LevelBadgeGrid selectedLevels={selectedLevels} onToggleLevel={onToggleLevel} />}
  </div>
)
