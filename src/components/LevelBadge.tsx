import { getLevelColor } from '@/utils/levelColor'

type TProps = {
  level: number
  size?: 'small' | 'large'
}

export const LevelBadge = ({ level, size = 'large' }: TProps) => {
  const color = getLevelColor(level)
  const sizeClasses = size === 'small' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'

  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold border-2 ${sizeClasses}`}
      style={{
        borderColor: color,
        color: color,
      }}
    >
      {level}
    </div>
  )
}
