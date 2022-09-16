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

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/unbound-method */

import olMap from 'ol/Map';
import path from 'path';
import neatCSV from 'neat-csv';
import stripBom from 'strip-bom';

describe('Desktop interface', () => {
  /**
   * Layout tests
   */
  context('Layout', () => {
    it('Check the layout', () => {
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/desktop.html?lang=en');

      cy.get('header').should('be.visible');

      // Check map elements
      cy.get('.ol-zoom-in').should('be.visible');
      cy.get('.ol-zoom-out').should('be.visible');
      cy.get('[ngeo-geolocation=""]').should('be.visible');
      cy.get('.gmf-backgroundlayerbutton > .btn').should('be.visible');
      cy.get('.gmf-app-map-info').should('be.visible');
      cy.get('.gmf-app-map-info').should('have.class', 'fa-angle-double-up');

      // Check panels elements
      cy.get('.gmf-app-data-panel').should('be.visible');
      cy.get('.gmf-app-tools').should('have.class', 'gmf-app-inactive');
      cy.get('.gmf-app-bar').should('be.visible');
    });

    it('Check the map info bar', () => {
      cy.get('.gmf-app-map-info').click();
      cy.get('.gmf-app-map-info').should('have.class', 'fa-angle-double-down');
      cy.get('.gmf-app-footer').should('have.class', 'gmf-app-active');

      cy.get('.ol-scale-line-inner').should('have.text', '2 km');

      // Change scale to '1:50'000'
      cy.get('[ngeo-scaleselector=""] .btn').click();
      cy.get('.dropdown-menu > :nth-child(5) > a').click();
      cy.get('.ol-scale-line-inner').should('have.text', '1000 m');

      cy.readWindowValue('map').then((map: olMap) => {
        // Request the raster service with ASTER
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.wait('@raster').then((interception) => {
          expect(interception.response.statusCode).to.be.eq(200);
          expect(interception.response.body['aster']).to.be.eq(977);
          const element = Cypress.$('.gmf-elevationwidget-value');
          cy.wrap(element[0]['innerText'].replace(/\s/g, ' ')).should('eq', '977 m');
        });
        // Request the raster service with SRTM
        cy.get('gmf-elevationwidget a.btn').click();
        cy.get('.text-center > .dropdown-menu > :nth-child(3) > a').click(); // SRTM
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.wait('@raster').then((interception) => {
          expect(interception.response.statusCode).to.be.eq(200);
          expect(interception.response.body['srtm']).to.be.eq(969);
          const element = Cypress.$('.gmf-elevationwidget-value');
          cy.wrap(element[0]['innerText'].replace(/\s/g, ' ')).should('eq', '969 m');
        });

        // Check the mouse position coordinate with MN95
        const element = map.getViewport();
        cy.simulateDOMEvent(element, 'pointermove', 0, 0);
        cy.get('.gmf-mouseposition-control').should('have.text', '2,629,264, 1,185,915 m');

        // Check the mouse position coordinate with MN03
        cy.get('.gmf-mouseposition-control').click();
        cy.get('gmf-mouseposition.text-center > .btn-group > .dropdown-menu > :nth-child(3) > a').click();
        cy.simulateDOMEvent(element, 'pointermove', 0, 0);
        cy.get('.gmf-mouseposition-control').should('have.text', '629,264, 185,915 m');

        // Check the mouse position coordinate with WSG64
        cy.get('.gmf-mouseposition-control').click();
        cy.get('gmf-mouseposition.text-center > .btn-group > .dropdown-menu > :nth-child(4) > a').click();
        cy.simulateDOMEvent(element, 'pointermove', 0, 0);
        cy.get('.gmf-mouseposition-control').should('have.text', '46° 49′ 25.48″ N, 7° 49′ 19.71″ E');
      });

      // Close the info bar
      cy.get('.gmf-app-map-info').click();
      cy.get('.gmf-app-map-info').should('have.class', 'fa-angle-double-up');
      cy.get('.gmf-app-footer').should('not.have.class', 'gmf-app-active');
    });
  });

  /**
   * @param theme {string} The theme to load
   */
  function clearAllAndLoadTheme(theme: string = undefined) {
    if (theme === undefined) {
      theme = 'demo';
    }
    cy.contains('Clear all').click();
    cy.get('.dropdown > .btn').click();
    cy.contains(theme).click();
  }

  /**
   * Layertree tests
   *
   * NB: All cy.realXXXX commands are not supported by Firefox
   * In such case, the test is ignored for this browser
   */
  context('Layertree', () => {
    beforeEach(() => {
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/desktop.html?lang=en');
    });
    it.skip('Check the layertree buttons', () => {
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/desktop.html?lang=en');

      cy.get('div.gmf-layertree-node-597 > .gmf-layertree-expand-node').click(); // Layers-exclusive

      const layers = [
        {selector: 'div.gmf-layertree-node-99', class: 'off'}, // Cinema
        {selector: 'div.gmf-layertree-node-106', class: 'on'}, // Post office
        {selector: 'div.gmf-layertree-node-126', class: 'off'}, // OSM Time (range, date picker)
        {selector: 'div.gmf-layertree-node-137', class: 'off'}, // Hobbies
      ];
      layers.forEach((layer) => {
        cy.get(layer.selector).should('have.class', layer.class);
      });

      // First layer is hidden and the new one is displayed
      cy.get('div.gmf-layertree-node-99').eq(1).click();
      layers[0]['class'] = 'on';
      layers[1]['class'] = 'off';
      layers.forEach((layer) => {
        cy.get(layer.selector).should('have.class', layer.class);
      });
    });
    it.skip('Check the WMS (not-mixed)', {browser: '!firefox'}, () => {
      // Clean and re-open 'Demo' theme
      clearAllAndLoadTheme();

      // Check layer on/off
      cy.get('div.gmf-layertree-node-114')
        .should('have.class', 'off')
        .eq(0)
        .click()
        .then(() => {
          cy.get('div.gmf-layertree-node-114').should('have.class', 'on');
          cy.get('i.gmf-layertree-zoom').should('be.visible');

          // FIXME: Check the 'zoom to visible level' button
          //cy.get('gmf-layertree').scrollTo('top');
          //cy.get('i.gmf-layertree-zoom').eq(0).click();
          //cy.get('i.gmf-layertree-zoom').should('not.be.visible');
        });

      // Check the right menu
      cy.get('div.gmf-layertree-node-114')
        .eq(0)
        .realHover()
        .then(() => {
          // Assert and click the cog button
          cy.get('.gmf-layertree-right-buttons > span > span')
            .eq(0)
            .should('not.have.css', 'visibility', 'hidden')
            .click()
            .then(($el) => {
              // Get the appropriate UUID for the popover menu
              const popoverUUID = $el.attr('aria-describedby');
              cy.get(`div#${popoverUUID}`).should('be.visible');

              // Check the popover menu
              cy.get(`div#${popoverUUID} > .popover-body > div > ul > :nth-child(1)`).should('be.visible'); // Opacity slider
              cy.get(`div#${popoverUUID} > .popover-body > div > ul > :nth-child(2)`).should('be.visible'); // Show/hide legend
              cy.get(`div#${popoverUUID} > .popover-body > div > ul > :nth-child(3)`).should('be.visible'); // Swipper button
            });
        });
    });

    it.skip('Check the WMS mixed', () => {});

    it('Reordoning the groups', {browser: '!firefox'}, () => {
      clearAllAndLoadTheme();

      // Disable opened by default groups
      cy.get('div.gmf-layertree-node-68 > .gmf-layertree-expand-node').click();
      cy.get('div.gmf-layertree-node-596').dblclick();
      cy.get('div.gmf-layertree-node-597').click();

      // Swipe the first group
      cy.get('div.gmf-layertree-node-68')
        .realHover()
        .then(() => {
          cy.get('div.gmf-layertree-node-68 > .ngeo-sortable-handle > i').then(($el) => {
            //cy.wrap($el).should('not.have.css', 'visibility', 'hidden');
            const rect = $el[0].getBoundingClientRect();
            console.log(rect);
            cy.wrap($el)
              .trigger('mousedown', {button: 1, pageX: rect.left, pageY: rect.top, force: true})
              .trigger('mousemove', {button: 1, pageX: rect.left, pageY: rect.top + 50, force: true})
              .trigger('mouseup', {button: 1, force: true});
          });
        });
    });

    it.skip('Check the WMTS', () => {});
    it.skip('Should close the legend with the layer', () => {});
    it.skip('Should resize the tree panel', () => {
      cy.get('.gmf-app-data-panel').should('be.visible');
      cy.get('.gmf-app-data-panel-toggle-btn').click();
      cy.get('.gmf-app-data-panel').should('not.be.visible');
      cy.get('.gmf-app-data-panel-toggle-btn').click();

      cy.get('.ui-resizable-handle.ui-resizable-e')
        .eq(0)
        .then(($el) => {
          const rect = $el[0].getBoundingClientRect();
          console.log(rect);
          const dragAmount = 50;
          cy.window().then((window) => {
            const pageX = rect.left + window.pageXOffset;
            cy.wrap($el)
              .trigger('mouseover', {force: true})
              .trigger('mousedown', {button: 1, pageX, pageY: rect.top, force: true})
              .trigger('mousemove', {button: 1, pageX: pageX + dragAmount, pageY: rect.top, force: true})
              .trigger('mouseup', {button: 1, force: true});
          });
        });
    });
  });

  /**
   * @param csv {string} The CSV to validate
   * @param validationObject {any} The condition to assert the CSV
   */
  function validateCsv(csv: string, validationObject: any) {
    cy.wrap(csv)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .then(stripBom) // Remove Byte order mark
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .then(neatCSV) // Parse the CSV
      .then((list: any) => {
        expect(list, 'number of records').to.have.length(1);
        expect(list[0], 'first record').to.deep.equal(validationObject);
      });
  }

  context('Query window', () => {
    it('Query any layer', () => {
      cy.loadPage(
        false,
        'https://localhost:3000/contribs/gmf/apps/desktop.html?lang=en&map_x=2632287&map_y=1186329&map_zoom=9'
      );

      cy.wait(500); // query not working without the wait

      cy.readWindowValue('map').then((map: olMap) => {
        // Don't work with the coordinates without that ...
        const offsetX = 80.25;
        const offsetY = -11;
        cy.simulateEventAtCoord(map, 'singleclick', 2632271 + offsetX, 1186342 + offsetY);
      });
      cy.get('.gmf-displayquerywindow > .windowcontainer > .animation-container').should('be.visible');
      cy.get('.previous').should('be.visible');
      cy.get('.next').should('be.visible');

      // Previous and next result
      cy.get('.results > span').then(($el) => {
        const num = $el[1].textContent;
        expect(num).to.eq('1');
      });
      cy.get('div.placeholder > button.next').click();
      cy.get('.results > span').then(($el) => {
        const num = $el[1].textContent;
        expect(num).to.eq('2');
      });
      cy.get('div.placeholder > button.previous').click();
      cy.get('.results > span').then(($el) => {
        const num = $el[1].textContent;
        expect(num).to.eq('1');
      });

      // Filter the result
      cy.get('.results > :nth-child(5) > .btn').click();
      cy.get('.dropup.show > .dropdown-menu > :nth-child(3) > a').click();
      cy.get('div.placeholder > button.previous').should('not.be.visible');
      cy.get('div.placeholder > button.next').should('not.be.visible');
      // Export CSV
      cy.get(':nth-child(6) > .btn').click();
      cy.get('.dropup.show > .dropdown-menu > :nth-child(1) > a').click();

      // Validate the CSV import
      const downloadsFolder = Cypress.config('downloadsFolder');
      const filename = path.join(downloadsFolder, 'query-results.csv');
      const validationObject = {
        amenity: 'post_office',
        osm_id: '2789081430',
        display_name: '2789081430',
      };
      cy.readFile(filename, 'utf-8').then((csv: string) => validateCsv(csv, validationObject));
    });

    it('Result in a grid', () => {
      cy.loadPage(
        false,
        'https://localhost:3000/contribs/gmf/apps/desktop_alt.html?lang=en&map_x=2632287&map_y=1186329&map_zoom=9'
      );

      cy.wait(500); // query not working without the wait

      // Close disclaimer
      cy.get('[ng-model="disclaimerVisibility"] .modal-header > .close').click();
      cy.get('[ng-model="disclaimerVisibility"] > .modal > .modal-dialog > .modal-content').should(
        'not.be.visible'
      );

      cy.readWindowValue('map').then((map: olMap) => {
        // Don't work with the coordinates without that ...
        const offsetX = 80.25;
        const offsetY = -11;
        cy.simulateEventAtCoord(map, 'singleclick', 2632271 + offsetX, 1186342 + offsetY);
      });
      cy.get('.gmf-displayquerygrid').should('be.visible');
      cy.get('.container-fluid > .row').should('not.be.visible');

      // Check the tab and change the active one
      cy.get(':nth-child(1) > .nav-link').should('be.visible').and('have.class', 'active');
      cy.get(':nth-child(2) > .nav-link').should('be.visible').click().should('have.class', 'active');
      cy.get(':nth-child(1) > .nav-link').click();

      // Click on the line
      cy.get('.row- > :nth-child(2)').click();
      cy.get('.container-fluid > .row').should('be.visible');

      // Assert the zoom-to button
      cy.get('.nav > :nth-child(2) > .btn').click();
      cy.readWindowValue('map').then((map: olMap) => {
        expect(map.getView().getZoom()).to.be.eq(11);
      });

      // FIXME: box selection
      // cy.get('.ol-zoom-out').click().click();

      // cy.wait(1000);

      // cy.readWindowValue('map').then((map: olMap) => {
      //   const element = map.getViewport();
      //   cy.simulateDOMEvent(element, 'pointerdown', 0, 0, true);
      //   cy.simulateDOMEvent(element, 'pointerup', 0, 0, true);
      //   cy.simulateDOMEvent(element, 'pointermove', 100, 100, true);
      //   cy.simulateDOMEvent(element, 'pointerdown', 100, 100, true);
      //   cy.simulateDOMEvent(element, 'pointerup', 100, 100, true);
      // });
    });
  });
  context.skip('Query grid', () => {});

  context.skip('Profile', () => {
    it('Checks the profile', () => {
      cy.get('[ng-model="mainCtrl.drawProfilePanelActive"]').click();
      cy.get('canvas').click(100, 200);
      cy.get('canvas').dblclick(200, 200);

      cy.get('.gmf-profile-container').should('be.visible');
      cy.wait('@profile').then(() => {
        cy.get('.ngeo-profile > svg').should('be.visible');
      });

      // Close the profile and panel
      cy.get('.gmf-profile-container > .close').click();
      cy.get('.gmf-profile-container').should('not.be.visible');
      cy.get('.profile-panel .close').click();
    });
  });
});

describe('Desktop_alt interface', () => {});
