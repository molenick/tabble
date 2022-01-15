import { test, expect } from '@playwright/test'


test('demo', async ({ page, baseURL }) => {
  await page.goto(baseURL)
  await expect(page.locator('h1')).toHaveText('Tabble Demonstration')

  expect(await page.getAttribute('#main-input', 'tabindex')).toBe(null)
  expect(await page.getAttribute('#show-overlay', 'tabindex')).toBe(null)
  expect(await page.getAttribute('#overlay-input', 'tabindex')).toBe(null)
  expect(await page.getAttribute('#hide-overlay', 'tabindex')).toBe(null)
  await expect(page.locator('.overlay')).toBeHidden()

  await page.click('#show-overlay')
  await expect(page.locator('.overlay')).toBeVisible()
  expect(await page.getAttribute('#main-input', 'tabindex')).toBe('-1')
  expect(await page.getAttribute('#show-overlay', 'tabindex')).toBe('-1')
  expect(await page.getAttribute('#overlay-input', 'tabindex')).toBe(null)
  expect(await page.getAttribute('#hide-overlay', 'tabindex')).toBe(null)

  await page.click('#hide-overlay')
  await expect(page.locator('.overlay')).toBeHidden()
  expect(await page.getAttribute('#main-input', 'tabindex')).toBe(null)
  expect(await page.getAttribute('#show-overlay', 'tabindex')).toBe(null)
  expect(await page.getAttribute('#overlay-input', 'tabindex')).toBe(null)
  expect(await page.getAttribute('#hide-overlay', 'tabindex')).toBe(null)
})

