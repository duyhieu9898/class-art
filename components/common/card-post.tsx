import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/supabase/storage";

export interface CardPostProps {
    title: string;
    excerpt: string;
    imageSrc: string;
    imageAlt?: string;
    href: string;
    /** Optional category label displayed above title */
    category?: string;
    /** Optional date string displayed between title and excerpt */
    date?: string;
}

export default function CardPost({ title, excerpt, imageSrc, imageAlt, href, category, date }: CardPostProps) {
    const hasMetadata = category || date;
    const src = getImageUrl(imageSrc);

    return (
        <Link href={href} className="group block h-full">
            <article
                className={`flex h-full flex-col overflow-hidden bg-white transition-transform duration-300 group-hover:-translate-y-1 ${
                    hasMetadata
                        ? "rounded-[10px] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.1)]"
                        : "rounded-[20px] shadow-[0px_0px_18px_0px_rgba(17,12,46,0.25)]"
                }`}
            >
                {/* Image */}
                <div className={`relative w-full overflow-hidden ${hasMetadata ? "h-[252px]" : "h-[247px]"}`}>
                    <Image
                        src={src}
                        alt={imageAlt || title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div
                    className={`flex flex-1 flex-col ${
                        hasMetadata ? "gap-[1px] px-[20px] py-[16px]" : "gap-[7px] px-[25px] py-[12px]"
                    }`}
                >
                    {category && <p className="text-base leading-[25.6px] text-black opacity-70">{category}</p>}
                    <h5 className="line-clamp-2 min-h-[48px] text-[18.4px] leading-[23.92px] font-bold text-[#333]">
                        {title}
                    </h5>
                    {date && <p className="pt-[5px] text-[13px] leading-[20.8px] text-[#333]">{date}</p>}
                    <p className="line-clamp-2 text-base leading-[25.6px] text-black">{excerpt}</p>
                </div>
            </article>
        </Link>
    );
}
