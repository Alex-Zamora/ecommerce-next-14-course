"use server";

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string) => {
    try {
        // sirve para demorar más el skeleton
        // await sleep(1.2);

        const stock = await prisma.product.findFirst({
            select: { inStock: true },
            where: { slug },
        });

        return stock?.inStock ?? 0;
    } catch (error) {
        console.log("error ", error);
        throw new Error("Hubo un problema al obtener el stock");
    }
};
