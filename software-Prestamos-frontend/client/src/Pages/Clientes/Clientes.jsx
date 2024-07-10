import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaEdit } from "react-icons/fa";
import Sidebar from "../../layout/Sidebar/Sidebar";
import { IoMdPersonAdd, IoIosSearch } from "react-icons/io";
import { IoRefreshOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import FormularioCliente from "../../components/form_cliente/FormularioCliente";
import Details from "../../components/Details/Details";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenClient, setIsModalOpenClient] = useState(false);
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
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusClass = (status) => {
    return status === 'activo' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
  };

  return (
    <div className="flex bg-gray-50 min-h-screen grid grid-col-1 lg:grid-cols-5">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="flex-grow col-span-4">
        <div className="flex flex-col p-4">
          <div className="text-xl text-gray-500 mb-4 font-medium uppercase">
            Registro De Clientes
          </div>

        
          <div className="bg-white p-6 drop-shadow-3xl rounded-3xl shadow-xl -mx-1 h-[75%] w-[100%]">
            <div className="flex justify-between items-center pb-4 border-gray-200">
              <div className="flex w-[20%] items-center justify-start gap-2">
                <h2 className="text-xl font-semibold">Lista de Clientes</h2>
                <button
                  className="flex hover:bg-blue-100 rounded-full p-1 items-center font-bold text-xl"
                  id="refresh"
                  onClick={handleRefresh}
                >
                  <IoRefreshOutline className="icon" />
                </button>
              </div>
              <div className="flex ml-40 w-[60%] md:w-1/2 items-center relative">
              <IoIosSearch className="ml-20 text-gray-500 text-2xl absolute left-1" />
                <input
                  type="text"
                  className="w-[75%] ml-20 py-1.5 pl-8 pr-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Buscar Cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
              </div>
              <div className="w-[20%] flex justify-end">
                <button
                  className="flex items-center capitalize drop-shadow-xl font-semibold gap-2 p-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => handleOpenModalClient()}
                >
                  <IoMdPersonAdd className="text-xl" />
                  Agregar cliente
                </button>
              </div>
            </div>
            <div className="sticky top-0 bg-white border-gray-300">
              <div className="flex justify-between text-sm font-semibold text-gray-700 text-center">
                <div className="border-gray-300 py-2">
                  Cliente
                </div>
                <div className="border-gray-300 py-2">
                  # Documento
                </div>
                <div className="border-gray-300 py-2">
                  Número
                </div>
                <div className="border-gray-300 py-2">
                  Valor
                </div>
                <div className="border-gray-300 py-2">
                  Estado
                </div>
                <div className="border-gray-300 py-2">
                  Acciones
                </div>
              </div>
            </div>

            <div className="overflow-x-auto max-w-full mt-4">
              <div className="overflow-y-auto h-[250px] max-h-[400px]">
              {filteredClientes.length === 0 ? (
                  <div className="flex flex-col items-center py-30">
                    <p className="flex items-center capitalize py-40 gap-2 text-gray-600 font-semibold">
                      No hay registros de cliente
                    </p>
                  </div>
                ) : (
                  <div>
                    {filteredClientes.map((cliente) => (
                      <div key={cliente.id} className="grid grid-cols-12 gap-4 p-2 mt-2 border-b border-gray-300">
                        <div className="col-span-3">{cliente.nombre || '-'}</div>
                        <div className="col-span-3">{cliente.numDocumento || '-'}</div>
                        <div className="col-span-2">{cliente.telefono || '-'}</div>
                        <div className="col-span-2">
                          <span className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusClass(cliente.estado)}`}>
                            {cliente.estado}
                          </span>
                        </div>
                        <div className="col-span-2 flex gap-2 text-gray-500 text-xl">
                          <button onClick={() => handleOpenModal(cliente)} className="hover:bg-gray-200 rounded-3xl p-1"><FaEye /></button>
                          <button onClick={() => handleOpenModal(cliente)} className="hover:bg-gray-200 rounded-3xl p-1"><FaEdit /></button>
                          <button className="hover:bg-gray-200 rounded-3xl p-1"><MdDelete /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {isModalOpenClient && (
            <FormularioCliente
              onClick={handleCloseModal}
              cliente={currentCliente}
            />
          )}
          {isModalOpen && (
            <Details onClick={handleCloseModal} cliente={currentCliente} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Clientes;
