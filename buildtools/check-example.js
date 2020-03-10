'use strict';

const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const parse = require('url-parse');

const arg = process.argv[2];
if (!arg) {
  throw new Error('Please provide a HTML file as the first argument');
}
const screenshot = !arg.startsWith('http');
const screenshotPath = screenshot ? `${arg}.png` : undefined;
const page_url = screenshot ? `http://localhost:3000/${arg}` : arg;

function fileMock(name, contentType) {
  return {
    status: 200,
    headers: {
      'content-type': contentType,
    },
    body: (() => {
      try {
        return fs.readFileSync(path.resolve(__dirname, name));
      } catch (e) {
        // Ignore
        return undefined;
      }
    })(),
  }
}


const OSMImage = fileMock('osm.png', 'image/png');
const ASITVDCapabilities = fileMock('asitvd.capabilities.xml', 'text/xml');
let browser;

process.on('unhandledRejection', async error => {
  console.log(`UnhandledRejection: ${error.message}.`);
  await browser.close();
  process.exit(2);
});

const requestsURL = new Set();
const start = new Date();
let timeout = undefined;
function loaded(page, browser) {
  if (timeout !== undefined) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(async () => {
    if (requestsURL.size) {
      // @ts-ignore
      if ((new Date() - start) > 60000) {
        console.log(`The page take more than 60s. to load (${(new Date() - start) / 1000}).`);
        console.log('Pending requests:');
        requestsURL.forEach((request) => console.log(request));
        await browser.close();
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
        }).then(async () => {
          console.log(`Screenshot saved at: ${screenshotPath}`);
          await browser.close();
        }, async e => {
          console.log(`Screenshot error: ${e}`);
          await browser.close();
          process.exit(2);
        });
      } else {
        await browser.close();
      }
    }
  }, 1000);
}
(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-web-security', '--single-process'],
    headless: true
  });
  const page = await browser.newPage();

  await page.setViewport({width: 1920, height: 1080});
  await page.setRequestInterception(true);
  page.on('pageerror', async e => {
    console.log('Page error');
    console.log(e);
    await browser.close();
    process.exit(2);
  });
  page.on('dialog', async e => {
    console.log('Unexpected alert message');
    console.log(e);
    await browser.close();
    process.exit(2);
  });
  page.on('request', request => {
    loaded(page, browser);
    const originalUrl = request.url();
    let url = originalUrl;
    if (process.env.CI != 'true') {
      if (process.env.HTTP_MAP) {
        const http_map = JSON.parse(process.env.HTTP_MAP);
        for (const key in http_map) {
          if (url.startsWith(key)) {
            url = url.replace(key, http_map[key]);
          }
        }
      }
      requestsURL.add(originalUrl);
      request.continue({
        url
      });
      return
    }

    console.log(url);
    if (url.startsWith('http://localhost:8080/')) {
      url = url.replace('http://localhost:8080/', 'https://geomapfish-demo-2-5.camptocamp.com/');
    }
    if (url == 'https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml') {
      request.respond(ASITVDCapabilities);
    } else if (parse(url).host == parse(page_url).host ||
        url.startsWith('http://localhost:') ||
        url.startsWith('https://geomapfish-demo') ||
        url.startsWith('https://wmts.geo.admin.ch/') ||
        url.startsWith('https://wms.geo.admin.ch/')) {
      requestsURL.add(originalUrl);
      if (url.startsWith('https://geomapfish-demo')) {
        request.headers().origin = 'http://localhost:3000';
      }
      request.continue({
        url,
        // Don't be intranet
        headers: {
          'Forwarded': 'for=8.8.8.8;proto=https'
        }
      });
    } else if (url.includes('tile.openstreetmap.org') ||
        url.startsWith('https://tiles.openseamap.org') ||
        url.startsWith('https://wms.geo.admin.ch') ||
        url.startsWith('https://ows.asitvd.ch') ||
        url.startsWith('https://ows1.asitvd.ch') ||
        url.startsWith('https://ows2.asitvd.ch') ||
        url.startsWith('https://ows3.asitvd.ch') ||
        url.startsWith('https://ows4.asitvd.ch') ) {
      request.respond(OSMImage);
    } else {
      console.log(`Abort request on '${url}'`);
      request.abort('failed');
    }
  });
  page.on('requestfinished', async (request) => {
    const ci = process.env.CI == 'true';
    const url = request.url();
    requestsURL.delete(url);
    loaded(page, browser);
    if (ci && url.startsWith('https://geomapfish-demo') &&
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
    }
  });
  page.on('requestfailed', async request => {
    const url = request.url();
    if (!url.startsWith('https://www.camptocamp.com/') &&
        !url.startsWith('https://cdn.polyfill.io/') &&
        !url.startsWith('https://maps.googleapis.com/')) {
      console.log(`Request failed on: ${url}`);
      await browser.close();
      process.exit(2);
    }
    loaded(page, browser);
  });
  page.on('console', async message => {
    const type = message.type();
    const location = message.location();
    if (!location.url.startsWith('http://localhost:3000/.build/examples-hosted/dist/vendor.js') &&
      location.url.startsWith('http://localhost:3000/')
    ) {
      console.log(`Console ${type}`);
      console.log(`On: ${location.url} ${location.lineNumber}:${location.columnNumber}.`);
      console.log(message.text());
      if (!message.text().includes('CORS')) {
        await browser.close();
        process.exit(2);
      }
    }
  });
  await page.goto(page_url).catch(async error => {
    console.log(`Page load error: ${error}.`);
    await browser.close();
    process.exit(2);
  });
  loaded(page, browser);
})().catch(async error => {
  console.log(`Unexpected error: ${error}.`);
  await browser.close();
  process.exit(2);
});
