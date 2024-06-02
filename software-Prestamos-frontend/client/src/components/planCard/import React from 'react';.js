import React from 'react';
import './PlanCard.scss';
import { useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const plans = [
  {
    id: "emp-001",
    title: "Emprendedor",
    price: "$299.000",
    documents: "150 documentos al año",
    isPopular: false
  },
  {
    id: "prem-002",
    title: "Premium",
    price: "$499.000",
    documents: "400 documentos al año",
    isPopular: true
  },
  {
    id: "pers-003",
    title: "Personalizado",
    price: "$699.000",
    documents: "Configura tus necesidades",
    isPopular: false
  }
];

function PlanCard() {
  return (
    <div className="container-card">
      <section className="plan-section">
        <div className="title-container">
          <h2 className="main-title">Nuestros Planes</h2>
        </div>
        <div className="cards-container">
          {plans.map(plan => (
            <div key={plan.id} className={`plan-card ${plan.id}`}>
              <PlanDetails 
                title={plan.title} 
                price={plan.price} 
                documents={plan.documents} 
                isPopular={plan.isPopular} 
              />
              <PlanFeatures />
              <ActionButton label="Comenzar" planId={plan.id} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PlanDetails({ title, price, documents, isPopular = false }) {
  return (
    <div className="plan-details">
      <div className="header">
        <h1 className="plan-title">{title}</h1>
        {isPopular && <span className="badge">Popular</span>}
      </div>
      <div className="price-container">
        <h1 className="price">{price}</h1>
        <span className="currency">COP anual</span>
      </div>
      <p className="documents">{documents}</p>
    </div>
  );
}

function PlanFeatures() {
  return (
    <ul className="features-list">
      <li className="feature"><IoMdCheckmarkCircleOutline className='icon'/>Descripción de beneficios</li>
      {/* Más beneficios pueden ser agregados aquí */}
    </ul>
  );
}

function ActionButton({ label, planId }) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    console.log(`Registrando para el plan: ${planId}`); // Aquí puedes manejar la lógica para la inscripción en la base de datos
    navigate(`/register/${planId}`);
  };

  return (
    <button className="btn-primary" onClick={handleButtonClick}>
      {label}
    </button>
  );
}

export default PlanCard;
