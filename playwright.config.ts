import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['html', { open: 'never' }],
        ['list']
    ],

    use: {
        baseURL: 'https://www.imdb.com',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: true,
    },

    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
            use: {
                ...devices['Desktop Chrome'],
                headless: false,
            },
        },

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'playwright/.auth/imdb.json',
            },
            dependencies: ['setup'],
        },
    ],
});