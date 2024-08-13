import React, { useEffect, useState } from 'react';
import { MdDashboardCustomize, MdCalculate } from "react-icons/md";
import { FaUserShield, FaUserCircle } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { RiSettings4Fill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { GiReceiveMoney, GiExitDoor } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthServices from '../services/AuthServices';
import Cookies from 'js-cookie'; // Asegúrate de importar js-cookie
import Avatar from 'react-avatar';

const SidebarItem = ({ icon, text, to, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className="relative group">
            {to ? (
                <Link to={to} className={`
                    flex items-center capitalize p-2 text-2sm font-semibold hover:no-underline rounded-lg cursor-pointer transition-colors group
                    ${isActive ? "bg-blue-700 text-white" : "hover:bg-indigo-50 text-customText"}
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
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = Cookies.get('token'); // Obtiene el token de la cookie
                if (!token) {
                    return;
                }
                const profile = await AuthServices.getYourProfile(token);
                setUserProfile(profile);
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
                    'Sesión Cerrada',
                    'Tu sesión ha sido cerrada exitosamente.',
                    'success'
                );
                AuthServices.logout();
                window.location.href = "/login";
            }
        });
    };

    const getUserInitials = (name) => {
        const namesArray = name.split(' ');
        const initials = namesArray.map(n => n[0]).join('');
        return initials.toUpperCase();
    };

    return (
        <aside className="h-full bg-white border-r flex flex-col">
            <div className="p-2 mt-2 flex items-center justify-between">
                <div className='flex flex-row gap-2'>
                    <span>
                        {userProfile && userProfile.administradores.name ? (
                            <Avatar name={getUserInitials(userProfile.administradores.name)} round={true} size="44" />
                        ) : (
                            // <FaUserCircle className='w-11 text-blue-700' />
                            <Avatar name={getUserInitials('')} round={true} size="44" />
                        )}
                    </span>
                    <div>
                        {userProfile && (
                            <>
                                <h4 className="font-semibold capitalize">{userProfile.administradores.name}</h4>
                                <span className="text-xs text-gray-600">{userProfile.administradores.email}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {userProfile && (
                <div className='bg-blue-700 ml-2 mt-2 mb-2 w-[94%] p-2 rounded-2xl shadow-md'>
                    <h1 className='flex items-center justify-center uppercase text-white text-2sm font-bold'>Plan {userProfile.administradores.typePlan || " *****"} </h1>
                </div>
            )}
            <nav className="flex-1 p-1 overflow-y-auto">
                <ul>
                    <li className="text-gray-500 font-bold px-1">General</li>
                    <SidebarItem
                        to="/app"
                        icon={<MdDashboardCustomize className="w-5 h-6" />}
                        text="Principal"
                    />
                    <SidebarItem
                        to="/app/prestamos"
                        icon={<GiReceiveMoney className="w-5 h-6" />}
                        text="Préstamos"
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
                    {/* Mostrar el SidebarItem "Usuarios" solo si es superadministrador */}
                    {AuthServices.superAdminOnly() && (
                        <SidebarItem
                            to="/app/usuarios-y-planes"
                            icon={<MdAdminPanelSettings className="w-5 h-6" />}
                            text="Usuarios y planes"
                        />
                    )}
                    <li className="text-gray-500 font-bold px-1 mt-2">Herramientas</li>
                    <SidebarItem
                        to="/app/simular"
                        icon={<RiLockPasswordFill className="w-5 h-6" />}
                        text="Recuperar Contraseña"
                    />
                    <SidebarItem
                        to="/app/simular"
                        icon={<MdCalculate className="w-5 h-6" />}
                        text="Simular Préstamos"
                    />
                    <li className="text-gray-500 font-bold px-1 mt-2">Opcional</li>
                    <SidebarItem
                        to="/app/configuracion"
                        icon={<RiSettings4Fill className="w-5 h-6" />}
                        text="Configuración"
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
