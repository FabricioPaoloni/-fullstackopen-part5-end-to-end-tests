const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Testing user',
                username: 'testinguser',
                password: 'testingpassword'
            }
        })


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
    describe('Login', () => {
        test('user can log in', async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByLabel('username').fill('testinguser')
            await page.getByLabel('password').fill('testingpassword')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Testing user logged in')).toBeVisible()

        })

        test('wrong username or password must not log in', async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByLabel('username').fill('testinguser')
            await page.getByLabel('password').fill('wrong') //must fail
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Error: wrong credentials')).toBeVisible()
            await expect(page.getByLabel('username')).toBeVisible()
            await expect(page.getByLabel('password')).toBeVisible()

        })
    })

})