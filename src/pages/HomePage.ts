import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly navigationDrawer: Locator;
    readonly top250MoviesLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchInput = page.getByPlaceholder(/search imdb|search/i);

        this.searchButton = page.getByRole('button', {
            name: /submit search|search/i
        });

        this.navigationDrawer = page.getByLabel('Open navigation drawer');

        this.top250MoviesLink = page.getByRole('link', {
            name: /top 250/i
        }).first();
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    async searchMovie(movieTitle: string): Promise<void> {
        await this.searchInput.fill(movieTitle);
        await this.searchButton.click();
    }

    async goToTop250Movies(): Promise<void> {
        const drawerVisible = await this.navigationDrawer.isVisible().catch(() => false);

        if (drawerVisible) {
            await this.navigationDrawer.click();
        }

        const top250LinkVisible = await this.top250MoviesLink.isVisible().catch(() => false);

        if (top250LinkVisible) {
            await this.top250MoviesLink.click();
            return;
        }

        await this.page.goto('/chart/top/?ref_=chttp_nv_tp_1');
    }
}