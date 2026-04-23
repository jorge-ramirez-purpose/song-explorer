import { LevelBadge } from '@/components/LevelBadge'
import { cn } from '@/utils/cn'

type TProps = {
  selectedLevels: number[]
  onToggleLevel: (level: number) => void
}

export const LevelBadgeGrid = ({ selectedLevels, onToggleLevel }: TProps) => (
  <div className="grid grid-cols-5 gap-3 px-6 py-4">
    {Array.from({ length: 15 }, (_, index) => index + 1).map((level) => (
      <button
        key={level}
        onClick={() => onToggleLevel(level)}
        className={cn('transition-opacity', selectedLevels.includes(level) ? 'opacity-100' : 'opacity-50 hover:opacity-75')}
        aria-pressed={selectedLevels.includes(level)}
      >
        <LevelBadge level={level} size="small" />
      </button>
    ))}
  </div>
)
