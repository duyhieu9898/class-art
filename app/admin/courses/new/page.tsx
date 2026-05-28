"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { courseSchema, type CourseInput } from "@/lib/validations/admin";
import { createCourse } from "@/actions/admin/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "@/components/admin/image-uploader";
import { toast } from "sonner";

type CourseFormValues = z.input<typeof courseSchema>;

export default function NewCoursePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            image_url: "",
            order: 0,
            is_active: true,
        },
    });

    async function onSubmit(data: CourseFormValues) {
        setIsSubmitting(true);
        const result = await createCourse(data as CourseInput);
        if (result.error) {
            toast.error(result.error);
            setIsSubmitting(false);
        } else {
            toast.success("Tạo khóa học thành công");
            router.push("/admin/courses");
        }
    }

    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold">Tạo khóa học mới</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Tên khóa học</Label>
                    <Input id="title" {...register("title")} />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Ảnh</Label>
                    <Controller
                        control={control}
                        name="image_url"
                        render={({ field }) => (
                            <ImageUploader
                                folder="courses"
                                value={field.value || null}
                                onChange={(path) => field.onChange(path || "")}
                            />
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="order">Thứ tự</Label>
                    <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
                    {errors.order && <p className="text-sm text-red-500">{errors.order.message}</p>}
                </div>

                <div className="flex items-center gap-3">
                    <Controller
                        control={control}
                        name="is_active"
                        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                    />
                    <Label>Hoạt động</Label>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Đang lưu..." : "Tạo khóa học"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Hủy
                    </Button>
                </div>
            </form>
        </div>
    );
}
