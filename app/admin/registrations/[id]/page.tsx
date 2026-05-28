import { getAdminRegistrationById } from "@/actions/admin/registrations";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { formatDateVN } from "@/lib/utils";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function RegistrationDetailPage({ params }: Props) {
    const { id } = await params;
    const registration = await getAdminRegistrationById(id);

    if (!registration) {
        redirect("/admin/registrations");
    }

    const fields = [
        { label: "Họ tên", value: registration.full_name },
        { label: "Email", value: registration.email },
        { label: "Điện thoại", value: registration.phone },
        { label: "Loại form", value: registration.form_type },
        { label: "Nguồn", value: registration.source_page },
        { label: "Ghi chú", value: registration.note },
        { label: "Ngày đăng ký", value: registration.created_at ? formatDateVN(registration.created_at) : null },
    ];

    return (
        <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/registrations">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Chi tiết đăng ký</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{registration.full_name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.label} className="grid grid-cols-3 gap-4">
                            <span className="text-sm font-medium text-gray-500">{field.label}</span>
                            <span className="col-span-2 text-sm">{field.value || "—"}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
