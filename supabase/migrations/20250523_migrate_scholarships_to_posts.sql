DO $$
BEGIN
    IF to_regclass('public.scholarships') IS NOT NULL THEN
        EXECUTE $migration$
            INSERT INTO posts (
                slug,
                title,
                excerpt,
                content,
                image_url,
                section,
                category,
                is_published,
                published_at
            )
            SELECT
                CASE title
                    WHEN 'Học bổng Chạm sáng tạo' THEN 'hoc-bong-cham-sang-tao'
                    WHEN 'Học bổng Đại sứ KOL/KOC' THEN 'hoc-bong-dai-su-kol-koc'
                    WHEN 'Ưu đãi nhập học sớm' THEN 'uu-dai-nhap-hoc-som'
                    ELSE 'hoc-bong-' || id::text
                END,
                title,
                description,
                NULL,
                image_url,
                'hoc-bong',
                'Học bổng',
                is_active,
                created_at
            FROM scholarships
            ON CONFLICT (slug) DO UPDATE SET
                title = EXCLUDED.title,
                excerpt = EXCLUDED.excerpt,
                content = NULL,
                image_url = EXCLUDED.image_url,
                section = EXCLUDED.section,
                category = EXCLUDED.category,
                is_published = EXCLUDED.is_published,
                published_at = EXCLUDED.published_at
        $migration$;
    END IF;
END $$;

DROP TABLE IF EXISTS instructors;
DROP TABLE IF EXISTS scholarships;
