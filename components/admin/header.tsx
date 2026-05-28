"use client";

import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/admin/auth";

interface HeaderProps {
    email: string;
}

export function Header({ email }: HeaderProps) {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{email}</span>
                <form action={logout}>
                    <Button variant="ghost" size="icon" type="submit" title="Đăng xuất">
                        <LogOut className="h-5 w-5" />
                    </Button>
                </form>
            </div>
        </header>
    );
}
