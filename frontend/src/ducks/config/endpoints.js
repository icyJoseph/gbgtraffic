if (process.env.NODE_ENV === "production") {
  module.exports = {
    token: `${process.env.REACT_APP_BACKEND}/token`,
    byAddress: `${process.env.REACT_APP_BACKEND}/address`,
    byLatLng: `${process.env.REACT_APP_BACKEND}/byLatLng`
  };
} else {
  module.exports = {
    token: "http://localhost:1337/token",
    byAddress: "http://localhost:1337/address",
    byLatLng: "http://localhost:1337/token/byLatLng"
  };
}
