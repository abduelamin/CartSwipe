import api from "../utils/api-client";

export const signUp = async (user, profileImage) => {
  const userData = new FormData();

  userData.append("name", user.name);
  userData.append("email", user.email);
  userData.append("password", user.password);
  userData.append("deliveryAddress", user.deliveryAddress);
  userData.append("profilePic", profileImage);

  await api.post("/user/signup", userData);
};
