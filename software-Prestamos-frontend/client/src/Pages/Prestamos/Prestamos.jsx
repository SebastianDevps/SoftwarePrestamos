import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { FaFilter, FaTimes } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineEdit, MdAddchart } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import FormularioPrestamo from '../../components/form_prestamo/FormularioPrestamo';
import { VscError } from "react-icons/vsc";
import Swal from 'sweetalert2';
import PrestamosServices from "../../services/PrestamosServices"
   

   //buscar 
//    fetch('http://example.com/.')
//   .then(response => response.json())
//   .then(data => console.log(data));
const Prestamos = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState(''); // Estado activo/inactivo
    const [filterAcuerdoPago, setFilterAcuerdoPago] = useState(''); // Mensual, Diario, Quincenal
    const [prestamos, setPrestamos] = useState([]);
    const [currentPrestamo, setCurrentPrestamo] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
       try{
        const prestams = await PrestamosServices.getAllPrestamo();
        setPrestamos(prestams);
       } catch(error){
        await Swal.fire({
            icon: "error",
            title: "Error al obtener los prestamos",
            text: error.message || "Error desconocido",
          }); 
      }
    };
      fetchData();
    }, []);
    
    const addPrestamo = (nuevoPrestamo) => {
        setPrestamos((PrevPrestamos) => {
        const index = PrevPrestamos.findIndex(prestamo => prestamo.Id === nuevoPrestamo.Id);
        if(index !== -1){
            const updatePrestamos = [...PrevPrestamos];
            updatePrestamos[index] = nuevoPrestamo;
            return updatePrestamos;
        }{
            //cliente nuevo, lo agregamos
            return [...PrevPrestamos, nuevoPrestamo];
        }

        });
    };
    

    const handleOpenModalFormPrestamo = (prestamo = null) => {
        setIsFormOpen(true);
        setCurrentPrestamo(prestamo);
    };
    
    // const handleOpenDetails = (prestamo) => {
    //     setCurrentPrestamo(prestamo);
    //     setIsDetailsOpen(true);
    //   };

    const handleCloseModal = () => {
        setIsFormOpen(false)
        setCurrentPrestamo(null);
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

    // const filteredRows = prestamos.filter(row =>
    //     row.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //     (filterEstado ? row.status === filterEstado : true) &&
    //     (filterAcuerdoPago ? row.acuerdoPago === filterAcuerdoPago : true)
    // );

    // const getStatusClass = (status) => {
    //     return status === 'ACTIVO' ? 'bg-blue-800 text-white' : 'bg-red-500 text-white';
    //   };


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
                                className='flex items-center text-2sm gap-2 px-2 py-1.5 font-semibold bg-blue-700 text-white rounded hover:bg-blue-500 transition'
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
                                    <FaFilter className="text-sm text-blue-700" />
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
                                            <option value="activo">ACTIVO</option>
                                            <option value="inactivo">INACTIVO</option>
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
                    <div className='bg-white text-gray-500 text-center'>
                        <div className='w-full h-[400px] rounded-sm overflow-x-auto'>
                            <div className="grid uppercase grid-cols-10 bg-customMain text-sm h-[44px] font-semibold p-2 text-center aling-text">
                                <div className='col-span-3'>cliente </div>
                                <div className=''>Iva (%)</div>
                                <div className=''># Cuotas</div>
                                <div className=''>Acuerdo Pago</div>
                                <div className=''>Fecha Límite</div>
                                <div className=''>Total</div>
                                <div className=''>Estado</div>
                                <div className=''>Acciones</div>
                            </div>
                            {prestamos.length === 0 ? (
                                <div className="flex flex-col items-center py-30">
                                    <p className="flex items-center capitalize py-40 gap-2 text-gray-600 font-semibold">
                                        <VscError className="text-red-500 text-4xl" />
                                        No hay registros de préstamos
                                    </p>
                                </div>
                            ) : (
                                <div className='text-center'>
                                    {prestamos.map((prestamo) => (
                                        <div key={prestamo.id} className="grid grid-cols-10 gap-4 p-2 mt-2 border-b border-gray-300  ">
                                            <div className='col-span-3'>{prestamo.clienteId || '-'}</div>
                                            <div className=''>{prestamo.monto || '-'}</div>
                                            <div className=''>{prestamo.porcentaje || '-'}</div>
                                            <div className=''>{prestamo.montoAPagar || '-'}</div>
                                            <div className=''>{prestamo.fechaCreacion || '-'}</div>
                                            <div className=''>{prestamo.tipoPago || '-'}</div>
                                            <div className='text-center' >
                                                {/* <span className={`py-1 px-3 rounded-full text-xs font-medium text-center ${getStatusClass(row.status)}`}>
                                                    {row.status}
                                                </span> */}
                                            </div>
                                            <div className="text-gray-500 text-xl ">
                                                <button className="hover:bg-gray-200 rounded-3xl p-1"><IoEyeOutline /></button>
                                                <button className="hover:bg-yellow-200 rounded-3xl p-1"><MdOutlineEdit /></button>
                                                <button className="hover:bg-red-200 rounded-3xl p-1"><AiOutlineDelete /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {isFormOpen && (
                        <FormularioPrestamo 
                            onClick={handleCloseModal}
                            onAddPrestamo={addPrestamo}
                            prestamo={currentPrestamo} />
                    )}

                </div>
            </div>
        </div>
    );
};

export default Prestamos;
