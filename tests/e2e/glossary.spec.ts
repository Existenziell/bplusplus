import { test, expect } from '@playwright/test'

test.describe('Glossary', () => {
  test('loads and shows glossary heading and terms', async ({ page }) => {
    await page.goto('/docs/glossary')
    await expect(page.getByRole('heading', { level: 1, name: /Glossary/i })).toBeVisible()
    await expect(page.getByText(/Bitcoin|blockchain|UTXO/i).first()).toBeVisible({ timeout: 5000 })
  })
})
