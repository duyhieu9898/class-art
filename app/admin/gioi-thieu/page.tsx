import { getFooterInfo } from "@/actions/info";
import { AboutForm } from "./about-form";

export const revalidate = 0;

export default async function AdminGioiThieuPage() {
    const initialData = await getFooterInfo();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Cấu hình Giới thiệu</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Quản lý nội dung trang Giới thiệu: Hero, Về REF ACADEMY và Lịch sử hình thành.
                </p>
            </div>

            <AboutForm initialData={initialData} />
        </div>
    );
}
