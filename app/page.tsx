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
import { getFooterInfo } from "@/actions/info";

export const metadata: Metadata = {
    title: "REF ACADEMY | Đào tạo AI và thiết kế sáng tạo chuyên nghiệp",
    description:
        "REF ACADEMY đào tạo thiết kế đồ họa ứng dụng trí tuệ nhân tạo (AI) theo lộ trình thực chiến tại Đà Nẵng, giúp học viên làm chủ công nghệ sáng tạo tương lai.",
    openGraph: {
        title: "REF ACADEMY | Đào tạo AI và thiết kế sáng tạo chuyên nghiệp",
        description:
            "REF ACADEMY đào tạo thiết kế đồ họa ứng dụng trí tuệ nhân tạo (AI) theo lộ trình thực chiến tại Đà Nẵng, giúp học viên làm chủ công nghệ sáng tạo tương lai.",
        images: ["/images/hero-banner.png"],
    },
};

export default async function Home() {
    const [courses, partners, { posts: inspirations }, { posts: workshops }, { posts: activities }, info] =
        await Promise.all([
            getCourses(),
            getPartners(),
            getPosts({ section: "nhan-vat", perPage: 6 }),
            getPosts({ section: "workshop", perPage: 6 }),
            getPosts({ section: "hoat-dong", perPage: 6 }),
            getFooterInfo(),
        ]);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "REF ACADEMY",
        "url": "https://www.refacademy.com.vn",
        "logo": "https://www.refacademy.com.vn/images/logo.png",
        "description": "REF ACADEMY đào tạo thiết kế đồ họa ứng dụng trí tuệ nhân tạo (AI) theo lộ trình thực chiến tại Đà Nẵng, giúp học viên làm chủ công nghệ sáng tạo tương lai.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": info?.address || "35 Nại Nam",
            "addressLocality": "Hải Châu",
            "addressRegion": "Đà Nẵng",
            "addressCountry": "VN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": info?.phone || "",
            "contactType": "customer service",
            "email": info?.email || ""
        },
        "sameAs": [
            info?.facebook_url,
            info?.youtube_url,
            info?.instagram_url,
            info?.tiktok_url
        ].filter(Boolean)
    };

    return (
        <div className="flex min-h-screen flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
