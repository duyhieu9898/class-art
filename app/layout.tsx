import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SnowfallEffect } from "@/components/common/snowfall-effect";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin", "vietnamese"],
    weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
    title: "REF ACADEMY - Học viện Đào tạo Trí tuệ Nhân tạo & Thiết kế",
    description:
        "Lộ trình đào tạo thực chiến bài bản, REF ACADEMY trang bị cho bạn nền tảng kỹ năng sử dụng trí tuệ nhân tạo để tự tin gia nhập thị trường việc làm",
    keywords: ["REF ACADEMY", "AI", "Thiết kế đồ họa", "Đào tạo", "Đà Nẵng"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body className={`${roboto.variable} font-sans antialiased`}>
                {children}
                <SnowfallEffect />
                <Toaster />
            </body>
        </html>
    );
}
