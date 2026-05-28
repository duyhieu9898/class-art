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

export default async function Home() {
    const [courses, partners, { posts: inspirations }] = await Promise.all([
        getCourses(),
        getPartners(),
        getPosts({ section: "nhan-vat", perPage: 6 }),
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
                <WorkshopSection />

                {/* Registration Form Section */}
                <RegistrationSection />

                {/* Inspiration Section */}
                <InspirationSection posts={inspirations} />

                {/* Partners Section */}
                <PartnersSection partners={partners} />

                {/* Activity Gallery Section */}
                <ActivitySection />
            </main>

            <Footer />
        </div>
    );
}
