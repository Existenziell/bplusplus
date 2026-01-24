import { test, expect } from '@playwright/test'

test.describe('Search', () => {
  test('opens via header button, searches, and navigates to result', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Search \(⌘K\)/i }).click()

    const dialog = page.getByRole('dialog', { name: /Search documentation/i })
    await expect(dialog).toBeVisible()

    const input = page.getByRole('searchbox', { name: /Search/i })
    await input.fill('bitcoin')

    await expect(page.getByRole('listbox')).toBeVisible({ timeout: 5000 })
    const firstResult = page.getByRole('option').first()
    await firstResult.click()

    await expect(page).toHaveURL(/\/(docs|terminal|stack-lab|whitepaper)/)
  })

  test('Escape closes the modal', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Search \(⌘K\)/i }).click()
    await expect(page.getByRole('dialog', { name: /Search documentation/i })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: /Search documentation/i })).not.toBeVisible()
  })
})
