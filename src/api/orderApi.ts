import type { Order } from "../store/actions";

const BASE_URL = "http://localhost:7070/api";

export const sendOrder = async (order: Order): Promise<void> => {
  const response = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка при оформлении заказа: ${errorText}`);
  }

  return;
};
