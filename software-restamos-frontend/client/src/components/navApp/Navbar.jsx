import React, { useState } from 'react';
import { FaUserAlt, FaUserShield } from 'react-icons/fa';
import './Navbar.scss';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar-container">
            {/* Top Bar */}
            <div className="top-bar">
                {/* Search */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                    <i className="search-icon"></i>
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
                                <div className="font-medium">Kevin Spacey</div>
                                <div className="text-xs text-white/70 dark:text-slate-500">
                                    DevOps Engineer
                                </div>
                                <div className="h-px my-2 -mx-2 bg-slate-200/60 dark:bg-darkmode-400 bg-white/[0.08]"></div>
                                <a href="#" className="dropdown-item">
                                    <FaUserAlt className="mr-2" />
                                    Profile
                                </a>
                                <a href="#" className="dropdown-item">
                                    <FaUserAlt className="mr-2" />
                                    Add Account
                                </a>
                                <a href="#" className="dropdown-item">
                                    <FaUserAlt className="mr-2" />
                                    Reset Password
                                </a>
                                <a href="#" className="dropdown-item">
                                    <FaUserAlt className="mr-2" />
                                    Help
                                </a>
                                <div className="h-px my-2 -mx-2 bg-slate-200/60 dark:bg-darkmode-400 bg-white/[0.08]"></div>
                                <a href="#" className="dropdown-item">
                                    <FaUserAlt className="mr-2" />
                                    Logout
                                </a>
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
