"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { deleteCourse } from "@/actions/admin/courses";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/supabase/storage";

interface Course {
    id: string;
    title: string;
    image_url: string | null;
    is_active: boolean;
    order: number;
    [key: string]: unknown;
}

interface CoursesTableProps {
    data: Course[];
}

export function CoursesTable({ data }: CoursesTableProps) {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<string | null>(null);

    async function handleDelete() {
        if (!deleteId) return;
        const result = await deleteCourse(deleteId);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Đã xóa khóa học");
            router.refresh();
        }
        setDeleteId(null);
    }

    const columns: Column<Course>[] = [
        {
            key: "image_url",
            label: "Ảnh",
            render: (item) =>
                item.image_url ? (
                    <Image
                        src={getImageUrl(item.image_url)}
                        alt={item.title}
                        width={60}
                        height={40}
                        className="rounded object-cover"
                        unoptimized
                    />
                ) : (
                    <span className="text-muted-foreground">—</span>
                ),
        },
        { key: "title", label: "Tên khóa học" },
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
                    <Link href={`/admin/courses/${item.id}/edit`}>
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
