import Image from "next/image";
import Link from "next/link";
import CardPost from "@/components/common/card-post";
import ConsultationSection from "@/components/common/consultation-section";
import { getImageUrl } from "@/lib/supabase/storage";
import { formatDateVN } from "@/lib/utils";

interface PostDetailProps {
    post: {
        title: string;
        excerpt: string | null;
        content: string | null;
        image_url: string | null;
        category: string | null;
        published_at: string;
    };
    breadcrumbs: { label: string; href?: string }[];
    relatedPosts: {
        title: string;
        excerpt: string;
        imageSrc: string;
        category?: string;
        date?: string;
        href: string;
    }[];
}

export default function PostDetail({ post, breadcrumbs, relatedPosts }: PostDetailProps) {
    const content = post.content || post.excerpt || "";

    return (
        <>
            {/* Article */}
            <article className="w-full  pt-[40px] pb-[60px]">
                <div className="mx-auto max-w-[1600px]">
                    {/* Breadcrumb */}
                    <nav className="mb-[20px] flex items-center gap-2 px-[15px] text-[14px] text-[#333]">
                        {breadcrumbs.map((crumb, index) => (
                            <span key={index} className="flex items-center gap-2">
                                {index > 0 && <span>/</span>}
                                {crumb.href ? (
                                    <Link href={crumb.href} className="transition-colors hover:text-[#363e91]">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="font-medium text-[#363e91]">{crumb.label}</span>
                                )}
                            </span>
                        ))}
                    </nav>

                    <div className="flex gap-[40px]">
                        {/* Main content */}
                        <div className="max-w-[1100px] flex-1 px-[15px]">
                            {/* Title */}
                            <h1 className="mb-[16px] text-[32px] leading-[44px] font-bold text-[#333]">{post.title}</h1>

                            {/* Meta */}
                            <div className="mb-[30px] flex items-center gap-[20px] text-[14px] text-[#666]">
                                <span>{formatDateVN(post.published_at)}</span>
                                {post.category && (
                                    <>
                                        <span>•</span>
                                        <span>{post.category}</span>
                                    </>
                                )}
                            </div>

                            {/* Featured image */}
                            <div className="relative mb-[40px] h-[500px] w-full overflow-hidden rounded-[16px]">
                                <Image
                                    src={getImageUrl(post.image_url)}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 1280px) 100vw, 1100px"
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            {post.content ? (
                                <div
                                    className="prose prose-lg max-w-none space-y-[20px] text-[16px] leading-[28px] text-black"
                                    dangerouslySetInnerHTML={{
                                        __html: post.content,
                                    }}
                                />
                            ) : (
                                <div className="prose prose-lg max-w-none space-y-[20px] text-[16px] leading-[28px] text-black">
                                    <p>{content}</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="hidden w-[400px] shrink-0 px-[15px] xl:block">
                            <div className="sticky top-[90px]">
                                <h3 className="mb-[20px] text-[20px] font-bold text-[#333]">Bài viết mới nhất</h3>
                                <div className="space-y-[16px]">
                                    {relatedPosts.slice(0, 3).map((post, index) => (
                                        <Link key={index} href={post.href} className="group flex gap-[12px]">
                                            <div className="relative h-[70px] w-[100px] shrink-0 overflow-hidden rounded-[8px]">
                                                <Image
                                                    src={getImageUrl(post.imageSrc)}
                                                    alt={post.title}
                                                    fill
                                                    sizes="100px"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="line-clamp-2 text-[14px] leading-[20px] font-bold text-[#333] transition-colors group-hover:text-[#363e91]">
                                                    {post.title}
                                                </h4>
                                                <span className="mt-[4px] block text-[12px] text-[#999]">
                                                    {post.date}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            <section className="w-full  pb-[60px]">
                <div className="mx-auto max-w-[1600px] px-[15px]">
                    <h2 className="mb-[30px] text-[30px] leading-[48px] font-bold text-[#333]">Bài Viết Liên Quan</h2>
                    <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
                        {relatedPosts.map((post, index) => (
                            <CardPost
                                key={index}
                                title={post.title}
                                excerpt={post.excerpt}
                                imageSrc={post.imageSrc}
                                category={post.category}
                                date={post.date}
                                href={post.href}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Consultation Section */}
            <ConsultationSection />
        </>
    );
}
