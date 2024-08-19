
// src/config/sidebarLinks.js

import {
    MdOutlineDashboardCustomize,
    MdOutlineCalculate ,
    MdOutlineAdminPanelSettings ,
} from "react-icons/md";
import { HiOutlineUserGroup  } from "react-icons/hi2";
import { TbReport } from "react-icons/tb";
import { HiOutlineBanknotes } from "react-icons/hi2";

export const sidebarLinks = [
    {
        id: "dashboard",
        title: "Principal",
        icon: MdOutlineDashboardCustomize,
        to: "/app",
        roles: ["ADMIN", "SUPER_ADMIN"],
    },
    {
        id: "prestamos",
        title: "Préstamos",
        icon: HiOutlineBanknotes,
        to: "/app/prestamos",
        roles: ["ADMIN", "SUPER_ADMIN"],
    },
    {
        id: "clientes",
        title: "Clientes",
        icon: HiOutlineUserGroup ,
        to: "/app/clientes",
        roles: ["ADMIN", "SUPER_ADMIN"],
    },
    {
        id: "reportes",
        title: "Reportes",
        icon: TbReport,
        to: "/app/reportes",
        roles: ["ADMIN", "SUPER_ADMIN"],
    },
    {
        id: "usuariosYPlanes",
        title: "Usuarios y planes",
        icon: MdOutlineAdminPanelSettings ,
        to: "/app/usuarios-y-planes",
        roles: ["SUPER_ADMIN"],
    },
    {
        id: "simularPrestamos",
        title: "Simular Préstamos",
        icon: MdOutlineCalculate ,
        to: "/app/simular",
        roles: ["ADMIN", "SUPER_ADMIN"],
    },
];



export const navLinks = [
    {
        id: "principal",
        title: "Principal",
    },
    {
        id: "planes",
        title: "Planes",
    },
    {
        id: "indicaciones",
        title: "Indicaciones",
    },
    {
        id: "sobre-nosotros",
        title: "Sobre Nosotros",
    }
];


export const planDetails = [

    {
        title: "Gratis",
        price: 0,
        detail: "Prueba gratis, por 24 horas",
        isPopular: false,
        benefits: [
            {
                id: 1,
                description: "Descripcion de beneficios"
            },
            {
                id: 2,
                description: "Descripcion de beneficios"
            },
            {
                id: 3,
                description: "Descripcion de beneficios"
            },
            {
                id: 4,
                description: "Descripcion de beneficios"
            }
        ]
    },
    {
        title: "Profesional",
        price: 100000,
        span: "COP anual",
        detail: "Ideal para empezar",
        isPopular: true,
        benefits: [
            {
                id: 1,
                description: "Descripcion de beneficios"
            },
            {
                id: 2,
                description: "Descripcion de beneficios"
            },
            {
                id: 3,
                description: "Descripcion de beneficios"
            },
            {
                id: 4,
                description: "Descripcion de beneficios"
            }
        ]
    },
    {
        title: "Premium",
        price: 200000,
        span: "COP anual",
        detail: "Disfruta de nuestros beneficios",
        isPopular: false,
        benefits: [
            {
                id: 1,
                description: "Descripcion de beneficios"
            },
            {
                id: 2,
                description: "Descripcion de beneficios"
            },
            {
                id: 3,
                description: "Descripcion de beneficios"
            },
            {
                id: 4,
                description: "Descripcion de beneficios"
            }
        ]
    }
]

export const steps = [
    {
        id: 1,
        image: "images/steps.png",
        title: "Realiza tu orden de compra",
        description: "Elige el plan que más se adapte a tus necesidades",
    },
    {
        id: 2,
        image: "images/steps.png",
        title: "Realiza el pago",
        description: "Activate en el mejor software para manejar tus prestamos",
    },
    {
        id: 3,
        image: "images/steps.png",
        title: "Confirmación y activación",
        description:
            "Deja todo en nuestras manos, en 24 horas estaras disfrutando de nuestro software",
    },
];