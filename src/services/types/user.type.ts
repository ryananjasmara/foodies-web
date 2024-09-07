export type LoginPayload = {
  username: string;
  password: string;
};

export type ResponseUser = {
  id: string;
  username: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type LoginResponse = {
  message: string;
  user: ResponseUser;
};

export type PutUserPayload = {
  id: number;
  username: string;
  password?: string;
  name: string;
};

export type PutUserResponse = {
  message: string;
  user: ResponseUser;
};

export type RegisterPayload = {
  username: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
  message: string;
  user: ResponseUser;
};
