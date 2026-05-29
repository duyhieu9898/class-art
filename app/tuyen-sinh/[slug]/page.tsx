import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PostDetail from "@/components/common/post-detail";
import { getPostBySlug, getRelatedPosts } from "@/actions/posts";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post || post.section !== "hoc-bong") {
        return {
            title: "Thông tin tuyển sinh không tồn tại | REF ACADEMY",
        };
    }

    return {
        title: `${post.title} | Tuyển sinh REF ACADEMY`,
        description: post.excerpt || `Thông tin học bổng, ưu đãi và tuyển sinh: ${post.title} tại REF ACADEMY.`,
    };
}

export default async function TuyenSinhDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const [post, related] = await Promise.all([getPostBySlug(slug), getRelatedPosts(slug, "hoc-bong", 3)]);

    if (!post || post.section !== "hoc-bong") notFound();

    const relatedPosts = related.map((p) => ({
        title: p.title,
        excerpt: p.excerpt || "",
        imageSrc: p.image_url || "/images/tuyen-sinh/scholarship-01.png",
        category: p.category || undefined,
        date: new Date(p.published_at).toLocaleDateString("vi-VN"),
        href: `/tuyen-sinh/${p.slug}`,
    }));

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <PostDetail
                    post={post}
                    breadcrumbs={[
                        { label: "Trang chủ", href: "/" },
                        { label: "Tuyển sinh", href: "/tuyen-sinh" },
                        { label: post.title },
                    ]}
                    relatedPosts={relatedPosts}
                />
            </main>
            <Footer />
        </div>
    );
}
