import axios from "axios";

export const apiEndPoint = "http://localhost:1337";

// Generate oAuth2 headers
const headers = token => {
  return {
    Authorization: `Bearer ${token}`
  };
};

// This app is built to work with json
const format = "json";

// Get System Info
export const getSystemInfo = token => {
  return axios
    .get(`${apiEndPoint}/systeminfo`, {
      headers: headers(token),
      params: {
        format
      }
    })
    .then(res => {
      const {
        TimetableInfo: { TimeTableData, TimeTablePeriod }
      } = res.data.SystemInfo;

      return {
        creationDate: TimeTableData.CreationDate.$,
        dateBegin: TimeTablePeriod.DateBegin.$,
        dateEnd: TimeTablePeriod.DateEnd.$
      };
    });
};

// Get stop in the nearby location by lat lng
export const getNearbyStops = (token, originCoordLat, originCoordLong) => {
  return axios
    .get(`${apiEndPoint}/location.nearbystops`, {
      headers: headers(token),
      params: { format, originCoordLat, originCoordLong }
    })
    .then(res => {
      const {
        LocationList: { serverdate, servertime, StopLocation }
      } = res.data;
      return {
        serverdate,
        servertime,
        StopLocation
      };
    });
};

// Get stop in the nearby location by address
export const getNearbyAddress = (token, originCoordLat, originCoordLong) => {
  return axios
    .get(`${apiEndPoint}/location.nearbyaddress`, {
      headers: headers(token),
      params: { format, originCoordLat, originCoordLong }
    })
    .then(res => {
      const {
        LocationList: { serverdate, servertime, StopLocation }
      } = res.data;
      return {
        serverdate,
        servertime,
        StopLocation
      };
    });
};

// Get stop in the nearby location by address
export const searchStops = (token, input) => {
  return axios
    .get(`${apiEndPoint}/location.name`, {
      headers: headers(token),
      params: { format, input }
    })
    .then(res => {
      const {
        LocationList: { serverdate, servertime, StopLocation }
      } = res.data;
      return {
        serverdate,
        servertime,
        StopLocation
      };
    });
};

/** Get departureBoard
 * @param date YYYY-MM-DD
 * @param time is in HH:MM
 */
export const getDepartureBoard = (token, id, date, time) => {
  const defaults = {
    useVas: 0,
    useLDTrain: 0,
    useRegTrain: 0,
    excludeDR: 0
  };
  return axios
    .get(`${apiEndPoint}/departureBoard`, {
      headers: headers(token),
      params: { format, id, date, time, ...defaults }
    })
    .then(res => res.data);
};

/** Get arrivalBoard
 * @param date YYYY-MM-DD
 * @param time is in HH:MM
 */
export const getArrivalBoard = (token, id, date, time) => {
  const defaults = {
    useVas: 0,
    useLDTrain: 0,
    useRegTrain: 0,
    excludeDR: 0
  };
  return axios
    .get(`${apiEndPoint}/arrivalBoard`, {
      headers: headers(token),
      params: { format, id, date, time, ...defaults }
    })
    .then(res => res.data);
};

/** Get geometry
 * @param ref of shape 594744%2F215496%2F65992%2F165253%2F80%3F
 */
export const getGeometry = (token, ref) => {
  return axios
    .get(`${apiEndPoint}/geometry`, {
      headers: headers(token),
      params: { format }
    })
    .then(res => res.data);
};

/** Get journey detail
 * @param ref of shape 594744%2F215496%2F65992%2F165253%2F80%3F
 */
export const getJourneyDetail = (token, ref) => {
  return axios
    .get(`${apiEndPoint}/journeyDetail`, {
      headers: headers(token),
      params: { format }
    })
    .then(res => res.data);
};

/** Get trip
 * @param config of shape
 * {originId, originCoordLat, originCoordLong, originCoordName,
 * destId, destCoordLat, destCoordLong, destCoordName}
 * optionals viaId, date, time, searchForArrival,
 */
export const getTrips = (token, config) => {
  const defaults = {
    useVas: 0,
    useLDTrain: 0,
    useRegTrain: 0,
    excludeDR: 0
  };
  return axios
    .get(`${apiEndPoint}/trip`, {
      headers: headers(token),
      params: { format, ...config, ...defaults }
    })
    .then(res => res.data);
};
