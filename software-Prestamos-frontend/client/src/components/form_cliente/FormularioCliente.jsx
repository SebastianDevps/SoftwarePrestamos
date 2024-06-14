import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Importa useHistory para redireccionar

const FormularioCliente = ({ onClick }) => {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Agrega el campo prestamos como un arreglo vacío
      data.prestamos = [];

      //solicitud POST al servidor
      const response = await axios.post('http://localhost:8080/api/clientes', data);
      console.log('Respuesta del servidor:', response.data);
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Cliente registrado correctamente.',
      }).then(() => {
        // Redirige al usuario a la sección de préstamos después de registrar el cliente
        history.push('/prestamos');
      });
    } catch (error) {
      console.error('Error al registrar cliente:', error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar cliente. Por favor, intenta nuevamente.',
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="container">
        <div className="container-body">
          <div className="form-title">Formulario de Registro de Cliente</div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-input">
                <label className="lbl-title">Tipo de documento *</label>
                <select {...register('tipoDocumento', { required: true })} className="form-input">
                  <option value="">Seleccione Uno</option>
                  <option value="cedula">Cedula</option>
                  <option value="pasaporte">Pasaporte</option>
                </select>
                {errors.tipoDocumento && <span className="error-msg">Campo obligatorio</span>}
              </div>
              <div className="form-input">
                <label className="lbl-title">Cédula *</label>
                <input {...register('cedula', { required: true })} className="form-input" type="text" placeholder="Ingrese número de cédula" />
                {errors.cedula && <span className="error-msg">Campo obligatorio</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-input">
                <label className="lbl-title">Nombres *</label>
                <input {...register('nombre', { required: true })} className="form-input" type="text" placeholder="Ingrese su nombre" />
                {errors.nombre && <span className="error-msg">Campo obligatorio</span>}
              </div>
              <div className="form-input">
                <label className="lbl-title">Apellidos *</label>
                <input {...register('apellido', { required: true })} className="form-input" type="text" placeholder="Ingrese su apellido" />
                {errors.apellido && <span className="error-msg">Campo obligatorio</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-input">
                <label className="lbl-title">Número Celular *</label>
                <input {...register('telefono', { required: true })} className="form-input" type="text" placeholder="Ingrese número de celular" />
                {errors.telefono && <span className="error-msg">Campo obligatorio</span>}
              </div>
              <div className="form-input">
                <label className="lbl-title">Dirección *</label>
                <input {...register('direccion', { required: true })} className="form-input" type="text" placeholder="Ingrese su dirección" />
                {errors.direccion && <span className="error-msg">Campo obligatorio</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-input">
                <label className="lbl-title">Correo</label>
                <input {...register('correo')} className="form-input" type="text" placeholder="Ingrese su correo" />
                {errors.correo && <span className="error-msg">Formato de correo incorrecto</span>}
              </div>
              <div className="form-input">
                <label className="lbl-title">Estado *</label>
                <input {...register('estado', { required: true })} className="form-input" type="text" placeholder="Activo/Inactivo" />
                {errors.estado && <span className="error-msg">Campo obligatorio</span>}
              </div>
            </div>
            <div className="butons">
              <button className="btn btn-primary" type="submit" disabled={loading}>Registrar cliente</button>
              <button onClick={onClick} className="btn btn-dark">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioCliente;
