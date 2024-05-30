import React, { useState, useEffect} from 'react';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import './FormularioCliente.scss';
import axios from "axios";


const FormularioCliente = ({ onClick, cliente }) => {

  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm();

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Cargando...",
        html: "Por favor, espera mientras validamos tus datos.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
  }, [loading]);

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      axios.post("http://8080/api/clientes");
      // Simula una solicitud de inicio de sesión
    await new Promise((resolve) => setTimeout(resolve, 3000));
      await Swal.fire({
        icon: "success",
        title: "¡Yupi!",
        text: "Cliente registrado correctamente.",
        showConfirmButton: true
      });
    } catch (error) {
      //console.error("Error al registrar cliente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrar cliente. Por favor, intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="container">
        <div className="container-body">
          <div className="form-title">TITTULO DEPENDIENTE</div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              {/* Forms inputs1*/}
              <div className="form-inputs1">
                <div className="form-input">
                  <label className="lbl-title">Tipo documento</label>
                  <select className="form-input" typeof='text'>
                    <option value="" selected>Seleccione Uno</option>
                    <option value="documento">Cedula</option>
                    <option value="pasaporte">Pasaporte</option>
                  </select>
                </div>
                <div className="form-input">
                  <label className="lbl-title">Cedula</label>
                  <input className="form-input" type="text" placeholder='Ingrese numero' name="dni" />
                </div>
              </div>
              {/* Fin */}
              {/* Forms inputs2*/}
              <div className="form-inputs2">
                <div className="form-input">
                  <label className="lbl-title">Nombres</label>
                  <input className="form-input" type="text" placeholder='Ingrese su nombre' name="nombre" />
                </div>
                <div className="form-input">
                  <label className="lbl-title">Apellidos</label>
                  <input className="form-input" type="text" placeholder='Ingrese su apellido' name="apellido" />
                </div>
              </div>
              {/* Fin */}
              {/* Forms inputs3*/}
              <div className="form-inputs3">
                <div className="form-input">
                  <label className="lbl-title">Numero Celular</label>
                  <input className="form-input" type="text" placeholder='Ingrese numero' name="telefono" />
                </div>
                <div className="form-input">
                  <label className="lbl-title">Dirección</label>
                  <input className="form-input" type="text" placeholder='Ingrese su direccion' name="direccion" />
                </div>
              </div>
              {/* Fin */}
              <div className="form-inputs-full">
                <div className="form-input">
                  <label className="lbl-title">Correo</label>
                  <input className="form-input" type="text" placeholder='Ingrese su correo' name="correo" />
                </div>
                <div className="form-input">
                  <label className="lbl-title">Estado</label>
                  <input className="form-input2" type="text"  name="estado" placeholder='INACTIVO' readOnly />
                </div>
              </div>
            </div>
            <div className="butons">
              <button className="btn btn-primary" type="submit">Registrar cliente</button>
              <button onClick={onClick} className="btn btn-dark">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioCliente;
