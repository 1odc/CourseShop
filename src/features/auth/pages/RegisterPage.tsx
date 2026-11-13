import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterForm } from "../schemas";
import { authApi } from "../api/authApi";
import { setCredentials } from "../model/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterForm> = async ({ name, email, password }) => {
    try {
      setServerError("");
      const data = await authApi.register({ name, email, password });
      dispatch(setCredentials(data));
      navigate("/");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Щось пішло не так");
    }
  };

  return (
    <section className="auth">
      <h1 className="auth__title">Реєстрація</h1>
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth__field">
          <label className="auth__label">Ім'я</label>
          <input className="auth__input" {...register("name")} />
          {errors.name && <p className="auth__error">{errors.name.message}</p>}
        </div>

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

        <div className="auth__field">
          <label className="auth__label">Повторіть пароль</label>
          <input className="auth__input" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="auth__error">{errors.confirmPassword.message}</p>
          )}
        </div>

        {serverError && <p className="auth__error">{serverError}</p>}

        <button className="auth__button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Реєстрація..." : "Зареєструватися"}
        </button>
      </form>
      <p className="auth__hint">
        Вже є акаунт? <Link to="/login">Увійти</Link>
      </p>
    </section>
  );
}