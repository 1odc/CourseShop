import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "../schemas";
import { authApi } from "../api/authApi";
import { setCredentials } from "../model/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginForm> = async (values) => {
    try {
      setServerError("");
      const data = await authApi.login(values);
      dispatch(setCredentials(data));
      navigate(data.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Щось пішло не так");
    }
  };

  return (
    <section className="auth">
      <h1 className="auth__title">Вхід</h1>
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth__field">
          <label className="auth__label">Email</label>
          <input className="auth__input" type="email" {...register("email")} />
          {errors.email && <p className="auth__error">{errors.email.message}</p>}
        </div>

        <div className="auth__field">
          <label className="auth__label">Пароль</label>
          <input className="auth__input" type="password" {...register("password")} />
          {errors.password && <p className="auth__error">{errors.password.message}</p>}
        </div>

        {serverError && <p className="auth__error">{serverError}</p>}

        <button className="auth__button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Вхід..." : "Увійти"}
        </button>
      </form>
      <p className="auth__hint">
        Немає акаунта? <Link to="/register">Зареєструватися</Link>
      </p>
    </section>
  );
}