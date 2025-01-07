import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fnwymsbpfitvspmzvkhq.supabase.co"; // جایگزین کن
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZud3ltc2JwZml0dnNwbXp2a2hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNzI0MDIsImV4cCI6MjA1MTc0ODQwMn0.MFetxKqCDpi5rsYNwLzMvod7IYVW-cuzt0zyNJphU7c"; // جایگزین کن

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
