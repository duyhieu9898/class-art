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
            price: 0,
            duration_lessons: 12,
            lesson_minutes: 90,
            start_date: "",
            end_date: "",
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="price">Học phí (VND)</Label>
                        <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
                        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration_lessons">Số buổi học</Label>
                        <Input
                            id="duration_lessons"
                            type="number"
                            {...register("duration_lessons", { valueAsNumber: true })}
                        />
                        {errors.duration_lessons && (
                            <p className="text-sm text-red-500">{errors.duration_lessons.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lesson_minutes">Thời lượng/buổi (phút)</Label>
                        <Input
                            id="lesson_minutes"
                            type="number"
                            {...register("lesson_minutes", { valueAsNumber: true })}
                        />
                        {errors.lesson_minutes && (
                            <p className="text-sm text-red-500">{errors.lesson_minutes.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="start_date">Ngày bắt đầu</Label>
                        <Input id="start_date" type="date" {...register("start_date")} />
                        {errors.start_date && <p className="text-sm text-red-500">{errors.start_date.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="end_date">Ngày kết thúc</Label>
                        <Input id="end_date" type="date" {...register("end_date")} />
                        {errors.end_date && <p className="text-sm text-red-500">{errors.end_date.message}</p>}
                    </div>
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
