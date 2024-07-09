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

const AppRouter = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
         return
        }
        
        //onst profile = await AuthServices.getYourProfile(token);
        
        if (!profile.administradores.typePlan || profile.administradores.typePlan === null) {
          Swal.fire({
            title: 'Plan Requerido',
            text: 'Cuenta No Valida, no tienes un plan asociado a tu cuenta, comunicate con nosotros.',
            icon: 'warning',
            confirmButtonText: 'Entendido',
          }).then((result) => {
            if (result.isConfirmed) {
              AuthServices.logout();
              //window.location.href = '/login'; // Redirigir a la página de inicio de sesión
            }
          });
        }

        setIsAdmin(AuthServices.adminOnly());
        setIsSuperAdmin(AuthServices.superAdminOnly());
        
      } catch (error) {
        // console.error('Error al obtener el perfil del usuario desde el servidor:', error);
        // AuthServices.logout();
        // window.location.href = '/login'; // Redirigir a la página de inicio de sesión
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
          {(isAdmin || isSuperAdmin) ? (
            <>
              {isSuperAdmin && <Route path="/register" element={<Register />} />}
              <Route path="/app" element={<Home />} />
              <Route path="/app/prestamos" element={<Prestamos />} />
              <Route path="/app/clientes" element={<Clientes />} />
              <Route path="/app/administradores" element={<Administrador />} />
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
