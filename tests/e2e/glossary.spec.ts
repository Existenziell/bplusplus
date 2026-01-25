import { test, expect } from '@playwright/test'

test.describe('Glossary', () => {
  test('loads and shows glossary heading and terms', async ({ page }) => {
    await page.goto('/docs/glossary')
    await expect(page.getByRole('heading', { level: 1, name: /Glossary/i })).toBeVisible()
    await expect(page.getByText(/Bitcoin|blockchain|UTXO/i).first()).toBeVisible({ timeout: 5000 })
  })

  test('glossary tooltip appears when hovering a /docs/glossary# link on a doc page', async ({ page }) => {
    await page.goto('/docs/bitcoin/consensus')
    // Page has [Finality](/docs/glossary#finality) and others
    const link = page.locator('a[href="/docs/glossary#finality"]').first()
    await expect(link).toBeVisible()
    await link.hover()
    // Tooltip appears after 200ms delay; it has role="tooltip" and shows the definition
    await expect(page.getByRole('tooltip')).toBeVisible({ timeout: 3000 })
    await expect(page.getByRole('tooltip')).toContainText(/finality|probabilistic|reversed|confirmation/i)
  })
})
