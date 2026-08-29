import { Page, Locator, expect } from '@playwright/test';

export class MovieDetailsPage {
    readonly page: Page;
    readonly movieTitle: Locator;
    readonly movieRating: Locator;
    readonly movieYear: Locator;

    constructor(page: Page) {
        this.page = page;

        this.movieTitle = page.getByRole('heading', { level: 1 }).first();
        this.movieRating = page.getByTestId('hero-rating-bar__aggregate-rating').first();
        this.movieYear = page.getByText(/\b(19|20)\d{2}\b/).first();
    }

    async getMovieTitle(): Promise<string> {
        return (await this.movieTitle.textContent())?.trim() ?? '';
    }

    async assertMovieDetailsVisible(): Promise<void> {
        await expect(this.movieTitle).toBeVisible();
        await expect(this.movieRating).toBeVisible();
        await expect(this.movieYear).toBeVisible();
    }
}