-- Verify table structure
SELECT 
    column_name, 
    data_type, 
    column_default, 
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_name = 'waitlist'
ORDER BY 
    ordinal_position;

-- Verify enum types
SELECT 
    t.typname AS enum_name,
    e.enumlabel AS enum_value
FROM 
    pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
WHERE 
    t.typname IN ('user_type', 'waitlist_status')
ORDER BY 
    t.typname, e.enumsortorder; 