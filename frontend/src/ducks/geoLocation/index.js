export const GET_GEO_PERMISSION = "get_geo_permission";
export const SET_GEO_PERMISSION = "set_geo_permission";

export const GET_CURRENT_POSITION = "get_current_position";
export const SET_CURRENT_POSITION = "set_current_position";

export const FETCH_ADRESS_BYCOORDS = "fetch_address_bycoords";
export const FETCH_ADRESS_BYQUERY = "fetch_address_byquery";
export const SET_ADDRES_RESULT = "set_address_result";

export const FAILED_GEO = "failed_geo";

export const getPermissionStatus = () => ({
  type: GET_GEO_PERMISSION
});

export const getCurrentPosition = () => ({
  type: GET_CURRENT_POSITION
});

export const selectState = state => state.geo;
export const selectPermission = state => selectState(state).permission;
export const selectCoords = state => ({
  lat: selectState(state).lat,
  lng: selectState(state).lng
});

export default function reducer(
  geo = {
    permission: false,
    query: null,
    lat: null,
    lng: null,
    fetching: false,
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
    case SET_CURRENT_POSITION:
      const { lat, lng } = payload;
      return { ...geo, lat, lng, fetching: false };
    case SET_ADDRES_RESULT:
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
