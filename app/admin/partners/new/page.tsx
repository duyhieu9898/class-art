"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { partnerSchema, type PartnerInput } from "@/lib/validations/admin";
import { createPartner } from "@/actions/admin/partners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "@/components/admin/image-uploader";
import { toast } from "sonner";

type PartnerFormValues = z.input<typeof partnerSchema>;

export default function NewPartnerPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<PartnerFormValues>({
        resolver: zodResolver(partnerSchema),
        defaultValues: {
            name: "",
            logo_url: "",
            website_url: "",
            order: 0,
            is_active: true,
        },
    });

    async function onSubmit(data: PartnerFormValues) {
        setIsSubmitting(true);
        const result = await createPartner(data as PartnerInput);
        if (result.error) {
            toast.error(result.error);
            setIsSubmitting(false);
        } else {
            toast.success("Tạo đối tác thành công");
            router.push("/admin/partners");
        }
    }

    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold">Tạo đối tác mới</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Tên đối tác</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Logo</Label>
                    <Controller
                        control={control}
                        name="logo_url"
                        render={({ field }) => (
                            <ImageUploader
                                folder="partners"
                                value={field.value || null}
                                onChange={(path) => field.onChange(path || "")}
                            />
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="website_url">Website URL</Label>
                    <Input id="website_url" {...register("website_url")} />
                    {errors.website_url && <p className="text-sm text-red-500">{errors.website_url.message}</p>}
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
                        {isSubmitting ? "Đang lưu..." : "Tạo đối tác"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Hủy
                    </Button>
                </div>
            </form>
        </div>
    );
}
