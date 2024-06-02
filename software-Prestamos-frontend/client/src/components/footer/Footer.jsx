import React from 'react';

const Footer = () => {
    return (
        <div className="bg-gray-200">
            <footer className="max-w-6xl mx-auto mt-20 ">
                {/* <hr />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-10 px-4 gap-y-8">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-xl text-secondary-950">Nosotros</h1>
                        <ul className="mt-2 sm:mt-3 lg:mt-4 text-center space-y-1 sm:space-y-2 lg:space-y-3">
                            <li>
                                <a href="#planes" className="hover:underline block hover:text-primary-950">Planes</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-xl text-secondary-950">Sistemas</h1>
                        <ul className="mt-2 sm:mt-3 lg:mt-4 text-center space-y-1 sm:space-y-2 lg:space-y-3">
                            <li>
                                <a href="#software-pos" className="hover:underline block hover:text-primary-950">Software Prestamos</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-xl text-secondary-950">Soporte</h1>
                        <ul className="mt-2 sm:mt-3 lg:mt-4 text-center space-y-1 sm:space-y-2 lg:space-y-3">
                            <li>
                                <a href="#contacto" className="hover:underline block hover:text-primary-950">Contacto</a>
                            </li>
                            <li>
                                <a href="#pasos" className="hover:underline block hover:text-primary-950">Pasos a seguir</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-xl text-secondary-950">Síguenos en</h1>
                        <ul className="mt-2 sm:mt-3 lg:mt-4 space-y-1 sm:space-y-2 lg:space-y-3">
                            <li>
                                <a href="https://www.facebook.com/factusfacturacion" className="flex items-center">
                                    <i className="ico icon-facebook text-xl text-primary-950 mr-2"></i>
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/factusfacturacion/" className="flex items-center">
                                    <i className="ico icon-instagram text-xl text-primary-950 mr-2"></i>
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr /> */}
                <div className="py-8 px-4 flex justify-between items-center">
                    <img className="w-10" src="vite.svg" alt="Logo" />
                    <span className="text-sm">Copyright © 2024</span>
                </div>
                <div className="flex justify-center mb-5 px-4">
                    <a className="border border-gray-400 rounded-lg w-80 p-1 mr-2 text-center block" href="#">
                        Términos y Condiciones
                    </a>
                    <a className="border border-gray-400 rounded-lg w-80 p-1 text-center ml-2 block" href="#">
                        Política y Privacidad de Datos
                    </a>
                </div>
            </footer>
            <div className="flex items-center justify-center py-4 bg-primary-950 text-gray-400">
                <a href="#" target="_blank" >Hecho por SebastianDevps</a>
            </div>
        </div>
    );
}

export default Footer;
