import { test, expect } from './fixtures.js';

const adBanner_text = 'Insight Engine: Built in at the heart of Membrain'

// Every test in this file starts on the Home Page
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.membrain.com/');
});

//
// On the Home Page, the "Insight Engine" banner is shown
////////////////////////////////////////////////////////
test('Insight Engine Banner Shown', async ({ page }) => {
    await expect(page.getByText(adBanner_text)).toBeVisible();
});

//
// When "Insight Engine" banner is clicked, the "Insight Engine" Page is opened
////////////////////////////////////////////////////////
test('Insight Engine Banner Click - Insight Engine Page Opened', async ({page}) => {
    await page.getByText(adBanner_text).click();

    await expect(page).toHaveURL(/insight-engine/);
});

//
// "See How it Thinks" button click opens Insight Engine Page
////////////////////////////////////////////////////////
test('See How it Thinks Button Click - Insight Engine Page Opened', async ({page}) => {
    await page.getByRole('link', { name: 'See how it thinks' }).click();

    await expect(page).toHaveURL(/insight-engine/);
});

//
// "Insight Engine" banner is closed after clicking on x
////////////////////////////////////////////////////////
test('Insight Engine Banner X - Banner Closed', async ({page}) => {
    //Before hiding the banner, verify it's even visible to avoid false positives
    await expect(page.getByText(adBanner_text)).toBeVisible();

    //This is a workaround because the button is missing a locator. An issue BUG-1 is logged.
    const closeButton = page.locator('[onclick="AnnouncementBarClose()"]');
    await closeButton.click();

    await expect(page.getByText(adBanner_text)).toBeHidden();
});

//
// "Insight Engine" banner not shown after page reload if the User closed it 
////////////////////////////////////////////////////////
test('Insight Engine Banner Closed - Banner Not Shown After Page Reload', async ({page}) => {
    //Before hiding the banner, verify it's even visible to avoid false positives
    await expect(page.getByText(adBanner_text)).toBeVisible();

    //This is a workaround because the button is missing a locator. An issue BUG-1 is logged.
    const closeButton = page.locator('[onclick="AnnouncementBarClose()"]');
    await closeButton.click();

    await expect(page.getByText(adBanner_text)).toBeHidden();
    await page.reload();

    await expect(page.getByText(adBanner_text)).toBeHidden();
});
