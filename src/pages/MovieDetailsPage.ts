import { Page, Locator } from '@playwright/test';

export class MovieDetailsPage {
    readonly page: Page;
    readonly movieTitle: Locator;

    constructor(page: Page) {
        this.page = page;

        this.movieTitle = page.getByRole('heading', { level: 1 });
    }

    async getMovieTitle(): Promise<string> {
        return (await this.movieTitle.textContent())?.trim() ?? '';
    }
}