interface IScrollOptions {
  bounce?: boolean;
  mouseWheel?: boolean;
  useTransform?: boolean;
  useTransition?: boolean;
  bindToWrapper?: boolean;
  preventDefault?: boolean;
  scrollX?: boolean;
  scrollY?: boolean;
  freeScroll?: boolean;
  eventPassthrough?: string | boolean;
  probeType?: number;
  disableMouse?: boolean;
  disablePointer?: boolean;
  disableTouch?: boolean;
  snap?: string | boolean;
  click?: boolean;
  mouseWheelSpeed?: number;
}

type ManageEvent = (
  target: Window | HTMLElement,
  event: string,
  bindContext: object,
  capture?: boolean,
) => void;

declare module 'iscroll' {
  export = class IScroll {
    static utils: {
      hasPointer: boolean;
      hasTouch: boolean;
      addEvent: ManageEvent;
      removeEvent: ManageEvent;
    };
    constructor(element: HTMLElement, options?: IScrollOptions);
    x: number;
    y: number;
    scale: number;
    wrapper: HTMLElement;
    enabled: boolean;
    options: Required<IScrollOptions>;
    wheelTimeout?: NodeJS.Timeout;
    hasHorizontalScroll: boolean;
    hasVerticalScroll: boolean;
    directionX: -1 | 0 | 1;
    directionY: -1 | 0 | 1;
    maxScrollX: number;
    maxScrollY: number;

    _execEvent(event: string, eventPayload?: object): void;

    destroy(): void;
    refresh(): void;
    scrollTo(x: number, y: number, time?: number, relative?: boolean): void;
    disable(): void;
    enable(): void;
    isReady(): boolean;

    // Events
    on(type: string, fn: (evt: never) => void): void;
    off(type: string, fn?: (evt?: never) => void): void;
  };
}
