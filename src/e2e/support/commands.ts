// The MIT License (MIT)
//
// Copyright (c) 2022 Camptocamp SA
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

import 'cy-mobile-commands';
import MapBrowserEvent from 'ol/MapBrowserEvent';

// Hook for URL aliases
beforeEach(() => {
  cy.intercept(Cypress.env('serverUrl') + '/login').as('login');
  cy.intercept(Cypress.env('serverUrl') + '/logout').as('logout');
  cy.intercept(Cypress.env('serverUrl') + '/dynamic.json*').as('dynamic_json');
  cy.intercept(Cypress.env('serverUrl') + '/themes*').as('themes');
});

/**
 * This loads the page or reload it.
 *
 * @param {boolean} reload If we reload or load the page.
 * @param {string} url The URL to load.
 */
Cypress.Commands.add('loadPage', (reload = false, url = '/') => {
  reload ? cy.reload() : cy.visit(url as string);
  cy.wait('@dynamic_json', {timeout: 10000}).then((interception) => {
    expect(interception.response.statusCode).to.be.eq(200);
    cy.get('div.loading-mask').should('not.be.visible');
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
    map,
    type,
    x = 0,
    y = 0,
    opt_altKey = false,
    opt_ctrlKey = false,
    opt_shiftKey = false,
    opt_pointerId = 0
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
    };

    const simulatedEvent = new MapBrowserEvent(type, map, event);
    map.handleMapBrowserEvent(simulatedEvent);
  }
);

/**
 * Reads a value from the window
 *
 * @param {string} key The window key to get.
 * @returns {Cypress.Chainable<any>} .
 */
Cypress.Commands.add('readWindowValue', (key) => {
  return cy.window().its(key);
});
