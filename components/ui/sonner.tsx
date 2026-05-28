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
                    error: "bg-red-500 text-white border-red-600",
                    success: "bg-green-500 text-white border-green-600",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
