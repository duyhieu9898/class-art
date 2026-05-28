"use server";

import { createClient } from "@/lib/supabase/server";

export interface Partner {
    id: string;
    name: string;
    logo_url: string | null;
    website_url: string | null;
    order: number;
}

export async function getPartners() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("partners")
        .select('id, name, logo_url, website_url, "order"')
        .eq("is_active", true)
        .order("order", { ascending: true });

    if (error) {
        console.error("getPartners error:", error);
        return [];
    }

    return (data as Partner[]) || [];
}
