"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataTable, type Column } from "@/components/admin/data-table";
import { formatDateVN } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateContractHTML } from "@/lib/contract-template";

interface Course {
    id: string;
    title: string;
    price: number | null;
    duration_lessons: number | null;
    lesson_minutes: number | null;
    start_date: string | null;
    end_date: string | null;
    is_active: boolean;
}

interface Voucher {
    id: string;
    code: string;
    percent_discount: number;
}

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
    courses: Course[];
    vouchers: Voucher[];
}

export function RegistrationsTable({ data, page, total, currentFormType, courses, vouchers }: RegistrationsTableProps) {
    const router = useRouter();

    // Modal states
    const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
    const [studentName, setStudentName] = useState("");
    const [studentPhone, setStudentPhone] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [contractNumber, setContractNumber] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [durationLessons, setDurationLessons] = useState<number | "">("");
    const [lessonMinutes, setLessonMinutes] = useState<number | "">("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [voucherCode, setVoucherCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState("Chuyển khoản");
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    function handleFilterChange(value: string) {
        const params = new URLSearchParams();
        if (value && value !== "all") {
            params.set("form_type", value);
        }
        router.push(`/admin/registrations?${params.toString()}`);
    }

    const handleOpenPrintModal = (reg: Registration, itemIndex: number) => {
        setSelectedReg(reg);
        setStudentName(reg.full_name || "");
        setStudentPhone(reg.phone || "");
        setStudentEmail(reg.email || "");
        setVoucherCode(reg.voucher || "");
        setPaymentMethod("Chuyển khoản");
        setFormErrors({});

        // Calculate sequence number (from oldest 1 to newest total)
        const sequenceNumber = total - ((page - 1) * 10 + itemIndex);
        const formattedSeq = String(sequenceNumber).padStart(3, "0"); // E.g., 001, 002
        const currentYear = new Date().getFullYear();
        setContractNumber(`${formattedSeq}/${currentYear}/HĐĐT-REF`);

        // Find if registration has voucher
        if (reg.voucher) {
            const matchingVoucher = vouchers.find((v) => v.code.toUpperCase() === reg.voucher?.toUpperCase());
            if (matchingVoucher) {
                setDiscountPercent(matchingVoucher.percent_discount);
            } else {
                setDiscountPercent(0);
            }
        } else {
            setDiscountPercent(0);
        }

        // Reset course fields
        setSelectedCourseId("");
        setPrice("");
        setDurationLessons("");
        setLessonMinutes("");
        setStartDate("");
        setEndDate("");
    };

    const handleCourseChange = (courseId: string) => {
        setSelectedCourseId(courseId);
        const course = courses.find((c) => c.id === courseId);
        if (course) {
            setPrice(course.price ?? 0);
            setDurationLessons(course.duration_lessons ?? 12);
            setLessonMinutes(course.lesson_minutes ?? 90);
            setStartDate(course.start_date || "");
            setEndDate(course.end_date || "");
        }
    };

    const handlePrintSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: Record<string, string> = {};

        if (!studentName.trim()) errors.studentName = "Họ tên không được để trống";
        if (!studentPhone.trim()) errors.studentPhone = "Số điện thoại không được để trống";
        if (!studentEmail.trim()) errors.studentEmail = "Email không được để trống";
        if (!contractNumber.trim()) errors.contractNumber = "Số hợp đồng không được để trống";
        if (!selectedCourseId) errors.courseId = "Vui lòng chọn khóa học";
        if (price === "" || Number(price) < 0) errors.price = "Học phí gốc không được để trống hoặc âm";
        if (durationLessons === "" || Number(durationLessons) <= 0)
            errors.durationLessons = "Số buổi học phải lớn hơn 0";
        if (lessonMinutes === "" || Number(lessonMinutes) <= 0)
            errors.lessonMinutes = "Thời lượng buổi học phải lớn hơn 0";
        if (!startDate) errors.startDate = "Vui lòng chọn ngày bắt đầu";
        if (!endDate) errors.endDate = "Vui lòng chọn ngày kết thúc";

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const course = courses.find((c) => c.id === selectedCourseId);
        const courseTitle = course ? course.title : "Khóa học đào tạo";

        // Format date string from YYYY-MM-DD to DD/MM/YYYY
        const formatToDateVN = (dateStr: string) => {
            if (!dateStr) return "";
            const parts = dateStr.split("-");
            if (parts.length === 3) {
                return `${parts[2]}/${parts[1]}/${parts[0]}`;
            }
            return dateStr;
        };

        const today = new Date();
        const finalFee = Math.max(0, Number(price || 0) * (1 - (discountPercent || 0) / 100));

        const contractData = {
            logoUrl: typeof window !== "undefined" ? `${window.location.origin}/logo-ref.svg` : "/logo-ref.svg",
            contractNumber,
            dateDay: String(today.getDate()).padStart(2, "0"),
            dateMonth: String(today.getMonth() + 1).padStart(2, "0"),
            dateYear: String(today.getFullYear()),
            studentName,
            studentPhone,
            studentEmail,
            courseTitle,
            startDate: formatToDateVN(startDate),
            endDate: formatToDateVN(endDate),
            durationLessons: Number(durationLessons),
            lessonMinutes: Number(lessonMinutes),
            originalFee: Number(price),
            voucherCode: voucherCode.trim() || undefined,
            discountPercent: discountPercent || undefined,
            finalFee,
            paymentMethod,
        };

        // Open print window
        const printHTML = generateContractHTML(contractData);
        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(printHTML);
            printWindow.document.close();
            printWindow.focus();

            setTimeout(() => {
                printWindow.print();
            }, 300);
        }

        setSelectedReg(null);
    };

    const columns: Column<Registration>[] = [
        {
            key: "full_name",
            label: "Họ tên",
            render: (item) => (
                <Link href={`/admin/registrations/${item.id}`} className="font-medium text-blue-600 hover:underline">
                    {item.full_name}
                </Link>
            ),
        },
        { key: "email", label: "Email" },
        { key: "phone", label: "Điện thoại" },
        {
            key: "voucher",
            label: "Mã giảm giá",
            render: (item) =>
                item.voucher ? (
                    <Badge variant="outline" className="font-mono">
                        {item.voucher}
                    </Badge>
                ) : (
                    "—"
                ),
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
        {
            key: "actions",
            label: "Hành động",
            render: (item) => {
                const itemIndex = data.findIndex((x) => x.id === item.id);
                return (
                    <Button
                        variant="ghost"
                        size="icon"
                        title="In hợp đồng đào tạo"
                        onClick={() => handleOpenPrintModal(item, itemIndex)}
                    >
                        <Printer className="h-4 w-4 text-gray-500 hover:text-[#363E91]" />
                    </Button>
                );
            },
        },
    ];

    const finalFeeCalculated = Math.max(0, Number(price || 0) * (1 - (discountPercent || 0) / 100));

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

            {/* Print Invoice Dialog */}
            <Dialog open={selectedReg !== null} onOpenChange={(open) => !open && setSelectedReg(null)}>
                <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-[#363E91]">
                            Thông tin in hợp đồng đào tạo
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handlePrintSubmit} className="space-y-4 py-2">
                        {/* Số Hợp đồng */}
                        <div className="space-y-3 rounded-md border bg-gray-50/50 p-3">
                            <h3 className="border-b pb-1.5 text-sm font-semibold text-gray-800">Quản lý hợp đồng</h3>
                            <div className="space-y-1">
                                <Label htmlFor="modal_contractNumber">Số hợp đồng (Đề xuất tự động)</Label>
                                <Input
                                    id="modal_contractNumber"
                                    value={contractNumber}
                                    onChange={(e) => setContractNumber(e.target.value)}
                                    className={formErrors.contractNumber ? "border-red-500" : ""}
                                />
                                {formErrors.contractNumber && (
                                    <p className="text-xs text-red-500">{formErrors.contractNumber}</p>
                                )}
                            </div>
                        </div>

                        {/* Học viên */}
                        <div className="space-y-3 rounded-md border bg-gray-50/50 p-3">
                            <h3 className="border-b pb-1.5 text-sm font-semibold text-gray-800">
                                Thông tin học viên (Bên B)
                            </h3>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="space-y-1">
                                    <Label htmlFor="modal_fullName">Họ và tên</Label>
                                    <Input
                                        id="modal_fullName"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        className={formErrors.studentName ? "border-red-500" : ""}
                                    />
                                    {formErrors.studentName && (
                                        <p className="text-xs text-red-500">{formErrors.studentName}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="modal_phone">Điện thoại</Label>
                                    <Input
                                        id="modal_phone"
                                        value={studentPhone}
                                        onChange={(e) => setStudentPhone(e.target.value)}
                                        className={formErrors.studentPhone ? "border-red-500" : ""}
                                    />
                                    {formErrors.studentPhone && (
                                        <p className="text-xs text-red-500">{formErrors.studentPhone}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="modal_email">Email</Label>
                                    <Input
                                        id="modal_email"
                                        value={studentEmail}
                                        onChange={(e) => setStudentEmail(e.target.value)}
                                        className={formErrors.studentEmail ? "border-red-500" : ""}
                                    />
                                    {formErrors.studentEmail && (
                                        <p className="text-xs text-red-500">{formErrors.studentEmail}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Chọn khóa học */}
                        <div className="space-y-3 rounded-md border bg-gray-50/50 p-3">
                            <h3 className="border-b pb-1.5 text-sm font-semibold text-gray-800">Khóa học đăng ký</h3>
                            <div className="space-y-2">
                                <Label htmlFor="modal_course">Chọn khóa học</Label>
                                <Select value={selectedCourseId} onValueChange={handleCourseChange}>
                                    <SelectTrigger
                                        id="modal_course"
                                        className={formErrors.courseId ? "border-red-500" : ""}
                                    >
                                        <SelectValue placeholder="-- Chọn khóa học từ danh sách --" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses
                                            .filter((c) => c.is_active)
                                            .map((c) => (
                                                <SelectItem key={c.id} value={c.id}>
                                                    {c.title}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                {formErrors.courseId && <p className="text-xs text-red-500">{formErrors.courseId}</p>}
                            </div>

                            {/* Chi tiết khóa học (chỉ hiển thị khi đã chọn) */}
                            {selectedCourseId && (
                                <div className="space-y-3 pt-2">
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="modal_price">Học phí gốc (VND)</Label>
                                            <Input
                                                id="modal_price"
                                                type="number"
                                                value={price}
                                                onChange={(e) =>
                                                    setPrice(e.target.value === "" ? "" : Number(e.target.value))
                                                }
                                                className={formErrors.price ? "border-red-500" : ""}
                                            />
                                            {formErrors.price && (
                                                <p className="text-xs text-red-500">{formErrors.price}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="modal_duration">Số buổi học</Label>
                                            <Input
                                                id="modal_duration"
                                                type="number"
                                                value={durationLessons}
                                                onChange={(e) =>
                                                    setDurationLessons(
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                                className={formErrors.durationLessons ? "border-red-500" : ""}
                                            />
                                            {formErrors.durationLessons && (
                                                <p className="text-xs text-red-500">{formErrors.durationLessons}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="modal_minutes">Thời lượng/buổi (phút)</Label>
                                            <Input
                                                id="modal_minutes"
                                                type="number"
                                                value={lessonMinutes}
                                                onChange={(e) =>
                                                    setLessonMinutes(
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                                className={formErrors.lessonMinutes ? "border-red-500" : ""}
                                            />
                                            {formErrors.lessonMinutes && (
                                                <p className="text-xs text-red-500">{formErrors.lessonMinutes}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="modal_start">Ngày bắt đầu</Label>
                                            <Input
                                                id="modal_start"
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className={formErrors.startDate ? "border-red-500" : ""}
                                            />
                                            {formErrors.startDate && (
                                                <p className="text-xs text-red-500">{formErrors.startDate}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="modal_end">Ngày kết thúc</Label>
                                            <Input
                                                id="modal_end"
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className={formErrors.endDate ? "border-red-500" : ""}
                                            />
                                            {formErrors.endDate && (
                                                <p className="text-xs text-red-500">{formErrors.endDate}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Thanh toán & Voucher */}
                        <div className="space-y-3 rounded-md border bg-gray-50/50 p-3">
                            <h3 className="border-b pb-1.5 text-sm font-semibold text-gray-800">
                                Thanh toán & Mã giảm giá
                            </h3>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="space-y-1">
                                    <Label htmlFor="modal_voucher">Áp dụng voucher</Label>
                                    <Select
                                        value={
                                            voucherCode
                                                ? vouchers.find(
                                                      (v) => v.code.toUpperCase() === voucherCode.trim().toUpperCase()
                                                  )?.id || "custom"
                                                : "none"
                                        }
                                        onValueChange={(val) => {
                                            if (val === "none") {
                                                setVoucherCode("");
                                                setDiscountPercent(0);
                                            } else if (val === "custom") {
                                                // Keep custom
                                            } else {
                                                const v = vouchers.find((v) => v.id === val);
                                                if (v) {
                                                    setVoucherCode(v.code);
                                                    setDiscountPercent(v.percent_discount);
                                                }
                                            }
                                        }}
                                    >
                                        <SelectTrigger id="modal_voucher">
                                            <SelectValue placeholder="Không áp dụng" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Không áp dụng</SelectItem>
                                            {vouchers.map((v) => (
                                                <SelectItem key={v.id} value={v.id}>
                                                    {v.code} (-{v.percent_discount}%)
                                                </SelectItem>
                                            ))}
                                            {voucherCode &&
                                                !vouchers.some(
                                                    (v) => v.code.toUpperCase() === voucherCode.trim().toUpperCase()
                                                ) && <SelectItem value="custom">Mã tự nhập: {voucherCode}</SelectItem>}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="modal_discount">Phần trăm giảm (%)</Label>
                                    <Input
                                        id="modal_discount"
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={discountPercent}
                                        onChange={(e) =>
                                            setDiscountPercent(Math.min(100, Math.max(0, Number(e.target.value))))
                                        }
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="modal_payment_method">Phương thức thanh toán</Label>
                                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                        <SelectTrigger id="modal_payment_method">
                                            <SelectValue placeholder="Phương thức" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Chuyển khoản">Chuyển khoản</SelectItem>
                                            <SelectItem value="Tiền mặt">Tiền mặt</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Tổng tiền tính toán */}
                            {selectedCourseId && (
                                <div className="flex items-center justify-between border-t border-dashed pt-2 text-sm">
                                    <span className="text-gray-600">Thành tiền sau giảm giá:</span>
                                    <span className="text-lg font-bold text-red-600">
                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
                                            .format(finalFeeCalculated)
                                            .replace("₫", "đ")}
                                    </span>
                                </div>
                            )}
                        </div>

                        <DialogFooter className="pt-2">
                            <Button type="button" variant="outline" onClick={() => setSelectedReg(null)}>
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#363E91] text-white hover:bg-[#2e347a]"
                                disabled={!selectedCourseId}
                            >
                                In Hợp đồng
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
