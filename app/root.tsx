import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react"
import { useState, useEffect } from "react"
import type { LoaderArgs, LinksFunction } from "@vercel/remix"
import { json } from "@vercel/remix"
import { createBrowserClient, createServerClient } from "@supabase/auth-helpers-remix"
import type { Database } from "@/lib/database.types"
import stylesheet from "@/static/styles/tailwind.css"
import { SSRProvider } from "react-bootstrap"

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }]

export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  }

  const response = new Response()

  const supabase = createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    request,
    response,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return json(
    {
      env,
      session,
    },
    {
      headers: response.headers,
    },
  )
}
export default function App() {
  const { env, session } = useLoaderData<typeof loader>()
  const { revalidate } = useRevalidator()

  const [supabase] = useState(() => createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))

  const serverAccessToken = session?.access_token

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "INITIAL_SESSION" && session?.access_token !== serverAccessToken) {
        // server and client are out of sync.
        revalidate()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, supabase, revalidate])

  return (
    <SSRProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="h-screen font-chivo-mono">
          <Outlet context={{ supabase }} />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </SSRProvider>
  )
}
