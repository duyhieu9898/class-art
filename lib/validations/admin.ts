import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const postSchema = z.object({
    title: z.string().min(1, "Tiêu đề không được để trống"),
    slug: z
        .string()
        .min(1, "Slug không được để trống")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ chứa chữ thường, số và dấu gạch ngang"),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    image_url: z.string().optional(),
    section: z.enum(["dao-tao", "tin-tuc", "nhan-vat", "hoc-bong", "workshop", "hoat-dong"]),
    is_published: z.boolean().default(false),
    published_at: z.string().optional(),
});

export const courseSchema = z.object({
    title: z.string().min(1, "Tên khóa học không được để trống"),
    image_url: z.string().optional(),
    order: z.number().int().min(0).default(0),
    is_active: z.boolean().default(true),
});

export const partnerSchema = z.object({
    name: z.string().min(1, "Tên đối tác không được để trống"),
    logo_url: z.string().optional(),
    website_url: z.string().url("URL không hợp lệ").optional().or(z.literal("")),
    order: z.number().int().min(0).default(0),
    is_active: z.boolean().default(true),
});

export const infoSchema = z.object({
    phone: z.string().min(1, "Số điện thoại không được để trống"),
    email: z.string().email("Email không hợp lệ"),
    address: z.string().min(1, "Địa chỉ không được để trống"),
    facebook_url: z.string().url("Link Facebook không hợp lệ").optional().or(z.literal("")),
    youtube_url: z.string().url("Link Youtube không hợp lệ").optional().or(z.literal("")),
    tiktok_url: z.string().url("Link Tiktok không hợp lệ").optional().or(z.literal("")),
    instagram_url: z.string().url("Link Instagram không hợp lệ").optional().or(z.literal("")),
    copyright_text: z.string().min(1, "Copyright không được để trống"),
    footer_description: z.string().optional().or(z.literal("")),
});

export const voucherSchema = z.object({
    code: z
        .string()
        .trim()
        .min(1, "Mã voucher không được để trống")
        .transform((value) => value.toUpperCase()),
    percent_discount: z.coerce.number().int("Phần trăm giảm giá phải là số nguyên").min(1).max(100),
});

export const aboutSchema = z.object({
    // Hero - Sứ mệnh section
    hero_image_url: z.string().optional().or(z.literal("")),
    hero_mission: z.string().optional().or(z.literal("")),
    hero_philosophy: z.string().optional().or(z.literal("")),
    hero_culture: z.string().optional().or(z.literal("")),
    // Về REF ACADEMY section
    about_title: z.string().optional().or(z.literal("")),
    about_description_1: z.string().optional().or(z.literal("")),
    about_description_2: z.string().optional().or(z.literal("")),
    about_image_url: z.string().optional().or(z.literal("")),
    // Lịch sử hình thành (moved from info)
    history_image_url: z.string().optional().or(z.literal("")),
    history_milestones: z
        .array(
            z.object({
                year: z.string().min(1, "Năm không được để trống"),
                desc: z.string().min(1, "Mô tả không được để trống"),
            })
        )
        .default([]),
});

export const admissionsSchema = z.object({
    admissions_banner_url: z.string().nullable().optional(),
    admissions_degree_image_url: z.string().nullable().optional(),
    admissions_degree_title: z.string().min(1, "Tiêu đề không được để trống"),
    admissions_degree_content: z.string().min(1, "Nội dung không được để trống"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type PostInput = z.infer<typeof postSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type PartnerInput = z.infer<typeof partnerSchema>;
export type InfoInput = z.infer<typeof infoSchema>;
export type AboutInput = z.infer<typeof aboutSchema>;
export type VoucherInput = z.infer<typeof voucherSchema>;
export type AdmissionsInput = z.infer<typeof admissionsSchema>;
