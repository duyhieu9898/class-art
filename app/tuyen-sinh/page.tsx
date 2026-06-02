import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PageBanner from "@/components/common/page-banner";
import ConsultationSection from "@/components/common/consultation-section";
import { getScholarships } from "@/actions/scholarships";
import { getFooterInfo } from "@/actions/info";
import { getImageUrl } from "@/lib/supabase/storage";

export const metadata: Metadata = {
    title: "Tuyển sinh | REF ACADEMY",
    description:
        "Thông tin tuyển sinh, đối tượng đăng ký, hồ sơ nhập học, học bổng và ưu đãi dành cho học viên REF ACADEMY.",
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

const documents = [
    {
        text: "01 Phiếu đăng ký có dán ảnh",
        imageSrc: "/images/tuyen-sinh/doc-01.png",
    },
    {
        text: "01 Bản sao công chứng CCCD/hộ chiếu",
        imageSrc: "/images/tuyen-sinh/doc-02.png",
    },
    {
        text: "01 Cam kết sinh viên đã đọc \"Những điều SV cần biết\"",
        imageSrc: "/images/tuyen-sinh/doc-03.png",
    },
];

export default async function TuyenSinhPage() {
    const [scholarships, info] = await Promise.all([getScholarships(), getFooterInfo()]);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                {/* Banner */}
                <PageBanner
                    imageSrc="/images/tuyen-sinh/banner.png"
                    imageAlt="Tuyển sinh REF Academy 2025"
                    height={561}
                />

                {/* Đối tượng đăng ký */}
                <section className="w-full  py-[30px]">
                    <div className="mx-auto max-w-[1600px] px-5">
                        <div className="mb-[30px] space-y-[10px] text-center">
                            <h2 className="text-[30px] leading-[48px] font-bold text-[#363e91]">Quy Chế Tuyển Sinh</h2>
                            <h1 className="text-[40px] leading-[64px] font-bold text-[#333]">Đối tượng đăng ký</h1>
                        </div>

                        <div className="flex gap-8 items-stretch flex-col md:flex-row">
                            {targets.map((item, index) => (
                                <div key={index} className=" flex-1 flex flex-col items-center">
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
                                    <div className="flex-1 relative z-[1] w-full rounded-[20px] shadow-xl">
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
                <section className="w-full  py-[30px]">
                    <div className="mx-auto max-w-[1600px] px-5">
                        <h1 className="mb-[10px] text-center text-[40px] leading-[64px] font-bold text-[#333]">
                            Cách thức đăng ký
                        </h1>

                        {/* Online */}
                        <div className="mb-[30px] flex items-stretch gap-0">
                            <div className="hidden lg:flex flex-1 justify-end pr-0">
                                <div className="relative z-[2] h-[360px] w-[480px] overflow-hidden rounded-[16px]">
                                    <Image
                                        src="/images/tuyen-sinh/register-online.png"
                                        alt="Đăng ký online"
                                        fill
                                        sizes="480px"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="relative z-[1] ml-0 md:ml-[-100px] flex-1">
                                <div className="relative h-full rounded-[20px] shadow-xl py-8 flex flex-col justify-center">
                                    <div className="max-w-[80%] flex items-center justify-center rounded-r-[20px] bg-[#ffc404]">
                                        <span className="text-center text-2xl font-semibold text-[#363e91] py-3">
                                            ĐĂNG KÝ ONLINE
                                        </span>
                                    </div>
                                    <div className=" text-center px-8 mt-8">
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
                            <div className="relative z-[1] mr-0 md:mr-[-100px] flex-1">
                                <div className="relative h-full rounded-[20px] shadow-xl flex flex-col justify-center py-8">
                                    <div className="ml-auto w-full flex items-center justify-center rounded-l-[20px] bg-[#ffc404] max-w-[80%]">
                                        <span className="text-center text-2xl font-semibold text-[#363e91] py-3 ">
                                            ĐĂNG KÝ TRỰC TIẾP
                                        </span>
                                    </div>
                                    <div className="px-8 text-center mt-8">
                                        <p className="text-base leading-[25.6px] text-black">
                                            Học viên có thể đăng kí bằng cách nhắn tin qua trang fanpage hoặc số điện
                                            thoại của trung tâm
                                        </p>
                                        <div className="flex mt-[40px]  justify-center">
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
                            <div className="hidden lg:flex flex-1 justify-start pl-0">
                                <div className="relative z-[2] h-[390px] w-[520px] overflow-hidden rounded-[16px]">
                                    <Image
                                        src="/images/tuyen-sinh/register-offline.png"
                                        alt="Đăng ký trực tiếp"
                                        fill
                                        sizes="520px"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hồ sơ nhập học */}
                <section className="w-full  py-[30px]">
                    <div className="mx-auto max-w-[1600px] px-5">
                        <h1 className="mb-[30px] text-center text-[40px] leading-[64px] font-bold text-[#333]">
                            Hồ sơ nhập học
                        </h1>

                        <div className="flex gap-8 flex-col lg:flex-row">
                            {documents.map((doc, index) => (
                                <div key={index} className="flex-1 flex items-center gap-0 ">
                                    {/* Circle image */}
                                    <div className="relative z-[2] h-[150px] w-[150px] min-w-[150px] xl:h-[200px] xl:w-[200px] xl:min-w-[200px] overflow-hidden rounded-full">
                                        <Image
                                            src={doc.imageSrc}
                                            alt={doc.text}
                                            fill
                                            sizes="(max-width: 1280px) 150px, 200px"
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Text card */}
                                    <div className="relative z-[1] ml-[-60px] flex min-h-[150px]  xl:min-h-[200px] flex-1 items-center rounded-2xl py-[30px] pl-[80px] pr-4 shadow-xl">
                                        <p className="text-base leading-[25.6px] text-black">{doc.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bằng cấp */}
                <section className="w-full  py-[75px]">
                    <div className="mx-auto flex max-w-[1600px] items-stretch gap-0 flex-col lg:flex-row">
                        {/* Image */}

                        <Image
                            src="/images/tuyen-sinh/degree-img.png"
                            alt="Bằng cấp"
                            width={667}
                            height={433}
                            className="relative z-[2] overflow-hidden rounded-[16px]"
                        />

                        {/* Content card */}
                        <div className="relative z-[1] flex-1 rounded-[20px] py-[20px] shadow-xl">
                            <div className="space-y-[20px] px-8">
                                <div className="ml-[-40px] inline-block rounded-r-[10px] bg-[#ffc404] px-[40px] py-[6.5px]">
                                    <h1 className="text-[40px] leading-[64px] font-bold text-[#333]">Bằng cấp</h1>
                                </div>

                                <p className="text-base leading-[25.6px] text-black">
                                    FPT Arena Multimedia đào tạo theo chương trình Arena Multimedia Specialist Program
                                    (AMSP) – theo quy chuẩn từ Arena quốc tế – cung cấp chương trình đào tạo cập nhật và
                                    toàn diện, bao quát tất cả các lĩnh vực của Mỹ thuật Đa phương tiện, bám sát các ứng
                                    dụng thực tế và yêu cầu thiết yếu của ngành công nghiệp sáng tạo và giải trí.
                                </p>

                                <p className="text-base leading-[25.6px] text-black">
                                    Sinh viên sau khi hoàn thành chương trình học 2 năm sẽ nhận chứng chỉ Advanced
                                    Diploma in Multimedia (ADIM) do Arena Multimedia Ấn Độ cấp. Sở hữu chứng chỉ ADIM,
                                    học viên có thể học liên thông tại các trường Đại học lớn trên thế giới như:
                                    Middlesex University (MDX – Anh Quốc), Vancouver Center for Entertainment Arts (VCEA
                                    – Canada), Lincoln University College (LUC – Malaysia)… để lấy bằng cử nhân quốc tế.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Học Bổng & Ưu Đãi */}
                <section className="w-full  pb-[30px]">
                    <div className="mx-auto max-w-[1600px] px-5">
                        <h1 className="mb-[30px] text-center text-[40px] leading-[64px] font-bold text-[#333]">
                            Học Bổng &amp; Ưu Đãi
                        </h1>

                        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
                            {scholarships.map((item, index) => (
                                <Link key={item.id} href={`/tuyen-sinh/${item.slug}`} className="group block">
                                    <article className="flex h-full flex-col overflow-hidden rounded-[20px] shadow-xl">
                                        {/* Image */}
                                        <div className="relative h-[244px] w-full overflow-hidden">
                                            <Image
                                                src={getImageUrl(item.image_url)}
                                                alt={item.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 space-y-[16px] px-[30px] pt-[34px] pb-[40px]">
                                            <h2 className="text-3xl font-bold text-[#363e91]">
                                                {item.title}
                                            </h2>
                                            <p className="text-base leading-[25.6px] text-black">
                                                {item.description || ""}
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            ))}
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
