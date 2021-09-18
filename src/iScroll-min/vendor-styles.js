const browserVendor = (function () {
  const _elementStyle = document.createElement("div").style;
  const vendors = ["t", "webkitT", "MozT", "msT", "OT"];

  for (let i = 0; i < vendors.length; i++) {
    const transform = vendors[i] + "ransform";
    if (transform in _elementStyle)
      return vendors[i].substr(0, vendors[i].length - 1);
  }

  return false;
})();

function prefixStyle(style) {
  if (browserVendor === false) return false;
  if (browserVendor === "") return style;
  return browserVendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export const vendorStyles = {
  touchAction: prefixStyle("touchAction"),
};
