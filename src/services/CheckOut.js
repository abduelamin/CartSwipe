import api from "../utils/api-client";

export const checkoutAPI = async (cart) => {
  return await api.post("/order/checkout", { cart });
};

export const myOrdersAPI = async () => {
  return await api.get("/order");
};
