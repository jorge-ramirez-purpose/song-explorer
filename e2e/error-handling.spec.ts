import { test, expect } from '@playwright/test'

const SONG_CARD = '[data-testid="song-card"]'
const API_URL = 'http://localhost:3004'

test.describe('Error handling', () => {
  test.afterEach(async ({ request }) => {
    // Ensure flaky mode is always off after each test
    const response = await request.get(`${API_URL}/flaky`)
    const data = await response.json()
    if (data.isFlakey) await request.post(`${API_URL}/flaky`)
  })

  test('loads songs despite flaky API using retry logic', async ({ page, request }) => {
    await request.post(`${API_URL}/flaky`)

    await page.goto('/')
    await expect(page.locator(SONG_CARD).first()).toBeVisible({ timeout: 30_000 })
  })

  test('shows error state and recovers with retry button', async ({ page }) => {
    test.setTimeout(60_000)
    let requestCount = 0

    // Fail the first 4 song list requests (initial + 3 retries), then let through
    // Match only the paginated query (_start), not the favorites-by-ID query (?id=)
    const isSongListRequest = (url: URL) =>
      url.pathname === '/songs' && url.searchParams.has('_start')

    await page.route(isSongListRequest, async (route) => {
      requestCount++
      if (requestCount <= 4) return route.abort()
      return route.continue()
    })

    await page.goto('/')
    await expect(page.getByText('Failed to load songs')).toBeVisible({ timeout: 45_000 })

    await page.getByRole('button', { name: 'Retry' }).click()
    await expect(page.locator(SONG_CARD).first()).toBeVisible({ timeout: 30_000 })
  })
})
