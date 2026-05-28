export const POST_SECTIONS = [
    { value: "dao-tao", label: "Đào tạo" },
    { value: "tin-tuc", label: "Tin tức & Sự kiện" },
    { value: "nhan-vat", label: "Nhân vật" },
    { value: "hoc-bong", label: "Học bổng" },
    { value: "workshop", label: "Workshop" },
    { value: "hoat-dong", label: "Hoạt động học viên" },
] as const;

export type PostSectionValue = (typeof POST_SECTIONS)[number]["value"];

/** Map value → label for quick lookup */
export const POST_SECTION_LABELS: Record<string, string> = Object.fromEntries(
    POST_SECTIONS.map((s) => [s.value, s.label])
);
