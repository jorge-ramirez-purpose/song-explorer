import { test, expect } from '@playwright/test'

const SONG_CARD = '[data-testid="song-card"]'
const PAGE_SIZE = 20

test.describe('Song list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads the first page of songs', async ({ page }) => {
    await expect(page.locator(SONG_CARD).first()).toBeVisible()
    await expect(page.locator(SONG_CARD)).toHaveCount(PAGE_SIZE)
  })

  test('each song card shows a title, artist, and level badge', async ({ page }) => {
    await expect(page.locator(SONG_CARD).first()).toBeVisible()

    const first = page.locator(SONG_CARD).first()
    await expect(first.locator('h3')).not.toBeEmpty()
    await expect(first.locator('p')).not.toBeEmpty()
    await expect(first.locator('svg').first()).toBeVisible()
  })

  test('shows a loading indicator while songs are fetching', async ({ page }) => {
    let resume: () => void
    await page.route((url) => url.pathname === '/songs', async (route) => {
      await new Promise<void>((resolve) => { resume = resolve })
      await route.continue()
    })

    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.getByTestId('loading-spinner')).toBeVisible()
    resume!()
    await expect(page.getByTestId('loading-spinner')).not.toBeVisible()
  })

  test('loads more songs when scrolling to the bottom', async ({ page }) => {
    await expect(page.locator(SONG_CARD)).toHaveCount(PAGE_SIZE)
    await page.locator(SONG_CARD).last().scrollIntoViewIfNeeded()
    await expect(page.locator(SONG_CARD)).toHaveCount(PAGE_SIZE * 2)
  })
})
