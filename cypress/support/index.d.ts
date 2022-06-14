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

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to load a page
     * @example cy.loadPage('https://example.com');
     */
    loadPage(boolean, string): Chainable<Subject>;

    /**
     * Custom command to get a value from the window
     * @example cy.readWindowValue('map');
     */
    readWindowValue(key: string): Chainable<Subject>;

    /**
     * Custom command to simulate an OpenLayers event
     * @example cy.simulateEvent('map');
     */
    simulateEvent(
      map: any,
      type: string,
      x: number,
      y: number,
      opt_altKey?: boolean,
      opt_ctrlKey?: boolean,
      opt_shiftKey?: boolean,
      opt_pointerId?: number
    ): Chainable<Subject>;

    /**
     * Custom command to simulate an OpenLayers event given a 2056 coordinate from the map
     * @example cy.simulateEventAtCoord('map');
     */
    simulateEventAtCoord(
      map: any,
      type: string,
      map_x: number,
      map_y: number,
      opt_altKey?: boolean,
      opt_ctrlKey?: boolean,
      opt_shiftKey?: boolean,
      opt_pointerId?: number
    ): Chainable<Subject>;
  }
}
