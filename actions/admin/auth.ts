"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/admin";
import { redirect } from "next/navigation";

export async function login(input: { email: string; password: string }) {
    const parsed = loginSchema.safeParse(input);
    if (!parsed.success) {
        return { error: "Dữ liệu không hợp lệ" };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
    });

    if (error) {
        return { error: "Email hoặc mật khẩu không đúng" };
    }

    redirect("/admin");
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
}
