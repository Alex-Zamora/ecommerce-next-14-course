"use client";

import Link from "next/link";
import clsx from "clsx";
import {
    IoCloseOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoTicketOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import { logout } from "@/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const linksMenu = [
    {
        name: "Perfil",
        url: "/profile",
        icon: <IoPersonOutline size={30} />,
    },
    {
        name: "Ordenes",
        url: "/orders",
        icon: <IoTicketOutline size={30} />,
    },
];

const adminMenuItems = [
    {
        name: "Productos",
        url: "/products",
        icon: <IoShirtOutline size={30} />,
    },
    {
        name: "Usuarios",
        url: "/users",
        icon: <IoPeopleOutline size={30} />,
    },
];

export const Sidebar = () => {
    const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
    const closeMenu = useUIStore((state) => state.closeSideMenu);
    const { data: session } = useSession();
    const [isAthenticated, setIsAuthenticated] = useState(false);
    const isAdmin = session?.user.role === "admin";

    useEffect(() => {
        setIsAuthenticated(!!session?.user);
    }, [session?.user]);

    return (
        <div>
            {/* Background black */}
            {isSideMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
            )}

            {/* Blur */}
            {isSideMenuOpen && (
                <div
                    onClick={closeMenu}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                />
            )}

            {/* Sidemenu */}
            <nav
                className={clsx(
                    "overflow-y-scroll fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen,
                    }
                )}
            >
                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => closeMenu()}
                />

                {/* Input */}
                <div className="relative mt-14">
                    <IoSearchOutline
                        size={20}
                        className="absolute top-2 left-2"
                    />
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {isAthenticated &&
                    linksMenu.map((item) => (
                        <Link
                            href={item.url}
                            onClick={() => closeMenu()}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            {item.icon}
                            <span className="ml-3 text-xl"> {item.name}</span>
                        </Link>
                    ))}

                {/* Menú */}

                {isAthenticated ? (
                    <button
                        className="w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        onClick={() => {
                            logout();
                            closeMenu();
                        }}
                    >
                        <IoLogOutOutline size={30} />
                        <span className="ml-3 text-xl">Salir</span>
                    </button>
                ) : (
                    <Link
                        href="/auth/login"
                        onClick={() => closeMenu()}
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoLogInOutline size={30} />
                        <span className="ml-3 text-xl">Ingresar</span>
                    </Link>
                )}

                {/* Line Separator */}
                <div className="w-full h-px bg-gray-200 my-10" />

                {isAthenticated &&
                    isAdmin &&
                    adminMenuItems.map((item) => (
                        <Link
                            href={item.url}
                            onClick={() => closeMenu()}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            {item.icon}
                            <span className="ml-3 text-xl">{item.name}</span>
                        </Link>
                    ))}
            </nav>
        </div>
    );
};
