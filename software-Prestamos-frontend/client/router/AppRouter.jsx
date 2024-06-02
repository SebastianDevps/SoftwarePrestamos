// src/AppRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../src/Pages/Register/Register";
import Landing from "../src/Pages/landing/Landing";
import Login from "../src/Pages/Login/Login";
import Home from "../src/Pages/Home/Home";
import Prestamos from "../src/Pages/Prestamos/Prestamos";
import Clientes from "../src/Pages/Clientes/Clientes";
import NotFound from "./404";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="app" element={<Home />}>
      <Route path="prestamos" element={<Prestamos />} />
      <Route path="clientes" element={<Clientes />} />
    </Route>
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
