import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import InstructorsSection from "@/components/sections/instructors-section";
import CoursesSection from "@/components/sections/courses-section";
import WorkshopSection from "@/components/sections/workshop-section";
import RegistrationSection from "@/components/sections/registration-section";
import InspirationSection from "@/components/sections/inspiration-section";
import PartnersSection from "@/components/sections/partners-section";
import ActivitySection from "@/components/sections/activity-section";
import { getCourses } from "@/actions/courses";
import { getPartners } from "@/actions/partners";
import { getPosts } from "@/actions/posts";

export const metadata: Metadata = {
    title: "REF ACADEMY | Đào tạo AI và thiết kế sáng tạo",
    description:
        "REF ACADEMY đào tạo AI và thiết kế theo lộ trình thực chiến, giúp học viên xây dựng kỹ năng sáng tạo để tự tin gia nhập thị trường việc làm.",
};

export default async function Home() {
    const [courses, partners, { posts: inspirations }, { posts: workshops }, { posts: activities }] =
        await Promise.all([
            getCourses(),
            getPartners(),
            getPosts({ section: "nhan-vat", perPage: 6 }),
            getPosts({ section: "workshop", perPage: 6 }),
            getPosts({ section: "hoat-dong", perPage: 6 }),
        ]);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <HeroSection />

                {/* Instructors Section */}
                <InstructorsSection />

                {/* Courses Section */}
                <CoursesSection courses={courses} />

                {/* Workshop Section */}
                <WorkshopSection posts={workshops} />

                {/* Registration Form Section */}
                <RegistrationSection />

                {/* Inspiration Section */}
                <InspirationSection posts={inspirations} />

                {/* Partners Section */}
                <PartnersSection partners={partners} />

                {/* Activity Gallery Section */}
                <ActivitySection posts={activities} />
            </main>

            <Footer />
        </div>
    );
}
