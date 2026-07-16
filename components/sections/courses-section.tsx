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
            <div className="mx-auto max-w-[1700px] px-4">
                {/* Title */}
                <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-4xl">
                    CÁC KHÓA HỌC TẠI REF ACADEMY
                </h2>

                {/* Courses grid */}
                <div className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="group relative aspect-[3/4] w-full max-w-[290px] cursor-pointer transition-transform hover:z-10 hover:scale-105 md:max-w-[405px]"
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
