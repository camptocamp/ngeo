// The MIT License (MIT)
//
// Copyright (c) 2022-2025 Camptocamp SA
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

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cy-mobile-commands';
import 'cypress-real-events';
import 'cypress-browser-permissions';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import olMap from 'ol/Map';

// Hook for URL aliases
beforeEach(() => {
  cy.intercept(`${Cypress.env('serverUrl')}/login`).as('login');
  cy.intercept(`${Cypress.env('serverUrl')}/logout`).as('logout');
  cy.intercept(`${Cypress.env('serverUrl')}/dynamic.json*`).as('dynamic_json');
  cy.intercept(`${Cypress.env('serverUrl')}/themes*`).as('themes');
  cy.intercept(`${Cypress.env('serverUrl')}/mapserv_proxy*`).as('mapserv_proxy');
  cy.intercept(`${Cypress.env('serverUrl')}/printproxy/capabilities.json*`).as('print_capabilities');
  cy.intercept(`${Cypress.env('serverUrl')}/printproxy/report.pdf`).as('report_pdf');
  cy.intercept(`${Cypress.env('serverUrl')}/profile.json*`).as('profile');
  cy.intercept(`${Cypress.env('serverUrl')}/raster*`).as('raster');
});

/**
 * This loads the page or reload it.
 *
 * @param {boolean} reload If we reload or load the page.
 * @param {string} url The URL to load.
 */
Cypress.Commands.add('loadPage', (reload = false, url = '/') => {
  reload ? cy.reload() : cy.visit(url);
  cy.wait('@dynamic_json', {timeout: 10000}).then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.be.eq(200);
      cy.get('div.loading-mask').should('not.be.visible');
    }
  });
});

/**
 * This function has been taken from the OL draw spec. Simulates a browser event on the map
 * viewport. The client x/y location will be adjusted as if the map were centered at 0,0.
 *
 * @param {olMap} map The map.
 * @param {string} type Event type.
 * @param {number} x Horizontal offset from map center.
 * @param {number} y Vertical offset from map center.
 * @param {boolean} [opt_altKey] Alt key is pressed.
 * @param {boolean} [opt_ctrlKey] Ctrl key is pressed.
 * @param {boolean} [opt_shiftKey] Shift key is pressed.
 * @param {number} [opt_pointerId] Pointer id.
 * @returns {MapBrowserEvent} The simulated event.
 */
Cypress.Commands.add(
  'simulateEvent',
  {prevSubject: false},
  (
    map: olMap,
    type: string,
    x = 0,
    y = 0,
    opt_altKey = false,
    opt_ctrlKey = false,
    opt_shiftKey = false,
    opt_pointerId = 0,
  ) => {
    cy.log(`simulating ${type} at [${x}, ${y}]`);

    const viewport = map.getViewport();

    // calculated in case body has top < 0 (test runner with small window)
    const event = {
      type,
      target: viewport.firstChild,
      clientX: viewport.clientLeft + x + viewport.clientWidth / 2,
      clientY: viewport.clientTop + y + viewport.clientHeight / 2,
      altKey: opt_altKey,
      ctrlKey: opt_ctrlKey,
      shiftKey: opt_shiftKey,
      preventDefault() {},
      pointerType: 'mouse',
      pointerId: opt_pointerId,
      isPrimary: true,
      button: 0,
    } as unknown as UIEvent;

    const simulatedEvent = new MapBrowserEvent(type, map, event);
    map.handleMapBrowserEvent(simulatedEvent);
  },
);

Cypress.Commands.add(
  'simulateDOMEvent',
  {prevSubject: false},
  (element, type, x = 0, y = 0, opt_ctrlKey = false) => {
    cy.log(`simulating DOM event ${type} at [${x}, ${y}]`);
    const event = new PointerEvent(type, {
      clientX: element.clientLeft + x + element.clientWidth / 2,
      clientY: element.clientTop + y + element.clientHeight / 2,
      ctrlKey: opt_ctrlKey,
    });
    element.dispatchEvent(event);
  },
);

Cypress.Commands.add(
  'simulateEventAtCoord',
  {prevSubject: false},
  (
    map: olMap,
    type: string,
    map_x: number,
    map_y: number,
    opt_altKey = false,
    opt_ctrlKey = false,
    opt_shiftKey = false,
    opt_pointerId = 0,
  ) => {
    cy.log(`simulating ${type} at coordinate [${map_x}, ${map_y}]`);
    const viewport = map.getViewport();
    const pixels = map.getPixelFromCoordinate([map_x, map_y]);

    const event = {
      type,
      target: viewport.firstChild,
      clientX: viewport.clientLeft + pixels[0],
      clientY: viewport.clientTop + pixels[1],
      altKey: opt_altKey,
      ctrlKey: opt_ctrlKey,
      shiftKey: opt_shiftKey,
      preventDefault() {},
      pointerType: 'mouse',
      pointerId: opt_pointerId,
      isPrimary: true,
      button: 0,
    } as unknown as UIEvent;
    const simulatedEvent = new MapBrowserEvent(type, map, event);
    map.handleMapBrowserEvent(simulatedEvent);
  },
);

/**
 * Reads a value from the window
 *
 * @param {string} key The window key to get.
 * @returns {Cypress.Chainable<any>} .
 */
Cypress.Commands.add('readWindowValue', (key: string) => {
  return cy.window().its(key);
});
