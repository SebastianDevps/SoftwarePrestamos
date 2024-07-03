import React from 'react';
import { MdDashboardCustomize, MdCalculate } from "react-icons/md";
import { FaUserShield, FaPuzzlePiece } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { RiSettings4Fill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { Link, useLocation } from 'react-router-dom';
import { SidebarProvider } from './SidebarContext';

const SidebarItem = ({ icon, text, to }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className="relative group">
            <Link to={to} className={`
                flex items-center p-2 text-lg
                font-semibold hover:no-underline rounded-lg cursor-pointer
                transition-colors group
                ${isActive ? "bg-blue-500 text-white" : "hover:bg-indigo-50 text-customText"}
            `}>
                {icon}
                <span className="ml-2">{text}</span>
            </Link>
        </li>
    );
};

const Sidebar = () => {
    return (
        <aside className="h-full border-r bg-customMain overflow-y-auto w-full">
            {/* Logo */}
            <div className="p-3 flex">
                <img
                    src="/vite.svg"
                    className='w-12'
                    alt="Logo"
                />
                
            </div>
            <nav className="h-[80%] flex flex-col bg-customMain shadow-sm">
                <ul className="flex-1 px-2 space-y-1">
                    <SidebarItem 
                        to="/app"
                        icon={<MdDashboardCustomize className="w-5 h-5" />}
                        text="Principal"
                    />
                    <SidebarItem
                        to="/app/prestamos"
                        icon={<GiReceiveMoney className="w-5 h-5" />}
                        text="Prestamos"
                    />
                    <SidebarItem
                        to="/app/clientes"
                        icon={<HiMiniUsers className="w-5 h-5" />}
                        text="Clientes"
                    />
                    <SidebarItem
                        to="/app/reportes"
                        icon={<BiSolidReport className="w-5 h-5" />}
                        text="Reportes"
                    />
                    <SidebarItem
                        to="/app/administradores"
                        icon={<FaUserShield className="w-5 h-5" />}
                        text="Administradores"
                    />
                    <SidebarItem
                        to="/app/simular"
                        icon={<MdCalculate className="w-5 h-5" />}
                        text="Calculadora de Préstamos"
                    />
                    <SidebarItem
                        to="/app/configuracion"
                        icon={<RiSettings4Fill className="w-5 h-5" />}
                        text="Configuracion"
                    />
                </ul>
            </nav>
            <div className="border-t flex p-2"> 
                    <div className="flex flex-col ml-3">
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
