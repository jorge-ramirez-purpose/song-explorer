export type TApiListResult<T> = {
  data: T[]
  total: number
}

export type TFetchSongsParams = {
  start: number
  limit: number
  levels?: number[]
  search?: string
}

export type TFetchSongsByIdsParams = {
  ids: string[]
  levels?: number[]
  search?: string
}