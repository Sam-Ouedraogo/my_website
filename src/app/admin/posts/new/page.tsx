import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import PostEditor from "@/components/blog/PostEditor"

export const metadata = {
  title: "New Post | Admin",
}

export default async function NewPostPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="px-6 lg:px-12 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <div className="max-w-4xl">
        <PostEditor />
      </div>
    </div>
  )
}
