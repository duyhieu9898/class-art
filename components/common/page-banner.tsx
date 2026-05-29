import Image from "next/image";

interface PageBannerProps {
    imageSrc: string;
    imageAlt: string;
    height?: number;
}

export default function PageBanner({ imageSrc, imageAlt, height = 550 }: PageBannerProps) {
    return (
        <section className="w-full pt-[30px]">
            <div className="px-[15px]">
                <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: `${height}px` }}>
                    <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className="object-cover" priority />
                </div>
            </div>
        </section>
    );
}
