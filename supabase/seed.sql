-- =============================================
-- SEED DATA - REF ACADEMY
-- =============================================

-- Clear existing data to prevent duplicate key or constraint errors on remote DB
TRUNCATE TABLE courses CASCADE;
TRUNCATE TABLE partners CASCADE;
TRUNCATE TABLE posts CASCADE;

-- COURSES
INSERT INTO courses (title, image_url, "order") VALUES
('BRANDING STRATEGY', '/images/course-01.png', 1),
('POST-PRODUCTION & ADVANCED TECHNIQUES (PTS & AI 2.0)', '/images/course-02.png', 2),
('SPINE ANIMATION', '/images/course-03.png', 3),
('AFTER EFFECTS & VFX', '/images/course-04.png', 4),
('DIGITAL PAINTING & CONCEPT ART (AI INTEGRATION)', '/images/course-05.png', 5);

-- PARTNERS
INSERT INTO partners (name, logo_url, website_url, "order") VALUES
('Delight Vietnam', '/images/partner-01.png', 'https://delightvietnam.com/', 1),
('DO Agency', '/images/partner-02.png', 'https://doagency.vn/', 2),
('Future Studio', '/images/partner-03.png', 'https://www.facebook.com/Futurestudiovn', 3),
('JCI Vietnam', '/images/partner-04.png', 'https://jci.vn/', 4),
('VA Sketchers Class', '/images/partner-05.png', 'https://vasketchersclass2018.blogspot.com/', 5),
('JCI Đà Nẵng', '/images/partner-06.png', 'https://jcidanang.com/', 6);

-- SCHOLARSHIPS (stored as posts)
INSERT INTO posts (slug, title, excerpt, content, image_url, section, category, is_published, published_at) VALUES
('hoc-bong-cham-sang-tao', 'Học bổng Chạm sáng tạo', 'Học bổng Chạm Sáng Tạo là chương trình đặc biệt dành cho học sinh, sinh viên giỏi, thủ khoa các trường hoặc các bạn có hoàn cảnh khó khăn, được đề xuất từ nhà trường. Học bổng 100% học phí tại FPT Arena không chỉ hỗ trợ tài chính mà còn tiếp sức, khơi dậy tiềm năng sáng tạo, giúp bạn tự tin chinh phục ước mơ.', NULL, '/images/tuyen-sinh/scholarship-01.png', 'hoc-bong', 'Học bổng', true, '2026-04-23'),
('hoc-bong-dai-su-kol-koc', 'Học bổng Đại sứ KOL/KOC', 'Học bổng Đại sứ KOL/KOC 100% học phí dành cho những bạn trẻ năng động, sáng tạo, sở hữu tài khoản mạng xã hội với từ 10.000 người theo dõi trở lên. Chỉ cần có ít nhất 5 bài đăng hoặc video chia sẻ trải nghiệm học tập, giá trị tại FPT Arena và đồng hành lan tỏa trong suốt quá trình học, bạn đã có cơ hội nhận học bổng đặc biệt này!', NULL, '/images/tuyen-sinh/scholarship-02.png', 'hoc-bong', 'Học bổng', true, '2026-04-22'),
('uu-dai-nhap-hoc-som', 'Ưu đãi nhập học sớm', 'Với mong muốn khuyến khích tinh thần và tăng cơ hội giúp các bạn đến gần hơn với ước mơ trở thành nhà thiết kế chuyên nghiệp, FPT Arena Multimedia tặng ngay những suất Ưu đãi lên đến 50% học phí học kỳ 1 dành cho tân sinh viên nhập học sớm.', NULL, '/images/tuyen-sinh/scholarship-03.png', 'hoc-bong', 'Ưu đãi', true, '2026-04-21');

-- POSTS (sample - dao-tao)
INSERT INTO posts (slug, title, excerpt, image_url, section, category, is_published, published_at) VALUES
('tu-chup-tu-thiet-ke-ao-dai-giao', 'Tự chụp, tự thiết kế, tự hoàn thiện: Hành trình làm nên bộ nhận diện thương hiệu áo dài Giao', 'Trong quá trình thực hiện đồ án Graphic Design, nhóm sinh viên với đề tài "Giao – Áo dài dành ...', '/images/dao-tao/post-01.png', 'dao-tao', 'Đồ án Graphic Design', true, '2026-04-23'),
('do-an-3d-animation-chuyen-tau-so-13', 'Đồ án 3D Animation: Bước vào thế giới hoạt hình cùng dự án Chuyến tàu số 13', 'Trong khuôn khổ học kỳ 3D Animation tại FPT Arena Multimedia, dự án "Chuyến tàu số 13" là một minh ...', '/images/dao-tao/post-02.png', 'dao-tao', 'Đồ án 3D Animation', true, '2026-04-23'),
('do-an-3d-animation-the-great-indoor', 'Đồ án 3D Animation: The Great Indoor – Khi "nhà" không phải là bốn bức tường, mà là cả bầu trời yêu…', 'Tại FPT Arena Multimedia, mỗi đồ án học kỳ là một bước chuyển quan trọng giúp sinh viên tiến gần ...', '/images/dao-tao/post-03.png', 'dao-tao', 'Đồ án 3D Animation', true, '2026-04-23');

