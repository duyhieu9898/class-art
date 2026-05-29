"use client";

import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RegistrationSuccessModal from "@/components/common/registration-success-modal";

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 11,
        minutes: 59,
        seconds: 52,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }
                if (hours < 0) {
                    hours = 23;
                    days--;
                }
                if (days < 0) {
                    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const items = [
        { value: timeLeft.days, label: "Ngày" },
        { value: timeLeft.hours, label: "Giờ" },
        { value: timeLeft.minutes, label: "Phút" },
        { value: timeLeft.seconds, label: "Giây" },
    ];

    return (
        <div className="flex gap-2">
            {items.map((item) => (
                <div key={item.label} className="text-center">
                    <div className="flex h-15 w-16.25 items-center justify-center rounded-[17px] bg-[#384196] md:h-17 md:w-18.75">
                        <span className="text-2xl text-white md:text-3xl">{String(item.value).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-[#384196]">{item.label}</p>
                </div>
            ))}
        </div>
    );
}

export default function RegistrationSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [percentDiscount, setPercentDiscount] = useState<number | undefined>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const fullName = formData.get("fullName") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        const voucher = formData.get("voucher") as string;
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
                voucher: voucher || undefined,
                formType: "Đăng ký khóa học",
                sourcePage: window.location.pathname,
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                setPercentDiscount(result.percentDiscount);
                setIsModalOpen(true);
                form.reset();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="dang-ky"
            className="relative w-full overflow-hidden"
            style={{
                background: "linear-gradient(to bottom, #384196, #030732)",
            }}
        >
            {/* Background city image - bottom */}
            <div className="absolute bottom-[5] left-1/2 z-10 hidden h-85 w-300 -translate-x-1/2 md:block">
                <Image
                    src="/images/registration-city.png"
                    alt=""
                    fill
                    sizes="1200px"
                    className="object-contain object-bottom"
                    aria-hidden="true"
                />
            </div>

            {/* Student image - absolute, same level as city */}
            <div className="absolute bottom-50 left-[calc(50%-500px)] z-0 hidden h-75 w-87.5 md:left-[calc(50%-450px)] md:block md:h-105 md:w-125">
                <Image
                    src="/images/registration-bg.png"
                    alt="Học viên REF Academy"
                    fill
                    sizes="(max-width: 768px) 350px, 500px"
                    className="object-contain object-bottom"
                />
            </div>

            <div className="relative z-10 mx-auto max-w-300 bg-[#f1711f] px-4 py-8 md:bg-transparent md:pt-24">
                <div className="grid grid-cols-1 md:gap-10 lg:grid-cols-2">
                    {/* Left side - Spacer for image + Countdown */}
                    <div className="mb-8 flex flex-col justify-end">
                        {/* Countdown */}
                        <div className="mx-auto max-w-100 lg:ml-25">
                            <h3 className="mb-3 text-lg font-bold text-white md:text-xl">
                                Đăng ký sớm nhận khuyến mãi
                            </h3>
                            <CountdownTimer />
                        </div>
                    </div>

                    {/* Right side - Title + Form */}
                    <div className="flex flex-col justify-end">
                        {/* Title */}
                        <div className="mb-4 text-center md:mb-20 md:text-left">
                            <h2 className="text-4xl leading-tight font-black text-[#fec508] md:text-6xl">
                                REF ACADEMY
                            </h2>
                            <div className="my-2 h-px w-full max-w-131.5 bg-[#fec508]" />
                            <p className="text-lg leading-tight font-bold text-[#fec508] md:text-2xl">
                                CÔNG NGHỆ AI TƯƠNG LAI
                                <br />
                                TƯ DUY VÀ ĐỘT PHÁ THIẾT KẾ
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="ml-auto max-w-117.5 justify-end space-y-3 md:mr-10">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <Input
                                    name="fullName"
                                    placeholder="Họ và Tên"
                                    required
                                    minLength={2}
                                    className="h-11.5 rounded-2xl border-0 bg-white text-sm"
                                />
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    required
                                    className="h-11.5 rounded-2xl border-0 bg-white text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <Input
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    type="tel"
                                    required
                                    pattern="[0-9]{9,}"
                                    title="Số điện thoại phải có ít nhất 9 chữ số"
                                    className="h-11.5 rounded-2xl border-0 bg-white text-sm"
                                />
                                <Input
                                    name="voucher"
                                    placeholder="Mã Voucher ( Nếu có )"
                                    className="h-11.5 rounded-2xl border-0 bg-white text-sm"
                                />
                            </div>

                            {/* Checkbox */}
                            <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2">
                                <input
                                    type="checkbox"
                                    id="agree"
                                    name="agreed"
                                    className="h-4 w-4 rounded-full border-gray-400"
                                />
                                <label htmlFor="agree" className="text-sm text-gray-600">
                                    Đồng ý với Quy định bảo vệ dữ liệu cá nhân
                                </label>
                            </div>

                            {/* Submit button */}
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="h-11.75 rounded-full bg-[#384196] px-10 text-base font-bold text-white uppercase hover:bg-[#2d3578] disabled:opacity-50"
                                >
                                    {isSubmitting ? "Đang gửi..." : "Đăng ký ngay"}
                                </Button>
                            </div>

                            {/* Privacy note */}
                            <p className="text-[11px] leading-relaxed text-white/80 italic">
                                Đồng ý để dữ liệu cá nhân của Anh/Chị được thu thập trên trang này, được xử lý và lưu
                                trữ bởi REF ACADEMY cho mục đích và theo điều kiện đã được công bố tại Quy định bảo vệ
                                dữ liệu cá nhân của REF{" "}
                                <a href="#" className="text-[#fec508] italic underline">
                                    tại đây
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            <RegistrationSuccessModal
                isOpen={isModalOpen}
                percentDiscount={percentDiscount}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
