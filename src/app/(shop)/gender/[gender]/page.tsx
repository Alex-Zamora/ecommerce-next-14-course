export const revalidate = 60;

import { getPaginatedProducts } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
    params: {
        gender: Category;
    };
    searchParams: {
        page?: string;
        pageSize?: string;
    };
}

export default async function GenderPage({ params, searchParams }: Props) {
    const { gender } = params,
        page = Number(searchParams?.page),
        currentPage = page >= 1 ? page : 1,
        pageSize = Number(searchParams?.pageSize) || 5,
        { data, totalPages, totalProducts } = await getPaginatedProducts({
            currentPage,
            pageSize,
            gender,
        });

    const labels: Record<Category, string> = {
        men: "para hombres",
        women: "para mujeres",
        kid: "para niños",
        unisex: "para todos",
    };

    // if ( id === 'kids' ) {
    //   notFound();
    // }

    // console.log("params ", params);
    // console.log("searchParams ", searchParams);

    return (
        <>
            <Title
                title={`Artículos de ${labels[gender]}`}
                subtitle="Todos los productos"
                className="mb-2"
            />

            <ProductGrid products={data} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalProducts={totalProducts}
            />
        </>
    );
}
