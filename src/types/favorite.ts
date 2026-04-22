import { z } from 'zod'

export const FavoriteSchema = z.object({
  id: z.number().int().positive(),
  songId: z.string(),
})

export type TFavorite = z.infer<typeof FavoriteSchema>
