"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";

const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore((state) => state.cart);
    const updateProduct = useCartStore((state) => state.updateProduct);
    const removeProduct = useCartStore((state) => state.removeProduct);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 400);
    }, []);

    if (!loaded)
        return (
            <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
                <div className="flex flex-col w-[1000px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
                        {/* Carrito */}
                        <div className="flex flex-col">
                            {/* Items */}
                            <div className="h-4 bg-gray-300 rounded w-full animate-pulse mt-5"></div>
                            <div className="h-4 bg-gray-300 rounded w-full animate-pulse mt-5"></div>
                            <div className="h-4 bg-gray-300 rounded w-full animate-pulse mt-5"></div>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <>
            {productsInCart.map((product) => (
                <div
                    key={`${product.slug}-${product.size}`}
                    className="flex mb-5"
                >
                    <Link href={`/product/${product.slug}`}>
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: "100px",
                                height: "100px",
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />
                    </Link>

                    <div>
                        <Link
                            href={`/product/${product.slug}`}
                            className="hover:underline"
                        >
                            {product.title}
                        </Link>
                        <p>{product.size}</p>
                        <p>${product.price}</p>

                        <QuantitySelector
                            quantity={product.quantity}
                            onQuantityChanged={(quantity) =>
                                updateProduct(product, quantity)
                            }
                        />

                        <button
                            className="underline mt-3"
                            onClick={() => removeProduct(product)}
                        >
                            Remover
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductsInCart;
