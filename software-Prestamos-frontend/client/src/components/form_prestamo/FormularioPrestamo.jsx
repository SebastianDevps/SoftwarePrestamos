import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";

const FormularioPrestamo = ({ onClick }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
      await axios.post('http://localhost:8080/api/prestamos', data);
      await Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Préstamo registrado correctamente.',
        showConfirmButton: true,
      });
      reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar el préstamo. Por favor, intenta nuevamente.',
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
        <h2 className="text-2xl font-bold text-center mb-4">Registrar Préstamo</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group md:col-span-2 md:w-4/5">
              <label className="block text-sm font-medium text-gray-700 flex-">
                Buscar Cliente 
              </label>
              <div className=' from-group inline-flex w-full'>
              <input type='text' className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `} placeholder='Buscar cliente' />
              <button className="btn btn-primary bg-blue-600 hover:bg-blue-700 ... text-white font-bold pt-2 pr-2 mx-1 mt-1"
              type='button'><AiOutlineSearch /></button>
              </div>
              {errors.tipoPrestamo && (
                <span className="text-red-500 text-sm">{errors.tipoPrestamo.message}</span>
              )}
            </div>
            <div className="form-group -mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Documento <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Documento del cliente"
                {...register('documento', { required: 'Este campo es requerido' })}
                readOnly
              />
              {errors.documento && <span className="text-red-500 text-sm">{errors.documento.message}</span>}
            </div>
            <div className="form-group -mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Cliente
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nombre del cliente"
                {...register('cliente', { required: 'Este campo es requerido' })}
                readOnly
              />
              {errors.cliente && <span className="text-red-500 text-sm">{errors.cliente.message}</span>}
            </div>
            <div className="form-group -mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Monto a Prestar <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.interes ? 'border-red-500' : ''
                }`}
                placeholder="Ingrese el moton del préstamo"
                {...register('monto', { required: 'Este campo es requerido' })}
              />
              {errors.monto && <span className="text-red-500 text-sm">{errors.monto.message}</span>}
            </div>
          
            <div className="form-group -mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Tasa de interés (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.interes ? 'border-red-500' : ''
                }`}
                placeholder="Ingrese tasa de interés"
                {...register('interes', { required: 'Este campo es requerido' })}
              />
              {errors.interes && <span className="text-red-500 text-sm">{errors.interes.message}</span>}
            </div>
            
            <div className="form-group -mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Pago <span className="text-red-500">*</span>
              </label>
             <select
               className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
               errors.tipoPago ? 'border-red-500' : ''
               }`}
               {...register('tipoPrestamo', { required: 'Este campo es requerido' })}
                   >
                  <option value="diario">Diario</option>
                  <option value="semanal">Semanal</option>
                  <option value="Quincenal">Quincenal</option>
                  <option value="Mensual">Mensual</option>
              </select>
               {errors.tipoPago && (
                <span className="text-red-500 text-sm">{errors.tipoPago.message}</span>
                   )}
            </div>

            <div className="form-group -mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de solicitud <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.fecha ? 'border-red-500' : ''
                }`}
                {...register('fecha', { required: 'Este campo es requerido' })}
              />
              {errors.fecha && <span className="text-red-500 text-sm">{errors.fecha.message}</span>}
            </div>
            <div className="form-group -mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Valor por Cuota 
              </label>
              <input
                type="number"
                step="0.01"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.cuota ? 'border-red-500' : ''
                }`}
                placeholder="Ingrese tasa de interés"
                {...register('cuota', { required: 'Este campo es requerido' })}
                readOnly
              />
              {errors.interes && <span className="text-red-500 text-sm">{errors.cuota.message}</span>}
              
            </div>
            <div className="form-group -mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Monto Total 
              </label>
              <input
                type="number"
                step="0.01"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.motoTotal ? 'border-red-500' : ''
                }`}
                placeholder="Ingrese tasa de interés"
                {...register('motoTotal', { required: 'Este campo es requerido' })}
                readOnly
              />
              {errors.interes && <span className="text-red-500 text-sm">{errors.motoTotal.message}</span>}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar préstamo'}
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

export default FormularioPrestamo;