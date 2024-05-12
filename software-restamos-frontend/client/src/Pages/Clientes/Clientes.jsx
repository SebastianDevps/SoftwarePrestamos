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

const Clientes = () => {

    const rows = [
        { id: 1, name: "John Doe", lastname: "Smith Karls", cc: 123456789112, phone: 3025874169, adress: "cll 84 #98 k54", email: "john@example.com", status: "active" },
        { id: 2, name: "John Doe", lastname: "Smith Karls", cc: 123456789112, phone: 3025874169, adress: "cll 84 #98 k54", email: "john@example.com", status: "inactive" },
        { id: 3, name: "John Doe", lastname: "Smith Karls", cc: 123456789112, phone: 3025874169, adress: "cll 84 #98 k54", email: "john@example.com", status: "pending" },
        
    ];

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "name", headerName: "Nombre", width: 130 },
        { field: "lastname", headerName: "Apellido", width: 110 },
        { field: "cc", headerName: "Cedula", width: 130},
        { field: "phone", headerName: "Telefono", width: 120},
        { field: "adress", headerName: "Direccion", width: 140},
        { field: "email", headerName: "Correo electronico", width: 180},
        { field: "status", headerName: "Estado", width: 80,
        renderCell: (params) => {
            return (
                <span className={getStatusClass(params.value)}>
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
                        <button className="viewButton"><FaEye/></button>
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
        } else {
            return 'pending'; // Clase para estado pendiente
        }
    };
    
    return (
        <div className='app'>
            <Sidebar />
            <div className='datatable'>
                <div className="datatableTitle">
                    Clientes
                    <button className='link1'>
                        <IoMdPersonAdd className='icon'/>
                        Agregar cliente
                    </button>
                </div>
                <div className="cont-search">
                    <input type="text" className='search' placeholder='Buscar Cliente...' />
                    <button className='link'><IoIosSearch className='icon'/></button>
                </div>
                
                <DataGrid
                    className="datagrid"
                    rows={rows}
                    columns={columns}
                    pageSize={9}                    
                    getRowId={(row) => row.id}
                    disableSelectionOnClick
                />
            </div>
        </div>
    )
}

export default Clientes
