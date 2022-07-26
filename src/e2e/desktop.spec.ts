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
        });
        // Request the raster service with SRTM
        cy.get('gmf-elevationwidget a.btn').click();
        cy.get('.text-center > .dropdown-menu > :nth-child(3) > a').click(); // SRTM
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.wait('@raster').then((interception) => {
          expect(interception.response.statusCode).to.be.eq(200);
          expect(interception.response.body['srtm']).to.be.eq(969);
        });
      });
      // TODO: check the coordinate widget and projection

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
          //expect(interception.response.statusCode).to.be.eq(200);

          // Intercept the status request
          const statusUrl = interception.response.body.statusURL;
          const url = `${Cypress.env('serverUrl') as string}${statusUrl}`.replace(
            'print/print',
            'printproxy'
          );
          cy.intercept(`${url}`).as('status');

          waitOnStatus();
          //validateImage();
        });
      });
    });
  });
});

function waitOnStatus() {
  cy.wait('@status').then((interception) => {
    console.log(interception);
    expect(interception.response.statusCode).to.be.eq(200);
    expect(interception.response.body.status).to.be.oneOf(['waiting', 'running', 'finished']);
    if (interception.response.body.status === 'running' || interception.response.body.status === 'waiting') {
      waitOnStatus();
    } else {
      console.log('done.');
    }
  });
}

function validateImage(downloadedFilename: any = null) {
  const downloadsFolder = Cypress.config('downloadsFolder');

  if (!downloadedFilename) {
    downloadedFilename = `${downloadsFolder}/GeoMapFish_2022-07-21_13-15-34.pdf`;
  }

  // ensure the file has been saved before trying to parse it
  cy.readFile(downloadedFilename, 'binary', {timeout: 15000}).should((buffer) => {
    // by having length assertion we ensure the file has text
    // since we don't know when the browser finishes writing it to disk

    // Tip: use expect() form to avoid dumping binary contents
    // of the buffer into the Command Log
    expect(buffer.length).to.be.gt(1000);
  });
}

describe('Desktop_alt interface', () => {});
