import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PageBanner from "@/components/common/page-banner";
import ConsultationSection from "@/components/common/consultation-section";
import { getFooterInfo } from "@/actions/info";
import { getImageUrl } from "@/lib/supabase/storage";

export const metadata: Metadata = {
    title: "Thông tin Tuyển sinh | REF ACADEMY",
    description:
        "Cập nhật thông tin tuyển sinh mới nhất, đối tượng đăng ký học, quỹ học bổng và các chương trình ưu đãi học phí hấp dẫn dành cho học viên REF ACADEMY.",
    openGraph: {
        title: "Thông tin Tuyển sinh | REF ACADEMY",
        description:
            "Cập nhật thông tin tuyển sinh mới nhất, đối tượng đăng ký học, quỹ học bổng và các chương trình ưu đãi học phí hấp dẫn dành cho học viên REF ACADEMY.",
        images: ["/images/hero-banner.png"],
    },
};

const targets = [
    {
        title: "Học sinh THPT",
        description: "Yêu cái đẹp và đam mê sáng tạo, đang tìm kiếm một ngành học hợp xu thế.",
        imageSrc: "/images/tuyen-sinh/target-01.png",
    },
    {
        title: "Sinh viên",
        description:
            "Các chuyên ngành kinh tế, marketing, truyền thông, báo chí… muốn nắm vững bộ công cụ thiết kế để hỗ trợ cho công việc sau này hoặc sinh viên ngành khác muốn biết thêm kiến thức mới về ngành Multimedia.",
        imageSrc: "/images/tuyen-sinh/target-02.png",
    },
    {
        title: "Người đi làm",
        description:
            "Muốn thay đổi công việc nhàm chán hiện tại bằng một nghề tràn đầy cảm hứng hoặc đang tìm kiếm một công việc với mức thu nhập lý tưởng.",
        imageSrc: "/images/tuyen-sinh/target-03.png",
    },
];

