"use server";

import { createClient } from "@/lib/supabase/server";
import { partnerSchema, type PartnerInput } from "@/lib/validations/admin";
import { revalidatePath } from "next/cache";

export async function getAdminPartners() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("partners").select("*").order("order", { ascending: true });

    if (error) {
        console.error("Error fetching partners:", error);
        return [];
    }

    return data ?? [];
}

export async function getAdminPartnerById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("partners").select("*").eq("id", id).single();

    if (error) {
        console.error("Error fetching partner:", error);
        return null;
    }

    return data;
}

export async function createPartner(input: PartnerInput) {
    const parsed = partnerSchema.safeParse(input);
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

    const { error } = await supabase.from("partners").insert(parsed.data);

    if (error) {
        console.error("Error creating partner:", error);
        return { error: "Tạo đối tác thất bại" };
    }

    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
}

export async function updatePartner(id: string, input: PartnerInput) {
    const parsed = partnerSchema.safeParse(input);
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

    const { error } = await supabase.from("partners").update(parsed.data).eq("id", id);

    if (error) {
        console.error("Error updating partner:", error);
        return { error: "Cập nhật đối tác thất bại" };
    }

    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
}

export async function deletePartner(id: string) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Chưa đăng nhập" };
    }

    const { error } = await supabase.from("partners").delete().eq("id", id);

    if (error) {
        console.error("Error deleting partner:", error);
        return { error: "Xóa đối tác thất bại" };
    }

    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
}
