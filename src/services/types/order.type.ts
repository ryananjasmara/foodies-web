import { GetProductResponse } from "./product.type";
import { ResponseUser } from "./user.type";

export type CreateOrderPayload = {
  user_id: number;
  product_id: number;
  qty: number;
  total: number;
};

export type CreateOrderResponse = {
  message: string;
};

export type GetOrderHistoryRequest = {
  enabled?: boolean;
  retry?: number;
  staleTime?: number;
  params: GetOrderHistoryParams;
};

export type GetOrderHistoryParams = {
  user_id: number;
};

export type GetOrderHistoryResponse = {
  id: number;
  product_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  qty: number;
  total: number;
  product: GetProductResponse;
  user: ResponseUser;
};
