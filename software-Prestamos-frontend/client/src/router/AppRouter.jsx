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
import Utils from "../services/Utils";

const AppRouter = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const isAdmin = AuthServices.adminOnly();
  const isSuperAdmin = AuthServices.superAdminOnly();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let profile = await Utils.getUserProfile();
        if (!profile) {
          profile = await Utils.fetchUserProfileFromServer();
        }
        // Verificar si no tiene un plan asociado
        if (!profile.administradores.typePlan || profile.administradores.typePlan === null) {
          Swal.fire({
            title: 'Plan Requerido',
            text: 'Cuenta No Valida, no tienes un plan asociado a tu cuenta, crea una nueva o comunicate con nosotros.',
            icon: 'warning',
            confirmButtonText: 'Entendido',
          }).then((result) => {
            if (result.isConfirmed) {
              AuthServices.logout()
              window.location.href = '/login'; // Redirigir a la página de inicio de sesión
            }
          });
        }


      } catch (error) {
        console.error("Error fetching user profile:", error);
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
            // Redirección si no cumple con los permisos
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
