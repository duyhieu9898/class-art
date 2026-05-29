import { getAdminVouchers } from "@/actions/admin/vouchers";
import { VouchersManager } from "./vouchers-manager";

export default async function AdminVouchersPage() {
    const data = await getAdminVouchers();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Voucher</h1>
            <VouchersManager data={data} />
        </div>
    );
}
