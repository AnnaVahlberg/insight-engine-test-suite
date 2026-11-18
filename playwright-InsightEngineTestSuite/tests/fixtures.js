import { test as base, expect } from '@playwright/test';

// Third-party analytics/tracking hosts the tests don't need.
// Blocking them speeds up page loads in every browser, prevents WebKit
// stalling ~20s on these requests, and keeps the HubSpot cookie banner
// (js.hs-banner.com) from covering buttons on small screens.
//
// Do NOT add hosts the tests rely on, e.g. go.membrain.com (booking calendar
// iframe) or wistia.com / wistia.net (webinar video).
const blockedHosts = [
    'googletagmanager.com',
    'google-analytics.com',
    'doubleclick.net',
    'hs-analytics.net',
    'hs-banner.com',
    'hs-scripts.com',
    'hscollectedforms.net',
    'hsadspixel.net',
    'usemessages.com',
    'app.hubspot.com',
    'js.hubspot.com',
    'track.hubspot.com',
    'bat.bing.com',
    'connect.facebook.net',
    'snap.licdn.com',
    'px.ads.linkedin.com',
];

const isBlocked = (url) =>
    blockedHosts.some(host => url.hostname === host || url.hostname.endsWith('.' + host));

export const test = base.extend({
    context: async ({ context }, use) => {
        await context.route(isBlocked, route => route.abort());
        await use(context);
    },
});

export { expect };
