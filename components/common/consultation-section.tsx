"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RegistrationSuccessModal from "@/components/common/registration-success-modal";

interface ConsultationSectionProps {
    title?: string;
    subtitle?: string;
    imageSrc?: string;
    imageAlt?: string;
}

export default function ConsultationSection({
    title = "Hỗ trợ tư vấn tuyển sinh",
    subtitle = "Còn nhiều thắc mắc về học REF ACADEMY? Để lại thông tin bên dưới, tư vấn sẽ liên lạc hỗ trợ bạn nha",
    imageSrc = "/images/dao-tao/consultation-bg.png",
    imageAlt = "Tư vấn tuyển sinh",
}: ConsultationSectionProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const fullName = formData.get("fullName") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        const need = formData.get("need") as string;
        const agreed = formData.get("agreed");

        if (!agreed) {
            toast.error("Bạn cần đồng ý với quy định");
            return;
        }

        setIsSubmitting(true);
        try {
            const { submitRegistration } = await import("@/actions/registration");
            const result = await submitRegistration({
                fullName,
                email,
                phone,
                formType: need as "Đăng ký khóa học" | "Tư vấn khóa học" | "Tham quan cơ sở",
                sourcePage: window.location.pathname,
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                setIsModalOpen(true);
                form.reset();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="tu-van-tuyen-sinh" className="w-full scroll-mt-[100px] pb-[75px]">
            <div className="relative mx-auto max-w-[1600px] rounded-[30px]">
                {/* Title */}
                <div className="pt-12 pb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#333]">{title}</h2>
                </div>

                <div className="flex items-stretch gap-0">
                    {/* Left - Image */}
                    <div className="max-w-[800px] flex-1 pr-[15px] hidden md:block">
                        <div className="relative h-[690px] w-full overflow-hidden rounded-[20px] drop-shadow-[0px_4px_15px_rgba(48,58,158,0.15)]">
                            <div className="relative h-full w-full overflow-hidden rounded-[16px]">
                                <div className="absolute inset-[14px_12px_11px_12px] overflow-hidden rounded-[27px] border-[3px] border-black">
                                    <Image
                                        src={imageSrc}
                                        alt={imageAlt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="max-w-[800px] flex-1">
                        <div className="flex min-h-[610px] items-center justify-center rounded-[20px] bg-white px-[30px] pt-[40px] pb-[40px] drop-shadow-[0px_4px_15px_rgba(48,58,158,0.15)]">
                            <form onSubmit={handleSubmit} className="w-full space-y-[20px]">
                                {/* Subtitle */}
                                <p className="mb-[20px] text-center text-lg md:text-2xl font-medium text-[#333]">
                                    {subtitle}
                                </p>

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-[16px] font-bold text-[#112337]">
                                        Họ và tên{" "}
                                        <span className="text-[12px] font-medium text-[#c02b0a]">(Required)</span>
                                    </label>
                                    <Input
                                        name="fullName"
                                        required
                                        minLength={2}
                                        className="h-[42px] rounded-[4px] border-[#f2f4f7] shadow-[0px_1px_4px_0px_rgba(18,25,97,0.08)]"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-[16px] font-bold text-[#112337]">
                                        Số điện thoại{" "}
                                        <span className="text-[12px] font-medium text-[#c02b0a]">(Required)</span>
                                    </label>
                                    <Input
                                        name="phone"
                                        type="tel"
                                        required
                                        pattern="[0-9]{9,}"
                                        title="Số điện thoại phải có ít nhất 9 chữ số"
                                        className="h-[42px] rounded-[4px] border-[#f2f4f7] shadow-[0px_1px_4px_0px_rgba(18,25,97,0.08)]"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-[16px] font-bold text-[#112337]">
                                        Email <span className="text-[12px] font-medium text-[#c02b0a]">(Required)</span>
                                    </label>
                                    <Input
                                        name="email"
                                        type="email"
                                        required
                                        className="h-[42px] rounded-[4px] border-[#f2f4f7] shadow-[0px_1px_4px_0px_rgba(18,25,97,0.08)]"
                                    />
                                </div>

                                {/* Need */}
                                <div className="space-y-2">
                                    <label className="text-[16px] font-bold text-[#112337]">Nhu cầu</label>
                                    <select
                                        name="need"
                                        defaultValue="Đăng ký khóa học"
                                        className="h-[42px] w-full cursor-pointer appearance-none rounded-[4px] border border-[#f2f4f7] bg-white px-[13px] text-[16px] text-[#112337] shadow-[0px_1px_2px_0px_rgba(18,25,97,0.08)]"
                                    >
                                        <option value="Đăng ký khóa học">Đăng ký khóa học</option>
                                        <option value="Tư vấn khóa học">Tư vấn khóa học</option>
                                        <option value="Tham quan cơ sở">Tham quan cơ sở</option>
                                    </select>
                                </div>

                                {/* Checkbox */}
                                <div className="flex items-start gap-[12px]">
                                    <input
                                        type="checkbox"
                                        id="consultation-agree"
                                        name="agreed"
                                        className="mt-0 h-[42px] w-[20px] min-w-[20px] rounded-[4px] border border-[#f2f4f7] shadow-[0px_1px_4px_0px_rgba(18,25,97,0.08)]"
                                    />
                                    <label
                                        htmlFor="consultation-agree"
                                        className="text-[14px] leading-[20px] text-[#112337]"
                                    >
                                        Đồng ý để dữ liệu cá nhân của Anh/Chị được thu thập trên trang này, được xử lý
                                        và lưu trữ bởi Tổ chức giáo dục REF ACADEM

                                    </label>
                                </div>

                                {/* Submit */}
                                <div className="flex justify-center pt-[4px]">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="h-[42px] rounded-[3px] bg-[#204ce5] px-[41px] text-[16px] font-medium text-white shadow-[0px_1px_4px_0px_rgba(18,25,97,0.08)] hover:bg-[#1a3db8] disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Đang gửi..." : "Submit"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <RegistrationSuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
