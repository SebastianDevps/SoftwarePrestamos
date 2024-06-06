// src/AppRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Register/Register";
import Landing from "../Pages/landing/Landing";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Prestamos from "../Pages/Prestamos/Prestamos";
import Clientes from "../Pages/Clientes/Clientes";
import NotFound from "./404";

const AppRouter = () => (
  <Routes>
    <Route
      path="/"
      element={<Landing />}
    />
    <Route
      path="app"
      element={<Home />}
    />
    <Route
      path="app/prestamos"
      element={<Prestamos />}
    />
    <Route
      path="app/clientes"
      element={<Clientes />}
    />
    <Route
      path="register"
      element={<Register />}
    />
    <Route
      path="login" element={<Login />}
    />
    <Route
      path="*" element={<NotFound />}
    />
  </Routes>
);

export default AppRouter;
