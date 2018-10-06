export const FETCH_NEARBY_STOPS = "fetch_nearby_stops";
export const SUCCESS_NEARBY_STOPS = "success_nearby_stops";
export const FAILED_NEARBY_STOPS = "failed_nearby_stops";

export const FETCH_BOARD = "fetch_board";
export const SUCCESS_BOARD = "success_board";
export const FAILED_BOARD = "failed_board";

export const fetchNearbyStops = () => ({
  type: FETCH_NEARBY_STOPS
});

export const fetchBoard = () => ({
  type: FETCH_BOARD
});

export const selectState = state => state.traffic;
export const selectNearbyStopLocations = state =>
  selectState(state).nearbyStopLocations;
export const selectNearbyStopsFetchingStatus = state =>
  selectState(state).fetchingNearbyStops;

export const selectDepartureBoard = state => selectState(state).Departure;
export const selectArrivalBoard = state => selectState(state).Arrival;

export default function reducer(
  traffic = {
    serverDate: null,
    servertime: null,
    nearbyStopLocations: [],
    fetchingNearbyStops: false,
    errorFetchingNearbyStops: null,
    failed: false,
    Departure: [],
    Arrival: []
  },
  { type, payload }
) {
  switch (type) {
    case FETCH_NEARBY_STOPS:
      return { ...traffic, fetchingNearbyStops: true, failed: false };
    case SUCCESS_NEARBY_STOPS:
      return {
        ...traffic,
        ...payload,
        fetchingNearbyStops: false,
        failed: false
      };
    case FAILED_NEARBY_STOPS:
      return { ...traffic, failed: true };
    case SUCCESS_BOARD:
      return { ...traffic, ...payload };
    default:
      return traffic;
  }
}
