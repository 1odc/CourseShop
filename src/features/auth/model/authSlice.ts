import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse, User } from "../types";

export interface AuthState {
  user: User | null;
  token: string | null;
}

const saved = JSON.parse(localStorage.getItem("auth") ?? "null") as AuthResponse | null;

const initialState: AuthState = {
  user: saved?.user ?? null,
  token: saved?.token ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, { payload }: PayloadAction<AuthResponse>) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;