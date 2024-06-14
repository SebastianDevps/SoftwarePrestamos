import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from '../../layout/Sidebar/Sidebar';
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosSearch, IoMdPersonAdd } from "react-icons/io";
import Navbar from '../../components/navApp/Navbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Details from '../../components/Details/Details';
import FormularioCliente from '../../components/form_cliente/FormularioCliente';
import { IoRefreshOutline } from "react-icons/io5";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { Tooltip } from 'react-tooltip'; // Mostrar msg encima del btn

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenClient, setIsModalOpenClient] = useState(false);
    const [currentCliente, setCurrentCliente] = useState(null);
    const navigate = useNavigate();

    // GET
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/clientes');
                setClientes(response.data);
            } catch (error) {
                setError(error.message);
                await Swal.fire({
                    icon: "error",
                    title: "Error al obtener los clientes",
                    text: error,
                });
            }
        };

        fetchData();
    }, []);

    // DELETE
    const handleDelete = async (cedula) => {
        Swal.fire({
            title: "¿Estás seguro de eliminar a este cliente?",
            showCancelButton: true,
            confirmButtonText: "Sí, Confirmar.",
            cancelButtonText: "No, Cancelar",
            icon: 'warning'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:8080/api/clientes/${cedula}`);
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Cliente eliminado",
                            text: "El cliente ha sido eliminado correctamente.",
                        });
                        setClientes(clientes.filter((cliente) => cliente.cedula !== cedula));
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error al eliminar el cliente",
                        text: error.response ? error.response.data.message : "No se pudo eliminar el cliente.",
                    });
                }
            }
        });
    };

    const handleOpenModal = (cliente) => {
        setCurrentCliente(cliente);
        setIsModalOpen(true);
    };

    const handleOpenModalClient = (cliente) => {
        setCurrentCliente(cliente);
        setIsModalOpenClient(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsModalOpenClient(false);
    };

    const handleRefresh = () => {
        window.location.reload();
    }

    const columns = [
        { field: "nombre", headerName: "Nombre", width: 150 },
        { field: "apellido", headerName: "Apellido", width: 200 },
        { field: "tipoDocumento", headerName: "Tipo Documento", width: 160 },
        { field: "cedula", headerName: "# Documento", width: 120 },
        { field: "telefono", headerName: "Teléfono", width: 110 },
        { field: "fechaCreacion", headerName: "Fecha Creación", width: 180 },
        {
            field: "estado", headerName: "Estado", width: 100,
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
                    <div className="mt-3 flex gap-4">
                        <button className="text-xl text-blue-500 " onClick={() => handleOpenModal(params.row)} ><FaEye /></button>
                        <button className="text-xl  text-yellow-500 " onClick={() => handleOpenModalClient(params.row)} ><FaEdit /></button>
                        <button className="text-xl  text-red-500 " onClick={() => handleDelete(params.row.cedula)}><MdDelete /></button>
                    </div>
                );
            },
        },
    ];

    const getStatusClass = (status) => {
        if (status === 'ACTIVO') {
            return 'text-green-500';
        } else if (status === 'INACTIVO') {
            return 'text-red-500';
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen grid grid-col-1 lg:grid-cols-5">
            <div className="col-span-1">
                <Sidebar />
            </div>
            <div className="flex-grow col-span-4">
                <Navbar />
                <div className="flex flex-col p-4">
                    <Breadcrumbs aria-label="breadcrumb" className="mb-4">
                        <Link color="inherit" href="/app">
                            Principal
                        </Link>
                        <Typography color="textPrimary">Clientes</Typography>
                    </Breadcrumbs>
                    <div className="w-full h-full justify-between flex mb-4">
                        <div className='w-[50%]  flex'>
                            <input type="text" className="p-2 w-[50%]  rounded border text-2xs border-gray-100" placeholder="Buscar Cliente..." />
                            <button className="flex items-center  text-gray-600 text-3xl rounded" id="refresh" onClick={handleRefresh}>
                                <IoRefreshOutline className="icon" />
                                {/* <Tooltip className="toltip t" anchorSelect="#refresh" place="right-start">
                                Refrescar
                            </Tooltip> */}
                            </button>
                        </div>
                        <div className='w-[50%] flex justify-end gap-4'>
                            <button className="flex items-center gap-2 p-2 bg-green-500 text-white rounded">
                                <BsDatabaseFillAdd className="text-xl" />
                                Importar Excel
                            </button>
                            <button className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded" onClick={() => handleOpenModalClient()}>
                                <IoMdPersonAdd className="text-xl" />
                                Agregar cliente
                            </button>
                        </div>
                    </div>
                    <div className='w-full bg-white h-[480px]'>
                        <DataGrid
                            rows={clientes}
                            columns={columns}
                            pageSize={9}
                            getRowId={(row) => row.id}
                            disableSelectionOnClick
                        />
                    </div>
                    {isModalOpenClient && <FormularioCliente onClick={handleCloseModal} cliente={currentCliente} />}
                    {isModalOpen && <Details onClick={handleCloseModal} cliente={currentCliente} />}
                </div>
            </div>
        </div>
    );
}

export default Clientes;
