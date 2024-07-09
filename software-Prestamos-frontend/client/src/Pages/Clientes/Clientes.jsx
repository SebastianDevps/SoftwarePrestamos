import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar/Sidebar";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import Link from "@mui/material/Link";
import { IoIosSearch } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import Details from "../../components/Details/Details";
import FormularioCliente from "../../components/form_cliente/FormularioCliente";
import { IoRefreshOutline } from "react-icons/io5";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { MdOutlineEdit, MdAddchart } from "react-icons/md";
// import { Tooltip } from 'react-tooltip'; // Mostrar msg encima del btn

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenClient, setIsModalOpenClient] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);

  // GET
  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //         const response = await axios.get('http://localhost:8080/api/clientes');
  //             const data = response.data.map((cliente, index) => ({ ...cliente, id: index })); // Asigna un id único basado en el índice
  //             setClientes(data);
  //         } catch (error) {
  //             setError(error.message);
  //             await Swal.fire({
  //                 icon: "error",
  //                 title: "Error al obtener los clientes",
  //                 text: error,
  //             });
  //         }
  //     };

  //     fetchData();
  // }, []);

  // DELETE
  // const handleDelete = async (cedula) => {
  //     Swal.fire({
  //         title: "¿Estás seguro de eliminar a este cliente?",
  //         showCancelButton: true,
  //         confirmButtonText: "Sí, Confirmar.",
  //         cancelButtonText: "No, Cancelar",
  //         icon: 'warning'
  //     }).then(async (result) => {
  //         if (result.isConfirmed) {
  //             try {
  //                 const response = await axios.delete(`http://localhost:8080/api/clientes/${cedula}`);
  //                 if (response.status === 200) {
  //                     Swal.fire({
  //                         icon: "success",
  //                         title: "Cliente eliminado",
  //                         text: "El cliente ha sido eliminado correctamente.",
  //                     });
  //                     setClientes(clientes.filter((cliente) => cliente.cedula !== cedula));
  //                 }
  //             } catch (error) {
  //                 Swal.fire({
  //                     icon: "error",
  //                     title: "Error al eliminar el cliente",
  //                     text: error.response ? error.response.data.message : "No se pudo eliminar el cliente.",
  //                 });
  //             }
  //         }
  //     });
  // };

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

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 200 },
    { field: "tipoDocumento", headerName: "Tipo Documento", width: 160 },
    { field: "numDocumento", headerName: "# Documento", width: 120 },
    { field: "telefono", headerName: "Teléfono", width: 110 },
    { field: "fechaCreacion", headerName: "Fecha Creación", width: 180 },
    {
      field: "estadoCliente",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => {
        return (
          <span className={`status-cell ${getStatusClass(params.value)}`}>
            {params.value}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="mt-3 flex gap-4">
            <button
              className="text-xl text-blue-500 "
              onClick={() => handleOpenModal(params.row)}
            >
              <FaEye />
            </button>
            <button
              className="text-xl  text-yellow-500 "
              onClick={() => handleOpenModalClient(params.row)}
            >
              <FaEdit />
            </button>
            <button
              className="text-xl  text-red-500 "
              onClick={() => handleDelete(params.row.cedula)}
            >
              <MdDelete />
            </button>
          </div>
        );
      },
    },
  ];

  const getStatusClass = (status) => {
    if (status === "ACTIVO") {
      return "text-green-500";
    } else if (status === "INACTIVO") {
      return "text-red-500";
    }
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

          <div className="p-4 bg-white border-b rounded-t-3xl drop-shadow-xl shadow-md -mx-1 h-[15%] w-[100%]">
            <div className="mb-4 text-lg font-medium">Filtros</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 drop-shadow">
                  <option>Seleccionar Estado</option>
                  <option>Maintainer</option>
                  <option>Subscriber</option>
                  <option>Editor</option>
                  <option>Author</option>
                </select>
              </div>
              <div>
                <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 drop-shadow">
                  <option>Select Plan</option>
                  <option>Enterprise</option>
                  <option>Basic</option>
                  <option>Team</option>
                </select>
              </div>
              <div>
                <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 drop-shadow">
                  <option>Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 drop-shadow-xl rounded-b-3xl shadow-md  -mx-1  h-[75%]  w-[100%]">
            <div className="flex justify-between items-center pb-4 border-gray-200 ">
              <div className="flex w-[20%] items-center justify-start gap-2">
                <h2 className="text-xl font-semibold">Lista de Clientes</h2>
                <button
                  className="flex hover:bg-blue-100 rounded-full p-1 items-center font-bold text-xl"
                  id="refresh"
                  onClick={handleRefresh}
                >
                  <IoRefreshOutline className="icon" />
                  {/* <Tooltip className="toltip t" anchorSelect="#refresh" place="right-start">
                                Refrescar
                            </Tooltip> */}
                </button>
              </div>
              <div className="flex ml-40 w-[60%] md:w-1/2 items-center relative">
                <IoIosSearch className="ml-20 text-gray-500 text-2xl absolute left-1" />
                <input
                  type="text"
                  className="w-[75%] ml-20 py-1.5 pl-8 pr-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Buscar Cliente..."
                />
                
              </div>
              <div className="w-[20%] flex justify-end">
                <button
                  className="flex items-center capitalize font-semibold gap-2 p-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => handleOpenModalClient()}
                >
                  <IoMdPersonAdd className="text-xl" />
                  Agregar cliente
                </button>
              </div>
            </div>

            <div className="overflow-x-auto max-w-full mt-4 ">
              <div className="overflow-y-auto h-[250px] max-h-[400px]">
                <table className="min-w-full bg-white border-collapse table-auto w-full">
                  <thead className="sticky top-0 bg-white border-gray-300">
                    <tr className="text-sm font-semibold text-gray-700 text-center ">
                      <th className="border-gray-300 py-2">Cliente</th>
                      <th className="border-gray-300 py-2">#Documento</th>
                      <th className="border-gray-300 py-2">Telefono</th>
                      <th className="border-gray-300 py-2"></th>
                      <th className="border-gray-300 py-2">Estado</th>
                      <th className="border-gray-300 py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700">
                    <tr className="border-b border-gray-300 text-center">
                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                      <td className="py-2 px-4 text-center"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div></div>

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
