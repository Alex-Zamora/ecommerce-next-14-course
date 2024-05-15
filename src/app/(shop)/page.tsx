export const revalidate = 60;

import { redirect } from "next/navigation";
import { getPaginatedProducts } from "@/actions";
import { ProductGrid, Title, Pagination } from "@/components";
// import { initialData } from "@/seed/seed";

// mock data
// const products = initialData.products;

interface Props {
    searchParams: {
        page?: string;
        pageSize?: string;
    };
}

export default async function Home({ searchParams }: Props) {
    const page = Number(searchParams?.page),
        currentPage = page >= 1 ? page : 1,
        pageSize = Number(searchParams?.pageSize) || 5,
        { data, totalPages, totalProducts } = await getPaginatedProducts({
            currentPage,
            pageSize,
        });

    if (data.length === 0) {
        redirect("/");
    }

    return (
        <>
            <Title
                title="Tienda"
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
