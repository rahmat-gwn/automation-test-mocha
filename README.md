# automation-test-mocha
automation-test-mocha 

# run test 
npx playwright test
Run tests in headed mode
To run your tests in headed mode, use the --headed flag. This will give you the ability to visually see how Playwright interacts with the website.

*npx playwright test --headed*

Run tests on different browsers
To specify which browser you would like to run your tests on, use the --project flag followed by the name of the browser.

*npx playwright test --project webkit*

To specify multiple browsers to run your tests on, use the --project flag multiple times followed by the name of each browser.

*npx playwright test --project webkit --project firefox*

Run specific tests
To run a single test file, pass in the name of the test file that you want to run.

*npx playwright test landing-page.spec.ts*

To run a set of test files from different directories, pass in the names of the directories that you want to run the tests in.

*npx playwright test tests/todo-page/ tests/landing-page/*

To run files that have landing or login in the file name, simply pass in these keywords to the CLI.

*npx playwright test landing login*

To run a test with a specific title, use the -g flag followed by the title of the test.

*npx playwright test -g "add a todo item"*

Run last failed tests
To run only the tests that failed in the last test run, first run your tests and then run them again with the --last-failed flag.

*npx playwright test --last-failed*