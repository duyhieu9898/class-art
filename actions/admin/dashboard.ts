"use server";

import { createClient } from "@/lib/supabase/server";

export interface RegistrationStat {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    form_type: string | null;
    voucher: string | null;
    created_at: string;
}

export interface DashboardStats {
    totalPosts: number;
    publishedPosts: number;
    totalRegistrations: number;
    recentRegistrations: number;
    totalCourses: number;
    totalPartners: number;
    recentRegistrationsList: RegistrationStat[];
    dailyStats: { date: string; count: number }[];
    formTypeStats: { type: string; count: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const supabase = await createClient();

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [
        postsResult,
        publishedPostsResult,
        registrationsResult,
        recentRegistrationsResult,
        coursesResult,
        partnersResult,
        recentListResult,
        chartDataResult,
        regCourse,
        regConsult,
        regTour,
    ] = await Promise.all([
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("posts").select("*", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("registrations").select("*", { count: "exact", head: true }),
        supabase
            .from("registrations")
            .select("*", { count: "exact", head: true })
            .gte("created_at", thirtyDaysAgo),
        supabase.from("courses").select("*", { count: "exact", head: true }),
        supabase.from("partners").select("*", { count: "exact", head: true }),
        supabase
            .from("registrations")
            .select("id, full_name, email, phone, form_type, voucher, created_at")
            .order("created_at", { ascending: false })
            .limit(5),
        supabase
            .from("registrations")
            .select("created_at")
            .gte("created_at", thirtyDaysAgo),
        supabase.from("registrations").select("*", { count: "exact", head: true }).eq("form_type", "Đăng ký khóa học"),
        supabase.from("registrations").select("*", { count: "exact", head: true }).eq("form_type", "Tư vấn khóa học"),
        supabase.from("registrations").select("*", { count: "exact", head: true }).eq("form_type", "Tham quan cơ sở"),
    ]);

    // Compute daily registrations for the last 30 days
    const dailyStatsMap: { [key: string]: number } = {};
    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
        dailyStatsMap[dateStr] = 0;
    }

    if (chartDataResult.data) {
        chartDataResult.data.forEach((reg) => {
            const dateStr = new Date(reg.created_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
            if (dateStr in dailyStatsMap) {
                dailyStatsMap[dateStr]++;
            }
        });
    }

    const dailyStats = Object.keys(dailyStatsMap).map((date) => ({
        date,
        count: dailyStatsMap[date],
    }));

    const formTypeStats = [
        { type: "Đăng ký khóa học", count: regCourse.count ?? 0 },
        { type: "Tư vấn khóa học", count: regConsult.count ?? 0 },
        { type: "Tham quan cơ sở", count: regTour.count ?? 0 },
    ];

    return {
        totalPosts: postsResult.count ?? 0,
        publishedPosts: publishedPostsResult.count ?? 0,
        totalRegistrations: registrationsResult.count ?? 0,
        recentRegistrations: recentRegistrationsResult.count ?? 0,
        totalCourses: coursesResult.count ?? 0,
        totalPartners: partnersResult.count ?? 0,
        recentRegistrationsList: recentListResult.data ?? [],
        dailyStats,
        formTypeStats,
    };
}
