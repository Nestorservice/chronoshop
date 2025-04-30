import "@testing-library/jest-dom";

// Makes the Radix UI components work with JSDOM environments. For more info:
// https://github.com/radix-ui/primitives/issues/420#issuecomment-771615182

// @ts-ignore
global.ResizeObserver = class ResizeObserver {
  // @ts-ignore
  constructor(cb) {
    // @ts-ignore
    this.cb = cb;
  }
  observe() {
    // @ts-ignore
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
  }
  unobserve() {}
};

global.DOMRect = {
  // @ts-ignore
  fromRect: () => ({ top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 }),
};

// JSDOM doesn't implement PointerEvent so we need to mock our own implementation
// Default to mouse left click interaction
// https://github.com/radix-ui/primitives/issues/1207
// https://github.com/jsdom/jsdom/pull/2666
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || "mouse";
  }
}

window.PointerEvent = MockPointerEvent as any;
