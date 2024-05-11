import { useEffect, useState } from 'react';
import "./Sidebar.css";
import { useContext } from 'react';

const Sidebar = () => {
  const [sidebarClass, setSidebarClass] = useState("");


  return (
    <div className={ `sidebar ${sidebarClass}` }>
      <div className="user-info">
          <div className="info-img img-fit-cover">
          </div>
          <span className="info-name">Prestamos</span>
      </div>

      <nav className="navigation">
          <ul className="nav-list">
            {
                <li className="nav-item">
                  <a href="#" className= "nav-link">
                      <span className="nav-link-text">Principal</span>
                  </a>
                  <a href="#" className= "nav-link">
                      <span className="nav-link-text">Prestamos</span>
                  </a>
                  <a href="#" className= "nav-link">
                      <span className="nav-link-text">Clientes</span>
                  </a>
                  <a href="#" className= "nav-link">
                      <span className="nav-link-text">Administradores</span>
                  </a>
                  <a href="#" className= "nav-link">
                      <span className="nav-link-text">Reportes</span>
                  </a>
                  <a href="#" className= "nav-link">
                      <span className="nav-link-text">Calculadora de prestamos</span>
                  </a>
                  <a href="#" className= "nav-link">
                      <span className="nav-link-text">Configuracion</span>
                  </a>
                  <a href="#" className= "nav-link">
                      <span className="nav-link-text">Salir</span>
                  </a>
                </li>
            }
          </ul>
      </nav>
    </div>
  )
}

export default Sidebar
