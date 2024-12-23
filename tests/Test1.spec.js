const { test, expect } = require('@playwright/test');


test('verify search functionality', async ({ page }) => {

    await page.goto("https://www.brighthorizons.com/");

    const consentBanner = await page.locator('#onetrust-group-container');

    // Step 1: Rejecting all the cookies
    if (await consentBanner.isVisible()) {
        console.log('Consent banner is visible. Clicking Reject All button.');
        const rejectAllButton = await page.locator('#onetrust-reject-all-handler');
        await rejectAllButton.click();
    } else {
        console.log('Consent banner not found. Skipping...');
    }

    // Step 2: Click on the search icon 
    const searchIcon = await page.locator('(//a[@role="button"][contains(@class, "nav-link-search")])[2]');
    await searchIcon.click();

    // Step 3: Verify if the search field is visible
    const searchField = await page.locator('(//input[@id="search-field"][contains(@class, "nav-search-input")])[2]');
    await expect(searchField).toBeVisible();

    // Step 4: Type the search query into the search field
    const searchText = 'Employee Education in 2018: Strategies to Watch';
    await searchField.fill(searchText);

    //Step 5: Click the search button
    const searchButton = await page.locator('(//form[@class="js-nav-search-form"]//button[@type="submit"])[2]');
    await searchButton.click();

    // Step 6: Verify the first search result matches the searchText
    const firstSearchResult = await page.locator(`//h3[@class="title" and text()="${searchText}"]`);
    const firstSearchResultText = await firstSearchResult.innerText();
    await expect(firstSearchResultText).toContain(searchText);
})


test.only('Verify comments', async ({ page }) => {

    await page.goto("https://www.brighthorizons.com/");

    const consentBanner = await page.locator('#onetrust-group-container');

    // Step 1: Rejecting all the cookies
    if (await consentBanner.isVisible()) {
        console.log('Consent banner is visible. Clicking Reject All button.');
        const rejectAllButton = await page.locator('#onetrust-reject-all-handler');
        await rejectAllButton.click();
    } else {
        console.log('Consent banner not found. Skipping...');
    }

    // Step 2: Click on Find a center
    const findCenter = await page.locator('(//a[contains(text(),"Find a Center") and contains(@class, "global_header_findcenter")])[4]');
    await findCenter.click();
    await page.waitForTimeout(5000);

    // Step 3: Validate the URL
    await page.waitForURL(/.*child-care-locator.*/);
    const currentURL = await page.url();
    await expect(currentURL).toContain('/child-care-locator');

    // Step 4: Type the search query into the search field and press enter key
    const locationField = await page.locator('//input[@id="addressInput"]');
    const searchText = 'New York';
    await locationField.fill(searchText);
    await page.waitForTimeout(5000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);

    // Step 5: Validate the search result count
    const resultsText = await page.locator('div.centerDetails.results').textContent();
    const numberOfResults = await parseInt(resultsText.match(/\d+/)[0], 10);
    const totalCenters = await page.locator('div.centerResult.infoWindow.track_center_select.covidOpen').count();
    await console.log("total centers : " + totalCenters);
    await console.log("total count : " + numberOfResults);
    await expect(totalCenters).toBe(numberOfResults);

    // Step 6: Validate the name and address of first result
    const firstresult = await page.locator(('(//div [@class="centerResult infoWindow track_center_select covidOpen"])[1]'));
    await firstresult.click();
    const FirstResultTextName = await page.locator('(//h3[@class="centerResult__name"])[1]').textContent();
    const FirstResultTextAddress = await page.locator('(//span[@class="centerResult__address"])[1]').textContent();
    const FirstResultToolTipName = await page.locator('//span[@class="mapTooltip__headline"]').textContent();
    const FirstResultToolTipAddress = await page.locator('//div[@class="mapTooltip__address"]').textContent();

    await expect(FirstResultTextName).toBe(FirstResultToolTipName);
    await expect(FirstResultTextAddress).toBe(FirstResultToolTipAddress);

});


