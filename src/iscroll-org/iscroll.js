import IScroll from 'iscroll';

const { addEvent, removeEvent, hasPointer, hasTouch } = IScroll.utils;

export default class extends IScroll {
  constructor(el, options) {
    super(el, options);

    /** refresh once the instance is created */
    setTimeout(() => this.refresh(), 0);
  }

  /**
   * Initialise mouse events
   **/
  _initMouseEvents(remove) {
    const eventType = remove ? removeEvent : addEvent;
    const target = this.options.bindToWrapper ? this.wrapper : window;

    if (!this.options.disableMouse) {
      eventType(this.wrapper, 'mousedown', this);
      eventType(target, 'mousemove', this);
      eventType(target, 'mousecancel', this);
      eventType(target, 'mouseup', this);
    }

    if (hasPointer && !this.options.disablePointer) {
      eventType(this.wrapper, 'pointerdown', this);
      eventType(target, 'pointermove', this);
      eventType(target, 'pointercancel', this);
      eventType(target, 'pointerup', this);
    }

    if (hasTouch && !this.options.disableTouch) {
      eventType(this.wrapper, 'touchstart', this);
      eventType(target, 'touchmove', this);
      eventType(target, 'touchcancel', this);
      eventType(target, 'touchend', this);
    }
  }

  /**
   * Initializes events
   * @override
   */
  _initEvents(remove) {
    const eventType = remove ? removeEvent : addEvent;
    const target = this.options.bindToWrapper ? this.wrapper : window;

    eventType(window, 'orientationchange', this);
    eventType(window, 'resize', this);

    if (this.options.click) {
      eventType(this.wrapper, 'click', this, true);
    }
    this._initMouseEvents(remove);
  }

  /**
   * Translate virtual scroll
   */
  _translate(x, y) {
    this.x = x;
    this.y = y;
    this._execEvent('translate', x * -1, y);
  }

  _wheel(e) {
    if (!this.enabled) {
      return;
    }

    let wheelDeltaX;
    let wheelDeltaY;
    let newX;
    let newY;

    if (this.wheelTimeout === undefined) {
      this._execEvent('scrollStart');
    }

    // Execute the scrollEnd event after 400ms the wheel stopped scrolling
    clearTimeout(this.wheelTimeout);
    this.wheelTimeout = setTimeout(() => {
      if (!this.options.snap) {
        this._execEvent('scrollEnd');
      }
      this.wheelTimeout = undefined;
    }, 400);

    if ('deltaX' in e) {
      if (e.deltaMode === 1) {
        wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
        wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
      } else {
        wheelDeltaX = -e.deltaX;
        wheelDeltaY = -e.deltaY;
      }
    } else if ('wheelDeltaX' in e) {
      wheelDeltaX = (e.wheelDeltaX / 120) * this.options.mouseWheelSpeed;
      wheelDeltaY = (e.wheelDeltaY / 120) * this.options.mouseWheelSpeed;
    } else if ('wheelDelta' in e) {
      wheelDeltaX = wheelDeltaY =
        (e.wheelDelta / 120) * this.options.mouseWheelSpeed;
    } else if ('detail' in e) {
      wheelDeltaX = wheelDeltaY =
        (-e.detail / 3) * this.options.mouseWheelSpeed;
    } else {
      return;
    }

    wheelDeltaX *= this.options.invertWheelDirection;
    wheelDeltaY *= this.options.invertWheelDirection;

    if (wheelDeltaX === 0 && !this.hasHorizontalScroll) return;
    else if (wheelDeltaX === 0 && !this.hasVerticalScroll) return;

    e.preventDefault();

    newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
    newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

    this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
    this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

    if (newX > 0) {
      newX = 0;
    } else if (newX < this.maxScrollX) {
      newX = this.maxScrollX;
    }

    if (newY > 0) {
      newY = 0;
    } else if (newY < this.maxScrollY) {
      newY = this.maxScrollY;
    }

    this.scrollTo(newX, newY, 0);

    if (this.options.probeType > 1) {
      this._execEvent('scroll');
    }
  }

  enableMouseEvents() {
    this.enable = true;
    this._initMouseEvents();
  }

  disableMouseEvents() {
    this.enable = false;
    this._initMouseEvents(true);
  }
}
