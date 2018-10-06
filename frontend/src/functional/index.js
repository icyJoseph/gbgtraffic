export const curry = f => (...a) => (...b) => f(...a, ...b);

export const createSelector = (selectors, mapToProps) => state => {
  const args = selectors.map(selector => selector(state));
  return mapToProps(...args);
};

export const map = (arr, fn) => arr.map(e => fn(e));
export const pipe = (...funcs) => (...args) =>
  funcs.reduce(
    (prev, curr, index) => (index === 0 ? curr(...args) : curr(prev)),
    args
  );
