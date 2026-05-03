type TUrlParams = {
  q: string
  levels: number[]
  favorites: boolean
}

type TUrlParamUpdates = Partial<TUrlParams>

const readParams = (): TUrlParams => {
  const params = new URLSearchParams(window.location.search)
  return {
    q: params.get('q') ?? '',
    levels: params
      .getAll('level')
      .map(Number)
      .filter((n) => !isNaN(n) && n > 0),
    favorites: params.get('favorites') === 'true',
  }
}

const writeParams = (updates: TUrlParamUpdates): void => {
  const params = new URLSearchParams(window.location.search)

  if ('q' in updates) {
    if (updates.q) params.set('q', updates.q)
    else params.delete('q')
  }

  if ('levels' in updates) {
    params.delete('level')
    updates.levels?.forEach((level) => params.append('level', String(level)))
  }

  if ('favorites' in updates) {
    if (updates.favorites) params.set('favorites', 'true')
    else params.delete('favorites')
  }

  const search = params.toString()
  history.replaceState(null, '', search ? `?${search}` : window.location.pathname)
}

export const useUrlParams = () => ({ readParams, writeParams })
