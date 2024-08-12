import React from 'react';

const AboutUs = () => {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center">
                {/* Imagen */}
                <div className="md:w-1/2 w-full mb-10 md:mb-0">
                    <img 
                        src="https://via.placeholder.com/600x400" 
                        alt="About Us" 
                        className="rounded-lg shadow-lg object-cover w-full h-auto"
                    />
                </div>

                {/* Texto */}
                <div className="md:w-1/2 w-full md:pl-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Sobre Nosotros</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Somos una empresa dedicada a [descripción breve de la empresa]. Nuestro objetivo es brindar a nuestros clientes [objetivo o misión de la empresa]. Con años de experiencia en el sector, estamos comprometidos a ofrecer servicios de calidad y a superar las expectativas de nuestros clientes.
                    </p>
                    <p className="text-lg text-gray-600 mb-6">
                        Nuestro equipo está compuesto por profesionales apasionados y altamente capacitados, que trabajan día a día para crear soluciones innovadoras que respondan a las necesidades del mercado actual.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
