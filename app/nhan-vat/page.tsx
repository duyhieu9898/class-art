import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroBanner from "@/components/common/hero-banner";
import CardPost from "@/components/common/card-post";
import Pagination from "@/components/common/pagination";
import ConsultationSection from "@/components/common/consultation-section";
import { getPosts } from "@/actions/posts";

export const metadata: Metadata = {
    title: "Nhân vật Truyền cảm hứng | REF ACADEMY",
    description:
        "Gặp gỡ những học viên xuất sắc, cựu học viên thành đạt và những câu chuyện truyền cảm hứng thiết kế, ứng dụng AI đột phá trong cộng đồng REF ACADEMY.",
    openGraph: {
        title: "Nhân vật Truyền cảm hứng | REF ACADEMY",
        description:
            "Gặp gỡ những học viên xuất sắc, cựu học viên thành đạt và những câu chuyện truyền cảm hứng thiết kế, ứng dụng AI đột phá trong cộng đồng REF ACADEMY.",
        images: ["/images/hero-banner.png"],
    },
};

export default async function NhanVatPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const { posts, totalPages } = await getPosts({ section: "nhan-vat", page, perPage: 12 });

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                <HeroBanner imageSrc="/images/nhan-vat/banner.png" title="Học viên xuất sắc" />

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
                                    href={`/nhan-vat/${post.slug}`}
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-[50px]">
                                <Pagination currentPage={page} totalPages={totalPages} basePath="/nhan-vat" />
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
