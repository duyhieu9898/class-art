import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import ActivityCarousel from "@/components/sections/about/activity-carousel";
import { getFooterInfo } from "@/actions/info";
import { getImageUrl } from "@/lib/supabase/storage";

export const metadata: Metadata = {
    title: "Giới thiệu | REF ACADEMY",
    description:
        "Khám phá sứ mệnh, triết lý giáo dục, văn hóa khác biệt và lịch sử phát triển của REF ACADEMY - Đơn vị tiên phong đào tạo thiết kế ứng dụng AI tại Đà Nẵng.",
    openGraph: {
        title: "Giới thiệu | REF ACADEMY",
        description:
            "Khám phá sứ mệnh, triết lý giáo dục, văn hóa khác biệt và lịch sử phát triển của REF ACADEMY - Đơn vị tiên phong đào tạo thiết kế ứng dụng AI tại Đà Nẵng.",
        images: ["/images/hero-banner.png"],
    },
};

export default async function GioiThieuPage() {
    const info = await getFooterInfo();

    // Hero section
    const heroImage = info?.hero_image_url
        ? getImageUrl(info.hero_image_url)
        : "/images/about/hero-bg.png";
    const heroMission =
        info?.hero_mission ||
        "Cung cấp nhân lực chất lượng giúp đỡ học viên có thể tiếp cận cơ hội việc làm.";
    const heroPhilosophy =
        info?.hero_philosophy ||
        "Giáo dục đào tạo là tổ chức và quản trị việc tự học của người học.";
    const heroCulture =
        info?.hero_culture ||
        "Tôn trọng, Đổi mới, Đồng đội, Chí công\nGương mẫu, Sáng suốt\nHọc thật, thi thật, thành công thật\nLàm khác để làm tốt.";

    // About section
    const aboutTitle = info?.about_title || "Về REF ACADEMY";
    const aboutDesc1 =
        info?.about_description_1 ||
        "REF ACADEMY là đơn vị tiên phong đào tạo sử dụng trí tuệ nhân tạo tích hợp công nghệ vào trong thiết kế";
    const aboutDesc2 =
        info?.about_description_2 ||
        "Với mong muốn đồng hành cùng người trẻ trong việc ứng dụng trí tuệ nhân tạo vào trong thiết kế, với hy vọng giúp đỡ các học viên tự tin trên con đường theo đuổi trong con đường thiết kế đồ họa.";
    const aboutImage = info?.about_image_url
        ? getImageUrl(info.about_image_url)
        : "/images/about/about-banner.png";

    // History section
    const historyImage = info?.history_image_url
        ? getImageUrl(info.history_image_url)
        : "/images/about/history-banner.png";
    let milestones = [
        { year: "7/2004", desc: "Thành lập REF ACADEMY" },
        { year: "2009", desc: "Hi4 Coffee" },
        { year: "2011", desc: "193 Nguyễn Văn Linh, TP. Đà Nẵng" },
        { year: "2019", desc: "35 Nại Nam, TP. Đà Nẵng" },
    ];
    if (info?.history_milestones && info.history_milestones.length > 0) {
        milestones = info.history_milestones;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 px-5">
                {/* Hero - Sứ mệnh */}
                <section className="relative mx-auto mt-10 h-[550px] w-full max-w-[1600px] overflow-hidden rounded-[20px] md:h-[785px]">
                    <Image
                        src={heroImage}
                        alt="REF Academy Campus"
                        fill
                        sizes="100vw"
                        className="rounded-[20px] object-cover"
                    />
                    <div className="absolute inset-0 rounded-[20px] bg-black/15" />
                    <div className="absolute inset-y-0 left-0 flex w-full items-center rounded-l-[20px] bg-[rgba(24,24,24,0.85)] md:w-[35%]">
                        <div className="space-y-6 p-6 text-white md:p-10">
                            <div>
                                <h2 className="text-3xl font-semibold text-[#486aff]">Sứ mệnh</h2>
                                <p className="mt-2 leading-8 text-gray-100">{heroMission}</p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-semibold text-[#486aff]">Triết lý giáo dục</h2>
                                <p className="mt-2 leading-8 text-gray-100">{heroPhilosophy}</p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-semibold text-[#486aff]">Văn hóa</h2>
                                <p className="mt-2 leading-8 text-gray-100 whitespace-pre-line">{heroCulture}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Về REF ACADEMY */}
                <section className="w-full py-8 md:py-16">
                    <div className="mx-auto max-w-[1600px]">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr]">
                            <div>
                                <h1 className="text-4xl leading-[64px] font-bold text-gray-800">{aboutTitle}</h1>
                                <p className="mt-2 text-base leading-relaxed text-black">{aboutDesc1}</p>
                                <p className="mt-3 text-base leading-relaxed text-black">{aboutDesc2}</p>
                            </div>
                            <div className="relative h-[508px] overflow-hidden rounded-[20px] bg-[#ffc404]">
                                <Image
                                    src={aboutImage}
                                    alt="REF Academy"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="rounded-[16px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Lịch Sử Hình Thành */}
                <section className="w-full py-8 md:py-16">
                    <div className="mx-auto max-w-[1600px]">
                        <h1 className="mb-4 text-4xl font-bold text-gray-800">Lịch Sử Hình Thành Phát Triển</h1>
                        <div className="relative mb-8 h-[550px] overflow-hidden rounded-[16px] bg-gray-200">
                            <Image
                                src={historyImage}
                                alt="Lịch sử hình thành REF Academy"
                                fill
                                sizes="100vw"
                                className="rounded-[16px] object-cover"
                            />
                        </div>
                        <div className="relative z-10 -mt-20 rounded-xl bg-white p-4 shadow-lg md:p-8">
                            <div className="grid auto-cols-fr grid-cols-2 gap-y-6 divide-x divide-gray-200 md:grid-flow-col">
                                {milestones.map((item, index) => (
                                    <div key={index} className="px-4 text-center">
                                        <p className="text-3xl leading-[48px] font-semibold text-[#ffc404]">
                                            {item.year}
                                        </p>
                                        <p className="text-base text-black">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                <ActivityCarousel />
            </main>

            <Footer />
        </div>
    );
}
