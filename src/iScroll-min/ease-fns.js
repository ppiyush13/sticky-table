export const easeFns = {
  quadratic: {
    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fn: (k) => k * (2 - k),
  },
  circular: {
    style: "cubic-bezier(0.1, 0.57, 0.1, 1)", // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
    fn: (k) => Math.sqrt(1 - --k * k),
  },
  back: {
    style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    fn: (k) => {
      const b = 4;
      return (k = k - 1) * k * ((b + 1) * k + b) + 1;
    },
  },
  bounce: {
    style: "",
    fn: (k) => {
      if ((k /= 1) < 1 / 2.75) return 7.5625 * k * k;
      else if (k < 2 / 2.75) return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      else if (k < 2.5 / 2.75) return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      else return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
    },
  },
  elastic: {
    style: "",
    fn: (k) => {
      const f = 0.22;
      const e = 0.4;

      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }

      return (
        e * Math.pow(2, -10 * k) * Math.sin(((k - f / 4) * (2 * Math.PI)) / f) +
        1
      );
    },
  },
};
