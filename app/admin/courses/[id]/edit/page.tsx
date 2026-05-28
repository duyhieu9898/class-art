import { getAdminCourseById } from "@/actions/admin/courses";
import { redirect } from "next/navigation";
import { CourseEditForm } from "./course-edit-form";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: Props) {
    const { id } = await params;
    const course = await getAdminCourseById(id);
    if (!course) redirect("/admin/courses");
    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold">Chỉnh sửa khóa học</h1>
            <CourseEditForm course={course} />
        </div>
    );
}
