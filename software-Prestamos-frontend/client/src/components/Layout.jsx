import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaCog, FaUser } from 'react-icons/fa';
import { RiMenuFoldLine, RiMenuUnfoldLine, RiLockPasswordFill } from 'react-icons/ri';
import { SiMoneygram } from "react-icons/si";
import AuthServices from '../services/AuthServices';
import Swal from 'sweetalert2';
import { sidebarLinks } from '../constants';

const SidebarItem = ({ Icon, text, to }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className="relative group">
            {to && (
                <Link to={to} className={`
                    flex items-center capitalize p-2 text-2sm font-semibold rounded-lg cursor-pointer transition-colors
                    ${isActive ? 'bg-blue-700 hover:no-underline text-white' : 'hover:bg-indigo-50 hover:no-underline text-customText'}
                `}>
                    <Icon className="w-5 h-6" />
                    <span className="ml-2">{text}</span>
                </Link>
            )}
        </li>
    );
};

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef();
    const userProfile = JSON.parse(localStorage.getItem('_UserInfo'));
    const userRole = userProfile?.administradores?.role || "";

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleUserMenuToggle = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className={`h-full w-full lg:w-[290px] ${isSidebarOpen ? 'block' : 'hidden'} bg-white shadow-md border-r flex flex-col transition-transform duration-300 ease-in-out`}>
                <div className="p-2 mt-2 flex items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <SiMoneygram className="text-[42px] text-blue-700" />
                        <h1 className="text-2xl text-blue-700 font-bold">PrestaCol</h1>
                    </div>
                </div>
                <nav className="flex-1 p-2 overflow-y-auto">
                    <ul>
                        {sidebarLinks
                            .filter(link => link.roles.includes(userRole))
                            .map(link => (
                                <SidebarItem
                                    key={link.id}
                                    to={link.to}
                                    Icon={link.icon}
                                    text={link.title}
                                />
                            ))}
                    </ul>
                </nav>
                <div className="mt-auto p-4 bg-white shadow-inner text-center rounded-lg mx-3 mb-8">
                    <img src="images/sidebarImg.jpg" alt="Upgrade Plan" className="rounded-md mb-3 shadow-md" />
                    <h1 className="text-lg font-semibold text-gray-800">Actualizar Plan</h1>
                    <p className="text-sm text-gray-600">Mejora tu experiencia con nuestras funciones premium.</p>
                    <button className="mt-3 w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600 transition">Actualizar</button>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Navbar */}
                <nav className="bg-white shadow-md border-b p-3 flex justify-between items-center">
                    <button onClick={toggleSidebar} className="text-2xl text-blue-700 focus:outline-none">
                        {isSidebarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
                    </button>

                    {/* Menú de Usuario */}
                    <div className="relative " ref={userMenuRef}>
                        <button onClick={handleUserMenuToggle} className="flex items-center focus:outline-none">
                            {userProfile?.administradores?.avatar ? (
                                <img
                                    src={userProfile.administradores.avatar}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <FaUserCircle className="text-[40px] text-blue-600" />
                            )}
                        </button>

                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg z-50">
                                <div className="p-4">
                                    <p className="text-gray-800 capitalize font-semibold">
                                        {userProfile?.administradores?.name || 'Usuario'}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {userProfile?.administradores?.email || 'correo@ejemplo.com'}
                                    </p>
                                </div>
                                <div className='bg-blue-700 ml-3 mb-2 w-[85%] -mt-3 p-2 rounded-2xl shadow-md'>
                                    <h1 className='flex items-center justify-center uppercase text-white text-2sm font-bold'>Plan {userProfile.administradores.typePlan || " *****"} </h1>
                                </div>
                                <ul className="py-2 border-t">
                                    <li>
                                        <Link
                                            to="/profile"
                                            className="flex items-center rounded-xl hover:no-underline px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <FaUser className="mr-2" />
                                            Perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/settings"
                                            className="flex items-center rounded-xl hover:no-underline px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <RiLockPasswordFill className="mr-2" />
                                            Recuperar Contraseña
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/settings"
                                            className="flex items-center rounded-xl hover:no-underline px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <FaCog className="mr-2" />
                                            Configuración
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogoutClick}
                                            className="flex items-center w-full rounded-xl px-4 py-2 text-red-700 hover:bg-red-600 hover:text-white"
                                        >
                                            <FaSignOutAlt className="mr-2" />
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Main Content */}
                <div className="p-4 flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
