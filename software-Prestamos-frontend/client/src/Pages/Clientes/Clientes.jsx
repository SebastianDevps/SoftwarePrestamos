import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaFilter } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineEdit, MdAddchart } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import Sidebar from "../../layout/Sidebar/Sidebar";
import FormularioCliente from "../../components/form_cliente/FormularioCliente";
import Details from "../../components/Details/Details";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://localhost:8080/api/clientes');
        // const data = response.data.map((cliente, index) => ({ ...cliente, id: index })); // Asigna un id único basado en el índice
        const data = [
          {
            id: 1,
            nombre: 'Juan Perez',
            numDocumento: 1241412412,
            telefono: 57124124124124,
            estado: 'activo'
          },
          {
            id: 2,
            nombre: 'Maria Garcia',
            numDocumento: 3241412412,
            telefono: 57124124124125,
            estado: 'inactivo'
          }
        ];
        setClientes(data);
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Error al obtener los clientes",
          text: error,
        });
      }
    };

    fetchData();
  }, []);

  const handleOpenModalFormCliente = () => {
    setIsFormOpen(true);
  };

  const handleOpenDetails = (cliente) => {
    setCurrentCliente(cliente);
    setIsDetailsOpen(true);
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setIsDetailsOpen(false);
  };


  const getStatusClass = (status) => {
    return status === 'activo' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
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
              <div className='text-xl text-gray-500 font-medium uppercase'>Registro De Clientes</div>
              <button
                className='flex items-center text-2sm gap-2 px-2 py-1.5 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition'
                onClick={handleOpenModalFormCliente}
              >
                <MdAddchart className='text-xl font-semibold' />
                Agregar Cliente
              </button>
            </div>
          </div>

          <div className="w-full border-b bg-white h-20 flex justify-between items-center px-4 shadow-md">
            <div className="flex w-full md:w-1/2 -mt-7 items-center relative">
              <IoIosSearch className="text-gray-500 text-2xl absolute left-1" />
              <input
                type="text"
                className="w-full py-1.5 pl-8 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Buscar Cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

          </div>

          <div className='bg-white text-gray-500'>
            <div className='w-full h-[400px] rounded-sm overflow-x-auto'>
              <div className="grid uppercase grid-cols-12 bg-customMain text-sm h-[44px] font-semibold p-2">
                <div className='mt-1 col-span-4'>Cliente</div>
                <div className='mt-1 col-span-2'># Documento</div>
                <div className='mt-1 col-span-2'>Número</div>
                <div className='mt-1 col-span-2'>Estado</div>
                <div className='mt-1'>Acciones</div>
              </div>
              {clientes.length === 0 ? (
                <div className="flex flex-col items-center py-30">
                  <p className="flex items-center capitalize py-40 gap-2 text-gray-600 font-semibold">
                    <VscError className="text-red-500 text-4xl" />
                    No hay registros de clientes
                  </p>
                </div>
              ) : (
                <div>
                  {clientes.map((cliente) => (
                    <div key={cliente.id} className="grid grid-cols-12 gap-4 p-2 mt-2 border-b border-gray-300">
                      <div className="col-span-4">{cliente.nombre || '-'}</div>
                      <div className="col-span-2">{cliente.numDocumento || '-'}</div>
                      <div className="col-span-2">{cliente.telefono || '-'}</div>
                      <div className="col-span-2">
                        <span className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusClass(cliente.estado)}`}>
                          {cliente.estado}
                        </span>
                      </div>
                      <div className="col-span-2 flex gap-2 text-gray-500 text-xl">
                        <button onClick={() => handleOpenDetails(cliente)} className="hover:bg-gray-200 rounded-3xl p-1"><IoEyeOutline /></button>
                        <button onClick={() => handleOpenModalFormCliente(cliente)} className="hover:bg-gray-200 rounded-3xl p-1"><MdOutlineEdit /></button>
                        <button className="hover:bg-gray-200 rounded-3xl p-1"><AiOutlineDelete /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {isFormOpen && (
            <FormularioCliente
              onClick={handleCloseModal}
              cliente={currentCliente}
            />
          )}
          {isDetailsOpen && (
            <Details onClick={handleCloseModal} cliente={currentCliente} />
          )}

        </div>
      </div>
    </div>
  );
};

export default Clientes;
