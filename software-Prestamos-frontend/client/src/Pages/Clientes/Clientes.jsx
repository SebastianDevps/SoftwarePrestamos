import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import "./Clientes.scss";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from '../../layout/Sidebar/Sidebar';
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosSearch, IoMdPersonAdd } from "react-icons/io";
import Navbar from '../../components/navApp/Navbar';
import Details from '../../components/Details/Details';
import FormularioCliente from '../../components/form_cliente/FormularioCliente';
import { IoRefreshOutline } from "react-icons/io5";
import { Tooltip } from 'react-tooltip'//mostrar msg encima del btn


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
        //{ field: "id", headerName: "ID", width: 90 },
        { field: "nombre", headerName: "Nombre", width: 130 },
        { field: "apellido", headerName: "Apellido", width: 180 },
        { field: "cedula", headerName: "Cédula", width: 120 },
        { field: "telefono", headerName: "Teléfono", width: 110 },
        { field: "fechaCreacion", headerName: "Fecha Creación", width: 160 },
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
                    <div className="cellAction">
                        <button className="viewButton" onClick={() => handleOpenModal(params.row)} ><FaEye /></button>
                        <button className="editButton" onClick={() => handleOpenModalClient(params.row)} ><FaEdit /></button>
                        <button className="deleteButton" onClick={() => handleDelete(params.row.cedula)}><MdDelete /></button>
                    </div>
                );
            },
        },
    ];

    const getStatusClass = (status) => {
        if (status === 'ACTIVO') {
            return 'active';
        } else if (status === 'INACTIVO') {
            return 'inactive';
        }
    };

    return (
        <div className='app'>
            <div className="side">
                <Sidebar />
            </div>

            <div className='datatable'>
                <div className="datatableTitle">
                    Clientes
                </div>
                <div className="cont-search">
                    <input type="text" className='search' placeholder='Buscar Cliente...' />
                    <button className='link' id='link'><IoIosSearch className='icon' />
                        <Tooltip className='toltip' anchorSelect="#link" place="right-start">
                            Buscar
                        </Tooltip>
                    </button>
                    <button className="refresh" id='refresh' onClick={() => handleRefresh()}><IoRefreshOutline className='icon' />
                        <Tooltip className='toltip' anchorSelect="#refresh" place="right-start">
                            Refrescar
                        </Tooltip>
                    </button>
                    <button className='link1' onClick={() => handleOpenModalClient()}>
                        <IoMdPersonAdd className='icon' />
                        Agregar cliente
                    </button>
                </div>

                <DataGrid
                    className="datagrid"
                    rows={clientes}
                    columns={columns}
                    pageSize={9}
                    getRowId={(row) => row.id}
                    disableSelectionOnClick
                />
                
                {isModalOpenClient && <FormularioCliente onClick={handleCloseModal} cliente={currentCliente} />}
                {isModalOpen && <Details onClick={handleCloseModal} cliente={currentCliente} />}
                </div>
        </div>
    )
}

export default Clientes;
