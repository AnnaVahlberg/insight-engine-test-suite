import { test, expect } from './fixtures.js';

// Every test in this file starts on Insight Engine page
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.membrain.com/insight-engine');
});

//
// "See Insight Engine - Button Visible"
////////////////////////////////////////////////////////
test('See Insight Engine - Button Visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'See Insight Engine' })).toBeVisible();
});

//
// "Watch Launch Webinar - Button Visible"
////////////////////////////////////////////////////////
test('Watch Launch Webinar - Button Visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Watch Launch Webinar' })).toBeVisible();
});

//
// On "See Insight Engine" button click the Demo Booking Page opened
////////////////////////////////////////////////////////
test('"See Insight Engine" Button Click - Demo Booking Page opened ', async ({ page }) => {
    await page.getByRole('link', { name: 'See Insight Engine' }).click();
    await expect(page).toHaveURL(/see-membrain/);
});

//
// On "Connect With Us" button click the Demo Booking Page opened
////////////////////////////////////////////////////////
test('"Connect With Us" Button Click - Demo Booking Page opened ', async ({ page }) => {
    await page.getByRole('link', { name: 'Connect With Us' }).click();
    await expect(page).toHaveURL(/see-membrain/);
});

//
// "Watch Launch Webinar" button click - Webinar Recording Page opened
////////////////////////////////////////////////////////
test('"Watch Launch Webinar" Button Click - Webinar Recording Page Opened', async ({ page }) => {
    await page.getByRole('link', { name: 'Watch Launch Webinar' }).click();
    await expect(page).toHaveURL(/webinar-recording-insight-engine-launch/);
});

//
// Comparison Table Visible with Headers
////////////////////////////////////////////////////////
test('Comparison Table Visible', async ({ page }) => {
    await expect(page.locator('.ComparisonTable')).toBeVisible();

    const header = page.locator('.ComparisonHeader');
    await expect(header).toContainText('Basic');
    await expect(header).toContainText('Plus');
});

//
// Proactive Insights "Learn More"  - Button Visible
////////////////////////////////////////////////////////
test('Proactive Insights "Learn More"  - Button Visible', async ({ page }) => {
    const learnMore = page.locator('a[href*="/insight-engine/proactive-insights"]', { hasText: 'Learn More' });
    await expect(learnMore).toBeVisible();
});

//
// Proactive Insights "Learn More" - Button Click - Proactive Insights Page Opened
////////////////////////////////////////////////////////
test('Proactive Insights "Learn More" - Page Opened', async ({ page }) => {
    const learnMore = page.locator('a[href*="/insight-engine/proactive-insights"]', { hasText: 'Learn More' });
    await learnMore.click();
    await expect(page).toHaveURL(/insight-engine\/proactive-insights/);
});

//
//Data Enrichment "Learn More"  - Button Visible
////////////////////////////////////////////////////////
test('Data Enrichment "Learn More"  - Button Visible', async ({ page }) => {
    const learnMore = page.locator('a[href*="/insight-engine/data-enrichment"]', { hasText: 'Learn More' });
    await expect(learnMore).toBeVisible();
});

//
// Data Enrichment "Learn More" - Button Click - Data Enrichment Page Opened
////////////////////////////////////////////////////////
test('Data Enrichment "Learn More" - Page Opened', async ({ page }) => {
    const learnMore = page.locator('a[href*="/insight-engine/data-enrichment"]', { hasText: 'Learn More' });
    await learnMore.click();
    await expect(page).toHaveURL(/insight-engine\/data-enrichment/);
});

//
// Membrain AI "Learn More"  - Button Visible
////////////////////////////////////////////////////////
test('Membrain AI "Learn More"  - Button Visible', async ({ page }) => {
    const learnMore = page.locator('a[href*="/insight-engine/membrain-ai"]', { hasText: 'Learn More' });
    await expect(learnMore).toBeVisible();
});

//
// Membrain AI "Learn More" - Button Click - Membrain AI Page Opened
////////////////////////////////////////////////////////
test('Membrain AI "Learn More" - Page Opened', async ({ page }) => {
    const learnMore = page.locator('a[href*="/insight-engine/membrain-ai"]', { hasText: 'Learn More' });
    await learnMore.click();
    await expect(page).toHaveURL(/insight-engine\/membrain-ai/);
});


