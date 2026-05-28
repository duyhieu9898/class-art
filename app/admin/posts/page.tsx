import Link from "next/link";
import { getAdminPosts } from "@/actions/admin/posts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PostsTable } from "./posts-table";

interface Props {
    searchParams: Promise<{ page?: string; section?: string }>;
}

export default async function AdminPostsPage({ searchParams }: Props) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const section = params.section || "all";
    const { data, total } = await getAdminPosts(page, 10, section);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Bài viết</h1>
                <Link href="/admin/posts/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Tạo bài viết
                    </Button>
                </Link>
            </div>

            <PostsTable data={data} page={page} total={total} currentSection={section} />
        </div>
    );
}
