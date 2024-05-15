"use client";

import React, { useEffect, useState } from "react";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState(0),
        [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStock();
    }, []);

    const getStock = async () => {
        setIsLoading(true);
        try {
            const stock = await getStockBySlug(slug);
            setStock(stock);
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
            {isLoading ? (
                <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
            ) : (
                <div>stock: {stock}</div>
            )}
        </h1>
    );
};
