import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface StatsCardProps {
    label: string;
    value: number;
    icon?: React.ReactNode;
    description?: string;
    variant?: "primary" | "secondary" | "success" | "warning" | "info" | "danger";
}

export function StatsCard({ label, value, icon, description, variant = "primary" }: StatsCardProps) {
    const variantStyles = {
        primary: "bg-blue-50 text-[#363E91] border-blue-100",
        secondary: "bg-slate-50 text-slate-700 border-slate-100",
        success: "bg-emerald-50 text-emerald-700 border-emerald-100",
        warning: "bg-amber-50 text-amber-700 border-amber-100",
        info: "bg-sky-50 text-sky-700 border-sky-100",
        danger: "bg-rose-50 text-rose-700 border-rose-100",
    };

    const iconBgColor = variantStyles[variant];

    return (
        <Card className="group cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-md">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-500">{label}</p>
                        <p className="text-3xl font-extrabold tracking-tight text-gray-900">{value}</p>
                        {description && <p className="text-xs font-medium text-gray-400">{description}</p>}
                    </div>
                    {icon && (
                        <div
                            className={`rounded-xl border p-3 ${iconBgColor} transition-all duration-200 group-hover:scale-110`}
                        >
                            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
                                className: "h-6 w-6",
                            })}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
