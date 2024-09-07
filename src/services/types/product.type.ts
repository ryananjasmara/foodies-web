export type GetProductRequest = {
  enabled?: boolean;
  retry?: number;
  staleTime?: number;
  params: GetProductParams;
};

export type GetProductParams = {
  keyword?: string;
};

export type GetProductResponse = {
  id: number;
  name: string;
  type: "Food" | "Beverage";
  qty: number;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
};
