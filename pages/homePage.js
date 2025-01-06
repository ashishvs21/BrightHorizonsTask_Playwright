// pages/homePage.js

class HomePage {
    constructor(page) {
        this.page = page;
        // Locators
        this.findCenterLink = page.locator('(//a[contains(text(),"Find a Center") and contains(@class, "global_header_findcenter")])[4]');
        this.searchIcon = page.locator('(//a[@role="button"][contains(@class, "nav-link-search")])[2]');
        this.searchField = page.locator('(//input[@id="search-field"][contains(@class, "nav-search-input")])[2]');
        this.searchButton = page.locator('(//form[@class="js-nav-search-form"]//button[@type="submit"])[2]');
        this.consentBanner = page.locator('#onetrust-group-container');
        this.rejectAllButton = page.locator('#onetrust-reject-all-handler');
    }

    // Method to navigate to homepage
    async navigateToHome() {
        await this.page.goto('https://www.brighthorizons.com');
    }

    // Method to reject cookies if consent banner is visible
    async rejectCookies() {
        if (await this.consentBanner.isVisible()) {
            console.log('Consent banner is visible. Clicking Reject All button.');
            await this.rejectAllButton.click();
        } else {
            console.log('Consent banner not found. Skipping...');
        }
    }

    // Click on "Find a Center" link
    async clickFindCenterLink() {
        await this.findCenterLink.click();
    }

    // Click on search icon
    async clickSearchIcon() {
        await this.searchIcon.click();
    }

    // Fill in the search field
    async fillSearchField(searchText) {
        await this.searchField.fill(searchText);
    }

    // Click the search button
    async clickSearchButton() {
        await this.searchButton.click();
    }
}

module.exports = HomePage;
