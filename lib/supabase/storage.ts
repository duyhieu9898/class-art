/**
 * Get public URL for an image stored in Supabase Storage.
 * If the path starts with "/" (local public folder), returns as-is for backward compatibility.
 * If it's a storage path, constructs the Supabase public URL.
 */
export function getImageUrl(path: string | null): string {
    if (!path) return "/images/hero-banner.png"; // fallback

    // Already a full URL (Supabase storage or external)
    if (path.startsWith("http")) return path;

    // Local public folder path (backward compatible during migration)
    if (path.startsWith("/")) return path;

    // Supabase storage path — construct public URL
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return `${supabaseUrl}/storage/v1/object/public/images/${path}`;
}
