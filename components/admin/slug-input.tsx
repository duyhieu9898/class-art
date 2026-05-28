"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { generateSlug } from "@/lib/utils";

interface SlugInputProps {
    title: string;
    value: string;
    onChange: (slug: string) => void;
}

export function SlugInput({ title, value, onChange }: SlugInputProps) {
    const [isManual, setIsManual] = useState(false);

    useEffect(() => {
        if (!isManual && title) {
            onChange(generateSlug(title));
        }
    }, [title, isManual, onChange]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIsManual(true);
        onChange(e.target.value);
    }

    function handleAutoGenerate() {
        setIsManual(false);
        onChange(generateSlug(title));
    }

    return (
        <div className="space-y-1">
            <div className="flex gap-2">
                <Input value={value} onChange={handleChange} placeholder="slug-bai-viet" />
                {isManual && (
                    <button
                        type="button"
                        onClick={handleAutoGenerate}
                        className="text-xs whitespace-nowrap text-blue-600 hover:underline"
                    >
                        Tự động
                    </button>
                )}
            </div>
            {value && <p className="text-xs text-gray-400">URL: /.../{value}</p>}
        </div>
    );
}
