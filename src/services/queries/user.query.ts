import { useMutation, UseMutationResult } from "react-query";
import { UserService } from "../apis";
import {
  LoginPayload,
  LoginResponse,
  PutUserPayload,
  PutUserResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types";
import { useToastContext } from "@/contexts/Toast.context";

export const useLogin = (): UseMutationResult<
  LoginResponse,
  unknown,
  LoginPayload,
  unknown
> => {
  const { showToast } = useToastContext();

  const mutation = useMutation<LoginResponse, unknown, LoginPayload, unknown>(
    ["users.login"],
    {
      mutationFn: async (data: LoginPayload) => {
        const response = await UserService.login(data);
        return response.data;
      },
      onSuccess: (data) => {
        const loginData = {
          name: data.user.name,
          id: data.user.id,
          username: data.user.username,
        };
        localStorage.setItem("loginData", JSON.stringify(loginData));
        showToast({
          message: "Login successfully",
          duration: 3000,
          type: "success",
        });
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
    }
  );

  return mutation;
};

export const useUpdateUser = (): UseMutationResult<
  PutUserResponse,
  unknown,
  PutUserPayload,
  unknown
> => {
  const { showToast } = useToastContext();

  const mutation = useMutation<
    PutUserResponse,
    unknown,
    PutUserPayload,
    unknown
  >(["users.updateUser"], {
    mutationFn: async (data: PutUserPayload) => {
      const response = await UserService.updateUser(data);
      return response.data;
    },
    onSuccess: (data) => {
      const loginData = {
        name: data.user.name,
        id: data.user.id,
        username: data.user.username,
      };
      localStorage.setItem("loginData", JSON.stringify(loginData));
      showToast({
        message: "Update user successfully",
        duration: 3000,
        type: "success",
      });
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

export const useRegister = (): UseMutationResult<
  RegisterResponse,
  unknown,
  RegisterPayload,
  unknown
> => {
  const { showToast } = useToastContext();

  const mutation = useMutation<
  RegisterResponse,
    unknown,
    RegisterPayload,
    unknown
  >(["users.register"], {
    mutationFn: async (data: RegisterPayload) => {
      const response = await UserService.register(data);
      return response.data;
    },
    onSuccess: () => {
      showToast({
        message: "Register user successfully",
        duration: 3000,
        type: "success",
      });
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
