import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
    // 1. Delete previous records
    await Promise.all([
        prisma.user.deleteMany(),
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ]);

    const { categories, products, users } = initialData;

    //Users
    await prisma.user.createMany({
        data: users,
    });

    // categories
    const categoriesData = categories.map((name) => ({
        name,
    }));
    await prisma.category.createMany({
        data: categoriesData,
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name] = category.id;

        return map;
    }, {} as Record<string, string>);

    // products
    products.forEach(async (product) => {
        const { type, images, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
            },
        });

        const imagesData = images.map((image) => ({
            url: image,
            productId: dbProduct.id,
        }));

        await prisma.productImage.createMany({
            data: imagesData,
        });
    });

    console.log("Seed executed successfuly");
}

(() => {
    if (process.env.NODE_ENV === "production") return;
    main();
})();
