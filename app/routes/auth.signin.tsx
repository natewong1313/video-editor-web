import TextField from "@/components/ui/TextField"
import type { V2_MetaFunction } from "@remix-run/react"
import Button from "@/components/ui/Button"
import { Link, useNavigation, useActionData, Form } from "@remix-run/react"
import type { ActionArgs } from "@vercel/remix"
import { json } from "@vercel/remix"
import { z } from "zod"
import { createServerClient } from "@supabase/auth-helpers-remix"
import { badRequest, unauthorizedRequest } from "@/utils/request.server"
import { redirect } from "@vercel/remix"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Sign in" }]
}
const formData = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, { message: "Please enter a password" }),
})

export async function action({ request }: ActionArgs) {
  const response = new Response()

  const form = await request.formData()
  const fields = {
    email: form.get("email") as string,
    password: form.get("password") as string,
  }
  const validation = formData.safeParse(fields)
  const fieldErrors: { [key: string]: string } = {}
  if (!validation.success) {
    validation.error.issues.map((issue) => (fieldErrors[issue.path[0]] = issue.message))
    return badRequest({ fieldErrors, fields, error: null }, response.headers)
  }
  const supabaseClient = createServerClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "", {
    request,
    response,
  })

  const { data, error } = await supabaseClient.auth.signInWithPassword(fields)
  if (error) {
    return unauthorizedRequest({ error: error.message, fields, fieldErrors }, response.headers)
  }

  return redirect("/", {
    headers: response.headers,
  })
}

export default function SigninPage() {
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>()

  console.log(actionData)

  return (
    <div className="flex h-full bg-black">
      <div className="m-auto text-white bg-zinc-900 w-96 border border-zinc-700 rounded-lg p-6">
        <h1 className="text-xl font-bold">Sign in</h1>
        <h2 className="text-zinc-400">To continue to video-editor</h2>
        <Form method="post" className="w-full flex flex-col mb-4">
          <TextField
            label="Email"
            autoComplete="email"
            name="email"
            type="email"
            className="mt-1"
            defaultValue={actionData?.fields.email}
            errorMessage={actionData?.fieldErrors?.email}
          />
          <TextField
            label="Password"
            autoComplete="password"
            name="password"
            type="password"
            className="mt-1"
            defaultValue={actionData?.fields.password}
            errorMessage={actionData?.fieldErrors?.password}
          />
          <Button
            text={navigation.state !== "idle" ? "Submitting..." : "Sign In"}
            className="mt-3"
            type="submit"
            disabled={navigation.state !== "idle"}
          />
        </Form>
        <div className="flex-col flex">
          <span className="text-red-500 text-sm -mt-2 mb-1">{actionData?.error}</span>
          <span className="text-sm text-gray-500">
            Need an account?{" "}
            <Link className="text-sky-500 hover:underline" to="/dashboard">
              Click here
            </Link>{" "}
            to register
          </span>
        </div>
      </div>
    </div>
  )
}
