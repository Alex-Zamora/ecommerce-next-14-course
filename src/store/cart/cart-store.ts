import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];

    getTotalItems: () => number;

    getSummaryInformation: () => {
        subtotal: number;
        taxRate: number;
        total: number;
        itemsInCart: number;
    };

    addProductToCart: (product: CartProduct) => void;
    updateProduct: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            // REMOVE THIS FN
            getTotalItems: () => {
                const { cart } = get();

                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const { cart } = get();
                const subtotal = cart.reduce(
                    (subtotal, product) =>
                        product.price * product.quantity + subtotal,
                    0
                );
                const taxRate = subtotal * 0.15;
                const total = subtotal + taxRate;
                const itemsInCart = cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                );

                return {
                    subtotal,
                    taxRate,
                    total,
                    itemsInCart,
                };
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                const productInCart = cart.some(
                    (item) =>
                        item.id === product.id && item.size === product.size
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                const updateCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity,
                        };
                    }
                    return item;
                });

                set({ cart: updateCartProducts });
            },

            updateProduct: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: quantity,
                        };
                    }
                    return item;
                });

                set({ cart: updatedProducts });
            },

            removeProduct: (product: CartProduct) => {
                const { cart } = get();

                const availableProducts = cart.filter(
                    (item) =>
                        !(item.id === product.id && item.size === product.size)
                );

                set({ cart: availableProducts });
            },
        }),
        { name: "shopping-cart" }
    )
);

// addToCart: (product) => {
//     set((state) => {
//       const existingProductIndex = state.cart.findIndex((p) => p.id === product.id);

//       if (existingProductIndex !== -1) {
//         // Si el producto ya existe en el carrito, actualizamos su cantidad
//         const updatedCart = [...state.cart];
//         updatedCart[existingProductIndex].quantity += product.quantity;
//         return { cart: updatedCart };
//       } else {
//         // Si el producto no está en el carrito, lo agregamos
//         return { cart: [...state.cart, product] };
//       }
//     });
