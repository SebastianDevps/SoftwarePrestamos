import React, { useState, useEffect } from "react";
import "./Login.scss";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm();

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Cargando...",
        html: "Por favor, espera mientras validamos tus datos.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
  }, [loading]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simula una solicitud de inicio de sesión
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await Swal.fire({
        icon: "success",
        title: "¡Yupi!",
        text: "Has iniciado sesión correctamente.",
        showConfirmButton: false,
        timer: 1200,
      });
      reset();
      navigate("/app");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-login">
      <div className="login-left">
        <form className={`form-login ${hasErrors ? "form-login--error" : ""}`} onSubmit={handleSubmit(onSubmit)}>
          <div className="container-title-login">
            <h2 className="register-title-login">Iniciar sesión</h2>
          </div>

          <h1 className="text">Username</h1>
          {errors.username &&
            (touchedFields.username || errors.username.type === "required") && (
              <span className="span">{errors.username.message}</span>
            )}
          <div className="input-container-login">

            <input
              type="text"
              className="input-login"
              placeholder="Ingresa tu Usuario"
              {...register("username", {
                required: "El nombre de usuario es requerido*",
              })}
            />
            <FaUser className="icon-login" />
          </div>
          <h1 className="text">Password</h1>
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
                required: "La contraseña es requerida*",
                minLength: {
                  value: 3,
                  message: "La contraseña debe ser mayor a 3 caracteres",
                }
              })}
            />
            <RiLockPasswordFill className="icon-login" />
          </div>

          <button type="submit" className="button-login">
            Iniciar sesión
          </button>
        </form>
      </div>
      <div className="login-right">
        <div className="img">

        </div>
      </div>
    </div>
  );
};

export default Login;
