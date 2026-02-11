
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yzxdlqvyhoqkntochyet.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6eGRscXZ5aG9xa250b2NoeWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4Mjk5ODksImV4cCI6MjA4NjQwNTk4OX0.GviJo5CijS25A2toDZ-XDg4zBleRYt3I2SP15aleF6g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
