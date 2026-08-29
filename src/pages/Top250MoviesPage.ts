import { Page, Locator } from '@playwright/test';

export class Top250MoviesPage {
    readonly page: Page;
    readonly mainContent: Locator;
    readonly movieLinks: Locator;
    readonly movieTitle: Locator;
    readonly movieRating: Locator;
    readonly movieYear: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainContent = page.locator('main');

        this.movieLinks = this.mainContent.getByRole('link', {
            name: /View title page for/i,
        });

        this.movieTitle = this.mainContent.getByRole('heading', { level: 1 }).first();
        this.movieRating = this.mainContent.getByTestId('hero-rating-bar__aggregate-rating').first();
        this.movieYear = this.mainContent.getByText(/\b(19|20)\d{2}\b/).first();
    }

    async ClickMovieByTopNumber(topNumber: number): Promise<void> {
        await this.movieLinks.nth(topNumber - 1).click();
    }
}