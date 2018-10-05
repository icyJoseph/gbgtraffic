import axios from "axios";

export const backEnd =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_BACKEND}/token`
    : "http://localhost:1337/token";

export const getToken = () => {
  return axios
    .get(backEnd, { headers: { "Content-Type": "application/json" } })
    .then(({ data }) => ({ ...data }));
};
