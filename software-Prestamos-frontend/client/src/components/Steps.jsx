import React from "react";
import { steps } from "../constants";

const Steps = () => {
  return (
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
  );
};

export default Steps;
