import React, { useState } from 'react';
import { ChevronLast, ChevronFirst, MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserShield, FaPuzzlePiece } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { MdCalculate } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { Link, useLocation } from 'react-router-dom';
import { useSidebar, SidebarProvider } from './SidebarContext';

const SidebarItem = ({ icon, text, to, dropdownItems }) => {
    const { expanded } = useSidebar();
    const location = useLocation();
    const isActive = location.pathname === to;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <li className="relative group">
            {dropdownItems ? (
                <div>
                    <button
                        onClick={handleDropdownToggle}
                        className={`
                            flex items-center py-2 px-3 my-1
                            font-medium rounded-md cursor-pointer
                            transition-colors group
                            ${isActive ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            {icon}
                            <span className={`overflow-hidden transition-all ${expanded ? "block ml-3" : "hidden"}`}>{text}</span>
                        </div>
                        <div className="ml-auto">
                            {dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                    </button>
                    {dropdownOpen && (
                        <ul className="ml-6 mt-1 max-h-48 overflow-y-auto">
                            {dropdownItems.map((item, index) => (
                                <li key={index} className="py-2 px-4">
                                    <Link to={item.to} className="flex items-center  gap-3">
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : (
                <Link to={to} className={`
                    relative flex items-center py-2 px-3 my-1
                    font-medium rounded-md cursor-pointer
                    transition-colors group
                    ${isActive ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}
                `}>
                    {icon}
                    <span className={`overflow-hidden transition-all ${expanded ? "block ml-3" : "hidden"}`}>{text}</span>
                </Link>
            )}
        </li>
    );
};

const Sidebar = () => {
    const { expanded, setExpanded } = useSidebar();
    const location = useLocation();

    return (
        <aside className={`h-full bg-gray-100 overflow-y-auto ${expanded ?"" : "w-40"}`}>
            {/* Logo que se muestra siempre */}
            <div className="p-4 pb-2 flex justify-between items-center">
                <img
                    src="/vite.svg"  // Asegúrate de que la ruta al logo sea correcta
                    className='overflow-hidden w-12 transition-all'
                    alt="Logo"
                />
                <button
                    onClick={() => setExpanded((curr) => !curr)}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                    {expanded ? <ChevronFirst /> : <ChevronLast />}
                </button>
            </div>
            <nav className="h-[85%] flex mt-2 flex-col bg-gray-100 border-r shadow-sm">
                <ul className="flex-1 px-3">
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
                        to="/app/administradores"
                        icon={<FaUserShield className="w-5 h-5" />}
                        text="Administradores"
                    />
                    <SidebarItem
                        to="/app/reportes"
                        icon={<BiSolidReport className="w-5 h-5" />}
                        text="Reportes"
                    />
                    <SidebarItem
                        icon={<FaPuzzlePiece className="w-5 h-5" />}
                        text="Herramientas"
                        dropdownItems={[
                            {
                                to: "/app/simular",
                                icon: <MdCalculate className="w-5 h-5" />,
                                text: "Simular Préstamo"
                            }
                            // Puedes añadir más items al dropdown si es necesario
                        ]}
                    />
                    <SidebarItem
                        to="/app/configuracion"
                        icon={<RiSettings4Fill className="w-5 h-5" />}
                        text="Configuracion"
                    />
                </ul>
                <div className="border-t flex p-3"> 
                    <img
                        src="/vite.svg"
                        alt="User"
                        className="w-10 h-10 rounded-md"
                    />
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                        <div className="leading-4">
                            <h4 className="font-semibold">Administrador</h4>
                            <span className="text-xs text-gray-600">Administrador@gmail.com</span>
                        </div>
                        {/* <MoreVertical size={20} />  */}
                    </div>
                </div>  
                
            </nav>
        </aside>
    );
};

const AppSidebar = () => (
    <SidebarProvider>
        <Sidebar />
    </SidebarProvider>
);

export default AppSidebar;
