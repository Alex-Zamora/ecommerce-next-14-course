"use client";

import { useEffect } from "react";
import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
    // El state tiene los valores que retorne la acción de login
    const [state, dispatch] = useFormState(authenticate, undefined);
    const searchParams = useSearchParams();
    const params = searchParams.get("origin");

    useEffect(() => {
        if (state === "Success") {
            if (!!params) return window.location.replace(params);
            window.location.replace("/");
        }
    }, [state]);

    return (
        <form action={dispatch} className="flex flex-col">
            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name="email"
            />

            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name="password"
            />

            {state === "Invalid credentials" ? (
                <div className="flex flex-row mb-2">
                    <IoInformationOutline className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">
                        Credenciales no son correctas
                    </p>
                </div>
            ) : null}

            <LoginButton />

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center"
            >
                Crear una nueva cuenta
            </Link>
        </form>
    );
};

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx({
                "btn-primary": !pending,
                "btn-disabled": pending,
            })}
            disabled={pending}
        >
            Ingresar
        </button>
    );
}
