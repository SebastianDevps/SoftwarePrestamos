import React from "react";
import "./PlanCard.scss";
import { useNavigate, Link } from "react-router-dom";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const plans = [
  {
    id: "0",
    title: "Prueba Gratuita",
    price: "Free",
    documents: "Prueba gratis, por 3 dias",
  },
  {},
  {},
];

function PlanCard() {
  return (
    <div className="container-card">
      <section className="plan-section">
        <div className="title-container">
          <h2 className="main-title">Nuestros Planes</h2>
        </div>
        <div className="cards-container">
          {/* Emprendedor */}
          <div className="plan-card emprendedor">
            <PlanDetails
              title="Prueba Gratuita"
              price="$0"
              documents="Prueba gratis, por 3 dias"
              isCurrency={true}
            />
            <PlanFeatures />
            <ActionButton label="Comenzar" navigateTo="/Register" />
          </div>
          {/* Premium */}
          <div className="plan-card premium">
            <PlanDetails
              title="Premium"
              price="$200.000"
              documents="Descripcion"
              isPopular={true}
              isCurrency={true}
            />
            <PlanFeatures />
            <ActionButton label="Comenzar" navigateTo="/Register" />
          </div>
          {/* Personalizado */}
          <div className="plan-card personalizado">
            <PlanDetails title="Personalizado" documents="Contactanos" />
            <PlanFeatures />
            <ActionButton label="Comenzar" navigateTo="/Register" />
          </div>
        </div>
      </section>
    </div>
  );
}

function PlanDetails({
  title,
  price,
  documents,
  isPopular = false,
  isCurrency = false,
}) {
  return (
    <div className="plan-details">
      <div className="header">
        <h1 className="plan-title">{title}</h1>
        {isPopular && <span className="badge">Popular</span>}
      </div>
      <div className="price-container">
        <h1 className="price">{price}</h1>
        {isCurrency && <span className="currency">COP anual</span>}
      </div>
      <p className="documents">{documents}</p>
    </div>
  );
}

function PlanFeatures({ whiteText = false }) {
  const featureClass = whiteText ? "feature white-text" : "feature";
  return (
    <ul className="features-list">
      <li className={featureClass}>
        <IoMdCheckmarkCircleOutline className="icon" />
        Descripcion de beneficios
      </li>
      <li className={featureClass}>
        <IoMdCheckmarkCircleOutline className="icon" />
        Descripcion de beneficios
      </li>
      <li className={featureClass}>
        <IoMdCheckmarkCircleOutline className="icon" /> Descripcion de
        beneficios
      </li>
      <li className={featureClass}>
        <IoMdCheckmarkCircleOutline className="icon" />
        Descripcion de beneficios
      </li>
    </ul>
  );
}

function ActionButton({ label, navigateTo }) {
  const navigate = useNavigate();
  return (
    <button className="btn-primary" onClick={() => navigate(navigateTo)}>
      {label}
    </button>
  );
}

export default PlanCard;
