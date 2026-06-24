"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataTable, type Column } from "@/components/admin/data-table";
import { formatDateVN } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Registration {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    form_type: string | null;
    voucher: string | null;
    source_page: string | null;
    created_at: string;
    [key: string]: unknown;
}

interface RegistrationsTableProps {
    data: Registration[];
    page: number;
    total: number;
    currentFormType?: string;
}

export function RegistrationsTable({ data, page, total, currentFormType }: RegistrationsTableProps) {
    const router = useRouter();

    function handleFilterChange(value: string) {
        const params = new URLSearchParams();
        if (value && value !== "all") {
            params.set("form_type", value);
        }
        router.push(`/admin/registrations?${params.toString()}`);
    }

    const columns: Column<Registration>[] = [
        {
            key: "full_name",
            label: "Họ tên",
            render: (item) => (
                <Link href={`/admin/registrations/${item.id}`} className="text-blue-600 hover:underline">
                    {item.full_name}
                </Link>
            ),
        },
        { key: "email", label: "Email" },
        { key: "phone", label: "Điện thoại" },
        {
            key: "voucher",
            label: "Mã giảm giá",
            render: (item) => (item.voucher ? <Badge variant="outline" className="font-mono">{item.voucher}</Badge> : "—"),
        },
        {
            key: "form_type",
            label: "Loại form",
            render: (item) => (item.form_type ? <Badge variant="secondary">{item.form_type}</Badge> : "—"),
        },
        {
            key: "created_at",
            label: "Ngày đăng ký",
            render: (item) => formatDateVN(item.created_at),
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Select value={currentFormType || "all"} onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Lọc theo loại form" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="Đăng ký khóa học">Đăng ký khóa học</SelectItem>
                        <SelectItem value="Tư vấn khóa học">Tư vấn khóa học</SelectItem>
                        <SelectItem value="Tham quan cơ sở">Tham quan cơ sở</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <DataTable
                columns={columns}
                data={data}
                pagination={{ page, perPage: 10, total }}
                onPageChange={(newPage) => {
                    const params = new URLSearchParams();
                    params.set("page", String(newPage));
                    if (currentFormType) params.set("form_type", currentFormType);
                    router.push(`/admin/registrations?${params.toString()}`);
                }}
            />
        </div>
    );
}
