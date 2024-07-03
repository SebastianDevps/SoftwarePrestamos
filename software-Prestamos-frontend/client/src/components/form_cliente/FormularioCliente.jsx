import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormularioCliente = ({ onClick, cliente }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm();

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: 'Cargando...',
        html: 'Por favor, espera mientras validamos tus datos.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
  }, [loading]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      //solicitud de registro (POST) con axios
      await axios.post('http://localhost:8080/api/clientes', data);
      await Swal.fire({
        icon: 'success',
        title: '¡Yupi!',
        text: 'Cliente registrado correctamente.',
        showConfirmButton: true,
      });
      reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar cliente. Por favor, intenta nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <button onClick={onClick} className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-500">
          ×
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">Registrar Cliente</h2>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Tipo de documento <span className="text-red-500">*</span>
              </label>
              <select
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.tipoDocumento ? 'border-red-500' : ''
                }`}
                {...register('tipoDocumento', { required: 'Este campo es requerido' })}
              >
                <option value="">Seleccione uno</option>
                <option value="cedula">Cédula</option>
                <option value="pasaporte">Pasaporte</option>
              </select>
              {errors.tipoDocumento && (
                <span className="text-red-500 text-sm">{errors.tipoDocumento.message}</span>
              )}
            </div>
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Cédula <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-0 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.cedula ? 'border-red-500' : ''
                }`}
                placeholder="Ingrese número"
                {...register('cedula', { required: 'Este campo es requerido' })}
              />
              {errors.cedula && <span className="text-red-500 text-sm">{errors.cedula.message}</span>}
            </div>
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Nombres <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.nombre ? 'border-red-500' : ''
                }`}
                placeholder="Ingrese su nombre"
                {...register('nombre', { required: 'Este campo es requerido' })}
              />
              {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
            </div>
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.apellido ? 'border-red-500' : ''
                }`}
                placeholder="Ingrese su apellido"
                {...register('apellido', { required: 'Este campo es requerido' })}
              />
              {errors.apellido && <span className="text-red-500 text-sm">{errors.apellido.message}</span>}
            </div>
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Número Celular <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.telefono ? 'border-red-500' : ''
                }`}
                placeholder="Ingrese número"
                {...register('telefono', { required: 'Este campo es requerido' })}
              />
              {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono.message}</span>}
            </div>
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.direccion ? 'border-red-500' : ''
                }`}
                placeholder="Ingrese su dirección"
                {...register('direccion', { required: 'Este campo es requerido' })}
              />
              {errors.direccion && <span className="text-red-500 text-sm">{errors.direccion.message}</span>}
            </div>
          </div>
          <div className="form-group -mt-4">
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                ${ errors.correo ? 'border-red-500' : ''
              }`}
              placeholder="Ingrese su correo"
              {...register('correo', {pattern: /^\S+@\S+$/i })}
            />
            {errors.correo && <span className="text-red-500 text-sm">{errors.correo.message}</span>}
          </div>
          <div className="form-group -mt-4">
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="INACTIVO"
              /* {...register('estado')} */
              readOnly
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar cliente'}
            </button>
            <button
              onClick={onClick}
              type="button"
              className="btn btn-dark bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCliente;
