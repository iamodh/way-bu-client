import { createClient } from "@supabase/supabase-js";

// export const client = createClient(process.env.DB_URL, process.env.DB_KEY);

export const client = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
