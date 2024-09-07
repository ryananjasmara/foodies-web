import { useGetAllProduct } from "@/services/queries";
import { useDebounce } from "@/shared/hooks";
import { useState } from "react";
import {
  useCreateOrder,
  useGetOrderHistoryByUser,
  useLogin,
  useRegister,
  useUpdateUser,
} from "@/services/queries";
import { GetProductResponse } from "@/services/types";

export const useHomePageUtil = () => {
  const [isOpenModalPurchase, setIsOpenModalPurchase] = useState(false);
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);
  const [isOpenModalOrderHistory, setIsOpenModalOrderHistory] = useState(false);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 1000);
  const [selectedProduct, setSelectedProduct] =
    useState<GetProductResponse | null>(null);

  const createOrderMutation = useCreateOrder();
  const loginMutation = useLogin();
  const updateUserMutation = useUpdateUser();
  const registerMutation = useRegister();

  const loginData = JSON.parse(localStorage.getItem("loginData") || "{}");

  const { data: productData, isLoading: isLoadingProduct } = useGetAllProduct({
    enabled: true,
    params: {
      keyword: debouncedKeyword,
    },
  });
  const { data: orderHistoryData, isLoading: isLoadingOrderHistoryData } =
    useGetOrderHistoryByUser({
      params: {
        user_id: loginData.id,
      },
      enabled: loginData.id && isOpenModalOrderHistory,
    });

  const handleBuy = (product: GetProductResponse) => {
    if (Object.keys(loginData).length === 0) {
      setIsOpenModalLogin(true);
    } else {
      setSelectedProduct(product);
      setIsOpenModalPurchase(true);
    }
  };

  const handleConfirmPurchase = (
    qty: number,
    productId: number,
    total: number
  ) => {
    const payload = {
      user_id: loginData.id,
      product_id: productId,
      qty,
      total,
    };

    createOrderMutation.mutate(payload);
    setIsOpenModalPurchase(false);
  };

  const handleLogin = (username: string, password: string) => {
    loginMutation.mutate({ username, password });
    setIsOpenModalLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setIsOpenModalUser(false);
  };

  const handleUpdateUser = (
    username: string,
    password: string,
    name: string
  ) => {
    updateUserMutation.mutate({ id: loginData.id, username, password, name });
    setIsOpenModalUser(false);
  };

  const handleRegister = (username: string, password: string, name: string) => {
    registerMutation.mutate({ username, password, name });
    setIsOpenModalRegister(false);
  };

  return {
    keyword,
    setKeyword,
    productData,
    isLoadingProduct,
    orderHistoryData,
    isLoadingOrderHistoryData,
    isOpenModalPurchase,
    setIsOpenModalPurchase,
    isOpenModalLogin,
    setIsOpenModalLogin,
    isOpenModalUser,
    setIsOpenModalUser,
    isOpenModalOrderHistory,
    setIsOpenModalOrderHistory,
    isOpenModalRegister,
    setIsOpenModalRegister,
    selectedProduct,
    setSelectedProduct,
    handleBuy,
    handleConfirmPurchase,
    handleLogin,
    handleLogout,
    handleUpdateUser,
    handleRegister,
    loginData,
  };
};
