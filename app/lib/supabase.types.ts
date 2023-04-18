import type { Database } from "@/lib/database.types"
import type { SupabaseClient } from "@supabase/auth-helpers-remix"

export type OutletSupabaseClient = {
  supabase: SupabaseClient<Database>
}

export type Projects = Database["public"]["Tables"]["projects"]["Row"]
