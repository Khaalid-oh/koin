-- Add status column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'waitlist' 
        AND column_name = 'status'
    ) THEN
        ALTER TABLE public.waitlist
        ADD COLUMN status text not null default 'pending' check (status in ('pending', 'approved', 'rejected'));
    END IF;
END $$; 