const formatRun = (run: number[]): string =>
  run.length >= 3 ? `${run[0]} - ${run[run.length - 1]}` : run.join(', ')

export const getRangeText = (levels: number[]): string => {
  if (levels.length === 0) return ''

  const sorted = [...new Set(levels)].sort((a, b) => a - b)

  const runs = sorted.reduce<number[][]>((groups, level) => {
    const lastGroup = groups[groups.length - 1]
    if (lastGroup && lastGroup[lastGroup.length - 1] === level - 1) {
      lastGroup.push(level)
    } else {
      groups.push([level])
    }
    return groups
  }, [])

  return runs.map(formatRun).join(', ')
}
