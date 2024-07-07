import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const TokenExpiredPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
        <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Sesión Expirada</h2>
        
        <p className="text-gray-700 mb-4">Su sesión ha expirado. Por favor, inicie sesión nuevamente.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition"
          onClick={onClose}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default TokenExpiredPopup;
