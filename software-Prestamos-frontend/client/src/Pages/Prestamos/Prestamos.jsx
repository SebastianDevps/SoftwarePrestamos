import React, { useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from '../../layout/Sidebar/Sidebar';
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete, MdAddchart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Details from '../../components/Details/Details';
import FormularioPrestamo from '../../components/form_prestamo/FormularioPrestamo';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Prestamos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPrestamo, setCurrentPrestamo] = useState(null);

    const handleOpenModal = (prestamo) => {
        setCurrentPrestamo(prestamo);
        setIsModalOpen(true);
    };

    const handleOpenModalFormPrestamo = () => {
        setCurrentPrestamo(null);
        setIsFormOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsFormOpen(false);
    };

    const rows = [
        { id: 1, name: "John Sebastian Hinestroza Jaramillo", mount: 999.999999, iva: 5, acMount: "5", acPago: "Mensual", F_limt: "06-02-2024", create: "Administrador", status: "activo" },
        { id: 2, name: "John Doe Hinestroza Jaramillo", mount: 999.999, iva: 5, acMount: "50", acPago: "Mensual", F_limt: "06-02-2024", create: "Administrador", status: "inactivo" },
        { id: 3, name: "John Doe Hinestroza Jaramillo", mount: 999.999, iva: 15, acMount: "20", acPago: "Mensual", F_limt: "06-02-2024", create: "Administrador", status: "activo" },
    ];

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "name", headerName: "Cliente", width: 200 },
        { field: "iva", headerName: "Iva %", width: 60 },
        { field: "acMount", headerName: "Cuotas Pendientes", width: 150 },
        { field: "acPago", headerName: "Acuerdo pago", width: 120 },
        { field: "F_limt", headerName: "Fecha Limite Pago", width: 150 },
        { field: "mount", headerName: "Monto Total", width: 150 },
        {
            field: "status", headerName: "Estado", width: 90,
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
            renderCell: (params) => {
                return (
                    <div className="cellAction flex gap-2">
                        <button className="viewButton text-blue-500 p-1" onClick={() => handleOpenModal(params.row)}><FaEye /></button>
                        <button className="editButton text-yellow-500 p-1"><FaEdit /></button>
                        <button className="deleteButton text-red-500 p-1"><MdDelete /></button>
                    </div>
                );
            },
        },
    ];

    const getStatusClass = (status) => {
        if (status === 'activo') {
            return 'text-green-500'; // Clase para estado activo
        } else if (status === 'inactivo') {
            return 'text-red-500'; // Clase para estado inactivo
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen grid grid-col-1 lg:grid-cols-5">
            <div className='col-span-1'>
                <Sidebar />
            </div>
            <div className='flex-grow col-span-4'>
                <div className='flex flex-col p-4'>
                    <Breadcrumbs aria-label="breadcrumb" className="mb-4">
                        <Link color="inherit" href="/app">
                            Principal
                        </Link>
                        <Typography color="textPrimary">Prestamos</Typography>
                    </Breadcrumbs>
                    <div className="w-full h-full justify-between flex mb-4">
                        <div className='w-[50%] flex'>
                            <input type="text" className='w-[60%] p-2 rounded border border-gray-300' placeholder='Buscar Prestamo...' />
                            <button className='flex items-center text-3xl -ml-10 text-gray-600 rounded'>
                                <IoIosSearch className='icon' />
                            </button>
                        </div>
                        <div>
                            <button className='link1 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded' onClick={handleOpenModalFormPrestamo}>
                                <MdAddchart className='icon' />
                                Agregar prestamo
                            </button>
                        </div>
                    </div>
                    <div className='w-full h-[480px]'>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={9}
                            getRowId={(row) => row.id}
                            disableSelectionOnClick
                        />
                    </div>
                    {isModalOpen && <Details onClick={handleCloseModal} />}
                    {isFormOpen && <FormularioPrestamo onClick={handleCloseModal} cliente={currentPrestamo} />}
                </div>
            </div>
        </div>
    );
};

export default Prestamos;
