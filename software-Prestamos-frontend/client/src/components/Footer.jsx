import React from 'react';

const Footer = () => {
    return (
        <footer className="flex xl:flex-row flex-col  bg-gray-100 w-full p-4 items-center justify-between">

            <div className="flex flex-col gap-4 md:flex-row justify-between text-center items-center">
                <a className="border border-gray-500 rounded-lg p-2 text-center hover:bg-gray-700 transition-colors" href="#">
                    Términos y Condiciones
                </a>
                <a className="border border-gray-500 rounded-lg p-2 text-center hover:bg-gray-700 transition-colors" href="#">
                    Política y Privacidad de Datos
                </a>
            </div>
            <h1 className="text-sm md:text-base text-center items-center">Copyright © 2024. Todos los derechos reservados.</h1>
        </footer>
    );
}

export default Footer;
