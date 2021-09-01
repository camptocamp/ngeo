// Storybook global configuration for stories.

import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

// Default global configuration.
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
