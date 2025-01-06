class SearchPage {
    constructor(page) {
        this.page = page;

        // Locators for the Search page
        this.searchField = page.locator('(//input[@id="search-field"][contains(@class, "nav-search-input")])[2]');
        this.searchButton = page.locator('(//form[@class="js-nav-search-form"]//button[@type="submit"])[2]');
        this.firstSearchResult = page.locator('//h3[@class="title"]');
    }

    // Action to type the search query
    async typeSearchQuery(query) {
        await this.searchField.fill(query);
    }

    // Action to click the search button
    async clickSearchButton() {
        await this.searchButton.click();
    }

    // Action to wait for the search results to load
    async waitForSearchResults() {
        await this.page.waitForSelector('//h3[@class="title"]', { state: 'attached' });
    }

    // Action to validate the first search result
    async validateFirstResult(query) {
        const firstSearchResultText = await this.firstSearchResult.innerText();
        await expect(firstSearchResultText).toContain(query);
    }
}

module.exports = SearchPage;
