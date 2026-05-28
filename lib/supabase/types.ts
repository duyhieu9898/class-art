export type PostSection = "dao-tao" | "tin-tuc" | "nhan-vat" | "hoc-bong";

export interface Database {
    public: {
        Tables: {
            posts: {
                Row: {
                    id: string;
                    slug: string;
                    title: string;
                    excerpt: string | null;
                    content: string | null;
                    image_url: string | null;
                    category: string | null;
                    section: PostSection;
                    published_at: string;
                    is_published: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["posts"]["Row"], "id" | "created_at" | "updated_at">;
                Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
            };
            registrations: {
                Row: {
                    id: string;
                    full_name: string;
                    email: string;
                    phone: string;
                    voucher: string | null;
                    form_type: string;
                    source_page: string | null;
                    created_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["registrations"]["Row"], "id" | "created_at">;
                Update: Partial<Database["public"]["Tables"]["registrations"]["Insert"]>;
            };
            courses: {
                Row: {
                    id: string;
                    title: string;
                    image_url: string | null;
                    order: number;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["courses"]["Row"], "id" | "created_at" | "updated_at">;
                Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
            };
            partners: {
                Row: {
                    id: string;
                    name: string;
                    logo_url: string | null;
                    website_url: string | null;
                    order: number;
                    is_active: boolean;
                    created_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["partners"]["Row"], "id" | "created_at">;
                Update: Partial<Database["public"]["Tables"]["partners"]["Insert"]>;
            };
        };
    };
}
