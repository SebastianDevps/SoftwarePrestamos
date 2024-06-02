import React from "react";
import "./Register.scss";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import { FaUser } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
//import uploadFile from "../../Services/uploadFile";

const Register = () => {
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
      title: "¡Registro exitoso!",
      text: "Has iniciado sesión correctamente.",
    });
    reset();
    navigate("/")
  };

  return (
    <div className="container-register">
      <div className="register-left">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-titte">
            <h2 className="register-title">Registro</h2>
          </div>

          {errors.img &&
            (touchedFields.img || errors.img.type === "required") && (
              <span className="span">{errors.img.message}</span>
            )}
          <div className="input-container">
            <input
              type="file"
              className="input"
              {...register("img", {
                required: "La imagen es requerida",
              })}
            />
            <FaImage className="icon" />
          </div>
          {errors.username &&
            (touchedFields.username || errors.username.type === "required") && (
              <span className="span">{errors.username.message}</span>
            )}

          <div className="input-container">
            <input
              type="text"
              className="input"
              placeholder="Nombre de usuario"
              {...register("username", {
                required: "El nombre es requerido",
                minLength: {
                  value: 4,
                  message: "El nombre de usuario debe ser mayor a 4 caracteres",
                },
                maxLength: {
                  value: 20,
                  message:
                    "El nombre de usuario debe tener máximo 20 caracteres",
                },
              })}
            />
            <FaUser className="icon" />
          </div>
          {errors.phone &&
            (touchedFields.phone || errors.phone.type === "required") && (
              <span className="span">{errors.phone.message}</span>
            )}
          <div className="input-container">
            <input
              type="text"
              className="input"
              placeholder="Numero de Telefono"
              {...register("phone", {
                required: "El numero de telefono es requerido",

                minLength: {
                  value: 10,
                  message:
                    "El numero del usuario debe tener almenos 10 caracteres",
                },
                maxLength: {
                  value: 10,
                  message:
                    "El numero  del usuario debe tener máximo 10 caracteres",
                },
              })}
            />
            <FaPhoneSquareAlt className="icon" />
          </div>
          {errors.email &&
            (touchedFields.email || errors.email.type === "required") && (
              <span className="span">{errors.email.message}</span>
            )}
          <div className="input-container">
            <input
              type="text"
              className="input"
              placeholder="Ingresa tu correo electrónico"
              {...register("email", {
                required: "El correo es requerido",

                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                  message: "El correo no es válido",
                },
              })}
            />
            <MdEmail className="icon" />
          </div>
          {errors.password &&
            (touchedFields.password || errors.password.type === "required") && (
              <span className="span">{errors.password.message}</span>
            )}
          <div className="input-container">
            <input
              type="password"
              className="input"
              placeholder="Ingresa tu contraseña"
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe ser mayor a 6 caracteres",
                },
                maxLength: {
                  value: 16,
                  message: "La contraseña debe ser menor a 16 caracteres",
                },
              })}
            />
            <RiLockPasswordFill className="icon" />
          </div>

          <button type="submit" className="button">
            Registrarse
          </button>
          <div className="container-Iniciar-Sesion">
            <p>
              <Link to="/Login" className="link-login">
                Ya tienes cuenta?{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
