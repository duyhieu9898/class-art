"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createVoucher, deleteVoucher } from "@/actions/admin/vouchers";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { voucherSchema, type VoucherInput } from "@/lib/validations/admin";
import { formatDateVN } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type VoucherFormValues = z.input<typeof voucherSchema>;

interface Voucher {
    id: string;
    code: string;
    percent_discount: number;
    created_at: string;
    [key: string]: unknown;
}

interface VouchersManagerProps {
    data: Voucher[];
}

export function VouchersManager({ data }: VouchersManagerProps) {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VoucherFormValues>({
        resolver: zodResolver(voucherSchema),
        defaultValues: {
            code: "",
            percent_discount: 10,
        },
    });

    async function onSubmit(data: VoucherFormValues) {
        setIsSubmitting(true);
        const result = await createVoucher(data as VoucherInput);
        setIsSubmitting(false);

        if (result.error) {
            toast.error(result.error);
            return;
        }

        toast.success("Đã tạo voucher");
        reset({ code: "", percent_discount: 10 });
        router.refresh();
    }

    async function handleDelete() {
        if (!deleteId) return;

        const result = await deleteVoucher(deleteId);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Đã xóa voucher");
            router.refresh();
        }
        setDeleteId(null);
    }

    const columns: Column<Voucher>[] = [
        { key: "code", label: "Mã voucher" },
        {
            key: "percent_discount",
            label: "Giảm giá",
            render: (item) => `${item.percent_discount}%`,
        },
        {
            key: "created_at",
            label: "Ngày tạo",
            render: (item) => formatDateVN(item.created_at),
        },
        {
            key: "actions",
            label: "",
            render: (item) => (
                <Button variant="ghost" size="icon" onClick={() => setDeleteId(item.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 rounded-md border bg-white p-4 md:grid-cols-[1fr_180px_auto]"
            >
                <div className="space-y-2">
                    <Label htmlFor="code">Mã voucher</Label>
                    <Input id="code" placeholder="REF10" {...register("code")} />
                    {errors.code && <p className="text-sm text-red-500">{errors.code.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="percent_discount">Phần trăm giảm</Label>
                    <Input
                        id="percent_discount"
                        type="number"
                        min={1}
                        max={100}
                        {...register("percent_discount", { valueAsNumber: true })}
                    />
                    {errors.percent_discount && (
                        <p className="text-sm text-red-500">{errors.percent_discount.message}</p>
                    )}
                </div>
                <div className="flex items-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Đang lưu..." : "Thêm voucher"}
                    </Button>
                </div>
            </form>

            <DataTable columns={columns} data={data} />
            <ConfirmDialog open={!!deleteId} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
        </div>
    );
}
