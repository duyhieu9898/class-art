import Image from "next/image";

export default function InstructorsSection() {
    return (
        <section
            className="relative w-full overflow-hidden"
            style={{
                background: "linear-gradient(to top, #333b88 3.4%, #5c68e4 99.9%)",
            }}
        >
            <div className="mx-auto max-w-[1400px] px-4">
                <div className="relative flex items-end md:items-center">
                    {/* Logo - positioned left */}
                    <div className="relative hidden h-[150px] w-[150px] shrink-0 md:block md:h-[340px] md:w-[330px]">
                        <Image
                            src="/images/instructors-logo.png"
                            alt="Học viên tiêu biểu - Vinh danh thành tích xuất sắc"
                            fill
                            sizes="330px"
                            className="object-contain"
                        />
                    </div>

                    {/* Group photo + badges - positioned right */}
                    <div className="relative h-[200px] flex-1 md:h-[380px]">
                        <Image
                            src="/images/instructors-group.png"
                            alt="Đội ngũ giảng viên REF Academy"
                            fill
                            sizes="(max-width: 768px) 100vw, 1070px"
                            className="object-contain object-bottom"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
