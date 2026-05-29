"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSchema, type PostInput } from "@/lib/validations/admin";
import { updatePost } from "@/actions/admin/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { POST_SECTIONS } from "@/lib/constants/post-sections";
import { SlugInput } from "@/components/admin/slug-input";
import { ImageUploader } from "@/components/admin/image-uploader";
import { toast } from "sonner";

type PostFormValues = z.input<typeof postSchema>;

const RichTextEditor = dynamic(
    () => import("@/components/admin/rich-text-editor").then((mod) => mod.RichTextEditor),
    {
        ssr: false,
        loading: () => <div className="min-h-[250px] rounded-md border bg-gray-50" />,
    }
);

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    image_url: string | null;
    section: "dao-tao" | "tin-tuc" | "nhan-vat" | "hoc-bong" | "workshop" | "hoat-dong";
    is_published: boolean;
    published_at: string;
}

interface PostEditFormProps {
    post: Post;
}

export function PostEditForm({ post }: PostEditFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            content: post.content || "",
            image_url: post.image_url || "",
            section: post.section,
            is_published: post.is_published,
            published_at: post.published_at || "",
        },
    });

    const title = watch("title");

    const handleSlugChange = useCallback((slug: string) => setValue("slug", slug), [setValue]);

    async function onSubmit(data: PostFormValues) {
        setIsSubmitting(true);
        const result = await updatePost(post.id, data as PostInput);
        if (result.error) {
            toast.error(result.error);
            setIsSubmitting(false);
        } else {
            toast.success("Cập nhật bài viết thành công");
            router.push("/admin/posts");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề</Label>
                <Input id="title" {...register("title")} />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <Label>Slug</Label>
                <Controller
                    control={control}
                    name="slug"
                    render={({ field }) => <SlugInput title={title} value={field.value} onChange={handleSlugChange} />}
                />
                {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="excerpt">Mô tả ngắn</Label>
                <Textarea id="excerpt" {...register("excerpt")} rows={3} />
            </div>

            <div className="space-y-2">
                <Label>Nội dung</Label>
                <Controller
                    control={control}
                    name="content"
                    render={({ field }) => <RichTextEditor value={field.value || ""} onChange={field.onChange} />}
                />
            </div>

            <div className="space-y-2">
                <Label>Ảnh đại diện</Label>
                <Controller
                    control={control}
                    name="image_url"
                    render={({ field }) => (
                        <ImageUploader
                            folder="posts"
                            value={field.value || null}
                            onChange={(path) => field.onChange(path || "")}
                        />
                    )}
                />
            </div>

            <div className="space-y-2">
                <Label>Mục</Label>
                <Controller
                    control={control}
                    name="section"
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn mục" />
                            </SelectTrigger>
                            <SelectContent>
                                {POST_SECTIONS.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>
                                        {s.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.section && <p className="text-sm text-red-500">{errors.section.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="published_at">Ngày xuất bản</Label>
                    <Input id="published_at" type="datetime-local" {...register("published_at")} />
                </div>

                <div className="flex items-center gap-3 pt-6">
                    <Controller
                        control={control}
                        name="is_published"
                        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                    />
                    <Label>Xuất bản</Label>
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Đang lưu..." : "Cập nhật"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Hủy
                </Button>
            </div>
        </form>
    );
}
