import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { MovieDetailsPage } from '../pages/MovieDetailsPage';
import { readCSV } from '../utils/csvReader';

const searchMovieData = readCSV('src/utils/testData/searchMovieData.csv');

searchMovieData.forEach((data:any) => {
    if (data.ShouldRun !== 'true') return;

    test(`${data.TestCaseId} - Search and validate a movie Test - ${data.MovieTitle}`, async ({ page }) => {
        const homePage = new HomePage(page);
        const searchResultsPage = new SearchResultsPage(page);
        const movieDetailsPage = new MovieDetailsPage(page);

        const movieTitle = data.MovieTitle;

        await homePage.navigate();
        await homePage.searchMovie(movieTitle);
        await searchResultsPage.selectMovie(movieTitle);

        await expect(movieDetailsPage.movieTitle)
            .toContainText(movieTitle);
    });
});