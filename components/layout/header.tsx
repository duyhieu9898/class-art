"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
    { label: "Trang Chủ", href: "/" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Đào tạo", href: "/dao-tao" },
    { label: "Tuyển sinh", href: "/tuyen-sinh" },
    { label: "Tin tức & Sự kiện", href: "/tin-tuc" },
    { label: "Nhân vật", href: "/nhan-vat" },
];

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
        setMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
            <div className="mx-auto flex h-17.75 max-w-400 items-center justify-between px-4 lg:px-10">
                <div className="flex gap-2">
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="p-2 lg:hidden"
                        aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <Image src="/logo-ref.svg" alt="REF Academy" width={99} height={51} priority />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 lg:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-1 rounded-lg px-3 py-2 text-base font-bold text-gray-800 transition-colors hover:text-[#384196]"
                        >
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Desktop Search */}
                <form onSubmit={handleSearchSubmit} className="relative hidden w-61.25 items-center md:flex">
                    <input
                        type="text"
                        placeholder="Tìm kiếm.."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pr-12 pl-4 text-sm transition-colors outline-none focus:border-[#384196]"
                    />
                    <button
                        type="submit"
                        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-gray-100"
                        aria-label="Tìm kiếm"
                    >
                        <Search className="h-5 w-5 text-gray-600" />
                    </button>
                </form>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 top-17.75 z-40 bg-black/40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-17.75 left-0 z-50 h-[calc(100dvh-4.4375rem)] w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <nav className="flex flex-col px-4 pt-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="border-b border-gray-100 py-3 text-base font-bold text-gray-800 transition-colors hover:text-[#384196]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="relative mx-4 mt-4 md:hidden">
                    <input
                        type="text"
                        placeholder="Tìm kiếm.."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pr-12 pl-4 text-sm transition-colors outline-none focus:border-[#384196]"
                    />
                    <button
                        type="submit"
                        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-gray-100"
                        aria-label="Tìm kiếm"
                    >
                        <Search className="h-5 w-5 text-gray-600" />
                    </button>
                </form>
            </div>
        </header>
    );
}
