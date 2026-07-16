# REF Academy - Project System Architecture

Tài liệu này mô tả thiết kế kiến trúc hệ thống, cấu trúc thư mục, sơ đồ dữ liệu và các quy ước kỹ thuật của dự án **REF Academy**.

---

## 🏗️ Tổng quan & Tech Stack

Dự án được xây dựng dưới dạng một ứng dụng web Full-stack hiện đại, phục vụ cổng thông tin học viện và hệ thống quản trị nội dung.

- **Frontend Framework:** Next.js 15 (App Router, React 19).
- **Styling:** Tailwind CSS v4 (CSS-first configuration) kết hợp với các thành phần của **Shadcn UI**.
- **Backend & Database:** **Supabase** (Postgres DB, Authentication, Storage cho ảnh/banner).
- **Validation & Form:** React Hook Form và Zod schemas.
- **Notifications:** Sonner Toast (tùy biến giao diện Apple-style pastel).

---

## 📁 Cấu trúc thư mục (Directory Structure)

```plaintext
├── actions/                  # Server Actions giao tiếp với Supabase
│   ├── admin/                # Server Actions của trang admin (auth, courses, dashboard, info, partners, posts, registrations, vouchers)
│   ├── courses.ts            # Đọc danh sách khóa học client-side
│   ├── info.ts               # Đọc cấu hình chung website client-side
│   ├── partners.ts           # Đọc đối tác liên kết client-side
│   ├── posts.ts              # Đọc tin tức, bài viết client-side
│   ├── registration.ts       # Đăng ký khóa học/tư vấn client-side
│   └── scholarships.ts       # Đọc danh sách học bổng client-side
├── app/                      # Next.js App Router (File-based Routing)
│   ├── admin/                # Các trang Dashboard quản trị (bảo vệ bởi Middleware)
│   │   ├── courses/          # Quản lý danh sách khóa học
│   │   ├── gioi-thieu/       # Quản lý nội dung giới thiệu & mốc lịch sử
│   │   ├── info/             # Quản lý cấu hình chung (hotline, mạng xã hội, footer)
│   │   ├── login/            # Trang đăng nhập admin (ngoài Middleware)
│   │   ├── partners/         # Quản lý đối tác
│   │   ├── posts/            # Quản lý bài viết (Tiptap Editor)
│   │   ├── registrations/    # Danh sách đăng ký của học viên
│   │   ├── tuyen-sinh/       # Quản lý cấu hình tuyển sinh & bằng cấp
│   │   └── vouchers/         # Quản lý danh sách mã giảm giá
│   ├── dao-tao/              # Các trang danh sách & chi tiết đào tạo client
│   ├── gioi-thieu/           # Trang giới thiệu client
│   ├── nhan-vat/             # Câu chuyện nhân vật client
│   ├── tim-kiem/             # Trang tìm kiếm bài viết client
│   ├── tin-tuc/              # Tin tức & Sự kiện client
│   ├── tuyen-sinh/           # Thông tin tuyển sinh & Form đăng ký client
│   ├── layout.tsx            # Layout tổng của website (chứa Sonner Toaster)
│   ├── globals.css           # Cấu hình Tailwind v4 và custom theme variables
│   ├── robots.ts             # Cấu hình SEO robots.txt
│   └── sitemap.ts            # Cấu hình sitemap XML động cho Google Search Console
├── components/               # React Components tái sử dụng
│   ├── admin/                # Giao diện admin (Sidebar, ImageUploader, RichTextEditor, DataTable, ...)
│   ├── common/               # Component hiển thị chung (PostCard, Modals, Carousel, ...)
│   ├── layout/               # Header, Footer chung của client
│   ├── sections/             # Các block/section UI trên landing page & các trang chi tiết
│   └── ui/                   # Các UI primitives của Shadcn
├── hooks/                    # (Thư mục trống) Custom hooks cho ứng dụng
├── lib/                      # Các thư viện & cấu hình tiện ích
│   ├── constants/            # Định nghĩa các hằng số dùng chung (ví dụ: post-sections.ts)
│   ├── supabase/             # Khởi tạo Supabase client (Server/Client/Storage) & Types
│   ├── validations/          # Zod schema dùng xác thực form & dữ liệu
│   └── utils.ts              # Các hàm tiện ích dùng chung (cn, ...)
├── middleware.ts             # Middleware xử lý phân quyền và bảo vệ các routes /admin
└── supabase/                 # Quản lý Database Supabase local
    ├── config.toml           # Cấu hình Supabase CLI
    ├── seed.sql              # Dữ liệu mẫu khởi tạo database
    └── migrations/           # Các file SQL Migration cấu trúc bảng
```

---

## 🗄️ Sơ đồ cơ sở dữ liệu (Database Schema)

Dự án sử dụng cơ sở dữ liệu Postgres quản lý bởi Supabase. Dưới đây là các bảng chính trong lược đồ `public`:

### 1. Bảng `info` (Singleton - cấu hình chung hệ thống)

_Bảng này chỉ chứa 1 dòng duy nhất có `id = 'site_settings'` để quản lý cấu hình toàn website._

