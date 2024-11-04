#!/usr/bin/env node

// The MIT License (MIT)
//
// Copyright (c) 2014-2024 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

const path = require('path');
const URL = require('url');
const fs = require('fs');
const puppeteer = require('puppeteer');

const arg = process.argv[2];
if (!arg) {
  throw new Error('Please provide a HTML file as the first argument');
}
const screenshot = !arg.startsWith('http');
const screenshotPath = screenshot ? `${arg}.png` : undefined;
const page_url = screenshot ? `http://localhost:3001/${arg}` : arg;

/**
 * @param name
 * @param contentType
 */
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
  };
}

const OSMImage = fileMock('osm.png', 'image/png');
const ASITVDCapabilities = fileMock('asitvd.capabilities.xml', 'text/xml');
const SgxCapabilities = fileMock('sgx.capabilities.xml', 'text/xml');

process.on('unhandledRejection', async (reason, promise) => {
  console.log('UnhandledRejection: ', promise, 'reason:', reason);
  process.exit(2);
});

const requestsURL = new Set();
const start = new Date();
let timeout = undefined;
/**
 * @param page
 * @param browser
 */
function loaded(page, browser) {
  if (timeout !== undefined) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(async () => {
    if (requestsURL.size) {
      if (new Date() - start > 60000) {
        console.log(`The page take more than 60s. to load (${(new Date() - start) / 1000}).`);
        console.log('Pending requests:');
        requestsURL.forEach((request) => console.log(request));
        process.exit(2);
      } else {
        timeout = undefined;
        loaded(page, browser);
      }
    } else {
      console.log(`Check finished in ${(new Date() - start) / 1000} seconds`);
      if (screenshot) {
        timeout = setTimeout(async () => {
          page
            .screenshot({
              path: screenshotPath,
            })
            .then(
              async () => {
                console.log(`Screenshot saved at: ${screenshotPath}`);
                process.exit();
              },
              async (e) => {
                console.log(`Screenshot error: ${e}`);
                process.exit(2);
              },
            );
        }, 1000);
      } else {
        process.exit();
      }
    }
  }, 500);
}
(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-web-security', '--single-process', '--enable-unsafe-swiftshader'],
    headless: true,
    // Don't store the user data
    userDataDir: '/dev/null',
  });
  process.on('exit', (code) => {
    console.log('Closing browser');
    browser.close();
  });
  const page = await browser.newPage();

  await page.setViewport({width: 900, height: 1080});
  await page.setRequestInterception(true);
  page.on('pageerror', async (e) => {
    console.log('Page error');
    console.log(e);
    process.exit(2);
  });
  page.on('dialog', async (e) => {
    console.log('Unexpected alert message');
    console.log(e);
    process.exit(2);
  });
  page.on('request', (request) => {
    const originalUrl = request.url();
    if (process.env.CI != 'true') {
      loaded(page, browser);
    }
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
      request.continue({
        url,
      });
      return;
    }
    if (url.startsWith('http://localhost:8080/')) {
      url = url.replace('http://localhost:8080/', 'https://geomapfish-demo-2-9.camptocamp.com/');
    }
    if (url == 'https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml') {
      request.respond(ASITVDCapabilities);
    } else if (
      /^https:\/\/[0-9-]*(-test)?\.geomapfish-demo\.[0-9a-z-.]*\.camptocamp\.com\/static-geomapfish\/[0-9a-f]*\/locales\/en.json/.test(
        url,
      )
    ) {
      request.respond('{}');
    } else if (url.startsWith('https://cdn-icons-png.flaticon.com/512/3428/3428903.png')) {
      request.respond(OSMImage);
    } else if (url == 'https://sgx.geodatenzentrum.de/wmts_basemapde/1.0.0/WMTSCapabilities.xml') {
      request.respond(SgxCapabilities);
    } else if (
      URL.parse(url).host === URL.parse(page_url).host ||
      url.startsWith('http://localhost:') ||
      url.startsWith('https://geomapfish-demo') ||
      url.startsWith('https://wmts.geo.admin.ch/') ||
      url.startsWith('https://wms.geo.admin.ch/')
    ) {
      if (originalUrl.includes('/tiles/') && originalUrl.endsWith('.png')) {
        request.respond(OSMImage);
      } else {
        console.log(originalUrl);
        requestsURL.add(originalUrl);
        if (url.startsWith('https://geomapfish-demo')) {
          request.headers().origin = 'http://localhost:3001';
        }
        console.log(`Request: ${url}`);
        if (url.startsWith('http://localhost:') && url.endsWith('/favicon.ico')) {
          request.respond(OSMImage);
        } else {
          request.continue({
            url,
            headers: {
              // Don't be intranet
              'Forwarded': 'for=8.8.8.8;proto=https',
              'Cache-Control': 'no-cache',
            },
          });
        }
      }
    } else if (
      url.includes('tile.openstreetmap.org') ||
      url.startsWith('https://tiles.openseamap.org/') ||
      url.startsWith('https://wms.geo.admin.ch/') ||
      url.startsWith('https://ows.asitvd.ch/') ||
      url.startsWith('https://ows1.asitvd.ch/') ||
      url.startsWith('https://ows2.asitvd.ch/') ||
      url.startsWith('https://ows3.asitvd.ch/') ||
      url.startsWith('https://ows4.asitvd.ch/')
    ) {
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
    if (process.env.CI != 'true' || !url.includes('/tiles/')) {
      loaded(page, browser);
    }
    if (
      ci &&
      url.startsWith('https://geomapfish-demo') &&
      request.headers()['sec-fetch-mode'] == 'cors' &&
      request.response().headers()['access-control-allow-origin'] == undefined
    ) {
      console.log(`CORS error on: ${url}`);
      console.log('= Request headers');
      for (const n in request.headers()) {
        console.log(`${n}: ${request.headers()[n]}`);
      }
      console.log('= Response headers');
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
  page.on('requestfailed', async (request) => {
    const url = request.url();
    if (
      !url.startsWith('https://www.camptocamp.com/') &&
      !url.startsWith('https://o330647.ingest.sentry.io/') &&
      !url.startsWith('https://maps.googleapis.com/')
    ) {
      console.log(`Request failed on: ${url}`);
      process.exit(2);
    }
    loaded(page, browser);
  });
  page.on('console', async (message) => {
    const type = message.type();
    const location = message.location();
    if (
      !location.url.startsWith('http://localhost:3001/.build/examples-hosted/dist/vendor.js') &&
      location.url.startsWith('http://localhost:3001/')
    ) {
      console.log(`Console ${type}`);
      console.log(`On: ${location.url} ${location.lineNumber}:${location.columnNumber}.`);
      console.log(message.text());
      if (
        !message.text().includes(' GPU ') &&
        !message.text().includes('CORS') &&
        !message.text().includes('Driver Message') &&
        !message.text().includes('JSHandle@error') &&
        !message.text().includes('Password field is not contained in a form') &&
        !message.text().includes('Lit is in dev mode. Not recommended for production!') &&
        !message
          .text()
          .includes('Multiple versions of Lit loaded. Loading multiple versions is not recommended.')
      ) {
        process.exit(2);
      }
    }
  });
  await page.goto(page_url).catch(async (error) => {
    console.log(`Page load error: ${error}.`);
    process.exit(2);
  });
  loaded(page, browser);
})();
