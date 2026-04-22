import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchSongs } from '@/api/songs'

const PAGE_SIZE = 20

export type TSongsQueryParams = {
  levels?: number[]
  search?: string
}

export const useSongsQuery = ({ levels, search }: TSongsQueryParams = {}) =>
  useInfiniteQuery({
    queryKey: ['songs', { levels, search }],
    queryFn: ({ pageParam }) =>
      fetchSongs({
        start: pageParam * PAGE_SIZE,
        limit: PAGE_SIZE,
        levels,
        search,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.length * PAGE_SIZE
      return fetched < lastPage.total ? allPages.length : undefined
    },
  })
