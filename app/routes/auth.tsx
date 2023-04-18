import { getAuthenticatedUser } from "@/utils/supabase"
import { Outlet } from "@remix-run/react"
import type { LoaderArgs } from "@vercel/remix"
import { redirect } from "@vercel/remix"

export async function loader({ request }: LoaderArgs) {
  const response = new Response()

  const { user } = await getAuthenticatedUser(request, response)
  if (user) {
    return redirect("/", {
      headers: response.headers,
    })
  }
  return null
}

export default function AuthTemplate() {
  return <Outlet />
}
