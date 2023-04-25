import type { LoaderArgs } from "@remix-run/cloudflare"

export const loader = async ({context}: LoaderArgs) => {
  // console.log(JSON.stringify(context))
  // // const res = await context.USERS_KV.put("natewong1@gmail.com", JSON.stringify({"passwordHash": "123"}))
  // const res = await context.USERS_KV.get<{passwordHash: string}>("natewong1@gmail.com", {
  //   type: "json",
  // })
  // console.log(res)
  return null
}

export default function SigninPage() {
  return (
    <div className="flex h-full bg-zinc-950">
      <div className="m-auto w-96 rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-white">
        <h1 className="text-xl font-bold">Sign in</h1>
        <h2 className="text-zinc-400">To continue to video-editor</h2>
        {/* <Form method="post" className="w-full flex flex-col mb-4">
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
              <Button className="mt-3 h-12" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Sign In"}
              </Button>
            </Form> */}
        {/* <div className="flex-col flex">
              <span className="text-red-500 text-sm -mt-2 mb-1">{actionData?.error}</span>
              <span className="text-sm text-gray-500">
                Need an account?{" "}
                <Link className="text-sky-500 hover:underline" to="/auth/signup">
                  Click here
                </Link>{" "}
                to register
              </span>
            </div> */}
      </div>
    </div>
  )
}
