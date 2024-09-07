import { HttpServices } from "./HttpServices";
import { LoginPayload, PutUserPayload, RegisterPayload } from "../types";

export class UserService extends HttpServices {
  static login(data: LoginPayload, signal?: AbortSignal) {
    return this.post("/api/login", { ...data, signal });
  }

  static updateUser(data: PutUserPayload, signal?: AbortSignal) {
    const payload = {
      username: data.username,
      password: data.password,
      name: data.name,
    };
    return this.put(`/api/users/${data.id}`, { ...payload, signal });
  }

  static register(data: RegisterPayload, signal?: AbortSignal) {
    return this.post("/api/users", { ...data, signal });
  }
}
