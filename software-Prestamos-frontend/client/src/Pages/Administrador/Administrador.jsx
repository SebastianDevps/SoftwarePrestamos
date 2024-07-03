import React from "react";
import Navbar from "../../components/navApp/Navbar";
import Sidebar from '../../layout/Sidebar/Sidebar';

const Administrador = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen grid grid-col-1 lg:grid-cols-5">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="flex-grow col-span-4">
        <Navbar />
        <div className="flex flex-col bg-gray-400 p-4"></div>
      </div>
    </div>
  );
};

export default Administrador;
