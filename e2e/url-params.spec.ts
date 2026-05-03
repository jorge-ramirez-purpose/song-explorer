import { test, expect } from '@playwright/test'

const SONG_CARD = '[data-testid="song-card"]'
const SEARCH_PLACEHOLDER = 'Search for songs by artist or title'

test.describe('URL params', () => {
  test('pre-fills search and filters the list from URL', async ({ page }) => {
    await page.goto('/?search=Yellowstone')
    await expect(page.locator(SONG_CARD)).toHaveCount(1)
    await expect(page.locator(SONG_CARD).first().locator('h3')).toHaveText('Yellowstone')
    await expect(page.getByPlaceholder(SEARCH_PLACEHOLDER)).toHaveValue('Yellowstone')
  })

  test('pre-selects levels from URL', async ({ page }) => {
    await page.goto('/?level=15')
    await expect(page.locator(SONG_CARD).first()).toBeVisible()

    const firstSongLevel = page.locator(SONG_CARD).first().locator('svg text')
    await expect(firstSongLevel).toHaveText('15')
  })

  test('activates favorites view from URL', async ({ page }) => {
    await page.goto('/?favorites=true')
    await expect(page.getByText('No favorites yet')).toBeVisible()
  })

  test('updates URL when filters change', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(SONG_CARD).first()).toBeVisible()

    await page.getByPlaceholder(SEARCH_PLACEHOLDER).fill('Yellowstone')
    await expect(page.locator(SONG_CARD)).toHaveCount(1)

    const url = new URL(page.url())
    expect(url.searchParams.get('search')).toBe('Yellowstone')
  })
})
