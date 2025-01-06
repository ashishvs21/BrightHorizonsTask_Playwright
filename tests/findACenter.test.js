const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');  // Import the HomePage class

test('Verify Find a Center functionality', async ({ page }) => {

    const homePage = new HomePage(page);

    // Step 1: Navigate to the homepage
    await homePage.navigateToHome();

    // Step 2: Reject cookies if consent banner appears
    await homePage.rejectCookies();

    // Step 3: Click "Find a Center" link
    await homePage.clickFindCenterLink();

    // Step 4: Wait for thfFind a Center page to load (URL validation)
    await page.waitForURL(/.*child-care-locator.*/);

    // Step 5: Search for a location (e.g., New York)
    const location = 'New York';
    const locationField = page.locator('//input[@id="addressInput"]');
    await locationField.fill(location);
    await page.waitForTimeout(5000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(10000); // wait for results

    // Step 6: Validate the result count
    const resultsText = await page.locator('div.centerDetails.results').textContent();
    const numberOfResults = parseInt(resultsText.match(/\d+/)[0], 10);
    const totalCenters = await page.locator('div.centerResult').count();
    await expect(totalCenters).toBe(numberOfResults);

    // Step 7: Click the first result and validate details
    const firstResult = page.locator('(//div[@class="centerResult infoWindow track_center_select covidOpen"])[1]');
    await firstResult.click();

    const firstResultName = page.locator('(//h3[@class="centerResult__name"])[1]').textContent();
    const firstResultAddress = page.locator('(//span[@class="centerResult__address"])[1]').textContent();

    const tooltipName = await page.locator('//span[@class="mapTooltip__headline"]').textContent();
    const tooltipAddress = await page.locator('//div[@class="mapTooltip__address"]').textContent();

    await expect(firstResultName).toBe(tooltipName);
    await expect(firstResultAddress).toBe(tooltipAddress);
});
