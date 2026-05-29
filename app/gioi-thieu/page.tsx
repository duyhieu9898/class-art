import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import ActivityCarousel from "@/components/sections/about/activity-carousel";

export default function GioiThieuPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 px-5">
                {/* Hero - Sứ mệnh */}
                <section className="relative mx-auto mt-10 h-[785px] w-full max-w-[1600px] overflow-hidden rounded-[20px] ">
                    <Image
                        src="/images/about/hero-bg.png"
                        alt="REF Academy Campus"
                        fill
                        sizes="100vw"
                        className="rounded-[20px] object-cover"
                    />
                    <div className="absolute inset-0 rounded-[20px] bg-black/15" />
                    <div className="absolute inset-y-0 left-0 flex w-[35%] items-center rounded-l-[20px] bg-[rgba(24,24,24,0.85)]">
                        <div className="space-y-6 p-10 text-white">
                            <div>
                                <h2 className="text-3xl font-semibold text-[#486aff]">Sứ mệnh</h2>
                                <p className="mt-2 leading-8 text-gray-100">
                                    Cung cấp nhân lực chất lượng giúp đỡ học viên có thể tiếp cận cơ hội việc làm.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-semibold text-[#486aff]">Triết lý giáo dục</h2>
                                <p className="mt-2 leading-8 text-gray-100">
                                    Giáo dục đào tạo là tổ chức và quản trị việc tự học của người học.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-semibold text-[#486aff]">Văn hóa</h2>
                                <p className="mt-2 leading-8 text-gray-100">
                                    Tôn trọng, Đổi mới, Đồng đội, Chí công
                                    <br />
                                    Gương mẫu, Sáng suốt
                                    <br />
                                    Học thật, thi thật, thành công thật
                                    <br />
                                    Làm khác để làm tốt.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Về REF ACADEMY */}
                <section className="w-full py-16">
                    <div className="mx-auto max-w-[1600px] ">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr]">
                            <div>
                                <h1 className="text-4xl leading-[64px] font-bold text-gray-800">Về REF ACADEMY</h1>
                                <p className="mt-2 text-base leading-relaxed text-black">
                                    REF ACADEMY là đơn vị tiên phong đào tạo sử dụng trí tuệ nhân tạo tích hợp công nghệ
                                    vào trong thiết kế
                                </p>
                                <p className="mt-3 text-base leading-relaxed text-black">
                                    Với mong muốn đồng hành cùng người trẻ trong việc ứng dụng trí tuệ nhân tạo vào
                                    trong thiết kế, với hy vọng giúp đỡ các học viên tự tin trên con đường theo đuổi
                                    trong con đường thiết kế đồ họa.
                                </p>
                            </div>
                            <div className="relative h-[508px] overflow-hidden rounded-[20px] bg-[#ffc404]">
                                <Image
                                    src="/images/about/about-banner.png"
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
                <section className="w-full py-16">
                    <div className="mx-auto max-w-[1600px] ">
                        <h1 className="mb-4 text-4xl leading-[64px] font-bold text-gray-800">
                            Lịch Sử Hình Thành Phát Triển
                        </h1>
                        <div className="relative mb-8 h-[550px] overflow-hidden rounded-[16px] bg-gray-200">
                            <Image
                                src="/images/about/history-banner.png"
                                alt="Lịch sử hình thành REF Academy"
                                fill
                                sizes="100vw"
                                className="rounded-[16px] object-cover"
                            />
                        </div>
                        <div className="relative z-10 -mt-20 rounded-xl bg-white p-8 shadow-lg">
                            <div className="grid grid-cols-4 divide-x divide-gray-200">
                                {[
                                    {
                                        year: "7/2004",
                                        desc: "Thành lập REF ACADEMY",
                                    },
                                    { year: "2009", desc: "Hi4 Coffee" },
                                    {
                                        year: "2011",
                                        desc: "193 Nguyễn Văn Linh, TP. Đà Nẵng",
                                    },
                                    {
                                        year: "2019",
                                        desc: "35 Nại Nam, TP. Đà Nẵng",
                                    },
                                ].map((item) => (
                                    <div key={item.year} className="px-4 text-center">
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

                {/* Cơ sở đào tạo */}
                <section className="w-full py-16">
                    <div className="mx-auto max-w-[1600px] ">
                        <h1 className="mb-8 text-4xl leading-[64px] font-bold text-gray-800">GOOGLE MEET</h1>
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* Offline */}
                            <div className="overflow-hidden rounded-[20px] bg-white shadow-lg">
                                <div className="relative h-[373px]">
                                    <Image
                                        src="/images/about/offline-campus.png"
                                        alt="Cơ sở Offline - 35 Nại Nam"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold text-gray-800">
                                        OFFLINE - 35 NẠI NAM, TP ĐÀ NẴNG
                                    </h2>
                                    <p className="mt-3 text-base leading-relaxed">
                                        Là chiếc Trạm thân thuộc của biết bao thế hệ FAN từ 2004.
                                    </p>
                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#ffc404]">500 m2</p>
                                            <p>Diện tích</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#ffc404]">3</p>
                                            <p>Phòng học</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#ffc404]">01</p>
                                            <p>Phòng chức năng</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#ffc404]">35</p>
                                            <p>Nại Nam, TP Đà Nẵng</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Online */}
                            <div className="overflow-hidden rounded-[20px] bg-white shadow-lg">
                                <div className="relative h-[373px]">
                                    <Image
                                        src="/images/about/online-campus.png"
                                        alt="Cơ sở Online - Google Meet"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold text-gray-800">ONLINE - GOOGLE MEET</h2>
                                    <p className="mt-3 text-base leading-relaxed">
                                        Cơ sở &quot;chill&quot; nhất, phù hợp với tâm hồn bay bổng của những cô cậu sinh
                                        viên mê màu sắc, hình ảnh.
                                    </p>
                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#ffc404]">450 m2</p>
                                            <p>Diện tích</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#ffc404]">01</p>
                                            <p>Phòng học</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#ffc404]">01</p>
                                            <p>Phòng chức năng</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-[#ffc404]">01</p>
                                            <p>Online</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hoạt động của REF ACADEMY */}
                <ActivityCarousel />
            </main>

            <Footer />
        </div>
    );
}
