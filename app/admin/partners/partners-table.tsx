"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { deletePartner } from "@/actions/admin/partners";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Partner {
    id: string;
    name: string;
    logo_url: string | null;
    website_url: string | null;
    is_active: boolean;
    order: number;
    [key: string]: unknown;
}

interface PartnersTableProps {
    data: Partner[];
}

export function PartnersTable({ data }: PartnersTableProps) {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<string | null>(null);

    async function handleDelete() {
        if (!deleteId) return;
        const result = await deletePartner(deleteId);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Đã xóa đối tác");
            router.refresh();
        }
        setDeleteId(null);
    }

    const columns: Column<Partner>[] = [
        { key: "name", label: "Tên" },
        {
            key: "logo_url",
            label: "Logo",
            render: (item) =>
                item.logo_url ? (
                    <Image
                        src={item.logo_url}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded object-contain"
                        unoptimized
                    />
                ) : (
                    <span className="text-muted-foreground">—</span>
                ),
        },
        {
            key: "website_url",
            label: "Website",
            render: (item) =>
                item.website_url ? (
                    <a
                        href={item.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block max-w-[200px] truncate text-blue-600 hover:underline"
                    >
                        {item.website_url.length > 30 ? item.website_url.slice(0, 30) + "…" : item.website_url}
                    </a>
                ) : (
                    <span className="text-muted-foreground">—</span>
                ),
        },
        {
            key: "is_active",
            label: "Trạng thái",
            render: (item) => (
                <Badge variant={item.is_active ? "default" : "secondary"}>{item.is_active ? "Hoạt động" : "Ẩn"}</Badge>
            ),
        },
        { key: "order", label: "Thứ tự" },
        {
            key: "actions",
            label: "",
            render: (item) => (
                <div className="flex gap-2">
                    <Link href={`/admin/partners/${item.id}/edit`}>
                        <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(item.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <DataTable columns={columns} data={data} />
            <ConfirmDialog open={!!deleteId} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
        </>
    );
}
