"use server";

import { createClient } from "@/lib/supabase/server";

export type PostSection = "dao-tao" | "tin-tuc" | "nhan-vat" | "hoc-bong" | "workshop" | "hoat-dong";

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string | null;
    image_url: string | null;
    category: string | null;
    section: PostSection;
    published_at: string;
    updated_at?: string;
}

interface GetPostsOptions {
    section: PostSection;
    page?: number;
    perPage?: number;
}

export async function getPosts({ section, page = 1, perPage = 12 }: GetPostsOptions) {
    const supabase = await createClient();
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error, count } = await supabase
        .from("posts")
        .select("id, slug, title, excerpt, image_url, category, section, published_at", { count: "exact" })
        .eq("section", section)
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .range(from, to);

    if (error) {
        console.error("getPosts error:", error);
        return { posts: [], totalPages: 0 };
    }

    const totalPages = Math.ceil((count || 0) / perPage);

    return { posts: (data as Post[]) || [], totalPages };
}

export async function getPostBySlug(slug: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).eq("is_published", true).single();

    if (error) {
        console.error("getPostBySlug error:", error);
        return null;
    }

    return data as Post;
}

export async function getRelatedPosts(currentSlug: string, section: PostSection, limit = 3) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title, excerpt, image_url, category, section, published_at")
        .eq("section", section)
        .eq("is_published", true)
        .neq("slug", currentSlug)
        .order("published_at", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("getRelatedPosts error:", error);
        return [];
    }

    return (data as Post[]) || [];
}

export async function searchPosts(queryText: string, page: number = 1, perPage: number = 12) {
    const supabase = await createClient();
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    // Use Postgres OR condition with case-insensitive ILIKE for both title and content
    const { data, error, count } = await supabase
        .from("posts")
        .select("id, slug, title, excerpt, image_url, category, section, published_at", { count: "exact" })
        .eq("is_published", true)
        .or(`title.ilike.%${queryText}%,excerpt.ilike.%${queryText}%,content.ilike.%${queryText}%`)
        .order("published_at", { ascending: false })
        .range(from, to);

    if (error) {
        console.error("searchPosts error:", error);
        return { posts: [], totalPages: 0 };
    }

    const totalPages = Math.ceil((count || 0) / perPage);
    return { posts: (data as Post[]) || [], totalPages };
}
