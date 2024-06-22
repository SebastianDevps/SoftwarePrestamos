import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navApp/Navbar";
import { GiMoneyStack } from "react-icons/gi";
import { MdMoney } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";

const Content = () => {

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Actualiza cada segundo

    return () => {
      clearInterval(interval);
    };
  }, []);

  const stats = [
    {
      title: "Capital Circulando",
      value: "$10,243.00",
      icon: <GiMoneyStack className="fill-current text-green-400 text-4xl text-accent-green" />,
    },
    {
      title: "Capital Disponibe",
      value: "23,456",
      icon: <MdMoney className="fill-current text-green-400 text-4xl text-accent-red" />,
    },
    {
      title: "Prestamos Activos",
      value: "1,234",
      icon: <GiTakeMyMoney className="fill-current text-blue-400 text-4xl text-accent-green" />,
    },
    {
      title: "Clientes Registrados",
      value: "$10,243.00",
      icon: <FaUserFriends className="fill-current text-blue-400 text-4xl text-accent-green" />,
    }
  ];

  // Simulated data for loan payments
  const loanPayments = [
    {
      id: 1,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 1,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pagado",
    },
    {
      id: 1,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 1,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 1,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pending",
    },
    {
      id: 1,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pending",
    },
    {
      id: 1,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pending",
    },
    {
      id: 1,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pending",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex p-4 flex-wrap gap-6 lg:grid lg:grid-cols-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-gray-200 rounded-full">
                {stat.icon}
              </div>
              <div className="ml-4">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-2sm text-gray-500">{stat.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 ml-4 mr-4 bg-gray-100 rounded-lg shadow-md mt-2">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-xl font-semibold">Pagos Del Dia</h2>
          <div className="flex items-center">
            <span className="mr-4 text-2sm text-gray-800">
              {currentDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className="text-2sm text-gray-800">
              {currentDateTime.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto max-w-full">
          <div className="overflow-y-auto max-h-[220px]">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-gray-200">
                <tr className="text-sm font-semibold text-gray-700">
                  <th className="py-2 px-4 border-b border-gray-300">Cliente</th>
                  <th className="py-2 px-4 border-b border-gray-300"># Documento</th>
                  <th className="py-2 px-4 border-b border-gray-300">Numero</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-right">Valor</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-center">Estado</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {loanPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-300">
                    <td className="py-2 px-4">{payment.customerName}</td>
                    <td className="py-2 px-4">{payment.customerId}</td>
                    <td className="py-2 px-4">{payment.phoneNumber}</td>
                    <td className="py-2 px-4 text-right">{payment.amount}</td>
                    <td className="py-2 px-4 text-center">
                      <span className={`py-1 px-3 rounded-full text-xs font-medium 
                                ${payment.status === 'pagado' ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button className="py-1 px-3 rounded-lg bg-gray-200 text-sm text-gray-700">Pagar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Content;
