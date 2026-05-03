import { test, expect, type Page } from '@playwright/test'

const SONG_CARD = '[data-testid="song-card"]'

// When the filter panel is open, button[aria-pressed] elements are:
// nth(0) = FavoritesButton, nth(1) = Level 1, ..., nth(15) = Level 15
const clickLevelFilter = (page: Page, level: number) =>
  page.locator('button[aria-pressed]').nth(level).click()

test.describe('Level filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(SONG_CARD).first()).toBeVisible()
  })

  test('toggles the filter panel', async ({ page }) => {
    await page.getByLabel('Show filter').click()
    await expect(page.getByText('Hide Filter')).toBeVisible()

    await page.getByLabel('Hide filter').click()
    await expect(page.getByText('Filter by Level')).toBeVisible()
  })

  test('filters songs by a selected level', async ({ page }) => {
    await page.getByLabel('Show filter').click()
    await clickLevelFilter(page, 15)

    const firstSongLevel = page.locator(SONG_CARD).first().locator('svg text')
    await expect(firstSongLevel).toHaveText('15')
  })

  test('filters songs by multiple levels', async ({ page }) => {
    await page.getByLabel('Show filter').click()
    await clickLevelFilter(page, 14)
    await clickLevelFilter(page, 15)

    await expect(page.locator(SONG_CARD).first()).toBeVisible()
    const firstLevel = await page.locator(SONG_CARD).first().locator('svg text').textContent()
    expect(['14', '15']).toContain(firstLevel)
  })

  test('shows range text when collapsed with active filters', async ({ page }) => {
    await page.getByLabel('Show filter').click()
    await clickLevelFilter(page, 5)
    await clickLevelFilter(page, 6)
    await clickLevelFilter(page, 7)
    await page.getByLabel('Hide filter').click()

    await expect(page.getByText('5 - 7')).toBeVisible()
  })
})