export default async function TuyenSinhPage() {
    const info = await getFooterInfo();

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                {/* Banner */}
                <PageBanner
                    imageSrc={getImageUrl(info?.admissions_banner_url || "/images/tuyen-sinh/banner.png")}
                    imageAlt="Tuyển sinh REF Academy 2025"
                    height={561}
                />

                {/* Đối tượng đăng ký */}
                <section className="w-full py-[30px]">
                    <div className="mx-auto max-w-[1600px] px-5">
                        <div className="mb-[30px] space-y-[10px] text-center">
                            <h2 className="text-[30px] leading-[48px] font-bold text-[#363e91]">Quy Chế Tuyển Sinh</h2>
                            <h1 className="text-[40px] leading-[64px] font-bold text-[#333]">Đối tượng đăng ký</h1>
                        </div>

                        <div className="flex flex-col items-stretch gap-8 md:flex-row">
                            {targets.map((item, index) => (
                                <div key={index} className="flex flex-1 flex-col items-center">
                                    {/* Circle image */}
                                    <div className="relative z-[2] mb-[-80px] h-[201px] w-[201px] overflow-hidden rounded-full">
                                        <Image
                                            src={item.imageSrc}
                                            alt={item.title}
                                            fill
                                            sizes="201px"
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Card */}
                                    <div className="relative z-[1] w-full flex-1 rounded-[20px] shadow-xl">
                                        <div className="flex min-h-[150px] items-center justify-center rounded-[20px] bg-[#ffc404] pt-[95px] pb-[16px]">
                                            <h3 className="text-center text-[30px] leading-[39px] font-semibold text-[#363e91]">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="px-[30px] py-[20px]">
                                            <p className="text-center text-base leading-[25.6px] text-black">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cách thức đăng ký */}
                <section className="w-full py-[30px]">
                    <div className="mx-auto max-w-[1600px] px-5">
                        <h1 className="mb-[10px] text-center text-[40px] leading-[64px] font-bold text-[#333]">
                            Cách thức đăng ký
                        </h1>

                        {/* Online */}
                        <div className="mb-[30px] flex items-stretch gap-0">
                            <div className="hidden flex-1 justify-end pr-10 lg:flex">
                                <div className="relative z-[2] overflow-hidden">
                                    <Image
                                        src="/images/tuyen-sinh/register-online-v2.png"
                                        alt="Đăng ký online"
                                        width={296}
                                        height={300}
                                    />
                                </div>
                            </div>
                            <div className="relative z-[1] ml-0 flex-1 md:ml-[-100px]">
                                <div className="relative flex h-full flex-col justify-center rounded-[20px] py-8 shadow-xl">
                                    <div className="flex max-w-[80%] items-center justify-center rounded-r-[20px] bg-[#ffc404]">
                                        <span className="py-3 text-center text-2xl font-semibold text-[#363e91]">
                                            ĐĂNG KÝ ONLINE
                                        </span>
                                    </div>
                                    <div className="mt-8 px-8 text-center">
                                        <p className="text-base leading-[25.6px] text-black">
                                            Đăng ký nhập học trực tuyến tại website REF ACADEMY
                                        </p>
                                        <div className="mt-[40px] flex justify-center">
                                            <Link
                                                href="#tu-van-tuyen-sinh"
                                                className="rounded-[10px] border-2 border-[#363e91] px-[32px] py-[2px] text-base leading-[46px] font-bold tracking-[0.48px] text-[#363e91] capitalize shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] transition-colors hover:bg-[#363e91] hover:text-white"
                                            >
                                                Đăng ký ngay
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Offline */}
                        <div className="flex items-stretch gap-0">
                            <div className="relative z-[1] mr-0 flex-1 md:mr-[-100px]">
                                <div className="relative flex h-full flex-col justify-center rounded-[20px] py-8 shadow-xl">
                                    <div className="ml-auto flex w-full max-w-[80%] items-center justify-center rounded-l-[20px] bg-[#ffc404]">
                                        <span className="py-3 text-center text-2xl font-semibold text-[#363e91]">
                                            ĐĂNG KÝ TRỰC TIẾP
                                        </span>
                                    </div>
                                    <div className="mt-8 px-8 text-center">
                                        <p className="text-base leading-[25.6px] text-black">
                                            Học viên có thể đăng kí bằng cách nhắn tin qua trang fanpage hoặc số điện
                                            thoại của trung tâm
                                        </p>
                                        <div className="mt-[40px] flex justify-center">
                                            <Link
                                                href={info?.facebook_url || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-[10px] border-2 border-[#363e91] px-[32px] py-[2px] text-base leading-[46px] font-bold tracking-[0.48px] text-[#363e91] capitalize shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] transition-colors hover:bg-[#363e91] hover:text-white"
                                            >
                                                Đăng ký ngay
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden flex-1 justify-start pl-20 lg:flex">
                                <div className="relative z-[2] overflow-hidden">
                                    <Image
                                        src="/images/tuyen-sinh/register-offline-v2.png"
                                        alt="Đăng ký trực tiếp"
                                        width={368}
                                        height={300}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bằng cấp */}
                <section className="w-full py-[75px]">
                    <div className="mx-auto flex max-w-[1600px] flex-col items-stretch gap-0 lg:flex-row">
                        {/* Image */}

                        <Image
                            src={getImageUrl(info?.admissions_degree_image_url || "/images/tuyen-sinh/degree-img.png")}
                            alt={info?.admissions_degree_title || "Bằng cấp"}
                            width={667}
                            height={433}
                            className="relative z-[2] overflow-hidden rounded-[16px] object-cover"
                        />

                        {/* Content card */}
                        <div className="relative z-[1] flex-1 rounded-[20px] py-[20px] shadow-xl">
                            <div className="space-y-[20px] px-8">
                                <div className="ml-[-40px] inline-block rounded-r-[10px] bg-[#ffc404] px-[40px] py-[6.5px]">
                                    <h1 className="text-[40px] leading-[64px] font-bold text-[#333]">
                                        {info?.admissions_degree_title || "Bằng cấp"}
                                    </h1>
                                </div>

                                {info?.admissions_degree_content?.split(/\n+/).map((paragraph, idx) => (
                                    <p key={idx} className="text-base leading-[25.6px] text-black">
                                        {paragraph.trim()}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Consultation Section - Reused */}
                <ConsultationSection />
            </main>

            <Footer />
        </div>
    );
}
