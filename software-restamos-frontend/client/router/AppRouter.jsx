import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../src/Pages/Register/Register";
import Landing from "../src/Pages/landing/Landing";
import Login from "../src/Pages/Login/Login";

function AppRouter() {

  return (
    <>
      <Routes>
        <Route path="/">
          <Route>
            <Route path="/" element={<Landing />} />
            <Route path="Register" element={<Register />} />
            <Route path="Login" element={<Login />} />
          </Route>

        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
