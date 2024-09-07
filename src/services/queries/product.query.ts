import { useQuery, UseQueryResult } from "react-query";
import { ProductService } from "@/services/apis";
import { GetProductRequest, GetProductResponse } from "@/services/types";
import { PaginatedResponse } from "@/shared/types";
import { useToastContext } from "@/contexts/Toast.context";
import { transformProductData } from "../transformers";

export const useGetAllProduct = (
  opts: GetProductRequest
): UseQueryResult<PaginatedResponse<GetProductResponse>> => {
  const { showToast } = useToastContext();

  return useQuery(
    ["products.getAllProduct", opts.params],
    ({ signal }) =>
      ProductService.getAllProduct(opts.params, signal)
        .then((res) => {
          return {
            ...res.data,
            data: transformProductData(res?.data.data),
          };
        })
        .catch((error: any) => {
          if (error?.message !== "canceled") {
            showToast({
              message: "Something went wrong",
              duration: 3000,
              type: "error",
            });
            throw error;
          }
        }),
    {
      enabled: opts?.enabled || false,
      retry: opts?.retry || false,
      staleTime: opts?.staleTime || 0,
    }
  );
};
