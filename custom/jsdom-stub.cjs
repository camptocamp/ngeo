const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

global.window = dom.window;
global.document = dom.window.document;
global.location = dom.window.location;
