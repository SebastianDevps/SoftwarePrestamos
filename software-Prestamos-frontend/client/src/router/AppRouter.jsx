import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Register from "../Pages/Register/Register";
import Landing from "../Pages/landing/Landing";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import AuthServices from "../services/AuthServices";
import Prestamos from "../Pages/Prestamos/Prestamos";
import Clientes from "../Pages/Clientes/Clientes";
import NotFound from "./404";
import Administrador from "../Pages/Administrador/Administrador";
import TokenExpiredPopup from "../components/TokenExpiredPopup/TokenExpiredPopup";
import Cookies from "js-cookie";  // Importar js-cookie

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
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          {isAdmin || isSuperAdmin ? (
            <>
              {isSuperAdmin && (
                <Route path="/register" element={<PrivateRoute element={<Register />} />} />
              )}
              <Route path="/app" element={<PrivateRoute element={<Home />} />} />
              <Route path="/app/prestamos" element={<PrivateRoute element={<Prestamos />} />} />
              <Route path="/app/clientes" element={<PrivateRoute element={<Clientes />} />} />
              <Route path="/app/administradores" element={<PrivateRoute element={<Administrador />} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {isTokenExpired && <TokenExpiredPopup onClose={handlePopupClose} />}
    </BrowserRouter>
  );
};

export default AppRouter;
