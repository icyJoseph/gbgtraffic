export const FETCH_TOKEN = "fetch_token";
export const FAILED_TOKEN = "failed_token";
export const SUCCESS_TOKEN = "success_token";
export const UPDATE_TOKEN = "update_token";

export const fetchToken = () => {
  return {
    type: FETCH_TOKEN
  };
};

export const selectState = state => state.auth;
export const selectToken = state => selectState(state).access_token;
export const selectId = state => selectState(state).id;
export const selectExpiry = state => selectState(state).expiry;
export const selectFailed = state => selectState(state).failed;

export default function reducer(
  auth = {
    id: null,
    scope: null,
    token_type: null,
    expires_in: null,
    access_token: null,
    expiry: null,
    failed: false
  },
  { type, payload }
) {
  switch (type) {
    case UPDATE_TOKEN:
      return { ...auth, ...payload, failed: false };
    case FAILED_TOKEN:
      return { ...auth, failed: true };
    default:
      return auth;
  }
}
