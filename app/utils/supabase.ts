import type { SupabaseClient } from "@supabase/auth-helpers-remix"
import { createServerClient } from "@supabase/auth-helpers-remix"
import type { FileObject } from "@supabase/storage-js"
import path from "path"
import { createMediaArray } from "./media"

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

export async function getProjectFromDb(supabaseClient: SupabaseClient, projectId: string) {
  const { data, error } = await supabaseClient.from("projects").select().eq("id", projectId).single()
  if (error) {
    return { error }
  }
  return { data }
}

export async function getMediaFromStorage(supabaseClient: SupabaseClient, projectId: string, userId: string, currentUrl: string) {
  const { data, error } = await supabaseClient.storage.from("media").list(`${userId}/${projectId}`)
  if (error) {
    return { error }
  }
  const filteredFiles: FileObject[] = []
  // get rid of item in data
  for (const media of data) {
    console.log(media)
    if (media.name !== ".emptyFolderPlaceholder") {
      filteredFiles.push(media)
    }
  }
  const filePathsArray = filteredFiles.map((file) => `${userId}/${projectId}/${file.name}`)
  const createSignedUrlsResult = await supabaseClient.storage.from("media").createSignedUrls(filePathsArray, 86400)
  if (createSignedUrlsResult.error) {
    return { error: createSignedUrlsResult.error }
  }

  const signedUrls: { [index: string]: string } = {}
  for (const urlData of createSignedUrlsResult.data) {
    if (urlData.error) {
      continue
    }
    const fileName = path.basename(urlData.path as string)
    signedUrls[fileName] = urlData.signedUrl
  }

  const mediaArray = await createMediaArray(filteredFiles, signedUrls, currentUrl)

  return { data: mediaArray }
}
