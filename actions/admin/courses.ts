"use server";

import { createClient } from "@/lib/supabase/server";
import { courseSchema, type CourseInput } from "@/lib/validations/admin";
import { revalidatePath } from "next/cache";

export async function getAdminCourses() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("courses").select("*").order("order", { ascending: true });

    if (error) {
        console.error("Error fetching courses:", error);
        return [];
    }

    return data ?? [];
}

export async function getAdminCourseById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("courses").select("*").eq("id", id).single();

    if (error) {
        console.error("Error fetching course:", error);
        return null;
    }

    return data;
}

export async function createCourse(input: CourseInput) {
    const parsed = courseSchema.safeParse(input);
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

    const { error } = await supabase.from("courses").insert(parsed.data);

    if (error) {
        console.error("Error creating course:", error);
        return { error: "Tạo khóa học thất bại" };
    }

    revalidatePath("/admin/courses");
    revalidatePath("/");
    return { success: true };
}

export async function updateCourse(id: string, input: CourseInput) {
    const parsed = courseSchema.safeParse(input);
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

    const { error } = await supabase.from("courses").update(parsed.data).eq("id", id);

    if (error) {
        console.error("Error updating course:", error);
        return { error: "Cập nhật khóa học thất bại" };
    }

    revalidatePath("/admin/courses");
    revalidatePath("/");
    return { success: true };
}

export async function deleteCourse(id: string) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Chưa đăng nhập" };
    }

    const { error } = await supabase.from("courses").delete().eq("id", id);

    if (error) {
        console.error("Error deleting course:", error);
        return { error: "Xóa khóa học thất bại" };
    }

    revalidatePath("/admin/courses");
    revalidatePath("/");
    return { success: true };
}
