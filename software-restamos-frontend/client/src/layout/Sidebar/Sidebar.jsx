import { useEffect, useState } from 'react';
import "./Sidebar.css";
import { useContext } from 'react';
import { MdDashboardCustomize } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { FaUserShield } from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiSolidReport } from "react-icons/bi";
import { IoMdExit } from "react-icons/io";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [sidebarClass, setSidebarClass] = useState("");


    return (
        <div className={`sidebar ${sidebarClass}`}>
            <div className="user-info">
                <div className="info-img img-fit-cover">
                </div>
                <span className="info-name">PrestaCol</span>
            </div>

            <nav className="navigation">
                <ul className="nav-list">
                    {
                        <li className="nav-item">
                            <Link to="/app" style={{ textDecoration: "none" }} className="nav-link">
                                <span className='nav-icon'><MdDashboardCustomize /></span>
                                <span className="nav-link-text">Principal</span>
                            </Link>
                            <Link to="/app/prestamos" style={{ textDecoration: "none" }} className='nav-link'>
                                <span className='nav-icon'><FaMoneyBillTransfer /></span>
                                <span className="nav-link-text">Prestamos</span>
                            </Link>
                            <Link to="/app/clientes" style={{ textDecoration: "none" }} className='nav-link'>
                                <span className='nav-icon'><HiMiniUsers /></span>
                                <span className="nav-link-text">Clientes</span>
                            </Link>
                            <Link to="/app" style={{ textDecoration: "none" }} className='nav-link'>
                                <span className='nav-icon'><FaUserShield /></span> <span className="nav-link-text">Administradores</span>
                            </Link>
                            <Link to="/app" style={{ textDecoration: "none" }} className='nav-link'>
                                <span className='nav-icon'><BiSolidReport /></span> <span className="nav-link-text">Reportes</span>
                            </Link>
                            <Link to="/app" style={{ textDecoration: "none" }} className='nav-link'>
                                <span className='nav-icon'><MdCalculate /></span> <span className="nav-link-text"> Calculadora de prestamos</span>
                            </Link>
                            <Link to="/app" style={{ textDecoration: "none" }} className='nav-link'>
                                <span className='nav-icon'><IoMdSettings /></span> <span className="nav-link-text">Configuracion</span>
                            </Link>
                            <Link to="/" style={{ textDecoration: "none" }} className="nav-link-exit">
                                <span className='nav-icon-exit'><IoMdExit /></span> <span className="nav-link-exit-text">Salir</span>
                            </Link>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
