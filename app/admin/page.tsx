import { getDashboardStats } from "@/actions/admin/dashboard";
import { StatsCard } from "@/components/admin/stats-card";
import { FileText, Users, BookOpen, Handshake, Eye, Clock } from "lucide-react";

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Tổng quan</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard label="Tổng bài viết" value={stats.totalPosts} icon={<FileText className="h-8 w-8" />} />
                <StatsCard
                    label="Bài viết đã xuất bản"
                    value={stats.publishedPosts}
                    icon={<Eye className="h-8 w-8" />}
                />
                <StatsCard label="Tổng đăng ký" value={stats.totalRegistrations} icon={<Users className="h-8 w-8" />} />
                <StatsCard
                    label="Đăng ký 7 ngày qua"
                    value={stats.recentRegistrations}
                    icon={<Clock className="h-8 w-8" />}
                />
                <StatsCard label="Khóa học" value={stats.totalCourses} icon={<BookOpen className="h-8 w-8" />} />
                <StatsCard label="Đối tác" value={stats.totalPartners} icon={<Handshake className="h-8 w-8" />} />
            </div>
        </div>
    );
}
