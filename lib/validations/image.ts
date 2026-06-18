const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export interface ImageValidationResult {
    valid: boolean;
    error?: string;
}

export function validateImageFile(file: { type: string; size: number }): ImageValidationResult {
    if (!ALLOWED_TYPES.includes(file.type)) {
        return { valid: false, error: "Chỉ chấp nhận file ảnh (JPEG, PNG, WebP)" };
    }
    if (file.size > MAX_SIZE_BYTES) {
        return { valid: false, error: "Kích thước file không được vượt quá 5MB" };
    }
    return { valid: true };
}
