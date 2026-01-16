export const SUPABASE_API_URL = import.meta.env.VITE_SUPABASE_URL || '';

if (!SUPABASE_API_URL) {
  console.warn('⚠️ VITE_SUPABASE_URL is not defined in environment variables');
  console.warn('Please create a .env file with your Supabase configuration');
  console.warn('See .env.example for the required variables');
}
