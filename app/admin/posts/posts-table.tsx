"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { deletePost } from "@/actions/admin/posts";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { formatDateVN } from "@/lib/utils";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { POST_SECTIONS, POST_SECTION_LABELS } from "@/lib/constants/post-sections";

interface Post {
    id: string;
    title: string;
    section: string;
    is_published: boolean;
    published_at: string | null;
    [key: string]: unknown;
}

interface PostsTableProps {
    data: Post[];
    page: number;
    total: number;
    currentSection: string;
}

export function PostsTable({ data, page, total, currentSection }: PostsTableProps) {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [selectedSection, setSelectedSection] = useState(currentSection);

    const handleSectionChange = (value: string) => {
        setSelectedSection(value);
        const params = new URLSearchParams(window.location.search);
        params.set("page", "1");
        if (value === "all") {
            params.delete("section");
        } else {
            params.set("section", value);
        }
        router.push(`/admin/posts?${params.toString()}`);
    };

    async function handleDelete() {
        if (!deleteId) return;
        const result = await deletePost(deleteId);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Đã xóa bài viết");
            router.refresh();
        }
        setDeleteId(null);
    }

    const columns: Column<Post>[] = [
        { key: "title", label: "Tiêu đề" },
        {
            key: "section",
            label: "Mục",
            render: (item) => POST_SECTION_LABELS[item.section] || item.section,
        },
        {
            key: "is_published",
            label: "Trạng thái",
            render: (item) => (
                <Badge variant={item.is_published ? "default" : "secondary"}>
                    {item.is_published ? "Đã xuất bản" : "Nháp"}
                </Badge>
            ),
        },
        {
            key: "published_at",
            label: "Ngày xuất bản",
            render: (item) => (item.published_at ? formatDateVN(item.published_at) : "—"),
        },
        {
            key: "actions",
            label: "",
            render: (item) => (
                <div className="flex gap-2">
                    <Link href={`/admin/posts/${item.id}/edit`}>
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
        <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex max-w-xs items-center gap-2 pb-2">
                <span className="shrink-0 text-sm font-semibold text-gray-700">Lọc theo mục:</span>
                <Select value={selectedSection} onValueChange={handleSectionChange}>
                    <SelectTrigger className="h-9.5 w-45">
                        <SelectValue placeholder="Chọn mục" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        {POST_SECTIONS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                                {s.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <DataTable
                columns={columns}
                data={data}
                pagination={{ page, perPage: 10, total }}
                onPageChange={(newPage) => {
                    const params = new URLSearchParams(window.location.search);
                    params.set("page", newPage.toString());
                    router.push(`/admin/posts?${params.toString()}`);
                }}
            />
            <ConfirmDialog open={!!deleteId} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
        </div>
    );
}
