import { LevelBadge } from '@/components/LevelBadge'

type TProps = {
  selectedLevels: number[]
  onToggleLevel: (level: number) => void
}

const LEVELS = Array.from({ length: 15 }, (_, index) => index + 1)
const GROUPS = [LEVELS.slice(0, 5), LEVELS.slice(5, 10), LEVELS.slice(10, 15)]

export const LevelBadgeGrid = ({ selectedLevels, onToggleLevel }: TProps) => (
  <div className="flex flex-wrap justify-between gap-y-4 px-6 py-4">
    {GROUPS.map((group) => (
      <div key={group[0]} className="flex justify-between w-full gap-4 sm:contents">
        {group.map((level) => (
          <button
            key={level}
            onClick={() => onToggleLevel(level)}
            aria-pressed={selectedLevels.includes(level)}
            className='transition-opacity hover:opacity-75'
          >
            <LevelBadge level={level} isSelected={selectedLevels.includes(level)} />
          </button>
        ))}
      </div>
    ))}
  </div>
)
