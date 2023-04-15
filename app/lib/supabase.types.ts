import { SupabaseClient } from "@supabase/auth-helpers-remix"
import type { Database } from "@/lib/database.types"

export type OutletSupabaseClient = {
  supabase: SupabaseClient<Database>
}
