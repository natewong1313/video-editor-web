import { Outlet } from "@remix-run/react"
import type { LoaderArgs } from "@vercel/remix"
import { createServerClient } from "@supabase/auth-helpers-remix"
import { redirect } from "@vercel/remix"

export async function loader({ request }: LoaderArgs) {
  const response = new Response()

  const supabaseClient = createServerClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "", {
    request,
    response,
  })
  const {
    data: { user },
  } = await supabaseClient.auth.getUser()
  if (user) {
    return redirect("/projects", {
      headers: response.headers,
    })
  }
  return null
}

export default function AuthTemplate() {
  return <Outlet />
}
