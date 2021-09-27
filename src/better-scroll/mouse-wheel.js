/*!
 * better-scroll / mouse-wheel
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */

/* istanbul ignore next  */
const supportsPassive = (() => {
  const EventName = 'test-passive';
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function () {},
    });
    window.addEventListener(EventName, function () {}, opts);
    return true;
  } catch (e) {
    return false;
  }
})();
function addEvent(el, type, fn, capture) {
  var useCapture = supportsPassive
    ? {
        passive: false,
        capture: !!capture,
      }
    : !!capture;
  el.addEventListener(type, fn, useCapture);
}
function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, {
    capture: !!capture,
  });
}
function preventDefaultExceptionFn(el, exceptions) {
  for (var i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true;
    }
  }
  return false;
}

var EventRegister = /** @class */ (function () {
  function EventRegister(wrapper, events) {
    this.wrapper = wrapper;
    this.events = events;
    this.addDOMEvents();
  }
  EventRegister.prototype.destroy = function () {
    this.removeDOMEvents();
    this.events = [];
  };
  EventRegister.prototype.addDOMEvents = function () {
    this.handleDOMEvents(addEvent);
  };
  EventRegister.prototype.removeDOMEvents = function () {
    this.handleDOMEvents(removeEvent);
  };
  EventRegister.prototype.handleDOMEvents = function (eventOperation) {
    var _this = this;
    var wrapper = this.wrapper;
    this.events.forEach(function (event) {
      eventOperation(wrapper, event.name, _this, !!event.capture);
    });
  };
  EventRegister.prototype.handleEvent = function (e) {
    var eventType = e.type;
    this.events.some(function (event) {
      if (event.name === eventType) {
        event.handler(e);
        return true;
      }
      return false;
    });
  };
  return EventRegister;
})();

