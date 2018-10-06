export const ZOOM_IN = "zoom_in";
export const ZOOM_OUT = "zoom_out";
const MAX_ZOOM = 17;
const MIN_ZOOM = 9;

export const zoomIn = () => ({
  type: ZOOM_IN
});

export const zoomOut = () => ({
  type: ZOOM_OUT
});

export const selectState = state => state.map;
export const selectZoom = state => selectState(state).zoom;

export default function reducer(map = { zoom: 13 }, { type }) {
  const { zoom } = map;
  switch (type) {
    case ZOOM_IN:
      return { ...map, zoom: zoom >= MAX_ZOOM ? MAX_ZOOM : zoom + 1 };
    case ZOOM_OUT:
      return { ...map, zoom: zoom <= MIN_ZOOM ? MIN_ZOOM : zoom - 1 };
    default:
      return map;
  }
}
