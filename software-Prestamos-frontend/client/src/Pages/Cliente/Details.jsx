import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";

// Funciones de formato integradas en el componente
const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-CO', { dateStyle: 'short' }).format(new Date(date));
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

const getClienteEstadoClass = (estadoCliente) => {
    return estadoCliente.toLowerCase() === 'activo' ? 'text-green-600' : 'text-red-600';
}

const Details = ({ onClick, cliente }) => {
    if (!cliente) return <div className="text-center text-red-500 font-bold">No hay datos disponibles</div>;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl border border-gray-300">
                <button
                    onClick={onClick}
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 transition"
                >
                    <IoIosCloseCircle />
                </button>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Detalles del Cliente</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Información del Cliente */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
                        <div className="flex items-center mb-6">
                            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center text-gray-500">
                                <span className="text-2xl uppercase font-bold">{cliente.nombre[0]}</span>
                            </div>
                            <div>
                                <div className="text-lg font-medium text-gray-800">{cliente.nombre} {cliente.apellido}</div>
                                <div className="text-sm text-gray-600">{cliente.tipoDocumento}: {cliente.numDocumento}</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-gray-600">Celular</div>
                                <div className="text-sm text-gray-700">{cliente.telefono}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-600">Dirección</div>
                                <div className="text-sm text-gray-700">{cliente.direccion}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-600">Fecha de Creación</div>
                                <div className="text-sm text-gray-700">{formatDate(cliente.fechaCreacion)}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-600">Fecha de Edición</div>
                                <div className="text-sm text-gray-700">{formatDate(cliente.fechaEdicion)}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-600">Correo Electrónico</div>
                                <div className="text-sm text-gray-700">{cliente.correo}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-600">Estado</div>
                                <div className={`text-sm ${getClienteEstadoClass(cliente.estadoCliente)}`}>{cliente.estadoCliente}</div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de Préstamos */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Préstamos del Cliente</h3>
                        {cliente.prestamos && cliente.prestamos.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-gray-600 border-collapse">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="py-2 px-3 border-b">Monto</th>
                                            <th className="py-2 px-3 border-b">IVA %</th>
                                            <th className="py-2 px-3 border-b">Monto a Pagar</th>
                                            <th className="py-2 px-3 border-b">Fecha Límite</th>
                                            <th className="py-2 px-3 border-b">Estado</th>
                                            <th className="py-2 px-3 border-b">Prestamista</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cliente.prestamos.map((prestamo, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="py-2 px-3">{formatCurrency(prestamo.monto)}</td>
                                                <td className="py-2 px-3">{prestamo.porcentaje}</td>
                                                <td className="py-2 px-3">{formatCurrency(prestamo.montoAPagar)}</td>
                                                <td className="py-2 px-3">{formatDate(prestamo.fechaLimite)}</td>
                                                <td className="py-2 px-3">{prestamo.estado}</td>
                                                <td className="py-2 px-3">{prestamo.prestamista}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center text-sm text-gray-500 mt-4">
                                Este cliente no tiene préstamos
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
