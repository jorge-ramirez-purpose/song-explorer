import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchSongsByIds } from '@/api/songs'

type TParams = {
  songIds: string[]
  levels?: number[]
  search?: string
}

export const useFavoriteSongsQuery = ({ songIds, levels, search }: TParams) =>
  useQuery({
    queryKey: ['songs', 'favorites', { songIds, levels, search }],
    queryFn: () => fetchSongsByIds({ ids: songIds, levels, search }),
    enabled: songIds.length > 0,
    placeholderData: keepPreviousData,
  })
