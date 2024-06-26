import React, { useState } from "react";
import "./FormularioPrestamo.scss";
import { MdAddchart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { AiFillCalendar } from "react-icons/ai";

const FormularioPrestamo = ({ onClick, Prestamo }) => {
  const [startDate, setStartDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setIsOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="container">
        <div className="container-body">
          <div className="form-title">TITTULO DEPENDIENTE</div>
          <form className="form">
            <div className="form-row">
              {/* Forms inputsBuscarCLiente */}
              <div className="form-inputs1">
                <div className="form-input">
                  <label className="lbl-title">Ingresar Cliente</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Ingrese el documento del cliente"
                    name="dni"
                  />
                  <button className="link">
                    <IoIosSearch className="icon" />
                  </button>
                </div>
              </div>
              {/* Forms inputs1 */}
              <div className="form-inputs1">
                <div className="form-input">
                  <label className="lbl-title">Cedula Cliente</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Ingrese numero"
                    name="dni"
                  />
                </div>
                <div className="form-input">
                  <label className="lbl-title">Fecha de Inicio</label>
                  <div className="date-picker-container">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Seleccione fecha"
                      value={startDate ? startDate.toLocaleDateString() : ""}
                      readOnly
                      onClick={handleButtonClick}
                    />
                    <button type="button" className="calendar-button" onClick={handleButtonClick}>
                      <AiFillCalendar className="icon" />
                    </button>
                    {isOpen && (
                      <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        inline
                        className="date-picker"
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* Fin */}
              {/* Forms inputs2 */}
              <div className="form-inputs2">
                <div className="form-input">
                  <label className="lbl-title">Nombres</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Ingrese su nombre"
                    name="nombre"
                  />
                </div>
                <div className="form-input">
                  <label className="lbl-title">Apellidos</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Ingrese su apellido"
                    name="apellido"
                  />
                </div>
              </div>
              {/* Fin */}
              {/* Forms inputs3 */}
              <div className="form-inputs3">
                <div className="form-input">
                  <label className="lbl-title">Numero Celular</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Ingrese numero"
                    name="telefono"
                  />
                </div>
                <div className="form-input">
                  <label className="lbl-title">Dirección</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Ingrese su direccion"
                    name="direccion"
                  />
                </div>
              </div>
              {/* Fin */}
              <div className="form-inputs-full">
                <div className="form-input">
                  <label className="lbl-title">Correo</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Ingrese su correo"
                    name="correo"
                  />
                </div>
                <div className="form-input">
                  <label className="lbl-title">Estado</label>
                  <input
                    className="form-input2"
                    type="text"
                    name="estado"
                    placeholder="INACTIVO"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="butons">
              <button className="btn btn-primary" type="submit">
                Registrar cliente
              </button>
              <button onClick={onClick} className="btn btn-dark">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioPrestamo;
