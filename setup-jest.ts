import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';

/** taiga-ui testing fixes */

// @ts-ignore
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  observe() {
    return null;
  }

  disconnect() {
    return null;
  }

  unobserve() {
    return null;
  }
};
