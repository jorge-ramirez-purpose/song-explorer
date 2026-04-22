export const getLevelColor = (level: number): string => {
  if (level <= 5) return '#6fc13e'
  if (level <= 10) return '#ff8e00'
  return '#dc001c'
}
