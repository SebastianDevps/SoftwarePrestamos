import React, { useEffect, useState } from 'react';
import { MdDashboardCustomize, MdCalculate } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { RiSettings4Fill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GiReceiveMoney, GiExitDoor } from "react-icons/gi";
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthServices from '../../services/AuthServices';

const SidebarItem = ({ icon, text, to, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className="relative group">
            {to ? (
                <Link to={to} className={`
                    flex items-center p-2 ml-1 text-2sm font-semibold hover:no-underline rounded-lg cursor-pointer transition-colors group
                    ${isActive ? "bg-blue-500 text-white" : "hover:bg-indigo-50 text-customText"}
                `}>
                    {icon}
                    <span className="ml-2">{text}</span>
                </Link>
            ) : (
                <button onClick={onClick} className={`
                    flex items-center p-2 text-2sm font-semibold hover:no-underline rounded-lg cursor-pointer transition-colors group
                    hover:bg-red-600 hover:text-white text-customText ml-1 w-full text-left
                `}>
                    {icon}
                    <span className="ml-2">{text}</span>
                </button>
            )}
        </li>
    );
};

const Sidebar = () => {
    //get mi profile
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // const token = localStorage.getItem('token');
                // const profile = await AuthServices.getYourProfile(token);
                
                // setUserProfile(profile)
                
            } catch (error) {
                console.error('Error al obtener el perfil del usuario desde el servidor:', error);
                throw error;
            }
        };

        fetchUserProfile();
    }, []);
    

    const handleLogoutClick = () => {
        Swal.fire({
            title: "Salir",
            text: "¿Confirmas que quieres salir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Session Cerrada',
                    'Tu sesión ha sido cerrada exitosamente.',
                    'success'
                );
                AuthServices.logout();
                window.location.href = "/login";
            }
        });
    };

    return (
        <aside className="h-full bg-white border-r flex flex-col">
            {/* Logo */}

            <div className="p-2 mt-2 flex items-center justify-between">
                <div className='flex flex-row gap-2'>
                    <span ><FaUserCircle className='w-11 h-11 text-blue-500' /></span>
                    <div>
                        {/* <h4 className="font-semibold capitalize">{userProfile.administradores.name}</h4> */}
                        {/* <span className="text-xs text-gray-600">{userProfile.administradores.email}</span> */}
                    </div>
                </div>
            </div>
            <div className='bg-blue-500 ml-2 mt-2 mb-2 w-[94%] p-2 rounded-2xl shadow-md'>
                {/* <h1 className='flex items-center justify-center uppercase text-white text-2sm font-bold'>Plan {userProfile.administradores.typePlan}</h1> */}
            </div>
            <nav className="flex-1 p-1 overflow-y-auto">
                <ul >
                    <li className="text-gray-500 font-bold px-2">General</li>
                    <SidebarItem
                        to="/app"
                        icon={<MdDashboardCustomize className="w-5 h-6" />}
                        text="Principal"
                    />
                    <SidebarItem
                        to="/app/prestamos"
                        icon={<GiReceiveMoney className="w-5 h-6" />}
                        text="Prestamos"
                    />
                    <SidebarItem
                        to="/app/clientes"
                        icon={<HiMiniUsers className="w-5 h-6" />}
                        text="Clientes"
                    />
                    <SidebarItem
                        to="/app/reportes"
                        icon={<BiSolidReport className="w-5 h-6" />}
                        text="Reportes"
                    />
                    <SidebarItem
                        to="/app/administradores"
                        icon={<FaUserShield className="w-5 h-6" />}
                        text="Administradores"
                    />
                    <li className="text-gray-500 font-bold px-2 mt-2">Herramientas</li>
                    <SidebarItem
                        to="/app/simular"
                        icon={<MdCalculate className="w-5 h-6" />}
                        text="Calculadora de Préstamos"
                    />
                    <li className="text-gray-500 font-bold px-2 mt-2">Opcional</li>
                    <SidebarItem
                        to="/app/configuracion"
                        icon={<RiSettings4Fill className="w-5 h-6" />}
                        text="Configuracion"
                    />
                    <SidebarItem
                        icon={<GiExitDoor className="w-5 h-6" />}
                        text="Salir"
                        onClick={handleLogoutClick}
                    />
                </ul>
            </nav>

        </aside>
    );
};


export default Sidebar;
