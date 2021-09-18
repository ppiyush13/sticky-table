export const offset = (el) => {
  let left = -el.offsetLeft;
  let top = -el.offsetTop;
  let element = el.offsetParent;

  while (element) {
    left -= element.offsetLeft;
    top -= element.offsetTop;
    element = element.offsetParent;
  }

  return {
    left: left,
    top: top,
  };
};

export const getRect = (el) => {
  if (el instanceof SVGElement) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };
  }
};
