import React from "react";
import "./Cards.scss";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

const datos = [
    {
        id: "1",
        title: "Capital Circulando",
        count: "$ 99,999.999",
        icon: <GiPayMoney />
    },
    {
        id: "2",
        title: "Capital Disponible",
        count: "$ 99,999.999",
        icon: <GiMoneyStack />,
    },
    {
        id: "3",
        title: "Prestamos Activos",
        count: "99,999.999",
        icon: <FaRegMoneyBillAlt />,
    },
    {
        id: "4",
        title: "Clientes",
        count: "99,999.999",
        icon: <FaUser />,
    }
];

const Cards = () => {
    return (
        <div className="cards-container">
            {datos.map(data => (
                <div className="card-cont">
                    <div key={data.id} className="card-widget">
                        <div className="card-left">
                            <span className="card-title">{data.title}</span>
                            <div className="desc">
                                <div className="card-right">
                                    {data.icon}
                                </div>
                                <span className="card-counter">{data.count}</span>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cards;