-- POSTS (sample - tin-tuc)
INSERT INTO posts (slug, title, excerpt, image_url, section, category, is_published, published_at) VALUES
('a1-2407e-hoan-thanh-hoc-ky-3', 'A1.2407E hoàn thành học kỳ 3: Loạt đồ án sáng tạo đánh dấu trạm phát triển mới', 'Sau hành trình học tập nghiêm túc và không ngừng hoàn thiện kỹ năng, lớp ...', '/images/dao-tao/post-01.png', 'tin-tuc', 'Đồ án sinh viên', true, '2026-04-27'),
('fai-career-connect-01', 'FAI Career Connect 01: Kết nối doanh nghiệp, mở rộng cơ hội nghề nghiệp cho sinh viên', 'Với mong muốn tăng cường liên kết giữa nhà trường và doanh nghiệp, Viện Đào ...', '/images/dao-tao/post-02.png', 'tin-tuc', 'Tin tức & Sự kiện', true, '2026-04-27'),
('character-design-la-gi', 'Character Design là gì? Nền tảng quan trọng trong ngành sáng tạo hình ảnh', 'Character Design (thiết kế nhân vật) là quá trình xây dựng hình ảnh, tính cách ...', '/images/dao-tao/post-07.png', 'tin-tuc', 'Bản tin FPT Arena Blog', true, '2026-04-24');

-- POSTS (sample - nhan-vat)
INSERT INTO posts (slug, title, excerpt, image_url, section, category, is_published, published_at) VALUES
('truong-thi-bich-hue', 'Từ kỷ luật đến bứt phá: Trương Thị Bích Huệ và hành trình ghi dấu ấn tại FPT Arena Multimedia', 'Trương Thị Bích Huệ là gương mặt nổi bật của ngành Thiết kế Đồ họa ...', '/images/dao-tao/post-01.png', 'nhan-vat', 'Sinh viên xuất sắc', true, '2026-03-11'),
('mai-thi-ha-phuong', '"Chiến binh" thiết kế Mai Thị Hà Phương: Khi sáng tạo không chỉ là cảm hứng mà là sự bền bỉ', 'Theo đuổi ngành Thiết kế Mỹ thuật đa phương tiện chưa bao giờ là hành ...', '/images/dao-tao/post-02.png', 'nhan-vat', 'Sinh viên xuất sắc', true, '2026-03-10'),
('le-anh-khoi', 'Lê Anh Khôi và câu chuyện dám rẽ lối để tỏa sáng tại FPT Arena Multimedia', 'Lê Anh Khôi – sinh viên FPT Arena Multimedia là người vừa đạt danh hiệu ...', '/images/dao-tao/post-03.png', 'nhan-vat', 'Sinh viên xuất sắc', true, '2025-09-23');

-- POSTS (sample - workshop)
INSERT INTO posts (slug, title, excerpt, image_url, section, category, is_published, published_at) VALUES
('workshop-bkdn', 'Workshop 3D Animation & VFX tại Đại học Bách Khoa - ĐHĐN', 'Hành trình trải nghiệm thực tế công nghệ sản xuất hoạt hình 3D và kỹ xảo điện ảnh...', '/images/workshop-main.png', 'workshop', 'Workshop', true, '2026-05-15'),
('workshop-due', 'Workshop Kỹ thuật vẽ Digital Painting tại Đại học Kinh tế - ĐHĐN', 'Buổi chia sẻ chuyên sâu về quy trình vẽ minh họa kỹ thuật số kết hợp công nghệ AI...', '/images/workshop-main.png', 'workshop', 'Workshop', true, '2026-05-14'),
('workshop-dtu', 'Workshop Kỹ năng sáng tạo nội dung số tại Đại học Duy Tân', 'Phương pháp xây dựng kịch bản và tối ưu hóa quy trình hậu kỳ video hiệu quả cho sinh viên...', '/images/workshop-main.png', 'workshop', 'Workshop', true, '2026-05-13');

-- POSTS (sample - hoat-dong)
INSERT INTO posts (slug, title, excerpt, image_url, section, category, is_published, published_at) VALUES
('da-ngoai-ba-na-hills', 'Hoạt động dã ngoại kết nối học viên tại Bà Nà Hills', 'Chương trình team building sôi động thắt chặt tình đoàn kết giữa các thế hệ học viên...', '/images/about/about-banner.png', 'hoat-dong', 'Dã ngoại', true, '2026-05-18'),
('le-tot-nghiep-2026', 'Lễ tốt nghiệp rạng rỡ của tân khoa khóa 2024-2026', 'Khoảnh khắc xúc động ghi dấu mốc trưởng thành đầy tự hào của các nhà thiết kế tương lai...', '/images/about/history-banner.png', 'hoat-dong', 'Lễ tốt nghiệp', true, '2026-05-17'),
('trien-lam-art-showcase', 'Triển lãm Art Showcase "Chạm Sáng Tạo" tại REF Campus', 'Không gian trưng bày các tác phẩm xuất sắc nhất từ đồ án của học viên học kỳ I...', '/images/about/hero-bg.png', 'hoat-dong', 'Triển lãm', true, '2026-05-16');

