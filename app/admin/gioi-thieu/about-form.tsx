"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { aboutSchema, type AboutInput } from "@/lib/validations/admin";
import { updateAboutInfo } from "@/actions/admin/info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";
import { toast } from "sonner";
import { Loader2, Image as ImageIcon, BookOpen, History, Plus, Trash2 } from "lucide-react";

type AboutFormValues = z.input<typeof aboutSchema>;

interface AboutFormProps {
    initialData: {
        hero_image_url: string | null;
        hero_mission: string | null;
        hero_philosophy: string | null;
        hero_culture: string | null;
        about_title: string | null;
        about_description_1: string | null;
        about_description_2: string | null;
        about_image_url: string | null;
        history_image_url: string | null;
        history_milestones: { year: string; desc: string }[] | null;
    } | null;
}

export function AboutForm({ initialData }: AboutFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AboutFormValues>({
        resolver: zodResolver(aboutSchema),
        defaultValues: {
            hero_image_url: initialData?.hero_image_url || "",
            hero_mission:
                initialData?.hero_mission ||
                "Cung cấp nhân lực chất lượng giúp đỡ học viên có thể tiếp cận cơ hội việc làm.",
            hero_philosophy:
                initialData?.hero_philosophy || "Giáo dục đào tạo là tổ chức và quản trị việc tự học của người học.",
            hero_culture:
                initialData?.hero_culture ||
                "Tôn trọng, Đổi mới, Đồng đội, Chí công\nGương mẫu, Sáng suốt\nHọc thật, thi thật, thành công thật\nLàm khác để làm tốt.",
            about_title: initialData?.about_title || "Về REF ACADEMY",
            about_description_1:
                initialData?.about_description_1 ||
                "REF ACADEMY là đơn vị tiên phong đào tạo sử dụng trí tuệ nhân tạo tích hợp công nghệ vào trong thiết kế",
            about_description_2:
                initialData?.about_description_2 ||
                "Với mong muốn đồng hành cùng người trẻ trong việc ứng dụng trí tuệ nhân tạo vào trong thiết kế, với hy vọng giúp đỡ các học viên tự tin trên con đường theo đuổi trong con đường thiết kế đồ họa.",
            about_image_url: initialData?.about_image_url || "",
            history_image_url: initialData?.history_image_url || "",
            history_milestones: initialData?.history_milestones || [
                { year: "7/2004", desc: "Thành lập REF ACADEMY" },
                { year: "2009", desc: "Hi4 Coffee" },
                { year: "2011", desc: "193 Nguyễn Văn Linh, TP. Đà Nẵng" },
                { year: "2019", desc: "35 Nại Nam, TP. Đà Nẵng" },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "history_milestones",
    });

    async function onSubmit(data: AboutFormValues) {
        setIsSubmitting(true);
        const result = await updateAboutInfo(data as AboutInput);
        setIsSubmitting(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Cập nhật cấu hình giới thiệu thành công!");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-8">
            {/* Hero - Sứ mệnh */}
            <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 border-b pb-3 text-lg font-bold text-gray-900">
                    <ImageIcon className="h-5 w-5 text-[#363E91]" />
                    Hero - Sứ mệnh
                </h2>

                {/* Hero banner image */}
                <div className="space-y-2">
                    <Label className="font-semibold text-gray-700">Ảnh nền Hero</Label>
                    <Controller
                        control={control}
                        name="hero_image_url"
                        render={({ field }) => (
                            <ImageUploader
                                folder="about"
                                maxWidthOrHeight={1600}
                                value={field.value || null}
                                onChange={(path) => field.onChange(path || "")}
                            />
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Sứ mệnh */}
                    <div className="space-y-2">
                        <Label htmlFor="hero_mission" className="font-semibold text-gray-700">
                            Nội dung Sứ mệnh
                        </Label>
                        <Textarea
                            id="hero_mission"
                            {...register("hero_mission")}
                            placeholder="e.g. Cung cấp nhân lực chất lượng..."
                            rows={4}
                        />
                    </div>

                    {/* Triết lý giáo dục */}
                    <div className="space-y-2">
                        <Label htmlFor="hero_philosophy" className="font-semibold text-gray-700">
                            Nội dung Triết lý giáo dục
                        </Label>
                        <Textarea
                            id="hero_philosophy"
                            {...register("hero_philosophy")}
                            placeholder="e.g. Giáo dục đào tạo là tổ chức và quản trị..."
                            rows={4}
                        />
                    </div>
                </div>

                {/* Văn hóa */}
                <div className="space-y-2">
                    <Label htmlFor="hero_culture" className="font-semibold text-gray-700">
                        Nội dung Văn hóa
                    </Label>
                    <Textarea
                        id="hero_culture"
                        {...register("hero_culture")}
                        placeholder="e.g. Tôn trọng, Đổi mới, Đồng đội..."
                        rows={4}
                    />
                    <p className="text-xs text-gray-500">Mỗi dòng sẽ xuống hàng trên website.</p>
                </div>
            </div>

            {/* Về REF ACADEMY */}
            <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 border-b pb-3 text-lg font-bold text-gray-900">
                    <BookOpen className="h-5 w-5 text-[#363E91]" />
                    Về REF ACADEMY
                </h2>

                <div className="space-y-2">
                    <Label htmlFor="about_title" className="font-semibold text-gray-700">
                        Tiêu đề
                    </Label>
                    <Input id="about_title" {...register("about_title")} placeholder="e.g. Về REF ACADEMY" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="about_description_1" className="font-semibold text-gray-700">
                            Đoạn mô tả 1
                        </Label>
                        <Textarea
                            id="about_description_1"
                            {...register("about_description_1")}
                            placeholder="e.g. REF ACADEMY là đơn vị tiên phong..."
                            rows={5}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="about_description_2" className="font-semibold text-gray-700">
                            Đoạn mô tả 2
                        </Label>
                        <Textarea
                            id="about_description_2"
                            {...register("about_description_2")}
                            placeholder="e.g. Với mong muốn đồng hành cùng người trẻ..."
                            rows={5}
                        />
                    </div>
                </div>

                {/* About banner image */}
                <div className="space-y-2">
                    <Label className="font-semibold text-gray-700">Ảnh banner</Label>
                    <Controller
                        control={control}
                        name="about_image_url"
                        render={({ field }) => (
                            <ImageUploader
                                folder="about"
                                maxWidthOrHeight={940}
                                value={field.value || null}
                                onChange={(path) => field.onChange(path || "")}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Lịch sử hình thành & phát triển */}
            <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 border-b pb-3 text-lg font-bold text-gray-900">
                    <History className="h-5 w-5 text-[#363E91]" />
                    Lịch sử hình thành &amp; phát triển
                </h2>

                {/* Banner Image */}
                <div className="space-y-2">
                    <Label className="font-semibold text-gray-700">Ảnh banner Lịch sử</Label>
                    <Controller
                        control={control}
                        name="history_image_url"
                        render={({ field }) => (
                            <ImageUploader
                                folder="about"
                                maxWidthOrHeight={1600}
                                value={field.value || null}
                                onChange={(path) => field.onChange(path || "")}
                            />
                        )}
                    />
                </div>

                {/* Milestones List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="font-semibold text-gray-700">Các mốc lịch sử</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ year: "", desc: "" })}
                            className="flex items-center gap-1 border-[#363E91] text-[#363E91] hover:bg-[#363E91]/10"
                        >
                            <Plus className="h-4 w-4" />
                            Thêm mốc lịch sử
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="flex items-start gap-4 rounded-md border border-gray-100 bg-gray-50/50 p-4"
                            >
                                <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-4">
                                    <div className="space-y-1 sm:col-span-1">
                                        <Label htmlFor={`milestones-${index}-year`} className="text-xs text-gray-500">
                                            Mốc thời gian
                                        </Label>
                                        <Input
                                            id={`milestones-${index}-year`}
                                            {...register(`history_milestones.${index}.year` as const)}
                                            placeholder="e.g. 7/2004, 2011"
                                            className="bg-white"
                                        />
                                        {errors.history_milestones?.[index]?.year && (
                                            <p className="text-xs text-red-500">
                                                {errors.history_milestones[index].year.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1 sm:col-span-3">
                                        <Label htmlFor={`milestones-${index}-desc`} className="text-xs text-gray-500">
                                            Mô tả chi tiết
                                        </Label>
                                        <Input
                                            id={`milestones-${index}-desc`}
                                            {...register(`history_milestones.${index}.desc` as const)}
                                            placeholder="e.g. Thành lập REF ACADEMY"
                                            className="bg-white"
                                        />
                                        {errors.history_milestones?.[index]?.desc && (
                                            <p className="text-xs text-red-500">
                                                {errors.history_milestones[index].desc.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="mt-6 text-red-500 hover:bg-red-50 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}

                        {fields.length === 0 && (
                            <p className="rounded-md border border-dashed bg-gray-50/20 py-6 text-center text-sm text-gray-500">
                                Chưa có mốc lịch sử nào. Hãy bấm nút phía trên để thêm mới.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit */}
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
