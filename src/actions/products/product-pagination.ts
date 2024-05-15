"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
    currentPage?: number;
    pageSize?: number;
    gender?: string | null;
}

export const getPaginatedProducts = async ({
    currentPage = 1,
    pageSize = 12,
    gender = null,
}: PaginationOptions) => {
    if (isNaN(Number(currentPage))) currentPage = 1;
    if (currentPage < 1) currentPage = 1;
    const isGender = gender !== null ? (gender as Gender) : {};

    try {
        // 1. get all products
        const offset = (currentPage - 1) * pageSize;
        const products = await prisma.product.findMany({
            skip: offset,
            take: pageSize,
            include: {
                productImage: {
                    take: 2,
                    select: {
                        url: true,
                    },
                },
            },
            where: {
                gender: isGender,
            },
        });

        // 2. get page total
        const totalProducts = await prisma.product.count({
            where: {
                gender: isGender,
            },
        });
        const totalPages = Math.ceil(totalProducts / pageSize);

        return {
            // currentPage: page,
            totalPages,
            totalProducts,
            data: products.map((product) => ({
                ...product,
                images: product.productImage.map((image) => image.url),
            })),
        };
    } catch (error) {
        console.log(error);
        throw new Error("Error when try get the products");
    }
};
