import { colors } from '@/constants/colors'
import { getLevelColor } from '@/utils/levelColor'
import { describeArc } from '@/utils/arcPath'

const CX = 50
const CY = 50
const R = 38
const STROKE_WIDTH = 3.5
const ARC_SPAN = 100

const SEGMENTS = [
  { startAngle: 15, levelMin: 0 },
  { startAngle: 135, levelMin: 5 },
  { startAngle: 255, levelMin: 10 },
]

type TProps = {
  level: number
  size?: 'small' | 'large'
}

export const LevelBadge = ({ level, size = 'large' }: TProps) => {
  const sizeClass = size === 'small' ? 'w-8 h-8' : 'w-10 h-10'
  const levelColor = getLevelColor(level)

  return (
    <div className={sizeClass}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {SEGMENTS.map(({ startAngle, levelMin }) => {
          const filled = Math.min(Math.max(level - levelMin, 0), 5) / 5
          const filledAngle = filled * ARC_SPAN

          return (
            <g key={startAngle}>
              <path
                d={describeArc(CX, CY, R, startAngle, startAngle + ARC_SPAN)}
                fill="none"
                stroke={colors.darkBorder}
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
              />
              {filledAngle > 0 && (
                <path
                  d={describeArc(CX, CY, R, startAngle, startAngle + filledAngle)}
                  fill="none"
                  stroke={levelColor}
                  strokeWidth={STROKE_WIDTH}
                  strokeLinecap="round"
                />
              )}
            </g>
          )
        })}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontWeight="700"
          fontSize={38}
          fontFamily="Montserrat, sans-serif"
        >
          {level}
        </text>
      </svg>
    </div>
  )
}
