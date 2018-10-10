export const GET_GEO_PERMISSION = "get_geo_permission";
export const SET_GEO_PERMISSION = "set_geo_permission";

export const GET_CURRENT_POSITION = "get_current_position";
export const SET_CURRENT_POSITION = "set_current_position";

export const FETCH_MAP_TOKEN = "fetch_map_token";
export const UPDATE_MAP_TOKEN = "update_map_token";
export const SUCCESS_MAP_TOKEN = "sucess_map_token";
export const FAILED_MAP_TOKEN = "failed_map_token";
export const FLUSH_MAP_TOKEN = "flush_map_token";

export const FETCH_ADRESS_BYCOORDS = "fetch_address_bycoords";
export const FETCH_ADRESS_BYQUERY = "fetch_address_byquery";
export const SET_ADDRESS_RESULT = "set_address_result";

export const FAILED_GEO = "failed_geo";

export const getCurrentPosition = () => ({
  type: GET_CURRENT_POSITION
});

export const fetchMapToken = () => ({
  type: FETCH_MAP_TOKEN
});

export const setCurrentPosition = (lat, lng) => ({
  type: SET_CURRENT_POSITION,
  payload: { lat, lng }
});

export const flushMapToken = () => ({
  type: FLUSH_MAP_TOKEN
});

export const selectState = state => state.geo;
export const selectPermission = state => selectState(state).permission;
export const selectCoords = state => ({
  lat: selectState(state).lat,
  lng: selectState(state).lng
});
export const selectMapToken = state => selectState(state).map_token;
export const selectMapTokenExpiry = state =>
  selectState(state).map_token_expiry;

export default function reducer(
  geo = {
    permission: false,
    query: null,
    lat: 57.706827,
    lng: 11.976481,
    fetching: false,
    map_token: null,
    map_token_expiry: null,
    fetching_map_token: false,
    failed_map_token: false,
    previous: {}
  },
  { type, payload }
) {
  switch (type) {
    case SET_GEO_PERMISSION:
      return { ...geo, permission: payload };
    case FETCH_ADRESS_BYCOORDS:
    case FETCH_ADRESS_BYQUERY:
      return { ...geo, fetching: true };
    case FETCH_MAP_TOKEN:
      return { ...geo, fetching_map_token: true, failed_map_token: false };
    case FAILED_MAP_TOKEN:
      return { ...geo, fetching_map_token: false, failed_map_token: true };
    case UPDATE_MAP_TOKEN:
      return {
        ...geo,
        map_token: payload.token,
        map_token_expiry: payload.expires
      };
    case SUCCESS_MAP_TOKEN:
      return { ...geo, fetching_map_token: false };
    case FLUSH_MAP_TOKEN:
      return {
        ...geo,
        map_token: null,
        map_token_expiry: null,
        fetching_map_token: false,
        failed_map_token: false
      };
    case SET_CURRENT_POSITION:
      const { lat, lng } = payload;
      return { ...geo, lat, lng, fetching: false };
    case SET_ADDRESS_RESULT:
      const { query } = payload;
      return {
        ...geo,
        query: { ...payload, query },
        fetching: false,
        previous: { ...geo.previous, ...geo.query }
      };
    default:
      return geo;
  }
}
