"use client";

import { useState } from "react";
import { updateAdmissionsSettings } from "@/actions/admin/info";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";
import { toast } from "sonner";
import { Loader2, Image as ImageIcon, Award } from "lucide-react";

interface AdmissionsFormProps {
    initialBannerUrl: string | null;
    initialDegreeImageUrl: string | null;
    initialDegreeTitle: string | null;
    initialDegreeContent: string | null;
}

export function AdmissionsForm({
    initialBannerUrl,
    initialDegreeImageUrl,
    initialDegreeTitle,
    initialDegreeContent,
}: AdmissionsFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bannerUrl, setBannerUrl] = useState<string | null>(initialBannerUrl);
    const [degreeImageUrl, setDegreeImageUrl] = useState<string | null>(initialDegreeImageUrl);
    const [degreeTitle, setDegreeTitle] = useState(initialDegreeTitle || "");
    const [degreeContent, setDegreeContent] = useState(initialDegreeContent || "");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await updateAdmissionsSettings({
            admissions_banner_url: bannerUrl,
            admissions_degree_image_url: degreeImageUrl,
            admissions_degree_title: degreeTitle,
            admissions_degree_content: degreeContent,
        });
        setIsSubmitting(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Cập nhật cấu hình tuyển sinh thành công!");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
            {/* Banner Section */}
            <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 border-b pb-3 text-lg font-bold text-gray-900">
                    <ImageIcon className="h-5 w-5 text-[#363E91]" />
                    Banner trang tuyển sinh
                </h2>

                <div className="space-y-2">
                    <Label className="font-semibold text-gray-700">Ảnh banner Tuyển sinh</Label>
                    <ImageUploader folder="posts" maxWidthOrHeight={1920} value={bannerUrl} onChange={setBannerUrl} />
                    <p className="text-muted-foreground mt-1 text-xs">
                        Kích thước khuyên dùng: 1920x561px. Ảnh sẽ được lưu trữ trong thư mục &quot;posts&quot;.
                    </p>
                </div>
            </div>

            {/* Degree Section */}
            <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 border-b pb-3 text-lg font-bold text-gray-900">
                    <Award className="h-5 w-5 text-[#363E91]" />
                    Cấu hình phần Bằng cấp
                </h2>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="font-semibold text-gray-700">Ảnh bằng cấp</Label>
                        <ImageUploader folder="posts" value={degreeImageUrl} onChange={setDegreeImageUrl} />
                        <p className="text-muted-foreground mt-1 text-xs">
                            Kích thước khuyên dùng: 667x433px (tỷ lệ khoảng 3:2). Ảnh sẽ được lưu trữ trong thư mục
                            &quot;posts&quot;.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="degreeTitle" className="font-semibold text-gray-700">
                            Tiêu đề
                        </Label>
                        <Input
                            id="degreeTitle"
                            type="text"
                            value={degreeTitle}
                            onChange={(e) => setDegreeTitle(e.target.value)}
                            placeholder="Nhập tiêu đề (Ví dụ: Bằng cấp)"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="degreeContent" className="font-semibold text-gray-700">
                            Nội dung
                        </Label>
                        <Textarea
                            id="degreeContent"
                            value={degreeContent}
                            onChange={(e) => setDegreeContent(e.target.value)}
                            placeholder="Nhập nội dung mô tả bằng cấp..."
                            rows={6}
                            required
                        />
                        <p className="text-muted-foreground mt-1 text-xs">Hỗ trợ xuống dòng để ngắt đoạn văn bản.</p>
                    </div>
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
