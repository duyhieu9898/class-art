import Image from "next/image";

interface HeroBannerProps {
    imageSrc: string;
    title: string;
}

export default function HeroBanner({ imageSrc, title }: HeroBannerProps) {
    return (
        <section className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-[20px] py-[89px]">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden rounded-[16px]">
                <Image src={imageSrc} alt="" fill sizes="100vw" className="object-cover" priority />
                <div className="absolute inset-0 rounded-[16px] bg-black/50" />
            </div>

            {/* Title */}
            <div className="relative z-10 w-full max-w-[1600px] ">
                <div className="flex items-center gap-0 px-[15px]">
                    <div className="h-[2px] flex-1 bg-white" />
                    <div className="">
                        <h1 className="text-center text-4xl md:text-6xl font-semibold whitespace-nowrap text-white uppercase">
                            {title}
                        </h1>
                    </div>
                    <div className="h-[2px] flex-1 bg-white" />
                </div>
            </div>
        </section>
    );
}
