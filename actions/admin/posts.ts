"use server";

import { createClient } from "@/lib/supabase/server";
import { postSchema, type PostInput } from "@/lib/validations/admin";
import { revalidatePath } from "next/cache";

export async function getAdminPosts(page: number = 1, perPage: number = 10, section?: string) {
    const supabase = await createClient();
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    let query = supabase.from("posts").select("*", { count: "exact" });

    if (section && section !== "all") {
        query = query.eq("section", section);
    }

    const { data, count, error } = await query.order("created_at", { ascending: false }).range(from, to);

    if (error) {
        console.error("Error fetching posts:", error);
        return { data: [], total: 0 };
    }

    return { data: data ?? [], total: count ?? 0 };
}

export async function getAdminPostById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();

    if (error) {
        console.error("Error fetching post:", error);
        return null;
    }

    return data;
}

export async function createPost(input: PostInput) {
    const parsed = postSchema.safeParse(input);
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

    const { error } = await supabase.from("posts").insert(parsed.data);

    if (error) {
        if (error.code === "23505") {
            return { error: "Slug đã tồn tại" };
        }
        console.error("Error creating post:", error);
        return { error: "Tạo bài viết thất bại" };
    }

    revalidatePath("/admin/posts");
    revalidatePath("/dao-tao");
    revalidatePath("/tin-tuc");
    revalidatePath("/nhan-vat");
    revalidatePath("/tuyen-sinh");
    return { success: true };
}

export async function updatePost(id: string, input: PostInput) {
    const parsed = postSchema.safeParse(input);
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

    const { error } = await supabase.from("posts").update(parsed.data).eq("id", id);

    if (error) {
        if (error.code === "23505") {
            return { error: "Slug đã tồn tại" };
        }
        console.error("Error updating post:", error);
        return { error: "Cập nhật bài viết thất bại" };
    }

    revalidatePath("/admin/posts");
    revalidatePath("/dao-tao");
    revalidatePath("/tin-tuc");
    revalidatePath("/nhan-vat");
    revalidatePath("/tuyen-sinh");
    return { success: true };
}

export async function deletePost(id: string) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Chưa đăng nhập" };
    }

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
        console.error("Error deleting post:", error);
        return { error: "Xóa bài viết thất bại" };
    }

    revalidatePath("/admin/posts");
    revalidatePath("/dao-tao");
    revalidatePath("/tin-tuc");
    revalidatePath("/nhan-vat");
    revalidatePath("/tuyen-sinh");
    return { success: true };
}
