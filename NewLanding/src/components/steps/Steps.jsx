import React from "react";
import "./Steps.scss";
import { GoArrowRight } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const steps = [
  {
    id: 1,
    image: "../../../public/images/steps.png",
    title: "Realiza tu orden de compra",
    description: "Elige el plan que más se adapte a tus necesidades",
  },
  {
    id: 2,
    image: "../../../public/images/steps.png",
    title: "Realiza el pago",
    description: "Activate en el mejor software para manejar tus prestamos",
  },
  {
    id: 3,
    image: "../../../public/images/steps.png",
    title: "Confirmación y activación",
    description:
      "Deja todo en nuestras manos, en 24 horas estaras disfrutando de nuestro software",
  },
];

const benefits = [
  {
    id: 1,
    text: "Descripcion 1",
  },
  {
    id: 2,
    text: "Descripcion 2",
  },
  {
    id: 3,
    text: "Descripcion 3",
  },
  {
    id: 4,
    text: "Descripcion 4",
  },
];

const Steps = () => {
  return (
    <section className="steps-section">
      <h1 className="title">Pasos a seguir:</h1>
      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.id} className="step">
            <img className="step-image" src={step.image} alt="Step" />
            <h1 className="step-title">{step.title}</h1>
            <p className="step-description">{step.description}</p>
            {/*  <button className="step-button">
                            Saber más <GoArrowRight className='icon'/>
                        </button>
                        */}
          </div>
        ))}
      </div>
     {/* <div className="benefits-wrapper">
        <section className="benefits-container">
          <h3 className="benefits-title">Beneficios</h3>
          {benefits.map((benefit) => (
            <div>
              <p className="benefit-item">
                <IoMdCheckmarkCircleOutline className="icon" /> {benefit.text}
              </p>
            </div>
          ))}
        </section>
      </div>*/}
    </section>
  );
};

export default Steps;
