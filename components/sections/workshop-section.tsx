import { type Post } from "@/actions/posts";
import { ImageCarousel } from "@/components/common/image-carousel";

export default function WorkshopSection({ posts }: { posts: Post[] }) {
    // Convert fetched posts to carousel format with solid fallbacks
    const displayItems =
        posts.length > 0
            ? posts.map((post) => ({
                id: post.id,
                image_url: post.image_url || "/images/workshop-main.png",
                title: post.title,
            }))
            : [
                { id: "1", image_url: "/images/workshop-main.png", title: "Workshop tại các trường đại học 1" },
                { id: "2", image_url: "/images/workshop-main.png", title: "Workshop tại các trường đại học 2" },
                { id: "3", image_url: "/images/workshop-main.png", title: "Workshop tại các trường đại học 3" },
            ];

    return (
        <section className="relative w-full bg-[#384196] py-12 md:py-16">
            <div className="mx-auto max-w-[1200px] px-4">
                {/* Title */}
                <h2 className="mb-8 text-center text-2xl font-bold text-white uppercase md:text-4xl">
                    CÁC BUỔI WORKSHOP TẠI CÁC TRƯỜNG ĐẠI HỌC
                </h2>

                <ImageCarousel items={displayItems} />
            </div>
        </section>
    );
}
