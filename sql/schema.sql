-- 1. Create Venues Table
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slack_webhook_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  dual_date_required BOOLEAN DEFAULT false,
  shelf_life_days INT NOT NULL,
  warning_window_days INT DEFAULT 2,
  custom_warning_message TEXT,
  -- Daily Par Levels
  par_mon INT DEFAULT 0,
  par_tue INT DEFAULT 0,
  par_wed INT DEFAULT 0,
  par_thu INT DEFAULT 0,
  par_fri INT DEFAULT 0,
  par_sat INT DEFAULT 0,
  par_sun INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Stock Logs Table
CREATE TABLE stock_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity FLOAT NOT NULL,
  production_date_paste DATE NOT NULL,
  production_date_mix DATE, -- Nullable for single-date items
  staff_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create a View for "Tomorrow's Prep List"
-- This logic automatically checks what day tomorrow is and compares current stock to that Par
CREATE VIEW prep_requirements AS
SELECT 
    v.name AS venue_name,
    p.name AS product_name,
    sl.quantity AS current_stock,
    CASE 
        WHEN EXTRACT(DOW FROM (now() + interval '1 day')) = 1 THEN p.par_mon
        WHEN EXTRACT(DOW FROM (now() + interval '1 day')) = 2 THEN p.par_tue
        WHEN EXTRACT(DOW FROM (now() + interval '1 day')) = 3 THEN p.par_wed
        WHEN EXTRACT(DOW FROM (now() + interval '1 day')) = 4 THEN p.par_thu
        WHEN EXTRACT(DOW FROM (now() + interval '1 day')) = 5 THEN p.par_fri
        WHEN EXTRACT(DOW FROM (now() + interval '1 day')) = 6 THEN p.par_sat
        WHEN EXTRACT(DOW FROM (now() + interval '1 day')) = 0 THEN p.par_sun
    END AS tomorrow_par
FROM stock_logs sl
JOIN products p ON sl.product_id = p.id
JOIN venues v ON sl.venue_id = v.id
WHERE sl.created_at >= CURRENT_DATE; -- Only look at today's counts
