import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from "../Pages/Register/Register";
import Landing from "../Pages/landing/Landing";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import AuthServices from "../services/AuthServices";
import Prestamos from "../Pages/Prestamos/Prestamos";
import Clientes from "../Pages/Clientes/Clientes";
import NotFound from "./404";
import Administrador from "../Pages/Administrador/Administrador";


const AppRouter = () => {
  const isAdmin = AuthServices.adminOnly();
  const isSuperAdmin = AuthServices.superAdminOnly();

  return (
    <BrowserRouter>
      <div className="App">
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
              // Redirección a login si el usuario no es admin
              <Route path="*" element={<Navigate to="/login" />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
