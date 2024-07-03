import React from "react";
import Sidebar from '../../layout/Sidebar/Sidebar';

const Administrador = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen grid grid-col-1 lg:grid-cols-5">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="flex-grow col-span-4">
        <div className="flex flex-col bg-gray-400  w-full">
         <div className="display-block"> 
           <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ingrese número"
              />
            </div>
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
              />
            </div>
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Telefono <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
              />
            </div>

         </div>
        </div>
      </div>
    </div>
  );
};

export default Administrador;
