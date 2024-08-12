import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaFilter } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { GrConfigure } from "react-icons/gr";
import { MdOutlineEdit, MdAddchart } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import Sidebar from "../../components/Sidebar";
import FormularioCliente from "../../components/form_cliente/FormularioCliente";
import Details from "../../components/Details/Details";
import AdminServices from "../../services/AdminServices";

const UsersAndPlanes = () => {
    const [clientes, setClientes] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [currentCliente, setCurrentCliente] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AdminServices.getAllUsers();
                setClientes(response.administradoresList); // Accede a administradoresList
            } catch (error) {
                await Swal.fire({
                    icon: "error",
                    title: "Error al obtener los administradores",
                    text: error.message || "Error desconocido",
                });
            }
        };

        fetchData();
    }, []);

    const addCliente = (nuevoCliente) => {
        setClientes((prevClientes) => {
            const index = prevClientes.findIndex(cliente => cliente.id === nuevoCliente.id);
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

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás recuperar este administrador después de eliminarlo.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await AdminServices.deleteAdmin(id); // Ajusta el servicio
                setClientes((prevClientes) => prevClientes.filter(cliente => cliente.id !== id));
                await Swal.fire({
                    icon: 'success',
                    title: 'Eliminado!',
                    text: 'El administrador ha sido eliminado.',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                await Swal.fire('Error', 'Ocurrió un error al eliminar el administrador. Por favor, intenta nuevamente.', 'error');
            }
        }
    };

    const filteredClientes = clientes.filter(cliente =>
        `${cliente.name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-white min-h-screen grid grid-cols-1 lg:grid-cols-5">
            <div className='col-span-1'>
                <Sidebar />
            </div>
            <div className='flex-grow col-span-4'>
                <div className='flex flex-col'>
                    <div className='p-2 bg-customMain border-b mb-4 h-[70px]'>
                        <div className="flex justify-between items-center">
                            <div className='text-xl text-gray-500 font-medium uppercase'>Registro De Administradores</div>
                            <button
                                className='flex items-center text-2sm gap-2 px-2 py-1.5 font-semibold bg-blue-700 text-white rounded hover:bg-blue-600 transition'
                                // onClick={() => handleOpenModalFormCliente()}
                            >
                                <MdAddchart className='text-xl font-semibold' />
                                Agregar Administrador
                            </button>
                        </div>
                    </div>

                    <div className="w-full border-b bg-white h-20 flex justify-between items-center px-4 shadow-md">
                        <div className="flex w-full md:w-1/2 -mt-7 items-center relative">
                            <IoIosSearch className="text-gray-500 text-2xl absolute left-1" />
                            <input
                                type="text"
                                className="w-full py-1.5 pl-8 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Buscar Administrador..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='bg-white text-gray-500'>
                        <div className='w-full h-[400px] rounded-sm overflow-x-auto text-center'>
                            <div className="grid uppercase grid-cols-9 bg-customMain p-2 text-sm h-[44px] font-semibold">
                                <div className='mt-1 col-span-2'>Nombre</div>
                                <div className='col-span-2 mt-1'>usuario</div>
                                <div className='mt-1'>Rol</div>
                                <div className='mt-1'>tipo plan</div>
                                <div className='mt-1 col-span-2'>Contraseña</div>
                                <div className='mt-1'>Acciones</div>
                            </div>
                            {filteredClientes.length === 0 ? (
                                <div className="flex flex-col items-center py-30">
                                    <p className="flex items-center capitalize py-40 gap-2 text-gray-600 font-semibold">
                                        <VscError className="text-red-500 text-4xl" />
                                        No hay registros de administradores
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    {filteredClientes.map((cliente) => (
                                        <div key={cliente.id} className="grid grid-cols-9 gap-4 p-2 border-b mt-2 border-gray-300">
                                            <div className="capitalize col-span-2">{cliente.name}</div>
                                            <div className="col-span-2">{cliente.email}</div>
                                            <div className="">{cliente.role}</div>
                                            <div className="capitalize">{cliente.typePlan}</div>
                                            <div className="col-span-2 truncate">{cliente.password}</div>
                                            <div className="text-gray-500  text-xl mr-3">
                                                <button /*onClick={() => handleDelete(cliente.id)}*/ className="hover:bg-gray-200 rounded-3xl p-1"><GrConfigure /></button>
                                                <button /*onClick={() => handleOpenModalFormCliente(cliente)}*/ className="hover:bg-gray-200 rounded-3xl p-1"><MdOutlineEdit /></button>
                                                <button /*onClick={() => handleDelete(cliente.id)}*/ className="hover:bg-gray-200 rounded-3xl p-1"><AiOutlineDelete /></button>
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
            </div>
        </div>
    );
};

export default UsersAndPlanes;
