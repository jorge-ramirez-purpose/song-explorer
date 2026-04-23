import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addFavorite, removeFavorite } from '@/api/favorites'
import { type TFavorite } from '@/types/favorite'
import { useToastStore } from '@/store/useToastStore'
import { FAVORITES_QUERY_KEY } from './useFavoritesQuery'

export const useAddFavorite = () => {
  const queryClient = useQueryClient()
  const addToast = useToastStore((state) => state.addToast)

  return useMutation({
    mutationFn: (songId: string) => addFavorite(songId),
    onMutate: async (songId) => {
      await queryClient.cancelQueries({ queryKey: FAVORITES_QUERY_KEY })
      const previous = queryClient.getQueryData<TFavorite[]>(FAVORITES_QUERY_KEY)

      queryClient.setQueryData<TFavorite[]>(FAVORITES_QUERY_KEY, (old = []) => [
        ...old,
        { id: Date.now(), songId },
      ])

      return { previous }
    },
    onSuccess: () => {
      addToast('Added to favorites', 'success')
    },
    onError: (_err, _songId, ctx) => {
      queryClient.setQueryData(FAVORITES_QUERY_KEY, ctx?.previous)
      addToast('Failed to add favorite', 'error')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY })
    },
  })
}

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient()
  const addToast = useToastStore((state) => state.addToast)

  return useMutation({
    mutationFn: (id: number) => removeFavorite(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: FAVORITES_QUERY_KEY })
      const previous = queryClient.getQueryData<TFavorite[]>(FAVORITES_QUERY_KEY)

      queryClient.setQueryData<TFavorite[]>(FAVORITES_QUERY_KEY, (old = []) =>
        old.filter((f) => f.id !== id),
      )

      return { previous }
    },
    onSuccess: () => {
      addToast('Removed from favorites', 'success')
    },
    onError: (_err, _id, ctx) => {
      queryClient.setQueryData(FAVORITES_QUERY_KEY, ctx?.previous)
      addToast('Failed to remove favorite', 'error')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY })
    },
  })
}
