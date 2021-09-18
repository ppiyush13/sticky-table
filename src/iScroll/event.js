
export const addEvent = (el, type, fn, capture) => el.addEventListener(type, fn, !!capture);
export const removeEvent = (el, type, fn, capture) => el.removeEventListener(type, fn, !!capture);
export const preventDefaultException = (el, exceptions) => {
    for (const i in exceptions) {
        if ( exceptions[i].test(el[i]) ) {
            return true;
        }
    }

    return false;
};

export const getTouchAction = (eventPassthrough, addPinch) => {
    let touchAction = 'none';
    if ( eventPassthrough === 'vertical' ) {
        touchAction = 'pan-y';
    } else if (eventPassthrough === 'horizontal' ) {
        touchAction = 'pan-x';
    }
    if (addPinch && touchAction != 'none') {
        // add pinch-zoom support if the browser supports it, but if not (eg. Chrome <55) do nothing
        touchAction += ' pinch-zoom';
    }
    return touchAction;
}

export const eventType = {
    touchstart: 1,
    touchmove: 1,
    touchend: 1,

    mousedown: 2,
    mousemove: 2,
    mouseup: 2,

    pointerdown: 3,
    pointermove: 3,
    pointerup: 3,

    MSPointerDown: 3,
    MSPointerMove: 3,
    MSPointerUp: 3
};

