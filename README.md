# REF ACADEMY - Học viện Đào tạo Thiết kế Đồ họa & Multimedia

Hệ thống website và trang quản trị của **REF ACADEMY** - Đơn vị đào tạo thiết kế đồ họa, hoạt hình 3D, VFX và ứng dụng trí tuệ nhân tạo (AI) hàng đầu.

## Tổng quan dự án

Website cung cấp các thông tin giới thiệu, chương trình đào tạo, hoạt động sự kiện, thông tin tuyển sinh và cổng đăng ký tư vấn trực tuyến cho học viên. Đồng thời tích hợp trang quản trị Admin mạnh mẽ để quản lý toàn bộ nội dung hiển thị trên website.

## Các phân hệ chính

### 1. Website Client (Trang dành cho học viên)
- **Trang chủ & Giới thiệu:** Trải nghiệm hình ảnh hiện đại, giới thiệu sứ mệnh, triết lý đào tạo và lịch sử hình thành phát triển.
- **Chương trình Đào tạo:** Giới thiệu các khóa học chi tiết.
- **Tuyển sinh & Học bổng:** Cung cấp thông tin quy chế tuyển sinh, tài liệu nhập học và các chương trình học bổng/ưu đãi.
- **Tin tức & Hoạt động:** Cập nhật các bài viết chia sẻ kiến thức, sự kiện và hoạt động ngoại khóa.

### 2. Admin Dashboard (Trang quản trị)
- **Tổng quan (Dashboard):** Xem thống kê số lượng đăng ký, khóa học, đối tác và bài viết.
- **Bài viết (Posts):** Quản lý tin tức, sự kiện, học bổng và nhân vật.
- **Tuyển sinh & Đăng ký:** Quản lý danh sách học viên đăng ký tư vấn và thông tin banner tuyển sinh.
- **Voucher:** Tạo và quản lý các mã giảm giá học phí.
- **Khóa học & Đối tác:** Quản lý danh mục đào tạo và thông tin các đơn vị đối tác liên kết.
- **Thông tin chung:** Cấu hình thông tin liên hệ chính, mạng xã hội, thông tin chân trang (Footer) và lịch sử phát triển.

## Công nghệ sử dụng

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Shadcn UI, Lucide Icons.
- **Backend & Database:** Supabase (Postgres Database, Authentication, Storage cho ảnh/banner).
- **Form & Validation:** React Hook Form, Zod.

## Hướng dẫn cài đặt và chạy thử

### 1. Cài đặt thư viện
```bash
npm install # hoặc pnpm install / yarn install
```

### 2. Cấu hình biến môi trường
Tạo file `.env.local` ở thư mục gốc dự án và khai báo các thông tin kết nối Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_ZALO_URL=your-zalo-oa-link
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

### 3. Khởi chạy dự án (Local Development)
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để trải nghiệm website.
