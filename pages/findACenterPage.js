// pages/findACenterPage.js

class FindACenterPage {
    constructor(page) {
        this.page = page;
        this.locationField = page.locator('//input[@id="addressInput"]');
        this.resultsText = page.locator('div.centerDetails.results');
        this.firstResult = page.locator('(//div[@class="centerResult infoWindow track_center_select covidOpen"])[1]');
        this.firstResultName = page.locator('(//h3[@class="centerResult__name"])[1]');
        this.firstResultAddress = page.locator('(//span[@class="centerResult__address"])[1]');
    }

    // Search for a location
    async searchLocation(location) {
        await this.locationField.fill(location);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(5000); 
    }

    // Wait for the results to load
    async waitForResults() {
        await this.page.locator('div.centerResult').waitFor({ state: 'attached' });
    }

    // Validate the number of results
    async validateResultCount() {
        const resultsTextContent = await this.resultsText.textContent();
        const numberOfResults = parseInt(resultsTextContent.match(/\d+/)[0], 10);
        const totalCenters = await this.page.locator('div.centerResult').count();
        if (numberOfResults !== totalCenters) {
            throw new Error(`The result count mismatch. Expected: ${numberOfResults}, Found: ${totalCenters}`);
        }
    }

    // Click the first result
    async clickFirstResult() {
        await this.firstResult.click();
    }

    // Validate the first result
    async validateResult() {
        const name = await this.firstResultName.textContent();
        const address = await this.firstResultAddress.textContent();
        console.log(`First result: ${name}, ${address}`);
    }
}

module.exports = FindACenterPage;
