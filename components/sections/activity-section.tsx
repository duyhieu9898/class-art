import { getPosts } from "@/actions/posts";
import { ImageCarousel } from "@/components/common/image-carousel";

export default async function ActivitySection() {
    const { posts } = await getPosts({ section: "hoat-dong", perPage: 6 });

    // Convert fetched student activities to carousel format with robust fallbacks
    const displayItems =
        posts.length > 0
            ? posts.map((post) => ({
                id: post.id,
                image_url: post.image_url || "/images/activity-full.png",
                title: post.title,
            }))
            : [{ id: "1", image_url: "/images/activity-full.png", title: "Hoạt động học viên REF Academy" }];

    return (
        <section className="relative w-full overflow-hidden bg-[#030732] py-12 md:py-16">
            <div className="mx-auto max-w-300 px-4">
                {/* Title */}
                <h2 className="mb-8 text-center text-2xl font-bold text-white uppercase md:text-4xl">
                    Hoạt động học viên
                </h2>

                <ImageCarousel items={displayItems} autoplay={false} maxWidthClass="max-w-[900px]" />
            </div>
        </section>
    );
}
