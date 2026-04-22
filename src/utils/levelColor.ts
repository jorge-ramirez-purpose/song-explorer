import { colors } from '@/constants/colors'

export const getLevelColor = (level: number): string => {
  if (level <= 5) return colors.green
  if (level <= 10) return colors.orange
  return colors.red
}
