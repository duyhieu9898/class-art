import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram, Globe, Building2, FileText } from "lucide-react";
import { getFooterInfo } from "@/actions/info";

export default async function Footer() {
    const info = await getFooterInfo();

    const footerTitle =
        info?.footer_description || "REF Academy - Trung tâm đào tạo Thiết kế đồ họa, Hoạt hình 3D, VFX hàng đầu.";
    const address = info?.address || "Số 35 Nại Nam, P. Hòa Cường, Đà Nẵng";
    const phone = info?.phone || "0967 749 311";
    const email = info?.email || "refstudiodn@gmail.com";
    const facebookUrl = info?.facebook_url || "https://www.facebook.com/refstudiodn/";
    const portfolioUrl = info?.instagram_url || "https://artstation.com/thinh_le";
    const copyright = info?.copyright_text || "© 2026 REF Academy. All Rights Reserved.";

    return (
        <footer className="relative w-full overflow-hidden bg-[#030732] pt-8 text-white md:pt-16">
            {/* Subtle top divider line */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

            <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-12">
                {/* Top section: 3 Columns Grid */}
                <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-12 md:gap-8">
                    {/* Column 1: Brand & Description (5 cols) */}
                    <div className="space-y-6 md:col-span-5">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-black tracking-wider text-white">
                                REF <span className="text-[#ffc708]">ACADEMY</span>
                            </span>
                        </Link>
                        <p className="max-w-md text-sm leading-relaxed text-white/80">{footerTitle}</p>

                        {/* Social Media Links */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            {facebookUrl && (
                                <a
                                    href={facebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#384196]"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-[#384196]" />
                                    <span>Facebook</span>
                                </a>
                            )}
                            {portfolioUrl && (
                                <a
                                    href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#384196]"
                                    aria-label="Portfolio"
                                >
                                    <Globe className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-[#384196]" />
                                    <span>Portfolio</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Liên hệ (4 cols) */}
                    <div className="space-y-6 md:col-span-4">
                        <h4 className="border-l-4 border-[#ffc708] pl-3 text-lg font-bold tracking-wider text-white uppercase">
                            THÔNG TIN LIÊN HỆ
                        </h4>

                        <ul className="space-y-4 text-sm text-white/85">
                            <li className="flex items-start gap-3">
                                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-white/90" />
                                <span className="leading-relaxed">CÔNG TY TNHH REF ACADEMY</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FileText className="h-5 w-5 shrink-0 text-white/90" />
                                <span>Mã số thuế: 0402347756</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white/90" />
                                <span className="leading-relaxed">{address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 shrink-0 text-white/90" />
                                <span>Hotline: {phone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 shrink-0 text-white/90" />
                                <span className="break-all">{email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Liên kết nhanh (3 cols) */}
                    <div className="space-y-6 md:col-span-3">
                        <h4 className="border-l-4 border-white/40 pl-3 text-lg font-bold tracking-wider text-white uppercase">
                            LIÊN KẾT NHANH
                        </h4>

                        <ul className="grid grid-cols-2 gap-3 text-sm text-white/70 md:grid-cols-1">
                            <li>
                                <Link href="/" className="transition-all duration-200 hover:text-white hover:underline">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/gioi-thieu"
                                    className="transition-all duration-200 hover:text-white hover:underline"
                                >
                                    Giới thiệu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dao-tao"
                                    className="transition-all duration-200 hover:text-white hover:underline"
                                >
                                    Đào tạo
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tuyen-sinh"
                                    className="transition-all duration-200 hover:text-white hover:underline"
                                >
                                    Tuyển sinh
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tin-tuc"
                                    className="transition-all duration-200 hover:text-white hover:underline"
                                >
                                    Tin tức
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/nhan-vat"
                                    className="transition-all duration-200 hover:text-white hover:underline"
                                >
                                    Nhân vật
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section: Divider & Copyright */}
                <div className="mt-2 border-t border-white/10 py-4 text-center">
                    <p className="text-[14px] text-white/60">{copyright}</p>
                </div>
            </div>
        </footer>
    );
}
