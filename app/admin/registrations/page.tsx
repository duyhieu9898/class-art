import { getAdminRegistrations } from "@/actions/admin/registrations";
import { RegistrationsTable } from "./registrations-table";

interface Props {
    searchParams: Promise<{ page?: string; form_type?: string }>;
}

export default async function AdminRegistrationsPage({ searchParams }: Props) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const formType = params.form_type || undefined;
    const { data, total } = await getAdminRegistrations(page, 10, formType);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Đăng ký tuyển sinh</h1>
            <RegistrationsTable data={data} page={page} total={total} currentFormType={formType} />
        </div>
    );
}
