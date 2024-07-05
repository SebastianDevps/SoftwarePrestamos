import React from "react";
import Sidebar from '../../layout/Sidebar/Sidebar';

const Administrador = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen grid grid-col-1 lg:grid-cols-5">
      <div className="col-span-1">
        <Sidebar />
      </div>
      
      <div className="col-span-4 bg-customMain">
        <div className="bg-white rounded-3xl shadow-md  mx-4 my-6 h-[15%]  w-[95%]">
          <div className="flex justify-center items-center   mx-12">
          <h1 className="text-center align-middle py-4 text-2xl font-medium text-gray-700">Datos de Aministrador</h1>
          </div>
        </div>
          <div className="bg-white rounded-3xl shadow-md  mx-4 my-6 h-[68%]  w-[95%]">
              <div className="py-2 " >
               <form onSubmit="">
                <div className="grid grid-cols-3 gap-4  m-3">
                  <div className="">
                    <label className=" text-sm font-medium text-gray-700 flex-">
                      Nombres  
                    </label>
                    <input
                      type="text"
                      className="input-admin"
                      placeholder="Nombre"
                    />
                 </div>
                  <div className="">
                    <label className=" text-sm font-medium text-gray-700 flex-">
                      Apellidos  
                    </label>
                    <input
                      type="text"
                      className="input-admin"
                      placeholder="Nombre"
                    />
                 </div>
                 <div className="">
                    <label className=" text-sm font-medium text-gray-700 flex-">
                      Contacto 
                    </label>
                    <input
                      type="text"
                      className="input-admin"
                      placeholder="+3107429876"
                    />
                 </div>
                 <div className="">
                    <label className=" text-sm font-medium text-gray-700 flex-">
                      Correo   
                    </label>
                    <input
                      type="text"
                      className="input-admin"
                      placeholder="ejemplo@gmail.com"
                    />
                 </div>
                 <div className="">
                 <button
              type="submit"
              className=" btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
             Agregar Cambios
            </button>
                 </div>
                </div>
               </form>
              </div>
          </div>
        </div>
    </div>
  );
};

export default Administrador;
