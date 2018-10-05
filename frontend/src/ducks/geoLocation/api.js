import axios from "axios";
import { byLatLng, byAddress } from "../config/endpoints";

export const checkPermission = () => {
  return new Promise((resolve, reject) => {
    if (navigator.permissions) {
      return navigator.permissions
        .query({ name: "geolocation" })
        .then(result => {
          result.onchange = () => resolve(result.state);
          return resolve(result.state);
        })
        .catch(() => reject());
    }
    reject();
  });
};

export const reportGeolocation = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => resolve({ lat, lng }),
      err => reject(err),
      options
    )
  );
};

export const getByLatLng = coords => {
  return axios.post(byLatLng, { ...coords }).then(({ data }) => data);
};

export const getByAdress = address => {
  return axios.post(byAddress, { address }).then(({ data }) => data);
};
