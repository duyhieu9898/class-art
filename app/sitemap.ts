import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { type PostSection } from "@/actions/posts";

const SITE_URL = "https://www.refacademy.com.vn";
const STATIC_LAST_MODIFIED = new Date("2026-05-29");

const staticRoutes = ["", "/gioi-thieu", "/dao-tao", "/tuyen-sinh", "/tin-tuc", "/nhan-vat"];

const sectionPaths: Partial<Record<PostSection, string>> = {
    "dao-tao": "/dao-tao",
    "tin-tuc": "/tin-tuc",
    "nhan-vat": "/nhan-vat",
    "hoc-bong": "/tuyen-sinh",
};

interface SitemapPost {
    slug: string;
    section: PostSection;
    published_at: string | null;
    updated_at?: string | null;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("posts")
        .select("slug, section, published_at, updated_at")
        .eq("is_published", true)
        .in("section", Object.keys(sectionPaths));

    const staticEntries = staticRoutes.map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    if (error) {
        console.error("sitemap posts error:", error);
        return staticEntries;
    }

    const postEntries = ((data as SitemapPost[]) || []).flatMap((post) => {
        const basePath = sectionPaths[post.section];
        if (!basePath) return [];

        const lastModified =
            post.updated_at || post.published_at
                ? new Date(post.updated_at || post.published_at!)
                : STATIC_LAST_MODIFIED;

        return {
            url: `${SITE_URL}${basePath}/${post.slug}`,
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        };
    });

    return [...staticEntries, ...postEntries];
}
