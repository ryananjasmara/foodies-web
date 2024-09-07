import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { OrderService } from "../apis";
import {
  CreateOrderPayload,
  CreateOrderResponse,
  GetOrderHistoryRequest,
  GetOrderHistoryResponse,
} from "../types";
import { useToastContext } from "@/contexts/Toast.context";
import { PaginatedResponse } from "@/shared/types";
import { transformOrderHistoryData } from "../transformers";

export const useCreateOrder = (): UseMutationResult<
  CreateOrderResponse,
  unknown,
  CreateOrderPayload,
  unknown
> => {
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const mutation = useMutation<
    CreateOrderResponse,
    unknown,
    CreateOrderPayload,
    unknown
  >(["orders.createOrder"], {
    mutationFn: async (data: CreateOrderPayload) => {
      const response = await OrderService.createOrder(data);
      return response.data;
    },
    onSuccess: () => {
      showToast({
        message: "Order created successfully",
        duration: 3000,
        type: "success",
      });
      queryClient.invalidateQueries("products.getAllProduct");
    },
    onError: (error: any) => {
      showToast({
        message: "Something went wrong",
        duration: 3000,
        type: "error",
      });
      throw error;
    },
    retry: 0,
  });

  return mutation;
};

export const useGetOrderHistoryByUser = (
  opts: GetOrderHistoryRequest
): UseQueryResult<PaginatedResponse<GetOrderHistoryResponse>> => {
  const { showToast } = useToastContext();

  return useQuery(
    ["orders.getOrderHistoryByUser", opts.params],
    ({ signal }) =>
      OrderService.getOrderHistoryByUser(opts.params, signal)
        .then((res) => {
          return {
            ...res.data,
            data: transformOrderHistoryData(res?.data.data),
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
