"use server";

import { createClient } from "@/lib/supabase/server";

export interface Course {
    id: string;
    title: string;
    image_url: string | null;
    order: number;
}

export async function getCourses() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("courses")
        .select('id, title, image_url, "order"')
        .eq("is_active", true)
        .order("order", { ascending: true });

    if (error) {
        console.error("getCourses error:", error);
        return [];
    }

    return (data as Course[]) || [];
}
