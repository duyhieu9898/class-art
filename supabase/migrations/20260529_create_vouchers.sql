-- ========================================================
-- Create vouchers table for registration discounts
-- ========================================================

CREATE TABLE IF NOT EXISTS vouchers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    percent_discount INT NOT NULL CHECK (percent_discount >= 1 AND percent_discount <= 100),
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_all_vouchers" ON vouchers;

CREATE POLICY "admin_all_vouchers" ON vouchers
    FOR ALL USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE OR REPLACE FUNCTION validate_voucher(voucher_code TEXT)
RETURNS TABLE(code TEXT, percent_discount INT)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT vouchers.code, vouchers.percent_discount
    FROM vouchers
    WHERE vouchers.code = upper(trim(voucher_code))
    LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION validate_voucher(TEXT) TO anon, authenticated;
