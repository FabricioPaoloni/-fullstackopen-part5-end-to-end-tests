const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith, createNewBlog, createOtherBlog } from './helper'


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
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Second Testing user',
                username: 'seconduser',
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
            loginWith(page, 'testinguser', 'testingpassword')

            await expect(page.getByText('Testing user logged in')).toBeVisible()

        })

        test('wrong username or password must not log in', async ({ page }) => {
            //wrong password login attempt must fail
            loginWith(page, 'testinguser', 'wrongpass')

            await expect(page.getByText('Error: wrong credentials')).toBeVisible()
            await expect(page.getByLabel('username')).toBeVisible()
            await expect(page.getByLabel('password')).toBeVisible()

        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            //login
            await loginWith(page, 'testinguser', 'testingpassword')
        })

        test('a new blog can be created', async ({ page }) => {
            //createNewBlog call
            await createNewBlog(page)

            await expect(page.getByText('testing the creation of a new blog - Exercise 5.19 by Testing user')).toBeVisible

        })

        test('a blog can be liked', async ({ page }) => {
            //create new blog call
            await createNewBlog(page)

            //click the view button so the app shows the full blog's info
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('likes: 520')).toBeVisible

        })

        test('a blog can be deleted by the creator', async ({ page }) => {
            //create new blog call
            await createNewBlog(page)

            //click the view button so the app shows the full blog's info
            await page.getByRole('button', { name: 'view' }).click()

            //accept the window.confirm dialog show after clicking the 'delete blog' button
            page.on('dialog', dialog => dialog.accept());
            await page.getByRole('button', { name: 'delete blog' }).click()

            expect(page.getByText('Blog deleted: testing the creation of a new blog - Exercise 5.19 by Testing user')).toBeVisible

        })

        test('only the user who added the blog sees the blog\'s delete button', async ({ page }) => {
            //create new blog call
            await createNewBlog(page)

            //logout with testinguser
            await page.getByRole('button', { name: 'logout' }).click()
            //login with seconduser
            await loginWith(page, 'seconduser', 'testingpassword')

            //expand blog
            await page.getByRole('button', { name: 'view' }).click()

            expect(page.getByRole('button', { name: 'delete blog' })).not.toBeVisible()

        })

        test('blogs should appear from most liked to less liked', async ({ page }) => {
            //create other blog call
            await createOtherBlog(page, 'First Blog with 10 likes should appear 3rd', 'Exercise 5.23', 'testing.com/exercise5.23/10likes', '10', true)
            await createOtherBlog(page, 'Second Blog with 30 likes should appear 1st', 'Exercise 5.23', 'testing.com/exercise5.23/30likes', '30', false)
            await createOtherBlog(page, 'Third Blog with 20 likes should appear 2nd', 'Exercise 5.23', 'testing.com/exercise5.23/20likes', '20', false)

            let blogsArray = await page.locator('.blog').all()

            //user page.pause() to debug the last part
            // await page.pause()

            //checks first position 
            await blogsArray[0].getByRole('button', { name: 'view' }).click()
            await expect(blogsArray[0]).toContainText('likes: 30')

            //checks second position
            await blogsArray[1].getByRole('button', { name: 'view' }).click()
            await expect(blogsArray[1]).toContainText('likes: 20')

            //checks third position
            await blogsArray[2].getByRole('button', { name: 'view' }).click()
            await expect(blogsArray[2]).toContainText('likes: 10')

        })
    })

})