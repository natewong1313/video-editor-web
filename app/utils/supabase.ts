import type { User } from "@supabase/auth-helpers-remix"
import { createServerClient, SupabaseClient } from "@supabase/auth-helpers-remix"

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

export async function addProjectToDb(supabaseClient: SupabaseClient, projectName: string, userId: string) {
  const { data, error } = await supabaseClient
    .from("projects")
    .insert([{ name: projectName, user_id: userId }])
    .select("id")
    .single()
  if (error) {
    if (error.message === 'duplicate key value violates unique constraint "projects_name_key"') {
      error.message = "A project with this name already exists"
    }
    return { error }
  }
  return { data }
}

// export async function checkIfUserFolderExists() {

// }
