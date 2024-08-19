import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">Página no encontrada</p>
      <p className="text-lg text-gray-500 mb-8 text-center">
        Lo sentimos, no pudimos encontrar la página que estás buscando. 
        Puedes regresar a la página principal haciendo clic en el botón de abajo.
      </p>
      <Link
        to="/app"
        className="flex items-center px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300"
      >
        <FaHome className="mr-2" />
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
