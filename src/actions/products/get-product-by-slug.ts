"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                productImage: {
                    select: {
                        url: true,
                    },
                },
            },
            where: {
                slug: slug,
            },
        });

        if (!product) return null;

        const { productImage, ...rest } = product;

        return {
            ...rest,
            images: product.productImage.map((image) => image.url),
        };
    } catch (error) {
        console.log("error ", error);
        throw new Error("Hubo un problema al obtener el producto");
    }
};
