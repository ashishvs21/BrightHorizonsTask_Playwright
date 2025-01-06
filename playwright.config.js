module.exports = {
  testDir: './tests',
  timeout: 30000, // Timeout for tests
  reporter: 'html', // Reporter option
  use: {
    headless: false, // Run tests in headedmode
    baseURL: 'https://www.brighthorizons.com/', // Default baseURL
    screenshot: 'only-on-failure', // Take screenshot only onfailure
    video: 'retain-on-failure', // Record video on failure
  } 
};
