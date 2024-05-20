import api from "../utils/api-client";

export const Login = async (userDetails) => {
  return await api.post("/user/login", userDetails);
};
