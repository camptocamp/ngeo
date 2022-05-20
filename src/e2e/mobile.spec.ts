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

import exp from 'constants';

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
      cy.get('#gmf-layertree-node-212 > .gmf-layertree-name').click();

      // Open opacity setting of the 'Layers' group
      cy.get(
        '#gmf-layertree-node-208 > .gmf-layertree-right-buttons > .gmf-layertree-node-menu-btn > .fa'
      ).click();
      cy.wait(50);

      // Set the opacity to 0.4 and check the value
      cy.get('#gmf-layertree-node-menu-208 > div > .input-action')
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
      cy.wait(250);
    });

    it.skip('should move the map then get back to the current location', () => {
      // FIXME: pan the map
      cy.get('[ngeo-geolocation=""]').click();
      cy.wait(250);
    });

    it('should disable the geolocation tool', () => {
      cy.get('[ngeo-geolocation=""]').click();
      cy.wait(250);
    });
  });

  /**
   * Map tests
   */
  context.skip('Map', () => {
    it.skip('should rotate the map and put it back to north heading', () => {
      // FIXME: rotate with swiping ?
    });
  });

  /**
   * Fulltext Search tests
   */
  context.skip('FTS', () => {
    it('should check the FTS appearance', () => {
      // Check the placeholder
      cy.get('.tt-input').then((field) => {
        expect(field).to.have.attr('placeholder', 'Search…');
      });
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

        cy.get('.tt-input').then((field) => {
          expect(field).to.have.attr('placeholder', 'Search…');
        });
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
            cy.get('.tt-input').then((field) => {
              expect(field).to.have.attr('placeholder', 'Search…');
            });
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
          cy.get('#gmf-layertree-node-205 > .gmf-layertree-right-buttons > a > .fa').click();
          cy.get('.overlay').click();
        });

      // Re-add it from the previous search with focus
      cy.get('.tt-input').focus();
      cy.wrap(suggestions).click(125, 50);

      // Remove 'OSM open' from the layertree
      cy.get('.gmf-mobile-nav-left-trigger')
        .click()
        .then(() => {
          cy.get('#gmf-layertree-node-580 > .gmf-layertree-right-buttons > a > .fa').click();
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
          cy.get('#gmf-layertree-node-649 > .gmf-layertree-right-buttons > a > .fa').click();
          cy.get('.overlay').click();
        });
    });
  });

  context('Measures', () => {
    it('Activate coordinate tool', () => {
      // TODO: uncomment others tests
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/mobile.html?lang=en');

      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('[data-target="#measure-tools"]').click();
      cy.get('#measure-tools > ul > :nth-child(1) > .gmf-mobile-nav-button').click();

      cy.get('.tooltip').should('be.visible');

      cy.wait(300);

      // Close the tool.
      cy.get('[gmf-mobile-measurepoint=""] > .btn').click();

      cy.wait(300);
    });
    it.skip('Coordinate tool and pan', () => {});
    it('Length tool', () => {
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('#measure-tools > ul > :nth-child(2) > .gmf-mobile-nav-button').click();

      cy.wait(300);
    });
    it('Area tool', () => {});
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
