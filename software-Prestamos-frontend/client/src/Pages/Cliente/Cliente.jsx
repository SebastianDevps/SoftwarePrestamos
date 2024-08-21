import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { CiBookmark, CiFilter } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { IoPersonAddOutline, IoEyeOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import FormularioCliente from "./FormularioCliente";
import Details from "./Details";
import ClientsServices from "../../services/ClientsServices";
import AuthServices from "../../services/AuthServices";
import Cookies from "js-cookie";

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
        if (error.response && error.response.status === 403) {
          await Swal.fire({
            icon: "error",
            title: "Sesión Expirada",
            html: "<p>Tu sesión ha expirado o el token es inválido.</p>" +
              "<p>Por favor, inicia sesión nuevamente para continuar.</p>",
            confirmButtonText: "Iniciar Sesión",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              handlePopupClose();
            }
          });
          return;

        } else {
          await Swal.fire({
            icon: "error",
            title: "Error al obtener los clientes",
            text: error.message || "Error desconocido",
          });
        }
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

  const handlePopupClose = () => {
    AuthServices.logout();
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
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
    return status === 'ACTIVO' ? 'bg-green-600 px-4 text-white' : 'bg-red-500 text-white';
  };

  const filteredClientes = clientes.filter(cliente =>
    `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col xl:w-full">
      <header className="flex justify-between p-4 items-center">
        <h1 className="text-2xl font-semibold text-gray-700">Clientes</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <IoIosSearch className="text-gray-400 text-xl absolute top-2 left-3" />
            <input
              type="text"
              className="pl-10 pr-4 py-1.5 w-72 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Buscar Cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md  hover:bg-blue-500 transition"
            onClick={() => handleOpenModalFormCliente()}
          >
            <IoPersonAddOutline className="text-xl" />
            <span className="text-sm font-medium">Agregar Cliente</span>
          </button>
        </div>
      </header>

      <section className="h-[460px] -mt-2 p-4">
        <header className="flex  justify-between border p-2 rounded-xl items-center  mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Información General</h2>
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition">
            <CiFilter className="text-xl" />
            <span className="text-sm font-medium">Filtrar</span>
          </button>
        </header>

        {filteredClientes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <VscError className="text-red-500 text-5xl mb-4" />
            <p className="text-lg font-medium">No hay registros de clientes</p>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-xl max-h-[400px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-[14px] font-medium text-gray-600 capitalize tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-[14px] font-medium text-gray-600 capitalize tracking-wider">
                    Tipo Documento
                  </th>
                  <th className="px-6 py-3 text-left text-[14px] font-medium text-gray-600 capitalize tracking-wider">
                    Número de Documento
                  </th>
                  <th className="px-6 py-3 text-left text-[14px] font-medium text-gray-600 capitalize tracking-wider">
                    Número de Celular
                  </th>
                  <th className="px-6 py-3 text-left text-[14px] font-medium text-gray-600 capitalize tracking-wider">
                    Creado por
                  </th>
                  <th className="px-6 py-3 text-center text-[14px] font-medium text-gray-600 capitalize tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-center text-[14px] font-medium text-gray-600 capitalize tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.numDocumento} className="hover:bg-gray-50">
                    <td className="px-4 whitespace-nowrap capitalize text-sm text-gray-700">
                      {`${cliente.nombre} ${cliente.apellido}`}
                    </td>
                    <td className="px-4 whitespace-nowrap capitalize text-sm text-gray-700">
                      {cliente.tipoDocumento}
                    </td>
                    <td className="px-4 whitespace-nowrap capitalize text-sm text-gray-700">
                      {cliente.numDocumento}
                    </td>
                    <td className="px-4 whitespace-nowrap capitalize text-sm text-gray-700">
                      {cliente.telefono}
                    </td>
                    <td className="px-4 whitespace-nowrap uppercase text-sm text-gray-700">
                      {cliente.userId.split('@')[0]}
                    </td>
                    <td className="px-4 whitespace-nowrap text-center">
                      <span
                        className={`py-1 px-3 uppercase rounded-full text-xs font-medium ${getStatusClass(
                          cliente.estadoCliente
                        )}`}
                      >
                        {cliente.estadoCliente}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center space-x-2">
                      <button
                        onClick={() => handleOpenDetails(cliente)}
                        className="text-gray-500 hover:text-indigo-900 transition"
                      >
                        <IoEyeOutline className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleOpenModalFormCliente(cliente)}
                        className="text-gray-500 hover:text-blue-900 transition"
                      >
                        <MdOutlineEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(cliente.numDocumento)}
                        className="text-gray-500 hover:text-red-900 transition"
                      >
                        <AiOutlineDelete className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        )}
      </section>

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
    </section>
  );
};

export default Cliente;
