import React, { useState, useEffect } from "react";
import "./Login.scss";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import AuthServices from "../../services/AuthServices";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, touchedFields }, reset } = useForm();

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
            const userData = await AuthServices.login(data.username, data.password);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                navigate("/app");
                await Swal.fire({
                    icon: "success",
                    title: "¡Éxito!",
                    text: "Ingreso exitoso.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                // Redirige a /app y recarga la página
                window.location.href = "/app";
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Usuario o Contraseña incorrecto. Por favor, intenta nuevamente.",
                });
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            await Swal.fire({
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
                <form className={`form-login ${errors ? "form-login--error" : ""}`} onSubmit={handleSubmit(onSubmit)}>
                    <div className="container-title-login">
                        <h2 className="register-title-login">Iniciar sesión</h2>
                    </div>

                    <h1 className="text">Username</h1>
                    {errors.username && touchedFields.username && (
                        <span className="span">{errors.username.message}</span>
                    )}
                    <div className="input-container-login">
                        <input
                            type="text"
                            className="input-login"
                            placeholder="Ingresa tu Usuario"
                            {...register("username", { required: "El nombre de usuario es requerido*" })}
                        />
                        <FaUser className="icon-login" />
                    </div>

                    <h1 className="text">Password</h1>
                    {errors.password && touchedFields.password && (
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
            <div className="login-right">
                <div className="img"></div>
            </div>
        </div>
    );
};

export default Login;
