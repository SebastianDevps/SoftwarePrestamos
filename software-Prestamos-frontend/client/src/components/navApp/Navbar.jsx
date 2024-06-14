import React, { useState } from "react";
import {
    RiNotification3Line,
    RiArrowDownSLine,
    RiArrowLeftSLine,
    RiSettings3Line,
    RiLogoutCircleRLine,
    RiThumbUpLine,
    RiChat3Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-end">
            <nav className="flex items-center gap-2">
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors"
                    >
                        <img
                            src="https://res.cloudinary.com/juandevps/image/upload/v1714952083/upload/ujpasc23kv04q2poouju.png"
                            className="w-6 h-6 object-cover rounded-full"
                        />
                        <span>Administrador</span>
                        {showProfileMenu ? <RiArrowDownSLine className="transition-all" /> : <RiArrowLeftSLine className="transition-all"/>}
                    </button>
                    {showProfileMenu && (
                        <div className="absolute right-0 w-45 bg-white p-2 rounded-lg shadow-lg z-20">
                            <div className="p-0 hover:bg-transparent">
                                <Link
                                    to="/"
                                    className="rounded-lg transition-colors hover:no-underline text-gray-300 hover:bg-secondary-900 flex items-center gap-x-2 py-2 flex-1"
                                >
                                    <RiLogoutCircleRLine /> Cerrar sesión
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
