import { getAdminPartnerById } from "@/actions/admin/partners";
import { redirect } from "next/navigation";
import { PartnerEditForm } from "./partner-edit-form";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditPartnerPage({ params }: Props) {
    const { id } = await params;
    const partner = await getAdminPartnerById(id);
    if (!partner) redirect("/admin/partners");
    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold">Chỉnh sửa đối tác</h1>
            <PartnerEditForm partner={partner} />
        </div>
    );
}
