"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { infoSchema, type InfoInput } from "@/lib/validations/admin";
import { updateFooterInfo } from "@/actions/admin/info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Phone, Mail, MapPin, Globe, Award } from "lucide-react";

type InfoFormValues = z.input<typeof infoSchema>;

interface InfoFormProps {
    initialData: {
        phone: string | null;
        email: string | null;
        address: string | null;
        facebook_url: string | null;
        youtube_url: string | null;
        tiktok_url: string | null;
        instagram_url: string | null;
        copyright_text: string | null;
        footer_description: string | null;
    } | null;
}

export function InfoForm({ initialData }: InfoFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InfoFormValues>({
        resolver: zodResolver(infoSchema),
        defaultValues: {
            phone: initialData?.phone || "",
            email: initialData?.email || "",
            address: initialData?.address || "",
            facebook_url: initialData?.facebook_url || "",
            youtube_url: initialData?.youtube_url || "",
            tiktok_url: initialData?.tiktok_url || "",
            instagram_url: initialData?.instagram_url || "",
            copyright_text: initialData?.copyright_text || "© 2026 REF Academy. All Rights Reserved.",
            footer_description: initialData?.footer_description || "",
        },
    });

    async function onSubmit(data: InfoFormValues) {
        setIsSubmitting(true);
        const result = await updateFooterInfo(data as InfoInput);
        setIsSubmitting(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Cập nhật cấu hình thành công!");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-8">
            {/* Contact Section */}
            <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 border-b pb-3 text-lg font-bold text-gray-900">
                    <Phone className="h-5 w-5 text-[#363E91]" />
                    Thông tin liên hệ chính
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-1">
                            Số điện thoại <span className="text-red-500">*</span>
                        </Label>
                        <Input id="phone" {...register("phone")} placeholder="e.g. 0967 749 311" />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-1">
                            Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="e.g. contact@refacademy.vn"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        Địa chỉ <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="address"
                        {...register("address")}
                        placeholder="e.g. Số 35 Nại Nam, P. Hòa Cường, Đà Nẵng"
                    />
                    {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                </div>
            </div>

            {/* Social Networks */}
            <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 border-b pb-3 text-lg font-bold text-gray-900">
                    <Globe className="h-5 w-5 text-[#363E91]" />
                    Mạng xã hội
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="facebook_url">Facebook Page URL</Label>
                        <Input
                            id="facebook_url"
                            {...register("facebook_url")}
                            placeholder="e.g. https://facebook.com/..."
                        />
                        {errors.facebook_url && <p className="text-sm text-red-500">{errors.facebook_url.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="youtube_url">Youtube Channel URL</Label>
                        <Input
                            id="youtube_url"
                            {...register("youtube_url")}
                            placeholder="e.g. https://youtube.com/..."
                        />
                        {errors.youtube_url && <p className="text-sm text-red-500">{errors.youtube_url.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tiktok_url">TikTok Profile URL</Label>
                        <Input id="tiktok_url" {...register("tiktok_url")} placeholder="e.g. https://tiktok.com/@..." />
                        {errors.tiktok_url && <p className="text-sm text-red-500">{errors.tiktok_url.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="instagram_url">Profile URL</Label>
                        <Input
                            id="instagram_url"
                            {...register("instagram_url")}
                            placeholder="e.g. https://instagram.com/..."
                        />
                        {errors.instagram_url && <p className="text-sm text-red-500">{errors.instagram_url.message}</p>}
                    </div>
                </div>
            </div>

            {/* Site Description & Copyright */}
            <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 border-b pb-3 text-lg font-bold text-gray-900">
                    <Award className="h-5 w-5 text-[#363E91]" />
                    Thông tin chân trang
                </h2>
                <div className="space-y-2">
                    <Label htmlFor="footer_description">Tiêu đề / Mô tả lớn chân trang</Label>
                    <Textarea
                        id="footer_description"
                        {...register("footer_description")}
                        placeholder="e.g. HỌC VIỆN ĐÀO TẠO TRÍ TUỆ NHÂN TẠO KẾT HỢP VỚI THIẾT KẾ GIÚP HỌC VIÊN TĂNG TỐC ĐỘ LÀM VIỆC"
                        rows={3}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="copyright_text">
                        Copyright Text <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="copyright_text"
                        {...register("copyright_text")}
                        placeholder="e.g. © 2026 REF Academy. All Rights Reserved."
                    />
                    {errors.copyright_text && <p className="text-sm text-red-500">{errors.copyright_text.message}</p>}
                </div>
            </div>

            {/* Submit Buttons */}
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
