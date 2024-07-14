import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import ClientsServices from '../../services/ClientsServices';

const FormularioCliente = ({ onClick, onAddCliente, cliente }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: 'Cargando...',
        html: 'Por favor, espera mientras registramos el cliente.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
  }, [loading]);

  useEffect(() => {
    if (cliente) {
      reset({
        tipoDocumento: cliente.tipoDocumento,
        cedula: cliente.numDocumento,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        telefono: cliente.telefono,
        direccion: cliente.direccion || '', // Manejar dirección si está presente
        correo: cliente.correo || '', // Manejar correo si está presente
      });
    }
  }, [cliente, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    const clientData = {
      tipoDocumento: data.tipoDocumento,
      numDocumento: data.cedula, // Cambiar nombre a numDocumento
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      direccion: data.direccion,
      correo: data.correo,
      prestamos: [], // Inicializando como arreglo vacío
    };

    try {
      let response;
      if (cliente) {
        response = await ClientsServices.updateClient(cliente.numDocumento, clientData);
      } else {
        response = await ClientsServices.createClient(clientData);
      }

      onAddCliente(response);
      await Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: cliente ? 'Cliente actualizado correctamente.' : 'Cliente registrado correctamente.',
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      onClick();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar o actualizar el cliente. Por favor, intenta nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-4">{cliente ? 'Editar Cliente' : 'Registrar Cliente'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Tipo de documento <span className="text-red-500">*</span>
              </label>
              <select
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.tipoDocumento ? 'border-red-500' : ''
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
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Numero de documento <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.cedula ? 'border-red-500' : ''
                  }`}
                placeholder="Ingrese número"
                {...register('cedula', { required: 'Este campo es requerido' })}
              />
              {errors.cedula && <span className="text-red-500 text-sm">{errors.cedula.message}</span>}
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Nombres <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.nombre ? 'border-red-500' : ''
                  }`}
                placeholder="Ingrese su nombre"
                {...register('nombre', { required: 'Este campo es requerido' })}
              />
              {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.apellido ? 'border-red-500' : ''
                  }`}
                placeholder="Ingrese su apellido"
                {...register('apellido', { required: 'Este campo es requerido' })}
              />
              {errors.apellido && <span className="text-red-500 text-sm">{errors.apellido.message}</span>}
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Número Celular <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.telefono ? 'border-red-500' : ''
                  }`}
                placeholder="Ingrese número"
                {...register('telefono', { required: 'Este campo es requerido' })}
              />
              {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono.message}</span>}
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.direccion ? 'border-red-500' : ''
                  }`}
                placeholder="Ingrese su dirección"
                {...register('direccion', { required: 'Este campo es requerido' })}
              />
              {errors.direccion && <span className="text-red-500 text-sm">{errors.direccion.message}</span>}
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Correo</label>
              <input
                type="email"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.correo ? 'border-red-500' : ''
                  }`}
                placeholder="Ingrese su correo"
                {...register('correo', { pattern: /^\S+@\S+$/i })}
              />
              {errors.correo && <span className="text-red-500 text-sm">Formato de correo inválido.</span>}
            </div>
            <div className="flex justify-end space-x-4 mt-3 justify-center items-center">
              <button
                type="submit"
                className="btn btn-primary bg-blue-600 h-9 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                disabled={loading}
              >
                {loading ? 'Guardando...' : (cliente ? 'Actualizar' : 'Registrar')}
              </button>
              <button
                onClick={onClick}
                type="button"
                className="btn btn-dark bg-gray-600 h-9 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCliente;
