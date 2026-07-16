import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative h-[calc(100vh-270px)] w-full overflow-hidden md:h-[605px]">
            {/* Background gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(179deg, #384196 1.7%, #121530 98.6%)",
                }}
            />

            {/* Decorative images */}
            <div className="absolute top-[62px] left-[-106px] h-[396px] w-[554px] lg:block">
                <Image
                    src="/images/hero-decor-left.png"
                    alt=""
                    fill
                    sizes="554px"
                    className="object-contain"
                    aria-hidden="true"
                />
            </div>

            <div className="absolute top-[50%] right-[-30%] hidden h-[372px] w-[325px] md:top-[140px] md:right-0 md:h-[465px] md:w-[407px] lg:block">
                <Image
                    src="/images/hero-decor-right.png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 325px, 407px"
                    className="object-contain"
                    aria-hidden="true"
                />
            </div>

            <div className="absolute bottom-[88px] left-[171px] hidden h-[184px] w-[234px] lg:block">
                <Image
                    src="/images/hero-decor-bottom.png"
                    alt=""
                    fill
                    sizes="234px"
                    className="object-contain"
                    aria-hidden="true"
                />
            </div>

            {/* Main content container */}
            <div className="relative z-10 mx-auto h-full max-w-[1200px] px-4">
                {/* Main hero image (students) */}
                <div className="absolute top-0 left-0 h-full w-[400px] md:left-[18px] md:w-[617px]">
                    <Image
                        src="/images/hero-main.png"
                        alt="Học viên REF Academy"
                        fill
                        sizes="(max-width: 768px) 400px, 617px"
                        className="object-contain object-bottom"
                        priority
                    />
                </div>

                {/* Banner text image */}
                <div className="absolute top-[37px] right-0 hidden h-[373px] w-[400px] md:left-[477px] md:block md:w-[818px]">
                    <Image
                        src="/images/hero-banner.png"
                        alt="AI - Thiết kế Tương lai"
                        fill
                        sizes="(max-width: 768px) 400px, 818px"
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Text content */}
                <div className="absolute bottom-[20px] left-1/2 w-full max-w-[450px] -translate-x-1/2 rounded-lg bg-[#0000006b] p-4 text-center md:bottom-[60px] md:left-[660px] md:translate-x-0 md:bg-transparent md:p-0">
                    <p className="mb-6 text-sm leading-relaxed text-white md:text-base">
                        Lộ trình đào tạo thực chiến bài bản, REF ACADEMY trang bị cho bạn nền tảng kỹ năng sử dụng trí
                        tuệ nhân tạo để tự tin gia nhập thị trường việc làm
                    </p>

                    <Link
                        href="#dang-ky"
                        className="inline-flex items-center gap-2 rounded-full bg-[#384196] px-8 py-3 text-sm font-bold text-white uppercase transition-colors hover:bg-[#2d3578]"
                    >
                        ĐĂNG KÝ NHẬN TƯ VẤN KHOÁ HỌC
                        <span className="text-lg">✏️</span>
                    </Link>
                </div>
            </div>

            {/* Overlay texture */}
            <div className="pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply">
                <Image
                    src="/images/hero-overlay.png"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-bottom"
                    aria-hidden="true"
                />
            </div>
        </section>
    );
}
