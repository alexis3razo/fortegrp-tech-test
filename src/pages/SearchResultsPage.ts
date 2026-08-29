import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectMovie(movieTitle: string): Promise<void> {
        await this.page
            .getByRole('link', { name: new RegExp(movieTitle, 'i') })
            .first()
            .click();
    }
}