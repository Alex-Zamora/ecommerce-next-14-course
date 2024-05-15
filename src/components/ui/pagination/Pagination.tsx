"use client";

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
}

export const Pagination = ({
    currentPage,
    totalPages,
    totalProducts,
}: Props) => {
    const pathname = usePathname(),
        searchParams = useSearchParams();

    const allPages = generatePaginationNumbers(
        currentPage,
        totalProducts,
        totalPages
    );

    const createPageUrl = (pageNumber: number | string) => {
        if (+pageNumber <= 0) return pathname;

        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex justify-center text-center mt-10 mb-32">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item disabled">
                        <Link
                            className={clsx(
                                "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                {
                                    "pointer-events-none text-gray-400":
                                        currentPage === 1,
                                }
                            )}
                            href={createPageUrl(currentPage - 1)}
                            aria-disabled={currentPage === 1}
                        >
                            <IoChevronBackOutline size={30} />
                        </Link>
                    </li>

                    {allPages.map((page, index) => (
                        <li key={`${page}-${index}`} className="page-item">
                            <Link
                                className={clsx(
                                    "page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-blue-200 focus:shadow-none",
                                    {
                                        "bg-blue-500 shadow-sm text-white hover:bg-blue-600 hover:text-white":
                                            page === currentPage,
                                        "pointer-events-none": page === "...",
                                    }
                                )}
                                href={createPageUrl(page)}
                            >
                                {page}
                            </Link>
                        </li>
                    ))}

                    <li className="page-item">
                        <Link
                            className={clsx(
                                "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                {
                                    "pointer-events-none text-gray-400":
                                        currentPage === totalPages,
                                }
                            )}
                            href={createPageUrl(currentPage + 1)}
                            aria-disabled={currentPage === totalPages}
                        >
                            <IoChevronForwardOutline size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
