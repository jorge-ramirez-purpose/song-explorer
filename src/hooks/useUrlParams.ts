export type TUrlParams = {
  search: string
  levels: number[]
  favorites: boolean
}

type TUrlParamUpdates = Partial<TUrlParams>

export const readParams = (): TUrlParams => {
  const params = new URLSearchParams(window.location.search)
  return {
    search: params.get('search') ?? '',
    levels: params
      .getAll('level')
      .map(Number)
      .filter((level) => !isNaN(level) && level > 0),
    favorites: params.get('favorites') === 'true',
  }
}

export const writeParams = (updates: TUrlParamUpdates): void => {
  const params = new URLSearchParams(window.location.search)

  if ('search' in updates) {
    params.delete('search')
    if (updates.search) params.set('search', updates.search)
  }

  if ('levels' in updates) {
    params.delete('level')
    updates.levels?.forEach((level) => params.append('level', String(level)))
  }

  if ('favorites' in updates) {
    params.delete('favorites')
    if (updates.favorites) params.set('favorites', 'true')
  }

  const search = params.toString()
  history.replaceState(null, '', search ? `?${search}` : window.location.pathname)
}

export const useUrlParams = () => ({ readParams, writeParams })
