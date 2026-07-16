"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="light"
            className="toaster group"
            position="top-right"
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    error: "group-[.toaster]:!bg-[#FDE8E8] group-[.toaster]:!text-[#9B1C1C] group-[.toaster]:!border-[#F8B4B4]",
                    success:
                        "group-[.toaster]:!bg-[#EAF6EC] group-[.toaster]:!text-[#1E4620] group-[.toaster]:!border-[#D1E7DD]",
                    info: "group-[.toaster]:!bg-[#EBF5FE] group-[.toaster]:!text-[#1E429F] group-[.toaster]:!border-[#C3DDFD]",
                    warning:
                        "group-[.toaster]:!bg-[#FEF9EC] group-[.toaster]:!text-[#723B10] group-[.toaster]:!border-[#FCE8B2]",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
