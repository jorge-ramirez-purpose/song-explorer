export const getRangeText = (levels: number[]): string => {
  if (levels.length === 0) return ''
  const sorted = [...levels].sort((a, b) => a - b)
  return `${sorted[0]} - ${sorted[sorted.length - 1]}`
}
