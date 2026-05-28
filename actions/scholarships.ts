"use server";

import { getPosts } from "@/actions/posts";

export interface Scholarship {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    image_url: string | null;
}

export async function getScholarships() {
    const { posts } = await getPosts({ section: "hoc-bong", perPage: 20 });

    return posts.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
        image_url: post.image_url,
    }));
}
