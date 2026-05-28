"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const activities = [
    {
        image: "/images/about/blog-01.png",
        title: "Cựu học viên REF và cơ duyên với ngành công nghiệp…",
        excerpt:
            "Không lâu trước đây, khi nhắc tới Game, không nhiều người lại nghĩ tới việc đây sẽ là một ngành bùng nổ mạnh mẽ như hiện tại. Nhu cầu nhân ...",
        href: "https://arena.fpt.edu.vn/cuu-sinh-vien-fpt-arena-va-co-duyen-voi-nganh-cong-nghiep-game-2/",
    },
    {
        image: "/images/about/blog-02.png",
        title: "Dấu hiệu để nhận biết bạn sẽ trở thành nhà thiết kế tương lai",
        excerpt:
            "Vừa mới tốt nghiệp THPT, bạn đang phân vân liệu sau này mình có thể trở thành Nhà Thiết Kế tài ba nếu như gia nhập ngành Thiết Kế Đồ ...",
        href: "https://arena.fpt.edu.vn/dau-hieu-de-nhan-biet-ban-se-tro-thanh-nha-thiet-ke-tuong-lai-2/",
    },
    {
        image: "/images/about/blog-03.png",
        title: "Chuẩn bị hành trang khi theo học thiết kế đồ họa",
        excerpt:
            "Để gia nhập ngành học sáng tạo như thiết kế đồ họa, sinh viên cần chuẩn bị tốt cả về cơ sở vật chất và tinh thần học tập. Dưới ...",
        href: "https://arena.fpt.edu.vn/chuan-bi-hanh-trang-khi-theo-hoc-thiet-ke-do-hoa/",
    },
];

export default function ActivityCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 }, []);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    return (
        <section className="w-full py-16">
            <div className="mx-auto max-w-[1600px] ">
                <div className="rounded-[20px] bg-white p-8 shadow-lg">
                    <h2 className="mb-8 text-center text-[28.8px] font-bold text-gray-800">
                        Hoạt động của REF ACADEMY
                    </h2>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {activities.map((item, index) => (
                                <div
                                    key={index}
                                    className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                                >
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-start gap-4 p-2"
                                    >
                                        <div className="relative h-[200px] w-[170px] shrink-0 overflow-hidden rounded-lg">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="line-clamp-2 text-lg leading-[26px] font-bold text-gray-800 group-hover:text-[#384196]">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 line-clamp-4 text-base leading-relaxed text-black">
                                                {item.excerpt}
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="mt-6 flex justify-center gap-3">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`h-4 w-4 rounded-full transition-colors ${
                                    index === selectedIndex ? "bg-gray-800" : "bg-black/20"
                                }`}
                                aria-label={`Trang ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
