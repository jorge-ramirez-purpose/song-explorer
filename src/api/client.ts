import { z } from 'zod'
import { TApiListResult } from './types'



export const apiGet = async <T>(
  url: string,
  schema: z.ZodType<T>,
  params?: Record<string, string | number | string[]>,
): Promise<TApiListResult<T>> => {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params ?? {})) {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v))
      continue
    }
    searchParams.set(key, String(value))
  }

  const query = searchParams.toString()
  const response = await fetch(query ? `${url}?${query}` : url)

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  const total = Number(response.headers.get('X-Total-Count') ?? 0)
  const json = await response.json()
  const data = z.array(schema).parse(json)

  return { data, total }
}

export const apiPost = async <T>(
  url: string,
  schema: z.ZodType<T>,
  body: unknown,
): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()
  return schema.parse(json)
}

export const apiDelete = async (url: string): Promise<void> => {
  const response = await fetch(url, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
}
