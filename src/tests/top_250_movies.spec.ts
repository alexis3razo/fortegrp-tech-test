import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Top250MoviesPage } from '../pages/Top250MoviesPage';
import { readCSV } from '../utils/csvReader';

const top250MovieData = readCSV('src/utils/testData/top250MoviesData.csv');

top250MovieData.forEach((data:any) => {
    if (data.ShouldRun !== 'true') return;

    test(`${data.TestCaseId} - Go to Top 250 Movies Test`, async ({ page }) => {
        const homePage = new HomePage(page);
        const top250MoviesPage = new Top250MoviesPage(page);

        await homePage.navigate();
        await homePage.goToTop250Movies();
    
        await page.waitForLoadState('load');
        await expect(page).toHaveURL(/chart/i);
        await top250MoviesPage.ClickMovieByTopNumber(parseInt(data.TopNumber));

        await expect(page).toHaveURL(/title/i);
    });
});