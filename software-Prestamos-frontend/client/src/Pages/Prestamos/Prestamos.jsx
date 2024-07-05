import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar/Sidebar';
import { FaEdit, FaEye, FaFilter } from "react-icons/fa";
import { MdDelete, MdAddchart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Details from '../../components/Details/Details';
import FormularioPrestamo from '../../components/form_prestamo/FormularioPrestamo';
import { VscError } from "react-icons/vsc";
import axios from 'axios';

const Prestamos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPrestamo, setCurrentPrestamo] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState(''); // Estado activo/inactivo
    const [filterAcuerdoPago, setFilterAcuerdoPago] = useState(''); // Mensual, Diario, Quincenal
    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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

    const handleFilterEstado = (estado) => {
        setFilterEstado(estado === filterEstado ? '' : estado);
    };

    const handleFilterAcuerdoPago = (acuerdoPago) => {
        setFilterAcuerdoPago(acuerdoPago === filterAcuerdoPago ? '' : acuerdoPago);
    };

    const filteredRows = prestamos.filter(row =>
        row.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterEstado ? row.status === filterEstado : true) &&
        (filterAcuerdoPago ? row.acuerdoPago === filterAcuerdoPago : true)
    );

    const getStatusClass = (status) => {
        if (status === 'activo') {
            return 'text-green-500'; // Clase para estado activo
        } else if (status === 'inactivo') {
            return 'text-red-500'; // Clase para estado inactivo
        }
    };

    return (
        <div className="flex bg-white min-h-screen grid grid-cols-1 lg:grid-cols-5">
            <div className='col-span-1'>
                <Sidebar />
            </div>
            <div className='flex-grow col-span-4'>
                <div className='flex flex-col'>
                    <div className='p-2 bg-customMain border-b mb-4 h-[70px]'>
                        <div className="flex justify-between items-center">
                            <div className='text-xl font-medium uppercase'>Registro De Prestamos</div>
                            <button
                                className='flex items-center text-2sm gap-2 px-2 py-1.5 font-semibold bg-orange-400 text-white rounded hover:bg-orange-500 transition'
                                onClick={handleOpenModalFormPrestamo}
                            >
                                <MdAddchart className='text-xl font-semibold' />
                                Agregar Préstamo
                            </button>
                        </div>
                    </div>

                    <div className="w-full border-b bg-white h-20 flex justify-between items-center px-4 shadow-md">
                        <div className="flex w-full md:w-1/2 -mt-6 items-center relative">
                            <IoIosSearch className="text-gray-500 absolute left-3" />
                            <input
                                type="text"
                                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Buscar préstamo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4 -mt-6">
                            <div className="relative">
                                <div className="flex items-center -mt-8 mb-1  gap-1">
                                    <FaFilter className="text-sm text-blue-600" />
                                    <span className="font-semibold text-blue-600">Filtros</span>
                                </div>
                                <div className='flex gap-4'>
                                    <select
                                        className="block  border border-blue-800  text-customText px-2 py-1.5 rounded-md hover:cursor-pointer transition focus:outline-none"
                                        value={filterEstado}
                                        onChange={(e) => handleFilterEstado(e.target.value)}
                                    >
                                        <option value="">Seleccionar Estado</option>
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>
                                    </select>
                                    <select
                                        className="block border text-customText px-2 py-1.5 rounded-md hover:cursor-pointer transition focus:outline-none"
                                        value={filterAcuerdoPago}
                                        onChange={(e) => handleFilterAcuerdoPago(e.target.value)}
                                    >
                                        <option value="">Seleccionar Acuerdo de Pago</option>
                                        <option value="Diario">Diario</option>
                                        <option value="Quincenal">Quincenal</option>
                                        <option value="Mensual">Mensual</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className='bg-customMain '>
                        <div className='w-full h-[460px] rounded-sm overflow-x-auto'>
                        <table className="min-w-full bg-white border-collapse">
                                <thead className="sticky border-b">
                                    <tr className="text-sm font-semibold bg-customMain text-gray-700">
                                        <th className="py-2 px-4 border-gray-300">Cliente</th>
                                        <th className="py-2 px-4 border-gray-300">Iva %</th>
                                        <th className="py-2 px-4 border-gray-300">Cuotas Pendientes</th>
                                        <th className="py-2 px-4 border-gray-300">Acuerdo pago</th>
                                        <th className="py-2 px-4 border-gray-300">Fecha Limite Pago</th>
                                        <th className="py-2 px-4 border-gray-300">Monto Total</th>
                                        <th className="py-2 px-4 border-gray-300">Estado</th>
                                        <th className="py-2 px-4 border-gray-300">Acciones</th>
                                    </tr>
                                </thead>
                                {filteredRows.length === 0 ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                <div className="flex flex-col items-center py-10">
                                                    <p className="flex items-center capitalize gap-2 py-40 text-gray-600 font-semibold">
                                                        <VscError className="text-red-500 text-4xl" />
                                                        No hay registros de préstamos
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody className="text-sm text-gray-700">
                                        {filteredRows.map((row) => (
                                            <tr key={row.id} className="border-b border-gray-300">
                                                <td className="py-2 px-4">{row.userId}</td>
                                                <td className="py-2 px-4">{row.iva || '16%'}</td>
                                                <td className="py-2 px-4">{row.cuotasPendientes || '-'}</td>
                                                <td className="py-2 px-4">{row.acuerdoPago}</td>
                                                <td className="py-2 px-4">{row.fechaLimitePago}</td>
                                                <td className="py-2 px-4">{row.montoTotal}</td>
                                                <td className="py-2 px-4">
                                                    <span className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusClass(row.status)}`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <div className="flex gap-2">
                                                        <button className="text-blue-500 p-1" onClick={() => handleOpenModal(row)}><FaEye /></button>
                                                        <button className="text-yellow-500 p-1"><FaEdit /></button>
                                                        <button className="text-red-500 p-1"><MdDelete /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>

                        </div>
                    </div>

                    {isModalOpen && <Details prestamo={currentPrestamo} onClose={handleCloseModal} />}
                    {isFormOpen && <FormularioPrestamo onClose={handleCloseModal} />}
                </div>
            </div>
        </div>
    );
};

export default Prestamos;
