// Define some browser stubs (we run tests in nodeJS)

/* global global */


global.location = {
};

global.document = {
  location: global.location,
  documentMode: undefined,
  getElementById() {
    return this.createElement();
  },
  compareDocumentPosition() {
    return 0;
  },
  documentElement: {
    style: {},
    classList: {
      add() {},
    },
  },
  createTextNode() {},
  createDocumentFragment() {
    return {
        appendChild(c) {
            return c;
        },
    }
  },
  implementation() {
    return {
        createHTMLDocument() {
            return this.createElement();
        }
    };
  },
  createElement() {
    return {
      style: {},
      classList: {
        add() {},
      },
      addEventListener() {},
      appendChild(c) {
        return c;
      },
      insertBefore() {},
      setAttribute() {
        // pass
      },
      cloneNode() {
        return this;
      },
      lastChild() {
        return this;
      },
      getRootNode() {
        return this;
      },
    };
  },
};

global.window = {
    document,
    location: global.location,
    setTimeout() {},
};

global.ResizeObserver = class ResizeObserver {
  observe() {}
};

global.ShadowRoot = class ShadowRoot {};

global.getComputedStyle = () => {
  return {
    height: 42,
    width: 42,
  };
};

global.requestAnimationFrame = () => {};
