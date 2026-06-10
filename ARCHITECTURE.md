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
│   ├── admin/                # Server Actions dành riêng cho trang quản trị
│   └── info.ts               # Các hàm đọc cấu hình chung website
├── app/                      # Next.js App Router (File-based Routing)
│   ├── (auth)/               # Routes đăng nhập/đăng ký
│   ├── admin/                # Các trang Dashboard quản trị
│   │   ├── tuyen-sinh/       # Quản lý cấu hình banner tuyển sinh
│   │   ├── info/             # Quản lý thông tin footer & lịch sử phát triển
│   │   └── ...               # Quản lý khóa học, đối tác, bài viết, đăng ký
│   ├── gioi-thieu/           # Trang Giới thiệu client (đọc dữ liệu động lịch sử)
│   ├── tuyen-sinh/           # Trang Tuyển sinh client (đọc dữ liệu động banner)
│   ├── layout.tsx            # Layout tổng của website (chứa Sonner Toaster)
│   └── globals.css           # Cấu hình Tailwind v4 và custom theme variables
├── components/               # React Components tái sử dụng
│   ├── admin/                # Giao diện admin (Sidebar, ImageUploader, ...)
│   ├── ui/                   # Các UI primitives của Shadcn
│   └── layout/               # Header, Footer chung của client
├── lib/                      # Các thư viện & cấu hình tiện ích
│   ├── supabase/             # Khởi tạo Supabase client (Server/Client/Storage)
│   └── validations/          # Zod schema xác thực dữ liệu
├── supabase/                 # Quản lý Database
│   └── migrations/           # Các file SQL Migration cấu trúc bảng
```

---

## 🗄️ Sơ đồ cơ sở dữ liệu (Database Schema)

Dự án sử dụng cơ sở dữ liệu Postgres quản lý bởi Supabase. Dưới đây là các bảng chính trong lược đồ `public`:

### 1. Bảng `info` (Singleton - cấu hình chung hệ thống)
*Bảng này chỉ chứa 1 dòng duy nhất có `id = 'site_settings'` để quản lý cấu hình toàn website.*
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

### 2. Bảng `posts` (Quản lý các bài viết, tin tức, học bổng)
- `id` (UUID, Primary Key)
- `title` (TEXT) - Tiêu đề bài viết
- `slug` (TEXT, Unique) - Đường dẫn tĩnh thân thiện SEO
- `excerpt` (TEXT) - Tóm tắt ngắn
- `content` (TEXT) - Nội dung bài viết (HTML từ Tiptap)
- `image_url` (TEXT) - Ảnh đại diện bài viết
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
- `form_type` (TEXT) - Phân loại form (Ví dụ: tư vấn học bổng, đăng ký khóa học)
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
- Việc tải lên hình ảnh được quản lý qua component [ImageUploader](file:///home/hieund/Documents/ref-academy/components/admin/image-uploader.tsx).
- Component tích hợp tự động nén ảnh client-side qua `browser-image-compression` (giới hạn kích thước tối đa 1.5MB) và tự động thay đổi kích thước tối đa dựa trên thư mục tải lên:
  - `partners`: max 360px
  - `courses`: max 675px
  - `posts`: max 1650px (dành cho banner, bài viết)
- Mọi hình ảnh tải lên được đẩy vào bucket `images` của Supabase và lưu trữ đường dẫn tương đối trong Database. Phía client sử dụng helper `getImageUrl` để phân giải thành URL tuyệt đối hoặc trả về ảnh fallback nội bộ nếu đường dẫn trống.
