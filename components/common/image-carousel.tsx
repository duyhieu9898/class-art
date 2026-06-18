"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useState, useEffect } from "react";
import { getImageUrl } from "@/lib/supabase/storage";

interface CarouselItem {
    id: string;
    image_url: string;
    title?: string;
    href?: string;
    [key: string]: unknown;
}

interface ImageCarouselProps {
    items: CarouselItem[];
    aspectRatio?: string;
    autoplayDelay?: number;
    autoplay?: boolean;
    maxWidthClass?: string;
}

export function ImageCarousel({
    items,
    aspectRatio = "aspect-[1165/666]",
    autoplayDelay = 4000,
    autoplay = true,
    maxWidthClass = "max-w-full",
}: ImageCarouselProps) {
    // Conditionally load the Autoplay plugin
    const plugins = [];
    if (autoplay) {
        plugins.push(Autoplay({ delay: autoplayDelay, stopOnInteraction: false }));
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        onSelect(emblaApi);
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    if (!items || items.length === 0) return null;

    return (
        <div className={`relative mx-auto ${maxWidthClass}`}>
            <div className="overflow-hidden rounded-3xl border-[3px] border-black bg-black" ref={emblaRef}>
                <div className="flex">
                    {items.map((item, index) => (
                        <div key={item.id || index} className="min-w-0 flex-[0_0_100%]">
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={`relative block w-full ${aspectRatio} group overflow-hidden`}
                                >
                                    <Image
                                        src={getImageUrl(item.image_url)}
                                        alt={item.title || `Carousel image ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-350 group-hover:scale-105"
                                        sizes="(max-width: 1200px) 100vw, 1200px"
                                        priority={index === 0}
                                    />
                                    {item.title && (
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16 text-left">
                                            <h3 className="line-clamp-1 text-base font-bold text-white transition-colors group-hover:text-[#ffc708] md:text-xl">
                                                {item.title}
                                            </h3>
                                        </div>
                                    )}
                                </Link>
                            ) : (
                                <div className={`relative w-full ${aspectRatio}`}>
                                    <Image
                                        src={getImageUrl(item.image_url)}
                                        alt={item.title || `Carousel image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1200px) 100vw, 1200px"
                                        priority={index === 0}
                                    />
                                    {item.title && (
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16 text-left">
                                            <h3 className="line-clamp-1 text-base font-bold text-white md:text-xl">
                                                {item.title}
                                            </h3>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation arrows */}
            {items.length > 1 && (
                <>
                    <button
                        onClick={scrollPrev}
                        className="absolute top-1/2 left-4 z-10 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 shadow-md transition-all hover:bg-black/60 active:scale-95"
                        aria-label="Ảnh trước"
                    >
                        <ChevronLeft className="h-6 w-6 text-white" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute top-1/2 right-4 z-10 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 shadow-md transition-all hover:bg-black/60 active:scale-95"
                        aria-label="Ảnh tiếp"
                    >
                        <ChevronRight className="h-6 w-6 text-white" />
                    </button>
                </>
            )}

            {/* Dot Pagination - 20px below slider */}
            {items.length > 1 && (
                <div className="mt-5 flex h-2 items-center justify-center gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            className={`rounded-full transition-all duration-300 ${
                                index === selectedIndex
                                    ? "h-2 w-6 bg-white shadow-sm" // active expanded pill dot
                                    : "h-2 w-2 bg-white/30 hover:bg-white/50" // standard dot
                            }`}
                            onClick={() => emblaApi?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
