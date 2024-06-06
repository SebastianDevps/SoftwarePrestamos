import React, { useEffect, useState } from 'react';
import { MdDashboardCustomize } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { FaUserShield } from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiSolidReport } from "react-icons/bi";
import { IoMdExit } from "react-icons/io";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sidebar = () => {
    const [sidebarClass, setSidebarClass] = useState("");

    return (
        <sidebar className="flex flex-col justify-between gap-8 bg-gray-100 min-h-screen max-h-screen w-full p-4 overflow-y-scroll">
            {/* <!-- Top --> */}
            <section>
                {/* <!-- Logo --> */}
                <div className="logo flex items-center gap-4 mb-8">
                    <img
                        src="vite.svg"
                        className="w-10 h-10 p-2 rounded-xl"
                    />
                    <div>
                        <h3 className="font-bold text-indigo-600">Prestacol</h3>
                        <p className="text-gray-800 text-xs">
                            Desarrollo de aplicaciones
                        </p>
                    </div>
                </div>
                
                <hr className="my-8" />
                <h5 className="uppercase font-semibold text-xs text-indigo-600 tracking-[2px] mb-4">
                    Menu
                </h5>
                <ul>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                                />
                            </svg>
                            <span>Documentos</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                />
                            </svg>
                            <span>Tickets</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                />
                            </svg>
                            <span>Usuarios</span>
                        </a>
                    </li>
                </ul>
                <h5 className="uppercase font-semibold text-xs text-indigo-600 tracking-[2px] my-4">
                    Proyectos
                </h5>
                <ul>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-indigo-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                                />
                            </svg>
                            <span>Personales</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-sky-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                                />
                            </svg>
                            <span>Negocio</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-purple-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                                />
                            </svg>
                            <span>Viajes</span>
                        </a>
                    </li>
                </ul>
            </section>
            {/* <!-- Bottom --> */}
            <section>
                {/* <!-- Settings --> */}
                <ul className="my-4">
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 p-2 text-gray-500 hover:bg-gray-200 transition-colors rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span>Ajustes</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-4 p-2 text-gray-500 hover:bg-gray-200 transition-colors rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                                />
                            </svg>
                            <span>Ayuda</span>
                        </a>
                    </li>
                </ul>
                {/* <!-- Info user --> */}
                <div className="flex items-center gap-4 pt-4 border-t">
                    <img
                        src="https://res.cloudinary.com/juandevps/image/upload/v1714952083/upload/ujpasc23kv04q2poouju.png"
                        className="w-10 h-10 object-cover rounded-xl ring-4 ring-gray-200"
                    />
                    <div>
                        <h3 className="font-bold text-gray-900">
                            Sebastian Guerra
                        </h3>
                        <p className="text-gray-800 text-xs">Desarrollador fullstack</p>
                    </div>
                </div>
            </section>
        </sidebar>
    );
};

export default Sidebar;
