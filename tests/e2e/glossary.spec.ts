import { test, expect } from '@playwright/test'

test.describe('Glossary', () => {
  test('loads and shows glossary heading and terms', async ({ page }) => {
    await page.goto('/docs/glossary')
    await expect(page.getByRole('heading', { level: 1, name: /Glossary/i })).toBeVisible()
    await expect(page.getByText(/Bitcoin|blockchain|UTXO/i).first()).toBeVisible({ timeout: 5000 })
  })

  test('glossary tooltip appears when hovering a /docs/glossary# link on a doc page', async ({ page }) => {
    const glossaryLoaded = page.waitForResponse(
      (res) => res.url().includes('glossary.json') && res.status() === 200,
      { timeout: 15000 }
    )
    await page.goto('/docs/bitcoin/consensus')
    await glossaryLoaded

    const link = page.locator('a[href="/docs/glossary#finality"]').first()
    await expect(link).toBeVisible()
    await link.scrollIntoViewIfNeeded()

    await link.hover({ force: true })

    const tooltip = page.getByRole('tooltip')
    await expect(tooltip).toBeVisible({ timeout: 5000 })
    await expect(tooltip).toContainText(/finality|probabilistic|reversed|confirmation/i)
  })
})
