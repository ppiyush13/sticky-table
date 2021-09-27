import { keyMap, getTime } from './utils';
import { vendorStyles } from './vendor-styles';
import {
  addEvent,
  removeEvent,
  preventDefaultException,
  getTouchAction,
  eventType,
} from './event';
import { momentum } from './momentum';
import { hasPointer, hasTouch } from './sniff-feature';
import { offset, getRect } from './offset';
import { easeFns } from './ease-fns';

export class VirtualScroll {
  constructor(el, options) {
    this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
    this.scroller = this.wrapper.children[0];

    this.options = {
      keyBindings: false,
      arrowKeyDisplacement: 40,

      // INSERT POINT: OPTIONS
      disablePointer: !hasPointer,
      disableTouch: hasPointer || !hasTouch,
      disableMouse: hasPointer || hasTouch,
      startX: 0,
      startY: 0,
      scrollY: true,
      directionLockThreshold: 5,
      momentum: true,

      bounceTime: 600,
      bounceEasing: 'circular',

      preventDefault: true,
      preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

      bindToWrapper: typeof window.onmousedown === 'undefined',
      ...options,
    };

    // Normalize options
    this.options.eventPassthrough =
      this.options.eventPassthrough === true
        ? 'vertical'
        : this.options.eventPassthrough;
    this.options.preventDefault =
      !this.options.eventPassthrough && this.options.preventDefault;

    // If you want eventPassthrough I have to lock one of the axes
    this.options.scrollY =
      this.options.eventPassthrough === 'vertical'
        ? false
        : this.options.scrollY;
    this.options.scrollX =
      this.options.eventPassthrough === 'horizontal'
        ? false
        : this.options.scrollX;

    // With eventPassthrough we also need lockDirection mechanism
    this.options.freeScroll =
      this.options.freeScroll && !this.options.eventPassthrough;
    this.options.directionLockThreshold = this.options.eventPassthrough
      ? 0
      : this.options.directionLockThreshold;

    this.options.bounceEasingFn = easeFns[this.options.bounceEasing];

    this.options.resizePolling =
      this.options.resizePolling === undefined
        ? 60
        : this.options.resizePolling;

    this.options.invertWheelDirection = this.options.invertWheelDirection
      ? -1
      : 1;

    // INSERT POINT: NORMALIZATION

    // Some defaults
    this.x = 0;
    this.y = 0;
    this.directionX = 0;
    this.directionY = 0;
    this._events = {};

    // INSERT POINT: DEFAULTS

    this._init();
    this.refresh();

    this.scrollTo(this.options.startX, this.options.startY);
    this.enable();
  }

  _init() {
    this._initEvents();

    if (this.options.mouseWheel) {
      this._initWheel();
    }
    if (this.options.keyBindings) {
      this._initKeys();
    }
  }
}
