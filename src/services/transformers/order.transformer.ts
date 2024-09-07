import { GetOrderHistoryResponse } from "@/services/types";

const IMAGE_PREFIX = "http://localhost:8000/storage";

export const transformOrderHistoryData = (
  data: GetOrderHistoryResponse[]
): GetOrderHistoryResponse[] => {
  return data.map((order) => {
    return {
      ...order,
      product: {
        ...order.product,
        image: `${IMAGE_PREFIX}/${order.product.image}`,
      },
    };
  });
};
