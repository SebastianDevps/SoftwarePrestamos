import React from "react";
import "./Cards.scss";

const datos = [
    {
        id: "1",
        title: "Usuarios1",
        count: "0",
        icon: "Icon",
    },
    {
        id: "2",
        title: "Usuarios2",
        count: "0",
        icon: "Icon",
    },
    {
        id: "3",
        title: "Usuarios3",
        count: "0",
        icon: "Icon",
    },
    {
        id: "4",
        title: "Usuarios4",
        count: "0",
        icon: "Icon",
    }
];

const Cards = () => {
    return (
        <div className="cards-container">
            {datos.map(data => (
                <div key={data.id} className="card-widget">
                    <div className="card-left">
                        <span className="card-title">{data.title}</span>
                        <span className="card-counter">{data.count}</span>
                    </div>
                    <div className="card-right">
                        {data.icon}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cards;
