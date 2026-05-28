"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, ExternalLink, MessageSquareText } from "lucide-react";
import { toast } from "sonner";

interface ZaloSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    fullName: string;
    phone: string;
    formType: string;
}

export default function ZaloSuccessModal({
    isOpen,
    onClose,
    fullName,
    phone,
    formType,
}: ZaloSuccessModalProps) {
    const [isCopied, setIsCopied] = useState(false);

    // Get Zalo link from env, fallback to a placeholder that they can configure
    const zaloUrl = process.env.NEXT_PUBLIC_ZALO_URL || "https://zalo.me/0912345678";

    // Format the message template
    const formattedText = `[REF ACADEMY] Tôi là: ${fullName} - SĐT: ${phone} - Nhu cầu: ${formType}`;

    // Auto copy to clipboard once the modal opens
    useEffect(() => {
        if (isOpen && fullName && phone) {
            navigator.clipboard
                .writeText(formattedText)
                .then(() => {
                    setIsCopied(true);
                    toast.success("Đã tự động sao chép thông tin đăng ký của bạn!");
                })
                .catch((err) => {
                    console.error("Lỗi tự động sao chép: ", err);
                    setIsCopied(false);
                });
        }
    }, [isOpen, fullName, phone, formattedText]);

    const handleCopyManual = () => {
        navigator.clipboard
            .writeText(formattedText)
            .then(() => {
                setIsCopied(true);
                toast.success("Đã sao chép lại thông tin đăng ký!");
            })
            .catch(() => {
                toast.error("Không thể sao chép. Vui lòng chọn và sao chép thủ công.");
            });
    };

    const handleOpenZalo = () => {
        window.open(zaloUrl, "_blank");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md border-0 bg-white p-6 shadow-2xl rounded-3xl md:max-w-lg">
                <DialogHeader className="flex flex-col items-center justify-center text-center space-y-4">
                    {/* Glowing success check mark icon */}
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                        <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-bounce" />
                        <span className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping" />
                    </div>

                    <DialogTitle className="text-2xl font-black tracking-tight text-gray-900 md:text-3xl">
                        Đăng Ký Thành Công! 🎉
                    </DialogTitle>

                    <DialogDescription className="text-[15px] leading-relaxed font-medium text-gray-500 px-2">
                        Để được hỗ trợ và tư vấn lộ trình học nhanh nhất, vui lòng nhắn tin trực tiếp với chuyên viên qua Zalo.
                    </DialogDescription>
                </DialogHeader>

                <div className="my-4 space-y-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                        Thông tin đăng ký của bạn:
                    </p>
                    <div className="space-y-1.5 text-sm text-slate-700 font-semibold">
                        <p>👤 Họ tên: <span className="text-gray-900 font-bold">{fullName}</span></p>
                        <p>📞 Số điện thoại: <span className="text-gray-900 font-bold">{phone}</span></p>
                        <p>🎯 Nhu cầu: <span className="text-blue-600 font-bold">{formType}</span></p>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-3">
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                            {isCopied ? "✓ Đã tự động copy vào bộ nhớ tạm" : "Chưa sao chép"}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyManual}
                            className="h-8 gap-1.5 px-3 text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                        >
                            <Copy className="h-3.5 w-3.5" />
                            Sao chép lại
                        </Button>
                    </div>
                </div>

                <div className="text-center bg-blue-50/50 border border-blue-100 p-3 rounded-xl">
                    <p className="text-xs font-medium text-blue-700 leading-normal">
                        💡 <strong>Hướng dẫn:</strong> Hệ thống đã tự động sao chép thông tin trên.
                        Bạn chỉ cần nhấn nút <strong>&ldquo;Mở Zalo và Nhắn Tin&rdquo;</strong> dưới đây,
                        sau đó <strong>Dán (Paste)</strong> vào khung chat và gửi đi!
                    </p>
                </div>

                <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-stretch pt-2">
                    <Button
                        type="button"
                        onClick={handleOpenZalo}
                        className="w-full h-12 rounded-full bg-[#0068FF] text-sm font-black text-white hover:bg-[#005AE0] active:scale-[0.98] transition-all shadow-[0px_8px_20px_0px_rgba(0,104,255,0.3)] gap-2 flex justify-center items-center"
                    >
                        <MessageSquareText className="h-5 w-5 fill-white/10" />
                        MỞ ZALO VÀ NHẮN TIN
                        <ExternalLink className="h-4 w-4 opacity-70" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
