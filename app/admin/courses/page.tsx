import Link from "next/link";
import { getAdminCourses } from "@/actions/admin/courses";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CoursesTable } from "./courses-table";

export default async function AdminCoursesPage() {
    const data = await getAdminCourses();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Khóa học</h1>
                <Link href="/admin/courses/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Tạo khóa học
                    </Button>
                </Link>
            </div>
            <CoursesTable data={data} />
        </div>
    );
}
