import React, { useState, useEffect } from 'react';
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
      title: "Préstamos Activos",
      value: "0",
      icon: <GiTakeMyMoney className="fill-current text-blue-400 text-4xl text-accent-green" />,
    },
    {
      title: "Clientes Registrados",
      value: "0",
      icon: <FaUserFriends className="fill-current text-green-400 text-4xl text-accent-green" />,
    },
    {
      title: "Capital Disponible",
      value: "$0.00",
      icon: <MdMoney className="fill-current text-blue-400 text-4xl text-accent-red" />,
    },
    {
      title: "Capital Circulando",
      value: "$0.00",
      icon: <GiMoneyStack className="fill-current text-green-400 text-4xl text-accent-green" />,
    }
  ];

  const loanPayments = [
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
      id: 2,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 3,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pagado",
    },
    {
      id: 4,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 5,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 6,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 7,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 8,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 9,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 10,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
    {
      id: 11,
      dateTime: "2024-06-22 10:30 AM",
      customerName: "Eren Jaegar",
      customerId: "123456789",
      phoneNumber: "+57 234567890",
      amount: "$125,000.00",
      status: "pendiente",
    },
  ];

  return (
    <div className='bg-customMain'>
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-10 gap-5">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col p-4 bg-white rounded-3xl shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-gray-200 rounded-full">
                  {stat.icon}
                </div>
                <div className="ml-3">
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-3xl drop-shadow-xl ">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 ">
            <h2 className="text-xl font-semibold">Pagos Del Dia</h2>
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-800">
                {currentDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className="text-sm text-gray-800">
                {currentDateTime.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto max-w-full mt-4 ">
            <div className="overflow-y-auto max-h-[300px]">
              <table className="min-w-full bg-white border-collapse table-auto w-full">
                <thead className="sticky top-0 bg-white border-gray-300">
                  <tr className="text-sm font-semibold text-gray-700 text-center ">
                    <th className="border-gray-300 py-2">Cliente</th>
                    <th className="border-gray-300 py-2"># Documento</th>
                    <th className="border-gray-300 py-2">Número</th>
                    <th className="border-gray-300 py-2">Valor</th>
                    <th className="border-gray-300 py-2">Estado</th>
                    <th className="border-gray-300 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {loanPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-300 text-center">
                      <td className="">{payment.customerName}</td>
                      <td className="">{payment.customerId}</td>
                      <td className="">{payment.phoneNumber}</td>
                      <td className="">{payment.amount}</td>
                      <td className="">
                        <span className={`py-1 px-1 rounded-full text-xs font-medium 
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
    </div>
  );
}

export default Content;
