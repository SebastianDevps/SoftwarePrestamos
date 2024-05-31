import React from 'react'
import "./Details.scss"
import { IoIosCloseCircle } from "react-icons/io";


const Details = ({ onClick, cliente }) => {

    if (!cliente) return <div>No hay datos disponibles</div>;

    return (
        <div className="modal-overlay">
        <div className="page-content">
            <center><h2 className='title1'>Datos del cliente</h2></center>
            <button onClick={onClick} className="close-button"><IoIosCloseCircle className='icon' /></button>
            <table className="table table-hover table-striped">
                <tbody>
                    <tr>
                        <td><b>Nombre:</b> {cliente.nombre} </td>
                        <td><b>Apellidos:</b> {cliente.apellido} </td>
                    </tr>
                    <tr>
                        <td><b>Tipo de documento:</b> {cliente.tipoDocumento} </td>
                        <td><b>Cedula:</b> {cliente.cedula} </td>
                    

                    </tr>
                    <tr>
                        <td><b>Celular:</b> {cliente.telefono} </td>
                        <td><b>Dirección:</b> {cliente.direccion} </td>
                    </tr>
                    {/* <tr>
                        <td><b>Fecha de nacimiento:</b> 24-02-1987</td>
                        <td><b>Nacionalidad:</b> Colombia</td>
                    </tr> */}
                    <tr>
                        <td><b>Fecha de creacion: </b> {cliente.fechaCreacion} </td>
                        <td><b>Fecha de edicion: </b> {cliente.fechaEdicion} </td>
                    </tr>
                    <tr>
                        <td><b>Ocupación:</b> Ingeniero</td>
                        <td><b>Estado del cliente: </b> {cliente.estado} </td>
                    </tr>
                </tbody>
            </table>
            <center><h2 className='title'>Datos del Prestamo</h2></center>
            <table className="table2 table-hover table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Monto</th>
                        <th>Porcentaje</th>
                        <th>Monto a Pagar</th>
                        <th>Fecha Limite</th>
                        <th>Estado</th>
                        <th>Prestamista</th>
                    </tr>
                </thead>
                <tbody className='body'>
                    {cliente.prestamos && cliente.prestamos.length > 0 ? (
                        cliente.prestamos.map((prestamo, index) => (
                            <tr key={index}>
                                <td>{prestamo.id}</td>
                                <td>{prestamo.monto}</td>
                                <td>{prestamo.porcentaje}</td>
                                <td>{prestamo.montoAPagar}</td>
                                <td>{prestamo.fechaLimite}</td>
                                <td>{prestamo.estado}</td>
                                <td>{prestamo.prestamista}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" 
                            style={{ textAlign: "center", fontSize: "20px", color:"red", fontWeight: "bold"}
                        }>
                        Este cliente no tiene prestamos</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
        </div>
    )
}

export default Details
