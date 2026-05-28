"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { getImageUrl } from "@/lib/supabase/storage";
import { type Post } from "@/actions/posts";

interface InspirationSectionProps {
    posts: Post[];
}

export default function InspirationSection({ posts }: InspirationSectionProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: posts.length > 3, align: "start", slidesToScroll: 1 }, []);

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

    if (!posts || posts.length === 0) return null;

    return (
        <section className="relative w-full overflow-hidden bg-[#ffc708] py-16">
            <div className="mx-auto max-w-400 px-4">
                {/* Title */}
                <h2 className="mb-10 text-center text-3xl font-bold text-[#384196] md:text-4xl">
                    Nhân Vật Truyền Cảm Hứng
                </h2>

                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="min-w-0 flex-[0_0_90%] px-3 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                            >
                                <Link
                                    href={`/nhan-vat/${post.slug}`}
                                    className="group block h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl"
                                >
                                    {/* Image */}
                                    <div className="relative h-62.5 w-full overflow-hidden">
                                        <Image
                                            src={getImageUrl(post.image_url)}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="mb-3 line-clamp-2 text-lg leading-tight font-bold text-[#363e91] transition-colors group-hover:text-[#ffc708]">
                                            {post.title}
                                        </h3>
                                        <p className="line-clamp-4 text-sm leading-relaxed text-black">
                                            {post.excerpt || ""}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots */}
                {scrollSnaps.length > 1 && (
                    <div className="mt-8 flex justify-center gap-3">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`h-4 w-4 rounded-full transition-colors ${
                                    index === selectedIndex ? "bg-black" : "bg-black/20"
                                }`}
                                aria-label={`Trang ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
