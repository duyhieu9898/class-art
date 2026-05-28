"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

const registrationSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(9),
    voucher: z.string().optional(),
    formType: z.enum(["Đăng ký khóa học", "Tư vấn khóa học", "Tham quan cơ sở"]),
    sourcePage: z.string().optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

async function sendTelegramNotification(data: RegistrationInput) {
    const message = [
        "🎓 *Đăng ký mới!*",
        "",
        `👤 *Họ tên:* ${data.fullName}`,
        `📧 *Email:* ${data.email}`,
        `📱 *SĐT:* ${data.phone}`,
        `📋 *Loại:* ${data.formType}`,
        data.voucher ? `🎟 *Voucher:* ${data.voucher}` : "",
    ]
        .filter(Boolean)
        .join("\n");

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: "Markdown",
            }),
        });
    } catch (err) {
        console.error("Telegram notification error:", err);
    }
}

export async function submitRegistration(input: RegistrationInput) {
    const parsed = registrationSchema.safeParse(input);

    if (!parsed.success) {
        return { error: "Dữ liệu không hợp lệ", details: parsed.error.flatten() };
    }

    const supabase = await createClient();

    const { error } = await supabase.from("registrations").insert({
        full_name: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        voucher: parsed.data.voucher || null,
        form_type: parsed.data.formType,
        source_page: parsed.data.sourcePage || null,
    });

    if (error) {
        console.error("Registration error:", error);
        return { error: "Gửi thông tin thất bại. Vui lòng thử lại." };
    }

    // Send Telegram notification (non-blocking)
    sendTelegramNotification(parsed.data);

    return { success: true };
}
