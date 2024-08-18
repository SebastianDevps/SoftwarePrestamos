import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from "../Pages/Landing/Landing";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import AuthServices from "../services/AuthServices";
import Prestamo from "../Pages/Prestamo/Prestamo";
import Cliente from "../Pages/Cliente/Cliente";
import NotFound from "../Pages/NotFound/404";
import Configuracion from "../Pages/Configuracion/Configuracion";
import TokenExpiredPopup from "./TokenExpiredPopup";
import UsersAndPlanes from "../Pages/Usuario/UsersAndPlanes";
import Layout from "../components/Layout";

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const isAuthenticated = AuthServices.isAuthenticated();
  const isTokenExpired = AuthServices.isTokenExpired();
  const userRole = AuthServices.getRoleFromUserInfo();

  if (!isAuthenticated || isTokenExpired) {
    AuthServices.logout();
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" />; // Ruta de no autorizado
  }

  return (
    <Layout>
      {Component}
    </Layout>
  );
};

const AppRouter = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      if (AuthServices.isAuthenticated() && AuthServices.isTokenExpired()) {
        setIsTokenExpired(true);
      }
    };

    checkToken();
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

          {/* Rutas para SUPER_ADMIN */}
          <Route
            path="/app/usuarios-y-planes"
            element={<PrivateRoute element={<UsersAndPlanes />} allowedRoles={['SUPER_ADMIN']} />}
          />

          {/* Rutas para ADMIN y SUPER_ADMIN */}
          <Route
            path="/app"
            element={<PrivateRoute element={<Home />} allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}
          />
          <Route
            path="/app/prestamos"
            element={<PrivateRoute element={<Prestamo />} allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}
          />
          <Route
            path="/app/clientes"
            element={<PrivateRoute element={<Cliente />} allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}
          />
          <Route
            path="/app/configuracion"
            element={<PrivateRoute element={<Configuracion />} allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}
          />

          {/* Ruta para página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
      {isTokenExpired && <TokenExpiredPopup onClose={handlePopupClose} />}
    </BrowserRouter>
  );
};

export default AppRouter;
