import React from 'react';

const Footer = () => {
    return (
        <div className="bg-gray-20">
            <footer className="max-w-6xl mx-auto mt-20 ">
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
                <a href="#" target="_blank" >Desarrollado Por <strong>Js-Webs</strong></a>
            </div>
        </div>
    );
}

export default Footer;
