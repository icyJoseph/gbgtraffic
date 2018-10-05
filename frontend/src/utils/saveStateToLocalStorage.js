export function saveState(state) {
  localStorage.setItem("bus-app", JSON.stringify(state));
}

export const getStateAndSave = store => () => {
  const state = store.getState();
  saveState(state);
};

export default function() {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(getStateAndSave(store));
    return store;
  };
}
