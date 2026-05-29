"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, BookOpen, Handshake, Info, TicketPercent } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Tổng quan", href: "/admin", icon: LayoutDashboard },
    { label: "Bài viết", href: "/admin/posts", icon: FileText },
    { label: "Đăng ký", href: "/admin/registrations", icon: Users },
    { label: "Voucher", href: "/admin/vouchers", icon: TicketPercent },
    { label: "Khóa học", href: "/admin/courses", icon: BookOpen },
    { label: "Đối tác", href: "/admin/partners", icon: Handshake },
    { label: "Thông tin Footer", href: "/admin/info", icon: Info },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-64 flex-col border-r bg-white md:flex">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/admin" className="text-xl font-bold text-[#363E91]">
                    REF ACADEMY
                </Link>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive ? "bg-[#363E91] text-white" : "text-gray-700 hover:bg-gray-100"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
