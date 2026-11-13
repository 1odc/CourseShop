import api from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { AuthResponse, User } from "../types";

type UserDto = User & { password: string };

const mapUser = (u: UserDto): User => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
});

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
}

export const authApi = {
  login: async ({ email, password }: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.get<UserDto[]>(endpoints.users, {
      params: { email, password },
    });
    if (data.length === 0) throw new Error("Невірний email або пароль");
    return { user: mapUser(data[0]), token: `fake-token-${data[0].id}` };
  },

  register: async ({ name, email, password }: RegisterPayload): Promise<AuthResponse> => {
    const { data: existing } = await api.get<UserDto[]>(endpoints.users, {
      params: { email },
    });
    if (existing.length > 0) throw new Error("Користувач з таким email вже існує");

    const { data } = await api.post<UserDto>(endpoints.users, {
      name,
      email,
      password,
      role: "student",
    });
    return { user: mapUser(data), token: `fake-token-${data.id}` };
  },
};