import { useQuery } from '@tanstack/react-query'
import { fetchFavorites } from '@/api/favorites'

export const FAVORITES_QUERY_KEY = ['favorites'] as const

export const useFavoritesQuery = () =>
  useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: fetchFavorites,
  })
