import React from "react";
import { useNavigate } from "react-router-dom";
import { RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";
import { planDetails } from "../../constants";

function PlanCard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-full -mt-10 justify-between p-8 w-full">
      <h2
        data-aos="zoom-in"
        data-aos-duration="500"
        className="flex text-4xl z-50 lg:text-6xl items-center justify-center -mt-10 text-blue-800 font-semibold font-poppins"
      >
        Nuestros Planes
      </h2>

      <section
        data-aos="fade-up"
        data-aos-duration="600"
        className="text-center w-[85%]"
      >
        <div className="grid grid-cols-1 mt-2 -ml-4 w-[110%] h-full md:grid-cols-1 md:ml-14 lg:ml-0 md:w-[80%] lg:w-full lg:grid-cols-6 gap-8 pt-10">
          {planDetails.map((plan, index) => (
            <div
              key={index}
              className={`p-6 lg:p-8 md:p-8 rounded-xl h-full flex flex-col justify-between shadow-lg transform transition duration-200 hover:scale-105 w-full lg:col-span-2 ${
                plan.title === "Profesional" ? "bg-blue-800" : "bg-white"
              }`}
            >
              <div className="font-poppins mb-12 lg:mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h1
                    className={`text-3xl font-bold ${
                      plan.title === "Profesional" ? "text-white" : "text-blue-800"
                    }`}
                  >
                    {plan.title}
                  </h1>
                  {plan.isPopular && (
                    <span className="bg-yellow-500 text-white text-2xs px-3 py-1 font-semibold rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-2 mb-3">
                  <h1
                    className={`text-3xl font-[400] ${
                      plan.title === "Profesional" ? "text-white" : "text-blue-800"
                    }`}
                  >
                    ${plan.price.toLocaleString()}
                  </h1>
                  {plan.span && (
                    <span
                      className={`ml-2 text-2sm ${
                        plan.title === "Profesional"
                          ? "text-white opacity-80"
                          : "text-gray-500 opacity-80"
                      }`}
                    >
                      {plan.span}
                    </span>
                  )}
                </div>
                <p
                  className={`mb-2 text-start text-2sm ${
                    plan.title === "Profesional" ? "text-white" : "text-gray-500"
                  }`}
                >
                  {plan.detail}
                </p>
                <span className="font-semibold bg-gray-300 h-[1px] w-full inline-flex"></span>
              </div>
              <ul className="-mt-8 mb-4 w-full space-y-2 text-lg font-poppins">
                {plan.benefits.map((benefit) => (
                  <li
                    key={benefit.id}
                    className={`flex mb-3 items-center text-xl font-light ${
                      plan.title === "Profesional"
                        ? "text-white"
                        : "text-gray-500"
                    } ${
                      !benefit.description.includes("Descripcion")
                        ? "opacity-[.5]"
                        : ""
                    }`}
                  >
                    {benefit.description.includes("Descripcion") ? (
                      <RiCheckboxCircleLine
                        className={`mr-2 text-3xl ${
                          plan.title === "Profesional"
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
                className={`w-full py-3 px-4 ${
                  plan.title === "Profesional" ? "bg-white text-blue-800" : "bg-blue-800 text-white"
                } text-xl rounded-full shadow-md hover:bg-indigo-900 transition duration-200 mt-4`}
                onClick={() => navigate("/register")}
              >
                Comenzar
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PlanCard;
