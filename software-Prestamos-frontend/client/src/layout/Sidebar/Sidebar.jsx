import React from 'react';
import { MdDashboardCustomize, MdCalculate } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { RiSettings4Fill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { GiReceiveMoney, GiExitDoor } from "react-icons/gi";
import { Link, useLocation } from 'react-router-dom';
import { SidebarProvider } from './SidebarContext';
import Swal from 'sweetalert2';
import AuthServices from '../../services/AuthServices';

const SidebarItem = ({ icon, text, to, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className="relative group">
            {to ? (
                <Link to={to} className={`
                    flex items-center p-2 text-2sm font-semibold hover:no-underline rounded-lg cursor-pointer transition-colors group
                    ${isActive ? "bg-blue-500 text-white" : "hover:bg-indigo-50 text-customText"}
                `}>
                    {icon}
                    <span className="ml-2">{text}</span>
                </Link>
            ) : (
                <button onClick={onClick} className={`
                    flex items-center p-2 text-2sm font-semibold hover:no-underline rounded-lg cursor-pointer transition-colors group
                    hover:bg-indigo-50 text-customText w-full text-left
                `}>
                    {icon}
                    <span className="ml-2">{text}</span>
                </button>
            )}
        </li>
    );
};

const Sidebar = () => {
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
        <aside className="h-full bg-white flex flex-col">
            {/* Logo */}
            <div className="p-6 flex items-center">
                <img
                    src="/vite.svg"
                    className='w-12'
                    alt="Logo"
                />
                <span className="ml-3 text-xl font-semibold">PRESTACOL</span>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <ul className="px-2 space-y-1">
                    <li className="text-gray-500 font-bold px-2 py-2">General</li>
                    <SidebarItem
                        to="/app"
                        icon={<MdDashboardCustomize className="w-5 h-7" />}
                        text="Principal"
                    />
                    <SidebarItem
                        to="/app/prestamos"
                        icon={<GiReceiveMoney className="w-5 h-7" />}
                        text="Prestamos"
                    />
                    <SidebarItem
                        to="/app/clientes"
                        icon={<HiMiniUsers className="w-5 h-7" />}
                        text="Clientes"
                    />
                    <SidebarItem
                        to="/app/reportes"
                        icon={<BiSolidReport className="w-5 h-7" />}
                        text="Reportes"
                    />
                    <SidebarItem
                        to="/app/administradores"
                        icon={<FaUserShield className="w-5 h-7" />}
                        text="Administradores"
                    />
                    <li className="text-gray-500 font-bold px-2 mt-2">Herramientas</li>
                    <SidebarItem
                        to="/app/simular"
                        icon={<MdCalculate className="w-5 h-7" />}
                        text="Calculadora de Préstamos"
                    />
                    <li className="text-gray-500 font-bold px-2 mt-2">Opcional</li>
                    <SidebarItem
                        to="/app/configuracion"
                        icon={<RiSettings4Fill className="w-5 h-7" />}
                        text="Configuracion"
                    />
                    <SidebarItem
                        icon={<GiExitDoor className="w-5 h-7" />}
                        text="Salir"
                        onClick={handleLogoutClick}
                    />
                </ul>
            </nav>
            <div className="border-t p-3 flex items-center justify-between">
                <div>
                    <h4 className="font-semibold">Administrador</h4>
                    <span className="text-xs text-gray-600">Administrador@gmail.com</span>
                </div>
            </div>
        </aside>
    );
};

const AppSidebar = () => (
    <SidebarProvider>
        <Sidebar />
    </SidebarProvider>
);

export default AppSidebar;
