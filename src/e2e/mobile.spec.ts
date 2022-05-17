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

// import './support/commands';

describe('Mobile interface', () => {
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
    // https://www.npmjs.com/package/cy-mobile-commands for swiping ?
  });
  it.skip('should test no flush layertree (desktop_alt)', () => {
    // https://www.npmjs.com/package/cy-mobile-commands for swiping ?
  });
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
  it('should show the current location', () => {
    cy.get('[ngeo-geolocation=""]').click();
    cy.wait(50);
  });
  it('should move the map while showing the current location');
  it('should get back to the current location after moving');
});
