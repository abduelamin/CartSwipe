import api from "../utils/api-client";

// we will be calling this API on each product if/when its added to cart. So we will take id of the product(product._id) as our endpoint. Next we have request body object which will hold the quantity of our product. This is because all post requests must contain a body object that includes the data we're sending to the backend
export const addToCartAPI = async (id, quantity) => {
  return await api.post(`/cart/${id}`, { quantity: quantity });
};

export const getCartAPI = async () => {
  return await api.get("/cart");
};

export const removeFromCartAPI = async (id) => {
  return api.patch(`/cart/remove/${id}`);
};

export const increaseProductAPI = async (id) => {
  return api.patch(`/cart/increase/${id}`);
};

export const decreaseProductAPI = async (id) => {
  return api.patch(`/cart/decrease/${id}`);
};
