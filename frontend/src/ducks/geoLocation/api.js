import axios from "axios";
import { mapToken, byLatLng, byAddress } from "../config/endpoints";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export const checkPermission = () => {
  return new Promise((resolve, reject) => {
    if (navigator.permissions) {
      return navigator.permissions
        .query({ name: "geolocation" })
        .then(result => {
          if (result.state !== "granted") {
            return navigator.geolocation.getCurrentPosition(
              () => resolve("granted"),
              () => resolve("denied"),
              options
            );
          }
          return resolve(result.state);
        })
        .catch(reject);
    } else {
      return navigator.geolocation.getCurrentPosition(
        () => resolve("granted"),
        () => resolve("denied"),
        options
      );
    }
  });
};

export const reportGeolocation = () => {
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

export const getMapToken = () => {
  return axios
    .get(mapToken, { headers: { "Content-Type": "application/json" } })
    .then(({ data }) => ({ ...data }));
};
