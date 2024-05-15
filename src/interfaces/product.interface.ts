export interface Product {
    id: string;
    title: string;
    description: string;
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    gender: Category;
    images: string[];
    // type: Type;
}

export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    size: Size;
}

export type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
