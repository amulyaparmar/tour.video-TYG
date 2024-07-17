import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tkweddqlriikqgylsuxz.supabase.co";
const supabaseAnonKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrd2VkZHFscmlpa3FneWxzdXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIwNzc0MjIsImV4cCI6MTk4NzY1MzQyMn0.IWdx6ELEUykw11jBQUW2ZT30jjX2-TyHT8INgLe07Ew";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
