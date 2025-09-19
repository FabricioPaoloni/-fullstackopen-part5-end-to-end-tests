const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('login form is shown', async ({ page }) => {

        const title = page.getByRole('heading', { name: 'Login' })
        const usernameInput = page.getByLabel('username')
        const passwordInput = page.getByLabel('password')
        const loginButton = page.getByRole('button', { name: 'login' })

        await expect(title).toBeVisible()
        await expect(usernameInput).toBeVisible()
        await expect(passwordInput).toBeVisible()
        await expect(loginButton).toBeVisible()

    })
})