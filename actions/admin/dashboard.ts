"use server";

import { createClient } from "@/lib/supabase/server";

export interface DashboardStats {
    totalPosts: number;
    publishedPosts: number;
    totalRegistrations: number;
    recentRegistrations: number;
    totalCourses: number;
    totalPartners: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const supabase = await createClient();

    const [
        postsResult,
        publishedPostsResult,
        registrationsResult,
        recentRegistrationsResult,
        coursesResult,
        partnersResult,
    ] = await Promise.all([
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("posts").select("*", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("registrations").select("*", { count: "exact", head: true }),
        supabase
            .from("registrations")
            .select("*", { count: "exact", head: true })
            .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from("courses").select("*", { count: "exact", head: true }),
        supabase.from("partners").select("*", { count: "exact", head: true }),
    ]);

    return {
        totalPosts: postsResult.count ?? 0,
        publishedPosts: publishedPostsResult.count ?? 0,
        totalRegistrations: registrationsResult.count ?? 0,
        recentRegistrations: recentRegistrationsResult.count ?? 0,
        totalCourses: coursesResult.count ?? 0,
        totalPartners: partnersResult.count ?? 0,
    };
}
