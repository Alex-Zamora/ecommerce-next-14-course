"use client";

import React, { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);
    const addProductToCart = useCartStore((state) => state.addProductToCart);

    const addToCart = () => {
        setPosted(true);
        if (!size) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            image: product.images[0],
            size: size,
        };

        addProductToCart(cartProduct);

        // restart values
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    };

    return (
        <>
            {posted && !size ? (
                <span className="mt-2 text-red-500 ">
                    Debe de seleccionar una talla
                </span>
            ) : null}

            {/* Selector de Tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={(size) => setSize(size)}
            />

            {/* Selector de Cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={(quantity) => setQuantity(quantity)}
            />

            {/* Button */}
            <button onClick={addToCart} className="btn-primary my-5">
                Agregar al carrito
            </button>
        </>
    );
};
