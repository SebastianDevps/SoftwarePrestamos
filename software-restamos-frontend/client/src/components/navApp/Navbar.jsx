import React from 'react'
import "./Navbar.scss"
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className='main-content'>
            <div className="main-content-top">
                <div className="content-top">
                    <button type="button" className="content-top-btn">
                        <span className="content-top-title">Administrador <span><FaUserAlt /></span></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
