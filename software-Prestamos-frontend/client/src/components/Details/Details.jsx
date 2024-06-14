import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";

const Details = ({ onClick, cliente }) => {
    if (!cliente) return <div className="text-center text-red-500 font-bold">No hay datos disponibles</div>;

    const getClienteEstadoClass = (estado) => {
        return estado.toLowerCase() === 'activo' ? 'font-bold text-green-700' : 'font-bold text-red-500';
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
                <button onClick={onClick} className="absolute top-2 right-2 text-3xl text-gray-700 hover:text-red-500">
                    <IoIosCloseCircle />
                </button>
                <h2 className="text-2xl font-bold text-center mb-4">Datos del Cliente</h2>
                <div className="border p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full  border border-gray-300 mr-4">
                            <img
                                src="/vite.svg" // URL de la foto de perfil
                                alt="Foto de perfil"
                                className="w-full h-full object-cover filter grayscale"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="text-lg font-semibold">{cliente.nombre} {cliente.apellido}</div>
                            <div className="text-gray-600">{cliente.tipoDocumento}: {cliente.cedula}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-semibold text-gray-500"># Celular</div>
                            <div className="text-sm">{cliente.telefono}</div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-500">Dirección</div>
                            <div className="text-sm">{cliente.direccion}</div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-500">Fecha de Creación</div>
                            <div className="text-sm">{cliente.fechaCreacion}</div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-500">Fecha de Edición</div>
                            <div className="text-sm">{cliente.fechaEdicion}</div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-500">Correo Electronico</div>
                            <div className="text-sm">{cliente.correo}</div>
                        </div>
                        <div className={`rounded ${getClienteEstadoClass(cliente.estado)}`}>
                            <div className="text-sm font-semibold text-gray-500">Estado</div>
                            <div className="text-sm">{cliente.estado}</div>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center my-4">Datos del Préstamo</h2>
                <div className="max-h-64 overflow-y-auto">
                    {cliente.prestamos && cliente.prestamos.length > 0 ? (
                        <table className="w-full border-collapse text-sm text-gray-700">
                            <thead className="bg-gray-200">
                                <tr className="text-sm text-gray-600">
                                    <th className="py-2 px-4 border">Monto</th>
                                    <th className="py-2 px-4 border">Iva %</th>
                                    <th className="py-2 px-4 border">Monto a Pagar</th>
                                    <th className="py-2 px-4 border">Fecha Límite</th>
                                    <th className="py-2 px-4 border">Estado</th>
                                    <th className="py-2 px-4 border">Prestamista</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cliente.prestamos.map((prestamo, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 px-4">{formatCurrency(prestamo.monto)}</td>
                                        <td className="py-2 px-4">{prestamo.porcentaje}</td>
                                        <td className="py-2 px-4">{formatCurrency(prestamo.montoAPagar)}</td>
                                        <td className="py-2 px-4">{prestamo.fechaLimite}</td>
                                        <td className="py-2 px-4">{prestamo.estado}</td>
                                        <td className="py-2 px-4">{prestamo.prestamista}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-sm text-red-500 font-semibold mb-4">
                            Este cliente no tiene préstamos
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
    return formattedAmount;
}

export default Details;
