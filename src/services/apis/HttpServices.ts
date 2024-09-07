import axios, { AxiosResponse } from "axios";

const API_HOST = import.meta.env.VITE_API_HOST as string;

export abstract class HttpServices {
  protected static async get(
    url: string,
    config?: any
  ): Promise<AxiosResponse> {
    try {
      const response = await axios.get(`${API_HOST}${url}`, config);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  protected static async post(url: string, data: any): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${API_HOST}${url}`, data);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  protected static async put(url: string, data: any): Promise<AxiosResponse> {
    try {
      const response = await axios.put(`${API_HOST}${url}`, data);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  protected static async delete(
    url: string,
    config?: any
  ): Promise<AxiosResponse> {
    try {
      const response = await axios.delete(`${API_HOST}${url}`, config);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
