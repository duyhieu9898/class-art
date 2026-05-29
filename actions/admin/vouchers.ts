"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { voucherSchema, type VoucherInput } from "@/lib/validations/admin";

export async function getAdminVouchers() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("vouchers").select("*").order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching vouchers:", error);
        return [];
    }

    return data ?? [];
}

export async function createVoucher(input: VoucherInput) {
    const parsed = voucherSchema.safeParse(input);
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

    const { error } = await supabase.from("vouchers").insert(parsed.data);

    if (error?.code === "23505") {
        return { error: "Mã voucher đã tồn tại" };
    }

    if (error?.code === "23514") {
        return { error: "Phần trăm giảm giá phải từ 1 đến 100" };
    }

    if (error?.code === "42P01") {
        return { error: "Chưa tạo bảng voucher. Vui lòng chạy migration Supabase mới." };
    }

    if (error?.code === "42501") {
        return { error: "Tài khoản hiện tại không có quyền tạo voucher" };
    }

    if (error) {
        console.error("Error creating voucher:", error);
        return { error: "Tạo voucher thất bại" };
    }

    revalidatePath("/admin/vouchers");
    return { success: true };
}

export async function deleteVoucher(id: string) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Chưa đăng nhập" };
    }

    const { error } = await supabase.from("vouchers").delete().eq("id", id);

    if (error) {
        console.error("Error deleting voucher:", error);
        return { error: "Xóa voucher thất bại" };
    }

    revalidatePath("/admin/vouchers");
    return { success: true };
}
