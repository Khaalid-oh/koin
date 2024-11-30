-- Drop existing table and types if they exist
DROP TABLE IF EXISTS waitlist CASCADE;
DROP TYPE IF EXISTS user_type CASCADE;
DROP TYPE IF EXISTS waitlist_status CASCADE;

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user types
CREATE TYPE user_type AS ENUM ('athlete', 'trainer');

-- Create enum for status
CREATE TYPE waitlist_status AS ENUM ('pending', 'approved', 'rejected');

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    email TEXT UNIQUE NOT NULL,
    user_type user_type NOT NULL,
    status waitlist_status DEFAULT 'pending',
    notes TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS waitlist_timestamp_idx ON public.waitlist(timestamp DESC);

-- Grant necessary permissions
GRANT ALL ON public.waitlist TO postgres, service_role;
GRANT SELECT, INSERT ON public.waitlist TO anon, authenticated;