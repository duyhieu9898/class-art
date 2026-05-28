"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
    Bold,
    Italic,
    Heading2,
    Heading3,
    Heading4,
    List,
    ListOrdered,
    Link as LinkIcon,
    Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3, 4] },
            }),
            TiptapLink.configure({
                openOnClick: false,
                HTMLAttributes: { class: "text-blue-600 underline" },
            }),
            Image,
            Placeholder.configure({
                placeholder: "Nhập nội dung bài viết...",
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    function addLink() {
        const url = window.prompt("Nhập URL:");
        if (url && editor) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
    }

    function addImage() {
        const url = window.prompt("Nhập URL ảnh:");
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }

    const toolbarButtons = [
        {
            icon: Bold,
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive("bold"),
        },
        {
            icon: Italic,
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive("italic"),
        },
        {
            icon: Heading2,
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: Heading3,
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: Heading4,
            action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
            isActive: editor.isActive("heading", { level: 4 }),
        },
        {
            icon: List,
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive("bulletList"),
        },
        {
            icon: ListOrdered,
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive("orderedList"),
        },
        {
            icon: LinkIcon,
            action: addLink,
            isActive: editor.isActive("link"),
        },
        {
            icon: ImageIcon,
            action: addImage,
            isActive: false,
        },
    ];

    return (
        <div className="rounded-md border">
            <div className="flex flex-wrap gap-1 border-b bg-gray-50 p-2">
                {toolbarButtons.map((btn, i) => (
                    <Button
                        key={i}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8", btn.isActive && "bg-gray-200")}
                        onClick={btn.action}
                    >
                        <btn.icon className="h-4 w-4" />
                    </Button>
                ))}
            </div>
            <EditorContent editor={editor} className="prose min-h-[200px] max-w-none p-4 focus:outline-none" />
        </div>
    );
}
