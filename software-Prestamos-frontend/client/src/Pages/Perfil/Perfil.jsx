import React, { useEffect, useState } from "react";

const Perfil = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("_UserInfo")) || {};
    setUserData(user);
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-3xl p-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-semibold mb-4">
            {userData.name ? userData.name.charAt(0).toUpperCase() : "A"}
          </div>
          <h1 className="text-3xl font-semibold text-gray-800">{userData.name || "Usuario"}</h1>
          <p className="text-gray-500">{userData.role || "Rol no definido"}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              type="text"
              className="input-admin bg-gray-100"
              value={userData.email || "No definido"}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">Ciudad</label>
            <input
              type="text"
              className="input-admin bg-gray-100"
              value={userData.city || "No definido"}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">Tipo de Plan</label>
            <input
              type="text"
              className="input-admin bg-gray-100"
              value={userData.typePlan || "No definido"}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">Estado de la Cuenta</label>
            <input
              type="text"
              className="input-admin bg-gray-100"
              value={userData.enabled ? "Activa" : "Inactiva"}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
