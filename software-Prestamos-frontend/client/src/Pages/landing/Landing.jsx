import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import { navLinks, planDetails, steps } from "../../constants";
import AOS from "aos";
import "aos/dist/aos.css";

//icons
import { RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";


function Landing() {
  //Nav Logic Open
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    const userRole = AuthServices.getRoleFromUserInfo();

    if (userRole) {
      window.location.href = "/app";
    } else {
      window.location.href = "/login";
    }
  };
  //--------------------------------------

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
      {/* Nav Section */}
      <header className="absolute inset-x-0 z-10 w-full px-4 bg-transparent">
        <div className="max-w-7xl mx-auto flex justify-between py-6">
          <div className="w-[50%] items-center justify-center">
            <img className="xl:w-[120px] w-[90px] mt-1 xl:mt-0  xl:ml-6" src="" alt="Logo" />
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
                className="inline-block w-[130px] xl:w-[140px] hover:no-underline text-blue-800 font-medium bg-white hover:scale-110 duration-200 rounded-full px-3 py-1.5 sm:px-5 whitespace-nowrap text-[18px] xl:text-2sm"
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
          <div className="w-[55%] ml-[45%] -mt-3 transition-all duration-300 lg:hidden bg-white p-3 rounded-2xl shadow-md">
            <ul className="flex flex-col justify-center items-end space-y-4">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <Link to={`/${nav.id}`}
                    className="flex hover:no-underline hover:text-blue hover:scale-105 transition-all duration-300 text-blue-800 font-semibold text-lg items-center"
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      {/* Home Section */}
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
      {/* PlanCard Section */}
      <section className="flex flex-col items-center h-full -mt-10 justify-between p-8 w-full">
        <h2
          className="flex text-4xl z-50 lg:text-6xl items-center justify-center  -mt-20 xl:-mt-15 text-blue-800 font-semibold font-poppins"
        >
          Nuestros Planes
        </h2>

        <section
          className="text-center w-full xl:w-[90%]"
        >
          <div className="grid grid-cols-1 mt-2 -ml-4 w-[110%] h-full md:grid-cols-1 md:ml-14 lg:ml-0 md:w-[80%] lg:w-full lg:grid-cols-6 gap-6 pt-10">
            {planDetails.map((plan, index) => (
              <div
                key={index}
                className={`p-6 lg:p-8 md:p-8 rounded-xl h-full flex flex-col justify-between shadow-lg transform transition duration-200 hover:scale-105 w-full lg:col-span-2 ${plan.title === "Profesional" ? "bg-blue-800" : "bg-white"
                  }`}
              >
                <div className="font-poppins mb-12 lg:mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h1
                      className={`text-3xl font-bold ${plan.title === "Profesional" ? "text-white" : "text-blue-800"
                        }`}
                    >
                      {plan.title}
                    </h1>
                    {plan.isPopular && (
                      <span className="bg-orange-400 text-white text-2xs px-3 py-1 font-semibold rounded-full">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="flex items-end gap-2 mb-3">
                    <h1
                      className={`text-3xl font-[400] ${plan.title === "Profesional" ? "text-white" : "text-blue-800"
                        }`}
                    >
                      ${plan.price.toLocaleString()}
                    </h1>
                    {plan.span && (
                      <span
                        className={`ml-2 text-2sm ${plan.title === "Profesional"
                          ? "text-white opacity-80"
                          : "text-gray-500 opacity-80"
                          }`}
                      >
                        {plan.span}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-start text-2sm ${plan.title === "Profesional" ? "text-white" : "text-gray-500"
                      }`}
                  >
                    {plan.detail}
                  </p>
                  {/* Separator */}
                  <div className="mb-4">
                    <span className="font-semibold bg-gray-300 h-[1px] w-full inline-flex"></span>
                  </div>
                </div>
                <ul className="xl:-mt-4 -mt-10 mb-2 w-full space-y-2 text-lg font-poppins">
                  {plan.benefits.map((benefit) => (
                    <li
                      key={benefit.id}
                      className={`flex mb-3 items-center text-xl font-light ${plan.title === "Profesional"
                        ? "text-white"
                        : "text-gray-500"
                        } ${!benefit.description.includes("Descripcion")
                          ? "opacity-[.5]"
                          : ""
                        }`}
                    >
                      {benefit.description.includes("Descripcion") ? (
                        <RiCheckboxCircleLine
                          className={`mr-2 text-3xl ${plan.title === "Profesional"
                            ? "text-white"
                            : "text-blue-800"
                            }`}
                        />
                      ) : (
                        <RiCloseCircleLine
                          className={`mr-2 text-3xl text-gray-500`}
                        />
                      )}
                      {benefit.description}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-4 ${plan.title === "Profesional" ? "bg-white text-blue-800" : "bg-blue-800 text-white"
                    } text-xl rounded-full shadow-md hover:bg-indigo-900 transition duration-200 mt-4`}
                  onClick={() => navigate("/register")}
                >
                  Comenzar
                </button>
              </div>
            ))}
          </div>
        </section>
      </section>
      {/* Steps Section */}
      <section className="max-w-6xl mx-auto p-8 font-poppins text-center xl:mt-10">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-800 mb-8 xl:mb-10">Pasos a seguir:</h1>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col xl:mb-0 -mb-10 items-center p-2">
              <img
                className="xl:w-[80%] ml-4  w-[90%] h-[50%] xl:h-[60%]"
                src={step.image}
                alt={`imgage_step_${step.id}`}
              />
              <h1 className="text-blue-800 font-semibold text-3xl xl:text-2xl mt-4">
                {step.title}
              </h1>
              <p className="text-gray-600 text-center text-[16px] xl:text-[14px] w-4/5">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* About Us Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center">
          {/* Imagen */}
          <div className="md:w-1/2 w-full mb-10 md:mb-0">
            <img
              src="https://via.placeholder.com/600x400"
              alt="About Us"
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>

          {/* Texto */}
          <div className="md:w-1/2 w-full md:pl-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Sobre Nosotros</h2>
            <p className="text-lg text-gray-600 mb-6">
              Somos una empresa dedicada a [descripción breve de la empresa]. Nuestro objetivo es brindar a nuestros clientes [objetivo o misión de la empresa]. Con años de experiencia en el sector, estamos comprometidos a ofrecer servicios de calidad y a superar las expectativas de nuestros clientes.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Nuestro equipo está compuesto por profesionales apasionados y altamente capacitados, que trabajan día a día para crear soluciones innovadoras que respondan a las necesidades del mercado actual.
            </p>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="flex xl:flex-row flex-col  bg-gray-100 w-full p-4 items-center justify-between">
        <div className="flex flex-col gap-4 md:flex-row justify-between text-center items-center">
          <a className="border border-gray-500 rounded-lg p-2 text-center hover:bg-gray-700 transition-colors" href="#">
            Términos y Condiciones
          </a>
          <a className="border border-gray-500 rounded-lg p-2 text-center hover:bg-gray-700 transition-colors" href="#">
            Política y Privacidad de Datos
          </a>
        </div>
        <h1 className="text-sm md:text-base text-center items-center">Copyright © 2024. Todos los derechos reservados.</h1>
      </footer>
    </div>
  );
}

export default Landing;
