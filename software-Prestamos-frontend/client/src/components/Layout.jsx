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
        <li className="relative group flex items-center">
            {to && (
                <>
                    <Link
                        to={to}
                        className={`
                            flex items-center capitalize p-2 text-2sm font-semibold rounded-lg cursor-pointer transition-colors w-full
                            ${isActive ? 'bg-blue-700 hover:no-underline text-white' : 'hover:bg-indigo-50 hover:no-underline text-customText'}
                        `}
                    >
                        <Icon className={`w-7 h-7`} />
                        <span className="ml-2">{text}</span>
                    </Link>
                </>
            )}
        </li>
    );
};

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef();
    const userProfile = JSON.parse(localStorage.getItem('_UserInfo'));
    const userRole = userProfile?.administradores?.role || "";
    const location = useLocation();

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

    const getCurrentPageTitle = () => {
        const currentLink = sidebarLinks.find(link => link.to === location.pathname);
        return currentLink ? currentLink.title : 'Inicio';
    };

    return (
        <div className="flex relative">
            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full w-[270px] bg-white shadow-md border-r flex flex-col transition-transform duration-300 ease-in-out z-50
                ${isSidebarOpen ? 'transform-none transition-all duration-1000' : '-translate-x-full transition-all duration-1000'}
            `}>
                <div className="p-3 mb-2 flex items-center justify-between">
                    <div className="flex flex-row items-center gap-3">
                        <SiMoneygram className="text-[42px] text-blue-700" />
                        <h1 className="text-2xl text-blue-700 font-bold">PrestaCol</h1>
                    </div>
                    <button onClick={toggleSidebar} className="text-3xl text-gray-500 focus:outline-none">
                        <RiMenuFoldLine />
                    </button>
                </div>
                <nav className="flex-1 p-2 overflow-y-auto">
                    <ul onClick={toggleSidebar} className="space-y-1">
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
            </aside>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            )}

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Navbar */}
                <nav className="bg-white shadow-md border-b p-[10px] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <button onClick={toggleSidebar} className="text-3xl text-gray-500 hover:bg-indigo-50 hover:rounded-full p-1 focus:outline-none">
                            {isSidebarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
                        </button>
                    </div>

                    {/* Menú de Usuario */}
                    <div className="relative" ref={userMenuRef}>
                        <div onClick={handleUserMenuToggle} className='flex cursor-pointer hover:bg-indigo-50 hover:rounded-full p-1 items-center gap-2'>
                            <button className="flex items-center focus:outline-none">
                                {userProfile?.administradores?.avatar ? (
                                    <img
                                        src={userProfile.administradores.avatar}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="text-[40px] text-gray-500" />
                                )}
                            </button>
                            <h1 className='capitalize text-gray-500 font-semibold'>{userProfile.administradores.name}</h1>
                        </div>

                        {isUserMenuOpen && (
                            <div className="absolute right-0 w-[250px] mt-2 bg-white border rounded-lg shadow-lg z-50">
                                <div className="p-4">
                                    <p className="text-gray-800 capitalize font-semibold">
                                        {userProfile?.administradores?.name || 'Usuario'}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {userProfile?.administradores?.email || 'correo@ejemplo.com'}
                                    </p>
                                </div>
                                <div className='bg-blue-700 ml-3 mb-2 w-[85%] -mt-3 p-2 rounded-xl shadow-md'>
                                    <h1 className='flex items-center justify-center uppercase text-white text-2sm font-bold'>Plan {userProfile.administradores.typePlan || " *****"} </h1>
                                </div>
                                <ul className="p-2 border-t">
                                    <li>
                                        <Link
                                            to="perfil"
                                            className="flex items-center rounded-lg hover:no-underline px-2 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <FaCog className="mr-2" />
                                            Configuración
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="reset-password"
                                            className="flex items-center rounded-lg hover:no-underline px-2 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <RiLockPasswordFill className="mr-2" />
                                            Recuperar Contraseña
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogoutClick}
                                            className="flex items-center w-full rounded-lg px-2 py-2 text-red-700 hover:bg-red-600 hover:text-white"
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
                    {/* <h1 className="text-xl font-semibold text-gray-700">{getCurrentPageTitle()}</h1> */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
