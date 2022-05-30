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

import {and} from 'ol/format/filter';

describe('Mobile interface', () => {
  /**
   * Layout tests
   */
  context.skip('Layout', () => {
    it('should check the layout', () => {
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/mobile.html?lang=en');

      // Left menu button
      cy.get('.gmf-mobile-nav-left-trigger').should('be.visible');
      // Right menu button
      cy.get('.gmf-mobile-nav-right-trigger').should('be.visible');
      // Search field
      cy.get('.tt-input').should('be.visible');
      // Zoom in button
      cy.get('.ol-zoom-in').should('be.visible');
      // Zoom out button
      cy.get('.ol-zoom-out').should('be.visible');
      // Geolocation button
      cy.get('[ngeo-geolocation=""]').should('be.visible');
      // Scalebar
      cy.get('.ol-scale-line-inner').should('be.visible');
    });

    it('should zoom in and out', () => {
      cy.get('.ol-zoom-in').click();
      cy.get('.ol-scale-line-inner').should('contain.html', '1000 m');
      cy.wait(350);
      cy.get('.ol-zoom-out').click();
      cy.get('.ol-scale-line-inner').should('contain.html', '2 km');
      cy.wait(350);
    });

    it('should navigate the left menu', () => {
      // Open the panel, then check the panel title
      cy.get('.gmf-mobile-nav-left-trigger').click();
      cy.wait(350);
      cy.get('.gmf-mobile-nav-left > header > .gmf-mobile-nav-header-title').should('contain.html', 'Data');

      // Check button 'background' and 'themes'
      cy.get('.gmf-mobile-nav-active > :nth-child(1) > :nth-child(1) > .gmf-mobile-nav-button').should(
        'contain.html',
        'Background'
      );
      cy.get('.gmf-mobile-nav-active > :nth-child(1) > :nth-child(2) > .gmf-mobile-nav-button').should(
        'contain.html',
        'Themes'
      );

      // Check the layertree content
      cy.get('ul#gmf-layertree-layer-group-75').should('not.be.empty');

      // Test the submenu
      cy.get(
        '.gmf-mobile-nav-left > .gmf-mobile-nav-active > :nth-child(1) > :nth-child(1) > .gmf-mobile-nav-button'
      ).click();
      cy.wait(350);
      cy.get('.gmf-mobile-nav-left > header > .gmf-mobile-nav-go-back').click();
      cy.wait(350);

      // Close the panel
      cy.get('.overlay').click(300, 300, {force: true});
      cy.wait(350);
    });

    it('should navigate the right menu', () => {
      // Open the panel, then check the panel title
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.wait(350);
      cy.get('.gmf-mobile-nav-right > header > .gmf-mobile-nav-header-title').should('contain.html', 'Tools');

      // Test the submenu
      cy.get('[data-target="#measure-tools"]').click();
      cy.wait(350);
      cy.get('.gmf-mobile-nav-right > header > .gmf-mobile-nav-go-back').click();
      cy.wait(350);

      // Close the panel
      cy.get('.overlay').click(300, 300, {force: true});
      cy.wait(350);
    });

    it.skip('should close with swipe', () => {
      // FIXME: https://www.npmjs.com/package/cy-mobile-commands for swiping ?
    });
  });

  /**
   * Layertree tests
   */
  context.skip('Layertree', () => {
    it('should test layer opacity settings', () => {
      cy.get('.gmf-mobile-nav-left-trigger').click();
      cy.wait(350);

      // Disable 'Layers-exclusive' layer
      cy.get('div.gmf-layertree-node-597 > .gmf-layertree-name').click();

      // Open opacity setting of the 'Layers' group
      cy.get(
        'div.gmf-layertree-node-596 > .gmf-layertree-right-buttons > .gmf-layertree-node-menu-btn > .fa'
      ).click();
      cy.wait(50);

      // Set the opacity to 0.4 and check the value
      cy.get('div.gmf-layertree-node-menu-596 > div > .input-action')
        .invoke('val', 0.4)
        .trigger('change')
        .then((slider) => {
          cy.wrap(slider).should('contain.value', 0.4);
          cy.wrap(slider).should('not.contain.value', 1);
        });

      // Close the panel
      cy.get('.overlay').click(300, 300, {force: true});
      cy.wait(350);
    });
  });

  /**
   * Geolocation tests
   */
  context.skip('Geolocation', () => {
    it('should show the current location', () => {
      cy.get('[ngeo-geolocation=""]').click();
      // TODO: assert on active geolocation
      cy.wait(250);
    });

    it('should move the map then get back to the current location', () => {
      cy.readWindowValue('map').then((map) => {
        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 60, 0);
        cy.simulateEvent(map, 'pointerdrag', 60, 0);
        cy.simulateEvent(map, 'pointermove', 120, 0);
        cy.simulateEvent(map, 'pointerdrag', 120, 0);
        cy.simulateEvent(map, 'pointerup', 120, 0);
      });
      cy.wait(500);

      cy.get('[ngeo-geolocation=""]').click();
      // TODO: assert on active geolocation
    });

    it('should disable the geolocation tool', () => {
      cy.get('[ngeo-geolocation=""]').click();
      // TODO: assert on unactive geolocation
      cy.wait(250);
    });
  });

  /**
   * Map tests
   */
  context.skip('Map', () => {
    it('should rotate the map and put it back to north heading', () => {
      cy.readWindowValue('map').then((map) => {
        // Rotate the map
        cy.simulateEvent(map, 'pointerdown', 0, 0, true, false, true);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 60, 60);
        cy.simulateEvent(map, 'pointerdrag', 60, 60);
        cy.simulateEvent(map, 'pointermove', 120, 120);
        cy.simulateEvent(map, 'pointerdrag', 120, 120);
        cy.simulateEvent(map, 'pointerup', 120, 120);

        cy.wait(250);

        // Check the rotation is correct
        cy.get('.ol-compass').should('have.attr', 'style', 'transform: rotate(0.785398rad);');

        cy.wait(250);

        // Reset the rotation
        cy.get('.ol-rotate-reset').click({force: true});
      });
    });
  });

  /**
   * Fulltext Search tests
   */
  context.skip('FTS', () => {
    it('should check the FTS appearance', () => {
      // Check the placeholder
      cy.get('.tt-input').should('have.attr', 'placeholder', 'Search…');
    });

    it('should search on a word', () => {
      cy.get('.tt-input').type('Lu');

      // Check the clear button
      const clearBtn = Cypress.$('span.gmf-clear-button');
      cy.wrap(clearBtn).then((btn) => {
        expect(btn).to.have.css('width', '0px');
        expect(btn).to.have.css('height', '40px');
      });

      cy.get('.tt-input').type('g');

      // Check the suggestions menu and select the first result
      const suggestions = Cypress.$('.tt-menu > .tt-dataset-1');
      cy.wrap(suggestions).should('be.visible');

      cy.wait(250);

      cy.wrap(suggestions).click(125, 50);

      cy.wait(250);
    });

    it('clear the field and keep the result visible', () => {
      // Clear the field
      cy.get('.tt-input').clear();

      // Check the clear button and the placeholder
      const clearBtn = Cypress.$('span.gmf-clear-button');
      cy.wrap(clearBtn).then((btn) => {
        expect(btn).to.have.css('width', '0px');
        expect(btn).to.have.css('height', '40px');

        // Check the placeholder
        cy.get('.tt-input').should('have.attr', 'placeholder', 'Search…');
      });
    });

    it('close the search with the cross button', () => {
      const clearBtn = Cypress.$('span.gmf-clear-button');
      cy.wrap(clearBtn).then((btn) => {
        cy.wrap(btn)
          .click({force: true})
          .then((btn) => {
            expect(btn).to.not.be.visible;

            // Check the placeholder
            cy.get('.tt-input').should('have.attr', 'placeholder', 'Search…');
          });
      });
    });

    it('search and change the result', () => {
      cy.get('.tt-input').type('Lausanne');

      // Check the suggestions menu
      const suggestions = Cypress.$('.tt-menu > .tt-dataset-1');
      cy.wrap(suggestions).should('be.visible');

      cy.wait(200);

      // Click on 'Lausanne';
      cy.wrap(suggestions).click(125, 50);

      // Wait for map recenter
      cy.wait(400);

      cy.get('.tt-input').focus();

      // Click on 'Le-Mont-sur-Lausanne';
      cy.wrap(suggestions).click(125, 150);

      // Wait for map recenter
      cy.wait(400);

      // Close the search
      const clearBtn = Cypress.$('span.gmf-clear-button');
      cy.wrap(clearBtn).then((btn) => {
        cy.wrap(btn).click({force: true});
      });
    });

    it.skip('zoom out and pan on the result', () => {
      // FIXME: pan and move
    });

    it('search for "OSM open"', () => {
      // Add OSM open with search 'open'
      cy.get('.tt-input').type('open');

      // Check the suggestions menu and click on 'OSM open';
      const suggestions = Cypress.$('.tt-menu > .tt-dataset-4');
      cy.wrap(suggestions).should('be.visible');
      cy.wrap(suggestions).click(125, 50);

      // Remove 'OSM open' from the layertree
      cy.get('.gmf-mobile-nav-left-trigger')
        .click()
        .then(() => {
          cy.get('div.gmf-layertree-node-68 > .gmf-layertree-right-buttons > a > .fa').click();
          cy.get('.overlay').click();
        });

      // Re-add it from the previous search with focus
      cy.get('.tt-input').focus();
      cy.wrap(suggestions).click(125, 50);

      // Remove 'OSM open' from the layertree
      cy.get('.gmf-mobile-nav-left-trigger')
        .click()
        .then(() => {
          cy.get('div.gmf-layertree-node-68 > .gmf-layertree-right-buttons > a > .fa').click();
          cy.get('.overlay').click();
        });

      // Re-add it with search 'searchalias'
      cy.get('.tt-input').clear();
      cy.get('.tt-input').type('searchalias');
      cy.wrap(suggestions).click(125, 50);

      // Remove 'OSM open' from the layertree
      cy.get('.gmf-mobile-nav-left-trigger')
        .click()
        .then(() => {
          cy.get('div.gmf-layertree-node-68 > .gmf-layertree-right-buttons > a > .fa').click();
          cy.get('.overlay').click();
        });
    });
  });

  context.skip('Measures', () => {
    beforeEach(() => {
      cy.loadPage(
        false,
        'https://localhost:3000/contribs/gmf/apps/mobile.html?lang=en?map_x=2632464&map_y=1185457'
      );
    });
    it.skip('Activate coordinate tool', () => {
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('[data-target="#measure-tools"]').click();
      cy.get('#measure-tools > ul > :nth-child(1) > .gmf-mobile-nav-button').click();

      cy.get('.tooltip').should('be.visible');

      cy.wait(350);

      // Close the tool
      cy.get('[gmf-mobile-measurepoint=""] > .btn').click();

      cy.wait(350);
    });

    it.skip('Coordinate tool and pan', () => {
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('[data-target="#measure-tools"]').click();
      cy.get('#measure-tools > ul > :nth-child(1) > .gmf-mobile-nav-button').click();

      cy.get('.tooltip').should('be.visible');
      cy.get('.tooltip').then((tooltip) => {
        expect(tooltip)
          .to.have.prop('textContent')
          .to.match(/2,632,464, 1.185,457/gm);
      });

      cy.wait(350);

      cy.readWindowValue('map').then((map) => {
        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 60, 0);
        cy.simulateEvent(map, 'pointerdrag', 60, 0);
        cy.simulateEvent(map, 'pointermove', 120, 0);
        cy.simulateEvent(map, 'pointerdrag', 120, 0);
        cy.simulateEvent(map, 'pointerup', 120, 0);

        cy.wait(500);

        cy.get('.tooltip').then((tooltip) => {
          // Check on a Regex because coordinates could differs
          expect(tooltip)
            .to.have.prop('textContent')
            .to.match(/2,62[3-6],[0-9]{3}, 1.185,457/gm);
          cy.wait(1000);
        });

        // Close the tool
        cy.get('[gmf-mobile-measurepoint=""] > .btn').click();

        cy.wait(350);
      });
    });

    it.skip('Length tool', () => {
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('[data-target="#measure-tools"]').click();
      cy.get('#measure-tools > ul > :nth-child(2) > .gmf-mobile-nav-button').click();
      // TODO: assert on the map cross

      cy.wait(300);

      cy.readWindowValue('map').then((map) => {
        cy.log('Set a starting point');
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').click();
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').should('not.exist');

        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 120, 0);
        cy.simulateEvent(map, 'pointerdrag', 120, 0);
        cy.simulateEvent(map, 'pointerup', 120, 0);

        cy.wait(500);

        cy.log('First segment done');
        cy.get('[ng-if="ctrl.dirty"]').click();
        cy.wait(500);

        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 60);
        cy.simulateEvent(map, 'pointerdrag', 0, 60);
        cy.simulateEvent(map, 'pointerup', 0, 60);

        cy.wait(500);

        cy.log('Second segment done');
        cy.get('[ng-if="ctrl.dirty"]').click();

        cy.get('.tooltip').then((tooltip) => {
          // Check on a Regex because length could differs
          expect(tooltip)
            .to.have.prop('textContent')
            .to.match(/\d+[.]*\d*\s\w+/g);
        });

        cy.wait(500);

        cy.log('Terminate the line');
        cy.get('[ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty"]').click();
        cy.get('[ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty"]').should('not.exist');
        cy.get('.tooltip').should('have.css', 'background-color', 'rgb(255, 204, 51)');

        cy.log('Clear the line');
        cy.get('[ng-if="ctrl.valid"]').click();
        cy.get('.tooltip').should('not.be.visible');

        cy.log('Close the tool');
        cy.get('[ng-if="ctrl.active"]').click();
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').should('not.exist');
        cy.get('[ng-if="ctrl.active"]').should('not.exist');
        cy.get('[ng-if="ctrl.valid"]').should('not.exist');
      });
    });

    it('Area tool', () => {
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('[data-target="#measure-tools"]').click();
      cy.get('#measure-tools > ul > :nth-child(3) > .gmf-mobile-nav-button').click();
      // TODO: assert on the map cross

      cy.wait(300);

      cy.readWindowValue('map').then((map) => {
        cy.log('Set a starting point');
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').click();
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').should('not.exist');

        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 120, 0);
        cy.simulateEvent(map, 'pointerdrag', 120, 0);
        cy.simulateEvent(map, 'pointerup', 120, 0);

        cy.wait(500);

        cy.log('First segment done');
        cy.get('[ng-if="ctrl.dirty"]').click();

        cy.log('Area is null with only one segment');
        cy.contains('0 m²').should('exist');

        cy.wait(500);

        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 60);
        cy.simulateEvent(map, 'pointerdrag', 0, 60);
        cy.simulateEvent(map, 'pointerup', 0, 60);

        cy.wait(500);

        cy.log('Second segment done');
        cy.get('[ng-if="ctrl.dirty"]').click();

        cy.get('.tooltip').then((tooltip) => {
          // Check on a Regex because length could differs
          expect(tooltip)
            .to.have.prop('textContent')
            .to.match(/\d+[.]*\d*\s\w+[²]/gm);
        });

        cy.wait(500);

        cy.log('Terminate the line');
        cy.get('[ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty"]').click();
        cy.get('[ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty"]').should('not.exist');
        cy.get('.tooltip').should('have.css', 'background-color', 'rgb(255, 204, 51)');

        cy.log('Clear the line');
        cy.get('[ng-if="ctrl.valid"]').click();
        cy.get('.tooltip').should('not.be.visible');

        cy.log('Close the tool');
        cy.get('[ng-if="ctrl.active"]').click();
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').should('not.exist');
        cy.get('[ng-if="ctrl.active"]').should('not.exist');
        cy.get('[ng-if="ctrl.valid"]').should('not.exist');
      });
    });
  });

  /**
   * Login tests
   */
  context('Login', () => {
    it('Should log in and out', () => {
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/mobile.html?lang=en');

      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('[data-target="#login"]').click();

      cy.get('#login')
        .shadow()
        .then((authPanel) => {
          cy.wrap(authPanel).find('input[name="login"]').type(Cypress.env('demoUser')['login']);
          cy.wrap(authPanel).find('input[name="password"]').type(Cypress.env('demoUser')['password']);
          cy.wrap(authPanel).find('input[type="submit"]').click();
          cy.wait('@login').then((interception) => {
            expect(interception.response.statusCode).to.be.eq(200);
            const responseBody = JSON.parse(interception.response.body);
            expect(responseBody.username).to.be.eq(Cypress.env('demoUser')['login']);
          });
        });

      cy.log('Check that the auth panel is closed when logged');
      cy.get('#login').should('not.be.visible');

      cy.log('Check the login panel when logged');
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('#login')
        .shadow()
        .then((authPanel) => {
          cy.wrap(authPanel).find('div > strong').should('have.text', Cypress.env('demoUser')['login']);
          cy.wrap(authPanel).find('input[value="Change password"]').should('be.visible');
          cy.wrap(authPanel).find('input[value="Logout"]').should('be.visible');

          cy.log('Log out and get back on the auth panel');
          cy.wrap(authPanel).find('input[value="Logout"]').click();
          cy.wait('@logout').then((interception) => {
            expect(interception.response.statusCode).to.be.eq(200);
            expect(interception.response.body).to.be.eq('true');
          });

          cy.log('Not logged with panel open');
          cy.get('#login').should('be.visible');

          cy.log('Close the login panel');
          cy.get('.overlay').click();
        });
    });
  });
});

describe('Mobile_alt interface', () => {
  /**
   * Layertree tests
   */
  context('Layertree', () => {
    it.skip('should test no flush layertree (desktop_alt)', () => {
      // TODO: load desktop_alt
    });
  });
});
