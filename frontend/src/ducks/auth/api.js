import axios from "axios";
import { token } from "../config/endpoints";

export const getToken = () => {
  return axios
    .get(token, { headers: { "Content-Type": "application/json" } })
    .then(({ data }) => ({ ...data }));
};
