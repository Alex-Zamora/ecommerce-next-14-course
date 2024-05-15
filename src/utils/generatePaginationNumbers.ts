export const generatePaginationNumbers = (
    currentPage: number,
    totalProducts: number,
    totalPages: number
) => {
    // console.log("totalProducts ", totalProducts);
    // mostrar todas las páginas sin puntos suspensivos
    // si es totalpage es menor igual a 7
    if (currentPage <= 6) {
        return Array.from(
            { length: totalPages > 10 ? 10 : totalPages },
            (_, index) => index + 1
        );
    }

    // Si la pagina actual entre las primeras 3 páginas
    // mostrar las primeras 3, puntos suspensivos y las ultimas 2
    if (currentPage >= 7) {
        let range = [1, "..."];

        const start = Math.max(1, currentPage - 3); // Para asegurarse de que no sea menor que 1
        const end = Math.min(totalPages, currentPage + 4); // Para asegurarse de que no sea mayor que el total

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        // const arrayRest = Array.from(
        //     { length: totalPages },
        //     (_, index) => index + 1
        // ).slice(-6);

        return range;
    }

    return [];
};
