// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Tests run against the live site, so allow a retry locally too. Tests that pass on retry are reported as "flaky". */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Progress in the terminal, plus an HTML report that doesn't open automatically. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Keep the trace for failed tests. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

    /* Capture a screenshot when a test fails. */
    screenshot: 'only-on-failure',

    /* Fail slow page loads and stuck actions with a clear error instead of a generic test timeout. */
    navigationTimeout: 30_000,
    actionTimeout: 10_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        /* Playwright's WebKit on Windows doesn't trust the "SSL.com TLS RSA Root CA 2022" root used by
           go.membrain.com, so the booking calendar iframe never loads. Chromium/Firefox still check certificates. */
        ignoreHTTPSErrors: true,
      },
    },

    /* Test against a mobile viewport. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
