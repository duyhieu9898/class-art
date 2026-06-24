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

    if (!post) {
        return {
            title: "Bài viết không tồn tại | REF ACADEMY",
        };
    }

    return {
        title: `${post.title} | Tin tức REF ACADEMY`,
        description: post.excerpt || `Cập nhật tin tức và sự kiện: ${post.title} tại REF ACADEMY.`,
    };
}

export default async function TinTucDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const [post, related] = await Promise.all([getPostBySlug(slug), getRelatedPosts(slug, "tin-tuc", 3)]);

    if (!post) notFound();

    const relatedPosts = related.map((p) => ({
        title: p.title,
        excerpt: p.excerpt || "",
        imageSrc: p.image_url || "/images/dao-tao/post-01.png",
        category: p.category || undefined,
        date: new Date(p.published_at).toLocaleDateString("vi-VN"),
        href: `/tin-tuc/${p.slug}`,
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": post.title,
        "description": post.excerpt || "",
        "image": post.image_url ? [post.image_url] : [],
        "datePublished": post.published_at,
        "dateModified": post.updated_at || post.published_at,
        "author": {
            "@type": "Organization",
            "name": "REF ACADEMY",
            "url": "https://www.refacademy.com.vn"
        },
        "publisher": {
            "@type": "Organization",
            "name": "REF ACADEMY",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.refacademy.com.vn/images/logo.png"
            }
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />
            <main className="flex-1">
                <PostDetail
                    post={post}
                    breadcrumbs={[
                        { label: "Trang chủ", href: "/" },
                        { label: "Tin tức & Sự kiện", href: "/tin-tuc" },
                        { label: post.title },
                    ]}
                    relatedPosts={relatedPosts}
                />
            </main>
            <Footer />
        </div>
    );
}
