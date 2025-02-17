import axios from "axios";

export const createBuyOrder = async (
  pair: string,
  amount: number,
  price: number
) => {
  try {
    const response = await axios.post(`/api/indodax/orders/${pair}/buy`, {
      amount,
      price,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const createSellOrder = async (
  pair: string,
  amount: number,
  price: number
) => {
  try {
    const response = await axios.post(`/api/indodax/orders/${pair}/sell`, {
      amount,
      price,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
