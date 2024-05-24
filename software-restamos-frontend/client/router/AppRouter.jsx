import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../src/Pages/Register/Register";
import Landing from "../src/Pages/landing/Landing";
import Login from "../src/Pages/Login/Login";
import Home from "../src/Pages/Home/Home";
import Prestamos from "../src/Pages/Prestamos/Prestamos";
import Clientes from "../src/Pages/Clientes/Clientes"

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="app" element={<Home />}/>
      <Route path="app/prestamos" element={<Prestamos />} />
      <Route path="app/clientes" element={<Clientes />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
