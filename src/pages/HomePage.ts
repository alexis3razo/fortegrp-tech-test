import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchInput = page.getByRole('combobox', {
            name: /search/i
        });

        this.searchButton = page.getByRole('button', {
            name: /search/i
        });
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    async searchMovie(movieTitle: string): Promise<void> {
        await this.searchInput.fill(movieTitle);
        await this.searchButton.click();
    }
}