import React, { useRef } from "react";

import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";
import PlanCard from "../../components/planCard/PlanCard";
import Steps from "../../components/steps/Steps";
import Login from "../Login/Login";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowRight } from "react-icons/fa";
import { IoRemoveOutline } from "react-icons/io5";

function Landing() {

  //Animaciones
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  // Crear una referencia para el componente PlanCard
  const planCardRef = useRef(null);

  // Función para desplazar la vista hacia el PlanCard
  const scrollToPlanCard = () => {
    if (planCardRef.current) {
      planCardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-poppins">
      <Nav/>
      <section className="relative h-[950px] overflow-hidden">
        <div className="absolute inset-0">
          <img className="w-full h-[820px] object-cover object-top" src="images/fondo-banner.smHlBUbJ.jpg" alt="Banner Background" />
        </div>
        <div className="hidden md:flex absolute inset-0 flex-col">
          <img data-aos="zoom-in" data-aos-duration="500"
              className="w-2/1 md:w-2/4 lg:w-2/4 xl:w-[44%] -mr-10 xl:mr-0 ml-auto mt-auto mb-72 object-cover object-top" src="images/ImgLanding.png" alt="Screens" />
        </div>
        <div className="absolute inset-0 flex flex-col">
          <img className="w-full mt-auto" src="images/banner-2.DOO8rQBY.png" alt="Banner Overlay" />
          <div className="bg-white h-32"></div>
        </div>
        <div data-aos="fade-up" data-aos-duration="600"
            className="relative pt-40 max-w-7xl mx-auto text-white px-4">
          <div className="flex items-center space-x-4">
            <span className="text-lg w-14 border-b inline-flex"></span>
            <p className="lg:text-lg">Software Prestamos</p>
          </div>
          <div className="pt-2">
            <p className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold lg:max-w-6xl">
              El Software de prestamos
              <span className="block mt-2 text-secondary-600 text-blue-800">más fácil y rápido.</span>
            </p>
          </div>
          <div className="mt-4">
            <p className="max-w-[38rem] md:z-50 lg:text-[18px]">
              Gestiona tus préstamos de manera eficiente con nuestra solución intuitiva y en la nube. Optimiza tus procesos, mejora la experiencia de tus clientes y cumple con todos los requisitos legales de manera sencilla.
            </p>
          </div>
          <div className="flex mt-14 w-full lg:w-[60%] space-x-4 lg:space-x-10">
            <button className="flex h-[40px] lg:h-[50px] lg:w-[30%] gap-4 text-lm bg-blue-800 text-white items-center justify-center p-2 hover:scale-110 duration-200 rounded-full whitespace-nowrap"/*  onClick={() => window.open('https://api.whatsapp.com/send?phone=3001473564','_blank')} */>
              Contactanos
              <i><FaArrowRight/></i>
            </button>
            <button onClick={scrollToPlanCard} className="bg-white h-[40px] lg:h-[50px] lg:w-[30%] text-lm text-black p-2 hover:scale-110 duration-200 rounded-full whitespace-nowrap">
              Conocer planes
            </button>
          </div>
        </div>
      </section>
      <div ref={planCardRef}>
        <PlanCard />
      </div>
      {/*<div>
        <Steps />
  </div> */}
      <Footer/>
    </div>
  );
}

export default Landing;
