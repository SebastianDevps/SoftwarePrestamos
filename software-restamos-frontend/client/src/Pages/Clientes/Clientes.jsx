import React from 'react'
import "./Clientes.scss"
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from '../../layout/Sidebar/Sidebar';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from '../../components/navApp/Navbar';
import { IoIosSearch } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Details from '../../components/Details/Details';
import axios from 'axios'
import Swal from 'sweetalert2';

const Clientes = () => {

    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //GET
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

    //DELETE
    const handleDelete = async (cedula) => {
        Swal.fire({
            title: "¿Estás seguro de eliminar a este cliente?",
            showCancelButton: true,
            confirmButtonText: "Si, Confirmar.",
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
    

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "nombre", headerName: "Nombre", width: 150 },
        { field: "apellido", headerName: "Apellido", width: 150 },
        { field: "cedula", headerName: "Cedula", width: 140 },
        { field: "telefono", headerName: "Telefono", width: 130 },
        { field: "fechaCreacion", headerName: "Fecha Creacion", width: 160 },
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
                        <button className="viewButton" onClick={handleOpenModal} ><FaEye /></button>
                        <button className="editButton"><FaEdit /></button>
                        <button className="deleteButton" onClick={() => handleDelete(params.row.cedula)} ><MdDelete /></button>
                    </div>
                );
            },
        },
    ];

    const getStatusClass = (status) => {
        if (status === 'ACTIVE') {
            return 'active';
        } else if (status === 'INACTIVE') {
            return 'inactive';
        }
    };

    return (
        <div className='app'>
            <Sidebar />
            <div className='datatable'>
                <div className="datatableTitle">
                    Clientes
                </div>
                <div className="cont-search">
                    <input type="text" className='search' placeholder='Buscar Cliente...' />
                    <button className='link'><IoIosSearch className='icon' /></button>
                    <button className='link1'>
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
                {isModalOpen && <Details onClick={handleCloseModal} />}
            </div>
        </div>
    )
}

export default Clientes
