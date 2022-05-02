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

describe('Lidar component', () => {
  it('opens the lidar panel', () => {
    cy.visit(
      'https://localhost:3000/contribs/gmf/apps/desktop_alt.html?map_x=2559736&map_y=1204230&map_zoom=5&dim_FLOOR=*&lang=en&baselayer_ref=OSM%20map&baselayer_opacity=0'
    );

    // Wait for the app to init
    cy.wait(4500);

    // Close disclaimer popup
    cy.get('[ng-model="disclaimerVisibility"] > .modal').click();

    cy.wait(1000);

    // Open the panel 'lidar'
    cy.get('gmf-lidar-button').click();
  });
  it('draws a line and shows the footer', () => {
    cy.wait(1000);

    // Draw a line on the map
    const map = cy.get('gmf-desktop-canvas').shadow().get('gmf-map > div > div > div > canvas').first();
    map.click(100, 200, {force: true});
    map.dblclick(300, 200, {force: true});

    // Check that the footer is visible with lidar graph
    const canvas = cy
      .get('gmf-desktop-canvas')
      .shadow()
      .get('#lidar-footer')
      .shadow()
      .get('#gmf-lidarprofile-container > div.lidarprofile > canvas');
    canvas.should('be.visible');
  });

  it('closes the lidar footer', () => {
    cy.wait(1000);

    // Close the footer
    cy.get('gmf-desktop-canvas')
      .shadow()
      .get('#lidar-footer')
      .shadow()
      .get('#gmf-lidarprofile-container > div.close')
      .click();

    // Check that the footer is closed
    const footer = cy.get('gmf-desktop-canvas').shadow().get('#lidar-footer');
    footer.should('not.be.visible');
  });

  it('closes the lidar panel', () => {
    cy.wait(1000);

    cy.get('gmf-lidar-button').click();
  });
});
