import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PostDetail from "@/components/common/post-detail";
import { getPostBySlug, getRelatedPosts } from "@/actions/posts";

export default async function TuyenSinhDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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
