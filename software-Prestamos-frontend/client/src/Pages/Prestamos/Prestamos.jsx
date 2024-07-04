import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar/Sidebar';
import { FaEdit, FaEye, FaFilter } from "react-icons/fa";
import { MdDelete, MdAddchart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Details from '../../components/Details/Details';
import FormularioPrestamo from '../../components/form_prestamo/FormularioPrestamo';
import { RiErrorWarningLine } from "react-icons/ri";
import axios from 'axios';

const Prestamos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPrestamo, setCurrentPrestamo] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filterEstado, setFilterEstado] = useState(''); // Estado activo/inactivo
    const [filterAcuerdoPago, setFilterAcuerdoPago] = useState(''); // Mensual, Diario, Quincenal
    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get();
            setPrestamos(response.data);
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

    const handleToggleFilters = () => {
        setFiltersOpen(!filtersOpen);
    };

    const clearFilters = () => {
        setFilterEstado('');
        setFilterAcuerdoPago('');
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
        <div className="flex bg-gray-50 min-h-screen grid grid-cols-1 lg:grid-cols-5">
            <div className='col-span-1'>
                <Sidebar />
            </div>
            <div className='flex-grow col-span-4'>
                <div className='flex flex-col p-4'>
                    <div className="mb-4 flex justify-between items-center">
                        <div className='text-2xl font-medium'>Prestamos</div>
                        <button
                            className='flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition'
                            onClick={handleOpenModalFormPrestamo}
                        >
                            <MdAddchart className='text-xl' />
                            Agregar préstamo
                        </button>
                    </div>

                    <div className="w-full flex justify-between items-center mb-4">
                        <div className='w-[70%] md:w-[50%] flex items-center'>
                            <input
                                type="text"
                                className='w-full p-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Buscar préstamo...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className='flex items-center p-2 rounded-r bg-blue-500 text-white hover:bg-blue-600 transition'>
                                <IoIosSearch className='text-xl' />
                            </button>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition focus:outline-none"
                                onClick={handleToggleFilters}
                            >
                                <FaFilter className="text-lg" />
                                <span>Filtrar</span>
                            </button>
                        </div>
                    </div>

                    {filtersOpen && (
                        <div className="mb-3 flex gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    className={`flex items-center gap-1 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition focus:outline-none ${filterEstado === 'activo' ? 'bg-blue-600' : ''}`}
                                    onClick={() => handleFilterEstado('activo')}
                                >
                                    <FaFilter className="text-lg" />
                                    <span>Activo</span>
                                </button>
                                <button
                                    className={`flex items-center gap-1 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition focus:outline-none ${filterEstado === 'inactivo' ? 'bg-blue-600' : ''}`}
                                    onClick={() => handleFilterEstado('inactivo')}
                                >
                                    <FaFilter className="text-lg" />
                                    <span>Inactivo</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    className={`flex items-center gap-1 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition focus:outline-none ${filterAcuerdoPago === 'Diario' ? 'bg-blue-600' : ''}`}
                                    onClick={() => handleFilterAcuerdoPago('Diario')}
                                >
                                    <FaFilter className="text-lg" />
                                    <span>Diario</span>
                                </button>
                                <button
                                    className={`flex items-center gap-1 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition focus:outline-none ${filterAcuerdoPago === 'Quincenal' ? 'bg-blue-600' : ''}`}
                                    onClick={() => handleFilterAcuerdoPago('Quincenal')}
                                >
                                    <FaFilter className="text-lg" />
                                    <span>Quincenal</span>
                                </button>
                                <button
                                    className={`flex items-center gap-1 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition focus:outline-none ${filterAcuerdoPago === 'Mensual' ? 'bg-blue-600' : ''}`}
                                    onClick={() => handleFilterAcuerdoPago('Mensual')}
                                >
                                    <FaFilter className="text-lg" />
                                    <span>Mensual</span>
                                </button>
                            </div>
                            <div>
                                <button
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
                                    onClick={clearFilters}
                                >
                                    Limpiar
                                </button>
                            </div>
                        </div>
                    )}

                    {filteredRows.length === 0 ? (
                        <div className="flex items-center justify-center h-[490px] bg-white rounded-3xl shadow-md p-4">
                            <div className='bg-customMain flex items-center justify-center rounded-full p-2'>
                                <RiErrorWarningLine className="text-red-500 text-4xl" />
                                <p className="ml-2 text-gray-600 font-semibold">No hay datos de préstamos</p>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full bg-white h-[490px] rounded-3xl shadow-md p-4 overflow-x-auto'>
                            <table className="min-w-full bg-white border-collapse">
                                <thead className="sticky top-0 bg-white border-b border-gray-300">
                                    <tr className="text-sm font-semibold text-gray-700">
                                        <th className="py-2 px-4 border-gray-300">ID</th>
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
                                <tbody className="text-sm text-gray-700">
                                    {filteredRows.map((row) => (
                                        <tr key={row.id} className="border-b border-gray-300">
                                            <td className="py-2 px-4">{row.id}</td>
                                            <td className="py-2 px-4">{row.title}</td>
                                            <td className="py-2 px-4">{row.userId}</td>
                                            <td className="py-2 px-4">-</td>
                                            <td className="py-2 px-4">-</td>
                                            <td className="py-2 px-4">-</td>
                                            <td className="py-2 px-4">-</td>
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
                            </table>
                        </div>
                    )}

                    {isModalOpen && <Details onClick={handleCloseModal} />}
                    {isFormOpen && <FormularioPrestamo onClick={handleCloseModal} cliente={currentPrestamo} />}
                </div>
            </div>
        </div>
    );
};

export default Prestamos;
