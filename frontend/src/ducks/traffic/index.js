export const FETCH_NEARBY_STOPS = "fetch_nearby_stops";
export const SUCCESS_NEARBY_STOPS = "success_nearby_stops";
export const FAILED_NEARBY_STOPS = "failed_nearby_sotps";

export const fetchNearbyStops = () => {
  return {
    type: FETCH_NEARBY_STOPS
  };
};

export const selectState = state => state.traffic;
export const selectNearbyStopLocations = state =>
  selectState(state).nearbyStopLocations;

export default function reducer(
  traffic = {
    serverDate: null,
    servertime: null,
    nearbyStopLocations: [],
    fetchingNearbyStops: false,
    errorFetchingNearbyStops: null
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
        failed: true
      };
    case FAILED_NEARBY_STOPS:
      return { ...traffic, failed: true };
    default:
      return traffic;
  }
}
