"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/supabase/storage";

interface Partner {
    id: string;
    name: string;
    logo_url: string | null;
    website_url: string | null;
}

interface PartnersSectionProps {
    partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
    const visiblePartners = partners.filter((partner) => partner.logo_url);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", slidesToScroll: 1 }, [
        Autoplay({ delay: 5000, stopOnInteraction: true }),
    ]);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    if (visiblePartners.length === 0) return null;

    return (
        <section className="w-full bg-white py-12">
            <div className="mx-auto max-w-[1200px] px-4">
                {/* Title */}
                <h2 className="mb-8 text-center text-xl font-bold text-[#363e91] md:text-2xl">
                    Đối tác của REF ACADEMY
                </h2>

                {/* Logo carousel */}
                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex items-center">
                            {visiblePartners.map((partner) => {
                                const logo = (
                                    <Image
                                        src={getImageUrl(partner.logo_url)}
                                        alt={partner.name}
                                        fill
                                        sizes="(max-width: 768px) 33vw, 20vw"
                                        className="object-contain"
                                    />
                                );

                                return (
                                    <div key={partner.id} className="min-w-0 flex-[0_0_33%] px-4 md:flex-[0_0_20%]">
                                        {partner.website_url ? (
                                            <a
                                                href={partner.website_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative block h-[80px] w-full transition-opacity hover:opacity-80 md:h-[100px]"
                                                aria-label={partner.name}
                                            >
                                                {logo}
                                            </a>
                                        ) : (
                                            <div className="relative h-[80px] w-full md:h-[100px]">{logo}</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Arrows */}
                    <button
                        type="button"
                        onClick={scrollPrev}
                        className="absolute top-1/2 left-0 flex h-[33px] w-[33px] -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                        aria-label="Trước"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
                        className="absolute top-1/2 right-0 flex h-[33px] w-[33px] -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                        aria-label="Tiếp"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                </div>
            </div>
        </section>
    );
}
