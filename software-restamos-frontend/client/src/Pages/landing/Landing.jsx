import React, { useRef } from "react";
import "./Landing.scss";

import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";
import PlanCard from "../../components/planCard/PlanCard";
import Steps from "../../components/steps/Steps";
import Login from "../Login/Login";

import { FaArrowRight } from "react-icons/fa";
import { IoRemoveOutline } from "react-icons/io5";

function Landing() {
  // Crear una referencia para el componente PlanCard
  const planCardRef = useRef(null);

  // Función para desplazar la vista hacia el PlanCard
  const scrollToPlanCard = () => {
    if (planCardRef.current) {
      planCardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="container-Landing">
      <Nav />
        <div className="container-body">
          <div className="container-left">
            <div className="boby-title-barra">
              <samp className="title-barra"></samp>
              <samp className="title">SOTFWARE DE PRESTAMOS</samp>
            </div>

            <h1 className="title-Landing-blue">El Software De</h1>
            <h1 className="title-Landing-blue2">Prestamos</h1>
            <div className="container-descipcion">
              <p className="descripcion-Landing">Mas Fácil y Rápido</p>
            </div>

            <div className="container-button">
              <button type="submit" className="button-contact">
                COMENZAR <FaArrowRight className="icon" />
              </button>
              <button
                type="button"
                className="button-planes"
                onClick={scrollToPlanCard}
              >
                CONOCER PLANES
              </button>
            </div>
          </div>
          <div className="container-right">
            <div className="container-image"></div>
          </div>
        </div>
      </div>
      <div className="banner">
        <img className="banner-img" src="../../../public/images/banner-2.DOO8rQBY.png" alt="" />
      </div>
      <div ref={planCardRef}>
        <PlanCard />
      </div>
      <div>
        <Steps />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Landing;
