export const keyMap = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

export const getTime =
  Date.now ||
  function getTime() {
    return new Date().getTime();
  };
