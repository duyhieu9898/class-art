import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PageBanner from "@/components/common/page-banner";
import CardPost from "@/components/common/card-post";
import ConsultationSection from "@/components/common/consultation-section";
import { getPosts } from "@/actions/posts";

export const metadata: Metadata = {
    title: "Đào tạo | REF ACADEMY",
    description:
        "Khám phá các bài cuối khóa, đồ án và chương trình đào tạo thiết kế ứng dụng AI tại REF ACADEMY.",
};

export default async function DaoTaoPage() {
    const { posts } = await getPosts({ section: "dao-tao", page: 1, perPage: 30 });

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 px-5">
                <PageBanner
                    imageSrc="/images/dao-tao/banner.png"
                    imageAlt="Ngày hội dự án cộng đồng JCI Đà Nẵng 2026"
                />

                <section className="w-full pt-15.25 pb-7.5">
                    <div className="mx-auto max-w-400">
                        <div className="px-3.75">
                            <h1 className="text-lg font-bold text-[#333]">
                                Bài cuối khóa của Học Viên
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 gap-7.5 px-3.75 pt-5 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <CardPost
                                    key={post.id}
                                    title={post.title}
                                    excerpt={post.excerpt || ""}
                                    imageSrc={post.image_url || "/images/dao-tao/post-01.png"}
                                    date={new Date(post.published_at).toLocaleDateString("vi-VN")}
                                    href={`/dao-tao/${post.slug}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <ConsultationSection />
            </main>

            <Footer />
        </div>
    );
}
