import { test, expect } from '@playwright/test'

test.describe('Terminal', () => {
  test('page loads with heading, input, and Run button', async ({ page }) => {
    await page.goto('/terminal')
    await expect(page.getByRole('heading', { level: 1, name: /Bitcoin CLI Terminal/i })).toBeVisible()
    await expect(page.getByPlaceholder(/enter command/i)).toBeVisible()
    await expect(page.getByRole('button', { name: 'Run' })).toBeVisible()
  })

  test('help shows Available commands', async ({ page }) => {
    await page.goto('/terminal')
    await page.getByPlaceholder(/enter command/i).fill('help')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect(page.getByText('Available commands')).toBeVisible({ timeout: 10000 })
  })

  test('help getblockchaininfo shows Command and Description', async ({ page }) => {
    await page.goto('/terminal')
    await page.getByPlaceholder(/enter command/i).fill('help getblockchaininfo')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect(page.getByText('Command: getblockchaininfo')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Description:')).toBeVisible()
  })

  test('clear clears output', async ({ page }) => {
    await page.goto('/terminal')
    await page.getByPlaceholder(/enter command/i).fill('help')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect(page.getByText('Available commands')).toBeVisible({ timeout: 10000 })

    await page.getByPlaceholder(/enter command/i).fill('clear')
    await page.getByRole('button', { name: 'Run' }).click()

    await expect(page.getByText('Available commands')).not.toBeVisible()
  })

  test('unknown command shows error', async ({ page }) => {
    await page.goto('/terminal')
    await page.getByPlaceholder(/enter command/i).fill('foo')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect(page.getByText(/unknown command/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/help/i)).toBeVisible()
  })

  test('getblockcount returns JSON number', async ({ page }) => {
    await page.goto('/terminal')
    await page.getByPlaceholder(/enter command/i).fill('getblockcount')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect(page.locator('pre').filter({ hasText: /^\d+$/ })).toBeVisible({ timeout: 15000 })
  })
})