- `id` (TEXT, Primary Key, constraint `id = 'site_settings'`)
- `phone` (TEXT) - Số điện thoại hotline
- `email` (TEXT) - Email liên hệ
- `address` (TEXT) - Địa chỉ trụ sở chính
- `facebook_url`, `youtube_url`, `tiktok_url`, `instagram_url` (TEXT) - Links mạng xã hội
- `copyright_text` (TEXT) - Bản quyền chân trang
- `footer_description` (TEXT) - Mô tả chân trang
- `history_image_url` (TEXT) - Đường dẫn ảnh banner lịch sử
- `history_milestones` (JSONB) - Mảng JSON lưu các mốc lịch sử `[{ "year": "Năm", "desc": "Mô tả" }]`
- `admissions_banner_url` (TEXT) - Đường dẫn ảnh banner trang tuyển sinh
- `admissions_degree_image_url` (TEXT) - Đường dẫn ảnh minh họa phần Bằng cấp trang tuyển sinh
- `admissions_degree_title` (TEXT) - Tiêu đề phần Bằng cấp trang tuyển sinh
- `admissions_degree_content` (TEXT) - Nội dung mô tả phần Bằng cấp trang tuyển sinh
- `hero_image_url` (TEXT) - Đường dẫn ảnh nền phần Hero - Sứ mệnh của trang giới thiệu
- `hero_mission` (TEXT) - Nội dung Sứ mệnh trong phần Hero
- `hero_philosophy` (TEXT) - Nội dung Triết lý trong phần Hero
- `hero_culture` (TEXT) - Nội dung Văn hóa trong phần Hero (các dòng ngăn cách bởi dấu xuống dòng)
- `about_title` (TEXT) - Tiêu đề phần Về REF ACADEMY
- `about_description_1` (TEXT) - Đoạn mô tả thứ nhất phần Về REF ACADEMY
- `about_description_2` (TEXT) - Đoạn mô tả thứ hai phần Về REF ACADEMY
- `about_image_url` (TEXT) - Đường dẫn ảnh banner phần Về REF ACADEMY

### 2. Bảng `posts` (Quản lý các bài viết, tin tức, học bổng)

- `id` (UUID, Primary Key)
- `title` (TEXT) - Tiêu đề bài viết
- `slug` (TEXT, Unique) - Đường dẫn tĩnh thân thiện SEO
- `excerpt` (TEXT) - Tóm tắt ngắn
- `content` (TEXT) - Nội dung bài viết (HTML từ Tiptap)
- `image_url` (TEXT) - Ảnh đại diện bài viết
- `category` (TEXT) - Nhãn danh mục hiển thị phía trên tiêu đề bài viết
- `section` (TEXT) - Phân loại bài viết (`dao-tao`, `tin-tuc`, `nhan-vat`, `hoc-bong`, `workshop`, `hoat-dong`)
- `is_published` (BOOLEAN) - Trạng thái xuất bản
- `published_at` (TIMESTAMPTZ) - Ngày xuất bản

### 3. Bảng `courses` (Quản lý các khóa học)

- `id` (UUID, Primary Key)
- `title` (TEXT) - Tên khóa học
- `image_url` (TEXT) - Ảnh đại diện khóa học
- `order` (INT) - Thứ tự hiển thị
- `is_active` (BOOLEAN) - Trạng thái hoạt động

### 4. Bảng `partners` (Quản lý đối tác liên kết)

- `id` (UUID, Primary Key)
- `name` (TEXT) - Tên đối tác
- `logo_url` (TEXT) - Logo đối tác
- `website_url` (TEXT) - Website đối tác
- `order` (INT) - Thứ tự hiển thị
- `is_active` (BOOLEAN) - Trạng thái hoạt động

### 5. Bảng `registrations` (Quản lý dữ liệu học viên đăng ký)

- `id` (UUID, Primary Key)
- `full_name` (TEXT) - Họ và tên
- `email` (TEXT) - Địa chỉ email
- `phone` (TEXT) - Số điện thoại
- `voucher` (TEXT, Nullable) - Mã voucher áp dụng
- `form_type` (TEXT) - Phân loại form (Ví dụ: tư vấn học bổng, đăng ký khóa học, tư vấn khóa học)
- `source_page` (TEXT) - Nguồn trang gửi form

### 6. Bảng `vouchers` (Quản lý mã giảm giá học phí)

- `id` (UUID, Primary Key)
- `code` (TEXT, Unique) - Mã voucher (In hoa)
- `percent_discount` (INT) - Phần trăm giảm giá (1 - 100)

---

## 🎨 Quy ước thiết kế & Giao diện (UI Conventions)

### 1. Toast Notifications (Apple-style)

Hệ thống thông báo Toast sử dụng Sonner được tinh chỉnh lại theo phong cách macOS/iOS (màu pastel nhẹ nhàng, độ tương phản cao, ít chói mắt):

- **Success:** Background `#EAF6EC`, Text `#1E4620`, Border `#D1E7DD`.
- **Error:** Background `#FDE8E8`, Text `#9B1C1C`, Border `#F8B4B4`.
- **Info:** Background `#EBF5FE`, Text `#1E429F`, Border `#C3DDFD`.
- **Warning:** Background `#FEF9EC`, Text `#723B10`, Border `#FCE8B2`.

### 2. Tải lên và tối ưu hóa hình ảnh

- Việc tải lên hình ảnh được quản lý qua component [ImageUploader](file:///home/hieund/Documents/MY_PROJECT/DEVELOP_MAINTAIN/ref-academy/components/admin/image-uploader.tsx).
- Component tích hợp tự động nén ảnh client-side qua `browser-image-compression` (giới hạn kích thước tối đa 1.5MB) và tự động thay đổi kích thước tối đa dựa trên thư mục tải lên, chuyển đổi định dạng sang **WebP** để tối ưu hóa dung lượng lưu trữ và tốc độ tải trang:
    - `partners`: max 240px
    - `courses`: max 450px
    - `posts`: max 1280px (dành cho banner, bài viết)
    - Các thư mục khác: mặc định tối đa 1200px
- Mọi hình ảnh tải lên được đẩy vào bucket `images` của Supabase và lưu trữ đường dẫn tương đối trong Database. Phía client sử dụng helper `getImageUrl` để phân giải thành URL tuyệt đối hoặc trả về ảnh fallback nội bộ nếu đường dẫn trống.
