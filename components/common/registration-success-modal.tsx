"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface RegistrationSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegistrationSuccessModal({
    isOpen,
    onClose,
}: RegistrationSuccessModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md border-0 bg-white p-6 shadow-2xl rounded-3xl">
                <DialogHeader className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                    </div>

                    <DialogTitle className="text-2xl font-black tracking-tight text-gray-900">
                        Đăng Ký Thành Công!
                    </DialogTitle>

                    <DialogDescription className="text-[15px] leading-relaxed font-medium text-gray-500 px-2">
                        Chúng tôi sẽ liên hệ bạn sớm nhất để hỗ trợ và tư vấn lộ trình học.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-center pt-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="h-11 rounded-full bg-[#384196] px-8 text-sm font-bold text-white hover:bg-[#2d3578]"
                    >
                        Đóng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
