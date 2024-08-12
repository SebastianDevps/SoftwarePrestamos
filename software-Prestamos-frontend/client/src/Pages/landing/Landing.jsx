import React, { useRef } from "react";

import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import PlanCard from "../../components/PlanCard";
import Steps from "../../components/Steps";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowRight } from "react-icons/fa";
import AboutUs from "../../components/AboutUs";

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

  return (
    <div className="font-poppins w-full">
      <Nav />
      <section className="relative h-[950px] overflow-hidden">
        <div className="absolute inset-0">
          <img className="w-full h-[820px] object-cover object-top" src="images/fondo-banner.smHlBUbJ.jpg" alt="Banner Background" />
        </div>
        <div data-aos="zoom-in" data-aos-duration="500"
          className="hidden md:flex absolute inset-0 flex-col">
          <img className="w-2/1 md:w-2/4 lg:w-2/4 xl:w-[44%] -mr-10 xl:mr-0 ml-auto mt-auto mb-72 object-cover object-top" src="images/ImgLanding.png" alt="Screens" />
        </div>
        <div className="absolute inset-0 flex flex-col">
          <img className="mt-auto" src="images/banner-2.DOO8rQBY.png" alt="Banner Overlay" />
          <div className="bg-white h-32"></div>
        </div>
        <div data-aos="fade-up" data-aos-duration="600"
          className="relative xl:mt-0 -mt-8 pt-40 max-w-7xl mx-auto text-white px-4">
          <div className="flex items-center space-x-2 xl:space-x-4">
            <span className="text-lg xl:w-14 w-7 border-b inline-flex"></span>
            <p className="lg:text-lg text-[18px]">Software Prestamos</p>
          </div>
          <div className="pt-2">
            <p className="text-[44px] leading-10 xl:leading-normal sm:text-4xl md:text-5xl lg:text-6xl font-bold lg:max-w-6xl">
              El Software <br className="xl:hidden" />de prestamos
              <span className="block mt-2 text-[38px] sm:text-4xl md:text-5xl lg:text-6xl text-secondary-600 text-blue-800">más fácil y rápido.</span>
            </p>
          </div>
          <div className="mt-4">
            <p className="max-w-[38rem] md:z-50 text-[19px] lg:text-[18px]">
              Gestiona tus préstamos de manera eficiente con nuestra solución intuitiva y en la nube. Optimiza tus procesos, mejora la experiencia de tus clientes y cumple con todos los requisitos legales de manera sencilla.
            </p>
          </div>
          <div className="flex mt-16 xl:mt-14 w-full lg:w-[60%] space-x-4 xl:space-x-10">
            <button className="flex h-[50px] lg:h-[50px] lg:w-[30%] xl:gap-4 gap-2 text-[18px] xl:text-lm bg-blue-800 text-white font-semibold items-center justify-center p-3 hover:scale-110 duration-200 rounded-full whitespace-nowrap"/*  onClick={() => window.open('https://api.whatsapp.com/send?phone=3001473564','_blank')} */>
              Contactanos
              <i><FaArrowRight /></i>
            </button>
            <button className="flex justify-center items-center bg-white h-[50px] lg:h-[50px] lg:w-[30%] text-[18px] xl:text-lm text-blue-800 font-semibold p-3 hover:scale-110 duration-200 rounded-full whitespace-nowrap">
              Conocer planes
            </button>
          </div>
        </div>
      </section>
      <PlanCard />
      <Steps />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default Landing;
