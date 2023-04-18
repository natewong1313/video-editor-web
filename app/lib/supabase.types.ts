import type { Database } from "@/lib/database.types"
import type { SupabaseClient } from "@supabase/auth-helpers-remix"

export type OutletSupabaseClient = {
  supabase: SupabaseClient<Database>
}
