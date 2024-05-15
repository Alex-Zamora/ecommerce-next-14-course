"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false);
    const { total, subtotal, taxRate, itemsInCart } = useCartStore((state) =>
        state.getSummaryInformation()
    );

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 400);
    }, []);

    if (!loaded)
        return (
            <div>
                <div className="grid grid-cols-2 mt-5">
                    <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>

                    <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mt-5"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mt-5"></div>

                    <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mt-5"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mt-5"></div>

                    <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mt-5"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mt-5"></div>
                </div>
            </div>
        );

    return (
        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">
                {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
            </span>

            <span>Subtotal</span>
            <span className="text-right"> {currencyFormat(subtotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(taxRate)}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">
                {currencyFormat(total)}
            </span>
        </div>
    );
};
