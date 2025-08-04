require('isomorphic-fetch');
require('@testing-library/jest-dom');
global.React = require('react');

// Mock hasPointerCapture
if (typeof window !== 'undefined' && !window.Element.prototype.hasPointerCapture) {
  window.Element.prototype.hasPointerCapture = jest.fn();
}

window.HTMLElement.prototype.scrollIntoView = jest.fn();