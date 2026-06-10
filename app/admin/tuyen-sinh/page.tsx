import { getFooterInfo } from "@/actions/info";
import { AdmissionsForm } from "./admissions-form";

export const revalidate = 0; // Disable server caching for this settings page

export default async function AdminAdmissionsPage() {
    const info = await getFooterInfo();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Cấu hình Tuyển sinh</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Quản lý các thông tin hiển thị tại trang Tuyển sinh.
                </p>
            </div>

            <AdmissionsForm initialBannerUrl={info?.admissions_banner_url || null} />
        </div>
    );
}
