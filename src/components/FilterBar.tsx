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
  <div className="border-b border-dark-border">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="text-sm font-semibold uppercase tracking-wide">
        {isOpen ? 'Hide Filter' : 'Filter by Level'}
        {!isOpen && selectedLevels.length > 0 && (
          <span className="ml-2 text-dark-text">{getRangeText(selectedLevels)}</span>
        )}
      </div>
      <button
        onClick={onTogglePanel}
        className="p-2 rounded-full border border-dark-border hover:border-white transition-colors"
        aria-label={isOpen ? 'Hide filter' : 'Show filter'}
      >
        <FilterIcon className="w-4 h-4" />
      </button>
    </div>

    {isOpen && <LevelBadgeGrid selectedLevels={selectedLevels} onToggleLevel={onToggleLevel} />}
  </div>
)
