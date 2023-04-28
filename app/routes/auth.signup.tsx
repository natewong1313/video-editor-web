import { ValidatedForm, validationError } from "remix-validated-form"
import type { LoaderArgs , DataFunctionArgs} from "@remix-run/cloudflare"
import { withZod } from "@remix-validated-form/with-zod"
import { z } from "zod"
import Input from "@/components/ui/input"
import { Link, useActionData } from "@remix-run/react"
import { ArrowRight } from "lucide-react"
import { json } from "@remix-run/cloudflare"
import SubmitButton from "@/components/ui/submit-button"

export const validator = withZod(
  z.object({
    email: z.string().min(1, { message: "Email is required" }).email("Must be a valid email"),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(64, { message: "Password must be less than 64 characters" }),
  })
)

export const loader = async ({context}: LoaderArgs) => 
  // console.log(JSON.stringify(context))
  // // const res = await context.USERS_KV.put("natewong1@gmail.com", JSON.stringify({"passwordHash": "123"}))
  // const res = await context.USERS_KV.get<{passwordHash: string}>("natewong1@gmail.com", {
  //   type: "json",
  // })
  // console.log(res)
  null

export const action = async ({ request }: DataFunctionArgs) => {
  const data = await validator.validate(await request.formData())
  console.log(data)
  if (data.error) return validationError(data.error)
  const { email, password } = data.data

  return json({
    success: true,
  })
}

export default function SignupPage() {
  const data = useActionData()
  console.log(data)
  return (
    <div className="flex h-full bg-zinc-950">
      <div className="m-auto h-fit w-96 rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-8 text-white">
        <h1 className="text-xl font-semibold">Create an account</h1>
        <h2 className="text-zinc-400">To continue to video-editor</h2>
        <ValidatedForm validator={validator} method="post" className="mt-3 space-y-2">
          <Input type="email" label="Email Address" name="email" />
          <Input type="password" label="Password" name="password" description="Must be at least 8 characters." />
          {/* <Input type="password" label="Confirm Password" name="confirm-password" /> */}
          <div className="pt-1">
            <SubmitButton>Create Account</SubmitButton>
          </div>
        </ValidatedForm>
        <div className="mt-3 flex flex-col">
          {/* <span className="-mt-2 mb-1 text-sm text-red-500">{actionData?.error}</span> */}
          <span className="text-sm text-zinc-500">
            Already have an account?{" "}
            <Link className="font-medium text-lilac-400 hover:underline" to="/auth/signin">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
