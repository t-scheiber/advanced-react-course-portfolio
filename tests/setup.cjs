require("@testing-library/jest-dom");
global.structuredClone = (value) => JSON.parse(JSON.stringify(value));
Object.defineProperty(window, "matchMedia", { value: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) });
global.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
Element.prototype.scrollIntoView = jest.fn();
