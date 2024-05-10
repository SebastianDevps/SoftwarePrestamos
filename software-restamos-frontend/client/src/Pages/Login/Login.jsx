import React from "react";
import "./Login.scss";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await Swal.fire({
      icon: "success",
      title: "¡Inicio de sesión exitoso!",
      text: "Has iniciado sesión correctamente.",
    });
    reset();
    navigate("/")
  };

  return (
    <div className="container-login">
      <div className="login-left">
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-title-login">
            <h2 className="register-title-login">Iniciar sesión</h2>
          </div>

          {errors.username &&
            (touchedFields.username || errors.username.type === "required") && (
              <span className="span">{errors.username.message}</span>
            )}
          <div className="input-container-login">
            <input
              type="text"
              className="input-login"
              placeholder="Usuario"
              {...register("username", {
                required: "El nombre de usuario es requerido",
              })}
            />
            <FaUser className="icon-login" />
          </div>
          {errors.password &&
            (touchedFields.password || errors.password.type === "required") && (
              <span className="span">{errors.password.message}</span>
            )}
          <div className="input-container-login">
            <input
              type="password"
              className="input-login"
              placeholder="Ingresa tu contraseña"
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 3,
                  message: "La contraseña debe ser mayor a 6 caracteres",
                },
                maxLength: {
                  value: 16,
                  message: "La contraseña debe ser menor a 16 caracteres",
                },
              })}
            />
            <RiLockPasswordFill className="icon-login" />
          </div>

          <button type="submit" className="button-login">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
