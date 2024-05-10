import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

function Nav() {
  return (
    <div>
      <div className="nav">
        <div className="logo-name">
          <div className="logo"> 
          </div>
        </div>
        <div className="items-nav">
          <ul className="items" >
            <Link to="/" className="items">
            <li>Principal</li>
            </Link>
            <Link to="/" className="items">
            <li>Planes</li>
            </Link>
            <Link to="/" className="items">
            <li>Sobre Nosotros</li>
            </Link>
            <Link to="/" className="items">
            <li>Contacto</li>
            </Link>
          </ul>
        </div>
        <div className="links">
          <Link to="/Login">
            <button type="submit" className="button-nav">
              Ingresar
            </button>
          </Link>
         {/* <Link to="/Register">
            <button type="submit" className="button-nav">
              {" "}
              Crear Cuenta
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Nav;
