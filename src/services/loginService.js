import api from "../utils/api-client";

export const Login = async (userDetails) => {
  await api.post("/user/login", userDetails);
};
