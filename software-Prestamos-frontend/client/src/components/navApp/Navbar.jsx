import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowLeftSLine, RiLogoutCircleRLine, RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        // Aquí iría la lógica para cerrar sesión
        console.log("Cerrando sesión...");
    };

    return (
        <header className="h-[7vh] md:h-[10vh] border-b bg-gray-50 border-secondary-100 p-4 md:p-8 flex items-center justify-end">
            <nav className="flex items-center gap-4">
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors focus:outline-none"
                    >
                        <img
                            src="https://res.cloudinary.com/juandevps/image/upload/v1714952083/upload/ujpasc23kv04q2poouju.png"
                            className="w-8 h-8 object-cover rounded-full"
                            alt="Profile"
                        />
                        <span className="hidden md:inline-block"></span>
                        {showProfileMenu ? <RiArrowDownSLine className="transition-all" /> : <RiArrowLeftSLine className="transition-all"/>}
                    </button>
                    {showProfileMenu && (
                        <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg z-20">
                            <div className="p-2">
                                <Link
                                    to="/"
                                    className="block py-2 px-4 rounded-lg transition-colors text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                                >
                                    <RiLockPasswordLine className="inline-block mr-2" /> Cambiar contraseña
                                </Link>
                                <Link
                                    to="/"
                                    className="block py-2 px-4 rounded-lg transition-colors text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                                >
                                    <RiLogoutCircleRLine className="inline-block mr-2" onClick={handleLogout} /> Cerrar sesión
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
