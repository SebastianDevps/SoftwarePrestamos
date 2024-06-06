import React from "react";
import { useNavigate } from "react-router-dom";
import { RiCheckboxCircleLine,RiCloseCircleLine } from "react-icons/ri";

function PlanCard() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center h-full -mt-10 justify-between p-8 w-full">
      <h2 data-aos="zoom-in" data-aos-duration="500" className="flex text-4xl z-50 lg:text-6xl items-center justify-center -mt-10 text-blue-800 font-semibold font-poppins">
        Nuestros Planes
      </h2>

      <section data-aos="fade-up" data-aos-duration="600" className="text-center w-[85%]  ">
        <div className="grid grid-cols-1 mt-2 -ml-4 w-[110%] h-full md:grid-cols-1 md:ml-14 lg:ml-0 md:w-[80%] lg:w-full lg:grid-cols-6 gap-8 pt-10">
          {/* Emprendedor */}
          <div className="p-6 lg:p-8 md:p-8 bg-white rounded-xl  h-full flex flex-col   lg:col-span-2 justify-between shadow-lg transform transition duration-200 hover:scale-105 w-full">
            <div className="font-poppins mb-12 lg:mb-4">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-blue-800">Gratis</h1>
              </div>
              <div className="flex items-end mb-3">
                <h1 className="text-3xl font-[400]">$0</h1>
              </div>
              <p className="text-gray-500 mb-2 text-start text-2sm">Prueba gratis, por 3 días</p>
              <span className="font-semibold bg-gray-300 h-[1px] w-full inline-flex"></span>
            </div>
            <ul className="-mt-8 mb-4 w-full space-y-2 text-lg font-poppins">
              <li className="flex w-full items-center mb-3 text-xl font-light text-gray-500">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-blue-800" />
                Descripción de beneficios
              </li>
              <li className="flex mb-3 items-center text-xl font-light text-gray-500">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-blue-800" />
                Descripción de beneficios
              </li>
              <li className="flex mb-3 opacity-[.5] items-center text-xl font-light text-gray-500">
                <RiCloseCircleLine className="mr-2 text-3xl text-gray-500" />
                Descripción de beneficios
              </li>
              <li className="flex mb-3 opacity-[.5] items-center text-xl font-light text-gray-500">
                <RiCloseCircleLine className="mr-2 text-3xl text-gray-500" />
                Descripción de beneficios
              </li>
              <li className="flex mb-3 opacity-[.5] items-center text-xl font-light text-gray-500">
                <RiCloseCircleLine className="mr-2 text-3xl text-gray-500" />
                Descripción de beneficios
              </li>
            </ul>
            <button
              className="w-full py-3 px-4 bg-blue-800 text-white text-xl rounded-full shadow-md hover:bg-indigo-900 transition duration-200 mt-4"
              onClick={() => navigate("/register")}
            >
              Comenzar
            </button>
          </div>
          {/* <-- Emprendedor /--> */}

          {/* Profesional */}
          <div className="p-6 lg:p-8 md:p-8 bg-blue-800 rounded-xl  h-full flex flex-col   lg:col-span-2 justify-between shadow-lg transform transition duration-200 hover:scale-105 w-full">
            <div className="font-poppins mb-12 lg:mb-4">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-white">Profesional</h1>
                <span className="bg-yellow-500 text-white text-2xs px-3 py-1 font-semibold rounded-full">Popular</span>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <h1 className="text-3xl text-white font-[400]">$100.000</h1>
                <span className="ml-2 text-2sm text-white opacity-80">COP anual</span>
              </div>
              <p className="text-white mb-2 text-start text-2sm">Ideal para empezaar</p>
              <span className="font-semibold bg-gray-300 h-[1px] w-full inline-flex"></span>
            </div>
            <ul className="-mt-8 mb-4 w-full space-y-2 text-lg font-poppins">
              <li className="flex w-full items-center mb-3 text-xl font-light text-white">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-white" />
                Descripción de beneficios
              </li>
              <li className="flex w-full items-center mb-3 text-xl font-light text-white">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-white" />
                Descripción de beneficios
              </li>
              <li className="flex w-full items-center mb-3 text-xl font-light text-white">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-white" />
                Descripción de beneficios
              </li>
              <li className="flex w-full items-center mb-3 text-xl font-light text-white">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-white" />
                Descripción de beneficios
              </li>
              <li className="flex w-full opacity-[.5] items-center mb-3 text-xl font-light text-white">
                <RiCloseCircleLine className="mr-2 text-3xl text-white" />
                Descripción de beneficios
              </li>
              
            </ul>
            <button
              className="w-full py-3 px-4 bg-white text-blue-800 text-xl rounded-full shadow-md hover:bg-indigo-900 transition duration-200 mt-4"
              onClick={() => navigate("/register")}
            >
              Comenzar
            </button>
          </div>
          {/* <-- Profesional /--> */}

          {/* Premium */}
          <div className="p-6 lg:p-8 md:p-8 bg-white rounded-xl  h-full flex flex-col   lg:col-span-2 justify-between shadow-lg transform transition duration-200 hover:scale-105 w-full">
            <div className="font-poppins mb-12 lg:mb-4">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-blue-800">Premium</h1>
                {/* <span className="bg-yellow-500 text-white text-2xs px-3 py-1 rounded-full">Popular</span> */}
              </div>
              <div className="flex items-end gap-2 mb-3">
                <h1 className="text-3xl font-[400]">$200.000</h1>
                <span className="ml-2 text-2sm text-gray-500 opacity-80">COP anual</span>
              </div>
              <p className="text-gray-500 mb-2 text-start text-2sm">Ideal para tu negocio</p>
              <span className="font-semibold bg-gray-300 h-[1px] w-full inline-flex"></span>
            </div>
            <ul className="mt-2 mb-2 w-full space-y-2 text-lg font-poppins">
              <li className="flex w-full items-center mb-3 text-xl font-light text-gray-500">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-blue-800" />
                Descripción de beneficios
              </li>
              <li className="flex w-full items-center mb-3 text-xl font-light text-gray-500">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-blue-800" />
                Descripción de beneficios
              </li>
              <li className="flex w-full items-center mb-3 text-xl font-light text-gray-500">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-blue-800" />
                Descripción de beneficios
              </li>
              <li className="flex w-full items-center mb-3 text-xl font-light text-gray-500">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-blue-800" />
                Descripción de beneficios
              </li>
              <li className="flex w-full items-center mb-4 text-xl font-light text-gray-500">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-blue-800" />
                Descripción de beneficios
              </li>
              <li className="flex w-full items-center mb-4 text-xl font-light text-gray-500">
                <RiCheckboxCircleLine className="mr-2 text-3xl text-blue-800" />
                Descripción de beneficios
              </li>
            </ul>
            <button
              className="w-full py-3 px-4 bg-blue-800 text-white text-xl rounded-full shadow-md hover:bg-indigo-900 transition duration-200 mt-4"
              onClick={() => navigate("/register")}
            >
              Comenzar
            </button>
          </div>
          {/* <-- Premium /--> */}
        </div>
      </section>
    </div>
  );
}

export default PlanCard;
