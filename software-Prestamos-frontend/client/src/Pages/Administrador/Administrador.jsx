import React from "react";
import Sidebar from '../../layout/Sidebar/Sidebar';

const Administrador = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen grid grid-col-1 lg:grid-cols-5">
      <div className="col-span-1">
        <Sidebar />
      </div>

      <div className="col-span-4 bg-customMain">
          <div className="bg-white rounded-3xl shadow-md py-64 mx-4 my-12  w-[95%]">
              <div className="flex justify-center mx-auto">
                <h2>Informacion Adminsitrador</h2>
              </div>
          </div>
        </div>
    </div>
  );
};

export default Administrador;
