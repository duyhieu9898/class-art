-- ========================================================
-- Add admissions degree settings to info table
-- ========================================================

ALTER TABLE info 
ADD COLUMN IF NOT EXISTS admissions_degree_image_url TEXT,
ADD COLUMN IF NOT EXISTS admissions_degree_title TEXT,
ADD COLUMN IF NOT EXISTS admissions_degree_content TEXT;

-- Populate default values for existing site_settings row if not already set
UPDATE info
SET 
  admissions_degree_image_url = COALESCE(admissions_degree_image_url, '/images/tuyen-sinh/degree-img.png'),
  admissions_degree_title = COALESCE(admissions_degree_title, 'Bằng cấp'),
  admissions_degree_content = COALESCE(admissions_degree_content, 'REF ACADEMY cung cấp chương trình đào tạo cập nhật và toàn diện, bao quát tất cả các lĩnh vực của Mỹ thuật Đa phương tiện, bám sát các ứng dụng thực tế và yêu cầu thiết yếu của ngành công nghiệp sáng tạo và giải trí.\n\nSinh viên sau khi hoàn thành chương trình học 2 năm sẽ nhận chứng chỉ Advanced Diploma in Multimedia (ADIM) do Arena Multimedia Ấn Độ cấp. Sở hữu chứng chỉ ADIM, học viên có thể học liên thông tại các trường Đại học lớn trên thế giới như: Middlesex University (MDX – Anh Quốc), Vancouver Center for Entertainment Arts (VCEA – Canada), Lincoln University College (LUC – Malaysia)… để lấy bằng cử nhân quốc tế.')
WHERE id = 'site_settings';
