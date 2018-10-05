export const curry = f => (...a) => (...b) => f(...a, ...b);

export const createSelector = (selectors, mapToProps) => state => {
  const args = selectors.map(selector => selector(state));
  return mapToProps(...args);
};
