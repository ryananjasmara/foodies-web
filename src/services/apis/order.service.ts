import { HttpServices } from "./HttpServices";
import { CreateOrderPayload, GetOrderHistoryParams } from "../types";

export class OrderService extends HttpServices {
  static createOrder(data: CreateOrderPayload, signal?: AbortSignal) {
    return this.post("/api/orders", { ...data, signal });
  }

  static getOrderHistoryByUser(
    params: GetOrderHistoryParams,
    signal?: AbortSignal
  ) {
    const path = `/api/orders/history/${params.user_id}`;
    return this.get(path, { signal });
  }
}
