"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { type Post } from "@/actions/posts";
import { getImageUrl } from "@/lib/supabase/storage";

export default function ActivityCarousel({ posts }: { posts: Post[] }) {
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

    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-16">
            <div className="mx-auto max-w-[1600px]">
                <div className="rounded-[20px] bg-white shadow-lg md:p-8">
                    <h2 className="mb-8 text-center text-[28.8px] font-bold text-gray-800">
                        Hoạt động của REF ACADEMY
                    </h2>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                                >
                                    <a href={`/tin-tuc/${post.slug}`} className="group flex items-start gap-4 p-2">
                                        <div className="relative h-[200px] w-[170px] shrink-0 overflow-hidden rounded-lg">
                                            <Image
                                                src={getImageUrl(post.image_url)}
                                                alt={post.title}
                                                fill
                                                sizes="170px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="line-clamp-2 text-lg leading-[26px] font-bold text-gray-800 group-hover:text-[#384196]">
                                                {post.title}
                                            </h3>
                                            <p className="mt-2 line-clamp-4 text-base leading-relaxed text-black">
                                                {post.excerpt || ""}
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots */}
                    {scrollSnaps.length > 1 && (
                        <div className="flex justify-center gap-3 pt-4 pb-4 md:pt-6 md:pb-0">
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
                    )}
                </div>
            </div>
        </section>
    );
}
