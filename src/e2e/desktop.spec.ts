import olMap from 'ol/Map';
import {FeatureOverlayMgr} from 'ngeo/map/FeatureOverlayMgr';

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

  function clearAllAndLoadDemoTheme() {
    cy.contains('Clear all').click();
    cy.get('.dropdown > .btn').click();
    cy.get('.gmf-theme-selector > :nth-child(2)').click();
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
      clearAllAndLoadDemoTheme();

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
      clearAllAndLoadDemoTheme();

      // Disable opened by default groups
      cy.get('div.gmf-layertree-node-68 > .gmf-layertree-expand-node').click();
      cy.get('div.gmf-layertree-node-596').dblclick();
      cy.get('div.gmf-layertree-node-597').click();

      // Swipe the first group
      cy.get('div.gmf-layertree-node-68')
        .realHover()
        .then(() => {
          cy.get('div.gmf-layertree-node-68 > .ngeo-sortable-handle > i')
            .should('not.have.css', 'visibility', 'hidden')
            .trigger('mousedown', {button: 1});
          cy.get('div.gmf-layertree-node-597').trigger('mousedown').trigger('mouseup');
        });
    });

    it.skip('Check the WMTS', () => {});
    it.skip('Should close the legend with the layer', () => {});
    it.skip('Should resize the tree panel', () => {});
  });

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
