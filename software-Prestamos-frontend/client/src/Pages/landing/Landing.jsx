import React, { useRef } from "react";

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
      <Nav/>
      <section className="relative h-[920px] overflow-hidden">
        <div className="absolute inset-0">
          <img className="w-full h-[820px] object-cover object-top" src="images/fondo-banner.smHlBUbJ.jpg" alt="Banner Background" />
        </div>
        <div className="hidden md:flex absolute inset-0 flex-col">
          <img className="w-2/3 md:w-2/4 lg:w-2/4 xl:w-2/5 -mr-10 xl:mr-0 ml-auto mt-auto mb-72 object-cover object-top" src="images/ImgLanding.png" alt="Screens" />
        </div>
        <div className="absolute inset-0 flex flex-col">
          <img className="w-full mt-auto" src="images/banner-2.DOO8rQBY.png" alt="Banner Overlay" />
          <div className="bg-white h-32"></div>
        </div>
        <div className="relative pt-52 max-w-6xl mx-auto text-white px-4">
          <div className="flex items-center space-x-4">
            <span className="w-14 border-b inline-flex"></span>
            <p>Software Prestamos</p>
          </div>
          <div className="pt-2">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl">
              El Software de prestamos
              <br />
              <span className="text-secondary-600 text-orange-500">más fácil y rápido.</span>
            </p>
          </div>
          <div className="flex mt-14 space-x-10">
            <button className="btn btn-primary" onClick={() => window.open('https://api.whatsapp.com/send?phone=3161331234','_blank')}>
              Contactanos
              <i className="ico icon-arrow-r ml-4 text-sm"></i>
            </button>
            <button className="btn btn-secondary" onClick={() => window.open('https://api.whatsapp.com/send?phone=3161331234','_blank')}>
              Conocer planes
              <i className=" text-slate-500"></i>
            </button>
          </div>
        </div>
      </section>
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
