import React from 'react'
import "./Prestamos.scss"
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from '../../layout/Sidebar/Sidebar';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from '../../components/navApp/Navbar';
import { IoIosSearch } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { MdAddchart } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Details from '../../components/Details/Details';
import { useState } from 'react';
import FormularioPrestamo from '../../form_prestamo/FormularioPrestamo';

const Prestamos = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPrestamo, setCurrentPrestamo] = useState(null);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleOpenModalFormPrestamo = (prestamo) => {
        setCurrentPrestamo(prestamo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


  const rows = [
    { id: 1, name: "John Doe", mount: 999.999, iva: 0.5, acMount:"50.000" ,acPago: "Mensual", F_limt: "06-02-2024", create: "Administrador", status: "active" },
    { id: 2, name: "John Doe", mount: 999.999, iva: 0.5, acMount:"50.000" ,acPago: "Mensual", F_limt: "06-02-2024", create: "Administrador", status: "inactive" },
    { id: 3, name: "John Doe", mount: 999.999, iva: 0.15, acMount:"50.000" ,acPago: "Mensual", F_limt: "06-02-2024", create: "Administrador", status: "active" },
    
];

const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Cliente", width: 125 },
    { field: "mount", headerName: "Monto", width: 110 },
    { field: "iva", headerName: "Iva %", width: 60},
    { field: "acMount", headerName: "Cuota", width: 90},
    { field: "acPago", headerName: "Acuerdo pago", width: 120},
    { field: "F_limt", headerName: "Fecha Limite Pago", width: 160},
    { field: "create", headerName: "Prestamista", width: 130},
    { field: "status", headerName: "Estado", width: 90,
    renderCell: (params) => {
        return (
            <span className={`status-cell ${getStatusClass(params.value)}`}>
                {params.value}
            </span>
        );
    }
    },
    {
        field: "action",
        headerName: "Acciones",
        width: 130,
        renderCell: () => {
            return (
                <div className="cellAction">
                    <button className="viewButton" onClick={handleOpenModal} ><FaEye/></button>
                    <button className="editButton"><FaEdit/></button>
                    <button className="deleteButton"><MdDelete/></button>
                </div>
            );
        },
    },
];

const getStatusClass = (status) => {
    if (status === 'active') {
        return 'active'; // Clase para estado activo
    } else if (status === 'inactive') {
        return 'inactive'; // Clase para estado inactivo
    }
};

return (
    <div className='prest_app'>
        <Sidebar />
        <div className='prest_datatable'>
            <div className="prest_datatableTitle">
                Prestamos
            </div>
            <div className="prest_cont-search">
                <input type="text" className='search' placeholder='Buscar Prestamo...' />
                <button className='link'><IoIosSearch className='icon'/></button>
                <button className='link1' onClick={() => handleOpenModalFormPrestamo()}>
                    <MdAddchart className='icon'/>
                    Agregar prestamo
                </button>
            </div>
            
            <DataGrid
                className="prest_datagrid"
                rows={rows}
                columns={columns}
                pageSize={9}                    
                getRowId={(row) => row.id}
                disableSelectionOnClick
            />
            {isModalOpen && <Details onClick={handleCloseModal} />}
            {isModalOpen && <FormularioPrestamo onClick={handleCloseModal} cliente={currentPrestamo} />}
        </div>
    </div>
)
}

export default Prestamos
