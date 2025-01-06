const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');  // Import the HomePage class

test('verify search functionality', async ({ page }) => {

    const homePage = new HomePage(page);

    // Step 1: Navigate to the homepage
    await homePage.navigateToHome();

    // Step 2: Reject cookies if consen banner appears
    await homePage.rejectCookies();

    // Step 3: Click on search icon
    await homePage.clickSearchIcon();

    // Step 4: Verify siearch field visibility
    const searchField = page.locator('(//input[@id="search-field"][contains(@class, "nav-search-input")])[2]');
    await expect(searchField).toBeVisible();

    // Step 5: Fill in the search query
    const searchText = 'Employee Education in 2018: Strategies to Watch';
    await homePage.fillSearchField(searchText);

    // Step 6: Click the search button
    await homePage.clickSearchButton();

    // Step 7: Validate the firstsearch result
    const firstSearchResult = page.locator(`//h3[@class="title" and text()="${searchText}"]`);
    const firstSearchResultText = await firstSearchResult.innerText();
    await expect(firstSearchResultText).toContain(searchText);
});
