const loginWith = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createNewBlog = async (page) => {
    //click in the create new blog button so the app displays the form
    await page.getByRole('button', { name: 'create new blog' }).click()
    //add blog info
    await page.getByLabel('title:').fill('testing the creation of a new blog - Exercise 5.19')
    await page.getByLabel('author:').fill('Testing user')
    await page.getByLabel('url:').fill('http://localhost:5173/blogs/exercise5.19')
    await page.getByLabel('likes:').fill('519')
    //click the create blog button
    await page.getByRole('button', { name: 'Create Blog' }).click()
}

const createOtherBlog = async (page, title, author, url, likes, first) => {
    if (first) {
        //click in the create new blog button so the app displays the form
        await page.getByRole('button', { name: 'create new blog' }).click()
    }

    //add blog info
    await page.getByLabel('title:').fill(title)
    await page.getByLabel('author:').fill(author)
    await page.getByLabel('url:').fill(url)
    await page.getByLabel('likes:').fill(likes)
    //click the create blog button
    await page.getByRole('button', { name: 'Create Blog' }).click()
    await page.getByText(`${title} by ${author} - view`).waitFor()
}

export { loginWith, createNewBlog, createOtherBlog }