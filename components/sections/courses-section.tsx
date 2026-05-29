import Image from "next/image";
import { getImageUrl } from "@/lib/supabase/storage";

interface Course {
    id: string;
    title: string;
    image_url: string | null;
}

interface CoursesSectionProps {
    courses: Course[];
}

export default function CoursesSection({ courses }: CoursesSectionProps) {
    if (courses.length === 0) return null;

    return (
        <section className="relative w-full overflow-hidden bg-[#1a1a2e] py-12 md:py-16">
            <div className="mx-auto max-w-[1400px] px-4">
                {/* Title */}
                <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-4xl">
                    CÁC KHÓA HỌC TẠI REF ACADEMY
                </h2>

                {/* Courses grid */}
                <div className="-mx-6 flex items-center justify-center flex-wrap md:flex-nowrap gap-4 md:gap-0">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="group relative md:-ml-14 h-[320px] w-[290px] shrink-0 cursor-pointer transition-transform first:ml-0 hover:z-10 hover:scale-105 md:h-[450px] md:w-[405px]"
                        >
                            <Image
                                src={getImageUrl(course.image_url)}
                                alt={course.title}
                                fill
                                sizes="(max-width: 768px) 290px, 405px"
                                className="rounded-xl object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
