import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth";

export const store = configureStore({
  reducer: { auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


store.subscribe(() => {
  const { user, token } = store.getState().auth;
  if (user) localStorage.setItem("auth", JSON.stringify({ user, token }));
  else localStorage.removeItem("auth");
});