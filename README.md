# IMDb Playwright Automation

This project contains a Playwright-based browser automation suite for IMDb. It is designed to exercise a few representative flows against the public IMDb website using realistic UI interactions and CSV-driven test data.

It focuses on:
- searching for movies
- validating movie detail pages
- navigating to the IMDb Top 250 chart
- persisting a local browser session after a one-time human verification step

## Tech Stack

- TypeScript
- Playwright
- Node.js
- CSV parsing via `csv-parse`

## Project Structure

```text
fortegrp-tech-test/
├── src/
│   ├── pages/
│   │   ├── HomePage.ts
│   │   ├── SearchResultsPage.ts
│   │   ├── MovieDetailsPage.ts
│   │   └── Top250MoviesPage.ts
│   ├── tests/
│   │   ├── auth.setup.ts
│   │   ├── search_movie.spec.ts
│   │   └── top_250_movies.spec.ts
│   └── utils/
│       ├── csvReader.ts
│       └── testData/
│           ├── searchMovieData.csv
│           └── top250MoviesData.csv
├── playwright/
│   └── .auth/
├── playwright.config.ts
├── package.json
├── .gitignore
├── README.md
├── playwright-report/
├── test-results/
├── node_modules/
└── .gitignore
```

## Prerequisites

Before you run the tests, make sure you have:

- Node.js 18 or newer
- npm
- Playwright browsers installed

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

3. If your environment requires it, install OS dependencies:

```bash
npx playwright install-deps
```

## Running the Tests

Run the complete suite:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run the test runner in debug mode:

```bash
npm run test:debug
```

Open the HTML report:

```bash
npm run test:report
```

Run only the Chromium project:

```bash
npm run test:chromium
```

## Test Coverage

The project includes automated checks for:

- movie search flows
- validation of movie title information on details pages
- Top 250 navigation and movie selection by chart position
- CSV-driven test execution using the files in `src/utils/testData`

The CSV files contain a `ShouldRun` column so individual scenarios can be enabled or skipped without modifying code.

## Authentication and Manual Verification

> IMDb Human Verification
>
> IMDb may occasionally display a human verification challenge.
>
> This project does not attempt to bypass or automate CAPTCHA challenges.
>
> For local execution, the Playwright setup project allows the user to complete the verification manually and persists the resulting browser state using Playwright's `storageState`.
>
> The stored authentication/session state is intentionally excluded from source control.

### How local authentication works

The setup project in `src/tests/auth.setup.ts` performs the following:

- opens IMDb in a browser
- waits for the user to complete any manual verification challenge
- saves the resulting session state to `playwright/.auth/imdb.json`

The main browser project in `playwright.config.ts` reuses that saved state via `storageState`, so later runs can continue without redoing the verification step.

This local auth artifact is intentionally ignored by Git and should not be committed.

## Notes

- Playwright generates `test-results` and `playwright-report` artifacts during execution.
- The `playwright/.auth` directory is a local runtime folder and is excluded from version control.
- The project is intended for local validation and demonstration of test automation against IMDb's public website.

## Summary

This repository is a small Playwright automation project that demonstrates automated UI testing against IMDb while respecting IMDb's human-verification requirements and avoiding any CAPTCHA bypass behavior.