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

import olMap from 'ol/Map';
import {LineString, Polygon} from 'ol/geom';
import MobileDraw from 'ngeo/interaction/MobileDraw';
import {FeatureOverlayMgr} from 'ngeo/map/FeatureOverlayMgr';

const groups = [
  'div.gmf-layertree-node-68', // OSM functions mixed
  'div.gmf-layertree-node-596', // Layers
  'div.gmf-layertree-node-597', // Layers-exclusive
  'div.gmf-layertree-node-66', // Group
  'div.gmf-layertree-node-146', // OSM functions
  'div.gmf-layertree-node-153', // External
  'div.gmf-layertree-node-174', // Filters mixed
  'div.gmf-layertree-node-183', // Filters
  'div.gmf-layertree-node-284', // ESRI no WFS no Geom
];

describe('Mobile interface', () => {
  /**
   * Layout tests
   */
  context('Layout', () => {
    it('Check the layout', () => {
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

    it('Zoom in and out', () => {
      cy.get('.ol-zoom-in').click();
      cy.get('.ol-scale-line-inner').should('contain.html', '1000 m');
      cy.get('.ol-zoom-out').click();
      cy.get('.ol-scale-line-inner').should('contain.html', '2 km');
    });

    it('Navigate the left menu', () => {
      // Open the panel, then check the panel title
      cy.get('.gmf-mobile-nav-left-trigger').click();
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
      cy.get('ul#gmf-layertree-layer-group-75').children().should('exist');

      // Test the submenu
      cy.get(
        '.gmf-mobile-nav-left > .gmf-mobile-nav-active > :nth-child(1) > :nth-child(1) > .gmf-mobile-nav-button'
      ).click();
      cy.get('.gmf-mobile-nav-left > header > .gmf-mobile-nav-go-back').click();

      // Close the panel
      cy.get('.overlay').click(300, 300, {force: true});
    });

    it('Navigate the right menu', () => {
      // Open the panel, then check the panel title
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('.gmf-mobile-nav-right > header > .gmf-mobile-nav-header-title').should('contain.html', 'Tools');

      // Test the submenu
      cy.get('[data-target="#measure-tools"]').click();
      cy.get('.gmf-mobile-nav-right > header > .gmf-mobile-nav-go-back').click();

      // Close the panel
      cy.get('.overlay').click(300, 300, {force: true});
    });

    it.skip('Close with swipe', () => {
      // FIXME: https://www.npmjs.com/package/cy-mobile-commands for swiping ?
    });
  });

  /**
   * Layertree tests
   */
  context('Layertree', () => {
    it('Test layer opacity settings', () => {
      cy.get('.gmf-mobile-nav-left-trigger').click();

      // Open opacity setting of the 'Layers' group
      cy.get(
        'div.gmf-layertree-node-596 > .gmf-layertree-right-buttons > .gmf-layertree-node-menu-btn > .fa'
      ).click();

      // Set the opacity to 0.4 and check the value
      cy.get('div.gmf-layertree-node-menu-596 > div > .input-action')
        .invoke('val', 0.4)
        .trigger('change')
        .then((slider) => {
          cy.wrap(slider).should('contain.value', 0.4);
          cy.wrap(slider).should('not.contain.value', 1);
          cy.readWindowValue('map').then((map: olMap) => {
            const layerGroups = map.getLayerGroup().getLayersArray();
            const layerGroup = layerGroups.find((group) => group.get('layerNodeName') === 'Layers');
            cy.wrap(layerGroup.get('opacity')).should('be.eq', 0.4);
          });
        });

      // Close the panel
      cy.get('.overlay').click(300, 300, {force: true});
    });

    it('Change the background layer', () => {
      cy.get('.gmf-mobile-nav-left-trigger').click();
      cy.contains('Background').click();
      cy.get('.gmf-backgroundlayerselector').should('be.visible');

      // Change to "blank" background
      cy.get('.gmf-backgroundlayerselector > :nth-child(1)').click();
      cy.get('.gmf-backgroundlayerselector').should('be.not.visible');

      // Check that the background is correctly changed
      cy.get('.gmf-mobile-nav-left-trigger').click();
      cy.get('.gmf-backgroundlayerselector').should('be.visible');
      cy.get('.gmf-backgroundlayerselector > :nth-child(1)').should(
        'have.class',
        'gmf-backgroundlayerselector-active'
      );
      cy.get('.gmf-backgroundlayerselector > :nth-child(2)').should(
        'not.have.class',
        'gmf-backgroundlayerselector-active'
      );

      // Close the panel
      cy.get('.gmf-mobile-nav-left > header > .gmf-mobile-nav-go-back').click();
      cy.get('.overlay').click(300, 300, {force: true});
    });

    it('Change the theme', () => {
      cy.get('.gmf-mobile-nav-left-trigger').click();
      cy.contains('Themes').click();
      cy.contains('Cadastre').click();
      cy.get('div.gmf-layertree-node-30').should('have.class', 'on');

      // Close the panel
      cy.get('.overlay').click(300, 300, {force: true});
    });

    it('Check layer and layergroup selection I', () => {
      cy.get('.gmf-mobile-nav-left-trigger').click();
      cy.contains('Themes').click();
      cy.contains('Demo').click();

      // Disable all active layers and check
      cy.get('div.gmf-layertree-node-596').dblclick();
      cy.get('div.gmf-layertree-node-597').click();
      groups.forEach((group) => {
        cy.get(group).should('have.class', 'off');
        cy.get(group).should('not.have.class', 'on');
      });

      // Activate OSM open layer and check
      cy.get('div.gmf-layertree-node-139').first().click();
      cy.get('div.gmf-layertree-node-139').first().should('have.class', 'on');

      // Activate layergroup (Layers) and check
      cy.get('div.gmf-layertree-node-596').click();
      cy.get('div.gmf-layertree-node-596 > .gmf-layertree-expand-node').click();
      const layers = [
        {selector: 'div.gmf-layertree-node-99', index: 0},
        {selector: 'div.gmf-layertree-node-106', index: 0},
        {selector: 'div.gmf-layertree-node-126', index: 1},
        {selector: 'div.gmf-layertree-node-137', index: 0},
      ];
      layers.forEach((layer) => {
        cy.get(layer.selector).eq(layer.index).should('be.visible');
        cy.get(layer.selector).eq(layer.index).should('have.class', 'on');
        cy.get(layer.selector).eq(layer.index).should('not.have.class', 'off');
      });

      // Open sub-group and check
      cy.get('div.gmf-layertree-node-137 > .gmf-layertree-expand-node').eq(0).click();
      const subLayers = ['div.gmf-layertree-node-102', 'div.gmf-layertree-node-107'];
      subLayers.forEach((layer) => {
        cy.get(layer).eq(0).should('be.visible');
        cy.get(layer).eq(0).should('have.class', 'on');
        cy.get(layer).eq(0).should('not.have.class', 'off');
      });

      cy.contains('Clear all').click();
    });

    it('Check layer and layergroup selection II', () => {
      cy.contains('Themes').click();
      cy.contains('Demo').click();

      cy.get('div.gmf-layertree-node-139').first().click();
      cy.get('div.gmf-layertree-node-139').first().should('have.class', 'on');
      cy.get('div.gmf-layertree-node-68').should('have.class', 'indeterminate');

      cy.get('div.gmf-layertree-node-68').dblclick();
      cy.get('div.gmf-layertree-node-68').should('have.class', 'off');

      cy.contains('Clear all').click();
    });

    it('Check layers with minimum and maximum zoom visibility', () => {
      cy.contains('Themes').click();
      cy.contains('Demo').click();

      cy.get('div.gmf-layertree-node-114').first().click();
      cy.get('div.gmf-layertree-node-114').first().should('be.visible');
      cy.get('.ol-scale-line-inner').should('contain.html', '2 km');
      cy.get('.gmf-layertree-node-114 .gmf-layertree-zoom').click();
      cy.get('.ol-scale-line-inner').should('contain.html', '100 m');
      cy.get('.gmf-layertree-node-114 .gmf-layertree-zoom').should('not.be.visible');
    });

    it('Remove a layer', () => {
      cy.get('div.gmf-layertree-node-68 span.fa-trash').click();

      groups.forEach((group) => {
        if (group === 'div.gmf-layertree-node-68') {
          cy.get(group).should('not.exist');
        } else {
          cy.get(group).should('exist');
        }
      });
    });

    it('Remove all layers', () => {
      // Check the layertree content
      cy.get('ul#gmf-layertree-layer-group-75').children().should('exist');
      cy.contains('Clear all').click();
      cy.get('ul#gmf-layertree-layer-group-75').children().should('not.exist');

      // Close the panel
      cy.get('.overlay').click(300, 300, {force: true});
    });
  });

  /**
   * Drawing tests
   */
  context('Drawing', () => {
    it('Show the drawing layers as read-only', () => {
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/mobile.html?lang=en');

      cy.get('.gmf-mobile-nav-left-trigger').click();
      cy.contains('Themes').click();
      cy.contains('Edit').click();

      cy.readWindowValue('map').then((map: olMap) => {
        const data = map
          .getLayers()
          .getArray()
          .find((group) => group.get('groupName') === 'data');
        console.log(data.getLayersArray());
      });

      // Close the panel
      cy.get('.overlay').click(300, 300, {force: true});
    });
  });

  /**
   * Geolocation tests
   * NB: we ignore Firefox as Geolocation permission is not working ...
   */
  context('Geolocation', {browser: '!firefox'}, () => {
    it('Show the current location', () => {
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/mobile.html?lang=en');

      cy.get('[ngeo-geolocation=""]').click();

      // Assert on active geolocation
      cy.readWindowValue('overlayMgr').then((manager: FeatureOverlayMgr) => {
        const features = manager.getLayer().getSource().getFeaturesCollection().getArray();
        const feature = features.find((f) => f.get('name') === 'GeolocationPositionFeature');
        cy.wrap(feature).should('not.be.undefined');
        const feature2 = features.find((f) => f.get('name') === 'GeolocationAccuracyFeature');
        cy.wrap(feature2).should('not.be.undefined');
      });
    });

    it('Move the map then get back to the current location', () => {
      cy.readWindowValue('map').then((map: olMap) => {
        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 60, 0);
        cy.simulateEvent(map, 'pointerdrag', 60, 0);
        cy.simulateEvent(map, 'pointermove', 120, 0);
        cy.simulateEvent(map, 'pointerdrag', 120, 0);
        cy.simulateEvent(map, 'pointerup', 120, 0);
      });
      cy.wait(350).then(() => {
        cy.get('[ngeo-geolocation=""]').click();

        // Assert on active geolocation
        cy.readWindowValue('overlayMgr').then((manager: FeatureOverlayMgr) => {
          const features = manager.getLayer().getSource().getFeaturesCollection().getArray();
          const feature = features.find((f) => f.get('name') === 'GeolocationPositionFeature');
          cy.wrap(feature).should('not.be.undefined');
          const feature2 = features.find((f) => f.get('name') === 'GeolocationAccuracyFeature');
          cy.wrap(feature2).should('not.be.undefined');
        });
      });
    });

    it('Disable the geolocation tool', () => {
      cy.get('[ngeo-geolocation=""]').click();
      // Assert on unactive geolocation
      cy.readWindowValue('overlayMgr').then((manager: FeatureOverlayMgr) => {
        const features = manager.getLayer().getSource().getFeaturesCollection().getArray();
        //console.log(features[0].get('name'));
        const feature = features.find((f) => f.get('name') === 'GeolocationPositionFeature');
        cy.wrap(feature).should('be.undefined');
        const feature2 = features.find((f) => f.get('name') === 'GeolocationAccuracyFeature');
        cy.wrap(feature2).should('be.undefined');
      });
    });
  });

  /**
   * Map tests
   */
  context('Map', () => {
    it('Rotate the map and put it back to north heading', () => {
      cy.readWindowValue('map').then((map: olMap) => {
        // Rotate the map
        cy.simulateEvent(map, 'pointerdown', 0, 0, true, false, true);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 60, 60);
        cy.simulateEvent(map, 'pointerdrag', 60, 60);
        cy.simulateEvent(map, 'pointermove', 120, 120);
        cy.simulateEvent(map, 'pointerdrag', 120, 120);
        cy.simulateEvent(map, 'pointerup', 120, 120);
        cy.wait(350);

        // Check the rotation is correct
        cy.get('.ol-compass').should('have.attr', 'style', 'transform: rotate(0.785398rad);');

        // Reset the rotation
        cy.get('.ol-rotate-reset').click({force: true});
      });
    });
  });

  /**
   * Fulltext Search tests
   */
  context('FTS', () => {
    it('Check the FTS appearance', () => {
      // Check the placeholder
      cy.get('.tt-input').should('have.attr', 'placeholder', 'Search…');
    });

    it('Search on a word', () => {
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
      cy.wrap(suggestions).click(125, 50);

      // Assert that there is a search feature on overlay
      cy.readWindowValue('overlayMgr').then((manager: FeatureOverlayMgr) => {
        const features = manager.getLayer().getSource().getFeaturesCollection().getArray();
        const feature = features.find((f) => f.get('name') === 'SearchFeature');
        cy.wrap(feature).should('not.be.undefined');
      });
    });

    it('Clear the field and keep the result visible', () => {
      // Clear the field
      cy.get('.tt-input').clear();

      // Check the clear button and the placeholder
      const clearBtn = Cypress.$('span.gmf-clear-button');
      cy.wrap(clearBtn).then((btn) => {
        expect(btn).to.have.css('width', '0px');
        expect(btn).to.have.css('height', '40px');

        // Check the placeholder
        cy.get('.tt-input').should('have.attr', 'placeholder', 'Search…');

        // Assert that there is a search feature on overlay
        cy.readWindowValue('overlayMgr').then((manager: FeatureOverlayMgr) => {
          const features = manager.getLayer().getSource().getFeaturesCollection().getArray();
          const feature = features.find((f) => f.get('name') === 'SearchFeature');
          cy.wrap(feature).should('not.be.undefined');
        });
      });
    });

    it('Close the search with the cross button', () => {
      const clearBtn = Cypress.$('span.gmf-clear-button');
      cy.wrap(clearBtn).then((btn) => {
        cy.wrap(btn)
          .click({force: true})
          .then((btn) => {
            expect(btn).to.not.be.visible;

            // Check the placeholder
            cy.get('.tt-input').should('have.attr', 'placeholder', 'Search…');

            // Assert that there is no search feature on overlay
            cy.readWindowValue('overlayMgr').then((manager: FeatureOverlayMgr) => {
              const features = manager.getLayer().getSource().getFeaturesCollection().getArray();
              const feature = features.find((f) => f.get('name') === 'SearchFeature');
              cy.wrap(feature).should('be.undefined');
            });
          });
      });
    });

    it('Search and change the result', () => {
      cy.get('.tt-input').type('Lausanne');

      // Check the suggestions menu
      const suggestions = Cypress.$('.tt-menu > .tt-dataset-1');
      cy.wrap(suggestions).should('be.visible');

      // Click on 'Lausanne';
      cy.wrap(suggestions).click(125, 50);

      // Assert that there is a search feature on overlay
      cy.readWindowValue('overlayMgr').then((manager: FeatureOverlayMgr) => {
        const features = manager.getLayer().getSource().getFeaturesCollection().getArray();
        const feature = features.find((f) => f.get('name') === 'SearchFeature');
        cy.wrap(feature).should('not.be.undefined');
      });

      cy.get('.tt-input').focus();

      // Click on 'Le-Mont-sur-Lausanne';
      cy.wrap(suggestions).click(125, 150);

      // Assert that there is a search feature on overlay
      cy.readWindowValue('overlayMgr').then((manager: FeatureOverlayMgr) => {
        const features = manager.getLayer().getSource().getFeaturesCollection().getArray();
        const feature = features.find((f) => f.get('name') === 'SearchFeature');
        cy.wrap(feature).should('not.be.undefined');
      });

      // Close the search
      const clearBtn = Cypress.$('span.gmf-clear-button');
      cy.wrap(clearBtn).then((btn) => {
        cy.wrap(btn).click({force: true});
      });
    });

    it.skip('Zoom out and pan on the result', () => {
      // FIXME: pan and move
    });

    it('Search for "OSM open"', () => {
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

  context('Measures', () => {
    beforeEach(() => {
      cy.loadPage(
        false,
        'https://localhost:3000/contribs/gmf/apps/mobile.html?lang=en&map_x=2632464&map_y=1185457'
      );
    });

    it('Activate coordinate tool', () => {
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('[data-target="#measure-tools"]').click();
      cy.get('#measure-tools > ul > :nth-child(1) > .gmf-mobile-nav-button').click();
      cy.get('.tooltip').should('be.visible');

      // Close the tool
      cy.get('[gmf-mobile-measurepoint=""] > .btn').click();
    });

    it('Coordinate tool and pan', () => {
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('[data-target="#measure-tools"]').click();
      cy.get('#measure-tools > ul > :nth-child(1) > .gmf-mobile-nav-button').click();
      cy.get('.tooltip').should('be.visible');
      cy.get('.tooltip').then((tooltip) => {
        expect(tooltip)
          .to.have.prop('textContent')
          .to.match(/2,632,464, 1,185,457/gm);
      });

      cy.readWindowValue('map').then((map: olMap) => {
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
            .to.match(/\d+[,]*\d*[,]*\d*,\s1,185,457/gm);
        });

        // Close the tool
        cy.get('[gmf-mobile-measurepoint=""] > .btn').click();
      });
    });

    it('Length tool', () => {
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('[data-target="#measure-tools"]').click();
      cy.get('#measure-tools > ul > :nth-child(2) > .gmf-mobile-nav-button').click();

      // Assert there is nothing drawn yet
      cy.readWindowValue('map').then((map: olMap) => {
        const drawInteraction = map
          .getInteractions()
          .getArray()
          .find((interaction) => interaction.get('name') === 'LineStringMobileDraw');
        const feature = (drawInteraction as MobileDraw).getFeature();
        cy.wrap(feature).should('be.null');
      });

      cy.readWindowValue('map').then((map: olMap) => {
        // Set a starting point
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').click();
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').should('not.exist');

        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 120, 0);
        cy.simulateEvent(map, 'pointerdrag', 120, 0);
        cy.simulateEvent(map, 'pointerup', 120, 0);
        cy.wait(500);

        // First segment drawn and assert
        cy.get('[ng-if="ctrl.dirty"]')
          .click()
          .then(() => {
            cy.readWindowValue('map').then((map: olMap) => {
              const drawInteraction = map
                .getInteractions()
                .getArray()
                .find((interaction) => interaction.get('name') === 'LineStringMobileDraw');
              const feature = (drawInteraction as MobileDraw).getFeature();
              cy.wrap(feature).should('not.be.null');
              cy.wrap(feature.get('name')).should('be.eq', 'mobileDrawLine');
              const lineString = feature.getGeometry() as LineString;
              cy.wrap(lineString.getCoordinates().length).should('be.eq', 3);
            });
          });

        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 60);
        cy.simulateEvent(map, 'pointerdrag', 0, 60);
        cy.simulateEvent(map, 'pointerup', 0, 60);
        cy.wait(500);

        // Second segment drawn and assert
        cy.get('[ng-if="ctrl.dirty"]')
          .click()
          .then(() => {
            cy.readWindowValue('map').then((map: olMap) => {
              const drawInteraction = map
                .getInteractions()
                .getArray()
                .find((interaction) => interaction.get('name') === 'LineStringMobileDraw');
              const feature = (drawInteraction as MobileDraw).getFeature();
              cy.wrap(feature).should('not.be.null');
              cy.wrap(feature.get('name')).should('be.eq', 'mobileDrawLine');
              const lineString = feature.getGeometry() as LineString;
              cy.wrap(lineString.getCoordinates().length).should('be.eq', 4);
            });
          });

        cy.get('.tooltip').then((tooltip) => {
          // Check on a Regex because length could differs
          expect(tooltip)
            .to.have.prop('textContent')
            .to.match(/\d+[.]*\d*\s\w+/g);
        });

        // Terminate the line and assert
        cy.get('[ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty"]')
          .click()
          .then(() => {
            cy.readWindowValue('map').then((map: olMap) => {
              const drawInteraction = map
                .getInteractions()
                .getArray()
                .find((interaction) => interaction.get('name') === 'LineStringMobileDraw');
              const feature = (drawInteraction as MobileDraw).getFeature();
              cy.wrap(feature).should('not.be.null');
              cy.wrap(feature.get('name')).should('be.eq', 'mobileDrawLine');
              const lineString = feature.getGeometry() as LineString;
              cy.wrap(lineString.getCoordinates().length).should('be.eq', 4);
            });
          });
        cy.get('[ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty"]').should('not.exist');
        cy.get('.tooltip').should('have.css', 'background-color', 'rgb(255, 204, 51)');

        // Clear the line and assert there is nothing drawn
        cy.get('[ng-if="ctrl.valid"]')
          .click()
          .then(() => {
            cy.readWindowValue('map').then((map: olMap) => {
              const drawInteraction = map
                .getInteractions()
                .getArray()
                .find((interaction) => interaction.get('name') === 'LineStringMobileDraw');
              const feature = (drawInteraction as MobileDraw).getFeature();
              cy.wrap(feature).should('be.null');
            });
          });
        cy.get('.tooltip').should('not.be.visible');

        // Close the tool
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

      // Assert there is nothing drawn yet
      cy.readWindowValue('map').then((map: olMap) => {
        const drawInteraction = map
          .getInteractions()
          .getArray()
          .find((interaction) => interaction.get('name') === 'PolygonMobileDraw');
        const feature = (drawInteraction as MobileDraw).getFeature();
        cy.wrap(feature).should('be.null');
      });

      cy.readWindowValue('map').then((map: olMap) => {
        // Set a starting point
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').click();
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').should('not.exist');

        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 120, 0);
        cy.simulateEvent(map, 'pointerdrag', 120, 0);
        cy.simulateEvent(map, 'pointerup', 120, 0);
        cy.wait(500);

        // First segment drawn and assert
        cy.get('[ng-if="ctrl.dirty"]')
          .click()
          .then(() => {
            cy.readWindowValue('map').then((map: olMap) => {
              const drawInteraction = map
                .getInteractions()
                .getArray()
                .find((interaction) => interaction.get('name') === 'PolygonMobileDraw');
              const feature = (drawInteraction as MobileDraw).getFeature();
              cy.wrap(feature).should('not.be.null');
              cy.wrap(feature.get('name')).should('be.eq', 'DrawMobilePolygon');
              const polygon = feature.getGeometry() as Polygon;
              cy.wrap(polygon.getCoordinates()[0].length).should('be.eq', 4);
            });
          });

        // Area is null with only one segment
        cy.contains('0 m²').should('exist');

        cy.simulateEvent(map, 'pointerdown', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 0);
        cy.simulateEvent(map, 'pointerdrag', 0, 0);
        cy.simulateEvent(map, 'pointermove', 0, 60);
        cy.simulateEvent(map, 'pointerdrag', 0, 60);
        cy.simulateEvent(map, 'pointerup', 0, 60);
        cy.wait(500);

        // Second segment drawn and assert
        cy.get('[ng-if="ctrl.dirty"]')
          .click()
          .then(() => {
            cy.readWindowValue('map').then((map: olMap) => {
              const drawInteraction = map
                .getInteractions()
                .getArray()
                .find((interaction) => interaction.get('name') === 'PolygonMobileDraw');
              const feature = (drawInteraction as MobileDraw).getFeature();
              cy.wrap(feature).should('not.be.null');
              cy.wrap(feature.get('name')).should('be.eq', 'DrawMobilePolygon');
              const polygon = feature.getGeometry() as Polygon;
              cy.wrap(polygon.getCoordinates()[0].length).should('be.eq', 5);
            });
          });

        cy.get('.tooltip').then((tooltip) => {
          // Check on a Regex because length could differs
          expect(tooltip)
            .to.have.prop('textContent')
            .to.match(/\d+[.]*\d*\s\w+[²]/gm);
        });

        // Terminate the line and assert
        cy.get('[ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty"]')
          .click()
          .then(() => {
            cy.readWindowValue('map').then((map: olMap) => {
              const drawInteraction = map
                .getInteractions()
                .getArray()
                .find((interaction) => interaction.get('name') === 'PolygonMobileDraw');
              const feature = (drawInteraction as MobileDraw).getFeature();
              cy.wrap(feature).should('not.be.null');
              cy.wrap(feature.get('name')).should('be.eq', 'DrawMobilePolygon');
              const polygon = feature.getGeometry() as Polygon;
              cy.wrap(polygon.getCoordinates()[0].length).should('be.eq', 5);
            });
          });
        cy.get('[ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty"]').should('not.exist');
        cy.get('.tooltip').should('have.css', 'background-color', 'rgb(255, 204, 51)');

        // Clear the line and assert there is nothing drawn
        cy.get('[ng-if="ctrl.valid"]')
          .click()
          .then(() => {
            cy.readWindowValue('map').then((map: olMap) => {
              const drawInteraction = map
                .getInteractions()
                .getArray()
                .find((interaction) => interaction.get('name') === 'PolygonMobileDraw');
              const feature = (drawInteraction as MobileDraw).getFeature();
              cy.wrap(feature).should('be.null');
            });
          });
        cy.get('.tooltip').should('not.be.visible');

        // Close the tool
        cy.get('[ng-if="ctrl.active"]').click();
        cy.get('[ng-if="ctrl.drawing && (!ctrl.valid)"]').should('not.exist');
        cy.get('[ng-if="ctrl.active"]').should('not.exist');
        cy.get('[ng-if="ctrl.valid"]').should('not.exist');
      });
    });
  });

  /**
   * Query tests
   */
  context('Query', () => {
    it('Query a layer and test the query window result layout', () => {
      cy.loadPage(
        false,
        'https://localhost:3000/contribs/gmf/apps/mobile.html?lang=en&map_x=2632270&map_y=1186700&theme=Demo&tree_groups=Filters&tree_group_layers_Filters=osm_open'
      );
      cy.wait(350); // query not working without the wait
      cy.readWindowValue('map').then((map: olMap) => {
        cy.simulateEventAtCoord(map, 'singleclick', 2629630, 1181640);
      });
      cy.get('.gmf-displayquerywindow > .windowcontainer > .animation-container').should('be.visible');

      // Test the collapse button
      cy.get('.collapse-button').should('have.class', 'collapse-button-down');
      cy.get('.gmf-displayquerywindow > .windowcontainer > .animation-container').should(
        'have.class',
        'animation-container-detailed'
      );
      cy.get('.collapse-button').click();
      cy.get('.collapse-button').should('have.class', 'collapse-button-up');
      cy.get('.gmf-displayquerywindow > .windowcontainer > .animation-container').should(
        'not.have.class',
        'animation-container-detailed'
      );
      cy.get('.collapse-button').click();
      cy.get('.collapse-button').should('have.class', 'collapse-button-down');
      cy.get('.gmf-displayquerywindow > .windowcontainer > .animation-container').should(
        'have.class',
        'animation-container-detailed'
      );

      // Test the previous/next result button
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

      // Close the window query result
      cy.get('.gmf-displayquerywindow > .windowcontainer > .fa-times').click();
      cy.get('.gmf-displayquerywindow > .windowcontainer > .animation-container').should('not.be.visible');
    });

    it('Query "OSM open" and scroll in the query result window', () => {
      cy.wait(350); // query not working without the wait
      cy.readWindowValue('map').then((map: olMap) => {
        cy.simulateEventAtCoord(map, 'singleclick', 2629630, 1181640);
      });

      // Scroll in the result
      cy.get('.details').then((element) => {
        cy.wrap(element[0].scrollTop).should('eq', 0);
        cy.wrap(element)
          .scrollTo('bottom')
          .then((element) => {
            cy.wrap(element[0].scrollTop).should('least', 75);
          });
      });

      // Close the window query result
      cy.get('.gmf-displayquerywindow > .windowcontainer > .fa-times').click();
      cy.get('.gmf-displayquerywindow > .windowcontainer > .animation-container').should('not.be.visible');
    });

    const sizes = ['samsung-s10', [1000, 660]];
    sizes.forEach((size) => {
      it(`Query "OSM open" and open a popup url on '${size}' screen`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1]);
        } else {
          cy.viewport(size as Cypress.ViewportPreset);
        }

        cy.readWindowValue('map').then((map: olMap) => {
          cy.simulateEventAtCoord(map, 'singleclick', 2629630, 1181640);
          cy.wait('@mapserv_proxy').then(() => {
            cy.get(':nth-child(1) > .details-value > a').click();

            cy.get('.ngeo-displaywindow > .windowcontainer').should('be.visible');
            cy.get(
              '.ngeo-displaywindow > .windowcontainer > .animation-container > .slide-animation > .header > .title'
            ).should('have.text', 'OSM');

            // Check that the popop window is inside the window dimensions
            cy.window().then((win) => {
              const displaywindow = Cypress.$('.ngeo-displaywindow > .windowcontainer');
              const popupWidth = displaywindow.width();
              const popupHeight = displaywindow.height();
              const windowWidth = win.innerWidth;
              const windowHeight = win.innerHeight;
              cy.wrap(popupWidth).should('be.lessThan', windowWidth);
              cy.wrap(popupHeight).should('be.lessThan', windowHeight);
            });

            cy.get('.ngeo-displaywindow > .windowcontainer > .btn').click();
            cy.get('.ngeo-displaywindow > .windowcontainer').should('not.be.visible');
          });
        });
      });
    });
  });

  /**
   * Disclaimer tests
   */
  context('Disclaimer', () => {
    it('Show and hide a disclaimer', () => {
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/mobile.html?lang=en');

      cy.get('gmf-disclaimer').should('be.visible');
      cy.get('gmf-disclaimer .fa').click();
      cy.get('gmf-disclaimer').should('not.be.visible');
    });
  });

  /**
   * Login tests
   */
  context('Login', () => {
    it('Log in and out', () => {
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/mobile.html?lang=en');
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('[data-target="#login"]').click();

      cy.get('#login').then((authPanel) => {
        cy.wrap(authPanel)
          .find('input[name="login"]')
          .type(Cypress.env('demoUser')['login'] as string);
        cy.wrap(authPanel)
          .find('input[name="password"]')
          .type(Cypress.env('demoUser')['password'] as string, {force: true}); // From https://github.com/cypress-io/cypress/issues/5830
        cy.wrap(authPanel).find('input[type="submit"]').click();
        cy.wait('@login').then((interception) => {
          expect(interception.response.statusCode).to.be.eq(200);
          const responseBody = JSON.parse(interception.response.body as string);
          expect(responseBody.username as string).to.be.eq(Cypress.env('demoUser')['login'] as string);
        });
      });

      // Check that the panel is closed when logged
      cy.get('#login').should('not.be.visible');

      // Check the login panel when logged
      cy.get('.gmf-mobile-nav-right-trigger').click();
      cy.get('#login')
        .shadow()
        .then((authPanel) => {
          cy.wrap(authPanel)
            .find('div > strong')
            .should('have.text', Cypress.env('demoUser')['login'] as string);
          cy.wrap(authPanel).find('input[value="Change password"]').should('be.visible');
          cy.wrap(authPanel).find('input[value="Logout"]').should('be.visible');

          // Log out and get back on the auth panel
          cy.wrap(authPanel).find('input[value="Logout"]').click();
          cy.wait('@logout').then((interception) => {
            expect(interception.response.statusCode).to.be.eq(200);
            expect(interception.response.body).to.be.eq('true');
          });

          // Not logged with panel open
          cy.get('#login').should('be.visible');

          // Close the login panel
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
    it('Test no flush layertree (desktop_alt)', () => {
      cy.loadPage(false, 'https://localhost:3000/contribs/gmf/apps/mobile_alt.html?lang=en');
      cy.get('.gmf-mobile-nav-left-trigger').click();

      groups.forEach((group) => {
        if (group === 'div.gmf-layertree-node-596' || group === 'div.gmf-layertree-node-597') {
          cy.get(group).should('have.class', 'indeterminate');
        } else {
          cy.get(group).should('have.class', 'off');
        }
      });

      // Add 'Heritage' theme
      cy.contains('Themes').click();
      cy.contains('Heritage').click();

      groups.push('div.gmf-layertree-node-7'); // Heritage
      groups.forEach((group) => {
        if (group === 'div.gmf-layertree-node-596' || group === 'div.gmf-layertree-node-597') {
          cy.get(group).should('have.class', 'indeterminate');
        } else if (group === 'div.gmf-layertree-node-7') {
          cy.get(group).should('have.class', 'on');
        } else {
          cy.get(group).should('have.class', 'off');
        }
      });
    });
  });
});
