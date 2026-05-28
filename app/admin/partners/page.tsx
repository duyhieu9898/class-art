import Link from "next/link";
import { getAdminPartners } from "@/actions/admin/partners";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PartnersTable } from "./partners-table";

export default async function AdminPartnersPage() {
    const data = await getAdminPartners();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Đối tác</h1>
                <Link href="/admin/partners/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Tạo đối tác
                    </Button>
                </Link>
            </div>
            <PartnersTable data={data} />
        </div>
    );
}
