 
import axios, { AxiosResponse } from 'axios';

export abstract class HttpServices {
  protected static async get(
    url: string,
    config?: any
  ): Promise<AxiosResponse> {
    try {
      const response = await axios.get(`${url}`, config);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  protected static async post(
    url: string,
    data: any
  ): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${url}`, data);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  protected static async put(
    url: string,
    data: any
  ): Promise<AxiosResponse> {
    try {
      const response = await axios.put(`${url}`, data);
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
      const response = await axios.delete(`${url}`, config);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
