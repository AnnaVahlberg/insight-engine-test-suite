import { test, expect } from './fixtures.js'; 

// Every test in this file starts on the See Membrain page
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.membrain.com/see-membrain');
});

//
// Calendar is shown 
////////////////////////////////////////////////////////
test('Calendar is shown', async ({ page }) => {
    // The booking calendar is loaded inside an iframe from go.membrain.com
    const bookingFrame = page.frameLocator('iframe.BookADemoIframe');
    const calendar = bookingFrame.locator('#calendar');
    await expect(calendar).toBeVisible();
});

// 
// Calendar opens Current Month by default 
////////////////////////////////////////////////////////
test('Calendar opens Current Month by default', async ({ page }) => {
    const bookingFrame = page.frameLocator('iframe.BookADemoIframe');
    const today = new Date();
    const currentMonth = today.toLocaleString('en-US', { month: 'long' });
    const calendarHeader = bookingFrame.locator('#calendarHeader');
    await expect(calendarHeader).toContainText(`${currentMonth} ${today.getFullYear()}`);
});

//
// Next Month is shown when "Next" button is clicked
////////////////////////////////////////////////////////
test('Next Month is shown when "Next" button is clicked', async ({ page }) => {
    const bookingFrame = page.frameLocator('iframe.BookADemoIframe');
    const nextButton = bookingFrame.locator('#calendarHeader .ArrowRight');
    await nextButton.click();

    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const nextMonthName = nextMonth.toLocaleString('en-US', { month: 'long' });
    const calendarHeader = bookingFrame.locator('#calendarHeader');
    await expect(calendarHeader).toContainText(`${nextMonthName} ${nextMonth.getFullYear()}`);
});

//
// Time Slot selected - Proceed to Booking 
////////////////////////////////////////////////////////
test('Time Slot selected - Proceed to Booking', async ({ page }) => {
    const bookingFrame = page.frameLocator('iframe.BookADemoIframe');

    // The first day with available times is pre-selected, the test just picks the 1st available
    const firstTimeSlot = bookingFrame.locator('.BookableTime:visible').first();
    const selectedTime = (await firstTimeSlot.innerText()).trim();
    await firstTimeSlot.click();

    // Screens are switched with the "CurrentScreen" class; inactive screens are faded
    await expect(bookingFrame.locator('#formScreen')).toHaveClass(/CurrentScreen/);
    await expect(bookingFrame.locator('#firstScreen')).not.toHaveClass(/CurrentScreen/);

    // The booking form shows the selected time and is ready for input
    await expect(bookingFrame.locator('#formScreenTimeAndDate')).toContainText(selectedTime);
    await expect(bookingFrame.locator('#formScreenDuration')).toHaveText('60 minutes');
    await expect(bookingFrame.locator('#nameInput')).toBeEditable();
    await expect(bookingFrame.locator('#emailAddressInput')).toBeEditable();
    await expect(bookingFrame.locator('#submitButton')).toHaveText(/book demo/i);

});
