import { useLoaderData, useOutletContext } from "@remix-run/react"
import { createServerClient } from "@supabase/auth-helpers-remix"
import { json } from "@vercel/remix"
import type { LoaderArgs } from "@vercel/remix"
import type { OutletSupabaseClient } from "@/lib/supabase.types"

export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  }

  const response = new Response()
  const supabase = createServerClient(env.SUPABASE_URL || "", env.SUPABASE_ANON_KEY || "", { request, response })
  const { data } = await supabase.from("test").select()
  return json(
    { data },
    {
      headers: response.headers,
    },
  )
}

export default function Dashboard() {
  const { data } = useLoaderData<typeof loader>()
  const { supabase } = useOutletContext<OutletSupabaseClient>()

  console.log(data)

  const onClick = async () => {
    await supabase.auth.signInWithPassword({
      email: "jon@supabase.com",
      password: "password",
    })
  }
  const onClick1 = async () => {
    await supabase.auth.signOut()
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {JSON.stringify(data)}</p>
      <button onClick={onClick}>sign in</button>
      <button onClick={onClick1}>sign out</button>
    </div>
  )
}
