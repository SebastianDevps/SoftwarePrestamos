import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";
import ClientsServices from "../../services/ClientsServices";

const FormularioPrestamo = ({ onClick, onAddPrestamo, Prestamo }) => {
  const [loading, setLoading] = useState(false);
  const cedulaClientRef = useRef(null);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  
  const [monto, setMonto] = useState('');
  const [interes, setInteres] = useState('');
  const [cuota, setCuota] = useState('');
  const [montoTotal, setMontoTotal] = useState('');
  const [tipoPago, setTipoPago]= useState('');

  const calcularValores = (monto, interes, tipoPago) => {
    if (!isNaN(monto) && !isNaN(interes)  && monto !== '' && interes !== '') {
      let valorPorCuota
      const tasaInteresDecimal = interes / 100;
       // Ejemplo de cálculo mensual
      const valorTotal = parseFloat(monto) + parseFloat(monto * tasaInteresDecimal);
      if(isNaN(tipoPago)){
       valorPorCuota = valorTotal / 30;
      }
      else{
        valorPorCuota = valorTotal / tipoPago;
      }
       
      setCuota(valorPorCuota.toFixed());
      setMontoTotal(valorTotal.toFixed());
      setValue('cuota', valorPorCuota.toFixed(0));
      setValue('montoTotal', valorTotal.toFixed(0));
    }
  };

  const handleMontoChange = (e) => {
    const value = e.target.value;
    setMonto(value);
    calcularValores(value, interes);
  };

  const handleInteresChange = (e) => {
    const value = e.target.value;
    setInteres(value);
    calcularValores(monto, value);
  };

  const handleTipoPagoChange = (e) => {
    const value = e.target.value
    let numeroPagos;
    if(value==''){
      numeroPagos = 30;
   }
    if(value=='diario'){
       numeroPagos = 30;
    }
    if(value=='semanal'){
      numeroPagos = 4;
    }
    if(value=='quincenal'){
      numeroPagos = 2;
    }
    if(value=='mensual'){
      numeroPagos = 1;
    }
    setTipoPago(value);
    calcularValores(monto ,interes, numeroPagos);
  };

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

  const handleBuscarCliente = async () => {
    const cedulaclient = cedulaClientRef.current.value;
    //console.log('Cédula del cliente:', cedulaclient); // Depuración
    if(cedulaclient!=''){
      try {
        const response = await ClientsServices.getClientByCedula(cedulaclient);
        console.log('Respuesta del servicio:', response);
        console.log('cedula del cliente',response.numDocumento);
        console.log('nombre del cliente',response.nombre); // Depuración
        if (response) {
          //Llenar los campos automáticamente
          reset({
            documento: response.numDocumento,
            cliente: response.nombre,
          });
          cedulaClientRef.current.value= "";
        
  
        } else {
          console.log('Respuesta del servicio no contiene data');
        }
      } catch (error) {
        console.log('Error al buscar el cliente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo encontrar el cliente. Verifica el documento e intenta nuevamente.',
          showCancelButton: true,
          confirmButtonText: "Agregar Cliente",
        });
      } 
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
              <div className=' form-group inline-flex w-full'>
              <input type='text'  name='buscarCliente' ref={cedulaClientRef} className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} placeholder='Buscar cliente'/>
              <button className="btn btn-primary bg-blue-600 hover:bg-blue-700 ... text-white font-bold pt-2 pr-2 mx-1 mt-1"
              type='button'
              onClick={handleBuscarCliente}
              
              ><AiOutlineSearch /></button>
              </div>
              {errors.tipoPrestamo && (
                <span className="text-red-500 text-sm">{errors.tipoPrestamo.message}</span>
              )}
            </div>
            <div className="form-group -mt-4">
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
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Cliente
              </label>
              <input
                type="text"  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nombre del cliente"
                {...register('cliente', { required: 'Este campo es requerido' })}
                readOnly
              />
              {errors.cliente && <span className="text-red-500 text-sm">{errors.cliente.message}</span>}
            </div>
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Monto a Prestar <span className="text-red-500">*</span>
              </label>
              <input
                type="number" 
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.interes ? 'border-red-500' : ''
                }`}
                placeholder="Ingrese el monto del préstamo"
                {...register('monto', { required: 'Este campo es requerido' })}
                value={monto}
                onChange={handleMontoChange}
              />
              {errors.monto && <span className="text-red-500 text-sm">{errors.monto.message}</span>}
            </div>
          
            <div className="form-group -mt-4">
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
                value={interes}
                onChange={handleInteresChange}
              />
              {errors.interes && <span className="text-red-500 text-sm">{errors.interes.message}</span>}
            </div>
            
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Pago <span className="text-red-500">*</span>
              </label>
             <select
               className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
               errors.tipoPago ? 'border-red-500' : ''
               }`}
               {...register('tipoPrestamo', { required: 'Este campo es requerido' })}
                  value={tipoPago}
                   onChange={handleTipoPagoChange}
                   
                   >
                  <option value="diario">Diario</option>
                  <option value="semanal">Semanal</option>
                  <option value="quincenal">Quincenal</option>
                  <option value="mensual">Mensual</option>
              </select>
               {errors.tipoPago && (
                <span className="text-red-500 text-sm">{errors.tipoPago.message}</span>
                   )}
            </div>

            <div className="form-group -mt-4">
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
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Valor por Cuota 
              </label>
              <input
                type="number" step="0.01"  
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.cuota ? 'border-red-500' : ''
                }`}
                placeholder="$----"
                {...register('cuota', { required: 'Este campo es requerido' })}
                value={cuota}
                readOnly
              />
              {errors.cuota && <span className="text-red-500 text-sm">{errors.cuota.message}</span>}
              
            </div>
            <div className="form-group -mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Monto Total 
              </label>
              <input
                type="number"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.motoTotal ? 'border-red-500' : ''
                }`}
                placeholder="$----"
                {...register('montoTotal', { required: 'Este campo es requerido' })}
                  value={montoTotal}
                readOnly
              />
              {errors.motoTotal && <span className="text-red-500 text-sm">{errors.motoTotal.message}</span>}
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
