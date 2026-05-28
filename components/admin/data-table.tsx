"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
    key: string;
    label: string;
    render?: (item: T) => React.ReactNode;
}

export interface PaginationInfo {
    page: number;
    perPage: number;
    total: number;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    pagination?: PaginationInfo;
    onPageChange?: (page: number) => void;
}

export function DataTable<T extends Record<string, unknown>>({
    columns,
    data,
    pagination,
    onPageChange,
}: DataTableProps<T>) {
    const totalPages = pagination ? Math.ceil(pagination.total / pagination.perPage) : 1;

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead key={col.key}>{col.label}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="py-8 text-center text-gray-500">
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => (
                                <TableRow key={index}>
                                    {columns.map((col) => (
                                        <TableCell key={col.key}>
                                            {col.render
                                                ? col.render(item)
                                                : ((item[col.key] as React.ReactNode) ?? "—")}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {pagination && totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Hiển thị {(pagination.page - 1) * pagination.perPage + 1}–
                        {Math.min(pagination.page * pagination.perPage, pagination.total)} / {pagination.total} bản ghi
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={pagination.page <= 1}
                            onClick={() => onPageChange?.(pagination.page - 1)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">
                            Trang {pagination.page} / {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={pagination.page >= totalPages}
                            onClick={() => onPageChange?.(pagination.page + 1)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
