import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PostDetail from "@/components/common/post-detail";
import { getPostBySlug, getRelatedPosts } from "@/actions/posts";

export default async function DaoTaoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post, related] = await Promise.all([getPostBySlug(slug), getRelatedPosts(slug, "dao-tao", 3)]);

    if (!post) notFound();

    const relatedPosts = related.map((p) => ({
        title: p.title,
        excerpt: p.excerpt || "",
        imageSrc: p.image_url || "/images/dao-tao/post-01.png",
        category: p.category || undefined,
        date: new Date(p.published_at).toLocaleDateString("vi-VN"),
        href: `/dao-tao/${p.slug}`,
    }));

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <PostDetail
                    post={post}
                    breadcrumbs={[
                        { label: "Trang chủ", href: "/" },
                        { label: "Đào tạo", href: "/dao-tao" },
                        { label: post.title },
                    ]}
                    relatedPosts={relatedPosts}
                />
            </main>
            <Footer />
        </div>
    );
}
