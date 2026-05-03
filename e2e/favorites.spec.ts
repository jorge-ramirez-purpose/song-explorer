import { test, expect, type APIRequestContext } from '@playwright/test'

const SONG_CARD = '[data-testid="song-card"]'

const cleanupFavorites = async (request: APIRequestContext) => {
  const response = await request.get('http://localhost:3004/favorites')
  if (!response.ok()) return
  const favorites = await response.json()
  if (!Array.isArray(favorites)) return
  for (const favorite of favorites) {
    await request.delete(`http://localhost:3004/favorites/${favorite.id}`)
  }
}

test.describe('Favorites', () => {
  test.describe.configure({ mode: 'serial', timeout: 60_000 })

  test.beforeEach(async ({ page, request }) => {
    await cleanupFavorites(request)
    await page.goto('/')
    await expect(page.locator(SONG_CARD).first()).toBeVisible()
  })

  test.afterEach(async ({ request }) => {
    await cleanupFavorites(request)
  })

  test('adds a song to favorites', async ({ page }) => {
    const firstCard = page.locator(SONG_CARD).first()
    await firstCard.getByLabel('Add to favorites').click()
    await expect(firstCard.getByLabel('Remove from favorites')).toBeVisible()
  })

  test('removes a song from favorites', async ({ page }) => {
    const firstCard = page.locator(SONG_CARD).first()

    await firstCard.getByLabel('Add to favorites').click()
    await expect(firstCard.getByLabel('Remove from favorites')).toBeVisible()

    await firstCard.getByLabel('Remove from favorites').click()
    await expect(firstCard.getByLabel('Add to favorites')).toBeVisible()
  })

  test('favorites-only view shows only favorited songs', async ({ page }) => {
    const firstCard = page.locator(SONG_CARD).first()
    const songTitle = await firstCard.locator('h3').textContent()

    await firstCard.getByLabel('Add to favorites').click()
    await expect(firstCard.getByLabel('Remove from favorites')).toBeVisible()

    // Toggle favorites-only view via the FavoritesButton (first aria-pressed button)
    await page.locator('button[aria-pressed]').first().click()

    await expect(page.locator(SONG_CARD)).toHaveCount(1)
    await expect(page.locator(SONG_CARD).first().locator('h3')).toHaveText(songTitle!)
  })

  test('shows empty state when all favorites are removed', async ({ page }) => {
    const firstCard = page.locator(SONG_CARD).first()

    await firstCard.getByLabel('Add to favorites').click()
    await expect(firstCard.getByLabel('Remove from favorites')).toBeVisible()

    await page.locator('button[aria-pressed]').first().click()
    await expect(page.locator(SONG_CARD)).toHaveCount(1)

    await page.locator(SONG_CARD).first().getByLabel('Remove from favorites').click()
    await expect(page.getByText('No favorites yet')).toBeVisible()
  })
})
