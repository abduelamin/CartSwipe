import api from "../utils/api-client";

const setAuthToken = (token) => {
  token
    ? (api.defaults.headers.common["x-auth-token"] = token)
    : delete api.defaults.headers.common["x-auth-token"];
};

export default setAuthToken;
