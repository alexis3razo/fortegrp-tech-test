import fs from 'fs';
import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/imdb.json';

setup('authenticate IMDb session', async ({ page }) => {
    if (fs.existsSync(authFile)) {
        return;
    }

    await page.goto('/');

    console.log('Complete IMDb human verification if required.');

    await page.pause();

    await page.context().storageState({
        path: authFile,
    });
});