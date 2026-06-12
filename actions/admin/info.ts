"use server";

import { createClient } from "@/lib/supabase/server";
import { infoSchema, type InfoInput, admissionsSchema, type AdmissionsInput } from "@/lib/validations/admin";
import { revalidatePath } from "next/cache";

export async function updateFooterInfo(input: InfoInput) {
    const parsed = infoSchema.safeParse(input);
    if (!parsed.success) {
        return { error: "Dữ liệu không hợp lệ" };
    }

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Chưa đăng nhập" };
    }

    const { error } = await supabase.from("info").upsert({
        id: "site_settings",
        ...parsed.data,
        updated_at: new Date().toISOString(),
    });

    if (error) {
        console.error("Error updating footer info:", error);
        return { error: "Cập nhật thông tin thất bại" };
    }

    revalidatePath("/");
    revalidatePath("/dao-tao");
    revalidatePath("/tin-tuc");
    revalidatePath("/nhan-vat");
    revalidatePath("/tuyen-sinh");
    revalidatePath("/gioi-thieu");
    return { success: true };
}

export async function updateAdmissionsSettings(input: AdmissionsInput) {
    const parsed = admissionsSchema.safeParse(input);
    if (!parsed.success) {
        return { error: "Dữ liệu không hợp lệ" };
    }

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Chưa đăng nhập" };
    }

    const { error } = await supabase
        .from("info")
        .update({
            admissions_banner_url: parsed.data.admissions_banner_url || null,
            admissions_degree_image_url: parsed.data.admissions_degree_image_url || null,
            admissions_degree_title: parsed.data.admissions_degree_title,
            admissions_degree_content: parsed.data.admissions_degree_content,
            updated_at: new Date().toISOString(),
        })
        .eq("id", "site_settings");

    if (error) {
        console.error("Error updating admissions settings:", error);
        return { error: "Cập nhật cấu hình tuyển sinh thất bại" };
    }

    revalidatePath("/tuyen-sinh");
    return { success: true };
}
