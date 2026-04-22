import { z } from 'zod'

export const SongSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  images: z.string().url(),
  level: z.number().int().min(1).max(15),
  search: z.string(),
})

export type TSong = z.infer<typeof SongSchema>
