"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAdminRegistrations(page: number = 1, perPage: number = 10, formType?: string) {
    const supabase = await createClient();
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    let query = supabase
        .from("registrations")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

    if (formType) {
        query = query.eq("form_type", formType);
    }

    const { data, count, error } = await query;

    if (error) {
        console.error("Error fetching registrations:", error);
        return { data: [], total: 0 };
    }

    return { data: data ?? [], total: count ?? 0 };
}

export async function getAdminRegistrationById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("registrations").select("*").eq("id", id).single();

    if (error) {
        console.error("Error fetching registration:", error);
        return null;
    }

    return data;
}
