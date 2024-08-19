import React from "react";

const Perfil = () => {
  return (
    <div className="flex bg-gray-50">

      <div className="bg-white rounded-3xl shadow-md  mx-4 my-6 h-[15%]  w-[95%]">
        <div className="flex justify-center items-center   mx-12">
          <h1 className="text-center align-middle py-4 text-2xl font-medium text-gray-700">Datos de Aministrador</h1>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-md  mx-4 my-6 h-[75%]  w-[95%]">
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
                  placeholder="Ingresa el Nombre"
                />
              </div>
              <div className="">
                <label className=" text-sm font-medium text-gray-700">
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
                <label className=" text-sm font-medium text-gray-700 flex-">
                  Ciudad
                </label>
                <input
                  type="text"
                  className="input-admin"
                  placeholder="Apartado"
                />
              </div>
              <div className="my-4">
                <button
                  type="submit"
                  className="btn-admin"
                >
                  Agregar Cambios
                </button>
              </div>
            </div>
          </form>
          <div>
            <h1 className="text-center align-middle  text-xl font-medium text-gray-500">Cambiar Contraseña</h1>
          </div>
          <form action="">
            <div className="grid grid-cols-3 gap-4  m-3">
              <div className="">
                <label className=" text-sm font-medium text-gray-700 flex-">
                  Contraseña Actual <p className="text-danger inline-flex">*</p>
                </label>
                <input
                  type="password"
                  className="input-admin"
                  placeholder="Ingresar Contraseña Actual"
                />
              </div>
              <div className="">
                <label className=" text-sm font-medium text-gray-700 flex-">
                  Nueva Contraseña <p className="text-danger inline-flex">*</p>
                </label>
                <input
                  type="password"
                  className="input-admin"
                  placeholder="ingresar Nueva Contraseña"
                />
              </div>
              <div className="">
                <label className=" text-sm font-medium text-gray-700 flex-">
                  Confirmar Contraseña <p className="text-danger inline-flex">*</p>
                </label>
                <input
                  type="password"
                  className="input-admin"
                  placeholder="Confirmar Contraseña"
                />
              </div>

              <div className="my-4">
                <button
                  type="submit"
                  className="btn-admin"
                >
                  Agregar Cambios
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
