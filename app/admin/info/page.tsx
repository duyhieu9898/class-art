import { getFooterInfo } from "@/actions/info";
import { InfoForm } from "./info-form";

export const revalidate = 0; // Disable server caching for this settings page

export default async function AdminInfoPage() {
    const initialData = await getFooterInfo();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Cấu hình thông tin Footer</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Quản lý các thông tin hiển thị ở phần chân trang (Footer) của website bao gồm số điện thoại, email,
                    địa chỉ và mạng xã hội.
                </p>
            </div>

            <InfoForm initialData={initialData} />
        </div>
    );
}
