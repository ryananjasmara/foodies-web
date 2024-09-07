import { GetProductResponse } from "@/services/types";

const IMAGE_PREFIX = "http://localhost:8000/storage";

export const transformProductData = (
  data: GetProductResponse[]
): GetProductResponse[] => {
  return data.map((product) => ({
    ...product,
    image: `${IMAGE_PREFIX}/${product.image}`,
  }));
};