var MouseWheel = /** @class */ (function () {
  function MouseWheel(scroll) {
    this.scroll = scroll;
    this.wheelEndTimer = 0;
    this.wheelMoveTimer = 0;
    this.wheelStart = false;
    this.init();
  }
  MouseWheel.prototype.init = function () {
    this.handleBScroll();
    this.handleOptions();
    this.handleHooks();
    this.registerEvent();

    setTimeout(() => {
      this.scroll.refresh();
    }, 0);
  };
  MouseWheel.prototype.handleBScroll = function () {
    this.scroll.registerType([
      'alterOptions',
      'mousewheelStart',
      'mousewheelMove',
      'mousewheelEnd',
    ]);
  };
  MouseWheel.prototype.handleOptions = function () {
    var userOptions =
      this.scroll.options.mouseWheel === true
        ? {}
        : this.scroll.options.mouseWheel;
    var defaultOptions = {
      speed: 20,
      invert: false,
      easeTime: 300,
      discreteTime: 400,
      throttleTime: 0,
      dampingFactor: 0.1,
    };
    this.mouseWheelOpt = { ...defaultOptions, ...userOptions };
  };
  MouseWheel.prototype.handleHooks = function () {
    this.hooksFn = [];
    this.registerHooks(this.scroll.hooks, 'destroy', this.destroy);
  };
  MouseWheel.prototype.registerEvent = function () {
    this.eventRegister = new EventRegister(this.scroll.scroller.wrapper, [
      {
        name: 'wheel',
        handler: this.wheelHandler.bind(this),
      },
      {
        name: 'mousewheel',
        handler: this.wheelHandler.bind(this),
      },
      {
        name: 'DOMMouseScroll',
        handler: this.wheelHandler.bind(this),
      },
    ]);
  };
  MouseWheel.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  MouseWheel.prototype.wheelHandler = function (e) {
    if (!this.scroll.enabled) {
      return;
    }
    this.beforeHandler(e);
    // start
    if (!this.wheelStart) {
      this.wheelStartHandler(e);
      this.wheelStart = true;
    }
    // move
    var delta = this.getWheelDelta(e);
    this.wheelMoveHandler(delta);
    // end
    this.wheelEndDetector(delta);
  };
  MouseWheel.prototype.wheelStartHandler = function (e) {
    this.cleanCache();
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY;
    scrollBehaviorX.setMovingDirection(0 /* Default */);
    scrollBehaviorY.setMovingDirection(0 /* Default */);
    scrollBehaviorX.setDirection(0 /* Default */);
    scrollBehaviorY.setDirection(0 /* Default */);
    this.scroll.trigger(
      this.scroll.eventTypes.alterOptions,
      this.mouseWheelOpt
    );
    this.scroll.trigger(this.scroll.eventTypes.mousewheelStart);
  };
  MouseWheel.prototype.cleanCache = function () {
    this.deltaCache = [];
  };
  MouseWheel.prototype.wheelMoveHandler = function (delta) {
    var _this = this;
    var _a = this.mouseWheelOpt,
      throttleTime = _a.throttleTime,
      dampingFactor = _a.dampingFactor;
    if (throttleTime && this.wheelMoveTimer) {
      this.deltaCache.push(delta);
    } else {
      var cachedDelta = this.deltaCache.reduce(
        function (prev, current) {
          return {
            x: prev.x + current.x,
            y: prev.y + current.y,
          };
        },
        { x: 0, y: 0 }
      );
      this.cleanCache();
      var _b = this.scroll.scroller,
        scrollBehaviorX = _b.scrollBehaviorX,
        scrollBehaviorY = _b.scrollBehaviorY;
      scrollBehaviorX.setMovingDirection(-delta.directionX);
      scrollBehaviorY.setMovingDirection(-delta.directionY);
      scrollBehaviorX.setDirection(delta.x);
      scrollBehaviorY.setDirection(delta.y);
      // when out of boundary, perform a damping scroll
      var newX = scrollBehaviorX.performDampingAlgorithm(
        Math.round(delta.x) + cachedDelta.x,
        dampingFactor
      );
      var newY = scrollBehaviorY.performDampingAlgorithm(
        Math.round(delta.y) + cachedDelta.x,
        dampingFactor
      );
      if (
        !this.scroll.trigger(this.scroll.eventTypes.mousewheelMove, {
          x: newX,
          y: newY,
        })
      ) {
        var easeTime = this.getEaseTime();
        if (newX !== this.scroll.x || newY !== this.scroll.y) {
          this.scroll.scrollTo(newX, newY, easeTime);
        }
      }
      if (throttleTime) {
        this.wheelMoveTimer = window.setTimeout(function () {
          _this.wheelMoveTimer = 0;
        }, throttleTime);
      }
    }
  };
  MouseWheel.prototype.wheelEndDetector = function (delta) {
    var _this = this;
    window.clearTimeout(this.wheelEndTimer);
    this.wheelEndTimer = window.setTimeout(function () {
      _this.wheelStart = false;
      window.clearTimeout(_this.wheelMoveTimer);
      _this.wheelMoveTimer = 0;
      _this.scroll.trigger(_this.scroll.eventTypes.mousewheelEnd, delta);
    }, this.mouseWheelOpt.discreteTime);
  };
  MouseWheel.prototype.getWheelDelta = function (e) {
    var _a = this.mouseWheelOpt,
      speed = _a.speed,
      invert = _a.invert;
    var wheelDeltaX = 0;
    var wheelDeltaY = 0;
    var direction = invert ? -1 /* Negative */ : 1; /* Positive */
    switch (true) {
      case 'deltaX' in e:
        if (e.deltaMode === 1) {
          wheelDeltaX = -e.deltaX * speed;
          wheelDeltaY = -e.deltaY * speed;
        } else {
          wheelDeltaX = -e.deltaX;
          wheelDeltaY = -e.deltaY;
        }
        break;
      case 'wheelDeltaX' in e:
        wheelDeltaX = (e.wheelDeltaX / 120) * speed;
        wheelDeltaY = (e.wheelDeltaY / 120) * speed;
        break;
      case 'wheelDelta' in e:
        wheelDeltaX = wheelDeltaY = (e.wheelDelta / 120) * speed;
        break;
      case 'detail' in e:
        wheelDeltaX = wheelDeltaY = (-e.detail / 3) * speed;
        break;
    }
    wheelDeltaX *= direction * 10;
    wheelDeltaY *= direction;
    // if (!this.scroll.hasVerticalScroll) {
    //     if (Math.abs(wheelDeltaY) > Math.abs(wheelDeltaX)) {
    //         wheelDeltaX = wheelDeltaY;
    //     }
    //     wheelDeltaY = 0;
    // }
    if (!this.scroll.hasHorizontalScroll) {
      wheelDeltaX = 0;
    }
    var directionX =
      wheelDeltaX > 0
        ? -1 /* Negative */
        : wheelDeltaX < 0
        ? 1 /* Positive */
        : 0; /* Default */
    var directionY =
      wheelDeltaY > 0
        ? -1 /* Negative */
        : wheelDeltaY < 0
        ? 1 /* Positive */
        : 0; /* Default */
    return {
      x: wheelDeltaX,
      y: wheelDeltaY,
      directionX: directionX,
      directionY: directionY,
    };
  };
  MouseWheel.prototype.beforeHandler = function (e) {
    var _a = this.scroll.options,
      preventDefault = _a.preventDefault,
      stopPropagation = _a.stopPropagation,
      preventDefaultException = _a.preventDefaultException;
    if (
      preventDefault &&
      !preventDefaultExceptionFn(e.target, preventDefaultException)
    ) {
      e.preventDefault();
    }
    if (stopPropagation) {
      e.stopPropagation();
    }
  };
  MouseWheel.prototype.getEaseTime = function () {
    var SAFE_EASETIME = 100;
    var easeTime = this.mouseWheelOpt.easeTime;
    // scrollEnd event will be triggered in every calling of scrollTo when easeTime is too small
    // easeTime needs to be greater than 100
    if (easeTime < SAFE_EASETIME) {
      console.error(
        'easeTime should be greater than 100.' +
          'If mouseWheel easeTime is too small,' +
          'scrollEnd will be triggered many times.'
      );
    }
    return Math.max(easeTime, SAFE_EASETIME);
  };
  MouseWheel.prototype.destroy = function () {
    this.eventRegister.destroy();
    window.clearTimeout(this.wheelEndTimer);
    window.clearTimeout(this.wheelMoveTimer);
    this.hooksFn.forEach(function (item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
  };
  MouseWheel.pluginName = 'mouseWheel';
  MouseWheel.applyOrder = 'pre' /* Pre */;
  return MouseWheel;
})();

export default MouseWheel;
