'use strict';

const path = require('path');
const puppeteer = require('puppeteer');

const arg = process.argv[2];
const screenshotPath = `${arg}.png`;
const url = `http://localhost:3000/${arg}`;
if (!arg) {
  throw new Error('Please provide a HTML file as the first argument');
}

const requestsURL = new Set();
const start = new Date();
let timeout = undefined;
function loaded(page, browser) {
  if (timeout !== undefined) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    if (requestsURL.size) {
      console.log('Pending requests:');
      requestsURL.forEach((request) => console.log(request));
      process.exit(2);
    } else {
      // @ts-ignore
      console.log(`Check finished in ${new Date() - start} seconds`);
      page.screenshot({
        path: screenshotPath
      }).then(() => {
        console.log(`Screenshot saved at: ${screenshotPath}`);
        browser.close();
      }, (e) => {
        console.log(`Screenshot error: ${e}`);
        process.exit(2);
      });
    }
  }, 2000);
}
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1080});
  page.on('load', () => console.log(`Page loaded: ${page.url()}`));
  page.on('pageerror', (e) => {
    console.log('Page error');
    console.log(e);
    process.exit(2);
  });
  page.on('dialog', (e) => {
    console.log('Unexpected alert message');
    console.log(e);
    process.exit(2);
  });
  page.on('request', (request) => {
    const url = request.url();
    requestsURL.add(url);
    loaded(page, browser);
  });
  page.on('requestfinished', (request) => {
    const url = request.url();
    requestsURL.delete(url);
    loaded(page, browser);
  });
  page.on('requestfailed', (request) => {
    const url = request.url();
    requestsURL.delete(url);
    if (url.includes('tile.openstreetmap.org')) {
      console.warn('Ignoring resource error from OpenStreetMap');
    } else if (url.includes('https://maps.googleapis.com/maps/api/js')) {
      console.warn('Ignoring resource error from Google');
    } else if (url.includes('https://csi.gstatic.com/')) {
      console.warn('Ignoring resource error from Google static');
    } else if (url.includes('cdn.polyfill.io')) {
      console.warn('Ignoring resource error from polyfill.io');
    } else {
      console.log(`Request failed on: ${url}`);
      process.exit(2);
    }
    loaded(page, browser);
  });
  page.on('console', (message) => {
    const type = message.type();
    const location = message.location();
    if (type !== 'log' && type !== 'debug' && type !== 'info' && type !== 'warning' &&
      location.url != 'http://localhost:3000/.build/examples-hosted/dist/vendor.js?dev'
    ) {
      console.log(`Console ${type}`);
      console.log(`On: ${location.url} ${location.lineNumber}:${location.columnNumber}.`);
      console.log(message.text());
      process.exit(2);
    }
  });
  await page.goto(url);
  loaded(page, browser);
})();
