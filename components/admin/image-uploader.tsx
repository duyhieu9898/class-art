"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { validateImageFile } from "@/lib/validations/image";
import { getImageUrl } from "@/lib/supabase/storage";
import imageCompression from "browser-image-compression";

interface ImageUploaderProps {
    folder: string;
    value: string | null;
    onChange: (path: string | null) => void;
}

const IMAGE_BUCKET = "images";

export function ImageUploader({ folder, value, onChange }: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const supabase = createClient();

    // Determine dynamic maxWidthOrHeight based on 1.5x of maximum render size
    let maxWidthOrHeight = 1200; // Default fallback
    if (folder === "partners") {
        maxWidthOrHeight = 360; // 1.5x of ~240px wide render
    } else if (folder === "courses") {
        maxWidthOrHeight = 675; // 1.5x of ~450px high render (tallest state)
    } else if (folder === "posts") {
        maxWidthOrHeight = 1650; // 1.5x of ~1100px wide render in post details
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate size and file type first
        const validation = validateImageFile(file);
        if (!validation.valid) {
            setError(validation.error || "File không hợp lệ");
            return;
        }

        setError(null);
        setIsUploading(true);

        try {
            // 1. Compress & resize image to exactly 1.5x render resolution
            const compressionOptions = {
                maxSizeMB: 0.8, // Maximum file size (target < 800KB)
                maxWidthOrHeight: maxWidthOrHeight, // Smart resizing based on entity type
                useWebWorker: true,
                fileType: "image/jpeg",
            };

            const compressedFile = await imageCompression(file, compressionOptions);

            // 2. Generate unique filename and upload to Supabase Storage
            const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.jpg`;

            const { error: uploadError } = await supabase.storage.from(IMAGE_BUCKET).upload(filename, compressedFile, {
                contentType: "image/jpeg",
            });

            if (uploadError) {
                setError("Tải ảnh thất bại. Vui lòng thử lại.");
                return;
            }

            onChange(filename);
        } catch (err) {
            console.error("Compression/Upload error:", err);
            setError("Nén hoặc tải ảnh thất bại. Vui lòng thử lại.");
        } finally {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    }

    function handleRemove() {
        onChange(null);
        setError(null);
    }

    const imageUrl = value ? getImageUrl(value) : null;

    return (
        <div className="space-y-2">
            {imageUrl && value ? (
                <div className="relative inline-block">
                    <Image src={imageUrl} alt="Preview" width={200} height={200} className="rounded-md object-cover" />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    className="cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400"
                    onClick={() => inputRef.current?.click()}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            <p className="text-sm text-gray-500">Đang tải lên...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <p className="text-sm text-gray-500">Nhấn để chọn ảnh</p>
                            <p className="text-xs text-gray-400">JPEG, PNG, WebP, GIF (tối đa 5MB)</p>
                        </div>
                    )}
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
