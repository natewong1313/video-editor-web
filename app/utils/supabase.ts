import { createServerClient } from "@supabase/auth-helpers-remix"

export async function getAuthenticatedUser(request: Request, response: Response) {
  const supabaseClient = createServerClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "", {
    request,
    response,
  })
  const {
    data: { user },
  } = await supabaseClient.auth.getUser()
  return { user, supabaseClient }
}

export async function getSupabaseClient(request: Request, response: Response) {
  const supabaseClient = createServerClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "", {
    request,
    response,
  })
  return supabaseClient
}
