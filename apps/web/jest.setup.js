require('isomorphic-fetch');
require('@testing-library/jest-dom');
global.React = require('react');

// Mock hasPointerCapture
if (typeof window !== 'undefined' && !window.Element.prototype.hasPointerCapture) {
  window.Element.prototype.hasPointerCapture = jest.fn();
}

window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Configure @testing-library/react for React 19
if (parseInt(React.version.split('.')[0], 10) >= 19) {
  const { configure } = require('@testing-library/react');
  configure({ hydrate: true });
}