const express = require("express");
const Webtask = require("webtask-tools");
const bodyParser = require("body-parser");
const axios = require("axios");
const uuid = require("uuid/v1");
const qs = require("qs");

const app = express();

const tokenEndPoint = "https://api.vasttrafik.se/token";

const makeGeoURL = (key, encodedAddress) =>
  `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodedAddress}`;

const makeReverseGeoURL = (key, { lat, lng }) =>
  `http://www.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${lat},${lng}`;

// method to get geolocation from MapQuest
const getGeoLocation = (url, res) => {
  return axios
    .get(url)
    .then(({ data }) => {
      const [
        { street, postalCode, adminArea5, adminArea1, latLng }
      ] = data.results[0].locations;

      return {
        street,
        postalCode,
        city: adminArea5,
        country: adminArea1,
        ...latLng
      };
    })
    .then(geo => {
      return res.status(200).send(geo);
    })
    .catch(() => res.stats(404).send({ error: "GeoLocation problem" }));
};

// method to get token from VT
const getToken = key => {
  const id = uuid();
  return axios
    .post(
      tokenEndPoint,
      qs.stringify({
        grant_type: "client_credentials",
        scope: id
      }),
      {
        headers: {
          Authorization: `Basic ${key}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded;"
        }
      }
    )
    .then(res => {
      return {
        id,
        token: res.data,
        expiry: new Date().getTime() + 60 * 60 * 1000
      };
    });
};

// middleware
const jsonParser = bodyParser.json();
app.use(jsonParser);

//endpoints
app.get("/token", (req, res) => {
  const { webtaskContext } = req;
  const {
    secrets: { VT_KEY }
  } = webtaskContext;
  return getToken(VT_KEY)
    .then(token => res.status(200).send(token))
    .catch(() => res.status(401).send({ error: "Failed to get token" }));
});

app.post("/byLatLng", (req, res) => {
  const { webtaskContext, body } = req;
  const {
    secrets: { GEOLOCATION_KEY }
  } = webtaskContext;
  const { lat, lng } = body;
  const geoURL = makeReverseGeoURL(GEOLOCATION_KEY, { lat, lng });
  return getGeoLocation(geoURL, res);
});

app.post("/address", (req, res) => {
  const { webtaskContext, body } = req;
  const {
    secrets: { GEOLOCATION_KEY }
  } = webtaskContext;
  const { address } = body;
  const encodedAddress = encodeURIComponent(address);
  const geoURL = makeGeoURL(GEOLOCATION_KEY, encodedAddress);
  return getGeoLocation(geoURL, res);
});

module.exports = Webtask.fromExpress(app);
