import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthServices from "../../services/AuthServices";
import { navLinks } from "../../constants";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    const isAdmin = AuthServices.adminOnly();
    const isSuperAdmin = AuthServices.superAdminOnly();

    if (isAdmin || isSuperAdmin) {
      window.location.href = "/app";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <nav className="absolute inset-x-0 z-10 w-full px-4 bg-transparent">
      <div className="max-w-7xl mx-auto flex justify-between py-6">
        <div className="w-[50%] items-center justify-center">
          <img className="xl:w-[120px] w-[90px] mt-1 xl:mt-0  xl:ml-4" src="volta-light.svg" alt="Logo" />
        </div>
        <div className="flex lg:w-full justify-end items-center">
          <ul className="hidden lg:flex text-2sm space-x-4 gap-5 text-white mr-10">
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <Link to={`/${nav.id}`}
                  className="flex before:content-['•'] before:text-3xl before:text-center hover:scale-105 transition-all duration-300 before:text-white hover:no-underline hover:text-white items-center"
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center ml-auto space-x-4">
          <div className="sm:block">
            <button
              onClick={handleLoginClick}
              className="inline-block w-35 hover:no-underline bg-white hover:scale-110 duration-200 rounded-full px-3 py-1.5 sm:px-5 whitespace-nowrap text-2sm"
            >
              Ingresar
            </button>
          </div>
          <button className="lg:hidden text-white" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={40} /> : <FaBars size={40} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="w-[50%] ml-[50%] -mt-3 transition-all duration-300 lg:hidden bg-white p-3 rounded-2xl shadow-md">
          <ul className="flex flex-col justify-center items-end space-y-4">
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <Link to={`/${nav.id}`}
                  className="flex hover:no-underline hover:text-blue hover:scale-105 transition-all duration-300 text-black text-lg items-center"
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
