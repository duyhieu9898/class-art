import { getDashboardStats } from "@/actions/admin/dashboard";
import { StatsCard } from "@/components/admin/stats-card";
import { FileText, Users, BookOpen, Handshake, Eye, Clock, TicketPercent, GraduationCap } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>

            {/* Stats Cards Grid - 4 columns for 4 merged/harmonized cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard 
                    label="Bài viết" 
                    value={stats.totalPosts} 
                    icon={<FileText />} 
                    variant="info" 
                    description={`Đã xuất bản: ${stats.publishedPosts}`}
                />
                <StatsCard 
                    label="Tổng đăng ký tuyển sinh" 
                    value={stats.totalRegistrations} 
                    icon={<Users />} 
                    variant="warning" 
                />
                <StatsCard 
                    label="Khóa học đang hoạt động" 
                    value={stats.totalCourses} 
                    icon={<BookOpen />} 
                    variant="primary" 
                />
                <StatsCard 
                    label="Đối tác liên kết" 
                    value={stats.totalPartners} 
                    icon={<Handshake />} 
                    variant="secondary" 
                />
            </div>

            {/* Visual Analytics & Recent Lists */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left column (2/3 width on large screens) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Daily registrations trend bar chart - 30 days */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Xu hướng đăng ký mới</h2>
                        <p className="text-xs text-gray-500 mb-6">Thống kê số lượng đăng ký theo ngày trong 30 ngày qua</p>
                        
                        <div className="relative flex h-56 items-end gap-1 md:gap-1.5 pt-4 border-b pb-2">
                            {stats.dailyStats.map((day, idx) => {
                                const maxCount = Math.max(...stats.dailyStats.map(d => d.count), 1);
                                const heightPercent = (day.count / maxCount) * 80 + 5; // offset for display
                                const showLabel = idx === 0 || idx === stats.dailyStats.length - 1 || idx % 5 === 0;
                                
                                return (
                                    <div key={day.date} className="relative flex flex-1 flex-col items-center gap-2 h-full justify-end group">
                                        {/* Hover tooltip */}
                                        <span className="absolute -top-4 text-[10px] font-bold text-[#363E91] bg-blue-50 px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-sm border border-blue-100">
                                            {day.count} lượt ({day.date})
                                        </span>
                                        <div 
                                            className="w-full rounded-t-sm bg-[#363E91] opacity-80 hover:opacity-100 transition-all duration-200 cursor-pointer min-h-[2px]" 
                                            style={{ height: `${day.count > 0 ? heightPercent : 2}%` }}
                                        />
                                        <span className={`text-[10px] text-gray-400 font-semibold select-none ${showLabel ? "opacity-100" : "opacity-0"}`}>
                                            {day.date}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent registrations table */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Đăng ký tuyển sinh mới nhất</h2>
                            <Link 
                                href="/admin/registrations" 
                                className="text-sm font-semibold text-[#363E91] hover:underline"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="border-b text-xs uppercase text-gray-500 bg-gray-50/70">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Họ tên</th>
                                        <th className="px-4 py-3 font-semibold">Loại form</th>
                                        <th className="px-4 py-3 font-semibold">Mã giảm giá</th>
                                        <th className="px-4 py-3 font-semibold">Thời gian</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentRegistrationsList.map((reg) => (
                                        <tr key={reg.id} className="border-b hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                <Link href={`/admin/registrations/${reg.id}`} className="hover:underline text-[#363E91]">
                                                    {reg.full_name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                                                    {reg.form_type || "—"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {reg.voucher ? (
                                                    <span className="inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-mono font-bold text-amber-700">
                                                        {reg.voucher}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-gray-500">
                                                {new Date(reg.created_at).toLocaleDateString("vi-VN", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                    {stats.recentRegistrationsList.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-center py-6 text-gray-400">Không có đăng ký nào.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right column: quick links & form type stats & breakdowns (1/3 width) */}
                <div className="space-y-6">
                    {/* Quick links card */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Thao tác nhanh</h2>
                        <p className="text-xs text-gray-500 mb-4">Lối tắt truy cập nhanh các tính năng quản trị thường dùng</p>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <Link 
                                href="/admin/posts/new" 
                                className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-[#363E91]/5 hover:border-[#363E91]/30 hover:text-[#363E91] transition-all text-center group cursor-pointer"
                            >
                                <FileText className="h-5 w-5 text-gray-500 group-hover:text-[#363E91] transition-colors" />
                                <span className="text-xs font-bold text-gray-700 group-hover:text-[#363E91] transition-colors">Viết bài mới</span>
                            </Link>
                            <Link 
                                href="/admin/courses/new" 
                                className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-[#363E91]/5 hover:border-[#363E91]/30 hover:text-[#363E91] transition-all text-center group cursor-pointer"
                            >
                                <BookOpen className="h-5 w-5 text-gray-500 group-hover:text-[#363E91] transition-colors" />
                                <span className="text-xs font-bold text-gray-700 group-hover:text-[#363E91] transition-colors">Thêm khóa học</span>
                            </Link>
                            <Link 
                                href="/admin/vouchers" 
                                className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-[#363E91]/5 hover:border-[#363E91]/30 hover:text-[#363E91] transition-all text-center group cursor-pointer"
                            >
                                <TicketPercent className="h-5 w-5 text-gray-500 group-hover:text-[#363E91] transition-colors" />
                                <span className="text-xs font-bold text-gray-700 group-hover:text-[#363E91] transition-colors">Thêm voucher</span>
                            </Link>
                            <Link 
                                href="/admin/partners/new" 
                                className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-[#363E91]/5 hover:border-[#363E91]/30 hover:text-[#363E91] transition-all text-center group cursor-pointer"
                            >
                                <Handshake className="h-5 w-5 text-gray-500 group-hover:text-[#363E91] transition-colors" />
                                <span className="text-xs font-bold text-gray-700 group-hover:text-[#363E91] transition-colors">Thêm đối tác</span>
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm h-fit">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Cơ cấu nguồn đăng ký</h2>
                            <p className="text-xs text-gray-500 mt-1">Phân bổ các lượt đăng ký theo loại form yêu cầu</p>
                        </div>

                        <div className="space-y-4">
                            {stats.formTypeStats.map((item) => {
                                const total = stats.totalRegistrations || 1;
                                const percentage = Math.round((item.count / total) * 100);
                                return (
                                    <div key={item.type} className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-semibold text-gray-600">{item.type}</span>
                                            <span className="font-bold text-gray-900">{item.count} lượt ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div 
                                                className="bg-[#363E91] h-2 rounded-full opacity-90 hover:opacity-100 transition-all duration-200" 
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
