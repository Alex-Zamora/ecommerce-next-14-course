"use client";

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
    name: string;
    email: string;
    password: string;
};

const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState("");
    // const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage("");
        const { name, email, password } = data;
        const res = await registerUser(name, email, password);

        if (!res.ok) {
            setErrorMessage(
                res.message || "Ocurrio un problema al registrarte"
            );
            return;
        }

        await login(email, password);

        // no refresca el session en los client components
        // router.replace("/");

        window.location.replace("/");
    };

    return (
        <>
            {!!errorMessage ? (
                <span className="text-red-500">{errorMessage}</span>
            ) : null}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <label htmlFor="email">Nombre completo</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            "border-red-500": !!errors.name,
                        }
                    )}
                    type="text"
                    // autoFocus
                    {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                    <span className="text-red-500">
                        * El nombre es obligatorio
                    </span>
                )}

                <label htmlFor="email">Correo electrónico</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            "border-red-500": !!errors.email,
                        }
                    )}
                    type="email"
                    {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                    })}
                />
                {errors.email?.type === "required" && (
                    <span className="text-red-500">
                        * El email es obligatorio
                    </span>
                )}

                <label htmlFor="email">Contraseña</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            "border-red-500": !!errors.password,
                        }
                    )}
                    type="password"
                    {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                    <span className="text-red-500">
                        * La contraseña es obligatoria
                    </span>
                )}

                <button className="btn-primary">Crear cuenta</button>

                {/* divisor l ine */}
                <div className="flex items-center my-5">
                    <div className="flex-1 border-t border-gray-500"></div>
                    <div className="px-2 text-gray-800">O</div>
                    <div className="flex-1 border-t border-gray-500"></div>
                </div>

                <Link href="/auth/login" className="btn-secondary text-center">
                    Ingresar
                </Link>
            </form>
        </>
    );
};

export default RegisterForm;
