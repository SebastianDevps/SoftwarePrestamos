import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for open/close menu

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav data-aos="zoom-up" data-aos-duration="600"  className="absolute inset-x-0 z-10 w-full px-4 bg-transparent">
      <div className="max-w-7xl mx-auto flex justify-between py-6">
        <div className="w-[50%]">
          <img className="w-[30%] ml-4" src="volta-light.svg" alt="Logo" />
        </div>
        <div className="flex lg:w-full justify-end items-center">
          <ul className="hidden lg:flex text-2sm space-x-4 gap-5 text-white mr-10">
            <li >
              <Link to="/" className="flex before:content-['•'] before:text-3xl before:text-center before:text-white hover:no-underline hover:text-white items-center ">
                <i className="ico icon-circle mr-2" style={{ fontSize: "0.4rem" }}></i>
                Principal
              </Link>
            </li>
            <li>
              <Link to="#software-pos" className="flex before:content-['•'] before:text-3xl before:text-center before:text-white hover:no-underline hover:text-white items-center">
                <i className="ico icon-circle mr-2" style={{ fontSize: "0.4rem" }}></i>
                Planes
              </Link>
            </li>
            <li>
              <Link to="#contacto" className="flex before:content-['•'] before:text-3xl before:text-center before:text-white hover:no-underline hover:text-white items-center">
                <i className="ico icon-circle mr-2" style={{ fontSize: "0.4rem" }}></i>
                Indicaciones
              </Link>
            </li>
            <li>
              <Link to="#contacto" className="flex before:content-['•'] before:text-3xl before:text-center before:text-white hover:no-underline hover:text-white items-center">
                <i className="ico icon-circle mr-2" style={{ fontSize: "0.4rem" }}></i>
                Sobre Nosotros
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center ml-auto space-x-4">
          <div className=" sm:block">
            <Link to="/Login" className="inline-block w-35 hover:no-underline bg-white  hover:scale-110 duration-200 rounded-full px-3 py-1.5 sm:px-5 whitespace-nowrap text-2sm">
              Ingresar
            </Link>
          </div>
          <button className="lg:hidden text-white" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={40} /> : <FaBars size={40} />}
          </button>
        </div>
      </div>
      {/* Menu desplegable */}
      {isOpen && (
        <div className="w-[50%] top-11 transition-all duration-300 lg:hidden bg-none text-white p-4 absolute top-full left-25 right-12 rounded-3xl  shadow-lg">
          <ul className="flex flex-col justify-center items-end space-y-4">
            <li>
              <Link to="/" className="flex items-center" onClick={toggleMenu}>
                <i className="ico icon-circle mr-2" style={{ fontSize: "0.4rem" }}></i>
                Principal
              </Link>
            </li>
            <li>
              <Link to="#software-pos" className="flex items-center" onClick={toggleMenu}>
                <i className="ico icon-circle mr-2" style={{ fontSize: "0.4rem" }}></i>
                Planes
              </Link>
            </li>
            <li>
              <Link to="#contacto" className="flex items-center" onClick={toggleMenu}>
                <i className="ico icon-circle mr-2" style={{ fontSize: "0.4rem" }}></i>
                Indicaciones
              </Link>
            </li>
            <li>
              <Link to="#contacto" className="flex items-center" onClick={toggleMenu}>
                <i className="ico icon-circle mr-2" style={{ fontSize: "0.4rem" }}></i>
                Sobre Nosotros
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;