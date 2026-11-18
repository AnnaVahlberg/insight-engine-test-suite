import { test, expect } from './fixtures.js';

// Every test in this file starts on Webinar page
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.membrain.com/webinar-recording-insight-engine-launch');
});

//
// Webinar Video Thumbnail is shown
////////////////////////////////////////////////////////

test('Webinar Video Thumbnail is shown', async ({ page }) => {
    const videoThumbnail = page.locator('img[onclick*="WistiaPopOver(\'21g9hk4fyu\')"]');
    await expect(videoThumbnail).toBeVisible();
    await expect(videoThumbnail).toHaveAttribute('src', /thumbnailinsightenginelaunch/);
});

//
// Thumbnail Click starts the Video
////////////////////////////////////////////////////////

test('Thumbnail Click starts the Video', async ({ page }) => {
    const videoThumbnail = page.locator('img[onclick*="WistiaPopOver(\'21g9hk4fyu\')"]');
    await videoThumbnail.click();

    await expect(page.locator('#wistiaPopOver')).toBeVisible();

    const videoPlayer = page.locator('iframe#wistiaIframe');
    await expect(videoPlayer).toBeVisible();
}); 

//
// "Book a Meeting" button is shown
////////////////////////////////////////////////////////
test('"Book a Meeting" button is shown', async ({ page }) => {
    const bookMeetingButton = page.getByRole('link', { name: 'Book a Meeting' });
    await expect(bookMeetingButton).toBeVisible();
    await expect(bookMeetingButton).toHaveAttribute('href', /see-membrain/);
});

//
// "Book a Meeting" button click opens the Demo Booking Page
////////////////////////////////////////////////////////
test('"Book a Meeting" button click opens the Demo Booking Page', async ({ page }) => {
    const bookMeetingButton = page.getByRole('link', { name: 'Book a Meeting' });
    await bookMeetingButton.click();
    await expect(page).toHaveURL(/see-membrain/);
});


