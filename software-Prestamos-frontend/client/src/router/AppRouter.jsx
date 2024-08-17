import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Landing from "../Pages/Landing/Landing";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import AuthServices from "../services/AuthServices";
import Prestamo from "../Pages/Prestamo/Prestamo";
import Cliente from "../Pages/Cliente/Cliente";
import NotFound from "../Pages/NotFound/404";
import Configuracion from "../Pages/Configuracion/Configuracion";
import TokenExpiredPopup from "./TokenExpiredPopup";
import Cookies from "js-cookie";  // Importar js-cookie
import UsersAndPlanes from "../Pages/Usuario/UsersAndPlanes";

const PrivateRoute = ({ element: Component, isAdmin, isSuperAdmin, ...rest }) => {
  const isAuthenticated = AuthServices.isAuthenticated();
  const isTokenExpired = AuthServices.isTokenExpired();

  if (!isAuthenticated || isTokenExpired) {
    return <Navigate to="/login" />;
  }

  return Component;
};

const AppRouter = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(true);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) return;

        const profile = await AuthServices.getYourProfile(token);
        // setIsAdmin(profile.administradores.isAdmin);
        // setIsSuperAdmin(profile.administradores.isSuperAdmin);

        if (!profile.administradores.typePlan) {
          Swal.fire({
            title: 'Plan Requerido',
            text: 'Cuenta No Válida, no tienes un plan asociado a tu cuenta, comunícate con nosotros.',
            icon: 'warning',
            confirmButtonText: 'Entendido',
            allowOutsideClick: false,
            allowEscapeKey: false,
            
          }).then((result) => {
            if (result.isConfirmed) {
              AuthServices.logout();
              window.location.href = '/login'; // Redirigir a la página de inicio de sesión
            }
          });
          return;
        }
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        AuthServices.logout();
        window.location.href = '/login'; // Redirigir a la página de inicio de sesión
      }
    };

    const checkAuthAndToken = () => {
      if (AuthServices.isAuthenticated() && AuthServices.isTokenExpired()) {
        setIsTokenExpired(true);
      }
    };

    fetchUserProfile();
    checkAuthAndToken();
  }, []);

  const handlePopupClose = () => {
    AuthServices.logout();
    setIsTokenExpired(false);
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          {isAdmin || isSuperAdmin ? (
            <>
              {isSuperAdmin && (
                <Route path="/app/usuarios-y-planes" element={<PrivateRoute element={<UsersAndPlanes />} />} />
              )}
              <Route path="/app" element={<PrivateRoute element={<Home />} />} />
              <Route path="/app/prestamos" element={<PrivateRoute element={<Prestamo />} />} />
              <Route path="/app/clientes" element={<PrivateRoute element={<Cliente />} />} />
              <Route path="/app/configuracion" element={<PrivateRoute element={<Configuracion />} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
      {isTokenExpired && <TokenExpiredPopup onClose={handlePopupClose} />}
    </BrowserRouter>
  );
};

export default AppRouter;
