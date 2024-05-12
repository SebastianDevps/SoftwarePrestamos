import React from 'react'
import "./Details.scss"
import { IoIosCloseCircle } from "react-icons/io";


const Details = ({ onClick }) => {
    return (
        <div className="page-content">
            <center><h2>Datos del cliente</h2></center>
            <button onClick={onClick} className="close-button"><IoIosCloseCircle className='icon'/></button>
            <table className="table table-hover table-striped">
                <tbody>
                    <tr>
                        <td><b>Nombre:</b> Cesar</td>
                        <td><b>Apellidos:</b> Prueba Efect</td>
                    </tr>
                    <tr>
                        <td><b>Cedula:</b> 124-5487865-3</td>
                        <td><b>Pasaporte:</b> </td>
                    </tr>
                    <tr>
                        <td><b>Teléfono:</b> 468-574-6135</td>
                        <td><b>Celular:</b> 854-319-8465</td>
                    </tr>
                    <tr>
                        <td><b>Nacionalidad:</b> Guatemala</td>
                        <td><b>Ciudad:</b> Distrito Nacional</td>
                    </tr>
                    <tr>
                        <td><b>Dirección:</b> prueba</td>
                        <td><b>Correo:</b> cesar@example.com</td>
                    </tr>
                    <tr>
                        <td><b>Estado civil:</b> Soltero</td>
                        <td><b>Sexo:</b> M</td>
                    </tr>
                    <tr>
                        <td><b>Ocupación:</b> Ingeniero</td>
                        <td><b>Fecha de nacimiento:</b> 24-02-1987</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Details
