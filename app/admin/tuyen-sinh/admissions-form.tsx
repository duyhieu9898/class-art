"use client";

import { useState } from "react";
import { updateAdmissionsBanner } from "@/actions/admin/info";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/admin/image-uploader";
import { toast } from "sonner";
import { Loader2, Image as ImageIcon } from "lucide-react";

interface AdmissionsFormProps {
    initialBannerUrl: string | null;
}

export function AdmissionsForm({ initialBannerUrl }: AdmissionsFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bannerUrl, setBannerUrl] = useState<string | null>(initialBannerUrl);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await updateAdmissionsBanner(bannerUrl);
        setIsSubmitting(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Cập nhật banner tuyển sinh thành công!");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
            <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 border-b pb-3 text-lg font-bold text-gray-900">
                    <ImageIcon className="h-5 w-5 text-[#363E91]" />
                    Banner trang tuyển sinh
                </h2>

                <div className="space-y-2">
                    <Label className="font-semibold text-gray-700">Ảnh banner Tuyển sinh</Label>
                    <ImageUploader
                        folder="posts"
                        value={bannerUrl}
                        onChange={setBannerUrl}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        Kích thước khuyên dùng: 1920x561px. Ảnh sẽ được lưu trữ trong thư mục &quot;posts&quot;.
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="bg-[#363E91] text-white hover:bg-[#282f6e]">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Đang lưu...
                        </>
                    ) : (
                        "Lưu cấu hình"
                    )}
                </Button>
            </div>
        </form>
    );
}
