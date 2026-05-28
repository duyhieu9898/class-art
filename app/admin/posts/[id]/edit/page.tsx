import { getAdminPostById } from "@/actions/admin/posts";
import { redirect } from "next/navigation";
import { PostEditForm } from "./post-edit-form";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
    const { id } = await params;
    const post = await getAdminPostById(id);

    if (!post) {
        redirect("/admin/posts");
    }

    return (
        <div className="max-w-4xl space-y-6">
            <h1 className="text-2xl font-bold">Chỉnh sửa bài viết</h1>
            <PostEditForm post={post} />
        </div>
    );
}
