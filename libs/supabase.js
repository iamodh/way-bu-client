import { createClient } from "@supabase/supabase-js";

export const client = createClient(
  "https://acacgedujzhhrpmskokm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjYWNnZWR1anpoaHJwbXNrb2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzYzMzQsImV4cCI6MjAzMDAxMjMzNH0.vrBbF9E-GNYLIaj03qZ1eum53qLnI_uQ1M9X7DIDud8"
);
