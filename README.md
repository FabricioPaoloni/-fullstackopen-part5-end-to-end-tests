# Project corresponding to FulStackOpen part5 - END TO END TESTS -

FullStackOpen's Section 5 has been splitted in 2 different projects/repositories

- unit tests are found in another repository:
    
    https://github.com/FabricioPaoloni/fullstackopen-part5-unit-tests
    
    in 2 different files under the names 'Blog.test.jsx' and 'BlogForm.test.jsx'. It contains the resolution of exercises from 1 to 16.

- end to end tests are found in this repository, inside the folder '/tests' in the file 'blog_app.spec.js'. It contains the resolution of exercises from 17 to 23.

I used *Playwright* library to complete the end to end tests (exercise 5.17 to 5.23)

A copy of the steps.txt file has been added to both repos in order to make it easier to find it - contains every step I made to accomplish the section

All tests uses this backend: 

https://github.com/FabricioPaoloni/fullstackopen-part4

All tests uses this frontend: 

https://github.com/FabricioPaoloni/fullstackopen-part5-unit-tests

Remember to install all the dependencies for ./bloglist-frontend and also the dependencies for ./end-to-end-tests, they are 2 different npm projects; remember to install the backend dependencies as well
 
### -

To run the unit tests, you can run in a terminal situated in the *bloglist-frontend project's folder* the following command:
    ~ *npm run test*

To run the end to end tests, first you have to execute two terminals process, one for the backend and the other one for the front end:   

    - initialize backend with testing database in a terminal located at *backend's project folder*:

        ~ npm run start:test

    - initialize frontend in a terminal located at *bloglist-frontend project's folder*:

        ~ npm run dev

Then you can run in a third terminal situated in the *./end-to-end-tests folder* the following scripts (after executing the 2 terminal's process for frontend and backend):

    ~ npm run test
    
    to run the end to end tests (terminal located at ./end-to-end-tests folder); or

    ~ npm run test:report
    
    to access the playwright report (terminal located at ./end-to-end-tests folder)

