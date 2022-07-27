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

  context('Profile', () => {
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

  /**
   * Print tests
   */
  context('Print', () => {
    it('Checks the print panel', () => {
      cy.get('[ng-model="mainCtrl.printPanelActive"]').click();
      cy.wait('@print_capabilities').then(() => {
        cy.get('gmf-print > div > div:nth-child(1) > div:nth-child(2) > div > input').type('Title');
        cy.get('gmf-print > div > div:nth-child(1) > div:nth-child(3) > div > textarea').type('Comments');
        cy.get('.col-md-4 > .form-control').type('45');

        // Assert on the map
        cy.get('.ol-compass').should('have.attr', 'style', 'transform: rotate(0.785398rad);');
        cy.readWindowValue('map').then((map: olMap) => {
          const mask = map.getAllLayers().find((layer) => layer.get('name') === 'PrintMask');
          cy.wrap(mask).should('not.be.undefined');
        });

        cy.get('.gmf-print-pdf').click();

        cy.wait('@report_pdf').then((interception) => {
          expect(interception.response.statusCode).to.be.eq(200);

          // Get the status URL
          const statusURL = `${Cypress.env('serverUrl') as string}${
            interception.response.body.statusURL
          }`.replace('print/print', 'printproxy');

          // Get the download URL
          const downloadURL = `${Cypress.env('serverUrl') as string}${
            interception.response.body.downloadURL
          }`.replace('print/print', 'printproxy');

          let count = 0;
          interceptAndWaitOnStatus(statusURL, downloadURL, count, 'waiting');

          //cy.get('.gmf-print-actions > span > .fa > svg').should('have.css', 'display', 'none');
        });
      });
    });
  });
});

function interceptAndWaitOnStatus(statusUrl: string, downloadUrl: string, count: number, status: string) {
  // Stub the request response
  cy.intercept(`${statusUrl}`, (req) => {
    req.reply({status});
  }).as(`status${count}`);

  // Do the assertions on the stubbed request
  cy.wait(`@status${count}`).then((interception) => {
    expect(interception.response.statusCode).to.be.eq(200);
    const status = interception.response.body.status;

    count++;
    if (status === 'waiting') {
      expect(status).to.eq('waiting');
      cy.get('.gmf-print-actions > span > .fa > svg').should('be.visible');
      cy.get('.gmf-print-cancel').should('be.visible');
      return interceptAndWaitOnStatus(statusUrl, downloadUrl, count, 'running');
    } else if (status === 'running' && count < 3) {
      expect(status).to.eq('running');
      cy.get('.gmf-print-actions > span > .fa > svg').should('be.visible');
      cy.get('.gmf-print-cancel').should('be.visible');
      return interceptAndWaitOnStatus(statusUrl, downloadUrl, count, 'running');
    } else if (status === 'running' && count == 3) {
      expect(status).to.eq('running');
      cy.get('.gmf-print-actions > span > .fa > svg').should('be.visible');
      cy.get('.gmf-print-cancel').should('be.visible');
      return interceptAndWaitOnStatus(statusUrl, downloadUrl, count, 'finished');
    } else {
      expect(status).to.eq('finished');
      validatePrintIsDone(downloadUrl);
      return;
    }
  });
}

function validatePrintIsDone(url: string) {
  //cy.intercept(`${url}`).as(`downloadedFile`);
  //cy.wait('@downloadedFile');
  cy.on('locationchange', (newUrl) => {
    console.log(newUrl);
    //expect(newUrl).to.contain("?magic=true")
  });
}

describe('Desktop_alt interface', () => {});
