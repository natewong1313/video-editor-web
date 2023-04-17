import type { LoaderArgs } from "@vercel/remix"
import { createServerClient } from "@supabase/auth-helpers-remix"
import { redirect, json } from "@vercel/remix"
import Navbar from "@/components/navbar"
import { V2_MetaFunction, useLoaderData } from "@remix-run/react"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Projects" }]
}

export async function loader({ request }: LoaderArgs) {
  const response = new Response()

  const supabaseClient = createServerClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "", {
    request,
    response,
  })
  const {
    data: { user },
  } = await supabaseClient.auth.getUser()
  if (!user) {
    return redirect("/auth/signin", {
      headers: response.headers,
    })
  }
  return json(user, {
    headers: response.headers,
  })
}

export default function Projects() {
  const user = useLoaderData<typeof loader>()
  console.log(user)
  return (
    <div className="h-full bg-zinc-950">
      <Navbar />
    </div>
  )
}
