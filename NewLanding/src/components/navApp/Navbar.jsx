import React, { useState } from 'react';
import { FaUserAlt, FaUserShield } from 'react-icons/fa';
import { IoIosSearch } from "react-icons/io";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleExit = () => {
        Swal.fire({
            title: "¿Estás seguro de salir?",
            showCancelButton: true,
            confirmButtonText: "Sí, Confirmar.",
            cancelButtonText: "No, Cancelar",
            icon: 'warning'
        }).then((result) => {
            if (result.isConfirmed) { 
                navigate("/");
            }
        });
    }

    return (
        <div className="navbar-container">
            {/* Top Bar */}
            <div className="top-bar">
                {/* Search */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="search-input"
                    />
                    <i className="search-icon"><IoIosSearch/></i>
                    {/* Search Result */}
                    <div className="search-result"></div>
                    {/* END: Search Result */}
                </div>
                {/* END: Search */}
                {/* Account Menu */}
                <div className="account-menu-container">
                    <button className="account-icon" onClick={toggleDropdown}>
                        <FaUserShield className='icon' />
                    </button>
                    {isOpen && (
                        <div className="account-dropdown">
                            <div className="dropdown-content">
                                <div className="font-medium">Sebastian Guerra</div>
                                <div className="text">
                                    Informatic Engineer
                                </div>
                                <div className="h-px my-2 -mx-2 bg-slate-200/60 dark:bg-darkmode-400 bg-white/[0.08]"></div>
                                <a href="#" className="dropdown-item">
                                    <FaUserAlt className="mr-2" />
                                    Perfil
                                </a>
                                <a href="#" className="dropdown-item">
                                    <FaUserAlt className="mr-2" />
                                    Recuperar Contraseña
                                </a>
                                <a href="#" className="dropdown-item">
                                    <FaUserAlt className="mr-2" />
                                    Ayuda
                                </a>
                                <div className="h-px my-2 -mx-2 bg-slate-200/60 dark:bg-darkmode-400 bg-white/[0.08]"></div>
                                <button href="#" className="dropdown-item" onClick={handleExit}>
                                    <FaUserAlt className="mr-2" />
                                    Salir
                                </button>
                            </div>
                        </div>
                    )}
                    {/* END: Account Dropdown */}
                </div>
                {/* END: Account Menu */}
            </div>
            {/* END: Top Bar */}
        </div>
    );
};

export default Navbar;
