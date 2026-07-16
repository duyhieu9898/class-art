import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroBanner from "@/components/common/hero-banner";
import CardPost from "@/components/common/card-post";
import Pagination from "@/components/common/pagination";
import ConsultationSection from "@/components/common/consultation-section";
import { getPosts } from "@/actions/posts";

export const metadata: Metadata = {
    title: "Tin tức & Sự kiện | REF ACADEMY",
    description:
        "Cập nhật tin tức công nghệ, sự kiện sáng tạo, hoạt động đào tạo thiết kế và các câu chuyện truyền cảm hứng mới nhất từ REF ACADEMY.",
    openGraph: {
        title: "Tin tức & Sự kiện | REF ACADEMY",
        description:
            "Cập nhật tin tức công nghệ, sự kiện sáng tạo, hoạt động đào tạo thiết kế và các câu chuyện truyền cảm hứng mới nhất từ REF ACADEMY.",
        images: ["/images/hero-banner.png"],
    },
};

export default async function TinTucPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const { posts, totalPages } = await getPosts({ section: "tin-tuc", page, perPage: 12 });

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                <HeroBanner imageSrc="/images/tin-tuc/banner.png" title="Tin tức & Sự kiện" />

                <section className="w-full pt-[75px]">
                    <div className="mx-auto max-w-[1600px] px-[15px]">
                        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <CardPost
                                    key={post.id}
                                    title={post.title}
                                    excerpt={post.excerpt || ""}
                                    imageSrc={post.image_url || "/images/dao-tao/post-01.png"}
                                    date={new Date(post.published_at).toLocaleDateString("vi-VN")}
                                    href={`/tin-tuc/${post.slug}`}
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-[50px]">
                                <Pagination currentPage={page} totalPages={totalPages} basePath="/tin-tuc" />
                            </div>
                        )}
                    </div>
                </section>

                <ConsultationSection />
            </main>

            <Footer />
        </div>
    );
}
