'use strict';

const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const arg = process.argv[2];
if (!arg) {
  throw new Error('Please provide a HTML file as the first argument');
}
const screenshot = !arg.startsWith('http');
const screenshotPath = screenshot ? `${arg}.png` : undefined;
const url = screenshot ? `http://localhost:3000/${arg}` : arg;

const OSMImage = (() => {
  try {
    return fs.readFileSync(path.resolve(__dirname, 'osm.png'));
  } catch (e) {
    // Ignore
    return undefined;
  }
})();

process.on('unhandledRejection', error => {
  console.log(`UnhandledRejection: ${error.message}.`);
  process.exit(2);
});

const requestsURL = new Set();
const start = new Date();
let timeout = undefined;
function loaded(page, browser) {
  if (timeout !== undefined) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    if (requestsURL.size) {
      // @ts-ignore
      if ((new Date() - start) > 60000) {
        // The page take more than 60s. to load ...
        console.log('Pending requests:');
        requestsURL.forEach((request) => console.log(request));
        process.exit(2);
      } else {
        timeout = undefined;
        loaded(page, browser);
      }
    } else {
      // @ts-ignore
      console.log(`Check finished in ${(new Date() - start) / 1000} seconds`);
      if (screenshot) {
        page.screenshot({
          path: screenshotPath
        }).then(() => {
          console.log(`Screenshot saved at: ${screenshotPath}`);
          browser.close();
        }, e => {
          console.log(`Screenshot error: ${e}`);
          process.exit(2);
        });
      } else {
        browser.close();
      }
    }
  }, 500);
}
(async () => {
  const browser = await puppeteer.launch({args: ['--disable-web-security']});
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1080});
  await page.setRequestInterception(true);
  page.on('pageerror', e => {
    console.log('Page error');
    console.log(e);
    process.exit(2);
  });
  page.on('dialog', e => {
    console.log('Unexpected alert message');
    console.log(e);
    process.exit(2);
  });
  page.on('request', request => {
    const url = request.url();
    loaded(page, browser);
    if (url.startsWith('http://localhost:3000/') ||
        url.startsWith('https://geomapfish-demo-2-5.camptocamp.com/') ||
        url.startsWith('https://wms.geo.admin.ch/')) {
      requestsURL.add(url);
      if (url.startsWith('https://geomapfish-demo-2-5.camptocamp.com/')) {
        request.headers().origin = 'http://localhost:3000';
      }
      request.continue({
        headers: request.headers()
      });
    } else if (url.includes('tile.openstreetmap.org')) {
      request.respond({
        status: 200,
        headers: {
          'content-type': 'image/png',
        },
        body: OSMImage,
      });
    } else {
      request.abort();
    }
  });
  page.on('requestfinished', async (request) => {
    const url = request.url();
    requestsURL.delete(url);
    loaded(page, browser);
    if (url.startsWith('https://geomapfish-demo-2-5.camptocamp.com/') &&
        request.headers()['sec-fetch-mode'] == 'cors' &&
        request.response().headers()['access-control-allow-origin'] == undefined) {
      console.log(`CORS error on: ${url}`);
      console.log("= Request headers");
      for (const n in request.headers()) {
        console.log(`${n}: ${request.headers()[n]}`);
      }
      console.log("= Response headers");
      const response = request.response();
      for (const n in response.headers()) {
        console.log(`${n}: ${response.headers()[n]}`);
      }
      if (response.headers()['content-type'] == 'text/html') {
        const text = await response.text();
        console.log('= Response body');
        console.log(text);
      }
      process.exit(2);
    }
  });
  page.on('requestfailed', request => {
    const url = request.url();
    if (url.startsWith('http://localhost:3000/') ||
        url.startsWith('https://geomapfish-demo-2-5.camptocamp.com/') ||
        url.startsWith('https://wms.geo.admin.ch/')) {
      console.log(`Request failed on: ${url}`);
      process.exit(2);
    }
    loaded(page, browser);
  });
  page.on('console', message => {
    const type = message.type();
    const location = message.location();
    if (!location.url.startsWith('http://localhost:3000/.build/examples-hosted/dist/vendor.js') &&
      location.url.startsWith('http://localhost:3000/')
    ) {
      console.log(`Console ${type}`);
      console.log(`On: ${location.url} ${location.lineNumber}:${location.columnNumber}.`);
      console.log(message.text());
      if (!message.text().includes('CORS')) {
        process.exit(2);
      }
    }
  });
  await page.goto(url).catch(error => {
    console.log(`Page load error: ${error}.`);
    process.exit(2);
  });
  loaded(page, browser);
})().catch(error => {
  console.log(`Unexpected error: ${error}.`);
  process.exit(2);
});
