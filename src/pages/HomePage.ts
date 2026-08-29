import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly navigationDrawer: Locator;
    readonly top250MoviesLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchInput = page.getByPlaceholder(/search/i);

        this.searchButton = page.getByRole('button', {
            name: /search/i
        });

        this.navigationDrawer = page.getByText('Menu');

        this.top250MoviesLink = page.getByLabel('Go to Top 250 movies');
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    async searchMovie(movieTitle: string): Promise<void> {
        await this.searchInput.fill(movieTitle);
        await this.searchButton.click();
    }

    async goToTop250Movies(): Promise<void> {
        await this.navigationDrawer.click();
        await this.top250MoviesLink.click();
    }
}