import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import AuthServices from "../../services/AuthServices";
import Cookies from "js-cookie";
import { SiMoneygram } from "react-icons/si";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm();

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

    const handleClick = () => {
        navigate('/'); // O history.push('/') para v5
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await AuthServices.login(data.username, data.password);
            if (res.statusCode === 500) {
                await Swal.fire({
                    icon: "warning",
                    title: "Error de autenticación",
                    text: "Usuario y/o Contraseña incorrecto.",
                });
                return;
            }
            const isTokenValid = await AuthServices.checkToken(res.token);
            if (isTokenValid) {
                Cookies.set('token', res.token, { secure: true, sameSite: 'strict', path: '/' });

                const profile = await AuthServices.getYourProfile(res.token);
                if (!profile) {
                    await Swal.fire({
                        icon: "warning",
                        title: "Error al intentar ingresar",
                        text: "Recargue la pagina o intentelo mas tarde.",
                    });
                }
                localStorage.setItem('_UserInfo', JSON.stringify(profile));
                // check plan
                if (!profile.administradores.typePlan) {
                    AuthServices.logout();
                    Swal.fire({
                        title: 'Plan Requerido',
                        text: 'No cuentas con alguno de nuestros planes o tu plan expiro. Para mas ser parte de nuestro sistema comunicate con nosotros!',
                        icon: 'warning',
                        confirmButtonText: 'Entendido',
                        allowOutsideClick: false,
                        allowEscapeKey: false,

                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/login'; // Redirigir a la página de inicio de sesión
                        }
                    });
                    return;
                }
                await Swal.fire({
                    icon: "success",
                    title: "¡Ingreso Exitoso!",
                    text: "Ingreso exitoso.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                window.location.href = "/app";
            } else {
                await Swal.fire({
                    icon: "warning",
                    title: "Error de autenticación",
                    text: "Token no válido.",
                });
            }
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Error al intentar una conexión con el servidor",
                text: error.message || "Ocurrió un error inesperado.",
            });
        } finally {
            setLoading(false);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white opacity-90">
            <div className="flex flex-1 items-center justify-center">
                <form
                    className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-[360px] xl:max-w-[420px] transition-all duration-300 ${errors.username || errors.password ? "w-full md:max-w-lg" : ""}`}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="text-start mb-6">
                        <div onClick={handleClick} className="flex flex-row cursor-pointer items-center gap-3">
                            <SiMoneygram className="text-[42px] text-blue-700" />
                            <h1 className="text-2xl text-blue-700 font-bold">PrestaCol</h1>
                        </div>
                        <h2 className="text-2xl font-bold text-blue-900 mb-6"></h2>
                        <h2 className="text-2xl font-bold text-gray-700">Bienvenido!👋</h2>
                        <h2 className="text-md text-gray-600">Inicia Sesion en tu cuenta para iniciar a administrar tus prestamos.</h2>
                    </div>

                    <div className="mb-4">
                        <h1 className="block text-sm font-medium text-gray-700">USUARIO</h1>
                        {errors.username && touchedFields.username && (
                            <span className="text-sm text-red-500">{errors.username.message}</span>
                        )}
                        <div className="relative mt-2">
                            <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700 text-lg" />
                            <input
                                type="text"
                                placeholder="Ingresa tu Usuario"
                                className=" w-full border rounded-md py-2 px-[30px] focus:outline-none focus:border-teal-500"
                                {...register("username", { required: "El nombre de usuario es requerido*" })}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <h1 className="block text-sm font-medium text-gray-700">CONTRASEÑA</h1>
                            <h1 className="block text-sm font-medium text-blue-900 cursor-pointer">¿Olvidaste tu contraseña?</h1>
                        </div>
                        {errors.password && touchedFields.password && (
                            <span className="text-sm text-red-500">{errors.password.message}</span>
                        )}
                        <div className="relative mt-2">
                            <RiLockPasswordFill className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700 text-lg" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Ingresa tu Contraseña"
                                className="w-full border rounded-md py-2 px-[30px] focus:outline-none focus:border-teal-500"
                                {...register("password", {
                                    required: "La contraseña es requerida*",
                                    // minLength: {
                                    //     value: 3,
                                    //     message: "La contraseña debe ser mayor a 3 caracteres",
                                    // },
                                })}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 text-lg"
                            >
                                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-900 text-white font-bold py-2 px-4 rounded-xl w-full hover:scale-105 mb-6 transition-all duration-300"
                    >
                        Iniciar Sesión
                    </button>
                    <h2 className="text-md text-center text-gray-600">¿Quieres tener tu cuenta? <span className="text-blue-900 cursor-pointer">Contactanos.</span></h2>
                </form>
            </div>

            <div className="flex-1 hidden md:flex items-center justify-center">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/login.jpg')" }}
                />
            </div>
        </div>
    );
};

export default Login;
