"use client";

import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <nav className="flex items-center justify-center gap-[12.8px]">
            {pages.map((page, index) => {
                if (page === "...") {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className="flex h-[33.75px] min-w-[33.75px] items-center justify-center rounded-full bg-[#f1f1f1] text-[15px] font-bold text-[#363e91]"
                        >
                            …
                        </span>
                    );
                }

                const isActive = page === currentPage;
                const connector = basePath.includes("?") ? "&" : "?";
                const href = page === 1 ? basePath : `${basePath}${connector}page=${page}`;

                return (
                    <Link
                        key={page}
                        href={href}
                        className={`flex h-[33.75px] min-w-[33.75px] items-center justify-center rounded-full text-[15px] font-bold text-[#363e91] transition-colors ${
                            isActive ? "bg-[#ffc404]" : "bg-[#f1f1f1] hover:bg-[#ffc404]/50"
                        }`}
                    >
                        {page}
                    </Link>
                );
            })}

            {currentPage < totalPages && (
                <Link
                    href={`${basePath}${basePath.includes("?") ? "&" : "?"}page=${currentPage + 1}`}
                    className="flex h-[33.75px] min-w-[33.75px] items-center justify-center rounded-full bg-[#f1f1f1] transition-colors hover:bg-[#ffc404]/50"
                    aria-label="Trang tiếp"
                >
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="text-[#363e91]">
                        <path
                            d="M1 1L6 6L1 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            )}
        </nav>
    );
}
