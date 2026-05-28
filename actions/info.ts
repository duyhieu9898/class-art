"use server";

import { createClient } from "@/lib/supabase/server";

export interface FooterInfo {
    id: string;
    phone: string | null;
    email: string | null;
    address: string | null;
    facebook_url: string | null;
    youtube_url: string | null;
    tiktok_url: string | null;
    instagram_url: string | null;
    copyright_text: string | null;
    footer_description: string | null;
}

export async function getFooterInfo(): Promise<FooterInfo | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("info").select("*").eq("id", "site_settings").maybeSingle();

    if (error) {
        console.error("Error fetching footer info:", error);
        return null;
    }

    return data;
}
