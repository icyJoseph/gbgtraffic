export const ZOOM_IN = "zoom_in";
export const ZOOM_OUT = "zoom_out";
export const OPEN_STOP_CARD = "open_stop_card";
export const CLOSE_STOP_CARD = "close_stop_card";

const MAX_ZOOM = 17;
const MIN_ZOOM = 9;

export const zoomIn = () => ({
  type: ZOOM_IN
});

export const zoomOut = () => ({
  type: ZOOM_OUT
});

export const openStopCard = id => ({
  type: OPEN_STOP_CARD,
  payload: id
});

export const closeStopCard = () => ({
  type: CLOSE_STOP_CARD
});

export const selectState = state => state.map;
export const selectZoom = state => selectState(state).zoom;
export const selectStopCardState = state => selectState(state).stopCard;
export const selectStopId = state => selectState(state).id;

export default function reducer(
  map = { zoom: 13, stopCard: false, id: null },
  { type, payload }
) {
  const { zoom } = map;
  switch (type) {
    case ZOOM_IN:
      return { ...map, zoom: zoom >= MAX_ZOOM ? MAX_ZOOM : zoom + 1 };
    case ZOOM_OUT:
      return { ...map, zoom: zoom <= MIN_ZOOM ? MIN_ZOOM : zoom - 1 };
    case OPEN_STOP_CARD: {
      return { ...map, stopCard: true, id: payload };
    }
    case CLOSE_STOP_CARD: {
      return { ...map, stopCard: false, id: null };
    }
    default:
      return map;
  }
}
