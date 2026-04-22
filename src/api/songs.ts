import { SongSchema, type TSong } from '@/types/song'
import { apiGet } from './client'
import { TApiListResult } from './types'

export type TFetchSongsParams = {
  start: number
  limit: number
  levels?: number[]
  search?: string
}

export const fetchSongs = (params: TFetchSongsParams): Promise<TApiListResult<TSong>> => {
  const { start, limit, levels, search } = params

  const queryParams: Record<string, string | number | string[]> = {
    _start: start,
    _limit: limit,
  }

  if (levels && levels.length > 0) {
    queryParams['level'] = levels.map(String)
  }

  if (search && search.trim().length > 0) {
    queryParams['search_like'] = search.trim()
  }

  return apiGet('/songs', SongSchema, queryParams)
}
