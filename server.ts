import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"
import * as build from "@remix-run/dev/server-build"
import type { Env } from "@/models/kv"

type Context = EventContext<Env, string, unknown>;

declare module "@remix-run/server-runtime" {
  interface AppLoadContext extends Env {}
}

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context: Context) => ({
    USERS_KV: context.env.USERS_KV,
  }),
  mode: process.env.NODE_ENV,
})
