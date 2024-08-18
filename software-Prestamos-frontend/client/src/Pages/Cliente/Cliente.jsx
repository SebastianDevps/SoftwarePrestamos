import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaFilter } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineEdit, MdAddchart } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import FormularioCliente from "./FormularioCliente";
import Details from "./Details";
import ClientsServices from "../../services/ClientsServices";

const Cliente = () => {
  const [clientes, setClientes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clients = await ClientsServices.getAllClients();
        setClientes(clients);
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Error al obtener los clientes",
          text: error.message || "Error desconocido",
        });
      }
    };

    fetchData();
  }, []);

  const addCliente = (nuevoCliente) => {
    setClientes((prevClientes) => {
      const index = prevClientes.findIndex(cliente => cliente.numDocumento === nuevoCliente.numDocumento);
      if (index !== -1) {
        const updatedClientes = [...prevClientes];
        updatedClientes[index] = nuevoCliente;
        return updatedClientes;
      } else {
        return [...prevClientes, nuevoCliente];
      }
    });
  };
  

  const handleOpenModalFormCliente = (cliente = null) => {
    setCurrentCliente(cliente);
    setIsFormOpen(true);
  };


  const handleOpenDetails = (cliente) => {
    setCurrentCliente(cliente);
    setIsDetailsOpen(true);
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setIsDetailsOpen(false);
    setCurrentCliente(null);
  };

  const handleDelete = async (cedula) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este cliente después de eliminarlo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (result.isConfirmed) {
      try {
        await ClientsServices.deleteClient(cedula);
        setClientes((prevClientes) => prevClientes.filter(cliente => cliente.numDocumento !== cedula));
        await Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          text: 'El cliente ha sido eliminado.',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        await Swal.fire('Error', 'Ocurrió un error al eliminar el cliente. Por favor, intenta nuevamente.', 'error');
      }
    }
  };

  const getStatusClass = (status) => {
    return status === 'ACTIVO' ? 'bg-blue-800 text-white' : 'bg-red-500 text-white';
  };

  const filteredClientes = clientes.filter(cliente =>
    `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col'>
      <div className='p-2 bg-customMain border-b mb-4 h-[70px]'>
        <div className="flex justify-between items-center">
          <div className='text-xl text-gray-500 font-medium uppercase'>Registro De Clientes</div>
          <button
            className='flex items-center text-2sm gap-2 px-2 py-1.5 font-semibold bg-blue-700 text-white rounded hover:bg-blue-600 transition'
            onClick={() => handleOpenModalFormCliente()}
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
        <div className='w-full h-[400px] rounded-sm overflow-x-auto text-center'>
          <div className="grid uppercase grid-cols-9 bg-customMain p-2 text-sm h-[44px] font-semibold">
            <div className='col-span-3 mt-1'>Cliente</div>
            <div className='col-span-2 mt-1'>Tipo Documento</div>
            <div className='mt-1'># Documento</div>
            <div className='mt-1'># Celular</div>
            <div className='mt-1'>Estado</div>
            <div className='mt-1'>Acciones</div>
          </div>
          {filteredClientes.length === 0 ? (
            <div className="flex flex-col items-center py-30">
              <p className="flex items-center capitalize py-40 gap-2 text-gray-600 font-semibold">
                <VscError className="text-red-500 text-4xl" />
                No hay registros de clientes
              </p>
            </div>
          ) : (
            <div>
              {filteredClientes.map((cliente) => (
                <div key={cliente.numDocumento} className="grid grid-cols-9 capitalize gap-4 p-2 border-b mt-2 border-gray-300">
                  <div className="col-span-3">{`${cliente.nombre} ${cliente.apellido}`}</div>
                  <div className="col-span-2">{cliente.tipoDocumento}</div>
                  <div className="">{cliente.numDocumento}</div>
                  <div className="">{cliente.telefono}</div>
                  <div className="">
                    <span className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusClass(cliente.estadoCliente)}`}>
                      {cliente.estadoCliente}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xl mr-3]">
                    <button onClick={() => handleOpenDetails(cliente)} className="hover:bg-gray-200 rounded-3xl p-1"><IoEyeOutline /></button>
                    <button onClick={() => handleOpenModalFormCliente(cliente)} className="hover:bg-gray-200 rounded-3xl p-1"><MdOutlineEdit /></button>
                    <button onClick={() => handleDelete(cliente.numDocumento)} className="hover:bg-gray-200 rounded-3xl p-1"><AiOutlineDelete /></button>
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
          onAddCliente={addCliente}
          cliente={currentCliente}
        />
      )}
      {isDetailsOpen && (
        <Details onClick={handleCloseModal} cliente={currentCliente} />
      )}
    </div>
  );
};

export default Cliente;
