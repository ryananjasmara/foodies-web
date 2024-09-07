import { formatQueryString } from "@/shared/utils";
import { HttpServices } from "./HttpServices";
import { GetProductParams } from "../types";

export class ProductService extends HttpServices {
  static getAllProduct(params: GetProductParams, signal?: AbortSignal) {
    const queryString = formatQueryString(params);
    const path = `/api/products${queryString}`;
    return this.get(path, { signal });
  }
}
