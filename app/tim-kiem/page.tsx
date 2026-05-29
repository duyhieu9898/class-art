import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CardPost from "@/components/common/card-post";
import Pagination from "@/components/common/pagination";
import { searchPosts } from "@/actions/posts";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
    const { q } = await searchParams;
    const query = q?.trim();

    return {
        title: query ? `Tìm kiếm "${query}" | REF ACADEMY` : "Tìm kiếm | REF ACADEMY",
        description: query
            ? `Kết quả tìm kiếm bài viết phù hợp với từ khóa "${query}" trên REF ACADEMY.`
            : "Tìm kiếm bài viết, tin tức, đào tạo và học bổng trên website REF ACADEMY.",
        robots: {
            index: false,
            follow: true,
        },
    };
}

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        page?: string;
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedParams = await searchParams;
    const query = resolvedParams.q || "";
    const currentPage = parseInt(resolvedParams.page || "1", 10);
    const perPage = 9;

    const { posts, totalPages } = query ? await searchPosts(query, currentPage, perPage) : { posts: [], totalPages: 0 };

    // Format section labels for tags in search cards
    const sectionLabels: Record<string, string> = {
        "dao-tao": "Đào tạo",
        "tin-tuc": "Tin tức & Sự kiện",
        "nhan-vat": "Nhân vật",
        "hoc-bong": "Học bổng",
        workshop: "Workshop",
        "hoat-dong": "Hoạt động học viên",
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Header />

            <main className="flex-1 pb-16">
                {/* Search Header */}
                <div className="bg-[#384196] px-4 py-16 text-white">
                    <div className="mx-auto max-w-300 space-y-4 text-center">
                        <h1 className="text-3xl font-black tracking-tight md:text-5xl">KẾT QUẢ TÌM KIẾM</h1>
                        <p className="mx-auto max-w-2xl text-lg font-medium text-white/80 md:text-xl">
                            {query ? (
                                <>
                                    Tìm thấy <span className="font-bold text-[#ffc708]">{posts.length}</span> bài viết
                                    phù hợp với từ khóa{" "}
                                    <span className="font-bold text-white italic">&quot;{query}&quot;</span>
                                </>
                            ) : (
                                "Nhập từ khóa để tìm kiếm bài viết..."
                            )}
                        </p>
                    </div>
                </div>

                {/* Search Content */}
                <div className="mx-auto mt-12 max-w-300 px-4">
                    {posts.length > 0 ? (
                        <div className="space-y-12">
                            {/* Grid of posts */}
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {posts.map((post) => (
                                    <CardPost
                                        key={post.id}
                                        title={post.title}
                                        excerpt={post.excerpt || ""}
                                        imageSrc={post.image_url || "/images/dao-tao/post-01.png"}
                                        imageAlt={post.title}
                                        href={`/posts/${post.slug}`}
                                        category={sectionLabels[post.section] || post.section}
                                        date={
                                            post.published_at
                                                ? new Date(post.published_at).toLocaleDateString("vi-VN")
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center pt-4">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        basePath={`/tim-kiem?q=${encodeURIComponent(query)}`}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="mx-auto mt-8 max-w-2xl space-y-6 rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center shadow-sm">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#384196]/10 text-[#384196]">
                                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Không tìm thấy bài viết nào</h3>
                            <p className="mx-auto max-w-md text-gray-500">
                                Chúng tôi không tìm thấy kết quả nào phù hợp với từ khóa của bạn. Vui lòng thử tìm kiếm
                                lại với các từ khóa khác.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
