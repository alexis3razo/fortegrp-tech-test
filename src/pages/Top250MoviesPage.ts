import { Page, Locator } from '@playwright/test';

export class Top250MoviesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async ClickMovieByTopNumber(topNumber: number): Promise<void> {
    await this.page
        .getByRole('link', { name: /^View title page for/ })
        .nth(topNumber - 1)
        .click();
    }
}