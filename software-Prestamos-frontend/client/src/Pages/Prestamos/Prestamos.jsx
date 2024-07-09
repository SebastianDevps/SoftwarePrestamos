import { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar/Sidebar';
import { FaFilter, FaTimes } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineEdit, MdAddchart } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import FormularioPrestamo from '../../components/form_prestamo/FormularioPrestamo';
import { VscError } from "react-icons/vsc";

const Prestamos = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState(''); // Estado activo/inactivo
    const [filterAcuerdoPago, setFilterAcuerdoPago] = useState(''); // Mensual, Diario, Quincenal
    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Simulación de datos
            const simulatedData = [
                {
                    id: 1,
                    title: "Préstamo 1",
                    userId: "Juan Alberto Peresasc Hinestroza",
                    iva: 20,
                    cuotasPendientes: 25,
                    acuerdoPago: "Mensual",
                    fechaLimitePago: "2024-08-15",
                    montoTotal: 999999999,
                    status: "activo"
                },
                {
                    id: 2,
                    title: "Préstamo 2",
                    userId: "Pedro Gomez",
                    iva: 15,
                    cuotasPendientes: 10,
                    acuerdoPago: "Diario",
                    fechaLimitePago: "2024-07-20",
                    montoTotal: 500000,
                    status: "inactivo"
                },
                {
                    id: 2,
                    title: "Préstamo 2",
                    userId: "Pedro Gomez",
                    iva: 15,
                    cuotasPendientes: 10,
                    acuerdoPago: "Diario",
                    fechaLimitePago: "2024-07-20",
                    montoTotal: 500000,
                    status: "inactivo"
                },
                {
                    id: 2,
                    title: "Préstamo 2",
                    userId: "Pedro Gomez",
                    iva: 15,
                    cuotasPendientes: 10,
                    acuerdoPago: "Diario",
                    fechaLimitePago: "2024-07-20",
                    montoTotal: 500000,
                    status: "inactivo"
                },
                {
                    id: 2,
                    title: "Préstamo 2",
                    userId: "Pedro Gomez",
                    iva: 15,
                    cuotasPendientes: 10,
                    acuerdoPago: "Diario",
                    fechaLimitePago: "2024-07-20",
                    montoTotal: 500000,
                    status: "inactivo"
                },
                {
                    id: 2,
                    title: "Préstamo 2",
                    userId: "Pedro Gomez",
                    iva: 15,
                    cuotasPendientes: 10,
                    acuerdoPago: "Diario",
                    fechaLimitePago: "2024-07-20",
                    montoTotal: 500000,
                    status: "inactivo"
                }
                
            ];

            setPrestamos(simulatedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleOpenModalFormPrestamo = () => {
        setIsFormOpen(true);
    };

    const handleCloseModal = () => {
        setIsFormOpen(false)
    };

    const handleFilterEstado = (estado) => {
        setFilterEstado(estado === filterEstado ? '' : estado);
    };

    const handleFilterAcuerdoPago = (acuerdoPago) => {
        setFilterAcuerdoPago(acuerdoPago === filterAcuerdoPago ? '' : acuerdoPago);
    };

    const clearFilterEstado = () => {
        setFilterEstado('');
    };

    const clearFilterAcuerdoPago = () => {
        setFilterAcuerdoPago('');
    };

    const filteredRows = prestamos.filter(row =>
        row.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterEstado ? row.status === filterEstado : true) &&
        (filterAcuerdoPago ? row.acuerdoPago === filterAcuerdoPago : true)
    );

    const getStatusClass = (status) => {
        if (status === 'activo') {
            return 'bg-green-100 text-green-500'; // Clase para estado activo
        } else if (status === 'inactivo') {
            return 'bg-red-100 text-red-500'; // Clase para estado inactivo
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
                            <div className='text-xl text-gray-500 font-medium uppercase'>Registro De Préstamos</div>
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
                        <div className="flex w-full md:w-1/2 -mt-7 items-center relative">
                            <IoIosSearch className="text-gray-500 text-2xl absolute left-1" />
                            <input
                                type="text"
                                className="w-full py-1.5 pl-8 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                                    <div className="relative">
                                        <select
                                            className="block border  focus:outline-none focus:ring-1 focus:ring-blue-500 border-blue-800  text-gray-500 px-2 py-1.5 rounded-md hover:cursor-pointer transition"
                                            value={filterEstado}
                                            onChange={(e) => handleFilterEstado(e.target.value)}
                                        >
                                            <option value="">Seleccionar Estado</option>
                                            <option value="activo">Activo</option>
                                            <option value="inactivo">Inactivo</option>
                                        </select>
                                        {filterEstado && (
                                            <FaTimes className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={clearFilterEstado} />
                                        )}
                                    </div>
                                    <div className="relative">
                                        <select
                                            className="block border focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-500 px-2 py-1.5 rounded-md hover:cursor-pointer transition"
                                            value={filterAcuerdoPago}
                                            onChange={(e) => handleFilterAcuerdoPago(e.target.value)}
                                        >
                                            <option value="">Seleccionar Acuerdo de Pago</option>
                                            <option value="Diario">Diario</option>
                                            <option value="Quincenal">Quincenal</option>
                                            <option value="Mensual">Mensual</option>
                                        </select>
                                        {filterAcuerdoPago && (
                                            <FaTimes className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={clearFilterAcuerdoPago} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Prestamos */}
                    <div className='bg-white text-gray-500'>
                        <div className='w-full h-[400px] rounded-sm overflow-x-auto'>
                            <div className="grid uppercase grid-cols-12 bg-customMain text-sm h-[44px] font-semibold p-2">
                                <div className='mt-1 col-span-3'>cliente </div>
                                <div className='mt-1'>Iva (%)</div>
                                <div className='mt-1'># Cuotas</div>
                                <div className='mt-1 col-span-2 '>Acuerdo Pago</div>
                                <div className='mt-1 col-span-2 -ml-10'>Fecha Límite</div>
                                <div className='mt-1 -ml-20'>Total</div>
                                <div className='mt-1 -ml-8'>Estado</div>
                                <div className='mt-1'>Acciones</div>
                            </div>
                            {prestamos.length === 0 ? (
                                <div className="flex flex-col items-center py-30">
                                    <p className="flex items-center capitalize py-40 gap-2 text-gray-600 font-semibold">
                                        <VscError className="text-red-500 text-4xl" />
                                        No hay registros de préstamos
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    {prestamos.map((row) => (
                                        <div key={row.id} className="grid grid-cols-12 gap-4 p-2 mt-2 border-b border-gray-300">
                                            <div className='col-span-3'>{row.userId || '-'}</div>
                                            <div className='-ml-1'>{row.iva || '-'}</div>
                                            <div className='-ml-1'>{row.cuotasPendientes || '-'}</div>
                                            <div className='col-span-2 -ml-1'>{row.acuerdoPago || '-'}</div>
                                            <div className='-ml-12'>{row.fechaLimitePago || '-'}</div>
                                            <div className='col-span-2'>{row.montoTotal || '-'}</div>
                                            <div>
                                                <span className={`py-1 px-3 rounded-full text-xs font-medium -ml-12 ${getStatusClass(row.status)}`}>
                                                    {row.status}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 text-gray-500 -ml-6 text-xl">
                                                <button className="hover:bg-gray-200 rounded-3xl p-1"><IoEyeOutline /></button>
                                                <button className="hover:bg-gray-200 rounded-3xl p-1"><MdOutlineEdit /></button>
                                                <button className="hover:bg-gray-200 rounded-3xl p-1"><AiOutlineDelete /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {isFormOpen && <FormularioPrestamo onClick={handleCloseModal} />}

                </div>
            </div>
        </div>
    );
};

export default Prestamos;
