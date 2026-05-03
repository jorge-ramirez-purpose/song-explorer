import { test, expect } from '@playwright/test'

const SONG_CARD = '[data-testid="song-card"]'
const SEARCH_PLACEHOLDER = 'Search for songs by artist or title'

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(SONG_CARD).first()).toBeVisible()
  })

  test('filters songs when typing in the search bar', async ({ page }) => {
    await page.getByPlaceholder(SEARCH_PLACEHOLDER).fill('Yellowstone')
    await expect(page.locator(SONG_CARD)).toHaveCount(1)
    await expect(page.locator(SONG_CARD).first().locator('h3')).toHaveText('Yellowstone')
  })

  test('restores the full list when clearing the search', async ({ page }) => {
    const searchInput = page.getByPlaceholder(SEARCH_PLACEHOLDER)

    await searchInput.fill('Yellowstone')
    await expect(page.locator(SONG_CARD)).toHaveCount(1)

    await searchInput.clear()
    await expect(page.locator(SONG_CARD)).toHaveCount(20)
  })

  test('shows empty state when no songs match', async ({ page }) => {
    await page.getByPlaceholder(SEARCH_PLACEHOLDER).fill('xyznotfound')
    await expect(page.getByText('No songs found')).toBeVisible()
  })
})
