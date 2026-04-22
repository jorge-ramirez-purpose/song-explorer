import { FavoriteSchema, type TFavorite } from '@/types/favorite'
import { apiGet, apiPost, apiDelete } from './client'

export const fetchFavorites = async (): Promise<TFavorite[]> => {
  const result = await apiGet('/favorites', FavoriteSchema)
  return result.data
}

export const addFavorite = (songId: string): Promise<TFavorite> =>
  apiPost('/favorites', FavoriteSchema, { songId })

export const removeFavorite = (id: number): Promise<void> =>
  apiDelete(`/favorites/${id}`)
