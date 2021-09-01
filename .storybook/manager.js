// Storybook layout configuration.

import { addons } from '@storybook/addons';

// Default layout config.
// Set panelPosition to 'right' to avoid layout issues on opening the browser dev tools.
addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'right',
  enableShortcuts: true,
  isToolshown: true,
  theme: undefined,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: false,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false, },
    zoom: { hidden: false, },
    eject: { hidden: false, },
    copy: { hidden: false, },
    fullscreen: { hidden: false, },
  },
});

// Set default width of the panel to have more space.
// See https://github.com/storybookjs/storybook/issues/9682
const storybookLayout = JSON.parse(localStorage["storybook-layout"]);
if (storybookLayout) {
  const newLayout = { resizerPanel: { x: window.innerWidth - 400, y: 0 }};
  localStorage["storybook-layout"] = JSON.stringify({...storybookLayout, ...newLayout});
}
